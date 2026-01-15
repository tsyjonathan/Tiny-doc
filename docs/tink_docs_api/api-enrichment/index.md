---
title: "Tink Docs"
source: "/Tiny-doc/tink_docs_api/api-enrichment/"
exportedAt: "2026-01-13T13:03:37.348Z"
---
## Enrichment v1[](/Tiny-doc/tink_docs_api/api-enrichment/)

The Enrichment section contains resources for Data Enrichment.

See how to list different types of transactions, update enriched transactions, and get similar transactions, as well as fetch all recurring and/or predicted recurring transactions a user has.

## As a Service[](#enrichment/as-a-service)

## Enrich transactions[](#enrichment/as-a-service/enrich-transactions)

`POST /enrichment/v1/transactions/on-demand`

Enrich transactions without the need for users or accounts to be created. This endpoint does not store any data. The enrichments provided include:

-   **Categorization**: Tink category ID and formatted description
-   **Merchant Information**: Brand and Merchant information

### Enrichment levels

It is possible to ask for specific enrichments and their levels:

-   **CATEGORIZATION**: Only processes categories
-   **BRAND**: Only processes brand information
-   **BRAND\_AND\_MERCHANT**: Processes both brand and merchant information

### Works with[](#enrichment/as-a-service/enrich-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `enrichment.on-demand` |

> Request Example

```
{
  "enrichments": [
    {}
  ],
  "input": [
    {
      "amount": {
        "currencyCode": "SEK",
        "valueInMinorUnit": 150
      },
      "description": "Payment XXXX, Sensitive...",
      "id": "Transaction_1",
      "merchant": {
        "cardAcceptorId": "0123456789",
        "location": {
          "address": "Tink Street",
          "city": "Stockholm",
          "country": "Sweden",
          "zipCode": "11122"
        },
        "merchantCategoryCode": "1711",
        "name": "Tink",
        "nationalIdentificationNumber": "0123456789"
      },
      "timestamp": "2025-02-27T13:48:43Z",
      "transactionType": "AUTHORIZED",
      "userMarket": "SE",
      "visaTransactionId": "0123456789"
    }
  ]
}
```

### Request Body: Request[](#enrichment/as-a-service/enrich-transactions/request-body-request)

Request for on-demand enrichment.

enrichments `array[Enrichment]` required

The enrichments to perform.

input `array[DataPoint]` required

The input to enrich.

#### Enrichment[](#enrichment/as-a-service/enrich-transactions/request-body-request/enrichment)

#### DataPoint[](#enrichment/as-a-service/enrich-transactions/request-body-request/datapoint)

amount `Amount`

The amount of the transaction.  
Required in the case of `CATEGORIZATION`

description `string` required

The description of the transaction.

id `string` required

The ID of the transaction.

merchant `Merchant`

The merchant of the transaction.

timestamp `Date` required

The timestamp of the transaction as ISO 8601 Zoned Instant.  
Pattern: `yyyy-MM-dd'T'HH:mm:ss[.SSS]Z`.

transactionType `string`

The type of transaction.  
Values: `AUTHORIZED`, `CLEARED`

userMarket `string` required

The user's market. ISO 3166-1 alpha-2 format.  
Example: `SE` for Sweden.  

visaTransactionId `string`

The Visa transaction ID.

#### Amount[](#enrichment/as-a-service/enrich-transactions/request-body-request/amount)

currencyCode `string` required

The currency code as specified in ISO 4217.

valueInMinorUnit `integer` required

Amount in minor currency units (ISO-4217).  
• Positive amounts (> 0) represent income.  
• Negative amounts (< 0) represent expenses.

Examples  
• 150 ➜ Income of 1.50 EUR  
• −275 ➜ Expense of 2.75 EUR  
For EUR, 1 EUR = 100 cents.

#### Merchant[](#enrichment/as-a-service/enrich-transactions/request-body-request/merchant)

cardAcceptorId `string`

Card Acceptor ID of the merchant.

location `Location`

The location of the merchant.

merchantCategoryCode `string`

The merchant category code, ISO 18245.

name `string`

The name of the merchant.

nationalIdentificationNumber `string`

The tax ID of the merchant.

#### Location[](#enrichment/as-a-service/enrich-transactions/request-body-request/location)

address `string`

The address of the merchant.

city `string`

The city of the merchant.

country `string`

The country of the merchant.

zipCode `string`

The ZIP code of the merchant.

> Response Example

```
{
  "output": [
    {
      "categories": {
        "pfm": {
          "categoryId": "075fab3ec31f43aa9d39675475c1fb1a",
          "formattedDescription": "Payment XXXX"
        }
      },
      "id": "Transaction_1",
      "merchantInformation": {
        "brand": {
          "contact": {
            "website": "[external url removed]"
          },
          "iconUri": "[external url removed]",
          "id": "02820044-69f5-4170-a516-fbeae6450f7a",
          "logoUri": "[external url removed]",
          "name": "Tink"
        },
        "merchant": {
          "contact": {
            "phone": "+46....",
            "website": "[external url removed]"
          },
          "iconUri": "[external url removed]",
          "id": "02820044-69f5-4170-a516-fbeae6450f7a",
          "location": {
            "city": "Stockholm",
            "coordinates": "59.33282, 18.05669",
            "country": "Sweden",
            "googlePlacesId": "ChIJs5ydyTiuEmsR0fRSlU0C7k0",
            "postalCode": "11122",
            "street": "Tink Street"
          },
          "logoUri": "[external url removed]",
          "name": "Tink"
        }
      }
    }
  ]
}
```

### Response: Response[](#enrichment/as-a-service/enrich-transactions/response-response)

Response for on-demand enrichment.

output `array[DataPoint]`

#### DataPoint[](#enrichment/as-a-service/enrich-transactions/response-response/datapoint)

categories `Categories`

The categorization enrichment.

id `string` required

The transaction ID from the request.

merchantInformation `MerchantInformation`

The merchant information enrichment.

#### Categories[](#enrichment/as-a-service/enrich-transactions/response-response/categories)

pfm `Pfm`

Personal financial management category.

#### Pfm[](#enrichment/as-a-service/enrich-transactions/response-response/pfm)

categoryId `string`

Category ID.

formattedDescription `string`

Formatted description.

#### MerchantInformation[](#enrichment/as-a-service/enrich-transactions/response-response/merchantinformation)

brand `Brand`

Brand enrichment.

merchant `Merchant`

Merchant enrichment.

#### Brand[](#enrichment/as-a-service/enrich-transactions/response-response/brand)

contact `Contact`

Brand contact information.

iconUri `string`

Brand icon URI.

id `string`

Brand ID.

logoUri `string`

Brand logo URI.

name `string`

Brand name.

#### Contact[](#enrichment/as-a-service/enrich-transactions/response-response/contact)

website `string`

Website location.

#### Merchant[](#enrichment/as-a-service/enrich-transactions/response-response/merchant)

contact `Contact`

Merchant contact information.

iconUri `string`

Merchant icon URI.

id `string`

Merchant ID.

location `Location`

Merchant location.

logoUri `string`

Merchant logo URI.

name `string`

Merchant name.

#### Contact[](#enrichment/as-a-service/enrich-transactions/response-response/contact)

phone `string`

Merchant phone number.

website `string`

Merchant website location.

#### Location[](#enrichment/as-a-service/enrich-transactions/response-response/location)

city `string`

Merchant city.

coordinates `string`

Merchant coordinates.

country `string`

Merchant country.

googlePlacesId `string`

Merchant Google Places ID.

postalCode `string`

Merchant postal code.

street `string`

Merchant street address.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |
| 600 | More specific error codes that can be found as `detailCode` in the error response. NON\_SPECIFIED (0), NOT\_AUTHORIZED (1), INVALID\_TOKEN (2), CATEGORIES\_NOT\_FOUND (3), UUID\_INVALID (4), ENTITY\_NOT\_FOUND (5), TRANSACTIONS\_NOT\_FOUND (6), FEATURE\_NOT\_AVAILABLE (7), INVALID\_REQUEST (8) |

## Category[](#enrichment/category)

## List All Categories[](#enrichment/category/list-all-categories)

`GET /enrichment/v1/categories`

List all categories for a locale.

### Works with[](#enrichment/category/list-all-categories/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.transactions:readonly` |
| User token | `enrichment.transactions` |
| Client token | `enrichment.transactions:readonly` |
| Client token | `enrichment.transactions` |
| Client token | `enrichment.on-demand` |

### Query Parameters[](#enrichment/category/list-all-categories/query-parameters)

| Parameter | Description |
| --- | --- |
| localeEq | The locale for which to fetch categories. |

> Response Example

```
{
  "categories": [
    {
      "childName": "Hobby & Sports Equipment",
      "code": "expenses:shopping.hobby",
      "defaultChild": false,
      "id": "002129e58ca24923bccc60979eaa63cd",
      "parent": "4e9b5f78d58640a787fd9efa7b5e58c0",
      "parentName": "Shopping",
      "sortOrder": 53,
      "typeName": "Expenses"
    }
  ]
}
```

### Response: ListAllCategories[](#enrichment/category/list-all-categories/response-listallcategories)

Response object contains the list of all available categories.

categories `array[Category]`

A list of categories.

#### Category[](#enrichment/category/list-all-categories/response-listallcategories/category)

childName `string`

The child name of this category, or empty string.

code `string`

Category code.

defaultChild `boolean`

Indicates if this is the default child to be used when categorizing to a primary level category.

id `string`

The internal identifier of the category.

parent `string`

The parent internal identifier of this category.

parentName `string`

The parent name of this category.

sortOrder `integer`

Sort order for nicer display for the user.

typeName `string`

Type name of the category.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |
| 600 | More specific error codes that can be found as `detailCode` in the error response. NON\_SPECIFIED (0), NOT\_AUTHORIZED (1), INVALID\_TOKEN (2), CATEGORIES\_NOT\_FOUND (3), UUID\_INVALID (4), ENTITY\_NOT\_FOUND (5), TRANSACTIONS\_NOT\_FOUND (6), FEATURE\_NOT\_AVAILABLE (7), INVALID\_REQUEST (8) |

## Enriched Transactions[](#enrichment/enriched-transactions)

## Get Similar Transactions[](#enrichment/enriched-transactions/get-similar-transactions)

`GET /enrichment/v1/transactions/{transactionId}:find-similar`

Get up to 50 similar transactions to the specified transaction.

### Works with[](#enrichment/enriched-transactions/get-similar-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.transactions:readonly` `transactions:read` |
| User token | `enrichment.transactions` `transactions:read` |

### Parameters[](#enrichment/enriched-transactions/get-similar-transactions/parameters)

| Parameter | Description |
| --- | --- |
| transactionIdrequired | The id of the transaction. |

> Response Example

