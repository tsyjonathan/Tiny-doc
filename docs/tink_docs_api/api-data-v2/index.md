---
title: "Tink Docs"
source: "/Tiny-doc/tink_docs_api/api-data-v2/"
exportedAt: "2026-01-13T13:03:16.893Z"
---
## Data v2[](/Tiny-doc/tink_docs_api/api-data-v2/)

The Data v2 section contains resources that are used by multiple account information products, including Transactions.

List accounts, account balances, account parties, get and list investment accounts, list holdings, list and get loan accounts, list transactions, and get a Transactions report.

## Account[](#data-v2/account)

## Get Account[](#data-v2/account/get-account)

`GET /data/v2/accounts/{id}`

Returns an account for given user and id.

### Works with[](#data-v2/account/get-account/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `accounts:read` |

### Parameters[](#data-v2/account/get-account/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | Account id to return |

> Response Example

```
{
  "balances": {
    "booked": {
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": "-3",
          "unscaledValue": "19"
        }
      }
    }
  },
  "customerSegment": "UNDEFINED_CUSTOMER_SEGMENT",
  "dates": {
    "lastRefreshed": "2020-12-15T12:16:58Z"
  },
  "externalAccountId": "string",
  "financialInstitutionId": "6e68cc6287704273984567b3300c5822",
  "id": "ee7ddbd178494220bb184791783f4f63",
  "identifiers": {
    "financialInstitution": {
      "accountNumber": "SE6930000000011273547693"
    },
    "iban": {
      "bban": "0000011273547693",
      "iban": "SE6930000000011273547693"
    },
    "pan": {
      "masked": "4000 12** **** 9010"
    }
  },
  "name": "PERSONKONTO",
  "type": "CHECKING"
}
```

### Response: Account[](#data-v2/account/get-account/response-account)

balances `Balances`

Account balances.

customerSegment `CustomerSegment`

Indicates whether the account belongs to a financial product offered to individuals or business customers.

dates `Dates` required

Applicable dates.

externalAccountId `string`

External identifier of the account provided by the ingesting party. Only populated for Connector customer accounts and not for aggregated accounts.

financialInstitutionId `string`

ID of the financial institution the account belongs to. Since this field is applicable for aggregated accounts only, a Customer using Connector to ingest accounts can distinguish the different types of accounts by checking if this field is set or not.

id `string` required

Tink unique identifier for the account report. Generated at the moment of report creation.

identifiers `Identifiers`

Available identifiers.

name `string` required

Name of the account assigned by the account holder or by the financial institution. This field is typically what the user recognises in their online banking app.

type `Type` required

Specifies the type of account.  
Note: Since new types can be added as the product evolves, make sure your implementation is resiliently handling any unrecognized value returned in the API response. Account types:  
`CHECKING`: A Checking account.  
`SAVINGS`: A Savings account.  
`CREDIT_CARD`: A Credit Card account.

#### Balances[](#data-v2/account/get-account/response-account/balances)

available `Balance`

Total available balance.

booked `Balance`

Total booked balance.

#### Balance[](#data-v2/account/get-account/response-account/balance)

amount `CurrencyDenominatedAmount`

Monetary amount.

#### CurrencyDenominatedAmount[](#data-v2/account/get-account/response-account/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#data-v2/account/get-account/response-account/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### CustomerSegment[](#data-v2/account/get-account/response-account/customersegment)

| Value | Description |
| --- | --- |
| UNDEFINED\_CUSTOMER\_SEGMENT |  |
| PERSONAL |  |
| BUSINESS |  |

#### Dates[](#data-v2/account/get-account/response-account/dates)

lastRefreshed `Date` required

Timestamp of last account data refresh (date and time in ISO-8601 standard).

#### Identifiers[](#data-v2/account/get-account/response-account/identifiers)

financialInstitution `FinancialInstitution`

Internal identifier from the financial institution

iban `IBAN`

IBAN account identifier.

pan `Pan`

Pan identifier.

sortCode `SortCode`

Sort code account identifier.

#### FinancialInstitution[](#data-v2/account/get-account/response-account/financialinstitution)

accountNumber `string` required

The number that the user would typically recognize as their account number, for example when selecting their account in a list. For card-based accounts where the card number is also the unique account identifier, this field contains the masked PAN. For US accounts, this field would typically contain the last 4 digits of the full account number.

referenceNumbers `object`

Additional identifiers used by the financial institution to uniquely reference the account.

#### IBAN[](#data-v2/account/get-account/response-account/iban)

bban `string` required

BBAN represents an country-specific bank account number.

bic `string`

BIC bank number. This can be inferred from the IBAN, but some banks might require it for adding a beneficiary or will display it for existing accounts owned by the user.

iban `string` required

IBAN represents an international bank account number.

#### Pan[](#data-v2/account/get-account/response-account/pan)

masked `string` required

The masked PAN (card number).

#### SortCode[](#data-v2/account/get-account/response-account/sortcode)

accountNumber `string` required

The BACS account number.

code `string` required

The sort code of the account.

#### Type[](#data-v2/account/get-account/response-account/type)

| Value | Description |
| --- | --- |
| UNDEFINED | Not used. |
| CHECKING | Checking account. |
| SAVINGS | Savings account. |
| CREDIT\_CARD | Credit card account. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 401 | Authorization token is missing, or not valid |
| 403 | You are not allowed to access the requested resource |
| 404 | Account doesn't exist |
| default | An unexpected error response. |

## Get Account BalancesBeta[](#data-v2/account/get-account-balances)

`GET /data/v2/accounts/{id}/balances`

Signage on balances: The balance amount signage is either positive or negative -

1.  A balance that is `positive` indicates there are funds available to be spent.
2.  A balance that is `negative` indicates that the user owes funds to the financial institution. The above is true for both depository accounts and credit accounts.

### Works with[](#data-v2/account/get-account-balances/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `accounts.balances:readonly` `accounts:read` |
| Client token | `accounts.balances:readonly` `accounts:read` |

### Parameters[](#data-v2/account/get-account-balances/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | AccountId |

> Response Example

```
{
  "accountId": "a6bb87e57a8c4dd4874b241471a2b9e8",
  "balances": {
    "availableBalanceExcludingCredit": {
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        },
        "valueInMinorUnit": 1050
      }
    },
    "availableBalanceIncludingCredit": {
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        },
        "valueInMinorUnit": 1050
      }
    },
    "bookedBalance": {
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        },
        "valueInMinorUnit": 1050
      }
    }
  },
  "creditLimit": {
    "amount": {
      "currencyCode": "EUR",
      "value": {
        "scale": 2,
        "unscaledValue": 1050
      },
      "valueInMinorUnit": 1050
    }
  },
  "refreshed": "2022-09-27T15:01:40Z"
}
```

### Response: Balances[](#data-v2/account/get-account-balances/response-balances)

accountId `string`

The internal identifier of account.

balances `BalanceDetails`

Contains the different type of balances for the selected account.

creditLimit `Balance`

`Depository Accounts (Checking Accounts and Savings Accounts)`: Pre arranged aggregated overdraft limit on the account. `Credit Cards`: The total amount of credit extended to the credit account.

refreshed `Date`

Last refreshed time of this account, ISO 8601 date and time format in UTC (YYYY-MM-DDThh:mm:ssZ).

#### BalanceDetails[](#data-v2/account/get-account-balances/response-balances/balancedetails)

availableBalanceExcludingCredit `Balance`

`Depository Accounts only`: The amount of funds the customer is able to withdraw from the account, not including any credit facility that may be available. The balance includes pending inflows or outflows on the account.

availableBalanceIncludingCredit `Balance`

`Depository Accounts`: The amount of funds the customer is able to withdraw from the account, including any overdraft facility that may be available. The balance will include any pending inflows or pending outflows on the account. `Credit Cards`: The amount available to spend on the credit card. Credit limit minus the booked balance and any pending inflows or pending outflows on the account. The amount is positive unless the customer has exceeded the credit made available to them.

bookedBalance `Balance`

`Depository Accounts`: The current balance of the account at the end of an account reporting period. This is not including any overdraft, any pending inflows or outflows on the account. `Credit Cards`: The balance of outstanding (not yet repaid) purchases made on credit minus the repayments made. The balance does not include any pending inflows or outflows on the account.

#### Balance[](#data-v2/account/get-account-balances/response-balances/balance)

amount `CurrencyDenominatedAmount` required

Monetary amount.

#### CurrencyDenominatedAmount[](#data-v2/account/get-account-balances/response-balances/currencydenominatedamount)

currencyCode `string` required

The ISO 4217 currency code of the amount

value `DenominatedAmount` required

The value representation of the monetary amount.

valueInMinorUnit `integer` required

