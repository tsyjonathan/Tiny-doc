---
title: "Visualise spending by parent category"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/visualise-spending-by-parent-category"
exportedAt: "2026-01-13T12:58:20.317Z"
---
In the previous [guide](https://docs.tink.com/resources/money-manager/money-manager-api/visualise-spending-by-child-category), we explored how you can show spending per child category. There will be situations where it can be useful to see spending amounts for all child categories of a parent category, which can also be achieved using the [Statistics](https://docs.tink.com/api#finance-management/statistics) endpoint.

In this guide, we will drill down to the child category level using the same user and parent category `id` that was retrieved in the previous guide.

In the request, you need to:

1.  Provide the same category `id` as when you retrieved the child category
2.  Specify the same month
3.  Set the resolution to monthly
4.  Set the type to `expense-by-primary-category`

As part of the request, you will need to include a user access token with the `statistics:read` scope.

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer {YOUR_USER_ACCESS_TOKEN}' \
  -H 'Content-Type: application/json' \
  --data-raw '{
   "description": "fe9e199c2ca94c12baf1f3eb4a4122de",
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
    "value": 842.1
  },
  {
    "description": "fe9e199c2ca94c12baf1f3eb4a4122de",
    "payload": "",
    "period": "2021-04",
    "resolution": "MONTHLY",
    "type": "expenses-by-primary-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": 345.7
  }
]
```

To know what the returned ID refers to, you can call the [list categories](https://docs.tink.com/api#general/category/list-categories) endpoint while unauthenticated, and match the payload field from the statistics endpoint response to the ID in the list categories endpoint response.
