---
title: "Visualise incomes - Tink Docs"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/visualise-incomes"
exportedAt: "2026-01-13T12:50:29.005Z"
---
## Introduction[](#introduction)

The Income statistic report offers an in-depth analysis of your incomes based on various selected predicates over a selected timeframe.

Why These Reports are Important These income reports are essential for effective financial management. They help you:

-   Track Income Sources: Understand where your income is coming from by breaking it down by categories and tags.
-   Monitor Financial Health: Analyze the sum of incomes and transaction counts to get a clear picture of your financial status.
-   Budget More Effectively: Use the data to make informed budgeting decisions and allocate funds more efficiently.
-   Identify Income Patterns: Recognize trends in your income streams, which can inform future financial planning and investments.
-   Optimize Financial Strategies: Leverage detailed income data to optimize your financial strategies and improve overall financial performance.
-   These insights empower you to manage your income more effectively, leading to better financial planning and stability.

Expense available statistics:

1.  **income-by-category**: Provides the sum of incomes per period in each category.
2.  **income-by-category/by-count**: Displays the count of all incomes per period in each category.
3.  **income-by-tag**: Combines the sum of all incomes grouped by tags placed in the transaction notes field.
4.  **income-by-tag/by-count**: Shows the count of all incomes grouped by tags placed in the transaction notes field.

## 1\. Calling the Statistics Endpoint[](#calling-the-statistics-endpoint)

In this example, we want to have the following conditions in our query:

As part of the request, you will need to include a `user access token` with the `statistics:read` scope.

### income-by-category[](#income-by-category)

1.  Select the previous month so you can see spending across brands in that period
2.  Set the resolution to monthly
3.  Set the type to `income-by-category`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["income-by-category"]
  }'
```

Example response:

```
[
  {
    "description": "fe9e199c2ca94c12baf1f3eb4a4122de",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "income-by-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 5000.0
  },
  {
    "description": "34a6b7c21ee94c12baf1f3eb4a89ac32",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "income-by-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 756.0
  }
]
```

In the response, the description field will contain an identifier of the category. The value field will represent the total income for this category for the selected month.

### income-by-category/by-count[](#income-by-category-by-count)

1.  Select the previous month so you can see spending across brands in that period
2.  Set the resolution to monthly
3.  Set the type to `income-by-category/by-count`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["income-by-category/by-count"]
  }'
```

Example response:

```
[
  {
    "description": "fe9e199c2ca94c12baf1f3eb4a4122de",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "income-by-category/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 1.0
  },
  {
    "description": "34a6b7c21ee94c12baf1f3eb4a89ac32",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "income-by-category/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 4.0
  }
]
```

In the response, the description field will contain an identifier of the category. The value field will represent the total amount of incomes for this category for the selected month.

### income-by-tag[](#income-by-tag)

1.  Select the previous month so you can see spending across transaction tags in that period
2.  Set the resolution to monthly
3.  Set the type to `income-by-tag`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["income-by-tag"]
  }'
```

Example response:

```
[
  {
    "description": "Salary",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "income-by-tag",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 5000.0
  },
  {
    "description": "Award",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "income-by-tag",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 2000.0
  }
]
```

In the response, the description field will contain a tag of the transactions. The value field will represent the total amount of incomes for this tag for the selected month.

### income-by-tag/by-count[](#income-by-tag-by-count)

1.  Select the previous month so you can see spending across transaction tags in that period
2.  Set the resolution to monthly
3.  Set the type to `income-by-tag/by-count`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["income-by-tag/by-count"]
  }'
```

Example response:

```
[
  {
    "description": "Salary",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "income-by-tag/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 1.0
  },
  {
    "description": "Award",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "income-by-tag/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 2.0
  }
]
```

In the response, the description field will contain a tag of the transactions. The value field will represent the number of incomes for this tag for the selected month.
