---
title: "Set up settlement accounts - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/set-up-settlement-accounts-one-time-payments/"
exportedAt: "2026-01-13T12:41:59.301Z"
---
## What is a settlement account?[](#what-is-a-settlement-account-)

Settlement Accounts are virtual bank accounts that are set up and managed by Tink. The accounts provide aggregated settlements, which enables features like real-time payment status updates, refunds and withdrawals, automated reconciliation and integrated reporting.

You can set up a single account or set up multiple accounts for specific business units or use cases. Accounts can be configured and interacted with through either [Console](/Tiny-doc/tink_docs_home/resources/console/) or a direct integration with our [Settlement Accounts API](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/create-account).

> Settlement accounts are available in the UK and in Euro markets and support GBP and EUR currencies.

### Creating a Settlement Account[](#creating-a-settlement-account)

New settlement accounts can be created via [Console](/Tiny-doc/tink_docs_home/resources/console/) or [API](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts).

You can choose between 2 account structures:

-   Merchant settlement accounts are tied to a specific merchant, which should be specified when creating the account.
-   Acquirer settlement accounts can accept payins from multiple merchants. When creating the account via Console, tick ‘Acquirer account’ and select “-” as the Merchant. When creating the account via API, set the `merchantId` to “-”.

> **Note:** For acquirer accounts, the `merchantId` must be set to “-” when calling the get account and list accounts endpoints. When calling the get transaction and list transactions endpoints, you can set the `merchantId` to “-”, which returns all transactions for the acquirer account, or a you can provide a specific `merchantId`, which limits the responses to the merchant-specific transactions.

### Setting up payout accounts[](#setting-up-payout-accounts)

Funds in settlement accounts should be paid out to a corporate account, called a payout account.

You can set the payout account when creating a settlement account’s configuration, either in Console or with the Settlement Accounts API, or add one later. Due to sensitive nature of payouts, payout accounts can only be configured once per settlement account and can’t be updated without [contacting support](/Tiny-doc/tink_docs_home/entries/articles/how-to-find-technical-support/).

### Paying into settlement accounts[](#paying-into-settlement-accounts)

Payments made to a settlement account are called pay-ins. Pay-ins come in three types:

| Type | Description |
| --- | --- |
| `PAYIN` | A successfully reconciled payment made into a settlement account using Tink Payments |
| `MERCHANT_PAYIN` | Any payment made from your pre-configured ‘payoutAccount’ |
| `EXTERNAL_PAYIN` | Any pay-in that Tink can't reconcile |

### Pay-ins with Tink APIs[](#pay-ins-with-tink-apis)

