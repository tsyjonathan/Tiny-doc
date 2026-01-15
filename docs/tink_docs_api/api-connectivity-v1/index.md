---
title: "Tink Docs"
source: "/Tiny-doc/tink_docs_api/api-connectivity-v1/"
exportedAt: "2026-01-13T13:02:26.123Z"
---
## Connectivity v1[](/Tiny-doc/tink_docs_api/api-connectivity-v1/)

The Credentials and Provider models are used to handle credentials and consent for a user's connected providers and to see provider information.

## Balance Refresh[](#connectivity-v1/balance-refresh)

## Get Balance Refresh StatusBeta[](#connectivity-v1/balance-refresh/get-balance-refresh-status)

`GET /api/v1/balance-refresh/{refreshId}`

Get the status of a balance refresh.

### Works with[](#connectivity-v1/balance-refresh/get-balance-refresh-status/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `balance-refresh:readonly` |

### Parameters[](#connectivity-v1/balance-refresh/get-balance-refresh-status/parameters)

| Parameter | Description |
| --- | --- |
| refreshIdrequired | Balance refresh ID. |

> Response Example

```
{
  "status": "FINISHED"
}
```

### Response: BalanceRefreshStatusResponse[](#connectivity-v1/balance-refresh/get-balance-refresh-status/response-balancerefreshstatusresponse)

status `string`

Refresh status  
Values: `FINISHED`, `REFRESHING`, `FAILED`

| Status Code | Description |
| --- | --- |
| 200 | Success. |
| 403 | Invalid credentials. |
| 429 | quota exceeded |

## Request Balance RefreshBeta[](#connectivity-v1/balance-refresh/request-balance-refresh)

`POST /api/v1/balance-refresh`

Request a balance refresh for an account

### Works with[](#connectivity-v1/balance-refresh/request-balance-refresh/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `balance-refresh` |

> Request Example

```
{
  "accountId": "6696428766444944ab19f7756376d363"
}
```

### Request Body: BalanceRefreshRequest[](#connectivity-v1/balance-refresh/request-balance-refresh/request-body-balancerefreshrequest)

Provide the refresh parameters.

accountId `string` required

Account ID.

> Response Example

```
{
  "balanceRefreshId": "f45dbb0a61124104a1ac517908812e87",
  "credentialsId": "6e68cc6287704273984567b3300c5822"
}
```

### Response: BalanceRefreshResponse[](#connectivity-v1/balance-refresh/request-balance-refresh/response-balancerefreshresponse)

balanceRefreshId `string`

Balance refresh ID

credentialsId `string`

Credentials ID

| Status Code | Description |
| --- | --- |
| 200 | Success |
| 400 | empty or invalid mandatory parameter (accountId) |

## Credentials[](#connectivity-v1/credentials)

The credentials model represents a user's connected providers from where financial data is accessed.

### The Credentials model[](#connectivity-v1/credentials/the-credentials-model)

fields `object` required

This is a key-value map of `Field` name and value found on the `Provider` to which the credentials belongs to. This parameter is required when creating credentials.

id `string`

The unique identifier of the credentials.

providerName `string` required

The provider (financial institution) that the credentials is connected to.

sessionExpiryDate `Date`

For credentials with access type of `OPEN_BANKING`, indicates when the session for the currently stored credentials will expire. The session can be renewed before or after this date by triggering manual authentication of credentials. After this date automatic refreshes will not be possible without new authentication from the user.

status `string`

The status indicates the state of the credentials. For some states there are actions which need to be performed on the credentials.  
Values: `CREATED`, `AUTHENTICATING`, `AWAITING_MOBILE_BANKID_AUTHENTICATION`, `AWAITING_SUPPLEMENTAL_INFORMATION`, `UPDATING`, `UPDATED`, `AUTHENTICATION_ERROR`, `TEMPORARY_ERROR`, `PERMANENT_ERROR`, `AWAITING_THIRD_PARTY_APP_AUTHENTICATION`, `DELETED`, `SESSION_EXPIRED`

statusPayload `string`

A user-friendly message connected to the status. Could be an error message or text describing what is currently going on in the refresh process.

statusUpdated `Date`

A timestamp of when the credentials' status was last modified.

supplementalInformation `string`

A key-value structure to handle if status of credentials are `AWAITING_SUPPLEMENTAL_INFORMATION` or `AWAITING_THIRD_PARTY_APP_AUTHENTICATION`.

type `string`

Indicates how Tink authenticates the user to the financial institution.  
Values: `PASSWORD`, `MOBILE_BANKID`, `KEYFOB`, `THIRD_PARTY_APP`

updated `Date`

A timestamp of when the credentials was the last time in status `UPDATED`.

userId `string`

The ID of the user that the credentials belongs to.

`POST /api/v1/credentials/{id}/supplemental-information`

Adds supplemental information to an authentication.

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `credentials:refresh` |

| Parameter | Description |
| --- | --- |
| idrequired |  |

> Request Example

```
{
  "information": {
    "code": "123456",
    "name2": "value2"
  }
}
```

### Request Body: SupplementalInformation[](#connectivity-v1/credentials/add-supplemental-information/request-body-supplementalinformation)

The supplemental information.

information `object`

A key-value structure, use `"name":"value"` from the fields found in `supplementalInformation` on the `Credentials` when status is `AWAITING_SUPPLEMENTAL_INFORMATION`.

| Status Code | Description |
| --- | --- |
| 204 | The supplemental information was successfully sent. |
| 404 | The credentials could not be found. |

## Create credentials[](#connectivity-v1/credentials/create-credentials)

`POST /api/v1/credentials`

Creates the Credentials for the user. The create request will trigger a refresh towards the provider.

### Works with[](#connectivity-v1/credentials/create-credentials/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `credentials:write` |

### Query Parameters[](#connectivity-v1/credentials/create-credentials/query-parameters)

| Parameter | Description |
| --- | --- |
| items | The data types to aggregate from the provider. Multiple items are allowed and are passed as: items=item1&items=item2. If omitted, all data types are aggregated.  
Values: `CHECKING_ACCOUNTS`, `CHECKING_TRANSACTIONS`, `SAVING_ACCOUNTS`, `SAVING_TRANSACTIONS`, `CREDITCARD_ACCOUNTS`, `CREDITCARD_TRANSACTIONS`, `LOAN_ACCOUNTS`, `LOAN_TRANSACTIONS`, `INVESTMENT_ACCOUNTS`, `INVESTMENT_TRANSACTIONS`, `EINVOICES (DEPRECATED)`, `TRANSFER_DESTINATIONS`, `IDENTITY_DATA`, `LIST_BENEFICIARIES (DEPRECATED)` |

> Request Example

```
{
  "appUri": "https://my-customer-app.com/authentication",
  "callbackUri": "http://my-customer-app.com/callback",
  "fields": {
    "username": "198410045701"
  },
  "originatingUserIp": "198.51.100.10",
  "providerName": "handelsbanken-bankid",
  "selectedAuthenticationOptions": [
    {
      "authenticationOptionDefinition": "SE_MOBILE_BANKID_OTHER_DEVICE",
      "authenticationOptionsGroup": "SE_MOBILE_BANKID_DEVICE_CHOICE",
      "fields": {
        "username": "198401011111"
      }
    }
  ],
  "triggerRefresh": false
}
```

### Request Body: CreateCredentialsRequest[](#connectivity-v1/credentials/create-credentials/request-body-createcredentialsrequest)

The credentials to create. Only providerName and fields are required.

appUri `string`

The end user will be redirected to this URI after the authorization code has been delivered. This field is used for flows where we have third party redirects to financial institutions. There is a default value which is tink://open. It can be any type of URI (mobile deeplink, http address etc.)

callbackUri `string`

This URI will be used by the ASPSP to pass the authorization code. It corresponds to the redirect/callback URI in OAuth2/OpenId. This parameter is only applicable if you are a TPP.

fields `object` required

This is a key-value map of `Field` name and value found on the `Provider` to which the credentials belongs to. This parameter is required when creating credentials.

originatingUserIp `string`

The originating user's remote IP address of the corresponding HTTP request.

providerName `string` required

The provider (financial institution) that the credentials is connected to.

selectedAuthenticationOptions `array[SelectedAuthenticationOption]`

