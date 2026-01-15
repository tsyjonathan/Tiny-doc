---
title: "Test different Risk Insights scenarios"
source: "/Tiny-doc/tink_docs_home/resources/risk-insights/test-different-risk-insights-scenarios/"
exportedAt: "2026-01-13T12:49:26.398Z"
---
## Demo Bank[](#demo-bank)

**Demo Bank** is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios and see how your end-user flow works before it goes into production.

Your demo credentials are found inside Console, so let's start there.

1.  Log in to Console.
2.  Select **Demo Bank**.
3.  Select your **Product** (in this case, Risk Insights) and your **Market**.

*Image removed: Demo Bank - Risk Insights Tink Console* _Demo Bank user credentials for Risk Insights in the Swedish market._

Each user represents a different test case. In Demo Bank, the **Description** field explains a user's purpose.

## The URL[](#the-url)

When you have selected a Demo Bank user for your test, store the username and password for the next step. It's now time to build your own Tink Link.

### The flow[](#the-flow)

You have now entered the flow, so let's walk through the example steps.

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

*Image removed: Risk Insights, URL flow*

Don't close this page! You'll need to save part of the URL, which looks like this: `[external url removed]]`.

Store the value for `risk_insights_id`. You will need it to fetch the Risk Insights report.

### Get your access token[](#get-your-access-token)

Enter the `client_id` and `client_secret` values for your Risk Insights app (that are found in Console) and run this code to get your API `access_token`.

Get your access token

```
curl -v -X POST [external url removed] \
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
curl -X GET [external url removed] \
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