The valueInMinorUnit field represents the amount of the balance in the smallest unit of the specified currency. This value ensures precision by avoiding floating-point arithmetic errors. For instance, in the case of USD (United States Dollar), where 1 USD equals 100 cents, a balance of $10.50 would be represented as 1050 in the valueInMinorUnit field.

#### DenominatedAmount[](#data-v2/account/get-account-balances/response-balances/denominatedamount)

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
| 200 | Successful. |
| 400 | Incorrect request parameters or user data missing. |

## Get Account Parties[](#data-v2/account/get-account-parties)

`GET /data/v2/accounts/{id}/parties`

Returns accounts parties

### Works with[](#data-v2/account/get-account-parties/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `accounts:read` `accounts.parties:readonly` |

### Parameters[](#data-v2/account/get-account-parties/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | Account id |

> Response Example

```
{
  "parties": [
    {
      "identity": {
        "name": "John Doe",
        "ssn": "19670220-1234"
      },
      "role": "HOLDER"
    }
  ]
}
```

### Response: AccountParties[](#data-v2/account/get-account-parties/response-accountparties)

parties `array[AccountParty]` required

List of parties. A party is a person or company associated with the account. An empty list will be returned when no parties are available for the account.

#### AccountParty[](#data-v2/account/get-account-parties/response-accountparties/accountparty)

identity `AccountIdentity` required

Information pertaining to the identity of the party.

role `string` required

The role of the party. Roles are defined as:  
`HOLDER`: A party that is legally responsible for the money of the account.  
`AUTHORIZED_USER`: A party that can operate the account, but it’s not legally the owner or responsible of the money of the account.  
`OTHER`: A party linked to the account that have a role that does not match any of the other documented roles, i.e a party with a role that is not an authorized user or a holder.  
`UNKNOWN`: Tink can not determine anything about the role, except that the party is associated with the specified account.

Values: `HOLDER`, `AUTHORIZED_USER`, `OTHER`, `UNKNOWN`

#### AccountIdentity[](#data-v2/account/get-account-parties/response-accountparties/accountidentity)

name `string`

Name of the party.

ssn `string`

Social security number or national identification number of the user.

| Status Code | Description |
| --- | --- |
| 200 | Successful. |
| 400 | Invalid request. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |
| 404 | Account not found. |

## List Accounts[](#data-v2/account/list-accounts)

`GET /data/v2/accounts`

Returns a list of accounts for a user.

### Works with[](#data-v2/account/list-accounts/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `accounts:read` |

### Query Parameters[](#data-v2/account/list-accounts/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSize | The maximum number of items to return. This endpoint will not return more than 100 accounts per page. |
| pageToken | The next\_page\_token value returned from a previous List request, if any. |
| idIn | If set, only the account with the given id will be returned. This parameter may be repeated to specify multiple account ids. |
| typesIn | If set, only accounts with the given account types will be returned. This parameter may be repeated to specify multiple account types.
\- UNDEFINED: Not used.  
\- CHECKING: Checking account.  
\- SAVINGS: Savings account.  
\- CREDIT\_CARD: Credit card account.  
Values: `UNDEFINED`, `CHECKING`, `SAVINGS`, `CREDIT_CARD`

 |

> Response Example

```
{
  "accounts": [
    {
      "balances": {
        "booked": {
          "amount": {
            "currencyCode": "EUR",
            "value": {
              "scale": "-3",
              "unscaledValue": "19"
            }
          }
        }
      },
      "customerSegment": "UNDEFINED_CUSTOMER_SEGMENT",
      "dates": {
        "lastRefreshed": "2020-12-15T12:16:58Z"
      },
      "externalAccountId": "string",
      "financialInstitutionId": "6e68cc6287704273984567b3300c5822",
      "id": "ee7ddbd178494220bb184791783f4f63",
      "identifiers": {
        "financialInstitution": {
          "accountNumber": "SE6930000000011273547693"
        },
        "iban": {
          "bban": "0000011273547693",
          "iban": "SE6930000000011273547693"
        },
        "pan": {
          "masked": "4000 12** **** 9010"
        }
      },
      "name": "PERSONKONTO",
      "type": "CHECKING"
    }
  ],
  "nextPageToken": "string"
}
```

### Response: ListAccountsResponse[](#data-v2/account/list-accounts/response-listaccountsresponse)

accounts `array[Account]`

There will be a maximum number of items returned based on the page\_size field int the request.

nextPageToken `string`

Token to retrieve the next page of results, or empty if there are no more results in the list.

#### Account[](#data-v2/account/list-accounts/response-listaccountsresponse/account)

balances `Balances`

Account balances.

customerSegment `CustomerSegment`

Indicates whether the account belongs to a financial product offered to individuals or business customers.

dates `Dates` required

Applicable dates.

externalAccountId `string`

External identifier of the account provided by the ingesting party. Only populated for Connector customer accounts and not for aggregated accounts.

financialInstitutionId `string`

ID of the financial institution the account belongs to. Since this field is applicable for aggregated accounts only, a Customer using Connector to ingest accounts can distinguish the different types of accounts by checking if this field is set or not.

id `string` required

Tink unique identifier for the account report. Generated at the moment of report creation.

identifiers `Identifiers`

Available identifiers.

name `string` required

Name of the account assigned by the account holder or by the financial institution. This field is typically what the user recognises in their online banking app.

type `Type` required

Specifies the type of account.  
Note: Since new types can be added as the product evolves, make sure your implementation is resiliently handling any unrecognized value returned in the API response. Account types:  
`CHECKING`: A Checking account.  
`SAVINGS`: A Savings account.  
`CREDIT_CARD`: A Credit Card account.

#### Balances[](#data-v2/account/list-accounts/response-listaccountsresponse/balances)

available `Balance`

Total available balance.

booked `Balance`

Total booked balance.

#### Balance[](#data-v2/account/list-accounts/response-listaccountsresponse/balance)

amount `CurrencyDenominatedAmount`

Monetary amount.

#### CurrencyDenominatedAmount[](#data-v2/account/list-accounts/response-listaccountsresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#data-v2/account/list-accounts/response-listaccountsresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### CustomerSegment[](#data-v2/account/list-accounts/response-listaccountsresponse/customersegment)

| Value | Description |
| --- | --- |
| UNDEFINED\_CUSTOMER\_SEGMENT |  |
| PERSONAL |  |
| BUSINESS |  |

#### Dates[](#data-v2/account/list-accounts/response-listaccountsresponse/dates)

lastRefreshed `Date` required

Timestamp of last account data refresh (date and time in ISO-8601 standard).

#### Identifiers[](#data-v2/account/list-accounts/response-listaccountsresponse/identifiers)

financialInstitution `FinancialInstitution`

Internal identifier from the financial institution

iban `IBAN`

IBAN account identifier.

pan `Pan`

Pan identifier.

sortCode `SortCode`

Sort code account identifier.

#### FinancialInstitution[](#data-v2/account/list-accounts/response-listaccountsresponse/financialinstitution)

accountNumber `string` required

The number that the user would typically recognize as their account number, for example when selecting their account in a list. For card-based accounts where the card number is also the unique account identifier, this field contains the masked PAN. For US accounts, this field would typically contain the last 4 digits of the full account number.

referenceNumbers `object`

Additional identifiers used by the financial institution to uniquely reference the account.

#### IBAN[](#data-v2/account/list-accounts/response-listaccountsresponse/iban)

bban `string` required

BBAN represents an country-specific bank account number.

bic `string`

BIC bank number. This can be inferred from the IBAN, but some banks might require it for adding a beneficiary or will display it for existing accounts owned by the user.

iban `string` required

IBAN represents an international bank account number.

#### Pan[](#data-v2/account/list-accounts/response-listaccountsresponse/pan)

masked `string` required

The masked PAN (card number).

#### SortCode[](#data-v2/account/list-accounts/response-listaccountsresponse/sortcode)

accountNumber `string` required

The BACS account number.

code `string` required

The sort code of the account.

#### Type[](#data-v2/account/list-accounts/response-listaccountsresponse/type)

| Value | Description |
| --- | --- |
| UNDEFINED | Not used. |
| CHECKING | Checking account. |
| SAVINGS | Savings account. |
| CREDIT\_CARD | Credit card account. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 401 | Authorization token is missing, or not valid |
| 403 | You are not allowed to access the requested resource |
| default | An unexpected error response. |

## Identity[](#data-v2/identity)

## List IdentitiesBeta[](#data-v2/identity/list-identities)

`GET /data/v2/identities`

Returns identities for user

### Works with[](#data-v2/identity/list-identities/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `identities:readonly` |

> Response Example

```
{
  "identities": [
    {
      "dateOfBirth": "1967-02-20",
      "financialInstitutionId": "6e68cc6287704273984567b3300c5822",
      "name": "John Doe",
      "providerName": "se-bank-oauth",
      "ssn": "19670220-1234"
    }
  ]
}
```