\[BETA\] Specifies the selected authentication options for each available group when a provider has more than one authentication option available in any of the available groups.

triggerRefresh `boolean`

Defines if the Credentials creation should cause a refresh on aggregated data. Defaults to `true`

#### SelectedAuthenticationOption[](#connectivity-v1/credentials/create-credentials/request-body-createcredentialsrequest/selectedauthenticationoption)

authenticationOptionDefinition `string`

Specifies the selected authentication option. This is only required if selectedAuthenticationOptions is used.

authenticationOptionsGroup `string`

Specifies the authentication option group for which we have selected an authentication option. This is only required if selectedAuthenticationOptions is used.

fields `object`

Specifies the values for the fields that are required to be sent when this authentication option is selected, if any.

> Response Example

```
{
  "fields": {
    "username": "198410045701"
  },
  "id": "6e68cc6287704273984567b3300c5822",
  "providerName": "handelsbanken-bankid",
  "sessionExpiryDate": 1493379467000,
  "status": "UPDATED",
  "statusPayload": "Analyzed 1,200 out of 1,200 transactions.",
  "statusUpdated": 1493379467000,
  "supplementalInformation": null,
  "type": "MOBILE_BANKID",
  "updated": 1493379467000,
  "userId": "c4ae034f96c740da91ae00022ddcac4d"
}
```

### Response: [Credentials](#tag-credentials)[](#connectivity-v1/credentials/create-credentials/response-credentials)

The credentials model represents a user's connected providers from where financial data is accessed.

