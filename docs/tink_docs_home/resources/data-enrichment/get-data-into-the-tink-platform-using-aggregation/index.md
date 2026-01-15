---
title: "Get data into the Tink platform using Aggregation"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/get-data-into-the-tink-platform-using-aggregation/"
exportedAt: "2026-01-13T12:47:29.137Z"
---
Almost all endpoints that are used by Data Enrichment require permanent users and end-user transaction data. There are two methods to get a user’s transactions to the platform: through Aggregation (which delegates the task of transaction ingestion to Tink if an end-user has given consent) or through manual ingestion by using the Connector API. Select the approach that fits your use case. The aggregation method is presented below. For more information about the manual ingestion by using the Connector API, see [link](/Tiny-doc/tink_docs_home/resources/data-enrichment/get-data-into-the-tink-platform-using-the-connector/).

## Aggregation[](#aggregation)

Aggregation is a process where your end users grant Tink permission to aggregate their accounts and transactions to the Tink platform. This is done through Tink Link, Tink’s front-end SDK for end-user authentication. Using Tink Link, you have access to a ready-made authentication flow by only using a single line of code, for any bank or market.

Aggregation can be done using temporary or permanent users. Temporary users are deleted after 24 hours. For Data Enrichment, permanent users are required. See configuring your application to use Data Enrichment to make sure that everything is set up properly.

This article guides you through steps to create a permanent Tink user and then using Tink Link to aggregate end-user data to that user. The data is then continuously updated without end-user interactions on a time interval that is dependent on a selected bank/provider.

There are caveats to some of these steps and every possible scenario won’t be covered in this article. We encourage you to read the full API references linked throughout the guide if you intend to use this in production.

The steps in this guide:

1.  Create a client access token
2.  Create a user
3.  Create a delegated client code
4.  Create a Tink URL
5.  Redirect a user through the generated Tink Link URL
6.  Managing user consent

### Step 1: Create a client access token[](#step-1-create-a-client-access-token)

The following request authorizes the application by using the client id/secret and requesting a client access token with the user:create and authorization:grant scope permissions. The client access token grants your application access to all endpoints needed for aggregation. The token is valid for 30 minutes.

**Example request:**

```
curl -v -X POST [external url removed] \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=user:create,authorization:grant'
```

**Example response:**

```
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope": "user:create,authorization:grant"
```

