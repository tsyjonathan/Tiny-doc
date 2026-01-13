---
title: "Tink Docs"
source: "https://docs.tink.com/api-payment"
exportedAt: "2026-01-13T13:05:00.223Z"
---
## Payment v1[](https://docs.tink.com/api-payment)

The Payment section contains resources for Payments features: one-time payments and Variable Recurring Payments.

Handle beneficiaries, bulk payments, mandate payments, merchants, payment requests and transfers for payment requests, recurring payments, and settlement accounts.

## Bulk Payment[](#payment/bulk-payment)

## Create bulk paymentBeta[](#payment/bulk-payment/create-bulk-payment)

`POST /payment/v1/bulk-payments`

Creates a bulk payment with given set of single payments. Single payments must be created first.

### Works with[](#payment/bulk-payment/create-bulk-payment/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `payment:read` `bulk-payment:write` |

> Request Example

```
{
  "paymentRequestIds": [
    "4021be7088ee11ec8cc47b9807df655d",
    "4895bed088ee11ec9acc497070f7f574"
  ]
}
```

### Request Body: BulkPaymentRequest[](#payment/bulk-payment/create-bulk-payment/request-body-bulkpaymentrequest)

Parameters for the bulk payment to be created.

paymentRequestIds `array[string]`

List of single payment ids. Bulk payment needs to have between 2 and 100 payment requests.

> Response Example

```
{
  "id": "b022334965b34c8bb50074e33f2f643b",
  "paymentRequestIds": [
    "4021be7088ee11ec8cc47b9807df655d",
    "4895bed088ee11ec9acc497070f7f574"
  ]
}
```

### Response: BulkPaymentRequest[](#payment/bulk-payment/create-bulk-payment/response-bulkpaymentrequest)

Parameters for the bulk payment to be created.

id `string` readonly

The id of the bulk payment.

paymentRequestIds `array[string]`

List of single payment ids. Bulk payment needs to have between 2 and 100 payment requests.

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Check the error message or the documentation of each field for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | At least one of given Payment Request IDs does not exist. |
| 409 | Conflict - one of the Payments is in invalid state. |
| default | An unexpected error response. |

## Get bulk paymentBeta[](#payment/bulk-payment/get-bulk-payment)

`GET /payment/v1/bulk-payments/{id}`

Returns the bulk payment data of the given id.

### Works with[](#payment/bulk-payment/get-bulk-payment/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `payment:read` `bulk-payment:read` |
| User token | `payment:read` `bulk-payment:read` |

### Parameters[](#payment/bulk-payment/get-bulk-payment/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The id of the requested bulk payment. |

### Query Parameters[](#payment/bulk-payment/get-bulk-payment/query-parameters)

| Parameter | Description |
| --- | --- |
| view | Detail level of the response.
\- BASIC: Shows only the list of single payment ids.  
\- FULL: Shows all the single payment details and statuses.  
Values: `BASIC`, `FULL`

 |

> Response Example

```
{
  "id": "dc0cf17bf6fe43de9897a644a48e6005",
  "paymentRequests": [
    {
      "amount": 10,
      "created": 1674158472000,
      "currency": "SEK",
      "destinations": [
        {
          "accountNumber": "33008808080808",
          "type": "SE_PG"
        }
      ],
      "executionDate": "2022-05-22",
      "id": "18408f41163f4748b87da9b9a68b6df8",
      "market": "SE",
      "merchantId": "17697670-aed1-40d7-9084-daee87539f3d",
      "paymentScheme": "PAYMENT_SCHEME_UNSPECIFIED",
      "providerName": "handelsbanken-bankid",
      "recipientName": "Test AB",
      "remittanceInformation": {
        "type": "OCR",
        "value": "3245928392092"
      },
      "source": {
        "accountNumber": "SE4550000000058398257466",
        "type": "IBAN",
        "uri": "iban://SE4550000000058398257466"
      },
      "sourceMessage": "Gym Equipment",
      "status": "SENT",
      "statusMessage": "Payment successfully initiated",
      "updated": 1674220425783
    },
    {
      "amount": 5.99,
      "created": 1674158472000,
      "currency": "SEK",
      "destinations": [
        {
          "accountNumber": "32438808083311",
          "type": "SE_PG"
        }
      ],
      "executionDate": "2022-05-20",
      "id": "ecad584cd7444494a88bfdc2eda875c6",
      "market": "SE",
      "merchantId": "17697670-aed1-40d7-9084-daee87539f3d",
      "paymentScheme": "PAYMENT_SCHEME_UNSPECIFIED",
      "providerName": "handelsbanken-bankid",
      "recipientName": "Test AB",
      "remittanceInformation": {
        "type": "OCR",
        "value": "5654928391123"
      },
      "source": {
        "accountNumber": "SE4550000000058398257466",
        "type": "IBAN",
        "uri": "iban://SE4550000000058398257466"
      },
      "sourceMessage": "Payment for Electricity",
      "status": "SENT",
      "statusMessage": "Payment successfully initiated",
      "updated": 1674220479791
    }
  ],
  "status": "SENT",
  "verificationStatus": ""
}
```

### Response: BulkPaymentResponse[](#payment/bulk-payment/get-bulk-payment/response-bulkpaymentresponse)

id `string`

The id of the bulk payment.

paymentRequests `array[PaymentRequest]`

List of single payment details.

status `BulkPaymentStatusType`

The status of the bulk payment.

verificationStatus `object`

Verification status for the bulk payment.

#### PaymentRequest[](#payment/bulk-payment/get-bulk-payment/response-bulkpaymentresponse/paymentrequest)

amount `number`

The amount of the payment.

created `string`

The timestamp of creation of a payment request.

currency `Currency`

The currency for the payment request.

destinations `array[AccountIdentifier]`

A list of account numbers that can receive the payment. If one of the accounts belong to the same bank as the source account, it will be selected. Otherwise the first one from the list will be selected.

executionDate `string`

The date defining when the payment will be executed by the bank. If no execution date is given, it will be executed as soon as possible. The date follows the ISO 8601 with format yyyy-MM-dd.

id `string`

Payment request id.

market `string`

The country code (in ISO 3166-1 alpha-2 format) of the primary market of the payer. Values: SE.

merchantId `string`

The id of the merchant tied to the payment.

paymentScheme `PaymentScheme`

The desired payment scheme that the ASPSP supports. Not mandatory for SE market.

providerName `string`

The provider (financial institution) that the payer's account belongs to.

recipientName `string`

The recipient name shown to the payer on signing payments. Maximum character count of 30.

remittanceInformation `RemittanceInformation`

The structured or unstructured remittance information for the payment request. Use for reconciliation purposes.

source `PaymentSource`

The source object. Only returned if available from the bank response.'

sourceMessage `string`

The transaction description that only appears on the payer (debtor) account for the payment. Use for providing a short description about the payment transaction for the payer. Maximum character count of 50 (Note that some banks might have a more strict limit).

status `PaymentRequestStatusType`

The status of the single payment.

statusMessage `string`

A message explaining the current status of the payment. This field is populated only if status is one of the terminal statuses.

updated `string`

The timestamp of update of a payment request.

#### Currency[](#payment/bulk-payment/get-bulk-payment/response-bulkpaymentresponse/currency)

| Value | Description |
| --- | --- |
| CURRENCY\_UNSPECIFIED | Default value. It should not occur. |
| SEK | Swedish krona. |
| GBP | Pound sterling. |
| EUR | Euro. |

#### AccountIdentifier[](#payment/bulk-payment/get-bulk-payment/response-bulkpaymentresponse/accountidentifier)

accountNumber `string`

The payee's account number.

type `AccountIdentifierType`

The payee's account type.

#### AccountIdentifierType[](#payment/bulk-payment/get-bulk-payment/response-bulkpaymentresponse/accountidentifiertype)

| Value | Description |
| --- | --- |
| ACCOUNT\_IDENTIFIER\_TYPE\_UNSPECIFIED | Default value. It should not occur. |
| SE | Account type used in SE. |
| SE\_BG | BankGiro account type used in SE. |
| SE\_PG | PlusGiro account type used in SE. |
| IBAN | IBAN account type. |

#### PaymentScheme[](#payment/bulk-payment/get-bulk-payment/response-bulkpaymentresponse/paymentscheme)

| Value | Description |
| --- | --- |
| PAYMENT\_SCHEME\_UNSPECIFIED | Default value. It should not occur. |
| SEPA\_CREDIT\_TRANSFER | SEPA Credit Transfer scheme. |
| SEPA\_INSTANT\_CREDIT\_TRANSFER | SEPA Instant Credit Transfer scheme. |

#### RemittanceInformation[](#payment/bulk-payment/get-bulk-payment/response-bulkpaymentresponse/remittanceinformation)

type `RemittanceInformationType`

The remittance information type for the bulk payment.

value `string`

The structured or unstructured remittance information value for the bulk payment.

#### RemittanceInformationType[](#payment/bulk-payment/get-bulk-payment/response-bulkpaymentresponse/remittanceinformationtype)

| Value | Description |
| --- | --- |
| REMITTANCE\_INFORMATION\_TYPE\_UNSPECIFIED | Default value should not occur. |
| UNSTRUCTURED | Information supplied in an unstructured form. |
| OCR | The OCR number, used in SE. |
| REFERENCE | Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. |

#### PaymentSource[](#payment/bulk-payment/get-bulk-payment/response-bulkpaymentresponse/paymentsource)

accountNumber `string`

The source account number.

type `string`

The source account type.

uri `string`

The source account URI.

#### PaymentRequestStatusType[](#payment/bulk-payment/get-bulk-payment/response-bulkpaymentresponse/paymentrequeststatustype)

| Value | Description |
| --- | --- |
| PAYMENT\_STATUS\_TYPE\_UNSPECIFIED | Status unspecified. |
| CREATED | Payment created. |
| EXECUTING | Payment execution started. |
| AWAITING\_CREDENTIALS | Payment is awaiting credentials. |
| SENT | Payment has been sent to the bank. |
| CANCELLED | Payment has been cancelled. |
| FAILED | Payment has failed. |

#### BulkPaymentStatusType[](#payment/bulk-payment/get-bulk-payment/response-bulkpaymentresponse/bulkpaymentstatustype)

| Value | Description |
| --- | --- |
| BULK\_PAYMENT\_STATUS\_TYPE\_UNSPECIFIED | Status unspecified. |
| CREATED | Bulk payment created. |
| EXECUTING | Bulk payment execution started. |
| AWAITING\_CREDENTIALS | Bulk payment is awaiting credentials. |
| SENT | Bulk payment has been sent to the bank. |
| CANCELLED | Bulk payment has been cancelled. |
| FAILED | Bulk payment has failed. |
| PARTIALLY\_SENT | At least one payment within a bulk has not been sent to the bank. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | Bulk Payment with given ID does not exist. |
| default | An unexpected error response. |

## Cancellation[](#payment/cancellation)

## Begin cancellationBeta[](#payment/cancellation/begin-cancellation)

`POST /api/v1/payments/{paymentId}/cancellation`

Creates the cancellation resource and initializes the cancellation for a given payment.

### Works with[](#payment/cancellation/begin-cancellation/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `payment:write` |

### Parameters[](#payment/cancellation/begin-cancellation/parameters)

| Parameter | Description |
| --- | --- |
| Tink payment IDrequired | paymentId |

| Status Code | Description |
| --- | --- |
| 200 | OK |
| 201 | Cancellation created and initialized |
| 400 | Payment cannot be cancelled |
| 401 | Possible reasons include missing Authorization: Bearer {access token} HTTP header and expired access token. |
| 403 | Forbidden |
| 404 | Payment not found |
| 409 | Cancellation has already been initiated for this payment |

## Get cancellation dataBeta[](#payment/cancellation/get-cancellation-data)

`GET /api/v1/payments/{paymentId}/cancellation`

Returns the cancellation data for a given payment.

### Works with[](#payment/cancellation/get-cancellation-data/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `payment:read` |

### Parameters[](#payment/cancellation/get-cancellation-data/parameters)

| Parameter | Description |
| --- | --- |
| Tink payment IDrequired | paymentId |

> Response Example

```
{
  "status": "AWAITING_AUTHENTICATION",
  "tinkLink": "https://link.tink.com/1.0/pay/cancellation?client_id=123&market=SE&authorization_code=123456&credentials_id=ccc1e79ff30f4865a54604754a72e380&payment_request_id=dada49e225064bbeafcb78cb7dba59a4"
}
```

### Response: CancellationResponse[](#payment/cancellation/get-cancellation-data/response-cancellationresponse)

status `string`

The status of the cancellation  
Values: `AWAITING_AUTHENTICATION`, `CREATED`, `FAILED`, `PROCESSING`, `SUCCESSFUL`

tinkLink `string`

Link to perform strong customer authentication when required by the bank. Available when the cancellation has the status `AWAITING_AUTHENTICATION`. For this link to be valid, you must extend it with a 'redirect\_uri' parameter.

| Status Code | Description |
| --- | --- |
| 200 | Cancellation data |
| 401 | Possible reasons include missing Authorization: Bearer {access token} HTTP header and expired access token. |
| 403 | Forbidden |
| 404 | Cancellation not found |

## Mandate Payment[](#payment/mandate-payment)

## Create mandate paymentBeta[](#payment/mandate-payment/create-mandate-payment)

`POST /payment/v1/mandate-payments`

Creates a mandate payment, when given a valid consent id.

### Works with[](#payment/mandate-payment/create-mandate-payment/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `mandate-payments` |

### Header Parameters[](#payment/mandate-payment/create-mandate-payment/header-parameters)

| Parameter | Description |
| --- | --- |
| Idempotency-Keyrequired | An idempotency key is any value generated by the client which the resource server uses to recognize subsequent retries of the same request. The Idempotency-Key HTTP request header field carries this key. |

> Request Example

```
{
  "amount": {
    "currencyCode": "GBP",
    "value": {
      "scale": 2,
      "unscaledValue": 100
    }
  },
  "consentId": "c63dc11e-b210-4a96-9461-2061389789e7",
  "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
  "remittanceInformation": {
    "type": "REFERENCE",
    "value": "Payment description."
  }
}
```

### Request Body: Request[](#payment/mandate-payment/create-mandate-payment/request-body-request)

Parameters for the mandate payment to be created.

amount `CurrencyExactAmount` required

consentId `string` required

The id, in uuid v4 format, of the consent which will be used for initiating the mandate payment

merchantId `string`

The id, in uuid v4 format, of the merchant who is requesting the mandate payment to be initiated.

remittanceInformation `RemittanceInformation` required

#### CurrencyExactAmount[](#payment/mandate-payment/create-mandate-payment/request-body-request/currencyexactamount)

currencyCode `string`

The currency code which follows ISO-4217 standard, and matches the currency code on the mandate.

value `ExactAmount`

#### ExactAmount[](#payment/mandate-payment/create-mandate-payment/request-body-request/exactamount)

scale `integer`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### RemittanceInformation[](#payment/mandate-payment/create-mandate-payment/request-body-request/remittanceinformation)

type `string`

The remittance information type for the mandate payment. REFERENCE will be populated to end-to-end identification at the bank.  
Values: `REFERENCE`

value `string`

The structured remittance information for the mandate payment, maximum 31 characters.

> Response Example