### Response: ListIdentitiesResponse[](#data-v2/identity/list-identities/response-listidentitiesresponse)

identities `array[Identity]`

#### Identity[](#data-v2/identity/list-identities/response-listidentitiesresponse/identity)

dateOfBirth `string`

Date of birth of the user, ISO 8601 date format (YYYY-MM-DD).

financialInstitutionId `string`

A unique identifier to group providers belonging the same financial institution.

name `string`

Full name of the user.

providerName `string` required

The provider from where the data was collected.

ssn `string`

Social security number or national identification number of the user.

| Status Code | Description |
| --- | --- |
| 200 | Successful. |
| 400 | Invalid request. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |

## Investment[](#data-v2/investment)

## Get Investment Account[](#data-v2/investment/get-investment-account)

`GET /data/v2/investment-accounts/{id}`

Returns an investment account for a given investment account id

### Works with[](#data-v2/investment/get-investment-account/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `investment-accounts:readonly` |

### Parameters[](#data-v2/investment/get-investment-account/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The identifier of the investment account. |

> Response Example

```
{
  "accountName": "My account",
  "balances": {
    "available": {
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        }
      }
    },
    "booked": {
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        }
      }
    }
  },
  "dates": {
    "lastRefreshed": "string"
  },
  "financialInstitutionId": "1ff0f75b01f94fcd9c0760ebea7443e2",
  "financialProduct": "ES_INVESTMENT",
  "holdingValue": {
    "bond": {
      "currencyCode": "EUR",
      "value": {
        "scale": 2,
        "unscaledValue": 1050
      }
    },
    "equity": {
      "currencyCode": "EUR",
      "value": {
        "scale": 2,
        "unscaledValue": 1050
      }
    },
    "fund": {
      "currencyCode": "EUR",
      "value": {
        "scale": 2,
        "unscaledValue": 1050
      }
    },
    "pensionPlan": {
      "currencyCode": "EUR",
      "value": {
        "scale": 2,
        "unscaledValue": 1050
      }
    },
    "total": {
      "currencyCode": "EUR",
      "value": {
        "scale": 2,
        "unscaledValue": 1050
      }
    }
  },
  "id": "efad4be863db4d6f9388a6adc148ac5c",
  "identifiers": {
    "accountNumber": "string",
    "iban": {
      "bban": 50000000050000000000,
      "bic": "SWEDSESSXXX",
      "iban": "SE4750000000050000000002"
    }
  },
  "monetaryAccountIdentifiers": {
    "iban": {
      "bban": 50000000050000000000,
      "bic": "SWEDSESSXXX",
      "iban": "SE4750000000050000000002"
    }
  },
  "parties": [
    {
      "identity": {
        "name": "string",
        "ssn": "string"
      },
      "role": "HOLDER"
    }
  ]
}
```

### Response: InvestmentAccount[](#data-v2/investment/get-investment-account/response-investmentaccount)

accountName `string`

Account name as seen in the financial institution.

balances `Balances`

Balances of the account. Absence of balances indicates that the account has no cash depository capability.

dates `Dates` required

Object containing important dates for this account.

financialInstitutionId `string` required

ID of the financial institution.

financialProduct `string` required

Identifies the financial product on the bank side. Uniformly defined for different banks within the same market. Different products may imply different tax schemes and other regulations.  
Note: Since new types can be added as the product evolves, make sure your implementation is resiliently handling any unrecognized value returned in the API response.  
Products:  
`ES_INVESTMENT` Spanish investment account.  
`ES_PENSION` Spanish pension account.  
`SE_ISK` Investeringssparkonto (Swedish investment savings account).  
`SE_KF` Kapitalförsäkring (Swedish endowment insurance account).  
`SE_AF` Aktie- och fondkonto (Swedish investment fund account).  
`SE_PENSION` Swedish pension account.

holdingValue `HoldingValue` required

Object containing holding values owned by the account.

id `string` required

Internal account identifier.

identifiers `AccountIdentifiers` required

Account identifiers.

monetaryAccountIdentifiers `MonetaryAccountIdentifiers`

If this investment account is linked to a checking account there will be identifiers of that linked account here.

parties `array[Party]` required

List of parties. A party is a person or company associated with the account. An empty list will be returned when no parties are available for the account.

#### Balances[](#data-v2/investment/get-investment-account/response-investmentaccount/balances)

available `Amount`

Object containing available balanced of the account.

booked `Amount`

Object containing booked balanced of the account.

#### Amount[](#data-v2/investment/get-investment-account/response-investmentaccount/amount)

amount `CurrencyDenominatedAmount` required

Object containing amount in a currency.

#### CurrencyDenominatedAmount[](#data-v2/investment/get-investment-account/response-investmentaccount/currencydenominatedamount)

currencyCode `string` required

The currency code which follows ISO-4217 standard.

value `ExactValue` required

The value representation of the monetary amount.

#### ExactValue[](#data-v2/investment/get-investment-account/response-investmentaccount/exactvalue)

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### Dates[](#data-v2/investment/get-investment-account/response-investmentaccount/dates)

lastRefreshed `Date` required

Last refreshed time of this account, ISO 8601 date and time format in UTC (YYYY-MM-DDThh:mm:ssZ).

#### HoldingValue[](#data-v2/investment/get-investment-account/response-investmentaccount/holdingvalue)

bond `CurrencyDenominatedAmount`

Object containing the total held value of bonds.

equity `CurrencyDenominatedAmount`

Object containing the total held value of your equities.

fund `CurrencyDenominatedAmount`

Object containing the total held value of your funds.

pensionPlan `CurrencyDenominatedAmount`

Object containing the total held value of your pension plans.

total `CurrencyDenominatedAmount` required

Object containing the total value of all holdings on your account. Note that if new holding types are introduced this value can change unexpectedly. Use at your own risk.

#### AccountIdentifiers[](#data-v2/investment/get-investment-account/response-investmentaccount/accountidentifiers)

accountNumber `string` required

Bank account number (local to the bank in question).

iban `Iban`

IBAN data of the account.

#### Iban[](#data-v2/investment/get-investment-account/response-investmentaccount/iban)

bban `string` required

BBAN represents a country-specific bank account number.

bic `string`

BIC bank number. This can be inferred from the IBAN, but some banks might require it for adding a beneficiary or will display it for existing accounts owned by the user

iban `string` required

IBAN account identifier.

#### MonetaryAccountIdentifiers[](#data-v2/investment/get-investment-account/response-investmentaccount/monetaryaccountidentifiers)

iban `Iban`

IBAN data of the owning account.

#### Party[](#data-v2/investment/get-investment-account/response-investmentaccount/party)

identity `Identity` required

Object containing identity data.

role `string` required

Role of the party in question.  
Values: `HOLDER`, `AUTHORIZED_USER`, `OTHER`, `UNKNOWN`

#### Identity[](#data-v2/investment/get-investment-account/response-investmentaccount/identity)

name `string`

ssn `string`

| Status Code | Description |
| --- | --- |
| 200 | Investment account successfully fetched. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |
| 404 | Investment account not found. |

## List Holdings[](#data-v2/investment/list-holdings)

`GET /data/v2/investment-accounts/{id}/holdings`

Returns a list of holdings for an investment account.

### Works with[](#data-v2/investment/list-holdings/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `investment-accounts:readonly` |

### Parameters[](#data-v2/investment/list-holdings/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The identifier of the investment account. |

### Query Parameters[](#data-v2/investment/list-holdings/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSizerequired | The maximum number of items to return (default value is 10, maximum value is 100) |
| pageTokenrequired | The nextPageToken value returned from a previous request, null for first request |

> Response Example

```
{
  "holdings": [
    {
      "accountId": "014851786434422dbe5abec1bc648a5c",
      "averageAcquisitionPrice": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        }
      },
      "financialInstrument": {
        "expenseRatio": 0,
        "expirationDate": "2024-03-10",
        "identifiers": {
          "isin": "US92826C8394",
          "pensionPlanIdentifier": "string"
        },
        "interestRate": 0,
        "marketIdentifierCode": "XNAS",
        "name": "Company Inc.",
        "nativeIsoCurrencyCode": "USD",
        "tickerSymbol": "MSFT",
        "type": "EQUITY"
      },
      "holdingPercentageReturn": 0,
      "holdingReturn": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        }
      },
      "holdingValue": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        }
      },
      "quantity": 10
    }
  ],
  "nextPageToken": "string"
}
```

### Response: ListHoldingsResponse[](#data-v2/investment/list-holdings/response-listholdingsresponse)

holdings `array[Holding]` required

Holdings associated with the account.

nextPageToken `string`

Next page token to be used for pagination, use it with the next request parameter pageToken to request the next page of the list

