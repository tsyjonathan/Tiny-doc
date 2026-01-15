---
title: "Skip the AIS SCA - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/one-sca-for-one-time-payments/"
exportedAt: "2026-01-13T12:42:51.191Z"
---
## Configuring your flow for one SCA step[](#configuring-your-flow-for-one-sca-step)

Some bank connections require only one SCA step by default. These providers are considered “PIS only.” In these cases, Tink can always initiate the payment and redirect to the bank for the PIS SCA without needing the source account or account aggregation. If any account selection is needed, it would occur on the bank side.

If a bank connection does not have one SCA step as default behavior, you can still achieve a one SCA flow in one of two ways.

1.  **Provide the source account.** Some banks allow one SCA step if the source account is preselected during payment initiation. If the source account is not provided, then the bank will require an AIS step as part of the payment initiation. [Learn more about source account preselection](/Tiny-doc/tink_docs_home/resources/one-time-payments/payments-flow-optimization-source-account-preselection/)
    
2.  **Use long-lived consent.** When a user has valid long-lived consent, they will have one SCA during payment initiation. Otherwise, they will also go through an AIS step. You manage user consent by creating permanent users. [Learn more about permanent users](/Tiny-doc/tink_docs_home/resources/payments/use-only-one-sca-with-permanent-users/)
    

## Skip SCA by providing the source account[](#skip-sca-by-providing-the-source-account)

**Prerequisites**

