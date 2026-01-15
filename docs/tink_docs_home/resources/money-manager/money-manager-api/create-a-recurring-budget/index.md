---
title: "Create a recurring Budget - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/create-a-recurring-budget/"
exportedAt: "2026-01-13T12:51:11.612Z"
---
## Introduction[](#introduction)

Budgets is a feature allowing your users to keep track of expenses matching a predefined filter based on categories, accounts, tags and transaction description. A budget can be one-off or recurring with a daily-, weekly-, monthly- or yearly periodicity.

## Create a budget[](#create-a-budget)

In this guide, we will show you how to create a simple recurring monthly budget for the category “coffee”. To create a budget you make a request to the [Create Recurring Budget](/Tiny-doc/tink_docs_api/api/#finance-management/budget/create-recurring-budget) endpoint with a `user access token` with the `budget:write` scope.

The only fields that are required in the request body are the following:

| FIELD | DESCRIPTION |
| --- | --- |
| amount | The target amount for the budget. The currency must match the user profile currency setting |
| filter | The filter defines the budget and which transactions that should be included in it. The configured fields of the filter are applied as logical and operator (intersection) |
| name | The name of the budget |
| recurringPeriodicity | Periodicity configuration for the recurring budget |

Example request:

```
curl -X POST '[external url removed]' \
-H 'Authorization: Bearer {YOUR_USER_ACCESS_TOKEN}' \
-H 'Content-Type: application/json' \
--data-raw '{
  "amount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 50
  },
  "filter": {
    "categories": [
      {
        "code": "expenses:food.coffee"
      }
    ]
  },
  "name": "Coffee budget",
  "recurringPeriodicity": {
    "periodUnit": "WEEK"
  }
}'
```

Example response:

```
{
    "budgetSpecification": {
        "id": "0e59c108cd7946dfb98f3e7807daf460",
        "name": "Coffee budget",
        "amount": {
            "unscaledValue": 5,
            "scale": 1,
            "currencyCode": "EUR"
        },
        "created": 1624285465538,
        "periodicityType": "RECURRING",
        "recurringPeriodicity": {
            "periodUnit": "WEEK"
        },
        "oneOffPeriodicity": null,
        "archived": false,
        "filter": {
            "accounts": [],
            "categories": [
                {
                    "code": "expenses:food.coffee"
                }
            ],
            "tags": [],
            "freeTextQuery": null
        }
    }
}
```

You created a recurring budget to track your coffee spending!

For more information on periods in recurring budgets, see [Configure Periods](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/configure-periods/).
