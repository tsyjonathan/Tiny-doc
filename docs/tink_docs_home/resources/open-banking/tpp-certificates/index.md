---
title: "TPP certificates - Tink Docs"
source: "https://docs.tink.com/resources/open-banking/tpp-certificates"
exportedAt: "2026-01-13T12:54:53.537Z"
---
Third Party Providers (TPPs) need to follow specific regulatory requirements and technical specifications to access production data via PSD2 APIs. This process involves interaction with National Competent Authorities (NCAs) and Qualified Trust Service Providers (QTSPs) to obtain the necessary authorisation and certificates.

First, TPPs need to obtain an Authorisation Number from their jurisdiction's NCA. This number, recorded in a public registry, confirms the TPP's authorisation to conduct PSD2 transactions and specifies their permitted roles.

Then, after receiving authorisation, TPPs needs to acquire Qualified Certificates from a QTSP. These certificates serve as cryptographic proof of the TPP's identity when interacting with Account Servicing Payment Service Providers (ASPSPs).

## Types of certificates[](#types-of-certificates)

TPPs must acquire 2 different eIDAS certificates to connect to financial institutions across the European Union:

-   Qualified Certificate for Website Authentication (QWAC). These transport certificates are used with TLS protocol for secure peer-to-peer communications.
-   Qualified Certificate for Electronic Seals (QSealC). These signing certificates create e-seals to protect data and assert its origin.

These eIDAS certificates contain essential information including the TPP Authorisation Number, the TPP's roles, and the name of the relevant Competent Authority.

### TPP roles and certificate scopes[](#tpp-roles-and-certificate-scopes)

The roles, identified by [ASN.1 object identifiers](https://en.wikipedia.org/wiki/ASN.1), specify the functions a TPP is authorised to perform under PSD2:

-   PSP\_AI: Account information service
-   PSP\_PI: Payment initiation service
-   PSP\_AS: Account services
-   PSP\_IC: Issuing of card-based payment instruments

> **Note:** Certificates can't be edited. To change certificate information, such as a name or role, you need to revoke the old certificate and issue a new one. If only adding information, you may retain the old certificate as it remains accurate, though incomplete.

### PSD2 and eIDAS compliance[](#psd2-and-eidas-compliance)

A certificate is valid if the following conditions are met:

-   The Trust Service Provider (TSP) is qualified, verified via EU Trusted Lists.
-   The certificate is technically correct, unexpired and adheres to current standards and practices.
-   It contains the Authorisation Number or equivalent, the name of the NCA and the roles granted to the TPP.
-   It is marked as qualified with a QCStatement having OID 0.4.0.1862 and includes an organization identifier with OID 2.5.4.97.
-   It contains the required PSD2 information, checked against ETSI TS 119 495.
-   It has not been revoked, confirmed through Certificate Revocation List (CRL) / Online Certificate Status Protocol (OCSP) checks.

For more details on eIDAS, its background, and its relation to PSD2 and RTS, see the [European Banking Authority's opinion on eIDAS](https://www.eba.europa.eu/sites/default/files/documents/10180/2137845/d429d45e-f936-473c-bc02-c23060d11f19/EBA%20Opinion%20on%20the%20use%20of%20eIDAS%20certificates%20under%20the%20RTS%20on%20SCACSC.pdf).

## Risk Management[](#risk-management)

Certificates may become invalid and need to be replaced for several reasons:

-   Compromised signing key security (for example, the backup card is lost)
-   Expiry of the certificate (usually after one or two years)
-   Errors discovered in the certificate content during audits or scans
-   Etc.

A certificate’s validity can be revoked unexpectedly with less than 24 hours' notice, which can cause service downtime.

TPPs should prepare for this by including certificate replacement procedures in their disaster recovery plans, such as having a backup certificate from an alternative supplier. They should also obtain new certificates well before the existing ones expire.

## UK Implementation[](#uk-implementation)

In the UK, ASPSPs follow the Open Banking Implementation Entity (OBIE). When a TPP registers with OBIE, they may use an alternative identification certificate issued by OBIE, provided they have registered their eIDAS certificate with OBIE. These OBIE-issued certificates, called OBWAC/OBSEAL certificates, are easier for ASPSPs to validate since the certificate root is from OBIE.
