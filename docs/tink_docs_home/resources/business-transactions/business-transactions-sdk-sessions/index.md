---
title: "Sessions - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/business-transactions/business-transactions-sdk-sessions/"
exportedAt: "2026-01-13T12:47:10.091Z"
---
## Overview[](#overview)

You may have opportunities to improve your end-users' experience that would require you to share sensitive data. For example, you might prefill their bank login information to save them a few steps in the Tink Link ourney. But you can't pass this data to Tink Link as a query parameter due to the sensitive nature of the data.

Sessions let you securely initialize Tink Link with this sensitive data without exposing it as a query parameter.

To use sessions, you simply need to:

-   Create a session and pass in your data
-   Initiate Tink Link and pass the `session_id` in the URL

## Create a session[](#create-a-session)

Create a session by using the `POST /link/v1/session` endpoint. The request must be authenticated using a [client access token](/Tiny-doc/tink_docs_home/resources/getting-started/get-access-token/) and contain the `link-session:write` scope.

Example client access token request

```
curl -X POST '[external url removed]' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'clientId=' \
-d 'clientSecret=' \
-d 'grantType=client_credentials' \
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

Then, create a session using the `CLIENT_ACCESS_TOKEN` in the authorization header when calling the [session endpoint](/Tiny-doc/tink_docs_api/api/#general/tink-link/session).

Example session request

```
curl -X POST [external url removed] \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{ "externalReference" : "123456" }'
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
| `externalReference` | The external reference identifier to include in report-based products. Allowed characters: uppercase or lowercase letters, numbers, and the dash character. Maximum 50 characters. |
| `merchantId` | The merchant identifier. When provided, Tink Link will load the theme for that merchant. |
| `personalIdentifier` | The personal identifier to prefill in bank authorization forms. |

## Initiate Tink Link with a session[](#initiate-tink-link-with-a-session)

Initialize Tink Link with your session by appending the `session_id` query parameter to your Tink Link URL using the `SESSION_ID` from the [Create Session response](#create-a-session).

```
[external url removed]
```

## Example use cases[](#example-use-cases)

### External Reference[](#external-reference)

Pass an `externalReference` to a session to securely provide your own external reference for report-based product. This external reference value will be included as part of the generated report. This is useful when the external reference includes sensitive or personally identifiable information.

Example session using externalReference

```
curl -X POST [external url removed] \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{ "externalReference" : "customer-abc-123" }'
```

> If you aren’t passing sensitive information as an external reference, we recommend using `external_reference` parameter in the Tink Link URL instead of creating a session.

### Merchant customization[](#merchant-customization)

Pass a `merchantId` when creating a session to apply merchant-level customizations to Tink Link. This allows you to use separate themes, logos and other customization for individual merchants. You can configure merchant customizations in Console.

Example session using merchantId

```
curl -X POST [external url removed] \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{ "merchantId" : "c52e84e2-26f7-4e54-8049-46d16588e649" }'
```

### Personal identifier[](#personal-identifier)

Pass a `personalIdentifier` to the session to prefill the authentication input field for markets that use personal identifiers (such as a social security number) for authentication. If you prefill the personal identifier, the user can’t change it during the authentication journey.

Example session using personalIdentifier

```
curl -X POST [external url removed] \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{ "personalIdentifier" : "199901012222" }'
```
