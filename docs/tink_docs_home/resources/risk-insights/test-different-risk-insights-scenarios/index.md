---
title: "Test different Risk Insights scenarios"
source: "/Tiny-doc/tink_docs_home/resources/risk-insights/test-different-risk-insights-scenarios/"
exportedAt: "2026-01-13T12:49:26.398Z"
---
## Demo Bank[](#demo-bank)

**Demo Bank** is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios and see how your end-user flow works before it goes into production.

Your demo credentials are found inside Console, so let's start there.

1.  [Log in to Console](https://console.tink.com/login).
2.  Select **Demo Bank**.
3.  Select your **Product** (in this case, Risk Insights) and your **Market**.

![Demo Bank - Risk Insights Tink Console](https://images.ctfassets.net/tmqu5vj33f7w/nPVwYtRVGPih5eMCS8c5W/5b329b86daaf9a32da5356fe5d46c92d/Demo_Bank_-_Risk_Insights_Tink_Console.png) _Demo Bank user credentials for Risk Insights in the Swedish market._

Each user represents a different test case. In Demo Bank, the **Description** field explains a user's purpose.

## The URL[](#the-url)

When you have selected a Demo Bank user for your test, store the username and password for the next step. It's now time to [build your own Tink Link](https://console.tink.com/risk-insights/tink-link).

### The flow[](#the-flow)

You have now entered the flow, so let's walk through the example steps.

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

![Risk Insights, URL flow](https://images.ctfassets.net/tmqu5vj33f7w/3lb9KF9fsVywaNZYGeL2Y/57873fb0b73db9837f8c02b62ede3396/Risk_Insights_URL_flow_successful_callback.png)

Don't close this page! You'll need to save part of the URL, which looks like this: `https://console.tink.com/callback?risk_insights_id=[value]`.

Store the value for `risk_insights_id`. You will need it to fetch the Risk Insights report.

### Get your access token[](#get-your-access-token)

Enter the `client_id` and `client_secret` values for your Risk Insights app (that are found in Console) and run this code to get your API `access_token`.

Get your access token

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=risk-insights:readonly'
```

You should get a successful response with your `access_token` at the bottom.

```
{
  "token_type" : "bearer",
  "expires_in" : 1800,
  "access_token" : "{YOUR_ACCESS_TOKEN}",
  "scope" : "risk-insights:readonly"
}
```

Store your `access_token`.

### Fetch your report[](#fetch-your-report)

Now is the time to fetch the Risk Insights report in the JSON format through the [Risk Insights API](/Tiny-doc/tink_docs_api/api/#risk/risk-insights).

Fetch your Risk Insights report

```
curl -X GET https://api.tink.com/risk/v1/risk-insights/{id} \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' 
```

Before you run this code, do you remember the `risk_insights_id` that you were asked to store? Just exchange `{risk_insights_id}` with that value and exchange `{YOUR_ACCESS_TOKEN}` with your `access_token` value.

Now, run the code! You will end up with a response like this one:

```
{
  "accountActivity": {
    "activityIncOneMonth": 0.0322580636,
    "activityIncOneWeek": 0.0568,
    "activityIncSixMonths": 0.0276243091,
    "activityIncThreeMonths": 0.0329670347,
    "activityIncTotal": 0.0329861119,
    "activityIncTwelveMonths": 0.0328767113,
    "activityOneMonth": 0.0322580636,
  },
  "accountOverview": {
    "numAccountHolders": 12,
    "numAccountTypes": 12,
    "numAccounts": 12,
    "numCurrencies": 12
  },
  "atmWithdrawals": {
    "atmExpensesRatioOneMonth": 20.11,
    "atmExpensesRatioOneWeek": 0.5,
    ...
```

**Note**: the report will contain data from only one provider, which is the bank that has been selected by the end user.
