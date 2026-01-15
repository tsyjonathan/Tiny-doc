---
title: "Certificate renewal - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/open-banking/certificate-renewal/"
exportedAt: "2026-01-13T12:55:01.869Z"
---
TPPs' open banking certificates are valid for 1 to 2 years. To ensure uninterrupted service, it's essential that you obtain new certificates and install them on Tink before the current ones expire.

In addition, you must also update these certificates with the relevant Account Service Payment Service Providers (ASPSPs).

To maintain continuous operation, monitor the expiration dates and plan for renewal well in advance.

## Challenges[](#challenges)

The complexity of certificate renewal varies depending on the market, the number of ASPSPs you are connected to, and the specific requirements of each ASPSP. Some Third-Party Providers (TPPs) will have to renew their certificates with dozens or even hundreds of banks simultaneously.

Some ASPSPs only allow TPPs to register once, using only one certificate at a time.

Finally, some ASPSPs are strict about whether values may change during certificate renewal. For example, if certain values, such as the Common Name (CN), change in the new certificates, some ASPSPs may require you to submit a new registration.

## Best practices[](#best-practices)

**Be proactive.** We recommend that you request new certificates at least three months before the current ones expire. This timeframe accounts for potential delays due to holidays or other factors, helping to prevent any service disruptions caused by expired certificates.

**Contact ASPSPs.** All ASPSPs offer a support for TPPs, usually by email. Don't hesitate to contact them if you have any questions.

**Test your certificates.** Some ASPSPs allow TPPs to test the validity of their certificates before onboarding to their services. If you can test, then test!

## Monitoring the expiry date[](#monitoring-the-expiry-date)

The issuing Qualified Trust Service Provider (QTSP) will normally notify you several weeks prior to the expiry date of your certificates. To renew your certificates, you’ll need to conduct certain vetting processes such as domain control validation and authorised representative validation.

It is your responsibility as a TPP to renew your certificates with your issuer before the expiry date.

The eIDAS certificates that you’ve uploaded can be found in Console under “App settings”. You can also monitor the expiry date of certificates there.

![Console - App Settings - eIDAS](https://images.ctfassets.net/tmqu5vj33f7w/3uBM76bkBWoGfDm7V2s7Xr/bd27a61161313d3d746892f462d3c259/console-app-settings-eidas.png)

We monitor your certificates and notify you of impending expirations. However, you should also track expiration dates and plan renewals in advance. Mark these dates and schedule certificate renewals with ample time to ensure continuous Open Banking operations.

## Acquiring new certificates[](#acquiring-new-certificates)

When acquiring new certificates, we recommend the following:

-   Make sure to keep Common Name (CN) the same in the new certificates. A changed CN will require new registrations with some ASPSPs.
-   Opt for the longest validity period when requesting new certificates to help reduce operational workload.
-   Generate a new private key for each certificate renewal to enhance security and reduce compromise risks.

### EU certificates[](#eu-certificates)

Acquire the new certificates from your QTSP and install them into Tink by following the instructions in [Install Certificates](/Tiny-doc/tink_docs_home/resources/open-banking/install-certificates/). Make sure to use the `encrypt-and-upload-spare` option when running the script to prevent a service outage.

### UK certificates[](#uk-certificates)

To renew your certificates in the UK, you need to generate a CSR file with the script `tink_secret_utils.py` and follow the instructions outlined in [Install Certificates](/Tiny-doc/tink_docs_home/resources/open-banking/install-certificates/).

After creating the CSR files, uploading them to the Open Banking Implementation Entity (OBIE) directory, and generating new certificates, make sure that you associate the appropriate Software Statements with the new certificates.

## Certificate renewal with Tink[](#certificate-renewal-with-tink)

To start the certificate renewal process with Tink, create a [technical support ticket](https://support.tink.com/) and select the option "eIDAS Registration and Rotation." This establishes a direct communication channel with our technical team, ensuring a smooth renewal process. Our experts will guide you through each step, monitor your traffic, and quickly respond to any issues that may arise.

### New certificates installation[](#new-certificates-installation)

Before activating the new certificates, you'll need to install them into the Tink system. Use the provided Python script `tink_secret_utils.py` to upload all spare certificates.

> **Note:** At this stage, the new certificates should remain inactive to avoid any disruption to your production traffic.

### Tink's Verification and Configuration[](#tink-39-s-verification-and-configuration)

Once you've uploaded your certificates, our team will verify their installation. We'll then implement a configuration that enables switching between the soon-to-expire and new certificates for each bank connection. This approach allows for a gradual transition, which minimises potential traffic disruptions. We can test each bank connection with the new certificate whilst retaining the ability to revert to the previous certificate if necessary.

### Certificate activation[](#certificate-activation)

After Tink has confirmed that the configuration is ready for your app, you'll activate the new certificates using the same Python script, `tink_secret_utils.py`.

### Coordinated Transition[](#coordinated-transition)

Tink has extensive documentation on the certificate renewal process for numerous ASPSPs across the EU and UK. We've categorised the complexity of certificate renewal for each bank, the least complex requiring no action and the most complex requiring manual updates or allowing only one certificate at a time. For the more complex banks, a short downtime may be unavoidable, and we recommend scheduling a maintenance window for live customers.

Our team will review your list of bank connections and the specific renewal requirements for each ASPSP. We'll coordinate with you and the relevant ASPSPs to ensure a smooth transition of each bank connection to the new certificate.

### Testing and Monitoring[](#testing-and-monitoring)

As the TPP, you're responsible for testing the new certificate's functionality for each bank connection and monitoring live traffic. However, Tink will provide additional monitoring support to ensure a seamless transition.

### Completion[](#completion)

The goal is to have all bank connections successfully transitioned to the new certificates well before your current certificate's expiration date. Our collaborative approach and extensive experience in certificate renewals across Europe and the UK ensure an efficient and secure process.

By following this structured approach, we can minimise disruptions and ensure the continued smooth operation of your Open Banking services.