```
{
  "transactions": [
    {
      "accountId": "8927a317da2042f1a36949bed28575e4",
      "amount": {
        "currencyCode": "GBP",
        "value": {
          "scale": 1,
          "unscaledValue": -170
        }
      },
      "bookedDateTime": "2020-12-15T09:25:12Z",
      "counterparties": {
        "payee": {
          "identifiers": {
            "financialInstitution": {
              "accountNumber": "SE3778591419782047144807"
            }
          },
          "name": "Idun Eriksson"
        },
        "payer": {
          "identifiers": {
            "financialInstitution": {
              "accountNumber": "SE3778591419782047144807"
            }
          },
          "name": "Idun Eriksson"
        }
      },
      "dates": {
        "booked": "2020-12-15",
        "value": "2020-12-15"
      },
      "descriptions": {
        "detailed": {
          "unstructured": "Purchase at ABC Supermarket, City XYZ, on 2023-10-05, Amount: $45.67, Card ending in 1234."
        },
        "display": "Tesco",
        "original": "TESCO 123#52"
      },
      "enrichedData": {
        "brandIdentification": {
          "id": "8948045b-d163-4d03-b9ec-3d5237a4550a",
          "logoUri": "[external url removed]",
          "merchant": {
            "id": "8948045b-d163-4d03-b9ec-3d5237a4550a",
            "logoUri": "[external url removed]",
            "name": "Tesco Store 2nd Street"
          },
          "name": "Tesco Stores",
          "status": {
            "code": "SUCCESS",
            "message": "<only on failure>"
          }
        },
        "categories": {
          "pfm": {
            "id": "075fab3ec31f43aa9d39675475c1fb1a"
          },
          "status": {
            "code": "SUCCESS",
            "message": "<only on failure>"
          }
        },
        "sustainability": {
          "co2InGrams": 1044,
          "status": {
            "code": "SUCCESS",
            "message": "<only on failure>"
          }
        }
      },
      "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
      "identifiers": {
        "providerTransactionId": "500015d3-acf3-48cc-9918-9e53738d3692"
      },
      "merchantInformation": {
        "merchantCategoryCode": 5462,
        "merchantName": "Artisanal Bakery Shops"
      },
      "providerMutability": "MUTABILITY_UNDEFINED",
      "reference": "RF12310007894321",
      "status": "BOOKED",
      "transactionDateTime": "2020-12-15T09:25:12Z",
      "types": {
        "financialInstitutionTypeCode": "075fab3ec31f43aa9d39675475c1fb1a",
        "type": "CREDIT_CARD"
      },
      "valueDateTime": "2020-12-15T09:25:12Z"
    }
  ]
}
```

### Response: SimilarTransactionsResponse[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse)

transactions `array[EnrichedTransaction]`

A list of transactions that are similar to the transaction specified in the request.

#### EnrichedTransaction[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/enrichedtransaction)

accountId `string`

Tink unique identifier for the account the transaction belongs to.

amount `CurrencyDenominatedAmount`

bookedDateTime `string`

For BOOKED transactions indicates the date and time when the transaction was posted on the financial institution’s books. For PENDING transactions indicates the expected booking date and time. Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

counterparties `Counterparties`

dates `Dates`

descriptions `Description`

enrichedData `EnrichedData`

id `string`

Tink unique identifier for the transaction.

identifiers `Identifiers`

merchantInformation `MerchantInformation`

providerMutability `string`

Transaction mutability status as indicated by the financial institution.  
Values: `MUTABILITY_UNDEFINED`, `MUTABLE`, `IMMUTABLE`

reference `string`

Transaction reference as provided by the financial institution.

status `string`

Enumeration representing the status of a transaction.  
Values: `UNDEFINED`, `PENDING`, `BOOKED`

transactionDateTime `string`

The time and date when the transaction event was first initiated. For example when a payment card was authorized at the point of sale (before it was booked) or when a money transfer was first initiated (before it was executed). Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

types `FinancialTypes`

valueDateTime `string`

The date and time when assets either become available or cease to be available to the account owner. Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

#### CurrencyDenominatedAmount[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

#### ExactNumber[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### Counterparties[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/counterparties)

payee `Counterparty`

Available payee information.

payer `Counterparty`

Available payer information.

#### Counterparty[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/counterparty)

identifiers `CounterpartyIdentifier`

Available identifiers.

name `string`

Name of a transaction counterparty from financial institution.

#### CounterpartyIdentifier[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/counterpartyidentifier)

financialInstitution `CounterpartyFinancialInstitution`

Internal identifiers from the financial institution.

#### CounterpartyFinancialInstitution[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/counterpartyfinancialinstitution)

accountNumber `string`

Transaction counterparty account number from financial institution.

#### Dates[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/dates)

booked `string`

For BOOKED transactions indicates the date when the transaction was posted on the financial institution’s books. For PENDING transactions indicates the expected booking date. Specified as a ISO-8601 date string (YYYY-MM-DD). Corresponds to the date displayed to the financial institution end user on their bank statement or transaction list in their online bank in the bank’s local time.

value `string`

The date when assets either become available or cease to be available to the account owner. Specified as a ISO-8601 date string (YYYY-MM-DD). Corresponds to the date displayed to the financial institution end user on their bank statement or transaction list in their online bank in the bank’s local time.

#### Description[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/description)

detailed `TransactionInformation`

display `string`

Formatted and cleaned description intended to be shown to the end user when displaying a transactions list.

original `string`

Original unmodified description from the financial institution.

#### TransactionInformation[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/transactioninformation)

unstructured `string`

A detailed description from the financial institution. Intended to be shown to the end user when displaying a detailed view of a transaction. It contains a narrative, unstructured and unmodified text message with details of a transaction.

#### EnrichedData[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/enricheddata)

brandIdentification `BrandIdentification`

categories `Categories`

sustainability `Sustainability`

#### BrandIdentification[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/brandidentification)

id `string`

Brand ID.

logoUri `string`

Logo URI.

merchant `Merchant`

name `string`

Brand name.

status `EnrichmentStatus`

#### Merchant[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/merchant)

id `string`

Merchant ID.

logoUri `string`

Logo URI.

name `string`

Merchant name.

#### EnrichmentStatus[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/enrichmentstatus)

code `string`

SUCCESS: enrichment was successful. FAILURE: temporary unknown failure. PRODUCT\_NOT\_PERMITTED: the product is not permitted. PRODUCT\_NOT\_AVAILABLE: the product is not available.  
Values: `SUCCESS`, `FAILURE`, `PRODUCT_NOT_PERMITTED`, `PRODUCT_NOT_AVAILABLE`

message `string`

Error message in case of failure..

#### Categories[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/categories)

pfm `PFMCategory`

status `EnrichmentStatus`

#### PFMCategory[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/pfmcategory)

id `string`

Tink category ID.

#### Sustainability[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/sustainability)

co2InGrams `string`

Co2 in grams.

status `EnrichmentStatus`

#### Identifiers[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/identifiers)

providerTransactionId `string`

The transaction ID given by the transaction provider.

#### MerchantInformation[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/merchantinformation)

merchantCategoryCode `string`

Merchant category code (MCC), as indicated by the financial institution.

merchantName `string`

Name of merchant, as indicated by the financial institution.

#### FinancialTypes[](#enrichment/enriched-transactions/get-similar-transactions/response-similartransactionsresponse/financialtypes)

financialInstitutionTypeCode `string`

The financial institution's proprietary transaction type code.

type `string`

(DEPRECATED) Tink transaction type.  
Values: `UNDEFINED`, `CREDIT_CARD`, `PAYMENT`, `WITHDRAWAL`, `DEFAULT`, `TRANSFER`

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |
| 600 | More specific error codes that can be found as `detailCode` in the error response. NON\_SPECIFIED (0), NOT\_AUTHORIZED (1), INVALID\_TOKEN (2), CATEGORIES\_NOT\_FOUND (3), UUID\_INVALID (4), ENTITY\_NOT\_FOUND (5), TRANSACTIONS\_NOT\_FOUND (6), FEATURE\_NOT\_AVAILABLE (7), INVALID\_REQUEST (8) |

## List Enriched Transactions[](#enrichment/enriched-transactions/list-enriched-transactions)

`GET /enrichment/v1/transactions`

List all enriched transactions for a user.

### Works with[](#enrichment/enriched-transactions/list-enriched-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.transactions` `transactions:read` |
| User token | `enrichment.transactions:readonly` `transactions:read` |

### Query Parameters[](#enrichment/enriched-transactions/list-enriched-transactions/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSize | The maximum number of items to return. This endpoint will not return more than 100 transactions per page. |
| pageToken | The nextPageToken value returned from a previous List request, if any. |
| statusIn | If set, only transactions with the given status will be returned. This parameter may be repeated to specify multiple statuses.  
\- UNDEFINED: The transaction booking status is undefined.  
\- PENDING: The transaction is pending at the financial institution.  
\- BOOKED: The transaction is booked at the financial institution.  
Values: `UNDEFINED`, `PENDING`, `BOOKED` |
| accountIdIn | If set, only transaction with the given account ids will be returned. This parameter may be repeated to specify multiple account ids. |
| categoryIdIn | If set, only transactions with specified categories will be returned. If a parent category is supplied it will be expanded to its child categories as well. |
| bookedDateGte | Specifies the earliest booked date for filtering transactions (inclusive lower bound).  
Supports two formats:  
\- **Local Date:** YYYY-MM-DD (e.g., "2024-01-15") - interpreted as start of day UTC  
\- **Zoned Date Time:** ISO-8601 format - exact timestamp  
\- 2024-01-15T10:30:00Z  
\- 2024-01-15T12:30:00+02:00  
\- 2024-01-15T12:30:00.123+02:00
If not provided, the time range starts from the earliest transaction available.

 |
| bookedDateLte | Specifies the latest booked date for filtering transactions (inclusive upper bound).  
Supports two formats:  
\- **Local Date:** YYYY-MM-DD (e.g., "2024-01-15") - interpreted as end of day UTC  
\- **Zoned Date Time:** ISO-8601 format - exact timestamp  
\- 2024-01-15T10:30:00Z (UTC)  
\- 2024-01-15T12:30:00+02:00  
\- 2024-01-15T12:30:00.123+02:00

If not provided, the time range extends until today.  
**DEPRECATED:** This parameter is deprecated for pagination use cases. Use bookedDateLt instead for closed boundaries and consistent pagination results.

 |
| bookedDateLt | Specifies the latest booked date for filtering transactions (exclusive upper bound).  
Only accepts **Zoned Date Time** in ISO-8601 format.  
\- 2024-01-15T10:30:00Z (UTC)  
\- 2024-01-15T12:30:00+02:00  
\- 2024-01-15T12:30:00.123+02:00

This parameter is designed for pagination with closed boundaries, providing precise cursor-based filtering.  
Use this when you need exact timestamp filtering for consistent pagination results.

If not provided, the time range extends until today.  
**Note:** Cannot be used together with bookedDateLte - bookedDateLt takes precedence.

 |
| merchantIdIn | If set, only transactions with specified merchants will be returned.  
**Disclaimer:** This filter is only available in selected markets. |
| brandIdIn | If set, only transactions with specific brands will be returned.  
**Disclaimer:** This filter is only available in selected markets. |

> Response Example

