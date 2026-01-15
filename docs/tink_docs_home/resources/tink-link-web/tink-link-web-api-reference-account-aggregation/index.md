---
title: "Tink Link Reference (Account Aggregation)"
source: "/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-api-reference-account-aggregation/"
exportedAt: "2026-01-13T12:55:47.555Z"
---
You can get access to the Tink's products and APIs using Tink Link, which uses industry standard OAuth 2.0 authentication methods for transparent and secure access to user data.

From a high level, this is how Tink Link for web works:

1.  You direct the end user to the respective `https://link.tink.com/...` flow
2.  The end user completes the Tink Link flow by choosing a bank, consenting and authenticating
3.  The end user is taken back to your application's `redirect_uri` with the result of the operation

## Snapshot aggregation[](#snapshot-aggregation)

`https://link.tink.com/1.0/authorize`

#### Authorize: Request parameters[](#authorize-request-parameters)

| Parameter | Required | Description |
| --- | --- | --- |
| `client_id` | Required | Your client ID (retrieved from [Console](https://console.tink.com/)). |
| `redirect_uri` | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in [Console](https://console.tink.com/)). |
| scope | Optional | A comma separated list of OAuth scopes (eg. `accounts:read,transactions:read`). By default, the ACCOUNTS, EINVOICES, and TRANSFER\_DESTINATIONS refreshable items will be included. In addition, you can also include TRANSACTIONAL\_ACCOUNTS\_AND\_TRANSACTIONS and IDENTITY\_DATA by specifying `transactions:read` and `identity:read` respectively. |
| `market` | Optional (default `SE`) | The market code for the country Tink should list providers for. See [supported markets](#supported-markets). |
| `locale` | Optional (default `en_US`) | The locale used for UI text. See [supported locales](#supported-locales). |
| `state` | Optional, but recommended | Helps defend against Cross-Site Request Forgery (CSRF) attacks. To use `state`, provide a randomized `state` value when initiating the SDK. Tink will return this value in the callback after a successful grant. You can then compare this value to the value in your request to ensure it came from your app. |
| `session_id` | Optional | Used to securely configure Tink Link, prefill data or apply merchant customization. See [sessions](/Tiny-doc/tink_docs_api/api/#general/tink-link/session). |
| `input_username` | Optional | Prefills the username field for supported providers. Useful when the username is a personal identifier that could be valid for multiple banks, such as a social security number. |
| `input_provider` | Optional | The unique name of the provider (ex: `sbab-bankid`). If provided, user can skip provider selection. Otherwise, they will choose the provider from a list in the Tink UI. If `input_provider` is invalid, Tink will throw an error. Make sure you have the right provider name by using the [List Providers endpoint](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider/list-providers). |
| `iframe` | Optional (default `false`) | Should be used if Tink Link is embedded inside an iframe. If the parameter is set to `true`, the redirect with the authentication `code` will be replaced by a `postMessage` to the parent. Note that iframe embedding can be made available after verifying your developer account. For more information, contact [Support](https://support.tink.com/). `redirect_uri` is used for validating the hosting page. |
| `app_uri` | Optional | The deep link for an Android or iOS hosting app. Use when Tink Link is embedded in an [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/)/[iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) app to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| `theme` | Optional | Specifying `LIGHT` or `DARK` overrides the user’s system preference and displays the specified theme. Requires both themes to be configured to have any effect. Reach out to [support](/Tiny-doc/tink_docs_home/resources/support/) to enable dark theme. |

The resulting Tink Link URL with the request parameters:

```
https://link.tink.com/1.0/authorize?client_id={YOUR_CLIENT_ID}&redirect_uri=http://localhost:3000/callback&market=GB&locale=en_GB&scope=accounts:read,transactions:read
```

#### Authorize: Response parameters (success)[](#authorize-response-parameters-success-)

| Parameter | Required | Description |
| --- | --- | --- |
| code | Required | The authorization code to be exchanged for an user access token to access the user's data. |
| credentials\_id | Required | The identifier of the created credentials. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

The result is delivered to the specified `redirect_uri` with the success response parameters:

```
http://localhost:3000/callback?code=6915ab99857fec1e6f2f6c078&credentials_id=b189db88c1dc4ac3a95f4308527e6362
```

#### Authorize: Response parameters (failure)[](#authorize-response-parameters-failure-)

| Parameter | Required | Description |
| --- | --- | --- |
| `error` | Required | An enumerable value defined in the Errors section below. |
| `message` | Required | A developer facing error message describing the error. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |
| `credentials` | If credentials were provided | The identifier of the created credentials. |

```
http://localhost:3000/callback?error=INTERNAL_ERROR&message=Something%20went%20wrong%2E&credentials=9d547e5b7b1442658878843539a32148
```

```
{
  "type": "error",
  "error": {
    "status": "USER_CANCELLED",
    "message": "The user cancelled the authentication",
    "credentialsId": "9d547e5b7b1442658878843539a32148"
  }
}
```

## Permanent user aggregation[](#permanent-user-aggregation)

### Add credentials[](#add-credentials)

`https://link.tink.com/1.0/credentials/add`

#### Add credentials: Request parameters[](#add-credentials-request-parameters)

| Parameter | Required | Description |
| --- | --- | --- |
| `client_id` | Required | Your client ID (retrieved from [Console](https://console.tink.com/)). |
| `redirect_uri` | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in [Console](https://console.tink.com/)). |
| `authorization_code` | Required | The created `USER_AUTHORIZATION_CODE` (see [generating a user authorization code](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/#generate-a-user-authorization-code)). |
| scope | Optional | A comma separated list of OAuth scopes (eg. `accounts:read,transactions:read`). By default, the ACCOUNTS, EINVOICES, and TRANSFER\_DESTINATIONS refreshable items will be included. In addition, you can also include TRANSACTIONAL\_ACCOUNTS\_AND\_TRANSACTIONS and IDENTITY\_DATA by specifying `transactions:read` and `identity:read` respectively. |
| `market` | Optional (default `SE`) | The market code for the country Tink should list providers for. See [supported markets](#supported-markets). |
| `locale` | Optional (default `en_US`) | The locale used for UI text. See [supported locales](#supported-locales). |
| `state` | Optional, but recommended | Helps defend against Cross-Site Request Forgery (CSRF) attacks. To use `state`, provide a randomized `state` value when initiating the SDK. Tink will return this value in the callback after a successful grant. You can then compare this value to the value in your request to ensure it came from your app. |
| `session_id` | Optional | Used to securely configure Tink Link, prefill data or apply merchant customization. See [sessions](/Tiny-doc/tink_docs_api/api/#general/tink-link/session). |
| `input_username` | Optional | Prefills the username field for supported providers. Useful when the username is a personal identifier that could be valid for multiple banks, such as a social security number. |
| `input_provider` | Optional | The unique name of the provider (ex: `sbab-bankid`). If provided, user can skip provider selection. Otherwise, they will choose the provider from a list in the Tink UI. If `input_provider` is invalid, Tink will throw an error. Make sure you have the right provider name by using the [List Providers endpoint](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider/list-providers). |
| `iframe` | Optional (default `false`) | Should be used if Tink Link is embedded inside an iframe. If the parameter is set to `true`, the redirect with the authentication `code` will be replaced by a `postMessage` to the parent. Note that iframe embedding can be made available after verifying your developer account. For more information, contact [Support](https://support.tink.com/). `redirect_uri` is used for validating the hosting page. |
| `app_uri` | Optional | The deep link for an Android or iOS hosting app. Use when Tink Link is embedded in an [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/)/[iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) app to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| `theme` | Optional | Specifying `LIGHT` or `DARK` overrides the user’s system preference and displays the specified theme. Requires both themes to be configured to have any effect. Reach out to [support](/Tiny-doc/tink_docs_home/resources/support/) to enable dark theme. |

The resulting Tink Link URL with the request parameters:

```
https://link.tink.com/1.0/credentials/add?client_id={YOUR_CLIENT_ID}&redirect_uri=http://localhost:3000/callback&authorization_code={USER_AUTHORIZATION_CODE}&scope=accounts:read,transactions:read
```

#### Add credentials: Response parameters (success)[](#add-credentials-response-parameters-success-)

| Parameter | Required | Description |
| --- | --- | --- |
| credentials\_id | Required | The identifier of the created credentials. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

The result is delivered to the specified `redirect_uri` with the success response parameters:

```
http://localhost:3000/callback?credentials_id=6915ab99857fec1e6f2f6c078
```

#### Add credentials: Response parameters (failure)[](#add-credentials-response-parameters-failure-)

| Parameter | Required | Description |
| --- | --- | --- |
| `error` | Required | An enumerable value defined in the Errors section below. |
| `message` | Required | A developer facing error message describing the error. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |
| `credentials` | If credentials were provided | The identifier of the created credentials. |

```
http://localhost:3000/callback?error=INTERNAL_ERROR&message=Something%20went%20wrong%2E&credentials=9d547e5b7b1442658878843539a32148
```

```
{
  "type": "error",
  "error": {
    "status": "USER_CANCELLED",
    "message": "The user cancelled the authentication",
    "credentialsId": "9d547e5b7b1442658878843539a32148"
  }
}
```

### Refresh credentials[](#refresh-credentials)

`https://link.tink.com/1.0/credentials/refresh`

#### Refresh credentials: Request parameters[](#refresh-credentials-request-parameters)

| Parameter | Required | Description |
| --- | --- | --- |
| `client_id` | Required | Your client ID (retrieved from [Console](https://console.tink.com/)). |
| `redirect_uri` | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in [Console](https://console.tink.com/)). |
| `authorization_code` | Required | The created `USER_AUTHORIZATION_CODE` (see [generating a user authorization code](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/#generate-a-user-authorization-code)). |
| credentials\_id | Required | The identifier of the credentials to refresh. |
| authenticate | Optional (default `false`) | If set to true, the user will be requested to perform a full authentication flow to renew refresh tokens with ASPSPs. |
| `state` | Optional, but recommended | Helps defend against Cross-Site Request Forgery (CSRF) attacks. To use `state`, provide a randomized `state` value when initiating the SDK. Tink will return this value in the callback after a successful grant. You can then compare this value to the value in your request to ensure it came from your app. |
| `iframe` | Optional (default `false`) | Should be used if Tink Link is embedded inside an iframe. If the parameter is set to `true`, the redirect with the authentication `code` will be replaced by a `postMessage` to the parent. Note that iframe embedding can be made available after verifying your developer account. For more information, contact [Support](https://support.tink.com/). `redirect_uri` is used for validating the hosting page. |
| `app_uri` | Optional | The deep link for an Android or iOS hosting app. Use when Tink Link is embedded in an [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/)/[iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) app to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| `theme` | Optional | Specifying `LIGHT` or `DARK` overrides the user’s system preference and displays the specified theme. Requires both themes to be configured to have any effect. Reach out to [support](/Tiny-doc/tink_docs_home/resources/support/) to enable dark theme. |

#### Refresh credentials: Response parameters (success)[](#refresh-credentials-response-parameters-success-)

| Parameter | Required | Description |
| --- | --- | --- |
| credentials\_id | Required | The identifier of the created credentials. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

The result is delivered to the specified `redirect_uri` with the success response parameters:

```
http://localhost:3000/callback?credentials_id=6915ab99857fec1e6f2f6c078
```

#### Refresh credentials: Response parameters (failure)[](#refresh-credentials-response-parameters-failure-)

| Parameter | Required | Description |
| --- | --- | --- |
| `error` | Required | An enumerable value defined in the Errors section below. |
| `message` | Required | A developer facing error message describing the error. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |
| `credentials` | Always | The identifier of the credentials. |

```
http://localhost:3000/callback?error=INTERNAL_ERROR&message=Something%20went%20wrong%2E&credentials=9d547e5b7b1442658878843539a32148
```

```
{
  "type": "error",
  "error": {
    "status": "USER_CANCELLED",
    "message": "The user cancelled the authentication",
    "credentialsId": "9d547e5b7b1442658878843539a32148"
  }
}
```

### Authenticate credentials[](#authenticate-credentials)

`https://link.tink.com/1.0/credentials/authenticate`

#### Authenticate credentials: Request parameters[](#authenticate-credentials-request-parameters)

| Parameter | Required | Description |
| --- | --- | --- |
| `client_id` | Required | Your client ID (retrieved from [Console](https://console.tink.com/)). |
| `redirect_uri` | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in [Console](https://console.tink.com/)). |
| `authorization_code` | Required | The created `USER_AUTHORIZATION_CODE` (see [generating a user authorization code](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/#generate-a-user-authorization-code)). |
| credentials\_id | Required | The identifier of the credentials to refresh. |
| `state` | Optional, but recommended | Helps defend against Cross-Site Request Forgery (CSRF) attacks. To use `state`, provide a randomized `state` value when initiating the SDK. Tink will return this value in the callback after a successful grant. You can then compare this value to the value in your request to ensure it came from your app. |
| `iframe` | Optional (default `false`) | Should be used if Tink Link is embedded inside an iframe. If the parameter is set to `true`, the redirect with the authentication `code` will be replaced by a `postMessage` to the parent. Note that iframe embedding can be made available after verifying your developer account. For more information, contact [Support](https://support.tink.com/). `redirect_uri` is used for validating the hosting page. |
| `app_uri` | Optional | The deep link for an Android or iOS hosting app. Use when Tink Link is embedded in an [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/)/[iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) app to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| `theme` | Optional | Specifying `LIGHT` or `DARK` overrides the user’s system preference and displays the specified theme. Requires both themes to be configured to have any effect. Reach out to [support](/Tiny-doc/tink_docs_home/resources/support/) to enable dark theme. |

#### Authenticate credentials: Response parameters (success)[](#authenticate-credentials-response-parameters-success-)

| Parameter | Required | Description |
| --- | --- | --- |
| credentials\_id | Required | The identifier of the created credentials. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

The result is delivered to the specified `redirect_uri` with the success response parameters:

```
http://localhost:3000/callback?credentials_id=6915ab99857fec1e6f2f6c078
```

#### Authenticate credentials: Response parameters (failure)[](#authenticate-credentials-response-parameters-failure-)

| Parameter | Required | Description |
| --- | --- | --- |
| `error` | Required | An enumerable value defined in the Errors section below. |
| `message` | Required | A developer facing error message describing the error. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |
| `credentials` | Always | The identifier of the credentials. |

### Extend consent[](#extend-consent)

`https://link.tink.com/1.0/credentials/extend-consent`

#### Extend consent: Request parameters[](#extend-consent-request-parameters)

| Parameter | Required | Description |
| --- | --- | --- |
| `client_id` | Required | Your client ID (retrieved from [Console](https://console.tink.com/)). |
| `redirect_uri` | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in [Console](https://console.tink.com/)). |
| `authorization_code` | Required | The created `USER_AUTHORIZATION_CODE` (see [generating a user authorization code](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/#generate-a-user-authorization-code)). |
| credentials\_id | Required | The identifier of the credentials to extend consent for. |
| `state` | Optional, but recommended | Helps defend against Cross-Site Request Forgery (CSRF) attacks. To use `state`, provide a randomized `state` value when initiating the SDK. Tink will return this value in the callback after a successful grant. You can then compare this value to the value in your request to ensure it came from your app. |
| `iframe` | Optional (default `false`) | Should be used if Tink Link is embedded inside an iframe. If the parameter is set to `true`, the redirect with the authentication `code` will be replaced by a `postMessage` to the parent. Note that iframe embedding can be made available after verifying your developer account. For more information, contact [Support](https://support.tink.com/). `redirect_uri` is used for validating the hosting page. |
| `app_uri` | Optional | The deep link for an Android or iOS hosting app. Use when Tink Link is embedded in an [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/)/[iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) app to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| `theme` | Optional | Specifying `LIGHT` or `DARK` overrides the user’s system preference and displays the specified theme. Requires both themes to be configured to have any effect. Reach out to [support](/Tiny-doc/tink_docs_home/resources/support/) to enable dark theme. |

#### Extend consent: Response parameters (success)[](#extend-consent-response-parameters-success-)

| Parameter | Required | Description |
| --- | --- | --- |
| `credentials_id` | Always | The identifier of the created or updated credentials. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

The result is delivered to the specified `redirect_uri` with the success response parameters:

```
http://localhost:3000/callback?credentials_id=6915ab99857fec1e6f2f6c078
```

#### Extend consent: Response parameters (failure)[](#extend-consent-response-parameters-failure-)

| Parameter | Required | Description |
| --- | --- | --- |
| `error` | Required | An enumerable value defined in the Errors section below. |
| `message` | Required | A developer facing error message describing the error. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |
| `credentials` | Always | The identifier of the credentials. |

```
http://localhost:3000/callback?error=INTERNAL_ERROR&message=Something%20went%20wrong%2E&credentials=9d547e5b7b1442658878843539a32148
```

```
{
  "type": "error",
  "error": {
    "status": "USER_CANCELLED",
    "message": "The user cancelled the authentication",
    "credentialsId": "9d547e5b7b1442658878843539a32148"
  }
}
```

## Errors[](#errors)

| Status | Description |
| --- | --- |
| BAD\_REQUEST | The Tink Link URL was incorrectly configured. |
| USER\_CANCELLED | The end user cancelled the flow. |
| AUTHENTICATION\_ERROR | The end user did not successfully authenticate towards the financial institution. Further information can be found in the `status` and `statusPayload` fields of the `Credentials` object available in the `data` parameter. |
| INTERNAL\_ERROR | An internal error within the Tink service. Please [contact support](/Tiny-doc/tink_docs_home/resources/getting-started/support/) for help. |
| TEMPORARY\_ERROR | A temporary error with the Tink services. Please try again. |

## Markets[](#markets)

The following markets are supported by Tink Link. You can find the available providers by market in our [market capabilities listing](/Tiny-doc/tink_docs_home/market-capabilities/).

| Market | Name |
| --- | --- |
| `AT` | Austria |
| `BE` | Belgium |
| `DE` | Germany |
| `DK` | Denmark |
| `EE` | Estonia |
| `ES` | Spain |
| `FI` | Finland |
| `FR` | France |
| `GB` | United Kingdom |
| `IE` | Ireland |
| `IT` | Italy |
| `LT` | Lithuania |
| `LV` | Latvia |
| `NL` | Netherlands |
| `NO` | Norway |
| `PL` | Poland |
| `PT` | Portugal |
| `SE` | Sweden |

## Locales[](#locales)

The following locales are supported by Tink Link.

| Locale | Name |
| --- | --- |
| `da_DK` | Danish |
| `de_DE` | German |
| `en_US` | English (US) |
| `en_GB` | English (UK) |
| `es_ES` | Spanish |
| `fi_FI` | Finnish |
| `fr_FR` | French |
| `it_IT` | Italian |
| `nl_NL` | Dutch |
| `no_NO` | Norwegian |
| `pt_PT` | Portuguese |
| `pl_PL` | Polish |
| `sv_SE` | Swedish |
| `et_EE` | Estonian |
| `lt_LT` | Lithuanian |
| `lv_LV` | Latvian |

## Versions[](#versions)

As we build technology to support the future of financial services, some of our older Tink Link versions are no longer recommended for use. If you are on a deprecated version, find the documentation and upgrade instructions in the [Tink Link documentation](/Tiny-doc/tink_docs_home/resources/tink-link-web/).

New fields and parameters are continuously added, but the API will remain backwards compatible with this specification until deprecated. Please note that unknown fields and parameters not listed in this documentation may be present.

| Version | Status | Date Introduced | Available Until |
| --- | --- | --- | --- |
| 1.0 | `Available` | June 10th, 2019 | TBD |
| 0.5 | `Available` | June 10th, 2019 | TBD |
| 0.4 | `Available` | 2018 | TBD |
| 0.3 | `End of life` | 2015 | Jun 31st, 2020 |
| 0.2 | `End of life` | 2015 | Jun 31st, 2020 |
| 0.1 | `End of life` | 2015 | Jun 31st, 2020 |

## Browser Support[](#browser-support)

| Browser | Versions |
| --- | --- |
| Chrome for Android | `86` |
| Firefox for Android | `82` |
| Safari for iOS | `14, 13.3-13.7, 12.2-12.4, 10.3, 9.3` |
| Chrome | `83-86, 80, 49` |
| Edge | `86, 85, 18` |
| Firefox | `82, 81` |
| Opera | `71` |
| Safari | `14, 13.1, 13` |
| Samsung | `12.0` |

Some browsers and older browser versions are no longer recommended for use together with Tink Link. Tink Link could still function together with browsers and versions that are not listed here, despite us not including them in our quality assurance checks.
