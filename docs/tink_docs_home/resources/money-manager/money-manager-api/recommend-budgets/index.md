---
title: "Recommend Budgets - Tink Docs"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/recommend-budgets"
exportedAt: "2026-01-13T12:51:13.556Z"
---
In this guide, we will show you how to generate budget recommendations for users. These recommendations are based on top category spendings. For instance, if a user spends a considerable amount on groceries and does not already have a budget for that category, a grocery budget will be recommended.

To list recommended budgets, you need to call the [List recommended budgets](https://docs.tink.com/api#finance-management/budget/list-recommended-budgets) endpoint using a `user access token` with the `budgets:read` scope. The request takes no parameters.

The response will contain a list of budgets that can be proposed to the user, and later on (if desired) can be created using the [Create recurring budget](https://docs.tink.com/api#finance-management/budget/create-recurring-budget) endpoint.

Note that it's possible for the recommended budget list to be empty, in case of the user not having enough expenses (or having already created budgets for all relevant categories). The maximum number of recommended budgets is 5.

Example request:

```
curl 'https://api.tink.com/api/v1/budgets/recommended' \
-H 'Authorization: Bearer '
```

Example response:

```
{
  "recommendedBudgets": [
    {
      "budget": {
        "amount": {
          "currencyCode": "EUR",
          "scale": 0,
          "unscaledValue": 500
        },
        "filter": {
          "categories": [
            {
              "code": "expenses:food.groceries"
            }
          ]
        },
        "name": "Groceries",
        "recurringPeriodicity": {
          "periodUnit": "MONTHLY"
        }
      }
    }
  ]
}
```
