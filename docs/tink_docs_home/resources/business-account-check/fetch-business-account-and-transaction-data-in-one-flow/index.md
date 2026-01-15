---
title: "Fetch business account and transaction data in one flow"
source: "/Tiny-doc/tink_docs_home/resources/business-account-check/fetch-business-account-and-transaction-data-in-one-flow/"
exportedAt: "2026-01-13T12:44:29.193Z"
---
Tink only requires one single authentication to fetch multiple data points from a business account. In other words, a user must only authenticate once to fetch data from more than one Tink product. There's no need for users to reauthenticate. This is useful when, for example, you need to fetch business-account verification data and transaction data at the same time.

**Note**: You are billed for each product that you use simultaneously. Please contact Sales if you have questions about this.

## 1\. Build the URL[](#build-the-url)

The base URL that's required to combine two Tink products is different from the base URL that is used for one product.

The base URL for combining multiple products is:

```
[external url removed]
```

This URL can include these parameters:

| Parameter | Required? | Description |
| --- | --- | --- |
| client\_id | ✅ | The `client_id` for your app. |
| redirect\_url | ✅ | The URL to which the user is redirected. This must be configured in the app settings in Console before first use. |
| report\_types | ✅ | Report type. To use both report types, separate the values by using a comma. Options: `TRANSACTION_REPORT, BUSINESS_ACCOUNT_VERIFICATION_REPORT` |
| refreshable\_items | ✅ | Account types. To use more than one, separate the values by using a comma. Options: `CHECKING_ACCOUNTS, SAVING_ACCOUNTS, IDENTITY_DATA, CHECKING_TRANSACTIONS, SAVING_TRANSACTIONS, CREDITCARD_TRANSACTIONS` |
| account\_dialog\_type | ✅ | Should the end user be able to select which account to use? Values: `SINGLE`\=select a single account, `MULTI`\=select multiple accounts, `NONE`\=no selection dialog. |
| input\_provider | ❌ | A specified list of providers that are presented to the end user. If this parameter is not used, the full list of providers is presented. |
| state | ❌ | The parameter that is returned in the callback after the user authenticates with a bank. This can be used to match the user on your end. |

In this example URL, the market is `SE` and its output will generate both an Account Check report and a Transactions report.

```
[external url removed]
```

When the end user accesses the URL, they are requested to authenticate to their bank. To use Demo Bank credentials, see Demo Bank in Console.

## 2\. Handle callback[](#handle-callback)

When a user reaches the end of a Tink flow, they're redirected to the callback URI that you've provided in the Tink URL. In case something goes wrong and you don't receive a callback with report identifiers, the flow did not complete successfully.

Some possible failure reasons:

-   The user cancelled their Tink flow
-   The user didn't successfully authenticate with their bank
-   The user didn't have any accounts available with the selected bank

**The successful callback has this structure:**

```
{YOUR_CALLBACK_URI}?{PRODUCT_SPECIFIC_REPORT_ID}={YOUR_PRODUCT_SPECIFIC_REPORT_ID}...
```

**In this example:**

```
[external url removed]
```

Relay the parameters `business_account_verification_report_id` and `transaction_report_id` to your app and continue to section 3 to retrieve data.

## 3\. Authenticate your client[](#authenticate-your-client)

To access the resulting reports, you need a valid client access token with scopes to access each report.

In our example, the necessary scopes are `transaction-reports:readonly` and `business-account-verification-reports:read`.

cURL example

```
curl -X POST [external url removed] \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=business-account-verification-reports:read,transaction-reports:readonly'
```

**Response example:**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope":  "business-account-verification-reports:read,transaction-reports:readonly"
}
```

## 4\. Fetch the report[](#fetch-the-report)

To retrieve the Business Account Check report, see [section 4 of **Fetch your first Business Account Check report**](/Tiny-doc/tink_docs_home/resources/business-account-check/fetch-your-first-business-account-check-report/#fetch-the-report). You already have the client access token, so you just need to retrieve the JSON or PDF report.

> **Note:** The reports will only contain data from accounts that the end user has selected. To include all of the end user's accounts in the report, add `account_dialog_type=NONE` to the URL.

To retrieve transactions, call the [Transactions Report API](/Tiny-doc/tink_docs_api/api/#data-v2/transaction-report/get-transaction-report) client access token. This will provide you with a transaction report in the JSON format:

cURL example

```
curl [external url removed] \
  -H 'Authorization: Bearer '
```

The response will include **all** retrieved transactions from the bank in a single JSON structure.

## Need help?[](#need-help-)

Contact Sales and let us help you get started.
