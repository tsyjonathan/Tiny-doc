---
title: "Sessions - Tink Docs"
source: "https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-sdk-sessions"
exportedAt: "2026-01-13T12:42:16.370Z"
---
## Overview[](#overview)

You may have opportunities to improve your end-users' experience that would require you to share sensitive data. For example, you might prefill their bank login information to save them a few steps in the Tink Link journey. But you can't pass this data to Tink Link as a query parameter due to the sensitive nature of the data.

Sessions let you securely initialize Tink Link with this sensitive data without exposing it as a query parameter.

To use sessions, you simply need to:

-   Create a session and pass in your data
-   Initiate Tink Link and pass the `session_id` in the URL

## Create a session[](#create-a-session)

Create a session by using the `POST /link/v1/session` endpoint. The request must be authenticated using a [client access token](https://docs.tink.com/resources/getting-started/get-access-token) and contain the `link-session:write` scope.

Example client access token request

```
curl -X POST 'https://api.tink.com/api/v1/oauth/token' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=link-session:write'
```

Example response

```
HTTP/1.1 200 OK
Content-Type: application/json
{
  "token_type": "bearer",
  "expires_in": 1799,
  "access_token": "{CLIENT_ACCESS_TOKEN}",
  "scope": "link-session:write",
  "id_hint": null
}
```

Then, create a session using the `CLIENT_ACCESS_TOKEN` in the authorization header when calling the [session endpoint](https://docs.tink.com/api#general/tink-link/session).

Example session request

```
curl -X POST https://api.tink.com/link/v1/session \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{ "sourceAccountNumber" : "iban://IT60X0542811101000000123456" }'
```

Example response

```
HTTP/1.1 200 OK
Content-Type: application/json
{
  "sessionId": "{SESSION_ID}"
}
```

### Supported fields[](#supported-fields)

All fields in the Session request body are optional, but you need to provide at least one for the Session to be valid.

| Field | Description |
| --- | --- |
| `merchantId` | The merchant identifier. When provided, Tink Link will load the theme for that merchant. |
| `personalIdentifier` | The personal identifier to be prefilled in username or social security number forms. |
| `sourceAccountNumber` | The source account to pre-select in the payment flow. Not available for all banks. |

## Initiate Tink Link with a session[](#initiate-tink-link-with-a-session)

Initialize Tink Link with your session by appending the `session_id` query parameter to your Tink Link URL using the `SESSION_ID` from the [Create Session response](#create-a-session).

```
https://link.tink.com/1.0/pay?...&session_id={SESSION_ID}
```

## Example use cases[](#example-use-cases)

### Merchant customization[](#merchant-customization)

Pass a `merchantId` when creating a session to apply merchant-level customizations to Tink Link. This allows you to use separate themes, logos and other customization for individual merchants. You can configure merchant customizations in [Console](https://console.tink.com/).

Example session using merchantId

```
curl -X POST https://api.tink.com/link/v1/session \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{ "merchantId" : "c52e84e2-26f7-4e54-8049-46d16588e649" }'
```

### Personal identifier[](#personal-identifier)

Pass a `personalIdentifier` to the session to prefill the authentication input field for markets that use personal identifiers (such as a social security number) for authentication. If you prefill the personal identifier, the user can’t change it during the authentication journey.

Example session using personalIdentifier

```
curl -X POST https://api.tink.com/link/v1/session \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{ "personalIdentifier" : "199901012222" }'
```

### Source account number[](#source-account-number)

Pass a `sourceAccountNumber` to a session to pre-select the source account and skip the account selection step in the Payments journey. If the source account number can’t be found at the selected bank, then the user will be prompted to select a different account from that bank.

Example session using sourceAccountNumber

```
curl -X POST https://api.tink.com/link/v1/session \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{ "sourceAccountNumber" : "1234567890" }'
```

> Pre-selecting the source account is only possible if you have passed the `input_provider` in the Tink Link URL.
