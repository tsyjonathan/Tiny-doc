---
title: "Show a user how much they can spend"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/check-your-remaining-left-to-spend"
exportedAt: "2026-01-13T12:50:33.107Z"
---
This guide will show you how to check the left to spend amount for a given user in the current salary period.

Left to spend is a [statistic](https://docs.tink.com/api#finance-management/statistics/query-statistics) type which returns the income decreased by user expenses over time.

> **NOTE**: Be sure to follow Money Manager prerequisites before continuing with this guide.

## 1\. Setting the salary period[](#setting-the-salary-period)

The first thing you need to do is to update the user profile and input the salary date for the user. This is achieved by using the [Update user](https://docs.tink.com/api#general/user/update-user) endpoint with a `user access token` and the `user:write` scope.

Within the request, if you use the "MONTHLY\_ADJUSTED" `periodMode` you need to edit `periodAdjustedDay` to the salary date.

You can read more about periods in the [Configure Periods](https://docs.tink.com/resources/money-manager/configure-periods) page

Example request:

```
curl -X PUT 'https://api.tink.com/api/v1/user/profile' \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
--data-raw '{
        "periodAdjustedDay": 25,
        "periodMode": "MONTHLY_ADJUSTED",
    }'
```

Example response:

```
{
   "periodAdjustedDay": 25,
   "periodMode": "MONTHLY_ADJUSTED",
}
```

> **NOTE**: The response above is a shortened version of the full response

## 2\. Call Statistics endpoint[](#call-statistics-endpoint)

The next step is to query the [Statistics](https://docs.tink.com/api#finance-management/statistics/query-statistics) endpoint using an `user access token` with the `statistics:read` scope. As part of the request, we will:

-   select the current month,
-   set the `resolution` to "MONTHLY ADJUSTED",
-   set the `types` to "left-to-spend".

Example request:

```
curl -X POST 'https://api.tink.com/api/v1/statistics/query' \
-H 'Authorization: Bearer '
-H 'Content-Type: application/json' \
--data-raw '{
    "description": "2021-04-02",
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

The `value` field returned will show your current Left to Spend. You can now present this back to your end user!

> **Note**: If you want to visualise the daily left to spend for a whole period, remove the description field in the request.
