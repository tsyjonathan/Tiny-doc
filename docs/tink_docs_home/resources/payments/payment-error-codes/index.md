---
title: "One-time payment errors - Tink Docs"
source: "https://docs.tink.com/resources/payments/payment-error-codes"
exportedAt: "2026-01-13T12:54:15.769Z"
---
This article covers two types of errors:

-   [Payment request errors](#payment-request-errors): These are errors thrown when creating or handling a payment request.
-   [SDK errors](#sdk-errors): These are errors thrown by the client.

## Payment request errors[](#payment-request-errors)

If your one-time payment request fails, Tink sends back a status code and a message that describes what went wrong.

| Error status | Description |
| --- | --- |
| `2xx` | Success! Your request worked as expected. |
| `4xx` | There was an error with your request, such as a missing or invalid parameter. When these errors can be handled programmatically, we also return an error code that identifies what went wrong. |
| `5xx` | Something went wrong with the Tink platform itself. |

> **Note:** Each error code for payment request errors is prefixed with `payment_request`. We’ve left this prefix out of the error tables so that they’re easier to read.

### Example error response body[](#example-error-response-body)

```
{
  "errorMessage": "Failed to create payment request. Reason: Amount cannot be less than or equal to 0",
  "errorCode": "payment_request.amount_less_than_or_equal_to_zero"
}
```

### Payment request error codes[](#payment-request-error-codes)

#### Amount and currency[](#amount-and-currency)

| Error Code | Description |
| --- | --- |
| `amount_less_than_or_equal_to_zero` | `amount` can't be less than or equal to zero |
| `amount_too_large` | `amount` can’t exceed 999,999,999 |
| `currency_code_invalid` | The `currency` isn’t a code supported by [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html) |
| `currency_missing` | `currency` can't be `null` or empty |
| `invalid_currency_for_destination_account_type` | The payee's account type doesn't support the provided `currency` |
| `money_invalid` | The `currency` has too many or too few decimals |

#### Execution date[](#execution-date)

| Error Code | Description |
| --- | --- |
| `execution_date_passed` | The `executionDate` is in the past |
| `execution_date_not_business_day` | The `executionDate` is on a weekend |
| `execution_date_format_invalid` | The `executionDate` doesn't follow the [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) format YYYY-MM-DD |

#### Market[](#market)

| Error Code | Description |
| --- | --- |
| `market_invalid` | The `market` isn’t a valid [ISO-3166-1](https://www.iso.org/iso-3166-country-codes.html) Alpha-2 market code |
| `market_missing` | `market` missing from the payment request |
| `market_not_supported` | Tink doesn't support this `market` (yet) |

#### Merchant[](#merchant)

| Error Code | Description |
| --- | --- |
| `merchant_id_invalid` | The `merchant` is invalid |
| `merchant_not_found` | There is no merchant with the provided `merchantId` |

#### Metadata[](#metadata)

| Error Code | Description |
| --- | --- |
| `invalid_characters_in_metadata` | `metadata` keys and values can’t be null |
| `too_long_entry_in_metadata` | The key or value of some `metadata` is too long. Keys can be up to 32 characters. Values can be up to 140 characters |
| `too_many_fields_in_metadata` | `metadata` can’t have more than 5 entries |

#### Payee information[](#payee-information)

| Error Code | Description |
| --- | --- |
| `account_number_missing_for_creditor_account` | `accountNumber` is missing from the `recipient` |
| `account_type_missing_for_creditor_account` | `accountType` is missing from the `recipient` |
| `creditor_account_missing` | The `destinations` array is empty. Either add an account to `destinations` or add a `recipient` |
| `character_not_allowed` | `recipientName` or `sourceMessage` has an invalid character. |
| `creditor_name_length_exceeded` | `recipientName` can’t be more than 30 characters. If the `recipientName` is too long, use the first 30 characters |
| `creditor_name_missing` | `recipientName` is missing from the payment request |
| `invalid_country_code` | The `countryCode` of the `address` isn't a valid [ISO-3166-1](https://www.iso.org/iso-3166-country-codes.html) Alpha-2 or Alpha 3 country code |
| `invalid_destination_account_number` | The `accountNumber` of the `destination` or `recipient` is invalid |
| `invalid_destination_account_type` | The `type` of the `destination` or `accountType` of the `recipient` is invalid |
| `missing_account_number_for_recipient` | `accountNumber` is missing from the `recipient` |
| `missing_account_type_for_recipient` | `accountType` is missing from the `recipient` |
| `missing_city_for_address` | `city` missing from the `address` |
| `missing_country_code_for_address` | `countryCode` missing from the `address` |
| `missing_street_name_for_address` | `streetName` missing from the `address` |
| `missing_street_number_for_address` | `streetNumber` missing from the `address` |

#### Payer information[](#payer-information)

| Error Code | Description |
| --- | --- |
| `invalid_debtor_account_number` | The `accountNumber` of the `sender` doesn’t follow the expected format |
| `invalid_debtor_account_type` | The `accountType` for the `sender` is invalid |
| `sender_first_name_character_not_allowed` | The `firstName` of the `sender` has invalid characters |
| `sender_first_name_length_exceeded` | The `firstName` of the `sender` can’t be more than 999 characters |
| `sender_last_name_character_not_allowed` | The `lastName` of the `sender` has invalid characters |
| `sender_last_name_length_exceeded` | The `lastName` of the `sender` can’t be more than 999 characters |

#### Payment request[](#payment-request)

| Error Code | Description |
| --- | --- |
| `payment_request_not_found` | The `id` doesn’t match an existing payment request |
| `payment_request_id_invalid` | The payment request `id` is invalid |

#### Payment scheme[](#payment-scheme)

| Error Code | Description |
| --- | --- |
| `invalid_payment_scheme` | The `paymentScheme` is invalid. See the [Payment Request model](https://docs.tink.com/api-payment#payment/payment-request/the-payment-request-model) for a list of valid types |
| `invalid_destination_account_type_for_payment_scheme` | The `paymentScheme` isn’t supported by the `accountType` of the `destination` |
| `missing_payment_scheme` | `paymentScheme` is missing from the payment request |

#### Remittance information and reference[](#remittance-information-and-reference)

| Error Code | Description |
| --- | --- |
| `invalid_ocr` | The value of `recipientInformation` doesn’t follow the [Bankgiro specification](https://www.bankgirot.se/en/Support/teknisk-information/) |
| `remittance_information_length_invalid` | The length of the `remittanceInformation` isn’t supported by the provider |
| `remittance_information_type_invalid` | The `type` of `remittanceInformation` isn't supported. See the [remittanceInformation model](https://docs.tink.com/api-payment#payment/payment-request/get-payment-request/response-restpaymentresponse/remittanceinformationdto) for supported types |
| `remittance_information_type_invalid_for_account_type` | The `accountType` doesn’t support the provided `remittanceInformation` type |
| `remittance_information_type_invalid_for_market` | The `market` doesn’t support the provided `remittanceInformation` type |
| `remittance_information_value_invalid` | The `value` of the `remittanceInformation` is invalid |
| `remittance_information_value_missing` | The `value` is missing from `remittanceInformation` |
| `unsupported_remittance_information_type` | Tink doesn't support the provided `remittanceInformation` type |

## SDK errors[](#sdk-errors)

### Error response[](#error-response)

The Tink journey may lead to an error that can’t be resolved in that session. When this happens, Tink displays an error screen with a user-friendly message and returns the error details for you to process. To opt out of Tink’s out-of-the-box error screens and use your own error screens instead, contact [Tink Support](https://docs.tink.com/resources/support).

| KEY | AVAILABILITY | DESCRIPTION |
| --- | --- | --- |
| `error` | Always | Describes the category of the error. See [Error statuses](#error-statuses). |
| `error_reason` | Always | Describes the cause of the error. See the error reasons under each [error status](#error-statuses). |
| `message` | Always | A localized user-facing error message that can be presented directly to your user. |
| `payment_request_id` | Always | The identifier of the payment request. |
| `tracking_id` | Always | Tink's internal identifier for this specific error instance. When contacting Tink about an error, include the `tracking_id` value to help streamline troubleshooting. |
| `credentials` | If credentials were created | The identifier of the credentials object. |
| `error_type` | If `error=AUTHENTICATION_ERROR` | Describes the type of authentication error that has occurred. For details, see [Provider Consent errors](https://docs.tink.com/resources/transactions/provider-consent-errors). |
| `provider_name` | If a provider was selected | The name of the selected bank connection. |
| `state` | If provided in the request URL | The state value provided when starting the journey. |

> When contacting Tink about an error, include the `tracking_id` value to help streamline troubleshooting.

**Example error responses**

BAD\_REQUEST response

```
example.com/callback?
    error=BAD_REQUEST&
    error_reason=INVALID_PARAMETER_CLIENT_ID&
    message=We%E2%80%99re%20sorry%2C%20but%20an%20error%20has%20occurred.&
    payment_request_id=ef1c9454d1344274bc2cef20d8b210b8
    tracking_id=83526f84-226a-43cc-ae2d-2747f394d71b
```

AUTHENTICATION\_ERROR response

```
example.com/callback?
    error=AUTHENTICATION_ERROR&
    error_type=USER_LOGIN_ERROR&
    error_reason=USER_NOT_A_CUSTOMER&
    message=It%20doesn%27t%20look%20like%20you%20are%20a%20customer%20with%20this%20bank.%20Please%20go%20back%20and%20make%20sure%20that%20you%20selected%20your%20bank.&
    tracking_id=04de7a0a-101d-4d87-9f72-857c15783f79
    payment_request_id=ef1c9454d1344274bc2cef20d8b210b8
```

### Error statuses[](#error-statuses)

The error status indicates the type of error. It's always included in the error response and is mapped one-to-one with the `error` parameter. Tink may add new status codes in the future and won’t consider this a breaking change.

| Error status | Description |
| --- | --- |
| `USER_CANCELLED` | The end user cancelled the journey. This status shouldn't be considered as an error. |
| `BAD_REQUEST` | The URL is invalid, usually due to an incorrect or missing URL parameter. |
| `AUTHENTICATION_ERROR` | Something went wrong during the bank’s authentication process. |
| `TEMPORARY_ERROR` | A temporary error in Tink's platform. To resolve, try again later. |
| `INTERNAL_ERROR` | An unexpected error in Tink's platform. For help, [contact support](https://docs.tink.com/resources/getting-started/support). |

#### USER\_CANCELLED[](#user_cancelled)

The user cancelled the journey, either by going back or using the close button. From a user’s perspective, the expected behavior is simply to leave the Tink environment. For that reason, Tink won’t display any error screen for this error status, and we recommend that you don’t treat them as errors. Instead, return your user to the last point prior to launching Tink.

| Error reason | Description |
| --- | --- |
| `USER_CANCELLED` | The user cancelled the Tink Link flow. |
| `USER_DECLINED_CONSENT` | The user declined to provide their consent, which exits the Tink Link flow. |

#### BAD\_REQUEST[](#bad_request)

Something is wrong with the Tink Link URL, usually due to missing or incorrect parameters. For the full list of parameters and values, see the [One-time payments SDK reference](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-sdk-reference).

| Error reason | Description |
| --- | --- |
| `INVALID_PARAMETER_ACCOUNT_DIALOG_TYPE` | The `account_dialog_type` value is incorrect or missing. |
| `INVALID_PARAMETER_AUTHORIZATION_CODE` | One or more of these values are missing: `authorization code`, `handoff session ID`, and `authorization token`. |
| `INVALID_PARAMETER_CLIENT_ID` | The `client_id` value is incorrect or missing. |
| `INVALID_PARAMETER_CREDENTIALS_ID` | The `credentials_id` value is missing. Used only with [permanent users](https://docs.tink.com/resources/payments/resources/aggregation/permanent-users). |
| `INVALID_PARAMETER_FINANCIAL_SERVICES_SEGMENTS` | The `financial_services_segments` value is incorrect or missing. Allowed values: `PERSONAL`, `BUSINESS`. |
| `INVALID_PARAMETER_INPUT_PROVIDER` | The `input_provider` value is longer than 100 characters. |
| `INVALID_PARAMETER_INPUT_USERNAME` | The `input_username` value is incorrect, missing, or longer than 50 characters. |
| `INVALID_PARAMETER_PAYMENT_REQUEST_ID` | The `payment_request_id` value is missing. |
| `INVALID_PARAMETER_REDIRECT_URI` | The `redirect_uri` value is missing or malformed. |
| `INVALID_PARAMETER_REFRESHABLE_ITEMS` | The `refreshable_items` value is incorrect. Allowed values: `CHECKING_ACCOUNTS`, `CHECKING_TRANSACTIONS`, `CREDITCARD_ACCOUNTS`, `CREDITCARD_TRANSACTIONS`, `SAVING_ACCOUNTS`, `SAVING_TRANSACTIONS`. |
| `INVALID_PARAMETER_REPORT_TYPES` | The `report_types` value is incorrect or missing. Shown only when using product bundling. |
| `INVALID_PARAMETER_SCOPE` | The `scope` value is missing. Used only with [Account Aggregation](https://docs.tink.com/resources/aggregation). |
| `INVALID_STATE_ACCESS_TOKEN` | The `access token` value is missing, expired, or incorrect. |
| `INVALID_STATE_AUTHENTICATION` | The [credentialsType](https://docs.tink.com/api-connectivity-v1#connectivity-v1/provider/the-provider-model) is `MOBILE_BANKID` or `THIRD_PARTY_APP` and either the user didn’t successfully authenticate, or the integration doesn't use BankID on a mobile device or a third-party app. |
| `INVALID_STATE_CREDENTIALS` | The credential has reached a `TEMPORARY_ERROR` state. |
| `INVALID_STATE_CREDENTIALS_IS_AWAITING_THIRD_PARTY` | Attempted authentication or refresh of a credential that is in a pending state. Used only with [permanent users](https://docs.tink.com/resources/payments/resources/aggregation/permanent-users). |
| `INVALID_STATE_EMBED_NOT_ALLOWED` | Tink is embedded when embedding isn't allowed. To request the ability to embed Tink, go to **Console** > \[**your\_app**\] > **App settings** > **App details** > **Display name (public)** and select **Verify**. |
| `INVALID_STATE_NON_OPEN_BANKING_PROVIDER` | Attempted authentication of a credential for a non-open-banking provider. Used only with [permanent users](https://docs.tink.com/resources/payments/resources/aggregation/permanent-users). |
| `INVALID_STATE_PAYMENT_RETRY_NOT_ALLOWED` | The `payment_request_id` has already been used. Used only with direct payments. |
| `INVALID_STATE_PERMANENT_USER_FLAG` | Attempted to use permanent users for an app that doesn't have permanent users enabled. |
| `INVALID_STATE_PROVIDER` | The selected provider isn't available. Occurs when a preselected provider doesn't exist in the selected market because:
\- The provider isn't included in the app's provider policy.

\- TThe provider isn't available.

 |
| `INVALID_STATE_PROVIDER_DOES_NOT_RECOGNIZE_USER` | The user has selected a provider that they don’t have an account with. |
| `INVALID_STATE_REDIRECTED_AUTHORIZATION_TOKEN` | A third party is redirecting back to Tink, but the query is missing `authorization_token`. |
| `INVALID_STATE_REDIRECTED_CREDENTIALS_ID` | A third party is redirecting back to Tink, but the query is missing `credentialsId`. |
| `INVALID_STATE_REFRESH_CREDENTIALS_RATE_LIMITED` | The app has exceeded the [API rate limits](https://docs.tink.com/api#introduction/rate-limits) while refreshing credentials. |
| `INVALID_STATE_REDIRECT_URI` | The `redirect_uri` is invalid. Make sure that it's registered in the "App settings" page in [Console](https://console.tink.com/app-settings/client). |
| `INVALID_STATE_SCOPE` | One or more scopes are incorrect or not available for the OAuth client. |

#### AUTHENTICATION\_ERROR[](#authentication_error)

There was an issue during the authentication towards the financial institution. In addition to an error reason, these errors also include an `error_type`.

For a complete list of authentication errors, see [Provider Consent errors](https://docs.tink.com/resources/transactions/provider-consent-errors).

#### TEMPORARY\_ERROR[](#temporary_error)

A temporary error in Tink's platform or a network issue. To resolve any of these errors, try again later.

| Error reason | Description |
| --- | --- |
| `REQUEST_FAILED_CREATE_RESET_CREDENTIALS` | The reset credentials endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_ACCOUNTS` | Couldn't retrieve the user's account. Used only for Account Check or for the reports/bundled flow when Account Check is a bundled product. |
| `REQUEST_FAILED_FETCH_PROVIDER` | Causes:
\- The providers endpoint is unavailable.

\- The selected provider couldn't be found.

\- `input_provider` doesn't exist in the selected market.

\- `input_provider` is not included in the configured Provider Policy.

 |
| `REQUEST_FAILED_OAUTH_DESCRIBE` | The `redirect_uri` parameter is not registered in Console or the OAuth describe endpoint is unavailable. |

#### INTERNAL\_ERROR[](#internal_error)

An unexpected internal error occurred in Tink's platform.

| Error reason | Description |
| --- | --- |
| `REQUEST_FAILED_CONSUME_HANDOFF_SESSION` | The handoff session endpoint is unavailable. |
| `REQUEST_FAILED_CREATE_ACCOUNT_CHECK_REPORT` | The account check endpoint is unavailable. |
| `REQUEST_FAILED_CREATE_ANONYMOUS_USER` | The create anonymous users endpoint is unavailable. |
| `REQUEST_FAILED_CREATE_BULK_PAYMENT` | The bulk payments endpoint is unavailable. |
| `REQUEST_FAILED_CREATE_CREDENTIALS` | Credentials can't be created because the `credentials:write` scope is missing or the Tink credentials service is unavailable. |
| `REQUEST_FAILED_CREATE_HANDOFF_SESSION` | The handoff session endpoint is unavailable. |
| `REQUEST_FAILED_CREATE_INCOME_CHECK_REPORT` | The income check endpoint is unavailable. |
| `REQUEST_FAILED_CREATE_RECURRING_PAYMENT` | The recurring payment endpoint is unavailable. |
| `REQUEST_FAILED_CREATE_REPORT` | The bundled flow endpoint is unavailable. |
| `REQUEST_FAILED_CREATE_RISK_INSIGHTS_REPORT` | The risk insights endpoint is unavailable. |
| `REQUEST_FAILED_CREATE_TRANSFER` | The transfer endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_BULK_PAYMENT` | The bulk payments endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_BULK_PAYMENT_STATUS` | The bulk payments endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_CREDENTIALS` | The credentials endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_EXISTING_USER` | Occurs when:
\- `handoffSessionId` is missing.

\- `authorizationCode` is missing.

\- The handoff session endpoint is unavailable.

\- The authentication/token endpoint is unavailable.

 |
| `REQUEST_FAILED_FETCH_FLOW` | The flow endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_HANDOFF_SESSION` | The handoff session endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_LEGAL_TEXT` | Couldn't the privacy policy or terms and conditions. |
| `REQUEST_FAILED_FETCH_PAYMENT_INFO` | The get payment or get transfer details endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_PAYMENT_TRANSFER_INFO` | The payment transfer endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_PROVIDER_PAYMENT_CONDITIONS` | The payment providers endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_PROVIDERS` | The providers endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_RECURRING_PAYMENT_INFO` | The recurring payment endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_REPORTS_DESCRIBE` | The bundled flow endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_SESSION` | The session endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_TRANSFER_ACCOUNTS` | The transfer accounts endpoint is unavailable. |
| `REQUEST_FAILED_FETCH_USER_WITH_EXISTING_TOKEN` | The user endpoint is unavailable. |
| `REQUEST_FAILED_REFRESH_CREDENTIALS` | The credentials endpoint is unavailable. |