#### Holding[](#data-v2/investment/list-holdings/response-listholdingsresponse/holding)

accountId `string` required

The owning account id.

averageAcquisitionPrice `CurrencyDenominatedAmount`

Average acquisition price of the holding.

financialInstrument `FinancialInstrument` required

Object describing the owned holding.

holdingPercentageReturn `number`

Holdings value return in percentage, expressed in decimal form, e.g. 6% is expressed as 0.06 (means we have rise of 6%)

holdingReturn `CurrencyDenominatedAmount`

Amount of money returned by the holding.

holdingValue `CurrencyDenominatedAmount` required

Total value of the holding.

quantity `number` required

Number of shares owned of the holding. Can be returned in fractions

#### CurrencyDenominatedAmount[](#data-v2/investment/list-holdings/response-listholdingsresponse/currencydenominatedamount)

currencyCode `string` required

The currency code which follows ISO-4217 standard.

value `ExactValue` required

The value representation of the monetary amount.

#### ExactValue[](#data-v2/investment/list-holdings/response-listholdingsresponse/exactvalue)

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### FinancialInstrument[](#data-v2/investment/list-holdings/response-listholdingsresponse/financialinstrument)

expenseRatio `number`

Expense ratio of the financial instrument, in decimal form, e.g. 0.2% is expressed as 0.002.

expirationDate `string`

Date when bond expires. Only returned for Bonds.

identifiers `FinancialInstrumentIdentifiers`

Object containing financial instrument identifiers.

interestRate `number`

Interest rate of the financial instrument in decimal form, e.g. 0.3% is expressed as 0.003.

marketIdentifierCode `string`

Market identifier code(MIC) of the financial instrument, as per ISO 10383.

name `string` required

Name of the financial instrument.

nativeIsoCurrencyCode `string`

The ISO 4217 currency code that the financial instrument is traded in.

tickerSymbol `string`

Ticker symbol of the financial instrument.

type `string` required

Type of the financial instrument.  
Note: Since new types can be added as the product evolves, make sure your implementation is resiliently handling any unrecognized value returned in the API response.  
Possible investment types are:  
`FUND`, `BOND`, `EQUITY`, `PENSION_PLAN`

#### FinancialInstrumentIdentifiers[](#data-v2/investment/list-holdings/response-listholdingsresponse/financialinstrumentidentifiers)

isin `string`

An International Securities Identification Number (ISIN) uniquely identifies a security. Represented as per ISO 6166.

pensionPlanIdentifier `string`

Specific pension plan or fund in some markets.

| Status Code | Description |
| --- | --- |
| 200 | List holdings successfully fetched. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |

## List Investment Accounts[](#data-v2/investment/list-investment-accounts)

`GET /data/v2/investment-accounts`

Returns a list of investment accounts for a user.

### Works with[](#data-v2/investment/list-investment-accounts/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `investment-accounts:readonly` |

> Response Example

```
{
  "investmentAccounts": [
    {
      "accountName": "My account",
      "balances": {
        "available": {
          "amount": {
            "currencyCode": "EUR",
            "value": {
              "scale": 2,
              "unscaledValue": 1050
            }
          }
        },
        "booked": {
          "amount": {
            "currencyCode": "EUR",
            "value": {
              "scale": 2,
              "unscaledValue": 1050
            }
          }
        }
      },
      "dates": {
        "lastRefreshed": "string"
      },
      "financialInstitutionId": "1ff0f75b01f94fcd9c0760ebea7443e2",
      "financialProduct": "ES_INVESTMENT",
      "holdingValue": {
        "bond": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1050
          }
        },
        "equity": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1050
          }
        },
        "fund": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1050
          }
        },
        "pensionPlan": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1050
          }
        },
        "total": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1050
          }
        }
      },
      "id": "efad4be863db4d6f9388a6adc148ac5c",
      "identifiers": {
        "accountNumber": "string",
        "iban": {
          "bban": 50000000050000000000,
          "bic": "SWEDSESSXXX",
          "iban": "SE4750000000050000000002"
        }
      },
      "monetaryAccountIdentifiers": {
        "iban": {
          "bban": 50000000050000000000,
          "bic": "SWEDSESSXXX",
          "iban": "SE4750000000050000000002"
        }
      },
      "parties": [
        {
          "identity": {
            "name": "string",
            "ssn": "string"
          },
          "role": "HOLDER"
        }
      ]
    }
  ]
}
```

### Response: ListInvestmentAccountsResponse[](#data-v2/investment/list-investment-accounts/response-listinvestmentaccountsresponse)

investmentAccounts `array[InvestmentAccount]` required

List of investment account objects.

#### InvestmentAccount[](#data-v2/investment/list-investment-accounts/response-listinvestmentaccountsresponse/investmentaccount)

accountName `string`

Account name as seen in the financial institution.

balances `Balances`

Balances of the account. Absence of balances indicates that the account has no cash depository capability.

dates `Dates` required

Object containing important dates for this account.

financialInstitutionId `string` required

ID of the financial institution.

financialProduct `string` required

Identifies the financial product on the bank side. Uniformly defined for different banks within the same market. Different products may imply different tax schemes and other regulations.  
Note: Since new types can be added as the product evolves, make sure your implementation is resiliently handling any unrecognized value returned in the API response.  
Products:  
`ES_INVESTMENT` Spanish investment account.  
`ES_PENSION` Spanish pension account.  
`SE_ISK` Investeringssparkonto (Swedish investment savings account).  
`SE_KF` Kapitalförsäkring (Swedish endowment insurance account).  
`SE_AF` Aktie- och fondkonto (Swedish investment fund account).  
`SE_PENSION` Swedish pension account.

holdingValue `HoldingValue` required

Object containing holding values owned by the account.

id `string` required

Internal account identifier.

identifiers `AccountIdentifiers` required

Account identifiers.

monetaryAccountIdentifiers `MonetaryAccountIdentifiers`

If this investment account is linked to a checking account there will be identifiers of that linked account here.

parties `array[Party]` required

List of parties. A party is a person or company associated with the account. An empty list will be returned when no parties are available for the account.

#### Balances[](#data-v2/investment/list-investment-accounts/response-listinvestmentaccountsresponse/balances)

available `Amount`

Object containing available balanced of the account.

booked `Amount`

Object containing booked balanced of the account.

#### Amount[](#data-v2/investment/list-investment-accounts/response-listinvestmentaccountsresponse/amount)

amount `CurrencyDenominatedAmount` required

Object containing amount in a currency.

#### CurrencyDenominatedAmount[](#data-v2/investment/list-investment-accounts/response-listinvestmentaccountsresponse/currencydenominatedamount)

currencyCode `string` required

The currency code which follows ISO-4217 standard.

value `ExactValue` required

The value representation of the monetary amount.

#### ExactValue[](#data-v2/investment/list-investment-accounts/response-listinvestmentaccountsresponse/exactvalue)

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### Dates[](#data-v2/investment/list-investment-accounts/response-listinvestmentaccountsresponse/dates)

lastRefreshed `Date` required

Last refreshed time of this account, ISO 8601 date and time format in UTC (YYYY-MM-DDThh:mm:ssZ).

#### HoldingValue[](#data-v2/investment/list-investment-accounts/response-listinvestmentaccountsresponse/holdingvalue)

bond `CurrencyDenominatedAmount`

Object containing the total held value of bonds.

equity `CurrencyDenominatedAmount`

Object containing the total held value of your equities.

fund `CurrencyDenominatedAmount`

Object containing the total held value of your funds.

pensionPlan `CurrencyDenominatedAmount`

Object containing the total held value of your pension plans.

total `CurrencyDenominatedAmount` required

Object containing the total value of all holdings on your account. Note that if new holding types are introduced this value can change unexpectedly. Use at your own risk.

#### AccountIdentifiers[](#data-v2/investment/list-investment-accounts/response-listinvestmentaccountsresponse/accountidentifiers)

accountNumber `string` required

Bank account number (local to the bank in question).

iban `Iban`

IBAN data of the account.

#### Iban[](#data-v2/investment/list-investment-accounts/response-listinvestmentaccountsresponse/iban)

bban `string` required

BBAN represents a country-specific bank account number.

bic `string`

BIC bank number. This can be inferred from the IBAN, but some banks might require it for adding a beneficiary or will display it for existing accounts owned by the user

iban `string` required

IBAN account identifier.

#### MonetaryAccountIdentifiers[](#data-v2/investment/list-investment-accounts/response-listinvestmentaccountsresponse/monetaryaccountidentifiers)

iban `Iban`

IBAN data of the owning account.

#### Party[](#data-v2/investment/list-investment-accounts/response-listinvestmentaccountsresponse/party)

identity `Identity` required

Object containing identity data.

