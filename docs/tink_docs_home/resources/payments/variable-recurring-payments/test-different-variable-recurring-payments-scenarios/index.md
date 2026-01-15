---
title: "Test different Variable Recurring Payment scenarios"
source: "/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/test-different-variable-recurring-payments-scenarios/"
exportedAt: "2026-01-13T12:43:06.390Z"
---
## Demo Bank[](#demo-bank)

**Demo Bank** is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios. This is done in a sandbox environment where you can test your end-user flow before it goes into production.

Your demo credentials are found inside Console, so let's start there.

1.  Log in to Console.
2.  Select **Demo Bank**.
3.  Select your **Product** (in this case, Payments) and your **Market**.

*Image removed: Demo Bank payments* _Demo Bank user credentials for Payments in the United Kingdom market._

For testing initiating a Variable Recurring Payment (VRP) mandate in Demo Bank we will use the **User 1**.

## Select a test provider[](#select-a-test-provider)

The first thing to do is to find which Demo Bank provider to use when creating a sweeping VRP mandate. To learn which Demo Bank providers allow `VRP_SWEEPING`, filter the list of providers by querying the [providers endpoint](/Tiny-doc/tink_docs_api/api/#connectivity/provider/list-providers-for-a-market). Use the `pisCapability` query parameter with the value `VRP_SWEEPING` and the `includeTestProvider` query parameter with the value `true`:

`[external url removed]

## Build the URL[](#build-the-url)

After a Demo Bank provider is selected you can create a sweeping VRP mandate and create a Tink URL to allow the end user to authorize the mandate. To do this, follow the first five steps in the [Initiate a sweeping Variable Recurring Payment](/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment/) article in this order:

1.  [Authenticate your client for mandate creation](/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment/#authenticate-your-client-for-mandate-creation)
2.  [Create a permanent user](/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment/#create-a-permanent-user)
3.  [Create a sweeping VRP mandate](/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment/#create-a-sweeping-variable-recurring-payment-mandate)
4.  [Create a user authorization code](/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment/#create-a-user-authorization-code)
5.  [Authorize a sweeping VRP mandate](/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment/#authorize-a-sweeping-variable-recurring-payment-mandate)

You’ll find instructions on how to build the Tink URL in the [Authorize a sweeping VRP mandate](#authorize-a-sweeping-variable-recurring-payment-mandate) step.

## Example of a successful sweeping Variable Recurring Payment[](#example-of-a-successful-sweeping-variable-recurring-payment)

This example follows a user who goes through the Tink flow to authorize a sweeping VRP mandate. Once the mandate has been successfully authorized, you can initiate a sweeping VRP.

We use [external url removed] as the user-facing callback page.

Tink URL example

```
[external url removed]
```

In the code example, enter your `client_id`, `authorization_code` and `consent_id` and copy the entire example (by selecting the top right button). Paste the contents into a browser and hit enter.

You have now entered the Tink flow, so let's walk through the example steps. The images that follow are cropped.

*Image removed: Frame 1*

Select **Continue**.

*Image removed: Frame 2*

Select **Confirm**.

*Image removed: Frame 3*

Select **Continue**.

*Image removed: Frame 4*

Sign in by using Demo Bank credentials. In this case, we'll use credentials for the successful scenario.

*Image removed: Frame 5*

Choose any of the accounts and select **Continue**. Note that this step is skipped if the mandate was created with a payer account specified.

*Image removed: Frame 6*

Select **Confirm**.

*Image removed: Frame 7*

Select **Back to Merchant**.

*Image removed: Frame 8*

Your sweeping VRP mandate is now ready to be used to initiate a Variable Recurring Payment. To do this, follow the steps to [Authenticate your client for VRP initiation](/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment/#authenticate-your-client-for-variable-recurring-payments-initiation) and [Initiate a sweeping VRP](/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment/#initiate-a-sweeping-variable-recurring-payment).

To learn about how you can revoke a sweeping VRP mandate, follow this step to [Revoke a sweeping VRP mandate](/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment/#revoke-a-sweeping-variable-recurring-payment-mandate).
