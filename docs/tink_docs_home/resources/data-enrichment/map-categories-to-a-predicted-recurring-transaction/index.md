---
title: "Map categories to a predicted recurring transaction"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/map-categories-to-a-predicted-recurring-transaction/"
exportedAt: "2026-01-13T12:47:54.669Z"
---
Steps in this guide:

1.  Querying the predicted recurring transactions endpoint
2.  Querying the recurring transactions group endpoint
3.  Querying the categories endpoint
4.  Piecing everything together in the client

### Step 1: Querying the predicted recurring transactions endpoint[](#step-1-querying-the-predicted-recurring-transactions-endpoint)

The first step is to call the predicted recurring transactions endpoint with your user access token to get a list of predicted recurring transactions back:

```
curl -X 'GET' \
'https://api.tink.com/enrichment/v1/predicted-recurring-transactions’ \
  -H 'Authorization: Bearer '\
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
        }
    ],
    "nextPageToken": “AQ==”
}
```

For more information, see **complete documentation reference**.

Save the response for step 4.

### Step 2: Querying the recurring transactions groups endpoint[](#step-2-querying-the-recurring-transactions-groups-endpoint)

Next, you’ll call the list recurring transactions groups endpoint to get the user’s existing recurring transactions groups:

```
curl -X 'GET' \
'https://api.tink.com/enrichment/v1/recurring-transactions-groups’ \
  -H 'Authorization: Bearer '\
  -H 'accept: application/json'
```

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

For more information, see **complete documentation reference**.

Again, save the response for step 4.

### Step 3: Querying the categories endpoint[](#step-3-querying-the-categories-endpoint)

Next, you’ll call the list categories endpoint to get a list of all categories for your locale:

```
curl -X GET \
-H 'Authorization: bearer ' \
https://api.tink.com/enrichment/v1/categories?localeEq=en_US
```

**Example response:**

```
{"categories":[{"code":"expenses:entertainment.other","defaultChild":true,"id":"90c82b2781704763a1c49e236ea20142","parent":"50e3776c4b204435b4319e32a5686684","parentName":"Leisure","childName":"Leisure Other","sortOrder":65,"typeName":"Expenses"}, ...]}
```

For more information, see **complete documentation reference.**

Again, save the response for step 4.

### Step 4: Piecing everything together in the client[](#step-4-piecing-everything-together-in-the-client)

By now, you should have for a user:

-   A list of predicted recurring transactions
-   A list of recurring transaction groups
-   A list of categories for your locale

Now, map them together:

-   Each predicted recurring transaction has a `groupId` you can map to a recurring transaction group
-   Each recurring transaction group has a `categoryId` you can map to a category

Putting these mappings together in the client, you can return user-friendly category names with your predicted recurring transactions.
