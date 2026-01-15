---
title: "Recategorise transactions - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-api/recategorise-transactions/"
exportedAt: "2026-01-13T13:00:45.264Z"
---
## 1\. Fetch Category IDs[](#fetch-category-ids)

We first need to fetch a list of categories and their associated IDs. This can be performed by using the [list categories](/Tiny-doc/tink_docs_api/api/#general/category/list-categories) endpoint while unauthenticated.

Request example:

```
curl 'https://api.tink.com/api/v1/categories?locale=en_US'
```

Response example:

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

From the response, you can choose the category you want your transactions to belong to. Just keep note of its associated category ID for the next step.

## 2\. Recategorise transaction[](#recategorise-transaction)

When you know what transactions you want to recategorise, and the category you want to change it to, you need to use the [Categorize multiple transactions](/Tiny-doc/tink_docs_api/api/#data-v1/transaction/change-category-of-transactions) endpoint using a `user access token` with the `transactions:write` scope.

In the request, you need to include the `categoryId` of the category you want the transactions to belong to instead, and an array of all the transaction IDs you want the new category to apply to.

Request example:

```
curl 'https://api.tink.com/api/v1/transactions/categorize-multiple' \
  -X PUT \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "categorizationList": [
        {
            "categoryId": "{categoryId}",
            "transactionIds": [
                "{transactionId1}",
                "{transactionid2}",
                "{transactionid3}"
            ]
        },
    ]
  }'
```

Well done! You will then have successfully recategorised your transactions.
