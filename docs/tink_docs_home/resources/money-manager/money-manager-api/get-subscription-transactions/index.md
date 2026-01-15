---
title: "Get Subscription Transactions - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/get-subscription-transactions/"
exportedAt: "2026-01-13T12:51:05.033Z"
---
Now when you have obtained [Subscriptions](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/get-subscriptions/), you can list all transactions for selected Subscription.

To list transactions you will need id of the Subscription from [Subscriptions](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/get-subscriptions/).

Example request

```
curl -X GET 'https://api.tink.com/finance-management/v1/subscriptions/{subscriptionId}/transactions' \
-H 'Authorization: Bearer '
```

Example response:

```
{
   "subscriptionId":"3bc213c6-743d-4b3b-9fb9-0a43f63e162c",
   "transactions":[
      {
         "id":"1356d14958f746928233d6568ffa8828",
         "date":"2023-06-25",
         "amount":{
            "currencyCode":"EUR",
            "scale":1,
            "unscaledValue":-100
         }
      },
      {
         "id":"1356d14958f746928233d6568ffa8828",
         "date":"2023-06-25",
         "amount":{
            "currencyCode":"EUR",
            "scale":1,
            "unscaledValue":-200
         }
      }
   ],
   "nextPageToken":""
}
```
