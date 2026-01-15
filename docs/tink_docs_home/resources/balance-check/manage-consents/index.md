---
title: "Manage consents - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/balance-check/manage-consents/"
exportedAt: "2026-01-13T12:44:19.004Z"
---
## 1\. List provider consents[](#list-provider-consents)

The Provider Consent model gives details about the state of the consents that a user has given for a financial institution. A user can give multiple consents, for one or multiple financial institutions. For more details on Provider Consent, see our [API Reference](/Tiny-doc/tink_docs_api/api/#connectivity/provider-consent).

To list provider consents, you must generate a user access token with the scope provider-consents:read. For instructions on how to generate an access token, see [Balance Check integration](/Tiny-doc/tink_docs_home/resources/account-check/balance-check-integration/#consent-management).

The Provider Consent model gives details about the state of the consents that a user has given for a financial institution. A user can give multiple consents, for one or multiple financial institutions. For more details on Provider Consent, see our [API Reference](/Tiny-doc/tink_docs_api/api/#connectivity/provider-consent).

Get the list of consents

```
curl -v [external url removed] \
     -H 'Authorization: Bearer '
```

**Response example**

```
{
  "providerConsents": [
    {
      "accountIds": [
        "6696428766444944ab19f7756376d363",
        "9bdd7d50c1f14946b6d22b198d1696b4"
      ],
      "credentialsId": "6e68cc6287704273984567b3300c5822",
      "detailedError": {
        "details": {
          "reason": "STATIC_CREDENTIALS_INCORRECT",
          "retryable": true
        },
        "displayMessage": "The bank rejected the login credentials that you entered.",
        "type": "USER_LOGIN_ERROR"
      },
      "providerName": "uk-demobank-open-banking-redirect",
      "sessionExpiryDate": 1493379467000,
      "status": "UPDATED",
      "statusUpdated": 1493379467000
    }
  ]
}
```

## 2\. Update a consent[](#update-a-consent)

An existing consent may stop working. This can be due to an expired session or to a bank that requires end-user reauthentication.

Update a consent to recover access to accounts. This is done by updating the consent to extend the validity of a session.

To update a consent, you must redirect your user to a Tink URL and include the `credentialsId` field of the consent and a single-use authorization code.

Refresh consent

```
[external url removed]
```

## 3\. Delete a consent[](#delete-a-consent)

To delete a consent, you must delete the corresponding credentials object. The examples in this section describe the process:

1.  Use the `authorization:grant` scope to authorize your app and get a client access token.
2.  Use the `credentials:write` scope to generate a user access token.
    
    **Note**: use `user_id` or `external_user_id`, not both.
    
3.  Use the user access token to delete the credential for this specific user.

The following example shows how to use your `client_id` and `client_secret` to fetch your client access token, which is required to grant authorization. Use the `authorization:grant` scope to authorize your app and get a client access token. Use this value in your authorized app to grant authorization.

Get your client access token

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

Generate a user access token with the `credentials:write` scope.

**Note**: use `user_id` or `external_user_id`, not both.

Generate a user access code

```
curl -X POST [external url removed] \
-H 'Authorization: Bearer ' \
-d 'user_id=' \
-d 'external_user_id=' \
-d 'scope=credentials:write'
```

**Response example**

```
{
  "code": "{USER_AUTHORIZATION_CODE}"
}
```

Generate a user access token

```
curl -v -X POST [external url removed] \
-d 'code=' \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=authorization_code'
```

**Response example**

```
{
    "access_token": "USER_ACCESS_TOKEN",
    "token_type": "bearer",
    "expires_in": 1800,
    "refresh_token": "REFRESH_TOKEN",
    "scope": "credentials:write"
}
```

Use the user access token to delete the credential for this specific user.

**Request example**

Delete the credential for a specific user

```
curl -v X DELETE [external url removed] \
     -H 'Authorization: Bearer '
```

Tink returns an HTTP 204 status code if the deletion request was successful.

> **Important note:** Multiple consents that give access to the same account can exist in parallel. When you delete all consents that are related to an account, **the account information and its corresponding transactions is permanently deleted.**

## 4\. Delete a user[](#delete-a-user)

When a user is deleted, all consents, related account information, and transactions are also permanently deleted.

It is important to know that deletion of users set up for continuous access will never be deleted by Tinks initiative, but instead all responsibility to remove users that should no longer be stored by Tink, is the customers responsibility.

To delete a user, you must generate a user access token with the scope `user:delete`.

**Request example**

Delete a user

```
curl -v -X POST [external url removed] \
-H 'Authorization: Bearer ' \
```
