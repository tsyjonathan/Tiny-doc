---
title: "Tink Docs"
source: "https://docs.tink.com/api-data-v1"
exportedAt: "2026-01-13T13:02:59.305Z"
---
## Data v1[](https://docs.tink.com/api-data-v1)

The Data v1 section contains resources that are used by multiple account information products, including Account Check and Business Account Check.

List accounts, fetch report data (JSON/PDF), return Investments and Loans data, query, update, list, and fetch transactions.

## Account[](#data-v1/account)

The `Account` object represents a bank account. Features of the object may vary between different account types.

### The Account model[](#data-v1/account/the-account-model)

accountExclusion `string` required

Indicates features this account should be excluded from. Possible values are: `NONE`: No features are excluded from this account, `PFM_DATA`: Personal Finance Management features, like statistics and activities are excluded, `PFM_AND_SEARCH`: Personal Finance Management features are excluded and transactions belonging to this account are not searchable. This is the equivalent of the, now deprecated, boolean flag 'excluded', `AGGREGATION`: No data will be aggregated for this account and all data associated with the account is removed (except account name and account number). This property can be updated in an update account request.  
Values: `AGGREGATION`, `PFM_AND_SEARCH`, `PFM_DATA`, `NONE`

accountNumber `string` required

The number that the user would typically recognize as their account number, for example when selecting their account in a list.For card-based accounts where the card number is also the unique account identifier, this field contains the masked PAN.For US accounts, this field would typically contain the last 4 digits of the full account number.

balance `number` required

The current booked balance of the account. The type of booked balance may vary with bank integration and capabilities. In case the bank can provide multiple types of balances the prioritization will be as followed, Interim booked balance is prioritized first, then open and closed booked balance.  
`Interim Balance`: is booked balance calculated in the course of the account servicer's business day, at the time specified, and subject to further changes during the business day. The interim balance is calculated on the basis of booked credit and debit items during the calculation time/period specified.  
`Open Balance`: is booked balance of the account at the beginning of the account reporting period. It always equals the closing book balance from the previous report.  
`Closed Balance`: is booked balance of the account at the end of the pre-agreed account reporting period. It is the sum of the opening booked balance at the beginning of the period and all entries booked to the account during the pre-agreed account reporting period.

The definition of the balance property differs between account types.  
`SAVINGS`, `CHECKING`: the balance represents the actual amount of cash in the account,  
`INVESTMENT`: the balance represents the value of the investments connected to this accounts including any available cash,  
`LOAN`: the balance represents the loan debt outstanding from this account,  
`CREDIT_CARD`: the balance represents the outstanding balance on the account, it does not include any available credit or purchasing power the user has with the credit provider.

bankId `string`

For Connector ingested accounts, the account `externalId` associated with the account during ingestion will be present in this field. Typically used as a unique key for each ingested account. All other usage of this field (e.g. aggregated accounts) is deprecated and highly discouraged.

closed `boolean`

A closed account indicates that it was no longer available from the connected financial institution, most likely due to it having been closed by the user.

credentialsId `string` required

The internal identifier of the credentials that the account belongs to.

currencyDenominatedBalance `CurrencyDenominatedAmount`

The current balance of the account. The definition of the balance property differs between account types. `SAVINGS`: the balance represents the actual amount of cash in the account, `INVESTMENT`: the balance represents the value of the investments connected to this account including any available cash, `MORTGAGE`: the balance represents the loan debt outstanding for this account, `CREDIT_CARD`: the balance represents the outstanding balance of the account, it does not include any available credit or purchasing power the user has with the credit provider. The balance is represented as a scale and unscaled value of the amount together with the ISO 4217 currency code.

details `AccountDetails`

(DEPRECATED) Details contains information only applicable for accounts of the types `LOAN` and `MORTGAGE`. Not all banks offer detailed information about their loans and mortgages therefore details will not be present on some accounts.

excluded `boolean` required

Indicates if the user has excluded the account. Categorization and PFM Features are excluded, and transactions belonging to this account are not searchable. This property can be updated in an update account request.

favored `boolean` required

Indicates if the user has favored the account. This property can be updated in an update account request.

financialInstitutionId `string`

Unique identifier to group accounts belonging the same financial institution. Available for aggregated accounts only.

firstSeen `Date`

The UNIX epoch timestamp of when the account was first seen by Tink, e.g. when the account was aggregated for the first time.

flags `string`

List of flags specifying attributes of the account.  
Values: `BUSINESS`, `MANDATE`

holderName `string`

The name of the account holder.

iban `string`

IBAN account identifier for the account. This field is based on the value of the identifiers field.

id `string` required

Internal account identifier.

identifiers `string`

All possible ways to uniquely identify this `Account`. An se-identifier is built up like: `se://{clearingnumber}{accountnumber}`.

name `string` required

Name of the account assigned by the account holder or by the financial institution. This field is typically what the user recognises in their online banking app.

ownership `number` required

Ownership ratio indicating how much of the account is owned by the user. The ownership determine the percentage of the amounts on transactions belonging to this account, that should be attributed to the user when statistics are calculated. This property has a default value, and it can only be updated by you in an update account request.

refreshed `Date`

The UNIX epoch timestamp of when the account was last refreshed.

type `string` required

The type of the account. This property can be updated in an update account request.  
Values: `CHECKING`, `SAVINGS`, `INVESTMENT`, `MORTGAGE`, `CREDIT_CARD`, `LOAN`, `PENSION`, `OTHER`, `EXTERNAL`

#### CurrencyDenominatedAmount[](#data-v1/account/the-account-model/currencydenominatedamount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### AccountDetails[](#data-v1/account/the-account-model/accountdetails)

interest `number`

(DEPRECATED) Interest of the account. Applicable for loans and savings accounts.

nextDayOfTermsChange `Date`

(DEPRECATED) A timestamp of the next day of terms change of the account. Applicable for loans.

numMonthsBound `integer`

(DEPRECATED) Populated if available. Describes how many months the interest rate is bound.

type `string`

(DEPRECATED) Account subtype.  
Values: `MORTGAGE`, `BLANCO`, `MEMBERSHIP`, `VEHICLE`, `LAND`, `STUDENT`, `CREDIT`, `OTHER`

## Get balances for accountBeta[](#data-v1/account/get-balances-for-account)

`GET /api/v1/accounts/{id}/balances`

Returns an object with the account’s balances.

### Works with[](#data-v1/account/get-balances-for-account/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `balances:read` |

> Response Example

```
{
  "accountId": "a6bb87e57a8c4dd4874b241471a2b9e8",
  "balances": {
    "available": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "booked": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "creditLimit": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    }
  },
  "refreshed": 1455740874875
}
```

### Response: Balances[](#data-v1/account/get-balances-for-account/response-balances)

accountId `string`

The internal identifier of account.

balances `BalancesDetails`

Contains the different type of balances for the selected account

refreshed `Date`

Timestamp of when the account was last refreshed.

#### BalancesDetails[](#data-v1/account/get-balances-for-account/response-balances/balancesdetails)

available `[CurrencyDenominatedAmount](#tag-account-currencydenominatedamount)`

The amount of funds the customer is able to withdraw from the account, not including any overdraft facility that may be available. Typically this will be the booked balance, minus any pending card transactions and minus any uncleared cheques

booked `[CurrencyDenominatedAmount](#tag-account-currencydenominatedamount)` required

