---
title: "Reallocate funds between Savings Goals"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/reallocate-funds-between-savings-goals"
exportedAt: "2026-01-13T12:51:00.772Z"
---
When you already have created two Savings Goals (step 5 above) and deposited fund to at least one of them (step 6 above), you can transfer amount (reallocate fund) between them.

In this guide, we are going to show you how to transfer 100 Euros to a Savings Goals. To do this, you need to use the [Reallocate Amount](https://docs.tink.com/api#finance-management/savings-goals/reallocate-amount) endpoint, and also include an `user access token` with the `savings-goals:write` scopes part of the request.

If you don't have your Savings Goal `id`, you can use the [Savings Goals](https://docs.tink.com/api#finance-management/savings-goals/list-savings-goals) endpoint to get a list of all Savings Goals and their associated `id`.

Example request against the [Reallocate Amount](https://docs.tink.com/api#finance-management/savings-goals/reallocate-amount) endpoint:

```
curl -L -X POST 'https://api.tink.com/api/v1/savings-goals//allocations/fund:reallocate' \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
--data-raw `{
    "amount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 100
    },
    "destinationSavingsGoalId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "sourceSavingsGoalId": "d9f134ee2eb44846a4e02990ecc8d32e"
  }`
```

Example response:

```
{
  "amount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 100
  },
  "createTime": "2020-05-14T13:30:45Z",
  "destinationId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "destinationType": "string",
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "sourceId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "sourceType": "string"
}
```

Well done - you have moved 100 Euro between your two Savings Goals!
