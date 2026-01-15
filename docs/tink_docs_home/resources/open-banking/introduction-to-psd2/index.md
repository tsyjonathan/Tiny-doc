---
title: "PSD2 introduction - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/open-banking/introduction-to-psd2/"
exportedAt: "2026-01-13T12:54:48.354Z"
---
On January 13th 2018, the Second Payment Service Directive (PSD2) began entering into force in the EU and EEA markets. Among other things, the directive stipulates that "banks", more precisely [ASPSPs](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) (Account Servicing Payment Service Provider, institutions providing payment accounts to individuals and legal entities), must enable access to payment accounts (called Account Information Service, [AIS](/Tiny-doc/tink_docs_home/resources/open-banking/open-banking-glossary/)) and enable external payment initiations (called Payment Initiation Service, [PIS](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/)) to licensed Third Party Providers ([TPPs](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/)).

On September 14th 2019, the Regulatory Technical Standards on strong customer authentication and secure communication under PSD2 (RTS on SCA and CSC, in this document referred to RTS), which defines the technical requirements of PSD2 APIs, became applicable. The [RTS](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) stipulates that when a [TPP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) performs payment services as defined under PSD2, they must identify themselves to the [ASPSP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) using [eIDAS](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) certificates. Previously unregulated methods of performing [AIS](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) or [PIS](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) for payment accounts are no longer permitted.

> **Note:** many services, such as access to non-payment accounts (loans, investment accounts, etc.), are out of scope for PSD2 and remain unaffected by it.

There are two different access methods of enabling [AIS](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) and [PIS](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/):

-   Access via the dedicated interface (open API)
-   Access via the (modified) customer interface

## What is a payment account?[](#what-is-a-payment-account-)

To qualify as a payment account under PSD2, an account must be able to:

-   Place funds in the account
-   Withdraw cash from the account
-   Execute and receive payment transactions, including credit transfers, to and from a third party

If an account doesn’t meet these three criteria, it’s not considered as a payment account under PSD2 and the data is not regulated by the directive. On the other hand, if an account does meet these three functional criteria, it is considered a payment account regardless of how each bank classifies accounts for their own purposes.

In most markets, only checking accounts (also called current accounts) are considered payment accounts. Occasionally, credit cards and/or savings accounts might be considered payment accounts according to this definition.

## PSD2 consent[](#psd2-consent)

PSD2 consent is the agreement given by the end user (Payment Service User, [PSU](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/)) to a [TPP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) to fetch their account information or initiate payments. Obtaining consent is the responsibility of the [TPP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/).

Once consent is obtained by the [TPP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/), the [PSU](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) authorises account information and payment initiation services by performing Strong Customer Authentication ([SCA](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/)) using an [authentication method](#psd2-authentication-flows) implemented by the [ASPSP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/). Account Information Service consent can be valid for up to 180 days and grants the [TPP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) unlimited access to the [PSU](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/)’s account data for that period whenever the user actively requests that data and up to 4 times per day when the user is not actively requesting the data (i.e. it can be fetched passively in the background). When the consent has expired, the TPP needs to obtain a new consent from the [PSU](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/).

## PSD2 authentication flows[](#psd2-authentication-flows)

Strong Customer Authentication ([SCA](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/)) is part of PSD2 regulations and mandates a higher level of security between the end-user ([PSU](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/)) and their financial institution ([ASPSP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/)) when accessing payment account data and signing payments. The exact method of [SCA](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) used to authenticate the [PSU](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) is decided by the [ASPSP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/), who is obliged to implement the [SCA](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) according to the standards outlined in the directive. The directive allows for three authentication user flows:

-   Redirect ([PSU](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) is redirected to [ASPSP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/)’s website or app to complete the authentication)
-   Decoupled ([PSU](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) authenticates on a separate device without being redirected)
-   Embedded ([PSU](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) completes authentication without leaving the [TPP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/)’s interface) The [ASPSP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) is responsible for making at least one of these authentication flows available to [TPP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/)s.

## What can I expect from a dedicated PSD2 interface?[](#what-can-i-expect-from-a-dedicated-psd2-interface-)

According to the [RTS](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/), a dedicated interface must provide the same user experience, in terms of data and user flow, as the [ASPSP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) offers its own customers through its own channels. This can be divided into three segments:

**1\. That ASPSPs shall provide the exact same information that is available to users in the ASPSP’s own channels**

Art 36.1.1 in the RTS on SCA and CSC.

**Examples**:

-   A bank can’t offer only 180 days of transactions through their open API when they offer 1-2 days' worth of transactions through their own channels.
-   A bank can’t offer less descriptive information about end-user transactions through the open API than in their own channels.

**2\. That ASPSPs shall provide the same user experience that they provide their own customers and not include extra obstacles only in their dedicated PSD2 interfaces**

Art 32.3 in the RTS on SCA and CSC.

**Examples**:

-   A bank can’t require the user to perform 2 SCAs to obtain information that only requires one SCA in their own channels.
-   A bank can’t require an inconvenient web redirect experience for a feature that only requires simple face recognition in their own channels.

**3\. That ASPSPs shall provide the same performance and availability that they provide to their own customers through their own mobile channel (dedicated interface & direct access performance should be the same)**

Art 32.1 in the RTS on SCA and CSC.

**Examples**:

-   A bank can’t accept more downtime for their open API compared to their own channels.

## Countries subject to PSD2 regulation[](#countries-subject-to-psd2-regulation)

The countries that are subject to the [PSD2](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) regulation are the following:

Austria, Belgium, Bulgaria, Cyprus, Croatia, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Ireland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Netherlands, Norway, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden and United Kingdom.

> **Note:** For the United Kingdom, the implementation of PSD2 is described by the the [UK Open Banking regulation](/Tiny-doc/tink_docs_home/resources/open-banking/uk-open-banking-introduction/).
