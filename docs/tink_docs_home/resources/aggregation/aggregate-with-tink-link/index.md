---
title: "How to aggregate financial data using Tink REST APIs"
source: "/Tiny-doc/tink_docs_home/resources/aggregation/aggregate-with-tink-link/"
exportedAt: "2026-01-13T12:55:19.036Z"
---
## Fetch user data[](#fetch-user-data)

Once you have a valid `access_token`, you can use this token to access user data using the Tink APIs. Since we requested an `accounts:read` scope in our [initial example](/Tiny-doc/tink_docs_home/resources/getting-started/connect-tink-link/), we should now be able to read the user’s accounts.

### Account service[](#account-service)

Account information is available using `GET /api/v1/accounts/list` API.

Fetch account information

```
curl -v https://api.tink.com/api/v1/accounts/list \
-H 'Authorization: Bearer '
```

We didn’t request any other `scope`, which means that we won’t be able to fetch more information than this. If you’d like to fetch other types of data, go through the process again but with a wider scope. For example: `scope=accounts:read,transactions:read,statistics:read,investments:read,user:read,credentials:read`. Check out our [API documentation](/Tiny-doc/tink_docs_api/api/) to see examples of how to fetch other types of data, such as transactions, statistics or investment data.

_Note that adding more scopes might increase the loading time. For example, if you add `transactions:read`, the Tink Link completion time can significantly increase due to transaction processing._

## Explore other APIs[](#explore-other-apis)

You now have everything you need to make the most out of the Tink Platform. All of our products are documentend in our [Docs](/Tiny-doc/tink_docs_home/index/) section, where you can discover available endpoints for each product and more detailed information on what’s possible to build using Tink.

Below is a quick overview of some important concepts.

### Providers[](#providers)

A provider is an object that represents a bank connection with some type of credentials. For example, the provider `handelsbanken-password` represents a connection to Handelsbanken with the use of a password. Make the following request to fetch all the providers which are currently available for your client, for a given market.

Fetch all providers for a specific market

```
curl -v https://api.tink.com/api/v1/providers/{market_code} \
-H "X-Tink-OAuth-Client-ID: {YOUR_CLIENT_ID}"
```

If you instead want to get all the possible providers the Tink API offers, you can simply skip the header with the `client_id`.

### Categories[](#categories)

When you fetch transactions for a user via the Tink API, each transaction will be automatically categorised with a corresponding `categoryId`. These categories can be fetched from the API through the endpoint below.

Fetch categories

```
curl -v https://api.tink.com/api/v1/categories
```
