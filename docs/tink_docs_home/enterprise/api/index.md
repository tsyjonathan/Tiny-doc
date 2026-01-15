---
title: "Tink Docs"
source: "/Tiny-doc/tink_docs_home/enterprise/api/"
exportedAt: "2026-01-13T12:54:38.624Z"
---
## Introduction[](#introduction)

> #### Base API URL[](#introduction/base-api-url)
> 
> [external url removed]
> 
> Use domain names, not specific IP addresses, when connecting to the Tink API. IP addresses are subject to change.

Welcome to the Tink API reference!

The reference provides a detailed explanation of all resources that are accessible through the Tink API. Our API is designed around REST, has predictable resource-oriented URLs, and uses standard HTTP verbs and status codes.

> #### Status codes[](#introduction/status-codes)
> 
> | Code | Description |
> | --- | --- |
> | 2xx | Status codes indicating successful requests. |
> | 4xx | The data sent from the client was not sent in a way the Tink servers expect. |
> | 5xx | An error happened in one of Tink's servers. |

## Message formats[](#introduction/message-formats)

Requests are sent as JSON or, in some cases, form-encoded. String properties are encoded using UTF-8, and date properties are represented by UNIX Epoch time in milliseconds or, in some cases, ISO 8601 strings.

## HTTPS and TLS[](#introduction/https-and-tls)

The Tink API will only serve traffic over HTTPS, and will include an HSTS response header in order to let browsers and other client software enforce this. TLS v1.2 or higher is required by the Tink API.

### Server certificate[](#introduction/https-and-tls/server-certificate)

The Tink API server certificate should be trusted by all up-to-date root certificate trust stores provided by operating systems and browsers. If your software uses a custom certificate trust store, also known as certificate pinning, you will have to trust the current and upcoming root certificates of the Certificate Authority (CA) used by the Tink API.

Ensure that your application trusts the following DigiCert root certificates:

-   DigiCert Global Root G2
-   DigiCert TLS ECC P384 Root G5
-   DigiCert TLS RSA4096 Root G5
-   DigiCert ECC P384 Root G5
-   DigiCert RSA4096 Root G5

Tink's certificates will be issued by an intermediate CA of any of the above DigiCert root CAs, and DigiCert replaces their intermediate CA certificates on a regular basis. Tink may also renew its DigiCert server certificates unannounced. To avoid unexpected connectivity issues, Tink recommends to only trust DigiCert's root certificates and avoid depending on any fixed part of the server certificate chain other than the root certificates.

## Versioning[](#introduction/versioning)

The API base URL contains a version identifier. The current version is `v1`. A few endpoints are available under `v2`. New properties and data models are continuously added and the API will remain backward compatible with this specification until deprecated. Please note that unknown fields that aren't listed in this reference may be present in response objects.

## Connectivity Versions and Endpoint Availability[](#introduction/connectivity-versions-and-endpoint-availability)

