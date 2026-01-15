---
title: "One time access to Loan accounts"
source: "/Tiny-doc/tink_docs_home/resources/loans/one-time-access-to-loan-accounts/"
exportedAt: "2026-01-13T12:45:30.140Z"
---
**Introduction**

This article is divided into different sections with the intension to be followed from top to bottom.

The first section shows how to build a Tink Link URL that the end user must use to authenticate with their bank, select an account, and give their consent to your user. The last second shows you how to use that token to fetch loan data.

If you want to experiment with Loans by using our API, try our [Postman collection for Loans](/Tiny-doc/tink_docs_home/resources/investments/postman-collection-for-loans/).

### Data-access models[](#data-access-models)

We provide two types of data-access models, depending on your need.

-   **One-time access:** A one-time retrieval of an end user’s loan data, which results in a standardised view of their finances at one point in time.
-   **Continuous access:** Uninterrupted access to an end user’s loan data. Continuous access is suitable for financial management products.

|  | ONE-TIME ACCESS | CONTINUOUS ACCESS |
| --- | --- | --- |
| Fetch loan data only once | ✅ | ❌ |
| Data is automatically deleted after 24hrs | ✅ | ❌ |
| Need to fetch loan data over a period of time and/or perform background refreshes | ❌ | ✅ |
| Data is continuously accessible | ❌ | ✅ |

This article explains how to retrieve loan data using one time access.

## 1\. Build the URL[](#build-the-url)

A Tink URL contains of different parameters and is used to allow users to authenticate with their bank and select an account from which to fetch loan data. When your end user opens the URL, they start a flow where they ultimately give their consent to the user that you have created.

Let's define some parameters that you can append to your URL.

| Parameter | Required | Description |
| --- | --- | --- |
| client\_id | Required | Your client ID (retrieved from [Tink Console](https://console.tink.com/)). |
| redirect\_uri | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in [Tink Console](https://console.tink.com/)). |
| market | Optional (default `SE`) | Market code for which providers should be listed. See below for a list of available markets. |
| locale | Optional (default `en_US`) | Locale to be used for end-user facing text. See below for an available list of locales. |
| products | Required | A comma separated list of products for which to aggregate data (`ACCOUNT_CHECK`, `INVESTMENTS`, `LOANS`, `TRANSACTIONS`). |
| refreshable\_items | Optional | A comma separated list of [refreshable items](/Tiny-doc/tink_docs_api/api/#connectivity-v1/credentials/create-credentials/query-parameters) specifying the data types to aggregate overriding the default list of refreshable items for the respective products. |
| state | Optional | Optional, but highly recommended parameter that's useful in preventing Cross-site Request Forgery (CSRF) attacks. The application provides a randomised state value to Tink Link at initiation, and that value will be sent back verbatim to the callback URL after a successful grant. The application can then verify the returned value to make sure the request came from the application itself. |

Tink Link URL example

```
https://link.tink.com/1.0/products/connect-accounts?products=LOANS&client_id=&state=&redirect_uri=https://console.tink.com/callback&market=SE&locale=en_US
```

When the end user opens the Tink Link URL, they're prompted to authenticate with their bank and then choose a bank account. To test the Tink URL, find demo-user credentials in **Console** > **[Demo Bank](https://console.tink.com/demobank)**. Select the username and password for a Demo Bank user that suits your use case.

When the Tink flow is completed, the end user is redirected to the redirect URL. The redirect URL contains `user access token`, `credentialsId` and a `state` if you provided that.

**The redirect URL format**

```
{redirect_uri}?code={USER_ACCESS_TOKEN}&credentialsId={CREDENTIALS_ID}&state={OPTIONAL_STATE_CODE_THAT_YOU_SPECIFIED}
```

If you don't include the `state` parameter in your Tink URL, it won’t be included in the redirect URL. If you've included the parameter, you can use it to map back to the `user_id` or `external_user_id`.

**Example callback URL**

```
https://console.tink.com/callback?code={USER_ACCESS_TOKEN}&credentialsId={CREDENTIALS_ID}&state={OPTIONAL_STATE_CODE_THAT_YOU_SPECIFIED}&redirect_uri=https://console.tink.com/callback
```

## 2\. Fetch Loan data[](#fetch-loan-data)

The code returned in the end of the Tink Link journey is the `user access token` that is used in the following calls to fetch loan accounts.

### 2.1 Fetch Loan accounts[](#fetch-loan-accounts)

Use the `user access token` from the Tink Link response to make a request to the List loan accounts endpoint:

Fetch a list of loan accounts

```
curl "https://api.tink.com/data/v2/loan-accounts" \
  -H 'Authorization: Bearer '
```

**Response example**

```
{
  "loanAccounts": [
    {
      "accountName": "My loan",
      "amountPaid": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 12030000
        }
      },
      "balances": {
        "initial": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 300250
          }
        },
        "principal": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 58400
          }
        }
      },
      "collateral": {
        "collateral": "tockholm, 123 Kungsgatan"
      },
      "dates": {
        "originationDate": "2019-08-15",
        "payoffExpectedDate": "2029-01-29",
        "nextPaymentDate": "2021-02-28",
        "previousPaymentDate": "2021-01-29",
      },
      "financialInstitutionId": "1ff0f75b01f94fcd9c0760ebea7443e2",
      "guarantor": {
        "name": "Jane Doe"
      },
      "id": "efad4be863db4d6f9388a6adc148ac5c",
      "identifiers": {
        "accountNumber": "12345678-1234"
      },
      "loanParts": [
        {
          "amountPaid": {
            "currencyCode": "EUR",
            "value": {
              "scale": 2,
              "unscaledValue": 12030000
            }
          },
          "balances": {
            "initial": {
              "currencyCode": "EUR",
              "value": {
                "scale": 2,
                "unscaledValue": 300250
              }
            },
            "principal": {
              "currencyCode": "EUR",
              "value": {
                "scale": 2,
                "unscaledValue": 58400
              }
            }
          },
          "dates": {
            "nextPaymentDate": "2021-02-28",
            "originationDate": "2019-08-15",
            "payoffExpectedDate": "2029-01-29",
            "previousPaymentDate": "2021-01-29"
          },
          "installment": {
            "amount": {
              "currencyCode": "EUR",
              "value": {
                "scale": 2,
                "unscaledValue": 58400
              }
            },
            "period": "MONTHLY"
          },
          "interestRate": {
            "margin": 5,
            "monthsBound": 5,
            "referenceIndex": "Euribor",
            "revisionDate": "2021-06-01",
            "value": 0,
            "variableRate": true
          },
          "loanPartNumber": "string"
        }
      ],
      "loanType": "MORTGAGE",
      "parties": [
        {
          "identity": {
            "name": "John Doe",
            "ssn": "19670220-1234"
          },
          "role": "HOLDER"
        }
      ]
    }
  ]
}
```
