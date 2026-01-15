---
title: "Webhooks - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/account-check/webhooks-account-check-integration/"
exportedAt: "2026-01-13T12:44:01.324Z"
---
## Setting up webhooks[](#setting-up-webhooks)

With the Tink Events API, you only need to configure webhooks once for your entire app. Define a target endpoint and a list of events, and you're set. Tink will notify you every time an event happens for each one of the Tink Users of your app.

### 1\. Expose an endpoint on your server[](#expose-an-endpoint-on-your-server)

Use this endpoint to receive notifications. The endpoint should be a publicly-accessible URL that can receive POST requests. Tink will connect to this URL, and the event payload will be sent in the request body.

**Endpoint example:** `[external url removed]

### 2\. Set up the webhook using the Events API[](#set-up-the-webhook-using-the-events-api)

You need to set up the webhook one time. First create a `Client Token` and then call the create webhook endpoint.

**request example**

```
{
  "description": "My report generation webhook",
  "disabled": false,
  "enabledEvents": [
    "reports-generation:completed"
  ],
  "url": "[external url removed]"
}
```

**response example**

```
{
  "createdAt": "2024-03-24T15:27:59Z",
  "description": "My report generation webhook",
  "disabled": false,
  "enabledEvents": [
    "reports-generation:completed"
  ],
  "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
  "secret": "string",
  "updatedAt": "2024-03-24T15:27:59Z",
  "url": "[external url removed]"
}
```

Please store the `id` and `secret` value safely, as this value cannot be retrieved again. Use this secret to verify the signature of incoming notifications.

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
        "externalReference": "f1b3688c649946cc8ee163d1554e853e",
        "userId": "3db31bdcc75555c4f0b8952984a9bd4f"
    },
    "content": {
        "reports": [
         {
           "id": "32f468a81dd7490cb3ffe4a7cf7636f5",
           "type": "ACCOUNT_VERIFICATION_REPORT",
           "status": "CREATED"
         },
         {
           "type": "TRANSACTION_REPORT",
           "status": "FAILED",
           "error": "PRECONDITION_FAILED"
         }
     ]
    },
    "event" : "reports-generation:completed"
}
```

## Available events[](#available-events)

| Event | Description | Product |
| --- | --- | --- |
| `account:created` | This event is fired when an account resource has been created. | Product Agnostic |
| `account:updated` | This event is fired when an account resource has been updated. | Product Agnostic |
| `refresh:finished` | This event is fired when a refresh operation has finished for a `credentials` or `consent`. This can happen for on-demand refreshes and background refreshes. | Product Agnostic |
| `account-transactions:modified` | This event is fired when an account has new or updated transactions, regardless of their booking status. | Transactions |
| `account-booked-transactions:modified` | This event is fired when an account has new or updated transactions that have status `BOOKED`. | Transactions |
| `reports-generation:completed` | This event is fired when an Account Check report has been `created` or `failed` and supplies the `status` and the `account check report id`. | Account Check |
