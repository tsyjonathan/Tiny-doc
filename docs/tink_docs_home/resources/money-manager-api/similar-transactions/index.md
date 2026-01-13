---
title: "Find similar transactions - Tink Docs"
source: "https://docs.tink.com/resources/money-manager-api/similar-transactions"
exportedAt: "2026-01-13T13:00:47.366Z"
---
There may be occasions where you want to retrieve a list of similar transactions. For instance in a PFM app setting, you may want to see all of the similar groceries transactions to allow a user to quickly see the different transactions along with statistics. Or when you're looking to recategorise transactions and you want to recategorise all the similar transactions.

To get started, you need to use the [Get similar transaction](https://docs.tink.com/api#data-v1/transaction/get-similar-transactions) endpoint. To use this endpoint, you need to also provide a `user access token` with the `transactions:read` scope. In the request, you need to also include the transaction ID of the transaction you want to find similar transactions for.

As part of the request, the parameters give you the option to return similar transactions which belong to a category (rather than ones with a similar description) if you provide the `categoryId`. You can also choose to include the same transaction in the response. For the purpose of this guide, we will not fetch similar transactions based on the category, we will instead include the same transactions in response.

Example request:

```
curl 'https://api.tink.com/api/v1/transactions/{transactionId}/similar?includeSelf=true'
```

Example response:

```
{
  "statistics": [
    {
      "description": "fe9e199c2ca94c12baf1f3eb4a4122de",
      "payload": "690667930d7e4f2ba0d9aa5f7d2a1941",
      "period": "2014-12-15",
      "resolution": "DAILY",
      "type": "expenses-by-category",
      "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "value": 1298.5
    }
  ],
  "transactions": [
    {
      "accountId": "3fe2d96efacd4dc5994404a950f238a9",
      "amount": 34.5,
      "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
      "categoryType": "EXPENSES",
      "credentialsId": "65bc7a41a66e4ad1aad199bbfb3c5098",
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
      "description": "Stadium Sergelg Stockholm",
      "dispensableAmount": 0,
      "formattedDescription": "Stadium Sergelgatan Stockholm",
      "id": "79c6c9c27d6e42489e888e08d27205a1",
      "inserted": 1455740874875,
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
    }
  ]
}
```

In the response, an object with a list of similar transactions, along with a list of statistics summarising those transactions will be returned to you. For more info on the fields in the response, please refer to the [API documentation](https://docs.tink.com/api#data-v1/transaction/get-similar-transactions/response-similartransactionsresponse).

**NOTE**: When you have a list of similar transactions and their associated IDs, you may want to recategorise some of them at the same time. If so, please follow this [guide](https://docs.tink.com/resources/money-manager/money-manager-api/recategorise-transactions) for guidance.
