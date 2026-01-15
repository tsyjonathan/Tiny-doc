---
title: "Fetch brand identification from transactions"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-brand-identification-from-transactions/"
exportedAt: "2026-01-13T12:47:58.750Z"
---
This article shows how to retrieve Brand Identification for transactions. Brand identification on transactions refers to the process of clearly marking or identifying transactions with a specific brand. This could mean including the brand's name and logo, or other identifying information on the transactions themselves. The purpose of this is to make it clear to users who the transaction is with, which can help build brand recognition and trust as well as open up other opportunities for further feature development.

_**Note!** The Merchant Information and Brand Identification objects, both found in the same endpoint, are distinct. The Merchant Information object is populated by some providers, however often found blank, while Brand Identification is derived using Tink’s machine learning techniques on all types of transactions._

To retrieve Brand Identification for user transactions call the endpoint `GET /enrichment/v1/transactions` endpoint.

This endpoint will try to enrich transactions with multiple data points and brand identification is one of them. The fields will be populated with data only if the product has been purchased and the permission granted. If the request towards this product fails it will be reflected in the response body as a status. Failures will include their corresponding error ID for troubleshooting.

Results are paginated – to learn more about pagination and how to work with it click [here](/Tiny-doc/tink_docs_home/resources/data-enrichment/generating-a-user-access-token-and-querying-end-user-data/#pagination).

**Example request:**

```
curl -X 'GET' \
'[external url removed]'\
  -H 'Authorization: Bearer '
  -H 'Accept: application/json'
```

**Example response:**

```
{
   "transactions": [
       ...
           "enrichedData": {
             ...
               "brandIdentification": {
                   "id": "8dc59f2d-2f17-41c6-bcce-fecf7e588065",
                   "name": "ICA",
                   "logoUri": "[external url removed]",
                   "status": {
                       "code": "SUCCESS",
                       "message": ""
                   }
               }
           },
           ...
   ],
   "nextPageToken": "QX8DAQEJTmV3Q3Vyc29yAf+AAAECAQ9PcmlnaW5hbFJlcXVlc3QBCgABEVNvcnRWYWx1ZXNMYXN0SGl0Af+CAAAAHP+BAgEBDltdaW50ZXJmYWNlIHt9Af+CAAEQAABr/4ABKAogY2M2YWEwODdkN2Y4NGU2YzgzNzI3NjQ3MTNiMGM2YjggASoCCAEBAgdmbG9hdDY0CAcA+9QN2HhCBnN0cmluZwwiACAwYmFjODgwZWZlZDM0N2EzYjg2NTA4OWExNzVkZjMxMwA=wdsyfOu4H4v0VP1CtSJ0Ly1jteh77boaw/KgK8btpDc="
}
```

Optional Parameters

Due to pagination, a maximum of 10 transactions are by default included in the response. To increase the page size (to a maximum of 100 items), or to get the next page, use the optional pageSize or pageToken query parameters. You can also filter by account IDs, category IDs and date range.

| PARAMETER | DESCRIPTION |
| --- | --- |
| pageSize | The maximum number of items to return. This endpoint will not return more than 100 items per page. Defaults to 10 items. |
| pageToken | Next page token that contains page number. |
| accountIdIn | If set, only transactions for the account ids provided will be returned. This parameter may be repeated to specify multiple account ids. |
| statusIn | If set, only transactions for the status provided will be returned. This parameter may be repeated to specify multiple status. |
| bookedDateGte | If set, will filter out transactions where the bookedDate is earlier than this date. Format is ISO-8061 date (YYYY-MM-DD). |
| bookedDateLte | If set, will filter out transactions where the bookedDate is later than this date. Format is ISO-8061 date (YYYY-MM-DD). |
| categoryId | If set, will filter out transactions where the categoryId matches. |
| categoryIdIn | If set, will filter the transactions by all the supplied categoryIds. If a parent category is supplied it will be expanded to its child categories as well. |

**Example request, filter by two account IDs:**

```
curl -H "Authorization: Bearer {USER_ACCESS_TOKEN}" \
"[external url removed]
accountIdIn=0f27b10e4e1c4956a518fb3283a0f4f4&\
accountIdIn=9b44f819df174713b38208251f397224"
```

You now have all you need in order to get and present brands for the end user.