role `string` required

Role of the party in question.  
Values: `HOLDER`, `AUTHORIZED_USER`, `OTHER`, `UNKNOWN`

#### Identity[](#data-v2/investment/list-investment-accounts/response-listinvestmentaccountsresponse/identity)

name `string`

ssn `string`

| Status Code | Description |
| --- | --- |
| 200 | List of investment accounts successfully fetched. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |

## Loan[](#data-v2/loan)

## Get Loan Account[](#data-v2/loan/get-loan-account)

`GET /data/v2/loan-accounts/{id}`

Returns a loan account for a given loan account id.

### Works with[](#data-v2/loan/get-loan-account/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `loan-accounts:readonly` |

### Parameters[](#data-v2/loan/get-loan-account/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The identifier of the loan account. |

> Response Example

```
{
  "accountName": "My loan",
  "amountPaid": {
    "currencyCode": "EUR",
    "value": {
      "scale": 2,
      "unscaledValue": 1050
    }
  },
  "balances": {
    "initial": {
      "currencyCode": "EUR",
      "value": {
        "scale": 2,
        "unscaledValue": 1050
      }
    },
    "principal": {
      "currencyCode": "EUR",
      "value": {
        "scale": 2,
        "unscaledValue": 1050
      }
    }
  },
  "collateral": {
    "collateral": "New York, 123 Main Street"
  },
  "dates": {
    "lastRefreshed": "string"
  },
  "financialInstitutionId": "1ff0f75b01f94fcd9c0760ebea7443e2",
  "guarantor": {
    "name": "Jane Doe"
  },
  "id": "efad4be863db4d6f9388a6adc148ac5c",
  "identifiers": {
    "accountNumber": "12345678-1234"
  },
  "loanParts": [
    {
      "amountPaid": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        }
      },
      "balances": {
        "initial": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1050
          }
        },
        "principal": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1050
          }
        }
      },
      "dates": {
        "nextPaymentDate": "2021-02-28",
        "originationDate": "2019-08-15",
        "payoffExpectedDate": "2029-01-29",
        "previousPaymentDate": "2021-01-29"
      },
      "installment": {
        "amount": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1050
          }
        },
        "period": "MONTHLY"
      },
      "interestRate": {
        "margin": 5,
        "monthsBound": 5,
        "referenceIndex": "Euribor",
        "revisionDate": "2021-06-01",
        "value": 0,
        "variableRate": true
      },
      "loanPartNumber": "string"
    }
  ],
  "loanType": "MORTGAGE",
  "parties": [
    {
      "identity": {
        "name": "John Doe",
        "ssn": "19670220-1234"
      },
      "role": "HOLDER"
    }
  ]
}
```

### Response: LoanAccount[](#data-v2/loan/get-loan-account/response-loanaccount)

accountName `string`

A name of the loan, as seen in the bank.

amountPaid `CurrencyDenominatedAmount`

Total amount paid (amortised), as an aggregated sum of all loan parts.

balances `Balances`

Contains the different types of account balances, as an aggregated sum of all loan parts.

collateral `Collateral`

Representing loan collateral such as an address.

dates `AccountDates` required

Object containing important dates for this account object.

financialInstitutionId `string` required

ID of the financial institution.

guarantor `Guarantor`

Guarantor of the loan/mortgage.

id `string` required

Internal Tink ID of the account.

identifiers `LoanIdentifiers` required

Loan identifiers.

loanParts `array[LoanPart]`

The parts of a loan with specific fields for each part.

loanType `string` required

Specifies the type of loan whenever a classification can be made.  
Note: Since new types can be added as the product evolves, make sure your implementation is resiliently handling any unrecognized value returned in the API response.  
Current loan types:  
\* `UNDEFINED`: We are not able to classify the type of loan.  
\* `MORTGAGE`: A mortgage loan.  
\* `PERSONAL`: Any other type of personal loan.  
\* `VEHICLE`: A loan for funding a vehicle, typically with the vehicle as collateral.  
\* `STUDENT`: A student loan.  

parties `array[Party]` required

List of parties.

#### CurrencyDenominatedAmount[](#data-v2/loan/get-loan-account/response-loanaccount/currencydenominatedamount)

currencyCode `string` required

The currency code which follows ISO-4217 standard.

value `ExactValue` required

The value representation of the monetary amount.

#### ExactValue[](#data-v2/loan/get-loan-account/response-loanaccount/exactvalue)

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### Balances[](#data-v2/loan/get-loan-account/response-loanaccount/balances)

initial `CurrencyDenominatedAmount`

Initial balance of the loan with debt expressed as a negative number.

principal `CurrencyDenominatedAmount` required

Current balance of the loan with debt expressed as a negative number.

#### Collateral[](#data-v2/loan/get-loan-account/response-loanaccount/collateral)

collateral `string`

String representing loan collateral such as an address.

#### AccountDates[](#data-v2/loan/get-loan-account/response-loanaccount/accountdates)

lastRefreshed `Date` required

Last refreshed time of this account, ISO 8601 date and time format in UTC (YYYY-MM-DDThh:mm:ssZ).

#### Guarantor[](#data-v2/loan/get-loan-account/response-loanaccount/guarantor)

name `string`

Guarantor of the loan/mortgage.

#### LoanIdentifiers[](#data-v2/loan/get-loan-account/response-loanaccount/loanidentifiers)

accountNumber `string`

Local bank identifier of the loan, typically a bank side loan number. If this loan is split into parts this is the identifier shared amongst them.

#### LoanPart[](#data-v2/loan/get-loan-account/response-loanaccount/loanpart)

amountPaid `CurrencyDenominatedAmount`

Total amount paid (amortised).

balances `Balances` required

Contains the different type of account balances.

dates `LoanDates`

Loan part dates

installment `Installment`

Payment installment information.

interestRate `InterestRate` required

Interest Rate applied to the loan or mortgage.

loanPartNumber `string`

Sub identifier of a specific loan part.

#### LoanDates[](#data-v2/loan/get-loan-account/response-loanaccount/loandates)

nextPaymentDate `string`

Next loan payment date, ISO 8601 date format (YYYY-MM-DD).

originationDate `string`

Date when loan was initiated, ISO 8601 date format (YYYY-MM-DD).

payoffExpectedDate `string`

The date when the loan is expected to be paid off, ISO 8601 date format (YYYY-MM-DD).

previousPaymentDate `string`

Previous payment date, ISO 8601 date format (YYYY-MM-DD).

#### Installment[](#data-v2/loan/get-loan-account/response-loanaccount/installment)

amount `CurrencyDenominatedAmount`

The amount paid per period.

period `string`

Represents how often the amount is due.  
Can be any of:  
\* `MONTHLY`  
\* `QUARTERLY`  
\* `YEARLY`

#### InterestRate[](#data-v2/loan/get-loan-account/response-loanaccount/interestrate)

margin `number`

The margin applied towards a reference rate identified by the referenceIndex. Value in percent.

monthsBound `integer`

Number of months that the interest rate is bound. Should be positive if present.

referenceIndex `string`

Reference index of the loan.

revisionDate `string`

Revision date of the interest rate, ISO 8601 date format (YYYY-MM-DD).

value `number` required

Interest rate in decimal form, e.g. 4.565% is expressed as 0.04565.

variableRate `boolean`

Boolean value indicating if the interest rate in question is variable.

#### Party[](#data-v2/loan/get-loan-account/response-loanaccount/party)

identity `Identity` required

Information pertaining to the identity of the party.

role `string` required

#### Identity[](#data-v2/loan/get-loan-account/response-loanaccount/identity)

name `string`

Name of the party.

ssn `string`

Social security number of the user.

| Status Code | Description |
| --- | --- |
| 200 | Loan account successfully fetched. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |
| 404 | Loan account not found. |

## List Loan Accounts[](#data-v2/loan/list-loan-accounts)

`GET /data/v2/loan-accounts`

Returns a list of loan accounts for a user.

### Works with[](#data-v2/loan/list-loan-accounts/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `loan-accounts:readonly` |

> Response Example

