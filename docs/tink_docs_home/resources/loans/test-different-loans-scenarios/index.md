---
title: "Test different Loans scenarios - Tink Docs"
source: "https://docs.tink.com/resources/loans/test-different-loans-scenarios"
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

When you have selected a Demo Bank user for your test, store the username and password for the next step. It's now time to build your Tink Link. For a list of parameters that you can use, see [Loans SDK reference](https://docs.tink.com/resources/loans/loans-sdk-reference). When you're done building your Tink Link, copy the URL, paste it into a browser, and hit enter to start the Tink flow.

## The Tink flow[](#the-tink-flow)

You have now entered the Tink flow, so let's walk through the example steps.

![Loans Tink Link flow, step 1](https://images.ctfassets.net/tmqu5vj33f7w/38mlY3o4Vu2wBxTfdsfkUt/82972b24ca45fe42b80715a0a5aa6cdf/assets_liabilities_tink_link_flow_1.jpeg)

Because we're going to use Demo Bank credentials to authenticate, select **Tink Demo Bank**.

![Loans Tink Link flow, step 2](https://images.ctfassets.net/tmqu5vj33f7w/2QA2nYtUf1TIykwlGP1zlu/c0475f20a4197c8abca6d29f42939374/assets_liabilities_tink_link_flow_2.jpeg)

Select **Other**.

![Loans Tink Link flow, step 3](https://images.ctfassets.net/tmqu5vj33f7w/2zZJAWKmeiNVxKhdfw4CjX/e8c37b02b06990591ff12283ef4c3c30/assets_liabilities_tink_link_flow_3.jpeg)

For **Username** and **Password**, enter the Demo Bank credentials that you previously stored.

Select **Continue**.

![Loans Tink Link flow, step 4](https://images.ctfassets.net/tmqu5vj33f7w/KJp78TpSZni10xNFWpER4/ab27209a7d0e6f1fad0658622e68d4d6/assets_liabilities_tink_link_flow_4.png)

Copy the cURL command from the above screen and use your `client_id` and `client_secret` values to get your `access_token`.

Get a user access token

```
curl -v https://api.tink.com/api/v1/oauth/token \
  -d 'code=$' \
  -d 'client_id=$' \
  -d 'client_secret=$' \
  -d 'grant_type=authorization_code'
```

## Fetch loan accounts[](#fetch-loan-accounts)

Use the `user access token` from the previous response to make a request to the List loan accounts endpoint:

Fetch a list of loan accounts

```
curl "https://api.tink.com/data/v2/loan-accounts" \
  -H 'Authorization: Bearer '
```

## Need help?[](#need-help-)

[Contact Sales](https://tink.com/contact-us) and let us help you get started.
