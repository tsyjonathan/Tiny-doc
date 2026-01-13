---
title: "Create a list of categorised transactions"
source: "https://docs.tink.com/resources/money-manager-api/list-categorised-transactions"
exportedAt: "2026-01-13T12:56:08.264Z"
---
We will show you how to fetch a user's latest transactions. It will be sorted by date, including a cleaned transaction description, amount, currency and category. This can be used to help your end users get a quick overview of all their accounts from different providers and see transactions in one single place.

## 1\. List transactions[](#list-transactions)

To fetch a user's transactions, you need to use the [Search endpoint](https://docs.tink.com/api#data-v1/search). As part of the API call, you also need to include a `user access token` with the `transactions:read` scope. A detailed description of the API and its capabilities can be found [here](https://docs.tink.com/api#data-v1/search).

In this example, we will use dates as the main query parameter to list all possible transactions during the last three months. In the response, you will get an ordered list of transactions with details.

Example request:

```
curl 'https://api.tink.com/api/v1/search' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "endDate": "{CURRENT_DATE}",
    "includeUpcoming": false,
    "order": "ASC",
    "sort": "DATE",
    "startDate": "{CURRENT_DATE-3_months}"
  }'
```

Example response:

```
{
  "count": 110,
  "metrics": {
    "AVG": 15.0,
    "COUNT": 110,
    "NET": 1288.45,
    "SUM": 1650.0
  },
  "net": 1288.45,
  "periodAmounts": [
    {
      "key": "string",
      "value": 0
    }
  ],
  "query": {
  "endDate": {CURRENT DATE),
  "includeUpcoming": false,
  "order": "ASC",
  "sort": "DATE",
  "startDate": {CURRENT DATE-3 months)
},
  "results": [
    {
      "transaction": {
        "accountId": "3fe2d96efacd4dc5994404a950f238a9",
        "amount": 34.5,
        "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
        "categoryType": "EXPENSES",
        "currencyDenominatedAmount": {
          "currencyCode": "EUR",
          "scale": 2,
          "unscaledValue": 1050
        },
        "currencyDenominatedOriginalAmount": {
          "currencyCode": "EUR",
          "scale": 2,
          "unscaledValue": 1050
        },
        "date": 1455740874875,
        "description": "H&M",
        "dispensableAmount": 0,
        "id": "79c6c9c27d6e42489e888e08d27205a1",
        "identifiers": {
          "providerExternalId": "string"
        },
        "lastModified": 1455740874875,
        "notes": "Delicious #cake #wedding",
        "originalAmount": 34.5,
        "originalDate": 1455740874875,
        "originalDescription": "Stadium Sergelg Stockholm",
        "partnerPayload": {},
        "parts": [
          {
            "amount": 34.5,
            "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
            "counterpartDescription": "Stadium Sergelg Stockholm",
            "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
            "counterpartTransactionAmount": 10.0,
            "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
            "date": 1455740874875,
            "id": "7303ff128531463bbed358bbf9e23f31",
            "lastModified": 1455740874875
          }
        ],
        "payload": {},
        "pending": false,
        "timestamp": 1464543093494,
        "type": "CREDIT_CARD",
        "upcoming": false,
        "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
        "userModified": false
      },
      "type": "TRANSACTION"
    }
  ]
}
```

As part of the API response, you'll be returned multiple fields of data. However for this walkthrough, we’re only interested in the following:

| Field | Description |
| --- | --- |
| `amount` | The category of the transaction |
| `categoryType` | The category type of the transaction. Values: INCOME, EXPENSES, TRANSFERS |
| `date` | The date the transaction was executed |
| `description` | The cleaned description of the transaction |
| `currencyCode` | The ISO 4217 currency code of the transaction |

Filter on the fields above and you have a simple list of the users' latest transactions. The only thing that’s missing now is to replace the category IDs with human readable category names.

## 2\. Fetch category names[](#fetch-category-names)

You then need to fetch a list of available categories to match up against the category IDs you received from the search endpoint. This is achieved by using the [list categories](https://docs.tink.com/api#general/category/list-categories) endpoint when unauthenticated.

Example request:

```
curl 'https://api.tink.com/api/v1/categories?locale=en_US'
```

Example response:

```
[
  {
    "code": "expenses:food.restaurants",
    "defaultChild": false,
    "id": "7e88d58188ee49749adca59e152324b6",
    "parent": "067fa4c769774ae980435c76be328c0b",
    "primaryName": "Food & Drinks",
    "searchTerms": "food,lunch,snacks",
    "secondaryName": "Restaurants",
    "sortOrder": 45,
    "type": "EXPENSES",
    "typeName": "Expenses"
  }
]
```

From this response, you'll need the following parameters:

| Parameter | Description |
| --- | --- |
| `id` | The internal identifier of the category, referenced by e.g. a transaction |
| `primaryName` | The primary name of this category |
| `secondaryName` | The secondary name of this category |

You are now able to match the ID from the [List categories](https://docs.tink.com/api#general/category/list-categories) response and `categoryId` from the [Search](https://docs.tink.com/api#data-v1/search) response to derive the category name.

> **Note**: Primary name is the top level category name (e.g. Food & Drinks), while the secondary name is the subcategory level name (e.g. Restaurant). You can choose to present either to the end-user or use your own wording.

With this, you will be able to present a list of transactions ordered by date, with a clean readable description and category to the end-user.
