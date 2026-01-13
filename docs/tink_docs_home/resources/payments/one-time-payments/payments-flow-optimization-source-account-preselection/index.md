---
title: "Source account preselection - Tink Docs"
source: "https://docs.tink.com/resources/payments/one-time-payments/payments-flow-optimization-source-account-preselection"
exportedAt: "2026-01-13T12:56:52.503Z"
---
The next step in the flow is the source (or debtor) account selection screen. By preselecting a source account, you remove the need for the user to select an account each time they make a payment, simplifying the experience. This way, you can enable returning users to proceed immediately to the payment flow.

![Flow optimization - Account selection](https://images.ctfassets.net/tmqu5vj33f7w/1Z0jx1REtUrWtZD0a5w8Ok/205e1704c3919cd0d5a4db432ca48bb0/Flow_optimization_-_Account_selection.png)

This screen will always be shown when the source account is not known or provided, or in cases where the source account is required by the bank to start the payment.

In markets where the user authenticates through a web redirect, such as the UK and France, this screen is instead shown as part of the bank redirect. By providing the source account as described above, you can ensure this step will be skipped during the bank redirect too.

## How to retrieve a user’s source account[](#how-to-retrieve-a-user-s-source-account)

### A. If the user has not previously initiated a payment:[](#a-if-the-user-has-not-previously-initiated-a-payment-)

1.  Create the [initial payment request](https://docs.tink.com/resources/payments/initiate-your-first-one-time-payment#create-a-payment-request).
2.  Build a [Tink URL](https://docs.tink.com/resources/payments/initiate-your-first-one-time-payment#build-a-tink-url).
3.  Once the initial payment has been executed, you can retrieve the account used by [retrieving the transfer for a payment request](https://docs.tink.com/api#payment/payment-request/get-transfers-for-payment-request).

### B. If the user has previously initiated a payment:[](#b-if-the-user-has-previously-initiated-a-payment-)

1.  Retrieve the source account used by calling the [payment request endpoint](https://docs.tink.com/api#payment/payment-request/get-transfers-for-payment-request) for the specific payment.
2.  Get the `uri` from the [PaymentSourceResponse](https://docs.tink.com/api#payment/payment-request/get-transfers-for-payment-request/response-paymentrequesttransfersresponse/paymentsourceresponse).

### C. If the user has aggregated their accounts (this applies if you’re using Payments with other Tink products, and consequently "permanent users"):[](#c-if-the-user-has-aggregated-their-accounts-this-applies-if-you-re-using-payments-with-other-tink-products-and-consequently-quot-permanent-users-quot-)

1.  Complete the initial aggregation of the user’s data.
2.  Retrieve the [account information](https://docs.tink.com/api#data-v1/account/list-accounts) for the user. More [information about permanent users](https://docs.tink.com/resources/tink-link-web/tink-link-web-permanent-users#app-wrapper).
3.  Show the list of accounts to the user before initiating the payment.
4.  Select the proper identifier from the `identifiers` attribute in the [response](https://docs.tink.com/api#data-v1/account).

### D. If you know the user’s source account from another source:[](#d-if-you-know-the-user-s-source-account-from-another-source-)

Use the following format to create the value for the `uri` or the `identifier`:

-   For all SEPA Countries, excluding Sweden and the UK: `iban://{iban number}`
-   For Sweden: `se://{clearingnumber}{accountnumber}` _Note: SEB (se-seb-ob) uses an IBAN format when you retrieve the `uri` from the [PaymentSourceResponse](https://docs.tink.com/api#payment/payment-request/get-transfers-for-payment-request/response-paymentrequesttransfersresponse/paymentsourceresponse)._
-   For the UK (as also explained [here](https://docs.tink.com/resources/payments/one-time-payments-market-specific-information#uk-)): `sort-code://{sortcode}{accountnumber}`
-   For NO (as also explained [here](https://docs.tink.com/resources/payments/one-time-payments-market-specific-information#norway-)): `bban://{bankidentifier}{accountnumber}`

## How to provide the source account in a Tink Link session[](#how-to-provide-the-source-account-in-a-tink-link-session)

Once you’ve retrieved the source account to preselect on the user’s behalf, you can provide this when you create a Tink Link session. This ensures the user will skip the account selection step entirely.

-   Use the `uri` when creating a [Session](https://docs.tink.com/resources/payments/one-time-payments-sdk-sessions). This will skip the account selection screen.

Or, if you’re using Payments alongside Account Aggregation with permanent users:

-   Use the identifier when creating a Tink Link session. This will lead to Tink Link skipping the account selection screen.

Session request example

```
curl -X POST https://api.tink.com/link/v1/session \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{"source_account_number": "se://12340011223"}'
```

**Example of the response**

```
HTTP/ 1.1 200 OK
Content-Type: application/json
{
  "sessionId": "{SESSION_ID}"
}
```

If you want to allow the user to select another source account, simply refrain from providing the source account in the Tink Link session and the user will be shown the source account selection screen.

You can now instatiate the Tink Link for web with a session by adding the `{SESSION_ID}` at the URL as explained [here](https://docs.tink.com/resources/payments/one-time-payments-sdk-sessions#initiate-tink-link-with-a-session).

Information about the Tink Link session can be found on the [API Reference](https://docs.tink.com/api#general/tink-link-session).