For more information, see [complete documentation reference](/Tiny-doc/tink_docs_api/api/#general/oauth/get-access-token).

### Step 2: Create a user[](#step-2-create-a-user)

Use the generated client access token from step 1 to create a new Tink user. Attach and store a unique external user ID to keep a reference to the user. The external user ID is used in later steps. Also add the code for the market that you wish to use. For a list of market codes, see [Markets](/Tiny-doc/tink_docs_home/resources/transactions/transactions-sdk-reference/#markets).

**Example request:**

```
curl -v -X POST [external url removed] \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '
    {
      "external_user_id": "user_123_abc",
      "market": "GB", 
    }
  '
```

**Example response:**

```
{
  "external_user_id": "user_123_abc",
  "user_id": "THE_CREATED_USER_ID"
}
```

For more information, see [complete documentation reference](/Tiny-doc/tink_docs_api/api/#general/user/create-user).

### Step 3: Create a delegated client code[](#step-3-create-a-delegated-client-code)

Use the generated client access token from step 1 and the external user ID from step 2 to create a delegated client code. This code is used by Tink Link to act on behalf of your application (to ingest end-user data to your Tink application, for example). Some additional fields also needs to be specified:

|  |  |
| --- | --- |
| external\_user\_id | The external user ID of the Tink user that should be connected to the end-user’s data |
| actor\_client\_id | The ID of the actor client that is allowed to use the delegated client token we generate in step 3 (this step). In this case, the actor client is Tink Link, and the field should be hard coded to ‘df05e4b379934cd09963197cc855bfe9', which is the client ID for TInk Link. |
| id\_hint | This is presented to the end-user in the Tink Link flow. You can use any arbitrary string value that is recognizable to the end user, such as the end user's full name or email address. id\_hint is used to verify the identity of the user and to prevent URL spoofing attacks. |
| scope | The scopes that are granted to Tink Link within your application. The scopes present in the example is what is needed for aggregation. |

**Example request:**

```
curl -v -X POST [external url removed] \
-H 'Authorization: Bearer ' \
-d 'external_user_id='\
-d 'actor_client_id=df05e4b379934cd09963197cc855bfe9' \
-d 'id_hint={End user name/username}\
-d 'scope=authorization:read,authorization:grant,credentials:refresh,credentials:read,credentials:write,providers:read,user:read'
```

**Example response:**

```
{
  "code": "{DELEGATED_CLIENT_CODE}"
}
```

For more information, see [complete documentation reference](/Tiny-doc/tink_docs_api/api/#general/user/create-user).

### Step 4: Create a Tink Link URL[](#step-4-create-a-tink-link-url)

In this step we’re going to construct the Tink Link URL by using the delegated client code that was created in step 3. The URL can be broken into three parts: a base URL, an endpoint, and a set of query parameters that configures the URL.

In this article we focus on the minimal amount of query parameters that are needed to configure the Tink Link URL for aggregation.

Here’s an example Tink Link URL:

`[external url removed]

To break down the URL, we have the base URL, [external url removed] followed by a specific endpoint for transaction and account aggregation, transactions/connect-accounts, followed by the minimal set of query parameters:

| Header | Header |
| --- | --- |
| authorization\_code | The delegated client code generated in step 3. It encodes the reference to the user as well as the scopes that are granted to the Tink Link URL. |
| client\_id | The client ID of your application. ​​To see your client ID, open Console and go to \[your\_app\] > App settings > API Client. |
| redirect\_uri | The URL to which the end user gets redirected after a completed or failed authentication by the end user. |
| market | Market/country code for which providers/banks should be available for the end user to authenticate towards/aggregate data. For example, GB for Great Britain. For a list of market codes, see [Markets](/Tiny-doc/tink_docs_home/resources/transactions/transactions-sdk-reference/#markets). |
| locale | Locale for end-user facing text. For example, en\_US for English. For a list of locale codes, see [Locales](/Tiny-doc/tink_docs_home/resources/transactions/transactions-sdk-reference/#locales). |

For more information, see [complete documentation reference](/Tiny-doc/tink_docs_home/resources/transactions/transactions-sdk-reference/#continuous-access-connect-accounts).

### Step 5: Redirect a user through the generated Tink Link URL[](#step-5-redirect-a-user-through-the-generated-tink-link-url)

How to do this varies depending on if you’re building a web, Android, or iOS application. In a web application a simple: window.location.replace `{YOUR_GENERATED_TINK_LINK_URL}` could suffice.

When end users access a Tink Link URL, through the web browser or an iOS/Android SDK implementation, they will see a list of banks/providers. Once they select a bank/provider they will be forwarded to that specific bank/provider’s authentication flow. When the authentication flow is completed, both for successes and failures, the end user is redirected to the redirect URL that’s specified in the Tink Link URL query parameters.

Meanwhile, in the background, if the authentication was successful, the user’s transactions and selected accounts will be aggregated into Tink’s platform and connected to the Tink user encoded in the authorization\_code.

*Image removed: transactions-flow-example*

Depending if the authentication was successful or not, Tink Link will append a set of different query parameters to the redirect URL for you to handle. In this guide, we will focus on what happens on a successful authentication attempt. Take a look at our complete documentation reference to see all possible outcomes.

On success, the your redirect URL will be called as follows:

```
{REDIRECT_URL}?credentials_id={ID} 
```

The credentials\_id is a reference to the consent that the end-user has given. The consent is also an object that’s connected to the user stored on the Tink Platform which must be updated over time. The next section will briefly cover consents, but if you just want to aggregate data to try it out, you can end the guide here.

To double-check that the data has been aggregated correctly, see the generating a user token and querying end-user data article.

### Step 6: Manage user consent[](#step-6-manage-user-consent)

Because of data regulations, user consent is not valid forever. To keep refreshing data in the background, the consent will need to be updated over time. How often the consent needs to be updated is dependent on which bank/provider the end-user has authenticated.

Update the consent by going through the same process as in steps 2-3, but with a slightly different Tink Link URL:

```
[external url removed]
```

The difference between this and the previous URL that you set up in step 4 is that the endpoint has changed to `transactions/update-consent` and we’ve added the credential\_id parameter. More query parameters can be used to configure the URL, take a look here if you are interested.

You can keep track of a user’s consents either by querying the consent endpoints, or by setting up webhooks, see the following references:

-   [Managing user consents](/Tiny-doc/tink_docs_home/resources/transactions/managing-consents/)
-   [Provider consent API docs](/Tiny-doc/tink_docs_api/api/#connectivity/provider-consent/list-provider-consents)
-   [Setting up webhooks for your application](/Tiny-doc/tink_docs_home/resources/api-setup/webhooks/)
