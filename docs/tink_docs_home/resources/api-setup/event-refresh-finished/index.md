---
title: "Event: Refresh finished - Tink Docs"
source: "https://docs.tink.com/resources/api-setup/event-refresh-finished"
exportedAt: "2026-01-13T13:00:03.346Z"
---
It is possible to use [webhooks](https://docs.tink.com/resources/api-setup/webhooks#available-events) to subscribe to a `refresh:finished` event. This event notifies you when the refresh operation has finished for a user's `credentials`.

For details on how to subscribe to webhooks, please see [our guidelines](https://docs.tink.com/resources/api-setup/webhooks) and [Webhook API reference](https://docs.tink.com/api#events-v1/webhook).

### Event logic[](#event-logic)

The `refresh:finished` event is fired when a refresh operation has finished for a `credentials` object. This occurs for both _on-demand_ and _background_ refreshes.

This event is triggered regardless of whether the refresh attempt was successsful or unsuccessful. In the case of an unsuccessful refresh the type of error is specified in the event.

This event is only triggered when a refresh has actually been attempted. For example, it will not be trigged for refreshes that have been [rate-limited](https://docs.tink.com/api#introduction/rate-limits).

### Event content[](#event-content)

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| externalUserId | string | The external identifier of the user (as specified when creating the user) | No |
| credentialsId | string | Unique identifier of the credential | Yes |
| status (DEPRECATED) | string | Status of the credential. Possible values are: `UPDATED`, `TEMPORARY_ERROR`, `AUTHENTICATION_ERROR`, `SESSION_EXPIRED` | Yes |
| credentialsStatus | string | Status of the credential. Possible values are: `UPDATED`, `TEMPORARY_ERROR`, `AUTHENTICATION_ERROR`, `SESSION_EXPIRED` | Yes |
| finished | string | Timestamp of when the refresh operation finished | Yes |
| source | string | Source of the refresh. Possible values are: `OPERATION_SOURCE_API`, `OPERATION_SOURCE_BACKGROUND`, `OPERATION_SOURCE_STREAMING` | No |
| sessionExpiryDate | string | Indicates when the session for the currently stored credentials will expire. After this date automatic refreshes will not be possible without new authentication from the user. | No |
| detailedError | ConnectivityError | Detailed information about an error. _This is currently in beta and exact error messages may change._ | No |

### Example[](#example)

Below is an example of a `refresh:finished` event when the refresh operation finished with an error.

```
{
  "content" : {
    "externalUserId" : "100058962",
    "credentialsId" : "abe129ab439c4b9dbb71499a256ce4a5",
    "status" : "AUTHENTICATION_ERROR",
    "credentialsStatus" : "AUTHENTICATION_ERROR",
    "finished" : 1619007274295,
    "source" : "OPERATION_SOURCE_API",
    "sessionExpiryDate" : 1624954710576,
    "detailedError" : {
      "type" : "USER_LOGIN_ERROR",
      "displayMessage" : "",
      "details" : {
        "reason" : "STATIC_CREDENTIALS_INCORRECT",
        "retryable" : false
      }
    }
  },
  "event" : "refresh:finished",
  "webhook" : {
    "id" : "371aac6d3fc0423bb17e3c96a1d279b6",
    "userId" : "af947e794c0641079a876dcec51a419a",
    "secret" : "67abc1e08fb64c92b450a13e0876330b",
    "url" : "https://webhook-catchall.tink.com/",
    "clientId" : "1b91a64414fb4ecf87bb4ce7654b2b6a",
    "global" : false,
    "events" : [ "credentials:create", "credentials:update", "refresh:finished" ]
  }
}
```
