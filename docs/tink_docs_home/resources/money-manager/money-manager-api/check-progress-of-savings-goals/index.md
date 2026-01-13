---
title: "Check the progress of all Savings Goals"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/check-progress-of-savings-goals"
exportedAt: "2026-01-13T12:50:58.877Z"
---
It's important to list and remind your users of their Savings Goals so they can follow their progress.

To fetch a list of all Savings Goals for a user, you need to call the [List Savings Goals](https://docs.tink.com/api#finance-management/savings-goals/list-savings-goals) endpoint with a `user access token` with the `savings-goal:read` scope. In the request, you also have the ability to set query parameters to show Savings Goals by their status or ones tied to a specific account - more details can be [here](https://docs.tink.com/api#finance-management/savings-goals/list-savings-goals/query-parameters).

In this example, we'll request a list of all Savings Goals which have been `CREATED` or are `IN_PROGRESS`.

Example request:

```
curl -L -X GET 'https://api.tink.com/api/v1/savings-goals?status_in=IN_PROGRESS&status_in=CREATED' \
-H 'Authorization: Bearer '
```

Example response:

```
{
  "nextPageToken": "string",
  "savingsGoals": [
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
  ]
}
```

You now can present this back to your user so they can see their progress!
