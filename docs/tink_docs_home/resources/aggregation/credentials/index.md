---
title: "Credentials - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/aggregation/credentials/"
exportedAt: "2026-01-13T12:55:25.004Z"
---
## Adding Credentials to a User[](#adding-credentials-to-a-user)

When adding credentials to a User, one `POST`s an object with `providerName` and the `fields` found on the corresponding `Provider`. In the `handelsbanken-bankid` example, there is only one required field. The `fields` parameter is a key/value map build up of field `name` as key and the value the user provided for this particular field.

When `POST`ing this object to `/api/v1/credentials`, it automatically starts a "refresh" of data towards the specified `Provider`.

### The Provider of Handelsbanken[](#the-provider-of-handelsbanken)

```
{
  "name": "handelsbanken-bankid",
  "status": "ENABLED",
  "credentialsType": "MOBILE_BANKID",
  "displayName": "Handelsbanken",
  "fields": [{
    "name": "username",
    "description": "Personnummer",
    "minLength": 12,
    "maxLength": 12,
    "optional": false,
    "...": "..."
  }]
}
```

### POST /api/v1/credentials[](#post-api-v1-credentials)

```
{
  "providerName": "handelsbanken-bankid",
  "fields": {
    "username": "198709230000"
  }
}
```

## Credentials Status[](#credentials-status)

During the refresh of data from a `Provider`, different `status`es can occur. The general idea is that the client should act upon the `status` if the timestamp `statusUpdated` is greater than what the client previously had. Updates to `credentials` can be listened by simply polling the endpoint `GET /api/v1/credentials/{id}`.

### GET /api/v1/credentials/{id}[](#get-api-v1-credentials-id-)

```
{
  "providerName": "handelsbanken-bankid",
  "fields": {
    "username": "198709230000"
  },
  "status": "AUTHENTICATING",
  "statusUpdated": 1500000000000,
  "updated": null
}
```

| Status | Description |
| --- | --- |
| `CREATED` | Initial status |
| `AUTHENTICATING` | When starting the authentication process |
| `AWAITING_MOBILE_BANKID_AUTHENTICATION` | Trigger for client to prompt the user to open Mobile BankID (Swedish out-of-band authentication app). See information about autostart token below. |
| `AWAITING_SUPPLEMENTAL_INFORMATION` | Trigger for the client to prompt the user to fill out supplemental information. The fields can be found on `credentials` parameter `supplementalInformation`. See more details below: How to handle AWAITING\_SUPPLEMENTAL\_INFORMATION. |
| `AWAITING_THIRD_PARTY_APP_AUTHENTICATION` | Trigger for the client to prompt the user to open the third party authentication flow (app, web page, etc). See more details below: How to handle AWAITING\_THIRD\_PARTY\_APP\_AUTHENTICATION |
| `UPDATING` | User has been successfully authenticated, now downloading data. |
| `UPDATED` | Final state: Refresh was successful and data downloaded. |
| `AUTHENTICATION_ERROR` | Final state: Error during authentication, typically due to bad input. Requires user input to refresh again. |
| `SESSION_EXPIRED` | Final state: This state means that the access token has expired after a period of time. You should manually authenticate again to create a new credentials session. |
| `TEMPORARY_ERROR` | Final state of current refresh. A temporary error occurred when refreshing data, typically due to some issue on the Provider's side. This error state does not require user input to try again. |
| `PERMANENT_ERROR` | Final state: This state means that this credential cannot be used anymore. You need to remove this credential and add a new one. |
| `DELETED` | Final state: This state means that this credential has been deleted, and it will not be possible to perform a refresh on this credential. |

### A simple example of a CredentialsController[](#a-simple-example-of-a-credentialscontroller)

