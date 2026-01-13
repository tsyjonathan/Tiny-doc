---
title: "Fetch similar enriched transactions for a user’s transaction"
source: "https://docs.tink.com/resources/data-enrichment/fetch-similar-enriched-transactions-for-a-users-transaction"
exportedAt: "2026-01-13T12:47:42.313Z"
---
Using your user access token and the transaction you want to find similar transactions for, call the list similar transactions endpoint:

```
curl "https://api.tink.com/enrichment/v1/transactions/:find-similar” \ 
-H 'Authorization: Bearer ’
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
    }
  ]
}
```
