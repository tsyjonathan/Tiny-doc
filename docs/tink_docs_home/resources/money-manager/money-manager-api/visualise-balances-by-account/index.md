---
title: "Visualise balances by account - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/visualise-balances-by-account/"
exportedAt: "2026-01-13T12:50:15.065Z"
---
## Introduction[](#introduction)

The "Balances by Account" report provides a detailed overview of account balances over a specified period. The "Balances by Account Group Type" report provides a detailed overview of account balances over a specified period by the group type.

This report is essential for customers who want to track and analyze the financial performance of their accounts individually over time.

You can choose between 2 types of the carbon statistic types:

1.  balances-by-account
2.  balances-by-account-type-group

## Calling the Statistics Endpoint[](#calling-the-statistics-endpoint)

In this guide, we’re going to focus on balances by account. If you want to read about other pre-calculated statistics, please visit our [API documentation](/Tiny-doc/tink_docs_api/api/#finance-management/statistics).

As part of the request, you will need to include a `user access token` with the `statistics:read` scope.

### balances-by-account[](#balances-by-account)

In this example, we want to have the following conditions in our query:

1.  Select the previous month so you can see spending across as many categories in that period
2.  Set the resolution to monthly
3.  Set the type to `balances-by-account`

Example request:

```
curl '[external url removed]' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["balances-by-account"]
  }'
```

Example response:

```
[
  {
    "description": "fe9e199c2ca94c12baf1f3eb4a4122de",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "balances-by-account",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 1298.5
  },
  {
    "description": "34a6b7c21ee94c12baf1f3eb4a89ac32",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "balances-by-account",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 723.2
  }
]
```

In the response, you will receive a account ID for the account in the `description` field. The total amount in that accounts during the selected month is represented by the `value` field.

### balances-by-account-type-group[](#balances-by-account-type-group)

In this example, we want to have the following conditions in our query:

1.  Select the previous month so you can see spending across as many categories in that period
2.  Set the resolution to monthly
3.  Set the type to `balances-by-account-type-group`

As part of the request, you will need to include a `user access token` with the `statistics:read` scope.

Example request:

```
curl '[external url removed]' \
  -X POST \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04"],
    "resolution": "MONTHLY",
    "types": ["balances-by-account-type-group"]
  }'
```

Example response:

```
[
  {
    "description": "savings",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "balances-by-account-type-group",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 1298.5
  },
  {
    "description": "cards-and-accounts",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "balances-by-account-type-group",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 723.2
  }
]
```

In the response, you will receive a account group type for the account in the `description` field. The total amount in that accounts during the selected month is represented by the `value` field.
