---
title: "Test different one-time payment scenarios"
source: "https://docs.tink.com/resources/payments/test-different-one-time-payment-scenarios"
exportedAt: "2026-01-13T12:57:07.433Z"
---
## Tink URL[](#tink-url)

The Tink URL is used to start the Tink flow that leads a user to make a payment. Add parameters to a Tink URL to optimize and limit a user's flow. For example, a Tink URL can limit the end user to use only a specific payment provider.

The `market` that you choose decides the `currency` value. In other words, you can't choose a currency that doesn't fit the market. For example, if you choose `IT` as market, you must use `EUR` as currency.

All parameters that are used to build a Tink URL are available in the [One-time payments SDK reference](https://docs.tink.com/resources/payments/one-time-payments-sdk-reference).

## Demo Bank[](#demo-bank)

**Demo Bank** is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios. This is done in a sandbox environment where you can test your end-user flow before it goes into production.

Your demo credentials are found inside Console, so let's start there.

1.  [Log in to Console](https://console.tink.com/login).
2.  Select **Demo Bank**.
3.  Select your **Product** (in this case, Payments) and your **Market**.

![Demo Bank one-time payments](https://images.ctfassets.net/tmqu5vj33f7w/7Jv0BvnNWWwUQLqQrk5oef/7585c40a478527689a40f166a201b2db/one-time-payments_demo_bank.png.png) _Demo Bank user credentials for Payments in the Swedish market._

Each user account in Demo Bank represents a different test case. In Demo Bank, the **Description** field explains the purpose of a user account. For example, **User 1** is used to test a successful scenario for a user with a Swedish social security number and multiple bank accounts.

## Build the URL[](#build-the-url)

The first thing to do is to authenticate your client and create a payment request to generate the `payment request id`. To do this, follow the two first steps in the **Initiate your first one-time payment** article in this order: [1\. Authenticate your client](https://docs.tink.com/resources/payments/initiate-your-first-one-time-payment#authenticate-your-client), then [2\. Create a payment request](https://docs.tink.com/resources/payments/initiate-your-first-one-time-payment#create-a-payment-request).

## Tink flow examples[](#tink-flow-examples)

What follows are examples that show how the Tink flow works when using demo examples. There are many different flow examples, which is why we only present three Tink different flow examples, based on payment status:

-   [Sweden payment, successful](#sweden-payment-successful)
-   [Great Britain payment, canceled](#great-britain-payment-canceled)
-   [Great Britain payment, failed](#great-britain-payment-failed)

For one-time payment examples for all markets, see [Market-specific information](https://docs.tink.com/resources/payments/one-time-payments-market-specific-information). Apart from examples, the article shows which account types, payment schemes, and remittance formats are allowed per market.

For information on how to check a payment status, use our **Response: PaymentRequestTransfersResponse** endpoint, which provides a `status` value that contains the payment status. For information on how it works, see [Check the payment status](https://docs.tink.com/resources/payments/initiate-your-first-one-time-payment#check-the-payment-status).

For information about which payment statuses are available and how to use webhooks to update payment status information in your environment, see [Notifications and webhooks](https://docs.tink.com/resources/payments/one-time-payments-notifications-and-webhooks).

**Note**: screen content varies between markets. For example, Sweden accepts BankID as authentication method, but not England, which is why BankID is listed in the Swedish example but not in the English.

### Sweden payment, successful[](#sweden-payment-successful)

This example follows a user who goes through the entire Tink flow to make a payment and no errors appear.

We use the Swedish market, English as user–interface language, and [https://console.tink.com/callback](https://console.tink.com/callback) as the user-facing callback page.

Tink URL example

```
https://link.tink.com/1.0/pay/?client_id=&redirect_uri=https://console.tink.com/callback&market=SE&locale=en_SE&payment_request_id=
```

In the code example, enter your `client id` and `payment request id` and copy the entire example (by selecting the top right button). Paste the contents into a browser and hit enter.

You have now entered the Tink flow, so let's walk through the example steps. The images that follow are cropped.

![Test-different-one-time-payments-scenarios-01](https://images.ctfassets.net/tmqu5vj33f7w/6mgNcwYcsSJqwgpS9qWs8H/8a9c39d62ae661e6fa1664c96a5caf36/Test-different-one-time-payments-scenarios-01.png)

Because we're going to use Demo Bank credentials to authenticate, select **Tink Demo Bank**.

![Test-different-one-time-payments-scenarios-02](https://images.ctfassets.net/tmqu5vj33f7w/76bVMRJtSL8cG2Uhe7TpgS/c59fbfd65297a951d25f0d007d853faa/Test-different-one-time-payments-scenarios-02.png)

Select **Open Banking**.

![Test-different-one-time-payments-scenarios-03](https://images.ctfassets.net/tmqu5vj33f7w/4TEunRuNyN69RP2QWc7kPR/337daf398fce4e1319a4b26aa1a63495/Test-different-one-time-payments-scenarios-03.png)

Select **Demo Bank Authenticator App**.

![Test-different-one-time-payments-scenarios-04](https://images.ctfassets.net/tmqu5vj33f7w/6eiGQKAIFz274IJWvUNLbG/ea8fc21e5d92a4766f83460a4f9478ee/Test-different-one-time-payments-scenarios-04.png)

Select **Redirect**.

![Test-different-one-time-payments-scenarios-05](https://images.ctfassets.net/tmqu5vj33f7w/1qBj6mUqmSZglyxHjYJu1A/b5c48f62ddbca02bc2f8764dd8eba060/Test-different-one-time-payments-scenarios-05.png)

Select **Continue**.

![Test-different-one-time-payments-scenarios-06](https://images.ctfassets.net/tmqu5vj33f7w/1qgsFLdAkdhXJXm57nDytF/da1702510066c3266694af5474830f10/Test-different-one-time-payments-scenarios-06.png)

Sign in by using Demo Bank credentials. In this case, we'll use credentials for the successful scenario.

![Test-different-one-time-payments-scenarios-07](https://images.ctfassets.net/tmqu5vj33f7w/6ZzRNJ42zH9x1mn5p4xAe1/8503ce9bce70267ced15b85a35c68530/Test-different-one-time-payments-scenarios-07.png)

Select **Authorize**.

![Test-different-one-time-payments-scenarios-08](https://images.ctfassets.net/tmqu5vj33f7w/6ZDfbydpYS6uLM3xWmsdZb/f74eacacbf07047f305d03fbb4948354/Test-different-one-time-payments-scenarios-08.png)

Choose any of the three accounts and select **Pay now**.

![Test-different-one-time-payments-scenarios-09](https://images.ctfassets.net/tmqu5vj33f7w/2535Bdb7H0QR4y3woquro/1ea6e83e3e4f06c7d7421fc0eb2ff86b/Test-different-one-time-payments-scenarios-09.png)

Select **Confirm**.

![Test-different-one-time-payments-scenarios-10](https://images.ctfassets.net/tmqu5vj33f7w/7HmiqpO932fBxZNcpVkZXl/2620afd2330488ca96da4c3009522c4c/Test-different-one-time-payments-scenarios-10.png)

This is the callback screen as provided in the Tink URL.

### Great Britain payment, canceled[](#great-britain-payment-canceled)

This example follows a user who starts the Tink flow and opts to cancel their journey.

We use the English market, English as user–interface language, and [https://console.tink.com/callback](https://console.tink.com/callback) as the user-facing callback page.

Tink URL example

```
https://link.tink.com/1.0/pay/?client_id=&redirect_uri=https://console.tink.com/callback&market=GB&locale=en_GB&payment_request_id=
```

In the code example, enter your `client id` and `payment request id` and copy the entire example (by selecting the top right button). Paste the contents into a browser and hit enter.

You have now entered the Tink flow, so let's walk through the example steps. The images that follow are cropped.

![Test-different-one-time-payments-scenarios-cancelled-english-01](https://images.ctfassets.net/tmqu5vj33f7w/EMWZjT7w22bKVYJqnEs1w/353a7e844e778e2b18ea851e51f95ae3/Test-different-one-time-payments-scenarios-cancelled-english-01.png)

Select **Demo providers - Payments**.

![Test-different-one-time-payments-scenarios-cancelled-english-02](https://images.ctfassets.net/tmqu5vj33f7w/4sQ1QEpZnKCbwgWS5rNhHh/16a11a7628db5ef1b61f1251e812a71e/Test-different-one-time-payments-scenarios-cancelled-english-02.png)

Select **Demo Open Banking Redirect (payment cancelled)**.

![Test-different-one-time-payments-scenarios-cancelled-english-03](https://images.ctfassets.net/tmqu5vj33f7w/5YJgOwyFzE0AMBe2WbWNlF/6663219c0fdcf44b9cbc932407d62cf2/Test-different-one-time-payments-scenarios-cancelled-english-03.png)

Select **Open Demo Open Banking Redirect (payment cancelled) log in**.

![Test-different-one-time-payments-scenarios-cancelled-english-04](https://images.ctfassets.net/tmqu5vj33f7w/4klzcOYIFpEJa8sKqF63Sw/49de034969ced8df49e1c045ebe77d31/Test-different-one-time-payments-scenarios-cancelled-english-04.png)

Select **Identify**.

![Test-different-one-time-payments-scenarios-cancelled-english-05](https://images.ctfassets.net/tmqu5vj33f7w/2YDu7Jam8OrZv9dLETM919/69c1ef6c2e1823c16f457092c441a959/Test-different-one-time-payments-scenarios-cancelled-english-05.png)

Select **Cancel**.

![Test-different-one-time-payments-scenarios-cancelled-english-06](https://images.ctfassets.net/tmqu5vj33f7w/2FN4KpLc2xmdnCukkbfO54/b817113c6cee092d6413d3acdf85a007/Test-different-one-time-payments-scenarios-cancelled-english-06.png)

The callback screen shows the `USER_CANCELLED` error message.

### Great Britain payment, failed[](#great-britain-payment-failed)

This example follows a user who starts the Tink flow and somehow fails to complete their journey.

We use the English market, English as user–interface language, and [https://console.tink.com/callback](https://console.tink.com/callback) as the user-facing callback page.

Tink URL example

```
https://link.tink.com/1.0/pay/?client_id=&redirect_uri=https://console.tink.com/callback&market=GB&locale=en_GB&payment_request_id=
```

In the code example, enter your `client id` and `payment request id` and copy the entire example (by selecting the top right button). Paste the contents into a browser and hit enter.

You have now entered the Tink flow, so let's walk through the example steps. The images that follow are cropped.

![Test-different-one-time-payments-scenarios-cancelled-english-01](https://images.ctfassets.net/tmqu5vj33f7w/EMWZjT7w22bKVYJqnEs1w/353a7e844e778e2b18ea851e51f95ae3/Test-different-one-time-payments-scenarios-cancelled-english-01.png)

Select **Demo providers - Payments**.

![Test-different-one-time-payments-scenarios-cancelled-english-02](https://images.ctfassets.net/tmqu5vj33f7w/4sQ1QEpZnKCbwgWS5rNhHh/16a11a7628db5ef1b61f1251e812a71e/Test-different-one-time-payments-scenarios-cancelled-english-02.png)

Select **Demo Open Banking Redirect (payment failed)**.

![Test-different-one-time-payments-scenarios-failed-english-01](https://images.ctfassets.net/tmqu5vj33f7w/L9XOkYb2qt3deAPD561oJ/cd34f6b5f7430a6652e6d8a4af0f2ac8/Test-different-one-time-payments-scenarios-failed-english-01.png)

Select **Open Demo Banking Redirect (payment failed) log in**.

![Test-different-one-time-payments-scenarios-cancelled-english-04](https://images.ctfassets.net/tmqu5vj33f7w/4klzcOYIFpEJa8sKqF63Sw/49de034969ced8df49e1c045ebe77d31/Test-different-one-time-payments-scenarios-cancelled-english-04.png)

Select **Identify**.

![Test-different-one-time-payments-scenarios-failed-english-02](https://images.ctfassets.net/tmqu5vj33f7w/3Jkmy6iBgD0Kq8S2gCNDSO/c49567bf6b43dc43c6eee840e6ac789b/Test-different-one-time-payments-scenarios-failed-english-02.png)

This page shows that and why the payment attempt failed.
