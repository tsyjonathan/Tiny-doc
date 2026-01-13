---
title: "Get Cost of living - Tink Docs"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/get-cost-of-living"
exportedAt: "2026-01-13T12:51:22.176Z"
---
## Introduction[](#introduction)

Understanding your financial health starts with knowing your essentials. The Cost of Living tool is designed to give you a clear picture of your recurring, non-discretionary expenses—the core costs that keep your life running, like rent, mortgage payments, utility bills, etc,.

In a time when budgeting is more important than ever, this tool helps you stay on top of the fixed expenses you can’t ignore. It automatically identifies and groups these recurring transactions, showing you:

1.  How much you’re spending on essential living costs each month
    
2.  A breakdown by category (e.g., Housing, Utilities, Food)
    
3.  A detailed list of all transactions that fall under each category
    

Whether you're planning for the month ahead or looking to reduce financial stress, the Cost of Living tool gives you the transparency and control you need to make informed decisions and stay financially grounded.

We’re building this to help you focus not just on what you want to spend, but what you need to spend—because that’s where confident budgeting begins.

## Fetch Cost of living[](#fetch-cost-of-living)

Example request

```
curl -X GET finance-management/v1/cost-of-living \
-H 'Authorization: Bearer '
```

Example response:

```
{
  "nextPageToken": "MQ==",
  "costOfLiving": [
    {
      "costOfLivingId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "accountId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "categoryId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "description": "SEB loan",
      "brand": {
        "id": "brand_id_1",
        "name": "brand_name_1",
        "logoUrl": "http://example.com/brandlogo1.png",
        "contact": {
          "website": "http://brandexample.com"
        }
      },
      "startDate": "2024-07-01",
      "costOfLivingCost": {
        "currencyCode": "GBP",
        "value": {
          "scale": "2",
          "unscaledValue": "20000"
        }
      },
      "totalCostOfLivingSpend": {
        "currencyCode": "GBP",
        "value": {
          "scale": "2",
          "unscaledValue": "20000"
        }
      }
    }
  ]
}
```

The above API call fetches cost-of-living for all accounts of a user. It is also possible to get the cost-of-living from a list of accounts by calling the same api but along with the list of accounts in the following way:

Example request

```
curl -X GET finance-management/v1/cost-of-living?accountId={accountIds} \
-H 'Authorization: Bearer '
```

Now when you have obtained cost of living for an account and you want detailed transactions view read next article how to get cost of living Transactions.
