---
title: "Initiate your first bulk payment"
source: "/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/initiate-your-first-bulk-payment/"
exportedAt: "2026-01-13T12:41:55.016Z"
---
## 1\. Create all your one-time payment requests[](#create-all-your-one-time-payment-requests)

To create a bulk payment request, you first need to create each payment that you want to include in the bulk payment request. To create single-payment requests, use the POST `https://api.tink.com/api/v1/payments/requests`.

Each payment request:

-   Must match `market` and `currency` parameters all other payment requests
-   Must match the `paymentScheme` parameter, if used
-   Can't have been initiated previously

[Make your first payment request](/Tiny-doc/tink_docs_home/resources/payments/start-payment/#create-a-payment-request)

[See the payment request API reference](/Tiny-doc/tink_docs_api/api/#payment/payment-request/create-payment-request)

## 2\. Create a bulk payment request[](#create-a-bulk-payment-request)

To create a bulk payment, use the `POST https://api.tink.com/payment/v1/bulk-payments` endpoint with a list of payment ids as the `paymentRequestIds` parameter.

Bulk payment requests are immutable, meaning you can’t add or remove payment ids once the bulk payment request has been created.

A valid paymentRequestIds list includes between 2 and 100 unique `paymentRequestIds`. However, banks may set their own limits on the number of `paymentRequestIds` or the total value of the bulk payment that they'll accept per bulk payment request.

To see these limits, call the [payment conditions endpoint](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/payment-conditions-one-time-payments/). For a given bank, `BULK_PAYMENT_MAX_TOTAL_AMOUNT` tells you the bank’s limit on the bulk payment transaction value. `BULK_PAYMENT_MAX_PAYMENTS` tells you how many payment requests can be included in `paymentRequestIds`.

**Example request**

```
curl -v -X POST https://api.tink.com/api/payment/v1/bulk-payments \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' \
   -d '{
        "paymentRequestIds": [
           "18408f41163f4748b87da9b9a68b6df8",
           "wuvt19hzvt5ne6o0voc6hjt2he68i8hs",
           ...
        ]
  }'
```

When calling this endpoint, Tink will validate and store the bulk payment and issue a response including the `paymentRequestIds` you provided together with an `id`.

**Example response**

```
{
  "id": "dc0cf17bf6fe43de9897a644a48e6005",
  "paymentRequestIds": [
     "18408f41163f4748b87da9b9a68b6df8",
     "wuvt19hzvt5ne6o0voc6hjt2he68i8hs",
      ...
  ]
}
```

[See the bulk payment request API reference](/Tiny-doc/tink_docs_api/api-payment/#payment/bulk-payment)

## 3\. Build a Bulk Payment URL[](#build-a-bulk-payment-url)

Integrate Tink with your application by redirecting your user to a Payments URL using the `https://link.tink.com/1.0/pay/bulk` endpoint.

**Example Bulk Payment URL** `https://link.tink.com/1.0/pay/bulk?client_id={CLIENT_ID}&redirect_uri={REDIRECT_URL}&market={MARKET}&locale={LOCALE}&payment_request_id={PAYMENT_REQUEST}`

The `PAYMENT_REQUEST_ID` is the `id` that Tink returned in the response to the [create a bulk payment request step](#create-a-bulk-payment-request). The `market` parameter must match the `market` for each payment request associated with the `PAYMENT_REQUEST_ID`.

[See the Payments SDK reference](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-api-reference-payment-initiation/)

### Optimizing bank selection[](#optimizing-bank-selection)

If you know the user’s provider, and that provider supports bulk payments, then you can [skip the bank selection step](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/payments-flow-optimization-bank-selection/) of the payments flow by including the `input_provider` parameter in your Payments URL.

To see which providers support bulk payments, [query the providers endpoint](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider) using `pisCapabilities=PIS_BULK_PAYMENTS`.

**Example providers request**

```
curl -v -X GET https://api.tink.com/v1/providers?pisCapabilities=PIS_BULK_PAYMENTS
```

**Example response**

```
{
  "providers": [
    {
      ...
      "financialInstitutionId": "
1234567-1234-1234-1234-123456789123",
      "financialInstitutionName": "Bink",
      ...
      "pisCapabilities": [
        ...
        "PIS_BULK_PAYMENTS",
        ...
      ],
    }
  ]
} 
```

### Optimizing with sessions[](#optimizing-with-sessions)

If you know the user’s source account, you can [preselect the account](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/payments-flow-optimization-source-account-preselection/) using a Tink Link session.

If you know the user’s personal identifier, such as their social security number, you can [prefill this information](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/consent-and-authentication-one-time-payments/#initiating-authentication) using the same session.

If you’re passing data through a session, be sure to include the `session_id` as a parameter in your Bulk Payment URL.

**Example session request**

```
  curl -X POST https://api.tink.com/link/v1/session \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  -d '{"source_account_number": "se://12340011223"}' \
  -d '{"personalIdentifier": "199404101234"}'
```

**Example response**

```
  HTTP/ 1.1 200 OK
  Content-Type: application/json
  {
    "sessionId": "{SESSION_ID}"
  }
```

[See the sessions API reference](/Tiny-doc/tink_docs_api/api-general/#general/tink-link/session)

## 4\. Initiate the bulk payment[](#initiate-the-bulk-payment)

When you’ve created a URL, [test it with the Demo Bank](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/test-different-one-time-payment-scenarios/#demo-bank).

A successfully initiated payment redirects to the `redirect_uri` provided in your Bulk Payment URL, and includes the `payment_request_id` for your bulk payment as a query parameter.

**Example redirect URL**

```
{YOUR_REDIRECT_URI}?payment_request_id=18408f41163f4748b87da9b9a68b6df8
```

## 5\. Check bulk payment statuses and details[](#check-bulk-payment-statuses-and-details)

To view the status of your bulk payment, along with the statuses and details of all single payments included in the bulk payment request, use `GET https://api.tink.com/payment/v1/bulk-payments/{id}`, where `id` is the `payment_request_id` for your bulk payment.

[See the bulk payments API reference](/Tiny-doc/tink_docs_api/api/#payment/bulk-payment/get-bulk-payment)

**Note**: webhooks are currently not supported for bulk payments.

**Example request**

```
   curl -v -X GET .../bulk-payments/{id}?view=FULL \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json' 
```

**Example response**

```
{
  "id": "dc0cf17bf6fe43de9897a644a48e6005",
  "status": "SENT",
  "paymentRequests": [
    {
      "id": "18408f41163f4748b87da9b9a68b6df8",
      "amount": 10,
      "currency": "SEK",
      "status": "SENT",
      "statusMessage": "Payment successfully initiated",
      "destinations": [
        {
          "accountNumber": "33008808080808",
          "type": "SE_PG"
        }
      ],
      "executionDate": "2022-05-20",
      "market": "SE",
      "merchantId": "17697670-aed1-40d7-9084-daee87539f3d",
      "paymentScheme": "PAYMENT_SCHEME_UNSPECIFIED",
      "providerName": "se-nordea-ob",
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
      "created": 1674158472000,
      "updated": 1674220425783
    },
    {
      "id": "ecad584cd7444494a88bfdc2eda875c6",
      "amount": 5.99,
      "currency": "SEK",
      "status": "SENT",
      "statusMessage": "Payment successfully initiated",
      "destinations": [
        {
          "accountNumber": "32438808083311",
          "type": "SE_PG"
        }
      ],
      "executionDate": "2022-05-20",
      "market": "SE",
      "merchantId": "17697670-aed1-40d7-9084-daee87539f3d",
      "paymentScheme": "PAYMENT_SCHEME_UNSPECIFIED",
      "providerName": "se-swedbank-ob",
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
      "created": 1674158472000,
      "updated": 1674220479791
    }
  ]
}
```
