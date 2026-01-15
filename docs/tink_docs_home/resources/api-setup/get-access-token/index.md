---
title: "How to get an access token"
source: "/Tiny-doc/tink_docs_home/resources/api-setup/get-access-token/"
exportedAt: "2026-01-13T12:56:43.041Z"
---
## Token types[](#token-types)

-   The **Client Token** - Allows access to requests made by your app. Endpoints containing `Client Token` under `Allowed Token Types` in the [API Reference](/Tiny-doc/tink_docs_api/api/) can be accessed by providing this token.
-   The **User Token** - Allows access to the data of a [Tink User](/Tiny-doc/tink_docs_home/resources/aggregation/what-is-a-tink-user/) connected to your app. Endpoints containing `User token` under `Allowed Token Types` in the [API Reference](/Tiny-doc/tink_docs_api/api/) can be accessed by providing this token.

**Documentation**: Visit the [OAuth API](/Tiny-doc/tink_docs_api/api/#general/oauth).

**Purpose**: This will return an API token (valid only for the authenticated backend client) that can be used to modify the users tied to your `client_id`. Remember that your `client_secret` should be kept a secret: only use it to authenticate against the Tink platform and don’t share it outside your organization.

**Request example:**

Authorize access to your backend client

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=authorization:grant,user:create'
```

**Response**: [Access Token Response](https://tools.ietf.org/html/rfc6749#section-5.1) for a client which expires after 30 mins (no refresh token provided, use the same endpoint again to get a new access token). Please note that this token must also be kept a secret and not exposed to any public client.

**Response example:**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope": "authorization:grant,user:create"
}
```

## Add a user[](#add-a-user)

**Documentation**: Visit the [User API](/Tiny-doc/tink_docs_api/api/#general/user).

**Purpose**: Create a user within the Tink platform to be used for any future operation.

**Request example**:

Add a user

```
curl -v -X POST https://api.tink.com/api/v1/user/create \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '
    {
      "market": "SE", 
      "locale": "sv_SE"
    }
'
```

**Response example:**

```
{
  "user_id": "CREATED_USER_ID"
}
```

**Common errors:** Not having the `user:create` scope in the client access token.

## Grant access to a user[](#grant-access-to-a-user)

**Documentation**: Visit the [OAuth API](/Tiny-doc/tink_docs_api/api/#general/oauth).

**Purpose**: Create an authorization for the given `user_id` with the requested scopes.

**Request example**:

Grant access to a specific user

```
curl -X POST https://api.tink.com/api/v1/oauth/authorization-grant \
-H 'Authorization: Bearer ' \
-d 'user_id=CREATED_USER_ID' \
-d 'scope=accounts:read,transactions:read,user:read,credentials:read'
```

**Response**: A user authorization code.

**Response example**:

```
{
  "code": "{YOUR_USER_AUTHORIZATION_CODE}"
}
```

## Get the OAuth access token for the user[](#get-the-oauth-access-token-for-the-user)

**Documentation**: Visit the [OAuth API](/Tiny-doc/tink_docs_api/api/#general/oauth).

**Purpose**: This will return an API token (valid only for the authenticated user).

**Request example**:

Get the OAuth access token

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=authorization_code' \
-d 'code='
```

**Response**: An object containing `YOUR_USER_ACCESS_TOKEN` that can be used to access/manage the user data.

**Response example**:

```
{
  "access_token": "{YOUR_USER_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 7200,
  "scope": "accounts:read,transactions:read,user:read"
}
```

**Common errors:** Note: This API endpoint replies with a friendly error message within the body. Make sure you use the correct `client_id` and `client_secret` found in the [Tink Console](https://console.tink.com/).

-   `HTTP 400 Authorization code not valid`
-   `HTTP 401 Could not find the OAuth client`
-   `HTTP 401 Invalid client secret`
