---
title: "Archive a Budget - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/archive-budget/"
exportedAt: "2026-01-13T12:51:19.972Z"
---
## Archiving, not deleting[](#archiving-not-deleting)

To archive a budget, you need to use the [Archive budgets](/Tiny-doc/tink_docs_api/api/#finance-management/budget/archive-budget) endpoint. As part of the API call, you need to specify the `id` of the budget you want to archive and provide a `user access token` with the `budget:write` scope.

Example request:

```
curl -X PUT 'https://api.tink.com/api/v1/budgets//archive' \
-H 'Authorization: Bearer '
```

Example response:

```
{
  "budgetSpecification": {
    "amount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 50
    },
    "archived": true,
    "created": 1552395986000,
    "filter": {
      "categories": [
        {
          "code": "expenses:food.coffee"
        }
      ]
    },
    "id": "e2b746ed27c542ce846a8d693474df21",
    "name": "Coffee budget",
    "periodicityType": "RECURRING",
    "recurringPeriodicity": {
      "periodUnit": "MONTH"
    }
  }
}
```

Your budget will now be archived!

> **NOTE:** If you ever need to fetch your archived budget, you can by using the [List Budgets](/Tiny-doc/tink_docs_api/api/#finance-management/budget/list-budgets) endpoint and include the `includeArchived` as a query parameter.
