---
title: "Get UK certificates - Tink Docs"
source: "https://docs.tink.com/resources/open-banking/get-uk-certificates"
exportedAt: "2026-01-13T12:54:57.057Z"
---
In the UK, the [Open Banking Implementation Entity (OBIE)](https://directory.openbanking.org.uk/s/login/) serves as a trust anchor, ensuring the authenticity of both banks and application providers. For a TPP to access PSD2 APIs, they must be enrolled in the OBIE directory.

## Enrol with OBIE[](#enrol-with-obie)

To start the enrolment process with OBIE, an authorised representative from your organisation, usually the primary business contact, must first complete identity verification. The representative should visit the OBIE directory, initiate the enrolment, and fill out the sign-up form. For detailed information about enrolment, see [OBIE’s Enrolling Onto Open Banking Guide](https://www.openbanking.org.uk/wp-content/uploads/Enrolling-Onto-Open-Banking-Guide.pdf).

### 1\. Generate the CSR files[](#generate-the-csr-files)

For a step-by-step guide on generating CSR files and managing them within the OBIE Directory, see "Generate and manage Transport and Signing Certificates for Open Banking ETSI Certificates" in the [official UK Open Banking documentation](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/3242196993/Open+Banking+Directory+Usage+-+eIDAS+release+Production+-+v2.5#OpenBankingDirectoryUsage-eIDASrelease\(Production\)-v2.5-9.GenerateandmanageTransportandSigningCertificatesforOpenBankingETSIcertificates\(OBWACandOBSeal\)).

### 2\. Upload the CSR to the OBIE directory[](#upload-the-csr-to-the-obie-directory)

1.  Log in to OBIE Directory and find the Cerficates section
2.  Add a new Organisation Certificate
3.  Select the certificate types. Choose Transport (OBWAC) or Signing (OBSeal)
4.  Select “upload a .csr file or OB WAC” or “upload a .csr file for OB Seal” and upload the corresponding .csr file.

### 3\. Download OBWAC/OBSeal certificate[](#download-obwac-obseal-certificate)

1.  Locate the newly issued certificate on the “Certificates” page
2.  Select “Get PEM”

### 4\. Construct OBWAC/OBSeal certificate chain[](#construct-obwac-obseal-certificate-chain)

1.  Download the files `OpenBankingRootCA.cer` and `OpenBankingIssuingCA.cer` from Open Banking Developer Zone
2.  Convert each `.cer` file to `.pem` file using the following script:

Convert .cer files to .pem

```
openssl x509 –in OpenBankingRootCA.cer -out OpenBankingRootCA.pem 
openssl x508 –in OpenBankingIssuingCA.cer -out OpenBankingIssuingCA.pem 
```

### 5\. Create a .pem file for each certificate chain[](#create-a-pem-file-for-each-certificate-chain)

```
-----BEGIN CERTIFICATE-----
OBWAC / OBSeal certificate downloaded from the Directory
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
OpenBankingIssuingCA
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
OpenBankingRootCA
-----END CERTIFICATE-----
```
