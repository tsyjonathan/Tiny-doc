---
title: "Fetch account and transaction data in one flow"
source: "https://docs.tink.com/resources/account-check/bundle-account-check-transactions"
exportedAt: "2026-01-13T12:43:34.467Z"
---
Tink only requires one single authentication to fetch multiple data points from a bank account. In other words, a user must authenticate only once to fetch data from more than one Tink product. There's no need for users to reauthenticate. This is useful when, for example, you will need to fetch account verification data and transaction data at the same time.

**Note**: You are billed for each product that you use simultaneously. Please [contact Sales](https://tink.com/contact-us) if you have questions about this.

## Early redirect[](#early-redirect)

Tink's flow works synchronously or asynchronously. The **synchronous flow** is the default, which means the user must wait during steps when data is expected from their bank. They can only move past a step when Tink has received expected data from their bank. The **asynchronous flow** allows the user to progress in their flow when Tink hasn't yet received expected data from their bank. Early redirect is the name of the feature that enables the asynchronous flow.

With the early redirect feature enabled, the user will not have to wait for the transactions to be fetched from the bank, and can move directly to the next step in the user journey. This decreases the risk of the user dropping out before the flow is completed. We recommend that you enable early redirect when you don't immediately need to use data that's fetched from the end user's bank.

For more details on the synchronous and the asynchronous flow, see [2\. Handle callback](#handle-callback) and [4\. Fetch the report generation report](#fetch-the-report-generation-job).

## Webhooks[](#webhooks)

Account Check and our other reports now support webhooks. You can signup to receive a webhook event when the report generation has finished to remove the need to poll for status updates. You still need to fetch the report using the reportId like before.

To get started with webhooks you can follow this [guide](https://docs.tink.com/resources/api-setup/webhooks). You subscribe to the report generation webhooks by calling the create webhooks API.

**request example**

```
{
  "description": "My report generation webhook",
  "disabled": false,
  "enabledEvents": [
    "reports-generation:completed"
  ],
  "url": "https://my.webhook.endpoint.com/"
}
```

The response from the webhook service.

**response example**

```
{
  "createdAt": "2024-03-24T15:27:59Z",
  "description": "My report generation webhook",
  "disabled": false,
  "enabledEvents": [
    "reports-generation:completed"
  ],
  "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
  "secret": "string",
  "updatedAt": "2024-03-24T15:27:59Z",
  "url": "https://my.webhook.endpoint.com/"
}
```

After subscribing to the webhook you go through the report generation flow like normal. But you can skip the polling part and listen for the webhook message that you will receive. When the webhook is receieved proceed to step 5 to fetch the report(s).

**webhook message example**

```
{
 "context": {
   "userId": "abc31bdcc79999c4f0b8952984a9bd4g",
   "externalReference": "3db31bdcc75555c4f0b8952984a9bd4f"
 },
 "content": {
   "reports": [
     {
       "id": "32f468a81dd7490cb3ffe4a7cf7636f5",
       "type": "ACCOUNT_VERIFICATION_REPORT",
       "status": "CREATED"
     },
     {
       "type": "TRANSACTION_REPORT",
       "status": "FAILED",
       "error": "PRECONDITION_FAILED"
     }
   ]
 },
 "event": "reports-generation:completed"
}
```

The message will contain two parts, a context part and a content part. The context contains userId for what user the report was generated for and an externalReference which would be an id or message of some kind that you have provided to use as some identification to know for whom the report belongs too. See externalReference in the [API](https://docs.tink.com/resources/api-setup/webhooks) guide or further down in section 1 Build the URL.

The second part context will contain information about the reports that was requested. Context will contain a list of all reports with reportId if the report was generated. The status is representing what status the report ended up as, FAILED or CREATED. If failed it will also provide an error field with more info on why it failed.

These are possible error responses for failures of report generations.

-   ALREADY\_EXISTS, Triggered for Idempotency issues with trying to generate multiple reports for the same user and account at the same time.
-   INVALID\_ARGUMENT, Faulty input data when generating the report. Example reason, bank data fetched by the agent isn’t following the proper formatting or values which would lead to corrupt reports or incorrect report data.
-   UNAVAILABLE, report generation services are unreachable.
-   FAILED\_PRECONDITION, Some precondition to generate a report is not reached. The most common reason is insufficient transactions.
-   INTERNAL, Internal server error. Could be any issue with a report generation service.

## 1\. Build the URL[](#build-the-url)

The base URL to combine two products or more differs from the base URL that's used for only one product. The base URL to combine multiple products:

```
https://link.tink.com/1.0/reports/create-report?
```

This URL can include these parameters:

| Parameter | Required? | Description |
| --- | --- | --- |
| client\_id | yes | The `client_id` for your app. |
| redirect\_uri | yes | The URL to which the user is redirected. This must be configured in the app settings in Console before first use. |
| state | no | The parameter that is returned in the callback after the user authenticates with a bank. This can be used to match the user on your end. |
| market | yes | The market for which to fetch reports, for example, `SE`. |
| locale | yes | Locale to be used for end-user facing text, for example, `en_US`. |
| report\_types | yes | Report type. To use both report types, separate the values by using a comma. Options: `TRANSACTION_REPORT, ACCOUNT_VERIFICATION_REPORT` |
| refreshable\_items | yes | Use refreshable\_items to control which types of accounts and identities data you want to fetch. To use more than one value, separate them by using a comma. Options: `IDENTITY_DATA`, `CHECKING_ACCOUNTS`, `CHECKING_TRANSACTIONS`, `SAVING_ACCOUNTS`, `SAVING_TRANSACTIONS`, `CREDITCARD_ACCOUNTS`, `CREDITCARD_TRANSACTIONS`. |
| account\_dialog\_type | yes | Should the end user be able to select which account to use? If yes, use this parameter. Values: `SINGLE`\=select a single account, `MULTI`\=select multiple accounts, `NONE`\=no selection dialog. |
| customer\_reference\_id | no | A user reference which will be passed back to you once the reports flow is completed. |
| external\_reference | no | The external reference identifier to be included in the report. Allowed characters: uppercase or lowercase formatting, letters, numbers, and the dash character. Maximum length: 50 characters. |
| session\_id | no | Use a [session](https://docs.tink.com/api#general/tink-link/session) to securely configure Tink Link, pre-fill data or apply merchant level customization. |
| async | no | Set this to `true` to enable early redirect. If enabled, this feature redirects the user to your application after the user has authenticated, which reduces the wait time for the user while data is fetched and processed. This feature is only applicable when account\_dialog\_type=`NONE`. |
| app\_uri | no | Should be used if Tink Link is embedded inside an Android/iOS app. Will use the deep link specified to redirect the user back to the hosting app after authenticating in a third-party app (such as Mobile Bank ID). |
| input\_provider | no | A specified list of providers that are presented to the end user. If this parameter is not used, the full list of providers is presented. |
| input\_username | no | Pre-fills the username field for supported providers. Providing this makes most sense if the username is a general username, valid for multiple banks (like a SSN). |
| theme | no | Requires both a `LIGHT` and `DARK` theme to be configured to have any effect. When `LIGHT` and `DARK` theme are configured it will default the theme that matches the end-user system preference. Using `?theme=DARK` will force the DARK theme to be used regardless of the end-user system preference. Reach out to [support](https://docs.tink.com/resources/support) for enabling a dark theme. |

In this example URL, the market is `SE` and its output will generate both an Account Check and a Transactions report.

Generate an Account Check and a Transactions report

```
https://link.tink.com/1.0/reports/create-report?client_id=&redirect_uri=https://console.tink.com/callback&market=SE&report_types=TRANSACTION_REPORT,ACCOUNT_VERIFICATION_REPORT&refreshable_items=IDENTITY_DATA,CHECKING_ACCOUNTS,SAVING_ACCOUNTS,CHECKING_TRANSACTIONS,SAVING_TRANSACTIONS&account_dialog_type=NONE
```

When the end user accesses the URL, they are requested to authenticate to their bank. To use Demo Bank credentials instead of real ones, make sure to use a sandbox app (not a production app), and see [Demo Bank in Console](https://console.tink.com/demobank).

## 2\. Handle callback[](#handle-callback)

### 2.1 Synchronous flow[](#synchronous-flow)

When a user reaches the end of a Tink flow, they're redirected to the callback URI that you've provided in the URL. In case something goes wrong and you don't receive a callback with report identifiers, the flow hasn't completed successfully.

There are several reasons why the flow may fail. For a list of all error codes, see [Handle Account Check error codes](https://docs.tink.com/resources/account-check/handle-account-check-error-codes).

**The successful callback has this structure:**

```
{YOUR_CALLBACK_URI}?{PRODUCT-SPECIFIC_REPORT_ID}={YOUR_PRODUCT-SPECIFIC_REPORT_ID}
```

**In this example:**

```
https://console.tink.com/callback?account_verification_report_id=ff8ae53bc46e45fe9a37c4fd1353e60d&transaction_report_id=f4064408473947129e71ab2bf28a763a
```

Relay the parameters `account_verification_report_id` and `transaction_report_id` to your app and continue to section 3 to retrieve data.

### 2.2 Asynchronous flow using early redirect[](#asynchronous-flow-using-early-redirect)

If you don’t need to immediately use data, early redirect allows you to redirect users from Tink back to your application right after they successfully have authenticated. This means users won't have to wait for data to be fetched and processed and immediately progress in their flow. This is enabled by appending `async=true` to the Tink Link created as described in the [Build the URL](#build-the-url) section of this article.

Because the user is redirected to your application before all data is fetched and processed, you must make sure that all data has been fetched and reports generated before you can access the data.

When a user reaches the end of a flow, they're redirected to the callback URI that you've provided in the URL. This is the same as for the synchronous flow.

After a successful authentication, a `reports_generation_job_id` value is displayed. The value indicates that the user flow has successfully come to an end. Store this value in order to fetch the statuses of your reports that are being created.

**The successful callback has this structure:**

```
{YOUR_CALLBACK_URI}?reports_generation_job_id={YOUR_REPORTS_GENERATION_JOB_ID}
```

**Callback example:**

```
https://console.tink.com/callback?reports_generation_job_id=e54489df577643ddb3e5ffcfaf3bf5c1
```

## 3\. Authenticate your client[](#authenticate-your-client)

To access your user's account information, you must have a valid client access token that has specific scopes enabled, as detailed in the prerequisites section of this article.

**Note**: access tokens expire and must be renewed, typically in 30 minutes.

### 3.1 Synchronous flow[](#synchronous-flow)

**cURL example:**

Authenticate your client

```
curl -X POST https://api.tink.com/api/v1/oauth/token \
-d 'client_id='\
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=account-verification-reports:read,transaction-reports:readonly'
```

**Response example:**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope":  "account-verification-reports:read,transaction-reports:readonly"
}
```

### 3.2 Asynchronous flow using early redirect[](#asynchronous-flow-using-early-redirect)

**cURL example:**

Authenticate your client

```
curl -X POST https://api.tink.com/api/v1/oauth/token \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=reports-generation-jobs:readonly,account-verification-reports:read,transaction-reports:readonly'
```

**Response example:**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope":  "reports-generation-jobs:readonly,account-verification-reports:read,transaction-reports:readonly"
}
```

## 4\. Fetch the report generation job[](#fetch-the-report-generation-job)

> **Note**: only follow this step if you use the asynchronous flow. If you use the synchronous flow, skip this step (and continue with step 5, [Fetch the reports](#fetch-the-reports)).

To see the statuses and IDs of the reports that are being created in the background, call the `/api/v1/reports-generation-jobs` endpoint with the `job_id` that you saved from the callback page.

**cURL example:**

Fetch Reports Generation Job

```
https://api.tink.com/api/v1/reports-generation-jobs/ \
-H 'Authorization: Bearer '
```

If the status is in a `PENDING` state, we recommend polling this endpoint until you see a "final" state, `COMPLETED`. We recommend you to poll at 1 RPS (request per second). There is a practical aspect to this as Tink will need to wait for the banks to provide the end user's data and that can be seconds up to minutes. For more information, see [Reports Generation Jobs](https://docs.tink.com/api#general/reports-generation-jobs) in our API reference.

**Response example:**

```
{
  "id": "e54489df577643ddb3e5ffcfaf3bf5c1",
  "reports": [
    {
      "id": "ff8ae53bc46e45fe9a37c4fd1353e60d",
      "type": "ACCOUNT_VERIFICATION_REPORT",
      "status": "COMPLETED"
    },
    {
      "id": "f4064408473947129e71ab2bf28a763a",
      "type": "TRANSACTION_REPORT",
      "status": "COMPLETED"
    }
  ],
  "status": "COMPLETED",
  "createdTime": "2023-02-20T14:55:43Z",
  "updatedTime": "2023-02-20T14:56:01Z"
}
```

Save the ID fields in the `response.reports[]` field in order to be able to fetch reports in the step later.

## 5\. Fetch the reports[](#fetch-the-reports)

Once you have retrieved the report IDs in step 2.1 for synchronous or in step 4 for asynchronous, you are ready to fetch the data.

> **Note:** The reports will only contain data from accounts that the end user has selected. To include all of the end user's accounts in the report, add `account_dialog_type=NONE` to the URL.

To retrieve the Account Check report, call the [Account Verification Report API](https://docs.tink.com/api#data-v1/account-verification) client access token. You already have the client access token, so you just need to retrieve the JSON.

To retrieve transactions, call the [Transactions Report API](https://docs.tink.com/api#data-v2/transaction-report/get-transaction-report) client access token. This will provide you with a transaction report:

**cURL examples:**

Fetch your Account Check report

```
https://api.tink.com/api/v1/account-verification-reports/ \
-H 'Authorization: Bearer '
```

Fetch your Transactions report

```
curl -X GET https://api.tink.com/data/v2/transaction-reports/ \
  -H 'Authorization: Bearer '
```

The response includes **all** retrieved transactions from the bank in a single JSON structure.
