---
title: "Set up your Tink Console account"
source: "/Tiny-doc/tink_docs_home/resources/getting-started/set-up-your-account/"
exportedAt: "2026-01-13T12:56:28.532Z"
---
Tink Console is where you create, configure, and manage your apps. It's also the place where you find analytics.

## Create and verify a Console account[](#create-and-verify-a-console-account)

To get started, sign up for a Console account. When you've signed up, open the email we've sent you. Use the link in the email to verify your account and then log in to Console.

## Product availability[](#product-availability)

By default, all our products are available to test in our sandbox environment. You can access it by creating a sandbox app.

When you’re ready to create a production app, contact sales or reach out to your Tink contact. After you've gone through the Know Your Business process, we'll create and configure the app for you.

## What is an app?[](#what-is-an-app-)

An app is a data bucket and security concept in the Tink platform. An app allows you to gather multiple users and their data, and access the data with a set of keys. Our recommended app setup is as follows:

-   **Sandbox app**: Sandbox apps allow you to perform tests by only using test credentials and test data. Create one sandbox app per product, which you can use with our [Demo Bank](/Tiny-doc/tink_docs_home/resources/console/demo-bank/) feature.
-   **Pre-production app** (optional): Many developers like to run tests using real credentials. For example, they might use their own or a colleague's bank credentials to test their Tink integration's end-user experience. In this case, we suggest creating a production app and giving it a name that clearly shows it's a pre-production app. This allows you to separate test and production data.
-   **Production app**: Production apps only connect with live banks and allow you to store real end-user data. This is the app you should use once you’ve tried and tested your integration and are ready to go live.

## Create your first app[](#create-your-first-app)

To get started, we encourage you to create a sandbox app to test the products you're interested in.

Your app settings are available after you've created your first app.

> **Note**: once an app is created, you can’t change its app type.

To create your first app:

1.  Log in to Console.
2.  Select **Create your first sandbox app**.  
    *Image removed: Create Sandbox App *  
    The **Create sandbox app** modal appears.  
    *Image removed: Create Sandbox App Modal*
3.  Enter an **App name**. This name is only available to other Console users who are part of your organization. This name can be changed later.
4.  Enter a **Display name (public)**. This name is seen by your customers as part of the Tink flow. This name **can't** be changed later.
5.  Select **Create app**.

Your app is now created and ready to configure.

## Access your API credentials[](#access-your-api-credentials)

Your API credentials are used to authenticate your app with the Tink API. This is how you find your credentials.

*Image removed: set-up-your-tink-console-account-02*

Your API credentials are found in \[**your\_app**\] > **App settings** > **API client**.

In this view, there are two important keys:

-   `client_id`: this is the unique ID for your app. This key is public and is instantly available once you create an app.
-   `client_secret`: this is a secret key for your app. This key authenticates your app with the Tink API. Handle it confidentially. You can create up to five secrets, which you can revoke at any time. Client secrets don't exist by default, so you must create them.

### Create a client secret[](#create-a-client-secret)

1.  Log in to Console.
2.  From the top dropdown menu, select an app.
3.  Select **App settings**.
4.  Select the **API client** tab.
5.  Select **Create new client secret**.
6.  Enter your Console account password.
7.  Select **Create**.
    
    Your new client secret key is displayed.
    
8.  Copy your new secret and store it in a secure location as it can't be revealed later.
