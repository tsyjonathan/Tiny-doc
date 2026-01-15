---
title: "User Match - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/account-check/user-match/"
exportedAt: "2026-01-13T12:44:04.596Z"
---
## What is User Match?[](#what-is-user-match-)

User Match is an Account Check feature that reduces exposure to fraud by matching the user’s name on file with the account holder's name on the connected bank account. From underwriting and compliance to payouts and direct debit, ensure customers are who they say they are with User Match.

User Match enables you to provide the name of the user on file before the Account Check flow. Tink uses a name matching algorithm to match the name of the user with each holder name retrieved from the connected account. Based on the input, Tink provides a result that falls into one of the following categories that represent the strength of the match: 'Exact match', 'Close Match', 'Possible Match', 'No Match'. The result will be returned in the Account Check report automatically if opted in and integrated with the feature.

**User Match benefits**

-   **Data you can trust**: Ensure customers are who they say they are by matching data straight from their bank account.
-   **Immediate verification**: Real-time match responses ensure a fast and seamless verification process.
-   **Built in security**: No need to develop your own matching algorithm; User Match handles different name formats retrieved from banks.

User Match is currently live in Germany and Austria, with further market expansion to come.

### How it works[](#how-it-works)

User Match uses two sources of names and compares them to determine if they logically match.

-   Customer provided information: the name provided by the customer
-   Provider (financial institution) captured information: Names retrieved during the Account Check flow from the connected bank.

Tink’s matching algorithm compares these names and returns one of the following results based on the similarity of the user information (see recommendations for how to interpret the results below):

-   Exact Match
-   Close Match
-   Possible Match
-   No Match

Once the match results have been generated, Tink returns the data in the Account Check report without impacting the user journey.

### How to implement User Match[](#how-to-implement-user-match)

To use User Match, you’ll need to pass your user’s name to Tink in a session before initiating the Account Check flow.

A session can be created using the POST /link/v1/session endpoint. The request must be authenticated using a  [client access token](/Tiny-doc/tink_docs_home/resources/getting-started/get-access-token/) 

#### 1\. Authenticate with client access token[](#authenticate-with-client-access-token)

To access Tink APIs to create session and to access your user's account information, you need a valid client access token with account-verification-reports:read and link-session:write  scopes.

**Note**: access tokens expire and must be renewed, typically in 30 minutes.

**cURL example**

```
curl -X POST [external url removed] \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=account-verification-reports:read, link-session:write'
```

**Response**: Access Token Response for a client which expires after 15mins (no refresh token provided, use the same endpoint again to get a new access token). Please note that this token must also be kept a secret and not exposed to any public client.

**Response example:**

```
{
  "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope": " account-verification-reports:read, link-session:write"
}
```

#### 2\. Create a session[](#create-a-session)

A session can be created using the POST /link/v1/session endpoint. The request must be authenticated using a [client access token](/Tiny-doc/tink_docs_home/resources/getting-started/get-access-token/) and contain the link-session:write scope.

