---
title: "How to connect to banks using Tink Link"
source: "/Tiny-doc/tink_docs_home/resources/getting-started/connect-tink-link/"
exportedAt: "2026-01-13T12:55:56.877Z"
---
## Step-by-step guide[](#step-by-step-guide)

To make sure end users have an easy, secure and fast way to authenticate towards banks, we’re providing you with Tink Link, our front-end SDK for end-user authentication. Using Tink Link, you have access to a ready-made authentication flow with a single line of code - regardless of bank or market

![Tink Link](https://cdn.tink.se/dev-center-assets/images/tink-link-mockups.jpg)

## Create an authentication link[](#create-an-authentication-link)

Tink Link can be integrated into your app by redirecting to a URL.

Click on the **aggregation tab** in the Tink Console and go to **Tink Link**. You’ll then be presented with a **build your own authentication link** wizard. From the dropdown options, choose the right **market** for your product, and the **language** you want your product to appear in. Also choose a **redirect URI** where Tink Link will redirect when the authentication is done. By default, all new Console accounts have two pre-configured redirect URIs, but you can add more under **app settings**. You’ll also see a list of scope options. Make sure to select scopes based on the type of data you want to fetch.

In the very bottom section, a URL should have been created. Click on the **Copy URL** button.

Now you have a Tink Link that you can start working with.

> **NOTE**: If you don’t want to use your real bank credentials while building, you can enable the **Use test providers only** option which appears under the list of scopes. If you need more information about testing with Tink, you can find it [here](/Tiny-doc/tink_docs_home/resources/aggregation/use-test-providers/).

### Customize Tink Link[](#customize-tink-link)

It’s possible to streamline the authentication flow using [optional Tink Link parameters](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-api-reference-account-aggregation/#request-parameters). For example, you can direct users immediately to a specific provider instead of letting them choose from a list. The Tink Link parameters are appended as URL parameters in the Tink Link URL, such as `&input_provider=uk-americanexpress-password`.

## Authenticate yourself[](#authenticate-yourself)

You can now authenticate yourself towards any of the many banks and financial institutions that Tink supports. Use regular bank credentials to securely connect to a bank and retrieve financial data.

![Tink Link authentication](https://cdn.tink.se/dev-center-assets/images/tink-link-authentication.gif)

On a successful authentication, your browser should redirect you to the `redirect_uri` you specified in your Tink Link URL. It should contain an authorization `code`, and your browser URL window will contain a URL similar to: `{redirect_uri}/?code={YOUR_USER_AUTHORIZATION_CODE}`.

> **NOTE**: if you have not set up a local web server on this `redirect_uri`, the browser will show a "not found" message. This is absolutely fine, since you will only have to care about the code for now and copy it from the URL.

Once you have received the authorization `code`, you can [exchange](/Tiny-doc/tink_docs_home/resources/getting-started/retrieve-access-token/) it for an `access_token`.

## Using Tink Link on iOS[](#using-tink-link-on-ios)

Make sure to read our [Tink Link iOS tutorial](/Tiny-doc/tink_docs_home/resources/tutorials/tink-link-ios/) if you are integrating Tink Link inside an iOS app to correctly handle all the different authentication methods and redirect scenarios supported by Tink Link.
