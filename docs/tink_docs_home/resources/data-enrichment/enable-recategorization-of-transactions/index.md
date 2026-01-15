---
title: "Enable recategorization of transactions - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/enable-recategorization-of-transactions/"
exportedAt: "2026-01-13T12:47:40.277Z"
---
### Step 1: Build the request body[](#step-1-build-the-request-body)

Taking the ID of the transaction you’d like to recategorize, and the category ID you’d like to recategorize it to, build a json body in the following format, replacing TRANSACTION\_ID and NEW\_CATEGORY\_ID with the real values:

```
    {
        "id": "{TRANSACTION_ID}",
        "enrichedData": {
            "categories": {
                "pfm": {
                    "id": "{NEW_CATEGORY_ID}"
                }
            }
        }
    }
```

Since this endpoint takes a list of partial transactions in the body, you can recategorize multiple transactions at once if you need to by adding them to the list:

```
    {
        "id": "{TRANSACTION_ID}",
        "enrichedData": {
            "categories": {
                "pfm": {
                    "id": "{NEW_CATEGORY_ID}"
                }
            }
        }
    },
    {
        "id": "{ANOTHER_TRANSACTION_ID}",
        "enrichedData": {
            "categories": {
                "pfm": {
                    "id": "{NEW_CATEGORY_ID}"
                }
            }
        }
    }
```

### Step 2: Run the request[](#step-2-run-the-request)

Call the endpoint with the body constructed in step 1.

```
curl -v -X PATCH "https://api.tink.com/enrichment/v1/transactions" \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '[
    {
        "id": "{TRANSACTION_ID}",
        "enrichedData": {
            "categories": {
                "pfm": {
                    "id": "{NEW_CATEGORY_ID}"
                }
            }
        }
    }
]'
```

If your update has been successful, you should receive an HTTP 204 response. If your body was misconstructed, you will receive an HTTP 400 response. You can [call the list enriched transactions endpoint](/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-enriched-transactions-for-a-user/) to check what the transaction(s) look like now, if you’d like to.
