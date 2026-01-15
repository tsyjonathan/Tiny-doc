---
title: "Visualise carbon footprint - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/visualise-carbon-footprint/"
exportedAt: "2026-01-13T12:50:18.051Z"
---
## Introduction[](#introduction)

The Carbon statistic report offers an in-depth analysis of your carbon footprint based on transaction categories over a selected timeframe. This report is crucial for customers aiming to monitor and evaluate the environmental impact of their transactions over time.

Key Benefits:

-   Category-Specific Insights: Understand the carbon footprint associated with each transaction category.
-   Time-Frame Flexibility: Analyze your carbon emissions over daily, weekly, or monthly periods.
-   Trend Analysis: Identify patterns and trends in your carbon footprint to make more sustainable choices.
-   Visualization Tools: Utilize charts and graphs for a clearer understanding of your carbon impact.
-   Informed Decision-Making: Use the data to make eco-friendly financial and consumption decisions.

This report empowers you to take control of your environmental impact by providing a comprehensive view of your carbon footprint across different transaction categories over time.

You can choose between 3 types of the carbon statistic types:

1.  carbon-by-category
2.  carbon-by-primary-category
3.  carbon-by-tag

## 1\. Calling the Statistics Endpoint[](#calling-the-statistics-endpoint)

In this example, we want to have the following conditions in our query:

### carbon-by-category[](#carbon-by-category)

1.  Select the previous month so you can see spending across as many categories in that period
2.  Set the resolution to monthly
3.  Set the type to `carbon-by-category`

As part of the request, you will need to include a `user access token` with the `statistics:read` scope.

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["carbon-by-category"]
  }'
```

Example response:

```
[
  {
    "description": "2fe0ebbf095d4df5ad91220674bd0ca5",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "carbon-by-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 96.0
  },
  {
    "description": "79e5d8c089694410b64092f0c841d241",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "carbon-by-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 93.0
  }
]
```

In the response, the description field will contain an identifier of the category. The value field will represent the total carbon footprint amount in grams of CO2 emissions for the selected month.

### carbon-by-primary-category[](#carbon-by-primary-category)

1.  Select the previous month so you can see spending across as many categories in that period
2.  Set the resolution to monthly
3.  Set the type to `carbon-by-primary-category`

As part of the request, you will need to include a `user access token` with the `statistics:read` scope.

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["carbon-by-primary-category"]
  }'
```

Example response:

```
[
  {
    "description": "2fe0ebbf095d4df5ad91220674bd0ca5",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "carbon-by-primary-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 189.0
  },
  {
    "description": "2caf0b65969d4bcca40114832d942e7a",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "carbon-by-primary-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 2030.0
  }
]
```

In the response, the description field will contain an identifier of the child category. The value field will represent the total carbon footprint amount in grams of CO2 emissions for the selected month.

### carbon-by-tag[](#carbon-by-tag)

1.  Select the previous month so you can see spending across as many categories in that period
2.  Set the resolution to monthly
3.  Set the type to `carbon-by-tag`

As part of the request, you will need to include a `user access token` with the `statistics:read` scope.

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["carbon-by-tag"]
  }'
```

Example response:

```
[
  {
    "description": "Bread",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "carbon-by-tag",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 12.0
  },
  {
    "description": "Chocolate",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "carbon-by-tag",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 20.5
  }
]
```

In the response, the description field will contain a tag of the transactions. The value field will represent the total carbon footprint amount in grams of CO2 emissions for the selected month for those tagged transactions.

## 2\. Fetch Category Names[](#fetch-category-names)

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
