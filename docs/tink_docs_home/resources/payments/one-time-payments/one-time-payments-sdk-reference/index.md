---
title: "One-time payments SDK reference - Tink Docs"
source: "https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-sdk-reference"
exportedAt: "2026-01-13T12:42:19.533Z"
---
Use these parameters when building the SDK URL. Then, integrate the URL into your website or app to have your end user start their journey.

One-Time Payments base URL

```
https://link.tink.com/1.0/pay/direct
```

## URL parameters[](#url-parameters)

Use these parameters when building the SDK URL. Integrate the URL into your website or app to have your end user start their journey.

| Parameter | Required | Description |
| --- | --- | --- |
| `client_id` | Required | Your client ID (retrieved from [Console](https://console.tink.com/)). |
| `redirect_uri` | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in [Console](https://console.tink.com/)). |
| `payment_request_id` | Required | The identifier of the created [payment request](https://docs.tink.com/api#payment/payment-request/create-payment-request). |
| `app_uri` | Optional | The deep link for an Android or iOS hosting app. Use when Tink Link is embedded in an [Android](https://docs.tink.com/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps)/[iOS](https://docs.tink.com/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps) app to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| `auto_redirect_mobile` | Optional, but recommended for mobile integrations | Use for [Android](https://docs.tink.com/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps) or [iOS](https://docs.tink.com/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps) integrations. When `TRUE`, this will directly open the bank app during the authentication step if installed on the user's device or otherwise fall back to a web-based authentication flow in the system's default browser. |
| `input_provider` | Optional | The unique name of the provider (ex: `sbab-bankid`). If provided, user can skip provider selection. Otherwise, they will choose the provider from a list in the Tink UI. If `input_provider` is invalid, Tink will throw an error. Make sure you have the right provider name by using the [List Providers endpoint](https://docs.tink.com/api-connectivity-v1#connectivity-v1/provider/list-providers). |
| `input_username` | Optional | Prefills the username field for supported providers. Useful when the username is a personal identifier that could be valid for multiple banks, such as a social security number. |
| `locale` | Optional (default `en_US`) | The locale used for UI text. See [supported locales](#supported-locales). |
| `market` | Optional (default `SE`) | The market code for the country Tink should list providers for. See [supported markets](#supported-markets). |
| `session_id` | Optional | Used to securely configure Tink Link, prefill data or apply merchant customization. See [sessions](https://docs.tink.com/api#general/tink-link/session). |
| `state` | Optional, but recommended | Helps defend against Cross-Site Request Forgery (CSRF) attacks. To use `state`, provide a randomized `state` value when initiating the SDK. Tink will return this value in the callback after a successful grant. You can then compare this value to the value in your request to ensure it came from your app. |
| `theme` | Optional | Specifying `LIGHT` or `DARK` overrides the user’s system preference and displays the specified theme. Requires both themes to be configured to have any effect. Reach out to [support](https://docs.tink.com/resources/support) to enable dark theme. |

Example URL

```
https://link.tink.com/1.0/pay/direct?client_id=&redirect_uri=http://localhost:3000/callback&market=GB&payment_request_id=
```

## Success response parameters[](#success-response-parameters)

Tink appends the following parameters to the `redirect_uri` after a successful SDK journey.

| Parameter | Availability | Description |
| --- | --- | --- |
| `payment_request_id` | Always | The identifier of the created payment request. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

Example success response

```
http://localhost:3000/callback?payment_request_id=6915ab99857fec1e6f2f6c078
```

## Error response parameters[](#error-response-parameters)

Tink appends the following parameters to the `redirect_uri` if the SDK journey ends in an error.

| Parameter | Availability | Description |
| --- | --- | --- |
| `error` | Always | A status code that describes the category of the error. For details, see [error statuses](https://docs.tink.com/resources/payments/handle-one-time-payments-sdk-error-codes#error-statuses). |
| `error_reason` | Always | The error reason that describes the cause of the error. For details, see the error reasons for the respective [error status](#error-statuses). |
| `error_type` | If `error=AUTHENTICATION_ERROR` | Describes the type of authentication error that has occurred. For details, see [provider consent errors](https://docs.tink.com/resources/transactions/provider-consent-errors). |
| `message` | Always | A localized end-user facing error message that can be directly presented to the end user. |
| `payment_request_id` | Always | The identifier of the created payment request. |
| `tracking_id` | Always | Tink's internal identifier for this specific error instance. |
| `credentials` | If credentials were created | The identifier of the created credentials object. |
| `state` | If provided | The state value that was provided in the URL when starting the journey. |

Example error response

```
http://localhost:3000/callback?
    error=BAD_REQUEST&
    error_reason=INVALID_PARAMETER_CLIENT_ID&
    message=We%E2%80%99re%20sorry%2C%20but%20an%20error%20has%20occurred.&
    payment_request_id=b78cf4d4f33e4c54bfdc772edbadb026&
    tracking_id=83526f84-226a-43cc-ae2d-2747f394d71b
```

## Supported Markets[](#supported-markets)

These are the markets supported for One-Time Payments. If a `market` isn't provided, Tink defaults to `SE`. See [market capabilities](https://docs.tink.com/market-capabilities) for all available providers by market.

| Market | Market Code |
| --- | --- |
| Austria | `AT` |
| Belgium | `BE` |
| Denmark | `DK` |
| Estonia | `EE` |
| Finland | `FI` |
| France | `FR` |
| Germany | `DE` |
| Ireland | `IE` |
| Italy | `IT` |
| Latvia | `LT` |
| Lithuania | `LV` |
| Netherlands | `NL` |
| Norway | `NO` |
| Poland | `PL` |
| Portugal | `PT` |
| Spain | `ES` |
| Sweden | `SE` |
| United Kingdom | `GB` |

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
