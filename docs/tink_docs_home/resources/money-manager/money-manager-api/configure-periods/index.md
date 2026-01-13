---
title: "Configure Periods - Tink Docs"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/configure-periods"
exportedAt: "2026-01-13T12:52:37.527Z"
---
Within the Statistics API data is periodized into pre-computed date-based buckets for easy access. Statistics are computed for `YEARLY`, `MONTHLY`, and `MONTHLY_ADJUSTED` buckets which represent different time periods. The `YEARLY` and `MONTHLY` buckets represent time periods that coincide with the respective calendar period. The `MONTHLY_ADJUSTED` bucket is a monthly period with the start- and end date shifted to correspond to a user defined day.

The reason for this is that people often relate to their finances based on when they receive their salary. Using Sweden as an example, salary is typically received on the 25th of each month, and with this `MONTHLY_ADJUSTED` include transactional data from the previous salary period.

The `MONTHLY_ADJUSTED` buckets also account for the fact that salaries are not expedited on non-business days, so in the Swedish example, if the 25th of a given month happens to be a Saturday, the period is adjusted to start off on Friday the 24th of the same month instead.

With `MONTHLY_ADJUSTED`, the start of a period is always adjusted backward to the period break day of previous month. If that date falls into a weekend or holiday, period break day will fallback to the last business day before it. The end of a period will be the day before the period break day in the month.

For technical reference check [Calendar documentation](https://docs.tink.com/api#general/calendar)

## Examples[](#examples)

Some examples for different resolutions and periods:

| Resolution | Period | Start date | End date |
| --- | --- | --- | --- |
| `YEARLY` | `2015` | 2015-01-01 | 2015-12-31 |
| `MONTHLY` | `2015-04` | 2015-04-01 | 2015-04-31 |
| `MONTHLY_ADJUSTED` | `2015-09` | 2015-08-25 | 2015-09-24 |
| `DAILY` | `2015-04-01` | 2015-04-01 | 2015-04-01 |

Some examples of a `MONTHLY_ADJUSTED` period with period break day on `25th`:

-   For period `2019-09` the range of the period will be `2019-08-23 -> 2019-09-24`. Since `2019-08-25` is a Sunday, so the period start is pushed back to Friday `2019-08-23`.
-   For period `2019-05` the range of the period will be `2019-04-25 -> 2019-05-23`. Since `2019-05-25` is a Saturday, so the period start of `2019-06` is fallback to `2019-05-24` while the period end of `2019-05` should be one day ahead of that.

It might not make sense to set the period break day to a low value. A period break day of value 1 would for example translate the period `2019-12` to the range `2019-11-01` and `2019-11-30`.

## Setting the period for a user[](#setting-the-period-for-a-user)

The period mode for a user can be set using the [Update user profile](https://docs.tink.com/api#general/user/update-user-profile) endpoint with a user access token that has the `user:write` scope.

Within the request, if you use the `MONTHLY_ADJUSTED` as the `periodMode` you need to also specify `periodAdjustedDay`.

Example request:

```
curl 'https://api.tink.com/api/v1/user/profile' \
  -X PUT \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "periodAdjustedDay": 25,
    "periodMode": "MONTHLY_ADJUSTED"
  }'
```

On success the response will just echo back the updated user profile:

```
{
"periodAdjustedDay": 25,
"periodMode": "MONTHLY_ADJUSTED"
}
```
