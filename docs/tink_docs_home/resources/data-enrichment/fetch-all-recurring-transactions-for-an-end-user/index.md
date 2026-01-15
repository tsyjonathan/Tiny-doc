---
title: "Fetch all recurring transactions for an end user"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-all-recurring-transactions-for-an-end-user/"
exportedAt: "2026-01-13T12:47:46.286Z"
---
To fetch the user’s recurring transactions, call the `/enrichment/v1/recurring-transactions` endpoint.

**Example request:**

```
curl -X 'GET' \
'https://api.tink.com/enrichment/v1/recurring-transactions’ \
  -H 'Authorization: Bearer '
  -H 'accept: application/json'
```

If you want to restrict the results to a single recurring transaction group, you can add the optional query parameter groupId to the URL:

```
curl -X 'GET' \
'https://api.tink.com/enrichment/v1/recurring-transactions?groupId=’ \
  -H 'Authorization: Bearer '
  -H 'accept: application/json'
```

Results are paginated – to learn more about pagination and how to work with it click [here](/Tiny-doc/tink_docs_home/resources/data-enrichment/generating-a-user-access-token-and-querying-end-user-data/#pagination).

**Example response:**

```
{
  "recurringTransactions": [..., 
    {
      "transactionId": "1356d14958f746928233d6568ffa8828",
      "groupId": "3bc213c6-743d-4b3b-9fb9-0a43f63e162c",
      "accountId": "c0e9225a12084bcbb7df794e786ebeaf",
      "amount": {
        "value": {
          "unscaledValue": "100",
          "scale": "1"
        },
        "currencyCode": "EUR	"
      },
      "categoryId": "075fab3ec31f43aa9d39675475c1fb1a",
      "description": {
        "display": "Netflix",
        "original": "netflix"
      },
      "date": {
        "value": "2020-05-18",
        "booked": "2020-05-18"
      }
    }
  ],
  "nextPageToken": “AQ==”
}
```

_**Note!** If you are ingesting accounts through [the Connector](/Tiny-doc/tink_docs_api/api/#connector), you can choose to exclude recurring transactions for those accounts by setting the 'exclusion' flag to either 'PFM\_DATA' or 'PFM\_AND\_SEARCH'. For more information see [the account ingestion documentation here](/Tiny-doc/tink_docs_api/api/#connector/account)._

You have now all you need in order to get and present all recurring transactions for each individual end user.
