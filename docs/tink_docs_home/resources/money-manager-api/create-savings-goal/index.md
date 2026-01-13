---
title: "Create a Savings Goal - Tink Docs"
source: "https://docs.tink.com/resources/money-manager-api/create-savings-goal"
exportedAt: "2026-01-13T12:56:17.945Z"
---
## Introduction[](#introduction)

With Savings Goals, your users can track their savings as they save for an upcoming trip or a future investment. This also means you can see your users short and long term goals so you can help them to reach their goals.

> **Note:** All savings goals have to be tied to a specific account e.g. Savings account. You can have several goals tied to the same account but not several accounts tied to the same goal.

By completing the 3 steps in this guide, we will create a goal for an upcoming holiday:

## 1\. Fetch Savings Goals categories[](#fetch-savings-goals-categories)

To get the savings goals categories you need to send a request to the [Savings Goals List Categories](https://docs.tink.com/api#finance-management/savings-goals/list-categories) endpoint using a `user access token` with the `savings-goal:read` scope.

Example request

```
curl -X GET 'https://api.tink.com/api/v1/savings-goals/categories' \
-H 'Authorization: Bearer '
```

Example response:

```
{
  "categories": [
    "trip",
    "wedding"
  ]
}
```

Now you select the category you require from the response, and in this example we’re going to use “trip.”

## 2\. Select the account & name the Savings Goal[](#select-the-account-amp-name-the-savings-goal)

Now we have the Savings Goal's category and the account `id`, we are ready to create the Savings Goal using the [Create Savings Goal](https://docs.tink.com/api#finance-management/savings-goals/create-savings-goal) endpoint using an `user access token` with the `savings-goal:write` scope.

> **Note**: If you don't know your account `id`, it can be fetched using the [List Accounts](https://docs.tink.com/api#data-v1/account/list-accounts) endpoint.

## 3\. Name the Savings Goal, and specify the amount & target completion date[](#name-the-savings-goal-and-specify-the-amount-amp-target-completion-date)

As part of the request, you also need to specify a name for the Savings Goal, the amount you want to save & the completion date. The currency of the target amount must match the account currency.

For this guide, we will call it 'Summer Holiday.' And we will assume the user wants to save €2000 by 2022-10-25.

Example request

```
curl -X POST 'https://api.tink.com/api/v1/savings-goals' \
-H 'Authorization: Bearer {YOUR_USER_ACCESS_TOKEN}' \
-H 'Content-Type: application/json' \
--data-raw '{
  "account": "d9f134ee2eb44846a4e02990ecc8d32e",
  "categories": [
    "wedding",
    "trip"
  ],
  "description": "The savings goal for our big wedding. Including wedding-singers.",
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "name": "Wedding",
  "oneOffPeriodicity": {
    "targetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "targetDate": "2022-10-25"
  },
  "periodicityType": "ONE_OFF",
  "recurringPeriodicity": {
    "periodSavedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodUnit": "WEEK",
    "totalTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    }
  },
  "savedAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "savingsPurpose": "INVESTMENTS",
  "tags": [
    "icon:blue",
    "priority:10"
  ]
}'
```

Example response:

```
{
  "account": "d9f134ee2eb44846a4e02990ecc8d32e",
  "categories": [
    "wedding",
    "trip"
  ],
  "createTime": "2020-05-14T13:30:45Z",
  "description": "The savings goal for our big wedding. Including wedding-singers.",
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "name": "Wedding",
  "oneOffPeriodicity": {
    "targetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "targetDate": "2022-10-25"
  },
  "periodicityType": "ONE_OFF",
  "recurringPeriodicity": {
    "periodSavedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodUnit": "WEEK",
    "totalTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    }
  },
  "savedAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "savingsPurpose": "[\"Investments\",\"Housing\"]",
  "status": "CREATED",
  "tags": [
    "icon:blue",
    "priority:10"
  ]
}
```

Now your savings goal is created. Read the next article if you want to know how to add funds to a Savings Goal.
