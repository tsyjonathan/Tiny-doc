---
title: "Variable Recurring Payments SDK reference"
source: "/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/variable-recurring-payments-sdk-reference/"
exportedAt: "2026-01-13T12:43:14.932Z"
---
`https://link.tink.com/1.0/pay/vrp-mandate`

### URL parameters[](#url-parameters)

Use these parameters when building the SDK URL. Integrate the URL into your website or app to have your end user start their journey.

| Parameter | Required | Description |
| --- | --- | --- |
| client\_id | Required | Your client ID (retrieved from [Tink Console](https://console.tink.com/)). |
| consent\_id | Required | Your generated Consent ID. |
| authorization\_code | Required | Your generated authorization code from the [delegated authorization](/Tiny-doc/tink_docs_api/api/#general/oauth/create-delegated-authorization). |
| redirect\_uri | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in [Tink Console](https://console.tink.com/)). |
| locale | Optional (default `en_US`) | Locale to be used for end-user facing text. See below for an available list of locales. |
| app\_uri | Optional | Should be used if Tink Link is embedded inside an Android/iOS app. Will use the deep link specified to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| state | Optional | Optional, but highly recommended parameter that's useful in preventing Cross-site Request Forgery (CSRF) attacks. The application provides a randomised state value to Tink Link at initiation, and that value will be sent back verbatim to the callback URL after a successful grant. The application can then verify the returned value to make sure the request came from the application itself. |
| theme | Optional | Requires both a `LIGHT` and `DARK` theme to be configured to have any effect. When `LIGHT` and `DARK` theme are configured it will default the theme that matches the end-user system preference. Using `?theme=DARK` will force the DARK theme to be used regardless of the end-user system preference. Reach out to [support](/Tiny-doc/tink_docs_home/resources/support/) for enabling a dark theme. |

**Example URL**

```
https://link.tink.com/1.0/pay/vrp-mandate?client_id={YOUR_CLIENT_ID}&consent_id={YOUR_CONSENT_ID}&authorization_code={YOUR_AUTHORIZATION_CODE}&redirect_uri=http://localhost:3000/callback
```

#### Response parameters (success)[](#response-parameters-success-)

| Parameter | Required | Description |
| --- | --- | --- |
| consentId | Required | The Consent ID. |
| state | Optional | The state value provided in the request. |

The success response details are delivered to the specified `redirect_uri`.

##### Redirect[](#redirect)

```
http://localhost:3000/callback?consent_id=6915ab99857fec1e6f2f6c078
```

#### Response parameters (failure)[](#response-parameters-failure-)

| Parameter | Required | Description |
| --- | --- | --- |
| error | Required | An enumerable value defined in the Errors section below. |
| message | Required | A developer facing error message describing the error. |
| consentId | Required | The Consent ID. |
| state | Optional | The state value provided in the request. |

The failure response details are delivered to the specified `redirect_uri`.

```
http://localhost:3000/callback?error=INTERNAL_ERROR&message=Something%20went%20wrong%2E&consentId=9d547e5b7b1442658878843539a32148
```

```
{
  "type": "error",
  "error": {
    "status": "USER_CANCELLED",
    "message": "USER_CANCELLED",
    "consentId": "9d547e5b7b1442658878843539a32148"
  }
}
```

## Errors[](#errors)

| Status | Description |
| --- | --- |
| USER\_CANCELLED | The end user cancelled the flow. |
| AUTHENTICATION\_ERROR | The end user did not successfully authenticate towards the financial institution. The Consent might also be expired. |
| INTERNAL\_ERROR | An internal error within the Tink service. Please [contact support](/Tiny-doc/tink_docs_home/resources/getting-started/support/) for help. |

## Locales[](#locales)

The following locales are supported.

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

These are the available SDK versions. If you are currently on a deprecated version, please upgrade to one of the long-term available version.

New request and response parameters may be added to existing version, but the API will remain backwards compatible with the existing specification until reaching end of life. Please note that unknown parameters, not listed in this documentation, may also be present.

| Version | Status | Date Introduced | Available Until |
| --- | --- | --- | --- |
| 1.0 | `Available` | June 10th, 2019 | TBD |
| 0.5 | `Available` | June 10th, 2019 | TBD |
| 0.4 | `Available` | 2018 | TBD |
| 0.3 | `End of life` | 2015 | Jun 31st, 2020 |
| 0.2 | `End of life` | 2015 | Jun 31st, 2020 |
| 0.1 | `End of life` | 2015 | Jun 31st, 2020 |

## Browser support[](#browser-support)

Some browsers and older browser versions are no longer recommended for use together with the SDK. The SDK could still function together with browsers and versions that are not listed here, despite us not including them in our quality assurance checks.

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
