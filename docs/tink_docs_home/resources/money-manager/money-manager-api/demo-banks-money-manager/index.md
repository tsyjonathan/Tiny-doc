---
title: "Test Money Manager - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/demo-banks-money-manager/"
exportedAt: "2026-01-13T12:51:26.613Z"
---
In this guide, we will show you how to connect to create a user, connect to Demo Bank and then retrieve a client access token.

To interact with the Tink API, you need to first authorize your backend client using the scope `user:create`. This will return a `client access token` (valid only for the authenticated backend client), that can be used to create users tied to your `client_id`.

Request example

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=user:create'
```

In the response, an access token is provided that expires after 30 mins.

**Response example**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope": "user:create"
} 
```

Now that you have a `client access token`, you can create your first user. This user is an internal reference, to which banking consents and accounts will be attached to.

Request example

```
curl -v -X POST https://api.tink.com/api/v1/user/create \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '
    {
      "external_user_id": "{YOUR_EXTERNAL_USER_ID}"
      "market": "GB", 
      "locale": "en_US"
    }
  '
```

Sending this request will create a new user. This user does not have any consents or accounts yet. This will be the next step.

**Response example**

```
{
  "external_user_id": "user_123_abc"
  "user_id": "CREATED_USER_ID"
}
```

## 2\. Generate a user authorization code[](#generate-a-user-authorization-code)

Similar to Step 1, you need to authorize access by generating a new `access_token`, but instead use the scope `authorization:grant`. Alternatively, you can add both scopes in the initial request (comma-separated), and use the same `client access token` in both cases.

Request example

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
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

For an end-user to connect their account, they must do so using Tink Link. To enable this process, Tink Link must be granted access to your user first.

This is done by delegating access from your app to Tink Link. To delegate access to Tink Link, you will need to use the “[create delegated authorization](/Tiny-doc/tink_docs_api/api/#general/oauth/create-delegated-authorization)” endpoint to retrieve an authorization code and propagate it to Tink Link.

Note that to perform the delegation, you must use a [client access token](/Tiny-doc/tink_docs_home/resources/getting-started/retrieve-access-token/) with the scope `authorization:grant`.

> **Note:** In the authorization grant request you must also specify the constant `actor_client_id=df05e4b379934cd09963197cc855bfe9` parameter. This value represents Tink Link's internal `client_id`, is constant for all customers and never changes. By declaring it you are allowing Tink Link to interact on your behalf.

Request example

```
curl -v -X POST https://api.tink.com/api/v1/oauth/authorization-grant/delegate \
-H 'Authorization: Bearer ' \
-d 'response_type=code' \
-d 'actor_client_id=df05e4b379934cd09963197cc855bfe9' \
-d 'user_id=' \
-d 'external_user_id=' \
-d 'id_hint={YOUR_END_USER_NAME/USERNAME}' \
-d 'scope=authorization:read,authorization:grant,credentials:refresh,credentials:read,credentials:write,providers:read,user:read'
```

**Response example**

```
{
  "code": "{USER_AUTHORIZATION_CODE}"
}
```

## 3\. Connect to Demo Banks (using Tink Link)[](#connect-to-demo-banks-using-tink-link-)

You now need to initiate Tink Link, which is our web SDK to Banks. As we're looking to use Demo Banks for this guide, make sure that your app is a sandbox app (as mentioned in the prerequisites of this guide).

The newly created `USER_AUTHORIZATION_CODE` from the previous step is used to identify the existing user within Tink Link. This is also done by appending the `authorization_code={USER_AUTHORIZATION_CODE}` query parameter to your Tink Link URL.

URL example

```
https://link.tink.com/1.0/authorize/?client_id=&redirect_uri=&authorization_code=
```

Within the Tink Link flow, you will need to use the 'Money Manager' Demo Bank credentials listed within [Console](https://console.tink.com/demobank). Please ensure you use the credentials for the correct market.

**The redirection URL will have the following format**

```
{redirect_uri}?credentialsId={credentialsId}
```

**Example callback**

```
https://yourdomain.com/callback?credentialsId=e5331af8d98f4c58800960202b6ec50d
```

You have now succesfully connected the Demo Bank to the Tink Platform. Keep note of the `user_id` as this will be required to fetch a `user access token` which is required to access any data on the Tink Platform.

Check out the guide below to fetch a `user access token`.