See [Credentials](#tag-credentials) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | The credentials was successfully created. |
| 400 | The payload does not pass validation or the user could not be authenticated. |
| 404 | The provider could not be found. |
| 409 | There is already a credentials with the same provider name and same values of the fields. |

## Delete credentials[](#connectivity-v1/credentials/delete-credentials)

`DELETE /api/v1/credentials/{id}`

Deletes the given credentials. The deletion is partly done asynchronously.

### Works with[](#connectivity-v1/credentials/delete-credentials/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `credentials:write` |

### Parameters[](#connectivity-v1/credentials/delete-credentials/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The internal identifier of the credentials to delete |

| Status Code | Description |
| --- | --- |
| 204 | The credentials has been successfully sent for deletion. |
| 404 | The credentials could not be found. |

## Get QR code[](#connectivity-v1/credentials/get-qr-code)

`GET /api/v1/credentials/{id}/qr`

QR code for authentication flows such as Mobile BankID as base64 encoded PNG. Includes `data:image/png;base64,`.

### Works with[](#connectivity-v1/credentials/get-qr-code/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `credentials:read` |

### Parameters[](#connectivity-v1/credentials/get-qr-code/parameters)

| Parameter | Description |
| --- | --- |
| idrequired |  |

### Response: text/plain[](#connectivity-v1/credentials/get-qr-code/response-text-plain)

The QR code was successfully returned.

| Status Code | Description |
| --- | --- |
| 200 | The QR code was successfully returned. |
| 400 | The payload does not pass validation. |
| 404 | Could not find the autostarttoken. |

## Get credentials[](#connectivity-v1/credentials/get-credentials)

`GET /api/v1/credentials/{id}`

Gets credentials by ID.

### Works with[](#connectivity-v1/credentials/get-credentials/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `credentials:read` |

### Parameters[](#connectivity-v1/credentials/get-credentials/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The internal identifier of the credentials to get |

> Response Example

```
{
  "fields": {
    "username": "198410045701"
  },
  "id": "6e68cc6287704273984567b3300c5822",
  "providerName": "handelsbanken-bankid",
  "sessionExpiryDate": 1493379467000,
  "status": "UPDATED",
  "statusPayload": "Analyzed 1,200 out of 1,200 transactions.",
  "statusUpdated": 1493379467000,
  "supplementalInformation": null,
  "type": "MOBILE_BANKID",
  "updated": 1493379467000,
  "userId": "c4ae034f96c740da91ae00022ddcac4d"
}
```

### Response: [Credentials](#tag-credentials)[](#connectivity-v1/credentials/get-credentials/response-credentials)

The credentials model represents a user's connected providers from where financial data is accessed.

See [Credentials](#tag-credentials) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | The credentials was successfully returned. |
| 404 | The credentials could not be found. |

## List credentials[](#connectivity-v1/credentials/list-credentials)

`GET /api/v1/credentials/list`

List all credentials for the user.

### Works with[](#connectivity-v1/credentials/list-credentials/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `credentials:read` |

> Response Example

```
{
  "credentials": [
    {
      "fields": {
        "username": "198410045701"
      },
      "id": "6e68cc6287704273984567b3300c5822",
      "providerName": "handelsbanken-bankid",
      "sessionExpiryDate": 1493379467000,
      "status": "UPDATED",
      "statusPayload": "Analyzed 1,200 out of 1,200 transactions.",
      "statusUpdated": 1493379467000,
      "supplementalInformation": null,
      "type": "MOBILE_BANKID",
      "updated": 1493379467000,
      "userId": "c4ae034f96c740da91ae00022ddcac4d"
    }
  ]
}
```

### Response: CredentialsListResponse[](#connectivity-v1/credentials/list-credentials/response-credentialslistresponse)

credentials `array[[Credentials](#tag-credentials)]`

A list of credentials

## Manual authenticate of credentials[](#connectivity-v1/credentials/manual-authenticate-of-credentials)

`POST /api/v1/credentials/{id}/authenticate`

Triggers a full authentication flow to renew refresh tokens with ASPSPs. This endpoint only triggers authentication, thus a full credentials refresh will not be executed.

### Works with[](#connectivity-v1/credentials/manual-authenticate-of-credentials/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `credentials:refresh` |

### Parameters[](#connectivity-v1/credentials/manual-authenticate-of-credentials/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The internal identifier of the `Credentials` object to authenticate. |

> Request Example

```
{
  "appUri": "https://my-customer-app.com/authentication",
  "callbackUri": "http://my-customer-app.com/callback",
  "originatingUserIp": "198.51.100.10",
  "selectedAuthenticationOptions": [
    {
      "authenticationOptionDefinition": "SE_MOBILE_BANKID_OTHER_DEVICE",
      "authenticationOptionsGroup": "SE_MOBILE_BANKID_DEVICE_CHOICE",
      "fields": {
        "username": "198401011111"
      }
    }
  ]
}
```

### Request Body: ManualAuthenticationRequest[](#connectivity-v1/credentials/manual-authenticate-of-credentials/request-body-manualauthenticationrequest)

Manual authentication object.

appUri `string`

The end user will be redirected to this URI after the authorization code has been delivered. This field is used for flows where we have third party redirects to financial institutions. There is a default value which is tink://open. It can be any type of URI (mobile deeplink, http address etc.)

callbackUri `string`

This URI will be used by the ASPSP to pass the authorization code. It corresponds to the redirect/callback URI in OAuth2/OpenId. This parameter is only applicable if you are a TPP.

originatingUserIp `string`

The originating user's remote IP address of the corresponding HTTP request.

selectedAuthenticationOptions `array[SelectedAuthenticationOption]`

\[BETA\] Specifies the selected authentication options for each available group when a provider has more than one authentication option available in any of the available groups.

#### SelectedAuthenticationOption[](#connectivity-v1/credentials/manual-authenticate-of-credentials/request-body-manualauthenticationrequest/selectedauthenticationoption)

authenticationOptionDefinition `string`

Specifies the selected authentication option. This is only required if selectedAuthenticationOptions is used.

authenticationOptionsGroup `string`

Specifies the authentication option group for which we have selected an authentication option. This is only required if selectedAuthenticationOptions is used.

fields `object`

Specifies the values for the fields that are required to be sent when this authentication option is selected, if any.

| Status Code | Description |
| --- | --- |
| 204 | The credentials authentication was successfully initiated. |
| 404 | The credentials could not be found. |

## Modify credentials[](#connectivity-v1/credentials/modify-credentials)

`PUT /api/v1/credentials/{id}`

Modify the specified credentials. The request will trigger a refresh towards the provider.

### Works with[](#connectivity-v1/credentials/modify-credentials/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `credentials:write` |

### Parameters[](#connectivity-v1/credentials/modify-credentials/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The internal identifier of the credentials to change |

> Request Example

```
{
  "appUri": "https://my-customer-app.com/authentication",
  "callbackUri": "http://my-customer-app.com/callback",
  "fields": "",
  "originatingUserIp": "198.51.100.10",
  "providerName": "string",
  "selectedAuthenticationOptions": [
    {
      "authenticationOptionDefinition": "SE_MOBILE_BANKID_OTHER_DEVICE",
      "authenticationOptionsGroup": "SE_MOBILE_BANKID_DEVICE_CHOICE",
      "fields": {
        "username": "198401011111"
      }
    }
  ],
  "triggerRefresh": false
}
```

### Request Body: UpdateCredentialsRequest[](#connectivity-v1/credentials/modify-credentials/request-body-updatecredentialsrequest)

The new credentials object.

appUri `string`

The end user will be redirected to this URI after the authorization code has been delivered. This field is used for flows where we have third party redirects to financial institutions. There is a default value which is tink://open. It can be any type of URI (mobile deeplink, http address etc.)

callbackUri `string`

This URI will be used by the ASPSP to pass the authorization code. It corresponds to the redirect/callback URI in OAuth2/OpenId. This parameter is only applicable if you are a TPP.

fields `object`

originatingUserIp `string`

The originating user's remote IP address of the corresponding HTTP request.

providerName `string`

selectedAuthenticationOptions `array[SelectedAuthenticationOption]`

\[BETA\] Specifies the selected authentication options for each available group when a provider has more than one authentication option available in any of the available groups.

triggerRefresh `boolean`

Defines if the Credentials update should cause the Credentials refresh. Defaults to `true`

#### SelectedAuthenticationOption[](#connectivity-v1/credentials/modify-credentials/request-body-updatecredentialsrequest/selectedauthenticationoption)

authenticationOptionDefinition `string`

Specifies the selected authentication option. This is only required if selectedAuthenticationOptions is used.

authenticationOptionsGroup `string`

Specifies the authentication option group for which we have selected an authentication option. This is only required if selectedAuthenticationOptions is used.

fields `object`

Specifies the values for the fields that are required to be sent when this authentication option is selected, if any.

> Response Example

```
{
  "fields": {
    "username": "198410045701"
  },
  "id": "6e68cc6287704273984567b3300c5822",
  "providerName": "handelsbanken-bankid",
  "sessionExpiryDate": 1493379467000,
  "status": "UPDATED",
  "statusPayload": "Analyzed 1,200 out of 1,200 transactions.",
  "statusUpdated": 1493379467000,
  "supplementalInformation": null,
  "type": "MOBILE_BANKID",
  "updated": 1493379467000,
  "userId": "c4ae034f96c740da91ae00022ddcac4d"
}
```

### Response: [Credentials](#tag-credentials)[](#connectivity-v1/credentials/modify-credentials/response-credentials)

The credentials model represents a user's connected providers from where financial data is accessed.

See [Credentials](#tag-credentials) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | The credentials was successfully modified. |
| 400 | The payload does not pass validation. |
| 409 | Another ongoing request is in progress. |

## Refresh credentials[](#connectivity-v1/credentials/refresh-credentials)

`POST /api/v1/credentials/{id}/refresh`

Refreshes the specified credentials. Please note that there can be only one on-demand refresh ongoing for a credential at a time, any other attempts will be rejected.

### Works with[](#connectivity-v1/credentials/refresh-credentials/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `credentials:refresh` |

### Parameters[](#connectivity-v1/credentials/refresh-credentials/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The internal identifier of the `Credentials` object to refresh. |

### Query Parameters[](#connectivity-v1/credentials/refresh-credentials/query-parameters)

| Parameter | Description |
| --- | --- |
| items | The data types to aggregate from the Provider. Multiple items are allowed. If omitted, all data types are aggregated.  
Values: `CHECKING_ACCOUNTS`, `CHECKING_TRANSACTIONS`, `SAVING_ACCOUNTS`, `SAVING_TRANSACTIONS`, `CREDITCARD_ACCOUNTS`, `CREDITCARD_TRANSACTIONS`, `LOAN_ACCOUNTS`, `LOAN_TRANSACTIONS`, `INVESTMENT_ACCOUNTS`, `INVESTMENT_TRANSACTIONS`, `EINVOICES (DEPRECATED)`, `TRANSFER_DESTINATIONS`, `IDENTITY_DATA`, `LIST_BENEFICIARIES (DEPRECATED)` |
| optIn | Set to true to trigger an opt-in of accounts before doing the refresh. Today only available for enterprise customers. |
| authenticate | Set to true to trigger authentication flow before doing the refresh. |

> Request Example

```
{
  "appUri": "https://my-customer-app.com/authentication",
  "callbackUri": "http://my-customer-app.com/callback",
  "originatingUserIp": "198.51.100.10",
  "selectedAuthenticationOptions": [
    {
      "authenticationOptionDefinition": "SE_MOBILE_BANKID_OTHER_DEVICE",
      "authenticationOptionsGroup": "SE_MOBILE_BANKID_DEVICE_CHOICE",
      "fields": {
        "username": "198401011111"
      }
    }
  ],
  "userAvailability": {
    "originatingUserIp": "198.51.100.10",
    "userAvailableForInteraction": true,
    "userPresent": true
  }
}
```

### Request Body: RefreshCredentialsRequest[](#connectivity-v1/credentials/refresh-credentials/request-body-refreshcredentialsrequest)

The credentials object to refresh.

appUri `string`

The end user will be redirected to this URI after the authorization code has been delivered. This field is used for flows where we have third party redirects to financial institutions. There is a default value which is tink://open. It can be any type of URI (mobile deeplink, http address etc.)

callbackUri `string`

This URI will be used by the ASPSP to pass the authorization code. It corresponds to the redirect/callback URI in OAuth2/OpenId. This parameter is only applicable if you are a TPP.

originatingUserIp `string`

(DEPRECATED) Use the field in the userAvailability object. This will be ignored if userAvailability is provided.

selectedAuthenticationOptions `array[SelectedAuthenticationOption]`

\[BETA\] Specifies the selected authentication options for each available group when a provider has more than one authentication option available in any of the available groups. Note that if you send in selected authentication options for a refresh request authenticate flag needs to be set to true.

userAvailability `UserAvailability`

Specifies details about end user availability.

#### SelectedAuthenticationOption[](#connectivity-v1/credentials/refresh-credentials/request-body-refreshcredentialsrequest/selectedauthenticationoption)

authenticationOptionDefinition `string`

Specifies the selected authentication option. This is only required if selectedAuthenticationOptions is used.

authenticationOptionsGroup `string`

Specifies the authentication option group for which we have selected an authentication option. This is only required if selectedAuthenticationOptions is used.

fields `object`

Specifies the values for the fields that are required to be sent when this authentication option is selected, if any.

#### UserAvailability[](#connectivity-v1/credentials/refresh-credentials/request-body-refreshcredentialsrequest/useravailability)

originatingUserIp `string`

The originating user's remote IP address of the corresponding HTTP request.

userAvailableForInteraction `boolean` required

Indicates whether or not we can interact with the user (e.g. SCA through any supplemental information flow)

userPresent `boolean` required

The userPresent flag indicates whether or not the user is present at the time of the operation. A present user doesn't necessarily mean we can interact with the user. Imagine an app that, automatically, refreshes all credentials upon the user entering the app. This doesn't mean that the user is ready ("available") for interaction. For knowing if the user is available for interaction, use the flag userAvailableForInteraction.

| Status Code | Description |
| --- | --- |
| 204 | The credentials refresh was successfully initiated. |
| 404 | The credentials could not be found. |

## Third-party callback with redirect[](#connectivity-v1/credentials/third-party-callback-with-redirect)

`POST /api/v1/credentials/third-party/callback/relayed`

Send url-decoded callback information from an ASPSP. This endpoint will return the registered redirect uri as response.

> Request Example

```
{
  "parameters": {
    "parameter1": "value1",
    "parameter2": "value2",
    "parameterN": "valueN"
  },
  "state": "anVzdCBzb21lIHJhbmRvbSBzdGF0ZQo="
}
```

### Request Body: CallbackRelayedRequest[](#connectivity-v1/credentials/third-party-callback-with-redirect/request-body-callbackrelayedrequest)

The callback response from the ASPSP with JSON format.

parameters `object` required

The post parameters from the received callback from the ASPSP. Contains the parameters necessary for the integration to continue the communication with the ASPSP.

state `string` required

The state from the received callback from the ASPSP. Used by Tink to connect the incoming callback to the correct session.

> Response Example

```
{
  "appUri": "string"
}
```

### Response: CallbackRelayedResponse[](#connectivity-v1/credentials/third-party-callback-with-redirect/response-callbackrelayedresponse)

appUri `string`

Registered app redirect uri

| Status Code | Description |
| --- | --- |
| 200 | The callback request was successful. |
| 400 | The payload does not pass validation. |

## Provider[](#connectivity-v1/provider)

The provider model represents financial institutions to where Tink can connect. It specifies how Tink accesses the financial institution, metadata about the financial institution, and what financial information that can be accessed.

### The Provider model[](#connectivity-v1/provider/the-provider-model)

accessType `string` required

What Tink uses to access the data.  
Values: `OPEN_BANKING`, `OTHER`

authenticationFlow `string`

For providers with access type `OPEN_BANKING`, indicates what type of authentication flow is used to access the data.  
Values: `EMBEDDED`, `REDIRECT`, `DECOUPLED`

authenticationUserType `string` required

\[DEPRECATED\] Indicates if a user authenticates toward the bank as a person or a business.  
Values: `PERSONAL`, `BUSINESS`, `CORPORATE`

capabilities `array[string]` required

Indicates what this provider is capable of, in terms of financial data it can aggregate and if it can execute payments.  
Values: `CHECKING_ACCOUNTS`, `CREATE_BENEFICIARIES`, `CREATE_BENEFICIARIES_IN_PAYMENT`, `CREDIT_CARDS`, `EINVOICES`, `IDENTITY_DATA`, `INVESTMENTS`, `LIST_BENEFICIARIES`, `LOANS`, `MORTGAGE_AGGREGATION`, `PAYMENTS`, `SAVINGS_ACCOUNTS`, `TRANSFERS`

credentialsType `string` required

When creating a new credential connected to the provider this will be the credentials type.  
Values: `PASSWORD`, `MOBILE_BANKID`, `KEYFOB`, `THIRD_PARTY_APP`

currency `string` required

The default currency of the provider.

displayDescription `string`

Short displayable description of the authentication type used.

displayName `string` required

The name displayed in the app and what implementors will most likely use to display the provider.

fields `array[Field]` required

List of fields which need to be provided when creating a credential connected to the provider.

financialInstitutionId `string` required

A unique identifier to group providers belonging the same financial institution.

financialInstitutionName `string` required

A name to group providers belonging the same financial institution.

financialServices `array[FinancialService]` required

\[BETA\] Information about financial services covered with this provider.

groupDisplayName `string`

The name of the group that several providers of the same bank can be placed in. Usually when a bank has branches and subsidiaries they are grouped under a single name.

hasAuthenticationOptions `boolean` required

\[BETA\] Indicates whether or not this provider has multiple authentication options available.

id `string` required

The unique identifier of the provider.

images `ImageUrls`

keywords `array[string]`

An array of strings used for looking up a financial institution. For example, this field can include former names, informal names for the institution

loginHeaderColour `string`

\[DEPRECATED\] Sets the colour of the header of login screen.

market `string` required

The market of the provider. Each provider is unique per market.

multiFactor `boolean` required

Indicates if the provider requires multi-factor authentication.

name `string` required

The unique identifier of the provider. This is used when creating new credentials.

passwordHelpText `string`

Short description of how to authenticate when creating a new credential for connected to the provider.

paymentConditions `array[string]`

It indicates specific conditions for redirect and payment processing  
Values: `SOURCE_ACCOUNT_REQUIRED_BEFORE_REDIRECT`, `HAS_DOUBLE_REDIRECT`, `SOURCE_ACCOUNT_PROVIDED_SKIPS_AIS`

pisCapabilities `array[string]`

Indicates the Payments capabilities of this provider.  
Values: `AUTO_PAYMENT`, `BACS`, `CHAPS`, `CZECH_EXPRESS_INTERNAL_TRANSFER`, `CZECH_INTERNAL_TRANSFER`, `DANISH_DOMESTIC_CREDIT_TRANSFER`, `FASTER_PAYMENTS`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_INTRADAG`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_NORWEGIAN_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_POLISH_DOMESTIC_CREDIT_TRANSFER`, `MULTIBANCO`, `NORWEGIAN_DOMESTIC_CREDIT_TRANSFER`, `PAYPAL`, `PAYMENT_CANCELLATION`, `PIS_BULK_PAYMENTS`, `PIS_FUTURE_DATE`, `PIS_MOBILE_AUTO_SIGN`, `PIS_SE_BANK_TRANSFERS`, `PIS_SE_BG`, `PIS_SE_PG`, `PIS_SEPA_ICT_RECURRING_PAYMENTS`, `PIS_SEPA_RECURRING_PAYMENTS`, `POLISH_DOMESTIC_CREDIT_TRANSFER`, `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER`, `SINGLE_PAYMENT_STATUS_CHECK`, `SWISS_DOMESTIC_CREDIT_TRANSFER`, `VRP_SWEEPING`

popular `boolean` required

Indicates if the provider is popular. This is normally set to true for the biggest financial institutions on a market.

rank `integer`

Integer. Determines the relative position of the financial institution on the list shown to end users. Higher values should be displayed higher up in the list. API results are ranked based on this value. Currently only supported in the United States.

releaseStatus `string`

Indicates the Release Status of the provider  
Values: `BETA`

status `string` required

Indicates the current status of the provider. It is only possible to perform credentials create or refresh actions on providers which are enabled.  
Values: `ENABLED`, `TEMPORARY_DISABLED`, `DISABLED`

transactional `boolean` required

\[DEPRECATED\] Indicates if Tink can aggregate transactions for this provider.

type `string` required

Indicates what type of financial institution the provider represents.  
Values: `BANK`, `CREDIT_CARD`, `BROKER`, `TEST`, `OTHER`

#### Field[](#connectivity-v1/provider/the-provider-model/field)

additionalInfo `string`

A serialized JSON containing additional information that could be useful.

checkbox `boolean`

Display boolean value as checkbox.

description `string`

A short description of what the field is used for.

group `string`

Identifies which fields should be gathered in the group.

helpText `string`

Text displayed next to the input field.

hint `string`

Gray text in the input view (Similar to a placeholder).

immutable `boolean`

Controls whether or not the field values entered are immutable.

masked `boolean`

Controls whether or not the field should be shown masked, like a password field.

maxLength `integer`

Integer value of the maximum accepted characters of input.

minLength `integer`

Integer value of the minimum accepted characters of input.

name `string`

The name of the input field.

numeric `boolean`

Controls whether or not the field should only accept numeric values.

oneOf `boolean`

Identifies if only one field within group should be filled.

optional `boolean`

Controls whether or not the field should be optional.

pattern `string`

A regex pattern that can be evaluated on the input.

patternError `string`

An error message that can be displayed if the provided pattern does not validate.

selectOptions `array[SelectOption]`

A list of options where the user should select one.

sensitive `boolean`

Controls whether or not the field should be sensitive.

style `string`

Information about style of 2FA screen.

type `string`

Stores information about field type.

value `string`

#### SelectOption[](#connectivity-v1/provider/the-provider-model/selectoption)

iconUrl `string`

A URL the client can optionally use to show an icon to represent the option.

text `string`

The human-readable description of this option to display to the user.

value `string`

The machine-readable value to send if the user picks this option.

#### FinancialService[](#connectivity-v1/provider/the-provider-model/financialservice)

segment `string` required

\[BETA\] Indicates which segment the financial service belongs to.  
Values: `BUSINESS`, `PERSONAL`

shortName `string` required

\[BETA\] Short name of the financial service.

#### ImageUrls[](#connectivity-v1/provider/the-provider-model/imageurls)

Image urls for the provider.

banner `string`

A image url for the banner.

icon `string`

A image url for the icon.

## Get payment conditions for a providerBeta[](#connectivity-v1/provider/get-payment-conditions-for-a-provider)

`GET /api/v1/payments/providers/{name}/payment-conditions`

Returns a `list of payment conditions` for a provider. A `payment condition` is an evaluation that the provider will have to pass for a payment to be successful. The `payment condition` is a combination of a `Rule`, `Operator` and a `Value` to form an evaluation condition that the data sent to the bank must fulfill. These conditions will apply when creating a payment request with Tink Link. Read more about payment conditions in our [guide](/Tiny-doc/tink_docs_home/resources/payments/payment-conditions/).

### Works with[](#connectivity-v1/provider/get-payment-conditions-for-a-provider/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `payment:read` |
| Client token | `payment:read` |

### Parameters[](#connectivity-v1/provider/get-payment-conditions-for-a-provider/parameters)

| Parameter | Description |
| --- | --- |
| namerequired | The name of the provider |

> Response Example

```
{
  "conditions": [
    {
      "operator": "EQUALS",
      "rule": "REMITTANCE_INFORMATION_TYPE",
      "value": "UNSTRUCTURED"
    }
  ],
  "providerId": "nordea-bankid",
  "recurringPaymentConditions": [
    {
      "operator": "EQUALS",
      "rule": "RECURRING_PAYMENT_ALLOWED_FREQUENCY",
      "value": "UNSTRUCTURED"
    }
  ]
}
```

### Response: PaymentConditionsResponse[](#connectivity-v1/provider/get-payment-conditions-for-a-provider/response-paymentconditionsresponse)

conditions `array[Condition]` required

List of payment conditions for the provider

providerId `string` required

The provider id connected to the payment condition

recurringPaymentConditions `array[RecurringPaymentCondition]`

List of recurring payment conditions for the provider

#### Condition[](#connectivity-v1/provider/get-payment-conditions-for-a-provider/response-paymentconditionsresponse/condition)

operator `string` required

The operator specifies how the evaluation should be performed.  
Values: `EQUALS`, `REQUIRED`, `MATCHES`, `ONE_OF`, `LENGTH_MIN`, `LENGTH_MAX`, `MAX_DAYS_AFTER`, `MINIMUM`, `MAXIMUM`

rule `string` required

The rule provides the contextual information about what data to evaluate in the condition  
Values: `REMITTANCE_INFORMATION_TYPE`, `REMITTANCE_INFORMATION_VALUE`, `RECURRING_PAYMENT_REMITTANCE_INFORMATION_VALUE`, `REFERENCE_REMITTANCE_INFORMATION_VALUE`, `RF_REMITTANCE_INFORMATION_VALUE`, `KID_REMITTANCE_INFORMATION_VALUE`, `UNSTRUCTURED_REMITTANCE_INFORMATION_VALUE`, `RECIPIENT_NAME_VALUE`, `GIRO_UNSTRUCTURED_REMITTANCE_INFORMATION_VALUE`, `INTRA_BANK_TRANSFER_CUTOFF_TIME`, `INTER_BANK_TRANSFER_CUTOFF_TIME`, `GIRO_CUTOFF_TIME`, `SOURCE_MESSAGE`, `SOURCE_ACCOUNT_REQUIRED_BEFORE_REDIRECT`, `HAS_DOUBLE_REDIRECT`, `SOURCE_ACCOUNT_PROVIDED_SKIPS_AIS`, `RECURRING_PAYMENT_ALLOWED_FREQUENCY`, `END_DATE_REQUIRED_FOR_RECURRING_PAYMENT`, `RECURRING_PAYMENT_ALLOWED_EXECUTION_RULE`, `RECURRING_PAYMENT_FIRST_PAYMENT_DATE_MIN_DAYS_FROM_TODAY`, `RECURRING_PAYMENT_FIRST_PAYMENT_DATE_MAX_DAYS_FROM_TODAY`, `SEPA_PAYMENT_AMOUNT`, `FUTURE_PAYMENT_DATE`, `SEPA_INSTANT_PAYMENT_AMOUNT`, `MULTIBANCO_PAYMENT_REFERENCE`, `MULTIBANCO_PAYMENT_ENTITY`, `BULK_PAYMENT_MAX_TOTAL_AMOUNT`, `BULK_PAYMENT_MAX_PAYMENTS`, `DOMESTIC_PAYMENT_MAX_TOTAL_AMOUNT`, `DOMESTIC_PAYMENT_MIN_TOTAL_AMOUNT`, `INSTANT_DOMESTIC_MIN_TOTAL_AMOUNT`

value `string` required

The value defines the condition that rule should fulfill.

#### RecurringPaymentCondition[](#connectivity-v1/provider/get-payment-conditions-for-a-provider/response-paymentconditionsresponse/recurringpaymentcondition)

operator `string` required

The operator specifies how the evaluation should be performed.

rule `string` required

The rule provides the contextual information about what data to evaluate in the condition

value `string` required

The value defines the condition that rule should fulfill.

| Status Code | Description |
| --- | --- |
| 200 | The list of conditions for the given provider is returned. |
| 404 | There were no payment conditions defined for the given provider. |

## Get the authentication options for a given providerBeta[](#connectivity-v1/provider/get-the-authentication-options-for-a-given-provider)

`GET /api/v1/provider-authentication-options/{providerName}`

Retrieves the available authentication options for a provider if it has more than one available.

### Works with[](#connectivity-v1/provider/get-the-authentication-options-for-a-given-provider/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `providers:read` |

### Parameters[](#connectivity-v1/provider/get-the-authentication-options-for-a-given-provider/parameters)

| Parameter | Description |
| --- | --- |
| providerNamerequired | The provider name for which you want to get the authentication options. |

> Response Example

```
{
  "authenticationOptionsGroups": [
    {
      "authenticationOptions": [
        {
          "default": false,
          "displayText": "Open Mobile Bank ID app in another device.",
          "fields": [],
          "helpText": "Indicates the user wants to open use the Mobile Bank ID application in another device.",
          "name": "SE_MOBILE_BANKID_OTHER_DEVICE",
          "supportedChannels": [
            "SUPPORTED_CHANNEL_MOBILE",
            "SUPPORTED_CHANNEL_DESKTOP"
          ]
        },
        {
          "default": true,
          "displayText": "Open Mobile Bank ID app.",
          "fields": [
            {
              "description": "Social security number",
              "hint": "YYYYMMDDNNNN",
              "immutable": true,
              "maxLength": 12,
              "minLength": 12,
              "name": "username",
              "numeric": true,
              "pattern": "^(?:(?:(?:(?:19|20)(?:0[48]|[2468][048]|[13579][26]))|2000)0229|(?:(?:19|20)[0-9]{2}(?:(?:(?:0[13578]|1[02])(?:[123]0|[012][1-9]|31))|(?:(?:0[469]|11)(?:[123]0|[012][1-9]))|02(?:[12]0|[012][1-8]|[01]9))))[0-9]{4}$",
              "patternError": "Please enter a valid social security number."
            }
          ],
          "helpText": "Indicates the user wants to use the Mobile Bank ID application in their current device.",
          "name": "SE_MOBILE_BANKID_SAME_DEVICE",
          "supportedChannels": [
            "SUPPORTED_CHANNEL_MOBILE"
          ]
        }
      ],
      "displayText": "Choose where do you want to authenticate.",
      "helpText": "Used to specify in which device the user wants to open their Mobile Bank ID app.",
      "name": "SE_MOBILE_BANKID_DEVICE_CHOICE"
    }
  ],
  "providerName": "se-swedbank-ob"
}
```

### Response: GetAuthenticationOptionsResponse[](#connectivity-v1/provider/get-the-authentication-options-for-a-given-provider/response-getauthenticationoptionsresponse)

authenticationOptionsGroups `array[AuthenticationOptionsGroup]`

List of authentication options groups available

providerName `string`

The provider name of the provider that has the following authentication options groups available

#### AuthenticationOptionsGroup[](#connectivity-v1/provider/get-the-authentication-options-for-a-given-provider/response-getauthenticationoptionsresponse/authenticationoptionsgroup)

authenticationOptions `array[AuthenticationOption]`

List of available authentication options in this group.

displayText `string`

A short description of what the authentication option group is used for.

helpText `string`

Help text with extra information about what the authentication option group is intended for.

name `string`

Unique name of authentication options group.

#### AuthenticationOption[](#connectivity-v1/provider/get-the-authentication-options-for-a-given-provider/response-getauthenticationoptionsresponse/authenticationoption)

default `boolean`

Indicates if this is the default authentication option, in case none is selected.

displayText `string`

A short description of how this authentication option will affect the authentication flow.

fields `array[[Field](#tag-provider-field)]`

List of fields that are necessary to be filled if this authentication option is selected.

helpText `string`

Help text with extra information about the implications of choosing this authentication option.

name `string`

Unique name of authentication option.

supportedChannels `array[SupportedChannel]`

Supported channels where this authentication option can be selected.

#### SupportedChannel[](#connectivity-v1/provider/get-the-authentication-options-for-a-given-provider/response-getauthenticationoptionsresponse/supportedchannel)

| Value | Description |
| --- | --- |
| SUPPORTED\_CHANNEL\_UNSPECIFIED | Not used. |
| SUPPORTED\_CHANNEL\_MOBILE | Indicates the authentication option is available for mobile devices. |
| SUPPORTED\_CHANNEL\_DESKTOP | Indicates the authentication option is available for desktop devices. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 401 | Authorization token is missing, or not valid |
| 403 | You are not allowed to access the requested resource |
| default | An unexpected error response. |

## List authentication options for given marketBeta[](#connectivity-v1/provider/list-authentication-options-for-given-market)

`GET /api/v1/provider-authentication-options-for-market/{market}`

Retrieves a list of providers with its authentication options for given market

### Works with[](#connectivity-v1/provider/list-authentication-options-for-given-market/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `providers:read` |

### Parameters[](#connectivity-v1/provider/list-authentication-options-for-given-market/parameters)

| Parameter | Description |
| --- | --- |
| marketrequired | The market for which you want to get the authentication options. |

> Response Example

```
{
  "providers": [
    {
      "authenticationOptionsGroups": [
        {
          "authenticationOptions": [
            {
              "default": false,
              "displayText": "Open Mobile Bank ID app in another device.",
              "fields": [],
              "helpText": "Indicates the user wants to open use the Mobile Bank ID application in another device.",
              "name": "SE_MOBILE_BANKID_OTHER_DEVICE",
              "supportedChannels": [
                "SUPPORTED_CHANNEL_MOBILE",
                "SUPPORTED_CHANNEL_DESKTOP"
              ]
            },
            {
              "default": true,
              "displayText": "Open Mobile Bank ID app.",
              "fields": [
                {
                  "description": "Social security number",
                  "hint": "YYYYMMDDNNNN",
                  "immutable": true,
                  "maxLength": 12,
                  "minLength": 12,
                  "name": "username",
                  "numeric": true,
                  "pattern": "^(?:(?:(?:(?:19|20)(?:0[48]|[2468][048]|[13579][26]))|2000)0229|(?:(?:19|20)[0-9]{2}(?:(?:(?:0[13578]|1[02])(?:[123]0|[012][1-9]|31))|(?:(?:0[469]|11)(?:[123]0|[012][1-9]))|02(?:[12]0|[012][1-8]|[01]9))))[0-9]{4}$",
                  "patternError": "Please enter a valid social security number."
                }
              ],
              "helpText": "Indicates the user wants to use the Mobile Bank ID application in their current device.",
              "name": "SE_MOBILE_BANKID_SAME_DEVICE",
              "supportedChannels": [
                "SUPPORTED_CHANNEL_MOBILE"
              ]
            }
          ],
          "displayText": "Choose where do you want to authenticate.",
          "helpText": "Used to specify in which device the user wants to open their Mobile Bank ID app.",
          "name": "SE_MOBILE_BANKID_DEVICE_CHOICE"
        }
      ],
      "providerName": "se-swedbank-ob"
    }
  ]
}
```

### Response: ListProvidersAuthenticationOptionsResponse[](#connectivity-v1/provider/list-authentication-options-for-given-market/response-listprovidersauthenticationoptionsresponse)

providers `array[ProviderAuthenticationOptions]`

The provider name of the provider that has the following authentication options groups available

#### ProviderAuthenticationOptions[](#connectivity-v1/provider/list-authentication-options-for-given-market/response-listprovidersauthenticationoptionsresponse/providerauthenticationoptions)

authenticationOptionsGroups `array[AuthenticationOptionsGroup]`

List of authentication options groups available

providerName `string`

The provider name of the provider that has the following authentication options groups available

#### AuthenticationOptionsGroup[](#connectivity-v1/provider/list-authentication-options-for-given-market/response-listprovidersauthenticationoptionsresponse/authenticationoptionsgroup)

authenticationOptions `array[AuthenticationOption]`

List of available authentication options in this group.

displayText `string`

A short description of what the authentication option group is used for.

helpText `string`

Help text with extra information about what the authentication option group is intended for.

name `string`

Unique name of authentication options group.

#### AuthenticationOption[](#connectivity-v1/provider/list-authentication-options-for-given-market/response-listprovidersauthenticationoptionsresponse/authenticationoption)

default `boolean`

Indicates if this is the default authentication option, in case none is selected.

displayText `string`

A short description of how this authentication option will affect the authentication flow.

fields `array[[Field](#tag-provider-field)]`

List of fields that are necessary to be filled if this authentication option is selected.

helpText `string`

Help text with extra information about the implications of choosing this authentication option.

name `string`

Unique name of authentication option.

supportedChannels `array[SupportedChannel]`

Supported channels where this authentication option can be selected.

#### SupportedChannel[](#connectivity-v1/provider/list-authentication-options-for-given-market/response-listprovidersauthenticationoptionsresponse/supportedchannel)

| Value | Description |
| --- | --- |
| SUPPORTED\_CHANNEL\_UNSPECIFIED | Not used. |
| SUPPORTED\_CHANNEL\_MOBILE | Indicates the authentication option is available for mobile devices. |
| SUPPORTED\_CHANNEL\_DESKTOP | Indicates the authentication option is available for desktop devices. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 401 | Authorization token is missing, or not valid |
| 403 | You are not allowed to access the requested resource |
| default | An unexpected error response. |

## List markets[](#connectivity-v1/provider/list-markets)

`GET /api/v1/providers/markets`

Lists all markets where there are providers available.

### Works with[](#connectivity-v1/provider/list-markets/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `providers:read` |
| Client token | `providers:read` |

> Response Example

```
{
  "markets": [
    "string",
    "string"
  ]
}
```

### Response: ProviderMarketListResponse[](#connectivity-v1/provider/list-markets/response-providermarketlistresponse)

markets `array[string]`

## List provider identifiers[](#connectivity-v1/provider/list-provider-identifiers)

`GET /api/v1/provider-identifiers`

Lists identifiers used to identify a financial institution.

### Works with[](#connectivity-v1/provider/list-provider-identifiers/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `providers:read` |
| User token | `providers:read` |

### Query Parameters[](#connectivity-v1/provider/list-provider-identifiers/query-parameters)

| Parameter | Description |
| --- | --- |
| marketEq | The ISO 3166-1 alpha-2 market code to filter provider mappings by. |
| typeEq | The type of identifier. |
| valueEq | The value of the identifier being mapped. |
| providerNameEq | The name of the provider. |
| pageSize | The number of items to include on each page (default: 50, maximum 1000). |
| pageToken | The value of the nextPageToken from the previous request. |

> Response Example

```
{
  "nextPageToken": "string",
  "providerIdentifiers": [
    {
      "market": "SE",
      "providerName": "string",
      "type": "BLZ",
      "value": "27240004"
    }
  ]
}
```

### Response: ListIdentifiersResponse[](#connectivity-v1/provider/list-provider-identifiers/response-listidentifiersresponse)

nextPageToken `string`

The token to use to request the next page of identifiers.

providerIdentifiers `array[Identifier]`

The identifiers that matched the query.

#### Identifier[](#connectivity-v1/provider/list-provider-identifiers/response-listidentifiersresponse/identifier)

market `string` required

The ISO 3166-1 alpha-2 market code.

providerName `string`

The name of the provider.

type `string` required

The type of identifier represented by the mapping.  
Values: `BLZ`, `BIC`, `SE_CLEARINGNUMBER`, `IBAN`

value `string` required

The value of the identifier mapping.

## List providers[](#connectivity-v1/provider/list-providers)

`GET /api/v1/providers`

Lists all providers available for a authenticated user.

### Works with[](#connectivity-v1/provider/list-providers/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `credentials:read` |

### Query Parameters[](#connectivity-v1/provider/list-providers/query-parameters)

| Parameter | Description |
| --- | --- |
| capability | Use the capability to only list providers with a specific capability. If no capability the provider response will not be filtered on capability.  
Values: `CHECKING_ACCOUNTS`, `CREATE_BENEFICIARIES`, `CREATE_BENEFICIARIES_IN_PAYMENT`, `CREDIT_CARDS`, `IDENTITY_DATA`, `INVESTMENTS`, `LIST_BENEFICIARIES`, `LOANS`, `MORTGAGE_AGGREGATION`, `MORTGAGE_LOAN`, `PAYMENTS`, `SAVINGS_ACCOUNTS`, `TRANSFERS` |
| includeTestProviders | Defaults to false. If set to `true`, Providers of `TEST` type will be added in the response list. |
| excludeNonTestProviders | Defaults to false. If set to `true`, Providers of type different than `TEST` will be removed from the response list. |
| name | Gets a specific provider from the name. If this query parameter is used, only one or no providers will be returned. |
| pisCapability | Use the capability to only list providers with a specific payment capability. If no payment capability the provider response will not be filtered on capability.  
Values: `AUTO_PAYMENT`, `BACS`, `CHAPS`, `CZECH_EXPRESS_INTERNAL_TRANSFER`, `CZECH_INTERNAL_TRANSFER`, `DANISH_DOMESTIC_CREDIT_TRANSFER`, `FASTER_PAYMENTS`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_INTRADAG`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_NORWEGIAN_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_POLISH_DOMESTIC_CREDIT_TRANSFER`, `MULTIBANCO`, `NORWEGIAN_DOMESTIC_CREDIT_TRANSFER`, `PAYMENT_CANCELLATION`, `PAYPAL`, `PIS_BULK_PAYMENTS`, `PIS_FUTURE_DATE`, `PIS_MOBILE_AUTO_SIGN`, `PIS_SE_BANK_TRANSFERS`, `PIS_SE_BG`, `PIS_SE_PG`, `PIS_SEPA_ICT_RECURRING_PAYMENTS`, `PIS_SEPA_RECURRING_PAYMENTS`, `POLISH_DOMESTIC_CREDIT_TRANSFER`, `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER`, `SINGLE_PAYMENT_STATUS_CHECK`, `SWISS_DOMESTIC_CREDIT_TRANSFER`, `VRP_SWEEPING` |

> Response Example

```
{
  "providers": [
    {
      "accessType": "OPEN_BANKING",
      "authenticationFlow": "REDIRECT",
      "authenticationUserType": "PERSONAL",
      "capabilities": [
        "CHECKING_ACCOUNTS"
      ],
      "credentialsType": "THIRD_PARTY_APP",
      "currency": "SEK",
      "displayDescription": "Bink authentication app",
      "displayName": "Bink",
      "fields": [
        {
          "additionalInfo": "string",
          "checkbox": false,
          "description": "string",
          "group": "string",
          "helpText": "string",
          "hint": "string",
          "immutable": false,
          "masked": false,
          "maxLength": 0,
          "minLength": 0,
          "name": "string",
          "numeric": false,
          "oneOf": false,
          "optional": false,
          "pattern": "string",
          "patternError": "string",
          "selectOptions": [
            {
              "iconUrl": "string",
              "text": "string",
              "value": "string"
            }
          ],
          "sensitive": false,
          "style": "string",
          "type": "string",
          "value": "string"
        }
      ],
      "financialInstitutionId": "01234567-1234-1234-1234-123456789123",
      "financialInstitutionName": "Bink",
      "financialServices": [
        {
          "segment": "PERSONAL",
          "shortName": "Personal Banking"
        }
      ],
      "groupDisplayName": "Bink Corp.",
      "hasAuthenticationOptions": false,
      "id": "01234567-1234-1234-1234-123456789123",
      "images": {
        "banner": "https://cdn.tink.se/provider-images/banners/tink.png",
        "icon": "https://cdn.tink.se/provider-images/tink.png"
      },
      "keywords": [
        "string",
        "string"
      ],
      "loginHeaderColour": "#FF0000",
      "market": "SE",
      "multiFactor": true,
      "name": "se-bink-thirdpartyapp",
      "passwordHelpText": "Use the same password as you would in your bank's mobile app.",
      "paymentConditions": [
        "SOURCE_ACCOUNT_REQUIRED_BEFORE_REDIRECT"
      ],
      "pisCapabilities": [
        "SEPA_CREDIT_TRANSFER"
      ],
      "popular": false,
      "rank": 0,
      "releaseStatus": "BETA",
      "status": "ENABLED",
      "transactional": false,
      "type": "BANK"
    }
  ]
}
```

### Response: ProviderListResponse[](#connectivity-v1/provider/list-providers/response-providerlistresponse)

The provider list response object.

providers `array[[Provider](#tag-provider)]` required

List of providers that match the query.

## List providers for a market[](#connectivity-v1/provider/list-providers-for-a-market)

`GET /api/v1/providers/{market}`

Lists all providers on a specified market. Your authentication affects the list of providers you get: When authenticated, the result will only contain providers available for that user. When unauthenticated and without passing The OAuth2 Client ID header, you get all providers made available for the entire environment. If you are unauthenticated but you include The OAuth2 Client ID header, you will get providers available for the app with the given client id.

### Works with[](#connectivity-v1/provider/list-providers-for-a-market/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `providers:read` |
| Client token | `providers:read` |

### Parameters[](#connectivity-v1/provider/list-providers-for-a-market/parameters)

| Parameter | Description |
| --- | --- |
| marketrequired | The ISO 3166-1 alpha-2 market code. |

| Parameter | Description |
| --- | --- |
| X-Tink-OAuth-Client-ID | The OAuth2 Client ID |
| Accept-Language | Language to translate to. An IETF BCP 47 language tag. |

### Query Parameters[](#connectivity-v1/provider/list-providers-for-a-market/query-parameters)

| Parameter | Description |
| --- | --- |
| includeTestProviders | Defaults to false. If set to `true`, Providers of `TEST` type will be added in the response list. |
| excludeNonTestProviders | Defaults to false. If set to `true`, Providers of type different than `TEST` will be removed from the response list. |
| capability | Use the capability to only list providers with a specific capability. If no capability the provider response will not be filtered on capability.  
Values: `CHECKING_ACCOUNTS`, `CREATE_BENEFICIARIES`, `CREATE_BENEFICIARIES_IN_PAYMENT`, `CREDIT_CARDS`, `IDENTITY_DATA`, `INVESTMENTS`, `LIST_BENEFICIARIES`, `LOANS`, `MORTGAGE_AGGREGATION`, `MORTGAGE_LOAN`, `PAYMENTS`, `SAVINGS_ACCOUNTS`, `TRANSFERS` |
| pisCapability | Use the capability to only list providers with a specific payment capability. If no payment capability the provider response will not be filtered on capability.  
Values: `AUTO_PAYMENT`, `BACS`, `CHAPS`, `CZECH_EXPRESS_INTERNAL_TRANSFER`, `CZECH_INTERNAL_TRANSFER`, `DANISH_DOMESTIC_CREDIT_TRANSFER`, `FASTER_PAYMENTS`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_INTRADAG`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_NORWEGIAN_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_POLISH_DOMESTIC_CREDIT_TRANSFER`, `MULTIBANCO`, `NORWEGIAN_DOMESTIC_CREDIT_TRANSFER`, `PAYMENT_CANCELLATION`, `PAYPAL`, `PIS_BULK_PAYMENTS`, `PIS_FUTURE_DATE`, `PIS_MOBILE_AUTO_SIGN`, `PIS_SE_BANK_TRANSFERS`, `PIS_SE_BG`, `PIS_SE_PG`, `PIS_SEPA_ICT_RECURRING_PAYMENTS`, `PIS_SEPA_RECURRING_PAYMENTS`, `POLISH_DOMESTIC_CREDIT_TRANSFER`, `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER`, `SINGLE_PAYMENT_STATUS_CHECK`, `SWISS_DOMESTIC_CREDIT_TRANSFER`, `VRP_SWEEPING` |

> Response Example

```
{
  "providers": [
    {
      "accessType": "OPEN_BANKING",
      "authenticationFlow": "REDIRECT",
      "authenticationUserType": "PERSONAL",
      "capabilities": [
        "CHECKING_ACCOUNTS"
      ],
      "credentialsType": "THIRD_PARTY_APP",
      "currency": "SEK",
      "displayDescription": "Bink authentication app",
      "displayName": "Bink",
      "fields": [
        {
          "additionalInfo": "string",
          "checkbox": false,
          "description": "string",
          "group": "string",
          "helpText": "string",
          "hint": "string",
          "immutable": false,
          "masked": false,
          "maxLength": 0,
          "minLength": 0,
          "name": "string",
          "numeric": false,
          "oneOf": false,
          "optional": false,
          "pattern": "string",
          "patternError": "string",
          "selectOptions": [
            {
              "iconUrl": "string",
              "text": "string",
              "value": "string"
            }
          ],
          "sensitive": false,
          "style": "string",
          "type": "string",
          "value": "string"
        }
      ],
      "financialInstitutionId": "01234567-1234-1234-1234-123456789123",
      "financialInstitutionName": "Bink",
      "financialServices": [
        {
          "segment": "PERSONAL",
          "shortName": "Personal Banking"
        }
      ],
      "groupDisplayName": "Bink Corp.",
      "hasAuthenticationOptions": false,
      "id": "01234567-1234-1234-1234-123456789123",
      "images": {
        "banner": "https://cdn.tink.se/provider-images/banners/tink.png",
        "icon": "https://cdn.tink.se/provider-images/tink.png"
      },
      "keywords": [
        "string",
        "string"
      ],
      "loginHeaderColour": "#FF0000",
      "market": "SE",
      "multiFactor": true,
      "name": "se-bink-thirdpartyapp",
      "passwordHelpText": "Use the same password as you would in your bank's mobile app.",
      "paymentConditions": [
        "SOURCE_ACCOUNT_REQUIRED_BEFORE_REDIRECT"
      ],
      "pisCapabilities": [
        "SEPA_CREDIT_TRANSFER"
      ],
      "popular": false,
      "rank": 0,
      "releaseStatus": "BETA",
      "status": "ENABLED",
      "transactional": false,
      "type": "BANK"
    }
  ]
}
```

### Response: ProviderListResponse[](#connectivity-v1/provider/list-providers-for-a-market/response-providerlistresponse)

The provider list response object.

providers `array[[Provider](#tag-provider)]` required

List of providers that match the query.

## Provider Consent[](#connectivity-v1/provider-consent)

The Provider Consent gives details about the state of a user's consents towards financial institutions.

### The Provider Consent model[](#connectivity-v1/provider-consent/the-provider-consent-model)

accountIds `array[string]`

List of internal account-ids related to this credential associated with this provider consent

credentialsId `string`

credentialsId of the credential associated with this provider consent.

detailedError `ConnectivityErrorResponse`

Indicates the ConnectivityError on this provider consent if it exists.

providerName `string`

The provider (financial institution) that the provider consent is connected to.

sessionExpiryDate `Date`

Indicates when the session for the credential associated with this provider consent will expire. The session can be renewed before or after this date by triggering either manual authentication of credentials or reconfirmation without authentication (for eligible credentials). After this date automatic refreshes for this credential will not be possible without new authentication or reconfirmation from the user.

sessionExtendable `boolean`

\[BETA\] Used to determine whether the consent session can be extended (reconfirmed without authentication).

status `string`

The status indicates the state of the provider consent.  
Values: `CREATED`, `AUTHENTICATING`, `AWAITING_MOBILE_BANKID_AUTHENTICATION`, `AWAITING_SUPPLEMENTAL_INFORMATION`, `UPDATING`, `UPDATED`, `AUTHENTICATION_ERROR`, `TEMPORARY_ERROR`, `PERMANENT_ERROR`, `AWAITING_THIRD_PARTY_APP_AUTHENTICATION`, `DELETED`, `SESSION_EXPIRED`

statusUpdated `Date`

A timestamp of when the status of the credential associated with this provider consent was last modified.

#### ConnectivityErrorResponse[](#connectivity-v1/provider-consent/the-provider-consent-model/connectivityerrorresponse)

details `ConnectivityErrorDetailsResponse`

Details of the error.

displayMessage `string`

Display message for end-user.

type `string`

General type of the error.  
Values: `UNKNOWN_ERROR`, `TINK_SIDE_ERROR`, `PROVIDER_ERROR`, `USER_LOGIN_ERROR`, `AUTHORIZATION_ERROR`, `ACCOUNT_INFORMATION_ERROR`

#### ConnectivityErrorDetailsResponse[](#connectivity-v1/provider-consent/the-provider-consent-model/connectivityerrordetailsresponse)

reason `string`

Detailed reason for the error.

retryable `boolean`

\[BETA\] Indicates whether the operation is retryable.

## Extend a consentBeta[](#connectivity-v1/provider-consent/extend-a-consent)

`POST /api/v1/provider-consents:extend`

Extend a consent that is eligible for reconfirmation (sessionExtendable attribute).

### Works with[](#connectivity-v1/provider-consent/extend-a-consent/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `provider-consents:write` |

> Request Example

```
{
  "credentialsId": "6e68cc6287704273984567b3300c5822"
}
```

### Request Body: ProviderConsentExtendRequest[](#connectivity-v1/provider-consent/extend-a-consent/request-body-providerconsentextendrequest)

The request object.

credentialsId `string` required

The provider consent credentialsId to extend

> Response Example

```
{
  "accountIds": [
    "6696428766444944ab19f7756376d363",
    "9bdd7d50c1f14946b6d22b198d1696b4"
  ],
  "credentialsId": "6e68cc6287704273984567b3300c5822",
  "detailedError": {
    "details": {
      "reason": "STATIC_CREDENTIALS_INCORRECT",
      "retryable": true
    },
    "displayMessage": "The bank rejected the login credentials that you entered.",
    "type": "USER_LOGIN_ERROR"
  },
  "providerName": "uk-demobank-open-banking-redirect",
  "sessionExpiryDate": 1493379467000,
  "sessionExtendable": true,
  "status": "UPDATED",
  "statusUpdated": 1493379467000
}
```

### Response: [ProviderConsent](#tag-providerconsent)[](#connectivity-v1/provider-consent/extend-a-consent/response-providerconsent)

The Provider Consent gives details about the state of a user's consents towards financial institutions.

See [ProviderConsent](#tag-providerconsent) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | The provider-consent was successfully extended and returned. |
| 400 | The provider-consent was not eligible for extension. |
| 401 | The user could not be authenticated. |
| 403 | You do not have the permission to access this. |
| 404 | Provider-consent not found. |

## List Provider Consents[](#connectivity-v1/provider-consent/list-provider-consents)

`GET /api/v1/provider-consents`

List all provider consents for the user

### Works with[](#connectivity-v1/provider-consent/list-provider-consents/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `provider-consents:read` |

### Query Parameters[](#connectivity-v1/provider-consent/list-provider-consents/query-parameters)

| Parameter | Description |
| --- | --- |
| credentialsId | Optional credentials identifier filter |

> Response Example

```
{
  "providerConsents": [
    {
      "accountIds": [
        "6696428766444944ab19f7756376d363",
        "9bdd7d50c1f14946b6d22b198d1696b4"
      ],
      "credentialsId": "6e68cc6287704273984567b3300c5822",
      "detailedError": {
        "details": {
          "reason": "STATIC_CREDENTIALS_INCORRECT",
          "retryable": true
        },
        "displayMessage": "The bank rejected the login credentials that you entered.",
        "type": "USER_LOGIN_ERROR"
      },
      "providerName": "uk-demobank-open-banking-redirect",
      "sessionExpiryDate": 1493379467000,
      "sessionExtendable": true,
      "status": "UPDATED",
      "statusUpdated": 1493379467000
    }
  ]
}
```

### Response: ProviderConsentListResponse[](#connectivity-v1/provider-consent/list-provider-consents/response-providerconsentlistresponse)

providerConsents `array[[ProviderConsent](#tag-providerconsent)]`

A list of provider consents

| Status Code | Description |
| --- | --- |
| 200 | The provider-consent was successfully returned. |
| 401 | The user could not be authenticated. |
| 403 | You do not have the permission to access this. |
