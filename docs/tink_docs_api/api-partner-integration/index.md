---
title: "Tink Docs"
source: "/Tiny-doc/tink_docs_api/api-partner-integration/"
exportedAt: "2026-01-13T13:04:34.131Z"
---
## Partner Integration v1[](/Tiny-doc/tink_docs_api/api-partner-integration/)

## Merchants[](#partner-integration/merchants)

## Create merchantBeta[](#partner-integration/merchants/create-merchant)

`POST /partner-integration/v1/merchants`

Creates a new merchant.

### Works with[](#partner-integration/merchants/create-merchant/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `merchants` |

> Request Example

```
{
  "categoryCode": "5816",
  "countryCode": "GB",
  "externalId": "string",
  "name": "Example Inc.",
  "organizationNumber": "12345",
  "url": "https://endpoint.example.com"
}
```

### Request Body: Merchant[](#partner-integration/merchants/create-merchant/request-body-merchant)

Information needed to register a merchant.

categoryCode `string` required

The merchant category code (MCC) of the merchant, as a four-digit code (ISO 18245).

countryCode `string` required

The merchant's domicile, the country in which the merchant is legally registered, as a two-letter code (ISO 3166-1 alpha-2).

externalId `string`

The external id of the merchant.

name `string` required

The name of the merchant. Can only have alphanumerics plus full stop, hyphen, forward slash or ampersand.

organizationNumber `string` required

The organization/company/registration number of the merchant. The identification number given to a company when it is registered or incorporated.

url `string` required

The url to the merchant's website without a path, e.g. [https://example.com](https://example.com/).

> Response Example

```
{
  "appId": "125801f6-4657-436d-b317-8f0153705fb6",
  "categoryCode": "5816",
  "countryCode": "GB",
  "externalId": "string",
  "id": "05d5c053-1558-454d-8981-6c2810138abe",
  "name": "Example Inc.",
  "organizationNumber": "12345",
  "status": "VERIFIED",
  "url": "https://endpoint.example.com"
}
```

### Response: Merchant[](#partner-integration/merchants/create-merchant/response-merchant)

Information needed to register a merchant.

appId `string` readonly

The id of the application associated with the merchant.

categoryCode `string` required

The merchant category code (MCC) of the merchant, as a four-digit code (ISO 18245).

countryCode `string` required

The merchant's domicile, the country in which the merchant is legally registered, as a two-letter code (ISO 3166-1 alpha-2).

externalId `string`

The external id of the merchant.

id `string` readonly

The id of the merchant.

name `string` required

The name of the merchant. Can only have alphanumerics plus full stop, hyphen, forward slash or ampersand.

organizationNumber `string` required

The organization/company/registration number of the merchant. The identification number given to a company when it is registered or incorporated.

status `MerchantStatus` readonly

The status of the merchant.

url `string` required

The url to the merchant's website without a path, e.g. [https://example.com](https://example.com/).

#### MerchantStatus[](#partner-integration/merchants/create-merchant/response-merchant/merchantstatus)

| Value | Description |
| --- | --- |
| PENDING | Merchant has not yet been verified. |
| VERIFIED | Merchant has been successfully verified. |
| DECLINED | Merchant verification has failed. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Check the error message or the documentation of each field for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The application used does not belong to subject associated with the access token. |
| default | An unexpected error response. |

## Get merchantBeta[](#partner-integration/merchants/get-merchant)

`GET /partner-integration/v1/merchants/{id}`

Retrieve information about an existing merchant.

### Works with[](#partner-integration/merchants/get-merchant/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `merchants:readonly` |

### Parameters[](#partner-integration/merchants/get-merchant/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The id of the merchant requested. |

> Response Example

```
{
  "appId": "125801f6-4657-436d-b317-8f0153705fb6",
  "categoryCode": "5816",
  "countryCode": "GB",
  "externalId": "string",
  "id": "05d5c053-1558-454d-8981-6c2810138abe",
  "name": "Example Inc.",
  "organizationNumber": "12345",
  "status": "VERIFIED",
  "url": "https://endpoint.example.com"
}
```

