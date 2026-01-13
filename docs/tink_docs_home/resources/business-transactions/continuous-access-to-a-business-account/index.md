---
title: "Continuous access to a business account"
source: "https://docs.tink.com/resources/business-transactions/continuous-access-to-a-business-account"
exportedAt: "2026-01-13T12:46:44.778Z"
---
Continuous access provides you with a **continuous flow** of end-user transaction data. This means we fetch data continuously for 90 days (which is the maximum consent time).

If you need data access only once and to automatically have the data deleted 24 hours later, see [One-time access to a business account](https://docs.tink.com/resources/business-transactions/one-time-access-to-a-business-account).

## 1\. Create a user[](#create-a-user)

To interact with the Tink API, you need to first authorize your backend client using the scope `user:create`. This will return a client access token (valid only for the authenticated backend client), that can be used to create users tied to your `client_id`.

Request example

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
  -d 'client_id=' \
  -d 'client_secret=' \
  -d 'grant_type=client_credentials' \
  -d 'scope=user:create'
```

An access token is provided with the response. The access token expires after 30 minutes.

**Response example**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope": "user:create"
} 
```

Now that you have a client access token, you can create your first user. This user is an internal reference, to which banking consents and accounts will be attached to.

> **Note:** as part of this create request, you are able specify your own external\_user\_id in the request rather than relying on the `user_id` Tink generated in the response. Going forward, you can opt to use the Tink `user_id` or `external_user_id` interchangeably when performing API requests. However, they cannot be stated at the same time.

Request example

```
curl -v -X POST https://api.tink.com/api/v1/user/create \
  -H 'Authorization: Bearer ' \
  -H 'Content-Type: application/json' \
  -d '
    {
      "external_user_id": "user_123_abc",
      "market": "GB", 
      "locale": "en_US"
    }
  '
```

Sending this request will create a new user. This user does not have any consents or accounts yet. This will be the next step.

**Response example**

```
{
  "external_user_id": "user_123_abc",
  "user_id": "CREATED_USER_ID"
}
```

Similar to Step 1, you need to authorize access by generating a new access\_token, but instead use the scope `authorization:grant`. Alternatively, you can add both scopes in the initial request (comma-separated), and use the same client access token in both cases.

Request example

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
  -H 'scope=authorization:grant' \
  -d 'client_id=' \
  -d 'client_secret=' \
  -d 'grant_type=client_credentials'
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

For an end-user to connect their account, they must use a Tink URL. To achieve this, Tink must be granted access to your user. This is done by delegating access from your app to Tink. To delegate access to Tink, you will need to use the [create delegated authorization](https://docs.tink.com/api#general/oauth/create-delegated-authorization) endpoint to retrieve an authorization code and propagate it to Tink.

To delegate, you must use a client access token with the scope `authorization:grant`.

> **Note:** In the authorization grant request you must also specify the constant `actor_client_id=df05e4b379934cd09963197cc855bfe9` parameter. This value represents Tink's internal `client_id`, is constant for all customers and never changes. By declaring it you are allowing Tink to interact on your behalf.

Request example

```
curl -v -X POST https://api.tink.com/api/v1/oauth/authorization-grant/delegate \
  -H 'Authorization: Bearer ' \
  -d 'response_type=code' \
  -d 'actor_client_id=df05e4b379934cd09963197cc855bfe9' \
  -d 'user_id=' \
  -d 'external_user_id=' \
  -d 'id_hint=' \
  -d 'scope=authorization:read,authorization:grant,credentials:refresh,credentials:read,credentials:write,providers:read,user:read'
```

**Response example**

```
{
  "code": "{USER_AUTHORIZATION_CODE}"
}
```

## 3\. Build the URL[](#build-the-url)

This newly created `USER_AUTHORIZATION_CODE` is used to identify the existing user in the Tink URL. This is done by appending the `authorization_code={USER_AUTHORIZATION_CODE}` query parameter to your Tink URL.

To specify which country Tink should should allow the user to connect their accounts for you can use the `market={MARKET_CODE}` parameter.

We also advise using the state parameter when constructing the URL, as this is returned once the user authenticates, it may allow you to better manage which end user has authenticated. Otherwise, you are able to rely on the `credentialsID` we return in the response and map it back to your user. The state parameter should not contain any sensitive information, such as the `user_id`.

URL example

```
https://link.tink.com/1.0/business-transactions/connect-accounts?client_id=&state=&redirect_uri=https://console.tink.com/callback&authorization_code=&market=GB
```

> The parameter **state** is optional. It can be included in the initial Tink URL, and will be returned back to you as-is once the user returns to your stated redirect\_url. Use this value to further redirect the user to a specific location within your app, and for CSRF attack prevention.

Once you’ve created a Tink URL, you can authenticate yourself at the many banks and financial institutions that Tink supports. You can either use your own bank credentials or use test credentials via [Demo Bank](https://docs.tink.com/resources/console/demo-bank).

![transactions-flow-example](https://images.ctfassets.net/tmqu5vj33f7w/3wWVoQiT8tq9Fpc8nPaETA/9bba00a95828824edfb81d969ccf5544/transactions-flow-example.gif)

After completing the Tink flow, the user will be redirected to the redirect URL.

**The redirection URL will have the following format**

```
{redirect_uri}?credentialsId={credentialsId}&state={OPTIONAL_THE_STATE_CODE_YOU_SPECIFIED}
```

If you don’t include the state parameter in your original Tink URL, it won’t be included in the redirect URL. However, if you have included this parameter, you can use this to map back to the `user_id` or `external_user_id`.

**Example callback**

```
https://yourdomain.com/callback?credentialsId=e5331af8d98f4c58800960202b6ec50d&state={OPTIONAL_STATE_CODE_THAT_YOU_SPECIFIED}
```

## 4\. Fetch user data[](#fetch-user-data)

Once the user has completed the bank authentication in Tink, you need to follow some additional steps to retrieve their data. These steps will be the same for any subsequent accesses to data.

First, you need to obtain a client access token with the `authorization:grant` scope. You can do so using the same API call as in Step 2.

The next step is to obtain a user access token. This is done in two parts: first, you must obtain an `authorization_code` corresponding to either your `user_id` or `external_user_id`, and then exchange said code for a user access token.

Generate authorization\_code

```
curl -X POST https://api.tink.com/api/v1/oauth/authorization-grant \
  -H 'Authorization: Bearer ' \
  -d 'user_id=' \
  -d 'external_user_id=' \
  -d 'scope=accounts:read,balances:read,transactions:read,provider-consents:read'
```

The response will include the single-use authorization code:

```
{
    "code": "YOUR_USER_AUTHORIZATION_CODE"
}
```

Once you have obtained the authorization\_code, you can exchange it for a user access token.

Obtain user access token

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
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
    "scope": "accounts:read,balances:read,transactions:read"
}
```

You can now use this user access token to retrieve aggregated data.
