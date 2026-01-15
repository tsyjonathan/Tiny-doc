---
title: "One-time balance check - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/balance-check/one-time-balance-check/"
exportedAt: "2026-01-13T12:44:21.671Z"
---
## 1\. Account Check[](#account-check)

You need to perform a one-time set up of the account. To do this, follow the instructions in this section to execute an Account Check.

### 1.1 Build the URL[](#build-the-url)

An Account Check Tink URL contains different parameters and is used to allow users to authenticate with their bank and select an account from which to fetch account data. When the end user opens the URL, they start a flow where they ultimately give their consent to the user that you have created.

The URL include these parameters:

| Parameter | Required? | Description |
| --- | --- | --- |
| client\_id | yes | The `client_id` for your app. |
| redirect\_url | yes | The URL to which the user is redirected. This must be configured in the app settings in Console before first use. |
| market | yes | The market for which to fetch reports, for example, `SE`. |
| locale | yes | the language to use for user-facing text, for example, `en_US` |
| state. | no | is returned to you when the end user returns to your `redirect_uri`. Use this parameter to track the end user after they've left your app and entered the Tink flow. This value is returned to the user once the flow is completed. The parameter also adds CSRF attack prevention. If `state` isn't used, rely on the `credentials_id` value that we return in the response and map it back to your user. The state parameter shouldn't contain any sensitive information, such as the `user_id`. |

Tink URL example

```
[external url removed]
```

When the end user opens a Tink URL, they're prompted to authenticate with their bank and then choose a bank account. To test the Tink URL, find demo-user credentials in **Console** > **Demo Bank**. Select the username and password for a Demo Bank user that suits your use case.

*Image removed: transactions-flow-example*

When the Tink flow is completed, the end user is redirected to the redirect URL.

**The redirect URL format**

```
{redirect_uri}?client_id={YOUR_CLIENT_ID}&credentials_id={credentials_id}&state={OPTIONAL_STATE_CODE_THAT_YOU_SPECIFIED}&account_verification_report_id={account_verification_report_id}
```

If you don't include the `state` parameter in your Tink URL, it won’t be included in the redirect URL. If you've included the parameter, you can use it to map back to the `user_id` or `external_user_id`.

**Example callback URL**

```
[external url removed]
```

### 1.2 Fetch the report[](#fetch-the-report)

You will receive an `account_verification_report_id` back. Use that ID to fetch the report.

**cURL example**

```
Authenticate your client
curl -X POST [external url removed] \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=account-verification-reports:read,accounts:read,accounts.balances:readonly'
```

**Response example**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope":  "account-verification-reports:read,accounts:read,accounts.balances:readonly"
}
```

To fetch report JSON data based on a report identifier, see the [Account Verification Report API](/Tiny-doc/tink_docs_api/api/#data-v1/account-verification).

**cURL example**

```
Fetch your Account Check report in JSON
curl -X GET [external url removed] \
  -H 'Authorization: Bearer '
```

**Note:** the report will only contain data from one provider, which is the bank that the end user has selected. The list of accounts will contain only one account, because it's the account that the end user has selected.

The report contains an `accountId`. Save the ID for later use when refreshing and fetching the balance.

## 2\. Fetch the balance[](#fetch-the-balance)

To fetch the balance of the account, generate a token and then call the [API](/Tiny-doc/tink_docs_api/api/#data-v2/account/get-account-balances) with the specific `accountId`.

Get balances

```
curl GET [external url removed] \
-H 'Authorization: Bearer ' \
```

**Response example**

```
{
  "accountId": "a6bb87e57a8c4dd4874b241471a2b9e8",
  "balances": {
    "availableBalanceExcludingCredit": {
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 1550
        }
      }
    },
    "availableBalanceIncludingCredit": {
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 2000
        }
      }
    },
    "bookedBalance": {
      "amount": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 2360
        }
      }
    }
  },
  "creditLimit": {
    "amount": {
      "currencyCode": "EUR",
      "value": {
        "scale": 2,
        "unscaledValue": 450
      }
    }
  },
  "refreshed": "2022-09-27T15:01:40Z"
}
```
