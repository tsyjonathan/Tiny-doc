---
title: "Tink Docs"
source: "https://docs.tink.com/api-connector"
exportedAt: "2026-01-13T13:02:40.806Z"
---
## Connector[](https://docs.tink.com/api-connector)

The Connector API contains resources for feeding your own account and transaction data directly into the Tink platform. The Connector API is mainly used in combination with [Finance Management](https://docs.tink.com/api-finance-management#finance-management) products.

Use the endpoints to ingest, update and delete accounts or transactions.

## Account[](#connector/account)

## Delete account[](#connector/account/delete-account)

`DELETE /connector/users/{externalUserId}/accounts/{externalAccountId}`

Deletes the account with the given account ID.

### Works with[](#connector/account/delete-account/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `accounts:write` |

### Parameters[](#connector/account/delete-account/parameters)

| Parameter | Description |
| --- | --- |
| externalUserIdrequired | External identifier for the user. |
| externalAccountIdrequired | External identifier for the account. |

| Status Code | Description |
| --- | --- |
| 204 | Account deleted. |
| 404 | Account not found. |

## Ingest accounts[](#connector/account/ingest-accounts)

`POST /connector/users/{externalUserId}/accounts`

Takes a list of accounts and the corresponding user ID.

### Works with[](#connector/account/ingest-accounts/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `accounts:write` |

### Parameters[](#connector/account/ingest-accounts/parameters)

| Parameter | Description |
| --- | --- |
| externalUserIdrequired | External identifier for the user. |

> Request Example

```
{
  "accounts": [
    {
      "availableCredit": 20000.0,
      "balance": 7000.0,
      "closed": false,
      "exclusion": "NONE",
      "externalId": "2d3bd65493b549e1927d97a2d0683ab9",
      "flags": [
        "MANDATE"
      ],
      "name": "Enkla sparkontot",
      "number": "52670208126",
      "payload": {},
      "reservedAmount": 2000.0,
      "type": "CREDIT_CARD"
    }
  ]
}
```

### Request Body: AccountListEntity[](#connector/account/ingest-accounts/request-body-accountlistentity)

The accounts.

accounts `array[AccountEntity]` required

The accounts.

#### AccountEntity[](#connector/account/ingest-accounts/request-body-accountlistentity/accountentity)

availableCredit `number`

The available credit of the account. Available credit is defined as the amount the customer has left to spend at this time. As such, it decreases with every reservation or transaction. For accounts without credit, this is always zero.

balance `number` required

The booked balance of the account. Currency is taken from the user's profile.

closed `boolean`

The closed state of the account.

exclusion `string`

The type of features to exclude. PFM\_AND\_SEARCH will exclude the accounts transactions from categorization, PFM features, and search result. PFM\_DATA will exclude the accounts transactions from categorization and PFM features.  
Values: `PFM_AND_SEARCH, PFM_DATA, NONE`

externalId `string` required

External identifier for the account.

flags `array[string]`

A list of flags specifying attributes on an account.  
Values: `BUSINESS`, `MANDATE`, `PSD2_PAYMENT_ACCOUNT`, `DEPOT_CASH_BALANCE`, `BUSINESS, MANDATE`

name `string` required

The account name.

number `string` required

The account number.

payload `object`

This property is deprecated and disabled as default. For customers where it is still enabled observe that the payload may not exceed 200 chars. Please contact your Technical Project Manager if your use case depend on this property.

reservedAmount `number`

The currently reserved amount of the account.

type `string` required

The account type.  
Values: `CHECKING`, `SAVINGS`, `INVESTMENT`, `MORTGAGE`, `CREDIT_CARD`, `LOAN`, `DUMMY`, `PENSION`, `OTHER`, `EXTERNAL`, `CHECKING, SAVINGS, INVESTMENT, MORTGAGE, CREDIT_CARD, LOAN, PENSION, OTHER, EXTERNAL`

| Status Code | Description |
| --- | --- |
| 204 | Accounts created. |
| 400 | The payload does not pass validation. |
| 401 | User not found, has no credentials, or has more than one abstract credentials. |
| 409 | Account already exists. |

## Update account[](#connector/account/update-account)

`PUT /connector/users/{externalUserId}/accounts/{externalAccountId}`

Accepts an object of properties to be updated.

### Works with[](#connector/account/update-account/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `accounts:write` |

### Parameters[](#connector/account/update-account/parameters)

| Parameter | Description |
| --- | --- |
| externalUserIdrequired | External identifier for the user. |
| externalAccountIdrequired | External identifier for the account. |

> Request Example

```
{
  "availableCredit": 20000.0,
  "closed": false,
  "exclusion": "PFM_AND_SEARCH",
  "name": "My savings account",
  "type": "CREDIT_CARD"
}
```

### Request Body: UpdateAccountEntity[](#connector/account/update-account/request-body-updateaccountentity)

Account update request

availableCredit `number`

The available credit of the account. Available credit is defined as the amount the customer has left to spend at this time. As such, it decreases with every reservation or transaction. For accounts without credit, this is always zero.

closed `boolean`

The closed state of the account.

exclusion `string`

The type of features to exclude. PFM\_AND\_SEARCH will exclude the accounts transactions from categorization, PFM features, and search result. PFM\_DATA will exclude the accounts transactions from categorization and PFM features.  
Values: `PFM_AND_SEARCH, PFM_DATA, NONE`

name `string`

The account name.

type `string`

The account type.  
Values: `CHECKING`, `SAVINGS`, `INVESTMENT`, `MORTGAGE`, `CREDIT_CARD`, `LOAN`, `DUMMY`, `PENSION`, `OTHER`, `EXTERNAL`, `CHECKING, SAVINGS, INVESTMENT, MORTGAGE, CREDIT_CARD, LOAN, PENSION, OTHER, EXTERNAL`

| Status Code | Description |
| --- | --- |
| 204 | Account updated. |
| 400 | The request does not pass validation. |
| 401 | User not found, has no credentials, or has more than one abstract credentials. |
| 404 | Account not found. |

## Transaction[](#connector/transaction)

## Delete transactions[](#connector/transaction/delete-transactions)

`POST /connector/users/{externalUserId}/transactions/delete`

Removes transactions. When deleting transactions, it's only the externalId of each transaction that is necessary.

### Works with[](#connector/transaction/delete-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `transactions:write` |

### Parameters[](#connector/transaction/delete-transactions/parameters)

| Parameter | Description |
| --- | --- |
| externalUserIdrequired | External identifier for the user. |

> Request Example

```
{
  "transactionAccounts": [
    {
      "balance": 7000.0,
      "externalId": "2d3bd65493b549e1927d97a2d0683ab9",
      "payload": {},
      "reservedAmount": 2000.0,
      "transactions": [
        {
          "externalId": "40dc04e5353547378c84f34ffc88f853"
        }
      ]
    }
  ],
  "type": "REAL_TIME"
}
```

### Request Body: DeleteTransactionAccountsContainer[](#connector/transaction/delete-transactions/request-body-deletetransactionaccountscontainer)

Container of account and transactions.

transactionAccounts `array[DeleteTransactionAccountEntity]` required

The transaction accounts.

type `string` required

Defines the priority of the delete request. Only `REAL_TIME` is supported for reflecting the most recent updates on a user's account. For deleting whole account with transactions use [Delete account](https://docs.tink.com/api#connector/account/delete-account) instead. Please use [Delete user](https://docs.tink.com/api#general/user/delete-user) for deleting all user data with transactions.  
Values: `REAL_TIME`, `HISTORICAL`, `BATCH`

#### DeleteTransactionAccountEntity[](#connector/transaction/delete-transactions/request-body-deletetransactionaccountscontainer/deletetransactionaccountentity)

balance `number` required

The balance of the account for the time of the last transaction in the list.

externalId `string` required

External identifier for the account the transaction belong to.

payload `object`

The payload property can include arbitrary metadata provided by the financial institution in question that can be used either for deep-linking back to the app of the financial institution, for displaying additional information about the account, or for backend purposes such as automatic categorization improvement, etc. The format is key-value, where key is a String and value any object.

reservedAmount `number`

The reserved amount of the account for the time of the last transaction in the list.

transactions `array[DeleteTransactionEntity]` required

The transaction list.

#### DeleteTransactionEntity[](#connector/transaction/delete-transactions/request-body-deletetransactionaccountscontainer/deletetransactionentity)

externalId `string` required

External identifier for the transaction.

| Status Code | Description |
| --- | --- |
| 204 | Transactions deleted. |
| 400 | The payload does not pass validation, or the specified account does not exist. |
| 401 | Unauthorized. |
| 404 | User with the given external id not found. |

## Ingest transactions[](#connector/transaction/ingest-transactions)

`POST /connector/users/{externalUserId}/transactions`

Takes historical or real time transactions together with an account.

### Works with[](#connector/transaction/ingest-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `transactions:write` |

### Parameters[](#connector/transaction/ingest-transactions/parameters)

| Parameter | Description |
| --- | --- |
| externalUserIdrequired | External identifier for the user. |

> Request Example

```
{
  "autoBook": false,
  "overridePending": false,
  "transactionAccounts": [
    {
      "balance": 7000.0,
      "externalId": "2d3bd65493b549e1927d97a2d0683ab9",
      "payload": {},
      "reservedAmount": 2000.0,
      "transactions": [
        {
          "amount": -98.5,
          "counterparties": {
            "payee": {
              "identifiers": {
                "financialInstitution": {
                  "accountNumber": "SE6930000000011273547693"
                }
              },
              "name": "JOE DOE"
            },
            "payer": {
              "identifiers": {
                "financialInstitution": {
                  "accountNumber": "SE6930000000011273547693"
                }
              },
              "name": "JOE DOE"
            }
          },
          "date": "string",
          "description": "Riche Teatergrillen",
          "externalId": "40dc04e5353547378c84f34ffc88f853",
          "merchantCategoryCode": "5411",
          "merchantName": "Sainsbury's,",
          "payload": {},
          "pending": false,
          "tinkId": "string",
          "type": "CREDIT_CARD"
        }
      ]
    }
  ],
  "type": "BATCH"
}
```

### Request Body: CreateTransactionAccountContainer[](#connector/transaction/ingest-transactions/request-body-createtransactionaccountcontainer)

Container of account and transactions.

autoBook `boolean`

(DEPRECATED) This feature try to automatically match stored pending transactions to booked transactions in the incoming batch. This feature is disabled by default and deprecated

overridePending `boolean`

When enabled, all stored pending transactions will be replaced by the pending transactions in the batch. Stored pending transaction present in batch will be kept but not updated and new pending transactions will be stored. Already stored pending transactions not existing in batch will be removed, hence make sure all pending transaction already stored and to be kept are sent in the batch. It is a requirement to set EXPIRE date on pending transactions to maximum 30 days(pending transactions older than 30 days have no guarantee to be replaced). This feature should only be used when no known external-id relation between the pending and booked transactions exists. Please contact your Technical Project Manager to enable this option.

transactionAccounts `array[CreateTransactionAccountEntity]` required

The transaction accounts. All accounts accumulated may contain a maximum of 2500 transactions per request.

type `string` required

Defines the priority of the ingestion request: `BATCH`: is recommended for non time critical ingestion requests in daily running batch jobs. Note: Should be used for backfilling users transaction history. `REAL_TIME`: is recommended for ingestion requests where it is time critical to minimize lag before transactions are available on the api. Note: This request type is designed for reflecting the most recent updates on a user's account, like ingesting or updating recently booked transactions. It is not intended for fulfilling larger requests such as backfilling a user's entire transaction history. `HISTORICAL`: is deprecated. Requests of type HISTORICAL are processed with same priority as BATCH but account balance will be ignored if this option is used.  
Values: `REAL_TIME`, `HISTORICAL`, `BATCH`

#### CreateTransactionAccountEntity[](#connector/transaction/ingest-transactions/request-body-createtransactionaccountcontainer/createtransactionaccountentity)

balance `number` required

The balance of the account at the time of the last transaction in the list.If a reserved amount is supplied will the accounts balance be set to the here supplied balance minus the reserved amount.

externalId `string` required

External identifier for the account the transaction belongs to.

payload `object`

This property is deprecated and disabled as default. For customers where it is still enabled observe that the payload may not exceed 200 chars. Please contact your Technical Project Manager if your use case depend on this property.

reservedAmount `number`

The reserved amount of the account at the time of the last transaction in the list.The reserved amount is optional. If a reserved amount is supplied will the accounts balance be set to the supplied `balance` minus the supplied reserved amount.

transactions `array[CreateTransactionEntity]` required

The transaction list.

#### CreateTransactionEntity[](#connector/transaction/ingest-transactions/request-body-createtransactionaccountcontainer/createtransactionentity)

amount `number` required

The debited/credited amount in the currency of the account.

counterparties `ConnectorCounterparties`

date `Date` required

Date is when the transaction was executed, not when it was settled (except for scheduled transfers/payments, where the settling date is to be interpreted as the execution date). The date cannot be older than 10 years.

description `string` required

A merchant name if possible. If such value is not available, the description that is shown in the transaction list.

externalId `string` required

External identifier for the transaction. Must be unique per user and account.

merchantCategoryCode `string`

\[BETA\] Merchant category code (MCC) specified as ISO-18245 4-digit string.

merchantName `string`

Merchant name of the transaction.

payload `object`

The payload property is a key-value map. Maximum total size of payload data is 1000 chars. The key must be one the following supported ones:  
`PENDING_IDS`: A list of pending transaction external IDs for which this transaction is a booking of. If the user has changed any of the pending transactions, this transaction will get the category of the pending transaction with the largest amount if it constitutes at least half of this transactions amount.  
`PENDING_TRANSACTION_EXPIRATION_DATE`: A UNIX timestamp for when this transaction should be automatically removed from the database. The removal will happen when other transactions are sent in. Can only be set on transactions marked as pending.  
`TAGS`: An array of strings that will be set as tags within the notes field of the transaction. Each tag must be alphanumeric without whitespace.

pending `boolean`

If the transaction is pending (reserved) or not (booked).

tinkId `string`

Ignored for new objects. Used to specify the id as given by Tink on when updating objects without an existing external ID.

type `string` required

The type of the transaction.  
Values: `DEFAULT`, `CREDIT_CARD`, `TRANSFER`, `PAYMENT`, `WITHDRAWAL`, `TRAINING`, `DEFAULT, CREDIT_CARD, TRANSFER, PAYMENT, WITHDRAWAL`

#### ConnectorCounterparties[](#connector/transaction/ingest-transactions/request-body-createtransactionaccountcontainer/connectorcounterparties)

payee `ConnectorCounterpartyInformation`

payer `ConnectorCounterpartyInformation`

#### ConnectorCounterpartyInformation[](#connector/transaction/ingest-transactions/request-body-createtransactionaccountcontainer/connectorcounterpartyinformation)

identifiers `ConnectorIdentifiers`

name `string`

\[BETA\] Name of a transaction counterparty.

#### ConnectorIdentifiers[](#connector/transaction/ingest-transactions/request-body-createtransactionaccountcontainer/connectoridentifiers)

financialInstitution `FinancialInstitution`

#### FinancialInstitution[](#connector/transaction/ingest-transactions/request-body-createtransactionaccountcontainer/financialinstitution)

accountNumber `string`

\[BETA\] Transaction counterparty account number.

| Status Code | Description |
| --- | --- |
| 204 | Transactions ingested. |
| 400 | The payload does not pass validation, or the specified account does not exist. |
| 401 | Unauthorized. |
| 404 | User with the given external id not found. |
| 409 | Transaction already exists. |
| 410 | Transaction has already been deleted. |
| 412 | Could not find any accounts for the user. |

## Update transaction[](#connector/transaction/update-transaction)

`PUT /connector/users/{externalUserId}/transactions/{externalTransactionId}`

Updates a single transaction related to an account.

### Works with[](#connector/transaction/update-transaction/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `transactions:write` |

### Parameters[](#connector/transaction/update-transaction/parameters)

| Parameter | Description |
| --- | --- |
| externalUserIdrequired | External identifier for the user. |
| externalTransactionIdrequired | External identifier for the transaction. |

> Request Example

```
{
  "transactionAccounts": [
    {
      "balance": 7000.0,
      "externalId": "2d3bd65493b549e1927d97a2d0683ab9",
      "payload": {},
      "reservedAmount": 2000.0,
      "tinkId": "e4a47d5e3d514ca4bd22130bb43c640b",
      "transactions": [
        {
          "amount": -98.5,
          "counterparties": {
            "payee": {
              "identifiers": {
                "financialInstitution": {
                  "accountNumber": "SE6930000000011273547693"
                }
              },
              "name": "JOE DOE"
            },
            "payer": {
              "identifiers": {
                "financialInstitution": {
                  "accountNumber": "SE6930000000011273547693"
                }
              },
              "name": "JOE DOE"
            }
          },
          "date": "string",
          "description": "Riche Teatergrillen",
          "externalId": "40dc04e5353547378c84f34ffc88f853",
          "merchantCategoryCode": "5411",
          "merchantName": "Sainsbury's,",
          "payload": {},
          "pending": false,
          "tinkId": "string",
          "type": "CREDIT_CARD"
        }
      ]
    }
  ],
  "type": "REAL_TIME"
}
```

### Request Body: UpdateTransactionAccountContainer[](#connector/transaction/update-transaction/request-body-updatetransactionaccountcontainer)

Container of account and transactions.

transactionAccounts `array[UpdateTransactionAccountEntity]` required

The transaction accounts.

type `string` required

Defines the priority of the update request. Only `REAL_TIME` is supported for reflecting the most recent updates on a user's account.  
Values: `REAL_TIME`, `HISTORICAL`, `BATCH`

#### UpdateTransactionAccountEntity[](#connector/transaction/update-transaction/request-body-updatetransactionaccountcontainer/updatetransactionaccountentity)

balance `number` required

The balance of the account at the time of the last transaction in the list.If a reserved amount is supplied, the account's balance will be set to the balance supplied minus the reserved amount

externalId `string`

External identifier for the account the transaction belongs to. Either this or tinkId must be set.

payload `object`

The payload property can include arbitrary metadata provided by the financial institution in question that can be used either for deep-linking back to the app of the financial institution, for displaying additional information about the account, or for backend purposes such as automatic categorization improvement, etc. The format is key-value, where key is a String and value any object.

reservedAmount `number`

The reserved amount of the account at the time of the last transaction in the list.The reserved amount is optional. If a reserved amount is supplied, the account's balance will be set to the balance supplied minus the reserved amount

tinkId `string`

Internal identifier for the account the transaction belongs to generated by Tink. Either this or externalId must be set.

transactions `array[CreateTransactionEntity]` required

The list with the single transaction to update.

#### CreateTransactionEntity[](#connector/transaction/update-transaction/request-body-updatetransactionaccountcontainer/createtransactionentity)

amount `number` required

The debited/credited amount in the currency of the account.

counterparties `ConnectorCounterparties`

date `Date` required

Date is when the transaction was executed, not when it was settled (except for scheduled transfers/payments, where the settling date is to be interpreted as the execution date). The date cannot be older than 10 years.

description `string` required

A merchant name if possible. If such value is not available, the description that is shown in the transaction list.

externalId `string` required

External identifier for the transaction. Must be unique per user and account.

merchantCategoryCode `string`

\[BETA\] Merchant category code (MCC) specified as ISO-18245 4-digit string.

merchantName `string`

Merchant name of the transaction.

payload `object`

The payload property is a key-value map. Maximum total size of payload data is 1000 chars. The key must be one the following supported ones:  
`PENDING_IDS`: A list of pending transaction external IDs for which this transaction is a booking of. If the user has changed any of the pending transactions, this transaction will get the category of the pending transaction with the largest amount if it constitutes at least half of this transactions amount.  
`PENDING_TRANSACTION_EXPIRATION_DATE`: A UNIX timestamp for when this transaction should be automatically removed from the database. The removal will happen when other transactions are sent in. Can only be set on transactions marked as pending.  
`TAGS`: An array of strings that will be set as tags within the notes field of the transaction. Each tag must be alphanumeric without whitespace.

pending `boolean`

If the transaction is pending (reserved) or not (booked).

tinkId `string`

Ignored for new objects. Used to specify the id as given by Tink on when updating objects without an existing external ID.

type `string` required

The type of the transaction.  
Values: `DEFAULT`, `CREDIT_CARD`, `TRANSFER`, `PAYMENT`, `WITHDRAWAL`, `TRAINING`, `DEFAULT, CREDIT_CARD, TRANSFER, PAYMENT, WITHDRAWAL`

#### ConnectorCounterparties[](#connector/transaction/update-transaction/request-body-updatetransactionaccountcontainer/connectorcounterparties)

payee `ConnectorCounterpartyInformation`

payer `ConnectorCounterpartyInformation`

#### ConnectorCounterpartyInformation[](#connector/transaction/update-transaction/request-body-updatetransactionaccountcontainer/connectorcounterpartyinformation)

identifiers `ConnectorIdentifiers`

name `string`

\[BETA\] Name of a transaction counterparty.

#### ConnectorIdentifiers[](#connector/transaction/update-transaction/request-body-updatetransactionaccountcontainer/connectoridentifiers)

financialInstitution `FinancialInstitution`

#### FinancialInstitution[](#connector/transaction/update-transaction/request-body-updatetransactionaccountcontainer/financialinstitution)

accountNumber `string`

\[BETA\] Transaction counterparty account number.

| Status Code | Description |
| --- | --- |
| 204 | Transaction updated. |
| 400 | The payload does not pass validation, or the specified account does not exist. |
| 401 | Unauthorized. |
| 404 | User with the given external id not found. |
