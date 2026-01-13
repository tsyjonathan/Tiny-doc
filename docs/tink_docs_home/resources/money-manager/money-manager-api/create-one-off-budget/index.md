---
title: "Create a one-off Budget - Tink Docs"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/create-one-off-budget"
exportedAt: "2026-01-13T12:51:09.387Z"
---
To create a one-off budget you make a call to the [One-off Budget](https://docs.tink.com/api#finance-management/budget/create-one-off-budget) endpoint by using a user access token with the `budget:write` scope.

In the request, you must specify the category you want to track, the currency, the budget amount, the budget name, the `id` of the account you want to track the budget, start/end dates, and you can add free text filtering.

> **NOTE:** You need to specify start and end dates for a one-off budget. Don't worry, you can change all parameters of the budget after it’s created, so set a projected date if you're unsure. The start and end date must be expressed in the **UTC epoch timestamp in milliseconds**.

Example request:

```
curl -L -X POST 'https://api.tink.com/api/v1/budgets/one-off' \
-H 'Authorization: Bearer {YOUR_USER_ACCESS_TOKEN}' \
-H 'Content-Type: application/json' \
--data-raw '{
    "amount": {
      "currencyCode": "EUR",
     "scale": 2,
      "unscaledValue": 15000
    },
    "filter": {
      "accounts": [
        {
          "id": "b157d1a3235a4e569c625eebcf6ef81d"
        }
      ],
      "categories": [
        {
          "code": "expenses:food.groceries"
        }
      ]
    },
    "name": "Groceries budget",
    "oneOffPeriodicity": {
      "end": 1552395986000,
      "start": 1549976786000
    }
  }'
```

Example response:

```
{
    "budgetSpecification": {
        "id": "98cb55e5106f4707a5cb516be034d5d2",
        "name": "Groceries budget",
        "amount": {
            "unscaledValue": 1500,
            "scale": 1,
            "currencyCode": "EUR"
        },
        "created": 1624286513629,
        "periodicityType": "ONE_OFF",
        "recurringPeriodicity": null,
        "oneOffPeriodicity": {
            "start": 1549929600000,
            "end": 1552435199999
        },
        "archived": false,
        "filter": {
            "accounts": [
                {
                    "id": "b157d1a3235a4e569c625eebcf6ef81d"
                }
            ],
            "categories": [
                {
                    "code": "expenses:food.groceries"
                }
            ],
            "tags": [],
            "freeTextQuery": null
        }
    }
}
```

Congrats, you've now created a one-off budget to track groceries spending!
