---
title: "Test different one-time payment scenarios"
source: "/Tiny-doc/tink_docs_home/resources/payments/test-different-one-time-payment-scenarios/"
exportedAt: "2026-01-13T12:57:07.433Z"
---
## Tink URL[](#tink-url)

The Tink URL is used to start the Tink flow that leads a user to make a payment. Add parameters to a Tink URL to optimize and limit a user's flow. For example, a Tink URL can limit the end user to use only a specific payment provider.

The `market` that you choose decides the `currency` value. In other words, you can't choose a currency that doesn't fit the market. For example, if you choose `IT` as market, you must use `EUR` as currency.

All parameters that are used to build a Tink URL are available in the [One-time payments SDK reference](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments-sdk-reference/).

## Demo Bank[](#demo-bank)

**Demo Bank** is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios. This is done in a sandbox environment where you can test your end-user flow before it goes into production.

Your demo credentials are found inside Console, so let's start there.

1.  Log in to Console.
2.  Select **Demo Bank**.
3.  Select your **Product** (in this case, Payments) and your **Market**.

*Image removed: Demo Bank one-time payments* _Demo Bank user credentials for Payments in the Swedish market._

Each user account in Demo Bank represents a different test case. In Demo Bank, the **Description** field explains the purpose of a user account. For example, **User 1** is used to test a successful scenario for a user with a Swedish social security number and multiple bank accounts.

## Build the URL[](#build-the-url)

The first thing to do is to authenticate your client and create a payment request to generate the `payment request id`. To do this, follow the two first steps in the **Initiate your first one-time payment** article in this order: [1\. Authenticate your client](/Tiny-doc/tink_docs_home/resources/payments/initiate-your-first-one-time-payment/#authenticate-your-client), then [2\. Create a payment request](/Tiny-doc/tink_docs_home/resources/payments/initiate-your-first-one-time-payment/#create-a-payment-request).

## Tink flow examples[](#tink-flow-examples)

What follows are examples that show how the Tink flow works when using demo examples. There are many different flow examples, which is why we only present three Tink different flow examples, based on payment status:

-   [Sweden payment, successful](#sweden-payment-successful)
-   [Great Britain payment, canceled](#great-britain-payment-canceled)
-   [Great Britain payment, failed](#great-britain-payment-failed)

For one-time payment examples for all markets, see [Market-specific information](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments-market-specific-information/). Apart from examples, the article shows which account types, payment schemes, and remittance formats are allowed per market.

For information on how to check a payment status, use our **Response: PaymentRequestTransfersResponse** endpoint, which provides a `status` value that contains the payment status. For information on how it works, see [Check the payment status](/Tiny-doc/tink_docs_home/resources/payments/initiate-your-first-one-time-payment/#check-the-payment-status).

For information about which payment statuses are available and how to use webhooks to update payment status information in your environment, see [Notifications and webhooks](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments-notifications-and-webhooks/).

**Note**: screen content varies between markets. For example, Sweden accepts BankID as authentication method, but not England, which is why BankID is listed in the Swedish example but not in the English.

### Sweden payment, successful[](#sweden-payment-successful)

This example follows a user who goes through the entire Tink flow to make a payment and no errors appear.

We use the Swedish market, English as user–interface language, and [external url removed] as the user-facing callback page.

Tink URL example

```
[external url removed]
```

In the code example, enter your `client id` and `payment request id` and copy the entire example (by selecting the top right button). Paste the contents into a browser and hit enter.

You have now entered the Tink flow, so let's walk through the example steps. The images that follow are cropped.

*Image removed: Test-different-one-time-payments-scenarios-01*

Because we're going to use Demo Bank credentials to authenticate, select **Tink Demo Bank**.

*Image removed: Test-different-one-time-payments-scenarios-02*

Select **Open Banking**.

*Image removed: Test-different-one-time-payments-scenarios-03*

Select **Demo Bank Authenticator App**.

*Image removed: Test-different-one-time-payments-scenarios-04*

Select **Redirect**.

*Image removed: Test-different-one-time-payments-scenarios-05*

Select **Continue**.

*Image removed: Test-different-one-time-payments-scenarios-06*

Sign in by using Demo Bank credentials. In this case, we'll use credentials for the successful scenario.

*Image removed: Test-different-one-time-payments-scenarios-07*

Select **Authorize**.

*Image removed: Test-different-one-time-payments-scenarios-08*

Choose any of the three accounts and select **Pay now**.

*Image removed: Test-different-one-time-payments-scenarios-09*

Select **Confirm**.

*Image removed: Test-different-one-time-payments-scenarios-10*

This is the callback screen as provided in the Tink URL.

### Great Britain payment, canceled[](#great-britain-payment-canceled)

This example follows a user who starts the Tink flow and opts to cancel their journey.

We use the English market, English as user–interface language, and [external url removed] as the user-facing callback page.

Tink URL example

```
[external url removed]
```

In the code example, enter your `client id` and `payment request id` and copy the entire example (by selecting the top right button). Paste the contents into a browser and hit enter.

You have now entered the Tink flow, so let's walk through the example steps. The images that follow are cropped.

*Image removed: Test-different-one-time-payments-scenarios-cancelled-english-01*

Select **Demo providers - Payments**.

*Image removed: Test-different-one-time-payments-scenarios-cancelled-english-02*

Select **Demo Open Banking Redirect (payment cancelled)**.

*Image removed: Test-different-one-time-payments-scenarios-cancelled-english-03*

Select **Open Demo Open Banking Redirect (payment cancelled) log in**.

*Image removed: Test-different-one-time-payments-scenarios-cancelled-english-04*

Select **Identify**.

*Image removed: Test-different-one-time-payments-scenarios-cancelled-english-05*

Select **Cancel**.

*Image removed: Test-different-one-time-payments-scenarios-cancelled-english-06*

The callback screen shows the `USER_CANCELLED` error message.

### Great Britain payment, failed[](#great-britain-payment-failed)

This example follows a user who starts the Tink flow and somehow fails to complete their journey.

We use the English market, English as user–interface language, and [external url removed] as the user-facing callback page.

Tink URL example

```
[external url removed]
```

In the code example, enter your `client id` and `payment request id` and copy the entire example (by selecting the top right button). Paste the contents into a browser and hit enter.

You have now entered the Tink flow, so let's walk through the example steps. The images that follow are cropped.

*Image removed: Test-different-one-time-payments-scenarios-cancelled-english-01*

Select **Demo providers - Payments**.

*Image removed: Test-different-one-time-payments-scenarios-cancelled-english-02*

Select **Demo Open Banking Redirect (payment failed)**.

*Image removed: Test-different-one-time-payments-scenarios-failed-english-01*

Select **Open Demo Banking Redirect (payment failed) log in**.

*Image removed: Test-different-one-time-payments-scenarios-cancelled-english-04*

Select **Identify**.

*Image removed: Test-different-one-time-payments-scenarios-failed-english-02*

This page shows that and why the payment attempt failed.
