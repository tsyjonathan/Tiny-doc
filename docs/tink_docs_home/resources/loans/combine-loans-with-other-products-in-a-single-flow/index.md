---
title: "Combine Loans with other products in a single flow"
source: "/Tiny-doc/tink_docs_home/resources/loans/combine-loans-with-other-products-in-a-single-flow/"
exportedAt: "2026-01-13T12:45:47.208Z"
---
Tink requires only a single authentication to fetch multiple data points from a bank account. In other words, you can combine multiple data products from Tink and get access to all the underlying data by sending your user on a single authentication journey. You also have the option of choosing between one-time and continuous access to the data.

## 1\. Build the URL[](#build-the-url)

To combine multiple products, build an SDK URL for our product bundling journey and specify the products you wish to use.

```
[external url removed]
```

This URL can include these parameters:

| Parameter | Required | Description |
| --- | --- | --- |
| client\_id | ✅ | The `client_id` for your app. |
| redirect\_uri | ✅ | The URL to which the user is redirected to with the response. This must be registered in the app settings in Console before use. |
| products | ✅ | A comma-separated list of products you wish to combine (`ACCOUNT_CHECK`, `INVESTMENTS`, `LOANS`, `TRANSACTIONS`). |
| refreshable\_items | ❌ | A comma-separated list of [refreshable items](/Tiny-doc/tink_docs_api/api/#connectivity-v1/credentials/create-credentials/query-parameters) that specifies the data types to aggregate. This list overrides the default list of refreshable items for the respective products. |
| authorization\_code | ❌ | The created `USER_AUTHORIZATION_CODE` when using continuous access (see [generating a user authorization code](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/#generate-a-user-authorization-code)). |
| market | ❌ | Market code specifying which providers should be listed. |
| locale | ❌ | Locale to be used for end-user facing text. |

For a full list of parameters and options, see [Investments SDK reference](/Tiny-doc/tink_docs_home/resources/investments/investments-sdk-reference/).

**Example URL**

```
[external url removed]
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
[external url removed] 
```

## 3\. Authenticate your client[](#authenticate-your-client)

To access the user's data, you need a valid user access token with specific scopes enabled, as required per the products that you are using.

**cURL example**

Exchange your code for an access\_token

```
curl -v -X POST [external url removed] \
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

To retrieve the report, we need to call the API endpoints for the [respective products](/Tiny-doc/tink_docs_api/api/). Use the user access token that you fetched in step 3, for the examples below.

**Examples**

Fetch Transactions data

```
curl [external url removed] \
  -H 'Authorization: Bearer '
```

Fetch Investments data

```
curl [external url removed] \
  -H 'Authorization: Bearer '
```

Fetch Loans data

```
curl [external url removed] \
  -H 'Authorization: Bearer '
```