Connectivity APIs come in two versions: [Connectivity v1](/Tiny-doc/tink_docs_api/api/#connectivity-v1) and [Connectivity v2](/Tiny-doc/tink_docs_api/api/#connectivity-v2). The following table shows which connectivity endpoints are available per product. Some endpoints are only available for use with specific product configurations. For example, the [provider-consent](/Tiny-doc/tink_docs_api/api/#connectivity-v1/provider-consent) endpoint can only be used with Transactions/Business Transactions when the [Continuous Access](/Tiny-doc/tink_docs_home/resources/transactions/continuous-connect-to-a-bank-account/) feature is also used.

| Product | v1/credentials | v1/provider-consents | v2/consents |
| --- | --- | --- | --- |
| Account Check | X |  |  |
| Business Account Check | X |  |  |
| Transactions | X | X |  |
| Business Transactions | X | X |  |
| Account Aggregation | X |  |  |
| Data Enrichment | X |  |  |
| Income Check | X |  |  |
| Expense Check | X |  |  |
| Risk Insights | X |  |  |
| Payments | X |  |  |
| VRP |  |  | X |
| Money Manager | X |  |  |
| Investments | X | X |  |
| Loans | X | X |  |

## Rate limits[](#introduction/rate-limits)

> #### Rate limit error status code[](#introduction/rate-limits/rate-limit-error-status-code)
> 
> | Code | Description |
> | --- | --- |
> | 429 | Request rate limit is exceeded |

To ensure service stability, the Tink API validates request rate limits on a per app ID basis.

If you make an excessive amount of requests, you will receive an HTTP `429 Too Many Requests` response code. If this occurs during expected use of the Tink API, please contact Tink support to resolve the issue.

## Tracing requests[](#introduction/tracing-requests)

Tink's API has two HTTP headers that allow requests to be traced:

-   `X-Request-ID` is a header that's commonly used to trace requests. Tink's API doesn't accept the header in requests. Instead, it's returned in every response with a unique ID that's generated by Tink.
-   `X-Client-Trace-ID` is an optional request header that can be sent to Tink's API. There are no checks on this header and it's returned as-is in response.

For troubleshooting purposes, it's a good idea to log these headers. Please attach the logs if you contact Tink support as it'll help us to faster identify and resolve issues.

## Idempotency and caching[](#introduction/idempotency-and-caching)

Idempotency means that making multiple identical requests has the same effect as making a single request. Idempotency can be used to safely retry requests without accidentally performing the same operation twice.

Include the following header to perform an idempotent request: `Idempotency-Key: b5ed239e-3c72-433d-afe1-cfb137d76b2b`

Any header value can be used to perform an idempotent request. We recommend using a high entropy string when doing so, for example, UUID v4.

Results are saved only if an API endpoint started to execute. Idempotent results aren't saved if incoming parameters fail validation or if a request conflicts with another one that executed at the same time. Requests like these can safely be retried.

Keys are removed from the system after 24 hours and can be used again for subsequent requests.

## Authentication[](#introduction/authentication)

> [](#introduction/authentication/authentication-and-authorization-error-status-codes)
> 
> All endpoints that require a valid access token can respond with the following HTTP error status codes:
> 
> | Code | Description |
> | --- | --- |
> | 401 | Possible reasons include a missing `Authorization: Bearer {access token}` HTTP header and an expired access token. |
> | 403 | The access token is missing a required scope. |

Tink accepts both client credentials (`client_id` and `client_secret`) and mutual TLS authentication as OAuth client authentication methods to fulfill interoperability requirements.

Tink uses access tokens to authenticate and authorize API requests. The access token is provided through the HTTP `Authorization` header, such as `Authorization: Bearer {access token}`, and is valid for a limited time. When an access token has expired, the API call will return the HTTP status code `401 Unauthorized` and a new access token has to be acquired.

### Authentication guides[](#introduction/authentication/authentication-guides)

-   [Get an API token](/Tiny-doc/tink_docs_home/resources/api-setup/get-access-token/)
-   [Get an API token with Tink Link](/Tiny-doc/tink_docs_home/resources/api-setup/retrieve-access-token/)
-   [Use auth grant JWTs](/Tiny-doc/tink_docs_home/resources/api-setup/how-to-use-authorization-grant-jwts/)
-   [Use Mutual TLS](/Tiny-doc/tink_docs_home/resources/api-setup/set-up-mutual-tls-authentication/)

### Authorization scopes[](#introduction/authentication/authorization-scopes)

Access to Tink is divided into scopes that grant access to different API endpoints. Every API customer has access to a set of scopes that control data access.

A subset of scopes can be requested for each access token. For example, a full set of scopes could be `accounts:read,transactions:read`, but for a specific access token, it's possible to only request `accounts:read`. This way, you can request the right set of permissions dependant on your use case.

The available scopes for Tink's API are:

| Scope | Endpoints |
| --- | --- |
| calendar:read | 
[/api/v1/calendar/periods/{period}](/Tiny-doc/tink_docs_api/api-general/#general/calendar/get-period-details)

[/api/v1/calendar/periods](/Tiny-doc/tink_docs_api/api-general/#general/calendar/query-period-details)



 |
| user:read | 

[/api/v1/categories](/Tiny-doc/tink_docs_api/api-general/#general/category/list-categories)

[/api/v1/user](/Tiny-doc/tink_docs_api/api-general/#general/user/get-user)

[/api/v1/user/profile](/Tiny-doc/tink_docs_api/api-general/#general/user/get-user-profile)



 |
| authorization:grant | 

[/api/v1/oauth/authorization-grant](/Tiny-doc/tink_docs_api/api-general/#general/oauth/create-authorization)

[/api/v1/oauth/authorization-grant/delegate](/Tiny-doc/tink_docs_api/api-general/#general/oauth/create-delegated-authorization)



 |
| authorization:revoke | 

[/api/v1/oauth/revoke-all](/Tiny-doc/tink_docs_api/api-general/#general/oauth/revoke-all-tokens)



 |
| link-session:write | 

[/link/v1/session](/Tiny-doc/tink_docs_api/api-general/#general/tink-link/session/create-a-session)



 |
| user:create | 

[/api/v1/user/create](/Tiny-doc/tink_docs_api/api-general/#general/user/create-user)



 |
| user:delete | 

[/api/v1/user/delete](/Tiny-doc/tink_docs_api/api-general/#general/user/delete-user)



 |
| user:write | 

[/api/v1/user](/Tiny-doc/tink_docs_api/api-general/#general/user/update-user)

[/api/v1/user/profile](/Tiny-doc/tink_docs_api/api-general/#general/user/update-user-profile)



 |
| balance-refresh:readonly | 

[/api/v1/balance-refresh/{refreshId}](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/balance-refresh/get-balance-refresh-status)



 |
| balance-refresh | 

[/api/v1/balance-refresh](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/balance-refresh/request-balance-refresh)



 |
| credentials:refresh | 

[/api/v1/credentials/{id}/supplemental-information](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/credentials/add-supplemental-information)

[/api/v1/credentials/{id}/authenticate](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/credentials/manual-authenticate-of-credentials)

[/api/v1/credentials/{id}/refresh](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/credentials/refresh-credentials)



 |
| credentials:write | 

[/api/v1/credentials](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/credentials/create-credentials)

[/api/v1/credentials/{id}](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/credentials/delete-credentials)



 |
| credentials:read | 

[/api/v1/credentials/{id}](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/credentials/get-credentials)

[/api/v1/credentials/{id}/qr](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/credentials/get-qr-code)

[/api/v1/credentials/list](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/credentials/list-credentials)

[/api/v1/providers](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider/list-providers)



 |
| payment:read | 

[/api/v1/payments/providers/{name}/payment-conditions](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider/get-payment-conditions-for-a-provider)

[/payment/v1/bulk-payments](/Tiny-doc/tink_docs_api/api-payment/#payment/bulk-payment/create-bulk-payment)

[/payment/v1/bulk-payments/{id}](/Tiny-doc/tink_docs_api/api-payment/#payment/bulk-payment/get-bulk-payment)

[/api/v1/payments/{paymentId}/cancellation](/Tiny-doc/tink_docs_api/api-payment/#payment/cancellation/get-cancellation-data)

[/api/v1/payments/requests/{id}](/Tiny-doc/tink_docs_api/api-payment/#payment/payment-request/get-payment-request)

[/api/v1/payments/requests/{id}/transfers](/Tiny-doc/tink_docs_api/api-payment/#payment/payment-request/get-transfers-for-payment-request)



 |
| providers:read | 

[/api/v1/provider-authentication-options/{providerName}](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider/get-the-authentication-options-for-a-given-provider)

[/api/v1/provider-authentication-options-for-market/{market}](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider/list-authentication-options-for-given-market)

[/api/v1/providers/markets](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider/list-markets)

[/api/v1/provider-identifiers](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider/list-provider-identifiers)

[/api/v1/providers/{market}](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider/list-providers-for-a-market)



 |
| provider-consents:write | 

[/api/v1/provider-consents:extend](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider-consent/extend-a-consent)



 |
| provider-consents:read | 

[/api/v1/provider-consents](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider-consent/list-provider-consents)



 |
| consents | 

[/connectivity/v2/consents/{consentId}/authorizations](/Tiny-doc/tink_docs_api/api-connectivity-v2/#connectivity-v2/authorization/list-authorizations)

[/connectivity/v2/consents/{consentId}/authorizations/{authorizationId}](/Tiny-doc/tink_docs_api/api-connectivity-v2/#connectivity-v2/authorization/read-authorization)

[/connectivity/v2/authorizations:relay-callback](/Tiny-doc/tink_docs_api/api-connectivity-v2/#connectivity-v2/authorization/relayed-callback-for-redirect-flows)

[/connectivity/v2/consents](/Tiny-doc/tink_docs_api/api-connectivity-v2/#connectivity-v2/consent/create-a-new-consent)

[/connectivity/v2/consents/{consentId}](/Tiny-doc/tink_docs_api/api-connectivity-v2/#connectivity-v2/consent/read-a-consent)

[/connectivity/v2/consents/{consentId}:revoke](/Tiny-doc/tink_docs_api/api-connectivity-v2/#connectivity-v2/consent/revoke-a-consent)

[/connectivity/v2/consent-templates/{providerId}](/Tiny-doc/tink_docs_api/api-connectivity-v2/#connectivity-v2/consent-templates/get-consent-template)



 |
| consents:readonly | 

[/connectivity/v2/consents/{consentId}/authorizations](/Tiny-doc/tink_docs_api/api-connectivity-v2/#connectivity-v2/authorization/list-authorizations)

[/connectivity/v2/consents/{consentId}/authorizations/{authorizationId}](/Tiny-doc/tink_docs_api/api-connectivity-v2/#connectivity-v2/authorization/read-authorization)

[/connectivity/v2/consents](/Tiny-doc/tink_docs_api/api-connectivity-v2/#connectivity-v2/consent/list-consents)

[/connectivity/v2/consents/{consentId}](/Tiny-doc/tink_docs_api/api-connectivity-v2/#connectivity-v2/consent/read-a-consent)

[/connectivity/v2/consent-templates/{providerId}](/Tiny-doc/tink_docs_api/api-connectivity-v2/#connectivity-v2/consent-templates/get-consent-template)



 |
| accounts:write | 

[/connector/users/{externalUserId}/accounts/{externalAccountId}](/Tiny-doc/tink_docs_api/api-connector/#connector/account/delete-account)

[/connector/users/{externalUserId}/accounts](/Tiny-doc/tink_docs_api/api-connector/#connector/account/ingest-accounts)

[/api/v1/accounts/{id}](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/account/update-an-account)



 |
| transactions:write | 

[/connector/users/{externalUserId}/transactions/delete](/Tiny-doc/tink_docs_api/api-connector/#connector/transaction/delete-transactions)

[/connector/users/{externalUserId}/transactions](/Tiny-doc/tink_docs_api/api-connector/#connector/transaction/ingest-transactions)

[/connector/users/{externalUserId}/transactions/{externalTransactionId}](/Tiny-doc/tink_docs_api/api-connector/#connector/transaction/update-transaction)

[/api/v1/transactions](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/transaction/update-a-list-of-transactions)

[/api/v1/transactions/{id}](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/transaction/update-a-transaction)



 |
| balances:read | 

[/api/v1/accounts/{id}/balances](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/account/get-balances-for-account)



 |
| accounts:read | 

[/api/v1/accounts/list](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/account/list-accounts)

[/api/v1/loans](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/loan/get-loans)

[/data/v2/accounts/{id}](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/account/get-account)

[/data/v2/accounts/{id}/balances](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/account/get-account-balances)

[/data/v2/accounts/{id}/parties](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/account/get-account-parties)

[/data/v2/accounts](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/account/list-accounts)



 |
| account-verification-reports:write | 

[/api/v1/account-verification-reports](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/account-verification/create-account-verification-report)



 |
| account-verification-reports:read | 

[/api/v1/account-verification-reports/{id}/pdf](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/account-verification/get-account-verification-pdf-report)

[/api/v1/account-verification-reports/{id}](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/account-verification/get-account-verification-report)



 |
| business-account-verification-reports:read | 

[/data/v1/business-account-verification-reports/{id}](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/business-account-verification/get-business-account-verification-report)



 |
| identity:read | 

[/api/v1/identities](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/identity/list-identity-data)



 |
| investments:read | 

[/api/v1/investments](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/investment/list-investments)



 |
| transactions:read | 

[/api/v1/search](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/search/query-transactions)

[/api/v1/transactions/suggest](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/transaction/get-categorization-clusters)

[/api/v1/transactions/{id}](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/transaction/get-one-transaction)

[/api/v1/transactions/{id}/similar](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/transaction/get-similar-transactions)

[/data/v2/transactions](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/transaction/list-transactions)

[/enrichment/v1/transactions/{transactionId}:find-similar](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/enriched-transactions/get-similar-transactions)

[/enrichment/v1/transactions](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/enriched-transactions/list-enriched-transactions)

[/enrichment/v1/transactions-by-ids](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/enriched-transactions/list-enriched-transactions-by-ids)

[/enrichment/v1/sustainability/transactions/refinement](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/sustainability/transactions/answer-refinement-questions)

[/enrichment/v1/sustainability/transactions/{transactionId}/refinement](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/sustainability/transactions/list-refinement-questions-for-transaction)

[/enrichment/v1/sustainability/transactions/{transactionId}/comparables](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/sustainability/transactions/list-transaction-co2-value-comparison)

[/enrichment/v1/sustainability/transactions/{transactionId}](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/sustainability/transactions/transaction-sustainability-info)



 |
| transactions:categorize | 

[/api/v1/transactions/categorize-multiple](/Tiny-doc/tink_docs_api/api-data-v1/#data-v1/transaction/change-category-of-transactions)

[/enrichment/v1/transactions](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/enriched-transactions/update-enriched-transactions)



 |
| accounts.balances:readonly | 

[/data/v2/accounts/{id}/balances](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/account/get-account-balances)



 |
| accounts.parties:readonly | 

[/data/v2/accounts/{id}/parties](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/account/get-account-parties)



 |
| identities:readonly | 

[/data/v2/identities](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/identity/list-identities)



 |
| investment-accounts:readonly | 

[/data/v2/investment-accounts/{id}](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/investment/get-investment-account)

[/data/v2/investment-accounts/{id}/holdings](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/investment/list-holdings)

[/data/v2/investment-accounts](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/investment/list-investment-accounts)



 |
| loan-accounts:readonly | 

[/data/v2/loan-accounts/{id}](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/loan/get-loan-account)

[/data/v2/loan-accounts](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/loan/list-loan-accounts)



 |
| transaction-reports:readonly | 

[/data/v2/transaction-reports/{id}](/Tiny-doc/tink_docs_api/api-data-v2/#data-v2/transaction-report/get-transaction-report)



 |
| enrichment.on-demand | 

[/enrichment/v1/transactions/on-demand](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/as-a-service/enrich-transactions)

[/enrichment/v1/categories](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/category/list-all-categories)

[/enrichment/v1/feedback](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/enrichment-feedback/submit-merchant-brand-feedback)

[/enrichment/v1/brand-identification/brands/{id}](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/merchant-information/brand/get-brand-by-id)

[/enrichment/v1/brand-identification/merchants/{id}](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/merchant-information/merchant/get-merchant-by-id)



 |
| enrichment.transactions:readonly | 

[/enrichment/v1/categories](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/category/list-all-categories)

[/enrichment/v1/transactions/{transactionId}:find-similar](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/enriched-transactions/get-similar-transactions)

[/enrichment/v1/transactions](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/enriched-transactions/list-enriched-transactions)

[/enrichment/v1/transactions-by-ids](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/enriched-transactions/list-enriched-transactions-by-ids)

[/enrichment/v1/recurring-transactions-groups/{groupId}](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/recurring-transactions/get-a-recurring-transactions-group)

[/enrichment/v1/predicted-recurring-transactions](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/recurring-transactions/list-predicted-recurring-transactions)

[/enrichment/v1/recurring-transactions](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/recurring-transactions/list-recurring-transactions)

[/enrichment/v1/recurring-transactions-groups](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/recurring-transactions/list-recurring-transactions-groups)



 |
| enrichment.transactions | 

[/enrichment/v1/categories](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/category/list-all-categories)

[/enrichment/v1/transactions/{transactionId}:find-similar](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/enriched-transactions/get-similar-transactions)

[/enrichment/v1/transactions](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/enriched-transactions/list-enriched-transactions)

[/enrichment/v1/transactions-by-ids](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/enriched-transactions/list-enriched-transactions-by-ids)

[/enrichment/v1/feedback](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/enrichment-feedback/submit-merchant-brand-feedback)

[/enrichment/v1/recurring-transactions-groups/{groupId}](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/recurring-transactions/get-a-recurring-transactions-group)

[/enrichment/v1/predicted-recurring-transactions](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/recurring-transactions/list-predicted-recurring-transactions)

[/enrichment/v1/recurring-transactions](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/recurring-transactions/list-recurring-transactions)

[/enrichment/v1/recurring-transactions-groups](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/recurring-transactions/list-recurring-transactions-groups)



 |
| enrichment.merchant | 

[/enrichment/v1/brand-identification/brands/{id}](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/merchant-information/brand/get-brand-by-id)

[/enrichment/v1/brand-identification/merchants/{id}](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/merchant-information/merchant/get-merchant-by-id)



 |
| transactions.recurring:read | 

[/enrichment/v1/recurring-transactions-groups/{groupId}](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/recurring-transactions/get-a-recurring-transactions-group)

[/enrichment/v1/predicted-recurring-transactions](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/recurring-transactions/list-predicted-recurring-transactions)

[/enrichment/v1/recurring-transactions](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/recurring-transactions/list-recurring-transactions)

[/enrichment/v1/recurring-transactions-groups](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/recurring-transactions/list-recurring-transactions-groups)



 |
| enrichment.sustainability | 

[/enrichment/v1/sustainability/users/insights](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/sustainability/insights/retrieve-a-random-user-specific-insight)

[/enrichment/v1/sustainability/insights](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/sustainability/insights/retrieve-general-insights)

[/enrichment/v1/sustainability/market-average](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/sustainability/market-average/retrieve-market-average-footprints)

[/enrichment/v1/sustainability/transactions/refinement](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/sustainability/transactions/answer-refinement-questions)

[/enrichment/v1/sustainability/transactions/{transactionId}/refinement](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/sustainability/transactions/list-refinement-questions-for-transaction)

[/enrichment/v1/sustainability/transactions/{transactionId}/comparables](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/sustainability/transactions/list-transaction-co2-value-comparison)

[/enrichment/v1/sustainability/transactions/{transactionId}](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/sustainability/transactions/transaction-sustainability-info)

[/enrichment/v1/sustainability/users/profiling](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/sustainability/user-profiling/answer-profiling-questions)

[/enrichment/v1/sustainability/users/profiling/questions](/Tiny-doc/tink_docs_api/api-enrichment/#enrichment/sustainability/user-profiling/get-profiling-questions)



 |
| webhook-endpoints | 

[/events/v2/webhook-endpoints](/Tiny-doc/tink_docs_api/api-events-v2/#events-v2/webhook/create-webhook-endpoint)

[/events/v2/webhook-endpoints/{id}](/Tiny-doc/tink_docs_api/api-events-v2/#events-v2/webhook/delete-webhook-endpoint)

[/events/v2/webhook-endpoints/{webhookEndpoint.id}](/Tiny-doc/tink_docs_api/api-events-v2/#events-v2/webhook/update-webhook-endpoint)



 |
| insights:write | 

[/api/v1/insights/{id}/archive](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/actionable-insight/archive-an-insight)

[/api/v1/insights/action](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/actionable-insight/take-action-on-an-insight)



 |
| insights:read | 

[/api/v1/insights/archived](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/actionable-insight/list-archived-insights)

[/api/v1/insights](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/actionable-insight/list-insights)



 |
| budgets:write | 

[/api/v1/budgets/{id}/archive](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/budgets/archive-budget)

[/api/v1/budgets/one-off](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/budgets/create-one-off-budget)

[/api/v1/budgets/recurring](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/budgets/create-recurring-budget)

[/api/v1/budgets/{id}](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/budgets/delete-budget)



 |
| budgets:read | 

[/api/v1/budgets/{id}/details](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/budgets/get-budget-details)

[/api/v1/budgets/{id}/transactions](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/budgets/get-budget-transactions)

[/api/v1/budgets](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/budgets/list-budgets)

[/api/v1/budgets/summaries](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/budgets/list-budgets-with-summaries)

[/api/v1/budgets/recommended](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/budgets/list-recommended-budgets)



 |
| budgets-bfm | 

[/finance-management/v1/business-budgets](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/business-budgets/create-business-budget)

[/finance-management/v1/business-budgets/{budgetId}](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/business-budgets/delete-business-budget)

[/finance-management/v1/business-budgets/{budgetId}/history](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/business-budgets/list-business-budget-history)



 |
| cash-flow | 

[/finance-management/v1/cash-flow-summaries/{resolution}](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/cash-flow/list-cash-flows-summaries)



 |
| cost-of-living:read | 

[/finance-management/v1/cost-of-living/{costOfLivingId}/transactions](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/cost-of-living/list-cost-of-living-transactions)

[/finance-management/v1/cost-of-living](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/cost-of-living/list-user-s-costs-of-living)



 |
| financial-calendar | 

[/finance-management/v1/financial-calendar-events/{calendarEventId}/attachments](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/financial-calendar/add-attachment)

[/finance-management/v1/financial-calendar-events](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/financial-calendar/create-a-new-calendar-event)

[/finance-management/v1/financial-calendar-events/{calendarEventId}/attachments/{attachmentId}](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/financial-calendar/delete-attachment)

[/finance-management/v1/financial-calendar-events/{calendarEventId}](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/financial-calendar/delete-event-by-id)

[/finance-management/v1/financial-calendar-events/{calendarEventId}/reconciliations/{transactionId}](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/financial-calendar/delete-reconciliation-link-)

[/finance-management/v1/financial-calendar-events/{calendarEventId}/recurring-group](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/financial-calendar/make-an-event-recurring)

[/finance-management/v1/financial-calendar-events/{calendarEventId}/reconciliations](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/financial-calendar/reconcile-link-event-with-a-transaction)



 |
| financial-calendar:readonly | 

[/finance-management/v1/financial-calendar-events/{calendarEventId}](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/financial-calendar/get-event-by-id)

[/finance-management/v1/financial-calendar-events/{calendarEventId}/reconciliations/details](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/financial-calendar/get-reconciliations-links-details)

[/finance-management/v1/financial-calendar-events/{calendarEventId}/reconciliations/suggestions](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/financial-calendar/get-suggested-transactions)

[/finance-management/v1/financial-calendar-summaries/{resolution}](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/financial-calendar/list-events-summaries-for-the-given-period)

[/finance-management/v1/financial-calendar-events](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/financial-calendar/lists-calendar-events-within-given-timeframe)



 |
| savings-goals:write | 

[/api/v1/savings-goals/{id}:archive](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/archive-savings-goal)

[/api/v1/savings-goals/{id}:complete](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/complete-savings-goal)

[/api/v1/savings-goals](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/create-savings-goal)

[/api/v1/savings-goals/{id}/allocations/fund:deposit](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/deposit-to-savings-goal)

[/api/v1/savings-goals/allocations/fund:reallocate](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/reallocate-amount)

[/api/v1/savings-goals/{id}](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/update-savings-goal)

[/api/v1/savings-goals/{id}/allocations/fund:withdraw](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/withdraw-from-savings-goal)



 |
| savings-goals:read | 

[/api/v1/savings-goals/accounts/{id}](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/get-account)

[/api/v1/savings-goals/{id}](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/get-savings-goal)

[/api/v1/savings-goals/{id}/allocations](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/list-allocations)

[/api/v1/savings-goals/accounts/{id}/allocations](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/list-allocations-by-account)

[/api/v1/savings-goals/categories](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/list-categories)

[/api/v1/savings-goals/{id}/period\_progress](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/list-periods-progress)

[/api/v1/savings-goals](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/savings-goals/list-savings-goals)



 |
| statistics:read | 

[/api/v1/statistics/query](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/statistic/query-statistics)



 |
| subscriptions:read | 

[/finance-management/v1/subscriptions/{subscriptionId}/transactions](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/subscriptions/list-subscription-transactions)

[/finance-management/v1/subscriptions](/Tiny-doc/tink_docs_api/api-finance-management/#finance-management/subscriptions/list-user-subscriptions)



 |
| merchants | 

[/partner-integration/v1/merchants](/Tiny-doc/tink_docs_api/api-partner-integration/#partner-integration/merchants/create-merchant)



 |
| merchants:readonly | 

[/partner-integration/v1/merchants/{id}](/Tiny-doc/tink_docs_api/api-partner-integration/#partner-integration/merchants/get-merchant)

[/partner-integration/v1/merchants](/Tiny-doc/tink_docs_api/api-partner-integration/#partner-integration/merchants/list-merchants)



 |
| bulk-payment:write | 

[/payment/v1/bulk-payments](/Tiny-doc/tink_docs_api/api-payment/#payment/bulk-payment/create-bulk-payment)



 |
| bulk-payment:read | 

[/payment/v1/bulk-payments/{id}](/Tiny-doc/tink_docs_api/api-payment/#payment/bulk-payment/get-bulk-payment)



 |
| payment:write | 

[/api/v1/payments/{paymentId}/cancellation](/Tiny-doc/tink_docs_api/api-payment/#payment/cancellation/begin-cancellation)

[/api/v1/payments/requests](/Tiny-doc/tink_docs_api/api-payment/#payment/payment-request/create-payment-request)

[/payment/v1/settlement-account-payment-requests](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/create-payment-request)



 |
| mandate-payments | 

[/payment/v1/mandate-payments](/Tiny-doc/tink_docs_api/api-payment/#payment/mandate-payment/create-mandate-payment)



 |
| mandate-payments:readonly | 

[/payment/v1/mandate-payments/{id}](/Tiny-doc/tink_docs_api/api-payment/#payment/mandate-payment/get-mandate-payment)



 |
| settlement-accounts | 

[/payment/v1/merchants/{merchantId}/accounts](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/create-account)

[/payment/v1/merchants/{merchantId}/accounts/{accountId}/refunds](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/create-refund)

[/payment/v1/merchants/{merchantId}/accounts/{accountId}/withdrawals](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/create-withdrawal)

[/payment/v1/merchants/{merchantId}/accounts/{accountId}](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/get-account)

[/payment/v1/merchants/{merchantId}/accounts/{accountId}/refunds/{refundId}](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/get-refund)

[/payment/v1/merchants/{merchantId}/accounts/{accountId}/transactions/{transactionId}](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/get-transaction)

[/payment/v1/merchants/{merchantId}/accounts/{accountId}/withdrawals/{withdrawalId}](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/get-withdrawal)

[/payment/v1/merchants/{merchantId}/accounts/{accountId}/transactions](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/list-transactions)

[/payment/v1/merchants/{account.merchantId}/accounts/{account.id}](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/update-account)



 |
| settlement-accounts:readonly | 

[/payment/v1/merchants/{merchantId}/accounts/{accountId}](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/get-account)

[/payment/v1/merchants/{merchantId}/accounts/{accountId}/refunds/{refundId}](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/get-refund)

[/payment/v1/merchants/{merchantId}/accounts/{accountId}/transactions/{transactionId}](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/get-transaction)

[/payment/v1/merchants/{merchantId}/accounts/{accountId}/withdrawals/{withdrawalId}](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/get-withdrawal)

[/payment/v1/merchants/{merchantId}/accounts](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/list-accounts)

[/payment/v1/merchants/{merchantId}/accounts/{accountId}/refunds](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/list-refunds)

[/payment/v1/merchants/{merchantId}/accounts/{accountId}/transactions](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/list-transactions)

[/payment/v1/merchants/{merchantId}/accounts/{accountId}/withdrawals](/Tiny-doc/tink_docs_api/api-payment/#payment/settlement-accounts/list-withdrawals)



 |
| expense-checks:create | 

[/risk/v1/expense-checks](/Tiny-doc/tink_docs_api/api-risk/#risk/expense-check/create-an-expense-check-report)



 |
| expense-checks:delete | 

[/risk/v1/expense-checks/{id}](/Tiny-doc/tink_docs_api/api-risk/#risk/expense-check/delete-an-expense-check)



 |
| expense-checks:readonly | 

[/risk/v1/expense-checks/{id}](/Tiny-doc/tink_docs_api/api-risk/#risk/expense-check/get-an-expense-check)

[/risk/v1/expense-checks](/Tiny-doc/tink_docs_api/api-risk/#risk/expense-check/list-expense-checks)



 |
| income-checks:create | 

[/v2/income-checks](/Tiny-doc/tink_docs_api/api-risk/#risk/income-check/create-an-income-check)



 |
| income-checks:delete | 

[/v2/income-checks/{id}](/Tiny-doc/tink_docs_api/api-risk/#risk/income-check/delete-an-income-check)



 |
| income-checks:readonly | 

[/v2/income-checks/{id}:generate-pdf](/Tiny-doc/tink_docs_api/api-risk/#risk/income-check/generate-an-income-check-as-pdf)

[/v2/income-checks/{id}](/Tiny-doc/tink_docs_api/api-risk/#risk/income-check/get-an-income-check)

[/v2/income-checks](/Tiny-doc/tink_docs_api/api-risk/#risk/income-check/list-income-checks)



 |
| risk-insights:create | 

[/risk/v1/risk-insights](/Tiny-doc/tink_docs_api/api-risk/#risk/risk-insights/create-risk-insights)



 |
| risk-insights:delete | 

[/risk/v1/risk-insights/{id}](/Tiny-doc/tink_docs_api/api-risk/#risk/risk-insights/delete-a-risk-insights)



 |
| risk-insights:readonly | 

[/risk/v1/risk-insights/{id}](/Tiny-doc/tink_docs_api/api-risk/#risk/risk-insights/get-a-risk-insights)



 |
