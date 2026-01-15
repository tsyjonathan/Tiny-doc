---
title: "Create a Budget for a project (using Tags)"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/create-a-budget-project/"
exportedAt: "2026-01-13T12:51:18.019Z"
---
In this guide, we will show you how to create a one-off budget that tracks all transactions marked with a specific tag. This can be useful if you want to set a budget and track spending related to tags such as #kids or #holiday.

> **NOTE:** For the budget to identify the transactions with the relevant tags, your users will be required to apply tags to transactions. Please see the [update transaction](/Tiny-doc/tink_docs_api/api/#data-v1/transaction/get-one-transaction) guide to apply tags to transactions.

To create the budget, you need to call the [One-off Budget](/Tiny-doc/tink_docs_api/api/#finance-management/budget/create-one-off-budget) endpoint using a `user access token` with the `budget:write` scope. In the request, you'll need to specify: the currency, the budget amount, the tag, the budget's name and the start/end dates.

> **NOTE:** Unlike a recurring budget you need to set up a start and end-date when you believe the renovations should end. Don't worry, you can change all parameters of the budget once it’s created. When specifying the start- and end-date, this has to be expressed as an **epoch timestamp in milliseconds**.

Example request:

```
curl -X POST '[external url removed]' \
-H 'Authorization: Bearer {YOUR_USER_ACCESS_TOKEN}' \
-H 'Content-Type: application/json' \
--data-raw '{
    "amount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 100000
    },
    "filter": {
      "tags": [
        {
          "key": "renovations"
        }
      ]
    },
    "name": "Renovation budget",
    "oneOffPeriodicity": {
      "end": 1552395986000,
      "start": 1549976786000
    }
  }'
```

Example Response:

```
{
    "budgetSpecification": {
        "id": "52db767364344281a70a8dd473cc89ec",
        "name": "Renovation budget",
        "amount": {
            "unscaledValue": 105,
            "scale": 1,
            "currencyCode": "EUR"
        },
        "created": 1624284308416,
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
                    "code": "expenses:home.improvements"
                }
            ],
            "tags": [
                {
                    "key": "renovations"
                }
            ],
            "freeTextQuery": "renovations"
        }
    }
}
```

Your #renovations budget will now be created! If you add the tag to some of your transactions, you will see those transactions apply to this budget.
