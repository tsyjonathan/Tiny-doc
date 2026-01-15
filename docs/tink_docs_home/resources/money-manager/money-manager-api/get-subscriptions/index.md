---
title: "Get Subscriptions - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/get-subscriptions/"
exportedAt: "2026-01-13T12:51:02.977Z"
---
## Introduction[](#introduction)

The Subscription Overview tool is designed to help you, and your end-users, get a clear understanding of your active subscriptions and their associated costs on a monthly, quarterly, and annual basis.

We understand the need for transparency and control when it comes to subscription spending. As the number of subscriptions per person increases, it's more important than ever to be aware of where your money is going. That's why we're focusing on voluntary spend, allowing you to truly see and understand your discretionary subscription costs.

The Subscription Overview tool is our answer to one of the most frequent requests we receive: to provide an easy-to-use function for managing subscription spending. It aligns with Money Manager's commitment to provide you with a full financial overview, empowering you to take control of your finances.

To accomplish this, we are developing a service that will group recurring transactions based on selected categories such as music streaming, gym subscriptions, etc. This service will clearly display how much you are currently spending on selected subscriptions, providing a total amount spent for those subscriptions. Furthermore, it will allow you to see all transactions per selected subscription.

We are certain that this new service will greatly enhance your ability to manage your finances and make informed decisions about your subscription spending. We look forward to your feedback and hope that our new Subscription Overview tool will help you take control of your financial life.

## Fetch Subscriptions[](#fetch-subscriptions)

Example request

```
curl -X GET 'https://api.tink.com/finance-management/v1/subscriptions' \
-H 'Authorization: Bearer '
```

Example response:

```
{
  "subscriptions": [
    {
      "subscriptionId": "3bc213c6-743d-4b3b-9fb9-0a43f63e162c",
      "accountId": "3bc213c6-743d-4b3b-9fb9-0a43f63e162b",
      "categoryId": "075fab3ec31f43aa9d39675475c1fb1a",
      "description": "Gym Membership",
      "startDate": "2020-07-05",
      "brand": {
        "contact": {
          "website": "string"
        },
        "id": "02820044-69f5-4170-a516-fbeae6450f7a",
        "logoUrl": "https://....",
        "name": "Gym"
      },
      "subscriptionCost": {
        "currencyCode": "EUR",
        "scale": 1,
        "unscaledValue": 100
      },
      "totalSubscriptionSpend": {
        "currencyCode": "EUR",
        "scale": 1,
        "unscaledValue": 300
      }
    },
    {
      "subscriptionId": "3bc213c6-743d-4b3b-9fb9-0a43f63e162b",
      "accountId": "3bc213c6-743d-4b3b-9fb9-0a43f63e2b2c",
      "categoryId": "075fab3ec31f43aa9d39675475c1fb1a",
      "description": "Streaming Service",
      "startDate": "2020-07-05",
      "brand": {
        "contact": {
          "website": "string"
        },
        "id": "02820044-69f5-4170-a516-fbeae6450f7a",
        "logoUrl": "https://....",
        "name": "Streaming Service"
      },
      "subscriptionCost": {
        "currencyCode": "EUR",
        "scale": 1,
        "unscaledValue": 50
      },
      "totalSubscriptionSpend": {
        "currencyCode": "EUR",
        "scale": 1,
        "unscaledValue": 200
      }
    }
  ],
  "nextPageToken": ""
}
```

Now when you have obtained Subscriptions and you want detailed transactions view read next article how to get Subscription Transactions.
