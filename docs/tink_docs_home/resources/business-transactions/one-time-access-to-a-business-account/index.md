---
title: "One-time access to a business account"
source: "/Tiny-doc/tink_docs_home/resources/business-transactions/one-time-access-to-a-business-account/"
exportedAt: "2026-01-13T12:46:41.732Z"
---
Tink can provide one-time or continuous access to a user's bank data. By following the steps in this guide, you will get a **one-time snapshot** of the transactions, which means that we will fetch the data once and automatically delete it 24 hours later.

If you need access to the data for longer than 24 hours and/or access to continuously updated transactions, see [Continuous access to a business account](/Tiny-doc/tink_docs_home/resources/business-transactions/continuous-access-to-a-business-account/).

## 1\. Build the URL[](#build-the-url)

In Console, use the Build your own Tink Link URL view to create your own URL. Your resulting URL is used to allow users to authenticate with their bank and select an account from which to fetch report data. For information on how the URL works, see [Setup and integrate Business Transactions](/Tiny-doc/tink_docs_home/resources/business-transactions/setup-and-integrate-business-transactions/).

Integrate the URL with a site or in an app. For example, start an end user's Tink flow by redirecting them to a URL.

**Use the URL**

Use the example URL below by inserting the `client_id` value for your Tink app into the URL and then copying the URL in a browser.

Tink URL structure

```
[external url removed]
```

**Note**: make sure that you exchange `{YOUR_CLIENT_ID}` in the URL for your `client_id` value.

When your users access the URL, they are prompted to authenticate with their bank and then choose a bank account. Find demo-user credentials in **Console** > **Demo Bank**. Select the username and password for a Demo Bank user that suits your use case.

## 2\. Handle callback[](#handle-callback)

When a user reaches the end of a Tink flow, they're redirected to the callback URI that you've provided in the Tink URL. In case something goes wrong and you don't receive a callback with the `code` value, the flow has failed to complete.

Some possible failure reasons:

-   The end user cancelled their Tink flow
-   The end user didn't successfully authenticate with their bank
-   The end user didn't have any accounts available with the selected bank

For more information about errors, see [Handle Business Transactions error codes](/Tiny-doc/tink_docs_home/resources/business-transactions/handle-business-transactions-error-codes/).

**The successful callback has this structure:**

```
{YOUR_CALLBACK_URI}?code={YOUR_CODE}&credentialsId={YOUR_CREDENTIALS_ID}
```

**In this example:**

```
[external url removed]
```

After a successful authentication, you will see a `code` value, which indicates that a flow has successfully come to an end. Store this value. It is used to authenticate yourself in order to fetch account and transaction data.

## 3\. Authenticate your client[](#authenticate-your-client)

Now is the time to exchange your `code` value for an `access_token` value.

Exchange your code for an access\_token

```
curl -v -X POST [external url removed] \
  -d 'code=' \
  -d 'client_id=' \
  -d 'client_secret=' \
  -d 'grant_type=authorization_code'
```

If you provided the correct `code`, `client_id` and `client_secret`, you should get a successful response with an `access_token`.

**Response example**

```
{
    "access_token": "{YOUR_USER_ACCESS_TOKEN}",
    "token_type": "bearer",
    "expires_in": 1800,
    "scope": "accounts:read,balances:read,transactions:read"
}
```

Use the `access_token` value to call the Tink API to fetch account and transaction data.

## 4\. Fetch customer data[](#fetch-customer-data)

What follows are examples of how you can fetch a list of transactions and a list of accounts and balances, respectively.

### Fetch transactions[](#fetch-transactions)

To fetch a list of transactions, you must have a user access token with the `transactions:read` scope. Use the user access token to make a request to the Transactions endpoint:

Fetch a list of transactions

```
curl -X GET '[external url removed]' \
  -H 'Authorization: Bearer '
```

**Optional Parameters**

In the request, you need to provide the user access token but can also specify a number of optional query parameters to filter the results. These parameters include:

| PARAMETER | DESCRIPTION |
| --- | --- |
| accountIdIn={your\_account\_id} | Returns transactions only for a given account (this parameter may be repeated to specify multiple accounts) |
| statusIn={transaction\_status} | If set, only transactions with the given status will be returned. This parameter may be repeated to specify multiple statuses. |
| pageSize={number} | The maximum number of items to return. This endpoint will not return more than 100 transactions per page. |
| pageToken={next\_page\_token} | Return the next page of transactions (if you have set pageSize) |
| bookedDateGte={date} | Specified as the earliest booked date of transactions used for filtering and with the ISO-8061 date format (YYYY-MM-DD). If the query parameter is not provided time range will be calculated using the booked date of the earliest transaction available. |
| bookedDateLte={date} | Specified as the latest booked date of transactions used for filtering and with the ISO-8061 date format (YYYY-MM-DD). If the query parameter is not provided time range will be calculated until today. |

Request example with optional parameters

```
curl -X GET '[external url removed]' \
  -d 'accountIdIn=' \
  -d 'statusIn=' \
  -d 'pageSize=' \
  -d 'pageToken=' \
  -d 'bookedDateGte=' \
  -d 'bookedDateLte=' \
  -H 'Authorization: Bearer '
```

### Fetch accounts and balances[](#fetch-accounts-and-balances)

To fetch a list of accounts for a specific user, you must have a user access token with the `balances:read` and `accounts:read` scopes. Use the user access token to make a request to the Accounts endpoint:

Fetch a list of accounts for a user

```
curl -X GET '[external url removed]' \
  -H 'Authorization: Bearer '
```

## Need help?[](#need-help-)

Contact Sales and let us help you get started.
