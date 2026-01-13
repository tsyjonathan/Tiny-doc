---
title: "List accounts and balances - Tink Docs"
source: "https://docs.tink.com/resources/business-transactions/business-list-accounts-and-balances"
exportedAt: "2026-01-13T12:46:53.209Z"
---
To retrieve a list of accounts for a specific user, you need a user access token with the `balances:read` and `accounts:read` scope. Using the user access token, you can make a request to the Accounts endpoint:

List the accounts for a specific user

```
curl "https://api.tink.com/data/v2/accounts" \
  -H 'Authorization: Bearer '
```

Response example

```
{
  "accounts": [
    {
      "balances": {
        "booked": {
          "amount": {
            "currencyCode": "EUR",
            "value": {
              "scale": "-3",
              "unscaledValue": "19"
            }
          }
        }
      },
      "customerSegment": "UNDEFINED_CUSTOMER_SEGMENT",
      "dates": {
        "lastRefreshed": "2020-12-15T12:16:58Z"
      },
      "financialInstitutionId": "6e68cc6287704273984567b3300c5822",
      "id": "ee7ddbd178494220bb184791783f4f63",
      "identifiers": {
        "iban": {
          "bban": "0000011273547693",
          "iban": "SE6930000000011273547693"
        },
        "pan": {
          "masked": "4000 12** **** 9010"
        }
      },
      "name": "PERSONKONTO",
      "type": "CHECKING"
    }
  ],
  "nextPageToken": "string"
}
```
