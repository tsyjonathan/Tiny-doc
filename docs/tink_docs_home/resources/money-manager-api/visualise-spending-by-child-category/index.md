---
title: "Visualise spending by category - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-api/visualise-spending-by-child-category/"
exportedAt: "2026-01-13T12:56:11.261Z"
---
## Introduction[](#introduction)

A picture is worth a thousand words, and the same goes for visualising your spending habits. In the same moment that transactions and accounts are pushed into the Tink platform, all transactions get categorised. Pre-calculated spending and income statistics are also available for you to fetch and visualise for your application.

In this guide, we will show you how to visualise your monthly spending across multiple categories.

## 1\. Calling the Statistics Endpoint[](#calling-the-statistics-endpoint)

In this guide, we’re going to focus on spending per child category. If you want to read about other pre-calculated statistics, please visit our [API documentation](/Tiny-doc/tink_docs_api/api/#finance-management/statistics).

You can choose between 4 selected statistic types:

1.  expenses-by-category
2.  expenses-by-category/by-count
3.  expenses-by-primary-category
4.  expenses-by-primary-category/by-count

As part of the request, you will need to include a `user access token` with the `statistics:read` scope.

### expenses-by-category[](#expenses-by-category)

In this example, we want to have the following conditions in our query:

1.  Select the previous month so you can see spending across as many categories in that period
2.  Set the resolution to monthly
3.  Set the type to `expenses-by-category`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["expenses-by-category"]
  }'
```

Example response:

```
[
  {
    "description": "fe9e199c2ca94c12baf1f3eb4a4122de",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 1298.5
  },
  {
    "description": "34a6b7c21ee94c12baf1f3eb4a89ac32",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 723.2
  }
]
```

In the response, you will receive a category ID for the child categories in the `description` field. The total amount spent in that category during the selected month is represented by the `value` field.

### expense-by-category/by-count[](#expense-by-category-by-count)

In this example, we want to have the following conditions in our query:

1.  Select the previous month so you can see spending across as many categories in that period
2.  Set the resolution to monthly
3.  Set the type to `expense-by-category/by-count`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["expenses-by-category/by-count"]
  }'
```

Example response:

```
[
  {
    "description": "fe9e199c2ca94c12baf1f3eb4a4122de",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-category/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 3.0
  },
  {
    "description": "34a6b7c21ee94c12baf1f3eb4a89ac32",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-category/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 1.0
  }
]
```

In the response, you will receive a category ID for the child categories in the `description` field. The amount of expenses in that category during the selected month is represented by the `value` field.

### expense-by-primary-category[](#expense-by-primary-category)

In this example, we want to have the following conditions in our query:

1.  Select the previous month so you can see spending across as many categories in that period
2.  Set the resolution to monthly
3.  Set the type to `expenses-by-primary-category`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["expenses-by-primary-category"]
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
    "type": "expenses-by-primary-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 3321.0
  },
  {
    "description": "34a6b7c21ee94c12baf1f3eb4a89ac32",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-primary-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 1223.0
  }
]
```

In the response, you will receive a category ID for the primary categories in the `description` field. The total amount spent in that category during the selected month is represented by the `value` field.

### expense-by-primary-category/by-count[](#expense-by-primary-category-by-count)

In this example, we want to have the following conditions in our query:

1.  Select the previous month so you can see spending across as many categories in that period
2.  Set the resolution to monthly
3.  Set the type to `expenses-by-primary-category/by-count`

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["expenses-by-primary-category/by-count"]
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
    "type": "expenses-by-primary-category/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 14.0
  },
  {
    "description": "34a6b7c21ee94c12baf1f3eb4a89ac32",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-primary-category/by-count",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 7.0
  }
]
```

In the response, you will receive a category ID for the primary categories in the `description` field. The amount of expenses in that category during the selected month is represented by the `value` field.

## 2.Fetch Category Names[](#fetch-category-names)

You then may need to fetch a list of available categories to match up against the category IDs you received from the statistics endpoint. This is achieved by using the [list categories](/Tiny-doc/tink_docs_api/api/#general/category/list-categories) endpoint while unauthenticated.

Example request:

```
curl 'https://api.tink.com/api/v1/categories?locale=en_US'
```

Example response:

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

You then need to match the `description` field from the [Statistics](/Tiny-doc/tink_docs_api/api/#finance-management/statistics) endpoint response to the ID from the [List categories](/Tiny-doc/tink_docs_api/api/#general/category/list-categories) endpoint response, so you can return a category back to the user.

You will then have all you need to visualise spending per parent category for a given month. If you want to learn how to visualise down to child category level, please follow the next guide.
