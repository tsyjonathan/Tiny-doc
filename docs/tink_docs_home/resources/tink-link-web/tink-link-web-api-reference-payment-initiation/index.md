---
title: "Tink Link Reference (Payment Initiation)"
source: "/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-api-reference-payment-initiation/"
exportedAt: "2026-01-13T12:56:50.230Z"
---
You can get access to the Tink's products and APIs using Tink Link, which uses industry standard OAuth 2.0 authentication methods for transparent and secure access to user data.

From a high level, this is how Tink Link for web works:

1.  You direct the end user to the respective `[external url removed] flow
2.  The end user completes the Tink Link flow by choosing a bank, consenting and authenticating
3.  The end user is taken back to your application's `redirect_uri` with the result of the operation

### Initiate payment[](#initiate-payment)

`[external url removed]

#### Request parameters[](#request-parameters)

| Parameter | Required | Description |
| --- | --- | --- |
| `client_id` | Required | Your client ID (retrieved from Console). |
| `redirect_uri` | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in Console). |
| `market` | Required | The market code for the country Tink should list providers for. See [supported markets](#supported-markets). |
| `locale` | Required | The locale used for UI text. See [supported locales](#supported-locales). |
| payment\_request\_id | Required | The identifier of the created [payment request](/Tiny-doc/tink_docs_api/api/#payment/payment-request/create-payment-request). |
| `app_uri` | Optional | The deep link for an Android or iOS hosting app. Use when Tink Link is embedded in an [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/)/[iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) app to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| `state` | Optional, but recommended | Helps defend against Cross-Site Request Forgery (CSRF) attacks. To use `state`, provide a randomized `state` value when initiating the SDK. Tink will return this value in the callback after a successful grant. You can then compare this value to the value in your request to ensure it came from your app. |
| session\_id | Optional | Initialize Tink Link with a [session](/Tiny-doc/tink_docs_api/api/#general/tink-link/session) to securely configure source accounts and prefill data in Tink Link. Learn more [about using Tink Link sessions here](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-sessions/). |
| `input_provider` | Optional | The unique name of the provider (ex: `sbab-bankid`). If provided, user can skip provider selection. Otherwise, they will choose the provider from a list in the Tink UI. If `input_provider` is invalid, Tink will throw an error. Make sure you have the right provider name by using the [List Providers endpoint](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider/list-providers). |
| `input_username` | Optional | Prefills the username field for supported providers. Useful when the username is a personal identifier that could be valid for multiple banks, such as a social security number. |
| `iframe` | Optional (default `false`) | Should be used if Tink Link is embedded inside an iframe. If the parameter is set to `true`, the redirect with the authentication `code` will be replaced by a `postMessage` to the parent. Note that iframe embedding can be made available after verifying your developer account. For more information, contact Support. `redirect_uri` is used for validating the hosting page. |
| `theme` | Optional | Specifying `LIGHT` or `DARK` overrides the user’s system preference and displays the specified theme. Requires both themes to be configured to have any effect. Reach out to [support](/Tiny-doc/tink_docs_home/resources/support/) to enable dark theme. |

The resulting Tink Link URL with the request parameters:

```
[external url removed]
```

#### Response parameters (success)[](#response-parameters-success-)

| Parameter | Required | Description |
| --- | --- | --- |
| payment\_request\_id | Required | The identifier of the created payment request. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

The result is delivered to the specified `redirect_uri` with the success response parameters:

```
[external url removed]
```

#### Response parameters (failure)[](#response-parameters-failure-)

| Parameter | Required | Description |
| --- | --- | --- |
| `error` | Required | An enumerable value defined in the Errors section below. |
| `message` | Required | A developer facing error message describing the error. |
| payment\_request\_id | Required | The identifier of the created payment request. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |
| `credentials` | If credentials were provided | The identifier of the created credentials. |

```
[external url removed]
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
| `DE` | Germany |
| `EE` | Estonia |
| `ES` | Spain |
| `FR` | France |
| `GB` | United Kingdom |
| `IT` | Italy |
| `LT` | Lithuania |
| `NL` | Netherlands |
| `NO` | Norway |
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
