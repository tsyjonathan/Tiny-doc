---
title: "Ingest accounts & transactions into the Tink Platform"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/ingest-accounts-and-transactions/"
exportedAt: "2026-01-13T12:51:32.863Z"
---
These are the steps we will go through:

1.  Ingest account data to an existing user
2.  Review the added accounts
3.  Ingest transactions to an account
4.  Verify that account/transactions has been processed and enriched
5.  Verify that the transaction has been added to the account

## Ingest account data to an existing user[](#ingest-account-data-to-an-existing-user)

**Documentation**: Visit the **Account service** section in the [Connector API reference](/Tiny-doc/tink_docs_api/api/).

**Purpose**: Creates accounts for a specific `externalUserId` via the connector API. When creating the user prior to doing ingestion, you must define an `externalUserId` for the user. `external_user_id` is an identifier you associate with this user, which is unique within your app. We suggest avoiding PII and recommend using a generated ID containing only `a-z`, `0-9` and `-`. This parameter is global unique for the app.

> **Note**: that the token used for the connector API is `YOUR_CLIENT_ACCESS_TOKEN`.

Request example

```
curl -v -X POST 'https://api.tink.com/connector/users/{externalUserId}/accounts' \
-H 'Authorization: Bearer {YOUR_CLIENT_ACCESS_TOKEN}' \
-H 'Content-Type: application/json' \
-d '{
  "accounts": [
    {
      "availableCredit": 20000,
      "balance": 7000,
      "closed": false,
      "externalId": "AN_EXTERNAL_ACCOUNT_ID",
      "flags": [
        "MANDATE"
      ],
      "name": "YOUR_CHECKING_ACCOUNT",
      "number": "52670208126",
      "payload": {},
      "reservedAmount": 2000,
      "type": "CREDIT_CARD"
    }
  ]
}'
```

**Response**: A successful ingestion of an account returns `HTTP 204` with no additional content. To review if data is correctly added, please verify by listing the account/s (next step in this guide).

**Common errors**:

-   `HTTP 401` (Possible reasons is expired `YOUR_CLIENT_ACCESS_TOKEN`)
-   `HTTP 403 - Access forbidden` (The `YOUR_CLIENT_ACCESS_TOKEN` is most likely missing a required scope)

## Review the added accounts[](#review-the-added-accounts)

