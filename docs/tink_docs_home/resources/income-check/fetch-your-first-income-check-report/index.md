---
title: "Fetch your first Income Check report"
source: "/Tiny-doc/tink_docs_home/resources/income-check/fetch-your-first-income-check-report/"
exportedAt: "2026-01-13T12:48:22.740Z"
---
## 1\. Build the URL[](#build-the-url)

In Console, use the [Build your own Tink Link URL](https://console.tink.com/income-check/tink-link) view to create your own URL. Your resulting URL is used to allow users to authenticate with their bank and select an account from which to fetch report data. For more information on how the URL works, see see [Setup and integrate Income Check](/Tiny-doc/tink_docs_home/resources/income-check/setup-and-integrate-income-check/).

For actual use of the URL, integrate it with a site or in an app. For example, you can start a user's flow by redirecting them to the URL.

**Use the URL**

Use the example URL below by inserting the `client_id` value for your Tink app into the URL, copy the URL, and paste it into the address bar of a web browser.

```
https://link.tink.com/1.0/income-check?client_id={YOUR_CLIENT_ID}&redirect_uri=https://console.tink.com/callback&market=SE
```

**Note**: make sure that you exchange `{YOUR_CLIENT_ID}` in the URL for your `client_id` value.

When your users access the URL, they'll see a list of demo banks. Once they choose a bank, they'll see a list of demo bank accounts to choose from. Select the username and password for a Demo Bank user that suits your use case. For more information about Demo Bank, see [Demo Bank](/Tiny-doc/tink_docs_home/resources/income-check/test-different-income-check-scenarios/).

## 2\. Handle callback[](#handle-callback)

When a user reaches the end of a flow, they're redirected to the callback URI that you've provided in the URL. In case something goes wrong and you don't receive a callback with the `income_check_id` value, the flow has failed to complete.

Some possible failure reasons:

-   The end user cancelled their flow
-   The end user did not successfully authenticate with their bank
-   The end user didn't have any accounts available with the selected bank

For more information about error statuses, see [Handle Income Check error codes](/Tiny-doc/tink_docs_home/resources/income-check/handle-income-check-error-codes/).

**The successful callback has this structure**

```
{YOUR_CALLBACK_URI}?income_check_id={YOUR_ACCOUNT_VERIFICATION_REPORT_ID}
```

**In this example**

```
https://console.tink.com/callback?income_check_id=ff8ae53bc46e45fe9a37c4fd1353e60d
```

After a successful authentication, you will see a `income_check_id` value, which indicates that a flow has successfully come to an end. Store this value. It's used to authenticate yourself to fetch verified income.

## 3\. Authenticate your client[](#authenticate-your-client)

To access your user's account information, you need a valid client access token with the scope `income-checks:readonly`.

**Note**: access tokens expire and must be renewed, typically in 30 minutes.

Authenticate your client

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=income-checks:readonly'
```

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope":  "income-checks:readonly"
}
```

## 4\. Fetch the report[](#fetch-the-report)

To fetch the income report, see the [Get an income check API](/Tiny-doc/tink_docs_api/api/#risk/income-check/get-an-income-check).

**cURL example**

Fetch your Income Check report

```
curl -X GET https://api.tink.com/v2/income-checks/ \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' 
```

**Response example**

```
{
  "accounts": [
    {
      "accountNumber": "1234-123456789",
      "financialInstitutionName": "Demo Bank",
      "holderNames": [
        "John Doe",
        "Jane Doe"
      ],
      "id": "a6bb87e57a8c4dd4874b241471a2b9e8",
      "name": "John’s and Jane's account"
    }
  ],
  "appId": "56a33be25eb9443fbb696f7c61eabd94",
  "createdTime": "2021-04-22T09:59:56.966Z",
  "engineVersion": "1.0.0",
  "externalReference": "ext-abc-123",
  "id": "a8efc70a24a5e4aed0f8d3e5380b01fd74fc9cd1",
  "identity": {
    "name": "John Doe",
    "ssn": "197601011234"
  },
  "income": {
    "primaryIncomeStreamId": "f1d2d2f924e986ac86fdf7b36c94bcdf32beec15",
    "streams": [
    ...
```

## Need help?[](#need-help-)

[Contact Sales](https://tink.com/contact-us) and let us help you get started.
