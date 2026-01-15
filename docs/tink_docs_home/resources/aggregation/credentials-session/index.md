---
title: "Credentials Session - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/aggregation/credentials-session/"
exportedAt: "2026-01-13T12:55:27.692Z"
---
For credentials with access type `OPEN_BANKING`, a session with a bank is created for a user after they have given consent. Consent is usually valid for a long period of time (typically 90 days). The session identifies the granted consent and the customer's data can be aggregated without interaction from the user as long as the session is valid. Example credentials object:

```
{
    "id": "CREDENTIAL_ID",
    "providerName": "PROVIDER_NAME",
    "type": "PASSWORD",
    "status": "UPDATED",
    "statusUpdated": 1584444226324,
    "statusPayload": "Updated.",
    "updated": 1584444226324,
    "sessionExpiryDate": 1584444757310,
    "userId": "USER_ID"
}
```

**Note**:  
For the above credential, the session expiry date is _March 17, 2020 11:32:37.310 AM GMT_

The `sessionExpiryDate` indicates when the session for a credential will expire. This field is represented by UNIX Epoch time in milliseconds. After session expiration, the user will need to grant a new consent (typically by performing SCA) before being able to aggregate data again for that credential.

The session is usually created by using the OAuth 2.0 standard (or something similar), where a session is represented by an access token and a refresh token.

-   An _access token_ is usually a short-lived token that allows access to the user's data.
-   A _refresh token_ carries the information necessary to obtain a renewed access token.
    -   You can request a new access token using a valid refresh token without needing the user to authenticate again.
    -   `sessionExpiryDate` is calculated using the refresh token lifetime.

**Note**: Both tokens' lifetimes can be specified by the bank when they are issued. If the bank doesn’t specify the lifetime of the session (refresh token), the session lifetime is assumed to be 90 days.

In order to use the created open banking session during its lifetime, permanent users have to be created, as snapshot credentials are deleted shortly after creation (before the session expires).

## What happens to credentials when the session expires?[](#what-happens-to-credentials-when-the-session-expires-)

Once a credential's session has expired, refreshes will not be possible without user interaction. This means that:

-   Background refreshes will fail
-   Manual refresh request will fail

If the session has expired, Tink will not attempt to do a background refresh for that credential. If you attempt to perform a refresh of expired credentials via the [refresh endpoint](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/refresh-credentials) and set the `userAvailableForInteraction` flag to false inside the `userAvailability` object, the request will fail and the credentials status will be set to `SESSION_EXPIRED`.

In order to use this credential again, you can re-authenticate towards the bank using:

-   [authenticate](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/manual-authenticate-of-credentials) endpoint.
-   [refresh endpoint](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/refresh-credentials) with the `authenticate` query parameter and making sure the to set the `userPresent` and `userAvailableForInteraction` flags to true inside the `userAvailability` object.

It is important to handle all credential statuses when polling the credential's status. There are multiple scenarios where a credential might go in an error state even with an active session, and might need user interaction to proceed with a refresh. For example:

-   Credential status will change to `AWAITING_THIRD_PARTY_APP_AUTHENTICATION` if the session has been invalidated at the bank side, even if the session expiry date is not reached.
-   Credential status will change to `AUTHENTICATION_ERROR` if the third party app authentication times out.

You can find the list of possible credential statuses in the [API documentation](/Tiny-doc/tink_docs_api/api/#connectivity/credentials).

## Testing session expiration behaviour[](#testing-session-expiration-behaviour)

**Provider** : `<market>-test-open-banking-redirect-configurable-session-expiry`

The test provider “Demo Open Banking Redirect (successful - configurable session expiry)” can be used to test the session expiration behaviour.

This provider has a field `sessionExpiryTime` where you can enter the session expiration time in seconds (between 1 second to 7776000 seconds) to configure the expiration time for the access token(usually set 90 days by other providers). This provider has the same capabilities and authentication flow as the [`<market>`\-test-open-banking-redirect provider](/Tiny-doc/tink_docs_home/resources/aggregation/test-open-banking-redirect/).

You can get more information about how to use the test providers [here](/Tiny-doc/tink_docs_home/resources/aggregation/use-test-providers/).

**Refreshing Credentials**

1.  Create a new credential and specify the `sessionExpiryTime` to the intended time (a few minutes is a reasonable value to do the test).
2.  The user will be redirected and presented with a screen asking them to identify themselves towards the bank. This simulates the process of the user logging in to their bank via the bank's web interface or mobile app.
3.  Before the specified session lifetime is passed, refresh the created credentials. This will trigger a refresh without requiring the user to authenticate.
4.  Once the specified `sessionExpiryDate` is passed, refresh the credentials again. This time the session will expire and the user will be redirected to the bank screen to re-authenticate himself again.
5.  After the authentication, a new session towards the bank will be created (new expiry date) and the credentials will be refreshed.

You can read more about credential refresh [here](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/refresh-credentials).

**Re-authenticate credentials**

1.  Create new credentials and specify the `sessionExpiryTime` to the intended time (a few minutes is a reasonable value to do the test).
2.  The user will be redirected and presented with a screen asking them to identify themselves towards the bank. This simulates the process of the user logging in to their bank via the bank's web interface or mobile app.
3.  Before the specified session lifetime is passed, do a manual authentication for the credentials. The user will be redirected to the bank screen to re-authenticate himself again. This step can also be done after the credentials session is expired.The call for manual authentication should only be made when the user is present to perform the authentication.
4.  After the authentication, a new session towards the bank will be created with a new expiry date, but the credentials will not be refreshed.
5.  Refreshing the credentials the credentials will not require a user interaction until the new session expiry date.

You can read more about credentials [here](/Tiny-doc/tink_docs_api/api/#connectivity/credentials).
