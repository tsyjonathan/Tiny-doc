---
title: "Test different Variable Recurring Payment scenarios"
source: "https://docs.tink.com/resources/payments/variable-recurring-payments/test-different-variable-recurring-payments-scenarios"
exportedAt: "2026-01-13T12:43:06.390Z"
---
## Demo Bank[](#demo-bank)

**Demo Bank** is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios. This is done in a sandbox environment where you can test your end-user flow before it goes into production.

Your demo credentials are found inside Console, so let's start there.

1.  [Log in to Console](https://console.tink.com/login).
2.  Select **Demo Bank**.
3.  Select your **Product** (in this case, Payments) and your **Market**.

![Demo Bank payments](https://images.ctfassets.net/tmqu5vj33f7w/1gNdS9hj4IfA4iQUFQKy2Z/af52041580f242f0775207172e00856f/Demo_bank-payments.png) _Demo Bank user credentials for Payments in the United Kingdom market._

For testing initiating a Variable Recurring Payment (VRP) mandate in Demo Bank we will use the **User 1**.

## Select a test provider[](#select-a-test-provider)

The first thing to do is to find which Demo Bank provider to use when creating a sweeping VRP mandate. To learn which Demo Bank providers allow `VRP_SWEEPING`, filter the list of providers by querying the [providers endpoint](https://docs.tink.com/api#connectivity/provider/list-providers-for-a-market). Use the `pisCapability` query parameter with the value `VRP_SWEEPING` and the `includeTestProvider` query parameter with the value `true`:

`https://api.tink.com/api/v1/providers/GB?pisCapability=VRP_SWEEPING&includeTestProviders=true`

## Build the URL[](#build-the-url)

After a Demo Bank provider is selected you can create a sweeping VRP mandate and create a Tink URL to allow the end user to authorize the mandate. To do this, follow the first five steps in the [Initiate a sweeping Variable Recurring Payment](https://docs.tink.com/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment) article in this order:

1.  [Authenticate your client for mandate creation](https://docs.tink.com/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment#authenticate-your-client-for-mandate-creation)
2.  [Create a permanent user](https://docs.tink.com/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment#create-a-permanent-user)
3.  [Create a sweeping VRP mandate](https://docs.tink.com/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment#create-a-sweeping-variable-recurring-payment-mandate)
4.  [Create a user authorization code](https://docs.tink.com/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment#create-a-user-authorization-code)
5.  [Authorize a sweeping VRP mandate](https://docs.tink.com/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment#authorize-a-sweeping-variable-recurring-payment-mandate)

You’ll find instructions on how to build the Tink URL in the [Authorize a sweeping VRP mandate](#authorize-a-sweeping-variable-recurring-payment-mandate) step.

## Example of a successful sweeping Variable Recurring Payment[](#example-of-a-successful-sweeping-variable-recurring-payment)

This example follows a user who goes through the Tink flow to authorize a sweeping VRP mandate. Once the mandate has been successfully authorized, you can initiate a sweeping VRP.

We use [https://console.tink.com/callback](https://console.tink.com/callback) as the user-facing callback page.

Tink URL example

```
https://link.tink.com/1.0/pay/vrp-mandate?client_id=&consent_id=&authorization_code=&redirect_uri=https://console.tink.com/callback
```

In the code example, enter your `client_id`, `authorization_code` and `consent_id` and copy the entire example (by selecting the top right button). Paste the contents into a browser and hit enter.

You have now entered the Tink flow, so let's walk through the example steps. The images that follow are cropped.

![Frame 1](https://images.ctfassets.net/tmqu5vj33f7w/4Y2vahflehKZmemlOYqZVG/8116187ab083ed80ef08c0ffdafb928c/Frame_1.png)

Select **Continue**.

![Frame 2](https://images.ctfassets.net/tmqu5vj33f7w/O8RHHsglENJDWgGD31fBe/5ec1dc94f0de2af698a7bc716cf5ef38/Frame_2.png)

Select **Confirm**.

![Frame 3](https://images.ctfassets.net/tmqu5vj33f7w/6lw7sZ5TkMhmOOdJUd1vId/fe34361f7ea099a54ee8d22b294c6fc6/Frame_3.png)

Select **Continue**.

![Frame 4](https://images.ctfassets.net/tmqu5vj33f7w/5TmLCWJvZskY9dAwbNhcSq/9c5cbc7a2033942d00fade5f1c045456/Frame_4.png)

Sign in by using Demo Bank credentials. In this case, we'll use credentials for the successful scenario.

![Frame 5](https://images.ctfassets.net/tmqu5vj33f7w/4hDzNjY9jArven2tZ5VdHt/e0012a00e37a6457417f4423ddefc506/Frame_5.png)

Choose any of the accounts and select **Continue**. Note that this step is skipped if the mandate was created with a payer account specified.

![Frame 6](https://images.ctfassets.net/tmqu5vj33f7w/676dklarn3rkbMh3tLAhOj/61a2791a07d7cae21da83be4b7a9d62d/Frame_6.png)

Select **Confirm**.

![Frame 7](https://images.ctfassets.net/tmqu5vj33f7w/7lt6t692BvHJvcJ24wbTnu/ed0926a3ff05d52cab2768d0b028414d/Frame_8.png)

Select **Back to Merchant**.

![Frame 8](https://images.ctfassets.net/tmqu5vj33f7w/6Gw9nIdWPj8bV7EmZ2V2KJ/656a05d424ae53f51a93d753fbe34ba1/Frame_7.png)

Your sweeping VRP mandate is now ready to be used to initiate a Variable Recurring Payment. To do this, follow the steps to [Authenticate your client for VRP initiation](https://docs.tink.com/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment#authenticate-your-client-for-variable-recurring-payments-initiation) and [Initiate a sweeping VRP](https://docs.tink.com/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment#initiate-a-sweeping-variable-recurring-payment).

To learn about how you can revoke a sweeping VRP mandate, follow this step to [Revoke a sweeping VRP mandate](https://docs.tink.com/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment#revoke-a-sweeping-variable-recurring-payment-mandate).
