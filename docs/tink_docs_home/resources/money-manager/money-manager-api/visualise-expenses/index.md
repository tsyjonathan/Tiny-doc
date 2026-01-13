---
title: "Visualise expenses - Tink Docs"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/visualise-expenses"
exportedAt: "2026-01-13T12:50:25.971Z"
---
## Introduction[](#introduction)

The Expense statistic report offers an in-depth analysis of your expenses based on various selected predicates over a selected timeframe.

Why These Reports are Important: Having detailed expense reports is crucial for effective financial management. These reports help you:

-   Identify Spending Patterns: Understand where your money is going by breaking down expenses by brands, tags, and subscriptions.
-   Control Costs: Analyze your spending habits to find areas where you can cut costs or optimize your budget.
-   Make Informed Decisions: Use the data to make better financial decisions, whether it's negotiating with brands, adjusting your cost structure, or managing subscriptions.
-   Track Transaction Counts: Knowing the number of transactions per brand or tag helps in identifying frequent purchases that may need closer monitoring.
-   Monitor Subscriptions: Summarize and calculate average expenses for subscriptions to manage recurring costs effectively.
-   These insights empower you to take control of your finances, leading to better budgeting and financial planning.

Expense available statistics:

1.  **expenses-by-brand**: Breaks down your expenses by brand.
2.  **expenses-by-brand/by-count**: Shows the number of transactions per brand.
3.  **expenses-by-brand/by-category**: Breaks down your of transactions per brand per category.
4.  **expenses-by-cost-structure**: Analyzes expenses by cost structure.
5.  **expenses-by-tag**: Categorizes your expenses by tags.
6.  **expenses-by-tag/by-count**: Displays the count of expenses per tag.
7.  **expenses-by-subscription**: Summarizes expenses by subscription.
8.  **expenses-by-subscription/average**: Calculates the average expense per subscription.

## 1\. Calling the Statistics Endpoint[](#calling-the-statistics-endpoint)

In this example, we want to have the following conditions in our query:

As part of the request, you will need to include a `user access token` with the `statistics:read` scope.

### expenses-by-brand[](#expenses-by-brand)

1.  Select the previous month so you can see spending across brands in that period
2.  Set the resolution to monthly
3.  Set the type to `expenses-by-brand`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["expenses-by-brand"]
  }'
```

Example response:

```
[
  {
    "description": "562e3ffb-2cdf-488c-b808-75540594b027",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-brand",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -96.0
  },
  {
    "description": "562e3ffb-2cdf-488c-b808-75540594b027",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-brand",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -93.0
  }
]
```

In the response, the description field will contain an identifier of the brand. The value field will represent the total expense for this brand for the selected month. If some of the transactions will not branded it will not be populated into statistic report.

### expenses-by-brand/by-count[](#expenses-by-brand-by-count)

1.  Select the previous month so you can see spending across brands in that period
2.  Set the resolution to monthly
3.  Set the type to `expenses-by-brand/by-count`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["expenses-by-brand/by-count"]
  }'
```

Example response:

```
[
  {
    "description": "562e3ffb-2cdf-488c-b808-75540594b027",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-brand/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 4.0
  },
  {
    "description": "562e3ffb-2cdf-488c-b808-75540594b027",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-brand/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 2.0
  }
]
```

In the response, the description field will contain an identifier of the brand. The value field will represent the amount of expenses for this brand for the selected month. If some of the transactions will not branded it will not be populated into statistic report.

### expenses-by-brand/by-category[](#expenses-by-brand-by-category)

1.  Select the previous month so you can see spending across brands in that period
2.  Set the resolution to monthly
3.  Set the type to `expenses-by-brand/by-category`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["expenses-by-brand/by-category"]
  }'
```

Example response:

```
[
  {
    "description": "0ea2d8469e4e45ea853e2c7048db7ae1",
    "payload": "562e3ffb-2cdf-488c-b808-75540594b027",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-brand/by-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -96.0
  },
  {
    "description": "0ea2d8469e4e45ea853e2c7048db7ae1",
    "payload": "562e3ffb-2cdf-488c-b808-75540594b027",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-brand/by-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -93.0
  }
]
```

In the response, the description field will contain an identifier of the category. The payload field will contain an identifier of the brand. The value field will represent the total expense for this brand for the selected month under this category. If some of the transactions will not branded it will not be populated into statistic report.

### expenses-by-brand-by-category/by-count[](#expenses-by-brand-by-category-by-count)

1.  Select the previous month so you can see spending across brands in that period
2.  Set the resolution to monthly
3.  Set the type to `expenses-by-brand-by-category/by-count`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["expenses-by-brand-by-category/by-count"]
  }'
```

Example response:

```
[
  {
    "description": "0ece5dc18f8342d292403a00701c49e6",
    "payload": "562e3ffb-2cdf-488c-b808-75540594b027",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-brand-by-category/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 4.0
  },
  {
    "description": "562e3ffb2cdf488cb80875540594b027",
    "payload": "562e3ffb-2cdf-488c-b808-75540594b027",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-brand-by-caetgory/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 2.0
  }
]
```

