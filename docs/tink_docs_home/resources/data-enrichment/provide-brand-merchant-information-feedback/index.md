---
title: "Provide brand and merchant information feedback"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/provide-brand-merchant-information-feedback/"
exportedAt: "2026-01-13T12:48:00.873Z"
---
This article shows how to provide feedback about Brand Identification for transactions. Brand identification on transactions refers to the process of clearly marking or identifying transactions with a specific brand.The purpose of this is to gather the information if provided data is reliable and correct.

_**Note!** The Merchant Information and Brand Identification objects, both found in the same endpoint, are distinct. The Merchant Information object is populated by some providers, however often found blank, while Brand Identification is derived using Tink’s machine learning techniques on all types of transactions._

To provide feedback about Brand Identification for user transactions call firstly the endpoint `GET /enrichment/v1/transactions` endpoint to retrieve enriched transactions. More information about Brand Identification results you can find [here](/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-brand-identification-from-transactions/)

If the provided data contains any inaccuracies, you may submit feedback by invoking the `POST /enrichment/v1/feedback` endpoint and specifying the nature of the issue.

Alternatively, feedback can be submitted in a simplified format by indicating whether the brand data is incorrect, using only the Brand ID. Issue types are optional in this case. Please contact your Account Manager to discuss the possibility of exclusions.

Providing Merchant ID is optional in both cases.

We strongly encourage the use of detailed feedback, as it enables us to more effectively identify and address data quality issues, ultimately improving the accuracy of the returned results.

Possible issue types:

```
LOGO_IS_WRONG,
CONTACT_IS_WRONG,
LOCATION_IS_WRONG,
NAME_IS_WRONG
```

We are also accepting optional transaction details which allows us to narrow down the issues:

```
  "transactionDetails": {
    "cardAcceptorId": "String",
    "originalDescription": "String",
    "userMarket" : "String" 
}
```

**Example request:**

```
curl -X 'POST' \
'[external url removed]'\
  -H 'Authorization: Bearer {USER_ACCESS_TOKEN}'
  -H 'Accept: application/json'
  -d '{
  "feedbackData": [
    {
      "brandId": "02820044-69f5-4170-a516-fbeae6450f7a",
      "merchantId": "02820044-69f5-4170-a516-fbeae6450f7a",
      "issues": ["LOGO_IS_WRONG", "NAME_IS_WRONG"],
      "transactionDetails": {
        "cardAcceptorId": "String",
        "originalDescription": "String",
        "userMarket" : "String" 
      }
    },
     {
      "brandId": "02820044-69f5-4170-a516-fbeae6450f7b",
      "issues": ["LOGO_IS_WRONG"]
    },
  ]
}'
```

Or if using only Brand ID

```
curl -X 'POST' \
'[external url removed]'\
  -H 'Authorization: Bearer '
  -H 'Accept: application/json'
  -d '{
  "feedbackData": [
    {
      "brandId": "02820044-69f5-4170-a516-fbeae6450f7a",
      "merchantId": "02820044-69f5-4170-a516-fbeae6450f7a"
    },
     {
      "brandId": "02820044-69f5-4170-a516-fbeae6450f7b"
    },
  ]
}'
```

**Example response:**

In case of correctly provided feedback there will be reuturned:

`Http code: 204 No Content`

You now have all you need in order to provide feedback about Brand.
