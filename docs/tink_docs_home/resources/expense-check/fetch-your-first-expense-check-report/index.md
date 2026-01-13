---
title: "Fetch your first Expense Check report"
source: "https://docs.tink.com/resources/expense-check/fetch-your-first-expense-check-report"
exportedAt: "2026-01-13T12:48:54.726Z"
---
## 1\. Build the URL[](#build-the-url)

In Console, use the [Build your own Tink Link URL](https://console.tink.com/expense-check/tink-link) view to create your own URL. Your resulting URL is used to allow users to authenticate with their bank and select an account from which to fetch report data. For more information on how the URL works, see [Setup and integrate Expense Check](https://docs.tink.com/resources/expense-check/setup-and-integrate-expense-check).

For actual use of the URL, integrate it with a site or in an app. For example, you can start a user's flow by redirecting them to the URL.

**Use the URL**

Use the example URL below by inserting the `client_id` value for your Tink app into the URL, copy the URL, and paste it into the address bar of a web browser.

```
https://link.tink.com/1.0/expense-check/create-report/?client_id={YOUR_CLIENT_ID}&redirect_uri=https://console.tink.com/callback&market=SE
```

**Note**: make sure that you exchange `{YOUR_CLIENT_ID}` in the URL for your `client_id` value.

When your users access the URL, they'll see a list of demo banks. Once they choose a bank, they'll see a list of demo bank accounts to choose from. Select the username and password for a Demo Bank user that suits your use case. For more information about Demo Bank, see [Demo Bank](https://docs.tink.com/resources/expense-check/test-different-expense-check-scenarios).

## 2\. Handle callback[](#handle-callback)

When a user reaches the end of a flow, they're redirected to the callback URI that you've provided in the URL. In case something goes wrong and you don't receive a callback with the `expense_check_id` value, the flow has failed to complete.

Some possible failure reasons:

-   The end user cancelled their flow
-   The end user didn't successfully authenticate with their bank
-   The end user didn't have any accounts available with the selected bank

**The successful callback has this structure**

```
{YOUR_CALLBACK_URI}?expense_check_id={YOUR_EXPENSE_CHECK_REPORT_ID}
```

**In this example**

```
https://console.tink.com/callback?expense_check_id=ff8ae53bc46e45fe9a37c4fd1353e60d
```

After a successful authentication, you will see a `expense_check_id` value, which indicates that a flow has successfully come to an end. Store this value. It's used to authenticate yourself to fetch verified expenses.

## 3\. Authenticate your client[](#authenticate-your-client)

To access your user's account information, you need a valid client access token with the scope `expense-checks:readonly`.

**Note**: access tokens expire and must be renewed, typically in 30 minutes.

Authenticate your client

```
curl -v -X POST https://api.tink.com/api/v1/oauth/token \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=expense-checks:readonly'
```

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope":  "expense-checks:readonly"
}
```

## 4\. Fetch the report[](#fetch-the-report)

To fetch the expense report, see [Get an expense check API](https://docs.tink.com/api#risk/expense-check/get-an-expense-check).

**cURL example**

Fetch your Expense Check report

```
curl -X GET https://api.tink.com/risk/v1/expense-checks/{expense-check-id} \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' 
```

**Response example**

```
{
  "id": "8113f235-278c-422n-9d3c-2bad06c2126r”,
  "externalReference": "None",
  "engineVersion": "1.0.0",
  "identity": {
   "name": ”John Doe”,
   "ssn": "19860901XXX”
  },
  "accounts": [
   {
     "id": "5dce0949d8b4440bba74e74473b81f2b",
     "accountNumber": "12451297344",
     "name": "Danske Konto",
     "holderNames": [
      "John Doe"
     ]
   },
   {
     "id": "ed625cf8ae67493082c737c679e68949",
     "accountNumber": "12451427352",
     "name": "Mastercard Guld",
     "holderNames": [
      "John Doe"
     ]
   },
   {
     "id": "1d7dd77a84b24c08b2205d5038ffc304",
     "accountNumber": "11240377484",
     "name": "Depåkonto",
     "holderNames": [
      "John Doe"
     ]
   }
  ],
  "appId": "fbd6987f0a5643bd8ab4c8209e12f69a",
  "userId": "ae37c03cfd364113ab6f6256dfeced3c",
  "expenses": {
   "housing": {
     "activeSpending": {
      "estimate": {
        "value": {
         "unscaledValue": "6366",
         "scale": "0"
        },
        "currencyCode": "SEK"
      }
     },
     "recurring": {
      "active": [
        {
         "id": "d8de786a-c25c-496d-a9f4-17287827912a",
         "name": "fastum ab",
         "transactions": [
           {
            "id": "05abfc83bee94c619996171a79f016ba",
            "description": "Fastum AB",
            "amount": {
              "value": {
               "unscaledValue": "-6618",
               "scale": "0"
              },
              "currencyCode": "SEK"
            },
            "time": "2022-03-31T10:00:00Z"
           },
           {
            "id": "1f1508a2eebd4d4f98f647e29e525490",
            "description": "Fastum AB",
            "amount": {
              "value": {
               "unscaledValue": "-6366",
               "scale": "0"
              },
              "currencyCode": "SEK"
            },
            "time": "2021-09-30T10:00:00Z"
           },
           {
            "id": "2cf61bc2720b480f80008dbd11a20aea",
            "description": "Fastum AB",
            "amount": {
              "value": {
               "unscaledValue": "-7408",
               "scale": "0"
              },
              "currencyCode": "SEK"
            },
            "time": "2022-07-29T10:00:00Z"
           },
           {
            "id": "45162a5b627f4c3ebcc135db894ce0b6",
            "description": "Fastum AB",
            "amount": {
              "value": {
               "unscaledValue": "-6527",
               "scale": "0"
              },
              "currencyCode": "SEK"
            },
            "time": "2022-04-29T10:00:00Z"
           },
           {
            "id": "63ccbe9d8f2b4e49868810c686245d57",
            "description": "Fastum AB",
            "amount": {
              "value": {
               "unscaledValue": "-552",
               "scale": "-1"
              },
              "currencyCode": "SEK"
            },
            "time": "2022-01-31T11:00:00Z"
           },
           {
            "id": "65df4f25098a4a7e9e2ed464fc5b383d",
            "description": "Fastum AB",
            "amount": {
              "value": {
               "unscaledValue": "-7403",
               "scale": "0"
              },
              "currencyCode": "SEK"
            },
            "time": "2021-08-31T10:00:00Z"
           },
           {
            "id": "7b96416f5763438398ff208e12a91108",
            "description": "Fastum AB",
            "amount": {
              "value": {
               "unscaledValue": "-11587",
               "scale": "0"
              },
              "currencyCode": "SEK"
            },
            "time": "2022-02-28T11:00:00Z"
           },
           {
            "id": "85b89d00b50e47d09661b64c24d22b96",
            "description": "Fastum AB",
            "amount": {
              "value": {
               "unscaledValue": "-7064",
               "scale": "0"
              },
              "currencyCode": "SEK"
            },
            "time": "2021-07-30T10:00:00Z"
           },
           {
            "id": "9132ca433d5646709545a4c08362164a",
            "description": "Fastum AB",
            "amount": {
              "value": {
               "unscaledValue": "-5812",
               "scale": "0"
              },
              "currencyCode": "SEK"
            },
            "time": "2021-11-30T11:00:00Z"
           },
           {
            "id": "9915bb851eaf4db3a4d2fe6d6c6a76b9",
            "description": "Fastum AB",
            "amount": {
              "value": {
               "unscaledValue": "-601",
               "scale": "-1"
              },
              "currencyCode": "SEK"
            },
            "time": "2022-07-01T10:00:00Z"
           },
           {
            "id": "d2da77e609eb4681a452f2c9058f3e9d",
            "description": "Fastum AB",
            "amount": {
              "value": {
               "unscaledValue": "-6026",
               "scale": "0"
              },
              "currencyCode": "SEK"
            },
            "time": "2021-10-29T10:00:00Z"
           },
           {
            "id": "d53ac4392b064422a00c9566f1675b47",
            "description": "Fastum AB",
            "amount": {
              "value": {
               "unscaledValue": "-6303",
               "scale": "0"
              },
              "currencyCode": "SEK"
            },
            "time": "2022-05-31T10:00:00Z"
           },
           {
            "id": "fa39e00ed4394f4ca4b4934056e54e77",
            "description": "Fastum AB",
            "amount": {
              "value": {
               "unscaledValue": "-552",
               "scale": "-1"
              },
              "currencyCode": "SEK"
            },
            "time": "2021-12-30T11:00:00Z"
           }
         ],
         "periodicity": "MONTHLY",
         "firstSeenTime": "2021-07-30T10:00:00Z",
         "lastSeenTime": "2022-07-29T10:00:00Z"
        }
      ]
     }
   }
```

## Need help?[](#need-help-)

[Contact Sales](https://tink.com/contact-us) and let us help you get started.
