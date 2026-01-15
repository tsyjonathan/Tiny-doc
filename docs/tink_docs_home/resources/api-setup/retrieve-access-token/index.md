---
title: "How to get an access token with Tink Link"
source: "/Tiny-doc/tink_docs_home/resources/api-setup/retrieve-access-token/"
exportedAt: "2026-01-13T12:57:14.345Z"
---
## Retrieve access tokens[](#retrieve-access-tokens)

You can use the authorization `code` returned in the `redirect_uri` and exchange it for an `access_token`. This must be done via the Token API, using your `client_secret`, which you received with your `client_id`.

**Example OAuth Token request**

Retrieve your tokens

```
curl -v -X POST [external url removed] \
-d 'code=' \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=authorization_code'
```

If you provided the correct `code`, `client_id` and `client_secret`, you should get a successful response with an `access_token`.

**Example OAuth Token response**

```
{
    "access_token": "{YOUR_USER_ACCESS_TOKEN}",
    "token_type": "bearer",
    "expires_in": 7200,
    "scope": "accounts:read,statistics:read,transactions:read,user:read"
}
```

### In case of errors[](#in-case-of-errors)

If you get an error here, such as `401 Unauthorized`, this could have multiple reasons. It could for example be an invalid `client_secret` or an expired `code`. The `code` is short-lived, so generate a new one and try again.

> **NOTE**: Client applications should not depend on the `code`, the `access_token` to be in any specific format, and instead treat them as if they are opaque.