```
{
  "loanAccounts": [
    {
      "accountName": "My loan",
      "amountPaid": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1050
        }
      },
      "balances": {
        "initial": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1050
          }
        },
        "principal": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1050
          }
        }
      },
      "collateral": {
        "collateral": "New York, 123 Main Street"
      },
      "dates": {
        "lastRefreshed": "string"
      },
      "financialInstitutionId": "1ff0f75b01f94fcd9c0760ebea7443e2",
      "guarantor": {
        "name": "Jane Doe"
      },
      "id": "efad4be863db4d6f9388a6adc148ac5c",
      "identifiers": {
        "accountNumber": "12345678-1234"
      },
      "loanParts": [
        {
          "amountPaid": {
            "currencyCode": "EUR",
            "value": {
              "scale": 2,
              "unscaledValue": 1050
            }
          },
          "balances": {
            "initial": {
              "currencyCode": "EUR",
              "value": {
                "scale": 2,
                "unscaledValue": 1050
              }
            },
            "principal": {
              "currencyCode": "EUR",
              "value": {
                "scale": 2,
                "unscaledValue": 1050
              }
            }
          },
          "dates": {
            "nextPaymentDate": "2021-02-28",
            "originationDate": "2019-08-15",
            "payoffExpectedDate": "2029-01-29",
            "previousPaymentDate": "2021-01-29"
          },
          "installment": {
            "amount": {
              "currencyCode": "EUR",
              "value": {
                "scale": 2,
                "unscaledValue": 1050
              }
            },
            "period": "MONTHLY"
          },
          "interestRate": {
            "margin": 5,
            "monthsBound": 5,
            "referenceIndex": "Euribor",
            "revisionDate": "2021-06-01",
            "value": 0,
            "variableRate": true
          },
          "loanPartNumber": "string"
        }
      ],
      "loanType": "MORTGAGE",
      "parties": [
        {
          "identity": {
            "name": "John Doe",
            "ssn": "19670220-1234"
          },
          "role": "HOLDER"
        }
      ]
    }
  ]
}
```

### Response: ListLoanAccountsResponse[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse)

loanAccounts `array[LoanAccount]` required

List of loan account objects.

#### LoanAccount[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/loanaccount)

accountName `string`

A name of the loan, as seen in the bank.

amountPaid `CurrencyDenominatedAmount`

Total amount paid (amortised), as an aggregated sum of all loan parts.

balances `Balances`

Contains the different types of account balances, as an aggregated sum of all loan parts.

collateral `Collateral`

Representing loan collateral such as an address.

dates `AccountDates` required

Object containing important dates for this account object.

financialInstitutionId `string` required

ID of the financial institution.

guarantor `Guarantor`

Guarantor of the loan/mortgage.

id `string` required

Internal Tink ID of the account.

identifiers `LoanIdentifiers` required

Loan identifiers.

loanParts `array[LoanPart]`

The parts of a loan with specific fields for each part.

loanType `string` required

Specifies the type of loan whenever a classification can be made.  
Note: Since new types can be added as the product evolves, make sure your implementation is resiliently handling any unrecognized value returned in the API response.  
Current loan types:  
\* `UNDEFINED`: We are not able to classify the type of loan.  
\* `MORTGAGE`: A mortgage loan.  
\* `PERSONAL`: Any other type of personal loan.  
\* `VEHICLE`: A loan for funding a vehicle, typically with the vehicle as collateral.  
\* `STUDENT`: A student loan.  

parties `array[Party]` required

List of parties.

#### CurrencyDenominatedAmount[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/currencydenominatedamount)

currencyCode `string` required

The currency code which follows ISO-4217 standard.

value `ExactValue` required

The value representation of the monetary amount.

#### ExactValue[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/exactvalue)

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### Balances[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/balances)

initial `CurrencyDenominatedAmount`

Initial balance of the loan with debt expressed as a negative number.

principal `CurrencyDenominatedAmount` required

Current balance of the loan with debt expressed as a negative number.

#### Collateral[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/collateral)

collateral `string`

String representing loan collateral such as an address.

#### AccountDates[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/accountdates)

lastRefreshed `Date` required

Last refreshed time of this account, ISO 8601 date and time format in UTC (YYYY-MM-DDThh:mm:ssZ).

#### Guarantor[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/guarantor)

name `string`

Guarantor of the loan/mortgage.

#### LoanIdentifiers[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/loanidentifiers)

accountNumber `string`

Local bank identifier of the loan, typically a bank side loan number. If this loan is split into parts this is the identifier shared amongst them.

#### LoanPart[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/loanpart)

amountPaid `CurrencyDenominatedAmount`

Total amount paid (amortised).

balances `Balances` required

Contains the different type of account balances.

dates `LoanDates`

Loan part dates

installment `Installment`

Payment installment information.

interestRate `InterestRate` required

Interest Rate applied to the loan or mortgage.

loanPartNumber `string`

Sub identifier of a specific loan part.

#### LoanDates[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/loandates)

nextPaymentDate `string`

Next loan payment date, ISO 8601 date format (YYYY-MM-DD).

originationDate `string`

Date when loan was initiated, ISO 8601 date format (YYYY-MM-DD).

payoffExpectedDate `string`

The date when the loan is expected to be paid off, ISO 8601 date format (YYYY-MM-DD).

previousPaymentDate `string`

Previous payment date, ISO 8601 date format (YYYY-MM-DD).

#### Installment[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/installment)

amount `CurrencyDenominatedAmount`

The amount paid per period.

period `string`

Represents how often the amount is due.  
Can be any of:  
\* `MONTHLY`  
\* `QUARTERLY`  
\* `YEARLY`

#### InterestRate[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/interestrate)

margin `number`

The margin applied towards a reference rate identified by the referenceIndex. Value in percent.

monthsBound `integer`

Number of months that the interest rate is bound. Should be positive if present.

referenceIndex `string`

Reference index of the loan.

revisionDate `string`

Revision date of the interest rate, ISO 8601 date format (YYYY-MM-DD).

value `number` required

Interest rate in decimal form, e.g. 4.565% is expressed as 0.04565.

variableRate `boolean`

Boolean value indicating if the interest rate in question is variable.

#### Party[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/party)

identity `Identity` required

Information pertaining to the identity of the party.

role `string` required

#### Identity[](#data-v2/loan/list-loan-accounts/response-listloanaccountsresponse/identity)

name `string`

Name of the party.

ssn `string`

Social security number of the user.

| Status Code | Description |
| --- | --- |
| 200 | List of loan accounts successfully fetched. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |

## Transaction[](#data-v2/transaction)

## List Transactions[](#data-v2/transaction/list-transactions)

`GET /data/v2/transactions`

Returns a list of transactions for a user.

### Works with[](#data-v2/transaction/list-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `transactions:read` |

### Query Parameters[](#data-v2/transaction/list-transactions/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSize | The maximum number of items to return. This endpoint will not return more than 100 transactions per page. |
| pageToken | The next\_page\_token value returned from a previous List request, if any. |
| accountIdIn | If set, only transaction with the given account ids will be returned. This parameter may be repeated to specify multiple account ids. |
| bookedDateGte | Specified as the earliest booked date of transactions used for filtering and with the ISO-8061 date format (YYYY-MM-DD). If the query parameter is not provided time range will be calculated using the booked date of the earliest transaction available. |
| bookedDateLte | Specified as the latest booked date of transactions used for filtering and with the ISO-8061 date format (YYYY-MM-DD). If the query parameter is not provided time range will be calculated until today. |
| statusIn | If set, only transactions with the given status will be returned. This parameter may be repeated to specify multiple statuses.
\- UNDEFINED: (DEPRECATED) The transaction booking status is undefined.  
\- PENDING: The transaction is pending at the financial institution.  
\- BOOKED: The transaction is booked at the financial institution.  
Values: `UNDEFINED`, `PENDING`, `BOOKED`

 |

> Response Example

```
{
  "nextPageToken": "ZDU0N2M0YTVkZTk3NGIxODkxMjNmZWVmYzEwNjQxZDg",
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
      "categories": {
        "pfm": {
          "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
          "name": ""
        }
      },
      "counterparties": {
        "payee": {
          "identifiers": {
            "financialInstitution": {
              "accountNumber": "SE6651152689155983335132"
            }
          },
          "name": "Joe Doe"
        },
        "payer": {
          "identifiers": {
            "financialInstitution": {
              "accountNumber": "SE3778591419782047144807"
            }
          },
          "name": "Jane Doe"
        }
      },
      "dates": {
        "booked": "2020-12-15",
        "transaction": "2020-12-14",
        "value": "2020-12-15"
      },
      "descriptions": {
        "detailed": {
          "unstructured": "PAYMENT *SUBSCRIPTION 123/987"
        },
        "display": "Tesco",
        "original": "TESCO STORES 3297"
      },
      "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
      "identifiers": {
        "providerTransactionId": "500015d3-acf3-48cc-9918-9e53738d3692"
      },
      "merchantInformation": {
        "merchantCategoryCode": "4111",
        "merchantName": "Local Transit Company"
      },
      "providerMutability": "MUTABILITY_UNDEFINED",
      "reference": "RF12310007894321",
      "status": "BOOKED",
      "transactionDateTime": "2020-12-14T18:31:54Z",
      "types": {
        "financialInstitutionTypeCode": "DEB",
        "type": "DEFAULT"
      },
      "valueDateTime": "2020-12-15T09:25:12Z"
    }
  ]
}
```

