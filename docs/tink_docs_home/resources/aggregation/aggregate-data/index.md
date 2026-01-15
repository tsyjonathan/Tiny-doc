---
title: "Aggregate data - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/aggregation/aggregate-data/"
exportedAt: "2026-01-13T12:55:21.415Z"
---
## Get providers[](#get-providers)

**Documentation**: Visit the [Provider API](/Tiny-doc/tink_docs_api/api/#connectivity/provider).

**Purpose**: Get all available providers for a market. This API endpoint is public and can be used without prior authentication. Tink also has a number of [test providers](/Tiny-doc/tink_docs_home/resources/aggregation/available-test-providers/) which can be used during development.

**Request example**:

Fetch all providers for the Spanish market

```
curl [external url removed]
```

**Response**: A list of providers, see the API reference documentation.

## Create credentials[](#create-credentials)

**Documentation**: Visit the [Credentials API](/Tiny-doc/tink_docs_api/api/#connectivity/credentials).

**Purpose**: Add a credential for a provider that will be used for aggregation. You can also use [test providers](/Tiny-doc/tink_docs_home/resources/aggregation/available-test-providers/) for a full experience without sharing real login details.

**Request example (username+password):**

Create a credential for a provider

```
curl -v -X POST [external url removed] \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer ' \
-d '{
      "fields": {
        "username": "{END_USER_USERNAME}",
        "password": "{END_USER_PASSWORD}"
      },
      "providerName": "{PROVIDER_NAME}"
    }
'
```

**Request example (username+password and filtered on account type):**

You can also specify the financial data to fetch by using the `items` request parameter.

Fetch financial data based on items request parameter

```
curl -v -X POST '[external url removed]' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer ' \
-d '{
      "fields": {
        "username": "{END_USER_USERNAME}",
        "password": "{END_USER_PASSWORD}"
      },
      "providerName": "{PROVIDER_NAME}"
    }
'
```

**Response**: The response is documented in the linked documentation. The system will respond back with a `Credential` object with `status: CREATED` which means the credential has been created and our platform will now start the aggregation. The `status` will change based on the aggregation progress, see [Get credentials](#get-credentials) below for further information.

**Common errors:**

-   `HTTP 409 Identical credentials already exist` (you cannot create another credential to the same `User` with the same login information)
-   `HTTP 403 - access forbidden` (could be wrong scopes)

## Get credentials[](#get-credentials)

**Documentation**: Visit the [Credentials API](/Tiny-doc/tink_docs_api/api/#connectivity/credentials).

**Purpose**: In step [Create credentials](#create-credentials) above, the Tink platform started the aggregation process. You need to call this API endpoint to know when this task has ended: `status: UPDATED` means the aggregation is complete. As long as the `status` returns something else (e.g. `CREATED` or `UPDATING)`, the Tink platform is still aggregating data. Please read the documentation for full information about different `status` codes.

**Request example**:

Fetch credentials

```
curl -v [external url removed] \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer '
```

**Response**: Visit the [Credentials API](/Tiny-doc/tink_docs_api/api/#connectivity/credentials).

## Using test providers[](#using-test-providers)

The Tink test providers are static implementations of providers and banks that allow developers to test Tink, without having to enter real bank credentials. Creating credentials with a provider of `type: TEST` will still utilize all the flows in the Tink ecosystem, but without communicating with an actual provider or bank. There are multiple such providers that will emulate different authentication flows and types of data.

## Get test providers[](#get-test-providers)

**Documentation**: Visit the [Provider API](/Tiny-doc/tink_docs_api/api/#connectivity/provider).

**Purpose**: Get all available providers for a market (note that we have used `ES` as country code). This API endpoint is public and can be used without prior authentication.

**Request example**:

Fetch only test providers

```
curl [external url removed]
```

**Response**: A list of providers, see the API reference documentation.

## Create test credentials[](#create-test-credentials)

**Documentation**: Visit the [Credentials API](/Tiny-doc/tink_docs_api/api/#connectivity/credentials).

**Purpose**: When you don’t want to use real accounts to get financial data you can use the test providers.

**Request example**:

Create test credentials

```
curl -v -X POST [external url removed] \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer ' \
-d '
    {
      "fields": {
        "username": "tink",
        "password": "tink-1234"
      },
      "providerName": "es-test-password"
    }
'
```

**Response**: Visit the [Credentials API](/Tiny-doc/tink_docs_api/api/#connectivity/credentials).
