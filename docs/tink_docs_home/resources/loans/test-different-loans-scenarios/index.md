---
title: "Test different Loans scenarios - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/loans/test-different-loans-scenarios/"
exportedAt: "2026-01-13T12:45:37.716Z"
---
## Demo Bank[](#demo-bank)

**Demo Bank** is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios and see how your end-user flow works before it goes into production.

| USER | USERNAME | PASSWORD | DESCRIPTION | SCENARIO |
| --- | --- | --- | --- | --- |
| User1 | u72083793 | edq326 | Loan account with parties | Successful |
| User2 | u51613239 | cty440 | User has successfully authenticated but no account information could be found | Successful |
| User3 | u92721594 | nbs589 | User failed to authenticate themselves at the financial institution | Authentication error |
| User4 | u91902655 | jtx720 | Temporary error with a Tink service | Temporary error |

Each user represents a different test case. The **Description** field explains a user's purpose. For example, **User1** is used to test a successful scenario that leads to you fetching a set of investment accounts with holdings.

## Tink URL[](#tink-url)

When you have selected a Demo Bank user for your test, store the username and password for the next step. It's now time to build your Tink Link. For a list of parameters that you can use, see [Loans SDK reference](/Tiny-doc/tink_docs_home/resources/loans/loans-sdk-reference/). When you're done building your Tink Link, copy the URL, paste it into a browser, and hit enter to start the Tink flow.

## The Tink flow[](#the-tink-flow)

You have now entered the Tink flow, so let's walk through the example steps.

*Image removed: Loans Tink Link flow, step 1*

Because we're going to use Demo Bank credentials to authenticate, select **Tink Demo Bank**.

*Image removed: Loans Tink Link flow, step 2*

Select **Other**.

*Image removed: Loans Tink Link flow, step 3*

For **Username** and **Password**, enter the Demo Bank credentials that you previously stored.

Select **Continue**.

*Image removed: Loans Tink Link flow, step 4*

Copy the cURL command from the above screen and use your `client_id` and `client_secret` values to get your `access_token`.

Get a user access token

```
curl -v [external url removed] \
  -d 'code=$' \
  -d 'client_id=$' \
  -d 'client_secret=$' \
  -d 'grant_type=authorization_code'
```

## Fetch loan accounts[](#fetch-loan-accounts)

Use the `user access token` from the previous response to make a request to the List loan accounts endpoint:

Fetch a list of loan accounts

```
curl "[external url removed]" \
  -H 'Authorization: Bearer '
```

## Need help?[](#need-help-)

Contact Sales and let us help you get started.
