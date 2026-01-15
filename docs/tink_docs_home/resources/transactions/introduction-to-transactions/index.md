---
title: "Introduction to Transactions - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/transactions/introduction-to-transactions/"
exportedAt: "2026-01-13T12:41:26.103Z"
---
*Image removed: Transactions-intro*

Open banking enables companies to fetch transaction data from financial institutions. Fetching and handling transaction data from individuals poses different complex challenges:

-   Data is poorly structured
-   Financial institutions structure and provide data differently.
-   Financial institutions make changes that break existing integrations.

## Our solution[](#our-solution)

Transactions handles these challenges.

-   Fetched data is standardized. All transactions are structured the same way, which makes integration simple.
-   We continuously monitor and update all of our 3,400+ connections with financial institutions to ensure that your back-end integrations work.

*Image removed: Transactions-data-cleaning*

## How it works[](#how-it-works)

Use Tink Console (from where you manage your apps and find your API credentials) to create a URL that is provided to the end user. When your user selects their URL, they go through a flow where they authenticate with their bank and connect to their bank accounts. You are allowed to access all transactions from accounts for which the end user has given their consent.

*Image removed: transactions-flow-example*

## Data-type availability[](#data-type-availability)

Here's a list of data types that we offer.

-   **Account types:** Current accounts, savings accounts, prepaid cards, credit cards
-   **Account information data:** Account number, identifier, balance, account type
-   **Basic information:** Amount, date, original description, cleaned up description
-   **Extended dates:** multiple dates (book vs value date)
-   **Proprietary bank references:** Proprietary bank transaction type, Bank transaction reference
-   **Merchant information:** MCC code[1](#Sup1), Merchant name[1](#Sup1)

1 dependent on bank availability

**Note**: Transactions is dependent on data availability. The data you can fetch depends on what the bank has made available.

*Image removed: Transactions-data-cleaning*

## Data-access models[](#data-access-models)

We provide two types of data-access models, depending on your need.

-   **One-time access:** A one-time retrieval of an end user’s transaction data, which results in a standardized view of their finances at one point in time. For more information, see [One-time access to a bank account](/Tiny-doc/tink_docs_home/resources/transactions/connect-to-a-bank-account/).
-   **Continuous access:** Uninterrupted access to an end user’s transaction data. Continuous access is suitable for financial management products. For more information, see [Continuous access to a bank account](/Tiny-doc/tink_docs_home/resources/transactions/continuous-connect-to-a-bank-account/).

|  | ONE-TIME ACCESS | CONTINUOUS ACCESS |
| --- | --- | --- |
| Fetch accounts or transactions data only once | ✅ | ❌ |
| Data is automatically deleted after 24hrs | ✅ | ❌ |
| Need to fetch accounts and transactions data over a period of time and/or perform background refreshes | ❌ | ✅ |
| Data is continuously accessible | ❌ | ✅ |
| Receive notifications for when new accounts or transactions data is available on the Tink platform | ❌ | ✅ |
