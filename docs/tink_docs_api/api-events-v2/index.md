---
title: "Tink Docs"
source: "/Tiny-doc/tink_docs_api/api-events-v2/"
exportedAt: "2026-01-13T13:03:43.047Z"
---
## Events v2[](/Tiny-doc/tink_docs_api/api-events-v2/)

The Events v2 section contains resources to create, list, update, and delete webhooks for your app. This is where you create a subscription to a set of events for an endpoint URL.

## Webhook[](#events-v2/webhook)

## Create Webhook Endpoint[](#events-v2/webhook/create-webhook-endpoint)

`POST /events/v2/webhook-endpoints`

The Events v2 Create Webhook Endpoint creates a subscription for a set of events to be delivered to a given endpoint URL. These webhooks are set to trigger whenever a subscribed event occurs for any user created for your app.

Please visit the relevant Tink product page in our [documentation](/Tiny-doc/tink_docs_home/index/) to learn more details on how to integrate and subscribe to webhook events related to product(s) you use.

Due to the unreliable nature of the principle on which Webhook operate, we do not provide several guarantees regarding the delivery of events. The guarantees we do not provide are:

-   _Exactly-once delivery_ - Your webhook might be delivered multiple times or not be delivered at all.
-   _In-order delivery_ - We do not guarantee the order of webhooks delivered; it is possible that newer webhooks are delivered before older ones.

Because of the lack of these guarantees, we are unable to establish Service Level Objectives.

We can only assure our best effort to send webhooks at least once. To ensure proper webhook delivery, we use a retry mechanism.

Events v2 Webhook are designed to handle temporary disruptions in webhook events delivery. In the event of receiving HTTP status codes `408`, `429`, `500`, `502`, `503`, or `504` from your webhook endpoint, Tink will attempt to resend the webhook up to 3 times at exponential intervals. Tink won't retry delivery when establishing a connection to your client server is not possible. Our retry policy is subject to change at any time as part of our ongoing effort to improve webhook delivery reliability. We recommend checking this documentation for updates.

When registering a new Webhook, please be aware that there might be a delay of up to 15 minutes before receiving any events.

### Works with[](#events-v2/webhook/create-webhook-endpoint/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `webhook-endpoints` |

> Request Example

```
{
  "description": "Alice's webhook",
  "disabled": false,
  "enabledEvents": [
    "refresh:finished"
  ],
  "url": "[external url removed]"
}
```

### Request Body: CreateWebhookEndpointRequest[](#events-v2/webhook/create-webhook-endpoint/request-body-createwebhookendpointrequest)

Definition of the webhook endpoint

description `string`

An optional description of what the webhook is used for.

disabled `boolean`

Marks whether the webhook is disabled. Defaults to false.

enabledEvents `array[string]` required

The list of events to enable for this endpoint.

url `string` required

The URL of the webhook endpoint. Allowed schemes: https

> Response Example

```
{
  "createdAt": "2022-11-30T15:27:59Z",
  "description": "Alice's webhook",
  "disabled": false,
  "enabledEvents": [
    "refresh:finished"
  ],
  "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
  "secret": "string",
  "updatedAt": "2022-11-30T15:27:59Z",
  "url": "[external url removed]"
}
```

### Response: WebhookEndpoint[](#events-v2/webhook/create-webhook-endpoint/response-webhookendpoint)

createdAt `Date` required

Time at which the webhook was stored specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00).

description `string`

An optional description of what the webhook is used for.

disabled `boolean` required

Marks whether the webhook is disabled. Defaults to false.

enabledEvents `array[string]` required

The list of events to enable for this endpoint.

id `string` required

A Tink unique identifier for the webhook endpoint.

secret `string`

The secret used to generate the signature header.  
NOTE: **Returned only on creation**. _Don't provide this value when updating a webhook endpoint._

updatedAt `Date` required

Time at which the webhook was updated specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00).

url `string` required

The URL of the webhook endpoint. Allowed schemes: https

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 401 | Authorization token is missing, or not valid |
| 403 | You are not allowed to access the requested resource |
| 409 | A webhook subscribed to one or more of the same events and url already exists |
| default | An unexpected error response. |

## Delete Webhook Endpoint[](#events-v2/webhook/delete-webhook-endpoint)

`DELETE /events/v2/webhook-endpoints/{id}`

Deletes a Webhook Endpoint.

### Works with[](#events-v2/webhook/delete-webhook-endpoint/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `webhook-endpoints` |

### Parameters[](#events-v2/webhook/delete-webhook-endpoint/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The identifier of the specific webhook to be deleted. |

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 401 | Authorization token is missing, or not valid |
| 403 | You are not allowed to access the requested resource |
| default | An unexpected error response. |

## List Webhook Endpoints[](#events-v2/webhook/list-webhook-endpoints)

`GET /events/v2/webhook-endpoints`

Returns a list of Webhook Endpoints.

### Works with[](#events-v2/webhook/list-webhook-endpoints/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `webhook-endpoints` |

### Query Parameters[](#events-v2/webhook/list-webhook-endpoints/query-parameters)

