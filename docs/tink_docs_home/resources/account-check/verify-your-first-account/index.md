---
title: "Fetch your first Account Check report"
source: "https://docs.tink.com/resources/account-check/verify-your-first-account"
exportedAt: "2026-01-13T12:43:27.114Z"
---
Before we get into how you fetch your first Account Check report, we'd like to mention there's an easy way to experiment with Account Check by using our API. Try our [Postman collection for Account Check](https://docs.tink.com/resources/account-check/postman-collection-for-account-check)!

## 1\. Build the URL[](#build-the-url)

In Console, use the [Build your own Tink Link URL](https://console.tink.com/account-verification/tink-link) view to create your own URL. The URL is used to allow users to authenticate with their bank and select an account from which to fetch report data. For more information on how the URL works, see [Setup and integrate Account Check](https://docs.tink.com/resources/account-check/setup-and-integrate-account-check).

Integrate the URL with a site or in an app. For example, you can start an end user's Tink flow by redirecting them to a URL.

**Use the URL**

Use the example URL below by inserting the `client_id` value for your Tink app into the URL and then copy the URL and paste it in a browser address field.

```
https://link.tink.com/1.0/account-check?client_id={YOUR_CLIENT_ID}&redirect_uri=https://console.tink.com/callback&market=SE
```

**Note**: make sure that you exchange `{YOUR_CLIENT_ID}` in the URL for your `client_id` value.

When your users access the URL, they'll see a list of demo banks. Once they choose a bank, they'll see a list of demo bank accounts to choose from. Select the username and password for a Demo Bank user that suits your use case. For more information about Demo Bank, see [Demo Bank](https://docs.tink.com/resources/account-check/test-different-account-check-scenarios#demo-bank).

![Account check account selection](https://images.ctfassets.net/tmqu5vj33f7w/6hA4YqLwj8O8gNNPQKliQQ/f72f0a979388b1468f3e8a7338afd81f/image-accountSelection.jpg)

## 2\. Handle callback[](#handle-callback)

When a user reaches the end of a flow, they're redirected to the callback URI that you've provided in the URL. In case something goes wrong and you don't receive a callback with the `account_verification_report_id` value, the flow has failed to complete.

Some possible failure reasons:

-   The end user cancelled their flow
-   The end user didn't successfully authenticate with their bank
-   The end user didn't have any accounts available with the selected bank

For more information about errors, see [Handle Account Check error codes](https://docs.tink.com/resources/account-check/handle-account-check-error-codes).

**The successful callback has this structure:**

```
{YOUR_CALLBACK_URI}?account_verification_report_id={YOUR_ACCOUNT_VERIFICATION_REPORT_ID}
```

**In this example:**

```
https://console.tink.com/callback?account_verification_report_id=ff8ae53bc46e45fe9a37c4fd1353e60d
```

After a successful authentication, you will see a `account_verification_report_id` value, which indicates that a flow has successfully come to an end. Store this value. It is used to authenticate yourself in order to fetch your report.

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
-d 'scope=account-verification-reports:read'
```

**Response example**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope":  "account-verification-reports:read"
}
```

## 4\. Fetch the report[](#fetch-the-report)

**In JSON**

To fetch report JSON data based on a report identifier, see the [Account Verification Report API](https://docs.tink.com/api#data-v1/account-verification).

**cURL example**

Fetch your Account Check report in JSON

```
curl -X GET https://api.tink.com/api/v1/account-verification-reports/ \
  -H 'Authorization: Bearer '
```

**Note**: the report will only contain data from one provider, which is the bank that the end user has selected. The list of accounts will contain only one account, because it's the account that the end user has selected.

**As a PDF**

Fetching the account information report in PDF format is done through the [Account Verification Report API](https://docs.tink.com/api#data-v1/account-verification).

**cURL example**

Fetch your Account Check report as a PDF

```
curl -X GET https://api.tink.com/api/v1/account-verification-reports//pdf?template=standard-1.0 \
    -H 'Authorization: Bearer ' \
    > output.pdf
```

## Need help?[](#need-help-)

[Contact Sales](https://tink.com/contact-us) and let us help you get started.