The current “booked”/”ledger” balance of the account, as specified by the bank. If the bank only provides us with one balance type, it will appear here.  
See [Account balance](https://docs.tink.com/api#account) for detailed description.

creditLimit `[CurrencyDenominatedAmount](#tag-account-currencydenominatedamount)`

If specified by the bank, the total amount of any credit facility available on the account

| Status Code | Description |
| --- | --- |
| 200 | Successful operation. |
| 404 | The account does not exist, or no balances available. |

## List accounts[](#data-v1/account/list-accounts)

`GET /api/v1/accounts/list`

Returns an object with a list of the authenticated user's accounts.

### Works with[](#data-v1/account/list-accounts/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `accounts:read` |

> Response Example

```
{
  "accounts": [
    {
      "accountExclusion": "AGGREGATION",
      "accountNumber": "1234-123456789",
      "balance": 34567.5,
      "bankId": "DE239857295893485",
      "closed": false,
      "credentialsId": "6e68cc6287704273984567b3300c5822",
      "currencyDenominatedBalance": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 1050
      },
      "details": {
        "interest": 0,
        "nextDayOfTermsChange": "string",
        "numMonthsBound": 0,
        "type": "MORTGAGE"
      },
      "excluded": false,
      "favored": false,
      "financialInstitutionId": "6e68cc6287704273984567b3300c5822",
      "firstSeen": 1455009102000,
      "flags": "[\"MANDATE\"]",
      "holderName": "Thomas Alan Waits",
      "iban": "SE7921000813610123456789",
      "id": "a6bb87e57a8c4dd4874b241471a2b9e8",
      "identifiers": "[\"se://9999111111111111\"]",
      "name": "My account",
      "ownership": 0.5,
      "refreshed": 1455740874875,
      "type": "CHECKING"
    }
  ]
}
```

### Response: AccountListResponse[](#data-v1/account/list-accounts/response-accountlistresponse)

accounts `array[[Account](#tag-account)]`

A list of accounts

## Update an Account[](#data-v1/account/update-an-account)

`PUT /api/v1/accounts/{id}`

Updates mutable properties of an account. The following properties are possible to update: accountExclusion, accountNumber, excluded, favored, name, type

### Works with[](#data-v1/account/update-an-account/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `accounts:write` |

### Parameters[](#data-v1/account/update-an-account/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The ID of the account |

> Request Example

```
{
  "accountExclusion": "AGGREGATION",
  "accountNumber": "1234-123456789",
  "balance": 34567.5,
  "bankId": "DE239857295893485",
  "closed": false,
  "credentialsId": "6e68cc6287704273984567b3300c5822",
  "currencyDenominatedBalance": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "details": {
    "interest": 0,
    "nextDayOfTermsChange": "string",
    "numMonthsBound": 0,
    "type": "MORTGAGE"
  },
  "excluded": false,
  "favored": false,
  "financialInstitutionId": "6e68cc6287704273984567b3300c5822",
  "firstSeen": 1455009102000,
  "flags": "[\"MANDATE\"]",
  "holderName": "Thomas Alan Waits",
  "iban": "SE7921000813610123456789",
  "id": "a6bb87e57a8c4dd4874b241471a2b9e8",
  "identifiers": "[\"se://9999111111111111\"]",
  "name": "My account",
  "ownership": 0.5,
  "refreshed": 1455740874875,
  "type": "CHECKING"
}
```

### Request Body: [Account](#tag-account)[](#data-v1/account/update-an-account/request-body-account)

The updated account object.

The `Account` object represents a bank account. Features of the object may vary between different account types.

See [Account](#tag-account) for parameter descriptions.

> Response Example

```
{
  "accountExclusion": "AGGREGATION",
  "accountNumber": "1234-123456789",
  "balance": 34567.5,
  "bankId": "DE239857295893485",
  "closed": false,
  "credentialsId": "6e68cc6287704273984567b3300c5822",
  "currencyDenominatedBalance": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "details": {
    "interest": 0,
    "nextDayOfTermsChange": "string",
    "numMonthsBound": 0,
    "type": "MORTGAGE"
  },
  "excluded": false,
  "favored": false,
  "financialInstitutionId": "6e68cc6287704273984567b3300c5822",
  "firstSeen": 1455009102000,
  "flags": "[\"MANDATE\"]",
  "holderName": "Thomas Alan Waits",
  "iban": "SE7921000813610123456789",
  "id": "a6bb87e57a8c4dd4874b241471a2b9e8",
  "identifiers": "[\"se://9999111111111111\"]",
  "name": "My account",
  "ownership": 0.5,
  "refreshed": 1455740874875,
  "type": "CHECKING"
}
```

### Response: [Account](#tag-account)[](#data-v1/account/update-an-account/response-account)

The `Account` object represents a bank account. Features of the object may vary between different account types.

See [Account](#tag-account) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | Successful operation. |
| 400 | The payload does not pass validation. |
| 404 | The account does not exist. |

## Account Verification[](#data-v1/account-verification)

The Account Verification Report API is used to verify a user's bank account and provide" + " account details." + "This API is e.g. used in the [Account" + " Check](https://docs.tink.com/resources/account-check) flow, as a way to retrieve" + " the account information." + "_Note:_ The report is a temporary resource that will be available for retrieval for" + " 1h after creation.

### The Account Verification model[](#data-v1/account-verification/the-account-verification-model)

created `integer` required

The UNIX epoch timestamp represents the creation date and time of the report.

externalReference `string`

An external reference identifier given by the client in the Account Check Tink Link session or Tink Link query.

id `string` required

Tink unique identifier for the account report. Generated at the moment of report creation.

userDataByProvider `array[ProviderUserData]` required

The user data returned by the provider.

#### ProviderUserData[](#data-v1/account-verification/the-account-verification-model/provideruserdata)

accounts `array[AccountSummary]` required

Information pertaining to the accounts of the user.

financialInstitutionName `string` required

The name of the financial institution.

identity `IdentitySummary` required

Identity information of the user authenticating.

providerName `string` required

The Tink name representing the financial institution

updated `integer` required

The timestamp of when the report data was collected.

#### AccountSummary[](#data-v1/account-verification/the-account-verification-model/accountsummary)

accountIdentifiers `AccountIdentifiers` required

Account identifiers used for transfers to and from the account.  
Account Identifiers are complementary identifiers of the account. Presence of identifiers varies with market local conventions, account types, financial institutions and availability.

accountNumber `string` required

The number that the user would typically recognize as their account number, for example when selecting their account in a list.For card-based accounts where the card number is also the unique account identifier, this field contains the masked PAN.For US accounts, this field would typically contain the last 4 digits of the full account number.

accountType `string` required

Specifies the type of account.  
Note: Since new types can be added as the product evolves, make sure your implementation is resiliently handling any unrecognized value returned in the API response.  
Account types:  
\* `CHECKING`: A Checking account.  
\* `SAVINGS`: A Savings account.  
\* `CREDIT_CARD`: A Credit Card account.  
Note: credit card accounts are only enabled if credit\_cards are added as refreshable item, i.e. for Account Check and Transactions bundle flows.  
Values: `CHECKING, SAVINGS, CREDIT_CARD`

commercialName `string`

The commercial name of the account set by the financial institution.

currencyCode `string` required

ISO 4217 currency code.

customerSegment `string`

Indicates whether the account belongs to a financial product offered to individuals or business customers.  
Values: `BUSINESS, PERSONAL, UNKNOWN`

holderName `string`

(DEPRECATED) Removed after 2025-11-14. For full information about all holders of the account see parties

iban `string`

(DEPRECATED): Removed after 2025-11-14. For IBAN see iban field in accountIdentifiers

id `string` required

The internal identifier of account.

name `string` required

Name of the account assigned by the account holder or by the financial institution.  
This field is typically what the user recognises in their online banking app.

parties `array[Party]` required

All persons and legal entities associated with the account as well as their relation to it.  
An empty list will be returned when no parties are available for the account.

#### AccountIdentifiers[](#data-v1/account-verification/the-account-verification-model/accountidentifiers)

ach `AchAccountIdentifier`

Account identifier used to make ACH transfers to and from the account.

bacs `BacsAccountIdentifier`

Account identifier specific to BACS payment scheme.

iban `IbanAccountIdentifier`

Account IBAN identifiers.

rix `RixAccountIdentifier`

Account identifier specific to Rix payment system.

#### AchAccountIdentifier[](#data-v1/account-verification/the-account-verification-model/achaccountidentifier)

accountNumber `string` required

The ACH account number.

routingNumber `string` required

The financial institution routing number for the account.

wireRoutingNumber `string`

The financial institution wire routing number for the account, if available.

#### BacsAccountIdentifier[](#data-v1/account-verification/the-account-verification-model/bacsaccountidentifier)

accountNumber `string` required

The BACS account number.

sortCode `string` required

The sort code of the account.

#### IbanAccountIdentifier[](#data-v1/account-verification/the-account-verification-model/ibanaccountidentifier)

bban `string` required

BBAN represents a country-specific bank account number.

bic `string`

BIC bank number. This can be inferred from the IBAN, but some banks might require it for adding a beneficiary or will display it for existing accounts owned by the user.

iban `string` required

IBAN represents an international bank account number.

#### RixAccountIdentifier[](#data-v1/account-verification/the-account-verification-model/rixaccountidentifier)

accountNumber `string` required

The account number of the account.

clearingNumber `string` required

The clearing number of the account.

#### Party[](#data-v1/account-verification/the-account-verification-model/party)

identity `Identity` required

Information pertaining to the identity of the party.

role `string` required

The role of the party. Roles are defined as:  
`HOLDER`: A party that is legally responsible for the money of the account.  
`AUTHORIZED_USER`: A party that can operate the account, but it’s not legally the owner or responsible of the money of the account.  
`OTHER`: A party linked to the account that have a role that does not match any of the other documented roles, i.e a party with a role that is not an authorized user or a holder.  
`UNKNOWN`: Tink can not determine anything about the role. except that the party is associated with the specified account.  
Values: `HOLDER, AUTHORIZED_USER, OTHER, UNKNOWN`

#### Identity[](#data-v1/account-verification/the-account-verification-model/identity)

name `string`

Name of the party.

ssn `string`

Social security number or national identification number of the user.

#### IdentitySummary[](#data-v1/account-verification/the-account-verification-model/identitysummary)

addresses `array[AVRAddress]`

Addresses of the user.

dateOfBirth `string`

Date of birth of the user, ISO 8601 date format (YYYY-MM-DD).

emails `array[AVREmail]`

Email addresses of the user.

name `string`

Full name of the user.

phoneNumbers `array[AVRPhoneNumber]`

Phone numbers of the user.

ssn `string`

Social security number or national identification number of the user.

#### AVRAddress[](#data-v1/account-verification/the-account-verification-model/avraddress)

city `string` required

The city.

countryCode `string`

ISO 3166-2 country code.

postalCode `string` required

The postal code.

street `string` required

The street address.

subdivision `string`

The subdivision. In the U.S. this would be the state.

type `string` required

The address type. Possible values:" + "BUSINESS: The address is the physical location of a business." + "CORRESPONDENCE: The address where correspondence is sent." + "DELIVERY\_TO: The address to which delivery is to take place." + "MAIL\_TO: The address to which mail is sent." + "PO\_BOX: The address is a postal office (PO) box." + "POSTAL: The address is the complete postal addressDao." + "RESIDENTIAL: The address is the home addressDao." + "STATEMENT: The address where statements are sent." + "UNKNOWN: No information about address type was provided by the financial" + " institution.  
Values: `BUSINESS,CORRESPONDENCE,DELIVERY_TO,MAIL_TO,PO_BOX,POSTAL,RESIDENTIAL,STATEMENT,UNKNOWN`

#### AVREmail[](#data-v1/account-verification/the-account-verification-model/avremail)

address `string` required

The email address.

type `string` required

The email type.  
Values: `PRIMARY, SECONDARY, OTHER, UNKNOWN`

#### AVRPhoneNumber[](#data-v1/account-verification/the-account-verification-model/avrphonenumber)

number `string` required

The phone number.

type `string` required

The phone type.  
Values: `HOME, WORK, MOBILE, OTHER, UNKNOWN`

## Create Account Verification ReportBeta[](#data-v1/account-verification/create-account-verification-report)

`POST /api/v1/account-verification-reports`

Create an Account Verification report for a user. The report is a temporary resource that will be available for retrieval for 1h after creation.

### Works with[](#data-v1/account-verification/create-account-verification-report/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `account-verification-reports:write` |

> Response Example

```
{
  "created": 1455740874875,
  "externalReference": "ext-abc-123",
  "id": "6e68cc6287704273984567b3300c5822",
  "userDataByProvider": [
    {
      "accounts": [
        {
          "accountIdentifiers": {
            "ach": {
              "accountNumber": "0123456789",
              "routingNumber": "021000021",
              "wireRoutingNumber": "021000021"
            },
            "bacs": {
              "accountNumber": 12345678,
              "sortCode": 601314
            },
            "iban": {
              "bban": 21000813610123457000,
              "bic": "DABASESX",
              "iban": "SE7921000813610123456789"
            },
            "rix": {
              "accountNumber": 8257466,
              "clearingNumber": 5839
            }
          },
          "accountNumber": "1234-123456789",
          "accountType": "SAVINGS",
          "commercialName": "Commercial name",
          "currencyCode": "EUR",
          "customerSegment": "PERSONAL",
          "holderName": "John Doe",
          "iban": "SE7921000813610123456789",
          "id": "a6bb87e57a8c4dd4874b241471a2b9e8",
          "name": "John's account",
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
      ],
      "financialInstitutionName": "Bank Name",
      "identity": {
        "addresses": [
          {
            "city": "London",
            "countryCode": "US",
            "postalCode": 11155,
            "street": 1600,
            "subdivision": "Ohio",
            "type": "PO_BOX"
          }
        ],
        "dateOfBirth": "1967-02-20",
        "emails": [
          {
            "address": "test@example.com",
            "type": "PRIMARY"
          }
        ],
        "name": "John Doe",
        "phoneNumbers": [
          {
            "number": "+1 206 555 0100",
            "type": "PRIMARY"
          }
        ],
        "ssn": "19670220-1234"
      },
      "providerName": "se-bank-oauth",
      "updated": 1455740124123
    }
  ]
}
```

### Response: [AccountVerification](#tag-accountverification)[](#data-v1/account-verification/create-account-verification-report/response-accountverification)

The Account Verification Report API is used to verify a user's bank account and provide" + " account details." + "This API is e.g. used in the [Account" + " Check](https://docs.tink.com/resources/account-check) flow, as a way to retrieve" + " the account information." + "_Note:_ The report is a temporary resource that will be available for retrieval for" + " 1h after creation.

See [AccountVerification](#tag-accountverification) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | Created. |
| 400 | Incorrect request parameters or user data missing. |

## Get Account Verification PDF Report[](#data-v1/account-verification/get-account-verification-pdf-report)

`GET /api/v1/account-verification-reports/{id}/pdf`

Fetch a PDF report based on the data returned in the Account Verification report API.

### Works with[](#data-v1/account-verification/get-account-verification-pdf-report/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `account-verification-reports:read` |
| Client token | `account-verification-reports:read` |

### Parameters[](#data-v1/account-verification/get-account-verification-pdf-report/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The id of the report to retrieve a PDF document for. |

### Query Parameters[](#data-v1/account-verification/get-account-verification-pdf-report/query-parameters)

| Parameter | Description |
| --- | --- |
| templaterequired | The template name to use for the report generation. Available templates: standard-1.0 |

> Response Example

```
{
  "created": 1455740874875,
  "externalReference": "ext-abc-123",
  "id": "6e68cc6287704273984567b3300c5822",
  "userDataByProvider": [
    {
      "accounts": [
        {
          "accountIdentifiers": {
            "ach": {
              "accountNumber": "0123456789",
              "routingNumber": "021000021",
              "wireRoutingNumber": "021000021"
            },
            "bacs": {
              "accountNumber": 12345678,
              "sortCode": 601314
            },
            "iban": {
              "bban": 21000813610123457000,
              "bic": "DABASESX",
              "iban": "SE7921000813610123456789"
            },
            "rix": {
              "accountNumber": 8257466,
              "clearingNumber": 5839
            }
          },
          "accountNumber": "1234-123456789",
          "accountType": "SAVINGS",
          "commercialName": "Commercial name",
          "currencyCode": "EUR",
          "customerSegment": "PERSONAL",
          "holderName": "John Doe",
          "iban": "SE7921000813610123456789",
          "id": "a6bb87e57a8c4dd4874b241471a2b9e8",
          "name": "John's account",
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
      ],
      "financialInstitutionName": "Bank Name",
      "identity": {
        "addresses": [
          {
            "city": "London",
            "countryCode": "US",
            "postalCode": 11155,
            "street": 1600,
            "subdivision": "Ohio",
            "type": "PO_BOX"
          }
        ],
        "dateOfBirth": "1967-02-20",
        "emails": [
          {
            "address": "test@example.com",
            "type": "PRIMARY"
          }
        ],
        "name": "John Doe",
        "phoneNumbers": [
          {
            "number": "+1 206 555 0100",
            "type": "PRIMARY"
          }
        ],
        "ssn": "19670220-1234"
      },
      "providerName": "se-bank-oauth",
      "updated": 1455740124123
    }
  ]
}
```

### Response: [AccountVerification](#tag-accountverification)[](#data-v1/account-verification/get-account-verification-pdf-report/response-accountverification)

The Account Verification Report API is used to verify a user's bank account and provide" + " account details." + "This API is e.g. used in the [Account" + " Check](https://docs.tink.com/resources/account-check) flow, as a way to retrieve" + " the account information." + "_Note:_ The report is a temporary resource that will be available for retrieval for" + " 1h after creation.

See [AccountVerification](#tag-accountverification) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | Successful operation. |
| 400 | Incorrect request parameters. |
| 404 | Could not find the report (e.g. expired). |

## Get Account Verification Report[](#data-v1/account-verification/get-account-verification-report)

`GET /api/v1/account-verification-reports/{id}`

Fetch report JSON data based on a report identifier.

### Works with[](#data-v1/account-verification/get-account-verification-report/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `account-verification-reports:read` |
| Client token | `account-verification-reports:read` |

### Parameters[](#data-v1/account-verification/get-account-verification-report/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The id of the report to retrieve. |

> Response Example

```
{
  "created": 1455740874875,
  "externalReference": "ext-abc-123",
  "id": "6e68cc6287704273984567b3300c5822",
  "userDataByProvider": [
    {
      "accounts": [
        {
          "accountIdentifiers": {
            "ach": {
              "accountNumber": "0123456789",
              "routingNumber": "021000021",
              "wireRoutingNumber": "021000021"
            },
            "bacs": {
              "accountNumber": 12345678,
              "sortCode": 601314
            },
            "iban": {
              "bban": 21000813610123457000,
              "bic": "DABASESX",
              "iban": "SE7921000813610123456789"
            },
            "rix": {
              "accountNumber": 8257466,
              "clearingNumber": 5839
            }
          },
          "accountNumber": "1234-123456789",
          "accountType": "SAVINGS",
          "commercialName": "Commercial name",
          "currencyCode": "EUR",
          "customerSegment": "PERSONAL",
          "holderName": "John Doe",
          "iban": "SE7921000813610123456789",
          "id": "a6bb87e57a8c4dd4874b241471a2b9e8",
          "name": "John's account",
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
      ],
      "financialInstitutionName": "Bank Name",
      "identity": {
        "addresses": [
          {
            "city": "London",
            "countryCode": "US",
            "postalCode": 11155,
            "street": 1600,
            "subdivision": "Ohio",
            "type": "PO_BOX"
          }
        ],
        "dateOfBirth": "1967-02-20",
        "emails": [
          {
            "address": "test@example.com",
            "type": "PRIMARY"
          }
        ],
        "name": "John Doe",
        "phoneNumbers": [
          {
            "number": "+1 206 555 0100",
            "type": "PRIMARY"
          }
        ],
        "ssn": "19670220-1234"
      },
      "providerName": "se-bank-oauth",
      "updated": 1455740124123
    }
  ]
}
```

### Response: [AccountVerification](#tag-accountverification)[](#data-v1/account-verification/get-account-verification-report/response-accountverification)

The Account Verification Report API is used to verify a user's bank account and provide" + " account details." + "This API is e.g. used in the [Account" + " Check](https://docs.tink.com/resources/account-check) flow, as a way to retrieve" + " the account information." + "_Note:_ The report is a temporary resource that will be available for retrieval for" + " 1h after creation.

See [AccountVerification](#tag-accountverification) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | Successful. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |
| 404 | Get Reports with requested ID was not found. |

## Business Account Verification[](#data-v1/business-account-verification)

## Get Business Account Verification Report[](#data-v1/business-account-verification/get-business-account-verification-report)

`GET /data/v1/business-account-verification-reports/{id}`

Returns a business account verification response

### Works with[](#data-v1/business-account-verification/get-business-account-verification-report/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `business-account-verification-reports:read` |
| Client token | `business-account-verification-reports:read` |

### Parameters[](#data-v1/business-account-verification/get-business-account-verification-report/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | Report id |

> Response Example

```
{
  "created": 1455740874875,
  "externalReference": "ext-abc-123",
  "id": "6e68cc6287704273984567b3300c5822",
  "userDataByProvider": [
    {
      "accounts": [
        {
          "accountIdentifiers": {
            "ach": {
              "accountNumber": "0123456789",
              "routingNumber": "021000021",
              "wireRoutingNumber": "021000021"
            },
            "bacs": {
              "accountNumber": 12345678,
              "sortCode": 601314
            },
            "iban": {
              "bban": 21000813610123457000,
              "bic": "DABASESX",
              "iban": "SE7921000813610123456789"
            },
            "rix": {
              "accountNumber": 8257466,
              "clearingNumber": 5839
            }
          },
          "accountNumber": "1234-123456789",
          "accountType": "SAVINGS",
          "commercialName": "Commercial name",
          "currencyCode": "EUR",
          "customerSegment": "PERSONAL",
          "holderName": "John Doe",
          "iban": "SE7921000813610123456789",
          "id": "a6bb87e57a8c4dd4874b241471a2b9e8",
          "name": "John's account",
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
      ],
      "financialInstitutionName": "Bank Name",
      "identity": {
        "addresses": [
          {
            "city": "London",
            "countryCode": "US",
            "postalCode": 11155,
            "street": 1600,
            "subdivision": "Ohio",
            "type": "PO_BOX"
          }
        ],
        "dateOfBirth": "1967-02-20",
        "emails": [
          {
            "address": "test@example.com",
            "type": "PRIMARY"
          }
        ],
        "name": "John Doe",
        "phoneNumbers": [
          {
            "number": "+1 206 555 0100",
            "type": "PRIMARY"
          }
        ],
        "ssn": "19670220-1234"
      },
      "providerName": "se-bank-oauth",
      "updated": 1455740124123
    }
  ]
}
```

### Response: BusinessAccountCheckReportDto[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto)

created `integer` required

The UNIX epoch timestamp represents the creation date and time of the report.

externalReference `string`

An external reference identifier given by the client in the Account Check Tink Link session or Tink Link query.

id `string` required

Tink unique identifier for the account report. Generated at the moment of report creation.

userDataByProvider `array[ProviderUserData]` required

The user data available by provider.

#### ProviderUserData[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto/provideruserdata)

accounts `array[AccountSummary]` required

Information pertaining to the accounts of the user.

financialInstitutionName `string` required

The name of the financial institution.

identity `IdentitySummary` required

Identity information of the user authenticating.

providerName `string` required

The Tink name representing the financial institution

updated `integer` required

The timestamp of when the report data was collected.

#### AccountSummary[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto/accountsummary)

accountIdentifiers `AccountIdentifiers` required

Account identifiers used for transfers to and from the account.  
Account Identifiers are complementary identifiers of the account. Presence of identifiers varies with market local conventions, account types, financial institutions and availability.

accountNumber `string` required

The number that the user would typically recognize as their account number, for example when selecting their account in a list.For card-based accounts where the card number is also the unique account identifier, this field contains the masked PAN.For US accounts, this field would typically contain the last 4 digits of the full account number.

accountType `string` required

Specifies the type of account.  
Note: Since new types can be added as the product evolves, make sure your implementation is resiliently handling any unrecognized value returned in the API response.  
Account types:  
\* `CHECKING`: A Checking account.  
\* `SAVINGS`: A Savings account.  
\* `CREDIT_CARD`: A Credit Card account.  
Note: credit card accounts are only enabled if credit\_cards are added as refreshable item, i.e. for Account Check and Transactions bundle flows.  
Values: `CHECKING, SAVINGS, CREDIT_CARD`

commercialName `string`

The commercial name of the account set by the financial institution.

currencyCode `string` required

ISO 4217 currency code.

customerSegment `string`

Indicates whether the account belongs to a financial product offered to individuals or business customers.  
Values: `BUSINESS, PERSONAL, UNKNOWN`

holderName `string`

(DEPRECATED) Removed after 2025-11-14. For full information about all holders of the account see parties

iban `string`

(DEPRECATED): Removed after 2025-11-14. For IBAN see iban field in accountIdentifiers

id `string` required

The internal identifier of account.

name `string` required

Name of the account assigned by the account holder or by the financial institution.  
This field is typically what the user recognises in their online banking app.

parties `array[Party]` required

All persons and legal entities associated with the account as well as their relation to it.  
An empty list will be returned when no parties are available for the account.

#### AccountIdentifiers[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto/accountidentifiers)

ach `AchAccountIdentifier`

Account identifier used to make ACH transfers to and from the account.

bacs `BacsAccountIdentifier`

Account identifier specific to BACS payment scheme.

iban `IbanAccountIdentifier`

Account IBAN identifiers.

rix `RixAccountIdentifier`

Account identifier specific to Rix payment system.

#### AchAccountIdentifier[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto/achaccountidentifier)

accountNumber `string` required

The ACH account number.

routingNumber `string` required

The financial institution routing number for the account.

wireRoutingNumber `string`

The financial institution wire routing number for the account, if available.

#### BacsAccountIdentifier[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto/bacsaccountidentifier)

accountNumber `string` required

The BACS account number.

sortCode `string` required

The sort code of the account.

#### IbanAccountIdentifier[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto/ibanaccountidentifier)

bban `string` required

BBAN represents a country-specific bank account number.

bic `string`

BIC bank number. This can be inferred from the IBAN, but some banks might require it for adding a beneficiary or will display it for existing accounts owned by the user.

iban `string` required

IBAN represents an international bank account number.

#### RixAccountIdentifier[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto/rixaccountidentifier)

accountNumber `string` required

The account number of the account.

clearingNumber `string` required

The clearing number of the account.

#### Party[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto/party)

identity `Identity` required

Information pertaining to the identity of the party.

role `string` required

The role of the party. Roles are defined as:  
`HOLDER`: A party that is legally responsible for the money of the account.  
`AUTHORIZED_USER`: A party that can operate the account, but it’s not legally the owner or responsible of the money of the account.  
`OTHER`: A party linked to the account that have a role that does not match any of the other documented roles, i.e a party with a role that is not an authorized user or a holder.  
`UNKNOWN`: Tink can not determine anything about the role. except that the party is associated with the specified account.  
Values: `HOLDER, AUTHORIZED_USER, OTHER, UNKNOWN`

#### Identity[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto/identity)

name `string`

Name of the party.

ssn `string`

Social security number or national identification number of the user.

#### IdentitySummary[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto/identitysummary)

addresses `array[AVRAddress]`

Addresses of the user.

dateOfBirth `string`

Date of birth of the user, ISO 8601 date format (YYYY-MM-DD).

emails `array[AVREmail]`

Email addresses of the user.

name `string`

Full name of the user.

phoneNumbers `array[AVRPhoneNumber]`

Phone numbers of the user.

ssn `string`

Social security number or national identification number of the user.

#### AVRAddress[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto/avraddress)

city `string` required

The city.

countryCode `string`

ISO 3166-2 country code.

postalCode `string` required

The postal code.

street `string` required

The street address.

subdivision `string`

The subdivision. In the U.S. this would be the state.

type `string` required

The address type. Possible values:" + "BUSINESS: The address is the physical location of a business." + "CORRESPONDENCE: The address where correspondence is sent." + "DELIVERY\_TO: The address to which delivery is to take place." + "MAIL\_TO: The address to which mail is sent." + "PO\_BOX: The address is a postal office (PO) box." + "POSTAL: The address is the complete postal addressDao." + "RESIDENTIAL: The address is the home addressDao." + "STATEMENT: The address where statements are sent." + "UNKNOWN: No information about address type was provided by the financial" + " institution.  
Values: `BUSINESS,CORRESPONDENCE,DELIVERY_TO,MAIL_TO,PO_BOX,POSTAL,RESIDENTIAL,STATEMENT,UNKNOWN`

#### AVREmail[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto/avremail)

address `string` required

The email address.

type `string` required

The email type.  
Values: `PRIMARY, SECONDARY, OTHER, UNKNOWN`

#### AVRPhoneNumber[](#data-v1/business-account-verification/get-business-account-verification-report/response-businessaccountcheckreportdto/avrphonenumber)

number `string` required

The phone number.

type `string` required

The phone type.  
Values: `HOME, WORK, MOBILE, OTHER, UNKNOWN`

| Status Code | Description |
| --- | --- |
| 200 | Successful. |
| 400 | Incorrect request parameters or user data missing. |
| 404 | Could not find the report. Possible reasons, report was not successfully created, report has expired |

## Identity[](#data-v1/identity)

The identity model represents personal information of a user which can be used to identify the person. To get as much identity data as possible the information is collected per provider.

### The Identity model[](#data-v1/identity/the-identity-model)

dateOfBirth `string`

Date of birth of the user. The date will follow ISO 8601 with format yyyy-MM-dd.

name `string`

Full name of the user

providerName `string`

The provider from where the data was collected.

ssn `string`

Social security number of the user.

## List identity data[](#data-v1/identity/list-identity-data)

`GET /api/v1/identities`

Lists the available identity data from each provider for a user.

### Works with[](#data-v1/identity/list-identity-data/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `identity:read` |

> Response Example

```
{
  "identities": [
    {
      "dateOfBirth": "1967-02-20",
      "financialInstitutionId": "6e68cc6287704273984567b3300c5822",
      "name": "John Doe",
      "providerName": "se-bank-oauth",
      "ssn": "19670220-1234"
    }
  ]
}
```

### Response: ListIdentitiesResponse[](#data-v1/identity/list-identity-data/response-listidentitiesresponse)

identities `array[Identity]`

#### Identity[](#data-v1/identity/list-identity-data/response-listidentitiesresponse/identity)

dateOfBirth `string`

Date of birth of the user, ISO 8601 date format (YYYY-MM-DD).

financialInstitutionId `string`

A unique identifier to group providers belonging the same financial institution.

name `string`

Full name of the user.

providerName `string` required

The provider from where the data was collected.

ssn `string`

Social security number or national identification number of the user.

| Status Code | Description |
| --- | --- |
| 200 | Successful. |
| 400 | Invalid request. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |

## Investment[](#data-v1/investment)

Investments represent a user's financial engagement with products such as stocks or funds. They are structured as investment portfolios containing financial instruments, where a user can have multiple different types of portfolios with multiple different types of instruments.

### The Investment model[](#data-v1/investment/the-investment-model)

portfolios `array[Portfolio]`

A list of the user's portfolios.

#### Portfolio[](#data-v1/investment/the-investment-model/portfolio)

accountId `string`

The internal identifier of the account which has the portfolio.

cashValue `number`

The funds, on this portfolio, available for purchasing instruments, or to be transferred away.

id `string`

The internal identifier of the portfolio.

instruments `array[Instrument]`

The instruments which this portfolio holds.

totalProfit `number`

The total profit of the entire portfolio. This includes both historical (real) profit, and current (potential) profit.

totalValue `number`

The total current value of the entire portfolio and all its underlying instruments.

type `string`

The type of the portfolio.  
Values: `ISK`, `KF`, `DEPOT`, `PENSION`, `OTHER`

userId `string`

The internal identifier of the user which owns the portfolio.

#### Instrument[](#data-v1/investment/the-investment-model/instrument)

averageAcquisitionPrice `number`

An instrument can be traded multiple times and this is the average acquisition price calculated over all trades.

currency `string`

The currency that the instrument is traded in.

id `string`

The internal identifier of the instrument.

isin `string`

An International Securities Identification Number (ISIN) uniquely identifies a security.

marketPlace `string`

The market where the instrument is traded.

marketValue `number`

The current market value of the whole instrument. That is, not for a single share but for the entire instrument.

name `string`

The name of the instrument, which can be different on different markets.

portfolioId `string`

The internal identifier of the portfolio which the instrument belongs to.

price `number`

The current market price for one share of the instrument.

profit `number`

The total profit for this instrument over all trades.

quantity `number`

The number of underlying shares that the user owns of this instrument.

ticker `string`

A ticker symbol is an abbreviation used to uniquely identify a stock on a particular stock market.

type `string`

The instrument type.  
Values: `FUND`, `STOCK`, `OTHER`

userId `string`

The internal identifier of the user which owns the instrument.

## List investmentsDeprecated[](#data-v1/investment/list-investments)

`GET /api/v1/investments`

Returns an object with a list of the authenticated user's portfolios and corresponding financial instruments.

### Works with[](#data-v1/investment/list-investments/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `investments:read` |

### Query Parameters[](#data-v1/investment/list-investments/query-parameters)

| Parameter | Description |
| --- | --- |
| portfolioType | The portfolio types to select from aggregated investment data. Multiple types are allowed and are passed as: portfolioType=type1&portfolioType=type2. If omitted, everything is selected.  
Values: `ISK`, `KF`, `DEPOT`, `PENSION`, `OTHER` |

> Response Example

```
{
  "portfolios": [
    {
      "accountId": "1d764c9f9141434aa23485c03561428d",
      "cashValue": 123.5,
      "id": "4c72494cc67f472f9f0ec2072600fe93",
      "instruments": [
        {
          "averageAcquisitionPrice": 53.41,
          "currency": "SEK",
          "id": "50c3e10233ed4048bd48f3a55b5d062a",
          "isin": "US0378331005",
          "marketPlace": "NASDAQ",
          "marketValue": 22917.0,
          "name": "Apple Inc.",
          "portfolioId": "01f21bc10f2b46abb9b25fccd3dc64eb",
          "price": 76.39,
          "profit": 6894.0,
          "quantity": 300.0,
          "ticker": "AAPL",
          "type": "STOCK",
          "userId": "a52e9890520d4ec38cc0d4526a4cdcbe"
        }
      ],
      "totalProfit": 48673.11,
      "totalValue": 231924.16,
      "type": "DEPOT",
      "userId": "a52e9890520d4ec38cc0d4526a4cdcbe"
    }
  ]
}
```

### Response: [Investment](#tag-investment)[](#data-v1/investment/list-investments/response-investment)

Investments represent a user's financial engagement with products such as stocks or funds. They are structured as investment portfolios containing financial instruments, where a user can have multiple different types of portfolios with multiple different types of instruments.

See [Investment](#tag-investment) for parameter descriptions.

## Loan[](#data-v1/loan)

Loans represent a user's loan towards a financial institution, such as a mortgage or a student loan. Technically, they can be seen as accounts, but also contain additional details such as interest rate, amortization, loan securities and applicants.

### The Loan model[](#data-v1/loan/the-loan-model)

accountId `string`

The internal identifier of the account which has the portfolio.

amortized `number`

Amount amortized to date.

balance `number`

The current loan account balance.

id `string`

The internal identifier of the loan.

initialBalance `number`

The initial loan account balance.

initialDate `Date`

Loan issue date.

interest `number`

Interest rate.

loanDetails `LoanDetails`

loanNumber `string`

The provider's internal identifier for the loan.

monthlyAmortization `number`

Fixed monthly amortization amount.

name `string`

Descriptive label for the loan.

nextDayOfTermsChange `Date`

Reset date for the interest rate fixation period.

numMonthsBound `integer`

Length of the interest rate fixation period expressed in number of months.

providerName `string`

Identifier for the loan provider.

type `string`

The type of loan.  
Values: `MORTGAGE`, `BLANCO`, `MEMBERSHIP`, `VEHICLE`, `LAND`, `STUDENT`, `CREDIT`, `OTHER`

updated `Date`

Loan details last updated timestamp.

userId `string`

The internal identifier of the user which owns the portfolio.

#### LoanDetails[](#data-v1/loan/the-loan-model/loandetails)

accountId `string`

applicants `array[string]`

coApplicant `boolean`

loanSecurity `string`

## Get loansDeprecated[](#data-v1/loan/get-loans)

`GET /api/v1/loans`

Get all the loans for a user.

### Works with[](#data-v1/loan/get-loans/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `accounts:read` |

> Response Example

```
{
  "loans": [
    {
      "accountId": "a7b67265-8030-4d65-aa42-a8f4bd287a72",
      "amortized": 1000.0,
      "balance": -9000.0,
      "id": "65bc7a41-a66e-4ad1-aad1-99bbfb3c5098",
      "initialBalance": -10000.0,
      "initialDate": 1455740874875,
      "interest": 0.025,
      "loanDetails": {
        "accountId": "string",
        "applicants": [
          "string",
          "string"
        ],
        "coApplicant": false,
        "loanSecurity": "string"
      },
      "loanNumber": "01-123456-234567",
      "monthlyAmortization": 100.0,
      "name": "Car Loan",
      "nextDayOfTermsChange": 1455740874875,
      "numMonthsBound": 36,
      "providerName": "handelsbanken-bankid",
      "type": "MORTGAGE",
      "updated": 1553169600000,
      "userId": "53559ef7-4508-4048-b322-2b175cdaab23"
    }
  ],
  "totalLoanAmount": 0,
  "weightedAverageInterestRate": 0
}
```

### Response: LoanResponse[](#data-v1/loan/get-loans/response-loanresponse)

loans `array[[Loan](#tag-loan)]`

totalLoanAmount `number`

weightedAverageInterestRate `number`

## Search[](#data-v1/search)

## Query transactions[](#data-v1/search/query-transactions)

`POST /api/v1/search`

Queries transactions based on multiple parameters and returns a response containing transactions and their corresponding statistics matching the query. The query contains both fixed parameters and parameters parsed from the free text `queryString`. All the commands below are typically applied per word in the query and if multiple commands are found, they are concatenated with an `AND` operation (`OR` does not exist).

### Query string commands[](#data-v1/search/query-transactions/query-string-commands)

| Type | Description | Keywords |
| --- | --- | --- |
| Tags | Searches specifically for transactions with tags. | Words starting with '#'. |
| Amount Span | Searches for transactions within the given amount span. Keywords here depend on the locality of the user. | `over`, `under`, `more than`, `less than`, `around` |
| Date/Time Span | Searches for transactions within the given date/time span. Keywords here depend on the locality of the user. | `weekdays`, `weekends`, `today`, `yesterday`, `this week/month/year`, `last week/month/year`, `week #`. |
| Category | Searches specifically for transactions with the specified category. Keywords here depend on the locality of the user. | `Restaurant`, `Bar` |

### Works with[](#data-v1/search/query-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `transactions:read` |

> Request Example

```
{
  "accounts": [
    "87fa44ec11c4426e889a963add92b69e"
  ],
  "categories": [
    "953c4eda24554a61a9653a479e70fc96"
  ],
  "endDate": 1455740874875,
  "externalIds": [
    "953c4eda24554a61a9653a479e70fc96"
  ],
  "includeUpcoming": false,
  "limit": 20,
  "maxAmount": 68.42,
  "minAmount": -50.49,
  "offset": 20,
  "order": "ASC",
  "queryString": "Food this week",
  "sort": "DATE",
  "startDate": 1455740874875
}
```

### Request Body: SearchQuery[](#data-v1/search/query-transactions/request-body-searchquery)

The search query.

accounts `array[string]`

A list of account IDs to filter by.

categories `array[string]`

A list of category IDs to filter by. Could either be leaf node categories, such as the category ID corresponding to `expenses:food.restaurants`, or groups of categories, such as the category ID corresponding to `expenses:food`.

endDate `Date`

The end date of the result.

externalIds `array[string]`

A list of external IDs to filter by.

includeUpcoming `boolean`

Indicates if result should include upcoming transactions.

limit `integer`

The limit for the result, used for paging. Defaults to 50 if not set or set to 0.

maxAmount `number`

Maximum amount to filter the results. Negative values can be set for expenses.

minAmount `number`

Minimum amount to filter the results. Negative values can be set for expenses.

offset `integer`

The offset for the result, used for paging.

order `string`

The order of the result.  
Values: `ASC`, `DESC`

queryString `string`

The string query.

sort `string`

The sort order of the result.  
Values: `SCORE`, `DATE`, `ACCOUNT`, `DESCRIPTION`, `AMOUNT`, `CATEGORY`

startDate `Date`

The start date of the result.

> Response Example

```
{
  "count": 110,
  "metrics": {
    "AVG": 15.0,
    "CATEGORIES": {
      "0e1bade6a7e3459eb794f27b7ba4cea0": 1.0
    },
    "COUNT": 110,
    "NET": 1288.45,
    "SUM": 1650.0
  },
  "net": 1288.45,
  "periodAmounts": [
    {
      "key": "string",
      "value": 0
    }
  ],
  "query": {
    "accounts": [
      "87fa44ec11c4426e889a963add92b69e"
    ],
    "categories": [
      "953c4eda24554a61a9653a479e70fc96"
    ],
    "endDate": 1455740874875,
    "externalIds": [
      "953c4eda24554a61a9653a479e70fc96"
    ],
    "includeUpcoming": false,
    "limit": 20,
    "maxAmount": 68.42,
    "minAmount": -50.49,
    "offset": 20,
    "order": "ASC",
    "queryString": "Food this week",
    "sort": "DATE",
    "startDate": 1455740874875
  },
  "results": [
    {
      "transaction": {
        "accountId": "3fe2d96efacd4dc5994404a950f238a9",
        "amount": 34.5,
        "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
        "categoryType": "EXPENSES",
        "currencyDenominatedAmount": {
          "currencyCode": "EUR",
          "scale": 2,
          "unscaledValue": 1050
        },
        "currencyDenominatedOriginalAmount": {
          "currencyCode": "EUR",
          "scale": 2,
          "unscaledValue": 1050
        },
        "date": 1455740874875,
        "description": "Stadium Sergelg Stockholm",
        "dispensableAmount": 0,
        "id": "79c6c9c27d6e42489e888e08d27205a1",
        "identifiers": {
          "providerExternalId": "string"
        },
        "lastModified": 1455740874875,
        "notes": "Delicious #cake #wedding",
        "originalAmount": 34.5,
        "originalDate": 1455740874875,
        "originalDescription": "Stadium Sergelg Stockholm",
        "partnerPayload": {},
        "parts": [
          {
            "amount": 34.5,
            "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
            "counterpartDescription": "Stadium Sergelg Stockholm",
            "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
            "counterpartTransactionAmount": 10.0,
            "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
            "date": 1455740874875,
            "id": "7303ff128531463bbed358bbf9e23f31",
            "lastModified": 1455740874875
          }
        ],
        "payload": {},
        "pending": false,
        "timestamp": 1464543093494,
        "type": "CREDIT_CARD",
        "upcoming": false,
        "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
        "userModified": false
      },
      "type": "TRANSACTION"
    }
  ]
}
```

### Response: SearchResponse[](#data-v1/search/query-transactions/response-searchresponse)

count `integer` required

The total number of transactions hits.

metrics `SearchResponseMetrics` required

The metric object contains fields representing different metrics.

net `number` required

The net amount of all transaction hits. Will only include the amounts from transactions which has the same currency as the user to who they belong.

periodAmounts `array[StringDoublePair]` required

Key-value object where the key is a period (`YYYY-MM`) and the value is the net amount of the transactions found within the specified date range (if any) of the search query.

query `SearchQuery` required

The query executed.

results `array[SearchResult]` required

The search result.

#### SearchResponseMetrics[](#data-v1/search/query-transactions/response-searchresponse/searchresponsemetrics)

AVG `number` required

A number with the arithmetic mean amount of all transaction hits (income and expense). Example: A sum of 51 from 2 transaction hits will produce an average of 25.5.

CATEGORIES `object` required

Key-value pairs of category id's and the proportion of the sum of all transaction hits they represent (income and expense). Example: Given a transaction with category "A" and amount -42 and a transaction with category "B" and amount 9 the result is {"A": 0.8235, "B": 0.1765}.

COUNT `integer` required

A number representing the total number of transaction hits.

NET `number` required

A number with the net amount of all transaction hits (income and expense). Example: A transaction with amount -42 and another with amount 9 will produce a net of -33.

SUM `number` required

A number with the sum of all transaction hits (income and expense). Example: A transaction with amount -42 and another with amount 9 will produce a sum of 51.

#### StringDoublePair[](#data-v1/search/query-transactions/response-searchresponse/stringdoublepair)

key `string`

value `number`

#### SearchQuery[](#data-v1/search/query-transactions/response-searchresponse/searchquery)

accounts `array[string]`

A list of account IDs to filter by.

categories `array[string]`

A list of category IDs to filter by. Could either be leaf node categories, such as the category ID corresponding to `expenses:food.restaurants`, or groups of categories, such as the category ID corresponding to `expenses:food`.

endDate `Date`

The end date of the result.

externalIds `array[string]`

A list of external IDs to filter by.

includeUpcoming `boolean`

Indicates if result should include upcoming transactions.

limit `integer`

The limit for the result, used for paging. Defaults to 50 if not set or set to 0.

maxAmount `number`

Maximum amount to filter the results. Negative values can be set for expenses.

minAmount `number`

Minimum amount to filter the results. Negative values can be set for expenses.

offset `integer`

The offset for the result, used for paging.

order `string`

The order of the result.  
Values: `ASC`, `DESC`

queryString `string`

The string query.

sort `string`

The sort order of the result.  
Values: `SCORE`, `DATE`, `ACCOUNT`, `DESCRIPTION`, `AMOUNT`, `CATEGORY`

startDate `Date`

The start date of the result.

#### SearchResult[](#data-v1/search/query-transactions/response-searchresponse/searchresult)

transaction `TransactionResponse`

The transactions resulting from the query.

type `string` required

(DEPRECATED) The search type. Will always be set to TRANSACTION.  
Values: `TRANSACTION`

#### TransactionResponse[](#data-v1/search/query-transactions/response-searchresponse/transactionresponse)

accountId `string` required

The internal identifier of the account that the transaction belongs to.

amount `number` required

The amount of the transaction. This can be modified by the user.

categoryId `string`

(Optional) The category of the transaction. This can be modified by the user.

categoryType `string`

(Optional) The category type of the transaction.  
Values: `INCOME`, `EXPENSES`, `TRANSFERS`

currencyDenominatedAmount `CurrencyDenominatedAmount`

The amount of the transaction represented as a scale and unscaled value together with the ISO 4217 currency code of the amount. The amount can be modified by the user but not the currency code.

currencyDenominatedOriginalAmount `CurrencyDenominatedAmount`

The original amount that was received from the provider, before the user changed it. The amount is represented as a scale and unscaled value together with the ISO 4217 currency code of the amount.

date `Date` required

The date the transaction was executed. This can be modified by the user.

description `string` required

The description of the transaction. This can be modified by the user.

dispensableAmount `number`

(DEPRECATED) The dispensable amount of the transaction.

id `string` required

The internal identifier of the transaction.

identifiers `Identifiers`

Identifiers coming from the provider

lastModified `Date` required

The date the transaction was last modified by the user.

notes `string` required

A free-text field modifiable by the user. Any 'word' (whitespace separated), prefixed with a #, is considered a tag. These tags become searchable.

originalAmount `number` required

The original amount that was received from the provider, before the user changed it.

originalDate `Date` required

The original date that was received from the provider, before the user changed it.

originalDescription `string` required

The original description that was received from the provider, before the user changed it.

partnerPayload `object`

The payload that was previously ingested on the Connector API.

parts `array[TransactionPart]`

(DEPRECATED) Available transaction parts. Populated when transaction is divided into more than one part.

payload `object`

Meta data about the transaction, in key value format with Strings.

pending `boolean` required

Indicates if this transaction has been settled or is still pending.

timestamp `integer` required

The timestamp of when the transaction was first saved to database.

type `string` required

The type of the transaction.  
Values: `DEFAULT`, `CREDIT_CARD`, `TRANSFER`, `PAYMENT`, `WITHDRAWAL`

upcoming `boolean`

Indicates if this is an upcoming transaction not booked yet.

userId `string` required

The internal identifier of the user that the transaction belongs to.

userModified `boolean`

#### CurrencyDenominatedAmount[](#data-v1/search/query-transactions/response-searchresponse/currencydenominatedamount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### Identifiers[](#data-v1/search/query-transactions/response-searchresponse/identifiers)

providerExternalId `string`

External identifier given by the provider

#### TransactionPart[](#data-v1/search/query-transactions/response-searchresponse/transactionpart)

amount `number` required

The amount of the transaction part.

categoryId `string` required

The category of the transaction part.

counterpartDescription `string` required

The description of the transaction containing the counterpart.

counterpartId `string` required

The id of the counterpart. The counterpart is a transaction part in another transaction

counterpartTransactionAmount `number` required

The amount of the transaction containing the counterpart.

counterpartTransactionId `string` required

The ID of the transaction containing the counterpart.

date `Date` required

The date the transaction part was created.

id `string` required

The ID of the transaction part.

lastModified `Date` required

The date the transaction part was last modified.

| Status Code | Description |
| --- | --- |
| 200 | Successful operation. |
| 400 | The payload does not pass validation. |

## Transaction[](#data-v1/transaction)

An account usually contains multiple transactions (except for certain types of accounts where Tink can't access the underlying transactions, for example, certain `INVESTMENT` accounts). The transaction model represents any operation on an account, and could represent both the actual credit-card purchase on a `CREDIT_CARD` account, but also represent the transaction when you paid your credit-card bill. Most commonly, the transactions in an account should represent what the end-user typically regards as a transaction with its amount, description and date, etc.

### The Transaction model[](#data-v1/transaction/the-transaction-model)

accountId `string` required

The internal identifier of the account that the transaction belongs to.

amount `number` required

The amount of the transaction. This can be modified by the user.

categoryId `string` required

The category of the transaction. This can be modified by the user.

categoryType `string` required

The category type of the transaction.  
Values: `INCOME`, `EXPENSES`, `TRANSFERS`

credentialsId `string` required

(DEPRECATED) The internal identifier of the credentials that the transaction belongs to. This is deprecated and will soon be removed. This information can instead be accessed through the account. Account can be located with the transactions accountId.

currencyDenominatedAmount `CurrencyDenominatedAmount`

The amount of the transaction represented as a scale and unscaled value together with the ISO 4217 currency code of the amount. The amount can be modified by the user but not the currency code.

currencyDenominatedOriginalAmount `CurrencyDenominatedAmount`

The original amount that was received from the provider, before the user changed it. The amount is represented as a scale and unscaled value together with the ISO 4217 currency code of the amount.

date `Date` required

The date the transaction was executed. This can be modified by the user.

description `string` required

The description of the transaction. This can be modified by the user.

dispensableAmount `number`

(DEPRECATED) The dispensable amount of the transaction.

formattedDescription `string`

(DEPRECATED) Formatted version of the original description.

id `string` required

The internal identifier of the transaction.

identifiers `TransactionIdentifiers`

Identifiers coming from the provider

inserted `integer`

(DEPRECATED) The timestamp representing when Tink stored the transaction.

lastModified `Date` required

The date the transaction was last modified by the user.

notes `string` required

A free-text field modifiable by the user. Any 'word' (whitespace separated), prefixed with a #, is considered a tag. These tags become searchable.

originalAmount `number` required

The original amount that was received from the provider, before the user changed it.

originalDate `Date` required

The original date that was received from the provider, before the user changed it. The date cannot be older than 10 years.

originalDescription `string` required

The original description that was received from the provider, before the user changed it.

partnerPayload `object`

The payload that was previously ingested on the Connector API.

parts `array[TransactionPart]`

(DEPRECATED) Available transaction parts. Populated when transaction is divided into more than one part.

payload `object`

Arbitrary metadata in key value format with strings, provided by the financial institution in question. It can be used either for deep-linking back to the financial institution's app, for displaying additional information about the transaction, or for backend purposes such as automatic categorization improvement. It can also include metadata generated by Tink, for example transfer transactions that are automatically flagged as transfers based on the identification of the corresponding transaction on the other account and which includes the primary identifier of the peer transaction for easy access. Max total size of payload data is 10M chars.

pending `boolean` required

Indicates if this transaction has been settled or is still pending.

timestamp `integer` required

The timestamp of when the transaction was first saved to database.

type `string` required

The type of the transaction.  
Values: `DEFAULT`, `CREDIT_CARD`, `TRANSFER`, `PAYMENT`, `WITHDRAWAL`

upcoming `boolean`

Indicates if this is an upcoming transaction not booked yet.

userId `string` required

The internal identifier of the user that the transaction belongs to.

userModified `boolean`

#### CurrencyDenominatedAmount[](#data-v1/transaction/the-transaction-model/currencydenominatedamount)

currencyCode `string` required

The ISO 4217 currency code of the amount

scale `integer` required

The scale of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

unscaledValue `integer` required

The unscaled value of the amount.  
The `unscaledValue` is used with `scale` to accurately represent floating point values.  
The formula is `unscaledValue * (10^-scale)`. For example, if scale is 1 and unscaledValue is 1230, the end result would be 123.0.

#### TransactionIdentifiers[](#data-v1/transaction/the-transaction-model/transactionidentifiers)

providerExternalId `string`

External identifier given by the provider

#### TransactionPart[](#data-v1/transaction/the-transaction-model/transactionpart)

amount `number` required

The amount of the transaction part.

categoryId `string` required

The category of the transaction part.

counterpartDescription `string` required

The description of the transaction containing the counterpart.

counterpartId `string` required

The id of the counterpart. The counterpart is a transaction part in another transaction

counterpartTransactionAmount `number` required

The amount of the transaction containing the counterpart.

counterpartTransactionId `string` required

The ID of the transaction containing the counterpart.

date `Date` required

The date the transaction part was created.

id `string` required

The ID of the transaction part.

lastModified `Date` required

The date the transaction part was last modified.

## Change category of transactions[](#data-v1/transaction/change-category-of-transactions)

`PUT /api/v1/transactions/categorize-multiple`

Changes category of the supplied list of transactions to the supplied category

### Works with[](#data-v1/transaction/change-category-of-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `transactions:categorize` |

> Request Example

```
{
  "categorizationList": [
    {
      "categoryId": "2d3bd65493b549e1927d97a2d0683ab9",
      "transactionIds": [
        "92e9e178cc22437281084c572ada8d7d",
        "a40db0b79bf94d2a9340cbc35d8b8020"
      ]
    }
  ]
}
```

### Request Body: CategorizeTransactionsListRequest[](#data-v1/transaction/change-category-of-transactions/request-body-categorizetransactionslistrequest)

Object holding a list of new categories and the transactions to be categorized.

categorizationList `array[CategorizeTransactionsRequest]` required

A list of new categories and the transactions' IDs

#### CategorizeTransactionsRequest[](#data-v1/transaction/change-category-of-transactions/request-body-categorizetransactionslistrequest/categorizetransactionsrequest)

categoryId `string` required

The internal identifier of the category that the list of transactions is categorized to.

transactionIds `array[string]` required

A list of internal identifiers of the transactions categorized.

| Status Code | Description |
| --- | --- |
| 204 | Successful operation. |
| 400 | The payload does not pass validation. |

## Delete transaction partDeprecated[](#data-v1/transaction/delete-transaction-part)

`DELETE /api/v1/transactions/{id}/part/{partId}`

(DEPRECATED) If the part is linked to another transaction, the bilateral link is removed as well (i.e. the counterpart will be removed too, if found).

### Parameters[](#data-v1/transaction/delete-transaction-part/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The ID of the transaction to which the part belongs to. |
| partIdrequired | The part ID to delete. |

> Response Example

```
{
  "counterpartTransaction": {
    "accountId": "3fe2d96efacd4dc5994404a950f238a9",
    "amount": 34.5,
    "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
    "categoryType": "EXPENSES",
    "credentialsId": "65bc7a41a66e4ad1aad199bbfb3c5098",
    "currencyDenominatedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "currencyDenominatedOriginalAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "date": 1455740874875,
    "description": "Stadium Sergelg Stockholm",
    "dispensableAmount": 0,
    "formattedDescription": "Stadium Sergelgatan Stockholm",
    "id": "79c6c9c27d6e42489e888e08d27205a1",
    "identifiers": {
      "providerExternalId": "600aca79-23f2-4476-ac3a-5f1893b3b844"
    },
    "inserted": 1455740874875,
    "lastModified": 1455740874875,
    "notes": "Delicious #cake #wedding",
    "originalAmount": 34.5,
    "originalDate": 1455740874875,
    "originalDescription": "Stadium Sergelg Stockholm",
    "partnerPayload": {},
    "parts": [
      {
        "amount": 34.5,
        "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
        "counterpartDescription": "Stadium Sergelg Stockholm",
        "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
        "counterpartTransactionAmount": 10.0,
        "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
        "date": 1455740874875,
        "id": "7303ff128531463bbed358bbf9e23f31",
        "lastModified": 1455740874875
      }
    ],
    "payload": {},
    "pending": false,
    "timestamp": 1464543093494,
    "type": "CREDIT_CARD",
    "upcoming": false,
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "userModified": false
  },
  "transaction": {
    "accountId": "3fe2d96efacd4dc5994404a950f238a9",
    "amount": 34.5,
    "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
    "categoryType": "EXPENSES",
    "credentialsId": "65bc7a41a66e4ad1aad199bbfb3c5098",
    "currencyDenominatedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "currencyDenominatedOriginalAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "date": 1455740874875,
    "description": "Stadium Sergelg Stockholm",
    "dispensableAmount": 0,
    "formattedDescription": "Stadium Sergelgatan Stockholm",
    "id": "79c6c9c27d6e42489e888e08d27205a1",
    "identifiers": {
      "providerExternalId": "600aca79-23f2-4476-ac3a-5f1893b3b844"
    },
    "inserted": 1455740874875,
    "lastModified": 1455740874875,
    "notes": "Delicious #cake #wedding",
    "originalAmount": 34.5,
    "originalDate": 1455740874875,
    "originalDescription": "Stadium Sergelg Stockholm",
    "partnerPayload": {},
    "parts": [
      {
        "amount": 34.5,
        "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
        "counterpartDescription": "Stadium Sergelg Stockholm",
        "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
        "counterpartTransactionAmount": 10.0,
        "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
        "date": 1455740874875,
        "id": "7303ff128531463bbed358bbf9e23f31",
        "lastModified": 1455740874875
      }
    ],
    "payload": {},
    "pending": false,
    "timestamp": 1464543093494,
    "type": "CREDIT_CARD",
    "upcoming": false,
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "userModified": false
  }
}
```

### Response: DeleteTransactionPartResponse[](#data-v1/transaction/delete-transaction-part/response-deletetransactionpartresponse)

counterpartTransaction `[Transaction](#tag-transaction)`

Counterpart transaction affected due to bilateral link being removed.

transaction `[Transaction](#tag-transaction)` required

The transaction to which the part belonged.

| Status Code | Description |
| --- | --- |
| 200 | The transaction part was successfully deleted and returned. |
| 400 | The transaction id was invalid. |
| 404 | The transaction or the transaction part was not found. |

## Get categorization clustersDeprecated[](#data-v1/transaction/get-categorization-clusters)

`GET /api/v1/transactions/suggest`

Returns an object holding clusters of transactions to be categorized and possible categorization level improvement

### Works with[](#data-v1/transaction/get-categorization-clusters/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `transactions:read` |

### Query Parameters[](#data-v1/transaction/get-categorization-clusters/query-parameters)

| Parameter | Description |
| --- | --- |
| numberOfClusters | Max number of clusters returned |
| evaluateEverything |  |

> Response Example

```
{
  "categorizationImprovement": 0.01,
  "categorizationLevel": 0.93,
  "clusters": [
    {
      "categorizationImprovement": 0.003,
      "description": "McDonalds Stock",
      "transactions": [
        {
          "accountId": "3fe2d96efacd4dc5994404a950f238a9",
          "amount": 34.5,
          "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
          "categoryType": "EXPENSES",
          "credentialsId": "65bc7a41a66e4ad1aad199bbfb3c5098",
          "currencyDenominatedAmount": {
            "currencyCode": "EUR",
            "scale": 2,
            "unscaledValue": 1050
          },
          "currencyDenominatedOriginalAmount": {
            "currencyCode": "EUR",
            "scale": 2,
            "unscaledValue": 1050
          },
          "date": 1455740874875,
          "description": "Stadium Sergelg Stockholm",
          "dispensableAmount": 0,
          "formattedDescription": "Stadium Sergelgatan Stockholm",
          "id": "79c6c9c27d6e42489e888e08d27205a1",
          "identifiers": {
            "providerExternalId": "600aca79-23f2-4476-ac3a-5f1893b3b844"
          },
          "inserted": 1455740874875,
          "lastModified": 1455740874875,
          "notes": "Delicious #cake #wedding",
          "originalAmount": 34.5,
          "originalDate": 1455740874875,
          "originalDescription": "Stadium Sergelg Stockholm",
          "partnerPayload": {},
          "parts": [
            {
              "amount": 34.5,
              "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
              "counterpartDescription": "Stadium Sergelg Stockholm",
              "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
              "counterpartTransactionAmount": 10.0,
              "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
              "date": 1455740874875,
              "id": "7303ff128531463bbed358bbf9e23f31",
              "lastModified": 1455740874875
            }
          ],
          "payload": {},
          "pending": false,
          "timestamp": 1464543093494,
          "type": "CREDIT_CARD",
          "upcoming": false,
          "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
          "userModified": false
        }
      ]
    }
  ]
}
```

### Response: SuggestTransactionsResponse[](#data-v1/transaction/get-categorization-clusters/response-suggesttransactionsresponse)

categorizationImprovement `number` required

The categorization improvement achieve if all clusters are categorized.

categorizationLevel `number` required

The current categorization level before categorization.

clusters `array[TransactionClusterView]` required

Clusters to categorize.

#### TransactionClusterView[](#data-v1/transaction/get-categorization-clusters/response-suggesttransactionsresponse/transactionclusterview)

categorizationImprovement `number`

The categorization improvement achived if cluster is categorized.

description `string`

A description of the cluster to categorized.

transactions `array[[Transaction](#tag-transaction)]`

List of transactions belonging to this cluster.

## Get counterpart suggestionsDeprecated[](#data-v1/transaction/get-counterpart-suggestions)

`GET /api/v1/transactions/{id}/link/suggest`

(DEPRECATED) Returns suggestions for potential counterpart expenses for a reimbursement.

### Parameters[](#data-v1/transaction/get-counterpart-suggestions/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The ID of the transaction to get suggestions for |

### Query Parameters[](#data-v1/transaction/get-counterpart-suggestions/query-parameters)

| Parameter | Description |
| --- | --- |
| limit | Max number of suggestions returned.  
Values: `Between 0 and 100.` |

> Response Example

```
{
  "limit": 0,
  "suggestedCounterpartTransactions": [
    {
      "accountId": "3fe2d96efacd4dc5994404a950f238a9",
      "amount": 34.5,
      "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
      "categoryType": "EXPENSES",
      "credentialsId": "65bc7a41a66e4ad1aad199bbfb3c5098",
      "currencyDenominatedAmount": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 1050
      },
      "currencyDenominatedOriginalAmount": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 1050
      },
      "date": 1455740874875,
      "description": "Stadium Sergelg Stockholm",
      "dispensableAmount": 0,
      "formattedDescription": "Stadium Sergelgatan Stockholm",
      "id": "79c6c9c27d6e42489e888e08d27205a1",
      "identifiers": {
        "providerExternalId": "600aca79-23f2-4476-ac3a-5f1893b3b844"
      },
      "inserted": 1455740874875,
      "lastModified": 1455740874875,
      "notes": "Delicious #cake #wedding",
      "originalAmount": 34.5,
      "originalDate": 1455740874875,
      "originalDescription": "Stadium Sergelg Stockholm",
      "partnerPayload": {},
      "parts": [
        {
          "amount": 34.5,
          "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
          "counterpartDescription": "Stadium Sergelg Stockholm",
          "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
          "counterpartTransactionAmount": 10.0,
          "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
          "date": 1455740874875,
          "id": "7303ff128531463bbed358bbf9e23f31",
          "lastModified": 1455740874875
        }
      ],
      "payload": {},
      "pending": false,
      "timestamp": 1464543093494,
      "type": "CREDIT_CARD",
      "upcoming": false,
      "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "userModified": false
    }
  ],
  "transactionId": "string"
}
```

### Response: TransactionLinkSuggestionResponse[](#data-v1/transaction/get-counterpart-suggestions/response-transactionlinksuggestionresponse)

limit `integer`

The maximum amount of suggestions requested to be returned.

suggestedCounterpartTransactions `array[[Transaction](#tag-transaction)]`

Suggested counterpart transactions.

transactionId `string`

The ID of the transaction to find suggestions for.

| Status Code | Description |
| --- | --- |
| 200 | The suggestions were successfully returned. |
| 400 | The transaction id or suggest limit was invalid. |
| 404 | The transaction was not found. |

## Get one transaction[](#data-v1/transaction/get-one-transaction)

`GET /api/v1/transactions/{id}`

Returns a transaction matching the requested id

### Works with[](#data-v1/transaction/get-one-transaction/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `transactions:read` |

### Parameters[](#data-v1/transaction/get-one-transaction/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The ID of the transaction |

> Response Example

```
{
  "accountId": "3fe2d96efacd4dc5994404a950f238a9",
  "amount": 34.5,
  "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
  "categoryType": "EXPENSES",
  "credentialsId": "65bc7a41a66e4ad1aad199bbfb3c5098",
  "currencyDenominatedAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "currencyDenominatedOriginalAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "date": 1455740874875,
  "description": "Stadium Sergelg Stockholm",
  "dispensableAmount": 0,
  "formattedDescription": "Stadium Sergelgatan Stockholm",
  "id": "79c6c9c27d6e42489e888e08d27205a1",
  "identifiers": {
    "providerExternalId": "600aca79-23f2-4476-ac3a-5f1893b3b844"
  },
  "inserted": 1455740874875,
  "lastModified": 1455740874875,
  "notes": "Delicious #cake #wedding",
  "originalAmount": 34.5,
  "originalDate": 1455740874875,
  "originalDescription": "Stadium Sergelg Stockholm",
  "partnerPayload": {},
  "parts": [
    {
      "amount": 34.5,
      "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
      "counterpartDescription": "Stadium Sergelg Stockholm",
      "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
      "counterpartTransactionAmount": 10.0,
      "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
      "date": 1455740874875,
      "id": "7303ff128531463bbed358bbf9e23f31",
      "lastModified": 1455740874875
    }
  ],
  "payload": {},
  "pending": false,
  "timestamp": 1464543093494,
  "type": "CREDIT_CARD",
  "upcoming": false,
  "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "userModified": false
}
```

### Response: [Transaction](#tag-transaction)[](#data-v1/transaction/get-one-transaction/response-transaction)

An account usually contains multiple transactions (except for certain types of accounts where Tink can't access the underlying transactions, for example, certain `INVESTMENT` accounts). The transaction model represents any operation on an account, and could represent both the actual credit-card purchase on a `CREDIT_CARD` account, but also represent the transaction when you paid your credit-card bill. Most commonly, the transactions in an account should represent what the end-user typically regards as a transaction with its amount, description and date, etc.

See [Transaction](#tag-transaction) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | Successful operation. |
| 404 | Transaction not found. |

## Get similar transactions[](#data-v1/transaction/get-similar-transactions)

`GET /api/v1/transactions/{id}/similar`

Returns an object holding a list of transactions similar to the supplied transaction based on description and a list of statistics summarizing these transactions

### Works with[](#data-v1/transaction/get-similar-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `transactions:read` |

### Parameters[](#data-v1/transaction/get-similar-transactions/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The ID of the transaction |

### Query Parameters[](#data-v1/transaction/get-similar-transactions/query-parameters)

| Parameter | Description |
| --- | --- |
| categoryId | Return similar of this category |
| includeSelf | Include the supplied transaction in response |

> Response Example

```
{
  "statistics": [
    {
      "description": "string",
      "payload": "string",
      "period": "string",
      "resolution": "DAILY",
      "type": "string",
      "userId": "string",
      "value": 0
    }
  ],
  "transactions": [
    {
      "accountId": "3fe2d96efacd4dc5994404a950f238a9",
      "amount": 34.5,
      "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
      "categoryType": "EXPENSES",
      "credentialsId": "65bc7a41a66e4ad1aad199bbfb3c5098",
      "currencyDenominatedAmount": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 1050
      },
      "currencyDenominatedOriginalAmount": {
        "currencyCode": "EUR",
        "scale": 2,
        "unscaledValue": 1050
      },
      "date": 1455740874875,
      "description": "Stadium Sergelg Stockholm",
      "dispensableAmount": 0,
      "formattedDescription": "Stadium Sergelgatan Stockholm",
      "id": "79c6c9c27d6e42489e888e08d27205a1",
      "identifiers": {
        "providerExternalId": "600aca79-23f2-4476-ac3a-5f1893b3b844"
      },
      "inserted": 1455740874875,
      "lastModified": 1455740874875,
      "notes": "Delicious #cake #wedding",
      "originalAmount": 34.5,
      "originalDate": 1455740874875,
      "originalDescription": "Stadium Sergelg Stockholm",
      "partnerPayload": {},
      "parts": [
        {
          "amount": 34.5,
          "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
          "counterpartDescription": "Stadium Sergelg Stockholm",
          "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
          "counterpartTransactionAmount": 10.0,
          "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
          "date": 1455740874875,
          "id": "7303ff128531463bbed358bbf9e23f31",
          "lastModified": 1455740874875
        }
      ],
      "payload": {},
      "pending": false,
      "timestamp": 1464543093494,
      "type": "CREDIT_CARD",
      "upcoming": false,
      "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
      "userModified": false
    }
  ]
}
```

### Response: SimilarTransactionsResponse[](#data-v1/transaction/get-similar-transactions/response-similartransactionsresponse)

statistics `array[Statistic]` required

Statistics of type 'income-and-expenses-and-transfers' for the similar transactions.

transactions `array[[Transaction](#tag-transaction)]` required

List of similar transactions.

#### Statistic[](#data-v1/transaction/get-similar-transactions/response-similartransactionsresponse/statistic)

description `string`

payload `string`

period `string`

resolution `string`

type `string`

userId `string`

value `number`

| Status Code | Description |
| --- | --- |
| 200 | Successful operation. |
| 404 | Transaction not found. |

## Link transactionsDeprecated[](#data-v1/transaction/link-transactions)

`POST /api/v1/transactions/{id}/link/{counterpartTransactionId}`

(DEPRECATED) Link two transactions, creating a transaction part for each transaction and netting out the amounts. The transactions are required to have different signs (i.e. one income and one expense). If the first transaction is -300 and the counterpart is 100, the common disposable amount is 100 and result of that is a dispensable amount of -200.

### Parameters[](#data-v1/transaction/link-transactions/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The ID of the first transaction to link. |
| counterpartTransactionIdrequired | The ID of the other transaction (the counterpart) to link. |

> Request Example

```
{
  "amount": -90.0
}
```

### Request Body: LinkTransactionsRequest[](#data-v1/transaction/link-transactions/request-body-linktransactionsrequest)

Object holding the required amount for transaction linking.

amount `number`

The amount of the transaction part. Must be same sign as the transaction. If not specified the common disposable amount will be used.

> Response Example

```
{
  "counterpartTransaction": {
    "accountId": "3fe2d96efacd4dc5994404a950f238a9",
    "amount": 34.5,
    "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
    "categoryType": "EXPENSES",
    "credentialsId": "65bc7a41a66e4ad1aad199bbfb3c5098",
    "currencyDenominatedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "currencyDenominatedOriginalAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "date": 1455740874875,
    "description": "Stadium Sergelg Stockholm",
    "dispensableAmount": 0,
    "formattedDescription": "Stadium Sergelgatan Stockholm",
    "id": "79c6c9c27d6e42489e888e08d27205a1",
    "identifiers": {
      "providerExternalId": "600aca79-23f2-4476-ac3a-5f1893b3b844"
    },
    "inserted": 1455740874875,
    "lastModified": 1455740874875,
    "notes": "Delicious #cake #wedding",
    "originalAmount": 34.5,
    "originalDate": 1455740874875,
    "originalDescription": "Stadium Sergelg Stockholm",
    "partnerPayload": {},
    "parts": [
      {
        "amount": 34.5,
        "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
        "counterpartDescription": "Stadium Sergelg Stockholm",
        "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
        "counterpartTransactionAmount": 10.0,
        "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
        "date": 1455740874875,
        "id": "7303ff128531463bbed358bbf9e23f31",
        "lastModified": 1455740874875
      }
    ],
    "payload": {},
    "pending": false,
    "timestamp": 1464543093494,
    "type": "CREDIT_CARD",
    "upcoming": false,
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "userModified": false
  },
  "transaction": {
    "accountId": "3fe2d96efacd4dc5994404a950f238a9",
    "amount": 34.5,
    "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
    "categoryType": "EXPENSES",
    "credentialsId": "65bc7a41a66e4ad1aad199bbfb3c5098",
    "currencyDenominatedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "currencyDenominatedOriginalAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "date": 1455740874875,
    "description": "Stadium Sergelg Stockholm",
    "dispensableAmount": 0,
    "formattedDescription": "Stadium Sergelgatan Stockholm",
    "id": "79c6c9c27d6e42489e888e08d27205a1",
    "identifiers": {
      "providerExternalId": "600aca79-23f2-4476-ac3a-5f1893b3b844"
    },
    "inserted": 1455740874875,
    "lastModified": 1455740874875,
    "notes": "Delicious #cake #wedding",
    "originalAmount": 34.5,
    "originalDate": 1455740874875,
    "originalDescription": "Stadium Sergelg Stockholm",
    "partnerPayload": {},
    "parts": [
      {
        "amount": 34.5,
        "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
        "counterpartDescription": "Stadium Sergelg Stockholm",
        "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
        "counterpartTransactionAmount": 10.0,
        "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
        "date": 1455740874875,
        "id": "7303ff128531463bbed358bbf9e23f31",
        "lastModified": 1455740874875
      }
    ],
    "payload": {},
    "pending": false,
    "timestamp": 1464543093494,
    "type": "CREDIT_CARD",
    "upcoming": false,
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "userModified": false
  }
}
```

### Response: LinkTransactionsResponse[](#data-v1/transaction/link-transactions/response-linktransactionsresponse)

counterpartTransaction `[Transaction](#tag-transaction)` required

The counterpart transaction.

transaction `[Transaction](#tag-transaction)` required

The primary transaction.

| Status Code | Description |
| --- | --- |
| 200 | The transactions were successfully linked and returned. |
| 400 | The transaction ids were invalid. |
| 404 | The transaction or the counterpart transaction was not found. |
| 409 | The transactions were already linked. |
| 412 | The transactions had the same signum, the part amount had a signum different from the transaction or the part amount is bigger than the dispensable amount. |
| 415 | The request body, as specified by the Content-Encoding HTTP header, is not JSON |

## Update a list of transactions[](#data-v1/transaction/update-a-list-of-transactions)

`PUT /api/v1/transactions`

Updates mutable properties of a list of transactions. The following properties are possible to update: amount, categoryId, date, description and notes. Other properties (immutable) and empty fields are ignored. Date is only updated if there is 1 day difference from existing transaction's date. The amount is only updated if there is a difference ≥ 0.001.

### Works with[](#data-v1/transaction/update-a-list-of-transactions/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `transactions:write` |

> Request Example

```
{
  "accountId": "3fe2d96efacd4dc5994404a950f238a9",
  "amount": 34.5,
  "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
  "categoryType": "EXPENSES",
  "credentialsId": "65bc7a41a66e4ad1aad199bbfb3c5098",
  "currencyDenominatedAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "currencyDenominatedOriginalAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "date": 1455740874875,
  "description": "Stadium Sergelg Stockholm",
  "dispensableAmount": 0,
  "formattedDescription": "Stadium Sergelgatan Stockholm",
  "id": "79c6c9c27d6e42489e888e08d27205a1",
  "identifiers": {
    "providerExternalId": "600aca79-23f2-4476-ac3a-5f1893b3b844"
  },
  "inserted": 1455740874875,
  "lastModified": 1455740874875,
  "notes": "Delicious #cake #wedding",
  "originalAmount": 34.5,
  "originalDate": 1455740874875,
  "originalDescription": "Stadium Sergelg Stockholm",
  "partnerPayload": {},
  "parts": [
    {
      "amount": 34.5,
      "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
      "counterpartDescription": "Stadium Sergelg Stockholm",
      "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
      "counterpartTransactionAmount": 10.0,
      "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
      "date": 1455740874875,
      "id": "7303ff128531463bbed358bbf9e23f31",
      "lastModified": 1455740874875
    }
  ],
  "payload": {},
  "pending": false,
  "timestamp": 1464543093494,
  "type": "CREDIT_CARD",
  "upcoming": false,
  "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "userModified": false
}
```

### Request Body: [Transaction](#tag-transaction)[](#data-v1/transaction/update-a-list-of-transactions/request-body-transaction)

The transactions to be updated.

An account usually contains multiple transactions (except for certain types of accounts where Tink can't access the underlying transactions, for example, certain `INVESTMENT` accounts). The transaction model represents any operation on an account, and could represent both the actual credit-card purchase on a `CREDIT_CARD` account, but also represent the transaction when you paid your credit-card bill. Most commonly, the transactions in an account should represent what the end-user typically regards as a transaction with its amount, description and date, etc.

See [Transaction](#tag-transaction) for parameter descriptions.

## Update a transaction[](#data-v1/transaction/update-a-transaction)

`PUT /api/v1/transactions/{id}`

Updates mutable properties of a list of transactions. The following properties are possible to update: amount, categoryId, date, description and notes. Other properties (immutable) and empty fields are ignored. Date is only updated if there is 1 day difference from existing transaction's date. The amount is only updated if there is a difference ≥ 0.001.

### Works with[](#data-v1/transaction/update-a-transaction/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `transactions:write` |

### Parameters[](#data-v1/transaction/update-a-transaction/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The ID of the transaction |

> Request Example

```
{
  "accountId": "3fe2d96efacd4dc5994404a950f238a9",
  "amount": 34.5,
  "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
  "categoryType": "EXPENSES",
  "credentialsId": "65bc7a41a66e4ad1aad199bbfb3c5098",
  "currencyDenominatedAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "currencyDenominatedOriginalAmount": {
    "currencyCode": "EUR",
    "scale": 2,
    "unscaledValue": 1050
  },
  "date": 1455740874875,
  "description": "Stadium Sergelg Stockholm",
  "dispensableAmount": 0,
  "formattedDescription": "Stadium Sergelgatan Stockholm",
  "id": "79c6c9c27d6e42489e888e08d27205a1",
  "identifiers": {
    "providerExternalId": "600aca79-23f2-4476-ac3a-5f1893b3b844"
  },
  "inserted": 1455740874875,
  "lastModified": 1455740874875,
  "notes": "Delicious #cake #wedding",
  "originalAmount": 34.5,
  "originalDate": 1455740874875,
  "originalDescription": "Stadium Sergelg Stockholm",
  "partnerPayload": {},
  "parts": [
    {
      "amount": 34.5,
      "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
      "counterpartDescription": "Stadium Sergelg Stockholm",
      "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
      "counterpartTransactionAmount": 10.0,
      "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
      "date": 1455740874875,
      "id": "7303ff128531463bbed358bbf9e23f31",
      "lastModified": 1455740874875
    }
  ],
  "payload": {},
  "pending": false,
  "timestamp": 1464543093494,
  "type": "CREDIT_CARD",
  "upcoming": false,
  "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
  "userModified": false
}
```

### Request Body: [Transaction](#tag-transaction)[](#data-v1/transaction/update-a-transaction/request-body-transaction)

The transaction to be updated.

An account usually contains multiple transactions (except for certain types of accounts where Tink can't access the underlying transactions, for example, certain `INVESTMENT` accounts). The transaction model represents any operation on an account, and could represent both the actual credit-card purchase on a `CREDIT_CARD` account, but also represent the transaction when you paid your credit-card bill. Most commonly, the transactions in an account should represent what the end-user typically regards as a transaction with its amount, description and date, etc.

See [Transaction](#tag-transaction) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | Successful operation. |
| 400 | The payload does not pass validation. |
| 404 | Transaction not found. |

## Update transaction LinkDeprecated[](#data-v1/transaction/update-transaction-link)

`PUT /api/v1/transactions/{id}/part/{partId}`

(DEPRECATED) Updates an transaction part amount and it's counterpart amount.

### Parameters[](#data-v1/transaction/update-transaction-link/parameters)

| Parameter | Description |
| --- | --- |
| idrequired | The ID of the transaction to which the part belongs to. |
| partIdrequired | The part ID to update. |

> Request Example

```
{
  "amount": -90.0
}
```

### Request Body: UpdateTransactionLinkRequest[](#data-v1/transaction/update-transaction-link/request-body-updatetransactionlinkrequest)

Object holding the required amount for transaction linking.

amount `number`

The amount of the transaction part. Must be same sign as the transaction. If not specified the common disposable amount will be used.

> Response Example

```
{
  "counterpartTransaction": {
    "accountId": "3fe2d96efacd4dc5994404a950f238a9",
    "amount": 34.5,
    "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
    "categoryType": "EXPENSES",
    "credentialsId": "65bc7a41a66e4ad1aad199bbfb3c5098",
    "currencyDenominatedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "currencyDenominatedOriginalAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "date": 1455740874875,
    "description": "Stadium Sergelg Stockholm",
    "dispensableAmount": 0,
    "formattedDescription": "Stadium Sergelgatan Stockholm",
    "id": "79c6c9c27d6e42489e888e08d27205a1",
    "identifiers": {
      "providerExternalId": "600aca79-23f2-4476-ac3a-5f1893b3b844"
    },
    "inserted": 1455740874875,
    "lastModified": 1455740874875,
    "notes": "Delicious #cake #wedding",
    "originalAmount": 34.5,
    "originalDate": 1455740874875,
    "originalDescription": "Stadium Sergelg Stockholm",
    "partnerPayload": {},
    "parts": [
      {
        "amount": 34.5,
        "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
        "counterpartDescription": "Stadium Sergelg Stockholm",
        "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
        "counterpartTransactionAmount": 10.0,
        "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
        "date": 1455740874875,
        "id": "7303ff128531463bbed358bbf9e23f31",
        "lastModified": 1455740874875
      }
    ],
    "payload": {},
    "pending": false,
    "timestamp": 1464543093494,
    "type": "CREDIT_CARD",
    "upcoming": false,
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "userModified": false
  },
  "transaction": {
    "accountId": "3fe2d96efacd4dc5994404a950f238a9",
    "amount": 34.5,
    "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
    "categoryType": "EXPENSES",
    "credentialsId": "65bc7a41a66e4ad1aad199bbfb3c5098",
    "currencyDenominatedAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "currencyDenominatedOriginalAmount": {
      "currencyCode": "EUR",
      "scale": 2,
      "unscaledValue": 1050
    },
    "date": 1455740874875,
    "description": "Stadium Sergelg Stockholm",
    "dispensableAmount": 0,
    "formattedDescription": "Stadium Sergelgatan Stockholm",
    "id": "79c6c9c27d6e42489e888e08d27205a1",
    "identifiers": {
      "providerExternalId": "600aca79-23f2-4476-ac3a-5f1893b3b844"
    },
    "inserted": 1455740874875,
    "lastModified": 1455740874875,
    "notes": "Delicious #cake #wedding",
    "originalAmount": 34.5,
    "originalDate": 1455740874875,
    "originalDescription": "Stadium Sergelg Stockholm",
    "partnerPayload": {},
    "parts": [
      {
        "amount": 34.5,
        "categoryId": "0e1bade6a7e3459eb794f27b7ba4cea0",
        "counterpartDescription": "Stadium Sergelg Stockholm",
        "counterpartId": "79c6c9c27d6e42489e888e08d27205a1",
        "counterpartTransactionAmount": 10.0,
        "counterpartTransactionId": "d030a7b0840547428aa2fd07026e9a77",
        "date": 1455740874875,
        "id": "7303ff128531463bbed358bbf9e23f31",
        "lastModified": 1455740874875
      }
    ],
    "payload": {},
    "pending": false,
    "timestamp": 1464543093494,
    "type": "CREDIT_CARD",
    "upcoming": false,
    "userId": "d9f134ee2eb44846a4e02990ecc8d32e",
    "userModified": false
  }
}
```

### Response: LinkTransactionsResponse[](#data-v1/transaction/update-transaction-link/response-linktransactionsresponse)

counterpartTransaction `[Transaction](#tag-transaction)` required

The counterpart transaction.

transaction `[Transaction](#tag-transaction)` required

The primary transaction.

| Status Code | Description |
| --- | --- |
| 200 | The transaction part and counter part were successfully updated and returned. |
| 400 | The transaction or part id were invalid. |
| 404 | The transaction or the transaction part was not found. |
| 412 | The transactions had the same signum, the part amount had a signum different from the transaction or the part amount is bigger than the dispensable amount. |
| 500 | The transaction part failed to update. |
