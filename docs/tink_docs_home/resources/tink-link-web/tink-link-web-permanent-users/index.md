---
title: "Permanent users - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/"
exportedAt: "2026-01-13T12:56:47.383Z"
---
## Overview[](#overview)

You can initiate Tink Link with a permanent user following these steps:

1.  Create a permanent user
2.  Generate a user authorization code
3.  Launch Tink Link with the user authorization code

## 1\. Create a permanent user[](#create-a-permanent-user)

To create a user, you must first create a [client access token](/Tiny-doc/tink_docs_home/resources/getting-started/retrieve-access-token/) with the scope `user:create`.

### Example of creating a client access token[](#example-of-creating-a-client-access-token)

See the [get access token](/Tiny-doc/tink_docs_api/api/#general/oauth/get-access-token) API reference for details.

```
curl -X POST 'https://api.tink.com/api/v1/oauth/token' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'client_id=$' \
-d 'client_secret=$' \
-d 'grant_type=client_credentials' \
-d 'scope=user:create'
```

```
HTTP/1.1 200 OK
Content-Type: application/json
{
  "token_type": "bearer",
  "expires_in": 1799,
  "access_token": "{CLIENT_ACCESS_TOKEN}",
  "scope": "user:create",
  "id_hint": null
}
```

With the `CLIENT_ACCESS_TOKEN` you are now able to create a user.

### Example of creating a user[](#example-of-creating-a-user)

See the [create user](/Tiny-doc/tink_docs_api/api/#general/user/create-user) API reference for details.

```
curl -X POST 'https://api.tink.com/api/v1/user/create' \
-H 'Authorization: Bearer $' \
-H 'Content-Type: application/json; charset=utf-8' \
-d '{"locale":"en_US", "market":"SE"}'
```

```
HTTP/1.1 200 OK
Content-Type: application/json
{
  "user_id" : "{USER_ID}"
}
```

Make sure to specify your respective `market` and `locale` codes.

Tink Link must be granted access to perform actions on the permanent user. This is done by delegating access from your client to the Tink Link client. To delegate access to the Tink Link client, you will need to use the [authorization delegate endpoint](/Tiny-doc/tink_docs_api/api/#general/oauth/create-delegated-authorization) to retrieve an authorization code and propagate it to Tink Link.

To delegate authorization, you must use a [client access token](/Tiny-doc/tink_docs_home/resources/getting-started/retrieve-access-token/) with the scope `authorization:grant`.

### Example of creating a client access token[](#example-of-creating-a-client-access-token)

See the [create user](/Tiny-doc/tink_docs_api/api/#general/oauth/get-access-token) API reference for details.

```
curl -X POST 'https://api.tink.com/api/v1/oauth/token' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'client_id=$' \
-d 'client_secret=$' \
-d 'grant_type=client_credentials' \
-d 'scope=authorization:grant'
```

```
HTTP/1.1 200 OK
Content-Type: application/json
{
  "token_type": "bearer",
  "expires_in": 1799,
  "access_token": "{CLIENT_ACCESS_TOKEN}",
  "scope": "authorization:grant",
  "id_hint": null
}
```

The `CLIENT_ACCESS_TOKEN` is used to grant authorization to Tink Link by delegating access to perform actions for a specific permanent user. In doing so, you will be required to provide an `id_hint` parameter, which will be presented to the end-user in Tink Link, to be able to verify the identity of the actual user they are interacting with and prevent URL spoofing attacks. You can use any arbitrary string value that is recognizable to the end-user, such as the user's full name or e-mail.

In the authorization grant request you must also specify the constant `actor_client_id=df05e4b379934cd09963197cc855bfe9` parameter. This value represents Tink Link's internal `client_id`, is constant for all customers and never changes. By declaring it you are allowing Tink Link to act on your behalf.

### Example of creating a delegated authorization[](#example-of-creating-a-delegated-authorization)

See the [create delegated authorization](/Tiny-doc/tink_docs_api/api/#general/oauth/create-delegated-authorization) API reference for details.

```
curl -X POST 'https://api.tink.com/api/v1/oauth/authorization-grant/delegate' \
-H 'Authorization: Bearer $' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'user_id=$' \
-d 'id_hint=John%20Doe' \
-d 'actor_client_id=df05e4b379934cd09963197cc855bfe9' \
-d 'scope=credentials:read,credentials:refresh,credentials:write,providers:read,user:read,authorization:read'
```

```
HTTP/1.1 200 OK
Content-Type: application/json
{
  "code": "{USER_AUTHORIZATION_CODE}"
}
```

You can use either `user_id` or `external_user_id` to reference the permanent user, for more information see [create a delegated authorization code](/Tiny-doc/tink_docs_api/api/#general/oauth/create-delegated-authorization).

## 3\. Launch Tink Link with the user authorization code[](#launch-tink-link-with-the-user-authorization-code)

The created `USER_AUTHORIZATION_CODE` is used to authenticate the existing user inside Tink Link. This is done by appending the `authorization_code={USER_AUTHORIZATION_CODE}` query parameter in your Tink Link URL.

### Creating credentials[](#creating-credentials)

[Adding credentials](/Tiny-doc/tink_docs_api/api/#connectivity/credentials) for new users or existing users (with possibly other existing credentials), is done by initiating the Tink Link add credentials flow and specifying the `authorization_code` query parameter.

```
https://link.tink.com/1.0/credentials/add
```

| Parameter | Description |
| --- | --- |
| client\_id | Required. Your client identifier. |
| redirect\_uri | Required. Your redirect URI. |
| authorization\_code | Required. The created `USER_AUTHORIZATION_CODE`. |
| scope | Optional. By default, the `ACCOUNTS`, `EINVOICES`, and `TRANSFER_DESTINATIONS` refreshable items will be included. In addition, you can also include `TRANSACTIONAL_ACCOUNTS_AND_TRANSACTIONS` and `IDENTITY_DATA` by specifying `transactions:read` and `identity:read` respectively. |

For a list of all the available parameters, please see the [Tink Link API reference for Account Aggregation](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-api-reference-account-aggregation/).

Example:

```
https://link.tink.com/1.0/credentials/add?client_id={YOUR_CLIENT_ID}&scope=transactions:read,identity:read&redirect_uri=http://localhost:3000/callback&authorization_code={USER_AUTHORIZATION_CODE}
```

### Refreshing credentials[](#refreshing-credentials)

[Refreshing credentials](/Tiny-doc/tink_docs_api/api/#connectivity/credentials) allows you to retrieve updated data on demand for a particular existing credentials, possibly also triggering user authentication in the process if needed. Refreshing credentials is done by initiating the Tink Link refresh credentials flow and specifying the `authorization_code` and `credentials_id` query parameters.

```
https://link.tink.com/1.0/credentials/refresh
```

| Parameter | Description |
| --- | --- |
| client\_id | Required. Your client identifier. |
| redirect\_uri | Required. Your redirect URI. |
| authorization\_code | Required. The created `USER_AUTHORIZATION_CODE`. |
| credentials\_id | Required. The identifier of the credentials to refresh. |
| authenticate | Optional, defaults to `false` . If set to `true`, the user will be requested to perform a full authentication flow to renew refresh tokens with ASPSPs. |

For a list of all the available parameters, please see the [Tink Link API reference for Account Aggregation](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-api-reference-account-aggregation/).

Example:

```
https://link.tink.com/1.0/credentials/refresh?client_id={YOUR_CLIENT_ID}&redirect_uri=http://localhost:3000/callback&credentials_id={CREDENTIALS_ID}&authorization_code={USER_AUTHORIZATION_CODE}&authenticate=false
```

### Authenticate credentials[](#authenticate-credentials)

[Authenticating credentials](/Tiny-doc/tink_docs_api/api/#connectivity/credentials) allows you to extend the session of an existing credentials without refreshing the data. Authenticating credentials is done by initiating the Tink Link authenticate credentials flow and specifying the `authorization_code` and `credentials_id` query parameters.

Note that this flow is only available for credentials deriving from PSD2 providers, i.e. providers with `accessType=OPEN_BANKING`.

```
https://link.tink.com/1.0/credentials/authenticate
```

| Parameter | Description |
| --- | --- |
| client\_id | Required. Your client identifier. |
| redirect\_uri | Required. Your redirect URI. |
| authorization\_code | Required. The created `USER_AUTHORIZATION_CODE`. |
| credentials\_id | Required. The identifier of the credentials to authenticate. |

For a list of all the available parameters, please see the [Tink Link API reference for Account Aggregation](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-api-reference-account-aggregation/).

Example:

```
https://link.tink.com/1.0/credentials/authenticate?client_id={YOUR_CLIENT_ID}&redirect_uri=http://localhost:3000/callback&credentials_id={CREDENTIALS_ID}&authorization_code={USER_AUTHORIZATION_CODE}
```

### Initiate payments[](#initiate-payments)

Launching the Tink Link payment flow with a permanent user will allow you to initiate a transfer with an existing set of credentials and potentially reduce the number of [required SCA](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) for the end-user by utilizing the already existing session. This is done by initiating the Tink Link payment flow and specifying the `authorization_code`, `credentials_id` and `payment_request_id` query parameters.

See the [payment initiation guide](/Tiny-doc/tink_docs_home/resources/payments/start-payment/) on how to create a payment request.

```
https://link.tink.com/1.0/pay/credentials
```

| Parameter | Description |
| --- | --- |
| client\_id | Required. Your client identifier. |
| redirect\_uri | Required. Your redirect URI. |
| authorization\_code | Required. The created `USER_AUTHORIZATION_CODE`. |
| credentials\_id | Required. The identifier of the credentials to use for the payment. |
| payment\_request\_id | Required. The [created payment request identifier](/Tiny-doc/tink_docs_home/resources/payments/start-payment/#create-a-payment-request). |

Example:

```
https://link.tink.com/1.0/pay/credentials?client_id={YOUR_CLIENT_ID}&redirect_uri=http://localhost:3000/callback&credentials_id={CREDENTIALS_ID}&authorization_code={USER_AUTHORIZATION_CODE}&payment_request_id={PAYMENT_REQUEST_ID}
```

### Reference[](#reference)

Refer to our [example app](https://github.com/tink-ab/tink-link-web-permanent-users-example) on GitHub which showcases adding, authenticating, and refreshing credentials as well as initiating payments with existing credentials.
