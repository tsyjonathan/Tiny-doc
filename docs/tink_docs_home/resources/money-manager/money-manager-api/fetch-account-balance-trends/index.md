---
title: "Fetch account balance trends - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/fetch-account-balance-trends/"
exportedAt: "2026-01-13T12:50:35.021Z"
---
In this guide, we are going to look at account balance trends for an account over a one year period.

To achieve this, now need to query the Statistics endpoint using a `user access token` with the `statistics:read` scope.

As part of the request, you need to:

-   Set the range for the past 12 months
-   Set the resolution to "MONTHLY"
-   Set the types to "balances-by-account"

Example request:

```
curl -X -v POST 'https://api.tink.com/api/v1/statistics/query' \
-H 'Authorization: Bearer {YOUR_USER_ACCESS_TOKEN}' \
-H 'Content-Type: application/json' \
--data-raw '{
    "periods": ["2023-04"],
    "resolution": "MONTHLY",
    "types": ["balances-by-account"]
   }'
```

The response contains a list of statistics data points grouped by account:

```
[
    {
        "description": "4a4c4159063340e8b912c07027904872",
        "payload": "",
        "period": "2023-04",
        "resolution": "MONTHLY",
        "type": "balances-by-account",
        "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
        "value": -5173.01
    },
    {
        "description": "f1a2f4ee3e3945aea2c7cdd93042c432",
        "payload": "",
        "period": "2023-04",
        "resolution": "MONTHLY",
        "type": "balances-by-account",
        "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
        "value": 10000.0
    },
    {
        "description": "15cca58005ea4a26b964546685db17ae",
        "payload": "",
        "period": "2023-04",
        "resolution": "MONTHLY",
        "type": "balances-by-account",
        "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
        "value": 7306.99
    }
]
```

The `description` field represents the user's account\_id and the `value` field represents the account balance for that period, which you can use to present to your user.

See also: [/Tiny-doc/tink_docs_api/api/#finance-management/statistics/query-statistics](/Tiny-doc/tink_docs_api/api/#finance-management/statistics/query-statistics)
