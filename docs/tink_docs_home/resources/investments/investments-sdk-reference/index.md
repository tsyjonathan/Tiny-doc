---
title: "Investments SDK reference - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/investments/investments-sdk-reference/"
exportedAt: "2026-01-13T12:45:16.800Z"
---
## One-time access: Connect accounts[](#one-time-access-connect-accounts)

Connect accounts base URL

```
https://link.tink.com/1.0/products/connect-accounts
```

### URL parameters[](#url-parameters)

Use these parameters when building the SDK URL. Then, integrate the URL into your website or app to have your end user start their journey.

| Parameter | Required | Description |
| --- | --- | --- |
| `client_id` | Required | Your client ID (retrieved from [Console](https://console.tink.com/)). |
| `products` | Required | A comma separated list of products for which to aggregate data (`ACCOUNT_CHECK`, `INVESTMENTS`, `LOANS`, `TRANSACTIONS`). |
| `redirect_uri` | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in [Console](https://console.tink.com/)). |
| `app_uri` | Optional | The deep link for an Android or iOS hosting app. Use when Tink Link is embedded in an [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/)/[iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) app to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| `auto_redirect_mobile` | Optional, but recommended for mobile integrations | Use for [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/) or [iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) integrations. When `TRUE`, this will directly open the bank app during the authentication step if installed on the user's device or otherwise fall back to a web-based authentication flow in the system's default browser. |
| `financial_services_segments` | Optional (default `PERSONAL`) | A comma separated list of financial services segments (`PERSONAL`, `BUSINESS`). |
| `financial_institution_id` | Optional | Identifier of the financial institution to preselect, otherwise the user will be presented with a list of financial institutions. |
| `input_provider` | Optional | The unique name of the provider (ex: `sbab-bankid`). If provided, user can skip provider selection. Otherwise, they will choose the provider from a list in the Tink UI. If `input_provider` is invalid, Tink will throw an error. Make sure you have the right provider name by using the [List Providers endpoint](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider/list-providers). |
| `input_username` | Optional | Prefills the username field for supported providers. Useful when the username is a personal identifier that could be valid for multiple banks, such as a social security number. |
| `locale` | Optional (default `en_US`) | The locale used for UI text. See [supported locales](#supported-locales). |
| `market` | Optional (default `SE`) | The market code for the country Tink should list providers for. See [supported markets](#supported-markets). |
| refreshable\_items | Optional | A comma separated list of [refreshable items](/Tiny-doc/tink_docs_api/api/#connectivity-v1/credentials/create-credentials/query-parameters) specifying the data types to aggregate overriding the default list of refreshable items for the respective products. |
| `session_id` | Optional | Used to securely configure Tink Link, prefill data or apply merchant customization. See [sessions](/Tiny-doc/tink_docs_api/api/#general/tink-link/session). |
| `state` | Optional, but recommended | Helps defend against Cross-Site Request Forgery (CSRF) attacks. To use `state`, provide a randomized `state` value when initiating the SDK. Tink will return this value in the callback after a successful grant. You can then compare this value to the value in your request to ensure it came from your app. |
| `theme` | Optional | Specifying `LIGHT` or `DARK` overrides the user’s system preference and displays the specified theme. Requires both themes to be configured to have any effect. Reach out to [support](/Tiny-doc/tink_docs_home/resources/support/) to enable dark theme. |

Example URL

```
https://link.tink.com/1.0/products/connect-accounts?client_id=&products=INVESTMENTS,TRANSACTIONS&redirect_uri=http://localhost:3000/callback&market=GB
```

### Success response parameters[](#success-response-parameters)

Tink appends the following parameters to the `redirect_uri` after a successful SDK journey.

| Parameter | Availability | Description |
| --- | --- | --- |
| `code` | Always | The authorization code to be exchanged for an user access token to access the user's data. |
| `credentials_id` | Always | The identifier of the created or updated credentials. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

Example success response

```
http://localhost:3000/callback?code=b189db88c1dc4ac3a95f4308527e6362&credentials_id=6915ab99857fec1e6f2f6c078
```

### Error response parameters[](#error-response-parameters)

Tink appends the following parameters to the `redirect_uri` if the SDK journey ends in an error.

| Parameter | Availability | Description |
| --- | --- | --- |
| `error` | Always | A status code that describes the category of the error. For details, see [error statuses](/Tiny-doc/tink_docs_home/resources/investments/handle-investments-error-codes/#error-statuses). |
| `error_reason` | Always | The error reason that describes the cause of the error. For details, see the error reasons for the respective [error status](/Tiny-doc/tink_docs_home/resources/investments/handle-investments-error-codes/#error-statuses). |
| `error_type` | If `error=AUTHENTICATION_ERROR` | Describes the type of authentication error that has occurred. For details, see [provider consent errors](/Tiny-doc/tink_docs_home/resources/transactions/provider-consent-errors/). |
| `message` | Always | A localized end-user facing error message that can be directly presented to the end user. |
| `tracking_id` | Always | Tink's internal identifier for this specific error instance. |
| `credentials` | If credentials were created | The identifier of the created credentials object. |
| `provider_name` | If a provider was selected | The identifier of the selected provider or bank connection. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

Example error response

```
http://localhost:3000/callback?
    error=BAD_REQUEST&
    error_reason=INVALID_PARAMETER_CLIENT_ID&
    message=We%E2%80%99re%20sorry%2C%20but%20an%20error%20has%20occurred.&
    tracking_id=83526f84-226a-43cc-ae2d-2747f394d71b
```

## Continuous access: Connect accounts[](#continuous-access-connect-accounts)

Connect accounts base URL

```
https://link.tink.com/1.0/products/connect-accounts
```

### URL parameters[](#url-parameters)

Use these parameters when building the SDK URL. Then, integrate the URL into your website or app to have your end user start their journey.

| Parameter | Required | Description |
| --- | --- | --- |
| `authorization_code` | Required | The created `USER_AUTHORIZATION_CODE` (see [generating a user authorization code](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/#generate-a-user-authorization-code)). |
| `client_id` | Required | Your client ID (retrieved from [Console](https://console.tink.com/)). |
| products | Required | A comma separated list of products for which to aggregate data (`ACCOUNT_CHECK`, `INVESTMENTS`, `LOANS`, `TRANSACTIONS`). |
| `redirect_uri` | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in [Console](https://console.tink.com/)). |
| `app_uri` | Optional | The deep link for an Android or iOS hosting app. Use when Tink Link is embedded in an [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/)/[iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) app to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| `auto_redirect_mobile` | Optional, but recommended for mobile integrations | Use for [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/) or [iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) integrations. When `TRUE`, this will directly open the bank app during the authentication step if installed on the user's device or otherwise fall back to a web-based authentication flow in the system's default browser. |
| `financial_services_segments` | Optional (default `PERSONAL`) | A comma separated list of financial services segments (`PERSONAL`, `BUSINESS`). |
| `financial_institution_id` | Optional | Identifier of the financial institution to preselect, otherwise the user will be presented with a list of financial institutions. |
| `input_provider` | Optional | The unique name of the provider (ex: `sbab-bankid`). If provided, user can skip provider selection. Otherwise, they will choose the provider from a list in the Tink UI. If `input_provider` is invalid, Tink will throw an error. Make sure you have the right provider name by using the [List Providers endpoint](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider/list-providers). |
| `input_username` | Optional | Prefills the username field for supported providers. Useful when the username is a personal identifier that could be valid for multiple banks, such as a social security number. |
| `locale` | Optional (default `en_US`) | The locale used for UI text. See [supported locales](#supported-locales). |
| `market` | Optional (default `SE`) | The market code for the country Tink should list providers for. See [supported markets](#supported-markets). |
| `refreshable_items` | Optional | A comma separated list of [refreshable items](/Tiny-doc/tink_docs_api/api/#connectivity-v1/credentials/create-credentials/query-parameters) specifying the data types to aggregate overriding the default list of refreshable items for the respective products. |
| `session_id` | Optional | Used to securely configure Tink Link, prefill data or apply merchant customization. See [sessions](/Tiny-doc/tink_docs_api/api/#general/tink-link/session). |
| `state` | Optional, but recommended | Helps defend against Cross-Site Request Forgery (CSRF) attacks. To use `state`, provide a randomized `state` value when initiating the SDK. Tink will return this value in the callback after a successful grant. You can then compare this value to the value in your request to ensure it came from your app. |
| `theme` | Optional | Specifying `LIGHT` or `DARK` overrides the user’s system preference and displays the specified theme. Requires both themes to be configured to have any effect. Reach out to [support](/Tiny-doc/tink_docs_home/resources/support/) to enable dark theme. |

Example URL

```
https://link.tink.com/1.0/products/connect-accounts?client_id=&products=INVESTMENTS,TRANSACTIONS&redirect_uri=http://localhost:3000/callback&market=GB&authorization_code=d473ea2bea8f484c9d7889b0a
```

### Success response parameters[](#success-response-parameters)

Tink appends the following parameters to the `redirect_uri` after a successful SDK journey.

| Parameter | Availability | Description |
| --- | --- | --- |
| `credentials_id` | Always | The identifier of the created or updated credentials. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

Example success response

```
http://localhost:3000/callback?credentials_id=6915ab99857fec1e6f2f6c078
```

### Error response parameters[](#error-response-parameters)

Tink appends the following parameters to the `redirect_uri` if the SDK journey ends in an error.

| Parameter | Availability | Description |
| --- | --- | --- |
| `error` | Always | A status code that describes the category of the error. For details, see [error statuses](/Tiny-doc/tink_docs_home/resources/investments/handle-investments-error-codes/#error-statuses). |
| `error_reason` | Always | The error reason that describes the cause of the error. For details, see the error reasons for the respective [error status](/Tiny-doc/tink_docs_home/resources/investments/handle-investments-error-codes/#error-statuses). |
| `error_type` | If `error=AUTHENTICATION_ERROR` | Describes the type of authentication error that has occurred. For details, see [provider consent errors](/Tiny-doc/tink_docs_home/resources/transactions/provider-consent-errors/). |
| `message` | Always | A localized end-user facing error message that can be directly presented to the end user. |
| `tracking_id` | Always | Tink's internal identifier for this specific error instance. |
| `credentials` | If credentials were created | The identifier of the created credentials object. |
| `provider_name` | If a provider was selected | The identifier of the selected provider or bank connection. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

Example error response

```
http://localhost:3000/callback?
    error=BAD_REQUEST&
    error_reason=INVALID_PARAMETER_CLIENT_ID&
    message=We%E2%80%99re%20sorry%2C%20but%20an%20error%20has%20occurred.&
    tracking_id=83526f84-226a-43cc-ae2d-2747f394d71b
```

## Continuous access: Update consent[](#continuous-access-update-consent)

Update consent base URL

```
https://link.tink.com/1.0/products/update-consent
```

### URL parameters[](#url-parameters)

Use these parameters when building the SDK URL. Then, integrate the URL into your website or app to have your end user start their journey.

| Parameter | Required | Description |
| --- | --- | --- |
| `authorization_code` | Required | The created `USER_AUTHORIZATION_CODE` (see [generating a user authorization code](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/#generate-a-user-authorization-code)). |
| `client_id` | Required | Your client ID (retrieved from [Console](https://console.tink.com/)). |
| `products` | Required | A comma separated list of products for which to aggregate data (`ACCOUNT_CHECK`, `INVESTMENTS`, `LOANS`, `TRANSACTIONS`). |
| `redirect_uri` | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in [Console](https://console.tink.com/)). |
| `app_uri` | Optional | The deep link for an Android or iOS hosting app. Use when Tink Link is embedded in an [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/)/[iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) app to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| `auto_redirect_mobile` | Optional, but recommended for mobile integrations | Use for [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/) or [iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) integrations. When `TRUE`, this will directly open the bank app during the authentication step if installed on the user's device or otherwise fall back to a web-based authentication flow in the system's default browser. |
| `refreshable_items` | Optional | A comma separated list of [refreshable items](/Tiny-doc/tink_docs_api/api/#connectivity-v1/credentials/refresh-credentials/query-parameters) specifying the data types to aggregate overriding the default list of refreshable items for the respective products. |
| credentials\_id | Required | The identifier of the credentials to update consent for. |
| `state` | Optional, but recommended | Helps defend against Cross-Site Request Forgery (CSRF) attacks. To use `state`, provide a randomized `state` value when initiating the SDK. Tink will return this value in the callback after a successful grant. You can then compare this value to the value in your request to ensure it came from your app. |
| `theme` | Optional | Specifying `LIGHT` or `DARK` overrides the user’s system preference and displays the specified theme. Requires both themes to be configured to have any effect. Reach out to [support](/Tiny-doc/tink_docs_home/resources/support/) to enable dark theme. |

Example URL

```
https://link.tink.com/1.0/products/update-consent?client_id=&products=INVESTMENTS,TRANSACTIONS&credentials_id=6915ab99857fec1e6f2f6c078&redirect_uri=http://localhost:3000/callback&authorization_code=d473ea2bea8f484c9d7889b0a
```

### Success response parameters[](#success-response-parameters)

Tink appends the following parameters to the `redirect_uri` after a successful SDK journey.

| Parameter | Required | Description |
| --- | --- | --- |
| `credentials_id` | Always | The identifier of the created or updated credentials. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

Example success response

```
http://localhost:3000/callback?credentials_id=6915ab99857fec1e6f2f6c078
```

### Error response parameters[](#error-response-parameters)

Tink appends the following parameters to the `redirect_uri` if the SDK journey ends in an error.

| Parameter | Availability | Description |
| --- | --- | --- |
| `error` | Always | A status code that describes the category of the error. For details, see [error statuses](/Tiny-doc/tink_docs_home/resources/investments/handle-investments-error-codes/#error-statuses). |
| `error_reason` | Always | The error reason that describes the cause of the error. For details, see the error reasons for the respective [error status](/Tiny-doc/tink_docs_home/resources/investments/handle-investments-error-codes/#error-statuses). |
| `error_type` | If `error=AUTHENTICATION_ERROR` | Describes the type of authentication error that has occurred. For details, see [provider consent errors](/Tiny-doc/tink_docs_home/resources/transactions/provider-consent-errors/). |
| `message` | Always | A localized end-user facing error message that can be directly presented to the end user. |
| `tracking_id` | Always | Tink's internal identifier for this specific error instance. |
| `credentials` | If credentials were created | The identifier of the created credentials object. |
| `provider_name` | If a provider was selected | The identifier of the selected provider or bank connection. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

Example error response

```
http://localhost:3000/callback?
    error=BAD_REQUEST&
    error_reason=INVALID_PARAMETER_CLIENT_ID&
    message=We%E2%80%99re%20sorry%2C%20but%20an%20error%20has%20occurred.&
    tracking_id=83526f84-226a-43cc-ae2d-2747f394d71b
```

## Continuous access: Extend consent[](#continuous-access-extend-consent)

Extend consent base URL

```
https://link.tink.com/1.0/products/extend-consent
```

### URL parameters[](#url-parameters)

Use these parameters when building the SDK URL. Then, integrate the URL into your website or app to have your end user start their journey.

| Parameter | Required | Description |
| --- | --- | --- |
| `authorization_code` | Required | The created `USER_AUTHORIZATION_CODE` (see [generating a user authorization code](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/#generate-a-user-authorization-code)). |
| `client_id` | Required | Your client ID (retrieved from [Console](https://console.tink.com/)). |
| `credentials_id` | Required | The identifier of the credentials to extend consent for. |
| `redirect_uri` | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in [Console](https://console.tink.com/)). |
| `app_uri` | Optional | The deep link for an Android or iOS hosting app. Use when Tink Link is embedded in an [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/)/[iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) app to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| `auto_redirect_mobile` | Optional, but recommended for mobile integrations | Use for [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/) or [iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) integrations. When `TRUE`, this will directly open the bank app during the authentication step if installed on the user's device or otherwise fall back to a web-based authentication flow in the system's default browser. |
| `state` | Optional, but recommended | Helps defend against Cross-Site Request Forgery (CSRF) attacks. To use `state`, provide a randomized `state` value when initiating the SDK. Tink will return this value in the callback after a successful grant. You can then compare this value to the value in your request to ensure it came from your app. |
| `theme` | Optional | Specifying `LIGHT` or `DARK` overrides the user’s system preference and displays the specified theme. Requires both themes to be configured to have any effect. Reach out to [support](/Tiny-doc/tink_docs_home/resources/support/) to enable dark theme. |

Example URL

```
https://link.tink.com/1.0/products/extend-consent?client_id=&credentials_id=6915ab99857fec1e6f2f6c078&redirect_uri=http://localhost:3000/callback&authorization_code=d473ea2bea8f484c9d7889b0a
```

### Success response parameters[](#success-response-parameters)

Tink appends the following parameters to the `redirect_uri` after a successful SDK journey.

| Parameter | Availability | Description |
| --- | --- | --- |
| `credentials_id` | Always | The identifier of the created or updated credentials. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

Example success response

```
http://localhost:3000/callback?credentials_id=6915ab99857fec1e6f2f6c078
```

### Error response parameters[](#error-response-parameters)

Tink appends the following parameters to the `redirect_uri` if the SDK journey ends in an error.

| Parameter | Availability | Description |
| --- | --- | --- |
| `error` | Always | A status code that describes the category of the error. For details, see [error statuses](/Tiny-doc/tink_docs_home/resources/investments/handle-investments-error-codes/#error-statuses). |
| `error_reason` | Always | The error reason that describes the cause of the error. For details, see the error reasons for the respective [error status](/Tiny-doc/tink_docs_home/resources/investments/handle-investments-error-codes/#error-statuses). |
| `error_type` | If `error=AUTHENTICATION_ERROR` | Describes the type of authentication error that has occurred. For details, see [provider consent errors](/Tiny-doc/tink_docs_home/resources/transactions/provider-consent-errors/). |
| `message` | Always | A localized end-user facing error message that can be directly presented to the end user. |
| `tracking_id` | Always | Tink's internal identifier for this specific error instance. |
| `credentials` | If credentials were created | The identifier of the created credentials object. |
| `provider_name` | If a provider was selected | The identifier of the selected provider or bank connection. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

Example error response

```
http://localhost:3000/callback?
    error=BAD_REQUEST&
    error_reason=INVALID_PARAMETER_CLIENT_ID&
    message=We%E2%80%99re%20sorry%2C%20but%20an%20error%20has%20occurred.&
    tracking_id=83526f84-226a-43cc-ae2d-2747f394d71b
```

## Supported markets[](#supported-markets)

The following markets are supported. If a `market` isn't provided, Tink defaults to `SE`. See [market capabilities](/Tiny-doc/tink_docs_home/market-capabilities/) for all available providers by market.

| Market | Market Code |
| --- | --- |
| Spain | `ES` |
| Sweden | `SE` |

## Supported locales[](#supported-locales)

A `locale` is a code that represents a language associated with a region. If a `locale` isn't provided, Tink defaults to `en_US`.

| Locale | Language |
| --- | --- |
| `cs_CZ` | Czech |
| `da_DK` | Danish |
| `de_DE` | German |
| `en_US` | English (US) |
| `en_GB` | English (UK) |
| `es_ES` | Spanish |
| `et_EE` | Estonian |
| `fi_FI` | Finnish |
| `fr_FR` | French |
| `it_IT` | Italian |
| `lt_LT` | Lithuanian |
| `lv_LV` | Latvian |
| `nl_NL` | Dutch |
| `no_NO` | Norwegian |
| `pt_PT` | Portuguese |
| `pl_PL` | Polish |
| `sv_SE` | Swedish |

## Versions[](#versions)

The SDK has several supported versions. If you are using a deprecated version, please upgrade to one of the long-term available versions.

New request and response parameters may be added to the existing version, but the API will remain backward compatible with the existing specification until reaching end of life. Tink may also add parameters that are not listed in this documentation.

| Version | Status | Date introduced | Sunset date |
| --- | --- | --- | --- |
| 1.0 | `Supported` | June 10th, 2019 | TBD |
| 0.5 | `Supported` | June 10th, 2019 | TBD |
| 0.4 | `Supported` | 2018 | TBD |
| 0.3 | `Sunset` | 2015 | Jun 31st, 2020 |
| 0.2 | `Sunset` | 2015 | Jun 31st, 2020 |
| 0.1 | `Sunset` | 2015 | Jun 31st, 2020 |

## Supported browsers[](#supported-browsers)

Tink works with all modern browsers and with many other browsers and older browser versions despite not being included in our assurance checks. The supported browsers list describes what is officially supported.

| Browser | Versions |
| --- | --- |
| Chrome | `>= 87` |
| Firefox | `>= 78` |
| Safari | `>= 14` |
| Edge | `>= 88` |
