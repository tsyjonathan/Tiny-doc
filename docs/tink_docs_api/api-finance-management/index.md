---
title: "Tink Docs"
source: "https://docs.tink.com/api-finance-management"
exportedAt: "2026-01-13T13:04:28.690Z"
---
## Finance Management v1[](https://docs.tink.com/api-finance-management)

The Finance Management section contains resources for Money Manager. These include Budgets, Savings Goals, Statistics, and Insights.

## Actionable Insight[](#finance-management/actionable-insight)

An actionable insight represent some kind of actionable event or insight derived from user data. It could for instance be that a user has low balance on one of their bank accounts where the action could be to transfer money to that account. Another example could be to encourage a user to save more money by creating a budget for a specific category. Read more about it [here](https://docs.tink.com/resources/money-manager/money-manager-api/present-your-first-actionable-insight).

### The Actionable Insight model[](#finance-management/actionable-insight/the-actionable-insight-model)

createdTime `Date`

The epoch timestamp in milliseconds in UTC when the insight was created.

data `data`

description `string`

The description of the insight which can be shown to the user. This field is configurable, read more about it [here](https://docs.tink.com/resources/money-manager/money-manager-api/configure-actionable-insights).

id `string`

The unique identifier of the insight.

insightActions `array[InsightProposedActionDto]`

A list of proposed actions that the user can take in response to the insight.

title `string`

The title of the insight which can be shown to the user. This field is configurable, read more about it [here](https://docs.tink.com/resources/money-manager/money-manager-api/configure-actionable-insights).

type `string`

Conveys the meaning of the Insight. The type will also indicate the structure of the data field

userId `string` required

The unique identifier of the user that the insight belongs to.

#### data[](#finance-management/actionable-insight/the-actionable-insight-model/data)

The data that describes the archived insight.

data `object`

type `string`

The insight type. Read more about it [here](https://docs.tink.com/resources/money-manager/money-manager-api/list-of-available-insights).

#### InsightProposedActionDto[](#finance-management/actionable-insight/the-actionable-insight-model/insightproposedactiondto)

A list of proposed actions that the user can take in response to the insight.

data `data`

label `string`

The action label which can be shown to the user. This field is configurable, read more about it [here](https://docs.tink.com/resources/money-manager/money-manager-api/configure-actionable-insights).

## Archive an insight[](#finance-management/actionable-insight/archive-an-insight)

`PUT /api/v1/insights/{id}/archive`

Move an active insight to an archived state. (DEPRECATED) should use "POST /api/v1/insights/action" instead.

### Works with[](#finance-management/actionable-insight/archive-an-insight/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `insights:write` |

### Parameters[](#finance-management/actionable-insight/archive-an-insight/parameters)

| Parameter | Description |
| --- | --- |
| idrequired |  |

| Status Code | Description |
| --- | --- |
| 204 | Returns `204 No Content` for a successful operation. |
| 400 | Returns `400 Bad Request` if any of the request parameters are incorrect or missing. |
| 404 | Returns `404 Not Found` if the provided id does not correspond to an active insight. |
| 500 | Returns `500 Internal Server Error` for any unexpected error that occurs when trying to archive on insight. |

## List archived insights[](#finance-management/actionable-insight/list-archived-insights)

`GET /api/v1/insights/archived`

Lists all archived insights for the user. An insight is archived when a user takes action on it.

### Works with[](#finance-management/actionable-insight/list-archived-insights/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `insights:read` |

> Response Example

```
[
  {
    "data": {
      "data": "",
      "type": "ACCOUNT_BALANCE_LOW"
    },
    "dateArchived": "string",
    "dateInsightCreated": "string",
    "description": "The balance on your bank account x is low. \nDo you want to transfer money to this account?",
    "id": "e2b746ed27c542ce846a8d693474df21",
    "insightType": "ACCOUNT_BALANCE_LOW",
    "title": "Your balance on bank account x is low",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e"
  }
]
```

### Response: array\[ArchivedInsightDTO\][](#finance-management/actionable-insight/list-archived-insights/response-array-archivedinsightdto-)

data `[data](#tag-actionableinsight-data)`

dateArchived `Date`

The epoch timestamp in milliseconds in UTC when the insight was archived.

dateInsightCreated `Date`

The epoch timestamp in milliseconds in UTC when the insight was created.

description `string`

The description of the archived insight.

id `string`

The ID of the archived insight. This is the same ID as for the corresponding insight, before it has been archived.

insightType `string`

The type of the archived insight.

title `string`

The title of the archived insight.

userId `string` required

The ID of the user that the archived insight belongs to.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for a successful operation. |
| 500 | Returns `500 Internal Server Error` for any unexpected error that occurs when trying to fetch archived insights. |

## List insights[](#finance-management/actionable-insight/list-insights)

`GET /api/v1/insights`

Lists all insights for the user. Listing insights will automatically apply any title and description overrides [configured using the Tink Console](https://docs.tink.com/resources/money-manager/money-manager-api/configure-actionable-insights). Trying to list insights with a [userlocale](https://docs.tink.com/api#general/user/the-user-model/userprofile) that does not yet have a insight configuration will result in the insights being filtered out and not returned. This is to prevent exposing users to insights with text written in the wrong language. You can read more about configuring insights [here](https://docs.tink.com/resources/money-manager/money-manager-api/configure-actionable-insights).

### Works with[](#finance-management/actionable-insight/list-insights/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `insights:read` |

> Response Example

```
[
  {
    "createdTime": "string",
    "data": {
      "data": "",
      "type": "ACCOUNT_BALANCE_LOW"
    },
    "description": "The balance on your bank account x is low. \nDo you want to transfer money to this account?",
    "id": "e2b746ed27c542ce846a8d693474df21",
    "insightActions": [
      {
        "data": {
          "data": "",
          "type": "ACCOUNT_BALANCE_LOW"
        },
        "label": "Make transfer"
      }
    ],
    "title": "Your balance on bank account x is low",
    "type": "ACCOUNT_BALANCE_LOW",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e"
  }
]
```

### Response: array\[[ActionableInsight](#tag-actionableinsight)\][](#finance-management/actionable-insight/list-insights/response-array-actionableinsight-)

An actionable insight represent some kind of actionable event or insight derived from user data. It could for instance be that a user has low balance on one of their bank accounts where the action could be to transfer money to that account. Another example could be to encourage a user to save more money by creating a budget for a specific category. Read more about it [here](https://docs.tink.com/resources/money-manager/money-manager-api/present-your-first-actionable-insight).

See [ActionableInsight](#tag-actionableinsight) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for a successful operation. |
| 500 | Returns `500 Internal Server Error` for any unexpected error that occurs when trying to fetch insights. |

## Take action on an insight[](#finance-management/actionable-insight/take-action-on-an-insight)

`POST /api/v1/insights/action`

Report a user action on an insight and move the insight to an archived state.

### Works with[](#finance-management/actionable-insight/take-action-on-an-insight/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `insights:write` |

| Status Code | Description |
| --- | --- |
| 204 | Returns `204 No Content` for a successful operation. |
| 400 | Returns `400 Bad Request` if any of the request parameters are incorrect or missing. |
| 404 | Returns `404 Not Found` if the provided id does not correspond to an active insight. |
| 500 | Returns `500 Internal Server Error` for any unexpected error that occurs when trying to take action on an insight. |

## Budgets[](#finance-management/budgets)

A budget represents a financial target for a defined period. The budget itself is identified by certain filter/criteria (such as accounts, categories, tags or free-text) to target expenses. Defining multiple filter properties will yield an `AND` operation, and specifying multiple values of a filter property will yield an OR operation.

Depending on the use case a budget can either be recurring (`WEEK`, `MONTH` or `YEAR`) or be seen as a one-off budget (fixed `start` and `end` time period). The amount of the budget will relate to the recurring period defined by the periodicity unit for recurring budgets, or the fixed time window for a one-off budget. A budget could for example be the goal to spend at maximum 10 euros weekly on coffee.

### The Budgets model[](#finance-management/budgets/the-budgets-model)

amount `amount` required

The target amount for the budget. The currency must match the user profile currency setting.

archived `boolean`

Indicates if the budget has state archived or not.

created `integer`

The creation time of the budget expressed as UTC epoch timestamp in milliseconds

filter `filter`

The filter defining the budget and which transactions that is included in it. The configured fields of the filter are applied as logical and operator (intersection).

id `string`

The ID of the Budget

name `string`

The name of the budget

oneOffPeriodicity `BudgetOneOffPeriodicity`

Periodicity configuration for a ONE\_OFF budget.

periodicityType `string`

Tells whether the budget is recurring or one off type. Using this field it's possible to see which of the field recurringPeriodicity or oneOffPeriodicity is set.  
Values: `ONE_OFF`, `RECURRING`

recurringPeriodicity `BudgetRecurringPeriodicity`

Periodicity configuration for a RECURRING budget.

#### amount[](#finance-management/budgets/the-budgets-model/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount. The `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount. The `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### filter[](#finance-management/budgets/the-budgets-model/filter)

The filter defining the budget and which transactions that is included in it. The configured fields of the filter are applied as logical and operator (intersection).

accounts `array[BudgetFilterAccount]`

List of included accounts. Applied as logical or (union).

categories `array[BudgetFilterCategory]`

List of included categories. Applied as logical or (union).

freeTextQuery `string`

Query for a partial transaction description match.

tags `array[BudgetFilterTag]`

List of included tags. Applied as logical or (union).

#### BudgetFilterAccount[](#finance-management/budgets/the-budgets-model/budgetfilteraccount)

id `string`

The account ID.

#### BudgetFilterCategory[](#finance-management/budgets/the-budgets-model/budgetfiltercategory)

code `string`

The category code.

#### BudgetFilterTag[](#finance-management/budgets/the-budgets-model/budgetfiltertag)

key `string`

The tag key.

#### BudgetOneOffPeriodicity[](#finance-management/budgets/the-budgets-model/budgetoneoffperiodicity)

Periodicity configuration for a ONE\_OFF budget.

end `integer` required

Budget start expressed as UTC epoch timestamp in milliseconds.

start `integer` required

Budget end expressed as UTC epoch timestamp in milliseconds.

#### BudgetRecurringPeriodicity[](#finance-management/budgets/the-budgets-model/budgetrecurringperiodicity)

periodUnit `string`

Recurring periodicity unit.  
Values: `WEEK`, `MONTH`, `YEAR`

## Archive budget[](#finance-management/budgets/archive-budget)

`PUT /api/v1/budgets/{id}/archive`

Archives the specified budget.

### Works with[](#finance-management/budgets/archive-budget/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets:write` |

### Parameters[](#finance-management/budgets/archive-budget/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | Budget id |

> Response Example

```
{
  "amount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "archived": true,
  "created": 1552395986000,
  "filter": {
    "accounts": [
      {
        "id": "fe34e15244334995bd227e380fcb82fa"
      }
    ],
    "categories": [
      {
        "code": "expenses:food.coffee"
      }
    ],
    "freeTextQuery": "Monmouth Coffee",
    "tags": [
      {
        "key": "coffee"
      }
    ]
  },
  "id": "e2b746ed27c542ce846a8d693474df21",
  "name": "Coffee budget",
  "oneOffPeriodicity": {
    "end": 1549976786000,
    "start": 1552395986000
  },
  "periodicityType": "ONE_OFF",
  "recurringPeriodicity": {
    "periodUnit": "WEEK"
  }
}
```

### Response: [Budgets](#tag-budgets)[](#finance-management/budgets/archive-budget/response-budgets)

A budget represents a financial target for a defined period. The budget itself is identified by certain filter/criteria (such as accounts, categories, tags or free-text) to target expenses. Defining multiple filter properties will yield an `AND` operation, and specifying multiple values of a filter property will yield an OR operation.

Depending on the use case a budget can either be recurring (`WEEK`, `MONTH` or `YEAR`) or be seen as a one-off budget (fixed `start` and `end` time period). The amount of the budget will relate to the recurring period defined by the periodicity unit for recurring budgets, or the fixed time window for a one-off budget. A budget could for example be the goal to spend at maximum 10 euros weekly on coffee.

See [Budgets](#tag-budgets) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | Budget was archived successfully |
| 400 | If any of the request parameters is incorrect or missing |
| 401 | If the user is not authorized. |
| 404 | Budget not found |
| 500 | For any unspecified error |

## Create one-off budget[](#finance-management/budgets/create-one-off-budget)

`POST /api/v1/budgets/one-off`

Creates a budget for a specific date interval.

### Works with[](#finance-management/budgets/create-one-off-budget/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets:write` |

> Request Example

```
{
  "amount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "filter": {
    "accounts": [
      {
        "id": "fe34e15244334995bd227e380fcb82fa"
      }
    ],
    "categories": [
      {
        "code": "expenses:food.coffee"
      }
    ],
    "freeTextQuery": "Monmouth Coffee",
    "tags": [
      {
        "key": "coffee"
      }
    ]
  },
  "name": "Coffee budget",
  "oneOffPeriodicity": {
    "end": 1549976786000,
    "start": 1552395986000
  }
}
```

### Request Body: CreateOneOffBudgetRequest[](#finance-management/budgets/create-one-off-budget/request-body-createoneoffbudgetrequest)

The one off budget to be created.

amount `[amount](#tag-budgets-amount)` required

The target amount for the budget. The currency must match the user profile currency setting.

name `string`

The name of the Budget.

oneOffPeriodicity `[BudgetOneOffPeriodicity](#tag-budgets-budgetoneoffperiodicity)`

> Response Example

```
{
  "budgetSpecification": {
    "amount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "archived": true,
    "created": 1552395986000,
    "filter": {
      "accounts": [
        {
          "id": "fe34e15244334995bd227e380fcb82fa"
        }
      ],
      "categories": [
        {
          "code": "expenses:food.coffee"
        }
      ],
      "freeTextQuery": "Monmouth Coffee",
      "tags": [
        {
          "key": "coffee"
        }
      ]
    },
    "id": "e2b746ed27c542ce846a8d693474df21",
    "name": "Coffee budget",
    "oneOffPeriodicity": {
      "end": 1549976786000,
      "start": 1552395986000
    },
    "periodicityType": "ONE_OFF",
    "recurringPeriodicity": {
      "periodUnit": "WEEK"
    }
  }
}
```

### Response: CreateBudgetResponse[](#finance-management/budgets/create-one-off-budget/response-createbudgetresponse)

budgetSpecification `[Budgets](#tag-budgets)`

The created budget.

| Status Code | Description |
| --- | --- |
| 200 | A Successful response |
| 401 | If the user is not authorized. |
| 500 | For any unspecified error |

## Create recurring budget[](#finance-management/budgets/create-recurring-budget)

`POST /api/v1/budgets/recurring`

Creates a recurring budget with a set periodicity.

### Works with[](#finance-management/budgets/create-recurring-budget/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets:write` |

> Request Example

```
{
  "amount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "filter": {
    "accounts": [
      {
        "id": "fe34e15244334995bd227e380fcb82fa"
      }
    ],
    "categories": [
      {
        "code": "expenses:food.coffee"
      }
    ],
    "freeTextQuery": "Monmouth Coffee",
    "tags": [
      {
        "key": "coffee"
      }
    ]
  },
  "name": "Coffee budget",
  "recurringPeriodicity": {
    "periodUnit": "WEEK"
  }
}
```

### Request Body: CreateRecurringBudgetRequest[](#finance-management/budgets/create-recurring-budget/request-body-createrecurringbudgetrequest)

Create budget with the requested fields.

amount `[amount](#tag-budgets-amount)` required

The target amount for the budget. The currency must match the user profile currency setting.

name `string`

The name of the Budget.

recurringPeriodicity `[BudgetRecurringPeriodicity](#tag-budgets-budgetrecurringperiodicity)`

> Response Example

```
{
  "budgetSpecification": {
    "amount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "archived": true,
    "created": 1552395986000,
    "filter": {
      "accounts": [
        {
          "id": "fe34e15244334995bd227e380fcb82fa"
        }
      ],
      "categories": [
        {
          "code": "expenses:food.coffee"
        }
      ],
      "freeTextQuery": "Monmouth Coffee",
      "tags": [
        {
          "key": "coffee"
        }
      ]
    },
    "id": "e2b746ed27c542ce846a8d693474df21",
    "name": "Coffee budget",
    "oneOffPeriodicity": {
      "end": 1549976786000,
      "start": 1552395986000
    },
    "periodicityType": "ONE_OFF",
    "recurringPeriodicity": {
      "periodUnit": "WEEK"
    }
  }
}
```

### Response: CreateBudgetResponse[](#finance-management/budgets/create-recurring-budget/response-createbudgetresponse)

budgetSpecification `[Budgets](#tag-budgets)`

The created budget.

| Status Code | Description |
| --- | --- |
| 200 | A Successful response |
| 401 | If the user is not authorized. |
| 500 | For any unspecified error |

## Delete budget[](#finance-management/budgets/delete-budget)

`DELETE /api/v1/budgets/{id}`

Deletes the specified budget.

### Works with[](#finance-management/budgets/delete-budget/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets:write` |

### Parameters[](#finance-management/budgets/delete-budget/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | Budget id |

| Status Code | Description |
| --- | --- |
| 204 | Budget deleted |
| 401 | If the user is not authorized. |
| 404 | Budget not found |
| 500 | For any unspecified error |

## Get budget details[](#finance-management/budgets/get-budget-details)

`GET /api/v1/budgets/{id}/details`

Get the specified budget and its periods within the start and end dates. The date parameters are inclusive, thus specifying a date in the middle of a period will include the complete period amounts.

### Works with[](#finance-management/budgets/get-budget-details/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets:read` |

### Parameters[](#finance-management/budgets/get-budget-details/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | Budget id |

### Query Parameters[](#finance-management/budgets/get-budget-details/query-parameters)

| Parameter | Description |
| --- | --- |
| start | Date within the first period expressed as UTC epoch timestamp in milliseconds. |
| end | Date within the last period expressed as UTC epoch timestamp in milliseconds. |

> Response Example

```
{
  "averageSpentAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "budgetPeriods": [
    {
      "end": 1549976786000,
      "spentAmount": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 1050
      },
      "start": 1549976786000
    }
  ],
  "budgetSpecification": {
    "amount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "archived": true,
    "created": 1552395986000,
    "filter": {
      "accounts": [
        {
          "id": "fe34e15244334995bd227e380fcb82fa"
        }
      ],
      "categories": [
        {
          "code": "expenses:food.coffee"
        }
      ],
      "freeTextQuery": "Monmouth Coffee",
      "tags": [
        {
          "key": "coffee"
        }
      ]
    },
    "id": "e2b746ed27c542ce846a8d693474df21",
    "name": "Coffee budget",
    "oneOffPeriodicity": {
      "end": 1549976786000,
      "start": 1552395986000
    },
    "periodicityType": "ONE_OFF",
    "recurringPeriodicity": {
      "periodUnit": "WEEK"
    }
  },
  "end": 1549976786000,
  "start": 1549976786000,
  "totalSpentAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  }
}
```

### Response: GetBudgetDetailsResponse[](#finance-management/budgets/get-budget-details/response-getbudgetdetailsresponse)

averageSpentAmount `[amount](#tag-budgets-amount)` required

Average period spending for the listed periods.

budgetPeriods `array[BudgetPeriod]`

List of budget periods.

budgetSpecification `[Budgets](#tag-budgets)`

The budget.

end `integer`

Last period end expressed as UTC epoch timestamp in milliseconds.

start `integer`

First period start expressed as UTC epoch timestamp in milliseconds.

totalSpentAmount `[amount](#tag-budgets-amount)` required

Total amount spent within the listed periods.

#### BudgetPeriod[](#finance-management/budgets/get-budget-details/response-getbudgetdetailsresponse/budgetperiod)

end `integer`

Period start expressed as UTC epoch timestamp in milliseconds.

spentAmount `[amount](#tag-budgets-amount)` required

Period spent amount.

start `integer`

Period start expressed as UTC epoch timestamp in milliseconds.

| Status Code | Description |
| --- | --- |
| 200 | A Successful response |
| 401 | If the user is not authorized. |
| 404 | Budget not found |
| 500 | For any unspecified error |

## Get budget transactions[](#finance-management/budgets/get-budget-transactions)

`GET /api/v1/budgets/{id}/transactions`

List all transactions for the specified budget within the start and end date.

### Works with[](#finance-management/budgets/get-budget-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets:read` |

### Parameters[](#finance-management/budgets/get-budget-transactions/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | Budget id |

### Query Parameters[](#finance-management/budgets/get-budget-transactions/query-parameters)

| Parameter | Description |
| --- | --- |
| startrequired | Query start date expressed as UTC epoch timestamp in milliseconds. |
| endrequired | Query end date expressed as UTC epoch timestamp in milliseconds. |

> Response Example

```
{
  "transactions": [
    {
      "accountId": "325ee4ccf579450ca59d89ee54fa7e40",
      "amount": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 1050
      },
      "categoryCode": "expenses:food.coffee",
      "date": 1549976786000,
      "description": "Monmouth Coffee Company",
      "dispensableAmount": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 1050
      },
      "id": "e2b746ed27c542ce846a8d693474df21",
      "pending": true
    }
  ]
}
```

### Response: ListBudgetTransactionsResponse[](#finance-management/budgets/get-budget-transactions/response-listbudgettransactionsresponse)

transactions `array[BudgetTransaction]`

List of transactions for a budget.

#### BudgetTransaction[](#finance-management/budgets/get-budget-transactions/response-listbudgettransactionsresponse/budgettransaction)

accountId `string`

The ID of the account this transaction belongs to.

amount `[amount](#tag-budgets-amount)` required

The transaction amount.

categoryCode `string`

Category code.

date `Date`

Date of the transaction expressed as UTC epoch timestamp in milliseconds.

description `string`

Description of the transaction.

dispensableAmount `[amount](#tag-budgets-amount)` required

The dispensable amount. This amount will e.g. be reduced if the account it belongs to has ownership set to 50%.

id `string`

The ID of the transaction.

pending `boolean`

Indicates if the transaction has state pending or not.

| Status Code | Description |
| --- | --- |
| 200 | A Successful response |
| 401 | If the user is not authorized. |
| 404 | Budget not found |
| 500 | For any unspecified error |

## List budgets[](#finance-management/budgets/list-budgets)

`GET /api/v1/budgets`

List all budgets for the user.

### Works with[](#finance-management/budgets/list-budgets/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets:read` |

### Query Parameters[](#finance-management/budgets/list-budgets/query-parameters)

| Parameter | Description |
| --- | --- |
| includeArchived | Whether to include archived budgets or not in the response. |

> Response Example

```
{
  "budgetSpecifications": [
    {
      "amount": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 1050
      },
      "archived": true,
      "created": 1552395986000,
      "filter": {
        "accounts": [
          {
            "id": "fe34e15244334995bd227e380fcb82fa"
          }
        ],
        "categories": [
          {
            "code": "expenses:food.coffee"
          }
        ],
        "freeTextQuery": "Monmouth Coffee",
        "tags": [
          {
            "key": "coffee"
          }
        ]
      },
      "id": "e2b746ed27c542ce846a8d693474df21",
      "name": "Coffee budget",
      "oneOffPeriodicity": {
        "end": 1549976786000,
        "start": 1552395986000
      },
      "periodicityType": "ONE_OFF",
      "recurringPeriodicity": {
        "periodUnit": "WEEK"
      }
    }
  ]
}
```

### Response: ListBudgetSpecificationsResponse[](#finance-management/budgets/list-budgets/response-listbudgetspecificationsresponse)

budgetSpecifications `array[[Budgets](#tag-budgets)]`

List of budgets.

| Status Code | Description |
| --- | --- |
| 200 | A Successful response |
| 401 | If the user is not authorized. |
| 500 | For any unspecified error |

## List budgets with summaries[](#finance-management/budgets/list-budgets-with-summaries)

`GET /api/v1/budgets/summaries`

List all budgets for the user including current period for each budget.

### Works with[](#finance-management/budgets/list-budgets-with-summaries/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets:read` |

### Query Parameters[](#finance-management/budgets/list-budgets-with-summaries/query-parameters)

| Parameter | Description |
| --- | --- |
| includeArchived | Whether to include archived budgets or not in the response. |

> Response Example

```
{
  "budgetSummaries": [
    {
      "budgetPeriod": {
        "end": 1549976786000,
        "spentAmount": {
          "currencyCode": "EUR",
          "scale": 2,
          "unscaledValue": 1050
        },
        "start": 1549976786000
      },
      "budgetSpecification": {
        "amount": {
          "currencyCode": "EUR",
          "scale": 2,
          "unscaledValue": 1050
        },
        "archived": true,
        "created": 1552395986000,
        "filter": {
          "accounts": [
            {
              "id": "fe34e15244334995bd227e380fcb82fa"
            }
          ],
          "categories": [
            {
              "code": "expenses:food.coffee"
            }
          ],
          "freeTextQuery": "Monmouth Coffee",
          "tags": [
            {
              "key": "coffee"
            }
          ]
        },
        "id": "e2b746ed27c542ce846a8d693474df21",
        "name": "Coffee budget",
        "oneOffPeriodicity": {
          "end": 1549976786000,
          "start": 1552395986000
        },
        "periodicityType": "ONE_OFF",
        "recurringPeriodicity": {
          "periodUnit": "WEEK"
        }
      }
    }
  ]
}
```

### Response: ListBudgetWithSummariesResponse[](#finance-management/budgets/list-budgets-with-summaries/response-listbudgetwithsummariesresponse)

budgetSummaries `array[BudgetSummary]`

List of budget with summaries

#### BudgetSummary[](#finance-management/budgets/list-budgets-with-summaries/response-listbudgetwithsummariesresponse/budgetsummary)

budgetPeriod `BudgetPeriod`

The current running period.

budgetSpecification `[Budgets](#tag-budgets)`

The budget.

#### BudgetPeriod[](#finance-management/budgets/list-budgets-with-summaries/response-listbudgetwithsummariesresponse/budgetperiod)

end `integer`

Period start expressed as UTC epoch timestamp in milliseconds.

spentAmount `[amount](#tag-budgets-amount)` required

Period spent amount.

start `integer`

Period start expressed as UTC epoch timestamp in milliseconds.

| Status Code | Description |
| --- | --- |
| 200 | A Successful response |
| 401 | If the user is not authorized. |
| 500 | For any unspecified error |

## List recommended budgets[](#finance-management/budgets/list-recommended-budgets)

`GET /api/v1/budgets/recommended`

List budget recommendations based on spending patterns.

### Works with[](#finance-management/budgets/list-recommended-budgets/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets:read` |

> Response Example

```
{
  "recommendedBudgets": [
    {
      "amount": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 1050
      },
      "filter": {
        "accounts": [
          {
            "id": "fe34e15244334995bd227e380fcb82fa"
          }
        ],
        "categories": [
          {
            "code": "expenses:food.coffee"
          }
        ],
        "freeTextQuery": "Monmouth Coffee",
        "tags": [
          {
            "key": "coffee"
          }
        ]
      },
      "name": "Coffee budget",
      "recurringPeriodicity": {
        "periodUnit": "WEEK"
      }
    }
  ]
}
```

### Response: ListRecommendedBudgetResponse[](#finance-management/budgets/list-recommended-budgets/response-listrecommendedbudgetresponse)

recommendedBudgets `array[RecommendedBudget]`

List of recommended budgets.

#### RecommendedBudget[](#finance-management/budgets/list-recommended-budgets/response-listrecommendedbudgetresponse/recommendedbudget)

amount `[amount](#tag-budgets-amount)` required

The target amount for the budget. The currency will match the user profile currency setting.

name `string`

The name of the recommended Budget.

recurringPeriodicity `[BudgetRecurringPeriodicity](#tag-budgets-budgetrecurringperiodicity)`

Periodicity configuration for the recurring budget.

| Status Code | Description |
| --- | --- |
| 200 | A Successful response |
| 401 | If the user is not authorized. |
| 500 | For any unspecified error |

## Update budget[](#finance-management/budgets/update-budget)

`PUT /api/v1/budgets/{id}`

Updates the specified budget.

### Works with[](#finance-management/budgets/update-budget/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets:write` |

### Parameters[](#finance-management/budgets/update-budget/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | Budget id |

> Request Example

```
{
  "amount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "filter": {
    "accounts": [
      {
        "id": "fe34e15244334995bd227e380fcb82fa"
      }
    ],
    "categories": [
      {
        "code": "expenses:food.coffee"
      }
    ],
    "freeTextQuery": "Monmouth Coffee",
    "tags": [
      {
        "key": "coffee"
      }
    ]
  },
  "name": "Coffee budget",
  "oneOffPeriodicity": {
    "end": 1549976786000,
    "start": 1552395986000
  },
  "recurringPeriodicity": {
    "periodUnit": "WEEK"
  }
}
```

### Request Body: UpdateBudgetRequest[](#finance-management/budgets/update-budget/request-body-updatebudgetrequest)

Update the budget with the requested fields.

amount `[amount](#tag-budgets-amount)` required

The target amount for the budget. The currency must match the user profile currency setting.

name `string`

The name of the Budget.

oneOffPeriodicity `[BudgetOneOffPeriodicity](#tag-budgets-budgetoneoffperiodicity)`

recurringPeriodicity `[BudgetRecurringPeriodicity](#tag-budgets-budgetrecurringperiodicity)`

> Response Example

```
{
  "budgetSpecification": {
    "amount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "archived": true,
    "created": 1552395986000,
    "filter": {
      "accounts": [
        {
          "id": "fe34e15244334995bd227e380fcb82fa"
        }
      ],
      "categories": [
        {
          "code": "expenses:food.coffee"
        }
      ],
      "freeTextQuery": "Monmouth Coffee",
      "tags": [
        {
          "key": "coffee"
        }
      ]
    },
    "id": "e2b746ed27c542ce846a8d693474df21",
    "name": "Coffee budget",
    "oneOffPeriodicity": {
      "end": 1549976786000,
      "start": 1552395986000
    },
    "periodicityType": "ONE_OFF",
    "recurringPeriodicity": {
      "periodUnit": "WEEK"
    }
  }
}
```

### Response: UpdateBudgetResponse[](#finance-management/budgets/update-budget/response-updatebudgetresponse)

budgetSpecification `[Budgets](#tag-budgets)`

The updated budget.

| Status Code | Description |
| --- | --- |
| 200 | A Successful response |
| 400 | If any of the request parameters is incorrect or missing |
| 401 | If the user is not authorized. |
| 404 | Budget not found |
| 500 | For any unspecified error |

## Business Budgets[](#finance-management/business-budgets)

## Create Business BudgetBeta[](#finance-management/business-budgets/create-business-budget)

`POST /finance-management/v1/business-budgets`

Create Business Budget based on provided input

#### Allocation Filter logic[](#finance-management/business-budgets/create-business-budget/allocation-filter-logic)

Allocation Filters are grouped into two groups:

-   _Income_ Allocation Filters
-   _Expense_ Allocation Filters

Depending on a Business Budget type they can be treated differently:

| Budget Type | Income Allocation Filters | Expense Allocation Filters |
| --- | --- | --- |
| Income | + | \- |
| Expense | \- | + |
| Net Result | + | + |

All Allocation Filters are connected with each other using logical **OR** operator. Each Allocation Filter can contain list of following _Filter Types_:

-   Accounts
-   Categories
-   Tags

All _Filter Types_ are connected with each other using logical **AND** operator unless present. Depending on _Filter Type_, elements of each respective list are handled differently:

| Filter Type | Logical Operator | Description |
| --- | --- | --- |
| Account | OR | Each transaction must be connected with one of specified Account Ids |
| Category | OR | Each transaction must have one of specified Categories |
| Tag | AND | Each transaction must contain all of specified Tags |

During Business Budget creation, if there is no Account Ids specified in the Allocation Filter it will be autofilled with all existing Account Ids for a user at the time of creation, according to the table below.

| Budget Type | What is filled in case no Account Id is provided |
| --- | --- |
| INCOME | Income Account Filter is filled with existing Account Ids |
| EXPENSE | Expense Account Filter is filled with existing Account Ids |
| NET\_RESULT | Both Income and Expense Account Filter is filled with existing Account Ids |

#### Allocation Filter Examples:[](#finance-management/business-budgets/create-business-budget/allocation-filter-examples-)

-   Two Accounts

Payload:

```
{
    "accounts": [
        {
            "id": "738f25c79feb4bd08c1c64a80bf42136"
        },
        {
            "id": "0ffb2875bdff4f76aad022742be05cdd"
        }
    ]
}
```

Logical Expression:

```
"738f25c79feb4bd08c1c64a80bf42136"
    OR
"0ffb2875bdff4f76aad022742be05cdd"
```

-   Account and Two Categories

Payload:

```
{
    "accounts": [
        {
            "id": "738f25c79feb4bd08c1c64a80bf42136"
        }
    ],
    "categories": [
        {
            "id": "0287ecd633c04de9a182c9d0396715be"
        },
        {
            "id": "f6b7079685704162b20e0d8b765ebf88"
        }
    ]
}
```

Logical Expression:

```
"738f25c79feb4bd08c1c64a80bf42136"
    AND
(
    "0287ecd633c04de9a182c9d0396715be"
        OR
    "f6b7079685704162b20e0d8b765ebf88"
)
```

-   Three Tags

Payload:

```
{
    "tags": [
        {
            "tag": "8281de98d57f46c4a9b1ea7063a4f76a"
        },
        {
            "tag": "080322e28f0c4e5abbe856c7f3294cad"
        },
        {
            "tag": "49025318c4ed47a48d736c7ba2ddab81"
        }
    ]
}
```

Logical Expression:

```
"8281de98d57f46c4a9b1ea7063a4f76a"
    AND
"080322e28f0c4e5abbe856c7f3294cad"
    AND
"49025318c4ed47a48d736c7ba2ddab81"
```

-   Two Accounts and Two Categories and Three Tags

Payload:

```
{
    "accounts": [
        {
            "id": "738f25c79feb4bd08c1c64a80bf42136"
        },
        {
            "id": "0ffb2875-bdff-4f76-aad0-22742be05cdd"
        }
    ],
    "categories": [
        {
            "id": "0287ecd633c04de9a182c9d0396715be"
        },
        {
            "id": "f6b7079685704162b20e0d8b765ebf88"
        }
    ],
    "tags": [
        {
            "tag": "8281de98d57f46c4a9b1ea7063a4f76a"
        },
        {
            "tag": "080322e28f0c4e5abbe856c7f3294cad"
        },
        {
            "tag": "49025318c4ed47a48d736c7ba2ddab81"
        }
    ]
}
```

Logical Expression:

```
(
    "738f25c79feb4bd08c1c64a80bf42136"
        OR
    "0ffb2875bdff4f76aad022742be05cdd"
)
    AND
(
    "0287ecd633c04de9a182c9d0396715be"
        OR
    "f6b7079685704162b20e0d8b765ebf88"
)
    AND
(
    "8281de98d57f46c4a9b1ea7063a4f76a"
        AND
    "080322e28f0c4e5abbe856c7f3294cad"
        AND
    "49025318c4ed47a48d736c7ba2ddab81"
)
```

### Works with[](#finance-management/business-budgets/create-business-budget/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets-bfm` |

> Request Example

```
{
  "allocationFilters": {
    "expenseAllocationFilters": [
      {
        "accounts": [
          {
            "id": "6cfaefb5-12e1-4b2a-a74e-204bf77a2187"
          },
          {
            "id": "e9cc065f-b99a-4d59-9bc3-8ddaa5a6706b"
          }
        ],
        "categories": [
          {
            "id": "01e080b327e9483dbdf9853dbcb687ff"
          }
        ],
        "tags": [
          {
            "tag": "ticket"
          }
        ]
      }
    ],
    "incomeAllocationFilters": [
      {
        "accounts": [
          {
            "id": "6cfaefb5-12e1-4b2a-a74e-204bf77a2187"
          },
          {
            "id": "e9cc065f-b99a-4d59-9bc3-8ddaa5a6706b"
          }
        ],
        "categories": [
          {
            "id": "01e080b327e9483dbdf9853dbcb687ff"
          }
        ],
        "tags": [
          {
            "tag": "ticket"
          }
        ]
      }
    ]
  },
  "description": "Expense Budget for spendings on transport",
  "id": "5a724ea2-4eca-419e-a049-d12c127e00e3",
  "period": {
    "end": "2021-10-01",
    "start": "2021-09-01"
  },
  "recurrence": {
    "end": "2021-10-01",
    "frequency": "ONE_OFF",
    "id": "5a724ea2-4eca-419e-a049-d12c127e00e3",
    "start": "2021-09-01"
  },
  "targetAmount": {
    "currencyCode": "string",
    "value": {
      "scale": "string",
      "unscaledValue": "string"
    }
  },
  "title": "Business Trips",
  "type": "EXPENSE"
}
```

### Request Body: BusinessBudget[](#finance-management/business-budgets/create-business-budget/request-body-businessbudget)

Object definition for Business Budget

description `string`

Business Budget Description

id `string`

Business Budget ID. This field is UUID

period `Period`

Business Budget period

recurrence `BudgetRecurrence`

Business Budget Recurrence definition

targetAmount `CurrencyDenominatedAmount`

Business Budget Target amount. Only transactions with currency matching target amount will be counted towards progress. In case of an account having different currency, no progress will be calculated.

title `string`

Business Budget Title

type `BudgetType`

Business Budget Type

#### AllocationFilters[](#finance-management/business-budgets/create-business-budget/request-body-businessbudget/allocationfilters)

expenseAllocationFilters `array[AllocationFilter]`

List of Expense Allocation Filters in Business Budget

incomeAllocationFilters `array[AllocationFilter]`

List of Income Allocation Filters in Business Budget

#### AllocationFilter[](#finance-management/business-budgets/create-business-budget/request-body-businessbudget/allocationfilter)

accounts `array[AccountFilter]`

List of Account Filters for Allocation Filter in Business Budget

categories `array[CategoryFilter]`

List of Category Filters for Allocation Filter in Business Budget

tags `array[TagFilter]`

List of Tag Filters for Allocation Filter in Business Budget

#### AccountFilter[](#finance-management/business-budgets/create-business-budget/request-body-businessbudget/accountfilter)

id `string`

Account ID that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### CategoryFilter[](#finance-management/business-budgets/create-business-budget/request-body-businessbudget/categoryfilter)

id `string`

Category Id that will be used as a filter for transactions which will be counted towards Business Budget Progress

#### TagFilter[](#finance-management/business-budgets/create-business-budget/request-body-businessbudget/tagfilter)

tag `string`

Tag that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### Period[](#finance-management/business-budgets/create-business-budget/request-body-businessbudget/period)

end `Date`

Period end datetime. ISO8601 format

identity `string` readonly

String uniquely defining the period, e.g. '2006-01'

resolution `Resolution`

Resolution of the summary

start `Date`

Period start datetime. ISO8601 format

#### Resolution[](#finance-management/business-budgets/create-business-budget/request-body-businessbudget/resolution)

| Value | Description |
| --- | --- |
| RESOLUTION\_UNSPECIFIED | Default value, defines unspecified resolution |
| DAILY | Daily resolution |
| WEEKLY | Weekly resolution |
| MONTHLY | Monthly resolution |
| YEARLY | Yearly resolution |

#### BudgetRecurrence[](#finance-management/business-budgets/create-business-budget/request-body-businessbudget/budgetrecurrence)

end `string`

Business Budget Recurrence End date (inclusive). Accepted date format is `yyyy-mm-dd`

frequency `BudgetRecurrenceFrequency`

Business Budget Recurrence Frequency

id `string` readonly

Business Budget Recurrence Group ID. This field is UUID

start `string`

Business Budget Recurrence Start date (inclusive). Accepted date format is `yyyy-mm-dd`

#### BudgetRecurrenceFrequency[](#finance-management/business-budgets/create-business-budget/request-body-businessbudget/budgetrecurrencefrequency)

| Value | Description |
| --- | --- |
| UNKNOWN\_RECURRENCE\_FREQUENCY | Default value for Business Budget Recurrence Frequency |
| ONE\_OFF | One Off Business Budget Recurrence Frequency allows to create only **one** Business Budget |
| WEEKLY | Weekly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Week** in a given period. Business Budgets will be generated every **Week** starting on _start_ date until _end_ date. Each **Week** starts on the same **Weekday** as weekday for start date (regardless of a start day of **Week**). Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Weekly budget starting 2022-01-11 (Tue), and ending 2022-01-23 (Sun) will contain following budgets: 2022-01-11T00:00:00 (Tue) - 2022-01-17T23:59:59 (Mon), 2022-01-18T00:00:00 (Tue) - 2022-01-24T23:59:59 (Mon) |
| MONTHLY | Monthly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Month** in a given period. Business Budgets will be generated every **Month** starting on _start_ date until _end_ date. Each **Month** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Monthly budget starting 2022-01-11, and ending 2022-03-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-02-10T23:59:59, 2022-02-11T00:00:00 - 2022-03-10T23:59:59, 2022-03-11T00:00:00 - 2022-04-10T23:59:59, |
| QUARTERLY | Quarterly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Quarter** in a given period. Business Budgets will be generated every **Quarter** starting on _start_ date until _end_ date. Each **Quarter** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Quarterly budget starting 2022-01-11, and ending 2022-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-04-10T23:59:59, 2022-04-11T00:00:00 - 2022-07-10T23:59:59, 2022-07-11T00:00:00 - 2022-10-10T23:59:59 |
| YEARLY | Yearly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Year** in a given period. Business Budgets will be generated every **Year** starting on _start_ date until _end_ date. Each **Year** starts on the same **Day** and **Month** as day and month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Yearly budget starting 2022-01-11, and ending 2024-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2023-01-10T23:59:59, 2023-01-11T00:00:00 - 2024-01-10T23:59:59, 2024-01-11T00:00:00 - 2025-01-10T23:59:59 |

#### CurrencyDenominatedAmount[](#finance-management/business-budgets/create-business-budget/request-body-businessbudget/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/business-budgets/create-business-budget/request-body-businessbudget/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### BudgetType[](#finance-management/business-budgets/create-business-budget/request-body-businessbudget/budgettype)

| Value | Description |
| --- | --- |
| UNKNOWN\_BUDGET\_TYPE | Default value for Business Budget Type |
| EXPENSE | Expense Business Budget Type accepts only **expense** transactions as a progress towards Business Budget Target |
| INCOME | Income Business Budget Type accepts only **income** transactions as a progress towards Business Budget Target |
| NET\_RESULT | Net Result Business Budget Type accepts both **income** and **expense** transactions and calculates progress towards Business Budget Target. **NOTE**: This is the only Business Budget Type that allows Target to be equal to _0_. |

> Response Example

```
{
  "allocationFilters": {
    "expenseAllocationFilters": [
      {
        "accounts": [
          {
            "id": "6cfaefb5-12e1-4b2a-a74e-204bf77a2187"
          },
          {
            "id": "e9cc065f-b99a-4d59-9bc3-8ddaa5a6706b"
          }
        ],
        "categories": [
          {
            "id": "01e080b327e9483dbdf9853dbcb687ff"
          }
        ],
        "tags": [
          {
            "tag": "ticket"
          }
        ]
      }
    ],
    "incomeAllocationFilters": [
      {
        "accounts": [
          {
            "id": "6cfaefb5-12e1-4b2a-a74e-204bf77a2187"
          },
          {
            "id": "e9cc065f-b99a-4d59-9bc3-8ddaa5a6706b"
          }
        ],
        "categories": [
          {
            "id": "01e080b327e9483dbdf9853dbcb687ff"
          }
        ],
        "tags": [
          {
            "tag": "ticket"
          }
        ]
      }
    ]
  },
  "description": "Expense Budget for spendings on transport",
  "id": "5a724ea2-4eca-419e-a049-d12c127e00e3",
  "period": {
    "end": "2021-10-01",
    "start": "2021-09-01"
  },
  "progress": {
    "current_amount": {
      "currency_code": "SEK",
      "value": {
        "scale": 0,
        "unscaled_value": -500
      }
    },
    "days_remaining": 15,
    "status": "ON_TRACK"
  },
  "recurrence": {
    "end": "2021-10-01",
    "frequency": "ONE_OFF",
    "id": "5a724ea2-4eca-419e-a049-d12c127e00e3",
    "start": "2021-09-01"
  },
  "targetAmount": {
    "currencyCode": "string",
    "value": {
      "scale": "string",
      "unscaledValue": "string"
    }
  },
  "title": "Business Trips",
  "type": "EXPENSE"
}
```

### Response: BusinessBudget[](#finance-management/business-budgets/create-business-budget/response-businessbudget)

Object definition for Business Budget

description `string`

Business Budget Description

id `string`

Business Budget ID. This field is UUID

period `Period`

Business Budget period

progress `Progress` readonly

Business Budget Progress to completion

recurrence `BudgetRecurrence`

Business Budget Recurrence definition

targetAmount `CurrencyDenominatedAmount`

Business Budget Target amount. Only transactions with currency matching target amount will be counted towards progress. In case of an account having different currency, no progress will be calculated.

title `string`

Business Budget Title

type `BudgetType`

Business Budget Type

#### AllocationFilters[](#finance-management/business-budgets/create-business-budget/response-businessbudget/allocationfilters)

expenseAllocationFilters `array[AllocationFilter]`

List of Expense Allocation Filters in Business Budget

incomeAllocationFilters `array[AllocationFilter]`

List of Income Allocation Filters in Business Budget

#### AllocationFilter[](#finance-management/business-budgets/create-business-budget/response-businessbudget/allocationfilter)

accounts `array[AccountFilter]`

List of Account Filters for Allocation Filter in Business Budget

categories `array[CategoryFilter]`

List of Category Filters for Allocation Filter in Business Budget

tags `array[TagFilter]`

List of Tag Filters for Allocation Filter in Business Budget

#### AccountFilter[](#finance-management/business-budgets/create-business-budget/response-businessbudget/accountfilter)

id `string`

Account ID that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### CategoryFilter[](#finance-management/business-budgets/create-business-budget/response-businessbudget/categoryfilter)

id `string`

Category Id that will be used as a filter for transactions which will be counted towards Business Budget Progress

#### TagFilter[](#finance-management/business-budgets/create-business-budget/response-businessbudget/tagfilter)

tag `string`

Tag that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### Period[](#finance-management/business-budgets/create-business-budget/response-businessbudget/period)

end `Date`

Period end datetime. ISO8601 format

identity `string` readonly

String uniquely defining the period, e.g. '2006-01'

resolution `Resolution`

Resolution of the summary

start `Date`

Period start datetime. ISO8601 format

#### Resolution[](#finance-management/business-budgets/create-business-budget/response-businessbudget/resolution)

| Value | Description |
| --- | --- |
| RESOLUTION\_UNSPECIFIED | Default value, defines unspecified resolution |
| DAILY | Daily resolution |
| WEEKLY | Weekly resolution |
| MONTHLY | Monthly resolution |
| YEARLY | Yearly resolution |

#### Progress[](#finance-management/business-budgets/create-business-budget/response-businessbudget/progress)

currentAmount `CurrencyDenominatedAmount` readonly

Current Progress Amount towards Business Budget Target

daysRemaining `integer` readonly

Remaining Days until the end of a Business Budget

status `StatusIndicator` readonly

Status Indicator that defines current Business Budget state

#### CurrencyDenominatedAmount[](#finance-management/business-budgets/create-business-budget/response-businessbudget/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/business-budgets/create-business-budget/response-businessbudget/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### StatusIndicator[](#finance-management/business-budgets/create-business-budget/response-businessbudget/statusindicator)

| Value | Description |
| --- | --- |
| UNKNOWN\_STATUS\_INDICATOR | Default value for Business Budget Status Indicator |
| ACHIEVED | Achieved Business Budget Status Indicator states that Business Budget Target is already achieved |
| FAILED | Failed Business Budget Status Indicator states that Business Budget Target was not achieved in a given period |
| ON\_TRACK | On Track Business Budget Status Indicator states that current progress pace towards Business Budget Target will most likely result in **Achieved** status |
| BEHIND | Behind Business Budget Status Indicator states that current progress pace towards Business Budget Target will most likely result in **Failed** status |
| NOT\_STARTED | Not Started Business Budget Status Indicator states that specified Business Budget is not yet started |

#### BudgetRecurrence[](#finance-management/business-budgets/create-business-budget/response-businessbudget/budgetrecurrence)

end `string`

Business Budget Recurrence End date (inclusive). Accepted date format is `yyyy-mm-dd`

frequency `BudgetRecurrenceFrequency`

Business Budget Recurrence Frequency

id `string` readonly

Business Budget Recurrence Group ID. This field is UUID

start `string`

Business Budget Recurrence Start date (inclusive). Accepted date format is `yyyy-mm-dd`

#### BudgetRecurrenceFrequency[](#finance-management/business-budgets/create-business-budget/response-businessbudget/budgetrecurrencefrequency)

| Value | Description |
| --- | --- |
| UNKNOWN\_RECURRENCE\_FREQUENCY | Default value for Business Budget Recurrence Frequency |
| ONE\_OFF | One Off Business Budget Recurrence Frequency allows to create only **one** Business Budget |
| WEEKLY | Weekly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Week** in a given period. Business Budgets will be generated every **Week** starting on _start_ date until _end_ date. Each **Week** starts on the same **Weekday** as weekday for start date (regardless of a start day of **Week**). Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Weekly budget starting 2022-01-11 (Tue), and ending 2022-01-23 (Sun) will contain following budgets: 2022-01-11T00:00:00 (Tue) - 2022-01-17T23:59:59 (Mon), 2022-01-18T00:00:00 (Tue) - 2022-01-24T23:59:59 (Mon) |
| MONTHLY | Monthly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Month** in a given period. Business Budgets will be generated every **Month** starting on _start_ date until _end_ date. Each **Month** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Monthly budget starting 2022-01-11, and ending 2022-03-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-02-10T23:59:59, 2022-02-11T00:00:00 - 2022-03-10T23:59:59, 2022-03-11T00:00:00 - 2022-04-10T23:59:59, |
| QUARTERLY | Quarterly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Quarter** in a given period. Business Budgets will be generated every **Quarter** starting on _start_ date until _end_ date. Each **Quarter** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Quarterly budget starting 2022-01-11, and ending 2022-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-04-10T23:59:59, 2022-04-11T00:00:00 - 2022-07-10T23:59:59, 2022-07-11T00:00:00 - 2022-10-10T23:59:59 |
| YEARLY | Yearly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Year** in a given period. Business Budgets will be generated every **Year** starting on _start_ date until _end_ date. Each **Year** starts on the same **Day** and **Month** as day and month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Yearly budget starting 2022-01-11, and ending 2024-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2023-01-10T23:59:59, 2023-01-11T00:00:00 - 2024-01-10T23:59:59, 2024-01-11T00:00:00 - 2025-01-10T23:59:59 |

#### BudgetType[](#finance-management/business-budgets/create-business-budget/response-businessbudget/budgettype)

| Value | Description |
| --- | --- |
| UNKNOWN\_BUDGET\_TYPE | Default value for Business Budget Type |
| EXPENSE | Expense Business Budget Type accepts only **expense** transactions as a progress towards Business Budget Target |
| INCOME | Income Business Budget Type accepts only **income** transactions as a progress towards Business Budget Target |
| NET\_RESULT | Net Result Business Budget Type accepts both **income** and **expense** transactions and calculates progress towards Business Budget Target. **NOTE**: This is the only Business Budget Type that allows Target to be equal to _0_. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 500 | Internal server error |
| default | An unexpected error response. |

## Delete Business BudgetBeta[](#finance-management/business-budgets/delete-business-budget)

`DELETE /finance-management/v1/business-budgets/{budgetId}`

Delete specified Business Budget

### Works with[](#finance-management/business-budgets/delete-business-budget/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets-bfm` |

### Parameters[](#finance-management/business-budgets/delete-business-budget/parameters)

| Parameter | Description |
| --- | --- |
| budgetIdrequired | Business Budget ID. This field is UUID |

### Query Parameters[](#finance-management/business-budgets/delete-business-budget/query-parameters)

| Parameter | Description |
| --- | --- |
| propagation | Propagation Type for Business Budget Deletion. Selected propagation type applies only for Business Budgets  
in the same recurrence group.
\- SINGLE: Propagation mode: _SINGLE_. Requested change will be applied only to the specified Business Budget  
\- AFTER: Propagation mode: _AFTER_. Requested change will be applied to the specified Business Budget  
and all Business Budgets in the Recurrence that occur **after** the requested one  
\- ALL: Propagation mode: _ALL_. Requested change will be applied to all Business Budgets in Recurrence  
Values: `SINGLE`, `AFTER`, `ALL`

 |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 404 | Budget not found |
| 500 | Internal server error |
| default | An unexpected error response. |

## Get Detailed Business BudgetBeta[](#finance-management/business-budgets/get-detailed-business-budget)

`GET /finance-management/v1/business-budgets/{budgetId}`

Get provided Business Budget by provided `budget_id`

### Works with[](#finance-management/business-budgets/get-detailed-business-budget/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets-bfm` |

### Parameters[](#finance-management/business-budgets/get-detailed-business-budget/parameters)

| Parameter | Description |
| --- | --- |
| budgetIdrequired | Business Budget ID. This field is UUID |

> Response Example

```
{
  "allocationFilters": {
    "expenseAllocationFilters": [
      {
        "accounts": [
          {
            "id": "6cfaefb5-12e1-4b2a-a74e-204bf77a2187"
          },
          {
            "id": "e9cc065f-b99a-4d59-9bc3-8ddaa5a6706b"
          }
        ],
        "categories": [
          {
            "id": "01e080b327e9483dbdf9853dbcb687ff"
          }
        ],
        "tags": [
          {
            "tag": "ticket"
          }
        ]
      }
    ],
    "incomeAllocationFilters": [
      {
        "accounts": [
          {
            "id": "6cfaefb5-12e1-4b2a-a74e-204bf77a2187"
          },
          {
            "id": "e9cc065f-b99a-4d59-9bc3-8ddaa5a6706b"
          }
        ],
        "categories": [
          {
            "id": "01e080b327e9483dbdf9853dbcb687ff"
          }
        ],
        "tags": [
          {
            "tag": "ticket"
          }
        ]
      }
    ]
  },
  "description": "Expense Budget for spendings on transport",
  "id": "5a724ea2-4eca-419e-a049-d12c127e00e3",
  "period": {
    "end": "2021-10-01",
    "start": "2021-09-01"
  },
  "progress": {
    "current_amount": {
      "currency_code": "SEK",
      "value": {
        "scale": 0,
        "unscaled_value": -500
      }
    },
    "days_remaining": 15,
    "status": "ON_TRACK"
  },
  "recurrence": {
    "end": "2021-10-01",
    "frequency": "ONE_OFF",
    "id": "5a724ea2-4eca-419e-a049-d12c127e00e3",
    "start": "2021-09-01"
  },
  "targetAmount": {
    "currencyCode": "string",
    "value": {
      "scale": "string",
      "unscaledValue": "string"
    }
  },
  "title": "Business Trips",
  "type": "EXPENSE"
}
```

### Response: BusinessBudget[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget)

Object definition for Business Budget

description `string`

Business Budget Description

id `string`

Business Budget ID. This field is UUID

period `Period`

Business Budget period

progress `Progress` readonly

Business Budget Progress to completion

recurrence `BudgetRecurrence`

Business Budget Recurrence definition

targetAmount `CurrencyDenominatedAmount`

Business Budget Target amount. Only transactions with currency matching target amount will be counted towards progress. In case of an account having different currency, no progress will be calculated.

title `string`

Business Budget Title

type `BudgetType`

Business Budget Type

#### AllocationFilters[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/allocationfilters)

expenseAllocationFilters `array[AllocationFilter]`

List of Expense Allocation Filters in Business Budget

incomeAllocationFilters `array[AllocationFilter]`

List of Income Allocation Filters in Business Budget

#### AllocationFilter[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/allocationfilter)

accounts `array[AccountFilter]`

List of Account Filters for Allocation Filter in Business Budget

categories `array[CategoryFilter]`

List of Category Filters for Allocation Filter in Business Budget

tags `array[TagFilter]`

List of Tag Filters for Allocation Filter in Business Budget

#### AccountFilter[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/accountfilter)

id `string`

Account ID that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### CategoryFilter[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/categoryfilter)

id `string`

Category Id that will be used as a filter for transactions which will be counted towards Business Budget Progress

#### TagFilter[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/tagfilter)

tag `string`

Tag that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### Period[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/period)

end `Date`

Period end datetime. ISO8601 format

identity `string` readonly

String uniquely defining the period, e.g. '2006-01'

resolution `Resolution`

Resolution of the summary

start `Date`

Period start datetime. ISO8601 format

#### Resolution[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/resolution)

| Value | Description |
| --- | --- |
| RESOLUTION\_UNSPECIFIED | Default value, defines unspecified resolution |
| DAILY | Daily resolution |
| WEEKLY | Weekly resolution |
| MONTHLY | Monthly resolution |
| YEARLY | Yearly resolution |

#### Progress[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/progress)

currentAmount `CurrencyDenominatedAmount` readonly

Current Progress Amount towards Business Budget Target

daysRemaining `integer` readonly

Remaining Days until the end of a Business Budget

status `StatusIndicator` readonly

Status Indicator that defines current Business Budget state

#### CurrencyDenominatedAmount[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### StatusIndicator[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/statusindicator)

| Value | Description |
| --- | --- |
| UNKNOWN\_STATUS\_INDICATOR | Default value for Business Budget Status Indicator |
| ACHIEVED | Achieved Business Budget Status Indicator states that Business Budget Target is already achieved |
| FAILED | Failed Business Budget Status Indicator states that Business Budget Target was not achieved in a given period |
| ON\_TRACK | On Track Business Budget Status Indicator states that current progress pace towards Business Budget Target will most likely result in **Achieved** status |
| BEHIND | Behind Business Budget Status Indicator states that current progress pace towards Business Budget Target will most likely result in **Failed** status |
| NOT\_STARTED | Not Started Business Budget Status Indicator states that specified Business Budget is not yet started |

#### BudgetRecurrence[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/budgetrecurrence)

end `string`

Business Budget Recurrence End date (inclusive). Accepted date format is `yyyy-mm-dd`

frequency `BudgetRecurrenceFrequency`

Business Budget Recurrence Frequency

id `string` readonly

Business Budget Recurrence Group ID. This field is UUID

start `string`

Business Budget Recurrence Start date (inclusive). Accepted date format is `yyyy-mm-dd`

#### BudgetRecurrenceFrequency[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/budgetrecurrencefrequency)

| Value | Description |
| --- | --- |
| UNKNOWN\_RECURRENCE\_FREQUENCY | Default value for Business Budget Recurrence Frequency |
| ONE\_OFF | One Off Business Budget Recurrence Frequency allows to create only **one** Business Budget |
| WEEKLY | Weekly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Week** in a given period. Business Budgets will be generated every **Week** starting on _start_ date until _end_ date. Each **Week** starts on the same **Weekday** as weekday for start date (regardless of a start day of **Week**). Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Weekly budget starting 2022-01-11 (Tue), and ending 2022-01-23 (Sun) will contain following budgets: 2022-01-11T00:00:00 (Tue) - 2022-01-17T23:59:59 (Mon), 2022-01-18T00:00:00 (Tue) - 2022-01-24T23:59:59 (Mon) |
| MONTHLY | Monthly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Month** in a given period. Business Budgets will be generated every **Month** starting on _start_ date until _end_ date. Each **Month** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Monthly budget starting 2022-01-11, and ending 2022-03-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-02-10T23:59:59, 2022-02-11T00:00:00 - 2022-03-10T23:59:59, 2022-03-11T00:00:00 - 2022-04-10T23:59:59, |
| QUARTERLY | Quarterly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Quarter** in a given period. Business Budgets will be generated every **Quarter** starting on _start_ date until _end_ date. Each **Quarter** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Quarterly budget starting 2022-01-11, and ending 2022-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-04-10T23:59:59, 2022-04-11T00:00:00 - 2022-07-10T23:59:59, 2022-07-11T00:00:00 - 2022-10-10T23:59:59 |
| YEARLY | Yearly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Year** in a given period. Business Budgets will be generated every **Year** starting on _start_ date until _end_ date. Each **Year** starts on the same **Day** and **Month** as day and month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Yearly budget starting 2022-01-11, and ending 2024-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2023-01-10T23:59:59, 2023-01-11T00:00:00 - 2024-01-10T23:59:59, 2024-01-11T00:00:00 - 2025-01-10T23:59:59 |

#### BudgetType[](#finance-management/business-budgets/get-detailed-business-budget/response-businessbudget/budgettype)

| Value | Description |
| --- | --- |
| UNKNOWN\_BUDGET\_TYPE | Default value for Business Budget Type |
| EXPENSE | Expense Business Budget Type accepts only **expense** transactions as a progress towards Business Budget Target |
| INCOME | Income Business Budget Type accepts only **income** transactions as a progress towards Business Budget Target |
| NET\_RESULT | Net Result Business Budget Type accepts both **income** and **expense** transactions and calculates progress towards Business Budget Target. **NOTE**: This is the only Business Budget Type that allows Target to be equal to _0_. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 404 | Budget not found |
| 500 | Internal server error |
| default | An unexpected error response. |

## List Business Budget HistoryBeta[](#finance-management/business-budgets/list-business-budget-history)

`GET /finance-management/v1/business-budgets/{budgetId}/history`

List all historical Business Budgets (ones that already ended) and current one.

Returned Business Budgets are ordered by descending start date.

### Works with[](#finance-management/business-budgets/list-business-budget-history/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets-bfm` |

### Parameters[](#finance-management/business-budgets/list-business-budget-history/parameters)

| Parameter | Description |
| --- | --- |
| budgetIdrequired | Business Budget ID. This field is UUID |

### Query Parameters[](#finance-management/business-budgets/list-business-budget-history/query-parameters)

| Parameter | Description |
| --- | --- |
| pageToken | Pagination Token. Used to retrieve next page of results. Can be left empty if there are no other pages. |
| pageSize | Pagination size. Defines **max** page size for pagination purpose. |
| accountIdIn | List of account ids, if not specified results for all budgets available for given user to be returned. |

> Response Example

```
{
  "budgets": [
    {
      "allocation_filters": {
        "expense_allocation_filters": [
          {
            "accounts": [
              {
                "id": "6cfaefb5-12e1-4b2a-a74e-204bf77a2187"
              },
              {
                "id": "e9cc065f-b99a-4d59-9bc3-8ddaa5a6706b"
              }
            ],
            "categories": [
              {
                "id": "01e080b327e9483dbdf9853dbcb687ff"
              }
            ],
            "tags": [
              {
                "tag": "ticket"
              }
            ]
          }
        ],
        "income_allocation_filters": []
      },
      "description": "Expense Budget for spendings on transport",
      "id": "5a724ea2-4eca-419e-a049-d12c127e00e3",
      "period": {
        "end": "2021-10-01",
        "start": "2021-09-01"
      },
      "progress": {
        "current_amount": {
          "currency_code": "SEK",
          "value": {
            "scale": 0,
            "unscaled_value": -500
          }
        },
        "days_remaining": 15,
        "status": "ON_TRACK"
      },
      "recurrence": {
        "end": "2021-10-01",
        "frequency": "ONE_OFF",
        "id": "5a724ea2-4eca-419e-a049-d12c127e00e3",
        "start": "2021-09-01"
      },
      "target_amount": {
        "currency_code": "SEK",
        "value": {
          "scale": 0,
          "unscaled_value": -1000
        }
      },
      "title": "Business Trips",
      "type": "EXPENSE"
    }
  ],
  "nextPageToken": "string"
}
```

### Response: ListBudgetHistoryResponse[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse)

budgets `array[BusinessBudget]`

List of Business Budgets

nextPageToken `string`

Pagination Toke. Used to retrieve next page of results. Can be empty if no new pages exist.

#### BusinessBudget[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/businessbudget)

description `string`

Business Budget Description

id `string`

Business Budget ID. This field is UUID

period `Period`

Business Budget period

progress `Progress` readonly

Business Budget Progress to completion

recurrence `BudgetRecurrence`

Business Budget Recurrence definition

targetAmount `CurrencyDenominatedAmount`

Business Budget Target amount. Only transactions with currency matching target amount will be counted towards progress. In case of an account having different currency, no progress will be calculated.

title `string`

Business Budget Title

type `BudgetType`

Business Budget Type

#### AllocationFilters[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/allocationfilters)

expenseAllocationFilters `array[AllocationFilter]`

List of Expense Allocation Filters in Business Budget

incomeAllocationFilters `array[AllocationFilter]`

List of Income Allocation Filters in Business Budget

#### AllocationFilter[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/allocationfilter)

accounts `array[AccountFilter]`

List of Account Filters for Allocation Filter in Business Budget

categories `array[CategoryFilter]`

List of Category Filters for Allocation Filter in Business Budget

tags `array[TagFilter]`

List of Tag Filters for Allocation Filter in Business Budget

#### AccountFilter[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/accountfilter)

id `string`

Account ID that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### CategoryFilter[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/categoryfilter)

id `string`

Category Id that will be used as a filter for transactions which will be counted towards Business Budget Progress

#### TagFilter[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/tagfilter)

tag `string`

Tag that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### Period[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/period)

end `Date`

Period end datetime. ISO8601 format

identity `string` readonly

String uniquely defining the period, e.g. '2006-01'

resolution `Resolution`

Resolution of the summary

start `Date`

Period start datetime. ISO8601 format

#### Resolution[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/resolution)

| Value | Description |
| --- | --- |
| RESOLUTION\_UNSPECIFIED | Default value, defines unspecified resolution |
| DAILY | Daily resolution |
| WEEKLY | Weekly resolution |
| MONTHLY | Monthly resolution |
| YEARLY | Yearly resolution |

#### Progress[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/progress)

currentAmount `CurrencyDenominatedAmount` readonly

Current Progress Amount towards Business Budget Target

daysRemaining `integer` readonly

Remaining Days until the end of a Business Budget

status `StatusIndicator` readonly

Status Indicator that defines current Business Budget state

#### CurrencyDenominatedAmount[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### StatusIndicator[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/statusindicator)

| Value | Description |
| --- | --- |
| UNKNOWN\_STATUS\_INDICATOR | Default value for Business Budget Status Indicator |
| ACHIEVED | Achieved Business Budget Status Indicator states that Business Budget Target is already achieved |
| FAILED | Failed Business Budget Status Indicator states that Business Budget Target was not achieved in a given period |
| ON\_TRACK | On Track Business Budget Status Indicator states that current progress pace towards Business Budget Target will most likely result in **Achieved** status |
| BEHIND | Behind Business Budget Status Indicator states that current progress pace towards Business Budget Target will most likely result in **Failed** status |
| NOT\_STARTED | Not Started Business Budget Status Indicator states that specified Business Budget is not yet started |

#### BudgetRecurrence[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/budgetrecurrence)

end `string`

Business Budget Recurrence End date (inclusive). Accepted date format is `yyyy-mm-dd`

frequency `BudgetRecurrenceFrequency`

Business Budget Recurrence Frequency

id `string` readonly

Business Budget Recurrence Group ID. This field is UUID

start `string`

Business Budget Recurrence Start date (inclusive). Accepted date format is `yyyy-mm-dd`

#### BudgetRecurrenceFrequency[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/budgetrecurrencefrequency)

| Value | Description |
| --- | --- |
| UNKNOWN\_RECURRENCE\_FREQUENCY | Default value for Business Budget Recurrence Frequency |
| ONE\_OFF | One Off Business Budget Recurrence Frequency allows to create only **one** Business Budget |
| WEEKLY | Weekly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Week** in a given period. Business Budgets will be generated every **Week** starting on _start_ date until _end_ date. Each **Week** starts on the same **Weekday** as weekday for start date (regardless of a start day of **Week**). Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Weekly budget starting 2022-01-11 (Tue), and ending 2022-01-23 (Sun) will contain following budgets: 2022-01-11T00:00:00 (Tue) - 2022-01-17T23:59:59 (Mon), 2022-01-18T00:00:00 (Tue) - 2022-01-24T23:59:59 (Mon) |
| MONTHLY | Monthly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Month** in a given period. Business Budgets will be generated every **Month** starting on _start_ date until _end_ date. Each **Month** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Monthly budget starting 2022-01-11, and ending 2022-03-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-02-10T23:59:59, 2022-02-11T00:00:00 - 2022-03-10T23:59:59, 2022-03-11T00:00:00 - 2022-04-10T23:59:59, |
| QUARTERLY | Quarterly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Quarter** in a given period. Business Budgets will be generated every **Quarter** starting on _start_ date until _end_ date. Each **Quarter** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Quarterly budget starting 2022-01-11, and ending 2022-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-04-10T23:59:59, 2022-04-11T00:00:00 - 2022-07-10T23:59:59, 2022-07-11T00:00:00 - 2022-10-10T23:59:59 |
| YEARLY | Yearly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Year** in a given period. Business Budgets will be generated every **Year** starting on _start_ date until _end_ date. Each **Year** starts on the same **Day** and **Month** as day and month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Yearly budget starting 2022-01-11, and ending 2024-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2023-01-10T23:59:59, 2023-01-11T00:00:00 - 2024-01-10T23:59:59, 2024-01-11T00:00:00 - 2025-01-10T23:59:59 |

#### BudgetType[](#finance-management/business-budgets/list-business-budget-history/response-listbudgethistoryresponse/budgettype)

| Value | Description |
| --- | --- |
| UNKNOWN\_BUDGET\_TYPE | Default value for Business Budget Type |
| EXPENSE | Expense Business Budget Type accepts only **expense** transactions as a progress towards Business Budget Target |
| INCOME | Income Business Budget Type accepts only **income** transactions as a progress towards Business Budget Target |
| NET\_RESULT | Net Result Business Budget Type accepts both **income** and **expense** transactions and calculates progress towards Business Budget Target. **NOTE**: This is the only Business Budget Type that allows Target to be equal to _0_. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 500 | Internal server error |
| default | An unexpected error response. |

## List Business BudgetsBeta[](#finance-management/business-budgets/list-business-budgets)

`GET /finance-management/v1/business-budgets`

Lists all available Business Budgets. Additionally, response can be filtered using query parameters

### Active Budgets[](#finance-management/business-budgets/list-business-budgets/active-budgets)

In order to list only active Business Budgets, a request must be filled with both dates (_periodRangeGte_ and _periodRangeLte_) to _today_.

Example (current day = "2022-01-10")

```
{
    "periodRangeGte": "2022-01-10",
    "periodRangeLte": "2022-01-10"
}
```

### Works with[](#finance-management/business-budgets/list-business-budgets/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets-bfm` |

### Query Parameters[](#finance-management/business-budgets/list-business-budgets/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSize | Pagination size. Defines **max** page size for pagination purpose. |
| pageToken | Pagination Token. Used to retrieve next page of results. Can be left empty if there are no other pages. |
| accountIdIn | List of account ids, if not specified results for all budgets available for given user to be returned. |
| periodRangeGte | Start date (inclusive) of budgets' periods range to filter. All budgets which at least partially happen in a given range will be returned. Accepted date format is `yyyy-mm-dd`. |
| periodRangeLte | End date (inclusive) of budget's periods range to filter. All budgets which at least partially happen in a given range will be returned. Accepted date format is `yyyy-mm-dd`. |
| recurrenceGroupId | Business Budget Recurrence Group ID. This field is UUID. If specified, then only budgets with this recurrence group id are returned. |

> Response Example

```
{
  "budgets": [
    {
      "allocation_filters": {
        "expense_allocation_filters": [
          {
            "accounts": [
              "6cfaefb5-12e1-4b2a-a74e-204bf77a2187",
              "e9cc065f-b99a-4d59-9bc3-8ddaa5a6706b"
            ],
            "categories": [
              "other.other"
            ],
            "tags": [
              "ticket"
            ]
          }
        ],
        "income_allocation_filters": []
      },
      "description": "Expense Budget for spendings on transport",
      "id": "5a724ea2-4eca-419e-a049-d12c127e00e3",
      "period": {
        "end": "2021-10-01",
        "start": "2021-09-01"
      },
      "progress": {
        "current_amount": {
          "currency_code": "SEK",
          "value": {
            "scale": 0,
            "unscaled_value": -500
          }
        },
        "days_remaining": 15,
        "status": "ON_TRACK"
      },
      "recurrence": {
        "end": "2021-10-01",
        "frequency": "ONE_OFF",
        "start": "2021-09-01"
      },
      "target_amount": {
        "currency_code": "SEK",
        "value": {
          "scale": 0,
          "unscaled_value": -1000
        }
      },
      "title": "Business Trips",
      "type": "EXPENSE"
    }
  ],
  "nextPageToken": "string"
}
```

### Response: ListBudgetsResponse[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse)

budgets `array[BusinessBudget]`

List of Business Budgets

nextPageToken `string`

Pagination Token. Used to retrieve next page of results. Can be left empty if there are no other pages

#### BusinessBudget[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/businessbudget)

description `string`

Business Budget Description

id `string`

Business Budget ID. This field is UUID

period `Period`

Business Budget period

progress `Progress` readonly

Business Budget Progress to completion

recurrence `BudgetRecurrence`

Business Budget Recurrence definition

targetAmount `CurrencyDenominatedAmount`

Business Budget Target amount. Only transactions with currency matching target amount will be counted towards progress. In case of an account having different currency, no progress will be calculated.

title `string`

Business Budget Title

type `BudgetType`

Business Budget Type

#### AllocationFilters[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/allocationfilters)

expenseAllocationFilters `array[AllocationFilter]`

List of Expense Allocation Filters in Business Budget

incomeAllocationFilters `array[AllocationFilter]`

List of Income Allocation Filters in Business Budget

#### AllocationFilter[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/allocationfilter)

accounts `array[AccountFilter]`

List of Account Filters for Allocation Filter in Business Budget

categories `array[CategoryFilter]`

List of Category Filters for Allocation Filter in Business Budget

tags `array[TagFilter]`

List of Tag Filters for Allocation Filter in Business Budget

#### AccountFilter[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/accountfilter)

id `string`

Account ID that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### CategoryFilter[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/categoryfilter)

id `string`

Category Id that will be used as a filter for transactions which will be counted towards Business Budget Progress

#### TagFilter[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/tagfilter)

tag `string`

Tag that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### Period[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/period)

end `Date`

Period end datetime. ISO8601 format

identity `string` readonly

String uniquely defining the period, e.g. '2006-01'

resolution `Resolution`

Resolution of the summary

start `Date`

Period start datetime. ISO8601 format

#### Resolution[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/resolution)

| Value | Description |
| --- | --- |
| RESOLUTION\_UNSPECIFIED | Default value, defines unspecified resolution |
| DAILY | Daily resolution |
| WEEKLY | Weekly resolution |
| MONTHLY | Monthly resolution |
| YEARLY | Yearly resolution |

#### Progress[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/progress)

currentAmount `CurrencyDenominatedAmount` readonly

Current Progress Amount towards Business Budget Target

daysRemaining `integer` readonly

Remaining Days until the end of a Business Budget

status `StatusIndicator` readonly

Status Indicator that defines current Business Budget state

#### CurrencyDenominatedAmount[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### StatusIndicator[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/statusindicator)

| Value | Description |
| --- | --- |
| UNKNOWN\_STATUS\_INDICATOR | Default value for Business Budget Status Indicator |
| ACHIEVED | Achieved Business Budget Status Indicator states that Business Budget Target is already achieved |
| FAILED | Failed Business Budget Status Indicator states that Business Budget Target was not achieved in a given period |
| ON\_TRACK | On Track Business Budget Status Indicator states that current progress pace towards Business Budget Target will most likely result in **Achieved** status |
| BEHIND | Behind Business Budget Status Indicator states that current progress pace towards Business Budget Target will most likely result in **Failed** status |
| NOT\_STARTED | Not Started Business Budget Status Indicator states that specified Business Budget is not yet started |

#### BudgetRecurrence[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/budgetrecurrence)

end `string`

Business Budget Recurrence End date (inclusive). Accepted date format is `yyyy-mm-dd`

frequency `BudgetRecurrenceFrequency`

Business Budget Recurrence Frequency

id `string` readonly

Business Budget Recurrence Group ID. This field is UUID

start `string`

Business Budget Recurrence Start date (inclusive). Accepted date format is `yyyy-mm-dd`

#### BudgetRecurrenceFrequency[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/budgetrecurrencefrequency)

| Value | Description |
| --- | --- |
| UNKNOWN\_RECURRENCE\_FREQUENCY | Default value for Business Budget Recurrence Frequency |
| ONE\_OFF | One Off Business Budget Recurrence Frequency allows to create only **one** Business Budget |
| WEEKLY | Weekly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Week** in a given period. Business Budgets will be generated every **Week** starting on _start_ date until _end_ date. Each **Week** starts on the same **Weekday** as weekday for start date (regardless of a start day of **Week**). Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Weekly budget starting 2022-01-11 (Tue), and ending 2022-01-23 (Sun) will contain following budgets: 2022-01-11T00:00:00 (Tue) - 2022-01-17T23:59:59 (Mon), 2022-01-18T00:00:00 (Tue) - 2022-01-24T23:59:59 (Mon) |
| MONTHLY | Monthly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Month** in a given period. Business Budgets will be generated every **Month** starting on _start_ date until _end_ date. Each **Month** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Monthly budget starting 2022-01-11, and ending 2022-03-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-02-10T23:59:59, 2022-02-11T00:00:00 - 2022-03-10T23:59:59, 2022-03-11T00:00:00 - 2022-04-10T23:59:59, |
| QUARTERLY | Quarterly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Quarter** in a given period. Business Budgets will be generated every **Quarter** starting on _start_ date until _end_ date. Each **Quarter** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Quarterly budget starting 2022-01-11, and ending 2022-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-04-10T23:59:59, 2022-04-11T00:00:00 - 2022-07-10T23:59:59, 2022-07-11T00:00:00 - 2022-10-10T23:59:59 |
| YEARLY | Yearly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Year** in a given period. Business Budgets will be generated every **Year** starting on _start_ date until _end_ date. Each **Year** starts on the same **Day** and **Month** as day and month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Yearly budget starting 2022-01-11, and ending 2024-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2023-01-10T23:59:59, 2023-01-11T00:00:00 - 2024-01-10T23:59:59, 2024-01-11T00:00:00 - 2025-01-10T23:59:59 |

#### BudgetType[](#finance-management/business-budgets/list-business-budgets/response-listbudgetsresponse/budgettype)

| Value | Description |
| --- | --- |
| UNKNOWN\_BUDGET\_TYPE | Default value for Business Budget Type |
| EXPENSE | Expense Business Budget Type accepts only **expense** transactions as a progress towards Business Budget Target |
| INCOME | Income Business Budget Type accepts only **income** transactions as a progress towards Business Budget Target |
| NET\_RESULT | Net Result Business Budget Type accepts both **income** and **expense** transactions and calculates progress towards Business Budget Target. **NOTE**: This is the only Business Budget Type that allows Target to be equal to _0_. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 500 | Internal server error |
| default | An unexpected error response. |

## Update Business BudgetBeta[](#finance-management/business-budgets/update-business-budget)

`PATCH /finance-management/v1/business-budgets/{budgetId}`

Update Business Budget by provided `budget_id`

#### Update request limitation[](#finance-management/business-budgets/update-business-budget/update-request-limitation)

Not all changes are permitted with update request. If such change is needed, we recommend creating a new budget.

For recurrence properties, only changing the end date to later is allowed. In other words, it’s not allowed to:

-   change recurrence frequency (for example from Weekly to Monthly)
-   change start date of recurrence (as the Start date defines week day for budget start for Weekly frequency, and day of the month for budget start for Monthly frequency
-   change end date to earlier than previously set (as it will cause deletion of existing recurring budgets, and potential loss of Customer information)

### Works with[](#finance-management/business-budgets/update-business-budget/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `budgets-bfm` |

### Parameters[](#finance-management/business-budgets/update-business-budget/parameters)

| Parameter | Description |
| --- | --- |
| budgetIdrequired | Business Budget ID. This field is UUID |

### Query Parameters[](#finance-management/business-budgets/update-business-budget/query-parameters)

| Parameter | Description |
| --- | --- |
| propagation | Update Propagation Type. Selected propagation type applies only for Business Budgets  
in the same recurrence group.
\- SINGLE: Propagation mode: _SINGLE_. Requested change will be applied only to the specified Business Budget  
\- AFTER: Propagation mode: _AFTER_. Requested change will be applied to the specified Business Budget  
and all Business Budgets in the Recurrence that occur **after** the requested one  
\- ALL: Propagation mode: _ALL_. Requested change will be applied to all Business Budgets in Recurrence  
Values: `SINGLE`, `AFTER`, `ALL`

 |

> Request Example

```
{
  "allocationFilters": {
    "expenseAllocationFilters": [
      {
        "accounts": [
          {
            "id": "6cfaefb5-12e1-4b2a-a74e-204bf77a2187"
          },
          {
            "id": "e9cc065f-b99a-4d59-9bc3-8ddaa5a6706b"
          }
        ],
        "categories": [
          {
            "id": "01e080b327e9483dbdf9853dbcb687ff"
          }
        ],
        "tags": [
          {
            "tag": "ticket"
          }
        ]
      }
    ],
    "incomeAllocationFilters": [
      {
        "accounts": [
          {
            "id": "6cfaefb5-12e1-4b2a-a74e-204bf77a2187"
          },
          {
            "id": "e9cc065f-b99a-4d59-9bc3-8ddaa5a6706b"
          }
        ],
        "categories": [
          {
            "id": "01e080b327e9483dbdf9853dbcb687ff"
          }
        ],
        "tags": [
          {
            "tag": "ticket"
          }
        ]
      }
    ]
  },
  "description": "string",
  "recurrence": {
    "end": "string",
    "frequency": "UNKNOWN_RECURRENCE_FREQUENCY",
    "start": "string"
  },
  "targetAmount": {
    "currencyCode": "string",
    "value": {
      "scale": "string",
      "unscaledValue": "string"
    }
  },
  "title": "string"
}
```

### Request Body: UpdateBusinessBudgetBody[](#finance-management/business-budgets/update-business-budget/request-body-updatebusinessbudgetbody)

Business Budget Update Body.

allocationFilters `AllocationFilters`

Update value for Business Budget Allocation Filters

description `string`

Update value for Business Budget Description

recurrence `BudgetRecurrence`

Update value for Business Budget Recurrence

targetAmount `CurrencyDenominatedAmount`

Update value for Business Budget Target Amount. Only transactions with currency matching target amount will be counted towards progress. In case of an account having different currency, no progress will be calculated.

title `string`

Update value for Business Budget Title

#### AllocationFilters[](#finance-management/business-budgets/update-business-budget/request-body-updatebusinessbudgetbody/allocationfilters)

expenseAllocationFilters `array[AllocationFilter]`

List of Expense Allocation Filters in Business Budget

incomeAllocationFilters `array[AllocationFilter]`

List of Income Allocation Filters in Business Budget

#### AllocationFilter[](#finance-management/business-budgets/update-business-budget/request-body-updatebusinessbudgetbody/allocationfilter)

accounts `array[AccountFilter]`

List of Account Filters for Allocation Filter in Business Budget

categories `array[CategoryFilter]`

List of Category Filters for Allocation Filter in Business Budget

tags `array[TagFilter]`

List of Tag Filters for Allocation Filter in Business Budget

#### AccountFilter[](#finance-management/business-budgets/update-business-budget/request-body-updatebusinessbudgetbody/accountfilter)

id `string`

Account ID that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### CategoryFilter[](#finance-management/business-budgets/update-business-budget/request-body-updatebusinessbudgetbody/categoryfilter)

id `string`

Category Id that will be used as a filter for transactions which will be counted towards Business Budget Progress

#### TagFilter[](#finance-management/business-budgets/update-business-budget/request-body-updatebusinessbudgetbody/tagfilter)

tag `string`

Tag that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### BudgetRecurrence[](#finance-management/business-budgets/update-business-budget/request-body-updatebusinessbudgetbody/budgetrecurrence)

end `string`

Business Budget Recurrence End date (inclusive). Accepted date format is `yyyy-mm-dd`

frequency `BudgetRecurrenceFrequency`

Business Budget Recurrence Frequency

id `string` readonly

Business Budget Recurrence Group ID. This field is UUID

start `string`

Business Budget Recurrence Start date (inclusive). Accepted date format is `yyyy-mm-dd`

#### BudgetRecurrenceFrequency[](#finance-management/business-budgets/update-business-budget/request-body-updatebusinessbudgetbody/budgetrecurrencefrequency)

| Value | Description |
| --- | --- |
| UNKNOWN\_RECURRENCE\_FREQUENCY | Default value for Business Budget Recurrence Frequency |
| ONE\_OFF | One Off Business Budget Recurrence Frequency allows to create only **one** Business Budget |
| WEEKLY | Weekly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Week** in a given period. Business Budgets will be generated every **Week** starting on _start_ date until _end_ date. Each **Week** starts on the same **Weekday** as weekday for start date (regardless of a start day of **Week**). Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Weekly budget starting 2022-01-11 (Tue), and ending 2022-01-23 (Sun) will contain following budgets: 2022-01-11T00:00:00 (Tue) - 2022-01-17T23:59:59 (Mon), 2022-01-18T00:00:00 (Tue) - 2022-01-24T23:59:59 (Mon) |
| MONTHLY | Monthly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Month** in a given period. Business Budgets will be generated every **Month** starting on _start_ date until _end_ date. Each **Month** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Monthly budget starting 2022-01-11, and ending 2022-03-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-02-10T23:59:59, 2022-02-11T00:00:00 - 2022-03-10T23:59:59, 2022-03-11T00:00:00 - 2022-04-10T23:59:59, |
| QUARTERLY | Quarterly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Quarter** in a given period. Business Budgets will be generated every **Quarter** starting on _start_ date until _end_ date. Each **Quarter** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Quarterly budget starting 2022-01-11, and ending 2022-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-04-10T23:59:59, 2022-04-11T00:00:00 - 2022-07-10T23:59:59, 2022-07-11T00:00:00 - 2022-10-10T23:59:59 |
| YEARLY | Yearly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Year** in a given period. Business Budgets will be generated every **Year** starting on _start_ date until _end_ date. Each **Year** starts on the same **Day** and **Month** as day and month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Yearly budget starting 2022-01-11, and ending 2024-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2023-01-10T23:59:59, 2023-01-11T00:00:00 - 2024-01-10T23:59:59, 2024-01-11T00:00:00 - 2025-01-10T23:59:59 |

#### CurrencyDenominatedAmount[](#finance-management/business-budgets/update-business-budget/request-body-updatebusinessbudgetbody/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/business-budgets/update-business-budget/request-body-updatebusinessbudgetbody/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

> Response Example

```
{
  "allocationFilters": {
    "expenseAllocationFilters": [
      {
        "accounts": [
          {
            "id": "6cfaefb5-12e1-4b2a-a74e-204bf77a2187"
          },
          {
            "id": "e9cc065f-b99a-4d59-9bc3-8ddaa5a6706b"
          }
        ],
        "categories": [
          {
            "id": "01e080b327e9483dbdf9853dbcb687ff"
          }
        ],
        "tags": [
          {
            "tag": "ticket"
          }
        ]
      }
    ],
    "incomeAllocationFilters": [
      {
        "accounts": [
          {
            "id": "6cfaefb5-12e1-4b2a-a74e-204bf77a2187"
          },
          {
            "id": "e9cc065f-b99a-4d59-9bc3-8ddaa5a6706b"
          }
        ],
        "categories": [
          {
            "id": "01e080b327e9483dbdf9853dbcb687ff"
          }
        ],
        "tags": [
          {
            "tag": "ticket"
          }
        ]
      }
    ]
  },
  "description": "Expense Budget for spendings on transport",
  "id": "5a724ea2-4eca-419e-a049-d12c127e00e3",
  "period": {
    "end": "2021-10-01",
    "start": "2021-09-01"
  },
  "progress": {
    "current_amount": {
      "currency_code": "SEK",
      "value": {
        "scale": 0,
        "unscaled_value": -500
      }
    },
    "days_remaining": 15,
    "status": "ON_TRACK"
  },
  "recurrence": {
    "end": "2021-10-01",
    "frequency": "ONE_OFF",
    "id": "5a724ea2-4eca-419e-a049-d12c127e00e3",
    "start": "2021-09-01"
  },
  "targetAmount": {
    "currencyCode": "string",
    "value": {
      "scale": "string",
      "unscaledValue": "string"
    }
  },
  "title": "Business Trips",
  "type": "EXPENSE"
}
```

### Response: BusinessBudget[](#finance-management/business-budgets/update-business-budget/response-businessbudget)

Object definition for Business Budget

description `string`

Business Budget Description

id `string`

Business Budget ID. This field is UUID

period `Period`

Business Budget period

progress `Progress` readonly

Business Budget Progress to completion

recurrence `BudgetRecurrence`

Business Budget Recurrence definition

targetAmount `CurrencyDenominatedAmount`

Business Budget Target amount. Only transactions with currency matching target amount will be counted towards progress. In case of an account having different currency, no progress will be calculated.

title `string`

Business Budget Title

type `BudgetType`

Business Budget Type

#### AllocationFilters[](#finance-management/business-budgets/update-business-budget/response-businessbudget/allocationfilters)

expenseAllocationFilters `array[AllocationFilter]`

List of Expense Allocation Filters in Business Budget

incomeAllocationFilters `array[AllocationFilter]`

List of Income Allocation Filters in Business Budget

#### AllocationFilter[](#finance-management/business-budgets/update-business-budget/response-businessbudget/allocationfilter)

accounts `array[AccountFilter]`

List of Account Filters for Allocation Filter in Business Budget

categories `array[CategoryFilter]`

List of Category Filters for Allocation Filter in Business Budget

tags `array[TagFilter]`

List of Tag Filters for Allocation Filter in Business Budget

#### AccountFilter[](#finance-management/business-budgets/update-business-budget/response-businessbudget/accountfilter)

id `string`

Account ID that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### CategoryFilter[](#finance-management/business-budgets/update-business-budget/response-businessbudget/categoryfilter)

id `string`

Category Id that will be used as a filter for transactions which will be counted towards Business Budget Progress

#### TagFilter[](#finance-management/business-budgets/update-business-budget/response-businessbudget/tagfilter)

tag `string`

Tag that will be used as a filter for transactions which should be included as a progress towards a Business Budget goal

#### Period[](#finance-management/business-budgets/update-business-budget/response-businessbudget/period)

end `Date`

Period end datetime. ISO8601 format

identity `string` readonly

String uniquely defining the period, e.g. '2006-01'

resolution `Resolution`

Resolution of the summary

start `Date`

Period start datetime. ISO8601 format

#### Resolution[](#finance-management/business-budgets/update-business-budget/response-businessbudget/resolution)

| Value | Description |
| --- | --- |
| RESOLUTION\_UNSPECIFIED | Default value, defines unspecified resolution |
| DAILY | Daily resolution |
| WEEKLY | Weekly resolution |
| MONTHLY | Monthly resolution |
| YEARLY | Yearly resolution |

#### Progress[](#finance-management/business-budgets/update-business-budget/response-businessbudget/progress)

currentAmount `CurrencyDenominatedAmount` readonly

Current Progress Amount towards Business Budget Target

daysRemaining `integer` readonly

Remaining Days until the end of a Business Budget

status `StatusIndicator` readonly

Status Indicator that defines current Business Budget state

#### CurrencyDenominatedAmount[](#finance-management/business-budgets/update-business-budget/response-businessbudget/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/business-budgets/update-business-budget/response-businessbudget/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### StatusIndicator[](#finance-management/business-budgets/update-business-budget/response-businessbudget/statusindicator)

| Value | Description |
| --- | --- |
| UNKNOWN\_STATUS\_INDICATOR | Default value for Business Budget Status Indicator |
| ACHIEVED | Achieved Business Budget Status Indicator states that Business Budget Target is already achieved |
| FAILED | Failed Business Budget Status Indicator states that Business Budget Target was not achieved in a given period |
| ON\_TRACK | On Track Business Budget Status Indicator states that current progress pace towards Business Budget Target will most likely result in **Achieved** status |
| BEHIND | Behind Business Budget Status Indicator states that current progress pace towards Business Budget Target will most likely result in **Failed** status |
| NOT\_STARTED | Not Started Business Budget Status Indicator states that specified Business Budget is not yet started |

#### BudgetRecurrence[](#finance-management/business-budgets/update-business-budget/response-businessbudget/budgetrecurrence)

end `string`

Business Budget Recurrence End date (inclusive). Accepted date format is `yyyy-mm-dd`

frequency `BudgetRecurrenceFrequency`

Business Budget Recurrence Frequency

id `string` readonly

Business Budget Recurrence Group ID. This field is UUID

start `string`

Business Budget Recurrence Start date (inclusive). Accepted date format is `yyyy-mm-dd`

#### BudgetRecurrenceFrequency[](#finance-management/business-budgets/update-business-budget/response-businessbudget/budgetrecurrencefrequency)

| Value | Description |
| --- | --- |
| UNKNOWN\_RECURRENCE\_FREQUENCY | Default value for Business Budget Recurrence Frequency |
| ONE\_OFF | One Off Business Budget Recurrence Frequency allows to create only **one** Business Budget |
| WEEKLY | Weekly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Week** in a given period. Business Budgets will be generated every **Week** starting on _start_ date until _end_ date. Each **Week** starts on the same **Weekday** as weekday for start date (regardless of a start day of **Week**). Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Weekly budget starting 2022-01-11 (Tue), and ending 2022-01-23 (Sun) will contain following budgets: 2022-01-11T00:00:00 (Tue) - 2022-01-17T23:59:59 (Mon), 2022-01-18T00:00:00 (Tue) - 2022-01-24T23:59:59 (Mon) |
| MONTHLY | Monthly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Month** in a given period. Business Budgets will be generated every **Month** starting on _start_ date until _end_ date. Each **Month** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Monthly budget starting 2022-01-11, and ending 2022-03-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-02-10T23:59:59, 2022-02-11T00:00:00 - 2022-03-10T23:59:59, 2022-03-11T00:00:00 - 2022-04-10T23:59:59, |
| QUARTERLY | Quarterly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Quarter** in a given period. Business Budgets will be generated every **Quarter** starting on _start_ date until _end_ date. Each **Quarter** starts on the same **Day** as day of the month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Quarterly budget starting 2022-01-11, and ending 2022-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2022-04-10T23:59:59, 2022-04-11T00:00:00 - 2022-07-10T23:59:59, 2022-07-11T00:00:00 - 2022-10-10T23:59:59 |
| YEARLY | Yearly Business Budget Recurrence Frequency allows to create Recurring Business Budgets for every **Year** in a given period. Business Budgets will be generated every **Year** starting on _start_ date until _end_ date. Each **Year** starts on the same **Day** and **Month** as day and month for start date. Business Budgets are filled until Business Budget _end_ date is **AFTER** Recurrence _end_ date. Example: Recurring Yearly budget starting 2022-01-11, and ending 2024-09-23 will contain following budgets: 2022-01-11T00:00:00 - 2023-01-10T23:59:59, 2023-01-11T00:00:00 - 2024-01-10T23:59:59, 2024-01-11T00:00:00 - 2025-01-10T23:59:59 |

#### BudgetType[](#finance-management/business-budgets/update-business-budget/response-businessbudget/budgettype)

| Value | Description |
| --- | --- |
| UNKNOWN\_BUDGET\_TYPE | Default value for Business Budget Type |
| EXPENSE | Expense Business Budget Type accepts only **expense** transactions as a progress towards Business Budget Target |
| INCOME | Income Business Budget Type accepts only **income** transactions as a progress towards Business Budget Target |
| NET\_RESULT | Net Result Business Budget Type accepts both **income** and **expense** transactions and calculates progress towards Business Budget Target. **NOTE**: This is the only Business Budget Type that allows Target to be equal to _0_. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 500 | Internal server error |
| default | An unexpected error response. |

## Cash flow[](#finance-management/cash-flow)

## List cash flows summariesBeta[](#finance-management/cash-flow/list-cash-flows-summaries)

`GET /finance-management/v1/cash-flow-summaries/{resolution}`

Returns aggregated transactions information for specified length of time with requested period resolution. If period does not contain any transactions or events it will be still generated with sums equal to zero.

### Works with[](#finance-management/cash-flow/list-cash-flows-summaries/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `cash-flow` |

### Parameters[](#finance-management/cash-flow/list-cash-flows-summaries/parameters)

| Parameter | Description |
| --- | --- |
| resolutionrequired | Resolution of the summary  
Values: `RESOLUTION_UNSPECIFIED`, `DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY` |

### Query Parameters[](#finance-management/cash-flow/list-cash-flows-summaries/query-parameters)

| Parameter | Description |
| --- | --- |
| fromGterequired | Date of the earliest transaction to be returned. ISO8601 format: YYYY-MM-DD. If the date is in the middle of the period specified by the resolution, it will be adjusted to the start of the period. |
| toLterequired | Date of the latest transaction to be returned. ISO8601 format: YYYY-MM-DD. If the date is in the middle of the period specified by the resolution, it will be adjusted to the end of the period. |
| pageSize | The maximum number of items to return. |
| pageToken | The next\_page\_token value returned from a previous List request, if any. |
| accountIdIn | List of account ids, if not specified results for all available accounts for given user will be returned. |
| currencyEq | ISO 4127 currency code of transactions that are used to calculate cash flow. If not set, default user currency will be used.  
You can change it here: [https://docs.tink.com/api#general/user/update-user-profile](https://docs.tink.com/api#general/user/update-user-profile). |

> Response Example

```
{
  "nextPageToken": "",
  "summaries": [
    {
      "balances": {
        "available": {
          "currencyCode": "SEK",
          "value": {
            "scale": "0",
            "unscaledValue": "410000"
          }
        }
      },
      "cashFlows": {
        "inbound": {
          "booked": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "expected": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "pending": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          }
        },
        "outbound": {
          "booked": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "expected": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "pending": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          }
        }
      },
      "period": {
        "end": "2021-06-06T23:59:59.999999999Z",
        "identity": "2021-W22",
        "resolution": "WEEKLY",
        "start": "2021-05-31T00:00:00Z"
      }
    },
    {
      "balances": {
        "available": {
          "currencyCode": "SEK",
          "value": {
            "scale": "0",
            "unscaledValue": "410000"
          }
        }
      },
      "cashFlows": {
        "inbound": {
          "booked": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "expected": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "pending": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          }
        },
        "outbound": {
          "booked": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "expected": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "pending": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          }
        }
      },
      "period": {
        "end": "2021-06-13T23:59:59.999999999Z",
        "identity": "2021-W23",
        "resolution": "WEEKLY",
        "start": "2021-06-07T00:00:00Z"
      }
    },
    {
      "balances": {
        "available": {
          "currencyCode": "SEK",
          "value": {
            "scale": "0",
            "unscaledValue": "410000"
          }
        }
      },
      "cashFlows": {
        "inbound": {
          "booked": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "expected": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "pending": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          }
        },
        "outbound": {
          "booked": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "expected": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "pending": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          }
        }
      },
      "period": {
        "end": "2021-06-20T23:59:59.999999999Z",
        "identity": "2021-W24",
        "resolution": "WEEKLY",
        "start": "2021-06-14T00:00:00Z"
      }
    },
    {
      "balances": {
        "available": {
          "currencyCode": "SEK",
          "value": {
            "scale": "0",
            "unscaledValue": "410000"
          }
        }
      },
      "cashFlows": {
        "inbound": {
          "booked": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "expected": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "pending": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          }
        },
        "outbound": {
          "booked": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "expected": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "pending": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          }
        }
      },
      "period": {
        "end": "2021-06-27T23:59:59.999999999Z",
        "identity": "2021-W25",
        "resolution": "WEEKLY",
        "start": "2021-06-21T00:00:00Z"
      }
    },
    {
      "balances": {
        "available": {
          "currencyCode": "SEK",
          "value": {
            "scale": "0",
            "unscaledValue": "410000"
          }
        }
      },
      "cashFlows": {
        "inbound": {
          "booked": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "expected": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "pending": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          }
        },
        "outbound": {
          "booked": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "expected": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          },
          "pending": {
            "currencyCode": "SEK",
            "value": {
              "scale": "0",
              "unscaledValue": "0"
            }
          }
        }
      },
      "period": {
        "end": "2021-07-04T23:59:59.999999999Z",
        "identity": "2021-W26",
        "resolution": "WEEKLY",
        "start": "2021-06-28T00:00:00Z"
      }
    }
  ],
  "totalCashFlows": {
    "inbound": {
      "booked": {
        "currencyCode": "SEK",
        "value": {
          "scale": "0",
          "unscaledValue": "0"
        }
      },
      "expected": {
        "currencyCode": "SEK",
        "value": {
          "scale": "0",
          "unscaledValue": "0"
        }
      },
      "pending": {
        "currencyCode": "SEK",
        "value": {
          "scale": "0",
          "unscaledValue": "0"
        }
      }
    },
    "outbound": {
      "booked": {
        "currencyCode": "SEK",
        "value": {
          "scale": "0",
          "unscaledValue": "0"
        }
      },
      "expected": {
        "currencyCode": "SEK",
        "value": {
          "scale": "0",
          "unscaledValue": "0"
        }
      },
      "pending": {
        "currencyCode": "SEK",
        "value": {
          "scale": "0",
          "unscaledValue": "0"
        }
      }
    }
  }
}
```

### Response: ListCashFlowSummariesResponse[](#finance-management/cash-flow/list-cash-flows-summaries/response-listcashflowsummariesresponse)

nextPageToken `string`

Token to retrieve the next page of results, or empty if there are no more results in the list.

summaries `array[CashFlowSummary]`

List of requested summaries

totalCashFlows `CashFlows`

Summarised cashflow over all the periods in the requested interval

#### CashFlowSummary[](#finance-management/cash-flow/list-cash-flows-summaries/response-listcashflowsummariesresponse/cashflowsummary)

balances `Balances`

Information related to balance

cashFlows `CashFlows`

Information about cash-flow

period `Period`

Period description of the summary

#### Balances[](#finance-management/cash-flow/list-cash-flows-summaries/response-listcashflowsummariesresponse/balances)

available `CurrencyDenominatedAmount`

AvailableBalance at the end of the period

projected `CurrencyDenominatedAmount`

ProjectedBalance at the end of the period

#### CurrencyDenominatedAmount[](#finance-management/cash-flow/list-cash-flows-summaries/response-listcashflowsummariesresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/cash-flow/list-cash-flows-summaries/response-listcashflowsummariesresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### CashFlows[](#finance-management/cash-flow/list-cash-flows-summaries/response-listcashflowsummariesresponse/cashflows)

inbound `CashFlow`

Inbound aggregated transactions info

outbound `CashFlow`

Outbound aggregated transactions info

#### CashFlow[](#finance-management/cash-flow/list-cash-flows-summaries/response-listcashflowsummariesresponse/cashflow)

booked `CurrencyDenominatedAmount`

comes from transactions service

expected `CurrencyDenominatedAmount`

comes from future events in the Financial-calendar

pending `CurrencyDenominatedAmount`

comes from transactions service

#### Period[](#finance-management/cash-flow/list-cash-flows-summaries/response-listcashflowsummariesresponse/period)

end `Date`

Period end datetime. ISO8601 format

identity `string` readonly

String uniquely defining the period, e.g. '2006-01'

resolution `Resolution`

Resolution of the summary

start `Date`

Period start datetime. ISO8601 format

#### Resolution[](#finance-management/cash-flow/list-cash-flows-summaries/response-listcashflowsummariesresponse/resolution)

| Value | Description |
| --- | --- |
| RESOLUTION\_UNSPECIFIED | Default value, defines unspecified resolution |
| DAILY | Daily resolution |
| WEEKLY | Weekly resolution |
| MONTHLY | Monthly resolution |
| YEARLY | Yearly resolution |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. This could for example be an invalid date or time range. Check the error message or the documentation of each field for more information. |
| 403 | The resource does not belong to the authenticated request. |
| default | An unexpected error response. |

## Cost Of Living[](#finance-management/cost-of-living)

A high level representation of a cost of living.

### The Cost Of Living model[](#finance-management/cost-of-living/the-cost-of-living-model)

accountId `string`

The ID of the account connected to the cost of living.

brand `Brand`

Response object contains the brand's name, logo and contact information

categoryId `string`

Cost of living category ID.

costOfLivingCost `Amount`

The current cost of living, including currency

costOfLivingId `string`

The ID of the cost of living.

description `string`

Description of the cost of living

startDate `string`

Starting date of the cost of living.

totalCostOfLivingSpend `Amount`

The total cost of living, including currency

#### Brand[](#finance-management/cost-of-living/the-cost-of-living-model/brand)

contact `BrandContact`

id `string`

logoUrl `string`

name `string`

#### BrandContact[](#finance-management/cost-of-living/the-cost-of-living-model/brandcontact)

website `string`

#### Amount[](#finance-management/cost-of-living/the-cost-of-living-model/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

value `AmountValue` required

#### AmountValue[](#finance-management/cost-of-living/the-cost-of-living-model/amountvalue)

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

## List cost of living transactions[](#finance-management/cost-of-living/list-cost-of-living-transactions)

`GET /finance-management/v1/cost-of-living/{costOfLivingId}/transactions`

Lists all transactions belonging to the cost of living.

### Works with[](#finance-management/cost-of-living/list-cost-of-living-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `cost-of-living:read` |

### Parameters[](#finance-management/cost-of-living/list-cost-of-living-transactions/parameters)

| Parameter | Description |
| --- | --- |
| costOfLivingIdrequired | ID of the cost of living |

### Query Parameters[](#finance-management/cost-of-living/list-cost-of-living-transactions/query-parameters)

| Parameter | Description |
| --- | --- |
| pageToken | (Optional) The first token is presented on the response of the first call if there are multiple pages. |
| pageSize | (Optional) Size of the page to fetch. |

> Response Example

```
{
  "costOfLivingId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "nextPageToken": "MQ==",
  "transactions": [
    {
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        }
      },
      "date": "2024-07-10",
      "id": "d9f134ee2eb44846a4e02990ecc8d32e"
    }
  ]
}
```

### Response: CostOfLivingTransactions[](#finance-management/cost-of-living/list-cost-of-living-transactions/response-costoflivingtransactions)

List of all transactions belonging to cost of living.

costOfLivingId `string`

nextPageToken `string`

Next page token to be used for pagination, use it with the next request parameter `page_token` to request the next page of the list.

transactions `array[Transaction]`

#### Transaction[](#finance-management/cost-of-living/list-cost-of-living-transactions/response-costoflivingtransactions/transaction)

amount `[Amount](#tag-costofliving-amount)`

The amount of the transaction, including currency

date `string`

The date of a transaction, ISO 8601 formatted date (yyyy-MM-dd).

id `string`

The ID of the transaction.

| Status Code | Description |
| --- | --- |
| 200 | List of cost of living transactions. |
| 401 | If the user is not authorized. |
| 404 | If the provided costOfLivingId is not found. |

## List user's costs of living[](#finance-management/cost-of-living/list-user-39-s-costs-of-living)

`GET /finance-management/v1/cost-of-living`

Lists all cost of living belonging to the user. Optionally it can be filtered for specific accounts.

### Works with[](#finance-management/cost-of-living/list-user-39-s-costs-of-living/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `cost-of-living:read` |

### Query Parameters[](#finance-management/cost-of-living/list-user-39-s-costs-of-living/query-parameters)

| Parameter | Description |
| --- | --- |
| accountId | (Optional) List of user accounts. |
| pageToken | (Optional) The first token is presented on the response of the first call if there are multiple pages. |
| pageSize | (Optional) Size of the page to fetch. |

> Response Example

```
{
  "costOfLiving": [
    {
      "accountId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "brand": {
        "contact": {
          "website": "string"
        },
        "id": "string",
        "logoUrl": "string",
        "name": "string"
      },
      "categoryId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "costOfLivingCost": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        }
      },
      "costOfLivingId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "description": "Mortgage",
      "startDate": "2024-07-01",
      "totalCostOfLivingSpend": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        }
      }
    }
  ],
  "nextPageToken": "MQ=="
}
```

### Response: ListCostOfLiving[](#finance-management/cost-of-living/list-user-39-s-costs-of-living/response-listcostofliving)

List of user's cost of living.

costOfLiving `array[[CostOfLiving](#tag-costofliving)]`

nextPageToken `string`

Next page token to be used for pagination, use it with the next request parameter `page_token` to request the next page of the list.

| Status Code | Description |
| --- | --- |
| 200 | List of user's costs of living. |
| 401 | If the user is not authorized. |
| 403 | If the App is not authorized. |

## Financial calendar[](#finance-management/financial-calendar)

## Add attachmentBeta[](#finance-management/financial-calendar/add-attachment)

`POST /finance-management/v1/financial-calendar-events/{calendarEventId}/attachments`

Add an attachment to the calendar event with ID equal to `calendar_event_id`

### Works with[](#finance-management/financial-calendar/add-attachment/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `financial-calendar` |

### Parameters[](#finance-management/financial-calendar/add-attachment/parameters)

| Parameter | Description |
| --- | --- |
| calendarEventIdrequired | Event ID (UUID) |

> Request Example

```
{
  "title": "attachment title",
  "url": "attachment url"
}
```

### Request Body: CalendarEventAttachment[](#finance-management/financial-calendar/add-attachment/request-body-calendareventattachment)

Attachment to be added.

The object that describes calendar event attachment.

title `string` required

Attachment title

url `string` required

Attachment url

> Response Example

```
{
  "id": "string",
  "title": "attachment title",
  "url": "attachment url"
}
```

### Response: CalendarEventAttachment[](#finance-management/financial-calendar/add-attachment/response-calendareventattachment)

The object that describes calendar event attachment.

id `string` readonly

Attachment ID (UUID)

title `string` required

Attachment title

url `string` required

Attachment url

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 404 | calendar event not found |
| 500 | Internal server error |
| default | An unexpected error response. |

## Create a new calendar eventBeta[](#finance-management/financial-calendar/create-a-new-calendar-event)

`POST /finance-management/v1/financial-calendar-events`

Create a new calendar event based on provided data.

### Event types[](#finance-management/financial-calendar/create-a-new-calendar-event/event-types)

| Type | Condition | Available Action Indicators |
| --- | --- | --- |
| Income | Positive Event Amount | `NO_REMAINING_ACTION_NEEDED` `ACTION_LATER` `NOT_COMPLETED_PAST_DUE_DATE` `COMPLETED_NOT_RECONCILED_PAST_DUE_DATE` |
| Expense | Negative Event Amount | `NO_REMAINING_ACTION_NEEDED` `ACTION_LATER` `ACTION_URGENT` `ACTION_CRITICAL` `NOT_COMPLETED_PAST_DUE_DATE` `COMPLETED_NOT_RECONCILED_PAST_DUE_DATE` |

Please keep in mind, that in case of Income event (positive amount), `Action Indicator` presents different logic.

### Income Action Indicator Meaning[](#finance-management/financial-calendar/create-a-new-calendar-event/income-action-indicator-meaning)

| Action Indicator | Meaning |
| --- | --- |
| `NO_REMAINING_ACTION_NEEDED` | Event reconciled and completed |
| `ACTION_LATER` | Action not yet past `dueDate` |
| `NOT_COMPLETED_PAST_DUE_DATE` | Event after `dueDate`, not completed and not fully reconciled |
| `COMPLETED_NOT_RECONCILED_PAST_DUE_DATE` | Event after `dueDate`, completed but not fully reconciled |

### Access Management[](#finance-management/financial-calendar/create-a-new-calendar-event/access-management)

Event access is defined on a per **accountId** basis. Not specifying **accountIds** field (or specifying it as an empty list) is equivalent to indicating that event will be accessible only by the users that had access to all accounts which were present at the moment of event creation.

### Works with[](#finance-management/financial-calendar/create-a-new-calendar-event/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `financial-calendar` |

> Request Example

```
{
  "accountIds": [
    "string",
    "string"
  ],
  "description": "Make sure everyone's invoice are paid ",
  "dueDate": "2022-07-14",
  "eventAmount": {
    "currencyCode": "EUR",
    "value": {
      "scale": 2,
      "unscaledValue": 1050
    }
  },
  "title": "Pay invoice"
}
```

### Request Body: CalendarEvent[](#finance-management/financial-calendar/create-a-new-calendar-event/request-body-calendarevent)

The object that describes calendar event.

accountIds `array[string]`

Ids of accounts which access to is required for a user to be able to view the event

description `string`

Description of the event

dueDate `string` required

Date of the event. ISO8601 format YYYY-MM-DD

eventAmount `CurrencyDenominatedAmount` required

Amount of the event with currency. All sub-parameters are required.

title `string` required

Title of the event

#### CurrencyDenominatedAmount[](#finance-management/financial-calendar/create-a-new-calendar-event/request-body-calendarevent/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/financial-calendar/create-a-new-calendar-event/request-body-calendarevent/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

> Response Example

```
{
  "accountIds": [
    "string",
    "string"
  ],
  "actionIndicator": "NO_REMAINING_ACTION_NEEDED",
  "attachments": [
    {
      "id": "string",
      "title": "attachment title",
      "url": "attachment url"
    }
  ],
  "completed": false,
  "description": "Make sure everyone's invoice are paid ",
  "dueDate": "2022-07-14",
  "eventAmount": {
    "currencyCode": "EUR",
    "value": {
      "scale": 2,
      "unscaledValue": 1050
    }
  },
  "id": "string",
  "reconciliationStatus": "NONE",
  "reconciliations": [
    {
      "transactionId": "string"
    }
  ],
  "recurringGroup": {
    "id": "string",
    "rrulePattern": "FREQ=DAILY;INTERVAL=10;COUNT=5"
  },
  "title": "Pay invoice"
}
```

### Response: CalendarEvent[](#finance-management/financial-calendar/create-a-new-calendar-event/response-calendarevent)

The object that describes calendar event.

accountIds `array[string]`

Ids of accounts which access to is required for a user to be able to view the event

actionIndicator `ActionIndicator` readonly

Flag for event that represents if any action is needed

attachments `array[CalendarEventAttachment]` readonly

List of attachments added to the event

completed `boolean` readonly

Flag indicating whether the event is completed

description `string`

Description of the event

dueDate `string` required

Date of the event. ISO8601 format YYYY-MM-DD

eventAmount `CurrencyDenominatedAmount` required

Amount of the event with currency. All sub-parameters are required.

id `string` readonly

Id of the event (UUID)

reconciliationStatus `ReconciliationStatus` readonly

Status whether the event was over, fully, partially or not reconciled

reconciliations `array[Reconciliation]` readonly

Details of transactions reconciled with the event

recurringGroup `CalendarEventRecurringGroup` readonly

Indicator of what recurring group this event belongs to (if any)

title `string` required

Title of the event

#### ActionIndicator[](#finance-management/financial-calendar/create-a-new-calendar-event/response-calendarevent/actionindicator)

| Value | Description |
| --- | --- |
| NO\_REMAINING\_ACTION\_NEEDED | Default value, event reconciled and completed |
| ACTION\_LATER | More than 7 days left to dueDate in expense events. Income events use this for all not reconciled events before due date. |
| ACTION\_URGENT | Between 4-7 days left to dueDate for expense events. |
| ACTION\_CRITICAL | Between 0-3 days left to dueDate for expense events. |
| NOT\_COMPLETED\_PAST\_DUE\_DATE | Current date is past dueDate and event is not completed |
| COMPLETED\_NOT\_RECONCILED\_PAST\_DUE\_DATE | Current date is past dueDate and event is completed but not reconciled |

#### CalendarEventAttachment[](#finance-management/financial-calendar/create-a-new-calendar-event/response-calendarevent/calendareventattachment)

id `string` readonly

Attachment ID (UUID)

title `string` required

Attachment title

url `string` required

Attachment url

#### CurrencyDenominatedAmount[](#finance-management/financial-calendar/create-a-new-calendar-event/response-calendarevent/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/financial-calendar/create-a-new-calendar-event/response-calendarevent/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### ReconciliationStatus[](#finance-management/financial-calendar/create-a-new-calendar-event/response-calendarevent/reconciliationstatus)

| Value | Description |
| --- | --- |
| NONE | Default value, event not reconciled |
| PARTIALLY | Event reconciled partially |
| FULLY | Event fully reconciled |
| OVER | Event over-reconciled |

#### Reconciliation[](#finance-management/financial-calendar/create-a-new-calendar-event/response-calendarevent/reconciliation)

transactionId `string` required

Transaction ID (UUID)

#### CalendarEventRecurringGroup[](#finance-management/financial-calendar/create-a-new-calendar-event/response-calendarevent/calendareventrecurringgroup)

id `string` readonly

Recurring Group ID (UUID)

rrulePattern `string` required

RFC-5545 Recurrence Rule pattern (RRULE) to apply to the recurrence of the event.

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | failed to parse event date |
| 500 | Internal server error |
| default | An unexpected error response. |

## Delete attachmentBeta[](#finance-management/financial-calendar/delete-attachment)

`DELETE /finance-management/v1/financial-calendar-events/{calendarEventId}/attachments/{attachmentId}`

Remove attachment given its ID `attachment_id` from event specified by `calendar_event_id`.

### Works with[](#finance-management/financial-calendar/delete-attachment/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `financial-calendar` |

### Parameters[](#finance-management/financial-calendar/delete-attachment/parameters)

| Parameter | Description |
| --- | --- |
| calendarEventIdrequired | Event ID (UUID) |
| attachmentIdrequired | Attachment ID (UUID) |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 404 | calendar event not found |
| 500 | Internal server error |
| default | An unexpected error response. |

## Delete event by idBeta[](#finance-management/financial-calendar/delete-event-by-id)

`DELETE /finance-management/v1/financial-calendar-events/{calendarEventId}`

Delete event that matches given `calendar_event_id`.

### Works with[](#finance-management/financial-calendar/delete-event-by-id/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `financial-calendar` |

### Parameters[](#finance-management/financial-calendar/delete-event-by-id/parameters)

| Parameter | Description |
| --- | --- |
| calendarEventIdrequired | Id (UUID) of the event to be deleted |

### Query Parameters[](#finance-management/financial-calendar/delete-event-by-id/query-parameters)

| Parameter | Description |
| --- | --- |
| recurring | Specify whether to delete selected, selected and future or all events.
\- SINGLE: Default value, only selected event will be affected  
\- ALL: All events in the series will be affected  
\- FUTURE: Only selected event and future events in the series will be affected  
Values: `SINGLE`, `ALL`, `FUTURE`

 |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 404 | No event found |
| 500 | Internal server error |
| default | An unexpected error response. |

## Delete reconciliation(link)Beta[](#finance-management/financial-calendar/delete-reconciliation-link-)

`DELETE /finance-management/v1/financial-calendar-events/{calendarEventId}/reconciliations/{transactionId}`

Delete reconciliation(link) between event and transaction.

### Works with[](#finance-management/financial-calendar/delete-reconciliation-link-/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `financial-calendar` |

### Parameters[](#finance-management/financial-calendar/delete-reconciliation-link-/parameters)

| Parameter | Description |
| --- | --- |
| calendarEventIdrequired | Event ID (UUID) |
| transactionIdrequired | Transaction ID (UUID) |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 404 | No event found |
| 500 | Internal server error |
| default | An unexpected error response. |

## Get Suggested transactionsBeta[](#finance-management/financial-calendar/get-suggested-transactions)

`GET /finance-management/v1/financial-calendar-events/{calendarEventId}/reconciliations/suggestions`

Get Suggested transaction ids that may be used for reconciliation of given calendar event (with `calendar_event_id`).

#### Access Management[](#finance-management/financial-calendar/get-suggested-transactions/access-management)

This endpoint will only list suggested _Transactions_ that are related to the _Accounts_ related with Financial Calendar event.

### Works with[](#finance-management/financial-calendar/get-suggested-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `financial-calendar:readonly` |

### Parameters[](#finance-management/financial-calendar/get-suggested-transactions/parameters)

| Parameter | Description |
| --- | --- |
| calendarEventIdrequired | Event ID (UUID) |

> Response Example

```
{
  "reconciliationSuggestions": [
    {
      "transactionId": "string"
    }
  ]
}
```

### Response: ListReconciliationSuggestionsResponse[](#finance-management/financial-calendar/get-suggested-transactions/response-listreconciliationsuggestionsresponse)

The response object used for listing reconciliation suggestions.

reconciliationSuggestions `array[ReconciliationSuggestion]`

#### ReconciliationSuggestion[](#finance-management/financial-calendar/get-suggested-transactions/response-listreconciliationsuggestionsresponse/reconciliationsuggestion)

transactionId `string`

Id (UUID) of transaction suggested to reconcile

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 404 | calendar event not found |
| 500 | Internal server error |
| default | An unexpected error response. |

## Get event by idBeta[](#finance-management/financial-calendar/get-event-by-id)

`GET /finance-management/v1/financial-calendar-events/{calendarEventId}`

Perform lookup in events to find the one with matching id.

Please keep in mind, that in case of Income event (positive amount), `Action Indicator` presents different logic.

### Income Action Indicator Meaning[](#finance-management/financial-calendar/get-event-by-id/income-action-indicator-meaning)

| Action Indicator | Meaning |
| --- | --- |
| `NO_REMAINING_ACTION_NEEDED` | Event reconciled and completed |
| `ACTION_LATER` | Action not yet past `dueDate` |
| `NOT_COMPLETED_PAST_DUE_DATE` | Event after `dueDate`, not completed and not fully reconciled |
| `COMPLETED_NOT_RECONCILED_PAST_DUE_DATE` | Event after `dueDate`, completed but not fully reconciled |

### Works with[](#finance-management/financial-calendar/get-event-by-id/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `financial-calendar:readonly` |

### Parameters[](#finance-management/financial-calendar/get-event-by-id/parameters)

| Parameter | Description |
| --- | --- |
| calendarEventIdrequired | Calendar event ID (UUID) |

> Response Example

```
{
  "accountIds": [
    "string",
    "string"
  ],
  "actionIndicator": "NO_REMAINING_ACTION_NEEDED",
  "attachments": [
    {
      "id": "string",
      "title": "attachment title",
      "url": "attachment url"
    }
  ],
  "completed": false,
  "description": "Make sure everyone's invoice are paid ",
  "dueDate": "2022-07-14",
  "eventAmount": {
    "currencyCode": "EUR",
    "value": {
      "scale": 2,
      "unscaledValue": 1050
    }
  },
  "id": "string",
  "reconciliationStatus": "NONE",
  "reconciliations": [
    {
      "transactionId": "string"
    }
  ],
  "recurringGroup": {
    "id": "string",
    "rrulePattern": "FREQ=DAILY;INTERVAL=10;COUNT=5"
  },
  "title": "Pay invoice"
}
```

### Response: CalendarEvent[](#finance-management/financial-calendar/get-event-by-id/response-calendarevent)

The object that describes calendar event.

accountIds `array[string]`

Ids of accounts which access to is required for a user to be able to view the event

actionIndicator `ActionIndicator` readonly

Flag for event that represents if any action is needed

attachments `array[CalendarEventAttachment]` readonly

List of attachments added to the event

completed `boolean` readonly

Flag indicating whether the event is completed

description `string`

Description of the event

dueDate `string` required

Date of the event. ISO8601 format YYYY-MM-DD

eventAmount `CurrencyDenominatedAmount` required

Amount of the event with currency. All sub-parameters are required.

id `string` readonly

Id of the event (UUID)

reconciliationStatus `ReconciliationStatus` readonly

Status whether the event was over, fully, partially or not reconciled

reconciliations `array[Reconciliation]` readonly

Details of transactions reconciled with the event

recurringGroup `CalendarEventRecurringGroup` readonly

Indicator of what recurring group this event belongs to (if any)

title `string` required

Title of the event

#### ActionIndicator[](#finance-management/financial-calendar/get-event-by-id/response-calendarevent/actionindicator)

| Value | Description |
| --- | --- |
| NO\_REMAINING\_ACTION\_NEEDED | Default value, event reconciled and completed |
| ACTION\_LATER | More than 7 days left to dueDate in expense events. Income events use this for all not reconciled events before due date. |
| ACTION\_URGENT | Between 4-7 days left to dueDate for expense events. |
| ACTION\_CRITICAL | Between 0-3 days left to dueDate for expense events. |
| NOT\_COMPLETED\_PAST\_DUE\_DATE | Current date is past dueDate and event is not completed |
| COMPLETED\_NOT\_RECONCILED\_PAST\_DUE\_DATE | Current date is past dueDate and event is completed but not reconciled |

#### CalendarEventAttachment[](#finance-management/financial-calendar/get-event-by-id/response-calendarevent/calendareventattachment)

id `string` readonly

Attachment ID (UUID)

title `string` required

Attachment title

url `string` required

Attachment url

#### CurrencyDenominatedAmount[](#finance-management/financial-calendar/get-event-by-id/response-calendarevent/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/financial-calendar/get-event-by-id/response-calendarevent/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### ReconciliationStatus[](#finance-management/financial-calendar/get-event-by-id/response-calendarevent/reconciliationstatus)

| Value | Description |
| --- | --- |
| NONE | Default value, event not reconciled |
| PARTIALLY | Event reconciled partially |
| FULLY | Event fully reconciled |
| OVER | Event over-reconciled |

#### Reconciliation[](#finance-management/financial-calendar/get-event-by-id/response-calendarevent/reconciliation)

transactionId `string` required

Transaction ID (UUID)

#### CalendarEventRecurringGroup[](#finance-management/financial-calendar/get-event-by-id/response-calendarevent/calendareventrecurringgroup)

id `string` readonly

Recurring Group ID (UUID)

rrulePattern `string` required

RFC-5545 Recurrence Rule pattern (RRULE) to apply to the recurrence of the event.

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 404 | No event found |
| 500 | Internal server error |
| default | An unexpected error response. |

## Get reconciliations(links) detailsBeta[](#finance-management/financial-calendar/get-reconciliations-links-details)

`GET /finance-management/v1/financial-calendar-events/{calendarEventId}/reconciliations/details`

Get details of reconciliations between event and transactions

### Works with[](#finance-management/financial-calendar/get-reconciliations-links-details/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `financial-calendar:readonly` |

### Parameters[](#finance-management/financial-calendar/get-reconciliations-links-details/parameters)

| Parameter | Description |
| --- | --- |
| calendarEventIdrequired | Event ID (UUID) |

> Response Example

```
{
  "reconciliationAmount": {
    "currencyCode": "EUR",
    "value": {
      "scale": "2",
      "unscaledValue": "1500"
    }
  },
  "reconciliations": [
    {
      "transactionId": "3c8067f4d8084e9687f7f9722e7909eb"
    }
  ]
}
```

### Response: CalendarEventReconciliationDetails[](#finance-management/financial-calendar/get-reconciliations-links-details/response-calendareventreconciliationdetails)

The response object that contains details about event reconciliations.

reconciliationAmount `CurrencyDenominatedAmount`

Total amount of reconciled transactions with currency

reconciliations `array[Reconciliation]`

List of event's reconciliations

#### CurrencyDenominatedAmount[](#finance-management/financial-calendar/get-reconciliations-links-details/response-calendareventreconciliationdetails/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/financial-calendar/get-reconciliations-links-details/response-calendareventreconciliationdetails/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### Reconciliation[](#finance-management/financial-calendar/get-reconciliations-links-details/response-calendareventreconciliationdetails/reconciliation)

transactionId `string` required

Transaction ID (UUID)

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 404 | No event found |
| 500 | Internal server error |
| default | An unexpected error response. |

## List events summaries for the given periodBeta[](#finance-management/financial-calendar/list-events-summaries-for-the-given-period)

`GET /finance-management/v1/financial-calendar-summaries/{resolution}`

List events that match specified resolution. Resolution parameter `resolution` is defined as an enum. Glossary: DAILY = 1 WEEKLY = 2 MONTHLY = 3 YEARLY = 4

#### Access Management[](#finance-management/financial-calendar/list-events-summaries-for-the-given-period/access-management)

Event access is defined on a per **accountId** basis. Account ids that user has access to are specified in **account\_id\_in** parameter. Event will be accessible only if user has access to ALL accounts related with the event. Not specifying **accountIds** (or is specifying it as an empty list) is equivalent to indicating that the user has access access to all currently available accounts.

### Works with[](#finance-management/financial-calendar/list-events-summaries-for-the-given-period/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `financial-calendar:readonly` |

### Parameters[](#finance-management/financial-calendar/list-events-summaries-for-the-given-period/parameters)

| Parameter | Description |
| --- | --- |
| resolutionrequired | Resolution of the summaries to list  
Values: `RESOLUTION_UNSPECIFIED`, `DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY` |

### Query Parameters[](#finance-management/financial-calendar/list-events-summaries-for-the-given-period/query-parameters)

| Parameter | Description |
| --- | --- |
| periodGterequired | Period start date. ISO8601 format YYYY-MM-DD. If the date is in the middle of the period specified by the resolution, it will be adjusted to the start of the period. |
| periodLterequired | Period end date. ISO8601 format YYYY-MM-DD. If the date is in the middle of the period specified by the resolution, it will be adjusted to the end of the period. |
| accountIdIn |  |

> Response Example

```
{
  "summaries": [
    {
      "numberOfEvents": 10,
      "numberOfEventsCompletedNotReconciledPastDueDate": 5,
      "numberOfEventsNotCompletedPastDueDate": 5,
      "numberOfEventsRequiringActionLater": 0,
      "numberOfEventsRequiringCriticalAction": 0,
      "numberOfEventsRequiringNoAction": 0,
      "numberOfEventsRequiringUrgentAction": 0,
      "period": {
        "end": "2020-07-05T23:59:59.999999999Z",
        "identity": "2020-W27",
        "resolution": "WEEKLY",
        "start": "2020-06-29T00:00:00Z"
      }
    }
  ]
}
```

### Response: ListCalendarSummariesResponse[](#finance-management/financial-calendar/list-events-summaries-for-the-given-period/response-listcalendarsummariesresponse)

The object that contains response with list of calendar summaries.

summaries `array[CalendarSummary]`

List of requested summaries

#### CalendarSummary[](#finance-management/financial-calendar/list-events-summaries-for-the-given-period/response-listcalendarsummariesresponse/calendarsummary)

numberOfEvents `integer`

Number of events in the given period

numberOfEventsCompletedNotReconciledPastDueDate `integer`

Number of events that have dueDate in the past and were marked as completed, but still not reconciled

numberOfEventsNotCompletedPastDueDate `integer`

Number of events that have dueDate in the past, but still were not marked completed

numberOfEventsRequiringActionLater `integer`

Number of events that don't require any action soon (more than 7days left to dueDate), i.e., completing or reconciliation with transaction

numberOfEventsRequiringCriticalAction `integer`

Number of events require immediate action (between 0-3 days left to dueDate), i.e., completing or reconciliation with transaction

numberOfEventsRequiringNoAction `integer`

Number of events that don't require any action, i.e., completing or reconciliation with transaction

numberOfEventsRequiringUrgentAction `integer`

Number of events require an action in a near future (between 4-7 days left to dueDate), i.e., completing or reconciliation with transaction

period `Period`

Period description of the summary

#### Period[](#finance-management/financial-calendar/list-events-summaries-for-the-given-period/response-listcalendarsummariesresponse/period)

end `Date`

Period end datetime. ISO8601 format

identity `string` readonly

String uniquely defining the period, e.g. '2006-01'

resolution `Resolution`

Resolution of the summary

start `Date`

Period start datetime. ISO8601 format

#### Resolution[](#finance-management/financial-calendar/list-events-summaries-for-the-given-period/response-listcalendarsummariesresponse/resolution)

| Value | Description |
| --- | --- |
| RESOLUTION\_UNSPECIFIED | Default value, defines unspecified resolution |
| DAILY | Daily resolution |
| WEEKLY | Weekly resolution |
| MONTHLY | Monthly resolution |
| YEARLY | Yearly resolution |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | invalid arguments for pagination |
| 500 | Internal server error |
| default | An unexpected error response. |

## Lists calendar events within given timeframeBeta[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe)

`GET /finance-management/v1/financial-calendar-events`

Perform lookup in events that start at `due_date_gte` time and end at `due_date_lte`. Accepted time format is ISO8601: YYYY-MM-DD. It is possible to fetch data between 10 years (early and late). If time range will be longer than that no data will be returned and error will be thrown.

Please keep in mind, that in case of Income event (positive amount), `Action Indicator` presents different logic.

### Income Action Indicator Meaning[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe/income-action-indicator-meaning)

| Action Indicator | Meaning |
| --- | --- |
| `NO_REMAINING_ACTION_NEEDED` | Event reconciled and completed |
| `ACTION_LATER` | Action not yet past `dueDate` |
| `NOT_COMPLETED_PAST_DUE_DATE` | Event after `dueDate`, not completed and not fully reconciled |
| `COMPLETED_NOT_RECONCILED_PAST_DUE_DATE` | Event after `dueDate`, completed but not fully reconciled |

#### Access Management[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe/income-action-indicator-meaning/access-management)

Event access is defined on a per **accountId** basis. Account ids that user has access to are specified in **account\_id\_in** parameter. Event will be accessible only if user has access to ALL accounts related with the event. Not specifying **accountIds** (or specifying it as an empty list) is equivalent to indicating that the user has access access to all currently available accounts.

### Works with[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `financial-calendar:readonly` |

### Query Parameters[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe/query-parameters)

| Parameter | Description |
| --- | --- |
| dueDateGte | Date of the earliest event to be returned. ISO8601 format YYYY-MM-DD. |
| dueDateLte | Date of the latest event to be returned. ISO8601 format YYYY-MM-DD. |
| pageSize | The maximum number of items to return. |
| pageToken | The next\_page\_token value returned from a previous List request, if any. |
| accountIdIn | List of account ids, if not specified all events available for given user will be returned. |

> Response Example

```
{
  "events": [
    {
      "actionIndicator": "NOT_COMPLETED_PAST_DUE_DATE",
      "attachments": [],
      "completed": false,
      "description": "pay invoice to ACNE",
      "dueDate": "2020-07-14",
      "eventAmount": {
        "currencyCode": "EUR",
        "value": {
          "scale": "2",
          "unscaledValue": "1050"
        }
      },
      "id": "3c8067f4d8084e9687f7f9722e7909eb",
      "reconciliationStatus": "NONE",
      "reconciliations": [
        {
          "transactionId": "881dbc41d07747c38c11cd9b88f1cc93"
        }
      ],
      "title": "Pay invoice"
    }
  ],
  "nextPageToken": "eyJQYWdlTnVtIjoxLCJQYWdlU2l6ZSI6MTAwfQ=="
}
```

### Response: ListCalendarEventsResponse[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe/response-listcalendareventsresponse)

The object used for response from listing calendar events.

events `array[CalendarEvent]`

List of events fulfilling given criteria

nextPageToken `string`

Token to retrieve the next page of results, or empty if there are no more results in the list.

#### CalendarEvent[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe/response-listcalendareventsresponse/calendarevent)

accountIds `array[string]`

Ids of accounts which access to is required for a user to be able to view the event

actionIndicator `ActionIndicator` readonly

Flag for event that represents if any action is needed

attachments `array[CalendarEventAttachment]` readonly

List of attachments added to the event

completed `boolean` readonly

Flag indicating whether the event is completed

description `string`

Description of the event

dueDate `string` required

Date of the event. ISO8601 format YYYY-MM-DD

eventAmount `CurrencyDenominatedAmount` required

Amount of the event with currency. All sub-parameters are required.

id `string` readonly

Id of the event (UUID)

reconciliationStatus `ReconciliationStatus` readonly

Status whether the event was over, fully, partially or not reconciled

reconciliations `array[Reconciliation]` readonly

Details of transactions reconciled with the event

recurringGroup `CalendarEventRecurringGroup` readonly

Indicator of what recurring group this event belongs to (if any)

title `string` required

Title of the event

#### ActionIndicator[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe/response-listcalendareventsresponse/actionindicator)

| Value | Description |
| --- | --- |
| NO\_REMAINING\_ACTION\_NEEDED | Default value, event reconciled and completed |
| ACTION\_LATER | More than 7 days left to dueDate in expense events. Income events use this for all not reconciled events before due date. |
| ACTION\_URGENT | Between 4-7 days left to dueDate for expense events. |
| ACTION\_CRITICAL | Between 0-3 days left to dueDate for expense events. |
| NOT\_COMPLETED\_PAST\_DUE\_DATE | Current date is past dueDate and event is not completed |
| COMPLETED\_NOT\_RECONCILED\_PAST\_DUE\_DATE | Current date is past dueDate and event is completed but not reconciled |

#### CalendarEventAttachment[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe/response-listcalendareventsresponse/calendareventattachment)

id `string` readonly

Attachment ID (UUID)

title `string` required

Attachment title

url `string` required

Attachment url

#### CurrencyDenominatedAmount[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe/response-listcalendareventsresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe/response-listcalendareventsresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### ReconciliationStatus[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe/response-listcalendareventsresponse/reconciliationstatus)

| Value | Description |
| --- | --- |
| NONE | Default value, event not reconciled |
| PARTIALLY | Event reconciled partially |
| FULLY | Event fully reconciled |
| OVER | Event over-reconciled |

#### Reconciliation[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe/response-listcalendareventsresponse/reconciliation)

transactionId `string` required

Transaction ID (UUID)

#### CalendarEventRecurringGroup[](#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe/response-listcalendareventsresponse/calendareventrecurringgroup)

id `string` readonly

Recurring Group ID (UUID)

rrulePattern `string` required

RFC-5545 Recurrence Rule pattern (RRULE) to apply to the recurrence of the event.

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | Request is not following the specification. See body for details. |
| 500 | Internal server error |
| default | An unexpected error response. |

## Make an event recurringBeta[](#finance-management/financial-calendar/make-an-event-recurring)

`POST /finance-management/v1/financial-calendar-events/{calendarEventId}/recurring-group`

Define an event (with `calendar_event_id`) as recurring. Event recurrence is compliant with RFC-5545 Recurrence Rule pattern.

### Works with[](#finance-management/financial-calendar/make-an-event-recurring/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `financial-calendar` |

### Parameters[](#finance-management/financial-calendar/make-an-event-recurring/parameters)

| Parameter | Description |
| --- | --- |
| calendarEventIdrequired | Event ID (UUID) |

> Request Example

```
{
  "rrulePattern": "FREQ=DAILY;INTERVAL=10;COUNT=5"
}
```

### Request Body: CalendarEventRecurringGroup[](#finance-management/financial-calendar/make-an-event-recurring/request-body-calendareventrecurringgroup)

Recurring Group to be created and attached to the Calendar Event

IMPORTANT:

`FREQ` parameter values are restricted to `DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY`.

If RRULE does not contain DTSTART parameter then due\_date will be used as `DTSTART`.

If RRULE does not contain any valid period (i.e `UNTIL` parameter is before `DTSTART`) or RRULE doesn't overlap with the event - validation error will be thrown.

The object that contains details about recurrence in calendar event recurring group request.

rrulePattern `string` required

RFC-5545 Recurrence Rule pattern (RRULE) to apply to the recurrence of the event.

> Response Example

```
{
  "id": "string",
  "rrulePattern": "FREQ=DAILY;INTERVAL=10;COUNT=5"
}
```

### Response: CalendarEventRecurringGroup[](#finance-management/financial-calendar/make-an-event-recurring/response-calendareventrecurringgroup)

The object that contains details about recurrence in calendar event recurring group request.

id `string` readonly

Recurring Group ID (UUID)

rrulePattern `string` required

RFC-5545 Recurrence Rule pattern (RRULE) to apply to the recurrence of the event.

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | user input invalid |
| 500 | Internal server error |
| default | An unexpected error response. |

## Reconcile(link) event with a transactionBeta[](#finance-management/financial-calendar/reconcile-link-event-with-a-transaction)

`POST /finance-management/v1/financial-calendar-events/{calendarEventId}/reconciliations`

Perform reconciliation (linking) process on event based on provided `calendar_event_id`. Reconciliation process links target event with existing transaction defined in request body by `transaction_id`.

### Works with[](#finance-management/financial-calendar/reconcile-link-event-with-a-transaction/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `financial-calendar` |

### Parameters[](#finance-management/financial-calendar/reconcile-link-event-with-a-transaction/parameters)

| Parameter | Description |
| --- | --- |
| calendarEventIdrequired | Event ID (UUID) |

> Request Example

```
{
  "transactionId": "string"
}
```

### Request Body: Reconciliation[](#finance-management/financial-calendar/reconcile-link-event-with-a-transaction/request-body-reconciliation)

Reconciliation which includes Transaction ID (UUID).

The object that contains necessary fields to create reconciliations.

transactionId `string` required

Transaction ID (UUID)

> Response Example

```
{
  "transactionId": "string"
}
```

### Response: Reconciliation[](#finance-management/financial-calendar/reconcile-link-event-with-a-transaction/response-reconciliation)

The object that contains necessary fields to create reconciliations.

transactionId `string` required

Transaction ID (UUID)

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 404 | No event found |
| 500 | Internal server error |
| default | An unexpected error response. |

## Update event by idBeta[](#finance-management/financial-calendar/update-event-by-id)

`PATCH /finance-management/v1/financial-calendar-events/{calendarEventId}`

Make changes to already existing event. Event specified by `calendar_event_id` will be updated with values from body. For Action Indicator explanation please see Create Calendar Event endpoint.

### Access Management[](#finance-management/financial-calendar/update-event-by-id/access-management)

Specifying **accountIds** field as an empty list is equivalent to indicating that event will be accessible only by the users that had access to all accounts which were present the moment of event update.

Please keep in mind, that in case of Income event (positive amount), `Action Indicator` presents different logic.

### Income Action Indicator Meaning[](#finance-management/financial-calendar/update-event-by-id/income-action-indicator-meaning)

| Action Indicator | Meaning |
| --- | --- |
| `NO_REMAINING_ACTION_NEEDED` | Event reconciled and completed |
| `ACTION_LATER` | Action not yet past `dueDate` |
| `NOT_COMPLETED_PAST_DUE_DATE` | Event after `dueDate`, not completed and not fully reconciled |
| `COMPLETED_NOT_RECONCILED_PAST_DUE_DATE` | Event after `dueDate`, completed but not fully reconciled |

### Works with[](#finance-management/financial-calendar/update-event-by-id/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `financial-calendar` |

### Parameters[](#finance-management/financial-calendar/update-event-by-id/parameters)

| Parameter | Description |
| --- | --- |
| calendarEventIdrequired | Calendar event ID (UUID) |

### Query Parameters[](#finance-management/financial-calendar/update-event-by-id/query-parameters)

| Parameter | Description |
| --- | --- |
| recurring | Specify whether to update selected, selected and future or all events.
\- SINGLE: Default value, only selected event will be affected  
\- ALL: All events in the series will be affected  
\- FUTURE: Only selected event and future events in the series will be affected  
Values: `SINGLE`, `ALL`, `FUTURE`

 |

> Request Example

```
{
  "accountIds": [
    "string",
    "string"
  ],
  "completed": false,
  "description": "string",
  "dueDate": "string",
  "eventAmount": {
    "currencyCode": "string",
    "value": {
      "scale": "string",
      "unscaledValue": "string"
    }
  },
  "title": "string"
}
```

### Request Body: UpdateCalendarEventRequestBody[](#finance-management/financial-calendar/update-event-by-id/request-body-updatecalendareventrequestbody)

Event with updated fields.

The object defining update fields in update request.

accountIds `array[string]`

List of Account ids

completed `boolean`

Flag indicating whether the event is completed

description `string`

Description of the event

dueDate `string`

Date of the event. ISO8601 format YYYY-MM-DD

eventAmount `CurrencyDenominatedAmount`

Amount of the event with currency

title `string`

Title of the event

#### CurrencyDenominatedAmount[](#finance-management/financial-calendar/update-event-by-id/request-body-updatecalendareventrequestbody/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/financial-calendar/update-event-by-id/request-body-updatecalendareventrequestbody/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

> Response Example

```
{
  "accountIds": [
    "string",
    "string"
  ],
  "actionIndicator": "NO_REMAINING_ACTION_NEEDED",
  "attachments": [
    {
      "id": "string",
      "title": "attachment title",
      "url": "attachment url"
    }
  ],
  "completed": false,
  "description": "Make sure everyone's invoice are paid ",
  "dueDate": "2022-07-14",
  "eventAmount": {
    "currencyCode": "EUR",
    "value": {
      "scale": 2,
      "unscaledValue": 1050
    }
  },
  "id": "string",
  "reconciliationStatus": "NONE",
  "reconciliations": [
    {
      "transactionId": "string"
    }
  ],
  "recurringGroup": {
    "id": "string",
    "rrulePattern": "FREQ=DAILY;INTERVAL=10;COUNT=5"
  },
  "title": "Pay invoice"
}
```

### Response: CalendarEvent[](#finance-management/financial-calendar/update-event-by-id/response-calendarevent)

The object that describes calendar event.

accountIds `array[string]`

Ids of accounts which access to is required for a user to be able to view the event

actionIndicator `ActionIndicator` readonly

Flag for event that represents if any action is needed

attachments `array[CalendarEventAttachment]` readonly

List of attachments added to the event

completed `boolean` readonly

Flag indicating whether the event is completed

description `string`

Description of the event

dueDate `string` required

Date of the event. ISO8601 format YYYY-MM-DD

eventAmount `CurrencyDenominatedAmount` required

Amount of the event with currency. All sub-parameters are required.

id `string` readonly

Id of the event (UUID)

reconciliationStatus `ReconciliationStatus` readonly

Status whether the event was over, fully, partially or not reconciled

reconciliations `array[Reconciliation]` readonly

Details of transactions reconciled with the event

recurringGroup `CalendarEventRecurringGroup` readonly

Indicator of what recurring group this event belongs to (if any)

title `string` required

Title of the event

#### ActionIndicator[](#finance-management/financial-calendar/update-event-by-id/response-calendarevent/actionindicator)

| Value | Description |
| --- | --- |
| NO\_REMAINING\_ACTION\_NEEDED | Default value, event reconciled and completed |
| ACTION\_LATER | More than 7 days left to dueDate in expense events. Income events use this for all not reconciled events before due date. |
| ACTION\_URGENT | Between 4-7 days left to dueDate for expense events. |
| ACTION\_CRITICAL | Between 0-3 days left to dueDate for expense events. |
| NOT\_COMPLETED\_PAST\_DUE\_DATE | Current date is past dueDate and event is not completed |
| COMPLETED\_NOT\_RECONCILED\_PAST\_DUE\_DATE | Current date is past dueDate and event is completed but not reconciled |

#### CalendarEventAttachment[](#finance-management/financial-calendar/update-event-by-id/response-calendarevent/calendareventattachment)

id `string` readonly

Attachment ID (UUID)

title `string` required

Attachment title

url `string` required

Attachment url

#### CurrencyDenominatedAmount[](#finance-management/financial-calendar/update-event-by-id/response-calendarevent/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#finance-management/financial-calendar/update-event-by-id/response-calendarevent/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### ReconciliationStatus[](#finance-management/financial-calendar/update-event-by-id/response-calendarevent/reconciliationstatus)

| Value | Description |
| --- | --- |
| NONE | Default value, event not reconciled |
| PARTIALLY | Event reconciled partially |
| FULLY | Event fully reconciled |
| OVER | Event over-reconciled |

#### Reconciliation[](#finance-management/financial-calendar/update-event-by-id/response-calendarevent/reconciliation)

transactionId `string` required

Transaction ID (UUID)

#### CalendarEventRecurringGroup[](#finance-management/financial-calendar/update-event-by-id/response-calendarevent/calendareventrecurringgroup)

id `string` readonly

Recurring Group ID (UUID)

rrulePattern `string` required

RFC-5545 Recurrence Rule pattern (RRULE) to apply to the recurrence of the event.

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | failed to parse dueDate |
| 404 | No event found |
| 500 | Internal server error |
| default | An unexpected error response. |

## Notification[](#finance-management/notification)

A notification represents some type of information which a user can be notified about. It could for example be to notify the user of the fact that they have spent more than usual on restaurants this month.

### The Notification model[](#finance-management/notification/the-notification-model)

date `Date` required

The date for which the notification was generated

generated `Date` required

The date when the notification was generated

groupable `boolean` required

Flag indicating whether or not the notification is groupable.

key `string` required

The identifying key.

message `string` required

The notification message.

sensitiveMessage `string` required

The notification message if the notification is delivered encrypted.

sensitiveTitle `string` required

The notification title if the notification is delivered encrypted. Used on Android as title and concatenated with the message on iOS.

status `string` required

The notification status.  
Values: `CREATED`, `SENT`, `SENT_ENCRYPTED`, `RECEIVED`, `READ`

title `string` required

The notification title. Used on Android as title and concatenated with the message on iOS.

type `string` required

The notification type

url `string` required

The deep-link URL

## Mark a notification as readDeprecated[](#finance-management/notification/mark-a-notification-as-read)

`POST /api/v1/notifications/{id}/read`

Marks a notification as read

### Parameters[](#finance-management/notification/mark-a-notification-as-read/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The ID of the notification |

## Mark a notification as receivedDeprecated[](#finance-management/notification/mark-a-notification-as-received)

`POST /api/v1/notifications/{id}/received`

Marks a notification as received (only to be used for acknowledging encrypted notifications)

### Parameters[](#finance-management/notification/mark-a-notification-as-received/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The ID of the notification |

## Query notificationsDeprecated[](#finance-management/notification/query-notifications)

`POST /api/v1/notifications/query`

Queries notifications

> Request Example

```
{
  "limit": 10,
  "offset": 0,
  "statuses": [
    "READ",
    "SENT"
  ]
}
```

### Request Body: NotificationQuery[](#finance-management/notification/query-notifications/request-body-notificationquery)

The query.

limit `integer`

The maximum number of notifications to return (when paging, 0 indicates no limit).

offset `integer`

The number of notifications to skip (when paging).

statuses `array[string]`

The set of notification statuses to be used as a query filter  
Values: `CREATED`, `SENT`, `SENT_ENCRYPTED`, `RECEIVED`, `READ`

> Response Example

```
{
  "count": 45,
  "notifications": [
    {
      "date": 1455740874875,
      "generated": 1455740874875,
      "groupable": true,
      "key": "unusual-category-high.2016-05.18bb1f4636894f3bba8ddcd567d22fbd",
      "message": "You have spent more than usual on restaurants this month.",
      "sensitiveMessage": "You had an expense charged by H&M.",
      "sensitiveTitle": "Expense",
      "status": "READ",
      "title": "More than usual",
      "type": "unusual-category-high",
      "url": "tink://transactions/953c4eda24554a61a9653a479e70fc96"
    }
  ]
}
```

### Response: NotificationQueryResponse[](#finance-management/notification/query-notifications/response-notificationqueryresponse)

count `integer` required

The total number of notifications

notifications `array[[Notification](#tag-notification)]` required

The filtered list of notifications

## Savings Goals[](#finance-management/savings-goals)

## Archive Savings Goal[](#finance-management/savings-goals/archive-savings-goal)

`POST /api/v1/savings-goals/{id}:archive`

Archive a Savings Goal.  
All funds will be withdrawn from the Savings Goal and `status` changed to `ARCHIVED`.

### Works with[](#finance-management/savings-goals/archive-savings-goal/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:write` |

### Parameters[](#finance-management/savings-goals/archive-savings-goal/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The account ID |

> Response Example

```
{
  "account": "d9f134ee2eb44846a4e02990ecc8d32e",
  "categories": [
    "wedding",
    "trip"
  ],
  "createTime": "2020-05-14T13:30:45Z",
  "description": "The savings goal for our big wedding. Including wedding-singers.",
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "name": "Wedding",
  "oneOffPeriodicity": {
    "targetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "targetDate": "2022-10-25"
  },
  "periodicityType": "ONE_OFF",
  "recurringPeriodicity": {
    "periodSavedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodUnit": "WEEK",
    "totalTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    }
  },
  "savedAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "savingsPurpose": "[\"Investments\",\"Housing\"]",
  "status": "CREATED",
  "tags": [
    "icon:blue",
    "priority:10"
  ]
}
```

### Response: SavingsGoalsResponse[](#finance-management/savings-goals/archive-savings-goal/response-savingsgoalsresponse)

A Savings Goal represents a financial savings target for a user.  
The Savings Goal itself is defined by either a target date or a target amount, or both.  
The Savings Goal is directly bound to `one` Account, which can have multiple Savings Goals connected to it. Then user can allocate to her goals by keeping track of how much funds left on the account.

account `string` required

The ID of the Account connected to the Savings Goal.

categories `array[string]`

A set of predefined categories that applies to the Savings Goal.

createTime `string` readonly

Date and time in UTC in which the Savings Goal was created.

description `string`

A longer description of the Savings Goal.

id `string`

The ID of the Savings Goal.

name `string` required

The name of the Savings Goal.

oneOffPeriodicity `SavingsGoalsOneOffPeriodicity`

periodicityType `string`

Type of savings goals periodicity. Can be one-off or recurring.  
Values: `ONE_OFF`, `RECURRING`

recurringPeriodicity `SavingsGoalsRecurringPeriodicity`

savedAmount `Amount`

savingsPurpose `string`

A set of predefined savings purposes that applies to the Savings Goal.

status `string` readonly

The current status of the Savings Goal.  
\- CREATED: Savings goal is created, nothing have been allocated to it yet.  
\- IN\_PROGRESS: Savings goal is in progress, at least one allocation have been done.  
\- COMPLETED: Manual action, completed/inactive savings goal, funds are still allocated but no more allocations is possible.  
\- ARCHIVED: Archived savings-goal (when setting archived all funds will be unallocated).  
Values: `CREATED`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`

tags `array[string]`

Custom user-tags for this Savings Goal.

#### SavingsGoalsOneOffPeriodicity[](#finance-management/savings-goals/archive-savings-goal/response-savingsgoalsresponse/savingsgoalsoneoffperiodicity)

targetAmount `Amount` required

targetDate `string` required

The target date for the Savings Goal, ISO 8601 formatted date (yyyy-MM-dd).

#### Amount[](#finance-management/savings-goals/archive-savings-goal/response-savingsgoalsresponse/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SavingsGoalsRecurringPeriodicity[](#finance-management/savings-goals/archive-savings-goal/response-savingsgoalsresponse/savingsgoalsrecurringperiodicity)

periodSavedAmount `Amount` required

periodTargetAmount `Amount` required

periodUnit `string`

The period of repetition of a given Savings Goal.  
Values: `WEEK`, `MONTH`, `YEAR`

totalTargetAmount `Amount`

| Status Code | Description |
| --- | --- |
| 200 | The Savings Goal with status changed `status` to `ARCHIVED`. |
| 401 | If the user is not authorized. |
| 404 | Savings Goal not found. |

## Complete Savings Goal[](#finance-management/savings-goals/complete-savings-goal)

`POST /api/v1/savings-goals/{id}:complete`

Mark a Savings Goal as Completed  
No more allocations can be made from or to this goal.

### Works with[](#finance-management/savings-goals/complete-savings-goal/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:write` |

### Parameters[](#finance-management/savings-goals/complete-savings-goal/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The Savings Goal ID |

> Response Example

```
{
  "account": "d9f134ee2eb44846a4e02990ecc8d32e",
  "categories": [
    "wedding",
    "trip"
  ],
  "createTime": "2020-05-14T13:30:45Z",
  "description": "The savings goal for our big wedding. Including wedding-singers.",
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "name": "Wedding",
  "oneOffPeriodicity": {
    "targetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "targetDate": "2022-10-25"
  },
  "periodicityType": "ONE_OFF",
  "recurringPeriodicity": {
    "periodSavedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodUnit": "WEEK",
    "totalTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    }
  },
  "savedAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "savingsPurpose": "[\"Investments\",\"Housing\"]",
  "status": "CREATED",
  "tags": [
    "icon:blue",
    "priority:10"
  ]
}
```

### Response: SavingsGoalsResponse[](#finance-management/savings-goals/complete-savings-goal/response-savingsgoalsresponse)

A Savings Goal represents a financial savings target for a user.  
The Savings Goal itself is defined by either a target date or a target amount, or both.  
The Savings Goal is directly bound to `one` Account, which can have multiple Savings Goals connected to it. Then user can allocate to her goals by keeping track of how much funds left on the account.

account `string` required

The ID of the Account connected to the Savings Goal.

categories `array[string]`

A set of predefined categories that applies to the Savings Goal.

createTime `string` readonly

Date and time in UTC in which the Savings Goal was created.

description `string`

A longer description of the Savings Goal.

id `string`

The ID of the Savings Goal.

name `string` required

The name of the Savings Goal.

oneOffPeriodicity `SavingsGoalsOneOffPeriodicity`

periodicityType `string`

Type of savings goals periodicity. Can be one-off or recurring.  
Values: `ONE_OFF`, `RECURRING`

recurringPeriodicity `SavingsGoalsRecurringPeriodicity`

savedAmount `Amount`

savingsPurpose `string`

A set of predefined savings purposes that applies to the Savings Goal.

status `string` readonly

The current status of the Savings Goal.  
\- CREATED: Savings goal is created, nothing have been allocated to it yet.  
\- IN\_PROGRESS: Savings goal is in progress, at least one allocation have been done.  
\- COMPLETED: Manual action, completed/inactive savings goal, funds are still allocated but no more allocations is possible.  
\- ARCHIVED: Archived savings-goal (when setting archived all funds will be unallocated).  
Values: `CREATED`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`

tags `array[string]`

Custom user-tags for this Savings Goal.

#### SavingsGoalsOneOffPeriodicity[](#finance-management/savings-goals/complete-savings-goal/response-savingsgoalsresponse/savingsgoalsoneoffperiodicity)

targetAmount `Amount` required

targetDate `string` required

The target date for the Savings Goal, ISO 8601 formatted date (yyyy-MM-dd).

#### Amount[](#finance-management/savings-goals/complete-savings-goal/response-savingsgoalsresponse/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SavingsGoalsRecurringPeriodicity[](#finance-management/savings-goals/complete-savings-goal/response-savingsgoalsresponse/savingsgoalsrecurringperiodicity)

periodSavedAmount `Amount` required

periodTargetAmount `Amount` required

periodUnit `string`

The period of repetition of a given Savings Goal.  
Values: `WEEK`, `MONTH`, `YEAR`

totalTargetAmount `Amount`

| Status Code | Description |
| --- | --- |
| 200 | The Savings Goal with status changed `status` to `COMPLETED`. |
| 400 | Request is not following the specification. See body for details. |
| 401 | If the user is not authorized. |
| 404 | Savings Goal not found. |

## Create Savings Goal[](#finance-management/savings-goals/create-savings-goal)

`POST /api/v1/savings-goals`

Create a new Savings Goal.

### Works with[](#finance-management/savings-goals/create-savings-goal/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:write` |

> Request Example

```
{
  "account": "d9f134ee2eb44846a4e02990ecc8d32e",
  "categories": [
    "wedding",
    "trip"
  ],
  "description": "The savings goal for our big wedding. Including wedding-singers.",
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "name": "Wedding",
  "oneOffPeriodicity": {
    "targetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "targetDate": "2022-10-25"
  },
  "periodicityType": "ONE_OFF",
  "recurringPeriodicity": {
    "periodSavedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodUnit": "WEEK",
    "totalTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    }
  },
  "savedAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "savingsPurpose": "INVESTMENTS",
  "tags": [
    "icon:blue",
    "priority:10"
  ]
}
```

### Request Body: SavingsGoalsRequest[](#finance-management/savings-goals/create-savings-goal/request-body-savingsgoalsrequest)

The Savings Goal fields to update

account `string` required

The ID of the Account connected to the Savings Goal.

categories `array[string]`

A set of predefined categories that applies to the Savings Goal.

description `string`

A longer description of the Savings Goal.

id `string`

The ID of the Savings Goal.

name `string` required

The name of the Savings Goal.

oneOffPeriodicity `SavingsGoalsOneOffPeriodicity`

periodicityType `string` required

Type of savings goals periodicity. Can be one-off or recurring.  
Values: `ONE_OFF`, `RECURRING`

recurringPeriodicity `SavingsGoalsRecurringPeriodicity`

savedAmount `Amount`

savingsPurpose `string`

A set of predefined savings purposes that applies to the Savings Goal. If purpose is not set it will be default "UNKNOWN".  
Values: `INVESTMENTS`, `PENSION_BUFFER`, `SPECIFIC_PURCHASE`, `HOUSING`, `UNKNOWN`

tags `array[string]`

Custom user-tags for this Savings Goal.

#### SavingsGoalsOneOffPeriodicity[](#finance-management/savings-goals/create-savings-goal/request-body-savingsgoalsrequest/savingsgoalsoneoffperiodicity)

targetAmount `Amount` required

targetDate `string` required

The target date for the Savings Goal, ISO 8601 formatted date (yyyy-MM-dd).

#### Amount[](#finance-management/savings-goals/create-savings-goal/request-body-savingsgoalsrequest/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SavingsGoalsRecurringPeriodicity[](#finance-management/savings-goals/create-savings-goal/request-body-savingsgoalsrequest/savingsgoalsrecurringperiodicity)

periodSavedAmount `Amount` required

periodTargetAmount `Amount` required

periodUnit `string`

The period of repetition of a given Savings Goal.  
Values: `WEEK`, `MONTH`, `YEAR`

totalTargetAmount `Amount`

> Response Example

```
{
  "account": "d9f134ee2eb44846a4e02990ecc8d32e",
  "categories": [
    "wedding",
    "trip"
  ],
  "createTime": "2020-05-14T13:30:45Z",
  "description": "The savings goal for our big wedding. Including wedding-singers.",
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "name": "Wedding",
  "oneOffPeriodicity": {
    "targetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "targetDate": "2022-10-25"
  },
  "periodicityType": "ONE_OFF",
  "recurringPeriodicity": {
    "periodSavedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodUnit": "WEEK",
    "totalTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    }
  },
  "savedAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "savingsPurpose": "[\"Investments\",\"Housing\"]",
  "status": "CREATED",
  "tags": [
    "icon:blue",
    "priority:10"
  ]
}
```

### Response: SavingsGoalsResponse[](#finance-management/savings-goals/create-savings-goal/response-savingsgoalsresponse)

A Savings Goal represents a financial savings target for a user.  
The Savings Goal itself is defined by either a target date or a target amount, or both.  
The Savings Goal is directly bound to `one` Account, which can have multiple Savings Goals connected to it. Then user can allocate to her goals by keeping track of how much funds left on the account.

account `string` required

The ID of the Account connected to the Savings Goal.

categories `array[string]`

A set of predefined categories that applies to the Savings Goal.

createTime `string` readonly

Date and time in UTC in which the Savings Goal was created.

description `string`

A longer description of the Savings Goal.

id `string`

The ID of the Savings Goal.

name `string` required

The name of the Savings Goal.

oneOffPeriodicity `SavingsGoalsOneOffPeriodicity`

periodicityType `string`

Type of savings goals periodicity. Can be one-off or recurring.  
Values: `ONE_OFF`, `RECURRING`

recurringPeriodicity `SavingsGoalsRecurringPeriodicity`

savedAmount `Amount`

savingsPurpose `string`

A set of predefined savings purposes that applies to the Savings Goal.

status `string` readonly

The current status of the Savings Goal.  
\- CREATED: Savings goal is created, nothing have been allocated to it yet.  
\- IN\_PROGRESS: Savings goal is in progress, at least one allocation have been done.  
\- COMPLETED: Manual action, completed/inactive savings goal, funds are still allocated but no more allocations is possible.  
\- ARCHIVED: Archived savings-goal (when setting archived all funds will be unallocated).  
Values: `CREATED`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`

tags `array[string]`

Custom user-tags for this Savings Goal.

#### SavingsGoalsOneOffPeriodicity[](#finance-management/savings-goals/create-savings-goal/response-savingsgoalsresponse/savingsgoalsoneoffperiodicity)

targetAmount `Amount` required

targetDate `string` required

The target date for the Savings Goal, ISO 8601 formatted date (yyyy-MM-dd).

#### Amount[](#finance-management/savings-goals/create-savings-goal/response-savingsgoalsresponse/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SavingsGoalsRecurringPeriodicity[](#finance-management/savings-goals/create-savings-goal/response-savingsgoalsresponse/savingsgoalsrecurringperiodicity)

periodSavedAmount `Amount` required

periodTargetAmount `Amount` required

periodUnit `string`

The period of repetition of a given Savings Goal.  
Values: `WEEK`, `MONTH`, `YEAR`

totalTargetAmount `Amount`

| Status Code | Description |
| --- | --- |
| 200 | The successfully created Savings Goal. |
| 400 | Request is not following the specification. See body for details. |
| 401 | If the user is not authorized. |

## Deposit to Savings Goal[](#finance-management/savings-goals/deposit-to-savings-goal)

`POST /api/v1/savings-goals/{id}/allocations/fund:deposit`

Deposit amount to a Savings Goal. If this is the first deposit to this Savings Goal the status will transition from `CREATED` to `IN_PROGRESS`.

### Works with[](#finance-management/savings-goals/deposit-to-savings-goal/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:write` |

### Parameters[](#finance-management/savings-goals/deposit-to-savings-goal/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The Savings Goal ID |

> Request Example

```
{
  "currencyCode": "EUR",
  "scale": 2,
  "unscaledValue": 2000
}
```

### Request Body: Amount[](#finance-management/savings-goals/deposit-to-savings-goal/request-body-amount)

Amount moved with the allocation.

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

> Response Example

```
{
  "amount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "createTime": "2020-05-14T13:30:45Z",
  "destinationId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "destinationType": "SAVINGS_GOAL",
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "sourceId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "sourceType": "string"
}
```

### Response: Allocation[](#finance-management/savings-goals/deposit-to-savings-goal/response-allocation)

An allocation is a virtual transaction withdraw from or deposit to a Savings Goal.

amount `Amount`

createTime `string` readonly

Date and time in UTC in which the Allocation was made.

destinationId `string`

The ID of the Destination.

destinationType `string`

The type of the destination.  
\- ACCOUNT: Destination of type Account.  
\- SAVINGS\_GOAL: Destination of type Savings Goal.  
Values: `SAVINGS_GOAL`, `ACCOUNT`

id `string` readonly

The ID of the new allocation.

sourceId `string`

The ID of the Source.

sourceType `string`

The type of the source.  
\- ACCOUNT: Source of type Account.  
\- SAVINGS\_GOAL: Source of type Savings Goal.

#### Amount[](#finance-management/savings-goals/deposit-to-savings-goal/response-allocation/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

| Status Code | Description |
| --- | --- |
| 200 | The deposit Allocation. |
| 400 | Request is not following the specification. See body for details. |
| 401 | If the user is not authorized. |
| 404 | Savings Goal not found. |

## Get Account[](#finance-management/savings-goals/get-account)

`GET /api/v1/savings-goals/accounts/{id}`

Get Account by ID from a Savings Goals domain.

### Works with[](#finance-management/savings-goals/get-account/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:read` |

### Parameters[](#finance-management/savings-goals/get-account/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The account ID |

> Response Example

```
{
  "balance": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "name": "My account",
  "unallocatedFunds": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  }
}
```

### Response: Account[](#finance-management/savings-goals/get-account/response-account)

An account model within the Savings Goals domain, that contains the current unallocated amount available to fund a Savings Goal.

balance `Amount`

id `string`

The ID of the Account.

name `string`

The name of the Account.

unallocatedFunds `Amount`

#### Amount[](#finance-management/savings-goals/get-account/response-account/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

| Status Code | Description |
| --- | --- |
| 200 | The Account with actual balance and unallocated funds available for Savings Goals to allocate. |
| 401 | If the user is not authorized. |
| 404 | Account not found. |

## Get Savings Goal[](#finance-management/savings-goals/get-savings-goal)

`GET /api/v1/savings-goals/{id}`

Get Savings Goal by id.

### Works with[](#finance-management/savings-goals/get-savings-goal/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:read` |

### Parameters[](#finance-management/savings-goals/get-savings-goal/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The Savings Goal ID |

> Response Example

```
{
  "account": "d9f134ee2eb44846a4e02990ecc8d32e",
  "categories": [
    "wedding",
    "trip"
  ],
  "createTime": "2020-05-14T13:30:45Z",
  "description": "The savings goal for our big wedding. Including wedding-singers.",
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "name": "Wedding",
  "oneOffPeriodicity": {
    "targetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "targetDate": "2022-10-25"
  },
  "periodicityType": "ONE_OFF",
  "recurringPeriodicity": {
    "periodSavedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodUnit": "WEEK",
    "totalTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    }
  },
  "savedAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "savingsPurpose": "[\"Investments\",\"Housing\"]",
  "status": "CREATED",
  "tags": [
    "icon:blue",
    "priority:10"
  ]
}
```

### Response: SavingsGoalsResponse[](#finance-management/savings-goals/get-savings-goal/response-savingsgoalsresponse)

A Savings Goal represents a financial savings target for a user.  
The Savings Goal itself is defined by either a target date or a target amount, or both.  
The Savings Goal is directly bound to `one` Account, which can have multiple Savings Goals connected to it. Then user can allocate to her goals by keeping track of how much funds left on the account.

account `string` required

The ID of the Account connected to the Savings Goal.

categories `array[string]`

A set of predefined categories that applies to the Savings Goal.

createTime `string` readonly

Date and time in UTC in which the Savings Goal was created.

description `string`

A longer description of the Savings Goal.

id `string`

The ID of the Savings Goal.

name `string` required

The name of the Savings Goal.

oneOffPeriodicity `SavingsGoalsOneOffPeriodicity`

periodicityType `string`

Type of savings goals periodicity. Can be one-off or recurring.  
Values: `ONE_OFF`, `RECURRING`

recurringPeriodicity `SavingsGoalsRecurringPeriodicity`

savedAmount `Amount`

savingsPurpose `string`

A set of predefined savings purposes that applies to the Savings Goal.

status `string` readonly

The current status of the Savings Goal.  
\- CREATED: Savings goal is created, nothing have been allocated to it yet.  
\- IN\_PROGRESS: Savings goal is in progress, at least one allocation have been done.  
\- COMPLETED: Manual action, completed/inactive savings goal, funds are still allocated but no more allocations is possible.  
\- ARCHIVED: Archived savings-goal (when setting archived all funds will be unallocated).  
Values: `CREATED`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`

tags `array[string]`

Custom user-tags for this Savings Goal.

#### SavingsGoalsOneOffPeriodicity[](#finance-management/savings-goals/get-savings-goal/response-savingsgoalsresponse/savingsgoalsoneoffperiodicity)

targetAmount `Amount` required

targetDate `string` required

The target date for the Savings Goal, ISO 8601 formatted date (yyyy-MM-dd).

#### Amount[](#finance-management/savings-goals/get-savings-goal/response-savingsgoalsresponse/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SavingsGoalsRecurringPeriodicity[](#finance-management/savings-goals/get-savings-goal/response-savingsgoalsresponse/savingsgoalsrecurringperiodicity)

periodSavedAmount `Amount` required

periodTargetAmount `Amount` required

periodUnit `string`

The period of repetition of a given Savings Goal.  
Values: `WEEK`, `MONTH`, `YEAR`

totalTargetAmount `Amount`

| Status Code | Description |
| --- | --- |
| 200 | The Savings Goal. |
| 401 | If the user is not authorized. |
| 404 | Savings Goal not found. |

## List Savings Goals[](#finance-management/savings-goals/list-savings-goals)

`GET /api/v1/savings-goals`

List the user's Savings Goals.

### Works with[](#finance-management/savings-goals/list-savings-goals/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:read` |

### Query Parameters[](#finance-management/savings-goals/list-savings-goals/query-parameters)

| Parameter | Description |
| --- | --- |
| page\_size | (Optional) Size of the page to fetch. |
| page\_token | (Optional) The first token is presented on the response of the first call if there are multiple pages. |
| status\_in | Filter Savings Goals by status. If left out, it will by default, filter out `ARCHIVED` Savings Goals. The status of a Saving Goal changes from `CREATED` to `IN_PROGRESS` just after the first deposit of fund to it.  
Values: `CREATED`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED` |
| account\_in | Filter the list of Savings Goals by account ids. |

> Response Example

```
{
  "nextPageToken": "string",
  "savingsGoals": [
    {
      "account": "d9f134ee2eb44846a4e02990ecc8d32e",
      "categories": [
        "wedding",
        "trip"
      ],
      "createTime": "2020-05-14T13:30:45Z",
      "description": "The savings goal for our big wedding. Including wedding-singers.",
      "id": "d9f134ee2eb44846a4e02990ecc8d32e",
      "name": "Wedding",
      "oneOffPeriodicity": {
        "targetAmount": {
          "currencyCode": "EUR",
          "scale": 2,
          "unscaledValue": 2000
        },
        "targetDate": "2022-10-25"
      },
      "periodicityType": "ONE_OFF",
      "recurringPeriodicity": {
        "periodSavedAmount": {
          "currencyCode": "EUR",
          "scale": 2,
          "unscaledValue": 2000
        },
        "periodTargetAmount": {
          "currencyCode": "EUR",
          "scale": 2,
          "unscaledValue": 2000
        },
        "periodUnit": "WEEK",
        "totalTargetAmount": {
          "currencyCode": "EUR",
          "scale": 2,
          "unscaledValue": 2000
        }
      },
      "savedAmount": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 2000
      },
      "savingsPurpose": "[\"Investments\",\"Housing\"]",
      "status": "CREATED",
      "tags": [
        "icon:blue",
        "priority:10"
      ]
    }
  ]
}
```

### Response: ListSavingsGoalsResponse[](#finance-management/savings-goals/list-savings-goals/response-listsavingsgoalsresponse)

nextPageToken `string`

Next page token to be used for pagination, use it with the next request parameter `page_token` to request the next page of the list.

savingsGoals `array[SavingsGoalsResponse]`

#### SavingsGoalsResponse[](#finance-management/savings-goals/list-savings-goals/response-listsavingsgoalsresponse/savingsgoalsresponse)

account `string` required

The ID of the Account connected to the Savings Goal.

categories `array[string]`

A set of predefined categories that applies to the Savings Goal.

createTime `string` readonly

Date and time in UTC in which the Savings Goal was created.

description `string`

A longer description of the Savings Goal.

id `string`

The ID of the Savings Goal.

name `string` required

The name of the Savings Goal.

oneOffPeriodicity `SavingsGoalsOneOffPeriodicity`

periodicityType `string`

Type of savings goals periodicity. Can be one-off or recurring.  
Values: `ONE_OFF`, `RECURRING`

recurringPeriodicity `SavingsGoalsRecurringPeriodicity`

savedAmount `Amount`

savingsPurpose `string`

A set of predefined savings purposes that applies to the Savings Goal.

status `string` readonly

The current status of the Savings Goal.  
\- CREATED: Savings goal is created, nothing have been allocated to it yet.  
\- IN\_PROGRESS: Savings goal is in progress, at least one allocation have been done.  
\- COMPLETED: Manual action, completed/inactive savings goal, funds are still allocated but no more allocations is possible.  
\- ARCHIVED: Archived savings-goal (when setting archived all funds will be unallocated).  
Values: `CREATED`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`

tags `array[string]`

Custom user-tags for this Savings Goal.

#### SavingsGoalsOneOffPeriodicity[](#finance-management/savings-goals/list-savings-goals/response-listsavingsgoalsresponse/savingsgoalsoneoffperiodicity)

targetAmount `Amount` required

targetDate `string` required

The target date for the Savings Goal, ISO 8601 formatted date (yyyy-MM-dd).

#### Amount[](#finance-management/savings-goals/list-savings-goals/response-listsavingsgoalsresponse/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SavingsGoalsRecurringPeriodicity[](#finance-management/savings-goals/list-savings-goals/response-listsavingsgoalsresponse/savingsgoalsrecurringperiodicity)

periodSavedAmount `Amount` required

periodTargetAmount `Amount` required

periodUnit `string`

The period of repetition of a given Savings Goal.  
Values: `WEEK`, `MONTH`, `YEAR`

totalTargetAmount `Amount`

| Status Code | Description |
| --- | --- |
| 200 | The list Savings Goals. |
| 401 | If the user is not authorized. |

## List allocations[](#finance-management/savings-goals/list-allocations)

`GET /api/v1/savings-goals/{id}/allocations`

List allocations by Savings Goal.

### Works with[](#finance-management/savings-goals/list-allocations/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:read` |

### Parameters[](#finance-management/savings-goals/list-allocations/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The Savings Goal ID |

### Query Parameters[](#finance-management/savings-goals/list-allocations/query-parameters)

| Parameter | Description |
| --- | --- |
| page\_size | (Optional) Size of the page to fetch. |
| page\_token | (Optional) The first token is presented on the response of the first call if there are multiple pages. |

> Response Example

```
{
  "allocations": [
    {
      "amount": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 2000
      },
      "createTime": "2020-05-14T13:30:45Z",
      "destinationId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "destinationType": "SAVINGS_GOAL",
      "id": "d9f134ee2eb44846a4e02990ecc8d32e",
      "sourceId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "sourceType": "string"
    }
  ],
  "nextPageToken": "string"
}
```

### Response: ListAllocationsResponse[](#finance-management/savings-goals/list-allocations/response-listallocationsresponse)

allocations `array[Allocation]`

nextPageToken `string`

Next page token to be used for pagination, use it with the next request parameter `page_token` to request the next page of the list.

#### Allocation[](#finance-management/savings-goals/list-allocations/response-listallocationsresponse/allocation)

amount `Amount`

createTime `string` readonly

Date and time in UTC in which the Allocation was made.

destinationId `string`

The ID of the Destination.

destinationType `string`

The type of the destination.  
\- ACCOUNT: Destination of type Account.  
\- SAVINGS\_GOAL: Destination of type Savings Goal.  
Values: `SAVINGS_GOAL`, `ACCOUNT`

id `string` readonly

The ID of the new allocation.

sourceId `string`

The ID of the Source.

sourceType `string`

The type of the source.  
\- ACCOUNT: Source of type Account.  
\- SAVINGS\_GOAL: Source of type Savings Goal.

#### Amount[](#finance-management/savings-goals/list-allocations/response-listallocationsresponse/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

| Status Code | Description |
| --- | --- |
| 200 | The list of allocations. |
| 401 | If the user is not authorized. |
| 404 | Savings Goal not found. |

## List allocations by Account[](#finance-management/savings-goals/list-allocations-by-account)

`GET /api/v1/savings-goals/accounts/{id}/allocations`

### Works with[](#finance-management/savings-goals/list-allocations-by-account/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:read` |

### Parameters[](#finance-management/savings-goals/list-allocations-by-account/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The Savings Goal ID |

### Query Parameters[](#finance-management/savings-goals/list-allocations-by-account/query-parameters)

| Parameter | Description |
| --- | --- |
| page\_size | (Optional) Size of the page to fetch. |
| page\_token | (Optional) The first token is presented on the response of the first call if there are multiple pages. |

> Response Example

```
{
  "allocations": [
    {
      "amount": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 2000
      },
      "createTime": "2020-05-14T13:30:45Z",
      "destinationId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "destinationType": "SAVINGS_GOAL",
      "id": "d9f134ee2eb44846a4e02990ecc8d32e",
      "sourceId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "sourceType": "string"
    }
  ],
  "nextPageToken": "string"
}
```

### Response: ListAllocationsResponse[](#finance-management/savings-goals/list-allocations-by-account/response-listallocationsresponse)

allocations `array[Allocation]`

nextPageToken `string`

Next page token to be used for pagination, use it with the next request parameter `page_token` to request the next page of the list.

#### Allocation[](#finance-management/savings-goals/list-allocations-by-account/response-listallocationsresponse/allocation)

amount `Amount`

createTime `string` readonly

Date and time in UTC in which the Allocation was made.

destinationId `string`

The ID of the Destination.

destinationType `string`

The type of the destination.  
\- ACCOUNT: Destination of type Account.  
\- SAVINGS\_GOAL: Destination of type Savings Goal.  
Values: `SAVINGS_GOAL`, `ACCOUNT`

id `string` readonly

The ID of the new allocation.

sourceId `string`

The ID of the Source.

sourceType `string`

The type of the source.  
\- ACCOUNT: Source of type Account.  
\- SAVINGS\_GOAL: Source of type Savings Goal.

#### Amount[](#finance-management/savings-goals/list-allocations-by-account/response-listallocationsresponse/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

| Status Code | Description |
| --- | --- |
| 200 | The list of allocations withdraw from, and deposit to, the Account. |
| 401 | If the user is not authorized. |
| 404 | Account not found. |

## List categories[](#finance-management/savings-goals/list-categories)

`GET /api/v1/savings-goals/categories`

List all available categories.

### Works with[](#finance-management/savings-goals/list-categories/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:read` |

> Response Example

```
{
  "categories": [
    "string",
    "string"
  ]
}
```

### Response: ListCategoriesResponse[](#finance-management/savings-goals/list-categories/response-listcategoriesresponse)

categories `array[string]`

| Status Code | Description |
| --- | --- |
| 200 | The list of all available categories that can be set on a Savings Goal. |
| 401 | If the user is not authorized. |

## List periods progress[](#finance-management/savings-goals/list-periods-progress)

`GET /api/v1/savings-goals/{id}/period_progress`

Get a list of periodProgresses, based on Users `periodMode` between the Savings Goal `createTime` and `targetDate`.  
If no targetDate is set on the Savings Goal, it will return PeriodProgresses between createTime and the current date

### Works with[](#finance-management/savings-goals/list-periods-progress/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:read` |

### Parameters[](#finance-management/savings-goals/list-periods-progress/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The Savings Goal ID |

### Query Parameters[](#finance-management/savings-goals/list-periods-progress/query-parameters)

| Parameter | Description |
| --- | --- |
| page\_size | (Optional) Size of the page to fetch. |
| page\_token | (Optional) The first token is presented on the response of the first call if there are multiple pages. |

> Response Example

```
{
  "nextPageToken": "string",
  "periodProgresses": [
    {
      "amountSavedThisPeriod": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 2000
      },
      "periodEndDate": "2020-02-25",
      "periodStartDate": "2020-01-25",
      "reachedAmountForSavingsGoalThisPeriod": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 2000
      }
    }
  ]
}
```

### Response: ListPeriodProgressResponse[](#finance-management/savings-goals/list-periods-progress/response-listperiodprogressresponse)

nextPageToken `string`

Next page token to be used for pagination, use it with the next request parameter `page_token` to request the next page of the list.

periodProgresses `array[PeriodProgress]`

#### PeriodProgress[](#finance-management/savings-goals/list-periods-progress/response-listperiodprogressresponse/periodprogress)

amountSavedThisPeriod `Amount`

periodEndDate `string`

The end date of the period, ISO 8601 formatted date (yyyy-MM-dd).

periodStartDate `string`

The start date of the period, ISO 8601 formatted date (yyyy-MM-dd).

reachedAmountForSavingsGoalThisPeriod `Amount`

#### Amount[](#finance-management/savings-goals/list-periods-progress/response-listperiodprogressresponse/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

| Status Code | Description |
| --- | --- |
| 200 | List of PeriodProgresses between the createTime and targetDate. |
| 401 | If the user is not authorized. |
| 404 | Savings Goal not found. |

## ReAllocate amount[](#finance-management/savings-goals/reallocate-amount)

`POST /api/v1/savings-goals/allocations/fund:reallocate`

ReAllocate amount from a Savings Goal to another Savings Goal.

### Works with[](#finance-management/savings-goals/reallocate-amount/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:write` |

> Request Example

```
{
  "amount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "destinationSavingsGoalId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "sourceSavingsGoalId": "d9f134ee2eb44846a4e02990ecc8d32e"
}
```

### Request Body: ReAllocateRequest[](#finance-management/savings-goals/reallocate-amount/request-body-reallocaterequest)

The reallocation to make

amount `Amount`

destinationSavingsGoalId `string`

The destination Savings Goal ID to allocate money to.

sourceSavingsGoalId `string`

The source Savings Goal ID to allocate money from.

#### Amount[](#finance-management/savings-goals/reallocate-amount/request-body-reallocaterequest/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

> Response Example

```
{
  "amount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "createTime": "2020-05-14T13:30:45Z",
  "destinationId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "destinationType": "SAVINGS_GOAL",
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "sourceId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "sourceType": "string"
}
```

### Response: Allocation[](#finance-management/savings-goals/reallocate-amount/response-allocation)

An allocation is a virtual transaction withdraw from or deposit to a Savings Goal.

amount `Amount`

createTime `string` readonly

Date and time in UTC in which the Allocation was made.

destinationId `string`

The ID of the Destination.

destinationType `string`

The type of the destination.  
\- ACCOUNT: Destination of type Account.  
\- SAVINGS\_GOAL: Destination of type Savings Goal.  
Values: `SAVINGS_GOAL`, `ACCOUNT`

id `string` readonly

The ID of the new allocation.

sourceId `string`

The ID of the Source.

sourceType `string`

The type of the source.  
\- ACCOUNT: Source of type Account.  
\- SAVINGS\_GOAL: Source of type Savings Goal.

#### Amount[](#finance-management/savings-goals/reallocate-amount/response-allocation/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

| Status Code | Description |
| --- | --- |
| 200 | The reallocation allocation. |
| 400 | Request is not following the specification. See body for details. |
| 401 | If the user is not authorized. |
| 404 | Savings Goal not found. |

## Update Savings Goal[](#finance-management/savings-goals/update-savings-goal)

`PATCH /api/v1/savings-goals/{id}`

Update a Savings Goal.

### Works with[](#finance-management/savings-goals/update-savings-goal/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:write` |

### Parameters[](#finance-management/savings-goals/update-savings-goal/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The Savings Goal ID |

> Request Example

```
{
  "account": "d9f134ee2eb44846a4e02990ecc8d32e",
  "categories": [
    "wedding",
    "trip"
  ],
  "description": "The savings goal for our big wedding. Including wedding-singers.",
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "name": "Wedding",
  "oneOffPeriodicity": {
    "targetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "targetDate": "2022-10-25"
  },
  "periodicityType": "ONE_OFF",
  "recurringPeriodicity": {
    "periodSavedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodUnit": "WEEK",
    "totalTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    }
  },
  "savedAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "savingsPurpose": "INVESTMENTS",
  "tags": [
    "icon:blue",
    "priority:10"
  ]
}
```

### Request Body: SavingsGoalsRequest[](#finance-management/savings-goals/update-savings-goal/request-body-savingsgoalsrequest)

The Savings Goal fields to update

account `string` required

The ID of the Account connected to the Savings Goal.

categories `array[string]`

A set of predefined categories that applies to the Savings Goal.

description `string`

A longer description of the Savings Goal.

id `string`

The ID of the Savings Goal.

name `string` required

The name of the Savings Goal.

oneOffPeriodicity `SavingsGoalsOneOffPeriodicity`

periodicityType `string` required

Type of savings goals periodicity. Can be one-off or recurring.  
Values: `ONE_OFF`, `RECURRING`

recurringPeriodicity `SavingsGoalsRecurringPeriodicity`

savedAmount `Amount`

savingsPurpose `string`

A set of predefined savings purposes that applies to the Savings Goal. If purpose is not set it will be default "UNKNOWN".  
Values: `INVESTMENTS`, `PENSION_BUFFER`, `SPECIFIC_PURCHASE`, `HOUSING`, `UNKNOWN`

tags `array[string]`

Custom user-tags for this Savings Goal.

#### SavingsGoalsOneOffPeriodicity[](#finance-management/savings-goals/update-savings-goal/request-body-savingsgoalsrequest/savingsgoalsoneoffperiodicity)

targetAmount `Amount` required

targetDate `string` required

The target date for the Savings Goal, ISO 8601 formatted date (yyyy-MM-dd).

#### Amount[](#finance-management/savings-goals/update-savings-goal/request-body-savingsgoalsrequest/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SavingsGoalsRecurringPeriodicity[](#finance-management/savings-goals/update-savings-goal/request-body-savingsgoalsrequest/savingsgoalsrecurringperiodicity)

periodSavedAmount `Amount` required

periodTargetAmount `Amount` required

periodUnit `string`

The period of repetition of a given Savings Goal.  
Values: `WEEK`, `MONTH`, `YEAR`

totalTargetAmount `Amount`

> Response Example

```
{
  "account": "d9f134ee2eb44846a4e02990ecc8d32e",
  "categories": [
    "wedding",
    "trip"
  ],
  "createTime": "2020-05-14T13:30:45Z",
  "description": "The savings goal for our big wedding. Including wedding-singers.",
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "name": "Wedding",
  "oneOffPeriodicity": {
    "targetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "targetDate": "2022-10-25"
  },
  "periodicityType": "ONE_OFF",
  "recurringPeriodicity": {
    "periodSavedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    },
    "periodUnit": "WEEK",
    "totalTargetAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 2000
    }
  },
  "savedAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "savingsPurpose": "[\"Investments\",\"Housing\"]",
  "status": "CREATED",
  "tags": [
    "icon:blue",
    "priority:10"
  ]
}
```

### Response: SavingsGoalsResponse[](#finance-management/savings-goals/update-savings-goal/response-savingsgoalsresponse)

A Savings Goal represents a financial savings target for a user.  
The Savings Goal itself is defined by either a target date or a target amount, or both.  
The Savings Goal is directly bound to `one` Account, which can have multiple Savings Goals connected to it. Then user can allocate to her goals by keeping track of how much funds left on the account.

account `string` required

The ID of the Account connected to the Savings Goal.

categories `array[string]`

A set of predefined categories that applies to the Savings Goal.

createTime `string` readonly

Date and time in UTC in which the Savings Goal was created.

description `string`

A longer description of the Savings Goal.

id `string`

The ID of the Savings Goal.

name `string` required

The name of the Savings Goal.

oneOffPeriodicity `SavingsGoalsOneOffPeriodicity`

periodicityType `string`

Type of savings goals periodicity. Can be one-off or recurring.  
Values: `ONE_OFF`, `RECURRING`

recurringPeriodicity `SavingsGoalsRecurringPeriodicity`

savedAmount `Amount`

savingsPurpose `string`

A set of predefined savings purposes that applies to the Savings Goal.

status `string` readonly

The current status of the Savings Goal.  
\- CREATED: Savings goal is created, nothing have been allocated to it yet.  
\- IN\_PROGRESS: Savings goal is in progress, at least one allocation have been done.  
\- COMPLETED: Manual action, completed/inactive savings goal, funds are still allocated but no more allocations is possible.  
\- ARCHIVED: Archived savings-goal (when setting archived all funds will be unallocated).  
Values: `CREATED`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`

tags `array[string]`

Custom user-tags for this Savings Goal.

#### SavingsGoalsOneOffPeriodicity[](#finance-management/savings-goals/update-savings-goal/response-savingsgoalsresponse/savingsgoalsoneoffperiodicity)

targetAmount `Amount` required

targetDate `string` required

The target date for the Savings Goal, ISO 8601 formatted date (yyyy-MM-dd).

#### Amount[](#finance-management/savings-goals/update-savings-goal/response-savingsgoalsresponse/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SavingsGoalsRecurringPeriodicity[](#finance-management/savings-goals/update-savings-goal/response-savingsgoalsresponse/savingsgoalsrecurringperiodicity)

periodSavedAmount `Amount` required

periodTargetAmount `Amount` required

periodUnit `string`

The period of repetition of a given Savings Goal.  
Values: `WEEK`, `MONTH`, `YEAR`

totalTargetAmount `Amount`

| Status Code | Description |
| --- | --- |
| 200 | The updated Savings Goal. |
| 401 | If the user is not authorized. |
| 404 | Savings Goal not found. |

## Withdraw from Savings Goal[](#finance-management/savings-goals/withdraw-from-savings-goal)

`POST /api/v1/savings-goals/{id}/allocations/fund:withdraw`

Withdraw amount from a Savings Goal.

### Works with[](#finance-management/savings-goals/withdraw-from-savings-goal/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `savings-goals:write` |

### Parameters[](#finance-management/savings-goals/withdraw-from-savings-goal/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The Savings Goal ID |

> Request Example

```
{
  "currencyCode": "EUR",
  "scale": 2,
  "unscaledValue": 2000
}
```

### Request Body: Amount[](#finance-management/savings-goals/withdraw-from-savings-goal/request-body-amount)

Amount moved with the allocation.

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

> Response Example

```
{
  "amount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 2000
  },
  "createTime": "2020-05-14T13:30:45Z",
  "destinationId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "destinationType": "SAVINGS_GOAL",
  "id": "d9f134ee2eb44846a4e02990ecc8d32e",
  "sourceId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "sourceType": "string"
}
```

### Response: Allocation[](#finance-management/savings-goals/withdraw-from-savings-goal/response-allocation)

An allocation is a virtual transaction withdraw from or deposit to a Savings Goal.

amount `Amount`

createTime `string` readonly

Date and time in UTC in which the Allocation was made.

destinationId `string`

The ID of the Destination.

destinationType `string`

The type of the destination.  
\- ACCOUNT: Destination of type Account.  
\- SAVINGS\_GOAL: Destination of type Savings Goal.  
Values: `SAVINGS_GOAL`, `ACCOUNT`

id `string` readonly

The ID of the new allocation.

sourceId `string`

The ID of the Source.

sourceType `string`

The type of the source.  
\- ACCOUNT: Source of type Account.  
\- SAVINGS\_GOAL: Source of type Savings Goal.

#### Amount[](#finance-management/savings-goals/withdraw-from-savings-goal/response-allocation/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

| Status Code | Description |
| --- | --- |
| 200 | The withdraw Allocation. |
| 400 | Request is not following the specification. See body for details. |
| 401 | If the user is not authorized. |
| 404 | Savings Goal not found. |

## Statistic[](#finance-management/statistic)

Statistics contain derived data from different types of information which is available for a user. It could be based on information such as expenses, incomes or balances. As an example, statistics could be a time series of travel expenses calculated monthly for the last six months.

### The Statistic model[](#finance-management/statistic/the-statistic-model)

description `string`

Identifier of the data the statistic represents.

payload `string`

Secondary identifier of the data the statistic represent.

period `string`

The statistic's period, depends on its resolution. One of: year, month, quarter, week or day. Format: `2014`, `2014-02`, `2014-Q2`, `2014:45` or `2014-02-12`.

resolution `string`

Resolution for the statistics.  
Values: `DAILY`, `WEEKLY`, `MONTHLY`, `MONTHLY_ADJUSTED`, `QUARTERLY`, `YEARLY`

type `string`

The statistic's type.

userId `string`

Resolution for the statistics.

value `number`

The value of the statistics for this type, period, and description.

## Query statistics[](#finance-management/statistic/query-statistics)

`POST /api/v1/statistics/query`

By querying the statistics endpoint, an API customer can select the specific types of data to access. The statistics query should be posted in the request body and you can specify any of the properties available to filter the result set. Defining multiple properties will yield an `AND` operation, and specifying multiple values of a property will yield an `OR` operation.

Transfers and upcoming transactions are always excluded from statistics calculations.

Additionally statistics can be generated on further filtered set of transactions. They can be filtered using tags that should be provided in tags field in request payload. When defining multiple tags they are treated as a logical expression with OR operator e.g. `["Cinema", "Theater"]` would be treated as Cinema OR Theater. If no tags are provided there is no filtering.

**Note:** Monthly statistics will be calculated only with the resolution that the user has in the user settings (`MONTHLY`, `MONTHLY_ADJUSTED`), and not for both. **Note:** `YEARLY` resolution is aggregated based on the resolution that the user has in the user settings. With `MONTHLY` it will be the calendar year and with `MONTHLY_ADJUSTED` it will be adjusted based on the users' `periodbreakday`.

### Statistics types[](#finance-management/statistic/query-statistics/statistics-types)

| Type | Value of description field | Description of type | Available resolutions |
| --- | --- | --- | --- |
| `balances-by-account` | Identifier of an account | Balances over time by each account | `DAILY` `MONTHLY` `MONTHLY_ADJUSTED` |
| `balances-by-account-type-group` | The type group name | Balances over time by each account group. `CHECKING`, `CREDIT_CARD` and `OTHER` account type will map to `CARDS_AND_ACCOUNTS`. `MORTGAGE` and `LOAN` map to `LOANS`. `INVESTMENT`, `PENSION` and `SAVINGS` map to `SAVINGS` | `DAILY` `WEEKLY` `MONTHLY` `MONTHLY_ADJUSTED` |
| `carbon-by-category` | Identifier of a category | Sum of carbon footprints per period in each category. _Note: This feature is not enabled by default. Speak to your account manager for more information._ | `MONTHLY` `MONTHLY_ADJUSTED` `DAILY` `WEEKLY` `QUARTERLY` |
| `carbon-by-primary-category` | Identifier of a primary category | Combined sum of all carbon footprints of child-categories per period in each primary category. _Note: This feature is not enabled by default. Speak to your account manager for more information._ | `MONTHLY` `MONTHLY_ADJUSTED` `DAILY` `WEEKLY` `QUARTERLY` |
| `carbon-by-tag` | Carbon tag | Combined sum of all carbon footprints grouped by tags placed in the transaction notes field. _Note: This feature is not enabled by default. Speak to your account manager for more information._ | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` `WEEKLY` `DAILY` |
| `expenses-by-brand` | Identifier of a brand | The sum of expenses by brand _Note: This feature is not enabled by default. Speak to your account manager for more information._ | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` `WEEKLY` `DAILY` |
| `expenses-by-brand/by-count` | Identifier of a brand | The amount of expenses by brand _Note: This feature is not enabled by default. Speak to your account manager for more information._ | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` `WEEKLY` `DAILY` |
| `expenses-by-brand/by-category` | Identifier of a category | The amount of expenses by brand in each category _Note: This feature is not enabled by default. Speak to your account manager for more information._ | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` `WEEKLY` `DAILY` |
| `expenses-by-brand-by-category/by-count` | Identifier of a category | Count of expenses per brand in each category _Note: This feature is not enabled by default. Speak to your account manager for more information._ | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` `WEEKLY` `DAILY` |
| `expenses-by-category` | Identifier of a category | Sum of expenses per period in each category | `MONTHLY` `MONTHLY_ADJUSTED` `YEARLY` `DAILY` `WEEKLY` `QUARTERLY` |
| `expenses-by-category/by-count` | Identifier of a category | Count of expenses per period in each category | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `DAILY` `WEEKLY` `QUARTERLY` |
| `expenses-by-cost-structure` | The type of expense | The sum of expenses per period in each cost type _Note: This feature is not enabled by default. Speak to your account manager for more information._ | `DAILY, MONTHLY, MONTHLY_ADJUSTED` |
| `expenses-by-primary-category` | Identifier of a primary category | Combined sum of all expenses of child-categories per period in each primary category | `MONTHLY` `MONTHLY_ADJUSTED` `YEARLY` `DAILY` `WEEKLY` `QUARTERLY` |
| `expenses-by-primary-category/by-count` | Identifier of a primary category | Combined count of all expenses of child-categories per period in each primary category | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `DAILY` `WEEKLY` `QUARTERLY` |
| `expenses-by-tag` | Category tag | Combined sum of all expenses grouped by tags placed in the transaction notes field | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` `WEEKLY` `DAILY` |
| `expenses-by-tag/by-count` | Category tag | Count of all expenses grouped by tags placed in the transaction notes field | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` `WEEKLY` `DAILY` |
| `expenses-by-subscription` | Identifier of a subscription | Sum of the expenses by subscription _Note: This feature is not enabled by default. Speak to your account manager for more information._ | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` |
| `expenses-by-subscription/average` | Identifier of a subscription | Average amount of the expenses by subscription _Note: This feature is not enabled by default. Speak to your account manager for more information._ | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` |
| `income-by-category` | Identifier of a category | Sum of Incomes per period in each category | `YEARLY` `QUARTERLY` `MONTHLY` `MONTHLY_ADJUSTED` `WEEKLY` `DAILY` |
| `income-by-category/by-count` | Identifier of a category | Count of all Incomes per period in each category _Note: This feature is not enabled by default. Speak to your account manager for more information._ | `YEARLY` `QUARTERLY` `MONTHLY` `MONTHLY_ADJUSTED` `WEEKLY` `DAILY` |
| `income-and-expenses` | Identifier of type | Sum of transactions per period for category type | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `DAILY` |
| `income-by-tag` | Category tag | Combined sum of all incomes grouped by tags placed in the transaction notes field | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` `WEEKLY` `DAILY` |
| `income-by-tag/by-count` | Category tag | Count of all incomes grouped by tags placed in the transaction notes field | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` `WEEKLY` `DAILY` |
| `incoming-transfers-by-category` | Identifier of a category | Sum of incoming transfers per period in each category | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` `WEEKLY` `DAILY` |
| `incoming-transfers-by-category/by-count` | Identifier of a category | Count of incoming transfers per period in each category | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` `WEEKLY` `DAILY` |
| `left-to-spend` | The date | What is left of income minus expenses in a monthly period, to a minimum of 0 | `DAILY` `MONTHLY` `MONTHLY_ADJUSTED` |
| `left-to-spend-average` | The date | Average left to spend on the day of the month for the last 6 monthly periods. If a requested day doesn't exist in a month it defaults to the last day of that month. For example: if the requested day is 31 it returns the left to spend for day 28 in February | `MONTHLY` `MONTHLY_ADJUSTED` |
| `outgoing-transfers-by-category` | Identifier of a category | Sum of outgoing transfers per period in each category | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` `WEEKLY` `DAILY` |
| `outgoing-transfers-by-category/by-count` | Identifier of a category | Count of outgoing transfers per period in each category | `YEARLY` `MONTHLY` `MONTHLY_ADJUSTED` `QUARTERLY` `WEEKLY` `DAILY` |
| `safe-to-spend` | Day of the period | What is left of income minus expenses - including past and future recurring transactions for that month period _Note: This feature is not enabled by default. Speak to your account manager for more information._ | `DAILY` `MONTHLY` `MONTHLY_ADJUSTED` |

### Works with[](#finance-management/statistic/query-statistics/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `statistics:read` |

> Request Example

```
{
  "accountIdIn": [
    "7eb910d23fc247d99e9d2ee103605518",
    "fc46bd02042b4cc6bac8de9951bcdd58"
  ],
  "description": "fe9e199c2ca94c12baf1f3eb4a4122de",
  "padResultUntilToday": true,
  "periodGte": "2021-01-01",
  "periodLte": "2021-01-01",
  "periods": [
    "2014-02-11",
    "2014-02-12"
  ],
  "resolution": "DAILY",
  "tags": [
    "entertainment",
    "groceries"
  ],
  "types": [
    "expenses-by-category"
  ]
}
```

### Request Body: StatisticQuery[](#finance-management/statistic/query-statistics/request-body-statisticquery)

The query object

accountIdIn `array[string]`

List of accounts that should be included when calculating statistics. Passing empty list or omitting this parameter will include all available accounts in the query. Account exclusion flags will not be checked for accounts specified this way - that is the responsibility of the caller.

description `string`

Identifier of the data the statistic represents, used with conjunction with `types` field. For example when `types` field is set to `expenses-by-category` this field contain a category ID.

padResultUntilToday `boolean`

Indicates if the result should be flat filled until the period of today.

periodGte `string`

Date of the earliest period to be returned. ISO8601 format: `YYYY-MM-DD`. If the date is in the middle of the period specified by the resolution, it will be adjusted to the start of the period. NOTE: this is mutually exclusive with `periods` field and needs to be used in conjunction with 'periodLte'

periodLte `string`

Date of the latest period to be returned. ISO8601 format: `YYYY-MM-DD`. If the date is in the middle of the period specified by the resolution, it will be adjusted to the start of the period. NOTE: this is mutually exclusive with `periods` field and needs to be used in conjunction with 'periodGte'

periods `array[string]`

Time periods for the statistics: year, month, quarter, week or day. Format: `2014`, `2014-02`, `2014-Q2`, `2014:45` or `2014-02-12`. NOTE: this is mutually exclusive with `periodGte` and `periodLte` query fields.

resolution `string`

Resolution for the statistics. Note that monthly statistics will be calculated only with the resolution that the user has in the user settings (`MONTHLY`, `MONTHLY_ADJUSTED`), and not for both.  
Values: `DAILY`, `WEEKLY`, `MONTHLY`, `MONTHLY_ADJUSTED`, `QUARTERLY`, `YEARLY`

tags `array[string]`

Tag list that will be used as a filter for transactions.

types `array[string]`

A list of types of statistics. Default: `expenses-by-category`, `income-by-category`, `left-to-spend`, `left-to-spend-average`. Read more about statistics for type" information.

> Response Example

```
[
  {
    "description": "fe9e199c2ca94c12baf1f3eb4a4122de",
    "payload": "690667930d7e4f2ba0d9aa5f7d2a1941",
    "period": "2014-12-15",
    "resolution": "DAILY",
    "type": "expenses-by-category",
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "value": -1298.5
  }
]
```

### Response: array\[[Statistic](#tag-statistic)\][](#finance-management/statistic/query-statistics/response-array-statistic-)

Statistics contain derived data from different types of information which is available for a user. It could be based on information such as expenses, incomes or balances. As an example, statistics could be a time series of travel expenses calculated monthly for the last six months.

See [Statistic](#tag-statistic) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | Successful operation. |
| 400 | The payload does not pass validation. |
| 401 | If the user is not authorized. |

## Subscriptions[](#finance-management/subscriptions)

A high level representation of a subscription. It a summary of user's subscription.

### The Subscriptions model[](#finance-management/subscriptions/the-subscriptions-model)

accountId `string`

The ID of the account connected to the subscription.

brand `Brand`

Response object contains the brand's name, logo and contact information

categoryId `string`

Subscription category ID.

description `string`

Description of the subscription

startDate `string`

Starting date of the subscription.

subscriptionCost `Amount`

The current cost of the subscription, including currency

subscriptionId `string`

The ID of the subscription.

totalSubscriptionSpend `Amount`

The total spent amount on the subscription, including currency

#### Brand[](#finance-management/subscriptions/the-subscriptions-model/brand)

contact `BrandContact`

id `string`

logoUrl `string`

name `string`

#### BrandContact[](#finance-management/subscriptions/the-subscriptions-model/brandcontact)

website `string`

#### Amount[](#finance-management/subscriptions/the-subscriptions-model/amount)

currencyCode `string` required

The ISO 4217 currency code of the amount

value `AmountValue` required

#### AmountValue[](#finance-management/subscriptions/the-subscriptions-model/amountvalue)

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

## List subscription transactions[](#finance-management/subscriptions/list-subscription-transactions)

`GET /finance-management/v1/subscriptions/{subscriptionId}/transactions`

Lists all transactions belonging to the subscription.

### Works with[](#finance-management/subscriptions/list-subscription-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `subscriptions:read` |

### Parameters[](#finance-management/subscriptions/list-subscription-transactions/parameters)

| Parameter | Description |
| --- | --- |
| subscriptionIdrequired | ID of the subscription |

### Query Parameters[](#finance-management/subscriptions/list-subscription-transactions/query-parameters)

| Parameter | Description |
| --- | --- |
| pageToken | (Optional) The first token is presented on the response of the first call if there are multiple pages. |
| pageSize | (Optional) Size of the page to fetch. |

> Response Example

```
{
  "nextPageToken": "MQ==",
  "subscriptionId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "transactions": [
    {
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        }
      },
      "date": "2024-07-10",
      "id": "d9f134ee2eb44846a4e02990ecc8d32e"
    }
  ]
}
```

### Response: ListTransactions[](#finance-management/subscriptions/list-subscription-transactions/response-listtransactions)

List of all transactions belonging to a subscription.

nextPageToken `string`

Next page token to be used for pagination, use it with the next request parameter `page_token` to request the next page of the list.

subscriptionId `string`

transactions `array[Transaction]`

#### Transaction[](#finance-management/subscriptions/list-subscription-transactions/response-listtransactions/transaction)

amount `[Amount](#tag-subscriptions-amount)`

The amount of the transaction, including currency

date `string`

The date of a transaction, ISO 8601 formatted date (yyyy-MM-dd).

id `string`

The ID of the transaction.

| Status Code | Description |
| --- | --- |
| 200 | List of subscription transactions. |
| 401 | If the user is not authorized. |
| 404 | If the provided subscriptionId is not found. |

## List user subscriptions[](#finance-management/subscriptions/list-user-subscriptions)

`GET /finance-management/v1/subscriptions`

Lists all subscriptions belonging to the user. Optionally it can be filtered for specific accounts.

### Works with[](#finance-management/subscriptions/list-user-subscriptions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `subscriptions:read` |

### Query Parameters[](#finance-management/subscriptions/list-user-subscriptions/query-parameters)

| Parameter | Description |
| --- | --- |
| accountId | (Optional) List of user accounts. |
| pageToken | (Optional) The first token is presented on the response of the first call if there are multiple pages. |
| pageSize | (Optional) Size of the page to fetch. |

> Response Example

```
{
  "nextPageToken": "MQ==",
  "subscriptions": [
    {
      "accountId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "brand": {
        "contact": {
          "website": "string"
        },
        "id": "string",
        "logoUrl": "string",
        "name": "string"
      },
      "categoryId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "description": "Netflix",
      "startDate": "2024-07-01",
      "subscriptionCost": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        }
      },
      "subscriptionId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "totalSubscriptionSpend": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        }
      }
    }
  ]
}
```

### Response: ListSubscriptions[](#finance-management/subscriptions/list-user-subscriptions/response-listsubscriptions)

List of user's subscriptions.

nextPageToken `string`

Next page token to be used for pagination, use it with the next request parameter `page_token` to request the next page of the list.

subscriptions `array[[Subscriptions](#tag-subscriptions)]`

| Status Code | Description |
| --- | --- |
| 200 | List of user subscriptions. |
| 401 | If the user is not authorized. |
| 403 | If the App is not authorized. |
