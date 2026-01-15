---
title: "Fetch your first Risk Insights report"
source: "/Tiny-doc/tink_docs_home/resources/risk-insights/fetch-your-first-risk-insights-report/"
exportedAt: "2026-01-13T12:49:23.301Z"
---
Once the prerequisites above have been met, complete the following steps to fetch the risk features for an end user.

1.  Authenticate yourself with a bank.
2.  Retrieve a report id in the redirect.
3.  Get a client `access_token`.
4.  Use the client `access_token` to fetch the Risk Insights payload.

## 1\. Build the URL[](#build-the-url)

In Console, use the Build your own Tink Link URL view to create your own URL. Your resulting URL is used to allow users to authenticate with their bank and select an account from which to fetch report data.

To use the URL, integrate it with a site or in an app. For example, you can start a user's Tink flow by redirecting them to the URL.

**Use the URL**

Use the example URL below by inserting the `client_id` value for your Tink app into the URL, copy the URL, and paste it into the address bar of a web browser.

**Example URL**:

```
[external url removed]
```

**Note**: make sure that you exchange `{YOUR_CLIENT_ID}` in the URL for your `client_id` value.

When your users access the URL, they'll see a list of demo banks. Once they choose a bank, they'll see a list of demo bank accounts to choose from. Select the username and password for a Demo Bank user that suits your use case. For more information about Demo Bank, see Demo Bank.

## 2\. Handle callback[](#handle-callback)

When a user reaches the end of a flow, they're redirected to the callback URI that you've provided in the URL. In case something goes wrong and you don't receive a callback with the `risk_insight_id` value, the flow has failed to complete.

Some possible failure reasons:

-   The end user cancelled their flow
-   The end user did not successfully authenticate with their bank
-   The end user didn't have any accounts available with the selected bank

For more information about error statuses, see [Handle Risk Insights error codes](/Tiny-doc/tink_docs_home/resources/risk-insights/handle-risk-insights-error-codes/).

**The successful callback has this structure**

```
{YOUR_CALLBACK_URI}?risk_insight_id={YOUR_ACCOUNT_VERIFICATION_REPORT_ID}
```

**In this example**

```
[external url removed]
```

After a successful authentication, you will see a `risk_insight_id` value, which indicates that a flow has successfully come to an end. Store this value. It's used to authenticate yourself to fetch verified income.

## 3\. Authenticate your client[](#authenticate-your-client)

To access your user's account information, you need a valid client access token with the scope `risk-insights:readonly`.

**Note**: access tokens expire and must be renewed, typically in 30 minutes.

If you provided the correct values, you should get a successful response with a client `access_token`.

Get a client access token

```
curl -v -X POST [external url removed] \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=risk-insights:readonly'
```

## 4\. Fetch the report[](#fetch-the-report)

To fetch the risk report, see [Get Risk Insights API](/Tiny-doc/tink_docs_api/api/#risk/risk-insights/get-a-risk-insights).

Fetch your Risk Insights report

```
curl -X GET [external url removed] \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' 
```

Paste your client `access token`and `id` into the respective placeholders, copy the code, and run it in your terminal. You should then get a JSON object that contains risk features.

**Response example**

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

## Need help?[](#need-help-)

Contact Sales and let us help you get started.
