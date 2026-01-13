---
title: "Visualise overall incomes and expenses"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/visualise-overall-incomes-and-expenses"
exportedAt: "2026-01-13T12:50:30.978Z"
---
## Introduction[](#introduction)

The income and expense statistic report offers an overall analysis of your income and spending flow over a selected timeframe.

Why This is Important This report is crucial for understanding your overall financial balance. It helps you:

-   Track Financial Performance: Monitor the total sum of your transactions to gauge your financial health.
-   Balance Income and Expenses: Ensure that your income covers your expenses and identify areas for cost optimization.
-   Inform Budgeting Decisions: Use the data to make informed budgeting decisions and better allocate your resources.
-   Identify Trends: Recognize patterns in your financial activities to plan more effectively for the future.

## Calling the Statistics Endpoint[](#calling-the-statistics-endpoint)

In this example, we want to have the following conditions in our query:

As part of the request, you will need to include a `user access token` with the `statistics:read` scope.

1.  Select the previous month so you can see spending across brands in that period
2.  Set the resolution to monthly
3.  Set the type to `income-and-expenses`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["income-and-expenses"]
  }'
```

Example response:

```
[
  {
    "description": "EXPENSES",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "income-and-expenses",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -12850.0
  },
  {
    "description": "INCOME",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "income-and-expenses",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 3332.0
  }
]
```

In the response, the description field will contain an identifier either EXPENSE or INCOME. The value field will represent the total amount for this identifier for the selected month.
