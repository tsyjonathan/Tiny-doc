---
title: "Fetch all recurring transaction groups for a user"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-all-recurring-transaction-groups-for-a-user/"
exportedAt: "2026-01-13T12:47:48.241Z"
---
To fetch the user’s recurring transactions, call the `/enrichment/v1/recurring-transactions-groups` endpoint.

**Example request:**

```
curl -X 'GET' \
'[external url removed] \
  -H 'Authorization: Bearer '
  -H 'accept: application/json'
```

Results are paginated – to learn more about pagination and how to work with it click [here](/Tiny-doc/tink_docs_home/resources/data-enrichment/generating-a-user-access-token-and-querying-end-user-data/#pagination).

**Example response:**

```
{
    "recurringTransactionsGroups": [..., 
        {
            "id": "3bc213c6-743d-4b3b-9fb9-0a43f63e162c",
            "categoryId": "075fab3ec31f43aa9d39675475c1fb1a",
            "name": "Netflix",
            "period": {
                "label": "MONTHLY",
                "duration": {
                    "mean": 30,
                    "standardDeviation": 0,
                    "minimum": 30,
                    "maximum": 30
                }
            },
            "amount": {
                "mean": {
                    "unscaledValue": "100",
                    "scale": "1"
                },
                "standardDeviation": {
                    "unscaledValue": "0",
                    "scale": "1"
                },
                "median": {
                    "unscaledValue": "100",
                    "scale": "1"
                },
                "minimum": {
                    "unscaledValue": "100",
                    "scale": "1"
                },
                "maximum": {
                    "unscaledValue": "100",
                    "scale": "1"
                },
                "latest": {
                    "unscaledValue": "100",
                    "scale": "1"
                },
                "currencyCode": "EUR"
            },
            "occurrences": {
                "count": 3,
                "firstDate": "2020-07-05",
                "latestDate": "2020-09-05",
                "dayOfMonth": {
                    "mean": 5,
                    "median": 5,
                    "minimum": 5,
                    "maximum": 5
                }
            }
        }
    ],
    "nextPageToken":  “AQ==”
}
```

_**Note!** If you are ingesting accounts through [the Connector](/Tiny-doc/tink_docs_api/api/#connector), you can choose to exclude recurring transactions for those accounts by setting the 'exclusion' flag to either 'PFM\_DATA' or 'PFM\_AND\_SEARCH'. For more information see [the account ingestion documentation here](/Tiny-doc/tink_docs_api/api/#connector/account)._

You have now all you need in order to get and present all recurring transactions groups for each individual end user.

A possible use case for this data is to get a sum of all recurring transactions costs for a user, to do this loop over the amount.latest values for all recurring transactions groups for a user – this will give you the total fixed costs for that user.
