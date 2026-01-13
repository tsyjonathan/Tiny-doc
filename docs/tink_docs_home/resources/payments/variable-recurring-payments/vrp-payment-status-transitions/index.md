---
title: "Variable Recurring Payment status transition"
source: "https://docs.tink.com/resources/payments/variable-recurring-payments/vrp-payment-status-transitions"
exportedAt: "2026-01-13T12:43:20.531Z"
---
When a Variable Recurring Payment (VRP) mandate has successfully been created and authorized, payments can be initiated by using that mandate. When a payment has been initiated, most users want to know the exact status of an initiated payment. In other words, it's important to know if, for example, a payment initiation is sent, settled, canceled, or failed.

The purpose of tracking the status of an initiated payment is to provide end users with information while their payment is in progress and/or for internal purposes, for example, to create events.

### Available Variable Recurring Payment statuses[](#available-variable-recurring-payment-statuses)

![vrp-status-transitions-diagram](https://images.ctfassets.net/tmqu5vj33f7w/6vom3lgp0wU66oBN6sZVz3/b62a7b3ed58012d2e1a62939bb63cd6b/vrp-status-transitions-diagram.png)

When you initiate a VRP, the status of the payment is immediately set to `CREATED`. This is the intermediate state. The payment ultimately changes to one of these statuses:

-   `SENT`: Payment has been sent to the bank
    -   `SETTLED_PAYER`: Payment has been initiated and funds have been settled and moved from the payer's account. Note: This status is in beta version and not yet available in all Tink markets or for all payments.
    -   `SETTLED_PAYEE`: Payment has been initiated and funds have been settled and moved to the payee's account. Note: This status is in beta version and not yet available in all Tink markets or for all payments.
-   `FAILED`: Payment was unsuccessful due to an unexpected error, for example, an anomalous response from a bank.
-   `CANCELLED`: The payment was unsuccessful due to an expected error. Expected errors are well-known problems that prevent payment initiation from succeeding. For example, a status will be `CANCELLED` when an account contains insufficient funds.

### Status transitions[](#status-transitions)

-   Every request starts with the payment status `CREATED`, immediately after payment initiation.
-   Poll the payment status every 30 seconds until you get one of the following final statuses: `SENT`, `SETTLED_PAYER`, `SETTLED_PAYEE`, `CANCELLED`, or `FAILED`.
-   If you haven't received a final status after 9 minutes, stop polling. At this point, only an end user's bank can see the cause of the problem.

A payment status can be tracked in two ways. We recommend using webhooks as it means you don’t have to check a status but instead be informed when the status changes:

### Via webhooks[](#via-webhooks)

You can set up a webhook for your app and receive notifications whenever the status changes to one of the final statuses.

### Via our API[](#via-our-api)

To get the status for given mandate payment see [Get mandate payment](https://docs.tink.com/api#payment/mandate-payment/get-mandate-payment) in our API docs.

## Webhooks[](#webhooks)

Follow [this guide](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-notifications-and-webhooks) in order to set up a webhook for your app.

## Available event[](#available-event)

| Event | Description |  |
| --- | --- | --- |
| `mandate-payment:updated` | This event is triggered when the status of a mandate payment has been updated to one of the final statuses. |  |

## Event: Mandate payment updated[](#event-mandate-payment-updated)

It's possible to use [webhooks](https://docs.tink.com/api#events-v2) to subscribe to the `mandate-payment:updated` event.

### Event content[](#event-content)

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| id | string | The id, in uuid v4 format, of the mandate payment. | Yes |
| consentId | string | The consent id, in uuid v4 format, used for creating a mandate payment. | Yes |
| merchantId | string | The merchant id, in uuid v4 format, for the mandate payment. | No |
| providerId | string | The provider (financial institution) name that the mandate is connected to. | Yes |
| type | string | The type of the mandate payment. Defined by the sub-type used in the creation of your mandate. Values: `VRP_COMMERCIAL`, `VRP_SWEEPING`. | Yes |
| amount | [CurrencyExactAmount](https://docs.tink.com/api#payment/mandate-payment/create-mandate-payment/response-response/currencyexactamount) | The payment amount. | Yes |
| status | string | The status of the mandate payment. Values: `CANCELLED`, `CREATED`, `FAILED`, `SENT`, `SETTLED_PAYEE`, `SETTLED_PAYER`. | Yes |
| statusMessage | string | A message explaining the current status of the payment. | Yes |
| remittanceInformation | [RemittanceInformation](https://docs.tink.com/api#payment/mandate-payment/create-mandate-payment/response-response/remittanceinformation) | The structured remittance information for the mandate payment. This value will be populated to end-to-end identification at the bank. | Yes |
| payeeAccount | [PayeeAccount](https://docs.tink.com/api#payment/mandate-payment/create-mandate-payment/response-response/payeeaccount) | The payee account for the mandate payment. | Yes |
| payerAccount | [PayerAccount](https://docs.tink.com/api#payment/mandate-payment/create-mandate-payment/response-response/payeraccount) | The payer account of the mandate payment. | Yes |
| createdTime | string | The timestamp at which the mandate payment was created, ISO 8601 date and time format in UTC (YYYY-MM-DDThh:mm:ssZ). | Yes |
| updatedTime | string | The timestamp at which the mandate payment was updated, ISO 8601 date and time format in UTC (YYYY-MM-DDThh:mm:ssZ). | Yes |

### Example[](#example)

This is an example of the `mandate-payment:updated` event.

```
{
  "context" : {
    "userId" : "eb004275140748a18d52679c00d56aa4"
  },
  "event" : "mandate-payment:updated",
  "content" : {
      "id": "b6704301-8a12-46a5-a315-c3cebd9b899c",
      "consentId": "c63dc11e-b210-4a96-9461-2061389789e7",
      "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
      "providerId": "uk-natwest-oauth2",
      "type": "VRP_SWEEPING",
      "amount": {
        "currencyCode": "GBP",
        "value": {
          "scale": 2,
          "unscaledValue": 100
        }
      },
      "status": "SETTLED_PAYER",
      "statusMessage": "Payment has been initiated and the funds have been settled and moved from the payer's account.",
      "remittanceInformation": {
        "type": "REFERENCE",
        "value": "Payment description."
      },
      "payeeAccount": {
        "name": "Tom John Savings Account",
        "number": 10000031510604,
        "type": "SORT_CODE"
      },
      "payerAccount": {
        "holderName": "Tom John",
        "number": 10000031510604,
        "type": "SORT_CODE"
      },
      "createdTime": "2022-10-12T09:35:39Z",
      "updatedTime": "2022-10-12T09:35:39Z"
    }
}
```
