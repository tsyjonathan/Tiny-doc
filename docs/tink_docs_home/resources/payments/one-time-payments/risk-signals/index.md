---
title: "Risk Signals - Tink Docs"
source: "https://docs.tink.com/resources/payments/one-time-payments/risk-signals"
exportedAt: "2026-01-13T12:42:02.071Z"
---
## What is Risk Signals?[](#what-is-risk-signals-)

Risk Signals is an add-on feature for Payments that uses account, transaction and payment data to prevent fraudulent behaviour to keep your payments safe.

Risk Signals is currently available for one-time payments and settlement accounts in Germany, Italy, Austria, and Sweden.

While open-banking payments aren’t any less safe than other types of payments, there are opportunities that bad actors can exploit, such as payment cancellation, or targeting banks’ PSD2 implementations. This is especially true for non-instant schemes and bank transfers, such as SEPA credit.

Risk Signals is specially designed for open banking payments to achieve the most secure payments while keeping the highest possible conversion rate.

## How does it work?[](#how-does-it-work-)

Risk Signals is a set of rules based on Account Information Service (AIS) data, payment data and settings that can flag and abort suspicious payments.

Tink configures Risk Signals as a service, so you don’t need to do any specific implementation.

### Settings & checks[](#settings-amp-checks)

Risk Signals checks include velocity controls, balance verification and checks on the payer’s transaction history. The specific checks and configuration that Tink uses will depend on your use case.

![Risk Signals flow](https://images.ctfassets.net/tmqu5vj33f7w/imA7HLyJ3MoswOn6Xq8jw/fd37c91acb54ff586aab4d6761656cac/Risk_signals_flow.jpg)

The Risk Signals checks are executed right after the user has selected their bank account in the Payments journey and has done their first strong customer authentication for [AIS+PIS markets & flows](https://docs.tink.com/resources/payments/one-time-payments/payments-flow-optimization-overview).

To ensure the most reliable transaction history checks, we recommend that you add a unique reference (`remittanceInformation`) when creating the [payment request](https://docs.tink.com/api#payment/payment-request/create-payment-request).

The `remittanceInformation` value should follow an alphanumeric format with no special characters and shouldn’t include any personal information.

### User match[](#user-match)

If you operate in a higher-risk industry or need to make sure that payments are initiated by known users and account numbers, Tink can enable an additional check to verify whether the user details match the account holder name. Tink will block the payment if there’s a mismatch.

When this feature is enabled, you can pass in the account holder’s name and/or their account details as part of the `sender` object in your [payment request](https://docs.tink.com/api-payment#payment/payment-request). Tink will perform either an exact match or partial match depending on how name check has been configured and will always check for exact matches for account numbers.

Example payment request with a sender

```
curl -v -X POST https://api.tink.com/api/v1/payments/requests \ 
   -H 'Authorization: Bearer ' \ 
   -H 'Content-Type: application/json' \ 
   -d '{ 
        ... 
       “sender”:  
           { 
               “accountNumber”: “1234567890”, 
               “accountType”: “checking”, 
               “firstName”: “Max”, 
               “lastName”: “Mustermann” 
       }'
```

To learn more about this check, see [User Match](https://docs.tink.com/resources/account-check/user-match). To enable this check, reach out to your Tink representative.

### Status & errors[](#status-amp-errors)

If the payer or transaction is flagged in a check, the payment will be rejected and Tink will display an error screen with a user-friendly message. Error statuses and reasons are appended to the callback URI, just like with any other Payments flow.

When polling for payment status when Risk Signals is enabled, you’ll get a new status code `422` for payments that fail due to being aborted by Risk Signals. This status is returned by the  [Get Transfer endpoint](https://docs.tink.com/api#payment/payment-request/get-transfers-for-payment-request) and our webhook event [payment:updated](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-notifications-and-webhooks#event-payment-updated) in the `statusMessage` field.

Tink Customers will also receive a new error code with the `FAILED` status of the payment. Error code for Risk signals is `422` with message `Payment blocked`. This is returned with the status when customer does their reconciliation with the [Get Transfer endpoint](https://docs.tink.com/api#payment/payment-request/get-transfers-for-payment-request) or our webhook event [payment:updated](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-notifications-and-webhooks#event-payment-updated) in the `statusMessage` field.

The callback URI is called with these 3 query params when payment is rejected with Risk Signals:

-   error=USER\_CANCELLED\_WITH\_ALTERNATE\_FLOW
-   error\_reason=FAILED\_FRAUD\_PREVENTION\_CHECK
-   message=We're sorry, an error has occurred

### How to test using Demobank[](#how-to-test-using-demobank)

The testable scenario is for our Max amount check that blocks payments that are over **999 EUR**. To test this scenario, you need a sandbox app with Risk Signals enabled.

To test a blocked or successful payment scenario:

-   Initiate a Demobank payment according to our regular [guide](https://docs.tink.com/resources/payments/one-time-payments/test-different-one-time-payment-scenarios). When creating the payment request, set the `amount` to **above** 999 EUR if testing blocked payments or **under** 999 EUR if testing successful payments.
-   Choose Demobank in provider selection on the the sandbox app
-   Follow the Tink Link to initiate the payment
-   The payment will be blocked after the AIS step for amounts over 999 EUR