| Parameter | Description |
| --- | --- |
| pageSize | The maximum number of items to return. |
| pageToken | The next\_page\_token value returned from a previous List request, if any. |

> Response Example

```
{
  "nextPageToken": "string",
  "webhookEndpoints": [
    {
      "createdAt": "2022-11-30T15:27:59Z",
      "description": "Alice's webhook",
      "disabled": false,
      "enabledEvents": [
        "refresh:finished"
      ],
      "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
      "secret": "string",
      "updatedAt": "2022-11-30T15:27:59Z",
      "url": "[external url removed]"
    }
  ]
}
```

### Response: ListWebhookEndpointResponse[](#events-v2/webhook/list-webhook-endpoints/response-listwebhookendpointresponse)

nextPageToken `string`

Token to retrieve the next page of results, or empty if there are no more results in the list.

webhookEndpoints `array[WebhookEndpoint]`

There will be a maximum number of items returned based on the page\_size field int the request.

#### WebhookEndpoint[](#events-v2/webhook/list-webhook-endpoints/response-listwebhookendpointresponse/webhookendpoint)

createdAt `Date` required

Time at which the webhook was stored specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00).

description `string`

An optional description of what the webhook is used for.

disabled `boolean` required

Marks whether the webhook is disabled. Defaults to false.

enabledEvents `array[string]` required

The list of events to enable for this endpoint.

id `string` required

A Tink unique identifier for the webhook endpoint.

secret `string`

The secret used to generate the signature header.  
NOTE: **Returned only on creation**. _Don't provide this value when updating a webhook endpoint._

updatedAt `Date` required

Time at which the webhook was updated specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00).

url `string` required

The URL of the webhook endpoint. Allowed schemes: https

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 401 | Authorization token is missing, or not valid |
| 403 | You are not allowed to access the requested resource |
| default | An unexpected error response. |

## Update Webhook Endpoint[](#events-v2/webhook/update-webhook-endpoint)

`PATCH /events/v2/webhook-endpoints/{webhookEndpoint.id}`

Updates a Webhook Endpoint.

### Works with[](#events-v2/webhook/update-webhook-endpoint/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `webhook-endpoints` |

### Parameters[](#events-v2/webhook/update-webhook-endpoint/parameters)

| Parameter | Description |
| --- | --- |
| webhookEndpoint.idrequired | A Tink unique identifier for the webhook endpoint. |

> Request Example

```
{
  "webhookEndpoint": {
    "description": "Alice's webhook",
    "disabled": false,
    "enabledEvents": [
      "refresh:finished"
    ],
    "url": "[external url removed]"
  }
}
```

### Request Body: UpdateWebhookEndpointRequest[](#events-v2/webhook/update-webhook-endpoint/request-body-updatewebhookendpointrequest)

The webhook endpoint to update

webhookEndpoint `WebhookEndpoint`

The object specifying webhook endpoint mutable fields to be updated. One or more of the following fields can be specified at once to perform the update: enabledEvents, description, disabled, url

#### WebhookEndpoint[](#events-v2/webhook/update-webhook-endpoint/request-body-updatewebhookendpointrequest/webhookendpoint)

createdAt `Date` required

Time at which the webhook was stored specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00).

description `string`

An optional description of what the webhook is used for.

disabled `boolean` required

Marks whether the webhook is disabled. Defaults to false.

enabledEvents `array[string]` required

The list of events to enable for this endpoint.

id `string` required

A Tink unique identifier for the webhook endpoint.

secret `string`

The secret used to generate the signature header.  
NOTE: **Returned only on creation**. _Don't provide this value when updating a webhook endpoint._

updatedAt `Date` required

Time at which the webhook was updated specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00).

url `string` required

The URL of the webhook endpoint. Allowed schemes: https

> Response Example

```
{
  "createdAt": "2022-11-30T15:27:59Z",
  "description": "Alice's webhook",
  "disabled": false,
  "enabledEvents": [
    "refresh:finished"
  ],
  "id": "d8f37f7d19c240abb4ef5d5dbebae4ef",
  "secret": "string",
  "updatedAt": "2022-11-30T15:27:59Z",
  "url": "[external url removed]"
}
```

### Response: WebhookEndpoint[](#events-v2/webhook/update-webhook-endpoint/response-webhookendpoint)

createdAt `Date` required

Time at which the webhook was stored specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00).

description `string`

An optional description of what the webhook is used for.

disabled `boolean` required

Marks whether the webhook is disabled. Defaults to false.

enabledEvents `array[string]` required

The list of events to enable for this endpoint.

id `string` required

A Tink unique identifier for the webhook endpoint.

secret `string`

The secret used to generate the signature header.  
NOTE: **Returned only on creation**. _Don't provide this value when updating a webhook endpoint._

updatedAt `Date` required

Time at which the webhook was updated specified as a ISO-8601 date and time string in UTC (e.g. 2020-12-15T09:25:12Z) or with time zone offset (e.g. 2020-12-15T10:25:12+01:00).

url `string` required

The URL of the webhook endpoint. Allowed schemes: https

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| 401 | Authorization token is missing, or not valid |
| 403 | You are not allowed to access the requested resource |
| default | An unexpected error response. |
