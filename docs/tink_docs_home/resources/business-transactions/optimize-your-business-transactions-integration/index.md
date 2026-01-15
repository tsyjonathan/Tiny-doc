---
title: "Optimize your Business Transactions integration"
source: "/Tiny-doc/tink_docs_home/resources/business-transactions/optimize-your-business-transactions-integration/"
exportedAt: "2026-01-13T12:47:04.555Z"
---
Tests always show that the best–performing integrations are ones where the transition between an app and Tink feels smooth, secure, and coherent. Integrate successfully in three steps:

1.  Explain why the user is asked to share information.
2.  Use our design and theming options to seamlessly fit Tink into your app.
3.  Make optimizations that are specific to your integration.

Customers that follow our optimization advice tend to increase both conversion rates and customer satisfaction.

Most users only want to get a job done. For example, set up a savings goal, create a budget, or just visualize their spending. They don't want to be stopped on their way to have to think about where your app ends and where the Tink flow starts. This is why it's important to holistically consider the user experience when creating digital apps and services.

For Business Transactions, the job-to-be-done is usually all about convenience and security. Users want an easy flow that they can trust. You can help the user to achieve this. When preparing your users to enter the Tink flow, make sure to focus on the value they are about to get (convenience and security) and not so much on Tink, or the technical reasons for why you chose to integrate with Tink.

### Focus on the job-to-be-done[](#focus-on-the-job-to-be-done)

*Image removed: TRX optimize example 1.1* As seen in the example above, don't let the user focus too much on Tink. This may disconnect the user from the action that they need to take.

### Encourage, reassure, and set expectations[](#encourage-reassure-and-set-expectations)

*Image removed: TRX optimize example 2.1* Users often won't care and don't need to care about Tink as part of their flow. What is important, is that the user needs to feel that they can trust your integration and that they know what will be asked of them in the next flow step. If trust isn't felt, users risk entering Tink unprepared, potentially causing them to go back in the flow to double-check details or forward without their authentication device at hand just to investigate.

## 2\. Use our design and theming options to fit Tink seamlessly into your app[](#use-our-design-and-theming-options-to-fit-tink-seamlessly-into-your-app)

From a technical perspective, your integration with Tink is a combination of three different flows. These flows are visualized as follows:

*Image removed: UX guide brand before final*

From an end-user perspective, the transition between three different brands risks creating a disjointed and confusing user experience. Tink can't directly change the look and feel of a bank's authentication flow, so we provide you with the option to customize the look and feel of the Tink flow to make sure that it is consistent with your own brand.

Styling the Tink flow helps your users focus on the job to be done, removing the distraction that visual inconsistencies can be. This is especially important if your brand differs a lot from our default theme.

You will find design and theming options to style your Tink flow in the Tink Console.*Image removed: Tink Console*

## 3\. Optimizations specific to your use case[](#optimizations-specific-to-your-use-case)

Depending on the unique characteristics of your app, you can make several optimizations to the Tink flow to further improve the user experience - especially for repeat flows.

### Preselecting a bank[](#preselecting-a-bank)

If you know which bank your users access, or you are reauthenticating the user after their consent has expired, use the data to skip the bank-selection screen and preselect the user's bank. This allows you to remove one step in the flow. The fewer steps, the better. *Image removed: AC article preselect bank*

### Pre-filling information[](#pre-filling-information)

If you have access to a user's bank credentials, you can pre-fill certain fields (such as SSN) and remove another step. For more information, see [Sessions](/Tiny-doc/tink_docs_home/resources/business-transactions/business-transactions-sdk-sessions/). *Image removed: AC article prefill fields*

### Business Transactions success screen[](#business-transactions-success-screen)

Our success screen is, by default, disabled, which sends the user directly back to you once their bank is successfully connected. If you want to display our success screen, contact [Tink Support](/Tiny-doc/tink_docs_home/resources/support/how-to-find-technical-support/) to enable it.

*Image removed: TRX optimize success screen example 1.0*

## Summary[](#summary)

The main takeaways is that you have more power and options than you might think in terms of optimizing your integration and how it performs. Let's recap how to get the most out of Tink:

**Prepare your users before they enter Tink**

-   Focus messaging on the job to be done, not around Tink and how it works.
-   Communicate your relationship with Tink (if you're using our license).
-   Make sure the user understands that the next flow step is to interact with their bank.

**Take advantage of the design and theming options**

-   Make the transition from your app to Tink seamless in Console.
-   Keep in mind that the average user has a stronger relationship with your brand than with Tink.

**Consider making more optimizations**

-   Preselect and pre-fill information to shorten repeat flows.
-   Decide how you want to handle the success screen.
