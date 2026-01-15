---
title: "Bank selection - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/payments-flow-optimization-bank-selection/"
exportedAt: "2026-01-13T12:42:25.787Z"
---
The bank selection screen is the first step of the payment flow in Tink Link for web, enabling the user to select their bank. You can configure this screen to either be shown as part of the Tink Link web flow, or host it in your own app for a more embedded experience.

This step can be skipped if you already know the user’s bank account provider and can populate it as a parameter, streamlining the payment flow for the user.

*Image removed: Flow optimization - bankID-1*

## Hosting the screen in Tink Link[](#hosting-the-screen-in-tink-link)

This is the default setting when implementing Tink Link for web. The screen above is then shown as part of the Tink Link web flow and can be skipped as explained below.

## Hosting the screen in your own app[](#hosting-the-screen-in-your-own-app)

You can alternatively build and host the bank selection screen in your own app. First step is to list the banks that are enabled for Payments by using the [provider endpoint](/Tiny-doc/tink_docs_api/api/#connectivity/provider/list-providers-for-a-market) with the TRANSFER capability as parameter: `[external url removed] This will return the proper subset of providers that will be available to do payments for the specific market.

Then you can populate the `input_provider` parameter as described [here](/Tiny-doc/tink_docs_home/resources/payments/start-payment/#construct-a-payment-link), the user lands directly in the flow without needing to select their bank again.

## Populating the users’ chosen bank[](#populating-the-users-chosen-bank)

When a user has selected their bank for the first time, we recommend storing the chosen bank (using the `input_provider` parameter) on your end and populating this parameter the next time they enter the flow. This way, the user only needs to select their bank once, meaning a shorter user journey. If the user wishes to select a different bank, by not populating the `input_provider` parameter you will instead direct them to the bank selection screen, where they can choose another.