```
module.exports = function(callbacks) {

  this.callbacks = callbacks;
  this.stopped = false;

  function onUpdatedCredentials(newCredentials) {

    if (this.stopped) {
      return;
    }

    this.credentials = newCredentials;

    switch(this.credentials.status) {
      case 'AWAITING_MOBILE_BANKID_AUTHENTICATION':
        this.callbacks.onAwaitingMobileBankId(this.credentials);
        break;
      case 'AWAITING_SUPPLEMENTAL_INFORMATION':
        this.callbacks.onAwaitingSupplementalInfo(this.credentials);
        break;
      case 'UPDATING':
        this.callbacks.onUpdating(this.credentials);
        break;
      case 'UPDATED':
        this.callbacks.onUpdated(this.credentials);
        break;
      case 'AUTHENTICATION_ERROR':
      case 'TEMPORARY_ERROR':
        this.callbacks.onError(this.credentials);
        break;
      default:
        //Do nothing
        break;
    }
  }

  function onCredentialsResponse(newCredentials) {
    var newStatusUpdated = newCredentials.statusUpdated;
    var prevStatusUpdated = this.credentials.statusUpdated;

    if ((!prevStatusUpdated && newStatusUpdated) || (newStatusUpdated > prevStatusUpdated)) {
      onUpdatedCredentials.call(this, newCredentials);
    }
  }

  this.startAuthentication = function(credentials) {
    this.stopped = false;
    this.credentials = credentials;

    this.intervalRef = setInterval(function() {
      // callback on onCredentialsResponse with new response
      CredentialsService.fetch(this.credentials.getId(), onCredentialsResponse);
    }.bind(this), 1000);
  };

  this.stop = function() {
    this.stopped = true;

    if (this.intervalRef) {
      clearInterval(this.intervalRef);
    }
  };
}
```

## Swedish Mobile BankID with Autostart token[](#swedish-mobile-bankid-with-autostart-token)

Moving on the status `AWAITING_MOBILE_BANKID_AUTHENTICATION`, used in Sweden, will be deprecated, and the `AWAITING_THIRD_PARTY_APP_AUTHENTICATION` is going to be used instead. In this case the deeplinks will contain the necessary information to start the bankid app (e.g. autostart token).

Some Swedish providers with credentials type `MOBILE_BANKID` uses autostart token. The autostart token will be provided as supplemental information. If the credentials status is `AWAITING_MOBILE_BANKID_AUTHENTICATION` and the supplemental information is not null, the supplemental information is the autostart token. The autostart token will be in the format of a UUID and should be inputted in a deeplink. The deeplink needs to be generated by the client.

The deeplink should have the following format: `bankid:///?autostarttoken=[TOKEN]&redirect=[RETURNURL]` The preferred way in iOS is the following format: `https://app.bankid.com/?autostarttoken=[TOKEN]&redirect=[RETURNURL]`

The `RETURNURL` is a deeplink back to your application. On iOS the `RETURNURL` must have a value. For all other devices the redirect can be either empty `redirect=` or null (`redirect=null`).

