---
title: "Opt-In accounts for Aggregation - Tink Docs"
source: "https://docs.tink.com/resources/aggregation/optin-account-aggregation"
exportedAt: "2026-01-13T12:55:32.751Z"
---
## What is Opt-In:[](#what-is-opt-in-)

`Opt-In` allows the user to choose which accounts to aggregate when refreshing a credential.

If enabled, `Opt-In` will kick in at the time of [credential creation](https://docs.tink.com/api#connectivity/credentials/create-credentials) after the authentication journey of the credential has been completed and when Tink is ready to start aggregating data from the financial institution.

The user will need to select the account she wants to aggregate and provide it as supplemental information for `Opt-In` in order to complete the [Credential's journey](https://docs.tink.com/resources/aggregation/credentials-status-transitions#journey-of-a-credential-).

**Notes:**

-   If an account is not selected at the time of `Opt-In`, that account will not be aggregated by Tink.
-   If an account is opted in and then at a later time it is opted out, the account and all available data related to that accounts will be deleted.
-   Subsequent credential refreshes will only refresh the data associated with the accounts that the user has opted in for.
-   It is possible to perform a [credential refresh](https://docs.tink.com/api#connectivity/credentials/refresh-credentials) and initiate `Opt-In` flow again by using the [query parameter](https://docs.tink.com/api#connectivity/credentials/refresh-credentials/query-parameters) `optIn=true`.
-   `Opt-In` will be skipped in cases when there are no accounts to be fetched from that provider for the user. For testing such cases, you can use Tink's [Demo Bank](https://docs.preprod.oxford.tink.se/resources/aggregation/test-providers).
-   `Opt-In` is currently not supported in Tink Link.

## Why use Opt-In:[](#why-use-opt-in-)

It is possible that a user has multiple accounts associated with a particular Financial Institution, and does not want to aggregate all those accounts when creating a [credential](https://docs.tink.com/resources/aggregation/credentials).

In this scenario, we want to give the user the ability to choose which accounts to aggregate and which to discard at the time of the initial refresh and even in subsequent refreshes.

## How to work with Opt-In[](#how-to-work-with-opt-in)

1.  Create credential using the [create credentials](https://docs.tink.com/api#connectivity/credentials/create-credentials) endpoint

```
{
    "id": "CREDENTIALS_ID",
    "providerName": "uk-demobank-open-banking-redirect",
    "type": "THIRD_PARTY_APP",
    "status": "CREATED",
    "fields": {},
    "userId": "USER_ID"
}
```

2.  After the credential's status changes to `AUTHENTICATING`, the user will authenticate towards the financial institution.

```
{
    "id": "CREDENTIALS_ID",
    "providerName": "uk-demobank-open-banking-redirect",
    "type": "THIRD_PARTY_APP",
    "status": "AUTHENTICATING",
    "fields": {},
    "userId": "USER_ID"
}
```

3.  After authentication has been completed, the credential's status will change to `AWAITING_SUPPLEMENTAL_INFORMATION` and it will list the user's accounts in the `supplementalInformation` field.

```
{
    "credentials": [
        {
            "id": "CREDENTIALS_ID",
            "providerName": "uk-demobank-open-banking-redirect",
            "type": "PASSWORD",
            "status": "AWAITING_SUPPLEMENTAL_INFORMATION",
            "statusUpdated": 1602775132134,
            "fields": {},
            "supplementalInformation": "[
            {"defaultValue":null,"description":"GB51JNLA81796730357700 c2","exposed":true,"children":null,"helpText":null,"hint":null,"immutable":false,"masked":false,"maxLength":null,"minLength":null,"name":"GB51JNLA81796730357700","numeric":false,"optional":false,"options":null,"pattern":"true/false","patternError":null,"type":null,"value":"false","sensitive":false,"checkbox":true,"additionalInfo":"{"accountName":"c2","accountNumber":"GB51JNLA81796730357700","accountType":"CHECKING","balance":12.0,"currencyCode":"GBP","holderName":null,"iban":"GB51JNLA81796730357700"}"},
            {"defaultValue":null,"description":"GB07ETWA87781001740799 c1","exposed":true,"children":null,"helpText":null,"hint":null,"immutable":false,"masked":false,"maxLength":null,"minLength":null,"name":"GB07ETWA87781001740799","numeric":false,"optional":false,"options":null,"pattern":"true/false","patternError":null,"type":null,"value":"false","sensitive":false,"checkbox":true,"additionalInfo":"{"accountName":"c1","accountNumber":"GB07ETWA87781001740799","accountType":"CHECKING","balance":11.0,"currencyCode":"GBP","holderName":null,"iban":"GB07ETWA87781001740799"}"}
            ]",
            "sessionExpiryDate": 1610551130000,
            "userId": "USER_ID"
        }
}
```

4.  For selecting the accounts you want to aggregate, send [supplemental information](https://docs.tink.com/api#connectivity/credentials/add-supplemental-information) with the name field as key, and true as value.
    
    Send supplemental information
    
    ```
    curl --location --request POST https://api.tink.com/api/v1/credentials//supplemental-information \
    -H 'Authorization: Bearer ' \
    -H 'Content-Type: application/json' \
    -d '{"information": {"GB07ETWA87781001740799":"true"}}' \
    ```
    
5.  List credentials to see if the credential's journey is complete and the credential status has changed to `UPDATED`
    

```
{
    "credentials": [
        {
            "id": "CREDENTIALS_ID",
            "providerName": "uk-test-open-banking-redirect",
            "type": "PASSWORD",
            "status": "UPDATED",
            "statusUpdated": 1602776652549,
            "statusPayload": "Analyserat 1 konto och 72 transaktioner.",
            "updated": 1602776652545,
            "fields": {},
            "sessionExpiryDate": 1605368639000,
            "userId": "USER_ID"
        }
    ]
}
```
