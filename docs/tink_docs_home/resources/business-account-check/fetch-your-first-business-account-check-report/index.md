---
title: "Fetch your first Business Account Check report"
source: "https://docs.tink.com/resources/business-account-check/fetch-your-first-business-account-check-report"
exportedAt: "2026-01-13T12:44:23.912Z"
---
## 1\. Build the URL[](#build-the-url)

In Console, use the [Build your own Tink Link URL](https://console.tink.com/business-account-check/tink-link) view to create your own URL. Your URL is used to allow users to authenticate with their bank and select a business account from which to fetch report data. For more information on how the URL works, see [Setup and integrate Business Account Check](https://docs.tink.com/resources/business-account-check/setup-and-integrate-business-account-check).

Integrate the URL with a site or in an app. For example, you can start an end user's Tink flow by redirecting them to a URL.

**Use the URL**

Use the example URL below by inserting the `client_id` value for your Tink app into the URL and then copy the URL and paste it in a browser address field.

```
https://link.tink.com/1.0/business-account-check?client_id={YOUR_CLIENT_ID}&redirect_uri=https://console.tink.com/callback&market=SE
```

**Note**: make sure that you exchange `{YOUR_CLIENT_ID}` in the URL for your `client_id` value.

When your users access the URL, they'll see a list of demo banks. Once they choose a bank, they'll see a list of demo bank accounts to choose from. Select the username and password for a Demo Bank user that suits your use case. For more information about Demo Bank, see [Demo Bank](https://docs.tink.com/resources/business-account-check/test-different-business-account-check-scenarios#demo-bank).

![Business Account check account selection](https://images.ctfassets.net/tmqu5vj33f7w/6hA4YqLwj8O8gNNPQKliQQ/f72f0a979388b1468f3e8a7338afd81f/image-accountSelection.jpg)

## 2\. Handle callback[](#handle-callback)

When a user reaches the end of a Tink flow, they're redirected to the callback URI that you've provided in the Tink URL. In case something goes wrong and you don't receive a callback with the `business_account_verification_report_id` value, the flow has failed to complete.

Some possible failure reasons:

-   The end user cancelled their Tink flow
-   The end user didn't successfully authenticate with their bank
-   The end user didn't have any accounts available with the selected bank

For more information about errors, see [Handle Business Account Check error codes](https://docs.tink.com/resources/business-account-check/handle-business-account-check-error-codes).

**The successful callback has this structure:**

```
{YOUR_CALLBACK_URI}?business_account_verification_report_id={YOUR_BUSINESS_ACCOUNT_VERIFICATION_REPORT_ID}
```

**In this example:**

```
https://console.tink.com/callback?business_account_verification_report_id=ff8ae53bc46e45fe9a37c4fd1353e60d
```

After a successful authentication, you will see a `business_account_verification_report_id` value, which indicates that a flow has successfully come to an end. Store this value. It is used to authenticate yourself in order to fetch your report.

**Note**: reports expire, typically in one hour.

## 3\. Authenticate your client[](#authenticate-your-client)

To access your user's account information, you need a valid client access token with the scope `account-verification-reports:read`.

**Note**: access tokens expire and must be renewed, typically in 30 minutes.

**cURL example**

Authenticate your client

```
curl -X POST https://api.tink.com/api/v1/oauth/token \
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

To fetch report JSON data based on a report identifier, see the [Business Account Verification Report API](https://docs.tink.com/api#data-v1/business-account-verification).

**cURL example**

Fetch your Business Account Check report

```
curl https://api.tink.com/data/v1/business-account-verification-reports/ \
  -H 'Authorization: Bearer '
```

**Note**: the report will only contain data from one provider, which is the bank that the end user has selected. The list of accounts will contain only one account account, because it's the account that the end user has selected.

## Need help?[](#need-help-)

[Contact Sales](https://tink.com/contact-us) and let us help you get started.
