---
title: "Errors - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-errors/"
exportedAt: "2026-01-13T12:53:35.740Z"
---
## Error response[](#error-response)

The SDK journey can result in a non-recoverable error. This type of error can't be resolved by the user retrying within the ongoing SDK journey. After the user has encountered a non-recoverable error, the SDK redirects to the specified `redirect_uri`, which includes the query parameters that describe the exact error.

| KEY | AVAILABILITY | DESCRIPTION |
| --- | --- | --- |
| `error` | Always | A status code that describes the category of the error. For details, see [Error statuses](#error-statuses). |
| `error_reason` | Always | The error reason that describes the cause of the error. For details, see the error reasons below for the specific `error` status code. |
| `error_type` | If `error=AUTHENTICATION_ERROR` | Describes the type of authentication error that has occurred. For details, see [Provider Consent errors](/Tiny-doc/tink_docs_home/resources/transactions/provider-consent-errors/). |
| `message` | Always | A localized end-user facing error message that can be presented directly to the end user. |
| `tracking_id` | Always | Tink's internal identifier for this specific error instance. Make sure to include the `tracking_id` value when communicating with Tink to reduce time required to troubleshooting issues. |
| `credentials` | If credentials were created | The identifier of the created credentials object. |
| `provider_name` | If a provider was selected | The name of the selected bank connection. |
| `payment_request_id` | If using Payment Initiation | The identifier of the payment request. |

The response can also include this non-error specific parameter if it was specified in the SDK URL:

| KEY | DESCRIPTION |
| --- | --- |
| `state` | The state value that was provided when starting the journey (if available). |

**BAD\_REQUEST response example**

```
{redirect_uri}?
    error=BAD_REQUEST&
    error_reason=INVALID_PARAMETER_CLIENT_ID&
    message=We%E2%80%99re%20sorry%2C%20but%20an%20error%20has%20occurred.&
    tracking_id=83526f84-226a-43cc-ae2d-2747f394d71b
```

**AUTHENTICATION\_ERROR response example**

```
{redirect_uri}?
    error=AUTHENTICATION_ERROR&
    error_type=USER_LOGIN_ERROR&
    error_reason=USER_NOT_A_CUSTOMER&
    message=It%20doesn%27t%20look%20like%20you%20are%20a%20customer%20with%20this%20bank.%20Please%20go%20back%20and%20make%20sure%20that%20you%20selected%20your%20bank.&
    tracking_id=04de7a0a-101d-4d87-9f72-857c15783f79
```

If you decide to contact Tink regarding an error you are seeing, make sure to include the `tracking_id` value in your request to reduce troubleshooting time.

## Error statuses[](#error-statuses)

The error status describes the category for the error that occurred. The error status is always included in the error response. New status codes may be added in the future and will be considered a non-breaking API change.

| Error status | Description |
| --- | --- |
| USER\_CANCELLED | The end user canceled the journey. This status should not be considered as an error. |
| BAD\_REQUEST | The error is most likely a result of an incorrect or missing URL parameter. |
| AUTHENTICATION\_ERROR | The error occurred during the authentication process with the bank. |
| TEMPORARY\_ERROR | A temporary error in Tink's platform. To resolve this, try again later. |
| INTERNAL\_ERROR | An unexpected internal error in Tink's platform. Please contact [support](/Tiny-doc/tink_docs_home/resources/getting-started/support/) for help. |

### USER\_CANCELLED[](#user_cancelled)

The end user canceled the journey, either by going back or selecting the close button. This status should not be treated as an error, no error screen should be presented in your application, and you should return the end user to the step prior to launching Tink.

### BAD\_REQUEST[](#bad_request)

These errors most often occur due to a missing or incorrect parameter in the URL. For required parameters and valid values, see the [SDK reference](/Tiny-doc/tink_docs_home/resources/tink-link-web/#api-reference) for your product.

| Error reason | Description |
| --- | --- |
| INVALID\_PARAMETER\_ACCOUNT\_DIALOG\_TYPE | The `account_dialog_type` value is incorrect. |
| INVALID\_PARAMETER\_AUTHORIZATION\_CODE | One or more of these values are missing: `authorization code`, `handoff session ID`, and `authorization token`. |
| INVALID\_PARAMETER\_CLIENT\_ID | The `client_id` value is incorrect or missing. |
| INVALID\_PARAMETER\_CREDENTIALS\_ID | The `credentials_id` value is missing. The parameter is only used with permanent users. |
| INVALID\_PARAMETER\_FINANCIAL\_SERVICES\_SEGMENTS | The `financial_services_segments` value is incorrect. Only these values can be used: `PERSONAL`, `BUSINESS`. |
| INVALID\_PARAMETER\_INPUT\_PROVIDER | The provider name value (for the `input_provider` parameter) contains more than 100 characters. Make sure to limit the `provider` name to a maximum of 100 characters. |
| INVALID\_PARAMETER\_INPUT\_USERNAME | The `input_username` value is incorrect or missing. Make sure to limit `username` to a maximum of 50 characters. |
| INVALID\_PARAMETER\_PAYMENT\_REQUEST\_ID | The `payment_request_id` value is missing. |
| INVALID\_PARAMETER\_REDIRECT\_URI | The `redirect_uri` value is missing or malformed. |
| INVALID\_PARAMETER\_REFRESHABLE\_ITEMS | The `refreshable_items` value is incorrect. Only these values can be used: `CHECKING_ACCOUNTS`, `CHECKING_TRANSACTIONS`, `SAVING_ACCOUNTS`, `SAVING_TRANSACTIONS`, `CREDITCARD_ACCOUNTS`, `CREDITCARD_TRANSACTIONS`. |
| INVALID\_PARAMETER\_REPORT\_TYPES | The `report_types` value is incorrect or missing. This value is only shown when bundling more than one product in one flow. |
| INVALID\_PARAMETER\_SCOPE | The `scope` value is missing. It is only used with Account Aggregation. |
| INVALID\_STATE\_ACCESS\_TOKEN | The `access token` value is missing, has expired, or is incorrectly entered. |
| INVALID\_STATE\_AUTHENTICATION | The error occurs when [credentialsType](/Tiny-doc/tink_docs_api/api/#connectivity/provider/the-provider-model) is `MOBILE_BANKID` or `THIRD_PARTY_APP` and the end user has failed to authenticate or the integration doesn't use BankID on a mobile device or a third-party app. |
| INVALID\_STATE\_CREDENTIALS | The credential has reached a `TEMPORARY_ERROR` state. |
| INVALID\_STATE\_CREDENTIALS\_IS\_AWAITING\_THIRD\_PARTY | An attempt is made to authenticate or refresh a credential that is in a pending state. The parameter is only used with permanent users. |
| INVALID\_STATE\_EMBED\_NOT\_ALLOWED | Tink is embedded when embedding is not allowed. Embedding a Tink page inside another page is by default not permitted. To request the ability to embed Tink, go to **Console** > \[**your\_app**\] > **App settings** > **App details** > **Display name (public)** and select **Verify**. |
| INVALID\_STATE\_NON\_OPEN\_BANKING\_PROVIDER | An attempt is made to authenticate a credential for a non-open-banking provider. The parameter is only used with permanent users. |
| INVALID\_STATE\_PAYMENT\_RETRY\_NOT\_ALLOWED | The payment request is already used and can't be reused. The parameter is only used with direct payments. |
| INVALID\_STATE\_PERMANENT\_USER\_FLAG | A permanent users flow is attempted for an app that doesn't have permanent users enabled. |
| INVALID\_STATE\_PROVIDER | The selected/preselected provider isn't available. This error occurs when a preselected provider doesn't exist in the selected market, which is due to one of these issues:
\- The selected/preselected provider isn't included in the app's provider policy.

\- The selected provider isn't available.

 |
| INVALID\_STATE\_PROVIDER\_DOES\_NOT\_RECOGNIZE\_USER | The end user has selected the wrong provider, one with which they don't have an account. |
| INVALID\_STATE\_REDIRECTED\_AUTHORIZATION\_TOKEN | A third party is redirecting back to Tink, but the query is missing `authorization_token`. |
| INVALID\_STATE\_REDIRECTED\_CREDENTIALS\_ID | A third party is redirecting back to Tink, but the query is missing `credentialsId`. |
| INVALID\_STATE\_REFRESH\_CREDENTIALS\_RATE\_LIMITED | An excessive amount of API requests has been made for an app. For more information, see [Rate limits](/Tiny-doc/tink_docs_api/api/#introduction/rate-limits). |
| INVALID\_STATE\_REDIRECT\_URI | The specified `redirect_uri` is invalid. Make sure that it is registered in the "App settings" page in Console. |
| INVALID\_STATE\_SCOPE | One or more scopes are incorrect or not available for the oauth client. |

### AUTHENTICATION\_ERROR[](#authentication_error)

This category of errors is the result of an error occurring during the authentication step with the financial institution. More information about the error and its source follows:

| KEY | DESCRIPTION |
| --- | --- |
| `error_reason` | The exact reason for the authentication error, for example, `USER_NOT_A_CUSTOMER`. For a complete list of values, see [Provider Consent errors](/Tiny-doc/tink_docs_home/resources/transactions/provider-consent-errors/). |
| `error_type` | The type of error, for example, `TINK_SIDE_ERROR`, and `PROVIDER_ERROR`. For a complete list of values, see [Provider Consent errors](/Tiny-doc/tink_docs_home/resources/transactions/provider-consent-errors/). |

For a complete list of authentication errors, see [Provider Consent errors](/Tiny-doc/tink_docs_home/resources/transactions/provider-consent-errors/).

### TEMPORARY\_ERROR[](#temporary_error)

A temporary error in Tink's platform or a network issue. To resolve any of these errors, try again later.

| Error reason | Description |
| --- | --- |
| REQUEST\_FAILED\_CREATE\_RESET\_CREDENTIALS | The reset credentials endpoint is unavailable. |
| REQUEST\_FAILED\_FETCH\_ACCOUNTS | The user report bundles endpoint or the accounts endpoint is unavailable. This error either occurs for Account Check or for the reports/bundled flow when Account Check is one of the bundled products. |
| REQUEST\_FAILED\_FETCH\_PROVIDER | The error can be caused by any of these things:
1\. The providers endpoint is unavailable.

2\. The selected provider couldn't be found.

3\. `input_provider` doesn't exist in the selected market.

4\. `input_provider` is not included in the configured Provider Policy.

 |
| REQUEST\_FAILED\_OAUTH\_DESCRIBE | The error can be caused by any of these things:

1\. The `redirect_uri` parameter is not entered in Console.

2\. The OAuth describe endpoint is unavailable.

 |

### INTERNAL\_ERROR[](#internal_error)

An unexpected internal error occurred in Tink's platform.

| Error reason | Description |
| --- | --- |
| REQUEST\_FAILED\_CONSUME\_HANDOFF\_SESSION | The handoff session endpoint is unavailable. |
| REQUEST\_FAILED\_CREATE\_ACCOUNT\_CHECK\_REPORT | The Account Check endpoint is unavailable. |
| REQUEST\_FAILED\_CREATE\_ANONYMOUS\_USER | The endpoint for creating anonymous users is unavailable. |
| REQUEST\_FAILED\_CREATE\_BULK\_PAYMENT | The bulk payments endpoint is unavailable. |
| REQUEST\_FAILED\_CREATE\_CREDENTIALS | Credentials can't be created. The error can be caused by any of these things:
1\. The `credentials:write` scope is missing.

2\. The Tink credentials service is unavailable.

 |
| REQUEST\_FAILED\_CREATE\_HANDOFF\_SESSION | The handoff session endpoint is unavailable. |
| REQUEST\_FAILED\_CREATE\_INCOME\_CHECK\_REPORT | The Income Check endpoint is unavailable. |
| REQUEST\_FAILED\_CREATE\_RECURRING\_PAYMENT | The recurring payment endpoint is unavailable. |
| REQUEST\_FAILED\_CREATE\_REPORT | The bundled flow endpoint is unavailable. |
| REQUEST\_FAILED\_CREATE\_RISK\_INSIGHTS\_REPORT | The Risk Insights endpoint is unavailable. |
| REQUEST\_FAILED\_CREATE\_TRANSFER | The transfer endpoint is unavailable. |
| REQUEST\_FAILED\_FETCH\_BULK\_PAYMENT | The bulk payments endpoint is unavailable. |
| REQUEST\_FAILED\_FETCH\_BULK\_PAYMENT\_STATUS | The bulk payments endpoint is unavailable. |
| REQUEST\_FAILED\_FETCH\_CREDENTIALS | The credentials endpoint is unavailable. |
| REQUEST\_FAILED\_FETCH\_EXISTING\_USER | The error can be caused by any of these things:

1\. `handoffSessionId` is missing.

2\. `authorizationCode` is missing.

3\. The handoff session endpoint is unavailable.

4\. The authentication/token endpoint is unavailable.

 |
| REQUEST\_FAILED\_FETCH\_HANDOFF\_SESSION | The handoff session endpoint is unavailable. |
| REQUEST\_FAILED\_FETCH\_LEGAL\_TEXT | It's not possible to fetch the privacy policy or terms and conditions. |
| REQUEST\_FAILED\_FETCH\_PAYMENT\_INFO | The endpoint to get payment or the endpoint to get transfer details is unavailable. |
| REQUEST\_FAILED\_FETCH\_PAYMENT\_TRANSFER\_INFO | The payment transfer endpoint is unavailable. |
| REQUEST\_FAILED\_FETCH\_PROVIDER\_PAYMENT\_CONDITIONS | The payment providers endpoint is unavailable. |
| REQUEST\_FAILED\_FETCH\_PROVIDERS | The providers endpoint is unavailable. |
| REQUEST\_FAILED\_FETCH\_RECURRING\_PAYMENT\_INFO | The recurring payment endpoint is unavailable. |
| REQUEST\_FAILED\_FETCH\_REPORTS\_DESCRIBE | The bundled flow endpoint is unavailable. |
| REQUEST\_FAILED\_FETCH\_SESSION | The session endpoint is unavailable. |
| REQUEST\_FAILED\_FETCH\_TRANSFER\_ACCOUNTS | The transfer accounts endpoint is unavailable. |
| REQUEST\_FAILED\_FETCH\_USER\_WITH\_EXISTING\_TOKEN | The user endpoint is unavailable. |
| REQUEST\_FAILED\_REFRESH\_CREDENTIALS | The credentials endpoint is unavailable. |

## Upgrading[](#upgrading)

If you've integrated with the SDK in the past, in the case of an error, you only had the `error` and `message` parameters available. The `error` code parameter was not detailed enough to act on and the `message` parameter contained an unlocalized error string that was not suitable to be directly presented to the end-user. The error model was recently revamped and now contains more information that will help you build better error screens for your end-users. Besides improving the existing error response parameters we have also introduced added a handful of new parameters:

-   Use the contents of the `message` parameter as the error message to be displayed to the end-user on your error screen. This message is already localized based on the locale used within the SDK and can be presented verbatim to the end-user.
-   Besides the existing `error` parameter, you now also have `error_reason` available (and `error_type` in case of authentication errors). You can use these to make business logic decisions based on the exact reason of failure, or simply track them internally to ease end-user support request resolution in case an error occurs.
-   Optionally, store the `tracking_id` internally for failures. If you need to communicate with Tink’s support to get further help for a specific error instance, these will help us localize the exact end-user session that resulted in an error.

**Prior error response example**

```
{redirect_uri}?
    error=AUTHENTICATION_ERROR&
    message=Something%20went%20wrong%20%28Error%20code%3A%2011%29
```

**Improved error response example**

```
{redirect_uri}?
    error=AUTHENTICATION_ERROR&
    message=The%20authentication%20method%20you%20selected%20is%20not%20supported.%20Please%20choose%20a%20different%20method&
    error_type=USER_LOGIN_ERROR&
    error_reason=AUTHENTICATION_METHOD_NOT_SUPPORTED&
    tracking_id=fbbcdf3c-c89c-4d34-ba4d-70afc0e6ee5a
```

These updates were introduced in a backward compatible manner and do not require any immediate action on your end. However, to improve error handling, success rates and the overall user experience in case of an error occurring, we strongly recommend adopting the changes above.
