---
title: "Get Cost of living Transactions"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/get-cost-of-living-transactions/"
exportedAt: "2026-01-13T12:51:24.012Z"
---
Now when you have obtained [cost of living](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/get-cost-of-living/), you can list all transactions for selected cost of living.

To list transactions you will need id of the cost-of-living from [cost-of-living](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/get-cost-of-living/).

Example request

```
curl -X GET 'https://api.tink.com/finance-management/v1/cost-of-living/{costId}/cost-of-living' \
-H 'Authorization: Bearer '
```

Example response:

```
{
  "nextPageToken": "MQ==",
  "costOfLivingId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "transactions": [
    {
      "amount": {
        "currencyCode": "GBP",
        "value": {
          "scale": "2",
          "unscaledValue": "2000"
        }
      },
      "date": "2024-07-10",
      "id": "d9f134ee2eb44846a4e02990ecc8d32e"
    }
  ]
}
```
