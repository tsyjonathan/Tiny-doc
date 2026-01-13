---
title: "Link transactions - Tink Docs"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/link-transactions"
exportedAt: "2026-01-13T12:50:06.987Z"
---
## Introduction[](#introduction)

Link transactions allow the user to split their expenses and match that expense to an income, in order to not include other people's spending.

We can imagine a situation where you are going to a restaurant with a friend, and you pay the bill. Your friend sends his part of the expense back to you, and you can link it to your payment. A transaction part is then made, and your spending is decreased with the linked transaction amount. You will then have a clear view of your real spending.

[Here](https://docs.tink.com/api#data-v1/transaction/link-transactions) you can find more technical information about linking transactions.

Example request:

```
curl 'https://api.tink.com/api/v1/transactions/{id}/link/{counterpartTransactionId}' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "amount": 125
  }'
```

where:

| Element | Required | Description |
| --- | --- | --- |
| `id` | yes | ID of your transaction (expense at the restaurant) |
| `counterpartTransactionId` | yes | ID of transaction including your friends part of the spending |
| `amount` | no | Transaction link amount. Required to have the same sign as transaction. When not specified the common disposable amount will be used. |

Example response (incomplete):

```
{
    "transaction": {
        "id": "0f0074bdda9b49baa960a5eb405a8b3d",
        "amount": -550.0,
        "categoryType": "EXPENSES",
        "parts": [
            {
                "id": "adbaa14742b248e49d05ebeb92936c47",
                "counterpartTransactionId": "45e7750579904dcc8c7036cbc1cbde61",
                "counterpartDescription": "Link_2",
                "amount": -125.0,
                "counterpartTransactionAmount": 125.0
            }
        ],
        "dispensableAmount": -425.0
    },
    "counterpartTransaction": {
        "id": "45e7750579904dcc8c7036cbc1cbde61",
        "amount": 125.0,
        "categoryType": "INCOME",
        "parts": [
            {
                "id": "6e14820603b1470f980df94f3fba7ddb",
                "counterpartTransactionId": "0f0074bdda9b49baa960a5eb405a8b3d",
                "counterpartDescription": "Link_1",
                "amount": 125.0,
                "counterpartTransactionAmount": -550.0
            }
        ],
        "dispensableAmount": 0
    }
}
```