### Response: Merchant[](#partner-integration/merchants/get-merchant/response-merchant)

Information needed to register a merchant.

appId `string` readonly

The id of the application associated with the merchant.

categoryCode `string` required

The merchant category code (MCC) of the merchant, as a four-digit code (ISO 18245).

countryCode `string` required

The merchant's domicile, the country in which the merchant is legally registered, as a two-letter code (ISO 3166-1 alpha-2).

externalId `string`

The external id of the merchant.

id `string` readonly

The id of the merchant.

name `string` required

The name of the merchant. Can only have alphanumerics plus full stop, hyphen, forward slash or ampersand.

organizationNumber `string` required

The organization/company/registration number of the merchant. The identification number given to a company when it is registered or incorporated.

status `MerchantStatus` readonly

The status of the merchant.

url `string` required

The url to the merchant's website without a path, e.g. [https://example.com](https://example.com/).

#### MerchantStatus[](#partner-integration/merchants/get-merchant/response-merchant/merchantstatus)

| Value | Description |
| --- | --- |
| PENDING | Merchant has not yet been verified. |
| VERIFIED | Merchant has been successfully verified. |
| DECLINED | Merchant verification has failed. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Check the error message or the documentation of each field for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | The merchant could not be found. |
| default | An unexpected error response. |

## List merchantsBeta[](#partner-integration/merchants/list-merchants)

`GET /partner-integration/v1/merchants`

List all merchants associated with the given application.

### Works with[](#partner-integration/merchants/list-merchants/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `merchants:readonly` |

### Query Parameters[](#partner-integration/merchants/list-merchants/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSize | The maximum number of items to return. |
| pageToken | The next\_page\_token value returned from a previous request, null for first request. |
| appIdEq | The id of the application associated with the merchant. |
| queryString | Query to filter the merchants by. |

> Response Example

```
{
  "merchants": [
    {
      "appId": "125801f6-4657-436d-b317-8f0153705fb6",
      "categoryCode": "5816",
      "countryCode": "GB",
      "external_id": "12d5c553-1558-454d-8981-6c2810138abe",
      "id": "05d5c053-1558-454d-8981-6c2810138abe",
      "name": "Example Inc.",
      "organizationNumber": "123",
      "status": "VERIFIED",
      "url": "https://endpoint.example.com"
    }
  ],
  "nextPageToken": "MA=",
  "prevPageToken": "MA==",
  "totalSize": "1"
}
```

### Response: ListMerchantsResponse[](#partner-integration/merchants/list-merchants/response-listmerchantsresponse)

merchants `array[Merchant]`

List of merchants owned by the application.

nextPageToken `string`

Token to retrieve the next page of results, or empty if there are no more results in the list.

prevPageToken `string`

Token to the previous page.

totalSize `integer`

Total number of records.

#### Merchant[](#partner-integration/merchants/list-merchants/response-listmerchantsresponse/merchant)

appId `string` readonly

The id of the application associated with the merchant.

categoryCode `string` required

The merchant category code (MCC) of the merchant, as a four-digit code (ISO 18245).

countryCode `string` required

The merchant's domicile, the country in which the merchant is legally registered, as a two-letter code (ISO 3166-1 alpha-2).

externalId `string`

The external id of the merchant.

id `string` readonly

The id of the merchant.

name `string` required

The name of the merchant. Can only have alphanumerics plus full stop, hyphen, forward slash or ampersand.

organizationNumber `string` required

The organization/company/registration number of the merchant. The identification number given to a company when it is registered or incorporated.

status `MerchantStatus` readonly

The status of the merchant.

url `string` required

The url to the merchant's website without a path, e.g. [https://example.com](https://example.com/).

#### MerchantStatus[](#partner-integration/merchants/list-merchants/response-listmerchantsresponse/merchantstatus)

| Value | Description |
| --- | --- |
| PENDING | Merchant has not yet been verified. |
| VERIFIED | Merchant has been successfully verified. |
| DECLINED | Merchant verification has failed. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The application used does not belong to subject associated with the access token. |
| default | An unexpected error response. |
