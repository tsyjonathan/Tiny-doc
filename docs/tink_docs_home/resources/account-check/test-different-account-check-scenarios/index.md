---
title: "Test different Account Check scenarios"
source: "/Tiny-doc/tink_docs_home/resources/account-check/test-different-account-check-scenarios/"
exportedAt: "2026-01-13T12:43:30.485Z"
---
## Demo Bank[](#demo-bank)

**Demo Bank** is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios and see how your end-user flow works before it goes into production.

Your demo credentials are found inside Console, so let's start there.

1.  Log in to Console.
2.  Select **Demo Bank**.
3.  Select your **Product** (in this case, Account Check) and your **Market**.

*Image removed: Demo Bank, Account Check test cases* _Demo Bank user credentials for Account Check in the Swedish market._

Each user represents a different test case. In Demo Bank, the **Description** field explains a user's purpose. For example, User 1 is used to test a successful scenario that leads to you fetching an Account Check report with full information.

## Tink URL[](#tink-url)

When you have selected a Demo Bank user for your test, store the username and password for the next step. It's now time to build your own Tink Link URL.

## The Tink flow[](#the-tink-flow)

You have now entered the Tink flow, so let's walk through the example steps.

*Image removed: Account Check Tink Link flow, step 1*

Because we're going to use Demo Bank credentials to authenticate, select **Tink Demo Bank**.

*Image removed: Account Check Tink Link flow, step 2*

Select **Open Banking**.

*Image removed: Account Check Tink Link flow, step 3*

Select **Password And OTP**.

*Image removed: Account Check Tink Link flow, step 4*

For **Username** and **Password**, enter the Demo Bank credentials that you previously stored.

For **OTP Method**, select **Text input**.

Select **Continue**.

*Image removed: Account Check Tink Link flow, step 5*

In the **OTP Code** field, enter the four-digit number that is written underneath the text box and select **Submit**.

*Image removed: Account Check Tink Link flow, step 6*

**Note**: this screen displays the name of your Console app in the sentence. This is a good step to verify that you're using your intended app (and not the wrong one).

Select **Sparkonto 1**.

*Image removed: Account Check Tink Link flow, step 7*

When you select an account, the fields for **Bank**, **Holder name**, and **IBAN** are displayed.

Select **Continue**.

*Image removed: Account Check Tink Link flow, step 8*

Don't close this page! It shows two more steps that must be followed to be able to download an Account Check report.

The first step on the page shows how to use your `client_id` and `client_secret` values to get your `access_token`.

The second step shows how to use your `access_token` to download your Account Check report.

## Need help?[](#need-help-)

Contact Sales and let us help you get started.
