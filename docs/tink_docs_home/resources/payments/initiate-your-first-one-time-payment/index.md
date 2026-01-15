---
title: "Initiate your first one-time payment"
source: "/Tiny-doc/tink_docs_home/resources/payments/initiate-your-first-one-time-payment/"
exportedAt: "2026-01-13T12:56:40.344Z"
---
In this guide, we’ll walk you through the end-to-end one-time payments journey. To initiate, execute and track your first one-time payment, you’ll follow these steps in order:

1.  [Authenticate your client](#authenticate-your-client)
2.  [Create a payment request](#create-a-payment-request)
3.  [Build a Tink URL for your end users](#build-a-tink-link-url)
4.  [Handle the callback](#handle-the-callback)
5.  [Check the payment status](#check-the-payment-status)

## Authenticate your client[](#authenticate-your-client)

To access your user's account information, generate a client access token with the scopes `payment:read` and `payment:write`.

### Example authentication request[](#example-authentication-request)

Authenticate your client

```
curl -X POST [external url removed] \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=payment:read,payment:write'
```

### Example response[](#example-response)

```
{
  "token_type" : "bearer",
  "expires_in" : 1799,
  "access_token" : "{YOUR_CLIENT_ACCESS_TOKEN}",
  "scope" : "payment:read,payment:write",
  "id_hint" : null
}
```

## Create a payment request[](#create-a-payment-request)

A payment request is an object with all the information about the payment, the payer, and the recipient needed to execute the payment. No money is moved when you make a payment request. To execute the payment, your user needs to give their consent.

To create a payment request, make a POST request to the `[external url removed] endpoint. In our example, we'll create a payment request for a recipient in Italy. For code examples for other markets, see [market-specific information](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments-market-specific-information/).

### Example payment request[](#example-payment-request)

Create a payment request

```
curl -v -X POST [external url removed] \
    -H 'Authorization: Bearer ' \
    -H 'Content-Type: application/json' \
    -d '{
        "recipient": {
             "accountNumber": "IT60X0542811101000000123456", 
              "accountType": "iban"
        },
        "amount": 10,
        "currency": "EUR",
        "market": "IT",
        "recipientName": "Test AB",
        "sourceMessage": "Payment for Gym Equipment",
        "remittanceInformation": {
            "type": "UNSTRUCTURED",
            "value": "CREDITOR REFERENCE"
        },
        "paymentScheme": "SEPA_CREDIT_TRANSFER"
        }'
```

When you call this endpoint, it validates and stores your payment request. A successful request returns the values you provided in your request along with a unique `id`, which you’ll use later as your `payment_request_id` when initiating and tracking the payment.

An unsuccessful request will return an error. For more information on errors, see [one-time payments request errors](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/handle-one-time-payments-sdk-error-codes/#request-creation-error-codes).

### Example payment request response[](#example-payment-request-response)

```
{
    "id": "18408f41163f4748b87da9b9a68b6df8",
    "amount": 10,
    "currency" : "EUR",
    "market": "IT",
    "sourceMessage": "Payment for Gym Equipment",
    "recipientName": "Test AB",
    "remittanceInformation" : {
        "type": "UNSTRUCTURED",
        "value": "CREDITOR REFERENCE"
    },
    "recipient": {
        "accountNumber": "IT60X0542811101000000123456",
        "type": "iban"
    },
    "paymentScheme": "SEPA_CREDIT_TRANSFER"
}
```

For more information, see the [create payment request endpoint](/Tiny-doc/tink_docs_api/api/#payment/payment-request/create-payment-request) in our API reference.

## Build a Tink Link URL[](#build-a-tink-link-url)

The Tink Link URL launches the interface that your users will use to initiate their payment. It handles bank selection, authentication, payment execution and any eventual errors, and redirects the user to your app when they’re done.

To build a URL, use the link builder in Console. The URL is configurable and exposes many parameters you can use to limit and guide users according to your requirements.

You can find all available parameters in the [One-time payments SDK reference](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments-sdk-reference/).

> To learn how to launch the Tink Link from your app, see our integration guide for [Android](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/), [iOS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-ios-apps/) or [web apps](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-web-apps/).

For this example, use our example Tink Link URL and insert your `client_id` and the `id` from the payment request you just created.

This example uses a test bank and a test user account. If you'd like to try a different market, or even a real bank, generate custom links by following the steps in the link builder in Console.

### Example Tink Link URL[](#example-tink-link-url)

Demo Tink URL

```
[external url removed]
```

When your users access the URL, they're prompted to authenticate with their bank and then choose a bank account. For this example, you can use demo-user credentials in **Console** > **Demo Bank**. Select the username and password for a Demo Bank user that suits your use case.

## Handle the callback[](#handle-the-callback)

When a user reaches the end of a flow, they're redirected to the callback URI that you've provided in the URL.

A successful callback has this structure:

```
{YOUR_CALLBACK_URI}?payment_request_id={YOUR_ID}
```

### Example Tink Link response[](#example-tink-link-response)

```
[external url removed]
```

If you don't receive a callback with the `id` value, that means the flow has failed to complete. This is typically because the user didn't successfully authenticate with their bank, didn't have any valid accounts with the bank they selected, or exited the flow.

For more information about errors, see [one-time payments error codes](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/handle-one-time-payments-sdk-error-codes/).

## Check the payment status[](#check-the-payment-status)

When a payment status is created, transfer information is linked to `payment_request_id`. To fetch the value, make a GET request to the `[external url removed] endpoint.

If you’re using Verified Payments, you’ll also receive the `payerName` as part of the `source` object.

### Example payment status request[](#example-payment-status-request)

Check payment status

```
curl -v -X GET [external url removed] \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json'
```

### Example payment status response[](#example-payment-status-response)

```
{ 
  "paymentRequestCreatedTransfers": [ 
   { 
       "recipient": { 
          "accountNumber": "IT60X0542811101000000123456", 
          "type": "iban" 
       }, 
       "amount": 10, 
       "currency": "EUR", 
       "market": "IT", 
       "recipientName": "Test AB", 
       "sourceMessage": "Payment for Gym Equipment", 
       "remittanceInformation": { 
           "type": "UNSTRUCTURED", 
           "value": "CREDITOR REFERENCE" 
       }, 
       "providerName": "it-test-open-banking-redirect", 
       "source": { 
           "accountNumber": "string", 
           "payerName": "string", // only available with Verified Payments 
           "type": "string", 
           "uri": "string" 
       }, 
       "status": "SENT", 
       "statusMessage": "Payment is sent to your bank", 
       "created": "1553095951000", 
       "updated": "1553169600000" 
    }, 
    { 
       ... 
    }
  ] 
} 
```

For more information about the endpoint, see the [PaymentRequestTransfersResponse](/Tiny-doc/tink_docs_api/api-payment/#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse) in our API reference and [Notifications and webhooks](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/one-time-payments-notifications-and-webhooks/).
