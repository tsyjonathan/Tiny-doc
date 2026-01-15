---
title: "Get one-time access to investment data"
source: "/Tiny-doc/tink_docs_home/resources/investments/get-one-time-access-to-investment-data/"
exportedAt: "2026-01-13T12:44:59.943Z"
---
**Introduction**

This article is divided into different sections with the intension to be followed from top to bottom.

The first section shows how to build a Tink URL that the end user must use to authenticate with their bank, select an account, and give their consent to your user. The last second shows you how to use that token to fetch investment data.

If you want to experiment with Investments by using our API, try our [Postman collection for Investments](/Tiny-doc/tink_docs_home/resources/investments/postman-collection-for-investments/).

### Data-access models[](#data-access-models)

We provide two types of data-access models, depending on your need.

-   **One-time access:** A one-time retrieval of an end user’s investment data, which results in a standardised view of their finances at one point in time.
-   **Continuous access:** Uninterrupted access to an end user’s investment data. Continuous access is suitable for financial management products.

|  | ONE-TIME ACCESS | CONTINUOUS ACCESS |
| --- | --- | --- |
| Fetch investment data only once | ✅ | ❌ |
| Data is automatically deleted after 24hrs | ✅ | ❌ |
| Need to fetch investment data over a period of time and/or perform background refreshes | ❌ | ✅ |
| Data is continuously accessible | ❌ | ✅ |

This article explains how to retrieve investment data using one time access.

## 1\. Build the URL[](#build-the-url)

A Tink Link URL contains of different parameters and is used to allow users to authenticate with their bank and select an account from which to fetch investment data. When your end user opens the URL, they start a flow where they ultimately give their consent to the user that you have created.

Let's define some parameters that you can append to your URL.

| Parameter | Required | Description |
| --- | --- | --- |
| client\_id | Required | Your client ID (retrieved from Tink Console). |
| redirect\_uri | Required | The page the end-user is redirected to after completing the flow together with the response parameters (configured in Tink Console). |
| market | Optional (default `SE`) | Market code for which providers should be listed. See below for a list of available markets. |
| locale | Optional (default `en_US`) | Locale to be used for end-user facing text. See below for an available list of locales. |
| products | Required | A comma separated list of products for which to aggregate data (`ACCOUNT_CHECK`, `INVESTMENTS`, `LOANS`, `TRANSACTIONS`). |
| refreshable\_items | Optional | A comma separated list of [refreshable items](/Tiny-doc/tink_docs_api/api/#connectivity-v1/credentials/create-credentials/query-parameters) specifying the data types to aggregate overriding the default list of refreshable items for the respective products. |
| state | Optional | Optional, but highly recommended parameter that's useful in preventing Cross-site Request Forgery (CSRF) attacks. The application provides a randomised state value to Tink Link at initiation, and that value will be sent back verbatim to the callback URL after a successful grant. The application can then verify the returned value to make sure the request came from the application itself. |

Tink Link URL example

```
[external url removed]
```

When the end user opens the Tink URL, they're prompted to authenticate with their bank and then choose a bank account. To test the Tink URL, find demo-user credentials in **Console** > **Demo Bank**. Select the username and password for a Demo Bank user that suits your use case.

When the Tink flow is completed, the end user is redirected to the redirect URL. The redirect URL contains `user access token`, `credentialsId` and a `state` if you provided that.

**The redirect URL format**

```
{redirect_uri}?code={USER_ACCESS_TOKEN}&credentialsId={CREDENTIALS_ID}&state={OPTIONAL_STATE_CODE_THAT_YOU_SPECIFIED}
```

Including the state parameter in your Tink URL ensures that it will appear in the redirect URL. This allows you to map back to the `user_id` or `external_user_id` seamlessly.

**Example callback URL**

```
[external url removed]
```

## 2\. Fetch investment data[](#fetch-investment-data)

The code returned in the end of the Tink Link journey is the `user access token` that is used in the following calls to fetch investment accounts and holdings.

### 2.1 Fetch investment accounts[](#fetch-investment-accounts)

Use the `user access token` from the Tink Link response to make a request to the List investment accounts endpoint:

Fetch a list of investment accounts

```
curl "[external url removed]" \
  -H 'Authorization: Bearer '
```

**Response example**

```
{
  "investmentAccounts": [
    {
      "accountName": "My ISK account",
      "balances": {
        "booked": {
          "amount": {
            "currencyCode": "EUR",
            "value": {
              "scale": 2,
              "unscaledValue": 10350
            }
          }
        },
        "creditLimit": {
          "amount": {
            "currencyCode": "EUR",
            "value": {
              "scale": 2,
              "unscaledValue": 500000
            }
          }
        }
      },
      "dates": {
        "lastRefreshed": "string"
      },
      "financialInstitutionId": "1ff0f75b01f94fcd9c0760ebea7443e2",
      "financialProduct": "SE_ISK",
      "holdingValue": {
        "bond": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1000
          }
        },
        "equity": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1500
          }
        },
        "fund": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1200
          }
        },
        "pensionPlan": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 1000
          }
        },
        "total": {
          "currencyCode": "EUR",
          "value": {
            "scale": 2,
            "unscaledValue": 4700
          }
        }
      },
      "id": "efad4be863db4d6f9388a6adc148ac5c",
      "identifiers": {
        "accountNumber": "8398257466",
        "iban": {
          "bban": "5000 0000 0583 9825 7466",
          "bic": "SWEDSESSXXX",
          "iban": "SE45 5000 0000 0583 9825 7466"
        }
      },
      "monetaryAccountIdentifiers": {
        "iban": {
          "bban": "5000 0000 0583 9825 7466",
          "bic": "SWEDSESSXXX",
          "iban": "SE45 5000 0000 0583 9825 7466"
        }
      },
      "parties": [
        {
          "identity": {
            "name": "John Doe",
            "ssn": "19800110"
          },
          "role": "HOLDER"
        }
      ]
    }
  ]
}
```

### 2.2 Fetch holdings[](#fetch-holdings)

To fetch a list of holdings for a specific investment account, you must have a `user access token` with the `investment-accounts:readonly` scope. Use the `user access token` to make a request to the List holdings endpoint:

Fetch a list of holdings for a specific investment account

```
curl "[external url removed]" \
  -H 'Authorization: Bearer '
```

**Response example**

```
{
  "holdings": [
    {
      "accountId": "014851786434422dbe5abec1bc648a5c",
      "financialInstrument": {
        "expenseRatio": 0,
        "expirationDate": "2024-03-10",
        "identifiers": {
          "cusip": "30303M102",
          "isin": "US92826C8394",
          "pensionPlanIdentifier": "string"
        },
        "interestRate": 0,
        "marketIdentifierCode": "XNAS",
        "name": "Company Inc.",
        "nativeIsoCurrencyCode": "USD",
        "tickerSymbol": "MSFT",
        "type": "EQUITY"
      },
      "holdingPercentageReturn": 100,
      "holdingReturn": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 60000
        }
      },
      "holdingValue": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 60000
        }
      },
      "averageAcquisitionPrice": {
        "currencyCode": "EUR",
        "value": {
          "scale": 2,
          "unscaledValue": 3000
        }
      },
      "quantity": 10
    }
  ],
  "nextPageToken": "string"
}
```
