---
title: "Receive webhook events using Mutual TLS authentication"
source: "/Tiny-doc/tink_docs_home/resources/api-setup/receive-webhook-events-using-mutual-tls-authentication/"
exportedAt: "2026-01-13T13:00:01.317Z"
---
Mutual TLS authentication (abbreviated mTLS or TLS MA), is a part of the TLS handshake protocol for performing certificate-based authentication of the client. Regular TLS only authenticates the server, but mTLS authenticates both the server and client, by each party proving possession of their mutually approved key material.

Tink's webhook service will automatically authenticate itself using its key material when prompted by the receiving server. To configure your servers to do this, find out how to enable mTLS in the software for your servers that are receiving webhook events. Ensure that your application trusts the following DigiCert root certificates:

-   DigiCert Global Root CA
-   DigiCert Global Root G2
-   DigiCert TLS ECC P384 Root G5
-   DigiCert TLS RSA4096 Root G5
-   DigiCert Client ECC P384 Root G5
-   DigiCert Client RSA4096 Root G5
-   DigiCert ECC P384 Root G5
-   DigiCert RSA4096 Root G5

Tink's webhook service provides both its own client certificate and DigiCert's intermediate CA certificates, allowing you to verify the full certificate chain using only DigiCert's root certificate.

To then narrow down the DigiCert-issued certificates to the one issued specifically to Tink, your server **must** also validate that the incoming client certificate contains at least one of these X.509 certificate attributes:

-   Subject: `C=SE, L=Stockholm, O=Tink AB, CN=api.tink.com`
-   Subject Alternative Name: `DNS:api.tink.com`
