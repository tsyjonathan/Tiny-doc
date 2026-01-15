---
title: "Get EU certificates - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/open-banking/get-eu-certificates/"
exportedAt: "2026-01-13T12:54:55.317Z"
---
To use Tink’s AIS & PIS products with your own license, you must have your own Qualified Website Authentication Certificate (QWAC) and Qualified Certificate for Electronic Seals (QSealC).

EIDAS certificates in the EU can only be acquired from a Qualified Trust Service Provider (QTSP). You can find QTSPs in the European Commission's EU Trusted List, which catalogues all approved QTSPs and the services they offer.

The process for acquiring certificates from a QTSP varies but typically involves several key steps.

## Complete the certificate request form[](#complete-the-certificate-request-form)

First, you need to complete the certificate request form required by the QTSP. Depending on their requirements, this form may need to be digitally signed or authenticated by a notary.

When submitting the certificate request form, you typically have the option to select the certificate's validity period. We strongly advise choosing the longest available duration.

Opting for an extended validity period ensures a more stable and consistent integration with the Open Banking ecosystem, as you won't need to update your certificates as often. This stability helps you maintain uninterrupted access to APIs and decreases your operational burden.

While the specific maximum validity period varies depending on the certificate authority and regulatory requirements, it's generally in the range of one to three years for Open Banking certificates. Always verify the exact options available to you during the submission process and select the longest permissible period that aligns with your operational needs and compliance requirements.

## Generate Certificate Signing Requests[](#generate-certificate-signing-requests)

Next, you need to generate the Certificate Signing Requests (CSRs) to submit alongside the completed form to the Certificate Authority (CA). The CSR is a file with the requestor's public key, domain info and some other information about the requestor's organization.

In some markets, the domain specified in the CSR must be the same as the public domain that receives the callback from the Account Service Payment Service Provider (ASPSP). As each certificate can handle both AIS and PIS, it’s important to specify the scope when ordering them.

For QWACs, you might need to demonstrate control of the relevant domains. This is usually done using standard methods like those employed for plain SSL Server certificates.

## Submit your request to the CA[](#submit-your-request-to-the-ca)

Once you submit your completed certificate request form and CSRs to the CA, the CA will then perform several checks, including verifying PSD2 authorisation and roles. Once these verifications are successfully completed, the CA will deliver the certificates via email.

For more details, contact the relevant QTSP directly.

## Important considerations[](#important-considerations)

-   Ensure the information provided to the QTSP is accurate and up to date. When you receive the certificate, verify its details thoroughly. If any corrections are required, you must obtain a new certificate, which will delay your onboarding or renewal process.
    
-   If your organisation's name includes special characters, ensure they are properly escaped and decoded according to industry standards. Some ASPSPs will display this value on the certificate to end users during the consent screen. If not correctly encoded, it will appear incorrectly.
