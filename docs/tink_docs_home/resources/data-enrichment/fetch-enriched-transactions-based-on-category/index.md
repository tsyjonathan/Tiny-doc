---
title: "Fetch enriched transactions based on category"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-enriched-transactions-based-on-category/"
exportedAt: "2026-01-13T12:47:44.354Z"
---
Using your user access token, call the list enriched transactions endpoint with the categoryIdIn filter, it works both with a singular category ID:

```
curl -H "Authorization: Bearer {YOUR_USER_ACCESS_TOKEN}" \
"https://api.tink.com/enrichment/v1/transactions?categoryIdIn={CATEGORY_ID}"
```

or multiple:

```
curl -H "Authorization: Bearer {YOUR_USER_ACCESS_TOKEN}" \
"https://api.tink.com/enrichment/v1/transactions?\
categoryIdIn=002129e58ca24923bccc60979eaa63cd&\
categoryIdIn=16fdf95f15b04408a0262d8e2fde8b6d"
```

A response will look something like:

```
{
  "transactions": [
    {
      "id": "09aa8f3c98cc48b5b20af443f7257095",
      "accountId": "string",
      "amount": {
        "value": {
          "unscaledValue": 1000,
          "scale": 1
        },
        "currencyCode": "SEK"
      },
      "descriptions": {
        "original": "test",
        "display": "Test",
        "detailed": {
            "unstructured": "TEST STORES 3297"
        }
      },
      "dates": {
        "booked": "2016-02-17",
        "value": ""
      },
      "identifiers": {
        "providerTransactionId": ""
      },
      "types": {
        "type": "CREDIT_CARD",
        "financialInstitutionTypeCode": ""
      },
      "enriched_data": {
        "categories": {
          "pfm": {
            "id": "96fb245d92b8462d8feb32a297860f4a"
          }
        }
      },
      "status": "BOOKED",
      "merchantInformation": {
        "merchantCategoryCode": "",
        "merchantName": ""
      },
      "reference": "",
      "bookedDateTime": "",
      "valueDateTime": "",
      "transactionDateTime": "",
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
    },
  ],
  "nextPageToken": "AQ=="
}
```

The response results are paginated, to learn you can read about pagination [here](/Tiny-doc/tink_docs_home/resources/data-enrichment/generating-a-user-access-token-and-querying-end-user-data/#pagination).