```
{
  "nextPageToken": "AQ==",
  "transactions": [
    {
      "accountId": "8927a317da2042f1a36949bed28575e4",
      "amount": {
        "currencyCode": "GBP",
        "value": {
          "scale": 1,
          "unscaledValue": -170
        }
      },
      "bookedDateTime": "2020-12-15T09:25:12Z",
      "counterparties": {
        "payee": {
          "identifiers": {
            "financialInstitution": {
              "accountNumber": "SE3778591419782047144807"
            }
          },
          "name": "Idun Eriksson"
        },
        "payer": {
          "identifiers": {
            "financialInstitution": {
              "accountNumber": "SE3778591419782047144807"
            }
          },
          "name": "Idun Eriksson"
        }
      },
      "dates": {
        "booked": "2020-12-15",
        "value": "2020-12-15"
      },
      "descriptions": {
        "detailed": {
          "unstructured": "Purchase at ABC Supermarket, City XYZ, on 2023-10-05, Amount: $45.67, Card ending in 1234."
        },
        "display": "Tesco",
        "original": "TESCO 123#52"
      },
      "enrichedData": {
        "brandIdentification": {
          "id": "8948045b-d163-4d03-b9ec-3d5237a4550a",
          "logoUri": "[external url removed]",
          "merchant": {
            "id": "8948045b-d163-4d03-b9ec-3d5237a4550a",
            "logoUri": "[external url removed]",
            "name": "Tesco Store 2nd Street"
          },
          "name": "Tesco Stores",
          "status": {
            "code": "SUCCESS",
            "message": "<only on failure>"
          }
        },
        "categories": {
          "pfm": {
            "id": "075fab3ec31f43aa9d39675475c1fb1a"
          },
          "status": {
            "code": "SUCCESS",
            "message": "<only on failure>"
          }
        },
        "sustainability": {
          "co2InGrams": 1044,
          "status": {
            "code": "SUCCESS",
            "message": "<only on failure>"
          }
        }
      },
      "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
      "identifiers": {
        "providerTransactionId": "500015d3-acf3-48cc-9918-9e53738d3692"
      },
      "merchantInformation": {
        "merchantCategoryCode": 5462,
        "merchantName": "Artisanal Bakery Shops"
      },
      "providerMutability": "MUTABILITY_UNDEFINED",
      "reference": "RF12310007894321",
      "status": "BOOKED",
      "transactionDateTime": "2020-12-15T09:25:12Z",
      "types": {
        "financialInstitutionTypeCode": "075fab3ec31f43aa9d39675475c1fb1a",
        "type": "CREDIT_CARD"
      },
      "valueDateTime": "2020-12-15T09:25:12Z"
    }
  ]
}
```

### Response: EnrichedTransactionsResponse[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse)

nextPageToken `string`

The nextPageToken value returned from a previous List request, if any.

transactions `array[EnrichedTransaction]`

A list of enriched transactions.

#### EnrichedTransaction[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/enrichedtransaction)

accountId `string`

Tink unique identifier for the account the transaction belongs to.

amount `CurrencyDenominatedAmount`

bookedDateTime `string`

For BOOKED transactions indicates the date and time when the transaction was posted on the financial institution’s books. For PENDING transactions indicates the expected booking date and time. Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

counterparties `Counterparties`

dates `Dates`

descriptions `Description`

enrichedData `EnrichedData`

id `string`

Tink unique identifier for the transaction.

identifiers `Identifiers`

merchantInformation `MerchantInformation`

providerMutability `string`

Transaction mutability status as indicated by the financial institution.  
Values: `MUTABILITY_UNDEFINED`, `MUTABLE`, `IMMUTABLE`

reference `string`

Transaction reference as provided by the financial institution.

status `string`

Enumeration representing the status of a transaction.  
Values: `UNDEFINED`, `PENDING`, `BOOKED`

transactionDateTime `string`

The time and date when the transaction event was first initiated. For example when a payment card was authorized at the point of sale (before it was booked) or when a money transfer was first initiated (before it was executed). Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

types `FinancialTypes`

valueDateTime `string`

The date and time when assets either become available or cease to be available to the account owner. Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

#### CurrencyDenominatedAmount[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

#### ExactNumber[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### Counterparties[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/counterparties)

payee `Counterparty`

Available payee information.

payer `Counterparty`

Available payer information.

#### Counterparty[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/counterparty)

identifiers `CounterpartyIdentifier`

Available identifiers.

name `string`

Name of a transaction counterparty from financial institution.

#### CounterpartyIdentifier[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/counterpartyidentifier)

financialInstitution `CounterpartyFinancialInstitution`

Internal identifiers from the financial institution.

#### CounterpartyFinancialInstitution[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/counterpartyfinancialinstitution)

accountNumber `string`

Transaction counterparty account number from financial institution.

#### Dates[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/dates)

booked `string`

For BOOKED transactions indicates the date when the transaction was posted on the financial institution’s books. For PENDING transactions indicates the expected booking date. Specified as a ISO-8601 date string (YYYY-MM-DD). Corresponds to the date displayed to the financial institution end user on their bank statement or transaction list in their online bank in the bank’s local time.

value `string`

The date when assets either become available or cease to be available to the account owner. Specified as a ISO-8601 date string (YYYY-MM-DD). Corresponds to the date displayed to the financial institution end user on their bank statement or transaction list in their online bank in the bank’s local time.

#### Description[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/description)

detailed `TransactionInformation`

display `string`

Formatted and cleaned description intended to be shown to the end user when displaying a transactions list.

original `string`

Original unmodified description from the financial institution.

#### TransactionInformation[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/transactioninformation)

unstructured `string`

A detailed description from the financial institution. Intended to be shown to the end user when displaying a detailed view of a transaction. It contains a narrative, unstructured and unmodified text message with details of a transaction.

#### EnrichedData[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/enricheddata)

brandIdentification `BrandIdentification`

categories `Categories`

sustainability `Sustainability`

#### BrandIdentification[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/brandidentification)

id `string`

Brand ID.

logoUri `string`

Logo URI.

merchant `Merchant`

name `string`

Brand name.

status `EnrichmentStatus`

#### Merchant[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/merchant)

id `string`

Merchant ID.

logoUri `string`

Logo URI.

name `string`

Merchant name.

#### EnrichmentStatus[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/enrichmentstatus)

code `string`

SUCCESS: enrichment was successful. FAILURE: temporary unknown failure. PRODUCT\_NOT\_PERMITTED: the product is not permitted. PRODUCT\_NOT\_AVAILABLE: the product is not available.  
Values: `SUCCESS`, `FAILURE`, `PRODUCT_NOT_PERMITTED`, `PRODUCT_NOT_AVAILABLE`

message `string`

Error message in case of failure..

#### Categories[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/categories)

pfm `PFMCategory`

status `EnrichmentStatus`

#### PFMCategory[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/pfmcategory)

id `string`

Tink category ID.

#### Sustainability[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/sustainability)

co2InGrams `string`

Co2 in grams.

status `EnrichmentStatus`

#### Identifiers[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/identifiers)

providerTransactionId `string`

The transaction ID given by the transaction provider.

#### MerchantInformation[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/merchantinformation)

merchantCategoryCode `string`

Merchant category code (MCC), as indicated by the financial institution.

merchantName `string`

Name of merchant, as indicated by the financial institution.

#### FinancialTypes[](#enrichment/enriched-transactions/list-enriched-transactions/response-enrichedtransactionsresponse/financialtypes)

financialInstitutionTypeCode `string`

The financial institution's proprietary transaction type code.

type `string`

(DEPRECATED) Tink transaction type.  
Values: `UNDEFINED`, `CREDIT_CARD`, `PAYMENT`, `WITHDRAWAL`, `DEFAULT`, `TRANSFER`

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |
| 600 | More specific error codes that can be found as `detailCode` in the error response. NON\_SPECIFIED (0), NOT\_AUTHORIZED (1), INVALID\_TOKEN (2), CATEGORIES\_NOT\_FOUND (3), UUID\_INVALID (4), ENTITY\_NOT\_FOUND (5), TRANSACTIONS\_NOT\_FOUND (6), FEATURE\_NOT\_AVAILABLE (7), INVALID\_REQUEST (8) |

## List Enriched Transactions by IDs[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids)

`POST /enrichment/v1/transactions-by-ids`

List enriched transactions for a user by specific transaction IDs.

**NOTE**: This endpoint might not be available in all markets.

### Works with[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.transactions` `transactions:read` |
| User token | `enrichment.transactions:readonly` `transactions:read` |

> Request Example

```
{
  "ids": [
    "string",
    "string"
  ]
}
```

### Request Body: ListTransactionsById[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/request-body-listtransactionsbyid)

Request for getting transactions by IDs

ids `array[string]`

List of IDs to retrieve enriched transaction data for. Maximum of 2500 IDs allowed.

> Response Example

```
{
  "transactions": [
    {
      "accountId": "8927a317da2042f1a36949bed28575e4",
      "amount": {
        "currencyCode": "GBP",
        "value": {
          "scale": 1,
          "unscaledValue": -170
        }
      },
      "bookedDateTime": "2020-12-15T09:25:12Z",
      "counterparties": {
        "payee": {
          "identifiers": {
            "financialInstitution": {
              "accountNumber": "SE3778591419782047144807"
            }
          },
          "name": "Idun Eriksson"
        },
        "payer": {
          "identifiers": {
            "financialInstitution": {
              "accountNumber": "SE3778591419782047144807"
            }
          },
          "name": "Idun Eriksson"
        }
      },
      "dates": {
        "booked": "2020-12-15",
        "value": "2020-12-15"
      },
      "descriptions": {
        "detailed": {
          "unstructured": "Purchase at ABC Supermarket, City XYZ, on 2023-10-05, Amount: $45.67, Card ending in 1234."
        },
        "display": "Tesco",
        "original": "TESCO 123#52"
      },
      "enrichedData": {
        "brandIdentification": {
          "id": "8948045b-d163-4d03-b9ec-3d5237a4550a",
          "logoUri": "[external url removed]",
          "merchant": {
            "id": "8948045b-d163-4d03-b9ec-3d5237a4550a",
            "logoUri": "[external url removed]",
            "name": "Tesco Store 2nd Street"
          },
          "name": "Tesco Stores",
          "status": {
            "code": "SUCCESS",
            "message": "<only on failure>"
          }
        },
        "categories": {
          "pfm": {
            "id": "075fab3ec31f43aa9d39675475c1fb1a"
          },
          "status": {
            "code": "SUCCESS",
            "message": "<only on failure>"
          }
        },
        "sustainability": {
          "co2InGrams": 1044,
          "status": {
            "code": "SUCCESS",
            "message": "<only on failure>"
          }
        }
      },
      "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
      "identifiers": {
        "providerTransactionId": "500015d3-acf3-48cc-9918-9e53738d3692"
      },
      "merchantInformation": {
        "merchantCategoryCode": 5462,
        "merchantName": "Artisanal Bakery Shops"
      },
      "providerMutability": "MUTABILITY_UNDEFINED",
      "reference": "RF12310007894321",
      "status": "BOOKED",
      "transactionDateTime": "2020-12-15T09:25:12Z",
      "types": {
        "financialInstitutionTypeCode": "075fab3ec31f43aa9d39675475c1fb1a",
        "type": "CREDIT_CARD"
      },
      "valueDateTime": "2020-12-15T09:25:12Z"
    }
  ]
}
```

### Response: EnrichedTransactionsByIdResponse[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse)

transactions `array[EnrichedTransaction]`

A list of enriched transactions.

#### EnrichedTransaction[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/enrichedtransaction)

accountId `string`

Tink unique identifier for the account the transaction belongs to.

amount `CurrencyDenominatedAmount`

bookedDateTime `string`

For BOOKED transactions indicates the date and time when the transaction was posted on the financial institution’s books. For PENDING transactions indicates the expected booking date and time. Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

counterparties `Counterparties`

dates `Dates`

descriptions `Description`

enrichedData `EnrichedData`

id `string`

Tink unique identifier for the transaction.

identifiers `Identifiers`

