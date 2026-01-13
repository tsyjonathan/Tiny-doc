---
title: "Optimize your Income Check integration"
source: "https://docs.tink.com/resources/income-check/optimize-your-income-check-integration"
exportedAt: "2026-01-13T12:48:38.372Z"
---
Tests always show that the best–performing integrations are ones where the transition between an app and Tink feels smooth, secure, and coherent. Integrate successfully in three steps:

1.  Explain why the user is asked to share information.
2.  Use our design and theming options to seamlessly fit Tink into your app.
3.  Make optimizations that are specific to your integration.

Customers that follow our optimization advice tend to increase both conversion rates and customer satisfaction.

Most users only want to get a job done. For example, they want to apply for a loan, apply for a credit card, or register interest for an apartment. They don't want to be stopped on their way to have to think about where your app ends and where the Tink flow starts. This is why it's important to holistically consider the user experience when creating digital apps and services.

For Income Check, the job-to-be-done is usually all about security where the primary benefactor is you. The value for the user isn't always clear and depending on the market, users might expect verifying one's income to be a manual and tedious process (scanning and sending documents such as payslips and tax returns). Expecting to have to do a lot of work can cause drop offs which is why it's important to focus on the value (security & convenience) not so much on Tink, or the technical reasons for why you chose to integrate with Tink.

### Focus on the job-to-be-done[](#focus-on-the-job-to-be-done)

![IC optimize example 1.3](https://images.ctfassets.net/tmqu5vj33f7w/10ZUCKstO3A4Iv8loF4Hht/b71869c636e7c5321e7889961b352493/IC_example_1.png) As seen in the example above, don't let the user focus too much on Tink. This may disconnect the user from the action that they need to take.

### Encourage, reassure, and set expectations[](#encourage-reassure-and-set-expectations)

![IC optimize example 2.3](https://images.ctfassets.net/tmqu5vj33f7w/PSPByJCF7idFOyXuLvLge/17c3b69040e22fd597d6a16c06ac44e7/IC_example_2.png) Users often won't care and don't need to care about Tink as part of their journey. During a flow, the user needs to know and feel that they can trust your integration and what will be asked of them in the next step. If trust isn't felt, users risk entering Tink unprepared, potentially causing them to go back in the flow to double-check details or forward without their authentication device at hand just to investigate.

## 2\. Use our design and theming options to fit Tink seamlessly into your app[](#use-our-design-and-theming-options-to-fit-tink-seamlessly-into-your-app)

From a technical perspective, your integration with Tink is a combination of three different flows. These flows are visualized as follows:

![UX guide brand before final](https://images.contentful.com/tmqu5vj33f7w/7ETnhoJfrAsbfKpHum9v2k/4c4f8ff196255e9474aaee330ea38f09/Brand_before.png)

From an end-user perspective, the transition between three different brands risks creating a disjointed and confusing user experience. Tink can't directly change the look and feel of a bank's authentication flow, so we provide you with the option to customize the look and feel of the Tink flow to make sure that it is consistent with your own brand.

Styling the Tink flow helps your users focus on the job to be done, removing the distraction that visual inconsistencies can be. This is especially important if your brand differs a lot from our default theme.

You will find design and theming options to style your Tink flow in the [Tink Console](https://console.tink.com/).![Tink Console](https://images.ctfassets.net/tmqu5vj33f7w/tbSVEyuQczLZTusoA6OVG/a4ba2e1bdb3b6dbfc94466dcfce1bf83/tink-link-web-customization-console.png)

## 3\. Optimizations specific to your use case[](#optimizations-specific-to-your-use-case)

Depending on the unique characteristics of your app, you can make several optimizations to the Tink flow to further improve the user experience - especially for repeat journeys.

### Preselecting a bank[](#preselecting-a-bank)

If you know which bank your users access, you can use this data to skip the bank selection screen and save the user a step. The fewer steps, the better.

![AC article preselect bank](https://images.ctfassets.net/tmqu5vj33f7w/4x0C66T1zDuRPowslgMFD7/b0d0b1b3c4380348658f5771cbe45e3d/Skip_provider_selection.png)

### Pre-filling information[](#pre-filling-information)

If you have access to a user's bank credentials, you can pre-fill certain fields (such as SSN) and remove another step. For more information, see [Sessions](https://docs.tink.com/resources/income-check/income-check-sdk-sessions). ![AC article prefill fields](https://images.ctfassets.net/tmqu5vj33f7w/4bPB1nPjX5aFDnPFihAOFI/cba03d36a2aa65ecfeb878750295f69d/Prefill_fields.png)

### Income Check success screen[](#income-check-success-screen)

Our success screen is, by default, enabled. If you want to skip it and send users directly back to you once their bank is successfully connected, contact [Tink Support](https://docs.tink.com/resources/support/how-to-find-technical-support) to enable that feature flag.

![IC optimize success screen example 1.1](https://images.ctfassets.net/tmqu5vj33f7w/4ICBwo7Ki9MU3EfvD31f7M/90879dcd1551094948252596ea0c0c26/IC_success_screen_example.png)

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

-   Preselect and pre-fill information to shorten the journey where applicable.
-   Decide how you want to handle the success screen.
