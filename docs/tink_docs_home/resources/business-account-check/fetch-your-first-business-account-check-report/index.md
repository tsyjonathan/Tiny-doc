---
title: "Fetch your first Business Account Check report"
source: "/Tiny-doc/tink_docs_home/resources/business-account-check/fetch-your-first-business-account-check-report/"
exportedAt: "2026-01-13T12:44:23.912Z"
---
## 1\. Build the URL[](#build-the-url)

In Console, use the Build your own Tink Link URL view to create your own URL. Your URL is used to allow users to authenticate with their bank and select a business account from which to fetch report data. For more information on how the URL works, see [Setup and integrate Business Account Check](/Tiny-doc/tink_docs_home/resources/business-account-check/setup-and-integrate-business-account-check/).

Integrate the URL with a site or in an app. For example, you can start an end user's Tink flow by redirecting them to a URL.

**Use the URL**

Use the example URL below by inserting the `client_id` value for your Tink app into the URL and then copy the URL and paste it in a browser address field.

```
[external url removed]
```

**Note**: make sure that you exchange `{YOUR_CLIENT_ID}` in the URL for your `client_id` value.

When your users access the URL, they'll see a list of demo banks. Once they choose a bank, they'll see a list of demo bank accounts to choose from. Select the username and password for a Demo Bank user that suits your use case. For more information about Demo Bank, see [Demo Bank](/Tiny-doc/tink_docs_home/resources/business-account-check/test-different-business-account-check-scenarios/#demo-bank).

*Image removed: Business Account check account selection*

## 2\. Handle callback[](#handle-callback)

When a user reaches the end of a Tink flow, they're redirected to the callback URI that you've provided in the Tink URL. In case something goes wrong and you don't receive a callback with the `business_account_verification_report_id` value, the flow has failed to complete.

Some possible failure reasons:

-   The end user cancelled their Tink flow
-   The end user didn't successfully authenticate with their bank
-   The end user didn't have any accounts available with the selected bank

For more information about errors, see [Handle Business Account Check error codes](/Tiny-doc/tink_docs_home/resources/business-account-check/handle-business-account-check-error-codes/).

**The successful callback has this structure:**

```
{YOUR_CALLBACK_URI}?business_account_verification_report_id={YOUR_BUSINESS_ACCOUNT_VERIFICATION_REPORT_ID}
```

**In this example:**

```
[external url removed]
```

After a successful authentication, you will see a `business_account_verification_report_id` value, which indicates that a flow has successfully come to an end. Store this value. It is used to authenticate yourself in order to fetch your report.

**Note**: reports expire, typically in one hour.

## 3\. Authenticate your client[](#authenticate-your-client)

To access your user's account information, you need a valid client access token with the scope `account-verification-reports:read`.

**Note**: access tokens expire and must be renewed, typically in 30 minutes.

**cURL example**

Authenticate your client

```
curl -X POST [external url removed] \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=business-account-verification-reports:read'
```

**Response example**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope":  "business-account-verification-reports:read"
}
```

## 4\. Fetch the report[](#fetch-the-report)

**In JSON**

To fetch report JSON data based on a report identifier, see the [Business Account Verification Report API](/Tiny-doc/tink_docs_api/api/#data-v1/business-account-verification).

**cURL example**

Fetch your Business Account Check report

```
curl [external url removed] \
  -H 'Authorization: Bearer '
```

**Note**: the report will only contain data from one provider, which is the bank that the end user has selected. The list of accounts will contain only one account account, because it's the account that the end user has selected.

## Need help?[](#need-help-)

Contact Sales and let us help you get started.
