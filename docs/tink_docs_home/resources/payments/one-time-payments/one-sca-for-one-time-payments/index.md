---
title: "Skip the AIS SCA - Tink Docs"
source: "https://docs.tink.com/resources/payments/one-time-payments/one-sca-for-one-time-payments"
exportedAt: "2026-01-13T12:42:51.191Z"
---
## Configuring your flow for one SCA step[](#configuring-your-flow-for-one-sca-step)

Some bank connections require only one SCA step by default. These providers are considered “PIS only.” In these cases, Tink can always initiate the payment and redirect to the bank for the PIS SCA without needing the source account or account aggregation. If any account selection is needed, it would occur on the bank side.

If a bank connection does not have one SCA step as default behavior, you can still achieve a one SCA flow in one of two ways.

1.  **Provide the source account.** Some banks allow one SCA step if the source account is preselected during payment initiation. If the source account is not provided, then the bank will require an AIS step as part of the payment initiation. [Learn more about source account preselection](https://docs.tink.com/resources/one-time-payments/payments-flow-optimization-source-account-preselection)
    
2.  **Use long-lived consent.** When a user has valid long-lived consent, they will have one SCA during payment initiation. Otherwise, they will also go through an AIS step. You manage user consent by creating permanent users. [Learn more about permanent users](https://docs.tink.com/resources/payments/use-only-one-sca-with-permanent-users)
    

## Skip SCA by providing the source account[](#skip-sca-by-providing-the-source-account)

**Prerequisites**

-   [Learn how to create and use sessions](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-sdk-sessions)
-   [Learn how to retrieve a user's source account](https://docs.tink.com/resources/payments/one-time-payments/payments-flow-optimization-source-account-preselection)

**Limitations**

-   This solution doesn't support bundling with [Risk products](https://docs.tink.com/api-risk).

When a source account is provided, the user skips the first AIS SCA step and goes straight to the payment initiation SCA step.

![The flow is reduced to the consent screen, signing the payment, and a payment success screen when the source account is provided and the bank is pre-selected](https://images.ctfassets.net/tmqu5vj33f7w/5sZ3k571S0nTt45Ow2kONw/a566f30d9188ba17ca117fb294324592/Flow_optimization_-_source_account_provided.jpg) _Payments flow when the source account is provided and the bank is pre-selected._

To use this feature, send the user's source account through a [Tink Link session](https://docs.tink.com/resources/payments/one-time-payments/one-time-payments-sdk-sessions).

[Learn more about source account preselection](https://docs.tink.com/resources/one-time-payments/payments-flow-optimization-source-account-preselection)

**Example session request**

```
curl -X POST https://api.tink.com/link/v1/session \
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

[Learn more about payment conditions](https://docs.tink.com/resources/payments/one-time-payments/payment-conditions-one-time-payments)

## Skip SCA using long-lived consent[](#skip-sca-using-long-lived-consent)

**Prerequisites**

-   [Learn how to create and store permanent users](https://docs.tink.com/resources/tink-link-web/tink-link-web-permanent-users)

**Limitations**

-   This solution can’t be used with providers that are PIS only. In mixed markets, you might need to build your URL dynamically based on the provider.

When the user goes through an AIS flow for the first time, they can provide long-lived consent for up to 90 or 180 days, depending on the market. To do this, use [permanent users](https://docs.tink.com/resources/tink-link-web/tink-link-web-permanent-users).

There are two strategies for achieving a one SCA experience with permanent users, depending on which Tink products you use.

**Using Payments only**

With this strategy, you fetch consent during the [AIS + PIS journey](https://docs.tink.com/resources/payments/one-time-payments/payments-flow-optimization-overview).

![Payment flow including bank selection and consent, aggregating the source account and approving consent, selecting the account, and payment signing](https://images.ctfassets.net/tmqu5vj33f7w/6b0veiKmKRyt5Av3HSzKX3/e6fc483b3204d19b657ec6d56f7da04c/AIS_PIS_flow_with_consent.jpg) _Payment flow for permanent users who don't have valid consent before starting the flow_

![Payment flow skipping AIS SCA, aggregation of source accounts, and account selection](https://images.ctfassets.net/tmqu5vj33f7w/5qp5PQk1CTNQHtO8oIvzxS/0172039e507c35bc08e451b7135022f4/Flow_overview_-_permanent_users_with_source_account_preselected.jpg) _Payment flow for returning permanent users who have valid consent with source account preselected._

**Using Payments with Transactions continuous access**

With this strategy, you trigger a standalone AIS while connecting source accounts as part of the [Transactions continuous access journey](https://docs.tink.com/resources/transactions/continuous-connect-to-a-bank-account).

![Bank selection and consent, AIS, connecting source accounts and approving long-lived consent screens](https://images.ctfassets.net/tmqu5vj33f7w/3f0pIbekLs24iE1sMVZtTX/0abdab6cca38b151b4019e15a7a58231/Connect_source_account_and_collect_consent.png) _Connecting a user's source account and collecting consent_

For each strategy, you will create a permanent user and generate a user authorization code. Then, you’ll create a URL that is specific to the strategy you’re using.

### Payments only[](#payments-only)

#### 1\. Create permanent users[](#create-permanent-users)

To skip the AIS SCA for users with valid consent, you will need to first [create permanent users](https://docs.tink.com/resources/tink-link-web/tink-link-web-permanent-users) using the following scopes:

When creating the [client access token](https://docs.tink.com/resources/api-setup/retrieve-access-token), use: `authorization:grant`, `payment:write`, `payment:read`, `provider-consents:read`, `transfer:execute`, `transfer:read`, `user:create`, `user:read`.

**Example of creating a client access token**

```
curl -X POST 'https://api.tink.com/api/v1/oauth/token' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=authorization:grant,payment:write,payment:read,provider-consents:read,transfer:execute,transfer:read,user:create,user:read'
```

When creating [delegated authorization](https://docs.tink.com/api-general#general/oauth/create-delegated-authorization) to retrieve an authorization code, use:`accounts:read`, `authorization:grant`, `authorization:read`, `credentials:read`, `credentials:refresh`, `credentials:write`, `payment:read`, `payment:write`, `provider-consents:read`, `providers:read`, `transfer:execute`, `transfer:read`, `user:create`, `user:read`.

**Example of creating delegated authorization**

```
curl -X POST 'https://api.tink.com/api/v1/oauth/authorization-grant/delegate' \
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
https://link.tink.com/1.0/pay/direct?client_id=&redirect_uri=&market=&payment_request_id=&authorization_code=
```

The success callback returns `&payment_request_id={YOUR_REQUEST_ID}`.

You can now trigger any number of payments with a single SCA during the market-specific validity period. Simply call each payment Tink Link with a new payment request ID and new delegated authorization code for a given user.

Then, when the user’s consent expires, they’ll go through the [normal AIS + PIS](https://docs.tink.com/resources/payments/one-time-payments/payments-flow-optimization-overview) flow where they can renew their consent.

### Using Payments with Transactions continuous access[](#using-payments-with-transactions-continuous-access)

#### 1\. Create permanent users[](#create-permanent-users)

To skip the AIS SCA for users with valid consent, you will need to first [create permanent users](https://docs.tink.com/resources/tink-link-web/tink-link-web-permanent-users) using the following scopes:

When creating the [client access token](https://docs.tink.com/resources/api-setup/retrieve-access-token), use: `authorization:grant`, `payment:write`, `payment:read`, `transfer:execute`, `transfer:read`, `user:create`, `user:read`.

**Example of creating a client access token**

```
curl -X POST 'https://api.tink.com/api/v1/oauth/token' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=authorization:grant,payment:write,payment:read,provider-consents:read,transfer:execute,transfer:read,user:create,user:read'
```

When creating \[delegated authorization\] to retrieve an authorization code, use: `accounts:read`, `authorization:grant`, `authorization:read`, `credentials:read`, `credentials:refresh`, `credentials:write`, `payment:read`, `payment:write`, `providers:read`, `transfer:execute`, `transfer:read`, `user:create`, `user:read`.

**Example of creating delegated authorization**

```
curl -X POST 'https://api.tink.com/api/v1/oauth/authorization-grant/delegate' \
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
https://link.tink.com/1.0/transactions/connect-accounts?client_id=&refreshable_items=CHECKING_ACCOUNTS,CHECKING_TRANSACTIONS,SAVING_ACCOUNTS,SAVING_TRANSACTIONS,CREDITCARD_ACCOUNTS,CREDITCARD_TRANSACTIONS,TRANSFER_DESTINATIONS&redirect_uri=&locale=en_US&market=&authorization_code=
```

[Learn more about the `transactions/connected-accounts` endpoint](https://docs.tink.com/resources/tink-link-web/tink-link-web-api-reference-products#continuous-access-connect-accounts)

The callback URI returns `&credentials_id={YOUR_CREDENTIALS_ID}`.

#### 3\. Build a Payments URL[](#build-a-payments-url)

For as long as the user's consent is valid, you can build a Payments URL and append the `credentials_id` along with a new `authorization_code`.

**Example Payments URL with `credentials_id`**

```
https://link.tink.com/1.0/pay/credentials?client_id=&redirect_uri=&market=&payment_request_id=&authorization_code=&credentials_id=
```

Whenever you trigger any AIS flow for a permanent user for another product, that user’s credentials will renew automatically. Otherwise, to refresh the user’s consent once it expires, follow the [managing consents guide](https://docs.tink.com/resources/transactions/managing-consents).
