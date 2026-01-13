---
title: "Get data into the Tink platform using the Connector"
source: "https://docs.tink.com/resources/data-enrichment/get-data-into-the-tink-platform-using-the-connector"
exportedAt: "2026-01-13T12:47:31.538Z"
---
Almost all endpoints that are used by Data Enrichment require permanent users and end-user transaction data. There are two methods to get a user’s transactions to the platform: through Aggregation (which delegates the task of transaction ingestion to Tink if an end-user has given consent) or through manual ingestion by using the Connector API. Select the approach that fits your use case. The manual ingestion by using the Connector API is presented below. For more information about Aggregation, see [link](https://docs.tink.com/resources/data-enrichment/get-data-into-the-tink-platform-using-aggregation).

## Ingest users, accounts, and transactions into the Tink Platform by using Connector[](#ingest-users-accounts-and-transactions-into-the-tink-platform-by-using-connector)

In addition to aggregation of user data through Tink Link, Tink also offers push ingestion of accounts and transactions through the Connector API. This might be suitable if you already have account and transaction data for your end users, for example.

This article guides you through the steps of how to manually create a user, and then ingest both an account and transactions for that user. There are some caveats to manual ingestion and all of them won’t be covered in this article – we encourage you to [read the full API reference](https://docs.tink.com/api/connector#introduction) if you intend to use this for production.

The steps we will cover in this guide:

1.  Creating a client access token
2.  Creating a user
3.  Ingesting an account
4.  Ingesting transactions

### Step 1: Creating a client access token[](#step-1-creating-a-client-access-token)

The following request will authorize the application using the client id and secret to request a client access token with the user:create, transaction:create and accounts:create scope permissions. The client access token grants your application access to all endpoints needed for ingestion of users, accounts and transactions. The access token will be valid for 30 minutes.

**Example request:**

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=user:create,accounts:write,transactions:write'
```

**Example response:**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope": "user:create,accounts:write,transactions:write"
}
```

For more information, see [complete documentation reference](https://docs.tink.com/api#general/oauth/get-access-token).

### Step 2: Creating a user[](#step-2-creating-a-user)

Use the generated client access token from step 1 to create a new Tink User. Add a unique external user id (external\_user\_id) to keep a reference to the user – you will use external\_user\_id in later steps of this guide. Also add the market (ISO 3166-1 country code) that you’re in. A full reference of which markets are supported can be [found here](https://docs.tink.com/resources/transactions/transactions-sdk-reference#markets).

**Example request:**

```
curl -v -X POST https://api.tink.com/api/v1/user/create \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '
    {
      "external_user_id": "user_123_abc",
      "market": "GB", 
    }
  '
```

**Example response:**

```
{
  "external_user_id": "user_123_abc",
  "user_id": "THE_CREATED_USER_ID"
}
```

For more information, see [complete documentation reference](https://docs.tink.com/api#general/user/create-user).

### Step 3: Ingesting an account[](#step-3-ingesting-an-account)

You now have a user to add an account to. Use the generated client access token from step one and external\_user\_id from step two to ingest an account as shown in the example request below. You will need to get or generate a unique external id to keep a reference to the account – you will be using it in later steps.

**Example request:**

```
curl -v -X POST 'https://api.tink.com/connector/users/{externalUserId}/accounts' \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{
  "accounts": [
    {
      "balance": 7000,
      "externalId": "AN_EXTERNAL_ACCOUNT_ID",
      "name": "YOUR_CHECKING_ACCOUNT",
      "number": "52670208126",
      "type": "CREDIT_CARD"
    }
  ]
}'
```

For more information, see [complete documentation reference](https://docs.tink.com/api/connector#data/account/ingest-accounts).

### Step 4: Ingesting transactions[](#step-4-ingesting-transactions)

Use the generated client access token from step 1, the external user id from step 2 and the external (account) id from step 3 to ingest transactions. Also, for each ingested transaction, attach and store a unique external id to keep a reference to each of the transactions.

\_\_Example request: \_\_

```
curl -v -X POST 'https://api.tink.com/connector/users/{externalUserId}/transactions' \
-H 'Authorization: Bearer {YOUR_CLIENT_ACCESS_TOKEN}' \
-H 'Content-Type: application/json' \
-d '{
  "transactionAccounts": [
    {
      "balance": 7000,
      "externalId": {externalAccountId},
      "reservedAmount": 2000,
      "transactions": [
        {
          "amount": -98,
          "date": 1455740874875,
          "description": "Riche Teatergrillen",
          "externalId": "AN_EXTERNAL_TRANSACTION_ID",
          "type": "CREDIT_CARD"
        }
      ]
    }
  ],
  "type": "REAL_TIME"
}'
```

For more information, see [complete documentation reference](https://docs.tink.com/api/connector#data/transaction/ingest-transactions).

A successful ingestion of accounts returns HTTP 204 with no response body. The transactions will be processed asynchronously and won’t be available immediately, but shouldn’t take more than a few seconds if there are only several of them.

You should receive an HTTP 204 response, which means that the transactions have begun processing in Tink’s system. There are other possible parameters in the request object that we didn’t use in the example but you might be interested in, you can find a complete reference to the endpoint [here](https://docs.tink.com/api/connector#data/transaction/ingest-transactions).

If you are using this article as a quick start guide and are ingesting a couple of transactions, it should not take more than a couple of seconds. Refer to the \_\_generating a user access token and querying end-user data article \_\_on how to fetch your enriched ingested data.

A successful ingestion of accounts returns HTTP 204 with no response body. If you want to see the entire accounts object before ingesting transactions, refer to the generating a user access token and querying end-user data article.