```
{
  "amount": {
    "currencyCode": "GBP",
    "value": {
      "scale": 2,
      "unscaledValue": 100
    }
  },
  "consentId": "c63dc11e-b210-4a96-9461-2061389789e7",
  "createdTime": "2022-10-12T09:35:39Z",
  "id": "b6704301-8a12-46a5-a315-c3cebd9b899c",
  "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
  "payeeAccount": {
    "name": "Tom John Savings Account",
    "number": "10000031510604",
    "type": "SORT_CODE"
  },
  "payerAccount": {
    "holderName": "Tom John",
    "number": "10000031510604",
    "type": "SORT_CODE"
  },
  "remittanceInformation": {
    "type": "REFERENCE",
    "value": "Payment description."
  },
  "status": "CREATED",
  "statusMessage": "string",
  "type": "VRP_SWEEPING",
  "updatedTime": "2022-10-12T09:35:39Z"
}
```

### Response: Response[](#payment/mandate-payment/create-mandate-payment/response-response)

The response from creating or fetching a mandate payment.

amount `CurrencyExactAmount` required

consentId `string` required

The consent id, in uuid v4 format, used for creating a mandate payment.

createdTime `string` required

The timestamp at which the mandate payment was created, ISO 8601 date and time format in UTC (YYYY-MM-DDThh:mm:ssZ).

id `string` required

The id, in uuid v4 format, of the mandate payment.

merchantId `string`

The merchant id, in uuid v4 format, for the mandate payment.

payeeAccount `PayeeAccount` required

payerAccount `PayerAccount` required

remittanceInformation `RemittanceInformation` required

status `string` required

The status of the mandate payment.  
Values: `CREATED, SENT, FAILED, CANCELLED, SETTLED_PAYEE, SETTLED_PAYER`

statusMessage `string`

A message explaining the current status of the payment. This field is populated only if status is one of the terminal statuses.

type `string` required

The type of the mandate payment. Defined by the sub-type used in the creation of your mandate.  
Values: `VRP_SWEEPING, VRP_COMMERCIAL`

updatedTime `string` required

The timestamp at which the mandate payment was updated, ISO 8601 date and time format in UTC (YYYY-MM-DDThh:mm:ssZ).

#### CurrencyExactAmount[](#payment/mandate-payment/create-mandate-payment/response-response/currencyexactamount)

currencyCode `string`

The currency code which follows ISO-4217 standard, and matches the currency code on the mandate.

value `ExactAmount`

#### ExactAmount[](#payment/mandate-payment/create-mandate-payment/response-response/exactamount)

scale `integer`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### PayeeAccount[](#payment/mandate-payment/create-mandate-payment/response-response/payeeaccount)

name `string`

Name of the account, as assigned by the account servicing institution.

number `string`

Number assigned by an institution to identify an account. This identifier is known by the account owner

type `string`

The identification scheme for the account, in a coded form.  
Values: `SORT_CODE`

#### PayerAccount[](#payment/mandate-payment/create-mandate-payment/response-response/payeraccount)

holderName `string`

The name of the account owner.

number `string`

Number assigned by an institution to identify an account. This identifier is known by the account owner.

type `string`

The identification scheme for the account, in a coded form.  
Values: `SORT_CODE`

#### RemittanceInformation[](#payment/mandate-payment/create-mandate-payment/response-response/remittanceinformation)

type `string`

The remittance information type for the mandate payment. REFERENCE will be populated to end-to-end identification at the bank.  
Values: `REFERENCE`

value `string`

The structured remittance information for the mandate payment, maximum 31 characters.

| Status Code | Description |
| --- | --- |
| 201 | Mandate Payment successfully created. |
| 400 | The request does not pass validation. Check the error message or the documentation of each field for more information. |
| 401 | Unauthorized request. |
| 403 | The resource does not belong to the subject or scopes associated with the access token. |
| 409 | Request retried while the original request is still being processed. |
| 422 | Attempt to reuse an idempotency key with a different request payload. |
| 500 | Internal server error. |

## Get mandate paymentBeta[](#payment/mandate-payment/get-mandate-payment)

`GET /payment/v1/mandate-payments/{id}`

Returns the mandate payment of a given mandate payment id.

### Works with[](#payment/mandate-payment/get-mandate-payment/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `mandate-payments:readonly` |

### Parameters[](#payment/mandate-payment/get-mandate-payment/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The id of a mandate payment. |

> Response Example

```
{
  "amount": {
    "currencyCode": "GBP",
    "value": {
      "scale": 2,
      "unscaledValue": 100
    }
  },
  "consentId": "c63dc11e-b210-4a96-9461-2061389789e7",
  "createdTime": "2022-10-12T09:35:39Z",
  "id": "b6704301-8a12-46a5-a315-c3cebd9b899c",
  "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
  "payeeAccount": {
    "name": "Tom John Savings Account",
    "number": "10000031510604",
    "type": "SORT_CODE"
  },
  "payerAccount": {
    "holderName": "Tom John",
    "number": "10000031510604",
    "type": "SORT_CODE"
  },
  "remittanceInformation": {
    "type": "REFERENCE",
    "value": "Payment description."
  },
  "status": "CREATED",
  "statusMessage": "string",
  "type": "VRP_SWEEPING",
  "updatedTime": "2022-10-12T09:35:39Z"
}
```

### Response: Response[](#payment/mandate-payment/get-mandate-payment/response-response)

The response from creating or fetching a mandate payment.

amount `CurrencyExactAmount` required

consentId `string` required

The consent id, in uuid v4 format, used for creating a mandate payment.

createdTime `string` required

The timestamp at which the mandate payment was created, ISO 8601 date and time format in UTC (YYYY-MM-DDThh:mm:ssZ).

id `string` required

The id, in uuid v4 format, of the mandate payment.

merchantId `string`

The merchant id, in uuid v4 format, for the mandate payment.

payeeAccount `PayeeAccount` required

payerAccount `PayerAccount` required

remittanceInformation `RemittanceInformation` required

status `string` required

The status of the mandate payment.  
Values: `CREATED, SENT, FAILED, CANCELLED, SETTLED_PAYEE, SETTLED_PAYER`

statusMessage `string`

A message explaining the current status of the payment. This field is populated only if status is one of the terminal statuses.

type `string` required

The type of the mandate payment. Defined by the sub-type used in the creation of your mandate.  
Values: `VRP_SWEEPING, VRP_COMMERCIAL`

updatedTime `string` required

The timestamp at which the mandate payment was updated, ISO 8601 date and time format in UTC (YYYY-MM-DDThh:mm:ssZ).

#### CurrencyExactAmount[](#payment/mandate-payment/get-mandate-payment/response-response/currencyexactamount)

currencyCode `string`

The currency code which follows ISO-4217 standard, and matches the currency code on the mandate.

value `ExactAmount`

#### ExactAmount[](#payment/mandate-payment/get-mandate-payment/response-response/exactamount)

scale `integer`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### PayeeAccount[](#payment/mandate-payment/get-mandate-payment/response-response/payeeaccount)

name `string`

Name of the account, as assigned by the account servicing institution.

number `string`

Number assigned by an institution to identify an account. This identifier is known by the account owner

type `string`

The identification scheme for the account, in a coded form.  
Values: `SORT_CODE`

#### PayerAccount[](#payment/mandate-payment/get-mandate-payment/response-response/payeraccount)

holderName `string`

The name of the account owner.

number `string`

Number assigned by an institution to identify an account. This identifier is known by the account owner.

type `string`

The identification scheme for the account, in a coded form.  
Values: `SORT_CODE`

#### RemittanceInformation[](#payment/mandate-payment/get-mandate-payment/response-response/remittanceinformation)

type `string`

The remittance information type for the mandate payment. REFERENCE will be populated to end-to-end identification at the bank.  
Values: `REFERENCE`

value `string`

The structured remittance information for the mandate payment, maximum 31 characters.

| Status Code | Description |
| --- | --- |
| 200 | Mandate Payment successfully fetched. |
| 401 | The scopes associated with the access token are not allowed by the resource. |
| 403 | The resource does not belong to the subject or scopes associated with the access token. |
| 404 | The Mandate Payment with given id does not exist. |
| 500 | Internal server error. |

## Payment Request[](#payment/payment-request)

## Create payment request[](#payment/payment-request/create-payment-request)

`POST /api/v1/payments/requests`

Create a payment request with the given values. This endpoint returns an `id` which can be used with Tink Link to create a full payment journey for an end user.

### Works with[](#payment/payment-request/create-payment-request/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `payment:write` |

> Request Example

```
{
  "amount": 10,
  "currency": "GBP",
  "destinations": [
    {
      "accountNumber": "string",
      "type": "bban"
    }
  ],
  "executionDate": "2023-11-20",
  "market": "AT",
  "merchantId": "c7f2de71-ad83-4eb7-b7df-5ed6445cb2af",
  "metadata": {
    "custom key": "custom value",
    "merchantReference": "17172137"
  },
  "paymentScheme": "DANISH_DOMESTIC_CREDIT_TRANSFER",
  "recipient": {
    "accountNumber": "string",
    "accountType": "bban",
    "address": {
      "city": "string",
      "countryCode": "string",
      "flatNumber": "string",
      "postCode": "string",
      "region": "string",
      "streetName": "string",
      "streetNumber": "string"
    },
    "businessIdentifierCode": "string"
  },
  "recipientName": "Test AB",
  "remittanceInformation": {
    "type": "UNSTRUCTURED",
    "value": "string"
  },
  "sender": {
    "accountNumber": "string",
    "accountType": "bban",
    "firstName": "string",
    "lastName": "string"
  },
  "sourceMessage": "Gym Equipment"
}
```

### Request Body: CreatePaymentRestRequest[](#payment/payment-request/create-payment-request/request-body-createpaymentrestrequest)

The payment request model represents a request to send payments with the recipient's payment information. It can't be used to make payments directly.

amount `number` required

