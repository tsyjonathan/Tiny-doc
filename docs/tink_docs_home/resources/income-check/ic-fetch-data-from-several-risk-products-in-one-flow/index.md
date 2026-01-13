---
title: "Fetch data from several risk products in one flow"
source: "https://docs.tink.com/resources/income-check/ic-fetch-data-from-several-risk-products-in-one-flow"
exportedAt: "2026-01-13T12:48:28.707Z"
---
Tink only requires one single authentication to fetch multiple data points from a bank account. In other words, a user must authenticate only once to fetch data from more than one Tink product. This is useful when you want to fetch income, expense, and risk data at the same time from the same underlying bank. That goes for both an asynchronous and synchronous flow.

In the former, the applicant (end user) authenticates with a bank and you, our customer, are immediately handed back the flow ownership. When such _early redirect_ is enabled, the end user does not have to wait while a bank provides Tink their transaction data. This allows you to design a frictionless journey where the end user does not have to wait for a step to finish before moving on. The end user will be directed to the `redirect_uri` immediately after successfully having authenticated with their bank. The report generation takes place in the background. In other words, use a `reports_generation_job_id` to query the status of an offline job to find the report IDs for your chosen products (i.e. Income Check, Risk Insights, etc) and their corresponding statuses. A status tells whether or not a report is ready to be fetched. _Early redirect_ has the potential to increase your conversion rates by avoiding lengthy wait times for your user, which are caused by synchronous report generation.

A synchronous process means that there is a sequencing and that your application flow is dependent on Tink finalising its delivery before the end user can continue. There are pros and cons with the two approaches so it is important to take into consideration. For a synchronous flow, you do not need the `reports_generation_job_id` scope.

**Note**: You are billed for each product that you use simultaneously. Please [contact Sales](https://tink.com/get-started/) if you have questions about this.

## 1\. Build the URL[](#build-the-url)

The base URL that is required to combine Tink products is different from the base URL that is used for one product in the standard synchronous flow.

The base URL to combine products differs from the base URL that is used for only one product. The base URL to combine multiple products:

```
https://link.tink.com/1.0/reports/create-report?
```

This URL can include these query parameters:

| Parameter | Required | Description |
| --- | --- | --- |
| `async` | Required | Set this to `true` to enable early redirect. Set this to `false` to disable early redirect. |
| `client_id` | Required | The `client_id` for your app. |
| `redirect_uri` | Required | The URL to which the user is redirected. This must be configured in the app settings in Console before first use. |
| `market` | Required | The market to fetch the reports for e.g. `SE`. |
| `report_types` | Required | Report type. To use both report types, separate the values by using a comma. Options: `INCOME_CHECK_REPORT, RISK_INSIGHTS_REPORT, EXPENSE_CHECK_REPORT` |
| `external_reference` | Optional | Optional reference given by the customer to add information, such as UID, to the generated report. |
| `input_provider` | Optional | A specified list of providers that are presented to the end user. If this parameter is not used, the full list of providers is presented. |
| `state` | Optional | The parameter that is returned in the callback after the user authenticates with a bank. This can be used to match the user on your end. |

In this example URL, the market is `SE` and its output will generate one report per product: Income Check, Expense Check, and Risk Insights.

```
https://link.tink.com/1.0/reports/create-report?client_id={YOUR_CLIENT_ID}&redirect_uri=https://console.tink.com/callback&market=SE&report_types=INCOME_CHECK_REPORT,RISK_INSIGHTS_REPORT,EXPENSE_CHECK_REPORT&async=true
```

When the end user accesses the URL, they are requested to authenticate to their bank.

## 2\. Handle callback[](#handle-callback)

When a user reaches the end of a flow, they are redirected to the callback URI that you have provided in the URL. In case something goes wrong and you do not receive a callback with report identifiers, the flow did not complete successfully.

Some possible failure reasons:

-   The user canceled their flow
-   The user did not successfully authenticate with their bank

**The successful callback has this structure:**

```
{YOUR_CALLBACK_URI}?reports_generation_job_id={YOUR_REPORTS_GENERATION_JOB_ID}
```

**In this example:**

```
https://console.tink.com/callback?reports_generation_job_id=ff8ae53bc46e45fe9a37c4fd1353e60d
```

After a successful authentication, you will see a `reports_generation_job_id` value, which indicates that the user-flow has successfully come to an end. Store this value in order to fetch the statuses of your reports being created.

## 3\. Authenticate your client[](#authenticate-your-client)

To access your user's account information, you need a valid client access token with specific scopes enabled, as mentioned in the prerequisites section of this article.

**Note**: access tokens expire and must be renewed, typically in 30 minutes.

**cURL example:**

Authenticate your client

```
curl -X POST https://api.tink.com/api/v1/oauth/token \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=reports-generation-jobs:readonly,income-checks:readonly,risk-insights:readonly,expense-checks:readonly'
```

**Response example:**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope":  "reports-generation-jobs:readonly,income-checks:readonly,risk-insights:readonly,expense-checks:readonly"
}
```

## 4\. Fetch the report generation job[](#fetch-the-report-generation-job)

To see the statuses and IDs of the reports that are being created in the background, call the `/api/v1/reports-generation-jobs` endpoint with the `job_id` that you saved from the callback page.

cURL example:

Fetch Reports Generation Job

```
curl https://api.tink.com/api/v1/reports-generation-jobs/ \
  -H 'Authorization: Bearer '
```

If the status is in a `PENDING` state, we recommended to poll this endpoint until you see a "final" state, `COMPLETED`. We recommend an exponential backoff where you poll at 1 RPS (request per second). There is a practical aspect to this as Tink will need to wait for the bank(s) to provide the end user's data and that can be seconds up to minutes. For more information, see [Reports Generation Jobs](https://docs.tink.com/api#general/reports-generation-jobs) in our API reference.

Response:

```
{
  "createdTime": "2022-10-31T11:55:45Z",
  "id": "caecb48254664234814135346de6082a",
  "reports": [
    {
      "id": "636eaf5303e942c5ab310e586f7f674a",
      "status": "COMPLETED",
      "type": "INCOME_CHECK_REPORT"
    },
    {
      "id": "bc875eead4554e77b8dc1644b222e027",
      "status": "COMPLETED",
      "type": "RISK_INSIGHTS_REPORT"
    },
    {
      "id": "8f931f9d47d04265a53a4dea882c2016",
      "status": "COMPLETED",
      "type": "EXPENSE_CHECK_REPORT"
    }
  ],
  "status": "COMPLETED",
  "updatedTime": "2022-10-31T12:01:32Z"
}
```

Save the ID fields in the `response.reports[]` field in order to be able to fetch reports in the step later. IDs are always returned even for failed reports. Check the status of the report before attempting to fetch the report.

## 5\. Fetch the reports[](#fetch-the-reports)

To retrieve the reports, we need to call the `v2/income-checks`, `v1/risk-insights`, and `v1/expense-checks` endpoints with the report ID we just fetched from the `api/v1/reports-generation-job`\-endpoint. You have the client access token in the form of a bearer token, so you need to input that in the examples later:

cURL example:

Fetch your Income Check report

```
curl https://api.tink.com/v2/income-checks/ \
  -H 'Authorization: Bearer '
```

Fetch your Risk Insights report

```
curl https://api.tink.com/risk/v1/risk-insights/ \
  -H 'Authorization: Bearer '
```

Fetch your Expense Check report

```
curl https://api.tink.com/risk/v1/expense-checks/ \
  -H 'Authorization: Bearer '
```

## Need help?[](#need-help-)

[Contact Sales](https://tink.com/contact-us) and let us help you get started.
