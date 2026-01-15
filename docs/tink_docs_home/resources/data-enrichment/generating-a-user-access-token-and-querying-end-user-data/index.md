---
title: "Generating a user access token and querying end-user data"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/generating-a-user-access-token-and-querying-end-user-data/"
exportedAt: "2026-01-13T12:47:34.316Z"
---
In previous guides when ingesting or aggregating data, we have been generating client access tokens to authenticate and authorize the application itself. Almost all endpoints under Data Enrichment, and especially when getting a single user’s data, will instead require a user access token. Which type of token is needed is always documented in the endpoint documentation, and the technical definitions can be found in the OAuth standard.

This article will go through the steps of how to generate a user token and use that token to fetch end-user data.

The steps we will cover in this guide:

1.  Create a client access token
2.  Create an authorization grant code
3.  Create a user access token
4.  Fetch end-user data

### Step 1: Create a client access token[](#step-1-create-a-client-access-token)

The following request will authorize the application using the client id/secret and request a client access token with the authorization:grant scope permissions. The client access token grants your application access to the authorization-grant endpoints which will allow you to create an authorization grant code, which is needed to create a user access token. The access token will be valid for 30 minutes.

**Example request:**

```
curl -v -X POST [external url removed] \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=authorization:grant'
```

**Example response:**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope": "authorization:grant"
}
```

For more information, see [complete documentation reference](/Tiny-doc/tink_docs_api/api/#general/oauth/get-access-token).

Use the generated client token to create a new authorization grant code. Use the external\_user\_id connected to the end-user whose data you want to fetch. In the scope field, add the scopes needed for the particular endpoint you want to access for your user.

**Example request:**

```
curl -X POST [external url removed] \
-H 'Authorization: Bearer ' \
-d 'external_user_id=EXTERNAL_USER_ID' \
-d 'scope=accounts:read,transactions:read,user:read,credentials:read'
```

**Example response:**

```
{
  "code": "{YOUR_USER_AUTHORIZATION_CODE}"
}
```

For more information, see [complete documentation reference](/Tiny-doc/tink_docs_api/api/#general/oauth/create-authorization).

### Step 3: Create a user access token[](#step-3-create-a-user-access-token)

In this step you will call the oauth/token endpoint again, but this time we’re also including the grant\_type and code fields. By including these, we will generate a user access token which we’ll need to fetch user data (instead of the client access token you used in step 2), with the permissions set by the scopes we included when generating the authorization grant code.

**Example request:**

```
curl -v -X POST [external url removed] \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=authorization_code' \
-d 'code='
```

**Example response:**

```
{
  "access_token": "{YOUR_USER_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 7200,
  "scope": "accounts:read,transactions:read,user:read"
}
```

For more information, see [complete documentation reference](/Tiny-doc/tink_docs_api/api/#general/oauth/get-access-token).

### Step 4: Fetch end-user data[](#step-4-fetch-end-user-data)

You can now use the user access token for requests to endpoints with the same scopes as you specified when creating the authorization grant code. Only the data connected to the end-user referenced while creating the authorization grant code can be fetched using this user token.

To see if your ingestion or aggregation succeeded, you can call the enriched transactions endpoint. Attach the user access token to the Authorization header as follows:

**Example request:**

```
curl "[external url removed]" \
  -H 'Authorization: Bearer '
```

**Example response:**

```
{
  "nextPageToken": "Qv+BAwEBCU6ld0N1cnNvcgH/ggABAgEPT3JpZ2luYWjSZXF1ZXN0AQoAARFTb3J0VmFsdWVzTGFzdEhpdAH/hAAAABz/gwIBAQ5bXWludGVyZmFjZSB7fQH/hAQBEAAAbf+CASgKIDQxYTFjZWU1YjVkYTRlOTliMTE0MTFkMGQyYWM5ODU1IAEqAggBAQIHZmxvYXQ2NAyJAPmwB68OL3VCBnN0cmluZwwiACAyNTg5MjNiZWNiYWI0MGZiOPI0NGMxMGE5M2FjZTk7ZQA=hnW2XcDznGHI4Iwci5Zi/zrmDA1LLKANTjKmmeMJA+E=",
  "transactions": [
   {
      "accountId": "4a2945d1481c4f4b98ab1b135afd96c0",
      "amount": {
          "currencyCode": "GBP",
          "value": {
             "scale": "1",
             "unscaledValue": "-1300"
          }
      },
      "bookedDateTime": "2020-12-15T09:25:12Z",
      "dates": {
         "booked": "2020-12-15",
         "value": "2020-12-15"
    },
    "descriptions": {
        "display": "Tesco",
        "original": "TESCO STORES 3297",
        "detailed": {
            "unstructured": "TESCO STORES 3297 Täby"
        }

     },
     "enrichedData": {
     "categories": {
          "pfm": {
             "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",§
           }
         }
      },
      "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
      "identifiers": {
          "providerTransactionId": "500015d3-acf3-48cc-9918-9e53738d3692"
      },
      "merchantInformation": {
         "merchantCategoryCode": "string",
         "merchantName": "string"
      },
      "providerMutability": "MUTABILITY_UNDEFINED",
      "reference": "string",
      "status": "BOOKED",
      "transactionDateTime": "string",
      "types": {
          "financialInstitutionTypeCode": "DEB",
          "type": "DEFAULT"
      },
      "valueDateTime": "2020-12-15T09:25:12Z",
      "counterparties": {
          "payer": {
               "name": "Joe Doe",
               "identifiers": {
                    "financialInstitution": {
                            "accountNumber": "479696******8661"
                    }
               }
       },
           "payee": {
               "name": "Jane Doe",
               "identifiers": {
                     "financialInstitution": {
                          "accountNumber": "SE3778591419782047144807"
                     }
               }
        }
    }
  ]
}
```

Data Enrichment endpoints that return lists of values (like list enriched transactions, for example) have **paginated** results. This means that we will return some number (a **page**) of results but may not return all the results at once (the default is 10 per page).

There are two parameters you can add as query parameters to your request to control pagination. You don’t need these parameters to call the endpoint, but if you want to change the number of results per page or the page you are on, you can use them:

| Request Parameter | Description |
| --- | --- |
| pageSize={integer} | The number of transactions returned per page |
| pageToken={string} | The token provided by the response to fetch the next page |

In the response body, you will get nextPageToken, which you can use in your next request to fetch the next page of results.

| Response Field | Description |
| --- | --- |
| nextPageToken | The token for the next page |

For example, using this example list enriched transactions URL, you can get a specific page of results with a page size of 20 transactions:

```
curl "[external url removed]" \ 
-H 'Authorization: Bearer {YOUR_USER_ACCESS_TOKEN}'
```
