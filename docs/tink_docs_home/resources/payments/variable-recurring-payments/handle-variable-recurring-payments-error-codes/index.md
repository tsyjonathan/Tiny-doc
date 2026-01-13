---
title: "Handle Variable Recurring Payments error codes"
source: "https://docs.tink.com/resources/payments/variable-recurring-payments/handle-variable-recurring-payments-error-codes"
exportedAt: "2026-01-13T12:43:12.418Z"
---
This article contains two different types of error codes sections:

-   [SDK error codes](#sdk-error-codes)
-   [API error codes](#api-error-codes)

## SDK error codes[](#sdk-error-codes)

## Error response[](#error-response)

The SDK journey can result in a non-recoverable error. After the user has encountered a non-recoverable error, the SDK redirects to the specified `redirect_uri`, which includes the query parameters that describe the exact error.

| KEY | AVAILABILITY | DESCRIPTION |
| --- | --- | --- |
| `error` | Always | A status code that describes the category of the error. For details, see [Error statuses](#error-statuses). |
| `error_reason` | Always | The error reason that describes the cause of the error. For details, see the error reasons below for the specific `error` status code. |
| `error_type` | If `error=AUTHENTICATION_ERROR` | Describes the type of authentication error that has occurred. For details, see [Provider Consent errors](https://docs.tink.com/resources/transactions/provider-consent-errors). |
| `message` | Always | A localized end-user facing error message that can be presented directly to the end user. |
| `tracking_id` | Always | Tink's internal identifier for this specific error instance. Make sure to include the `tracking_id` value when communicating with Tink to reduce time required to troubleshooting issues. |
| `consent_id` | Always | The identifier of the consent. |

The response can also include this non-error specific parameter if it was specified in the SDK URL:

| KEY | DESCRIPTION |
| --- | --- |
| `state` | The state value that was provided when starting the journey (if available). |

If you decide to contact Tink regarding an error you are seeing, make sure to include the `tracking_id` value in your request to reduce troubleshooting time.

## Error statuses[](#error-statuses)

The error status describes the category for the error that occurred. The error status is always included in the error response. New status codes may be added in the future and will be considered a non-breaking API change.

| Error status | Description |
| --- | --- |
| USER\_CANCELLED | The end user canceled the journey. This status should not be considered as an error. |
| AUTHENTICATION\_ERROR | The error occurred during the authentication process with the bank. |
| INTERNAL\_ERROR | An unexpected internal error in Tink's platform. Please contact [support](https://docs.tink.com/resources/getting-started/support) for help. |

### USER\_CANCELLED[](#user_cancelled)

The end user canceled the journey, either by going back or selecting the close button. This status should not be treated as an error, no error screen should be presented in your application, and you should return the end user to the step prior to launching Tink.

| ERROR REASON | DESCRIPTION |
| --- | --- |
| BANK\_AUTHORIZATION\_CANCELLED | The bank authorization was canceled. |
| USER\_CANCELLED | The end user canceled the Tink Link flow. |
| USER\_DECLINED\_CONSENT | The user declined to provide their consent, which exits the Tink Link flow. |

### AUTHENTICATION\_ERROR[](#authentication_error)

This category of errors is the result of an error occurring during the authentication step with the financial institution. More information about the error and its source follows:

| ERROR REASON | DESCRIPTION |
| --- | --- |
| `INVALID_STATE_CONSENT` | The consent was revoked or expired. |
| `BANK_AUTHORIZATION_FAILED` | The consent authorization failed. |

For a complete list of authentication errors, see [Provider Consent errors](https://docs.tink.com/resources/transactions/provider-consent-errors).

### INTERNAL\_ERROR[](#internal_error)

An unexpected internal error occurred in Tink's platform.

| ERROR REASON | DESCRIPTION |  |
| --- | --- | --- |
| REQUEST\_FAILED\_GET\_CONSENT | The request to fetch consent failed. |  |
| REQUEST\_FAILED\_AUTHORIZE\_CONSENT | The consent authorization failed. |  |
| REQUEST\_FAILED\_GET\_CONSENT\_AUTHORIZATION | The consent could not be fetched. |  |
| REQUEST\_FAILED\_FETCH\_PROVIDER | The associated provider could not be fetched. |  |
| INVALID\_STATE\_CONSENT | The consent is in an unknown state. |  |
| REQUEST\_TIMEOUT\_GET\_CONSENT | The request to fetch consent has timed out. |  |
| REQUEST\_TIMEOUT\_GET\_CONSENT\_AUTHORIZATION | The request to fetch consent authorization has timed out. |  |

## API error codes[](#api-error-codes)

Tink will return a HTTP status code whenever there is something wrong with a request towards our platform. The error response will also contain details of why a request went wrong. The error response model is following the specification of [RFC 7807: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc7807).

### Status codes[](#status-codes)

-   `2xx` are success status codes that confirm your request worked as expected.
-   `4xx` are error status codes that indicate that an error occured while processing your request due to the information provided. For example, a missing parameter. `4xx` errors that can be handled programatically will also return an error code which is a short string that identifies what went wrong in more detail, as well as an error message that is readable by a human.
-   `5xx` are error status codes that indicate something is wrong with the Tink platform itself.

### Error model attributes[](#error-model-attributes)

`type string` A URI reference that describes the problem type. Tink has two problem types: [Invalid request arguments](#invalid-request-arguments) and [Request precondition failed](#request-precondition-failed). An error can be without a problem type and will in that case have this field as not present or its value set to `about:blank`. In case this field is set as `about:blank` or not present, it indicates that the error is self-explanatory from the HTTP status.

`title string` A short, human-readable summary of the error.

`status number` HTTP status code.

`detail string` A human-readable explanation specific to this occurrence of the problem for the developer.

`instance string` A URI reference that identifies the occurrence of the error for a request. For example, as a `request-id` `urn:uuid:669113c5-cf35-945a-83b6-72cca995147a` or as a `trace-id` `urn:trace:id:1234a456b789cdef`.

### Tink problem types with extension attributes[](#tink-problem-types-with-extension-attributes)

#### Invalid request arguments[](#invalid-request-arguments)

Whenever a request parameters are in an invalid format from the expected. In other words, when a required field is missing, Tink will return an error having a type of `urn:errors:invalid-argument`, a title of Invalid request arguments and a status of 400. With this problem type one extension attribute is added: invalidParams

`invalidParams array` An array of invalid parameters that caused the request to fail. An invalid parameter has the child attributes name and reason.

`name string` The field name with the request path that caused the request to fail.

`reason string` An explanation of the failed field validation.

**Example response:**

```
{
    “type“: “urn:errors:invalid-argument”,
    “title“: “Invalid request arguments”,
    “status”: 400,
    “instance”:”urn:uuid:0b5c1a25-724c-44a7-9ac2-237ed6a84732”,
    “invalidParams”: [{
        “name”: “Idempotency-Key”,
        “reason”: “Required request header must be present.”
    }, {
        “name”: “amount.currencyCode”,
        “reason”: “Currency does not match the currency on the consent. On consent: GBP, on payment: EUR”
    }, {
        “name”: “merchantId”,
        “reason”: “The merchant id is in invalid format. Must be in UUID v4.”
    }]

}
```

#### Request preconditions failed[](#request-preconditions-failed)

Whenever a request cannot be executed on the server because of the current state of the system, Tink will return an error having a type of `urn:errors:precondition-failed`, a title of Request preconditions failed and a status of 400. With this problem type one extension attribute is added: validations.

`violations array` An array of all precondition violations. A precondition violation has the child attributes type and subject.

`type string` The violation type of why the request cannot be executed.

`subject string` Identifies the resource type or resource id this type is tied to. Subject is in the following format: `<resource>` or `<resource>/<id>`.

**Example response:**

```
{
    “type“: “urn:errors:precondition-failed”,
    “title“: “Request preconditions failed”,
    “status”: 400,
    “detail”: “Consent must be in valid state. Current consent state is: INITIALIZED.”,
    “instance”:”urn:uuid:c647e248-7423-4e46-ab04-8e9897feef90”,
    “validations”: [{
        “type”: “INVALID_CONSENT_STATE”,
        “subject”: “consents/ab768d59-5025-421f-bf96-9b7eb02c8277”
    }]

}
```

**Violation types for Variable Recurring Payments**

| Violation Type | Meaning |
| --- | --- |
| `INVALID_CONSENT_STATE` | The request cannot be executed because the consent is not in the required state. |
| `PAYMENT_NON_COMPLIANT` | Payment parameters or the way in which a payment is being executed are not legally compliant. |
| `CONSENT_NOT_FOUND` | The consent ID that was given in the request does not exist. |
| `CONSENT_TYPE_NOT_SUPPORTED` | The request cannot be executed because an unsupported consent type has been used. |
| `CONSENT_SUBTYPE_NOT_SUPPORTED` | The request cannot be executed because an unsupported consent subtype has been used. |

### Errors without a problem type[](#errors-without-a-problem-type)

When an error response is without a problem type (either the type field is not present or set to `about:blank`), it indicates that the error is self-explanatory from the HTTP status. The error model field title will be defined by the name of the status. It may also come with the field detail, explaining the problem as a message for the developer.

**Example response:**

```
{
    “title“: “Conflict”,
    “status”: 409,
    “detail”: “A request with the same Idempotency-Key for the same operation is being processed.”,
    “instance”:”urn:uuid:ab768d59-5025-421f-bf96-9b7eb02c8277”
}
```

**Possible errors without problem type for Variable Recurring Payments**

| Status | Detail |
| --- | --- |
| `401` | Invalid bearer token provided (has it expired?). |
| `403` | App is not enabled for `VRP_SWEEPING`. |
| `404` | Mandate payment ID is not found. |
| `409` | A request with the same Idempotency-Key for the same operation is being processed. |
| `422` | This operation is idempotent and it requires correct usage of Idempotency Key. Idempotency Key MUST not be reused across different payloads of this operation. |
| `500` | Internal error when processing the request. |
