---
title: "Notifications and webhooks - Tink Docs"
source: "https://docs.tink.com/resources/payments/one-time-payments-notifications-and-webhooks"
exportedAt: "2026-01-13T12:53:30.339Z"
---
Configure a webhook by using the [Events v2](https://docs.tink.com/api#events-v2) API. Define at least one endpoint and a list of events, and you're done. This must be done at least once per app. When you've set up a webhook, Tink will notify you every time an event occurs for each Tink user of your app.This document contains everything you need to get started with setting up webhooks for Payments. This document includes the following sections:

-   [Set up a webhook](#set-up-a-webhook)
-   [Webhook signature validation](#webhook-signature-validation)
-   [Receive webhook events using Mutual TLS authentication](#receive-webhook-events-using-mutual-tls-authentication)
-   [Event: Payment updated](#event-payment-updated)
-   [Reconciliation](#reconciliation)

## Set up a webhook[](#set-up-a-webhook)

Configure a webhook by using the [Events v2](https://docs.tink.com/api#events-v2) API. Define at least one endpoint and a list of events, and you're done. This must be done at least once per app. When you've set up a webhook, Tink will notify you every time an event occurs for each Tink user of your app and for events that occur without user context.

**Note**: different webhook events may have additional requirements. Eventual requirements are described at the top of each event.

## 1\. Expose an endpoint on your server[](#expose-an-endpoint-on-your-server)

Set up your own endpoint to receive notifications. The endpoint should be a publicly-accessible URL that can receive POST requests from Tink. The event payload is sent in the request body.

**Endpoint example:** `https://endpoint.yourdomain.com/webhook`

## 2\. Generate a client access token[](#generate-a-client-access-token)

Follow the instructions in this section to authorize access to your backend client. The process generates a client access token that can be used to modify users that are connected to your `client_id`. Remember that your `client_secret` should be kept a secret: only use it to authenticate with the Tink platform and don’t share it outside your organization.

**Request example:**

Authorize access to your backend client

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=webhook-endpoints'
```

**Response**: [Access Token Response](https://tools.ietf.org/html/rfc6749#section-5.1) for a client which expires after 30 mins (no refresh token provided, use the same endpoint again to get a new access token). The token must also be kept a secret and not exposed to any public client.

**Response example:**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope": "authorization:grant"
}
```

## 3\. Use the Events API[](#use-the-events-api)

Set up the webhook by using your `client access token` to call the Tink API. For more information about the fields for this request, see [Request Body: CreateWebhookEndpointRequest](https://docs.tink.com/api#events-v2/webhook/create-webhook-endpoint/request-body-createwebhookendpointrequest).

**Request example:**

Set up the webhook

```
curl -v -X POST https://api.tink.com/events/v2/webhook-endpoints \
-H 'Authorization: Bearer ' \
-d '{ "description": "My webhook", "disabled": false, "enabledEvents": ["payment:updated"], "url": "https://endpoint.example.com/webhook" }'
```

**Response example:**

```
{
    "createdAt": "2022-05-26T07:54:41.725408Z",
    "description": "My webhook",
    "disabled": false,
    "enabledEvents": [
        "payment:updated"
    ],
    "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
    "secret": "string",
    "updatedAt": "2022-05-26T07:54:41.725408Z",
    "url": "https://endpoint.example.com/webhook"
}
```

Store the `secret` value safely as it can't be retrieved again. Use the secret to verify the signature of incoming notifications. For more information, see [Webhook signature validation](#webhook-signature-validation) and the [Events API](https://docs.tink.com/api#events-v2) API reference.

## Message structure[](#message-structure)

A webhook that's sent to you has this JSON structure:

| Field | Description |
| --- | --- |
| context | Specifies optional metadata about the context the event refers to, for example user IDs. |
| content | Contains detailed information about the particular event. The structure of the content varies depending on the event type. |
| event | Specifies the event type for the information contained in the `content` field. |

**Example**

```
{
    "context": {
        "externalUserId": "f1b3688c649946cc8ee163d1554e853e",
        "userId": "3db31bdcc75555c4f0b8952984a9bd4f"
    },
    "content": {
        "credentialsId": "9sd7f9kak102783dkd11j242hmhja8",
        "credentialsStatus": "STATUS_UPDATED",
        "finished": 1618395156625,
        "sessionExpiryDate": 1654623101000,
        "source": "OPERATION_SOURCE_BACKGROUND",
        "status": "STATUS_UPDATED"
    },
    "event" : "refresh:finished"
}
```

## Available event[](#available-event)

| Event | Description |  |
| --- | --- | --- |
| `payment:updated` | This event is triggered when any transfer corresponding to any existing payment for any of your app's users has been updated. |  |

## Webhook signature validation[](#webhook-signature-validation)

When you use the Events API, Tink signs notifications that are sent to your webhook endpoint. This section describes how you can verify the signature.

## Prerequisite[](#prerequisite)

You have set up webhooks for your app and stored your `secret` value. If you're not sure about these things, see [Use the Events API](#use-the-events-api).

## Introduction[](#introduction)

Tink signs every message that's delivered via the [Events V2](https://docs.tink.com/api#events-v2/webhook/create-webhook-endpoint) webhook with a signature header that's added to the outgoing HTTP request.

When using the Events V2 API, we recommend you to implement signature verification to validate the authenticity of an incoming request.

## How to verify a signature[](#how-to-verify-a-signature)

The incoming request includes a `X-Tink-Signature` header. This header consists of two properties that are separated by a comma. The first property is the timestamp (UNIX timestamp format), with the key `t`, followed by the actual message signature key that's prefixed by `v1`.

Example of header:

```
X-Tink-Signature: t=1620198421,v1=8a19c43be75fa428d09e99c13f52bbbe4e924f9ef6cf6aaf4b1414f3bd280233
```

### 1\. Extract the timestamp and signatures from the header[](#extract-the-timestamp-and-signatures-from-the-header)

Parse the header contents to extract the timestamp `t` and the signature values `v`. Make sure that your implementation ignores any other values.

**JavaScript example:**

```
let header = "t=1620198421,v1=8a19c43be75fa428d09e99c13f52bbbe4e924f9ef6cf6aaf4b1414f3bd280233";
let keyValues = header.split(",");
let validKeys = ["t", "v1"]
let values = 
    keyValues.map(kv => kv.split("="))
             .filter(kv => validKeys.includes(kv[0]))
             .flatMap(kv => kv[1])

// ["1620198421", "8a19c43be75fa428d09e99c13f52bbbe4e924f9ef6cf6aaf4b1414f3bd280233"]
```

### 2\. Calculate the expected signature[](#calculate-the-expected-signature)

To validate the signature, you must recreate it on your end and then compare it. To create a signature, three elements are used:

-   The secret (that you stored when setting up the webhook)
-   The timestamp of the request (which is the `t` value in the header)
-   The body of the request, exactly as you received it

> In this context, **request body** refers to the content that appears immediately after the request headers. In most frameworks and languages, there are helpers to retrieve the raw incoming request body.

The signature is the result of the concatenation of `timestamp` as extracted from the header, followed by a dot, and then followed by the entire body of the incoming `request`. Take this and sign it with a specific encryption function. First, build the message to sign:

```
let timestamp = "1620198421";
let requestBody = '{"context": {...}, "event": "...",  "content": {...}}';

let messageToSign = timestamp + "." + requestBody;
```

Once you have done that, you need to encrypt it using the secret that you know:

```
let crypto = require("crypto")

let secret = "top_secret_top_secret_top_secret"

let signature = crypto.createHmac("sha256", secret).update(messageToSign).digest("hex")

// Result: 8a19c43be75fa428d09e99c13f52bbbe4e924f9ef6cf6aaf4b1414f3bd280233
```

### 3\. Compare the signatures[](#compare-the-signatures)

Compare the expected signature with the incoming signature. These should match exactly. If these do not match, it signals that something is wrong; it could be that the implementation is incorrectly made, the secret you stored is not the right one, or someone is pretending to be Tink. If the two signatures don't match, you should discard the information and ignore the request.

The timestamp can be used to discard messages older than a set threshold. Consider keeping the threshold at no less than 5 minutes to allow for retries of failed message deliveries.

## Receive webhook events using Mutual TLS authentication[](#receive-webhook-events-using-mutual-tls-authentication)

## Prerequisite[](#prerequisite)

This feature is only available for Enterprise customers.

## Set up mutual TLS authentication[](#set-up-mutual-tls-authentication)

Mutual TLS authentication (mTLS), is a part of the TLS handshake protocol for performing certificate-based authentication of a client. Regular TLS only authenticates the server, but mTLS authenticates both the server and client. This is done by having each party prove possession of their mutually approved key material.

Tink's webhook service automatically authenticates itself using its key material when prompted by a receiving server. To configure your servers to do this, find out how to enable mTLS in server software that receives webhook events. Ensure that your application trusts all of DigiCert's root authorities:

-   [DigiCert's root certificates](https://www.digicert.com/kb/digicert-root-certificates.htm)

Tink's webhook service provides both its own client certificate and DigiCert's intermediate CA certificates, which allows you to verify the full certificate chain by only using DigiCert's root certificate.

To narrow down the DigiCert-issued certificate that is issued specifically for Tink, your server **must** validate that the incoming client certificate contains at least one of these X.509 certificate attributes:

-   Subject: `C=SE, L=Stockholm, O=Tink AB, CN=api.tink.com`
-   Subject Alternative Name: `DNS:api.tink.com`

## Event: Payment updated[](#event-payment-updated)

It's possible to use [webhooks](https://docs.tink.com/api#events-v2) to subscribe to a `payment:updated` event. The event notifies you when any transfer that corresponds to any of your app's payments is updated.

For details on how to subscribe to webhooks, see [Set up a webhook](#set-up-a-webhook).

## Event logic[](#event-logic)

The `payment:updated` event is fired when any transfer that corresponds to any existing payment for any of your app's users is updated. This happens whenever payment status changes to one of the terminal statuses that are described in [Payment status transitions](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-status-transitions).

## Event content[](#event-content)

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| id | string | The identifier of the transfer. This identifier is also present on each transfer in [transfers for a payment request.](https://docs.tink.com/api#payment/payment-request/get-transfers-for-payment-request) | Yes |
| paymentRequestId | string | The identifier of the payment request. This identifier is also present on [payment request response.](https://docs.tink.com/api#payment/payment-request/create-payment-request/response-paymentrequestresponse) | Yes |
| amount | number | The payment amount. | Yes |
| currency | string | The currency of the payment amount. | Yes |
| paymentScheme | string | The payment scheme that was eventually used for the transfer. | Yes |
| destination | [PaymentDestinationDTO](https://docs.tink.com/api-payment#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/paymentdestinationdto) | The destination object. | Yes |
| source | [PaymentSourceDTO](https://docs.tink.com/api-payment#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/paymentsourcedto) | The source object. Only returned if available from the bank response. | No |
| providerName | string | The provider (financial institution) that the payer's account belongs to. | Yes |
| recipientName | string | The recipient name shown to the payer on signing payments. | Yes |
| sourceMessage | string | The transaction description on the payers account for the payment. | No |
| status | string | Current status of the payment. The value of this field is set to one of the [terminal statuses](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-status-transitions). Example values: `SENT`, `FAILED`, `CANCELLED`, `SETTLED` etc. | Yes |
| statusMessage | string | A message explaining the current status of the payment. | Yes |
| created | Date | The creation timestamp of a bank transfer for the payment request. | No |
| updated | Date | The update timestamp of a bank transfer for the payment request. | No |
| remittanceInformation | [RemittanceInformationDTO](https://docs.tink.com/api-payment#payment/payment-request/get-transfers-for-payment-request/response-restcreatedtransfersresponse/remittanceinformationdto) | The structured or unstructured remittance information for the payment request. Use for reconciliation purposes. | Yes |
| metadata | object | A key-value dictionary with custom metadata for the settlement account payment request. All keys and values must be strings. For privacy protection, it is not allowed to use this dictionary for storing personal data (e.g. names and addresses). | No |
| payerInformation **(deprecated)** | object | Contains name, accountIdentifier of the payer | No |

## Example[](#example)

This is an example of a `payment:updated` event.

```
{
  "context" : {
    "userId" : "3db31bdcc75555c4f0b8952984a9bd4f"
    "externalUserId" : "123456"
  },
  "event" : "payment:updated",
  "content" : {
      "id": "40dc04e5353547378c84f34ffc88f853",
      "paymentRequestId": "18408f41163f4748b87da9b9a68b6df8",
      "amount": 10,
      "currency": "SEK",
      "paymentScheme": "PAYMENT_SCHEME_UNSPECIFIED",
      "destination": {
        "accountNumber": "4578-3748",
        "type": "se-pg"
      },
      "source": {
        "accountNumber": "3300-8808080808",
        "type": "se",
        "uri": "se://33008808080808",
        "payerName": "Tom John" // only available with Verified Payments
      },
      "providerName": "handelsbanken-bankid",
      "recipientName": "Test AB",
      "sourceMessage": "Payment for Gym Equipment",
      "status": "SENT",
      "statusMessage": "The payment has been sent to your bank",
      "created": 1553095951000,
      "updated": 1553169600000,
      "remittanceInformation":  {
          "type": "OCR",
          "value": "3245928392092"
        },
      "metadata": {
          "key1": "value1",
          "key2": "value2"
        },
      "payerInformation": { // only available with Verified Payments
          "name": "Tom John",
          "accountIdentifier": "3300-8808080808"
       }
    }
}
```

## Reconciliation[](#reconciliation)

Payment reconciliation is all about keeping track of expenses and income. Tink makes this process smooth by offering ways to check initiated payment statuses, handle remittance and reconcile incoming payments.

A successfully initiated payment via Payment Initiation Services (PIS) offers the same security and guarantee as if it were submitted by an end user via their own bank. However, this does not guarantee payment success, which is why it's important to reconcile payments on a payee account.

Tink helps you to perform reconciliation by adding a unique ID in your remittance information to identify individual payments. This allows you to get the status for each initiated PIS journey.

Reconciliation is performed on the payee account by matching received payments with those that are initiated via Tink.

Set up reconciliation via Tink in three stages.

## Set up remittance[](#set-up-remittance)

First, use our [payment request model](https://docs.tink.com/api#payment/payment-request) to set your remittance information. This is the unique reference to identify individual payments.

Second, read our [payment conditions](https://docs.tink.com/resources/payments/payment-conditions) article to understand how to use the remittance information type and format on providers. The article explains how to examine submitted payments before they reach a payment provider to avoid failed payments.

The remittance type information for a payment differs between different markets. For information about the different types, see [RemittanceInformation](https://docs.tink.com/api#payment/payment-request/the-payment-request-model/remittanceinformation) in our API documentation.

For use-case examples on how to use payment conditions, see [Examples](https://docs.tink.com/resources/payments/payment-conditions#examples).

## Get payment statuses[](#get-payment-statuses)

![Payment status](https://images.ctfassets.net/tmqu5vj33f7w/2nkljOEBZ3FjLAu7td9pKf/71c218a6cf15665b7eb9ef3e08062c91/Payment_status.png)

We allow you to track the current status of payments, as they're being processed, either for internal purposes (for example, to create events) or to inform your end user of a payment status.

Banks use different payment schedules.

For more information on the payment statuses that are available and how they transition, see [Payment status transitions](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-status-transitions).

For API information and an API response example, see [Response: PaymentRequestTransfersResponse](https://docs.tink.com/api#payment/recurring-payment/create-recurring-payment/response-recurringpaymentresponse).

A payment status can be tracked in two ways. We recommend using webhooks as it means you don’t have to check a status but instead be informed when the status changes:

### Via webhooks[](#via-webhooks)

Instead of getting data via our API, you can set up a webhook and receive notifications whenever the `transfer` status changes to `Sent`, `Cancelled`, or `Failed`.

### Via our API[](#via-our-api)

To get a list of bank transfers for a payment request ID, see [Get transfers for payment request](https://docs.tink.com/api#payment/payment-request/get-transfers-for-payment-request) in our API docs.

For details on how to retrieve a remittance response, see [Check payment status](https://docs.tink.com/resources/payments/initiate-your-first-one-time-payment#check-the-payment-status).

## Reconcile incoming payments[](#reconcile-incoming-payments)

Received payments can be reconciled by matching remittance information with expected payments, based on payment status. Each payment that's successfully initiated should be deposited into a creditor account in accordance with the settlement cycle of the scheme that has been used.

## Support[](#support)

If you encounter an issue with a payment request, store the payment request ID, its timestamp, and information about the destination and source accounts. This information is useful for us to troubleshoot unexpected or failed individual payment requests.

For support, visit [Tink Support](https://docs.tink.com/resources/support/how-to-find-technical-support).
