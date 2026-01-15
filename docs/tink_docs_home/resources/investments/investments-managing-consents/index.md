---
title: "Managing consents - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/investments/investments-managing-consents/"
exportedAt: "2026-01-13T12:45:04.804Z"
---
## List provider consents[](#list-provider-consents)

The Provider Consent model gives details about the state of the consents that a user has given for a financial institution. A user can give multiple consents, for one or multiple financial institutions. For more details on Provider Consent, see our [API Reference](/Tiny-doc/tink_docs_api/api/#connectivity/provider-consent).

To list provider consents, you must generate a `user access token` with the scope `provider-consents:read`. For instructions on how to generate an access token, see [Get a user access token](/Tiny-doc/tink_docs_home/resources/investments/investments-continuous-access-to-a-bank-account/#get-a-user-access-token).

Get the list of consents

```
curl -v https://api.tink.com/api/v1/provider-consents \
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

## Update a consent[](#update-a-consent)

An existing consent may stop working. This can be due to an expired session or to a bank that requires end-user reauthentication.

Update a consent to recover access to accounts. This is done by updating the consent to extend the validity of the session.

To update a consent, you must redirect your user to a Tink Link URL and include the `credentialsId` field of the consent and a single-use `authorization code`.

To update a consent, you must redirect your user to Tink Link, including both the `credentialsId` field of the consent you wish to renew and a single-use `authorization code`.

To generate the `authorization_code`, follow the steps in [Generate the code](/Tiny-doc/tink_docs_home/resources/investments/investments-continuous-access-to-a-bank-account/#generate-a-user-authorization-code-and-grant-user-access).

Generate your authorization\_code

```
https://link.tink.com/1.0/products/update-consent?client_id=&redirect_uri=&credentials_id=&authorization_code=&market=
```

For more information on which parameters can be provided to the update-consent method in Tink Link, see [Update consent](/Tiny-doc/tink_docs_home/resources/investments/investments-managing-consents/).

## Delete a consent[](#delete-a-consent)

To delete a consent, you must delete the corresponding `credentials` object. The examples in this section describe the process:

1.  Use the `authorization:grant` scope to authorize your app and get a `client access token`
2.  Use the `credentials:write` scope to generate a `user access token`.
    
    **Note**: use `user_id` or `external_user_id`, not both.
    
3.  Use the `user access token` to delete the credential for this specific user.

The following example shows how to use your `client_id` and `client_secret` to fetch your `client access token`, which is required to grant authorization. Use the `authorization:grant` scope to authorize your app and get a `client access token`. Use this value in your authorized app to grant authorization.

Get your client access token

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

Generate a `user access token` with the `credentials:write` scope.

**Note**: use `user_id` or `external_user_id`, not both.

Generate a user access token

```
curl -X POST https://api.tink.com/api/v1/oauth/authorization-grant \
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

Use the `user access token` to delete the credential for this specific user.

**Request example**

Delete the credential for a specific user

```
curl -v X DELETE https://api.tink.com/api/v1/credentials/{credentialsId} \
     -H 'Authorization: Bearer '
```

Tink returns an HTTP 204 status code if the deletion request was successful.

> **Important note:** Multiple consents that give access to the same account can exist in parallel. When you delete all consents that are related to an account, **the account information and its corresponding account information is permanently deleted.**

## Delete a user[](#delete-a-user)

When a user is deleted, all consents, related account information, and investment data are also permanently deleted.

To delete a user, you must generate a `user access token` with the scope `user:delete`. See step 4 of this [guide](/Tiny-doc/tink_docs_home/resources/investments/investments-continuous-access-to-a-bank-account/#get-a-user-access-token) for instructions on how to generate an access token.

**Request example**

Delete a user

```
curl -v -X POST https://api.tink.com/api/v1/user/delete \
-H 'Authorization: Bearer ' \
```
