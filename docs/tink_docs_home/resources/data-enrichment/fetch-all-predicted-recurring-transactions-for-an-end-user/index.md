---
title: "Fetch all predicted recurring transactions for an end user"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-all-predicted-recurring-transactions-for-an-end-user/"
exportedAt: "2026-01-13T12:47:52.133Z"
---
To fetch the user’s recurring transactions, call the `/enrichment/v1/predicted-recurring-transactions` endpoint.

```
curl -X 'GET' \
'https://api.tink.com/enrichment/v1/predicted-recurring-transactions’ \
  -H 'Authorization: Bearer '
  -H 'accept: application/json'
```

Results are paginated – to learn more about pagination and how to work with it click [here](/Tiny-doc/tink_docs_home/resources/data-enrichment/generating-a-user-access-token-and-querying-end-user-data/#pagination).

**Example response:**

```
{
    "predictedRecurringTransactions": [...,
        {
            "groupId": "3bc213c6-743d-4b3b-9fb9-0a43f63e162c",
            "accountId": "c0e9225a12084bcbb7df794e786ebeaf",
            "amount": {
                "predicted": {
                    "value": {
                        "unscaledValue": "100",
                        "scale": "1"
                    },
                    "currencyCode": "EUR"
                }
            },
            "description": {
                "display": "Netflix",
                "original": "netflix"
            },
            "date": {
                "predicted": "2020-10-05"
            }
        }
    ],
    "nextPageToken": “AQ==”
}
```

**Note!** If the next recurring transaction is predicted to a weekend, the model will predict it to the next following workday. However, if the next following workday falls into the next month following the original prediction, the prediction is shifted backwards to the first workday preceding the weekend.

Optional Parameters

Due to pagination, a maximum of 10 predicted recurring transactions are by default included in the response. To increase the page size (to a maximum of 100 items), or to get the next page, use the optional pageSize or pageToken query parameters. You can also filter for which groups or accounts to predict recurring transactions and specify how far in the future you want predictions.

| Parameter | Description |
| --- | --- |
| pageSize | The number of transactions returned per page |
| pageToken | The token provided by the response to fetch the next page |
| groupIdIn | A list of ids of recurring transactions groups for which to predict transactions |
| accountIdIn | A list of account ids used to filter |
| predictionSpanDays | The number of future days to predict. Default is 30. Must be a positive integer |

Example request with query parameters:

```
curl -X 'GET' \
'https://api.tink.com/enrichment/v1/predicted-recurring-transactions?groupIdIn={arrayOfIds}&predictionSpanDays={numberOfDays}&pageToken={pageToken}&pageSize={pageSize}' \
  -H 'Authorization: Bearer '\
  -H 'accept: application/json'
```

A possible use case for this data is to get a sum of all predicted recurring transactions costs for a user, to do this loop over the amount.predicted.value values for all predicted recurring transactions for a user – this will give you a prediction of fixed costs for that user.

_**Note!** If you are ingesting accounts through [the Connector](/Tiny-doc/tink_docs_api/api/#connector), you can choose to exclude predicted recurring transactions for those accounts by setting the 'exclusion' flag to either 'PFM\_DATA' or 'PFM\_AND\_SEARCH'. For more information see [the account ingestion documentation here](/Tiny-doc/tink_docs_api/api/#connector/account)._