merchantInformation `MerchantInformation`

providerMutability `string`

Transaction mutability status as indicated by the financial institution.  
Values: `MUTABILITY_UNDEFINED`, `MUTABLE`, `IMMUTABLE`

reference `string`

Transaction reference as provided by the financial institution.

status `string`

Enumeration representing the status of a transaction.  
Values: `UNDEFINED`, `PENDING`, `BOOKED`

transactionDateTime `string`

The time and date when the transaction event was first initiated. For example when a payment card was authorized at the point of sale (before it was booked) or when a money transfer was first initiated (before it was executed). Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

types `FinancialTypes`

valueDateTime `string`

The date and time when assets either become available or cease to be available to the account owner. Specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00). This field is only returned when a valid timestamp is provided by the financial institution.

#### CurrencyDenominatedAmount[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

#### ExactNumber[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### Counterparties[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/counterparties)

payee `Counterparty`

Available payee information.

payer `Counterparty`

Available payer information.

#### Counterparty[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/counterparty)

identifiers `CounterpartyIdentifier`

Available identifiers.

name `string`

Name of a transaction counterparty from financial institution.

#### CounterpartyIdentifier[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/counterpartyidentifier)

financialInstitution `CounterpartyFinancialInstitution`

Internal identifiers from the financial institution.

#### CounterpartyFinancialInstitution[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/counterpartyfinancialinstitution)

accountNumber `string`

Transaction counterparty account number from financial institution.

#### Dates[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/dates)

booked `string`

For BOOKED transactions indicates the date when the transaction was posted on the financial institution’s books. For PENDING transactions indicates the expected booking date. Specified as a ISO-8601 date string (YYYY-MM-DD). Corresponds to the date displayed to the financial institution end user on their bank statement or transaction list in their online bank in the bank’s local time.

value `string`

The date when assets either become available or cease to be available to the account owner. Specified as a ISO-8601 date string (YYYY-MM-DD). Corresponds to the date displayed to the financial institution end user on their bank statement or transaction list in their online bank in the bank’s local time.

#### Description[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/description)

detailed `TransactionInformation`

display `string`

Formatted and cleaned description intended to be shown to the end user when displaying a transactions list.

original `string`

Original unmodified description from the financial institution.

#### TransactionInformation[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/transactioninformation)

unstructured `string`

A detailed description from the financial institution. Intended to be shown to the end user when displaying a detailed view of a transaction. It contains a narrative, unstructured and unmodified text message with details of a transaction.

#### EnrichedData[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/enricheddata)

brandIdentification `BrandIdentification`

categories `Categories`

sustainability `Sustainability`

#### BrandIdentification[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/brandidentification)

id `string`

Brand ID.

logoUri `string`

Logo URI.

merchant `Merchant`

name `string`

Brand name.

status `EnrichmentStatus`

#### Merchant[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/merchant)

id `string`

Merchant ID.

logoUri `string`

Logo URI.

name `string`

Merchant name.

#### EnrichmentStatus[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/enrichmentstatus)

code `string`

SUCCESS: enrichment was successful. FAILURE: temporary unknown failure. PRODUCT\_NOT\_PERMITTED: the product is not permitted. PRODUCT\_NOT\_AVAILABLE: the product is not available.  
Values: `SUCCESS`, `FAILURE`, `PRODUCT_NOT_PERMITTED`, `PRODUCT_NOT_AVAILABLE`

message `string`

Error message in case of failure..

#### Categories[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/categories)

pfm `PFMCategory`

status `EnrichmentStatus`

#### PFMCategory[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/pfmcategory)

id `string`

Tink category ID.

#### Sustainability[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/sustainability)

co2InGrams `string`

Co2 in grams.

status `EnrichmentStatus`

#### Identifiers[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/identifiers)

providerTransactionId `string`

The transaction ID given by the transaction provider.

#### MerchantInformation[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/merchantinformation)

merchantCategoryCode `string`

Merchant category code (MCC), as indicated by the financial institution.

merchantName `string`

Name of merchant, as indicated by the financial institution.

#### FinancialTypes[](#enrichment/enriched-transactions/list-enriched-transactions-by-ids/response-enrichedtransactionsbyidresponse/financialtypes)

financialInstitutionTypeCode `string`

The financial institution's proprietary transaction type code.

type `string`

(DEPRECATED) Tink transaction type.  
Values: `UNDEFINED`, `CREDIT_CARD`, `PAYMENT`, `WITHDRAWAL`, `DEFAULT`, `TRANSFER`

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |
| 501 | Returns `501 Not Implemented` if the feature is not available. |
| 600 | More specific error codes that can be found as `detailCode` in the error response. NON\_SPECIFIED (0), NOT\_AUTHORIZED (1), INVALID\_TOKEN (2), CATEGORIES\_NOT\_FOUND (3), UUID\_INVALID (4), ENTITY\_NOT\_FOUND (5), TRANSACTIONS\_NOT\_FOUND (6), FEATURE\_NOT\_AVAILABLE (7), INVALID\_REQUEST (8) |

## Update Enriched Transactions[](#enrichment/enriched-transactions/update-enriched-transactions)

`PATCH /enrichment/v1/transactions`

Update one or more enriched transactions categories.

### Works with[](#enrichment/enriched-transactions/update-enriched-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.transactions` `transactions:read` `transactions:categorize` |

> Request Example

```
{
  "enrichedData": {
    "categories": {
      "pfm": {
        "id": "075fab3ec31f43aa9d39675475c1fb1a"
      }
    }
  },
  "id": "d8f37f7d19c240abb4ef5d5dbebae4ef"
}
```

### Request Body: UpdateTransactionsRequest[](#enrichment/enriched-transactions/update-enriched-transactions/request-body-updatetransactionsrequest)

List of transactions to be updated. **NOTE**: Actual request is an array of the request example.

enrichedData `EnrichedData` required

id `string` required

Tink transaction ID.

#### EnrichedData[](#enrichment/enriched-transactions/update-enriched-transactions/request-body-updatetransactionsrequest/enricheddata)

categories `Categories` required

#### Categories[](#enrichment/enriched-transactions/update-enriched-transactions/request-body-updatetransactionsrequest/categories)

pfm `Pfm` required

#### Pfm[](#enrichment/enriched-transactions/update-enriched-transactions/request-body-updatetransactionsrequest/pfm)

id `string` required

Tink category ID.

> Response Example

```
{}
```

### Response: UpdateTransactionsResponse[](#enrichment/enriched-transactions/update-enriched-transactions/response-updatetransactionsresponse)

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |
| 600 | More specific error codes that can be found as `detailCode` in the error response. NON\_SPECIFIED (0), NOT\_AUTHORIZED (1), INVALID\_TOKEN (2), CATEGORIES\_NOT\_FOUND (3), UUID\_INVALID (4), ENTITY\_NOT\_FOUND (5), TRANSACTIONS\_NOT\_FOUND (6), FEATURE\_NOT\_AVAILABLE (7), INVALID\_REQUEST (8) |

## Enrichment Feedback[](#enrichment/enrichment-feedback)

## Submit merchant/brand feedback[](#enrichment/enrichment-feedback/submit-merchant-brand-feedback)

`POST /enrichment/v1/feedback`

Submit feedback about incorrect merchant or brand information. Supports batch submission of multiple feedback items.

### Works with[](#enrichment/enrichment-feedback/submit-merchant-brand-feedback/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.on-demand` |
| User token | `enrichment.transactions` |
| Client token | `enrichment.transactions` |
| Client token | `enrichment.on-demand` |

> Request Example

```
{
  "feedbackData": [
    {
      "brandId": "02820044-69f5-4170-a516-fbeae6450f7a",
      "issues": [
        "string",
        "string"
      ],
      "merchantId": "12345678-1234-1234-1234-123456789abc",
      "transactionDetails": {
        "cardAcceptorId": "MERCHANT123",
        "originalDescription": "ACME STORE #123",
        "userMarket": "US"
      }
    }
  ]
}
```

### Request Body: FeedbackRequest[](#enrichment/enrichment-feedback/submit-merchant-brand-feedback/request-body-feedbackrequest)

Request for submitting batch feedback about merchant/brand information

feedbackData `array[FeedbackItem]` required

Set of unique feedback items to submit

#### FeedbackItem[](#enrichment/enrichment-feedback/submit-merchant-brand-feedback/request-body-feedbackrequest/feedbackitem)

brandId `string` required

UUID of the brand with incorrect data

issues `array[string]`

Types of data quality issues reported (may be required based on customer configuration)  
Values: `LOGO_IS_WRONG`, `CONTACT_IS_WRONG`, `LOCATION_IS_WRONG`, `NAME_IS_WRONG`

merchantId `string`

UUID of the merchant with incorrect data (optional)

transactionDetails `TransactionDetails`

Additional transaction details if available from the customer (optional)

#### TransactionDetails[](#enrichment/enrichment-feedback/submit-merchant-brand-feedback/request-body-feedbackrequest/transactiondetails)

cardAcceptorId `string`

Card acceptor identifier

originalDescription `string`

Original transaction description

userMarket `string`

User's market/region

| Status Code | Description |
| --- | --- |
| 204 | Feedback successfully submitted and queued for processing |
| 400 | Invalid request (validation failed) |
| 401 | Valid token but missing required scopes |
| 403 | Missing or invalid OAuth token |
| 404 | Brand or Merchant ID not found |
| 500 | Internal server error |

## Merchant Information[](#enrichment/merchant-information)

## Brand[](#enrichment/merchant-information/brand)

## Get Brand By ID[](#enrichment/merchant-information/brand/get-brand-by-id)

`GET /enrichment/v1/brand-identification/brands/{id}`

A **Brand** is a high-level, market-recognizable entity that represents the overarching organization or label associated with a transaction. Brands are typically global or market-specific companies (e.g., Spotify, Zara, H&M) and are used to enrich transactions with familiar names and logos, improving user experience.

**Purpose:**

Brands provide a consistent, recognizable identity for transactions, enabling features such as logo display, brand-based statistics, and improved categorization.

This api fetches a brand by its ID. The ID is a UUID.

The response will include the brand's name, logo and contact information.

### Works with[](#enrichment/merchant-information/brand/get-brand-by-id/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.merchant` |
| Client token | `enrichment.merchant` |
| Client token | `enrichment.on-demand` |

### Parameters[](#enrichment/merchant-information/brand/get-brand-by-id/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | ID of the brand |

> Response Example

```
{
  "brand": {
    "contact": {
      "website": "[external url removed]"
    },
    "id": "02820044-69f5-4170-a516-fbeae6450f7a",
    "logoUri": "[external url removed]",
    "name": "Spotify"
  }
}
```

### Response: BrandResponse[](#enrichment/merchant-information/brand/get-brand-by-id/response-brandresponse)

Response object contains the brand's name, logo and contact information

brand `Brand`

Brand information.

#### Brand[](#enrichment/merchant-information/brand/get-brand-by-id/response-brandresponse/brand)

contact `BrandContact`

Brand contact information.

id `string`

Unique Tink-generated identifier for the brand.

logoUri `string`

URL to a verified, high-quality brand logo (preferably SVG).

name `string`

Official brand name, as recognized in the market.

#### BrandContact[](#enrichment/merchant-information/brand/get-brand-by-id/response-brandresponse/brandcontact)

website `string`

