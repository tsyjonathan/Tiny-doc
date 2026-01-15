---
title: "Cancel a future-dated payment - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/cancel-a-future-dated-payment/"
exportedAt: "2026-01-13T12:42:55.446Z"
---
Cancellation of payments is available for future-dated payments where funds have not yet been exchanged. Immediate payments can’t be canceled, as they’re considered irrevocable by banks.

With this feature, you can enable your users to cancel a successfully initiated payment prior to the “execution date”, preventing the funds from being exchanged.

> **Note**: This feature is currently only available in Sweden

## Why integrate payment cancellation?[](#why-integrate-payment-cancellation-)

If a user wants to cancel a future-dated payment, they typically need to cancel on the bank’s side. By integrating cancellation of payments, you can offer the same feature to your users directly within your own environment. Payment cancellation empowers your users to:

-   Prevent double payments
-   Stop accidental payment
-   Avoid lengthy chargeback or refund processes
-   Engage in your app or environment

## How to cancel a payment[](#how-to-cancel-a-payment)

At a high level, the payment cancellation process consists of three steps:

1.  Begin the cancellation process
2.  Poll for cancellation status
3.  Handle end-user interaction if needed

To begin the cancellation process, make a `POST` request to `[external url removed] Calling this endpoint creates a new cancellation resource and begins the cancellation process at the bank where the payment was initiated.

**Example request**

Create cancellation resource

```
curl -v -X POST [external url removed] \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json'
```

**Example response status**

```
201 Accepted
```

To poll the status of the cancellation, make a GET request to `[external url removed] The endpoint will return one of these statuses:

-   `PROCESSING`: The cancellation has begun
-   `AWAITING_AUTHENTICATION`: The bank requires the user to authenticate before continuing
-   `FAILED`: The cancellation failed
-   `SUCCESSFUL`: The cancellation is complete

**Example request**

Poll cancellation status

```
curl -v -X GET [external url removed] \
   -H 'Authorization: Bearer ' \
   -H 'Content-Type: application/json'
```

**Example response**

```
{
    "status": "PROCESSING"
}
```

You’ll want to keep polling for the cancellation status every few seconds until it reaches a `FAILED` or a `SUCCESSFUL` status.

Some banks require a Strong Customer Authentication (SCA) from the user who initiated the original payment in order to process their cancellation. In this case, the response object will contain a base Tink URL that will guide the user through the SCA process.

**Example response with tinkLink**

```
{
    "status": "AWAITING_AUTHENTICATION",
    "tinkLink": "[external url removed]",
}
```

To use your Tink URL, you’ll need to add a `redirect_uri` parameter that defines where the user will be taken after the SCA flow is complete. Tink URLs without a `redirect_uri` are invalid and will throw an error.

We also recommend adding the `locale` parameter that is relevant for that user or market. URLs without a `locale` will default to US English.

After the user finishes the SCA, the cancellation process will continue as normal.

For more details, check out the [Cancellation endpoint](/Tiny-doc/tink_docs_api/api-payment/#payment/cancellation) in our API reference.
