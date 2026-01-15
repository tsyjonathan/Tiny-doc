---
title: "Test different Account Check scenarios"
source: "/Tiny-doc/tink_docs_home/resources/account-check/test-different-account-check-scenarios/"
exportedAt: "2026-01-13T12:43:30.485Z"
---
## Demo Bank[](#demo-bank)

**Demo Bank** is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios and see how your end-user flow works before it goes into production.

Your demo credentials are found inside Console, so let's start there.

1.  [Log in to Console](https://console.tink.com/login).
2.  Select **Demo Bank**.
3.  Select your **Product** (in this case, Account Check) and your **Market**.

![Demo Bank, Account Check test cases](https://images.ctfassets.net/tmqu5vj33f7w/1VxkCsytHgSuT25RK4rtj1/fe5a68143331f208958a6e06559396f9/account_check_demo_bank.png) _Demo Bank user credentials for Account Check in the Swedish market._

Each user represents a different test case. In Demo Bank, the **Description** field explains a user's purpose. For example, User 1 is used to test a successful scenario that leads to you fetching an Account Check report with full information.

## Tink URL[](#tink-url)

When you have selected a Demo Bank user for your test, store the username and password for the next step. It's now time to [build your own Tink Link URL](https://console.tink.com/account-verification/tink-link).

## The Tink flow[](#the-tink-flow)

You have now entered the Tink flow, so let's walk through the example steps.

![Account Check Tink Link flow, step 1](https://images.ctfassets.net/tmqu5vj33f7w/4sN6M8XcASy1u8FWEpXgYl/5419083b26c57c8a4f478dbd77f2ac16/account_check_tink_link_flow_1.png)

Because we're going to use Demo Bank credentials to authenticate, select **Tink Demo Bank**.

![Account Check Tink Link flow, step 2](https://images.ctfassets.net/tmqu5vj33f7w/6mMHzhQ5sXvBra5jsVmCzS/45514d98f5d297a4c60549963e671526/account_check_tink_link_flow_2.png)

Select **Open Banking**.

![Account Check Tink Link flow, step 3](https://images.ctfassets.net/tmqu5vj33f7w/1ksMN9b0leXH7BYStaXTRd/759dbb1a618dab5e2ca4de9738bd0e16/account_check_tink_link_flow_3.png)

Select **Password And OTP**.

![Account Check Tink Link flow, step 4](https://images.ctfassets.net/tmqu5vj33f7w/1uqtTR40pojZez5yp1hW6G/6da91f1c76cccf3eb8dbe80a9269df0b/account_check_tink_link_flow_4.png)

For **Username** and **Password**, enter the [Demo Bank](https://console.tink.com/demobank) credentials that you previously stored.

For **OTP Method**, select **Text input**.

Select **Continue**.

![Account Check Tink Link flow, step 5](https://images.ctfassets.net/tmqu5vj33f7w/wUM4osw8FM0KLoTEPDuuc/74851acaa7043158e548d0a148d35770/account_check_tink_link_flow_5.png)

In the **OTP Code** field, enter the four-digit number that is written underneath the text box and select **Submit**.

![Account Check Tink Link flow, step 6](https://images.ctfassets.net/tmqu5vj33f7w/FoT8f9JdsVZoGoqyMmkHE/d13533194dc0644d43b6c64fc05dc7af/account_check_tink_link_flow_6.png)

**Note**: this screen displays the name of your Console app in the sentence. This is a good step to verify that you're using your intended app (and not the wrong one).

Select **Sparkonto 1**.

![Account Check Tink Link flow, step 7](https://images.ctfassets.net/tmqu5vj33f7w/1eYdupniuhOmzouqOvAaY3/d398d7238335de56a14d114fc8784a38/account_check_tink_link_flow_7.png)

When you select an account, the fields for **Bank**, **Holder name**, and **IBAN** are displayed.

Select **Continue**.

![Account Check Tink Link flow, step 8](https://images.ctfassets.net/tmqu5vj33f7w/7Fn298m1F2M2vflu5Kfbi5/9146d5aed0d4bbcac210c264673feb79/account_check_tink_link_flow_8.png)

Don't close this page! It shows two more steps that must be followed to be able to download an Account Check report.

The first step on the page shows how to use your `client_id` and `client_secret` values to get your `access_token`.

The second step shows how to use your `access_token` to download your Account Check report.

## Need help?[](#need-help-)

[Contact Sales](https://tink.com/contact-us) and let us help you get started.