Website location.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |
| 600 | More specific error codes that can be found as `detailCode` in the error response. NON\_SPECIFIED (0), NOT\_AUTHORIZED (1), INVALID\_TOKEN (2), CATEGORIES\_NOT\_FOUND (3), UUID\_INVALID (4), ENTITY\_NOT\_FOUND (5), TRANSACTIONS\_NOT\_FOUND (6), FEATURE\_NOT\_AVAILABLE (7), INVALID\_REQUEST (8) |

## Merchant[](#enrichment/merchant-information/merchant)

## Get Merchant By ID[](#enrichment/merchant-information/merchant/get-merchant-by-id)

`GET /enrichment/v1/brand-identification/merchants/{id}`

A **Merchant** is a more granular entity than a Brand, representing the specific store, outlet, or online presence where a transaction occurred. Merchants may be part of a Brand (e.g., “Spotify Stockholm Store” under the Spotify brand) and include additional details such as location and contact information.

**Purpose**:

Merchants provide the detail required for regulatory compliance (e.g., Mastercard mandate), enable drill-down into transaction details, and support features like contact and location display.

This api fetches a merchant by its ID. The ID is a UUID.

The response will include the merchant's name, logo, location and contact information.

### Works with[](#enrichment/merchant-information/merchant/get-merchant-by-id/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.merchant` |
| Client token | `enrichment.merchant` |
| Client token | `enrichment.on-demand` |

### Parameters[](#enrichment/merchant-information/merchant/get-merchant-by-id/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | ID of the merchant |

> Response Example

```
{
  "merchant": {
    "contact": {
      "phone": "+46-8-123456",
      "website": "[external url removed]"
    },
    "id": "02820044-69f5-4170-a516-fbeae6450f7a",
    "location": {
      "address": {
        "city": "Stockholm",
        "country": "Sweden",
        "postalCode": "11122",
        "street": "Birger Jarlsgatan 61, 113 56 Stockholm"
      },
      "coordinates": "59.33282, 18.05669",
      "googlePlacesId": "ChIJs5ydyTiuEmsR0fRSlU0C7k0"
    },
    "logoUri": "[external url removed]",
    "name": "Spotify Stockholm Store"
  }
}
```

### Response: MerchantResponse[](#enrichment/merchant-information/merchant/get-merchant-by-id/response-merchantresponse)

Response object contains the merchant's name, logo, location and contact information

merchant `Merchant`

Merchant information.

#### Merchant[](#enrichment/merchant-information/merchant/get-merchant-by-id/response-merchantresponse/merchant)

contact `MerchantContact`

Merchant contact information. Object containing website and phone number.

id `string`

Unique Tink-generated identifier for the merchant.

location `MerchantLocation`

Merchant location information. Object containing country, city, postalCode and street.

logoUri `string`

Logo specific to the merchant, or fallback to the brand logo.

name `string`

Merchant/store name as it appears to the consumer.

#### MerchantContact[](#enrichment/merchant-information/merchant/get-merchant-by-id/response-merchantresponse/merchantcontact)

phone `string`

Phone number.

website `string`

Website location.

#### MerchantLocation[](#enrichment/merchant-information/merchant/get-merchant-by-id/response-merchantresponse/merchantlocation)

address `MerchantAddress`

Merchant address information.

coordinates `string`

Location coordinates (latitude, longitude).

googlePlacesId `string`

A place ID is a textual identifier that uniquely identifies a place. It is used to retrieve place information on Google Maps Platform.

#### MerchantAddress[](#enrichment/merchant-information/merchant/get-merchant-by-id/response-merchantresponse/merchantaddress)

city `string`

City name.

country `string`

Country name.

postalCode `string`

Postal code.

street `string`

Street address.

| Status Code | Description |
| --- | --- |
| 0 | More specific error codes that can be found as `detailCode` in the error response. NON\_SPECIFIED (0), NOT\_AUTHORIZED (1), INVALID\_TOKEN (2), CATEGORIES\_NOT\_FOUND (3), UUID\_INVALID (4), ENTITY\_NOT\_FOUND (5), TRANSACTIONS\_NOT\_FOUND (6), FEATURE\_NOT\_AVAILABLE (7), INVALID\_REQUEST (8) |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |

## Recurring Transactions[](#enrichment/recurring-transactions)

## Get a Recurring Transactions Group[](#enrichment/recurring-transactions/get-a-recurring-transactions-group)

`GET /enrichment/v1/recurring-transactions-groups/{groupId}`

Get a single recurring transactions group for a user.

### Works with[](#enrichment/recurring-transactions/get-a-recurring-transactions-group/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.transactions` |
| User token | `enrichment.transactions:readonly` |
| User token | `transactions.recurring:read` |

### Parameters[](#enrichment/recurring-transactions/get-a-recurring-transactions-group/parameters)

| Parameter | Description |
| --- | --- |
| groupIdrequired | The id of the recurring transactions group. This is a required field. Must be a valid UUID. |

> Response Example

```
{
  "recurringTransactionsGroup": {
    "accountIds": [
      "c0e9225a12084bcbb7df794e786ebeaf"
    ],
    "amount": {
      "currencyCode": "EUR",
      "latest": {
        "scale": 1,
        "unscaledValue": 100
      },
      "maximum": {
        "scale": 1,
        "unscaledValue": 100
      },
      "mean": {
        "scale": 1,
        "unscaledValue": 100
      },
      "median": {
        "scale": 1,
        "unscaledValue": 100
      },
      "minimum": {
        "scale": 1,
        "unscaledValue": 100
      },
      "standardDeviation": {
        "scale": 1,
        "unscaledValue": 100
      }
    },
    "categoryId": "075fab3ec31f43aa9d39675475c1fb1a",
    "id": "3bc213c6-743d-4b3b-9fb9-0a43f63e162c",
    "name": "Netflix",
    "occurrences": {
      "count": 3,
      "dayOfMonth": {
        "maximum": 5,
        "mean": 5.0,
        "median": 5,
        "minimum": 5
      },
      "dayOfWeek": {
        "maximum": 2,
        "mean": 2.0,
        "median": 2,
        "minimum": 2
      },
      "firstDate": "2020-07-05",
      "latestDate": "2020-09-05"
    },
    "period": {
      "duration": {
        "maximum": 0,
        "mean": 30.0,
        "minimum": 30,
        "standardDeviation": 30.0
      },
      "label": "MONTHLY"
    },
    "status": "ACTIVE"
  }
}
```

### Response: GetRecurringTransactionsGroupResponse[](#enrichment/recurring-transactions/get-a-recurring-transactions-group/response-getrecurringtransactionsgroupresponse)

recurringTransactionsGroup `RecurringTransactionsGroup`

A single recurring transactions group.

#### RecurringTransactionsGroup[](#enrichment/recurring-transactions/get-a-recurring-transactions-group/response-getrecurringtransactionsgroupresponse/recurringtransactionsgroup)

accountIds `array[string]`

List of account ids that are used for payments in this group.

amount `Amount`

categoryId `string`

The category id of the recurring transactions group. This id matches category ids from the category endpoint.

id `string`

The unique identifier of the recurring transactions group.

name `string`

The name of the group.

occurrences `Occurrences`

period `Period`

status `string`

Activity status of the group.  
Values: `UNDEFINED`, `ACTIVE`, `INACTIVE`

#### Amount[](#enrichment/recurring-transactions/get-a-recurring-transactions-group/response-getrecurringtransactionsgroupresponse/amount)

currencyCode `string`

The currency used for transactions in the group.

latest `ExactNumber`

maximum `ExactNumber`

mean `ExactNumber`

median `ExactNumber`

minimum `ExactNumber`

standardDeviation `ExactNumber`

#### ExactNumber[](#enrichment/recurring-transactions/get-a-recurring-transactions-group/response-getrecurringtransactionsgroupresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if `scale` is 1 and `unscaledValue` is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if `scale` is 1 and `unscaledValue` is 1230, the end result would be 123.0.

#### Occurrences[](#enrichment/recurring-transactions/get-a-recurring-transactions-group/response-getrecurringtransactionsgroupresponse/occurrences)

count `integer`

The number of occurrences in the group.

dayOfMonth `DayOfMonth`

dayOfWeek `DayOfWeek`

firstDate `string`

The first date of the occurrence.

latestDate `string`

The latest date of the occurrence.

#### DayOfMonth[](#enrichment/recurring-transactions/get-a-recurring-transactions-group/response-getrecurringtransactionsgroupresponse/dayofmonth)

maximum `integer`

The latest day of the month that the recurring transaction has occurred.

mean `number`

The average day of the month that the recurring transactions occur.

median `integer`

The median of which day of the month that the recurring transactions occur.

minimum `integer`

The earliest day of the month that the recurring transaction has occurred.

#### DayOfWeek[](#enrichment/recurring-transactions/get-a-recurring-transactions-group/response-getrecurringtransactionsgroupresponse/dayofweek)

maximum `integer`

The latest day of the week that the recurring transaction has occurred.

mean `number`

The average day of the week that the recurring transactions occur.

median `integer`

The median of which day of the week that the recurring transactions occur.

minimum `integer`

The earliest day of the week that the recurring transaction has occurred.

#### Period[](#enrichment/recurring-transactions/get-a-recurring-transactions-group/response-getrecurringtransactionsgroupresponse/period)

duration `Duration`

label `string`

The periodicity of the group.  
Values: `WEEKLY`, `BI_WEEKLY`, `MONTHLY`, `BI_MONTHLY`, `QUARTERLY`, `HALF_YEARLY`, `YEARLY`

#### Duration[](#enrichment/recurring-transactions/get-a-recurring-transactions-group/response-getrecurringtransactionsgroupresponse/duration)

maximum `integer`

The longest interval between two recurring transactions in the group.

mean `number`

The average number of days between two recurring transactions in the group.

minimum `integer`

The shortest interval between two recurring transactions in the group.

standardDeviation `number`

The population standard deviation of the days between two recurring transactions in the group.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |
| 600 | More specific error codes that can be found as `detailCode` in the error response. NON\_SPECIFIED (0), NOT\_AUTHORIZED (1), INVALID\_TOKEN (2), CATEGORIES\_NOT\_FOUND (3), UUID\_INVALID (4), ENTITY\_NOT\_FOUND (5). |

## List Predicted Recurring Transactions[](#enrichment/recurring-transactions/list-predicted-recurring-transactions)

`GET /enrichment/v1/predicted-recurring-transactions`

List predicted recurring transactions for a user. All fields are optional, which means that setting none of the fields will return 30 days of predictions for all of a user's active groups.

To forecast recurring transactions for 30 days ahead, the model checks if an existing recurring transactions group is active. If that is the case, the model will look at the last date for when the transactions occurred and calculate that together with the found periodicity for that recurring transaction.

Only one prediction will be made for each group, unless the group has a WEEKLY or a BI\_WEEKLY periodicity.

### Works with[](#enrichment/recurring-transactions/list-predicted-recurring-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.transactions` |
| User token | `enrichment.transactions:readonly` |
| User token | `transactions.recurring:read` |

### Query Parameters[](#enrichment/recurring-transactions/list-predicted-recurring-transactions/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSize | An optional pagination page size. Default value is 10, max value is 100. Must be a positive integer. |
| predictionSpanDays | The prediction span in days from today's date. The default value is 30 days. Must be a positive integer. Optional. |
| pageToken | An optional pagination token specifying the page of results to retrieve. |
| groupIdIn | A list of ids of the recurring transactions group to predict transactions for. Note that this cannot be used in combination with any of the other group id fields. Must be a valid UUID. Optional. |
| accountIdIn | A list of account ids to predict transactions for. Note that this cannot be used in combination with any of the other account id fields. Must be a valid UUID. Optional. |

