---
title: "Add funds to a Savings Goal"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/add-funds-to-savings-goal"
exportedAt: "2026-01-13T12:50:56.802Z"
---
Now you have created a [Savings Goal](https://docs.tink.com/resources/money-manager/money-manager-api/create-savings-goal), you can add funds from the account that’s connected to the Savings Goal.

We call this the allocation of funds because are not actually moving any money, as we’re only allocating an amount of what’s currently available in the balance of that account.

> **NOTE:** If EUR isn't the currency used by the account you've previously created the budget for, please remember to change the currency to match where we have referred to EUR in this guide. i.e. GBP for UK, SEK for Sweden and etc.

In this guide, we are going to show you how to add 100 Euros to a Savings Goals. To do this, you need to use the [Deposit to Savings Goal](https://docs.tink.com/api#finance-management/savings-goals/deposit-to-savings-goal) endpoint, and also include the Savings Goal `id` and an `user access token` with the `savings-goals:write` scopeas part of the request.

If you don't have your Savings Goal `id` from the previous guide, you can use the [Savings Goals](https://docs.tink.com/api#finance-management/savings-goals/list-savings-goals) endpoint to get a list of all Savings Goals and their associated `id`.

Example request:

```
curl -L -X POST 'https://api.tink.com/api/v1/savings-goals//allocations/fund:deposit' \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
--data-raw '{  
          "currencyCode": "EUR",
          "scale": 2,
          "unscaledValue": 100
    }'
```

Example response:

```
{
    "id": "0ae6e63918674acb94c70c7831177df0",
    "sourceId": "d5adc05fef74406fb2023df324eaa978",
    "sourceType": "ACCOUNT",
    "destinationId": "c99888bea19d489d968e2e5e19fab303",
    "destinationType": "SAVINGS_GOAL",
    "amount": {
        "unscaledValue": 100,
        "scale": 2,
        "currencyCode": "EUR"
    },
    "createTime": "2021-06-21T13:28:16.443249Z"
}
```

Congrats, you've now moved 100 Euros into your Savings Goal!