**Documentation**: Visit the [Account API](/Tiny-doc/tink_docs_api/api/#data-v1/account).

**Purpose**: Returns an object with a list of the authenticated user's accounts. This list can then be reviewed to verify that the ingested information is correct.

> **Note**: To be able to list the account, a `YOUR_USER_ACCESS_TOKEN` for the specific user must be generated and authenticated. For a detailed description of how to do this, please read the [Getting started](/Tiny-doc/tink_docs_home/resources/api-setup/) section.

Request example

```
curl -X GET 'https://api.tink.com/api/v1/accounts/list' \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json'
```

**Response**:

```
{
  "accounts": [
    {
      "accountNumber": "52670208126",
      "availableCredit": 20000.0,
      "balance": 5000.0,
      "bankId": "AN_EXTERNAL_ACCOUNT_ID",
      "certainDate": null,
      "credentialsId": "3360e34a8d35427f8d8add08dfd33876",
      "excluded": false,
      "favored": false,
      "id": "01df3e7a43564085a164023ea4c8ece5",
      "name": "YOUR_CHECKING_ACCOUNT",
      "ownership": 1.0,
      "payload": "{\"PARTNER_PAYLOAD\":\"{}\"}",
      "type": "CREDIT_CARD",
      "userId": "85a9632e3b3942a48844491f0054fa77",
      "userModifiedExcluded": false,
      "userModifiedName": false,
      "userModifiedType": false,
      "identifiers": "[]",
      "transferDestinations": null,
      "details": null,
      "images": {
        "icon": "https://cdn.tink.se/provider-images/placeholder.png",
        "banner": null
      },
      "holderName": null,
      "closed": false,
      "flags": "[\"MANDATE\"]",
      "accountExclusion": "NONE",
      "currencyCode": "SEK",
      "currencyDenominatedBalance": {
        "unscaledValue": 50000,
        "scale": 1,
        "currencyCode": "SEK"
      },
      "refreshed": null,
      "financialInstitutionId": null
    }
  ]
}
```

**Common errors**:

-   `HTTP 400 - Authorization code not valid`
-   `HTTP 401 - Could not find the OAuth client` (The specified `clientId` is invalid)
-   `HTTP 409 - Account already exists`

## Ingest Transactions[](#ingest-transactions)

**Documentation:** Visit the **Transaction service** section in the [Connector API reference](/Tiny-doc/tink_docs_api/api/).

**Purpose**: Adds transactions to an account, historical transactions or real time transactions.

> **Note**: Maximum 2500 transactions per request.

Request example

```
curl -v -X POST 'https://api.tink.com/connector/users/{externalUserId}/transactions' \
-H 'Authorization: Bearer {YOUR_CLIENT_ACCESS_TOKEN}' \
-H 'Content-Type: application/json' \
-d '{
  "autoBook": false,
  "overridePending": false,
  "transactionAccounts": [
    {
      "balance": 7000,
      "externalId": "AN_EXTERNAL_ACCOUNT_ID",
      "payload": {},
      "reservedAmount": 2000,
      "transactions": [
        {
          "amount": -98,
          "date": 1455740874875,
          "description": "Riche Teatergrillen",
          "externalId": "40dc04e5353547378c84f34ffc88f853",
          "payload": {},
          "pending": false,
          "type": "CREDIT_CARD"
        }
      ]
    }
  ],
  "type": "BATCH"
}'
```

**Response**: A successful ingested transaction returns `HTTP 204` with no content.

**Common errors**:

-   `HTTP 400` (The payload does not pass validation, or the specified account does not exist)
-   `HTTP 401 - User not found`
-   `HTTP 409 - Transaction already exist`

## Verify that transactions has been processed and enriched[](#verify-that-transactions-has-been-processed-and-enriched)

**Documentation**: Visit the [Credentials API](/Tiny-doc/tink_docs_api/api/#connectivity/credentials).

**Purpose**: When you have inserted a bulk of `transactions` Tink will respond with a `HTTP 204` asynchronously from the processing of transaction. The response from Tink means that the request past validation and is put on queue for ingestion. That means that the accounts/transactions will not be ready to be used via the account and transaction API instantaneously. This could take up to a few seconds. To verify that the ingested data has been enriched you need to check the credential before the ingestion. The ingested transactions are available when the credential is in the state `UPDATED` and the timestamp is later then compared to before ingestion. Note that the `YOUR_USER_ACCESS_TOKEN` shall be used as bearer token.

> **Note**: A common error is that if no transactions has been ingested, the `statusUpdated` timestamp would be null and therefore not returned in the credentials response body.

Request example

```
curl -X GET 'https://api.tink.com/api/v1/credentials' \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json'
```

**Response**:

```
[
  {
    "providerLatency": 0,
    "id": "3360e34a8d35427f8d8add08dfd33876",
    "providerName": "se-oxford-abstract",
    "status": "UPDATED",
    "statusPayload": "Analyserat 1 konto och 1 transaktion.",
    "statusUpdated": 1581065493317,
    "type": "PASSWORD",
    "updated": 1581065493317,
    "userId": "85a9632e3b3942a48844491f0054fa77",
    "images": {
      "icon": "https://cdn.tink.se/provider-images/placeholder.png",
      "banner": null
    },
    "psd2CredentialGenerated": false,
    "dataVersion": 1,
    "fields": {},
    "sensitivePayload": {}
  }
]
```

## Verify that the transactions have been added to the account[](#verify-that-the-transactions-have-been-added-to-the-account)

**Documentation**: Visit the [Search API](/Tiny-doc/tink_docs_api/api/#data-v1/search).

**Purpose**: Returns an object with a list of the ingested transactions for the specific account. This list can then be reviewed to verify that the ingested information is correct.

> **Note**: To be able to `Search`, the `YOUR_USER_ACCESS_TOKEN` for the specific user must be used.

Request example

```
curl -X POST 'https://api.tink.com/api/v1/search' \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{
 "accounts": [
    "01df3e7a43564085a164023ea4c8ece5"
  ]
}'
```

**Response**:

```
{
  "count": 1,
  "metrics": {
    "CATEGORIES": {
      "c59a38ff206c4fe29a9e7b2bb1fcb3de": 1.0
    },
    "COUNT": 1,
    "NET": -98.0,
    "AVG": 98.0,
    "SUM": 98.0
  },
  "periodAmounts": [],
  "query": {
    "accounts": [
      "01df3e7a43564085a164023ea4c8ece5"
    ],
    "categories": [],
    "externalIds": [],
    "endDate": null,
    "limit": 0,
    "offset": 0,
    "order": null,
    "queryString": null,
    "sort": null,
    "startDate": null,
    "transactionId": null,
    "includeUpcoming": false,
    "lastTransactionId": null
  },
  "results": [
    {
      "score": 0.0,
      "timestamp": 1455740874875,
      "transaction": {
        "accountId": "01df3e7a43564085a164023ea4c8ece5",
        "amount": -98.0,
        "categoryId": "c59a38ff206c4fe29a9e7b2bb1fcb3de",
        "categoryType": "EXPENSES",
        "date": 1455740874875,
        "description": "Riche Teatergrillen",
        "formattedDescription": "Riche Teatergrillen",
        "id": "f242bf9286614eb4b6df3f440dea5d33",
        "inserted": 1581065493000,
        "lastModified": 1581065493177,
        "merchantId": "",
        "notes": null,
        "originalAmount": -98.0,
        "originalDate": 1455740874875,
        "originalDescription": "Riche Teatergrillen",
        "payload": {
          "EXTERNAL_ID": "40dc04e5353547378c84f34ffc88f853"
        },
        "pending": false,
        "timestamp": 1581065493100,
        "type": "CREDIT_CARD",
        "userId": "85a9632e3b3942a48844491f0054fa77",
        "upcoming": false,
        "userModifiedAmount": false,
        "userModifiedCategory": false,
        "userModifiedDate": false,
        "userModifiedDescription": false,
        "userModifiedLocation": false,
        "currencyDenominatedAmount": {
          "unscaledValue": -980,
          "scale": 1,
          "currencyCode": "SEK"
        },
        "currencyDenominatedOriginalAmount": {
          "unscaledValue": -980,
          "scale": 1,
          "currencyCode": "SEK"
        },
        "parts": [],
        "internalPayload": {
          "PARTNER_PAYLOAD": "{}",
          "INCOMING_TIMESTAMP": "1581065492985"
        },
        "partnerPayload": null,
        "dispensableAmount": null,
        "userModified": null
      },
      "type": "TRANSACTION"
    }
  ],
  "net": -98.0
}'
```

Now that you have data in Tink, the next step is to start using Tink's services to build your application.
