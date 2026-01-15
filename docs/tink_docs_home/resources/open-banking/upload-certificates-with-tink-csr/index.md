---
title: "Upload certificates with Tink CSR"
source: "/Tiny-doc/tink_docs_home/resources/open-banking/upload-certificates-with-tink-csr/"
exportedAt: "2026-01-13T12:55:17.150Z"
---
Tink's CSR simplifies the process of creating a CSR and omits the need for TPPs to handle certificate private keys. The CSR private keys are generated, encrypted, and stored by Tink. Once you have acquired the signed public certificate from the Qualified Trust Service Provider ([QTSP](/Tiny-doc/tink_docs_home/resources/open-banking/open-banking-glossary/)), it can be uploaded to Tink and replace the previously generated CSR record.

This guide describes how you, as a TPP, can use Tink’s **secret\_utils script**, version 5.1.0 or later, to create a CSR and upload the certificate to Tink. It consists of four steps:

1.  Format CSR input to a JSON file
2.  Execute command to generate a CSR
3.  Acquire certificate from QTSP
4.  Upload certificate chain to Tink

The following process is intended to provide an overview on how to create CSRs for eIDAS and OBIE certificates. The examples are based on creating CSRs for UK Open Banking certificates (OBIE).

## Format CSR input to a JSON file[](#format-csr-input-to-a-json-file)

See below for an example JSON file for generating OBIE CSRs and the description for each field.

```
{
    "countryName": "GB",
    "organizationName": "Open Banking Limited (D)",
    "organizationIdentifier": "PSDGB-OB-Unknown0015800001041ReAAI",
    "commonName": "Unknown0015800001041ReAAI",
    "psd2Roles": ["AI", "PI"]
}
```

-   _**countryName** : **##** - 2 character country code written in the ISO 3166-1 format, representing the entity country that is enrolled in the OBIE Directory_.
-   _**organizationName** : **Open Banking Limited (D)** - This is the organisation name as shown in the OBIE Directory_.
-   _**organizationIdentifier** : **PSDGB-FCA-######** - If you have an FCA number, or **PSDGB-OB-Unknown######** if you do not have an NCA number in the OBIE Directory_.
-   _**commonName** : **######** - This is your organisation ID in the OBIE Directory_.
-   _**psd2Roles** : **######** - A multi value list of PSD2 roles that the certificate should be authorized to perform. Account information (AI) and/or payment initiation (PI)_.

## Execute command to generate a CSR[](#execute-command-to-generate-a-csr)

Separate CSRs are required for each type of certificate (QSealC/QWAC). Each CSR is generated for an app using your client credentials. You get these when signing up with Tink Console. For more information, see [Access your API credentials](/Tiny-doc/tink_docs_home/resources/console/set-up-your-tink-account/#access-your-api-credentials).

Example generate-csr command

```
python tink_secret_utils.py certificates generate-csr --certificate-type \ 
    <signing/transport> --region uk --infile example.json \ 
    api-gateway --cluster oxford --environment production \ 
    oauth2 --client-id  --client-secret 
```

Example response:

```
Generating CSR based on the given CSR configuration
200 OK
{
  "csr": "<GENERATED_CSR>",
  "csrSignature":"<SIGNATURE>"
}
CSR file UK_QSEAL.csr is created to current working directory
```

The response consists of the CSR file, a string representation of the CSR and a CSR signature signed by Tink. The signature can be used to verify that the CSR file hasn't been tampered with.

## Acquire certificate from QTSP[](#acquire-certificate-from-qtsp)

### 1\. Upload the CSR to the OBIE Directory[](#upload-the-csr-to-the-obie-directory)

1.  Log in to OBIE Directory.
2.  Go to **Directory**.
3.  Select "Certificates".
4.  Select "Add new Organisation Certificate".
5.  Select the certificate type: Transport (OBWAC) or Signing (OBSeal).
6.  Select "upload a .csr file for OB WAC" or "upload a .csr file for OB Seal" and upload the corresponding .csr file.

### 2\. Download OBWAC/OBSeal certificate[](#download-obwac-obseal-certificate)

1.  Locate the newly-issued certificate on the "Certificates" page.
2.  Select "Get PEM".

### 3\. Construct OBWAC/OBSeal certificate chain[](#construct-obwac-obseal-certificate-chain)

1.  Download the files OpenBankingRootCA.cer and OpenBankingIssuingCA.cer from Open Banking Developer Zone
2.  Convert each .cer file to .pem file

```
openssl x509 -in OpenBankingRootCA.cer -out OpenBankingRootCA.pem
openssl x509 -in OpenBankingIssuingCA.cer -out OpenBankingIssuingCA.pem
```

3.  Create a .pem file for each certificate chain

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

## Upload certificate chain to Tink[](#upload-certificate-chain-to-tink)

Example replace-csr command

```
python tink_secret_utils.py certificates replace-csr --certificate \ 
    <obsealChain.pem/obwacChain.pem> --certificate-type <signing/transport> \ 
    --region uk api-gateway --cluster oxford --environment \     
    production oauth2 --client-id  --client-secret 
```

Example response of successful upload of OBSeal/QSealC:

```
Replacing CSR with given certificate
200 OK
{
  "certificateWithMetadata": {
    "base64EncodedCertificate": "<ENCODED_CERT>",
    "certificateBusinessScope": [
      "AIS",
      "PIS"
    ],
    "certificateId": "UKOB",
    "certificateStatus": "active",
    "certificateType": "QSEALC",
    "createdAt": "2022-01-01T00:00:00Z",
    "expiredAt": "2023-02-01T00:00:00Z",
    "regulatoryZone": "UK",
    "updatedAt": "2022-01-01T00:00:00Z"
  }
}
```
