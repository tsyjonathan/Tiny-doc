---
title: "Refresh data - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/business-transactions/business-refresh-data/"
exportedAt: "2026-01-13T12:46:46.977Z"
---
To refresh data means to use Tink's API to check a bank account for new data. When using continuous access, Tink will automatically fetch account data from an account, which usually happens every 6 hours. This doesn't require user input. In addition, you may also want to trigger updates at a specific moment.

## 1\. List provider consents for the user[](#list-provider-consents-for-the-user)

The [Provider Consent](/Tiny-doc/tink_docs_api/api/#connectivity/provider-consent) endpoint gives details about the state of end-user consents with financial institutions.

Before you refresh data, you must identify which specific consent you want to refresh.

Retrieve the list of consents

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

## 2\. Identify the consent that you wish to refresh[](#identify-the-consent-that-you-wish-to-refresh)

The response includes one or more consents for the user. Identify which consent you want to refresh and store the `credentialId` and `statusUpdated` values for that consent. You must identify which `credentialId` to refresh before you can trigger a refresh request.

Most consents can be refreshed without user interactions, but not all. Most non-open-banking authentications require user interaction. For example, when the end user must enter a one-time password at every log in.

Make sure that the `sessionExpiryDate` is valid, meaning that the date isn't passed.

## 3\. Refresh the corresponding credential[](#refresh-the-corresponding-credential)

We limit excessive amounts of API requests per app. If your request is rate limited, you will receive a 204 response here, but the status will not change in step 4. For more information on rate limiting, see [Rate limits](/Tiny-doc/tink_docs_api/api/#introduction/rate-limits).

Refresh the credential

```
curl -v -X POST https://api.tink.com/api/v1/credentials/{credentialsId}/refresh
-H 'Authorization: Bearer '
```

The response is a HTTP 204 status code that means Tink has received your request.

This response does not confirm that your refresh is successfully executed. Check the status of the refresh attempt to verify whether it was successful or not.

## 4\. Handle the refresh[](#handle-the-refresh)

### 4.1 Subscribe to webhooks (recommended)[](#subscribe-to-webhooks-recommended-)

To manage user data after a refresh, you can subscribe to webhooks for notifications on events. To learn more about subscribing and using these events, check out the [Webhooks for Business Transactions](/Tiny-doc/tink_docs_home/resources/business-transactions/webhooks-for-business-transactions/) article.

### 4.2 Poll for changes (optional)[](#poll-for-changes-optional-)

If you don’t want to subscribe to webhooks, instead monitor the refresh progress by polling the Provider Consent endpoint every 1-2 seconds. To do this, repeat the API call in section 1.

Observe for changes to the `status` field of the consent for which you have requested a refresh. Keep polling this endpoint until one of the following conditions is met:

-   **Refresh successful:** The `statusUpdated` timestamp has changed, and the `status` is now `UPDATED`. You can now go ahead and [list transactions](/Tiny-doc/tink_docs_home/resources/business-transactions/list-business-transactions/).
-   **Refresh in progress:** Statuses `UPDATING` and `AUTHENTICATING` indicate that the refresh is in process. Keep polling and monitor for further changes.
-   **Refresh unsuccessful:** The `statusUpdated` timestamp has changed, but the status is one of the following: `AUTHENTICATION_ERROR`, `TEMPORARY_ERROR`, `AWAITING_SUPPLEMENTAL_INFORMATION`, `AWAITING_MOBILE_BANKID_AUTHENTICATION`, `AWAITING_THIRD_PARTY_APP_AUTHENTICATION`, or `SESSION_EXPIRED`. These indicate that **user intervention is required**.

## 5\. Recover from unsuccessful refreshes[](#recover-from-unsuccessful-refreshes)

If the refresh request ended in one of the statuses listed above for unsuccesful refreshes, you need to direct the end user to update their consent. For more information, see [Updating a consent](/Tiny-doc/tink_docs_home/resources/business-transactions/business-managing-consents/#updating-a-consent).
