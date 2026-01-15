---
title: "List transactions - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/transactions/list-transactions/"
exportedAt: "2026-01-13T12:46:06.950Z"
---
To fetch a list of transactions, you must have a `user access token` with the `transactions:read` scope. Use the `user access token` to make a request to the Transactions endpoint.

Fetch a list of transactions

```
curl "[external url removed]" \
  -H 'Authorization: Bearer '
```

Send a request and you receive a list of transactions.

```
{
  "nextPageToken": "string",
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
      "categories": {
        "pfm": {
          "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
          "name": ""
        }
      },
      "dates": {
        "booked": "2020-12-15",
        "value": "2020-12-15"
      },
      "descriptions": {
        "display": "Tesco",
        "original": "TESCO STORES 3297"
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
      "types": {
        "financialInstitutionTypeCode": "DEB",
        "type": "DEFAULT"
      }
    }
  ]
}
```

**Optional Parameters**

In your request, you must provide the `user access token`. Optionally, specify query parameters to filter your results. These parameters are:

| PARAMETER | DESCRIPTION |
| --- | --- |
| accountIdIn={your\_account\_id} | Returns transactions only for a given account (this parameter may be repeated to specify multiple accounts) |
| statusIn={transaction\_status} | If set, only transactions with the given status will be returned. This parameter may be repeated to specify multiple statuses. |
| pageSize={number} | The maximum number of items to return. This endpoint will not return more than 100 transactions per page. |
| pageToken={next\_page\_token} | Return the next page of transactions (if you have set pageSize) |
| bookedDateGte={date} | Specified as the earliest booked date of transactions used for filtering and with the ISO-8061 date format (YYYY-MM-DD). If the query parameter is not provided time range will be calculated using the booked date of the earliest transaction available. |
| bookedDateLte={date} | Specified as the latest booked date of transactions used for filtering and with the ISO-8061 date format (YYYY-MM-DD). If the query parameter is not provided time range will be calculated until today. |

Request example with optional parameters

```
curl -X GET '[external url removed]' \
  -H 'Authorization: Bearer ' \
  -d 'accountIdIn=' \
  -d 'statusIn=' \
  -d 'pageSize=' \
  -d 'pageToken=' \
  -d 'bookedDateGte=' \
  -d 'bookedDateLte=' 
```
