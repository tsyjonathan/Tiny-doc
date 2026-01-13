---
title: "Payment status transitions - Tink Docs"
source: "https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-status-transitions"
exportedAt: "2026-01-13T12:42:32.704Z"
---
When a payment request is created, payment can be initiated. When a payment has been initiated, most users want to know the exact status of an initiated payment. In other words, it's important to know if, for example, a payment initiation is sent, partially sent, canceled, or failed.

The purpose of tracking the status of an initiated payment is to provide end users with information while their payment is in progress and/or for internal purposes, for example, to create events.

A payment request is stateless; once created, it lives forever. The `transfers` that are connected to the payment request have statuses and are trackable.

We recommend that you make sure that no more than one payment request corresponds to no more than one `transfer`. When you [check the status of your one-time payment request](https://docs.tink.com/resources/payments/initiate-your-first-one-time-payment#check-the-payment-status), make sure that only one transfer is listed. To use our API to check a payment-initiation status, see [Get transfers for status request](https://docs.tink.com/api#payment/payment-request/get-transfers-for-payment-request).

### Available transfer statuses[](#available-transfer-statuses)

![Payment status](https://images.ctfassets.net/tmqu5vj33f7w/2nkljOEBZ3FjLAu7td9pKf/71c218a6cf15665b7eb9ef3e08062c91/Payment_status.png)

When you initiate a payment, the status of the `payment` is immediately set to `CREATED`. This is the intermediate state. The `payment` ultimately changes to one of these statuses:

-   `SENT`: Payment has been sent to the bank
    -   `SETTLED_PAYER`: Payment has been initiated and funds have been moved from the payer's account. Note: This status is in beta version and not yet available in all Tink markets or for all payments.
    -   `SETTLED_PAYEE`: Payment has been initiated and funds have been moved to the payee's account. Note: This status is in beta version and not yet available in all Tink markets or for all payments.
-   `PARTIALLY_SENT`: This status isn't used for one-time payments, only for bulk payments.
-   `SETTLED`: Payment has been received at a Tink settlement account. Note: This status is only applicable for customers that have the Settlement feature enabled, where Tink is collecting the funds. For more information on settlement accounts, see [Set up settlement accounts](https://docs.tink.com/resources/payments/one-time-payments/set-up-settlement-accounts-one-time-payments).
-   `FAILED`: Payment was unsuccessful due to an unexpected error, for example, an anomalous response from a bank.
-   `CANCELLED`: The payment was unsuccessful due to an expected error. Expected errors are well-known problems that prevent payment initiation from succeeding. Examples of cases where a status will be `CANCELLED`: a user that fails to authorize a payment, or an account contains insufficient funds. This status will also be returned if a payment initiation is abandoned by a user during a bank redirect. After 9 minutes, the payment initiation is cancelled and the transfer status is set to `CANCELLED`.

In addition to the statuses above, a status is transitioned from `CREATED` to `AWAITING_CREDENTIALS` (intermediate state) when we need [supplemental information](https://docs.tink.com/resources/aggregation/credentials) from the user.

### Status transitions[](#status-transitions)

-   Every request starts with the `payment` status `CREATED`, immediately after the payment initiation is created.
-   The usual round-trip time for an entire payment initiation flow is approximately 1 minute.
-   Poll the `payment`status every 1 minute until you get one of the following final statuses: `SENT`, `SETTLED`, `CANCELLED`, or `FAILED`.
-   If you haven't received a final status after 9 minutes, stop polling. At this point, only a user's bank can see the cause of the problem.

### Set up webhooks for your app[](#set-up-webhooks-for-your-app)

Instead of polling the payment status, you can set up a webhook and receive notification whenever `payment` status is set to one of the following final statuses: `SENT`, `SETTLED`, `CANCELLED`, or `FAILED`.

For information on how to set up webhooks, see [Notifications and webhooks](https://docs.tink.com/resources/payments/one-time-payments-notifications-and-webhooks).
