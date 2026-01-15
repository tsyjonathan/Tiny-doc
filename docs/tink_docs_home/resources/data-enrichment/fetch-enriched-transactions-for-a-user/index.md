---
title: "Fetch enriched transactions for a user"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-enriched-transactions-for-a-user/"
exportedAt: "2026-01-13T12:47:38.293Z"
---
### Step 1: Ingest transactions for the user[](#step-1-ingest-transactions-for-the-user)

If you haven’t already ingested some transactions for the user you got an access token for, follow our guide for [ingesting transactions with Tink’s Connector API](/Tiny-doc/tink_docs_home/resources/data-enrichment/get-data-into-the-tink-platform-using-the-connector/). If you just want to quickly see what the endpoint produces, you can try a [demo bank](/Tiny-doc/tink_docs_home/resources/console/demo-bank/) user that already has some transactions.

### Step 2: Get a list of enriched transactions[](#step-2-get-a-list-of-enriched-transactions)

Using your user access token, call the list enriched transactions endpoint:

**Example request:**

```
curl "[external url removed]" \ 
-H 'Authorization: Bearer '
```

**Example response:**

```
{
    "nextPageToken": "Qv+BAwEBCU6ld0N1cnNvcgH/ggABAgEPT3JpZ2luYWjSZXF1ZXN0AQoAARFTb3J0VmFsdWVzTGFzdEhpdAH/hAAAABz/gwIBAQ5bXWludGVyZmFjZSB7fQH/hAQBEAAAbf+CASgKIDQxYTFjZWU1YjVkYTRlOTliMTE0MTFkMGQyYWM5ODU1IAEqAggBAQIHZmxvYXQ2NAyJAPmwB68OL3VCBnN0cmluZwwiACAyNTg5MjNiZWNiYWI0MGZiOPI0NGMxMGE5M2FjZTk7ZQA=hnW2XcDznGHI4Iwci5Zi/zrmDA1LLKANTjKmmeMJA+E=",
    "transactions": [
        {
            "accountId": "4a2945d1481c4f4b98ab1b135afd96c0",
            "amount": {
                "currencyCode": "GBP",
                "value": {
                    "scale": "1",
                    "unscaledValue": "-1300"
                }
            },
            "bookedDateTime": "2020-12-15T09:25:12Z",
            "dates": {
                "booked": "2020-12-15",
                "value": "2020-12-15"
            },
            "descriptions": {
                "display": "Tesco",
                "original": "TESCO STORES 3297",
                "detailed": {
                     "unstructured": "TESCO STORES 3297 Täby"
                }
            },
            "enrichedData": {
                "categories": {
                    "pfm": {
                        "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",§
                    }
                }
            },
            "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
            "identifiers": {
                "providerTransactionId": "500015d3-acf3-48cc-9918-9e53738d3692"
            },
            "merchantInformation": {
                "merchantCategoryCode": "string",
                "merchantName": "string"
            },
            "providerMutability": "MUTABILITY_UNDEFINED",
            "reference": "string",
            "status": "BOOKED",
            "transactionDateTime": "string",
            "types": {
                "financialInstitutionTypeCode": "DEB",
                "type": "DEFAULT"
            },
            "valueDateTime": "2020-12-15T09:25:12Z",
            "counterparties": {
                "payer": {
                   "name": "Joe Doe",
                   "identifiers": {
                        "financialInstitution": {
                            "accountNumber": "479696******8661"
                        }
                   }
                 },
                 "payee": {
                     "name": "Jane Doe",
                     "identifiers": {
                       "financialInstitution": {
                           "accountNumber": "SE3778591419782047144807"
                       }
                     }
                }
            }
        }
    ]
}
```

The response results are paginated and by default ten transactions are returned. However, you are able to fetch up to 100 transactions per request. You can read more about pagination [here](/Tiny-doc/tink_docs_home/resources/data-enrichment/generating-a-user-access-token-and-querying-end-user-data/#pagination).

Enriched data can be found in the enrichedData section of the response object. For example, the pfm category id, which can be used to give your users friendly categories for their transactions when combined with [our categories list](/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-a-list-of-all-categories-for-your-locale/).
