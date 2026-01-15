---
title: "Tink Link Reference (Bundled Flow)"
source: "/Tiny-doc/tink_docs_home/resources/tink-link-web/api-reference-bundled-flow/"
exportedAt: "2026-01-13T12:59:40.881Z"
---
You can get access to the Tink's products and APIs using Tink Link, which uses industry standard OAuth 2.0 authentication methods for transparent and secure access to user data.

From a high level, this is how Tink Link for web works:

1.  You direct the end user to the respective `https://link.tink.com/...` flow
2.  The end user completes the Tink Link flow by choosing a bank, consenting and authenticating
3.  The end user is taken back to your application's `redirect_uri` with the result of the operation

## Bundled flow[](#bundled-flow)

`https://link.tink.com/1.0/reports/create-report`

#### Request parameters[](#request-parameters)

| Parameter | Required | Description |
| --- | --- | --- |
| `client_id` | Required | Your client ID (retrieved from [Console](https://console.tink.com/)). |
| `redirect_uri` | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in [Console](https://console.tink.com/)). |
| `market` | Optional (default `SE`) | The market code for the country Tink should list providers for. See [supported markets](#supported-markets). |
| `locale` | Optional (default `en_US`) | The locale used for UI text. See [supported locales](#supported-locales). |
| report\_types | Required | A comma-separated list of reports to generate (`ACCOUNT_VERIFICATION_REPORT`, `TRANSACTION_REPORT`, `INCOME_CHECK_REPORT`, `RISK_INSIGHTS_REPORT`, `EXPENSE_CHECK_REPORT`). |
| refreshable\_items | Optional | A comma-separated list of [refreshable items](/Tiny-doc/tink_docs_api/api/#connectivity-v1/credentials/create-credentials/query-parameters) to include in this reports flow. The default will include refreshable items based on the bundled products. |
| account\_dialog\_type | Optional (default `NONE`) | Optionally prompt the user to select one (`SINGLE`) or multiple (`MULTI`) accounts that should be included in the reports. The default (`NONE`) will not prompt the user for account selection and will automatically include all retrieved accounts in the reports. This parameter only applies for `ACCOUNT_VERIFICATION_REPORT` and `TRANSACTION_REPORT`. The other products will include all accounts in their reports. |
| customer\_reference\_id | Optional | A user reference which will be passed back to you once the reports flow is completed. |
| `app_uri` | Optional | The deep link for an Android or iOS hosting app. Use when Tink Link is embedded in an [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/)/[iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) app to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| `state` | Optional, but recommended | Helps defend against Cross-Site Request Forgery (CSRF) attacks. To use `state`, provide a randomized `state` value when initiating the SDK. Tink will return this value in the callback after a successful grant. You can then compare this value to the value in your request to ensure it came from your app. |
| `input_provider` | Optional | The unique name of the provider (ex: `sbab-bankid`). If provided, user can skip provider selection. Otherwise, they will choose the provider from a list in the Tink UI. If `input_provider` is invalid, Tink will throw an error. Make sure you have the right provider name by using the [List Providers endpoint](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider/list-providers). |
| `input_username` | Optional | Prefills the username field for supported providers. Useful when the username is a personal identifier that could be valid for multiple banks, such as a social security number. |
| `iframe` | Optional (default `false`) | Should be used if Tink Link is embedded inside an iframe. If the parameter is set to `true`, the redirect with the authentication `code` will be replaced by a `postMessage` to the parent. Note that iframe embedding can be made available after verifying your developer account. For more information, contact [Support](https://support.tink.com/). `redirect_uri` is used for validating the hosting page. |
| `theme` | Optional | Specifying `LIGHT` or `DARK` overrides the user’s system preference and displays the specified theme. Requires both themes to be configured to have any effect. Reach out to [support](/Tiny-doc/tink_docs_home/resources/support/) to enable dark theme. |

The resulting Tink Link URL with the request parameters:

```
https://link.tink.com/1.0/reports/create-report?client_id={YOUR_CLIENT_ID}&redirect_uri=http://localhost:3000/callback&market=GB&report_types=ACCOUNT_VERIFICATION_REPORT,TRANSACTION_REPORT&account_dialog_type=SINGLE&customer_reference_id=8509e057
```

#### Response parameters (success)[](#response-parameters-success-)

| Parameter | Required | Description |
| --- | --- | --- |
| account\_verification\_report\_id | Optional | The identifier that can be used to retrieve the generated account verification report. The `account_verification_report_id` is present if `ACCOUNT_VERIFICATION_REPORT` was included in the `report_types` parameter. |
| transaction\_report\_id | Optional | The identifier that can be used to retrieve the generated Transactions report. The `transaction_report_id` is present if `TRANSACTION_REPORT` was included in the `report_types` parameter. |
| income\_check\_report\_id | Optional | The identifier that can be used to retrieve the generated Income Check report. The `income_check_report_id` is present if `INCOME_CHECK_REPORT` was included in the `report_types` parameter. |
| risk\_insights\_report\_id | Optional | The identifier that can be used to retrieve the generated Risk Insights report. The `risk_insights_report_id` is present if `RISK_INSIGHTS_REPORT` was included in the `report_types` parameter. |
| expense\_check\_report\_id | Optional | The identifier that can be used to retrieve the generated Expense Check report. The `expense_check_report_id` is present if `EXPENSE_CHECK_REPORT` was included in the `report_types` parameter. |
| customer\_reference\_id | Optional | The `customer_reference_id` value provided in the request. |
| `state` | If provided in the request | The state value that was provided in the URL when starting the journey. |

The success response details are delivered either to the specified `redirect_uri` or by postMessage for [iframe integrations](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-embed-in-iframe/).

##### Redirect[](#redirect)

```
http://localhost:3000/callback?account_verification_report_id=6915ab99857fec1e6f2f6c078&transaction_report_id=f07644548ba64781aac503b7fdbae57d&customer_reference_id=8509e057
```

##### iframe[](#iframe)

```
{
  "type": "reports",
  "data": {
    "account_verification_report_id": "61b8c7b70de24eb388f8744a018038c3",
    "transaction_report_id": "f8520c10681845e0a3f2fcbb9da54e2a"
  },
  "additionalInformation": {
      "customer_reference_id": "8509e057"
  }
}
```

#### Response parameters (failure)[](#response-parameters-failure-)

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
