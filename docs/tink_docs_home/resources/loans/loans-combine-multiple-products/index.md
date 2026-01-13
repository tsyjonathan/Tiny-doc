---
title: "Combine multiple products - Tink Docs"
source: "https://docs.tink.com/resources/loans/loans-combine-multiple-products"
exportedAt: "2026-01-13T12:45:11.995Z"
---
Tink requires only a single authentication to fetch multiple data points from a bank account. In other words, you can combine multiple data products from Tink and get access to all the underlying data by sending your user on a single authentication journey. You also have the option of choosing between one-time and continuous access to the data.

## 1\. Build the URL[](#build-the-url)

To combine multiple products, build an SDK URL for our product bundling journey and specify the products you wish to use.

```
https://link.tink.com/1.0/products/connect-accounts
```

This URL can include these parameters:

| Parameter | Required | Description |
| --- | --- | --- |
| client\_id | ✅ | The `client_id` for your app. |
| redirect\_uri | ✅ | The URL to which the user is redirected to with the response. This must be registered in the app settings in Console before use. |
| products | ✅ | A comma-separated list of products you wish to combine (`ACCOUNT_CHECK`, `INVESTMENTS`, `LOANS`, `TRANSACTIONS`). |
| refreshable\_items | ❌ | A comma-separated list of [refreshable items](https://docs.tink.com/api#connectivity-v1/credentials/create-credentials/query-parameters) that specifies the data types to aggregate. This list overrides the default list of refreshable items for the respective products. |
| authorization\_code | ❌ | The created `USER_AUTHORIZATION_CODE` when using continuous access (see [generating a user authorization code](https://docs.tink.com/resources/tink-link-web/tink-link-web-permanent-users#generate-a-user-authorization-code)). |
| market | ❌ | Market code specifying which providers should be listed. |
| locale | ❌ | Locale to be used for end-user facing text. |

For a full list of parameters and options, see [Loans SDK reference](https://docs.tink.com/resources/loans/loans-sdk-reference).

**Example URL**

```
https://link.tink.com/1.0/products/connect-accounts?client_id={YOUR_CLIENT_ID}&redirect_uri=https://console.tink.com/callback&market=GB&products=TRANSACTIONS,INVESTMENTS,LOANS
```

When the end user accesses the URL, they're requested to authenticate towards their bank.

## 2\. Handle callback[](#handle-callback)

When the end user completes the authentication journey, they're redirected to the specified redirect URI with a success or error response. After a successful authentication, you will receive a `code` parameter as part of the response. This is the authorization code to be exchanged for an user access token to access the user's data.

**Success response**

```
{YOUR_REDIRECT_URI}?code={YOUR_CODE}
```

**Example response**

```
https://console.tink.com/callback?code=ff8ae53bc46e45fe9a37c4fd1353e60d 
```

## 3\. Authenticate your client[](#authenticate-your-client)

To access the user's data, you need a valid user access token with specific scopes enabled, as required per the products that you are using.

**cURL example**

Exchange your code for an access\_token

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
  -d 'code=' \
  -d 'client_id=' \
  -d 'client_secret=' \
  -d 'grant_type=authorization_code'
```

**Response**

```
{
    "access_token": "{YOUR_USER_ACCESS_TOKEN}",
    "token_type": "bearer",
    "expires_in": 1800,
    "refresh_token": "{YOUR_USER_REFRESH_TOKEN}",
    "scope": "transactions:read,investment-accounts:readonly,loan-accounts:readonly"
}
```

## 4\. Fetch the data[](#fetch-the-data)

To retrieve the report, we need to call the API endpoints for the [respective products](https://docs.tink.com/api). Use the user access token that you fetched in step 3, for the examples below.

**Examples**

Fetch Transactions data

```
curl https://api.tink.com/data/v2/transactions \
  -H 'Authorization: Bearer '
```

Fetch Investments data

```
curl https://api.tink.com/data/v2/investment-accounts \
  -H 'Authorization: Bearer '
```

Fetch Loans data

```
curl https://api.tink.com/data/v2/loan-accounts \
  -H 'Authorization: Bearer '
```