The [IS0 4217](https://www.iso.org/iso-4217-currency-codes.html) payment amount.

currency `string` required

The [IS0 4217](https://www.iso.org/iso-4217-currency-codes.html) currency code of the payment.

destinations `array[PaymentDestinationDTO]`

\[DEPRECATED\] A single-item list of account numbers that can receive the payment. If more than one item is provided, we select the first. Deprecated in favor of `recipient`, which contains `accountNumber` and `accountType`.

executionDate `string`

The [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html) date when the bank should execute the payment. If no date is provided, the payment will be executed as soon as possible. This feature’s availability depends on the market. Check availability in [market-specific information](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-market-specific-information) or reach out to our [support team](https://tinkab.atlassian.net/servicedesk/customer/portals) for more details.

market `Market` required

The [IS0 3166-1](https://www.iso.org/iso-3166-country-codes.html) Alpha-2 country code of the sender’s country of residence.

merchantId `string`

Id of the merchant to affiliate with this payment request.

metadata `object`

Custom metadata for the payment request. Keys and values must be strings. For privacy protection, you may not store personal data (e.g., names and addresses) in `metadata`.

paymentScheme `PaymentScheme`

The payment scheme supported by the ASPSP. Defaults to `SEPA_CREDIT_TRANSFER` for markets that support SEPA payments. If you select an instant payments scheme that isn’t supported by the ASPSP, the scheme automatically changes to regular credit transfer. This field is required for the `GB` market.

recipient `RecipientDTO` required

Information about the payment recipient. Includes account data, address and business identifier code (BIC). `businessIdentifier` and `address` may be needed for cross-border payments.

recipientName `string` required

The recipient name shown to the payer on signing payments. Maximum character count of 30. Special characters such as á, ã or ç can be used.

remittanceInformation `RemittanceInformationDTO` required

Structured or unstructured remittance information for the payment request. Used for reconciliation. See the [market-specific information](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-market-specific-information) table for details.

sender `PinnedSenderDTO`

The sender “pinned” to this payment. When provided, only this person can initiate this payment. Only available when [Risk Signals](https://docs.tink.com/resources/payments/one-time-payments/risk-signals) is enabled.

sourceMessage `string`

A description of the transaction that appears on the payer’s account. Supported only in Sweden (`SE`). Maximum 50 characters, though some banks may require fewer.

#### PaymentDestinationDTO[](#payment/payment-request/create-payment-request/request-body-createpaymentrestrequest/paymentdestinationdto)

accountNumber `string` required

The recipient’s account number.

type `AccountType` required

The recipient's account type.

#### AccountType[](#payment/payment-request/create-payment-request/request-body-createpaymentrestrequest/accounttype)

Values: `bban`, `email`, `iban`, `multibanco-entity`, `se`, `se-bg`, `se-internal`, `se-pg`, `sort-code`

#### Market[](#payment/payment-request/create-payment-request/request-body-createpaymentrestrequest/market)

Values: `AT`, `CZ`, `DE`, `DK`, `EE`, `ES`, `FI`, `FR`, `GB`, `IT`, `LT`, `LV`, `NL`, `NO`, `PL`, `PT`, `SE`

#### PaymentScheme[](#payment/payment-request/create-payment-request/request-body-createpaymentrestrequest/paymentscheme)

Values: `DANISH_DOMESTIC_CREDIT_TRANSFER`, `FASTER_PAYMENTS`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_INTRADAG`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_NORWEGIAN_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_POLISH_DOMESTIC_CREDIT_TRANSFER`, `MULTIBANCO_SERVICE`, `NORWEGIAN_DOMESTIC_CREDIT_TRANSFER`, `POLISH_DOMESTIC_CREDIT_TRANSFER`, `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER`, `SWISS_DOMESTIC_CREDIT_TRANSFER`

#### RecipientDTO[](#payment/payment-request/create-payment-request/request-body-createpaymentrestrequest/recipientdto)

accountNumber `string` required

The recipient's account number.

accountType `AccountType` required

The recipient's account type.

address `AddressDTO`

The recipient’s address.

businessIdentifierCode `string`

The recipient’s business identifier code (BIC). Used for cross-border payments.

#### AddressDTO[](#payment/payment-request/create-payment-request/request-body-createpaymentrestrequest/addressdto)

city `string` required

The name of the city.

countryCode `string` required

The [IS0 3166-1](https://www.iso.org/iso-3166-country-codes.html) country code of the address in alpha-2 or alpha-3 format.

flatNumber `string`

The flat, unit, apartment, or house number.

postCode `string`

The postal code.

streetName `string` required

The name of the street.

streetNumber `string` required

The number of the building.

#### RemittanceInformationDTO[](#payment/payment-request/create-payment-request/request-body-createpaymentrestrequest/remittanceinformationdto)

type `string` required

The type of remittance information.  
Values: `INVOICE`, `KID`, `MULTIBANCO_REFERENCE`, `OCR`, `REFERENCE`, `RF`, `UNSTRUCTURED`

#### PinnedSenderDTO[](#payment/payment-request/create-payment-request/request-body-createpaymentrestrequest/pinnedsenderdto)

accountNumber `string`

The sender’s account number. Must be provided together with the `accountType`.

accountType `AccountType`

The type of account. Must be provided together with the `accountNumber`.

firstName `string`

The sender’s first name. Maximum 30 characters. Special characters such as á, ã or ç can be used.

lastName `string`

The sender’s last name. Maximum 30 characters. Special characters such as á, ã or ç can be used.

> Response Example

```
{
  "amount": 10,
  "currency": "GBP",
  "destinations": [
    {
      "accountNumber": "string",
      "type": "bban"
    }
  ],
  "executionDate": "2023-11-20",
  "id": "18408f41163f4748b87da9b9a68b6df8",
  "market": "GB",
  "merchantId": "c7f2de71-ad83-4eb7-b7df-5ed6445cb2af",
  "metadata": {
    "custom key": "custom value",
    "merchantReference": "17172137"
  },
  "paymentScheme": "DANISH_DOMESTIC_CREDIT_TRANSFER",
  "recipient": {
    "accountNumber": "string",
    "accountType": "bban",
    "address": {
      "city": "string",
      "countryCode": "string",
      "flatNumber": "string",
      "postCode": "string",
      "region": "string",
      "streetName": "string",
      "streetNumber": "string"
    },
    "businessIdentifierCode": "string"
  },
  "recipientName": "Test AB",
  "remittanceInformation": {
    "type": "UNSTRUCTURED",
    "value": "string"
  },
  "sender": {
    "accountNumber": "string",
    "accountType": "bban",
    "firstName": "string",
    "lastName": "string"
  },
  "sourceMessage": "Payment for Gym Equipment"
}
```

### Response: RestPaymentResponse[](#payment/payment-request/create-payment-request/response-restpaymentresponse)

amount `number` required

The payment amount.

currency `string` required

The currency of the payment amount.

destinations `array[PaymentDestinationDTO]`

\[DEPRECATED\] A single-item list of account numbers that can receive the payment. If more than one item is provided, we select the first. Deprecated in favor of `recipient`, which contains `accountNumber` and `accountType`.

executionDate `string`

The date defining when the payment will be executed by the bank. If no execution date is given, it will be executed as soon as possible. The date follows the ISO 8601 with format

id `string` required

The unique identifier for the payment request.

market `string` required

The [IS0 3166-1](https://www.iso.org/iso-3166-country-codes.html) Alpha-2 country code of the sender’s country of residence.  
Values: `AT`, `CZ`, `DE`, `DK`, `EE`, `ES`, `FI`, `FR`, `GB`, `IT`, `LT`, `LV`, `NL`, `NO`, `PL`, `PT`, `SE`

merchantId `string`

Id of the merchant to affiliate with this payment request.

metadata `object`

Custom metadata for the payment request. Keys and values must be strings. For privacy protection, you may not store personal data (e.g., names and addresses) in `metadata`.

paymentScheme `PaymentScheme`

The payment scheme supported by the ASPSP. Defaults to `SEPA_CREDIT_TRANSFER` for markets that support SEPA payments. If you select an instant payments scheme that isn’t supported by the ASPSP, the scheme automatically changes to regular credit transfer. This field is required for the `GB` market.

recipient `RecipientDTO` required

Information about the payment recipient. Includes account data, address and business identifier code (BIC). `businessIdentifier` and `address` may be needed for cross-border payments.

recipientName `string` required

The recipient name shown to the payer on signing payments. Maximum character count of 30.

remittanceInformation `RemittanceInformationDTO` required

Structured or unstructured remittance information for the payment request. Used for reconciliation. See the [market-specific information](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-market-specific-information) table for details.

sender `PinnedSenderDTO`

The sender “pinned” to this payment. When provided, only this person can initiate this payment. Only available when [Risk Signals](https://docs.tink.com/resources/payments/one-time-payments/risk-signals) is enabled.

sourceMessage `string`

A description of the transaction that appears on the payer’s account. Supported only in Sweden (`SE`). Maximum 50 characters, though some banks may require fewer.

#### PaymentDestinationDTO[](#payment/payment-request/create-payment-request/response-restpaymentresponse/paymentdestinationdto)

accountNumber `string` required

The recipient’s account number.

type `AccountType` required

The recipient's account type.

#### AccountType[](#payment/payment-request/create-payment-request/response-restpaymentresponse/accounttype)

Values: `bban`, `email`, `iban`, `multibanco-entity`, `se`, `se-bg`, `se-internal`, `se-pg`, `sort-code`

#### PaymentScheme[](#payment/payment-request/create-payment-request/response-restpaymentresponse/paymentscheme)

Values: `DANISH_DOMESTIC_CREDIT_TRANSFER`, `FASTER_PAYMENTS`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_INTRADAG`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_NORWEGIAN_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_POLISH_DOMESTIC_CREDIT_TRANSFER`, `MULTIBANCO_SERVICE`, `NORWEGIAN_DOMESTIC_CREDIT_TRANSFER`, `POLISH_DOMESTIC_CREDIT_TRANSFER`, `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER`, `SWISS_DOMESTIC_CREDIT_TRANSFER`

#### RecipientDTO[](#payment/payment-request/create-payment-request/response-restpaymentresponse/recipientdto)

accountNumber `string` required

The recipient's account number.

accountType `AccountType` required

The recipient's account type.

address `AddressDTO`

The recipient’s address.

businessIdentifierCode `string`

The recipient’s business identifier code (BIC). Used for cross-border payments.

#### AddressDTO[](#payment/payment-request/create-payment-request/response-restpaymentresponse/addressdto)

city `string` required

The name of the city.

countryCode `string` required

The [IS0 3166-1](https://www.iso.org/iso-3166-country-codes.html) country code of the address in alpha-2 or alpha-3 format.

flatNumber `string`

The flat, unit, apartment, or house number.

postCode `string`

The postal code.

streetName `string` required

The name of the street.

streetNumber `string` required

The number of the building.

#### RemittanceInformationDTO[](#payment/payment-request/create-payment-request/response-restpaymentresponse/remittanceinformationdto)

type `string` required

The type of remittance information.  
Values: `INVOICE`, `KID`, `MULTIBANCO_REFERENCE`, `OCR`, `REFERENCE`, `RF`, `UNSTRUCTURED`

#### PinnedSenderDTO[](#payment/payment-request/create-payment-request/response-restpaymentresponse/pinnedsenderdto)

accountNumber `string`

The sender’s account number. Must be provided together with the `accountType`.

accountType `AccountType`

The type of account. Must be provided together with the `accountNumber`.

firstName `string`

The sender’s first name. Maximum 30 characters. Special characters such as á, ã or ç can be used.

lastName `string`

The sender’s last name. Maximum 30 characters. Special characters such as á, ã or ç can be used.

| Status Code | Description |
| --- | --- |
| 200 | The payment request was created. |
| 400 | One or more request parameters are incorrect or missing. The response body includes an `error_code` and `error_message` that provide more details about the issue. For more information, see [one-time payment error codes](https://docs.tink.com/resources/payments/one-time-payments/handle-one-time-payments-sdk-error-codes). |
| 401 | Unauthorized, possibly because of missing “Authorization: Bearer {access token}” HTTP header or expired access token. |
| 403 | Forbidden |

## Get payment request[](#payment/payment-request/get-payment-request)

`GET /api/v1/payments/requests/{id}`

Returns the payment request data of the given `id`.

### Works with[](#payment/payment-request/get-payment-request/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `payment:read` |

### Parameters[](#payment/payment-request/get-payment-request/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | Tink payment ID |

> Response Example

```
{
  "amount": 10,
  "currency": "GBP",
  "destinations": [
    {
      "accountNumber": "string",
      "type": "bban"
    }
  ],
  "executionDate": "2023-11-20",
  "id": "18408f41163f4748b87da9b9a68b6df8",
  "market": "GB",
  "merchantId": "c7f2de71-ad83-4eb7-b7df-5ed6445cb2af",
  "metadata": {
    "custom key": "custom value",
    "merchantReference": "17172137"
  },
  "paymentScheme": "DANISH_DOMESTIC_CREDIT_TRANSFER",
  "recipient": {
    "accountNumber": "string",
    "accountType": "bban",
    "address": {
      "city": "string",
      "countryCode": "string",
      "flatNumber": "string",
      "postCode": "string",
      "region": "string",
      "streetName": "string",
      "streetNumber": "string"
    },
    "businessIdentifierCode": "string"
  },
  "recipientName": "Test AB",
  "remittanceInformation": {
    "type": "UNSTRUCTURED",
    "value": "string"
  },
  "sender": {
    "accountNumber": "string",
    "accountType": "bban",
    "firstName": "string",
    "lastName": "string"
  },
  "sourceMessage": "Payment for Gym Equipment"
}
```

### Response: RestPaymentResponse[](#payment/payment-request/get-payment-request/response-restpaymentresponse)

amount `number` required

The payment amount.

currency `string` required

The currency of the payment amount.

destinations `array[PaymentDestinationDTO]`

\[DEPRECATED\] A single-item list of account numbers that can receive the payment. If more than one item is provided, we select the first. Deprecated in favor of `recipient`, which contains `accountNumber` and `accountType`.

executionDate `string`

The date defining when the payment will be executed by the bank. If no execution date is given, it will be executed as soon as possible. The date follows the ISO 8601 with format

id `string` required

The unique identifier for the payment request.

market `string` required

The [IS0 3166-1](https://www.iso.org/iso-3166-country-codes.html) Alpha-2 country code of the sender’s country of residence.  
Values: `AT`, `CZ`, `DE`, `DK`, `EE`, `ES`, `FI`, `FR`, `GB`, `IT`, `LT`, `LV`, `NL`, `NO`, `PL`, `PT`, `SE`

merchantId `string`

Id of the merchant to affiliate with this payment request.

metadata `object`

Custom metadata for the payment request. Keys and values must be strings. For privacy protection, you may not store personal data (e.g., names and addresses) in `metadata`.

paymentScheme `PaymentScheme`

The payment scheme supported by the ASPSP. Defaults to `SEPA_CREDIT_TRANSFER` for markets that support SEPA payments. If you select an instant payments scheme that isn’t supported by the ASPSP, the scheme automatically changes to regular credit transfer. This field is required for the `GB` market.

recipient `RecipientDTO` required

Information about the payment recipient. Includes account data, address and business identifier code (BIC). `businessIdentifier` and `address` may be needed for cross-border payments.

recipientName `string` required

The recipient name shown to the payer on signing payments. Maximum character count of 30.

remittanceInformation `RemittanceInformationDTO` required

Structured or unstructured remittance information for the payment request. Used for reconciliation. See the [market-specific information](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-market-specific-information) table for details.

sender `PinnedSenderDTO`

The sender “pinned” to this payment. When provided, only this person can initiate this payment. Only available when [Risk Signals](https://docs.tink.com/resources/payments/one-time-payments/risk-signals) is enabled.

sourceMessage `string`

A description of the transaction that appears on the payer’s account. Supported only in Sweden (`SE`). Maximum 50 characters, though some banks may require fewer.

#### PaymentDestinationDTO[](#payment/payment-request/get-payment-request/response-restpaymentresponse/paymentdestinationdto)

accountNumber `string` required

The recipient’s account number.

type `AccountType` required

The recipient's account type.

#### AccountType[](#payment/payment-request/get-payment-request/response-restpaymentresponse/accounttype)

Values: `bban`, `email`, `iban`, `multibanco-entity`, `se`, `se-bg`, `se-internal`, `se-pg`, `sort-code`

#### PaymentScheme[](#payment/payment-request/get-payment-request/response-restpaymentresponse/paymentscheme)

Values: `DANISH_DOMESTIC_CREDIT_TRANSFER`, `FASTER_PAYMENTS`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_INTRADAG`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_NORWEGIAN_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_POLISH_DOMESTIC_CREDIT_TRANSFER`, `MULTIBANCO_SERVICE`, `NORWEGIAN_DOMESTIC_CREDIT_TRANSFER`, `POLISH_DOMESTIC_CREDIT_TRANSFER`, `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER`, `SWISS_DOMESTIC_CREDIT_TRANSFER`

#### RecipientDTO[](#payment/payment-request/get-payment-request/response-restpaymentresponse/recipientdto)

accountNumber `string` required

The recipient's account number.

accountType `AccountType` required

The recipient's account type.

address `AddressDTO`

The recipient’s address.

businessIdentifierCode `string`

The recipient’s business identifier code (BIC). Used for cross-border payments.

#### AddressDTO[](#payment/payment-request/get-payment-request/response-restpaymentresponse/addressdto)

city `string` required

The name of the city.

countryCode `string` required

The [IS0 3166-1](https://www.iso.org/iso-3166-country-codes.html) country code of the address in alpha-2 or alpha-3 format.

flatNumber `string`

The flat, unit, apartment, or house number.

postCode `string`

The postal code.

streetName `string` required

The name of the street.

streetNumber `string` required

The number of the building.

#### RemittanceInformationDTO[](#payment/payment-request/get-payment-request/response-restpaymentresponse/remittanceinformationdto)

type `string` required

The type of remittance information.  
Values: `INVOICE`, `KID`, `MULTIBANCO_REFERENCE`, `OCR`, `REFERENCE`, `RF`, `UNSTRUCTURED`

#### PinnedSenderDTO[](#payment/payment-request/get-payment-request/response-restpaymentresponse/pinnedsenderdto)

accountNumber `string`

The sender’s account number. Must be provided together with the `accountType`.

accountType `AccountType`

The type of account. Must be provided together with the `accountNumber`.

firstName `string`

The sender’s first name. Maximum 30 characters. Special characters such as á, ã or ç can be used.

lastName `string`

The sender’s last name. Maximum 30 characters. Special characters such as á, ã or ç can be used.

| Status Code | Description |
| --- | --- |
| 200 | The payment request data was returned. |
| 401 | Unauthorized, possibly because of missing “Authorization: Bearer {access token}” HTTP header or expired access token. |
| 403 | Forbidden |
| 404 | No payment request was found with the given `id`. The response body includes an `error_code` and `error_message` that provide more details about the issue. For more information, see [one-time payment error codes](https://docs.tink.com/resources/payments/one-time-payments/handle-one-time-payments-sdk-error-codes). |

## Get transfers for payment request[](#payment/payment-request/get-transfers-for-payment-request)

`GET /api/v1/payments/requests/{id}/transfers`

Returns a list of bank transfers for a given payment request `id` and their latest status. Payment requests with no transfers will return with an empty list.

### Works with[](#payment/payment-request/get-transfers-for-payment-request/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `payment:read` |

### Parameters[](#payment/payment-request/get-transfers-for-payment-request/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | Tink payment ID |

> Response Example

```
{
  "paymentRequestCreatedTransfers": [
    {
      "amount": 10,
      "created": 1553095951000,
      "currency": "SEK",
      "destination": {
        "accountNumber": "string",
        "type": "bban"
      },
      "id": "40dc04e5353547378c84f34ffc88f853",
      "market": "AT",
      "merchantId": "c7f2de71-ad83-4eb7-b7df-5ed6445cb2af",
      "metadata": {
        "custom key": "custom value",
        "merchantReference": "17172137"
      },
      "paymentScheme": "DANISH_DOMESTIC_CREDIT_TRANSFER",
      "providerName": "handelsbanken-bankid",
      "recipient": {
        "accountNumber": "string",
        "accountType": "bban",
        "address": {
          "city": "string",
          "countryCode": "string",
          "flatNumber": "string",
          "postCode": "string",
          "region": "string",
          "streetName": "string",
          "streetNumber": "string"
        },
        "businessIdentifierCode": "string"
      },
      "recipientName": "Test AB",
      "remittanceInformation": {
        "type": "UNSTRUCTURED",
        "value": "string"
      },
      "sender": {
        "accountNumber": "string",
        "accountType": "bban",
        "firstName": "string",
        "lastName": "string"
      },
      "source": {
        "accountNumber": "string",
        "payerName": "string",
        "type": "bban",
        "uri": "string"
      },
      "sourceMessage": "Payment for Gym Equipment",
      "status": "AWAITING_CREDENTIALS",
      "statusMessage": "The payment has been sent to your bank",
      "updated": 1553169600000
    }
  ]
}
```

### Response: RestCreatedTransfersResponse[](#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse)

paymentRequestCreatedTransfers `array[CreatedTransferDTO]` required

A list of transfers for a given payment request `id`.

#### CreatedTransferDTO[](#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/createdtransferdto)

amount `number` required

The payment amount.

created `Date`

The Unix timestamp of the creation of a bank transfer for the payment request.

currency `string` required

The currency of the payment amount.

destination `PaymentDestinationDTO`

The destination object. Deprecated in favor of `recipient`.

id `string` required

The unique identifier for the transfer.

market `Market` required

The primary market of the payer. The market is usually the country code (in ISO 3166-1 alpha-2 format).

merchantId `string`

Id of the merchant to affiliate with this payment request.

metadata `object`

Custom metadata for the payment request. Keys and values must be strings. For privacy protection, you may not store personal data (e.g., names and addresses) in `metadata`.

paymentScheme `PaymentScheme`

The payment scheme supported by the ASPSP. Defaults to SEPA\_CREDIT\_TRANSFER for markets that support SEPA payments. If you select an instant payments scheme that isn’t supported by the ASPSP, the scheme automatically changes to regular credit transfer. This field is required for the `GB` market.

providerName `string` required

The provider (financial institution) that the payer's account belongs to.

recipient `RecipientDTO` required

Information about the payment recipient. Includes account data, address and business identifier code (BIC). `businessIdentifier` and `address` may be needed for cross-border payments.

recipientName `string` required

The recipient name shown to the payer on signing payments.

remittanceInformation `RemittanceInformationDTO` required

Structured or unstructured remittance information for the payment request. Used for reconciliation. See the [market-specific information](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-market-specific-information) table for details.

sender `PinnedSenderDTO`

The sender “pinned” to this payment. When provided, only this person can initiate this payment. Only available when [Risk Signals](https://docs.tink.com/resources/payments/one-time-payments/risk-signals) is enabled.

source `PaymentSourceDTO`

The source object. Only returned if available from the bank response. Some fields, for example payerName, are not available for all customers and need to be enabled by Tink.

sourceMessage `string`

The transaction description on the payers account for the payment.

status `PaymentStatus` required

The current status of the payment. For details on which statuses to expect, see [payment status transitions](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-status-transitions).

statusMessage `string`

A message that explains the current status of the payment. This field is only populated when the a terminal status is reached. For details, see [payment status transitions](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-status-transitions).

updated `Date`

The Unix timestamp of the most recent update of a bank transfer for the payment request.

#### PaymentDestinationDTO[](#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/paymentdestinationdto)

accountNumber `string` required

The recipient’s account number.

type `AccountType` required

The recipient's account type.

#### AccountType[](#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/accounttype)

Values: `bban`, `email`, `iban`, `multibanco-entity`, `se`, `se-bg`, `se-internal`, `se-pg`, `sort-code`

#### Market[](#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/market)

Values: `AT`, `CZ`, `DE`, `DK`, `EE`, `ES`, `FI`, `FR`, `GB`, `IT`, `LT`, `LV`, `NL`, `NO`, `PL`, `PT`, `SE`

#### PaymentScheme[](#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/paymentscheme)

Values: `DANISH_DOMESTIC_CREDIT_TRANSFER`, `FASTER_PAYMENTS`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_INTRADAG`, `INSTANT_DANISH_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_NORWEGIAN_DOMESTIC_CREDIT_TRANSFER_STRAKS`, `INSTANT_POLISH_DOMESTIC_CREDIT_TRANSFER`, `MULTIBANCO_SERVICE`, `NORWEGIAN_DOMESTIC_CREDIT_TRANSFER`, `POLISH_DOMESTIC_CREDIT_TRANSFER`, `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER`, `SWISS_DOMESTIC_CREDIT_TRANSFER`

#### RecipientDTO[](#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/recipientdto)

accountNumber `string` required

The recipient's account number.

accountType `AccountType` required

The recipient's account type.

address `AddressDTO`

The recipient’s address.

businessIdentifierCode `string`

The recipient’s business identifier code (BIC). Used for cross-border payments.

#### AddressDTO[](#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/addressdto)

city `string` required

The name of the city.

countryCode `string` required

The [IS0 3166-1](https://www.iso.org/iso-3166-country-codes.html) country code of the address in alpha-2 or alpha-3 format.

flatNumber `string`

The flat, unit, apartment, or house number.

postCode `string`

The postal code.

streetName `string` required

The name of the street.

streetNumber `string` required

The number of the building.

#### RemittanceInformationDTO[](#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/remittanceinformationdto)

type `string` required

The type of remittance information.  
Values: `INVOICE`, `KID`, `MULTIBANCO_REFERENCE`, `OCR`, `REFERENCE`, `RF`, `UNSTRUCTURED`

#### PinnedSenderDTO[](#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/pinnedsenderdto)

accountNumber `string`

The sender’s account number. Must be provided together with the `accountType`.

accountType `AccountType`

The type of account. Must be provided together with the `accountNumber`.

firstName `string`

The sender’s first name. Maximum 30 characters. Special characters such as á, ã or ç can be used.

lastName `string`

The sender’s last name. Maximum 30 characters. Special characters such as á, ã or ç can be used.

#### PaymentSourceDTO[](#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/paymentsourcedto)

accountNumber `string`

The payer's account number.

payerName `string`

Name of the party who owns the account from which the payment is initiated.

type `AccountType`

The payer's account type.

uri `string`

The payer's account number in uri format.

#### PaymentStatus[](#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/paymentstatus)

Values: `AWAITING_CREDENTIALS`, `CANCELLED`, `CREATED`, `FAILED`, `SENT`, `SETTLED`, `SETTLED_PAYEE`, `SETTLED_PAYER`

| Status Code | Description |
| --- | --- |
| 200 | The list of bank transfers for a given payment request was returned. |
| 401 | Unauthorized, possibly because of missing “Authorization: Bearer {access token}” HTTP header or expired access token. |
| 403 | Forbidden |
| 404 | No payment request was found with the given `id`. |

## Settlement Accounts[](#payment/settlement-accounts)

## Create account[](#payment/settlement-accounts/create-account)

`POST /payment/v1/merchants/{merchantId}/accounts`

Creates a new settlement account for the merchant.

### Works with[](#payment/settlement-accounts/create-account/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `settlement-accounts` |

### Parameters[](#payment/settlement-accounts/create-account/parameters)

| Parameter | Description |
| --- | --- |
| merchantIdrequired | The merchant id tied to the account. |

> Request Example

```
{
  "appId": "",
  "countryCode": "GB",
  "currencyCode": "GBP",
  "merchantId": "2c9ba5fd-cbdb-4ed5-84a4-01db5698f0d9",
  "name": "Account name",
  "payoutAccount": {
    "currencyCode": "GBP",
    "frequency": "MONTHLY",
    "identifier": {
      "identifier": "00000070438943",
      "type": "SORT_CODE"
    }
  },
  "reservedAmount": {
    "scale": "1",
    "unscaledValue": "100"
  }
}
```

### Request Body: SettlementAccount[](#payment/settlement-accounts/create-account/request-body-settlementaccount)

Parameters for the settlement account to be created.

appId `string`

The app id of the account.

countryCode `string`

The country code (ISO 3166-1 alpha-2) of the desired location for the account. Optional.

currencyCode `string` required

The currency code of the account.

merchantId `string` required

The merchant id tied to the account.

name `string` required

The name of the account. It should be the name of the company/shop of which the transaction is intended to.

payoutAccount `PayoutAccount`

The payout account affiliated with the account.

reservedAmount `ExactNumber`

The amount that will be reserved on the account for refunds and withdrawals.

#### PayoutAccount[](#payment/settlement-accounts/create-account/request-body-settlementaccount/payoutaccount)

currencyCode `string`

The currency code for the payout account.

frequency `PayoutAccountFrequency` required

The frequency indicating how often a payout should be performed.

identifier `paymentAccountIdentifier` required

The account identifier for the payout account. Note that EUR accounts only support the use of IBAN and GBP accounts only support SORT\_CODE.

#### PayoutAccountFrequency[](#payment/settlement-accounts/create-account/request-body-settlementaccount/payoutaccountfrequency)

| Value | Description |
| --- | --- |
| FREQUENCY\_UNSPECIFIED | Default unspecified frequency. Will result in no scheduled payouts. |
| DAILY | Daily will result in payouts every day. |
| WEEKLY | Weekly will result in payouts every Monday. |
| MONTHLY | Monthly will result in payouts the first day of the month. |

#### paymentAccountIdentifier[](#payment/settlement-accounts/create-account/request-body-settlementaccount/paymentaccountidentifier)

identifier `string`

Full account identifier as string.

type `AccountIdentifierType`

Account type - one of predefined values.

#### AccountIdentifierType[](#payment/settlement-accounts/create-account/request-body-settlementaccount/accountidentifiertype)

| Value | Description |
| --- | --- |
| ACCOUNT\_IDENTIFIER\_TYPE\_UNSPECIFIED | Default value. It should not occur. |
| SE | Account type used in SE. |
| IBAN | IBAN account type. |
| SORT\_CODE | Sort code account type used in UK. |

#### ExactNumber[](#payment/settlement-accounts/create-account/request-body-settlementaccount/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

> Response Example

```
{
  "accountIdentifier": {
    "identifier": "00000012345678",
    "type": "SORT_CODE"
  },
  "appId": "",
  "availableBalance": {
    "currencyCode": "GBP",
    "value": {
      "scale": "2",
      "unscaledValue": "271100"
    }
  },
  "balance": {
    "currencyCode": "GBP",
    "value": {
      "scale": "2",
      "unscaledValue": "276400"
    }
  },
  "countryCode": "GB",
  "currencyCode": "GBP",
  "id": "744cf927-29cd-475e-9ef2-2b11951d3cc9",
  "merchantId": "2c9ba5fd-cbdb-4ed5-84a4-01db5698f0d9",
  "name": "Account name",
  "payoutAccount": {
    "currencyCode": "GBP",
    "frequency": "MONTHLY",
    "identifier": {
      "identifier": "00000070438943",
      "type": "SORT_CODE"
    }
  },
  "reservedAmount": {
    "scale": "1",
    "unscaledValue": "100"
  },
  "status": "ENABLED",
  "type": "APP_ACCOUNT"
}
```

### Response: SettlementAccount[](#payment/settlement-accounts/create-account/response-settlementaccount)

Parameters for the settlement account to be created.

accountIdentifier `paymentAccountIdentifier` readonly

The account identifier for the settlement account. Note that EUR accounts only support the use of IBAN and GBP accounts only support SORT\_CODE.

appId `string`

The app id of the account.

availableBalance `CurrencyDenominatedAmount` readonly

The available balance of the account.

balance `CurrencyDenominatedAmount` readonly

The balance of the account.

countryCode `string`

The country code (ISO 3166-1 alpha-2) of the desired location for the account. Optional.

currencyCode `string` required

The currency code of the account.

id `string` readonly

The id of the account.

merchantId `string` required

The merchant id tied to the account.

name `string` required

The name of the account. It should be the name of the company/shop of which the transaction is intended to.

payoutAccount `PayoutAccount`

The payout account affiliated with the account.

reservedAmount `ExactNumber`

The amount that will be reserved on the account for refunds and withdrawals.

status `SettlementAccountStatus` readonly

The status of the account.

type `SettlementAccountType` readonly

The account type.

#### paymentAccountIdentifier[](#payment/settlement-accounts/create-account/response-settlementaccount/paymentaccountidentifier)

identifier `string`

Full account identifier as string.

type `AccountIdentifierType`

Account type - one of predefined values.

#### AccountIdentifierType[](#payment/settlement-accounts/create-account/response-settlementaccount/accountidentifiertype)

| Value | Description |
| --- | --- |
| ACCOUNT\_IDENTIFIER\_TYPE\_UNSPECIFIED | Default value. It should not occur. |
| SE | Account type used in SE. |
| IBAN | IBAN account type. |
| SORT\_CODE | Sort code account type used in UK. |

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/create-account/response-settlementaccount/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/create-account/response-settlementaccount/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### PayoutAccount[](#payment/settlement-accounts/create-account/response-settlementaccount/payoutaccount)

currencyCode `string`

The currency code for the payout account.

frequency `PayoutAccountFrequency` required

The frequency indicating how often a payout should be performed.

identifier `paymentAccountIdentifier` required

The account identifier for the payout account. Note that EUR accounts only support the use of IBAN and GBP accounts only support SORT\_CODE.

#### PayoutAccountFrequency[](#payment/settlement-accounts/create-account/response-settlementaccount/payoutaccountfrequency)

| Value | Description |
| --- | --- |
| FREQUENCY\_UNSPECIFIED | Default unspecified frequency. Will result in no scheduled payouts. |
| DAILY | Daily will result in payouts every day. |
| WEEKLY | Weekly will result in payouts every Monday. |
| MONTHLY | Monthly will result in payouts the first day of the month. |

#### SettlementAccountStatus[](#payment/settlement-accounts/create-account/response-settlementaccount/settlementaccountstatus)

| Value | Description |
| --- | --- |
| STATUS\_UNSPECIFIED | Default unspecified status. |
| ENABLED | Indicating that the account is operating. |
| SUSPENDED | Indicating that the account was suspended. |
| TERMINATED | Indicating that the account was terminated. |

#### SettlementAccountType[](#payment/settlement-accounts/create-account/response-settlementaccount/settlementaccounttype)

| Value | Description |
| --- | --- |
| TYPE\_UNSPECIFIED | Default unspecified account type. |
| APP\_ACCOUNT | An individual account owned solely by a single merchant. |
| ACQUIRER\_ACCOUNT | A managed account with a primary owner and additional merchants. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Please check the error message for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | The merchant specified could not be found. |
| default | An unexpected error response. |

## Create payment request[](#payment/settlement-accounts/create-payment-request)

`POST /payment/v1/settlement-account-payment-requests`

Creates a payment request and sends the money to a specific settlement account for the specified currency. Note: in order to utilize this endpoint you need to have been onboarded for Settlement Accounts.

### Works with[](#payment/settlement-accounts/create-payment-request/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `payment:write` |

> Request Example

```
{
  "accountId": "744cf927-29cd-475e-9ef2-2b11951d3cc9",
  "amount": {
    "currencyCode": "GBP",
    "value": {
      "scale": "0",
      "unscaledValue": "100"
    }
  },
  "market": "GB",
  "merchantId": "2c9ba5fd-cbdb-4ed5-84a4-01db5698f0d9",
  "metadata": {
    "key1": "value1",
    "key2": "value2"
  },
  "payeeName": "Test AB",
  "reference": "string",
  "scheme": "SCHEME_UNSPECIFIED"
}
```

### Request Body: SettlementAccountPaymentRequest[](#payment/settlement-accounts/create-payment-request/request-body-settlementaccountpaymentrequest)

Parameters for the settlement account payment request to be created.

accountId `string` required

The id of the account to be used for this payment request.

amount `CurrencyDenominatedAmount` required

The amount of the payment.

market `string` required

The country code (ISO 3166-1 alpha-2) of the market for the payer.

merchantId `string` required

The id of the merchant to affiliate the payment with.

metadata `object`

A key-value dictionary with custom metadata for the settlement account payment request. All keys and values must be strings. For privacy protection, it is not allowed to use this dictionary for storing personal data (e.g. names and addresses).

payeeName `string`

Payee name to be used for payment.

reference `string`

Reference of the payment. Optional. The input in the request is up to 10-character long and will be added at the end to Tink generated 8-character long reference to be used as a payment reference. In the response full reference is returned.

scheme `SettlementAccountPaymentRequestScheme`

Scheme to be used for payment. Supported values are `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER` for EURO countries and `FASTER_PAYMENTS`, `BACS`, `CHAPS` for UK (GBP).

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/create-payment-request/request-body-settlementaccountpaymentrequest/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/create-payment-request/request-body-settlementaccountpaymentrequest/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SettlementAccountPaymentRequestScheme[](#payment/settlement-accounts/create-payment-request/request-body-settlementaccountpaymentrequest/settlementaccountpaymentrequestscheme)

| Value | Description |
| --- | --- |
| SCHEME\_UNSPECIFIED | Default unspecified scheme. |
| FASTER\_PAYMENTS | Faster payments scheme. |
| SEPA\_INSTANT\_CREDIT\_TRANSFER | SEPA Instant Credit Transfer scheme. |
| SEPA\_CREDIT\_TRANSFER | SEPA Credit Transfer scheme. |
| BACS | BACS scheme. |
| CHAPS | CHAPS scheme. |

> Response Example

```
{
  "accountId": "744cf927-29cd-475e-9ef2-2b11951d3cc9",
  "amount": {
    "currencyCode": "GBP",
    "value": {
      "scale": "0",
      "unscaledValue": "100"
    }
  },
  "id": "b0223349-65b3-4c8b-b500-74e33f2f643b",
  "market": "GB",
  "merchantId": "2c9ba5fd-cbdb-4ed5-84a4-01db5698f0d9",
  "metadata": {
    "key1": "value1",
    "key2": "value2"
  },
  "payeeName": "Test AB",
  "reference": "string",
  "scheme": "SCHEME_UNSPECIFIED"
}
```

### Response: SettlementAccountPaymentRequest[](#payment/settlement-accounts/create-payment-request/response-settlementaccountpaymentrequest)

Parameters for the settlement account payment request to be created.

accountId `string` required

The id of the account to be used for this payment request.

amount `CurrencyDenominatedAmount` required

The amount of the payment.

id `string` readonly

The id of the settlement account payment request.

market `string` required

The country code (ISO 3166-1 alpha-2) of the market for the payer.

merchantId `string` required

The id of the merchant to affiliate the payment with.

metadata `object`

A key-value dictionary with custom metadata for the settlement account payment request. All keys and values must be strings. For privacy protection, it is not allowed to use this dictionary for storing personal data (e.g. names and addresses).

payeeName `string`

Payee name to be used for payment.

reference `string`

Reference of the payment. Optional. The input in the request is up to 10-character long and will be added at the end to Tink generated 8-character long reference to be used as a payment reference. In the response full reference is returned.

scheme `SettlementAccountPaymentRequestScheme`

Scheme to be used for payment. Supported values are `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER` for EURO countries and `FASTER_PAYMENTS`, `BACS`, `CHAPS` for UK (GBP).

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/create-payment-request/response-settlementaccountpaymentrequest/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/create-payment-request/response-settlementaccountpaymentrequest/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SettlementAccountPaymentRequestScheme[](#payment/settlement-accounts/create-payment-request/response-settlementaccountpaymentrequest/settlementaccountpaymentrequestscheme)

| Value | Description |
| --- | --- |
| SCHEME\_UNSPECIFIED | Default unspecified scheme. |
| FASTER\_PAYMENTS | Faster payments scheme. |
| SEPA\_INSTANT\_CREDIT\_TRANSFER | SEPA Instant Credit Transfer scheme. |
| SEPA\_CREDIT\_TRANSFER | SEPA Credit Transfer scheme. |
| BACS | BACS scheme. |
| CHAPS | CHAPS scheme. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Check the error message or the documentation of each field for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | The merchant or the belonging account could not be found. |
| default | An unexpected error response. |

## Create refund[](#payment/settlement-accounts/create-refund)

`POST /payment/v1/merchants/{merchantId}/accounts/{accountId}/refunds`

Creates a refund for the specific transaction, settlement account and merchant.

### Works with[](#payment/settlement-accounts/create-refund/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `settlement-accounts` |

### Parameters[](#payment/settlement-accounts/create-refund/parameters)

| Parameter | Description |
| --- | --- |
| merchantIdrequired | Id of the merchant. |
| accountIdrequired | Id of the settlement account. |

> Request Example

```
{
  "amount": {
    "currencyCode": "EUR",
    "value": {
      "scale": "2",
      "unscaledValue": "5000"
    }
  },
  "metadata": {
    "key1": "value1",
    "key2": "value2"
  },
  "reference": "Refund7ad0feabb4ab",
  "scheme": "SEPA_INSTANT_CREDIT_TRANSFER",
  "transactionId": "7ad0feab-bd55-449d-aa7e-b3d3b9c62550"
}
```

### Request Body: SettlementAccountRefund[](#payment/settlement-accounts/create-refund/request-body-settlementaccountrefund)

Parameters for the settlement account refund to be created. Use of an `Idempotency-Key` header is required when making this request. The header value must be a non empty string.

amount `CurrencyDenominatedAmount` required

Amount to refund. Amount needs to be greater than or equal to 0.01 and less than or equal to transaction amount.

metadata `object`

A key-value dictionary with custom metadata for the refund. All keys and values must be strings. For privacy protection, it is not allowed to use this dictionary for storing personal data (e.g. names and addresses).

reference `string` required

External reference set by the merchant, must be between 6-18 characters long.

scheme `SettlementAccountRefundScheme`

Scheme to be used for the refund. Supported values are `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER` for EURO countries and `FASTER_PAYMENTS`, `BACS`, `CHAPS` for UK (GBP).

transactionId `string` required

Id of the transaction to refund.

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/create-refund/request-body-settlementaccountrefund/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/create-refund/request-body-settlementaccountrefund/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SettlementAccountRefundScheme[](#payment/settlement-accounts/create-refund/request-body-settlementaccountrefund/settlementaccountrefundscheme)

| Value | Description |
| --- | --- |
| SCHEME\_UNSPECIFIED | Default unspecified scheme. |
| FASTER\_PAYMENTS | Faster payments scheme. |
| SEPA\_INSTANT\_CREDIT\_TRANSFER | SEPA Instant Credit Transfer scheme. |
| SEPA\_CREDIT\_TRANSFER | SEPA Credit Transfer scheme. |
| BACS | BACS scheme. |
| CHAPS | CHAPS scheme. |

> Response Example

```
{
  "accountId": "161ec210-721f-4df5-b21c-f78a9d4c1545",
  "amount": {
    "currencyCode": "EUR",
    "value": {
      "scale": "2",
      "unscaledValue": "5000"
    }
  },
  "createdTime": "2022-07-14T14:01:53Z",
  "id": "b58d313a-b778-4639-8e31-c9ffc35e2d01",
  "merchantId": "e06e47f1-8c88-47ee-9415-a4cde72ae598",
  "metadata": {
    "key1": "value1",
    "key2": "value2"
  },
  "reference": "Refund7ad0feabb4ab",
  "scheme": "SEPA_INSTANT_CREDIT_TRANSFER",
  "status": "COMPLETED",
  "transactionId": "7ad0feab-bd55-449d-aa7e-b3d3b9c62550",
  "updatedTime": "2022-07-14T14:08:53Z"
}
```

### Response: SettlementAccountRefund[](#payment/settlement-accounts/create-refund/response-settlementaccountrefund)

Parameters for the settlement account refund to be created. Use of an `Idempotency-Key` header is required when making this request. The header value must be a non empty string.

accountId `string` required readonly

Id of the settlement account.

amount `CurrencyDenominatedAmount` required

Amount to refund. Amount needs to be greater than or equal to 0.01 and less than or equal to transaction amount.

createdTime `Date` readonly

The date and time when the refund was initiated.

id `string` readonly

Id of the refund.

merchantId `string` required readonly

Id of the merchant.

metadata `object`

A key-value dictionary with custom metadata for the refund. All keys and values must be strings. For privacy protection, it is not allowed to use this dictionary for storing personal data (e.g. names and addresses).

reference `string` required

External reference set by the merchant, must be between 6-18 characters long.

scheme `SettlementAccountRefundScheme`

Scheme to be used for the refund. Supported values are `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER` for EURO countries and `FASTER_PAYMENTS`, `BACS`, `CHAPS` for UK (GBP).

status `SettlementAccountRefundStatus` readonly

Status of the refund.

transactionId `string` required

Id of the transaction to refund.

updatedTime `Date` readonly

The date and time when the refund was updated.

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/create-refund/response-settlementaccountrefund/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/create-refund/response-settlementaccountrefund/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SettlementAccountRefundScheme[](#payment/settlement-accounts/create-refund/response-settlementaccountrefund/settlementaccountrefundscheme)

| Value | Description |
| --- | --- |
| SCHEME\_UNSPECIFIED | Default unspecified scheme. |
| FASTER\_PAYMENTS | Faster payments scheme. |
| SEPA\_INSTANT\_CREDIT\_TRANSFER | SEPA Instant Credit Transfer scheme. |
| SEPA\_CREDIT\_TRANSFER | SEPA Credit Transfer scheme. |
| BACS | BACS scheme. |
| CHAPS | CHAPS scheme. |

#### SettlementAccountRefundStatus[](#payment/settlement-accounts/create-refund/response-settlementaccountrefund/settlementaccountrefundstatus)

| Value | Description |
| --- | --- |
| PENDING | Default value. |
| COMPLETED | Refund was successful. |
| FAILED | Refund failed to complete. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Please check the error message for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | The merchant, account or transaction specified could not be found. |
| default | An unexpected error response. |

## Create withdrawalBeta[](#payment/settlement-accounts/create-withdrawal)

`POST /payment/v1/merchants/{merchantId}/accounts/{accountId}/withdrawals`

Creates a withdrawal for the specific transaction, settlement account and merchant.

### Works with[](#payment/settlement-accounts/create-withdrawal/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `settlement-accounts` |

### Parameters[](#payment/settlement-accounts/create-withdrawal/parameters)

| Parameter | Description |
| --- | --- |
| merchantIdrequired | Id of the merchant. |
| accountIdrequired | Id of the settlement account. |

> Request Example

```
{
  "amount": {
    "currencyCode": "EUR",
    "value": {
      "scale": "2",
      "unscaledValue": "5000"
    }
  },
  "metadata": {
    "key1": "value1",
    "key2": "value2"
  },
  "reference": "Eup7ad0feabb4ab",
  "scheme": "SEPA_INSTANT_CREDIT_TRANSFER",
  "transactionId": "7ad0feab-bd55-449d-aa7e-b3d3b9c62550"
}
```

### Request Body: SettlementAccountWithdrawal[](#payment/settlement-accounts/create-withdrawal/request-body-settlementaccountwithdrawal)

Parameters for the settlement account withdrawal to be created. Use of an `Idempotency-Key` header is required when making this request. The header value must be a non empty string.

amount `CurrencyDenominatedAmount` required

Amount to withdraw. Amount needs to be greater than or equal to 0.01 and less than or equal to available balance.

metadata `object`

A key-value dictionary with custom metadata for the withdrawal. All keys and values must be strings. For privacy protection, it is not allowed to use this dictionary for storing personal data (e.g. names and addresses).

reference `string` required

External reference set by the merchant, must be between 6-18 characters long.

scheme `SettlementAccountWithdrawalScheme`

Scheme to be used for the withdrawal. Supported values are `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER` for EURO countries and `FASTER_PAYMENTS`, `BACS`, `CHAPS` for UK (GBP).

transactionId `string` required

Id of the transaction to determine payee.

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/create-withdrawal/request-body-settlementaccountwithdrawal/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/create-withdrawal/request-body-settlementaccountwithdrawal/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SettlementAccountWithdrawalScheme[](#payment/settlement-accounts/create-withdrawal/request-body-settlementaccountwithdrawal/settlementaccountwithdrawalscheme)

| Value | Description |
| --- | --- |
| SCHEME\_UNSPECIFIED | Default unspecified scheme. |
| FASTER\_PAYMENTS | Faster payments scheme. |
| SEPA\_INSTANT\_CREDIT\_TRANSFER | SEPA Instant Credit Transfer scheme. |
| SEPA\_CREDIT\_TRANSFER | SEPA Credit Transfer scheme. |
| BACS | BACS scheme. |
| CHAPS | CHAPS scheme. |

> Response Example

```
{
  "accountId": "161ec210-721f-4df5-b21c-f78a9d4c1545",
  "amount": {
    "currencyCode": "EUR",
    "value": {
      "scale": "2",
      "unscaledValue": "5000"
    }
  },
  "createdTime": "2022-07-14T14:01:53Z",
  "id": "b58d313a-b778-4639-8e31-c9ffc35e2d01",
  "merchantId": "e06e47f1-8c88-47ee-9415-a4cde72ae598",
  "metadata": {
    "key1": "value1",
    "key2": "value2"
  },
  "reference": "Eup7ad0feabb4ab",
  "scheme": "SEPA_INSTANT_CREDIT_TRANSFER",
  "status": "COMPLETED",
  "transactionId": "7ad0feab-bd55-449d-aa7e-b3d3b9c62550",
  "updatedTime": "2022-07-14T14:09:53Z"
}
```

### Response: SettlementAccountWithdrawal[](#payment/settlement-accounts/create-withdrawal/response-settlementaccountwithdrawal)

Parameters for the settlement account withdrawal to be created. Use of an `Idempotency-Key` header is required when making this request. The header value must be a non empty string.

accountId `string` required readonly

Id of the settlement account.

amount `CurrencyDenominatedAmount` required

Amount to withdraw. Amount needs to be greater than or equal to 0.01 and less than or equal to available balance.

createdTime `Date` readonly

The date and time when the withdrawal was initiated.

id `string` readonly

Id of the withdrawal.

merchantId `string` required readonly

Id of the merchant.

metadata `object`

A key-value dictionary with custom metadata for the withdrawal. All keys and values must be strings. For privacy protection, it is not allowed to use this dictionary for storing personal data (e.g. names and addresses).

reference `string` required

External reference set by the merchant, must be between 6-18 characters long.

scheme `SettlementAccountWithdrawalScheme`

Scheme to be used for the withdrawal. Supported values are `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER` for EURO countries and `FASTER_PAYMENTS`, `BACS`, `CHAPS` for UK (GBP).

status `SettlementAccountWithdrawalStatus` readonly

Status of the withdrawal.

transactionId `string` required

Id of the transaction to determine payee.

updatedTime `Date` readonly

The date and time when the withdrawal was updated.

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/create-withdrawal/response-settlementaccountwithdrawal/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/create-withdrawal/response-settlementaccountwithdrawal/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SettlementAccountWithdrawalScheme[](#payment/settlement-accounts/create-withdrawal/response-settlementaccountwithdrawal/settlementaccountwithdrawalscheme)

| Value | Description |
| --- | --- |
| SCHEME\_UNSPECIFIED | Default unspecified scheme. |
| FASTER\_PAYMENTS | Faster payments scheme. |
| SEPA\_INSTANT\_CREDIT\_TRANSFER | SEPA Instant Credit Transfer scheme. |
| SEPA\_CREDIT\_TRANSFER | SEPA Credit Transfer scheme. |
| BACS | BACS scheme. |
| CHAPS | CHAPS scheme. |

#### SettlementAccountWithdrawalStatus[](#payment/settlement-accounts/create-withdrawal/response-settlementaccountwithdrawal/settlementaccountwithdrawalstatus)

| Value | Description |
| --- | --- |
| PENDING | Default value. |
| COMPLETED | Withdrawal was successful. |
| FAILED | Withdrawal failed to complete. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Please check the error message for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | The merchant or account specified could not be found. |
| default | An unexpected error response. |

## Get account[](#payment/settlement-accounts/get-account)

`GET /payment/v1/merchants/{merchantId}/accounts/{accountId}`

Retrieves a specific settlement account for a given merchant.

### Works with[](#payment/settlement-accounts/get-account/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `settlement-accounts:readonly` |
| Client token | `settlement-accounts` |

### Parameters[](#payment/settlement-accounts/get-account/parameters)

| Parameter | Description |
| --- | --- |
| merchantIdrequired | The id of the merchant. |
| accountIdrequired | The id of the account. |

### Query Parameters[](#payment/settlement-accounts/get-account/query-parameters)

| Parameter | Description |
| --- | --- |
| appIdEq | App id to filter accounts by. |

> Response Example

```
{
  "accountIdentifier": {
    "identifier": "00000012345678",
    "type": "SORT_CODE"
  },
  "appId": "",
  "availableBalance": {
    "currencyCode": "GBP",
    "value": {
      "scale": "2",
      "unscaledValue": "271100"
    }
  },
  "balance": {
    "currencyCode": "GBP",
    "value": {
      "scale": "2",
      "unscaledValue": "276400"
    }
  },
  "countryCode": "GB",
  "currencyCode": "GBP",
  "id": "744cf927-29cd-475e-9ef2-2b11951d3cc9",
  "merchantId": "2c9ba5fd-cbdb-4ed5-84a4-01db5698f0d9",
  "name": "Account name",
  "payoutAccount": {
    "currencyCode": "GBP",
    "frequency": "MONTHLY",
    "identifier": {
      "identifier": "00000070438943",
      "type": "SORT_CODE"
    }
  },
  "reservedAmount": {
    "scale": "1",
    "unscaledValue": "100"
  },
  "status": "ENABLED",
  "type": "APP_ACCOUNT"
}
```

### Response: SettlementAccount[](#payment/settlement-accounts/get-account/response-settlementaccount)

Parameters for the settlement account to be created.

accountIdentifier `paymentAccountIdentifier` readonly

The account identifier for the settlement account. Note that EUR accounts only support the use of IBAN and GBP accounts only support SORT\_CODE.

appId `string`

The app id of the account.

availableBalance `CurrencyDenominatedAmount` readonly

The available balance of the account.

balance `CurrencyDenominatedAmount` readonly

The balance of the account.

countryCode `string`

The country code (ISO 3166-1 alpha-2) of the desired location for the account. Optional.

currencyCode `string` required

The currency code of the account.

id `string` readonly

The id of the account.

merchantId `string` required

The merchant id tied to the account.

name `string` required

The name of the account. It should be the name of the company/shop of which the transaction is intended to.

payoutAccount `PayoutAccount`

The payout account affiliated with the account.

reservedAmount `ExactNumber`

The amount that will be reserved on the account for refunds and withdrawals.

status `SettlementAccountStatus` readonly

The status of the account.

type `SettlementAccountType` readonly

The account type.

#### paymentAccountIdentifier[](#payment/settlement-accounts/get-account/response-settlementaccount/paymentaccountidentifier)

identifier `string`

Full account identifier as string.

type `AccountIdentifierType`

Account type - one of predefined values.

#### AccountIdentifierType[](#payment/settlement-accounts/get-account/response-settlementaccount/accountidentifiertype)

| Value | Description |
| --- | --- |
| ACCOUNT\_IDENTIFIER\_TYPE\_UNSPECIFIED | Default value. It should not occur. |
| SE | Account type used in SE. |
| IBAN | IBAN account type. |
| SORT\_CODE | Sort code account type used in UK. |

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/get-account/response-settlementaccount/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/get-account/response-settlementaccount/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### PayoutAccount[](#payment/settlement-accounts/get-account/response-settlementaccount/payoutaccount)

currencyCode `string`

The currency code for the payout account.

frequency `PayoutAccountFrequency` required

The frequency indicating how often a payout should be performed.

identifier `paymentAccountIdentifier` required

The account identifier for the payout account. Note that EUR accounts only support the use of IBAN and GBP accounts only support SORT\_CODE.

#### PayoutAccountFrequency[](#payment/settlement-accounts/get-account/response-settlementaccount/payoutaccountfrequency)

| Value | Description |
| --- | --- |
| FREQUENCY\_UNSPECIFIED | Default unspecified frequency. Will result in no scheduled payouts. |
| DAILY | Daily will result in payouts every day. |
| WEEKLY | Weekly will result in payouts every Monday. |
| MONTHLY | Monthly will result in payouts the first day of the month. |

#### SettlementAccountStatus[](#payment/settlement-accounts/get-account/response-settlementaccount/settlementaccountstatus)

| Value | Description |
| --- | --- |
| STATUS\_UNSPECIFIED | Default unspecified status. |
| ENABLED | Indicating that the account is operating. |
| SUSPENDED | Indicating that the account was suspended. |
| TERMINATED | Indicating that the account was terminated. |

#### SettlementAccountType[](#payment/settlement-accounts/get-account/response-settlementaccount/settlementaccounttype)

| Value | Description |
| --- | --- |
| TYPE\_UNSPECIFIED | Default unspecified account type. |
| APP\_ACCOUNT | An individual account owned solely by a single merchant. |
| ACQUIRER\_ACCOUNT | A managed account with a primary owner and additional merchants. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Please check the error message for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | The merchant or account specified could not be found. |
| default | An unexpected error response. |

## Get refund[](#payment/settlement-accounts/get-refund)

`GET /payment/v1/merchants/{merchantId}/accounts/{accountId}/refunds/{refundId}`

Retrieves a specific refund for a specific settlement account and merchant.

### Works with[](#payment/settlement-accounts/get-refund/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `settlement-accounts:readonly` |
| Client token | `settlement-accounts` |

### Parameters[](#payment/settlement-accounts/get-refund/parameters)

| Parameter | Description |
| --- | --- |
| merchantIdrequired | The id of the merchant. |
| accountIdrequired | The id of the account. |
| refundIdrequired | The id of the refund. |

> Response Example

```
{
  "accountId": "161ec210-721f-4df5-b21c-f78a9d4c1545",
  "amount": {
    "currencyCode": "EUR",
    "value": {
      "scale": "2",
      "unscaledValue": "5000"
    }
  },
  "createdTime": "2022-07-14T14:01:53Z",
  "id": "b58d313a-b778-4639-8e31-c9ffc35e2d01",
  "merchantId": "e06e47f1-8c88-47ee-9415-a4cde72ae598",
  "metadata": {
    "key1": "value1",
    "key2": "value2"
  },
  "reference": "Refund7ad0feabb4ab",
  "scheme": "SEPA_INSTANT_CREDIT_TRANSFER",
  "status": "COMPLETED",
  "transactionId": "7ad0feab-bd55-449d-aa7e-b3d3b9c62550",
  "updatedTime": "2022-07-14T14:08:53Z"
}
```

### Response: SettlementAccountRefund[](#payment/settlement-accounts/get-refund/response-settlementaccountrefund)

Parameters for the settlement account refund to be created. Use of an `Idempotency-Key` header is required when making this request. The header value must be a non empty string.

accountId `string` required readonly

Id of the settlement account.

amount `CurrencyDenominatedAmount` required

Amount to refund. Amount needs to be greater than or equal to 0.01 and less than or equal to transaction amount.

createdTime `Date` readonly

The date and time when the refund was initiated.

id `string` readonly

Id of the refund.

merchantId `string` required readonly

Id of the merchant.

metadata `object`

A key-value dictionary with custom metadata for the refund. All keys and values must be strings. For privacy protection, it is not allowed to use this dictionary for storing personal data (e.g. names and addresses).

reference `string` required

External reference set by the merchant, must be between 6-18 characters long.

scheme `SettlementAccountRefundScheme`

Scheme to be used for the refund. Supported values are `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER` for EURO countries and `FASTER_PAYMENTS`, `BACS`, `CHAPS` for UK (GBP).

status `SettlementAccountRefundStatus` readonly

Status of the refund.

transactionId `string` required

Id of the transaction to refund.

updatedTime `Date` readonly

The date and time when the refund was updated.

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/get-refund/response-settlementaccountrefund/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/get-refund/response-settlementaccountrefund/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SettlementAccountRefundScheme[](#payment/settlement-accounts/get-refund/response-settlementaccountrefund/settlementaccountrefundscheme)

| Value | Description |
| --- | --- |
| SCHEME\_UNSPECIFIED | Default unspecified scheme. |
| FASTER\_PAYMENTS | Faster payments scheme. |
| SEPA\_INSTANT\_CREDIT\_TRANSFER | SEPA Instant Credit Transfer scheme. |
| SEPA\_CREDIT\_TRANSFER | SEPA Credit Transfer scheme. |
| BACS | BACS scheme. |
| CHAPS | CHAPS scheme. |

#### SettlementAccountRefundStatus[](#payment/settlement-accounts/get-refund/response-settlementaccountrefund/settlementaccountrefundstatus)

| Value | Description |
| --- | --- |
| PENDING | Default value. |
| COMPLETED | Refund was successful. |
| FAILED | Refund failed to complete. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Please check the error message for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | The merchant, account or refund specified could not be found. |
| default | An unexpected error response. |

## Get transaction[](#payment/settlement-accounts/get-transaction)

`GET /payment/v1/merchants/{merchantId}/accounts/{accountId}/transactions/{transactionId}`

Retrieves a specific transaction for a specific settlement account and merchant.

### Works with[](#payment/settlement-accounts/get-transaction/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `settlement-accounts:readonly` |
| Client token | `settlement-accounts` |

### Parameters[](#payment/settlement-accounts/get-transaction/parameters)

| Parameter | Description |
| --- | --- |
| merchantIdrequired | The id of the merchant. |
| accountIdrequired | The id of the account. |
| transactionIdrequired | The id of the transaction. |

### Query Parameters[](#payment/settlement-accounts/get-transaction/query-parameters)

| Parameter | Description |
| --- | --- |
| appIdEq | App id to filter transactions by. |

> Response Example

```
{
  "accountBalance": {
    "currencyCode": "GBP",
    "value": {
      "scale": "2",
      "unscaledValue": "400"
    }
  },
  "amount": {
    "currencyCode": "GBP",
    "value": {
      "scale": "2",
      "unscaledValue": "12300"
    }
  },
  "id": "817465f1-adbf-493b-bf7e-d167c39289ba",
  "merchantId": "bef35277-ec45-4445-a153-05dbb42390df",
  "metadata": {
    "key1": "value1",
    "key2": "value2"
  },
  "originalTransactionId": "",
  "payee": {
    "account": {
      "identifier": "00000070438943",
      "type": "SORT_CODE"
    },
    "name": "John Smith"
  },
  "payer": {
    "account": {
      "identifier": "00000070438943",
      "type": "SORT_CODE"
    },
    "name": "John Smith"
  },
  "paymentRequestId": "a4d82dd0901411ed9f8787175ad2c3e2",
  "reference": "Wdr7ad0feabb4ab",
  "timestamp": "2021-07-14T14:01:53Z",
  "type": "PAYIN"
}
```

### Response: SettlementAccountTransaction[](#payment/settlement-accounts/get-transaction/response-settlementaccounttransaction)

accountBalance `CurrencyDenominatedAmount`

The balance of the account after the transaction was made.

amount `CurrencyDenominatedAmount`

The amount of the transaction.

id `string`

The id of the transaction.

merchantId `string`

The id of the merchant.

metadata `object`

A key-value dictionary with custom metadata for the transaction.

originalTransactionId `string`

The id of the original transaction.

payee `AccountDetails`

Information about the payee.

payer `AccountDetails`

Information about the payer.

paymentRequestId `string`

The id of the payment request which is affiliated with this transaction.

reference `string`

The transaction reference.

timestamp `Date`

The date and time the transaction was processed.

type `SettlementAccountTransactionType`

The type of the transaction.

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/get-transaction/response-settlementaccounttransaction/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/get-transaction/response-settlementaccounttransaction/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### AccountDetails[](#payment/settlement-accounts/get-transaction/response-settlementaccounttransaction/accountdetails)

account `paymentAccountIdentifier`

Account details.

name `string`

Name of the account holder.

#### paymentAccountIdentifier[](#payment/settlement-accounts/get-transaction/response-settlementaccounttransaction/paymentaccountidentifier)

identifier `string`

Full account identifier as string.

type `AccountIdentifierType`

Account type - one of predefined values.

#### AccountIdentifierType[](#payment/settlement-accounts/get-transaction/response-settlementaccounttransaction/accountidentifiertype)

| Value | Description |
| --- | --- |
| ACCOUNT\_IDENTIFIER\_TYPE\_UNSPECIFIED | Default value. It should not occur. |
| SE | Account type used in SE. |
| IBAN | IBAN account type. |
| SORT\_CODE | Sort code account type used in UK. |

#### SettlementAccountTransactionType[](#payment/settlement-accounts/get-transaction/response-settlementaccounttransaction/settlementaccounttransactiontype)

| Value | Description |
| --- | --- |
| TRANSACTION\_TYPE\_UNSPECIFIED | Default value for transaction type when none of the other types can be assigned. |
| SWEEP | A scheduled payout to Merchant corporate account. |
| REFUND | Partial or full refund to the original payer of previously received funds. |
| PAYIN | Received payment which increases settlement account balance. |
| REVERT | A corrective transaction which reverses transaction made in error. |
| WITHDRAWAL | Payout to an end-user's bank account. |
| MERCHANT\_PAYIN | Received payment from the merchant's payout account. |
| EXTERNAL\_PAYIN | Received direct bank payment (outside Tink PIS). |
| TRANSFER | A payout from the account. |
| PAYMENT\_REVERSAL | The reversal of a payment from the account. Indicates that the payout has been reverted after being initially marked as succeeded. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Please check the error message for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | The merchant, account or transaction specified could not be found. |
| default | An unexpected error response. |

## Get withdrawalBeta[](#payment/settlement-accounts/get-withdrawal)

`GET /payment/v1/merchants/{merchantId}/accounts/{accountId}/withdrawals/{withdrawalId}`

Retrieves a specific withdrawal for a specific settlement account and merchant.

### Works with[](#payment/settlement-accounts/get-withdrawal/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `settlement-accounts:readonly` |
| Client token | `settlement-accounts` |

### Parameters[](#payment/settlement-accounts/get-withdrawal/parameters)

| Parameter | Description |
| --- | --- |
| merchantIdrequired | The id of the merchant. |
| accountIdrequired | The id of the account. |
| withdrawalIdrequired | The id of the withdrawal. |

> Response Example

```
{
  "accountId": "161ec210-721f-4df5-b21c-f78a9d4c1545",
  "amount": {
    "currencyCode": "EUR",
    "value": {
      "scale": "2",
      "unscaledValue": "5000"
    }
  },
  "createdTime": "2022-07-14T14:01:53Z",
  "id": "b58d313a-b778-4639-8e31-c9ffc35e2d01",
  "merchantId": "e06e47f1-8c88-47ee-9415-a4cde72ae598",
  "metadata": {
    "key1": "value1",
    "key2": "value2"
  },
  "reference": "Eup7ad0feabb4ab",
  "scheme": "SEPA_INSTANT_CREDIT_TRANSFER",
  "status": "COMPLETED",
  "transactionId": "7ad0feab-bd55-449d-aa7e-b3d3b9c62550",
  "updatedTime": "2022-07-14T14:09:53Z"
}
```

### Response: SettlementAccountWithdrawal[](#payment/settlement-accounts/get-withdrawal/response-settlementaccountwithdrawal)

Parameters for the settlement account withdrawal to be created. Use of an `Idempotency-Key` header is required when making this request. The header value must be a non empty string.

accountId `string` required readonly

Id of the settlement account.

amount `CurrencyDenominatedAmount` required

Amount to withdraw. Amount needs to be greater than or equal to 0.01 and less than or equal to available balance.

createdTime `Date` readonly

The date and time when the withdrawal was initiated.

id `string` readonly

Id of the withdrawal.

merchantId `string` required readonly

Id of the merchant.

metadata `object`

A key-value dictionary with custom metadata for the withdrawal. All keys and values must be strings. For privacy protection, it is not allowed to use this dictionary for storing personal data (e.g. names and addresses).

reference `string` required

External reference set by the merchant, must be between 6-18 characters long.

scheme `SettlementAccountWithdrawalScheme`

Scheme to be used for the withdrawal. Supported values are `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER` for EURO countries and `FASTER_PAYMENTS`, `BACS`, `CHAPS` for UK (GBP).

status `SettlementAccountWithdrawalStatus` readonly

Status of the withdrawal.

transactionId `string` required

Id of the transaction to determine payee.

updatedTime `Date` readonly

The date and time when the withdrawal was updated.

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/get-withdrawal/response-settlementaccountwithdrawal/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/get-withdrawal/response-settlementaccountwithdrawal/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SettlementAccountWithdrawalScheme[](#payment/settlement-accounts/get-withdrawal/response-settlementaccountwithdrawal/settlementaccountwithdrawalscheme)

| Value | Description |
| --- | --- |
| SCHEME\_UNSPECIFIED | Default unspecified scheme. |
| FASTER\_PAYMENTS | Faster payments scheme. |
| SEPA\_INSTANT\_CREDIT\_TRANSFER | SEPA Instant Credit Transfer scheme. |
| SEPA\_CREDIT\_TRANSFER | SEPA Credit Transfer scheme. |
| BACS | BACS scheme. |
| CHAPS | CHAPS scheme. |

#### SettlementAccountWithdrawalStatus[](#payment/settlement-accounts/get-withdrawal/response-settlementaccountwithdrawal/settlementaccountwithdrawalstatus)

| Value | Description |
| --- | --- |
| PENDING | Default value. |
| COMPLETED | Withdrawal was successful. |
| FAILED | Withdrawal failed to complete. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Please check the error message for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | The merchant, account or withdrawal specified could not be found. |
| default | An unexpected error response. |

## List accounts[](#payment/settlement-accounts/list-accounts)

`GET /payment/v1/merchants/{merchantId}/accounts`

List all settlement accounts for a given merchant.

### Works with[](#payment/settlement-accounts/list-accounts/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `settlement-accounts:readonly` |
| Client token | `settlement-accounts` |

### Parameters[](#payment/settlement-accounts/list-accounts/parameters)

| Parameter | Description |
| --- | --- |
| merchantIdrequired | The id of the merchant. |

### Query Parameters[](#payment/settlement-accounts/list-accounts/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSize | The maximum number of items to return. |
| pageToken | Token to the requested page. |
| appIdEq | App id to filter the accounts by. |

> Response Example

```
{
  "accounts": [
    {
      "accountIdentifier": {
        "identifier": "00000012345678",
        "type": "SORT_CODE"
      },
      "appId": "",
      "availableBalance": {
        "currencyCode": "GBP",
        "value": {
          "scale": "2",
          "unscaledValue": "271100"
        }
      },
      "balance": {
        "currencyCode": "GBP",
        "value": {
          "scale": "2",
          "unscaledValue": "276400"
        }
      },
      "countryCode": "GB",
      "currencyCode": "GBP",
      "id": "744cf927-29cd-475e-9ef2-2b11951d3cc9",
      "merchantId": "2c9ba5fd-cbdb-4ed5-84a4-01db5698f0d9",
      "name": "Account name",
      "payoutAccount": {
        "currencyCode": "GBP",
        "frequency": "MONTHLY",
        "identifier": {
          "identifier": "00000070438943",
          "type": "SORT_CODE"
        }
      },
      "reservedAmount": {
        "scale": "1",
        "unscaledValue": "100"
      },
      "status": "ENABLED",
      "type": "APP_ACCOUNT"
    }
  ],
  "nextPageToken": "MA=",
  "prevPageToken": "MA==",
  "totalSize": "1"
}
```

### Response: ListSettlementAccountsResponse[](#payment/settlement-accounts/list-accounts/response-listsettlementaccountsresponse)

accounts `array[SettlementAccount]` required

List of accounts owned by the merchant.

nextPageToken `string`

Token to the next page.

prevPageToken `string`

Token to the previous page.

totalSize `integer`

Total number of accounts.

#### SettlementAccount[](#payment/settlement-accounts/list-accounts/response-listsettlementaccountsresponse/settlementaccount)

accountIdentifier `paymentAccountIdentifier` readonly

The account identifier for the settlement account. Note that EUR accounts only support the use of IBAN and GBP accounts only support SORT\_CODE.

appId `string`

The app id of the account.

availableBalance `CurrencyDenominatedAmount` readonly

The available balance of the account.

balance `CurrencyDenominatedAmount` readonly

The balance of the account.

countryCode `string`

The country code (ISO 3166-1 alpha-2) of the desired location for the account. Optional.

currencyCode `string` required

The currency code of the account.

id `string` readonly

The id of the account.

merchantId `string` required

The merchant id tied to the account.

name `string` required

The name of the account. It should be the name of the company/shop of which the transaction is intended to.

payoutAccount `PayoutAccount`

The payout account affiliated with the account.

reservedAmount `ExactNumber`

The amount that will be reserved on the account for refunds and withdrawals.

status `SettlementAccountStatus` readonly

The status of the account.

type `SettlementAccountType` readonly

The account type.

#### paymentAccountIdentifier[](#payment/settlement-accounts/list-accounts/response-listsettlementaccountsresponse/paymentaccountidentifier)

identifier `string`

Full account identifier as string.

type `AccountIdentifierType`

Account type - one of predefined values.

#### AccountIdentifierType[](#payment/settlement-accounts/list-accounts/response-listsettlementaccountsresponse/accountidentifiertype)

| Value | Description |
| --- | --- |
| ACCOUNT\_IDENTIFIER\_TYPE\_UNSPECIFIED | Default value. It should not occur. |
| SE | Account type used in SE. |
| IBAN | IBAN account type. |
| SORT\_CODE | Sort code account type used in UK. |

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/list-accounts/response-listsettlementaccountsresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/list-accounts/response-listsettlementaccountsresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### PayoutAccount[](#payment/settlement-accounts/list-accounts/response-listsettlementaccountsresponse/payoutaccount)

currencyCode `string`

The currency code for the payout account.

frequency `PayoutAccountFrequency` required

The frequency indicating how often a payout should be performed.

identifier `paymentAccountIdentifier` required

The account identifier for the payout account. Note that EUR accounts only support the use of IBAN and GBP accounts only support SORT\_CODE.

#### PayoutAccountFrequency[](#payment/settlement-accounts/list-accounts/response-listsettlementaccountsresponse/payoutaccountfrequency)

| Value | Description |
| --- | --- |
| FREQUENCY\_UNSPECIFIED | Default unspecified frequency. Will result in no scheduled payouts. |
| DAILY | Daily will result in payouts every day. |
| WEEKLY | Weekly will result in payouts every Monday. |
| MONTHLY | Monthly will result in payouts the first day of the month. |

#### SettlementAccountStatus[](#payment/settlement-accounts/list-accounts/response-listsettlementaccountsresponse/settlementaccountstatus)

| Value | Description |
| --- | --- |
| STATUS\_UNSPECIFIED | Default unspecified status. |
| ENABLED | Indicating that the account is operating. |
| SUSPENDED | Indicating that the account was suspended. |
| TERMINATED | Indicating that the account was terminated. |

#### SettlementAccountType[](#payment/settlement-accounts/list-accounts/response-listsettlementaccountsresponse/settlementaccounttype)

| Value | Description |
| --- | --- |
| TYPE\_UNSPECIFIED | Default unspecified account type. |
| APP\_ACCOUNT | An individual account owned solely by a single merchant. |
| ACQUIRER\_ACCOUNT | A managed account with a primary owner and additional merchants. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Please check the error message for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| default | An unexpected error response. |

## List refunds[](#payment/settlement-accounts/list-refunds)

`GET /payment/v1/merchants/{merchantId}/accounts/{accountId}/refunds`

Lists the refunds for a specific settlement account and merchant.

### Works with[](#payment/settlement-accounts/list-refunds/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `settlement-accounts:readonly` |
| Client token | `settlement-accounts` |

### Parameters[](#payment/settlement-accounts/list-refunds/parameters)

| Parameter | Description |
| --- | --- |
| merchantIdrequired | The id of the merchant. |
| accountIdrequired | The id of the account. |

### Query Parameters[](#payment/settlement-accounts/list-refunds/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSize | The maximum number of items to return. |
| pageToken | Token to the requested page. |
| createdTimeLte | Date less than or equal operator. |
| createdTimeGte | Date greater than or equal operator. |
| referenceEq | Reference to filter the refunds by. |
| transactionIdEq | Transaction id to filter the refunds by. |

> Response Example

```
{
  "nextPageToken": "MA=",
  "prevPageToken": "MA==",
  "refunds": [
    {
      "accountId": "161ec210-721f-4df5-b21c-f78a9d4c1545",
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": "2",
          "unscaledValue": "5000"
        }
      },
      "createdTime": "2022-07-14T14:01:53Z",
      "id": "b58d313a-b778-4639-8e31-c9ffc35e2d01",
      "merchantId": "e06e47f1-8c88-47ee-9415-a4cde72ae598",
      "metadata": {
        "key1": "value1",
        "key2": "value2"
      },
      "reference": "Refund7ad0feabb4ab",
      "scheme": "SEPA_INSTANT_CREDIT_TRANSFER",
      "status": "COMPLETED",
      "transactionId": "7ad0feab-bd55-449d-aa7e-b3d3b9c62550",
      "updatedTime": "2022-07-14T14:08:53Z"
    }
  ],
  "totalSize": "1"
}
```

### Response: ListSettlementAccountRefundsResponse[](#payment/settlement-accounts/list-refunds/response-listsettlementaccountrefundsresponse)

nextPageToken `string`

Token to the next page.

prevPageToken `string`

Token to the previous page.

refunds `array[SettlementAccountRefund]` required

A list of refunds tied to an account.

totalSize `integer`

Total number of refunds.

#### SettlementAccountRefund[](#payment/settlement-accounts/list-refunds/response-listsettlementaccountrefundsresponse/settlementaccountrefund)

accountId `string` required readonly

Id of the settlement account.

amount `CurrencyDenominatedAmount` required

Amount to refund. Amount needs to be greater than or equal to 0.01 and less than or equal to transaction amount.

createdTime `Date` readonly

The date and time when the refund was initiated.

id `string` readonly

Id of the refund.

merchantId `string` required readonly

Id of the merchant.

metadata `object`

A key-value dictionary with custom metadata for the refund. All keys and values must be strings. For privacy protection, it is not allowed to use this dictionary for storing personal data (e.g. names and addresses).

reference `string` required

External reference set by the merchant, must be between 6-18 characters long.

scheme `SettlementAccountRefundScheme`

Scheme to be used for the refund. Supported values are `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER` for EURO countries and `FASTER_PAYMENTS`, `BACS`, `CHAPS` for UK (GBP).

status `SettlementAccountRefundStatus` readonly

Status of the refund.

transactionId `string` required

Id of the transaction to refund.

updatedTime `Date` readonly

The date and time when the refund was updated.

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/list-refunds/response-listsettlementaccountrefundsresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/list-refunds/response-listsettlementaccountrefundsresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SettlementAccountRefundScheme[](#payment/settlement-accounts/list-refunds/response-listsettlementaccountrefundsresponse/settlementaccountrefundscheme)

| Value | Description |
| --- | --- |
| SCHEME\_UNSPECIFIED | Default unspecified scheme. |
| FASTER\_PAYMENTS | Faster payments scheme. |
| SEPA\_INSTANT\_CREDIT\_TRANSFER | SEPA Instant Credit Transfer scheme. |
| SEPA\_CREDIT\_TRANSFER | SEPA Credit Transfer scheme. |
| BACS | BACS scheme. |
| CHAPS | CHAPS scheme. |

#### SettlementAccountRefundStatus[](#payment/settlement-accounts/list-refunds/response-listsettlementaccountrefundsresponse/settlementaccountrefundstatus)

| Value | Description |
| --- | --- |
| PENDING | Default value. |
| COMPLETED | Refund was successful. |
| FAILED | Refund failed to complete. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Please check the error message for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | The merchant or account specified could not be found. |
| default | An unexpected error response. |

## List transactions[](#payment/settlement-accounts/list-transactions)

`GET /payment/v1/merchants/{merchantId}/accounts/{accountId}/transactions`

Lists the transactions for a specific settlement account for a given merchant.

### Works with[](#payment/settlement-accounts/list-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `settlement-accounts:readonly` |
| Client token | `settlement-accounts` |

### Parameters[](#payment/settlement-accounts/list-transactions/parameters)

| Parameter | Description |
| --- | --- |
| merchantIdrequired | The id of the merchant. |
| accountIdrequired | The id of the account. |

### Query Parameters[](#payment/settlement-accounts/list-transactions/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSize | The maximum number of items to return. |
| pageToken | Token to the requested page. |
| timestampLte | Date less than or equal operator. |
| timestampGte | Date greater than or equal operator. |
| referenceEq | Reference to filter the transactions by. |
| paymentRequestIdEq | Payment request id to filter the transactions by. |
| typeEq | Type to filter the transactions by. |
| queryString | Query to filter the transactions by. |
| appIdEq | App id to filter the transactions by. |

> Response Example

```
{
  "nextPageToken": "MA=",
  "prevPageToken": "MA==",
  "totalSize": "1",
  "transactions": [
    {
      "accountBalance": {
        "currencyCode": "GBP",
        "value": {
          "scale": "2",
          "unscaledValue": "400"
        }
      },
      "amount": {
        "currencyCode": "GBP",
        "value": {
          "scale": "2",
          "unscaledValue": "12300"
        }
      },
      "id": "817465f1-adbf-493b-bf7e-d167c39289ba",
      "merchantId": "bef35277-ec45-4445-a153-05dbb42390df",
      "metadata": {
        "key1": "value1",
        "key2": "value2"
      },
      "originalTransactionId": "",
      "payee": {
        "account": {
          "identifier": "00000070438943",
          "type": "SORT_CODE"
        },
        "name": "John Smith"
      },
      "payer": {
        "account": {
          "identifier": "00000070438943",
          "type": "SORT_CODE"
        },
        "name": "John Smith"
      },
      "paymentRequestId": "a4d82dd0901411ed9f8787175ad2c3e2",
      "reference": "Wdr7ad0feabb4ab",
      "timestamp": "2021-07-14T14:01:53Z",
      "type": "PAYIN"
    }
  ]
}
```

### Response: ListSettlementAccountTransactionsResponse[](#payment/settlement-accounts/list-transactions/response-listsettlementaccounttransactionsresponse)

nextPageToken `string`

Token to the next page.

prevPageToken `string`

Token to the previous page.

totalSize `integer`

Total number of transactions.

transactions `array[SettlementAccountTransaction]` required

A list of transactions tied to an account.

#### SettlementAccountTransaction[](#payment/settlement-accounts/list-transactions/response-listsettlementaccounttransactionsresponse/settlementaccounttransaction)

accountBalance `CurrencyDenominatedAmount`

The balance of the account after the transaction was made.

amount `CurrencyDenominatedAmount`

The amount of the transaction.

id `string`

The id of the transaction.

merchantId `string`

The id of the merchant.

metadata `object`

A key-value dictionary with custom metadata for the transaction.

originalTransactionId `string`

The id of the original transaction.

payee `AccountDetails`

Information about the payee.

payer `AccountDetails`

Information about the payer.

paymentRequestId `string`

The id of the payment request which is affiliated with this transaction.

reference `string`

The transaction reference.

timestamp `Date`

The date and time the transaction was processed.

type `SettlementAccountTransactionType`

The type of the transaction.

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/list-transactions/response-listsettlementaccounttransactionsresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/list-transactions/response-listsettlementaccounttransactionsresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### AccountDetails[](#payment/settlement-accounts/list-transactions/response-listsettlementaccounttransactionsresponse/accountdetails)

account `paymentAccountIdentifier`

Account details.

name `string`

Name of the account holder.

#### paymentAccountIdentifier[](#payment/settlement-accounts/list-transactions/response-listsettlementaccounttransactionsresponse/paymentaccountidentifier)

identifier `string`

Full account identifier as string.

type `AccountIdentifierType`

Account type - one of predefined values.

#### AccountIdentifierType[](#payment/settlement-accounts/list-transactions/response-listsettlementaccounttransactionsresponse/accountidentifiertype)

| Value | Description |
| --- | --- |
| ACCOUNT\_IDENTIFIER\_TYPE\_UNSPECIFIED | Default value. It should not occur. |
| SE | Account type used in SE. |
| IBAN | IBAN account type. |
| SORT\_CODE | Sort code account type used in UK. |

#### SettlementAccountTransactionType[](#payment/settlement-accounts/list-transactions/response-listsettlementaccounttransactionsresponse/settlementaccounttransactiontype)

| Value | Description |
| --- | --- |
| TRANSACTION\_TYPE\_UNSPECIFIED | Default value for transaction type when none of the other types can be assigned. |
| SWEEP | A scheduled payout to Merchant corporate account. |
| REFUND | Partial or full refund to the original payer of previously received funds. |
| PAYIN | Received payment which increases settlement account balance. |
| REVERT | A corrective transaction which reverses transaction made in error. |
| WITHDRAWAL | Payout to an end-user's bank account. |
| MERCHANT\_PAYIN | Received payment from the merchant's payout account. |
| EXTERNAL\_PAYIN | Received direct bank payment (outside Tink PIS). |
| TRANSFER | A payout from the account. |
| PAYMENT\_REVERSAL | The reversal of a payment from the account. Indicates that the payout has been reverted after being initially marked as succeeded. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Please check the error message for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | The merchant or account specified could not be found. |
| default | An unexpected error response. |

## List withdrawalsBeta[](#payment/settlement-accounts/list-withdrawals)

`GET /payment/v1/merchants/{merchantId}/accounts/{accountId}/withdrawals`

Lists the withdrawals for a specific settlement account and merchant.

### Works with[](#payment/settlement-accounts/list-withdrawals/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `settlement-accounts:readonly` |
| Client token | `settlement-accounts` |

### Parameters[](#payment/settlement-accounts/list-withdrawals/parameters)

| Parameter | Description |
| --- | --- |
| merchantIdrequired | The id of the merchant. |
| accountIdrequired | The id of the account. |

### Query Parameters[](#payment/settlement-accounts/list-withdrawals/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSize | The maximum number of items to return. |
| pageToken | Token to the requested page. |
| createdTimeLte | Date less than or equal operator. |
| createdTimeGte | Date greater than or equal operator. |
| referenceEq | Reference to filter the withdrawals by. |
| transactionIdEq | Transaction id to filter the withdrawals by. |

> Response Example

```
{
  "nextPageToken": "MA=",
  "prevPageToken": "MA==",
  "totalSize": "1",
  "withdrawals": [
    {
      "accountId": "161ec210-721f-4df5-b21c-f78a9d4c1545",
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": "2",
          "unscaledValue": "5000"
        }
      },
      "createdTime": "2022-07-14T14:01:53Z",
      "id": "b58d313a-b778-4639-8e31-c9ffc35e2d01",
      "merchantId": "e06e47f1-8c88-47ee-9415-a4cde72ae598",
      "metadata": {
        "key1": "value1",
        "key2": "value2"
      },
      "reference": "Wdr7ad0feabb4ab",
      "scheme": "SEPA_INSTANT_CREDIT_TRANSFER",
      "status": "COMPLETED",
      "transactionId": "7ad0feab-bd55-449d-aa7e-b3d3b9c62550",
      "updatedTime": "2022-07-14T14:09:53Z"
    }
  ]
}
```

### Response: ListSettlementAccountWithdrawalsResponse[](#payment/settlement-accounts/list-withdrawals/response-listsettlementaccountwithdrawalsresponse)

nextPageToken `string`

Token to the next page.

prevPageToken `string`

Token to the previous page.

totalSize `integer`

Total number of withdrawals.

withdrawals `array[SettlementAccountWithdrawal]` required

A list of withdrawals tied to an account.

#### SettlementAccountWithdrawal[](#payment/settlement-accounts/list-withdrawals/response-listsettlementaccountwithdrawalsresponse/settlementaccountwithdrawal)

accountId `string` required readonly

Id of the settlement account.

amount `CurrencyDenominatedAmount` required

Amount to withdraw. Amount needs to be greater than or equal to 0.01 and less than or equal to available balance.

createdTime `Date` readonly

The date and time when the withdrawal was initiated.

id `string` readonly

Id of the withdrawal.

merchantId `string` required readonly

Id of the merchant.

metadata `object`

A key-value dictionary with custom metadata for the withdrawal. All keys and values must be strings. For privacy protection, it is not allowed to use this dictionary for storing personal data (e.g. names and addresses).

reference `string` required

External reference set by the merchant, must be between 6-18 characters long.

scheme `SettlementAccountWithdrawalScheme`

Scheme to be used for the withdrawal. Supported values are `SEPA_CREDIT_TRANSFER`, `SEPA_INSTANT_CREDIT_TRANSFER` for EURO countries and `FASTER_PAYMENTS`, `BACS`, `CHAPS` for UK (GBP).

status `SettlementAccountWithdrawalStatus` readonly

Status of the withdrawal.

transactionId `string` required

Id of the transaction to determine payee.

updatedTime `Date` readonly

The date and time when the withdrawal was updated.

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/list-withdrawals/response-listsettlementaccountwithdrawalsresponse/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/list-withdrawals/response-listsettlementaccountwithdrawalsresponse/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### SettlementAccountWithdrawalScheme[](#payment/settlement-accounts/list-withdrawals/response-listsettlementaccountwithdrawalsresponse/settlementaccountwithdrawalscheme)

| Value | Description |
| --- | --- |
| SCHEME\_UNSPECIFIED | Default unspecified scheme. |
| FASTER\_PAYMENTS | Faster payments scheme. |
| SEPA\_INSTANT\_CREDIT\_TRANSFER | SEPA Instant Credit Transfer scheme. |
| SEPA\_CREDIT\_TRANSFER | SEPA Credit Transfer scheme. |
| BACS | BACS scheme. |
| CHAPS | CHAPS scheme. |

#### SettlementAccountWithdrawalStatus[](#payment/settlement-accounts/list-withdrawals/response-listsettlementaccountwithdrawalsresponse/settlementaccountwithdrawalstatus)

| Value | Description |
| --- | --- |
| PENDING | Default value. |
| COMPLETED | Withdrawal was successful. |
| FAILED | Withdrawal failed to complete. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Please check the error message for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | The merchant or account specified could not be found. |
| default | An unexpected error response. |

## Update account[](#payment/settlement-accounts/update-account)

`PATCH /payment/v1/merchants/{account.merchantId}/accounts/{account.id}`

Updates the settlement account object, more specifically only the payout account object within can be updated.

### Works with[](#payment/settlement-accounts/update-account/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `settlement-accounts` |

### Parameters[](#payment/settlement-accounts/update-account/parameters)

| Parameter | Description |
| --- | --- |
| account.merchantIdrequired | The merchant id tied to the account. |
| account.idrequired | The id of the account. |

> Request Example

```
{
  "appId": "",
  "countryCode": "GB",
  "currencyCode": "GBP",
  "merchantId": "2c9ba5fd-cbdb-4ed5-84a4-01db5698f0d9",
  "name": "Account name",
  "payoutAccount": {
    "currencyCode": "GBP",
    "frequency": "MONTHLY",
    "identifier": {
      "identifier": "00000070438943",
      "type": "SORT_CODE"
    }
  },
  "reservedAmount": {
    "scale": "1",
    "unscaledValue": "100"
  }
}
```

### Request Body: SettlementAccount[](#payment/settlement-accounts/update-account/request-body-settlementaccount)

The new updated account.

Parameters for the settlement account to be created.

appId `string`

The app id of the account.

countryCode `string`

The country code (ISO 3166-1 alpha-2) of the desired location for the account. Optional.

currencyCode `string` required

The currency code of the account.

merchantId `string` required

The merchant id tied to the account.

name `string` required

The name of the account. It should be the name of the company/shop of which the transaction is intended to.

payoutAccount `PayoutAccount`

The payout account affiliated with the account.

reservedAmount `ExactNumber`

The amount that will be reserved on the account for refunds and withdrawals.

#### PayoutAccount[](#payment/settlement-accounts/update-account/request-body-settlementaccount/payoutaccount)

currencyCode `string`

The currency code for the payout account.

frequency `PayoutAccountFrequency` required

The frequency indicating how often a payout should be performed.

identifier `paymentAccountIdentifier` required

The account identifier for the payout account. Note that EUR accounts only support the use of IBAN and GBP accounts only support SORT\_CODE.

#### PayoutAccountFrequency[](#payment/settlement-accounts/update-account/request-body-settlementaccount/payoutaccountfrequency)

| Value | Description |
| --- | --- |
| FREQUENCY\_UNSPECIFIED | Default unspecified frequency. Will result in no scheduled payouts. |
| DAILY | Daily will result in payouts every day. |
| WEEKLY | Weekly will result in payouts every Monday. |
| MONTHLY | Monthly will result in payouts the first day of the month. |

#### paymentAccountIdentifier[](#payment/settlement-accounts/update-account/request-body-settlementaccount/paymentaccountidentifier)

identifier `string`

Full account identifier as string.

type `AccountIdentifierType`

Account type - one of predefined values.

#### AccountIdentifierType[](#payment/settlement-accounts/update-account/request-body-settlementaccount/accountidentifiertype)

| Value | Description |
| --- | --- |
| ACCOUNT\_IDENTIFIER\_TYPE\_UNSPECIFIED | Default value. It should not occur. |
| SE | Account type used in SE. |
| IBAN | IBAN account type. |
| SORT\_CODE | Sort code account type used in UK. |

#### ExactNumber[](#payment/settlement-accounts/update-account/request-body-settlementaccount/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

> Response Example

```
{
  "accountIdentifier": {
    "identifier": "00000012345678",
    "type": "SORT_CODE"
  },
  "appId": "",
  "availableBalance": {
    "currencyCode": "GBP",
    "value": {
      "scale": "2",
      "unscaledValue": "271100"
    }
  },
  "balance": {
    "currencyCode": "GBP",
    "value": {
      "scale": "2",
      "unscaledValue": "276400"
    }
  },
  "countryCode": "GB",
  "currencyCode": "GBP",
  "id": "744cf927-29cd-475e-9ef2-2b11951d3cc9",
  "merchantId": "2c9ba5fd-cbdb-4ed5-84a4-01db5698f0d9",
  "name": "Account name",
  "payoutAccount": {
    "currencyCode": "GBP",
    "frequency": "MONTHLY",
    "identifier": {
      "identifier": "00000070438943",
      "type": "SORT_CODE"
    }
  },
  "reservedAmount": {
    "scale": "1",
    "unscaledValue": "100"
  },
  "status": "ENABLED",
  "type": "APP_ACCOUNT"
}
```

### Response: SettlementAccount[](#payment/settlement-accounts/update-account/response-settlementaccount)

Parameters for the settlement account to be created.

accountIdentifier `paymentAccountIdentifier` readonly

The account identifier for the settlement account. Note that EUR accounts only support the use of IBAN and GBP accounts only support SORT\_CODE.

appId `string`

The app id of the account.

availableBalance `CurrencyDenominatedAmount` readonly

The available balance of the account.

balance `CurrencyDenominatedAmount` readonly

The balance of the account.

countryCode `string`

The country code (ISO 3166-1 alpha-2) of the desired location for the account. Optional.

currencyCode `string` required

The currency code of the account.

id `string` readonly

The id of the account.

merchantId `string` required

The merchant id tied to the account.

name `string` required

The name of the account. It should be the name of the company/shop of which the transaction is intended to.

payoutAccount `PayoutAccount`

The payout account affiliated with the account.

reservedAmount `ExactNumber`

The amount that will be reserved on the account for refunds and withdrawals.

status `SettlementAccountStatus` readonly

The status of the account.

type `SettlementAccountType` readonly

The account type.

#### paymentAccountIdentifier[](#payment/settlement-accounts/update-account/response-settlementaccount/paymentaccountidentifier)

identifier `string`

Full account identifier as string.

type `AccountIdentifierType`

Account type - one of predefined values.

#### AccountIdentifierType[](#payment/settlement-accounts/update-account/response-settlementaccount/accountidentifiertype)

| Value | Description |
| --- | --- |
| ACCOUNT\_IDENTIFIER\_TYPE\_UNSPECIFIED | Default value. It should not occur. |
| SE | Account type used in SE. |
| IBAN | IBAN account type. |
| SORT\_CODE | Sort code account type used in UK. |

#### CurrencyDenominatedAmount[](#payment/settlement-accounts/update-account/response-settlementaccount/currencydenominatedamount)

currencyCode `string`

The currency code which follows ISO-4217 standard.

value `ExactNumber`

The value representation of the monetary amount.

#### ExactNumber[](#payment/settlement-accounts/update-account/response-settlementaccount/exactnumber)

scale `string`

The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `string`

The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### PayoutAccount[](#payment/settlement-accounts/update-account/response-settlementaccount/payoutaccount)

currencyCode `string`

The currency code for the payout account.

frequency `PayoutAccountFrequency` required

The frequency indicating how often a payout should be performed.

identifier `paymentAccountIdentifier` required

The account identifier for the payout account. Note that EUR accounts only support the use of IBAN and GBP accounts only support SORT\_CODE.

#### PayoutAccountFrequency[](#payment/settlement-accounts/update-account/response-settlementaccount/payoutaccountfrequency)

| Value | Description |
| --- | --- |
| FREQUENCY\_UNSPECIFIED | Default unspecified frequency. Will result in no scheduled payouts. |
| DAILY | Daily will result in payouts every day. |
| WEEKLY | Weekly will result in payouts every Monday. |
| MONTHLY | Monthly will result in payouts the first day of the month. |

#### SettlementAccountStatus[](#payment/settlement-accounts/update-account/response-settlementaccount/settlementaccountstatus)

| Value | Description |
| --- | --- |
| STATUS\_UNSPECIFIED | Default unspecified status. |
| ENABLED | Indicating that the account is operating. |
| SUSPENDED | Indicating that the account was suspended. |
| TERMINATED | Indicating that the account was terminated. |

#### SettlementAccountType[](#payment/settlement-accounts/update-account/response-settlementaccount/settlementaccounttype)

| Value | Description |
| --- | --- |
| TYPE\_UNSPECIFIED | Default unspecified account type. |
| APP\_ACCOUNT | An individual account owned solely by a single merchant. |
| ACQUIRER\_ACCOUNT | A managed account with a primary owner and additional merchants. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 400 | The request does not pass validation. Please check the error message for more information. |
| 401 | The scopes associated with the access token is not allowed the resource. |
| 403 | The resource does not belong to subject associated with the access token. |
| 404 | The merchant or account specified could not be found. |
| default | An unexpected error response. |