> Response Example

```
{
  "nextPageToken": "AQ==",
  "predictedRecurringTransactions": [
    {
      "accountId": "c0e9225a12084bcbb7df794e786ebeaf",
      "amount": {
        "predicted": {
          "currencyCode": "EUR",
          "value": {
            "scale": 1,
            "unscaledValue": 100
          }
        }
      },
      "date": {
        "predicted": "2020-10-05"
      },
      "description": {
        "display": "Netflix",
        "original": "netflix"
      },
      "groupId": "3bc213c6-743d-4b3b-9fb9-0a43f63e162c"
    }
  ]
}
```

### Response: ListPredictedRecurringTransactionsResponse[](#enrichment/recurring-transactions/list-predicted-recurring-transactions/response-listpredictedrecurringtransactionsresponse)

Response containing a list of predicted recurring transactions

nextPageToken `string`

An ID specifying the next page of results. If empty, it means that no more results remain.

predictedRecurringTransactions `array[PredictedRecurringTransaction]`

#### PredictedRecurringTransaction[](#enrichment/recurring-transactions/list-predicted-recurring-transactions/response-listpredictedrecurringtransactionsresponse/predictedrecurringtransaction)

accountId `string`

The id of the account that the predicted transaction belongs to. This id matches the account ids from the account endpoint.

amount `Amounts`

date `TransactionDate`

description `Descriptions`

groupId `string`

The id of the related recurring transactions group.

#### Amounts[](#enrichment/recurring-transactions/list-predicted-recurring-transactions/response-listpredictedrecurringtransactionsresponse/amounts)

predicted `CurrencyDenominatedAmount`

#### CurrencyDenominatedAmount[](#enrichment/recurring-transactions/list-predicted-recurring-transactions/response-listpredictedrecurringtransactionsresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

#### ExactNumber[](#enrichment/recurring-transactions/list-predicted-recurring-transactions/response-listpredictedrecurringtransactionsresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if `scale` is 1 and `unscaledValue` is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if `scale` is 1 and `unscaledValue` is 1230, the end result would be 123.0.

#### TransactionDate[](#enrichment/recurring-transactions/list-predicted-recurring-transactions/response-listpredictedrecurringtransactionsresponse/transactiondate)

predicted `string`

The ISO-8601 date that the recurring transaction is predicted to occur. Uses the format YYYY-MM-DD. Date is in UTC timezone.

#### Descriptions[](#enrichment/recurring-transactions/list-predicted-recurring-transactions/response-listpredictedrecurringtransactionsresponse/descriptions)

display `string`

The formatted and prettified description of the recurring transaction.

original `string`

The raw (original and unprettified) description of the recurring transaction.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |
| 600 | More specific error codes that can be found as `detailCode` in the error response. NON\_SPECIFIED (0), NOT\_AUTHORIZED (1), INVALID\_TOKEN (2), CATEGORIES\_NOT\_FOUND (3), UUID\_INVALID (4), ENTITY\_NOT\_FOUND (5). |

## List Recurring Transactions[](#enrichment/recurring-transactions/list-recurring-transactions)

`GET /enrichment/v1/recurring-transactions`

List all recurring transactions for a user.

### Works with[](#enrichment/recurring-transactions/list-recurring-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.transactions` |
| User token | `enrichment.transactions:readonly` |
| User token | `transactions.recurring:read` |

### Query Parameters[](#enrichment/recurring-transactions/list-recurring-transactions/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSize | An optional pagination page size. Default value is 10, max value is 100. Must be a positive integer. |
| pageToken | An optional pagination token specifying the page of results to retrieve. |
| groupIdIn | Optional. Specifies a list of group ids to fetch recurring transactions from. Note that this cannot be used in combination with any of the other group id fields. Must be a valid UUID. |
| accountIdIn | Optional. Specifies a list of account ids to fetch recurring transactions from. |

> Response Example

```
{
  "nextPageToken": "AQ==",
  "recurringTransactions": [
    {
      "accountId": "c0e9225a12084bcbb7df794e786ebeaf",
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": 1,
          "unscaledValue": 100
        }
      },
      "categoryId": "075fab3ec31f43aa9d39675475c1fb1a",
      "date": {
        "booked": "2020-05-18",
        "value": "2020-05-18"
      },
      "description": {
        "display": "Netflix",
        "original": "netflix"
      },
      "groupId": "3bc213c6-743d-4b3b-9fb9-0a43f63e162c",
      "transactionId": "1356d14958f746928233d6568ffa8828"
    }
  ]
}
```

### Response: ListRecurringTransactionsResponse[](#enrichment/recurring-transactions/list-recurring-transactions/response-listrecurringtransactionsresponse)

List Recurring Transactions Response

nextPageToken `string`

An ID specifying the next page of results. If empty, it means that no more results remain.

recurringTransactions `array[RecurringTransaction]`

#### RecurringTransaction[](#enrichment/recurring-transactions/list-recurring-transactions/response-listrecurringtransactionsresponse/recurringtransaction)

accountId `string`

The user's account's Tink id.

amount `CurrencyDenominatedAmount`

categoryId `string`

The category id of the recurring transaction. This id matches category ids from the category endpoint.

date `TransactionDates`

description `Descriptions`

groupId `string`

The id of the related recurring transactions group.

transactionId `string`

The ID of the transaction.

#### CurrencyDenominatedAmount[](#enrichment/recurring-transactions/list-recurring-transactions/response-listrecurringtransactionsresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

#### ExactNumber[](#enrichment/recurring-transactions/list-recurring-transactions/response-listrecurringtransactionsresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if `scale` is 1 and `unscaledValue` is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if `scale` is 1 and `unscaledValue` is 1230, the end result would be 123.0.

#### TransactionDates[](#enrichment/recurring-transactions/list-recurring-transactions/response-listrecurringtransactionsresponse/transactiondates)

booked `string`

The ISO-8601 date that the transaction was received by the bank. Uses the format YYYY-MM-DD. Date is in UTC timezone.

value `string`

The ISO-8601 date that the transaction will be executed. Uses the format YYYY-MM-DD. Date is in UTC timezone.

#### Descriptions[](#enrichment/recurring-transactions/list-recurring-transactions/response-listrecurringtransactionsresponse/descriptions)

display `string`

The formatted and prettified description of the recurring transaction.

original `string`

The raw (original and unprettified) description of the recurring transaction.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |
| 600 | More specific error codes that can be found as `detailCode` in the error response. NON\_SPECIFIED (0), NOT\_AUTHORIZED (1), INVALID\_TOKEN (2), CATEGORIES\_NOT\_FOUND (3), UUID\_INVALID (4), ENTITY\_NOT\_FOUND (5). |

## List Recurring Transactions Groups[](#enrichment/recurring-transactions/list-recurring-transactions-groups)

`GET /enrichment/v1/recurring-transactions-groups`

List all recurring transactions groups for a user.

### Works with[](#enrichment/recurring-transactions/list-recurring-transactions-groups/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.transactions` |
| User token | `enrichment.transactions:readonly` |
| User token | `transactions.recurring:read` |

### Query Parameters[](#enrichment/recurring-transactions/list-recurring-transactions-groups/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSize | An optional pagination page size. Default value is 10, max value is 100. Must be a positive integer. |
| pageToken | An optional pagination token specifying the page of results to retrieve. |
| status | Activity status of the group. Defaults to no filter: UNDEFINED.  
Values: `UNDEFINED`, `ACTIVE`, `INACTIVE`, `UNDEFINED`, `ACTIVE`, `INACTIVE` |
| accountIdIn | An optional account filter. Default to all. |
| categoryIdIn | An optional category filter. Default to all. If a parent category was supplied, it will be expanded into child categories. |

> Response Example

```
{
  "nextPageToken": "AQ==",
  "recurringTransactionsGroups": [
    {
      "accountIds": [
        "c0e9225a12084bcbb7df794e786ebeaf"
      ],
      "amount": {
        "currencyCode": "EUR",
        "latest": {
          "scale": 1,
          "unscaledValue": 100
        },
        "maximum": {
          "scale": 1,
          "unscaledValue": 100
        },
        "mean": {
          "scale": 1,
          "unscaledValue": 100
        },
        "median": {
          "scale": 1,
          "unscaledValue": 100
        },
        "minimum": {
          "scale": 1,
          "unscaledValue": 100
        },
        "standardDeviation": {
          "scale": 1,
          "unscaledValue": 100
        }
      },
      "categoryId": "075fab3ec31f43aa9d39675475c1fb1a",
      "id": "3bc213c6-743d-4b3b-9fb9-0a43f63e162c",
      "name": "Netflix",
      "occurrences": {
        "count": 3,
        "dayOfMonth": {
          "maximum": 5,
          "mean": 5.0,
          "median": 5,
          "minimum": 5
        },
        "dayOfWeek": {
          "maximum": 2,
          "mean": 2.0,
          "median": 2,
          "minimum": 2
        },
        "firstDate": "2020-07-05",
        "latestDate": "2020-09-05"
      },
      "period": {
        "duration": {
          "maximum": 0,
          "mean": 30.0,
          "minimum": 30,
          "standardDeviation": 30.0
        },
        "label": "MONTHLY"
      },
      "status": "ACTIVE"
    }
  ]
}
```

### Response: ListRecurringTransactionsGroupsResponse[](#enrichment/recurring-transactions/list-recurring-transactions-groups/response-listrecurringtransactionsgroupsresponse)

nextPageToken `string`

An id specifying the next page of results. If empty, it means that no more results remain.

recurringTransactionsGroups `array[RecurringTransactionsGroup]`

#### RecurringTransactionsGroup[](#enrichment/recurring-transactions/list-recurring-transactions-groups/response-listrecurringtransactionsgroupsresponse/recurringtransactionsgroup)

accountIds `array[string]`

List of account ids that are used for payments in this group.

amount `Amount`

categoryId `string`

The category id of the recurring transactions group. This id matches category ids from the category endpoint.

id `string`

The unique identifier of the recurring transactions group.

name `string`

The name of the group.

occurrences `Occurrences`

period `Period`

status `string`

Activity status of the group.  
Values: `UNDEFINED`, `ACTIVE`, `INACTIVE`

#### Amount[](#enrichment/recurring-transactions/list-recurring-transactions-groups/response-listrecurringtransactionsgroupsresponse/amount)

currencyCode `string`

The currency used for transactions in the group.

latest `ExactNumber`

maximum `ExactNumber`

mean `ExactNumber`

median `ExactNumber`

minimum `ExactNumber`

standardDeviation `ExactNumber`

#### ExactNumber[](#enrichment/recurring-transactions/list-recurring-transactions-groups/response-listrecurringtransactionsgroupsresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if `scale` is 1 and `unscaledValue` is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if `scale` is 1 and `unscaledValue` is 1230, the end result would be 123.0.

#### Occurrences[](#enrichment/recurring-transactions/list-recurring-transactions-groups/response-listrecurringtransactionsgroupsresponse/occurrences)

count `integer`

The number of occurrences in the group.

dayOfMonth `DayOfMonth`

