---
title: "Refresh balance data - Tink Docs"
source: "https://docs.tink.com/resources/balance-check/refresh-balance-data"
exportedAt: "2026-01-13T12:44:16.495Z"
---
To refresh data means to use Tink's API to check a bank account for new data.

## 1\. Refreshing the balance[](#refreshing-the-balance)

You need to generate a user access token for your client to be able to initiate the balance refresh.

### 1.1 Generate client access token[](#generate-client-access-token)

Use the `authorization:grant` scope to authorize your app and get a client access token. Use this value in your authorized app to call our other APIs.

The following example shows how to use your `client_id` and `client_secret` to fetch your `client access token`.

**Request example**

Generate client token

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=authorization:grant'
```

```
{
    "access_token": "CLIENT_ACCESS_TOKEN",
    "token_type": "bearer",
    "expires_in": 1800,
    "refresh_token": "REFRESH_TOKEN",
    "scope": "authorization:grant"
}
```

**Note:** Your client access token is the `access_token` value. It's valid for 30 minutes (1800 seconds). If 30 minutes pass before you've finished making your integration, run the request again to generate and use a new client access token (that's also valid for 30 minutes).

### 1.2 Generate user access code[](#generate-user-access-code)

You need to authenticate and verify that the user you want to fetch information for is one that your client created.

In this example, access is granted.

**Request example**

Generate authorization code

```
curl -v -X POST https://api.tink.com/api/v1/oauth/authorization-grant \
-H 'Authorization: Bearer ' \
-d 'user_id=' \
-d 'scope=accounts:read,accounts.balances:readonly,credentials:read,credentials:refresh,balance-refresh,balance-refresh:readonly'
```

**Response example**

```
{
    "code": "YOUR_USER_AUTHORIZATION_CODE"
}
```

Use the user authorization code and generate a user access token so that you can call our APIs

Generate user client token

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
-d 'code=' \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=authorization_code'
```

The response contains the access token that you use with your subsequent calls and the scopes that limits you to which APIs you can use.

**Response example**

```
{
    "access_token": "USER_ACCESS_TOKEN",
    "token_type": "bearer",
    "expires_in": 1800,
    "refresh_token": "REFRESH_TOKEN",
    "scope": "accounts:read,accounts.balances:readonly,credentials:read,credentials:refresh,balance-refresh,balance-refresh:readonly"
}
```

To refresh the balance of an account the Tink accountId needs to be provided in the api call. This ID can be found in the account check report which was used earlier in this guide.

Refresh balance data

```
curl -v -X POST https://api.tink.com/api/connectivity/v1/balance-refreshes \
-H 'Authorization: Bearer ' \
-H 'application/json' \
-d 'accountId={accountId}'
```

**Response Example**

```
{
 "balanceRefreshId": "3db31bdcc75555c4f0b8952984a9bd4f",
 "credentialId": "6e68cc6287704273984567b3300c5822",
}
```

Poll the balance-refresh api to see when the refresh has finished.

Refresh balance data

```
curl -v -X GET https://api.us.tink.com/api/v1/balance-refreshes/{id} \
-H 'Authorization: Bearer ' \
-H 'application/json' \
```

When the API is in progress, it will respond with a `refreshing` status.

**Response Example - refresh in progress**

```
{
"status": "refreshing"
}
```

When the API responds with a `finished` status, the refresh has finished successfully.

**Response Example - refresh finished successfully**

```
{
"status": "finished"
}
```

## 2\. Fetch the balance[](#fetch-the-balance)

To fetch the balance call the [API](https://docs.tink.com/api#data-v2/account/get-account-balance) with the specific `accountId`.

Fetch the balance

```
curl -v GET https://api.tink.com/data/v2/accounts/{id}/balances \
-H 'Authorization: Bearer '
```

**Response example**

```
{
  "accountId": "a6bb87e57a8c4dd4874b241471a2b9e8",
  "balances": {
    "available": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "booked": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    }
  },
  "refreshed": "2022-09-27T15:01:40Z"
}
```

## 3\. Recover from unsuccessful refreshes[](#recover-from-unsuccessful-refreshes)

If the refresh request ended in one of the statuses listed above for unsuccesful refreshes, you need to direct the end user to update their consent. For more information, see [Updating a consent](https://docs.tink.com/resources/account-check/managing-consents#updating-a-consent).
