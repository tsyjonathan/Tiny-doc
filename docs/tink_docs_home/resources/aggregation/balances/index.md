---
title: "Balances Endpoint - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/aggregation/balances/"
exportedAt: "2026-01-13T12:55:36.791Z"
---
The balances object represents a bank account's balances. This object is populated after the first aggregation journey has ended successfully, and is updated on each subsequent successful credential refresh.

The [_/accounts/{id}/balances_ endpoint](/Tiny-doc/tink_docs_api/api/#data-v1/account/get-balances-for-account) will return an object that contains the following 3 kinds of balances:

-   **Booked Balance**: This is the current booked/ledger balance of the account, as specified by the bank. If the bank only provides us with one balance, it will appear here.  
    Note: Booked balance will always be returned.
    
-   **Available Balance**: The amount of funds the customer is able to withdraw from the account, not including any overdraft facility that may be available. Typically this will be the booked balance, minus any pending card transactions and minus any uncleared cheques.  
    Note: If Available Balance is not available, it is set as _null_
    
-   **Credit Limit**: Represents the total amount of any credit facility available on the account, if specified by the bank.  
    Note: If Credit Limit is not available, it is set as _null_
    

**The difference between Booked Balance and Available Balance:**

It is possible for an account to have different values set for the booked balance and the available balance. This happens because of how booked balance and available balance are treated by the financial institution.

The account's booked balance is updated at the end of each business day of a financial institution. This balance will now only get updated again at the end of the next business day of the bank. All purchases/expenses/deposits made on the account will not appear here till next business day’s posting period.

The account's available balance is immediately updated all day long to reflect all the charges/transactions/deposits as they happen.

**Working with the balances endpoint**:

1.  Create a credential using the [create credentials](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/create-credentials) endpoint.
2.  Complete the authentication process and first aggregation journey.
3.  List aggregated accounts using the [list accounts](/Tiny-doc/tink_docs_api/api/#data-v1/account/list-accounts) endpoint to get the account ids.
4.  Fetch balances data using the _/api/v1/accounts/{{account\_id}}/balances_ endpoint.

Sample response from /balances endpoint:

```
{
  "accountId": "{{account_id}}",
  "refreshed": 1597927749000,
  "balances": {
    "booked": {
      "unscaledValue": 2308,
      "scale": 0,
      "currencyCode": "GBP"
    },
    "available": {
      "unscaledValue": 23080,
      "scale": 1,
      "currencyCode": "GBP"
    },
    "creditLimit": null
  }
}
```
