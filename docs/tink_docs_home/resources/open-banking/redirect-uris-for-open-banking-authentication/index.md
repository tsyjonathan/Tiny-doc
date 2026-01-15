---
title: "Redirect URIs for open banking authentication"
source: "/Tiny-doc/tink_docs_home/resources/open-banking/redirect-uris-for-open-banking-authentication/"
exportedAt: "2026-01-13T12:55:05.871Z"
---
A redirect URI (also called callback URI) is used in most open banking authentication flows where an Account Service Payment Service Provider (ASPSP) needs to redirect an end-user after a successful authentication (providers supporting this flow have [authenticationFlow](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/provider) set to `REDIRECT`).

The redirect URI is the second key component in ASPSP enrolment after open-banking certificates. The ASPSP uses the redirect URI to send a code that is required to complete the authentication for each end user.

Most ASPSPs don’t send replies to unregistered URIs, which you can register in Console. When working under the license model "Licensed", you will need to register and configure this URI yourself.

## Integration options[](#integration-options)

There are two main integration options, depending on which URI you decide to configure with the ASPSP: the Tink redirect URI or your own redirect URI.

### Using the Tink redirect URI[](#using-the-tink-redirect-uri)

All you need to do is register `https://api.tink.com/api/v1/credentials/third-party/callback` with ASPSPs.

> **Note**: A small number of ASPSPs validate the redirect URI against the domain in the Common Name (CN) of the eIDAS certificate. Choosing the Tink redirect URI will not work for these ASPSPs.

### Using your own redirect URI[](#using-your-own-redirect-uri)

1.  Register a redirect URI with the ASPSPs that follows the format `your_domain.com/callback`. You can register `redirect_uri` for Tink in [Console](#configure-a-redirect-uri-in-Console).
2.  Implement a reverse proxy server on your redirect URI and configure it to redirect to `https://api.tink.com/api/v1/credentials/third-party/callback`. Keep the method and body the same and return a `307` status. Most ASPSPs will use GET when they redirect, but as Tink accepts both GET and POST. All your proxy needs to do is to preserve the method.
    
    An alternative is to accept the redirect on your redirect URI and then pass the payload in a backend call to the `POST /api/v1/credentials/third-party/callback/relayed` [endpoint](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/credentials/third-party-callback-with-redirect).
    

## Multiple redirect URIs[](#multiple-redirect-uris)

Most ASPSPs allow multiple redirects to be registered.

Tink lets you configure multiple redirects and decide which one to use by specifying the `callbackUri` in the [create](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/credentials/create-credentials) and [refresh credentials](/Tiny-doc/tink_docs_api/api-connectivity-v1/#connectivity-v1/credentials/refresh-credentials) calls.

The URI in the top of the list in Console will be used unless an overriding configuration is made (contact us if you need a specific URI configured for an ASPSP).

> **Note**: Tink does not support multiple redirect URIs for Payments products.

## Configure a redirect URI in Console[](#configure-a-redirect-uri-in-console)

The configuration of the redirect URI is a prerequisite for the PSD2 API registration to ASPSPs. This is particularly important if you plan to use the Dynamic Client Registration (DCR) functionality of the script `tink_secret_utils.py`, as the registration will fail if you have not set a redirect URI for your Tink app.

![Console - App Settings - TPP Credentials](https://images.ctfassets.net/tmqu5vj33f7w/2Ag8zGmBJf6ENyVKRuvcvI/41664183817c789558f596319ddb9bb6/consoe-app-settings-tpp-credentials.png)

To register a redirect URI, navigate to App settings on [Console → App settings → “TPP credentials”](https://console.tink.com/app-settings/tpp-credentials). Select “Set redirect URI” and submit the URI you want to use.

## FAQ[](#faq)

-   From a security perspective, is it better to use my own redirect URIs or Tink URIs? Both options are equally secure. In both cases, the interpretation/authentication of the message payload are done by Tink.
    
-   How does the end user experience differ between using my own redirect URIs and using Tink URIs? The difference is minimal, as the client will spend very little time on each redirect and most users won’t notice the difference in URLs.
