---
title: "Introduction to Transactions - Tink Docs"
source: "https://docs.tink.com/resources/transactions/introduction-to-transactions"
exportedAt: "2026-01-13T12:41:26.103Z"
---
![Transactions-intro](https://images.ctfassets.net/tmqu5vj33f7w/39ObJjvpYoQiRARWw4Ezqy/d25e47c658f9d3b12e87e05b892d61aa/Transactions-intro.jpg)

Open banking enables companies to fetch transaction data from financial institutions. Fetching and handling transaction data from individuals poses different complex challenges:

-   Data is poorly structured
-   Financial institutions structure and provide data differently.
-   Financial institutions make changes that break existing integrations.

## Our solution[](#our-solution)

Transactions handles these challenges.

-   Fetched data is standardized. All transactions are structured the same way, which makes integration simple.
-   We continuously monitor and update all of our 3,400+ connections with financial institutions to ensure that your back-end integrations work.

![Transactions-data-cleaning](https://images.ctfassets.net/tmqu5vj33f7w/y2MgIkkWT7pFQXit6LewE/fc65452bb2e12b1dd578e71b184dc8aa/Transactions-data-cleaning.jpg)

## How it works[](#how-it-works)

Use Tink Console (from where you manage your apps and find your API credentials) to create a URL that is provided to the end user. When your user selects their URL, they go through a flow where they authenticate with their bank and connect to their bank accounts. You are allowed to access all transactions from accounts for which the end user has given their consent.

![transactions-flow-example](https://images.ctfassets.net/tmqu5vj33f7w/2T0Y84MaaHJj1rLPQFU59w/96803f2bdaf091c3226dd4ac33069243/transactions-flow-example.gif)

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

![Transactions-data-cleaning](https://images.ctfassets.net/tmqu5vj33f7w/y2MgIkkWT7pFQXit6LewE/fc65452bb2e12b1dd578e71b184dc8aa/Transactions-data-cleaning.jpg)

## Data-access models[](#data-access-models)

We provide two types of data-access models, depending on your need.

-   **One-time access:** A one-time retrieval of an end user’s transaction data, which results in a standardized view of their finances at one point in time. For more information, see [One-time access to a bank account](https://docs.tink.com/resources/transactions/connect-to-a-bank-account).
-   **Continuous access:** Uninterrupted access to an end user’s transaction data. Continuous access is suitable for financial management products. For more information, see [Continuous access to a bank account](https://docs.tink.com/resources/transactions/continuous-connect-to-a-bank-account).

|  | ONE-TIME ACCESS | CONTINUOUS ACCESS |
| --- | --- | --- |
| Fetch accounts or transactions data only once | ✅ | ❌ |
| Data is automatically deleted after 24hrs | ✅ | ❌ |
| Need to fetch accounts and transactions data over a period of time and/or perform background refreshes | ❌ | ✅ |
| Data is continuously accessible | ❌ | ✅ |
| Receive notifications for when new accounts or transactions data is available on the Tink platform | ❌ | ✅ |
