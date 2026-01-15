---
title: "Get a User Access Token to access Money Manager features"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/access-token-money-manager/"
exportedAt: "2026-01-13T12:51:28.906Z"
---
> **Note:** In this guide, we'll show you how to obtain a user access token with the `transactions:read` scopes. Depending on the feature guide you follow or which Money Manager API endpoint you are wanting to access, you may require different scopes. Please refer to the pre-requisites in each guide or the API documentation to know what scopes to include when requesting the user access token.

## 1\. Obtain a client access token[](#obtain-a-client-access-token)

Initially, you need to obtain a `client access token` with the `authorization:grant` scope.

You may already have one if you've recently connected data to the Tink Platform; but if some time has passed, it would have likely expired so you will need to repeat the process in this guide.

To request one, you need to execute the following request:

Request example

```
curl -v -X POST [external url removed] \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=authorization:grant'
```

**Response example**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope": "authorization:grant"
}
```

You now need to obtain an `authorization_code` corresponding to either your `user_id` or `external_user_id`, which we'll later exchange for a `user access token`.

Generate authorization\_code

```
curl -X POST [external url removed] \
-H 'Authorization: Bearer ' \
-d 'user_id=' \
-d 'external_user_id=' \
-d 'scope=transactions:read,provider-consents:read'
```

The response will include the single-use authorization code:

```
{
    "code": "YOUR_USER_AUTHORIZATION_CODE"
}
```

## 3\. Exchange authorization code for user access token[](#exchange-authorization-code-for-user-access-token)

Once you have obtained the authorization\_code, you can exchange it for a `user access token`.

Obtain a user access token

```
curl -v -X POST [external url removed] \
-d 'code=' \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=authorization_code'
```

**The response includes the user access token**

```
{
    "access_token": "USER_ACCESS_TOKEN",
    "token_type": "bearer",
    "expires_in": 1800,
    "scope": "transactions:read"
}
```

You can now use this `user access token` to access Money Manager features via the Tink API.

> **Note:** Remember to check you've requested the token with the correct scopes to ensure you can access certain Money Manager features.
