---
title: "eIDAS certificates - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/aggregation/eidas-certificates/"
exportedAt: "2026-01-13T12:54:19.919Z"
---
eIDAS (Electronic IDentification, Authentication and trust Services) is an EU regulation on a set of standards for electronic identification and trust services for electronic transactions in the European Single Market. PSD2 specifies a requirement for strong customer authentication using specific qualified eIDAS certificates for identification of [TPPs](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) and [ASPSPs](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/). There are specifically two certificates needed.

1.  **[QWAC](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) for Transport Layer.** Provides Identification and Confidentiality. For performing mutual TLS.
2.  **[QSealC](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) for Application Layer.** Provides Identification and Integrity. For signing data.

A certificate consists of a private key and the actual certificate. For more information about eIDAS, its background and how it ties to PSD2 and [RTS](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/), see EBA's publication and use of eIDAS.

Some [ASPSPs](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) verify [TPPs](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) requests towards their PSD2 compliant [APIs](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) on the transport layer. The SSL connection is signed with [TPPs](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) private [QWAC](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) certificate (equivalent with a EV SSL certificate, but adds PSD2 information about the [TPP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/)).

## Acquiring eIDAS certificates[](#acquiring-eidas-certificates)

> **Notice**: This guide describes what you as a [TPP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) need to do when using your own eIDAS certificate. There is also a possibility to use Tink’s eIDAS certificates, please get in contact with Tink for more information.

To use Tink’s [AIS](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) & [PIS](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) products you must have your own [QWAC](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) and [QSealC](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) certificates.

> **Notice**: Please be aware that your company must be a registered Account Information Service Provider (AISP) and/or Payment Initiation Service Provider (PISP) in the markets in which you wish to operate. This must also be reflected in the certificates and specified when ordering them.

The certificates are acquired from a [Qualified Trust Service Provider (QTSP)](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/). First you as [TPP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) must generate a Certificate Signing Request (CSR) that is then sent to the chosen QTSP. The CSR is a file with the requestor's public key, domain info and some other information about the requestor's organization. In some markets, there is a requirement that the domain specified in the CSR must be the same as the public domain that receives the callback from the [ASPSP](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/). As each certificate can handle both [AIS](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/) and [PIS](/Tiny-doc/tink_docs_home/resources/aggregation/open-banking-glossary/), it is important to specify the scope when ordering them.

*Image removed: eIDAS*

The European Commission has created a portal to find a QTSP that fits your needs. Tink has chosen one QTSP:

1.  **MultiCert**

for its own eIDAS certificates since it has been one of the thought leaders regarding this subject and has a fairly mature platform.

Tink and EBA strongly recommend using different certificates in different technical setups to avoid dependencies which might cause unforeseen downtime.
