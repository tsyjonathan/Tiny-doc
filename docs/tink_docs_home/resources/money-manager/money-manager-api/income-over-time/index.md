---
title: "Understand a user’s income over time"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/income-over-time/"
exportedAt: "2026-01-13T12:50:09.476Z"
---
**Left to spend** is a [statistic](/Tiny-doc/tink_docs_api/api/#finance-management/statistics/query-statistics) type which returns the spendable income (that is, income minus expenses).

**Left to spend average** is a [statistic](/Tiny-doc/tink_docs_api/api/#finance-management/statistics/query-statistics) type which returns the spendable income (that is, income minus expenses) average per day of the month for the last 6 monthly period.

**Safe to spend** is a [statistic](/Tiny-doc/tink_docs_api/api/#finance-management/statistics/query-statistics) type which returns the how much you can safely spend adjusting accordingly with the [recurring transactions](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/recurring-transactions) and [recurring savings goals](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals).

## Calling the Statistics Endpoint[](#calling-the-statistics-endpoint)

To retrieve the spendable income over time, query the [Statistics](/Tiny-doc/tink_docs_api/api/#finance-management/statistics/query-statistics) endpoint using an `user access` token with the `statistics:read` scope.

### left-to-spend[](#left-to-spend)

As part of the request, you need to:

1.  Set the statistics types to include `left-to-spend`
2.  Specify the desired periods to get statistics for

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer '
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04”],
    "types": ["left-to-spend"]
  }'
```

Example Response:

```
{
  "description": "2021-04-02",
  "payload": "",
  "period": "2021-04",
  "resolution": "MONTHLY_ADJUSTED",
  "type": "left-to-spend",
  "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "value": 2728.5
}
```

The `value` field returned will show the user’s spendable income for the day which is `description` field for selected period.

If you want statistics per day, specify the `resolution` property to `DAILY`.

If you want to predict values up to the current day, specify the `padResultUntilToday` option in the request.

### left-to-spend-average[](#left-to-spend-average)

As part of the request, you need to:

1.  Set the statistics types to include `left-to-spend-average`
2.  Specify the desired periods to get statistics for

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer '
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04”],
    "types": ["left-to-spend-average"]
  }'
```

Example Response:

```
{
  "description": "2021-04-02",
  "payload": "",
  "period": "2021-04",
  "resolution": "MONTHLY_ADJUSTED",
  "type": "left-to-spend-average",
  "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "value": 2728.5
}
```

The `value` field returned will show the user’s average spendable income for the day which is `description` field for selected period.

### safe-to-spend[](#safe-to-spend)

As part of the request, you need to:

1.  Set the statistics types to include `safe-to-spend`
2.  Specify the desired periods to get statistics for

Example request:

```
curl 'https://api.tink.com/api/v1/statistics/query' \
  -X POST \
  -H 'Authorization: Bearer '
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periods": ["2021-04”],
    "types": ["safe-to-spend"]
  }'
```

Example Response:

```
{
  "description": "2021-04-02",
  "payload": "",
  "period": "2021-04",
  "resolution": "MONTHLY_ADJUSTED",
  "type": "safe-to-spend",
  "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "value": 2728.5
}
```

The `value` field returned will show the user’s safe to spend amount for the day which is `description` field for selected period.