dayOfWeek `DayOfWeek`

firstDate `string`

The first date of the occurrence.

latestDate `string`

The latest date of the occurrence.

#### DayOfMonth[](#enrichment/recurring-transactions/list-recurring-transactions-groups/response-listrecurringtransactionsgroupsresponse/dayofmonth)

maximum `integer`

The latest day of the month that the recurring transaction has occurred.

mean `number`

The average day of the month that the recurring transactions occur.

median `integer`

The median of which day of the month that the recurring transactions occur.

minimum `integer`

The earliest day of the month that the recurring transaction has occurred.

#### DayOfWeek[](#enrichment/recurring-transactions/list-recurring-transactions-groups/response-listrecurringtransactionsgroupsresponse/dayofweek)

maximum `integer`

The latest day of the week that the recurring transaction has occurred.

mean `number`

The average day of the week that the recurring transactions occur.

median `integer`

The median of which day of the week that the recurring transactions occur.

minimum `integer`

The earliest day of the week that the recurring transaction has occurred.

#### Period[](#enrichment/recurring-transactions/list-recurring-transactions-groups/response-listrecurringtransactionsgroupsresponse/period)

duration `Duration`

label `string`

The periodicity of the group.  
Values: `WEEKLY`, `BI_WEEKLY`, `MONTHLY`, `BI_MONTHLY`, `QUARTERLY`, `HALF_YEARLY`, `YEARLY`

#### Duration[](#enrichment/recurring-transactions/list-recurring-transactions-groups/response-listrecurringtransactionsgroupsresponse/duration)

maximum `integer`

The longest interval between two recurring transactions in the group.

mean `number`

The average number of days between two recurring transactions in the group.

minimum `integer`

The shortest interval between two recurring transactions in the group.

standardDeviation `number`

The population standard deviation of the days between two recurring transactions in the group.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |
| 600 | More specific error codes that can be found as `detailCode` in the error response. NON\_SPECIFIED (0), NOT\_AUTHORIZED (1), INVALID\_TOKEN (2), CATEGORIES\_NOT\_FOUND (3), UUID\_INVALID (4), ENTITY\_NOT\_FOUND (5). |

## Update Recurring Transaction Group[](#enrichment/recurring-transactions/update-recurring-transaction-group)

`PATCH /enrichment/v1/recurring-transactions-groups/{groupId}`

Update a recurring transaction group.

### Works with[](#enrichment/recurring-transactions/update-recurring-transaction-group/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.transactions` |

### Parameters[](#enrichment/recurring-transactions/update-recurring-transaction-group/parameters)

| Parameter | Description |
| --- | --- |
| groupIdrequired |  |

> Request Example

```
{
  "hidden": false
}
```

### Request Body: UpdateGroupRequest[](#enrichment/recurring-transactions/update-recurring-transaction-group/request-body-updategrouprequest)

Parameters for updating recurring transactions groups.

hidden `boolean`

True if the group should be hidden, no other operation supported. Operation is non-reversible.

### Response: text/plain[](#enrichment/recurring-transactions/update-recurring-transaction-group/response-text-plain)

Returns `204 No Content` for successful operation.

| Status Code | Description |
| --- | --- |
| 204 | Returns `204 No Content` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |

## Sustainability[](#enrichment/sustainability)

## Insights[](#enrichment/sustainability/insights)

## Retrieve a Random User Specific Insight[](#enrichment/sustainability/insights/retrieve-a-random-user-specific-insight)

`GET /enrichment/v1/sustainability/users/insights`

Retrieves a random user specific insight. The insights returned will be affected depending on what the end user has answered in it's account profiling.The language of the insights depends on the language parameter. Default is English.

### Works with[](#enrichment/sustainability/insights/retrieve-a-random-user-specific-insight/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.sustainability` |

### Query Parameters[](#enrichment/sustainability/insights/retrieve-a-random-user-specific-insight/query-parameters)

| Parameter | Description |
| --- | --- |
| language | ISO639-1 two-letter language code. |
| categoryValue | Category value to filter insights by. Must be provided together with categorySystem.  
Example:  
TINK, category name -> income:pension.other |
| categorySystem | Category system to filter insights by. Must be provided together with categoryValue.  
Supported values: TINK.  
Values: `TINK` |

> Response Example

```
{
  "insights": [
    {
      "text": "If every human on the planet followed a completely animal-free diet, food-related greenhouse gas emissions would be reduced by 49%.",
      "title": "What if we all became vegetarians?"
    }
  ],
  "language": "en",
  "userId": "9eba20dad8b944338da98e8528acd3bc"
}
```

### Response: UserInsightResponse[](#enrichment/sustainability/insights/retrieve-a-random-user-specific-insight/response-userinsightresponse)

insights `array[InsightsResponse]`

An user insight.

language `string`

Language of the insight.

userId `string`

The user id of the user to fetch an insight for.

#### InsightsResponse[](#enrichment/sustainability/insights/retrieve-a-random-user-specific-insight/response-userinsightresponse/insightsresponse)

text `string`

Insight text.

title `string`

Insight title.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |

## Retrieve general insights[](#enrichment/sustainability/insights/retrieve-general-insights)

`GET /enrichment/v1/sustainability/insights`

Retrieves general insights, these are not affected by Your account profile. The language of the insights depends on the language parameter. Default is English.

### Works with[](#enrichment/sustainability/insights/retrieve-general-insights/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.sustainability` |

### Query Parameters[](#enrichment/sustainability/insights/retrieve-general-insights/query-parameters)

| Parameter | Description |
| --- | --- |
| language | ISO639-1 two-letter language code for the selected language used to retrieve insights. Default is English (en). |

> Response Example

```
{
  "insights": [
    {
      "text": "If every human on the planet followed a completely animal-free diet, food-related greenhouse gas emissions would be reduced by 49%.",
      "title": "What if we all became vegetarians?"
    }
  ],
  "language": "en"
}
```

### Response: ListInsightsResponse[](#enrichment/sustainability/insights/retrieve-general-insights/response-listinsightsresponse)

insights `array[InsightsResponse]`

language `string`

Language of the insights.

#### InsightsResponse[](#enrichment/sustainability/insights/retrieve-general-insights/response-listinsightsresponse/insightsresponse)

text `string`

Insight text.

title `string`

Insight title.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |

## Market Average[](#enrichment/sustainability/market-average)

## Retrieve market average footprints[](#enrichment/sustainability/market-average/retrieve-market-average-footprints)

`GET /enrichment/v1/sustainability/market-average`

Retrieves the annual average CO2 footprint for the supplied market.

### Works with[](#enrichment/sustainability/market-average/retrieve-market-average-footprints/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.sustainability` |

### Query Parameters[](#enrichment/sustainability/market-average/retrieve-market-average-footprints/query-parameters)

| Parameter | Description |
| --- | --- |
| marketrequired | ISO 3166-1 alpha-2 code |

> Response Example

```
{
  "averageCo2FootprintInGrams": 42324.3
}
```

### Response: MarketAverageResponse[](#enrichment/sustainability/market-average/retrieve-market-average-footprints/response-marketaverageresponse)

Annual market average CO2 footprint for the supplied market.

averageCo2FootprintInGrams `string`

CO2 emission value in grams.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |

## Transactions[](#enrichment/sustainability/transactions)

## Answer refinement questions[](#enrichment/sustainability/transactions/answer-refinement-questions)

`POST /enrichment/v1/sustainability/transactions/refinement`

Refinement questions are answered using this endpoint. Answer ID refers to the ID in the SELECTABLE or INPUT array.

### Works with[](#enrichment/sustainability/transactions/answer-refinement-questions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.sustainability` `transactions:read` |

> Request Example

```
{
  "answers": [
    {
      "answerId": "02820044-69f5-4170-a516-fbeae6450f7a",
      "input": "I am not a fan of meat!",
      "transactionId": "4df3b236c81640b18741d7cdd1fc0e45"
    }
  ]
}
```

### Request Body: RefinementAnswersRequest[](#enrichment/sustainability/transactions/answer-refinement-questions/request-body-refinementanswersrequest)

Contains the list of answers to chosen questions.

answers `array[RefinementAnswer]`

#### RefinementAnswer[](#enrichment/sustainability/transactions/answer-refinement-questions/request-body-refinementanswersrequest/refinementanswer)

answerId `string` required

Answer ID.

input `string`

Free text input. **REQUIRED** only when answering INPUT question.

transactionId `string` required

Transaction ID.

> Response Example

```
{
  "errors": [
    {
      "errorCode": "NOT_FOUND",
      "errorDescription": "Answer ID not found.",
      "transactionId": "4df3b236c81640b18741d7cdd1fc0e45"
    }
  ],
  "requestId": "f5810cb4-f422-45d2-8f2b-2915b18b3010",
  "results": [
    {
      "co2InGrams": 42324.3,
      "transactionId": "4df3b236c81640b18741d7cdd1fc0e45"
    }
  ]
}
```

### Response: TransactionsResponse[](#enrichment/sustainability/transactions/answer-refinement-questions/response-transactionsresponse)

User's answer to a question.

errors `array[TransactionError]`

requestId `string`

Request ID that can be used for troubleshooting.

results `array[TransactionResult]`

#### TransactionError[](#enrichment/sustainability/transactions/answer-refinement-questions/response-transactionsresponse/transactionerror)

errorCode `string`

Status code of the error.

errorDescription `string`

Description of what caused the error.

transactionId `string`

Transaction ID.

#### TransactionResult[](#enrichment/sustainability/transactions/answer-refinement-questions/response-transactionsresponse/transactionresult)

co2InGrams `string`

New CO2 value in grams after refinement.

transactionId `string`

Transaction ID which was refined.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |

## List refinement questions for transaction[](#enrichment/sustainability/transactions/list-refinement-questions-for-transaction)

`GET /enrichment/v1/sustainability/transactions/{transactionId}/refinement`

Retrieves refinement questions for the specified transaction.

**There are two types of questions:**

-   SELECTABLE: The user can select an answer from a list
-   INPUT: The user is asked to give a free text answer of the specified type and according to validation

### Works with[](#enrichment/sustainability/transactions/list-refinement-questions-for-transaction/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.sustainability` `transactions:read` |

### Parameters[](#enrichment/sustainability/transactions/list-refinement-questions-for-transaction/parameters)

| Parameter | Description |
| --- | --- |
| transactionIdrequired | The Tink transaction ID for which refinement questions are to be retrieved. |

### Query Parameters[](#enrichment/sustainability/transactions/list-refinement-questions-for-transaction/query-parameters)

| Parameter | Description |
| --- | --- |
| language | ISO639-1 two-letter language code for the selected language used to retrieve questions. Default is English (en). |

> Response Example

```
{
  "language": "en",
  "questions": [
    {
      "answerId": "db9c7050-ba76-4c76-a0b5-6de83e71eac6",
      "answerText": "Vegetarian",
      "id": "db9c7050-ba76-4c76-a0b5-6de83e71eac6",
      "input": {
        "datatype": "STRING",
        "id": "858daeab-79a2-4ae7-949f-61250bc771de",
        "validation": [
          {
            "condition": 100,
            "name": "MAX_LENGTH"
          }
        ]
      },
      "selectable": [
        {
          "id": "525a075e-4dac-4bd4-80c9-5a8e3a0da126",
          "text": "Fish based diet."
        }
      ],
      "text": "What is your diet during a normal week?",
      "type": "SELECTABLE"
    }
  ],
  "transactionId": "4df3b236c81640b18741d7cdd1fc0e45"
}
```