### Response: ListTransactionsResponse[](#data-v2/transaction/list-transactions/response-listtransactionsresponse)

nextPageToken `string`

Token to retrieve the next page of results, or empty if there are no more results in the list.

transactions `array[Transaction]`

There will be a maximum number of items returned based on the page\_size field int the request.

#### Transaction[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/transaction)

accountId `string` required

Tink unique identifier for the account the transaction belongs to.

amount `CurrencyDenominatedAmount` required

Exact transaction amount, including currency.

bookedDateTime `string`

\[BETA\] For BOOKED transactions indicates the date and time when the transaction was posted on the financial institution’s books. For PENDING transactions indicates the expected booking date and time. Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

counterparties `Counterparties`

\[BETA\] Available transaction counterparties.

dates `Dates`

Available transaction dates.

descriptions `Descriptions`

Available transaction descriptions.

id `string` required

Tink unique identifier for the transaction.

identifiers `Identifiers`

Available identifiers.

merchantInformation `MerchantInformation`

Merchant information.

providerMutability `Mutability`

Transaction mutability status as indicated by the financial institution.

reference `string`

Transaction reference as provided by the financial institution.

status `Status` required

Transaction booking status.

transactionDateTime `string`

\[BETA\] The time and date when the transaction event was first initiated. For example when a payment card was authorized at the point of sale (before it was booked) or when a money transfer was first initiated (before it was executed). Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

types `Types` required

Available types.

valueDateTime `string`

\[BETA\] The date and time when assets either become available or cease to be available to the account owner. Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

#### CurrencyDenominatedAmount[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### Categories[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/categories)

pfm `PFMCategory`

#### PFMCategory[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/pfmcategory)

id `string` required

Tink category ID.

name `string` required

(DEPRECATED) Tink category name. Currently not populated.

#### Counterparties[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/counterparties)

payee `CounterpartyInformation`

\[BETA\] Available payee information.

payer `CounterpartyInformation`

\[BETA\] Available payer information.

#### CounterpartyInformation[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/counterpartyinformation)

identifiers `Identifiers`

\[BETA\] Available identifiers.

name `string`

\[BETA\] Name of a transaction counterparty from financial institution.

#### Identifiers[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/identifiers)

financialInstitution `FinancialInstitution`

\[BETA\] Internal identifiers from the financial institution.

#### FinancialInstitution[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/financialinstitution)

accountNumber `string`

\[BETA\] Transaction counterparty account number from financial institution.

#### Dates[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/dates)

booked `string`

For BOOKED transactions indicates the date when the transaction was posted on the financial institution’s books. For PENDING transactions indicates the expected booking date. Specified as a ISO-8601 date string (YYYY-MM-DD). Corresponds to the date displayed to the financial institution end user on their bank statement or transaction list in their online bank in the bank’s local time.

transaction `string`

\[BETA\] The date when the transaction event was first initiated. For example a date when a payment card was authorised at the point of sale (before it was booked) or when a money transfer was first initiated (before it was executed). Specified as a ISO-8601 date string (YYYY-MM-DD) in bank local timezone.

value `string`

The date when assets either become available or cease to be available to the account owner. Specified as a ISO-8601 date string (YYYY-MM-DD). Corresponds to the date displayed to the financial institution end user on their bank statement or transaction list in their online bank in the bank’s local time.

#### Descriptions[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/descriptions)

detailed `TransactionInformation`

\[BETA\] Available detailed transaction descriptions

display `string` required

Formatted and cleaned description intended to be shown to the end user when displaying a transactions list.

original `string` required

Original unmodified description from the financial institution.

#### TransactionInformation[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/transactioninformation)

unstructured `string`

\[BETA\] A detailed description from the financial institution. Intended to be shown to the end user when displaying a detailed view of a transaction. It contains a narrative, unstructured and unmodified text message with details of a transaction.

#### Identifiers[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/identifiers)

providerTransactionId `string`

Transaction identifier obtained from the financial institution.

#### MerchantInformation[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/merchantinformation)

merchantCategoryCode `string`

Merchant category code (MCC), as indicated by the financial institution

merchantName `string`

Name of merchant, as indicated by the financial institution

#### Mutability[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/mutability)

| Value | Description |
| --- | --- |
| MUTABILITY\_UNDEFINED |  |
| MUTABLE |  |
| IMMUTABLE |  |

#### Status[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/status)

| Value | Description |
| --- | --- |
| UNDEFINED | (DEPRECATED) The transaction booking status is undefined. |
| PENDING | The transaction is pending at the financial institution. |
| BOOKED | The transaction is booked at the financial institution. |

#### Types[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/types)

financialInstitutionTypeCode `string`

The financial institution's proprietary transaction type code.

type `Type` required

(DEPRECATED) Tink transaction type.

#### Type[](#data-v2/transaction/list-transactions/response-listtransactionsresponse/type)

| Value | Description |
| --- | --- |
| UNDEFINED | Type undefined. |
| CREDIT\_CARD | Credit card. |
| PAYMENT | Payment. |
| WITHDRAWAL | Withdrawal. |
| DEFAULT | Default. |
| TRANSFER | Transfer. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Check the error message or the documentation of each field for more information. |
| 401 | Authorization token is missing, or not valid |
| 403 | You are not allowed to access the requested resource |
| default | An unexpected error response. |

## Transaction Report[](#data-v2/transaction-report)

## Get Transaction Report[](#data-v2/transaction-report/get-transaction-report)

`GET /data/v2/transaction-reports/{id}`

Reports are available for retrieval up to 1h after generation and permanently deleted after 24h.

### Works with[](#data-v2/transaction-report/get-transaction-report/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `transaction-reports:readonly` |

### Parameters[](#data-v2/transaction-report/get-transaction-report/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | Tink unique identifier for the report. |

> Response Example

```
{
  "accounts": [
    {
      "balances": {
        "available": {
          "amount": {
            "currencyCode": "string",
            "value": {
              "scale": "string",
              "unscaledValue": "string"
            }
          }
        },
        "booked": {
          "amount": {
            "currencyCode": "string",
            "value": {
              "scale": "string",
              "unscaledValue": "string"
            }
          }
        }
      },
      "customerSegment": "UNDEFINED_CUSTOMER_SEGMENT",
      "dates": {
        "lastRefreshed": "string"
      },
      "financialInstitutionId": "string",
      "id": "string",
      "identifiers": {
        "financialInstitution": {
          "accountNumber": "string",
          "referenceNumbers": ""
        },
        "iban": {
          "bban": "string",
          "bic": "string",
          "iban": "string"
        },
        "pan": {
          "masked": "string"
        },
        "sortCode": {
          "accountNumber": "string",
          "code": "string"
        }
      },
      "name": "string",
      "type": "UNDEFINED"
    }
  ],
  "createdAt": "2020-12-15T09:25:12Z",
  "externalReference": "string",
  "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
  "merchantId": "string",
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
      "categories": {
        "pfm": {
          "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
          "name": ""
        }
      },
      "counterparties": {
        "payee": {
          "identifiers": {
            "financialInstitution": {
              "accountNumber": "SE6651152689155983335132"
            }
          },
          "name": "Joe Doe"
        },
        "payer": {
          "identifiers": {
            "financialInstitution": {
              "accountNumber": "SE3778591419782047144807"
            }
          },
          "name": "Jane Doe"
        }
      },
      "dates": {
        "booked": "2020-12-15",
        "transaction": "2020-12-14",
        "value": "2020-12-15"
      },
      "descriptions": {
        "detailed": {
          "unstructured": "PAYMENT *SUBSCRIPTION 123/987"
        },
        "display": "Tesco",
        "original": "TESCO STORES 3297"
      },
      "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
      "identifiers": {
        "providerTransactionId": "500015d3-acf3-48cc-9918-9e53738d3692"
      },
      "merchantInformation": {
        "merchantCategoryCode": "4111",
        "merchantName": "Local Transit Company"
      },
      "providerMutability": "MUTABILITY_UNDEFINED",
      "reference": "RF12310007894321",
      "status": "BOOKED",
      "transactionDateTime": "2020-12-14T18:31:54Z",
      "types": {
        "financialInstitutionTypeCode": "DEB",
        "type": "DEFAULT"
      },
      "valueDateTime": "2020-12-15T09:25:12Z"
    }
  ]
}
```

### Response: Report[](#data-v2/transaction-report/get-transaction-report/response-report)

accounts `array[Account]`

Accounts list in the report.

createdAt `string` required

\[BETA\] The date and time when transaction report was created. Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z).

externalReference `string`

\[BETA\] An external reference identifier. This field is only returned when it is provided by the client when creating the Tink Link Session or with the Tink Link URL

id `string` required

Tink unique identifier for the report.

merchantId `string`

