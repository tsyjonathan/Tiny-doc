---
title: "Configure which Actionable Insights your users can see"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/configure-actionable-insights/"
exportedAt: "2026-01-13T12:50:50.010Z"
---
To get the most out of the Actionable Insights feature you want to configure the messages they bring in different languages, to fit your specific user audience. You can achieve that by using Tink Console.

To get started with configuring your Insights, head over to the Tink Console and click on Money Manager in the "Products" section of the left navigation bar. You should then see the Actionable Insights tab at the top of the page.

![pfm-ActionableInsightStart](https://images.ctfassets.net/tmqu5vj33f7w/494GZ881BYJhExLPcIKiEM/eb5e8df94d8e24aee12430f708dbb4bf/pfm-ActionableInsightStart.jpg)

Tink Console lets you enable/disable specific Insights and also configure the Insight copy. Insight copy is a template, designed for a specific insight type and written in a language, which can suit a user at a particular locale. Insight copy configurations are automatically applied by Tink when Listing Insights. The same applies when Insights are published through Webhooks, and the configuration used is determined by the user locale. If no configuration can be found for the user locale when listing Insights, then no Insights will be returned. This is done to prevent Insights from being returned with a text written in a language, not understandable by the user. Tink provides a default configuration that can be used for testing out the Insights product. The default configuration uses English and is provided for every insight type. It requires users to have an English supported locale such as `en_GB` or `en_US`.

Clicking on the toggle on the right of each Insight will disable it. After disabling an Insight, which has already been generated, it can be still fetched from the API, however no new Insights will be generated. By default, all insights are disabled to allow you to customize and only use the ones that fit your users.

The Insight copy includes the title, description and action labels. These can be configured by clicking on the arrow next to each insight followed by clicking the "Edit Insight" button for selected translation.

### Editing a template[](#editing-a-template)

![pfm-InsightUnfolded](https://images.ctfassets.net/tmqu5vj33f7w/2zdFWOYr6kV74MppCP1C1N/45b46c21a49e6bfac48133dbb48de458/pfm-InsightUnfolded.jpg)

After clicking on "Edit Insight" you can change and preview the copy of the specific insight (`ACCOUNT_BALANCE_LOW` on the image below). You can also add a copy for a different language by clicking "Add new translation" at the top of the page. Then fill in the fields with labels of your choice and save the copy. The copy will be automatically applied for the user with a matching locale. When you update the copy, the latest version for an edited language will be used.

![pfm-editInsight](https://images.ctfassets.net/tmqu5vj33f7w/4P5IBI0gEswe8OvleScluN/c98c4b2abd958f6315bcde34cdcaf758/pfm-editInsight.jpg)