In the response, the description field will contain an identifier of the category. The payload field will contain an identifier of the brand. The value field will represent the count of expenses per brand per category. If some of the transactions will not branded it will not be populated into statistic report.

### expenses-by-cost-structure[](#expenses-by-cost-structure)

1.  Select the previous month so you can see spending across all variables in that period
2.  Set the resolution to monthly
3.  Set the type to `expenses-by-cost-structure`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["expenses-by-cost-structure"]
  }'
```

Example response:

```
[
  {
    "description": "VARIABLE",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-cost-structure",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -231.20
  },
  {
    "description": "RECURRING",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-cost-structure",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -123.12
  },
  {
    "description": "SAVINGS",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-cost-structure",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -500.0
  }
]
```

In the response, the description field will contain one of three variables: RECURRING for recurring transactions, SAVINGS for allocated funds in savings goals, and VARIABLE for other types of expenses. The value field will represent the amount of expenses for these variables for the selected month.

### expenses-by-tag[](#expenses-by-tag)

1.  Select the previous month so you can see spending across tagged transacations in that period
2.  Set the resolution to monthly
3.  Set the type to `expenses-by-tag`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["expenses-by-tag"]
  }'
```

Example response:

```
[
  {
    "description": "Bread",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-tag",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -123.1
  },
  {
    "description": "Chocolate",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-tag",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -123.5
  }
]
```

In the response, the description field will contain a tag of the transactions. The value field will represent the sum of amount of expenses for this tag for the selected month.

### expenses-by-tag/by-count[](#expenses-by-tag-by-count)

1.  Select the previous month so you can see spending across tagged transacations in that period
2.  Set the resolution to monthly
3.  Set the type to `expenses-by-tag`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["expenses-by-tag/by-count"]
  }'
```

Example response:

```
[
  {
    "description": "Bread",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-tag/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 12.0
  },
  {
    "description": "Chocolate",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-tag/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 2.0
  }
]
```

In the response, the description field will contain a tag of the transactions. The value field will represent the amount of expenses for this tag for the selected month.

### expenses-by-subscription[](#expenses-by-subscription)

1.  Select the previous month so you can see spending across tagged transacations in that period
2.  Set the resolution to monthly
3.  Set the type to `expenses-by-subscription`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["expenses-by-subscription"]
  }'
```

Example response:

```
[
  {
    "description": "cb85b5cf-f149-49e7-9589-41f2783796c4",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-subscription",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -1000.0
  },
  {
    "description": "ab85b5cf-f149-49e7-9589-41f2783796r5",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-subscription",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -300.0
  }
]
```

In the response, the description field will contain an id of the subscription. The value field will represent the amount of expenses for this subscription for the selected month.

### expenses-by-subscription/average[](#expenses-by-subscription-average)

1.  Select the previous month so you can see spending across tagged transacations in that period
2.  Set the resolution to monthly
3.  Set the type to `expenses-by-subscription/average`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["expenses-by-subscription/average"]
  }'
```

Example response:

```
[
  {
    "description": "cb85b5cf-f149-49e7-9589-41f2783796c4",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-subscription/average",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -1000.0
  },
  {
    "description": "ab85b5cf-f149-49e7-9589-41f2783796r5",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-subscription/average",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -300.0
  }
]
```

In the response, the description field will contain an id of the subscription. The value field will represent the average amount of expenses for this subscription for the selected month.

## 2\. Fetch Brands for the branded statistics[](#fetch-brands-for-the-branded-statistics)

You then may need to fetch a additional information about brand to match up against the brand IDs you received from the statistics endpoint. This is achieved by using the [Get Brand By ID](https://docs.tink.com/api-enrichment#enrichment/merchant-information/brand) endpoint while unauthenticated.

## 3\. Fetch Subscriptions for the subscription statistics[](#fetch-subscriptions-for-the-subscription-statistics)

You then may need to fetch a additional information about subscriptions to match up against the subscription IDs you received from the statistics endpoint. This is achieved by using the [Subscriptions](https://docs.tink.com/api-finance-management#finance-management/subscriptions) endpoint while unauthenticated.

## 4\. Fetch Recurring transactions[](#fetch-recurring-transactions)

You want to fetch a additional information about recurring transactions to match up against the `expenses-by-cost-structure` statistics endpoint. This is achieved by using the [Recurring Transactions](https://docs.tink.com/api-enrichment#enrichment/recurring-transactions) endpoint while unauthenticated.

## 5\. Fetch Savings Goals[](#fetch-savings-goals)

You then may need to fetch a additional information about savings goals to match up against the `expenses-by-cost-structure` statistics endpoint. This is achieved by using the [Savings Goals](https://docs.tink.com/api-finance-management#finance-management/savings-goals) endpoint while unauthenticated.