-   [Learn how to create and use sessions](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/one-time-payments-sdk-sessions/)
-   [Learn how to retrieve a user's source account](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/payments-flow-optimization-source-account-preselection/)

**Limitations**

-   This solution doesn't support bundling with [Risk products](/Tiny-doc/tink_docs_api/api-risk/).

When a source account is provided, the user skips the first AIS SCA step and goes straight to the payment initiation SCA step.

*Image removed: The flow is reduced to the consent screen, signing the payment, and a payment success screen when the source account is provided and the bank is pre-selected* _Payments flow when the source account is provided and the bank is pre-selected._

To use this feature, send the user's source account through a [Tink Link session](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/one-time-payments-sdk-sessions/).

[Learn more about source account preselection](/Tiny-doc/tink_docs_home/resources/one-time-payments/payments-flow-optimization-source-account-preselection/)

**Example session request**

```
curl -X POST [external url removed] \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{ "source_account_number" : "iban://DE03500105177564668331"
}'
```

**Example response**

```
HTTP/ 1.1 200 OK
Content-Type: application/json
{
  "sessionId": "{SESSION_ID}"
}
```

You’ll know if a provider supports this solution if the `SOURCE_ACCOUNT_PROVIDED_SKIPS_AIS` rule for that provider’s payment conditions is `REQUIRED TRUE`. Otherwise, the user will continue to the AIS step.

[Learn more about payment conditions](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/payment-conditions-one-time-payments/)

## Skip SCA using long-lived consent[](#skip-sca-using-long-lived-consent)

**Prerequisites**

-   [Learn how to create and store permanent users](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/)

**Limitations**

-   This solution can’t be used with providers that are PIS only. In mixed markets, you might need to build your URL dynamically based on the provider.

When the user goes through an AIS flow for the first time, they can provide long-lived consent for up to 90 or 180 days, depending on the market. To do this, use [permanent users](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/).

There are two strategies for achieving a one SCA experience with permanent users, depending on which Tink products you use.

**Using Payments only**

With this strategy, you fetch consent during the [AIS + PIS journey](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/payments-flow-optimization-overview/).

*Image removed: Payment flow including bank selection and consent, aggregating the source account and approving consent, selecting the account, and payment signing* _Payment flow for permanent users who don't have valid consent before starting the flow_

*Image removed: Payment flow skipping AIS SCA, aggregation of source accounts, and account selection* _Payment flow for returning permanent users who have valid consent with source account preselected._

**Using Payments with Transactions continuous access**

With this strategy, you trigger a standalone AIS while connecting source accounts as part of the [Transactions continuous access journey](/Tiny-doc/tink_docs_home/resources/transactions/continuous-connect-to-a-bank-account/).

*Image removed: Bank selection and consent, AIS, connecting source accounts and approving long-lived consent screens* _Connecting a user's source account and collecting consent_

For each strategy, you will create a permanent user and generate a user authorization code. Then, you’ll create a URL that is specific to the strategy you’re using.

### Payments only[](#payments-only)

#### 1\. Create permanent users[](#create-permanent-users)

To skip the AIS SCA for users with valid consent, you will need to first [create permanent users](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/) using the following scopes:

When creating the [client access token](/Tiny-doc/tink_docs_home/resources/api-setup/retrieve-access-token/), use: `authorization:grant`, `payment:write`, `payment:read`, `provider-consents:read`, `transfer:execute`, `transfer:read`, `user:create`, `user:read`.

**Example of creating a client access token**

```
curl -X POST '[external url removed]' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=authorization:grant,payment:write,payment:read,provider-consents:read,transfer:execute,transfer:read,user:create,user:read'
```

When creating [delegated authorization](/Tiny-doc/tink_docs_api/api-general/#general/oauth/create-delegated-authorization) to retrieve an authorization code, use:`accounts:read`, `authorization:grant`, `authorization:read`, `credentials:read`, `credentials:refresh`, `credentials:write`, `payment:read`, `payment:write`, `provider-consents:read`, `providers:read`, `transfer:execute`, `transfer:read`, `user:create`, `user:read`.

**Example of creating delegated authorization**

```
curl -X POST '[external url removed]' \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'user_id=' \
-d 'id_hint=John%20Doe' \
-d 'actor_client_id=df05e4b379934cd09963197cc855bfe9' \
-d 'scope=accounts:read,authorization:grant,authorization:read,
credentials:read,credentials:refresh,credentials:write,payment:read,payment:write,provider-consents:read,providers:read,transfer:execute,transfer:read,user:create,user:read'
```

#### 2\. Build a Payments URL[](#build-a-payments-url)

Build a Payments URL and append `authorization_code={USER_AUTHORIZATION_CODE}` as a query parameter.

**Example Payments URL**

```
[external url removed]
```

The success callback returns `&payment_request_id={YOUR_REQUEST_ID}`.

You can now trigger any number of payments with a single SCA during the market-specific validity period. Simply call each payment Tink Link with a new payment request ID and new delegated authorization code for a given user.

Then, when the user’s consent expires, they’ll go through the [normal AIS + PIS](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/payments-flow-optimization-overview/) flow where they can renew their consent.

### Using Payments with Transactions continuous access[](#using-payments-with-transactions-continuous-access)

#### 1\. Create permanent users[](#create-permanent-users)

To skip the AIS SCA for users with valid consent, you will need to first [create permanent users](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/) using the following scopes:

When creating the [client access token](/Tiny-doc/tink_docs_home/resources/api-setup/retrieve-access-token/), use: `authorization:grant`, `payment:write`, `payment:read`, `transfer:execute`, `transfer:read`, `user:create`, `user:read`.

**Example of creating a client access token**

```
curl -X POST '[external url removed]' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=authorization:grant,payment:write,payment:read,provider-consents:read,transfer:execute,transfer:read,user:create,user:read'
```

When creating \[delegated authorization\] to retrieve an authorization code, use: `accounts:read`, `authorization:grant`, `authorization:read`, `credentials:read`, `credentials:refresh`, `credentials:write`, `payment:read`, `payment:write`, `providers:read`, `transfer:execute`, `transfer:read`, `user:create`, `user:read`.

**Example of creating delegated authorization**

```
curl -X POST '[external url removed]' \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'user_id=' \
-d 'id_hint=John%20Doe' \
-d 'actor_client_id=df05e4b379934cd09963197cc855bfe9' \
-d 'scope=accounts:read,authorization:grant,authorization:read,
credentials:read,credentials:refresh,credentials:write,payment:read,payment:write,provider-consents:read,transfer:execute,transfer:read,user:create,user:read'
```

#### 2\. Get continuous access to a user's bank account[](#get-continuous-access-to-a-user-39-s-bank-account)

Build a Transactions URL and append `authorization_code={USER_AUTHORIZATION_CODE}` as well as these refreshable\_items as query parameters: `CHECKING_ACCOUNTS`, `CHECKING_TRANSACTIONS`, `CREDITCARD_ACCOUNTS`, `CREDITCARD_TRANSACTIONS`, `SAVING_ACCOUNTS`, `SAVING_TRANSACTIONS`, `TRANSFER_DESTINATIONS`.

**Example bundled Payments and Transactions URL**

```
[external url removed]
```

[Learn more about the `transactions/connected-accounts` endpoint](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-api-reference-products/#continuous-access-connect-accounts)

The callback URI returns `&credentials_id={YOUR_CREDENTIALS_ID}`.

#### 3\. Build a Payments URL[](#build-a-payments-url)

For as long as the user's consent is valid, you can build a Payments URL and append the `credentials_id` along with a new `authorization_code`.

**Example Payments URL with `credentials_id`**

```
[external url removed]
```

Whenever you trigger any AIS flow for a permanent user for another product, that user’s credentials will renew automatically. Otherwise, to refresh the user’s consent once it expires, follow the [managing consents guide](/Tiny-doc/tink_docs_home/resources/transactions/managing-consents/).
