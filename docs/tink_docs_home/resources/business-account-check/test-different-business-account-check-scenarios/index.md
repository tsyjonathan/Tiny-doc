---
title: "Test different Business Account Check scenarios"
source: "/Tiny-doc/tink_docs_home/resources/business-account-check/test-different-business-account-check-scenarios/"
exportedAt: "2026-01-13T12:44:26.922Z"
---
## Demo Bank[](#demo-bank)

**Demo Bank** is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios and see how your end-user flow works before it goes into production.

Your demo credentials are found inside Console, so let's start there.

1.  Log in to Console.
2.  Select **Demo Bank**.
3.  Select your **Product** (in this case, Business Account Check) and your **Market**.

*Image removed: BAC Users* _Demo Bank user credentials for Business Account Check in the UK market._

Each user represents a different test case. In Demo Bank, the **Description** field explains a user's purpose. For example, User 1 is used to test a successful scenario that leads to you fetching a Business Account Check report with full information.

## Tink URL[](#tink-url)

When you have selected a Demo Bank user for your test, store the username and password for the next step. It's now time to build your own Tink URL.

## The Tink flow[](#the-tink-flow)

You have now entered the Tink flow, so let's walk through the example steps.

*Image removed: Business Account Check Tink Link flow, step 1*

Because we're going to use Demo Bank credentials to authenticate, select **Tink Demo Bank**.

*Image removed: Business Account Check Tink Link flow, step 2*

Select **Open Banking**.

*Image removed: Business Account Check Tink Link flow, step 3*

Select **Password And OTP**.

*Image removed: Business Account Check Tink Link flow, step 4*

For **Username** and **Password**, enter the Demo Bank credentials that you previously stored.

For **OTP Method**, select **Text input**.

Select **Continue**.

*Image removed: Business Account Check Tink Link flow, step 5*

In the **OTP Code** field, enter the four-digit number that is written underneath the text box and select **Submit**.

*Image removed: Business Account Check Tink Link flow, step 6*

**Note**: this screen displays the name of your Console app in the sentence. This is a good step to verify that you're using your intended app (and not the wrong one).

Select **Sparkonto 1**.

*Image removed: Business Account Check Tink Link flow, step 7*

When you select an account, the fields for **Bank**, **Holder name**, and **IBAN** are displayed.

Select **Continue**.

Don't close the next page! This is the example business account check report that can be retrieved through the API.

## Need help?[](#need-help-)

Contact Sales and let us help you get started.
