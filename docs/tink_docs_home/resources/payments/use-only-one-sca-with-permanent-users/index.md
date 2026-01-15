---
title: "Use only one SCA with permanent users"
source: "/Tiny-doc/tink_docs_home/resources/payments/use-only-one-sca-with-permanent-users/"
exportedAt: "2026-01-13T12:57:12.506Z"
---
## Introduction[](#introduction)

AIS (Account Information Services) can be skipped by presenting a valid user consent, which is likely to increase your conversion rate. Permanent users must be used for markets that don't allow AIS to be skipped.

Learn how to skip AIS by choosing one of the two methods that are described in this article:

-   [Only Payments](#only-payments): select this method if you only use Payments (and not with another Tink product).
-   [Payments with another Tink product](#payments-with-another-tink-product): select this method if you use Payments with Account Check, Money Manager, or Transactions.

The first time the end user completes an AIS flow, they provide consent for 90 days. The consent can be stored and reused any number of times during the 90 days. To store and reuse their consent, permanent users must be used.

For more information on how to create permanent users, see [Permanent users](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/).

For more information on how source account preselection works, see [Source account preselection](/Tiny-doc/tink_docs_home/resources/payments/payment-initiation-flow-optimisation-source-account-preselection/).

![Flow optimization - generic - Overview-5](https://images.ctfassets.net/tmqu5vj33f7w/2Xv9LWlGXMV0cpPsFgAl6l/06954ce90b074db43b68103b40e8fd8f/Flow_optimization_-_generic_-_Overview-5.png) **Figure 1**: a typical flow where AIS screens are skipped.

## Flow descriptions[](#flow-descriptions)

You must enable permanent users to be able to skip the AIS step. As long as the end-user consent is valid, most banks allow you to skip the AIS SCA step.

For users that repeat payment initiation at least twice in 90 days, reuse the PSD2 consent that they provided as part of the [AIS + PIS flow](/Tiny-doc/tink_docs_home/resources/payments/payment-initiation-flow-optimisation-overview/#quot-ais-pis-quot-flow).

For information on which flow is supported by which bank, see [Payment conditions](/Tiny-doc/tink_docs_home/resources/payments/payment-conditions/).

![Flow optimization - generic - Overview-2](https://images.ctfassets.net/tmqu5vj33f7w/e4S8CrqIcWgguuV7iFrZx/bc01717dca6e78e7c12c97f906abae02/Flow_optimization_-_generic_-_Overview-2.png) **Figure 2**: a typical AIS+PIS flow that’s used by a first-time user. The user has provided 90-day consent and started payment.

To use this flow, follow the steps in [Only Payments](#only-payments).

![AIS ](https://images.ctfassets.net/tmqu5vj33f7w/2kpSPbuWEbkQvTwkKdHJm8/a40c9dba98ecec12cb2d732964d3663d/Group_4.png) **Figure 3**: a typical PIS flow that’s used by a first-time user. The user has provided 90-day consent and connected their bank account to Tink.

This scenario is suitable if you bundle Payments with [Account Check](/Tiny-doc/tink_docs_home/resources/account-check/) or [Transactions](/Tiny-doc/tink_docs_home/resources/transactions/).

To use this flow, follow the steps in [Payments with another Tink product](#payments-with-another-tink-product)

![Flow optimization - generic - Overview-3](https://images.ctfassets.net/tmqu5vj33f7w/65k6lKfGY6bo2cAkt8zF8h/cfb4555694fa29a5f45a2f047f6f1118/Flow_optimization_-_generic_-_Overview-3.png) **Figure 4**: a typical PIS flow where only one SCA is used.

Note: further optimize the flow by [preselecting the source account](/Tiny-doc/tink_docs_home/resources/payments/payment-initiation-flow-optimisation-source-account-preselection/). This reduces the number of screens, which is likely to increase your conversion rate.

## Only Payments[](#only-payments)

Follow the steps in this section if you use Payments by itself (and not together with another Tink product).

### 1\. Create a permanent user[](#create-a-permanent-user)

To create a user, create a [client access token](/Tiny-doc/tink_docs_home/resources/getting-started/retrieve-access-token/) with the scopeS `user:create` and `provider-consents:read`. For more information, see the [Create a permanent user](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/#generate-a-user-authorization-code) section of the _Permanent users_ article.

Tink must be granted access to perform certain actions on the user that you have created. To do this, you delegate access from your product to your Tink app. For information on how to do this, see the [Generate a user authorization code](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/#generate-a-user-authorization-code) section of the _Permanent users_ article.

To delegate authorization, you must use a [client access token](/Tiny-doc/tink_docs_home/resources/getting-started/retrieve-access-token/) with the `authorization:grant` and `provider-consents:read` scopes.

### 3\. Run the Tink URL with the user authorization code[](#run-the-tink-url-with-the-user-authorization-code)

The user authorization code `{USER_AUTHORIZATION_CODE}` is used to authenticate the existing user in the Tink URL. Do this by adding the `authorization_code={USER_AUTHORIZATION_CODE}` query parameter to your Tink URL.

#### Create your first payment[](#create-your-first-payment)

To create your first payment, follow all steps in [Initiate your first payment](/Tiny-doc/tink_docs_home/resources/payments/start-payment/).

Note: because permanent users is used, you must add `&authorization_code={USER_AUTHORIZATION_CODE}` to your Tink URL. If you don’t specify `&authorization_code`, you won't be able to utilise the benefits of this solution.

Example Tink URL:

```
https://link.tink.com/1.0/pay/direct?client_id={YOUR_CLIENT_ID}&redirect_uri={URL_TO_YOUR_PAGE}&market={MARKET}&payment_request_id={YOUR_REQUEST_ID}&authorization_code={USER_AUTHORIZATION_CODE}
```

The success callback now returns `&payment_request_id={YOUR_REQUEST_ID}`.

From now on, each consecutive payment will require only a single SCA for the coming 90-day period. Call each consecutive payment Tink URL with a new delegated authorization code for the given user. If the user consent expires, the user will be prompted with an AIS SCA where the consent can be renewed.

## Payments with another Tink product[](#payments-with-another-tink-product)

Follow the steps in this section if you use Payment Initiation with another Tink product, in other words, Account Check, Money Manager, or Transactions.

### 1\. Create a permanent user[](#create-a-permanent-user)

To create a user, you must first create a [client access token](/Tiny-doc/tink_docs_home/resources/getting-started/retrieve-access-token/) with the scope `user:create`. For more information, see the [Create a permanent user](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/#create-a-permanent-user) section of the _Permanent users_ article.

### 2\. Generate a user authorization code[](#generate-a-user-authorization-code)

Tink must be granted access to perform certain actions on the user that you have created. To do this, you delegate access from your product to your Tink app. For information on how to do this, see the [Generate a user authorization code](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-permanent-users/#generate-a-user-authorization-code) section of the Permanent users article.

To delegate authorization, you must use a [client access token](/Tiny-doc/tink_docs_home/resources/getting-started/retrieve-access-token/) with the scope `authorization:grant`.

### 3\. Run the Tink URL with the user authorization code[](#run-the-tink-url-with-the-user-authorization-code)

The created `USER_AUTHORIZATION_CODE` is used to authenticate the existing user inside Tink Link. This is done by adding the `authorization_code={USER_AUTHORIZATION_CODE}` query parameter to your Tink URL.

#### Create credentials[](#create-credentials)

To [add credentials](/Tiny-doc/tink_docs_api/api/#connectivity/credentials) to either a new or existing user (who may have other credentials already), initiate the Tink Link add credentials flow and specify the authorization\_code as a query parameter on the URL.

```
https://link.tink.com/1.0/credentials/add
```

| Parameter | Description |
| --- | --- |
| client\_id | Required. Your client identifier. |
| redirect\_uri | Required. Your redirect URI. |
| authorization\_code | Required. The created `USER_AUTHORIZATION_CODE`. |
| scope | Optional. By default, the `ACCOUNTS`, `EINVOICES`, and `TRANSFER_DESTINATIONS` refreshable items will be included. In addition, you can also include `TRANSACTIONAL_ACCOUNTS_AND_TRANSACTIONS` and `IDENTITY_DATA` by specifying `transactions:read` and `identity:read`, respectively. |

For a list of all the available parameters, see [Tink Link API reference for Account Aggregation](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-api-reference-account-aggregation/).

Example of AIS Tink URL:

```
https://link.tink.com/1.0/credentials/add?client_id={YOUR_CLIENT_ID}&scope=transactions:read,identity:read&redirect_uri=http://localhost:3000/callback&authorization_code={USER_AUTHORIZATION_CODE}
```

The callback URI returns `&credentials_id={id_for_created_credentials}`. Add the `credentials_id` to your Tink URL for every PIS flow together with the new `authorization_code`.

Example of PIS Tink URL:

```
https://link.tink.com/1.0/pay/credentials?client_id={YOUR_CLIENT_ID}&scope=transactions:read,identity:read&redirect_uri=http://localhost:3000/callback&authorization_code={USER_AUTHORIZATION_CODE}
```

Repeat steps 1-3 to run each consecutive payment with only one SCA for the Payment Initiation in the next 90 days from the day that consent was given.
