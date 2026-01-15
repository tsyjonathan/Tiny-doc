---
title: "Filter how long in the future predictions should be shown"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/filter-how-long-in-the-future-predictions-should-be-shown/"
exportedAt: "2026-01-13T12:47:56.604Z"
---
Call the predicted recurring transactions endpoint with your user access token, and predictionSpanDays set to the number of days back from today you would like to see predictions from:

```
curl -X 'GET' \
[external url removed] \
  -H 'Authorization: Bearer '
  -H 'accept: application/json'
```

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
        }, 
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
                "predicted": "2020-11-05"
            }
        }
    ],
    "nextPageToken": “AQ==”
}
```
