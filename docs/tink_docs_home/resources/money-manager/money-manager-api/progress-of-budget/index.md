---
title: "Check the progress of your Budget"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/progress-of-budget/"
exportedAt: "2026-01-13T12:51:15.858Z"
---
With the Budget you've previously set-up, we're now going to walkthrough how to display it's latest balance.

Using the `id` of the budget you've previously set-up, you're going to call the [get budget details](/Tiny-doc/tink_docs_api/api/#finance-management/budget/get-budget-details) endpoint with a `user access token` with the `budget:read` scope. In the API call, you also need to specify the `start` and `end` of the period.

> **NOTE:** when specifying the `start` and `end` date, this has to be expressed as an epoch timestamp in milliseconds.

Example request:

```
curl -X GET 'https://api.tink.com/api/v1/budgets//details?start=1549976786000&end=1552395986000' \
-H 'Authorization: Bearer '
```

Example response:

```
{
  "averageSpentAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "budgetPeriods": [
    {
      "end": 1552395986000,
      "spentAmount": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 1050
      },
      "start": 1549976786000
    }
  ],
  "budgetSpecification": {
    "amount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "archived": false,
    "created": 1552395986000,
    "filter": {
      "accounts": [
        {
          "id": "325ee4ccf579450ca59d89ee54fa7e40"
        }
      ],
      "categories": [
        {
          "code": "expenses:food.coffee"
        }
      ],
      "freeTextQuery": "Monmouth Coffee",
      "tags": [
        {
          "key": "coffee"
        }
      ]
    },
    "id": "e2b746ed27c542ce846a8d693474df21",
    "name": "Coffee budget",
    "oneOffPeriodicity": {
      "end": 1552395986000,
      "start": 1549976786000
    },
    "periodicityType": "ONE_OFF",
    "recurringPeriodicity": null
  },
  "end": 1552395986000,
  "start": 1549976786000,
  "totalSpentAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  }
}
```

With the response, you can then extract the following fields to learn more about the user's progress with the budget:

| FIELD | DESCRIPTION |
| --- | --- |
| averageSpentAmount | This is the amount that you have on average spent on coffee the last couple of months. You can use this as a trend line when visualising a budget in your UI. |
| budgetPeriods | This amount is how much you have spent during the current period, in this case the current month. Have you managed to stay below your target amount? |
| created | This is the date when the budget was created so you can see how many periods you have managed to stick to your budget since you started tracking. |
| totalSpentAmount | The total amount spent for this given period. If you use query parameters and request a 12 month period, including the current period. You will get the total spent amount in the coffee category for the last 12 months. |

Now you have learned how to see fetch budget details, you're one step closer to going live with your Money Manager application!
