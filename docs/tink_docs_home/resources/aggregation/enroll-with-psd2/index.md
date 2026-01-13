---
title: "PSD2 API registration - Tink Docs"
source: "https://docs.tink.com/resources/aggregation/enroll-with-psd2"
exportedAt: "2026-01-13T12:54:10.872Z"
---
A [TPP](https://docs.tink.com/resources/aggregation/open-banking-glossary) must register with every [ASPSP](https://docs.tink.com/resources/aggregation/open-banking-glossary) from which it intends to access [PSD2](https://docs.tink.com/resources/aggregation/open-banking-glossary) data and services. ASPSPs offer one of three onboarding approaches:

-   **Dynamic Client Registration (DCR):** ASPSPs that have implemented DCR offer an API that facilitates an automated process for TPPs to verify their applications and obtain a client ID and registration details to access Open Banking APIs.
-   **Automatic Onboarding:** this streamlined process uses a single API call for onboarding and authorization. This simple, efficient process relies on certificate-based authorization with an EIDAS-compliant certificate to verify TPP identity and grant access to Open Banking APIs.
-   **Manual Onboarding:** this registration method involves a comprehensive review conducted by the bank and it typically takes several days or weeks. Manual onboarding is used when regulations mandate rigorous scrutiny or when the ASPSPs legacy infrastructure is not compatible with automated processes.

Once the enrolment process is fulfilled, the ASPSP will grant you secure access to the API and you can start using their services.

## JWKS endpoint and certificate URL[](#jwks-endpoint-and-certificate-url)

A JSON Web Key Set (JWKS) is a collection of JSON Web Keys (JWKs) used to secure communications between TPPs and ASPSPs. Many banks require a JWKS endpoint to expose the active TPP's public keys for validation during the registration process. Additionally, banks often require a JWKS revoked endpoint that lists all revoked keys.

Tink simplifies the management of these URLs for you. When you [install your TPP certificates for the EU into Tink](https://docs.tink.com/resources/open-banking/install-certificates), a JWKS endpoint is automatically generated. This endpoint includes the public keys of your certificate, and a URL is created in our Content Delivery Network (CDN) for each of your active certificates. These URLs are updated each time you upload a new certificate, ensuring your keys remain current and secure.

In the UK, the JWKS URL is managed by the TPP through their [OBIE directory account](https://directory.openbanking.org.uk/s/login/).

## Upload TPP credentials to Tink[](#upload-tpp-credentials-to-tink)

When the registration to an ASPSP is complete, you will have received a set of credentials, often containing a client ID and client secret, though you may also get other information as part of the registration process.

What exactly needs to be uploaded to Tink varies for each ASPSP and can be found in App settings in [Console → App settings → “TPP credentials”](https://console.tink.com/app-settings/tpp-credentials). Select “Upload TPP Credentials” and then enter the credentials received after registration with the ASPSP.

![Console - App Settings - TPP Credentials](https://images.ctfassets.net/tmqu5vj33f7w/2Ag8zGmBJf6ENyVKRuvcvI/41664183817c789558f596319ddb9bb6/consoe-app-settings-tpp-credentials.png)

Below is an example of the credentials required for the ASPSP SEB in Sweden:

![TPP-3](https://images.ctfassets.net/tmqu5vj33f7w/4g7jMtPFdW8eAVqGyFucwJ/3862a272d0ab530fd73b7b4c898dddfd/TPP-3.jpg)

After successfully uploading TPP Credentials you will be able to see the configured banks and parameters below:

![TPP-4](https://images.ctfassets.net/tmqu5vj33f7w/6SnAbOMGDxD0hDpXJzMrFq/eeaa97afba52934f280e5bef865b7bc8/TPP-4.jpg)

## Registration verification[](#registration-verification)

For ASPSPs using DCR, a successful API response and the installation of TPP credentials indicate a complete registration. For manual onboarding, you typically receive a direct confirmation from the ASPSP.

Regardless of the registration method, we recommend generating a Tink Link in Console tailored to your specific use case and enabled products.

After creating the Tink Link, test the connection by attempting to connect to the bank using the Tink Link. If you are redirected to the bank's login page, this generally indicates that your certificates have been successfully onboarded. However, the most reliable confirmation of a successful registration is completing either a data refresh operation or a payment, provided you or one of your testers has a real account with the bank.

> **Note**: To test PSD2 API registration, you need to have enabled Open Banking connections in your Tink Console configuration. See [Configure available bank connections](https://docs.tink.com/resources/api-setup/configure-available-bank-connections).

## Handling errors[](#handling-errors)

Errors can occur during registration due to issues with the bank's developer portals. In such cases, contact the bank's technical support for PSD2 APIs, which is usually available in the contact or help section of the bank's developer portal.

If you encounter an error while using Tink's Python script `tink_secret_utils.py` or receive errors during testing, please [contact Support](https://tinkab.atlassian.net/servicedesk/customer/portals).