To pay into a settlement account using Payments, create a payment request using the [Create Settlement Account Payment Request](/Tiny-doc/tink_docs_api/api/#payment/settlement-accounts/create-payment-request) endpoint for Settlement accounts (not the generic payment request endpoint).

When making the request, you'll need to include the  `merchant_id` and `account_id`, which you can find in **Console > Payments > Settlements**.

Once you've created a payment request, [build a Tink URL](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/initiate-your-first-one-time-payment/#build-a-tink-url) and present it to your user so they can initiate the payment.

> **Note:** save the value `id` of the payment request (called `paymentRequestId` for webhooks) delivered in the response when you create the payment so that you can track the payment, poll our APIs for statuses, and make it easier to troubleshoot when speaking with Support.

### Pay-ins with a manual transfer[](#pay-ins-with-a-manual-transfer)

To pay in to a settlement account using a manual bank transfer, use the account identifier found in Console or returned by the [Get account](/Tiny-doc/tink_docs_api/api/#payment/settlement-accounts/get-account) endpoint. Typically, you make manual transfers from your `payoutAccount` to top up a settlement account so that you have enough funds to make refunds or withdrawals.

> Make sure that the transfer is made using a payment scheme and currency supported by the settlement account.

## Payouts[](#payouts)

Payouts are payments from your settlement accounts to a user's bank account or a configured `payoutAccount`. Payouts can be one of four types: `SWEEP`, `REFUND`, `WITHDRAWAL`, and `TRANSFER`.

| Payout Type | Description |
| --- | --- |
| `SWEEP` | A transfer of a settlement account's available balance to a payout account on a scheduled basis |
| `REFUND` | A transfer of a full or partial previous transaction amount to an end-user |
| `WITHDRAWAL` | A transfer to an end-user |
| `TRANSFER` | A transfer not initiated using Tink |

> When making refunds and withdrawals, you need to include [Idempotency-Key](/Tiny-doc/tink_docs_api/api/#introduction/idempotency-and-caching) in the request header. This allows users to safely retry failed operations without the risk of transferring more funds than intended.

By default, Tink executes all payouts with SEPA Instant Credit Transfer (SCT Inst) for EUR payments and falls back to SEPA Credit Transfer (SCT) if the receiving account doesn't support inbound SCT Inst. For the UK, we use Faster Payments. If the payout is over the SCT Inst (€100,000) or Faster Payments (£1,000,000) scheme limit it will be initiated via SCT or CHAPS respectively.

SCT Inst and Faster Payments typically settle within a few seconds, while SCT and CHAPS can take up to one business day.

### Sweeps[](#sweeps)

A `SWEEP` is a transfer of a settlement account's available balance to a payout account according to a set schedule. When configuring a payout account, you can set the payout frequency to `DAILY`, `WEEKLY`, or `MONTHLY`.

We initiate sweeps at 6:30AM UTC and include all pay-ins made since 6:30AM UTC at the start of the previous payout interval (daily, weekly, or monthly). How fast the `SWEEP` settles depends on the scheme used to execute the payment.

To have enough funds after a sweep, you can either top-up through a `MERCHANT_PAYIN` or until enough regular `PAYIN` transactions have funded the account.

Optionally, you can configure the reserved amount to set a float on the account to be held and not paid out through a `SWEEP`. This limits the number of manual top-ups you would need to otherwise do to cover eventual refunds and withdrawals.

### Refunds[](#refunds)

You can make a full or partial refund to an end user bank account through our [refund endpoint](/Tiny-doc/tink_docs_api/api/#payment/settlement-accounts/create-refund). The refunded amount can be any amount up to the full value of the original payment.

To initiate a refund:

-   Get the `id` of the `PAYIN` transaction to be refunded. Refunds can only be initiated from and to the same accounts.
-   Create a refund request using the `id` as the `transactionId` value. Tink will check that the transaction is eligible for a refund and that the refund `amount` doesn’t exceed the original transaction amount.
-   Tink executes the refund and updates the balance on your account.
-   Get notified of the status of the refund by either polling the [refund endpoint](/Tiny-doc/tink_docs_api/api/#payment/settlement-accounts/get-refund) or by [webhook](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/set-up-settlement-accounts-one-time-payments/#event-settlement-payout-updated).

**Example refund request**

```
{ 
  "amount": { 
    "currencyCode": "EUR", 
    "value": { 
      "scale": "2", 
      "unscaledValue": "5000" 
    } 
  }, 
  "metadata": { 
    "key1": "value1", 
    "key2": "value2" 
  }, 
  "reference": "Refund7ad0feabb4ab", 
  "scheme": "SEPA_INSTANT_CREDIT_TRANSFER", 
  "transactionId": "7ad0feab-bd55-449d-aa7e-b3d3b9c62550" 
} 
```

**Example response**

```
{ 
  "accountId": "161ec210-721f-4df5-b21c-f78a9d4c1545", 
  "amount": { 
    "currencyCode": "EUR", 
    "value": { 
      "scale": "2", 
      "unscaledValue": "5000" 
    } 
  }, 
  "createdTime": "2022-07-14T14:01:53Z", 
  "id": "b58d313a-b778-4639-8e31-c9ffc35e2d01", 
  "merchantId": "e06e47f1-8c88-47ee-9415-a4cde72ae598", 
  "metadata": { 
    "key1": "value1", 
    "key2": "value2" 
  }, 
  "reference": "Refund7ad0feabb4ab", 
  "scheme": "SEPA_INSTANT_CREDIT_TRANSFER", 
  "status": "COMPLETED", 
  "transactionId": "7ad0feab-bd55-449d-aa7e-b3d3b9c62550", 
  "updatedTime": "2022-07-14T14:08:53Z" 
}
```

If the user’s account associated with the original transaction is no longer available, you’ll need to:

-   Instruct the user to perform a penny-drop pay-in (a pay-in for the lowest possible amount) from their new account
-   Execute a withdrawal to the user for the refund amount plus the penny-drop amount. You need to execute a withdrawal and not a refund, because the amount you are sending exceeds the penny-dop transaction amount. From the user’s perspective, this is just a refund.

Before initiating a refund, make sure that your account has sufficient funds or the refund will fail.

### Withdrawals[](#withdrawals)

Use the [Create withdrawal endpoint](/Tiny-doc/tink_docs_api/api/#payment/settlement-accounts/create-withdrawal) to initiate a payout to an end-user. Withdrawals can be of any amount and can only be initiated to users that have made a pay-in to your account. Withdrawals differ from refunds in that payouts to the user can exceed the original transaction amount, while refunds cannot.

> Make sure to grab the `id` of the most recent `PAYIN` transaction for the user when initiating the `WITHDRAWAL`. This helps ensure that the user’s account details are up to date and thus the payment is more likely to succeed.

Before initiating a withdrawal, make sure that your account has sufficient funds or the withdrawal will fail.

## Reconciliation[](#reconciliation)

Tink matches Tink one-time payments against the `PAYIN` transactions using the payment `reference`. If this matching fails, then transaction will be marked as an `EXTERNAL_PAYIN`. For example, this can occur if the amount is different, or the receiving bank modifies the reference in some way.

This is done through a unique 8-character `reference` that Tink generates when creating a payment request (pay-in). When you supply the value of the `reference` (a string of up to 10 characters), Tink will append it to the reference it generated and return the complete reference string in the response.

You can also add your own identifiers and references in the `metadata` field that will be returned with the payment and transaction in our notifications, both API and Webhooks. You set metadata fields when you  create the [payment request](/Tiny-doc/tink_docs_api/api/#payment/settlement-accounts/create-payment-request).

Notification and reporting are served back to the merchant via API, webhook and our console.

## Checking statuses[](#checking-statuses)

Payment statuses give you details on the state of a payment during the payment journey. When a payment has landed on the settlement account, you receive a new payment status transition event named `SETTLED`.

Status and transaction details can be received through:

-   [Webhooks](#webhooks): Get notified as soon as the payment status changes.
-   [List transactions](/Tiny-doc/tink_docs_api/api/#payment/settlement-accounts/list-transactions): Get a list of transactions, including payloads, made to and from the account during the designated period.
-   [Get refunds](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/get-refund) or [List refunds](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/list-refunds): Retrieve a specific refund or list of refunds for a specific settlement account and merchant.
-   [Get withdrawals](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/get-withdrawal) or [List withdrawals](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/list-withdrawals): Retrieve a specific withdrawal or list of withdrawals, for a specific settlement account and merchant.

With Settlement Accounts, you get all the [statuses](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/one-time-payments-status-transitions/) that you get with One-Time Payments plus the status `SETTLED` for payments that have been successfully deposited into your settlement account. You also get additional statuses for payouts.

**Payout statuses**

| Status | Description |
| --- | --- |
| `PENDING` | The payout is in progress and waiting to be completed. |
| `FAILED` | The payout failed due to an error. For example, because of insufficient funds in the settlement account. |
| `COMPLETED` | The payout has been sent successfully, and money has been debited from your settlement account. |

### Webhooks[](#webhooks)

We have webhook events available for pay-ins, payouts and status changes on the account. We recommend subscribing to the following events:

-   `settlement-transaction:created` to be notified when a transaction has occurred on your account, including both pay-ins and payouts.
-   `settlement-payout:updated` for changes to payout statuses.
-   `settlement-account:updated` for changes to account status.

For details on how to subscribe to webhooks, see [Set up a webhook](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments-notifications-and-webhooks/#set-up-a-webhook).

#### Event: settlement-transaction:created[](#event-settlement-transaction-created)

This event is fired when a transaction that corresponds to an existing settlement account for any of the users of your app is created.

This happens if a:

-   `PAYIN` has been processed
-   `SWEEP` has been executed
-   `REFUND` has completed
-   `WITHDRAWAL` has completed

**Event content**

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| `merchant_id` | string | The merchant ID for which the transaction was created. | Yes |
| `account_id` | string | The settlement account ID for which the transaction was created. | Yes |
| `transaction_id` | string | The transaction that triggered the event. | Yes |
| `amount` | unscaled\_value:number, scale: number | The transaction amount. | Yes |
| `currency_code` | string | The currency of the transaction. | Yes |
| `timestamp` | Date | The timestamp for when the notification was created. | Yes |
| `reference` | string | The transaction's reference. | No |
| `account_balance` | unscaled\_value:number, scale: number | The current balance of the account after the transaction has been completed. | Yes |
| `paymentRequestId` | string | The identifier of the settlement payment request. This identifier is also present in the [settlement account payment request response](/Tiny-doc/tink_docs_api/api/#payment/settlement-accounts/create-payment-request/response-settlementaccountpaymentrequest). | No |
| `payer_account` | identifier: string, type: string | The source account of the transaction. | Yes |
| `payee_account` | identifier: string, type: string | The destination account of the transaction. | No |
| `metadata` | Map of string, string | A key-value dictionary with custom metadata for the transaction | No |
| `payer_name` | string | The name associated with source account | No |
| `payee_name` | string | The name associated with destination account | No |
| `type` | string | The transaction type. Example values: `PAYIN`, `SWEEP`, `REFUND`, `WITHDRAWAL`, etc. | No |
| `original_transaction_id` | string | The transaction ID for which a `SWEEP`, `REFUND`, or `WITHDRAWAL` has been created. | No |
| `refund_id` | string | The ID of the refund, if the transaction type is `REFUND`. | No |

**Example settlement-transaction:created event**

```
{
  "content": {
    "merchantId": "73f97f20-2ee4-4aa4-8512-8b40cc493895",
    "accountId": "530ad3ea-fb5d-44c6-92d3-c3e9a53073b3",
    "transactionId": "31514ed1-fef4-46f0-a45b-7fba0f751e7a",
    "amount": 23.0,
    "currencyCode": "EUR",
    "timestamp": 1685091120000,
    "reference": "YbudeDP7xzs",
    "accountBalance": 23.00,
    "paymentRequestId": "cb3421e65c8f4de182b8bb5949460c8b",
    "payerAccount": {
      "identifier": "DE16BALM43920987808408",
      "type": "IBAN"
    },
    "payeeAccount": {
      "identifier": "",
      "type": "ACCOUNT_IDENTIFIER_TYPE_UNSPECIFIED"
    },
    "metadata": {
      "yourKey1": "yourValue1",
      "yourKey2": "yourValue2"
    },
    "originalTransactionId": "",
    "type": "PAYIN",
    "refundId": "",
    "payerName": "James Bond",
    "payeeName": ""
  },
  "event": "settlement-transaction:created"
}
```

#### Event: settlement-payout:updated[](#event-settlement-payout-updated)

This event is fired when a payout of type `SWEEP`, `REFUND` or `WITHDRAWAL` has been executed and has reached one of the two final states: `COMPLETED` or `FAILED`.

**Example settlement-transaction:created event**

```
{
  "content": {
    "id": "14af5bf1-5f6d-45ea-bf6e-a732a6a2325e",
    "type": "REFUND",
    "merchantId": "73f97f20-2ee4-4aa4-8512-8b40cc493895",
    "accountId": "530ad3ea-fb5d-44c6-92d3-c3e9a53073b3",
    "appId": "4d2328776f2346a2bb0e5f1289c99b71",
    "payeeName": "James Bond",
    "payeeAccount": {
      "identifier": "DE16BALM43920987808408",
      "type": "IBAN"
    },
    "amount": 23.00,
    "currencyCode": "EUR",
    "reference": "YbudeDP7xzs",
    "metadata": {},
    "timestamp": 1685091140246,
    "status": "FAILED",
    "statusMessage": "Vendor has returned an error response."
  },
  "event": "settlement-payout:updated"
}
```

#### Event: settlement-account:updated[](#event-settlement-account-updated)

This event is fired when the status of an existing settlement account is updated, meaning it has transitioned between `ENABLED`, `SUSPENDED` or `TERMINATED`.

**Event content**

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| `merchant_id` | string | The merchant ID for which the transaction was created. | Yes |
| `account_id` | string | The settlement account ID for which the transaction was created. | Yes |
| `status` | string | The updated status for the corresponding settlement account. Example values: `ENABLED`,`SUSPENDED`, and `TERMINATED`. | Yes |

**Example settlement-account:updated event**

```
{ 
  "content": {
    "merchantId": "73f97f20-2ee4-4aa4-8512-8b40cc493895",
    "accountId": "530ad3ea-fb5d-44c6-92d3-c3e9a53073b3",
    "status": "ENABLED"
  },
  "event": "settlement-account:updated"
}
```