\[BETA\] An id of the merchant. This field is only returned when it is provided by the client when creating the Tink Link Session.

transactions `array[Transaction]`

Transactions list in the report.

#### Account[](#data-v2/transaction-report/get-transaction-report/response-report/account)

balances `Balances`

Account balances.

customerSegment `CustomerSegment`

Customer segment identifier.

dates `Dates`

Applicable dates.

financialInstitutionId `string`

ID of the financial institution the account belongs to.

id `string`

Internal Tink accounts identifier.

identifiers `Identifiers`

Available identifiers.

name `string`

Account name as seen in the bank.

type `Type`

Type of the account.

#### Balances[](#data-v2/transaction-report/get-transaction-report/response-report/balances)

available `Balance`

Total available balance.

booked `Balance`

Total booked balance.

#### Balance[](#data-v2/transaction-report/get-transaction-report/response-report/balance)

amount `CurrencyDenominatedAmount`

Monetary amount.

#### CurrencyDenominatedAmount[](#data-v2/transaction-report/get-transaction-report/response-report/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#data-v2/transaction-report/get-transaction-report/response-report/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### CustomerSegment[](#data-v2/transaction-report/get-transaction-report/response-report/customersegment)

| Value | Description |
| --- | --- |
| UNDEFINED\_CUSTOMER\_SEGMENT | Undefined segment. |
| PERSONAL | Personal segment. |
| BUSINESS | Business segment. |

#### Dates[](#data-v2/transaction-report/get-transaction-report/response-report/dates)

lastRefreshed `Date`

Timestamp of last account data refresh (date and time in ISO-8601 standard).

#### Identifiers[](#data-v2/transaction-report/get-transaction-report/response-report/identifiers)

financialInstitution `FinancialInstitution`

Internal identifier from the financial institution.

iban `IBAN`

IBAN account identifier.

pan `Pan`

Pan identifier.

sortCode `SortCode`

Sort code account identifier.

#### FinancialInstitution[](#data-v2/transaction-report/get-transaction-report/response-report/financialinstitution)

accountNumber `string`

Account number.

referenceNumbers `object`

Additional identifiers used by the financial institution to uniquely reference the account.

#### IBAN[](#data-v2/transaction-report/get-transaction-report/response-report/iban)

bban `string`

BBAN represents an country-specific bank account number.

bic `string`

BIC bank number. This can be inferred from the IBAN, but some banks might require it for adding a beneficiary or will display it for existing accounts owned by the user.

iban `string`

IBAN represents an international bank account number.

#### Pan[](#data-v2/transaction-report/get-transaction-report/response-report/pan)

masked `string`

The masked PAN (card number).

#### SortCode[](#data-v2/transaction-report/get-transaction-report/response-report/sortcode)

accountNumber `string`

Account number.

code `string`

Code value.

#### Type[](#data-v2/transaction-report/get-transaction-report/response-report/type)

| Value | Description |
| --- | --- |
| UNDEFINED | Type undefined. |
| CHECKING | Checking account. |
| SAVINGS | Savings account. |
| CREDIT\_CARD | Credit card account. |

#### Transaction[](#data-v2/transaction-report/get-transaction-report/response-report/transaction)

accountId `string` required

Tink unique identifier for the account the transaction belongs to.

amount `CurrencyDenominatedAmount` required

Exact transaction amount, including currency.

bookedDateTime `string`

\[BETA\] For BOOKED transactions indicates the date and time when the transaction was posted on the financial institution’s books. For PENDING transactions indicates the expected booking date and time. Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

counterparties `Counterparties`

\[BETA\] Available transaction counterparties.

dates `Dates`

Available transaction dates.

descriptions `Descriptions`

Available transaction descriptions.

id `string` required

Tink unique identifier for the transaction.

identifiers `Identifiers`

Available identifiers.

merchantInformation `MerchantInformation`

Merchant information.

providerMutability `Mutability`

Transaction mutability status as indicated by the financial institution.

reference `string`

Transaction reference as provided by the financial institution.

status `Status` required

Transaction booking status.

transactionDateTime `string`

\[BETA\] The time and date when the transaction event was first initiated. For example when a payment card was authorized at the point of sale (before it was booked) or when a money transfer was first initiated (before it was executed). Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

types `Types` required

Available types.

valueDateTime `string`

\[BETA\] The date and time when assets either become available or cease to be available to the account owner. Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

#### Categories[](#data-v2/transaction-report/get-transaction-report/response-report/categories)

pfm `PFMCategory`

#### PFMCategory[](#data-v2/transaction-report/get-transaction-report/response-report/pfmcategory)

id `string` required

Tink category ID.

name `string` required

(DEPRECATED) Tink category name. Currently not populated.

#### Counterparties[](#data-v2/transaction-report/get-transaction-report/response-report/counterparties)

payee `CounterpartyInformation`

\[BETA\] Available payee information.

payer `CounterpartyInformation`

\[BETA\] Available payer information.

#### CounterpartyInformation[](#data-v2/transaction-report/get-transaction-report/response-report/counterpartyinformation)

identifiers `Identifiers`

\[BETA\] Available identifiers.

name `string`

\[BETA\] Name of a transaction counterparty from financial institution.

#### Identifiers[](#data-v2/transaction-report/get-transaction-report/response-report/identifiers)

financialInstitution `FinancialInstitution`

\[BETA\] Internal identifiers from the financial institution.

#### FinancialInstitution[](#data-v2/transaction-report/get-transaction-report/response-report/financialinstitution)

accountNumber `string`

\[BETA\] Transaction counterparty account number from financial institution.

#### Dates[](#data-v2/transaction-report/get-transaction-report/response-report/dates)

booked `string`

For BOOKED transactions indicates the date when the transaction was posted on the financial institution’s books. For PENDING transactions indicates the expected booking date. Specified as a ISO-8601 date string (YYYY-MM-DD). Corresponds to the date displayed to the financial institution end user on their bank statement or transaction list in their online bank in the bank’s local time.

transaction `string`

\[BETA\] The date when the transaction event was first initiated. For example a date when a payment card was authorised at the point of sale (before it was booked) or when a money transfer was first initiated (before it was executed). Specified as a ISO-8601 date string (YYYY-MM-DD) in bank local timezone.

value `string`

The date when assets either become available or cease to be available to the account owner. Specified as a ISO-8601 date string (YYYY-MM-DD). Corresponds to the date displayed to the financial institution end user on their bank statement or transaction list in their online bank in the bank’s local time.

#### Descriptions[](#data-v2/transaction-report/get-transaction-report/response-report/descriptions)

detailed `TransactionInformation`

\[BETA\] Available detailed transaction descriptions

display `string` required

Formatted and cleaned description intended to be shown to the end user when displaying a transactions list.

original `string` required

Original unmodified description from the financial institution.

#### TransactionInformation[](#data-v2/transaction-report/get-transaction-report/response-report/transactioninformation)

unstructured `string`

\[BETA\] A detailed description from the financial institution. Intended to be shown to the end user when displaying a detailed view of a transaction. It contains a narrative, unstructured and unmodified text message with details of a transaction.

#### Identifiers[](#data-v2/transaction-report/get-transaction-report/response-report/identifiers)

providerTransactionId `string`

Transaction identifier obtained from the financial institution.

#### MerchantInformation[](#data-v2/transaction-report/get-transaction-report/response-report/merchantinformation)

merchantCategoryCode `string`

Merchant category code (MCC), as indicated by the financial institution

merchantName `string`

Name of merchant, as indicated by the financial institution

#### Mutability[](#data-v2/transaction-report/get-transaction-report/response-report/mutability)

| Value | Description |
| --- | --- |
| MUTABILITY\_UNDEFINED |  |
| MUTABLE |  |
| IMMUTABLE |  |

#### Status[](#data-v2/transaction-report/get-transaction-report/response-report/status)

| Value | Description |
| --- | --- |
| UNDEFINED | (DEPRECATED) The transaction booking status is undefined. |
| PENDING | The transaction is pending at the financial institution. |
| BOOKED | The transaction is booked at the financial institution. |

#### Types[](#data-v2/transaction-report/get-transaction-report/response-report/types)

financialInstitutionTypeCode `string`

The financial institution's proprietary transaction type code.

type `Type` required

(DEPRECATED) Tink transaction type.

#### Type[](#data-v2/transaction-report/get-transaction-report/response-report/type)

| Value | Description |
| --- | --- |
| UNDEFINED | Type undefined. |
| CREDIT\_CARD | Credit card. |
| PAYMENT | Payment. |
| WITHDRAWAL | Withdrawal. |
| DEFAULT | Default. |
| TRANSFER | Transfer. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 401 | Authorization token is missing, or not valid |
| 403 | You are not allowed to access the requested resource |
| 404 | The report was not found. |
| default | An unexpected error response. |