### Response: ListRefinementQuestionsResponse[](#enrichment/sustainability/transactions/list-refinement-questions-for-transaction/response-listrefinementquestionsresponse)

List of refinement questions for the transaction.

language `string`

Language of the refinement questions.

questions `array[RefinementQuestions]`

transactionId `string`

Transaction ID.

#### RefinementQuestions[](#enrichment/sustainability/transactions/list-refinement-questions-for-transaction/response-listrefinementquestionsresponse/refinementquestions)

answerId `string`

The ID of the answer, if available

answerText `string`

The body of the answer, if available

id `string`

Question ID.

input `Input`

Contains an description of how to input free text values.

selectable `array[Selectable]`

text `string`

Question content.

type `string`

Specifies if the question is of type SELECTABLE or INPUT.  
Values: `SELECTABLE`, `INPUT`

#### Input[](#enrichment/sustainability/transactions/list-refinement-questions-for-transaction/response-listrefinementquestionsresponse/input)

datatype `string`

Type of the input. Example is STRING, which means that the input needs to be free text.  
Values: `STRING`, `INTEGER`, `NUMBER`

id `string`

Answer ID.

validation `array[Validation]`

#### Validation[](#enrichment/sustainability/transactions/list-refinement-questions-for-transaction/response-listrefinementquestionsresponse/validation)

condition `string`

Validation condition. If the name was MAX\_LENGTH, this might be 100.

name `string`

In the case the input is a STRING, the user can be asked for the input to be of a specific size.  
Values: `GREATER`, `LESS`, `MIN_LENGTH`, `MAX_LENGTH`

#### Selectable[](#enrichment/sustainability/transactions/list-refinement-questions-for-transaction/response-listrefinementquestionsresponse/selectable)

id `string`

Answer ID.

text `string`

User readable description of the answer.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |

## List transaction CO2 value comparison[](#enrichment/sustainability/transactions/list-transaction-co2-value-comparison)

`GET /enrichment/v1/sustainability/transactions/{transactionId}/comparables`

Retrieve a list of relatable comparisons corresponding to the CO2 emission value of the transaction.

### Works with[](#enrichment/sustainability/transactions/list-transaction-co2-value-comparison/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.sustainability` `transactions:read` |

### Parameters[](#enrichment/sustainability/transactions/list-transaction-co2-value-comparison/parameters)

| Parameter | Description |
| --- | --- |
| transactionIdrequired | The Tink transaction ID for which emission comparison are to be retrieved. |

### Query Parameters[](#enrichment/sustainability/transactions/list-transaction-co2-value-comparison/query-parameters)

| Parameter | Description |
| --- | --- |
| language | ISO639-1 two-letter language code for the selected language used to retrieve emission comparison. Default is English (en). |

> Response Example

```
{
  "co2InGrams": 42324.3,
  "comparables": [
    "string",
    "string"
  ],
  "language": "en"
}
```

### Response: ListRelatableComparisons[](#enrichment/sustainability/transactions/list-transaction-co2-value-comparison/response-listrelatablecomparisons)

List of relatable comparisons corresponding to the CO2 emission value.

co2InGrams `string`

CO2 emission value in grams.

comparables `array[string]`

language `string`

Language of the comparison.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |

## Transaction Sustainability Info[](#enrichment/sustainability/transactions/transaction-sustainability-info)

`GET /enrichment/v1/sustainability/transactions/{transactionId}`

Retrieve base sustainability info for the specified transaction. The response will include the CO2 emission value, random comparison and a random insight.

### Works with[](#enrichment/sustainability/transactions/transaction-sustainability-info/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.sustainability` `transactions:read` |

### Parameters[](#enrichment/sustainability/transactions/transaction-sustainability-info/parameters)

| Parameter | Description |
| --- | --- |
| transactionIdrequired | The Tink transaction ID for which sustainability info is to be retrieved. |

### Query Parameters[](#enrichment/sustainability/transactions/transaction-sustainability-info/query-parameters)

| Parameter | Description |
| --- | --- |
| language | ISO639-1 two-letter language code for the selected language used to retrieve sustainability info. Default is English (en). |

> Response Example

```
{
  "co2InGrams": 42324.3,
  "comparable": "Equal to approximately 52 km of driving in a car.",
  "id": "4df3b236c81640b18741d7cdd1fc0e45",
  "insight": {
    "text": "If every human on the planet followed a completely animal-free diet, food-related greenhouse gas emissions would be reduced by 49%.",
    "title": "What if we all became vegetarians?"
  },
  "language": "en"
}
```

### Response: TransactionSustainabilityInfo[](#enrichment/sustainability/transactions/transaction-sustainability-info/response-transactionsustainabilityinfo)

Transaction sustainability information.

co2InGrams `string`

CO2 emission value in grams.

comparable `string`

Relatable comparisons corresponding to the CO2 emission.

id `string`

Transaction ID.

insight `InsightsResponse`

Insight content.

language `string`

Language of the response.

#### InsightsResponse[](#enrichment/sustainability/transactions/transaction-sustainability-info/response-transactionsustainabilityinfo/insightsresponse)

text `string`

Insight text.

title `string`

Insight title.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |

## User Profiling[](#enrichment/sustainability/user-profiling)

## Answer Profiling Questions[](#enrichment/sustainability/user-profiling/answer-profiling-questions)

`POST /enrichment/v1/sustainability/users/profiling`

Profiling questions are answered using this endpoint. Answer ID refers to the ID in the SELECTABLE or INPUT array.

### Works with[](#enrichment/sustainability/user-profiling/answer-profiling-questions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.sustainability` |

> Request Example

```
{
  "answers": [
    {
      "answerId": "02820044-69f5-4170-a516-fbeae6450f7a",
      "input": "I am not a fan of meat!"
    }
  ]
}
```

### Request Body: ProfilingAnswersRequest[](#enrichment/sustainability/user-profiling/answer-profiling-questions/request-body-profilinganswersrequest)

Contains the list of answers to chosen questions.

answers `array[Answer]`

#### Answer[](#enrichment/sustainability/user-profiling/answer-profiling-questions/request-body-profilinganswersrequest/answer)

answerId `string` required

Answer ID.

input `string`

Free text input. **REQUIRED** only when answering INPUT question.

> Response Example

```
{
  "errors": [
    {
      "answerId": "02820044-69f5-4170-a516-fbeae6450f7a",
      "code": "NOT_FOUND",
      "description": "Answer ID not found.",
      "userId": "3f1db1214aba46efbbc26023e7e569ee"
    }
  ],
  "requestId": "f5810cb4-f422-45d2-8f2b-2915b18b3010",
  "results": [
    {
      "answerId": "525a075e-4dac-4bd4-80c9-5a8e3a0da126",
      "questionId": "db9c7050-ba76-4c76-a0b5-6de83e71eac6",
      "userId": "3f1db1214aba46efbbc26023e7e569ee"
    }
  ]
}
```

### Response: AnswersResponse[](#enrichment/sustainability/user-profiling/answer-profiling-questions/response-answersresponse)

Response containing status of all answers.

errors `array[AnswerError]`

requestId `string`

Request ID that can be used for troubleshooting.

results `array[AnswerResponse]`

#### AnswerError[](#enrichment/sustainability/user-profiling/answer-profiling-questions/response-answersresponse/answererror)

answerId `string`

Answer ID.

code `string`

Status code of the error.

description `string`

Description of what caused the error.

userId `string`

User ID.

#### AnswerResponse[](#enrichment/sustainability/user-profiling/answer-profiling-questions/response-answersresponse/answerresponse)

answerId `string`

Answer ID.

questionId `string`

Question ID.

userId `string`

User ID.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |

## Get Profiling Questions[](#enrichment/sustainability/user-profiling/get-profiling-questions)

`GET /enrichment/v1/sustainability/users/profiling/questions`

This returns questions to be answered by users for more precise CO2 calculations, comparisons, or insights. The questions will be in the language specified by the language parameter. It defaults to English.

**There are two types of questions:**

-   SELECTABLE: The user can select an answer from a list
-   INPUT: The user is asked to give a free text answer of the specified type and according to validation

### Works with[](#enrichment/sustainability/user-profiling/get-profiling-questions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `enrichment.sustainability` |

### Query Parameters[](#enrichment/sustainability/user-profiling/get-profiling-questions/query-parameters)

| Parameter | Description |
| --- | --- |
| language | ISO639-1 two-letter language code. |

> Response Example

```
{
  "language": "en",
  "questions": [
    {
      "answerId": "db9c7050-ba76-4c76-a0b5-6de83e71eac6",
      "answerText": "Vegetarian",
      "id": "db9c7050-ba76-4c76-a0b5-6de83e71eac6",
      "input": {
        "datatype": "STRING",
        "id": "858daeab-79a2-4ae7-949f-61250bc771de",
        "validation": [
          {
            "condition": 100,
            "name": "MAX_LENGTH"
          }
        ]
      },
      "selectable": [
        {
          "id": "525a075e-4dac-4bd4-80c9-5a8e3a0da126",
          "text": "Fish based diet."
        }
      ],
      "text": "What is your diet during a normal week?",
      "type": "SELECTABLE"
    }
  ]
}
```

### Response: ListProfilingQuestions[](#enrichment/sustainability/user-profiling/get-profiling-questions/response-listprofilingquestions)

Response object contains the list of questions for the account in question.

language `string`

Language of the content.

questions `array[Questions]`

#### Questions[](#enrichment/sustainability/user-profiling/get-profiling-questions/response-listprofilingquestions/questions)

answerId `string`

The ID of the selected answer the end user has picked, if answered

answerText `string`

The free text end user answer, if answered

id `string`

Question ID.

input `Input`

Contains an description of how to input free text values.

selectable `array[Selectable]`

text `string`

Question content.

type `string`

Specifies if the question is of type SELECTABLE or INPUT.  
Values: `SELECTABLE`, `INPUT`

#### Input[](#enrichment/sustainability/user-profiling/get-profiling-questions/response-listprofilingquestions/input)

datatype `string`

Type of the input. Example is STRING, which means that the input needs to be free text.  
Values: `STRING`, `INTEGER`, `NUMBER`

id `string`

Answer ID.

validation `array[Validation]`

#### Validation[](#enrichment/sustainability/user-profiling/get-profiling-questions/response-listprofilingquestions/validation)

condition `string`

Validation condition. If the name was MAX\_LENGTH, this might be 100.

name `string`

In the case the input is a STRING, the user can be asked for the input to be of a specific size.  
Values: `GREATER`, `LESS`, `MIN_LENGTH`, `MAX_LENGTH`

#### Selectable[](#enrichment/sustainability/user-profiling/get-profiling-questions/response-listprofilingquestions/selectable)

id `string`

Answer ID.

text `string`

User readable description of the answer.

| Status Code | Description |
| --- | --- |
| 200 | Returns `200 Ok` for successful operation. |
| 400 | Returns `400 Bad Request` if the payload does not pass validation. |
| 401 | Returns `401 Unauthorized` if the user is not authorized. |
| 403 | Returns `403 Forbidden` if the user is not permitted. |
| 404 | Returns `404 Not Found` if the entity is not present. |
| 500 | Returns `500 Internal Server Error` if there is an unexpected server error. |