With the CLIENT\_ACCESS\_TOKEN you can now create a session by calling the [session endpoint](/Tiny-doc/tink_docs_api/api/#general/tink-link/session).

Example of a session request: **cURL example**

```
curl -X POST [external url removed] \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{"user": {"firstName": "firstName", "lastName": "lastName"}}'
```

**Response example:**

```
HTTP/1.1 200 OK
Content-Type: application/json
{
  "sessionId": "{SESSION_ID}"
}
```

#### 3\. Initiate Tink Link with a session[](#initiate-tink-link-with-a-session)

In Console, use the Build your own Tink Link URL view to create your own URL. The URL is used to allow users to authenticate with their bank and select an account from which to fetch report data. For more information on how the URL works, [see Setup and integrate Account Check](/Tiny-doc/tink_docs_home/resources/account-check/setup-and-integrate-account-check/).

Integrate the URL with a site or in an app. For example, you can start an end user's Tink flow by redirecting them to a URL.

**Use the URL**

Use the example URL below by inserting the client\_id value for your Tink app into the URL and then copy the URL and paste it in a browser address field.

In case of errors during the flow to include user match, the Account Check flow will still complete successfully with a report Id generated and the Account Check Report will not include the user match results.

```
[external url removed]
```

**Note**: make sure that you exchange {YOUR\_CLIENT\_ID}  and {SESSION\_ID} in the URL for your client\_id value and the session\_id you received from the session API call.

*Image removed: Account check account selection*

#### 4\. Fetch the report[](#fetch-the-report)

**In JSON**

To fetch report JSON data based on a report identifier, see the [Account Verification Report API](/Tiny-doc/tink_docs_api/api/#data-v1/account-verification).

**cURL example**

Fetch your Account Check report in JSON

```
curl -X GET [external url removed] \
  -H 'Authorization: Bearer '
```

**Note**: the report will only contain data from one provider, which is the bank that the end user has selected. The list of accounts will contain only one account, because it's the account that the end user has selected.

### User flow[](#user-flow)

*Image removed: User Match service diagram*

### Match results[](#match-results)

**Illustrations of match results**

| Match result | Explanation | Example |
| --- | --- | --- |
| Exact match | The highest level of match, e.g. the first and last names from the two sources are identical. | Maximilian Mustermann, Maximilian Mustermann |
| Close match | The names are not identical but very similar, e.g. the provided name from the customer closely resembles the value name returned by the bank, but there could be some minor variations in for instance spelling, abbreviations or nicknames. | Maximilian Mustermann, Max Mustermann |
| Possible match | The names have some similarities, but also some differences, e.g. if only the last name matches. | Maximilian Mustermann, Weichmut Mustermann |
| No match | The lowest level of match, e.g. the names from the two sources do not match at all. | Maximilian Mustermann, Helena Musterfrau |

### API Response Example: Account Check Report with User Match included[](#api-response-example-account-check-report-with-user-match-included)

**Response Example**

```
{ 
"created": 1455740874875, 
  "externalReference": "ext-abc-123", 
  "id": "6e68cc6287704273984567b3300c5822", 
  "userDataByProvider": [ 
    { 
      "accounts": [ 
        { 
          "accountIdentifiers": { 
            "iban": { 
              "iban": "21000813610123456789", 
              "iban": "DE8921000813610123456789" 
            }, 
          "accountNumber": "1234-123456789", 
          "accountType": "SAVINGS", 
          "commercialName": "Commercial name", 
          "currencyCode": "EUR", 
          "holderName": "John Doe", 
          "iban": "DE8921000813610123456789", 
          "id": "a6bb87e57a8c4dd4874b241471a2b9e8", 
          "parties": [ 
            { 
              "identity": { 
              "name": "John Doe", 
              "ssn": "19670220-1234" 
            }, 
            "role": "HOLDER" 
            }, 
            { 
            "identity": { 
                "name": "Jane Doe", 
                "ssn": "19670220-5432" 
              }, 
              "role": "HOLDER" 
            } 
          ], 
          "nameMatching": {
            "name": "John Doe",
            "matchingResult": "EXACT_MATCH"
          }
       }
   ],
   "providerName": "de-bank-oauth", 
   "updated": 1455740124123
}
```

### How are joint accounts handled?[](#how-are-joint-accounts-handled-)

Tink checks any name you provide against the names of all account holders linked to the account and returns a match for the account holder with the highest match score.

Example:

User Name:

-   First name: Max
-   Last name: Mustermann

Holder Names:

-   Holder name 1: Herr Maximilian von Mustermann
-   Holder name 2: Frau Isabella Mia König-Mustermann

**Response Example**

```
"name_matching": { 
    "name": "Max Mustermann", 
    "name_match_result": "CLOSE_MATCH" 
} 
```

### How are names with two last names handled?[](#how-are-names-with-two-last-names-handled-)

In some countries, such as Germany, it’s common to have two last names. In these cases, it is sufficient for one of the last names to match for a positive result.

Example:

User Name:

-   First name: Felix
-   Last name: Fröhlich

Holder Name:

-   Felix Lukas Fröhlich-Braun

Result: **Response Example**

```
"name_matching": { 
    "name": "Felix Fröhlich", 
    "name_match_result": "EXACT_MATCH" 
} 
```
