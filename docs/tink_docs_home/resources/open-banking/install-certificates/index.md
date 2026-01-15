---
title: "Install certificates - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/open-banking/install-certificates/"
exportedAt: "2026-01-13T12:54:59.621Z"
---
After you’ve acquired your eIDAS certificates, it’s time to install them. If you don't have certificates, you'll need to get them first.

-   [Learn how to get EU certificates](/Tiny-doc/tink_docs_home/resources/open-banking/get-eu-certificates/)
-   [Learn how to get UK certificates](/Tiny-doc/tink_docs_home/resources/open-banking/get-uk-certificates/)

## Differences between EU and UK certificates[](#differences-between-eu-and-uk-certificates)

EU and UK certificates differ in both their issuing authorities and their scope of use.

### EU certificates[](#eu-certificates)

In the EU, PSD2 certificates are issued by Qualified Trust Service Providers (QTSPs) under the eIDAS regulation. These include Qualified Certificates for Website Authentication (QWACs) for secure website communication and Qualified Certificates for Electronic Seals (QSealCs) for signing and ensuring data integrity.

### UK certificiates[](#uk-certificiates)

UK certificates are issued solely by the Open Banking Implementation Entity (OBIE) and include OBWACs and OBSealCs, which serve similar technical functions but are only valid for UK-based Account Servicing Payments Service Providers (ASPSPs).

> **Note:** Only QWAC and QSealC certificates are accepted and considered compliant within the EU.

## Install certificates with the Python script[](#install-certificates-with-the-python-script)

You’ll install certificates with the help of our Python script, `tink_secret_utils.py`. For details on the tool and instructions on how to get it, see [TPP Integration Tool](/Tiny-doc/tink_docs_home/resources/open-banking/tpp-integration-manager/).

With the full certificate chain saved in a `.pem` file, the private key in a `.key` file, and the latest versions of our Python tool and OpenSSL installed, you're ready to begin.

The structure your certificate file’s contents, including the full certificate chain, should look like the example below:

Example certificate file contents

```
-----BEGIN CERTIFICATE----- 
leaf certificate 
-----END CERTIFICATE----- 

-----BEGIN CERTIFICATE----- 
intermediate certificate 
-----END CERTIFICATE----- 

-----BEGIN CERTIFICATE----- 
rootCa certificate 
-----END CERTIFICATE----- 
```

### Good to know before using the script[](#good-to-know-before-using-the-script)

To execute any command, you must provide the client ID and client secret associated with your app by passing them to `--client-id` and `--client-secret`. You can find these in the App settings section in Console under **API client > App details**.

The `--certificate-type` parameter accepts either `qwac`or `qsealc`. If you're uploading both certificate types, run the command separately for each.

For added security, we recommend creating a temporary client secret specifically for this script and deleting it when it’s finished. For more details, see [Access your API credentials](/Tiny-doc/tink_docs_home/resources/console/set-up-your-tink-account/#access-your-api-credentials).

> **Note:** Operations performed using the Python script are highly sensitive and may affect your Tink production applications. To ensure stability and minimise risk, we strongly recommend notifying your primary Tink contact before making any production changes involving certificates or TPP credentials.

### First-time certificate installation[](#first-time-certificate-installation)

To upload certificates to an app with no certificates, run the following command:

Upload first certificates

```
python tink_secret_utils.py certificates encrypt-and-upload \
--certificate  \
--private-key  \
--certificate-type  \
--regulatory-zone  \
api-gateway --cluster oxford --environment production \
oauth2 --client-id  \
--client-secret  
```

When the certificate is successfully installed, the script will display the following output:

Successful installation output

```
200 OK 
200 OK 
Encrypting and uploading spare certificate and private key 
200 OK 
```

### Update certificates[](#update-certificates)

When uploading new certificates to an app that already has certificates, use the encrypt-and-upload-spare option.

To update certificates, run the following command:

Update certificates

```
python tink_secret_utils.py certificates encrypt-and-upload-spare \
--certificate  \
--private-key  \
--certificate-type  \
--regulatory-zone  \
api-gateway --cluster oxford --environment production \
oauth2 --client-id  \
--client-secret 
```

When the certificate is successfully installed, the script will display the following output:

Successful installation output

```
200 OK 
200 OK 
Encrypting and uploading spare certificate and private key 
200 OK 
```

## Verify certificate installation[](#verify-certificate-installation)

To view all your active certificates, log in to Console and select the “eIDAS” tab under **App Settings**.

If you used the `encrypt-and-upload-spare` option, the new certificates will be uploaded in an inactive status and will not be visible in Console. To verify that these certificates have been uploaded correctly, use the following command:

Verify installation

```
python tink_secret_utils.py certificates get --certificate-status inactive \  
--regulatory-zone  \
--certificate-type  \
api-gateway --cluster oxford --environment production \
oauth2 --client-id  \
--client-secret 
```

## Common errors[](#common-errors)

### “Only one certificate is found in the certificate chain”[](#only-one-certificate-is-found-in-the-certificate-chain-)

Ensure that the `.pem` file you are uploading includes the complete certificate chain, which consists of the leaf, intermediate, and root certificates. Verify that the certificates are arranged in the correct sequence. If the certificate is directly trusted by the root, the intermediate CA is unnecessary.

### “Unable to load Private Key”[](#unable-to-load-private-key-)

Ensure that the private key is created with RSA algorithm. You can verify this by running the command:

Verify the certificate

```
openssl rsa -check -noout -in path-to-key.key 
```

In addition, confirm that the file content has the following structure:

```
-----BEGIN RSA PRIVATE KEY----- 
...key contents 
-----END RSA PRIVATE KEY----- 
```
