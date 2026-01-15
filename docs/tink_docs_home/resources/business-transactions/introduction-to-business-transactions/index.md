---
title: "Introduction to Business Transactions - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/business-transactions/introduction-to-business-transactions/"
exportedAt: "2026-01-13T12:41:28.608Z"
---
Open banking APIs have for a long time been used to retrieve financial data from personal accounts. Business Transactions now provides the same kind of access, but to business accounts. This opens up a whole new category of use cases, such as automating accounting processes or more accurate credit assessments for business lenders.

![business-transactions-intro](https://images.ctfassets.net/tmqu5vj33f7w/6bkGP1HXF1WeW4yFcPlHVd/b05d0fda22b28862c2ba632accd2873e/business-transactions-intro.jpg)

## What this solves[](#what-this-solves)

Business Transactions is part of Tink’s Account Information Services product portfolio and solves three major pain points:

-   **Businesses need access to financial data**: We fetch transaction data from more than 3,400 banks across 18 European countries. Our connectivity capabilities grow rapidly as we add more banks and countries to our platform.
-   **Financial data is formatted poorly and hard to use**: We make sure data is up-to-date and cleaned so that you can extract real value from it.
-   **Implementing financial data into your products can be very time-consuming**: We make integration with your product simple through developer-friendly SDKs.

## How it works[](#how-it-works)

Business Transactions is delivered through a [front–end SDK](/Tiny-doc/tink_docs_home/resources/business-transactions/setup-and-integrate-business-transactions/), which makes your integration to Tink essentially one line of code. By implementing Business Transactions into your product flows, an end user will be asked to connect their account(s) and authenticate to their bank. If consent is granted, a developer can then access all transactions from that account.

![business-transactions-flow-example](https://images.ctfassets.net/tmqu5vj33f7w/1RrjLVS2P0WyoZD2ZXVVzK/442961ea7f908ac2c1536c27ee711b9c/business-transactions-flow-example.gif)

This may seem simple, but there is a lot of complexity involved in the background. There are thousands of banks across Europe, with their own connections and authentication methods, which can be updated at any time. This is a continuously evolving landscape that requires massive investments in engineering and monitoring. Tink manages all of this complexity for you and will direct the end user to the appropriate authentication mechanism.

## Product availability[](#product-availability)

At this moment, Business Transactions is an Enterprise-only product with limited market availability. Tink can connect to Business Accounts in the United Kingdom, Portugal, and Sweden. Please get in touch with your Account Manager for more information.

## Data fields[](#data-fields)

-   **Account types**: Current accounts, savings accounts, prepaid cards, credit cards[1](#Sup1)
-   **Account information data**: Account number, identifier, balance, account type
-   **Basic information**: Amount, date, original description, cleaned—up description
-   **Transaction dates**: booked date, value date[2](#Sup1)
-   **Proprietary bank references**: Proprietary bank transaction type[2](#Sup1), Bank transaction reference[2](#Sup1)
-   **Merchant information**: MCC code[2](#Sup1), Merchant name[2](#Sup1)

1Subject to market availability. For a list of available markets, see [Account aggregation](/Tiny-doc/tink_docs_home/market-capabilities/aggregation/). 2Dependant on availability.

![business-transactions-data-cleaning](https://images.ctfassets.net/tmqu5vj33f7w/1neFN6CUruFJsz55wW9Apd/394518dd0a8061ce37820db0bfd070fc/business-transactions-data-cleaning.jpg)

## Data–access models[](#data-access-models)

Depending on your needs, Tink can provide one–time or continuous access to bank data:

-   **One–time**: A single retrieval of end user transaction data that results in a point–in–time finances view. This is suitable from a risk or credit-modeling perspective. For more information, see [One–time access to a business account](/Tiny-doc/tink_docs_home/resources/business-transactions/one-time-access-to-a-business-account/).
-   **Continuous**: A continuous, updated stream of an end user's financial data as it appears in their own bank account, connecting you to fresh information at all times. This model is suitable for financial management products. For more information, see [Continuous access to a business account](/Tiny-doc/tink_docs_home/resources/business-transactions/continuous-access-to-a-business-account/).

|  | ONE–TIME ACCESS | CONTINUOUS ACCESS |
| --- | --- | --- |
| Accounts or transaction data is only retrieved once | ✅ | ❌ |
| Data is automatically deleted after 24 hours | ✅ | ❌ |
| Accounts and transactions data are needed for more than 24 hours and/or to perform background refreshes | ❌ | ✅ |
| Data is continuously accessible | ❌ | ✅ |
| Notifications for when new accounts or transaction data is available on the Tink Platform | ❌ | ✅ |
