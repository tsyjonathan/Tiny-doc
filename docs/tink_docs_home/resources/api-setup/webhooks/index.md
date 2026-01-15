---
title: "Set up webhooks for your app"
source: "/Tiny-doc/tink_docs_home/resources/api-setup/webhooks/"
exportedAt: "2026-01-13T12:53:44.538Z"
---
## Setting up webhooks[](#setting-up-webhooks)

With the Tink Events API, you only need to configure webhooks once for your entire app. Define a target endpoint and a list of events, and you're set. Tink will notify you every time an event happens for each one of the Tink Users of your app.

### 1\. Expose an endpoint on your server[](#expose-an-endpoint-on-your-server)

Use this endpoint to receive notifications. The endpoint should be a publicly-accessible URL that can receive POST requests. Tink will connect to this URL, and the event payload will be sent in the request body.

**Endpoint example:** `[external url removed]

### 2\. Set up the webhook using the Events API[](#set-up-the-webhook-using-the-events-api)

You need to set up the webhook once. To do so, call the Tink API using your `client access token`. This client access token should have been authorized to include the `webhook-endpoints` scope. [Read more](/Tiny-doc/tink_docs_api/api/#events-v2/webhook/create-webhook-endpoint/request-body-createwebhookendpointrequest) on the fields for this request.

**Request example:**

Set up the webhook

```
curl -v -X POST [external url removed] \
-H 'Authorization: Bearer ' \
-d '{ "description": "My webhook", "disabled": false, "enabledEvents": ["refresh:finished"], "url": "[external url removed]" }'
```

**Response example:**

```
{
    "createdAt": "2022-05-26T07:54:41.725408Z",
    "description": "Alice's webhook",
    "disabled": false,
    "enabledEvents": [
        "refresh:finished"
    ],
    "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
    "secret": "string",
    "updatedAt": "2022-05-26T07:54:41.725408Z",
    "url": "[external url removed]"
}
```

Please store the `secret` value safely, as this value cannot be retrieved again. Use this secret to [verify the signature](/Tiny-doc/tink_docs_home/resources/api-setup/webhook-signature-validation/) of incoming notifications.

For more information, see the [Events API](/Tiny-doc/tink_docs_api/api/#events-v2) API reference.

## Message structure[](#message-structure)

Webhooks sent to you will have the following JSON structure:

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

## Available events[](#available-events)

| Event | Description |
| --- | --- |
| `account-transactions:modified` | This event is fired when an account has new or updated transactions, regardless of their booking status. |
| `account-booked-transactions:modified` | This event is fired when an account has new or updated transactions that have status `BOOKED`. |
| `account:created` | This event is fired when an account resource has been created. |
| `account:updated` | This event is fired when an account resource has been updated. |
| `refresh:finished` | This event is fired when a refresh operation has finished for a `credentials` (for Account Aggregation) or `consent` (for Transactions). This can happen for on-demand refreshes and background refreshes. |
| `actionable-insights:created` | This event is fired when an insight has been generated (Money Manager only) |
| `payment:updated` | This event is fired when any transfer corresponding to any existing payment for any of your app's users has been updated. |
| `mandate-payment:updated` | This event is fired when the status of a mandate payment has been updated to one of the final statuses. |