For more information see Chapter 3 in [BankID Relying part guidelines](https://www.bankid.com/assets/bankid/rp/bankid-relying-party-guidelines-v3.5.pdf)

### How to deal with Autostart tokens on another device[](#how-to-deal-with-autostart-tokens-on-another-device)

In the case of Mobile BankID, the QR code will contain the link `bankid:///?autostarttoken=[TOKEN]` which can be retrieved and used to trigger authentication on another device by scanning it with the QR reader built into Mobile BankID.

To deal with QR code in client platform:

The first step is to retrieve QR code using the `GET /api/v1/credentials/{id}/qr` endpoint, this will return the raw binary data for the QR image that encodes the deeplink url.

The second step is to show the QR code in the app, let it be scanned with the QR reader built into the app in another device to trigger authentication.

## How to handle AWAITING\_SUPPLEMENTAL\_INFORMATION[](#how-to-handle-awaiting_supplemental_information)

If the authentication flow requires multiple steps with input from the user, as for example a SMS OTP authentication flow, the client should expect the `AWAITING_SUPPLEMENTAL_INFORMATION` status on the credentials object. To have a successful data aggregation, the user must look at the `supplementalInformation` field inside the credentials object and check what are the requested supplemental fields.

```
"supplementalInformation": [
  {
    "description": "Last name",
    "exposed": true,
    "name": "lastName",
    "optional": false,
    "patternError": "The name you entered is not valid"
  },
  {
    "description": "SMS code",
    "exposed": true,
    "hint": "NNNNNN",
    "maxLength": 6,
    "minLength": 6,
    "name": "otpValue",
    "numeric": true,
    "optional": false,
    "pattern": "([0-9]{6})",
    "patternError": "The code you entered is not valid"
  }
]
```

Once the information is collected, the supplemental information should be sent using the `POST /api/v1/credentials/{id}/supplemental-information` endpoint. The expected payload will be a combination of `name` and `value` as showed in the example.

```
{
  "information": {
    "lastName": "Tinker",
    "otpValue": "123456"
  }
}
```

It's worth mentioning that we may have the `AWAITING_SUPPLEMENTAL_INFORMATION` status multiple times along the process. For example, a provider may require a different information after the first supplemental information is given, which will trigger a second round of supplemental information. In that case, the user must check if the `statusUpdated` timestamp have changed and act accordingly to what is inside new `supplementalInformation`.

## How to handle AWAITING\_THIRD\_PARTY\_APP\_AUTHENTICATION[](#how-to-handle-awaiting_third_party_app_authentication)

If a provider is using third party services in their authentication flow, the client should expect the `AWAITING_THIRD_PARTY_APP_AUTHENTICATION` status on the credentials object. In order for the aggregation of data to be successful, the system expects the third party authentication flow to be successful as well.

Information about the third party authentication flow can be found in the `supplementalInformation` parameter, which contains a serialized `ThirdPartyAppAuthenticationPayload` object.

The `ThirdPartyAppAuthenticationPayload` contains specific deeplink urls and configuration for each client platform (iOS, android, desktop). Here desktop represents desktop or laptop computer and the others represent iOS and android device respectively.

| Key | Configuration | Description |
| --- | --- | --- |
| android | packageName | Name of the package that should be opened on android. |
| android | requiredMinimumVersion | The minimum version of the package that needs to be installed on android. |
| android | intent | Url of the intent that should be opened on android. |
| ios | appStoreUrl | Url to AppStore where the app can be downloaded on iOS. |
| ios | scheme | Base scheme of the app on iOS. |
| ios | deepLinkUrl | Url that the app should open on iOS. Can be of another scheme than app scheme. |
| desktop | url | Url that the app should open on desktop or laptop computer. |
| downloadTitle |  | Title of the app to be downloaded. |
| downloadMessage |  | Detailed message about app to be downloaded. |
| upgradeTitle |  | Title of the app to be upgraded. |
| upgradeMessage |  | Detailed message about app to be upgraded. |

Each client platform (iOS, android, desktop) should access its own structure in `ThirdPartyAppAuthenticationPayload` to get the specific configuration. It is `ios` for iOS, `android` for android and `desktop` for desktop.

### A simple example of a ThirdPartyAppAuthenticationPayload[](#a-simple-example-of-a-thirdpartyappauthenticationpayload)

```
{
  "android": {
    "packageName": "...",
    "requiredMinimumVersion": "...",
    "intent": "..."
    },
  "ios":  {
    "appStoreUrl": "...",
    "scheme": "...",
    "deepLinkUrl": "..."
    },
  "desktop":  {
    "url": "..."
    },
  "downloadTitle": "...",
  "downloadMessage": "...",
  "upgradeTitle": "...",
  "upgradeMessage": "...",
}
```

## Account[](#account)

When a `credentials` connection is successfully established, all supported accounts from the financial institution are aggregated and made available in the Tink API.

Everything described in this part assumes that the Opt-in feature has been enabled.

This feature will give the users a change to choose what accounts they want us to fetch data for. Only accounts that the users has opted in for will be available. Also refreshes will only refresh data for accounts that a users has opted in for.

### Create[](#create)

When creating credentials, the user's input of what accounts to opt-in for is required. This will be notified to the client by the credentials status `AWAITING_SUPPLEMENTAL_INFORMATION` with the account information available on the `credentials` parameter `supplementalInformation`. When the supplemental information has been supplied a refresh of the opted in accounts will be done.

```
{
  "providerLatency" : 0,
  "id" : "e6d7de4350b54f83a7ccf261e3ae5b5f",
  "providerName" : "handelsbanken-bankid",
  "status" : "AWAITING_SUPPLEMENTAL_INFORMATION",
  "statusUpdated" : 1539691829369,
  "supplementalInformation" : "[{\"description\":\"9999-444444444444 ISK\",\"helpText\":null,\"hint\":null,\"immutable\":false,\"masked\":false,\"maxLength\":null,\"minLength\":null,\"name\":\"9999-444444444444\",\"numeric\":false,\"optional\":false,\"pattern\":\"true/false\",\"patternError\":null,\"value\":\"false\",\"sensitive\":false,\"checkbox\":true,\"additionalInfo\":\"{\\\"accountName\\\":\\\"ISK\\\",\\\"accountType\\\":\\\"INVESTMENT\\\",\\\"balance\\\":123456.0,\\\"currencyCode\\\":\\\"EUR\\\",\\\"holderName\\\":null,\\\"iban\\\":null,\\\"portfolioTypes\\\":[\\\"ISK\\\"]}\"},{\"description\":\"9999-222222222222 Sparkonto\",\"helpText\":null,\"hint\":null,\"immutable\":false,\"masked\":false,\"maxLength\":null,\"minLength\":null,\"name\":\"9999-222222222222\",\"numeric\":false,\"optional\":false,\"pattern\":\"true/false\",\"patternError\":null,\"value\":\"false\",\"sensitive\":false,\"checkbox\":true,\"additionalInfo\":\"{\\\"accountName\\\":\\\"Sparkonto\\\",\\\"accountType\\\":\\\"SAVINGS\\\",\\\"balance\\\":385245.33,\\\"currencyCode\\\":\\\"EUR\\\",\\\"holderName\\\":null,\\\"iban\\\":null}\"},{\"description\":\"9999-333333333333 Bolån\",\"helpText\":null,\"hint\":null,\"immutable\":false,\"masked\":false,\"maxLength\":null,\"minLength\":null,\"name\":\"9999-333333333333\",\"numeric\":false,\"optional\":false,\"pattern\":\"true/false\",\"patternError\":null,\"value\":\"false\",\"sensitive\":false,\"checkbox\":true,\"additionalInfo\":\"{\\\"accountName\\\":\\\"Bolån\\\",\\\"accountType\\\":\\\"LOAN\\\",\\\"balance\\\":-2300000.0,\\\"currencyCode\\\":\\\"EUR\\\",\\\"holderName\\\":null,\\\"iban\\\":null}\"},{\"description\":\"9999-111111111111 Transaktionskonto\",\"helpText\":null,\"hint\":null,\"immutable\":false,\"masked\":false,\"maxLength\":null,\"minLength\":null,\"name\":\"9999-111111111111\",\"numeric\":false,\"optional\":false,\"pattern\":\"true/false\",\"patternError\":null,\"value\":\"false\",\"sensitive\":false,\"checkbox\":true,\"additionalInfo\":\"{\\\"accountName\\\":\\\"Transaktionskonto\\\",\\\"accountType\\\":\\\"CHECKING\\\",\\\"balance\\\":26245.33,\\\"currencyCode\\\":\\\"EUR\\\",\\\"holderName\\\":null,\\\"iban\\\":null}\"}]",
  "type" : "MOBILE_BANKID",
  "userId" : "965ec63c8b5a4743914788f6cafcc564",
  "fields" : {
    "username" : "tink2"
  },
  "username" : "tink2",
  "sensitivePayload" : { }
}
```

### Refresh[](#refresh)

When doing a refresh only the opted in accounts will be refreshed.

To change what accounts that are opted in the client can trigger a refresh with a query parameter `optIn=true`. All available accounts will be supplied with supplemental information on the credentials object. The accounts that are already opted in will have `value: true`, all other accounts will have `value: false`. When opting in for accounts the backend expects the full new state (no patching). This means that the opted in accounts after the change has been done will be the ones that had `value: true` in the supplemental information request.

To provide the client with more information about the accounts a serialized JSON object is available on the field `additionalInfo`.

| Key | Description |
| --- | --- |
| `accountName` | The name of the account. |
| `accountType` | The account type Tink have set on the account (`CHECKING, SAVINGS, INVESTMENT, MORTGAGE, CREDIT_CARD, LOAN, PENSION`) |
| `balance` | The current balance of the account. |
| `currencyCode` | The currency code for the account. E.g. `EUR` |
| `holderName` | The name of the account owner. |
| `iban` | The international bank account number of the account. |
| `portfolioTypes` | The types of portfolio an investment account have (`ISK, KF, DEPOT, PENSION, OTHER`). Present only when the account type is `INVESTMENT`. |

> A word of caution; if an account is opted in and then at a later time it is opted out, all available data related to that accounts will be deleted.
