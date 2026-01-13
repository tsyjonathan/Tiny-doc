---
title: "Enrichment Completed Webhook - Tink Docs"
source: "https://docs.tink.com/resources/data-enrichment/webhook-for-enrichment-completed"
exportedAt: "2026-01-13T12:48:20.491Z"
---
The Enrichment Completed Webhook lets you subscribe to an event that is generated when transaction enrichments are completed. To set up a webhook, see [Set up webhooks for your app](https://docs.tink.com/resources/getting-started/webhooks).

After a batch of transactions is ingested, Tink will send an `enrichmentCompleted` webhook notification for that batch. The webhook includes the `operationId` that was provided during ingestion. This lets you match the webhook to the original batch request.

The Enrichment Completed Webhook is sent only once per batch. If all enrichment events for the batch are successfully processed and received within a predefined time frame, the webhook will be sent with an `enrichmentCompleted` value of `true`. This batch is now ready for downstream use.

If all enrichment events aren't received within the time frame, we immediately send the webhook with an `enrichmentCompleted` value of `false`. A failed webhook indicates an enrichment timeout, not that every event failed. Some enrichments may still have completed successfully. This way, you're promptly notified when the batch couldn’t finish in time even if partial results may exist and may arrive or already be available.

## How to connect[](#how-to-connect)

Create a webhook with type `enrichment-completed` when using `Events V2`.

You can read more about it in our [Webhook API documentation](https://docs.tink.com/api-events-v2#events-v2/webhook).

## Webhook request and model[](#webhook-request-and-model)

The root structure of the Webhook request has the same structure across all webhook events, the structure inside the `content` field differs between webhook events. For Enrichment Completed event, you can expect the structure presented as `EnrichmentCompleted` below.

```
webhook: {
  content: EnrichmentCompleted,
  event: string
}
```

| Field | Description |
| --- | --- |
| content | Contains detailed information about the particular event. The structure of the content varies depending on the insight type. |
| event | Specifies the event type for the information contained in the `content` field. |

Webhook model is described in the [Webhook API documentation](https://docs.tink.com/api-events-v2#events-v2/webhook/).

The `content` of the `EnrichmentCompleted` webhook follows this structure:

```
EnrichmentCompleted: {
  appId: String,
  userId: String,
  batchId: String,
  totalTransactions: Integer,
  permittedEnrichments: List<String>,
  completedAt: String,
  enrichmentCompleted: boolean,
  batchType: String
  operationId: String
}
```

Here's an example of the webhook that has been send:

```
{
  "content": {
    "appId": "bfa8598558a0406c9bf7b8f6a0b4e130",
    "userId": "9559da91b8164da0a1e1dcfd0a31626a",
    "batchId": "5e3c59f6-262d-4f2c-90c1-3c68151ab748",
    "totalTransactions": 48,
    "permittedEnrichments": [
      "SUSTAINABILITY",
      "MERCHANT_INFORMATION",
      "CATEGORIZATION"
    ],
    "completedAt": "2025-10-14T08:06:45Z",
    "enrichmentCompleted": true,
    "batchType": "INSERT",
    "operationId": "c6e8e3f8-864b-429e-a218-92d7cc557513"
  },
  "event": "enrichment-completed"
}
```
