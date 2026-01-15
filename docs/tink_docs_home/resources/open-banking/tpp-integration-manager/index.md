---
title: "TPP integration manager - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/open-banking/tpp-integration-manager/"
exportedAt: "2026-01-13T12:55:03.918Z"
---
Tink provides a Python script, `tink_secret_utils.py`, to securely share open banking certificates, private keys, and PSD2 registration credentials (often called "TPP credentials"), between Tink customers (TPPs) and Tink.

The `tink_secret_utils.py` script securely manages sensitive files by encrypting the private key before uploading and storing it. This ensures that the unencrypted private key remains inaccessible and protected.

> To get the script, create a technical support ticket and select the eIDAS registration and rotation option (recommended), or reach out to your Tink contact.

## Getting started with the tool[](#getting-started-with-the-tool)

You can get information how to use the tool and view help messages by running the following command:

Using the tool’s help command

```
python tink_secret_utils.py -h 
```

Use the `-h` flag with specific command groups or options for detailed assistance. For example:

Using the help command for command groups

```
python tink_secret_utils.py certificates –h 
python tink_secret_utils.py certificates get –h 
```

## Authentication parameters[](#authentication-parameters)

To execute any command, you must provide the client ID and client secret associated with your app by passing them to --client-id and --client-secret. You can find these in the App settings section in Console under API client > App details.

For added security, we recommend creating a temporary client secret specifically for this script and deleting it when it’s finished. For more details, see [Access your API credentials](/Tiny-doc/tink_docs_home/resources/console/set-up-your-tink-account/#access-your-api-credentials).

## Main commands[](#main-commands)

### First-time certificate installation[](#first-time-certificate-installation)

Use this command when installing certificates to an app that doesn’t have any active certificates. It will install the new certificate and immediately activate it in your production environment.

> **Important:** Use this option with caution and avoid using it for apps with live production traffic, as it may cause disruptions.

First-time certificate installation

```
python tink_secret_utils.py certificates encrypt-and-upload \
--certificate  \
--private-key  \
--certificate-type  \
--regulatory-zone  \
api-gateway --cluster oxford --environment production \
oauth2 --client-id  \
--client-secret  \
```

### Updating certificates[](#updating-certificates)

Use the `encrypt-and-upload-spare` option to upload a new certificate in an inactive state. This ensures that your production traffic remains unaffected. We recommend using this command for a certificate renewal, especially for apps with live traffic.

Updating certificates

```
python tink_secret_utils.py certificates encrypt-and-upload-spare \
--certificate 
--private-key 
--certificate-type  \
--regulatory-zone  \
api-gateway --cluster oxford --environment production \
oauth2 --client-id  \
--client-secret 
```
