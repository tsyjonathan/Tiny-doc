---
title: "Consent reconfirmation - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/transactions/consent-reconfirmation/"
exportedAt: "2026-01-13T12:46:01.103Z"
---
## Introduction[](#introduction)

Open banking for the UK is moving to an open-ended consent expiration scheme, where users only need to perform a single SCA to give consent. The consent is valid for 90 days, after which the user can choose to extend consent for another 90 days.

## How to integrate[](#how-to-integrate)

Reconfirm consent in one of two ways: build a Tink Link URL or call our API.

If you use Tink's license, you must build a Tink Link URL.

If you use your own license, either build a Tink Link URL or call our API: choose the way that best fits your use case.

If a credential has the `sessionExtendable` flag set to `true` it can be extended even after the `sessionExpiry` date has been met. When extending a session only the last 90 days of transactions are fetched from the bank. Therefore, if the session is extended more than 90 days after session has expired there will be a gap in the transaction history from the session expiry date until the date of extension minus 90 days. To avoid this issue you can trigger an authentication for the user and request a longer history of transactions in order to fill in the gap.

## Build a Tink Link URL[](#build-a-tink-link-url)

When your users are in their Tink screen flow, they're presented with a reconfirmation screen. Here, they must confirm that they want to continue to allow access to their account information.

To extend a consent session, redirect your user to the “Extend Consent” Tink URL and include the `credentialsId` field of the consent and a single-use authorization code. To generate the `authorization_code`, follow the steps in [Generate the code](/Tiny-doc/tink_docs_home/resources/transactions/continuous-connect-to-a-bank-account/#generate-the-code).

**Input parameters (required):**

-   client\_id
-   authorization\_code
-   redirect\_uri
-   credentials\_id

Tink URL Example

```
https://link.tink.com/1.0/transactions/extend-consent?client_id=9e5c952c2f3043e8bf4b0b74fb655846&redirect_uri=https://console.tink.com/callback&credentials_id=472b754c357848e7b26dc54ca0a2e695&authorization_code=452bf92a5ed74ef9b4059999ef20f412
```

Callback example

```
https://console.tink.com/callback?credentialsId=472b754c357848e7b26dc54ca0a2e695&credentials_id=472b754c357848e7b26dc54ca0a2e695
```

After the session is successfully extended, the consent is returned to `UPDATED` to indicate that no additional action is necessary. It is now possible to do an on-demand refresh and Tink will start attempting to background-refresh the consent during the next background-refresh window.

## Use the Tink API[](#use-the-tink-api)

If you use your own license and you use the Tink API to reconfirm consent, you are responsible for building your own user flows in accordance with relevant regulatory requirements, subsequently calling the `POST /api/v1/provider-consents:extend` endpoint once the user has completed the flow on your side.

For the UK market, this means adhering to [the UK Open Banking Standards](https://standards.openbanking.org.uk/customer-experience-guidelines/appendices/90-days-reauthentication-delegated-sca/latest/).

After you have obtained consent reconfirmation, call the [Extend a consent](/Tiny-doc/tink_docs_api/api/#connectivity/provider-consent/extend-a-consent) endpoint.

Request example

```
{
    "credentialsId" : "cb9dddc617c14f9c8908d36ab6afae47"
}
```

Response example

```
{
    "credentialsId": "cb9dddc617c14f9c8908d36ab6afae47",
    "providerName": "uk-demobank-open-banking-redirect-extendable",
    "status": "UPDATED",
    "sessionExpiryDate": 1676474050600,
    "sessionExtendable": true,
    "accountIds": [
        "6339cdc80400482d96b10f7f7b79de16"
    ],
    "statusUpdated": 1668698050616
}
```
