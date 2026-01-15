---
title: "Tink Docs"
source: "/Tiny-doc/tink_docs_api/api-general/"
exportedAt: "2026-01-13T13:02:13.743Z"
---
## General v1[](/Tiny-doc/tink_docs_api/api-general/)

The General section contains resources that are used by different products.

| Resource | Products |
| --- | --- |
| Calendar | Money Manager |
| Category | Transactions, Business Transactions, Data Enrichment, Money Manager, Account Aggregation |
| Monitoring | Tink platform |
| OAuth | All products |
| Reports Generation Jobs | Expense Check, Income Check, Risk Insights |
| Tink Link Session | All products |
| User | All products |
| Version | Tink platform |

## Calendar[](#general/calendar)

API data is periodized into pre-computed and date-based buckets. Use the Calendar endpoint to get or query data from a period of time. For more information on periods for Money Manager, see the [Configure periods](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/configure-periods/) article.

### The Calendar model[](#general/calendar/the-calendar-model)

endDate `Date`

Timestamp at the end of the period

name `string`

resolution `string`

Resolution for the statistics.  
Values: `MONTHLY`, `MONTHLY_ADJUSTED`

startDate `Date`

Timestamp at the start of the period

## Get period details[](#general/calendar/get-period-details)

`GET /api/v1/calendar/periods/{period}`

Get details for the supplied period. Will always return one of the monthly resolutions.

### Works with[](#general/calendar/get-period-details/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `calendar:read` |

### Parameters[](#general/calendar/get-period-details/parameters)

| Parameter | Description |
| --- | --- |
| periodrequired | Period to get details for  
Values: `YYYY`, `YYYY-MM`, `YYYY-MM-DD` |

> Response Example

```
[
  {
    "endDate": 1464739199000,
    "name": "2016-05",
    "resolution": "MONTHLY",
    "startDate": 1462060800000
  }
]
```

### Response: array\[[Calendar](#tag-calendar)\][](#general/calendar/get-period-details/response-array-calendar-)

API data is periodized into pre-computed and date-based buckets. Use the Calendar endpoint to get or query data from a period of time. For more information on periods for Money Manager, see the [Configure periods](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/configure-periods/) article.

See [Calendar](#tag-calendar) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | The periods were successfully returned. |
| 400 | The period format is invalid. |

## Query Period details[](#general/calendar/query-period-details)

`GET /api/v1/calendar/periods`

Get a list of detailed periods from a given start period to an end period. Will always return one of the monthly resolutions.

### Works with[](#general/calendar/query-period-details/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `calendar:read` |

### Query Parameters[](#general/calendar/query-period-details/query-parameters)

| Parameter | Description |
| --- | --- |
| period\_gterequired | Date inside the start period. No greater than 10 years.  
Values: `YYYY-MM-DD` |
| period\_lterequired | Date inside the end period. No later than 10 years.  
Values: `YYYY-MM-DD` |

> Response Example

```
[
  {
    "endDate": 1464739199000,
    "name": "2016-05",
    "resolution": "MONTHLY",
    "startDate": 1462060800000
  }
]
```

### Response: array\[[Calendar](#tag-calendar)\][](#general/calendar/query-period-details/response-array-calendar-)

API data is periodized into pre-computed and date-based buckets. Use the Calendar endpoint to get or query data from a period of time. For more information on periods for Money Manager, see the [Configure periods](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/configure-periods/) article.

See [Calendar](#tag-calendar) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | The periods were successfully returned. |
| 400 | A period query parameter format is invalid or period\_gte is after period\_lte or it is out of range. |

## Category[](#general/category)

Categories are used for categorization of transactions. They are structured as a category tree, and are available as a flat list of categories with parent/child relationships using their id and parent fields. Category information is used for pre-computed statistics, making aggregated spending and income data available for all the different nodes in the category tree. However, a transaction itself, can only be assigned to a leaf category. Both the `INCOME` and `EXPENSES` categories represent users' regular income and spending, while the `TRANSFER` categories are special in the sense that they represent transfers between accounts (potentially across banks), such as regular bank transfers,credit-card payments, mortgage amortizations and other transactions that should not add to the users' actual spending.

### The Category model[](#general/category/the-category-model)

code `string` required

Machine readable category code.

defaultChild `boolean` required

Indicates if this is the default child to be used when categorizing to a primary level category.

id `string` required

The internal identifier of the category, referenced by e.g. a transaction.

parent `string`

The parent internal identifier of this category, or null.

primaryName `string`

The primary name of this category.

searchTerms `string`

Used by the search engine to find transactions with this category.

secondaryName `string`

The secondary name of this category.

sortOrder `integer` required

Sort order for nicer display for the user.

type `string` required

Type of the category.  
Values: `INCOME`, `EXPENSES`, `TRANSFERS`, `UNKNOWN`

typeName `string` required

Type name of the category.

## List categories[](#general/category/list-categories)

`GET /api/v1/categories`

**The _user:read_ scope is necessary for authenticated requests.**

Returns all categories corresponding to a specified locale. The locale is determined based on the authenticated user. If there's no authenticated user, the locale will be based on the query parameter. In the absence of both an authenticated user and a query parameter, a default locale will be used. Please note that the category IDs are returned as UUIDs without any dashes.

### Works with[](#general/category/list-categories/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `user:read` |
| Client token | `user:read` |

### Query Parameters[](#general/category/list-categories/query-parameters)

| Parameter | Description |
| --- | --- |
| locale | The locale for which to fetch categories. |

> Response Example

```
[
  {
    "code": "expenses:food.restaurants",
    "defaultChild": false,
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "parent": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "primaryName": "Food & Drinks",
    "searchTerms": "food,lunch,snacks",
    "secondaryName": "Restaurants",
    "sortOrder": 45,
    "type": "EXPENSES",
    "typeName": "Expenses"
  }
]
```

### Response: array\[[Category](#tag-category)\][](#general/category/list-categories/response-array-category-)

Categories are used for categorization of transactions. They are structured as a category tree, and are available as a flat list of categories with parent/child relationships using their id and parent fields. Category information is used for pre-computed statistics, making aggregated spending and income data available for all the different nodes in the category tree. However, a transaction itself, can only be assigned to a leaf category. Both the `INCOME` and `EXPENSES` categories represent users' regular income and spending, while the `TRANSFER` categories are special in the sense that they represent transfers between accounts (potentially across banks), such as regular bank transfers,credit-card payments, mortgage amortizations and other transactions that should not add to the users' actual spending.

See [Category](#tag-category) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | The categories were successfully returned. |
| 400 | The payload does not pass validation. |
| 401 | If the user is not authorized. |

## OAuth[](#general/oauth)

`POST /api/v1/oauth/authorization-grant`

Creates a scoped authorization code for a user.

### Works with[](#general/oauth/create-authorization/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `authorization:grant` |

### Form Parameters[](#general/oauth/create-authorization/form-parameters)

| Parameter | Description |
| --- | --- |
| user\_id | User ID. Cannot be specified at the same time as `external_user_id`. |
| external\_user\_id | External user ID set by client on user creation. Cannot be specified at the same time as `user_id`. |
| scoperequired | Scope of access. The scope doesn't need to be present on the access token used when calling this endpoint. |

> Form Request Example `NOTE: This data is sent as application/x-www-form-urlencoded, but shown here in json for brevity.`

```
{
  "external_user_id": "user_123_abc",
  "scope": "accounts:read,transactions:read",
  "user_id": "256ae77fcbda4bc2b8d0ba94d9c3423c"
}
```

> Response Example

```
{
  "code": "c50cd6960a6f44ffb701ef60fafa7761"
}
```

### Response: OAuth2AuthorizeResponse[](#general/oauth/create-authorization/response-oauth2authorizeresponse)

code `string` required

Authorization code which is single-use only and short-lived. It should be treated as opaque (no defined format).

## Create delegated authorization[](#general/oauth/create-delegated-authorization)

`POST /api/v1/oauth/authorization-grant/delegate`

Creates a delegated scoped authorization code for a user. The difference between this and `authorization-grant` is that this endpoint allows the client to specify an actor client that is allowed to use the authorization code. This is useful when a client wants to delegate access to another client.

### Works with[](#general/oauth/create-delegated-authorization/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `authorization:grant` |

### Form Parameters[](#general/oauth/create-delegated-authorization/form-parameters)

| Parameter | Description |
| --- | --- |
| user\_id | User ID. Cannot be specified at the same time as `external_user_id`. |
| external\_user\_id | External user ID set by client on user creation. Cannot be specified at the same time as `user_id`. |
| id\_hintrequired | Human-readable information about the end-user that the actor client is authorized access to. If using Tink Link with permanent users, this will be presented to the end-user in Tink Link, to be able to verify the identity of the actual user they are interacting with and prevent URL spoofing attacks. You can use any arbitrary string value that is recognizable to the end-user, such as the end-user's full name or e-mail. Characters must conform to the ISO-8859-1(latin1) character set. |
| actor\_client\_idrequired | ID of actor client that is allowed to use the authorization code. Actor client existence is not validated. |
| scoperequired | Scope of delegated access. The scope doesn't need to be present on the access token used when calling this endpoint. |

> Form Request Example `NOTE: This data is sent as application/x-www-form-urlencoded, but shown here in json for brevity.`

```
{
  "actor_client_id": "df05e4b379934cd09963197cc855bfe9",
  "external_user_id": "user_123_abc",
  "id_hint": "user_123_abc",
  "scope": "user:read,credentials:write",
  "user_id": "256ae77fcbda4bc2b8d0ba94d9c3423c"
}
```

> Response Example

```
{
  "code": "c50cd6960a6f44ffb701ef60fafa7761"
}
```

### Response: OAuth2AuthorizeResponse[](#general/oauth/create-delegated-authorization/response-oauth2authorizeresponse)

code `string` required

Authorization code which is single-use only and short-lived. It should be treated as opaque (no defined format).

| Status Code | Description |
| --- | --- |
| 200 | Authorization code successfully created. |
| 400 | Request is not following the specification. See body for details. |
| 401 | Client either doesn't exist, doesn't have access to the user or isn't allowed to use the scope. See body for details. |
| 404 | User doesn't exist. |

## Get access token[](#general/oauth/get-access-token)

`POST /api/v1/oauth/token`

Access tokens are used to access API resources.

### Form Parameters[](#general/oauth/get-access-token/form-parameters)

| Parameter | Description |
| --- | --- |
| client\_idrequired | Client ID. |
| client\_secret | Client secret. Required when the authentication method for client is configured for client secret, forbidden otherwise. |
| grant\_typerequired | Grant type.  
Values: `authorization_code`, `client_credentials`, `urn:ietf:params:oauth:grant-type:jwt-bearer` |
| code | Authorization code that was returned from the authorization flow. Required when grant type is `authorization_code`. |
| scope | Scope of access. When grant type is `client_credentials` or `urn:ietf:params:oauth:grant-type:jwt-bearer` can be used to narrow the scope of the token, otherwise if omitted defaults to the client scope. |
| assertion | Signed authorization grant JWT. Required when grant type is `urn:ietf:params:oauth:grant-type:jwt-bearer`. |

> Form Request Example `NOTE: This data is sent as application/x-www-form-urlencoded, but shown here in json for brevity.`

```
{
  "assertion": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3Mi[...omitted for brevity...].xlP-MdfO[...omitted for brevity...]",
  "client_id": "256ae77fcbda4bc2b8d0ba94d9c3423c",
  "client_secret": "bdb8477398074160901ce1c8dd5b7848",
  "code": "c50cd6960a6f44ffb701ef60fafa7761",
  "grant_type": "authorization_code",
  "scope": "user:create,authorization:grant"
}
```

> Response Example

```
{
  "access_token": "3084989d7eb94d58995217807441bdf4",
  "expires_in": 7200,
  "id_hint": "John Doe",
  "scope": "transactions:read,accounts:read",
  "token_type": "bearer"
}
```

### Response: OAuth2AuthenticationTokenResponse[](#general/oauth/get-access-token/response-oauth2authenticationtokenresponse)

access\_token `string` required readonly

Access token that can be used to access an API resource. It should be treated as opaque (no defined format).

expires\_in `integer` required readonly

Seconds until access token expires.

id\_hint `string` readonly

Human-readable information about the identity of user

scope `string` required readonly

Scope of the access token.

token\_type `string` required readonly

Type of authorization token returned.

## Revoke all tokens[](#general/oauth/revoke-all-tokens)

`POST /api/v1/oauth/revoke-all`

Revokes all access tokens for a user.

### Works with[](#general/oauth/revoke-all-tokens/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `authorization:revoke` |

### Form Parameters[](#general/oauth/revoke-all-tokens/form-parameters)

| Parameter | Description |
| --- | --- |
| user\_id | User ID. Cannot be specified at the same time as `external_user_id`. |
| external\_user\_id | External user ID set by client on user creation. Cannot be specified at the same time as `user_id`. |

> Form Request Example `NOTE: This data is sent as application/x-www-form-urlencoded, but shown here in json for brevity.`

```
{
  "external_user_id": "user_123_abc",
  "user_id": "256ae77fcbda4bc2b8d0ba94d9c3423c"
}
```

| Status Code | Description |
| --- | --- |
| 204 | All tokens successfully revoked. |
| 400 | Request is not following the specification. See body for details. |
| 401 | Client either doesn't exist or doesn't have access to the user. See body for details. |
| 404 | User doesn't exist. |

## Tink Link[](#general/tink-link)

## Session[](#general/tink-link/session)

## Create a session[](#general/tink-link/session/create-a-session)

`POST /link/v1/session`

You can optionally use a session to configure certain aspects of the Tink Link flow for a specific user (such as securely pre-filling information or configuring specific behaviors). A session is one-time use only and has a lifetime of 10 minutes.

### Works with[](#general/tink-link/session/create-a-session/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `link-session:write` |

> Request Example

```
{
  "externalReference": "string",
  "merchantId": "string",
  "personalIdentifier": "string",
  "sourceAccountNumber": "string",
  "user": {
    "firstName": "string",
    "lastName": "string"
  }
}
```

### Request Body: SessionBody[](#general/tink-link/session/create-a-session/request-body-sessionbody)

Configuration for the session to be created.

The object contains the configuration for the Tink Link session.

externalReference `string`

The external reference identifier to be included in the report when using report based products. Maximum length of 50 characters.

merchantId `string`

The merchant id identifier indicates that Tink Link should load theme for this merchant and not for an appUsed when fetching themes/configuration for given merchant.

personalIdentifier `string`

The personal identifier to be pre-filled in username or social security number forms.

sourceAccountNumber `string`

The source account to be used in the payment flow (applicable for specific PSD2 providers).

user `User`

The user information to be filled in the beginning of the Tink Link flow to be used for User-Match functionality.

#### User[](#general/tink-link/session/create-a-session/request-body-sessionbody/user)

firstName `string`

The first name of the user to be used for User Match functionality

lastName `string`

The last name of the user to be used for User Match functionality

> Response Example

```
{
  "sessionId": "bc97e81618494735acba64de1cfb1cbf3bbe56516c8b4e8cb8d167243b8db62e"
}
```

### Response: CreateSessionResponse[](#general/tink-link/session/create-a-session/response-createsessionresponse)

sessionId `string`

| Status Code | Description |
| --- | --- |
| 200 | A successful response. |
| default | An unexpected error response. |

## User[](#general/user)

The user model represents a unique Tink end-user and includes properties that defines the user, user profile information and user-modifiable settings. The user information can primarily be used whenever a Tink user signs up for a 3rd party service using her Tink account, or when user-modifiable settings, such as locale or currency, are needed in order to display or calculate the correct data in the 3rd party service.

### The User model[](#general/user/the-user-model)

appId `string` required readonly

The internal identifier of the app that the user belongs to.

created `Date` required readonly

The date when the user was created.

externalUserId `string`

The external identifier of the user, where you can use your own ID to associate with this user. This value will be unique within your app, and is an alternative way to identify users when performing API requests, instead of the user's `id`. This can be modified by the user. Avoid using personal information (PI); we recommend using a generated alphanumeric ID.

flags `array[string]` readonly

The user-specific feature flags assigned to the user.

id `string` required readonly

The internal identifier of the user, which is a globally unique value that's generated by Tink upon user creation. This can identify users when performing API requests. See also `externalUserId`.

nationalId `string` readonly

Detected national identification number of the end-user.

profile `UserProfile` required readonly

The profile of the user. Refer to the [UserProfile model](#general/user/the-user-model/userprofile) for which fields are modifiable. To modify fields, see [Update user profile](#general/user/update-user-profile).

username `string`

The username of the user. This can be modified by the user. Only usable by older integrations. Otherwise, see `externalUserId` for an equivalent field.

#### UserProfile[](#general/user/the-user-model/userprofile)

currency `string` required readonly

The configured ISO 4217 currency code of the user. Defaults to default currency for the user's market.

locale `string` required

The configured locale of the user. Defaults to default locale for the user's market. This can be modified by the user.

market `string` required readonly

The primary market/country of the user.

notificationSettings `NotificationSettings` required

The configured notification settings of the user. This can be modified by the user.

periodAdjustedDay `integer` required

The configured day of the month to break the adjusted period on. Defaults to default period adjusted day for the user's market. This can be modified by the user. A valid value should be in the range between 1 and 31. If the adjusted day is after the last day of a given month, then it is treated as the last day of the month.

periodMode `string` required

The configured monthly period mode of the user. Defaults to default period mode for the user's market. This can be modified by the user.  
Values: `MONTHLY`, `MONTHLY_ADJUSTED`

timeZone `string` required

The configured time zone of the user. Defaults to default time zone for the user's market. This can be modified by the user.

#### NotificationSettings[](#general/user/the-user-model/notificationsettings)

balance `boolean` required

Indicates if the user wants to receive notifications with low or high balances alerts.

budget `boolean` required

Indicates if the user wants to receive notifications regarding her budgets.

doubleCharge `boolean` required

Indicates if the user wants to receive notifications with double-charge alerts.

einvoices `boolean` required

Indicates if the user wants to receive notifications for e-invoices.

fraud `boolean` required

Indicates if the user wants to receive notifications for ID Control warnings.

income `boolean` required

Indicates if the user wants to receive notifications when an income is received.

largeExpense `boolean` required

Indicates if the user wants to receive notifications when a large expense is detected.

leftToSpend `boolean` required

Indicates if the user wants to receive left to spend notifications.

loanUpdate `boolean` required

Indicates if the user wants to receive notifications for loan updates.

summaryMonthly `boolean` required

Indicates if the user wants to receive notifications with monthly summaries.

summaryWeekly `boolean` required

Indicates if the user wants to receive notifications with weekly summaries.

transaction `boolean` required

Indicates if the user wants to receive notifications for every transaction.

unusualAccount `boolean` required

Indicates if the user wants to receive notifications when there is unusual activity on any of her accounts.

unusualCategory `boolean` required

Indicates if the user wants to receive notifications when she has spent more than usual on something.

## Create user[](#general/user/create-user)

`POST /api/v1/user/create`

Creates a user and its user profile and returns the ID of the created user.

### Works with[](#general/user/create-user/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `user:create` |

> Request Example

```
{
  "external_user_id": "user_123_abc",
  "locale": "en_US",
  "market": "SE",
  "retention_class": "permanent"
}
```

### Request Body: CreateUserRequest[](#general/user/create-user/request-body-createuserrequest)

Configuration for new user.

external\_user\_id `string`

Optional external user ID for the created user.

locale `string`

Locale for the user. Defaults to default locale for the user's market.

market `string` required

Market specific code for the user as a ISO 3166-1 country code.

retention\_class `string`

\[BETA\] Determines whether Tink will retain the user until explicitly deleted, or automatically delete the user after 24 hours. Set with either "permanent" or "temporary". Defaults to the [user retention setting for your app](/Tiny-doc/tink_docs_home/glossary/#permanent-users:~:text=our%20guide.-,Permanent%20users,-A%20Tink%20User).

> Response Example

```
{
  "external_user_id": "user_123_abc",
  "user_id": "6e68cc6287704273984567b3300c5823"
}
```

### Response: CreateUserResponse[](#general/user/create-user/response-createuserresponse)

external\_user\_id `string` required

The external user ID of the created user.

user\_id `string` required

The user ID of the created user.

| Status Code | Description |
| --- | --- |
| 200 | The user was successfully created and returned. |
| 400 | The input market and/or locale was invalid. |
| 409 | User with the same external id already exists. |

## Delete user[](#general/user/delete-user)

`POST /api/v1/user/delete`

Completely deletes the currently authenticated user and its data.

### Works with[](#general/user/delete-user/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `user:delete` |

| Status Code | Description |
| --- | --- |
| 204 | The user was successfully deleted. |

## Get user[](#general/user/get-user)

`GET /api/v1/user`

Returns the authenticated user.

### Works with[](#general/user/get-user/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `user:read` |

> Response Example

```
{
  "appId": "56a33be25eb9443fbb696f7c61eabd94",
  "created": "string",
  "externalUserId": "2d3bd65493b549e1927d97a2d0683ab8",
  "flags": [
    "TRANSFERS",
    "TEST_PINK_ONBOARDING"
  ],
  "id": "6e68cc6287704273984567b3300c5822",
  "nationalId": "198410045701",
  "profile": {
    "currency": "SEK",
    "locale": "sv_SE",
    "market": "SE",
    "notificationSettings": {
      "balance": false,
      "budget": false,
      "doubleCharge": false,
      "einvoices": false,
      "fraud": false,
      "income": false,
      "largeExpense": false,
      "leftToSpend": false,
      "loanUpdate": false,
      "summaryMonthly": false,
      "summaryWeekly": false,
      "transaction": false,
      "unusualAccount": false,
      "unusualCategory": false
    },
    "periodAdjustedDay": 25,
    "periodMode": "MONTHLY_ADJUSTED",
    "timeZone": "Europe/Stockholm"
  },
  "username": "tinker@example.com"
}
```

### Response: [User](#tag-user)[](#general/user/get-user/response-user)

The user model represents a unique Tink end-user and includes properties that defines the user, user profile information and user-modifiable settings. The user information can primarily be used whenever a Tink user signs up for a 3rd party service using her Tink account, or when user-modifiable settings, such as locale or currency, are needed in order to display or calculate the correct data in the 3rd party service.

See [User](#tag-user) for parameter descriptions.

## Get user profile[](#general/user/get-user-profile)

`GET /api/v1/user/profile`

Returns the authenticated user's profile.

### Works with[](#general/user/get-user-profile/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `user:read` |

> Response Example

```
{
  "currency": "SEK",
  "locale": "sv_SE",
  "market": "SE",
  "notificationSettings": {
    "balance": false,
    "budget": false,
    "doubleCharge": false,
    "einvoices": false,
    "fraud": false,
    "income": false,
    "largeExpense": false,
    "leftToSpend": false,
    "loanUpdate": false,
    "summaryMonthly": false,
    "summaryWeekly": false,
    "transaction": false,
    "unusualAccount": false,
    "unusualCategory": false
  },
  "periodAdjustedDay": 25,
  "periodMode": "MONTHLY_ADJUSTED",
  "timeZone": "Europe/Stockholm"
}
```

### Response: [UserProfile](#tag-user-userprofile)[](#general/user/get-user-profile/response-userprofile)

See [UserProfile](#tag-user-userprofile) for parameter descriptions.

## Update user[](#general/user/update-user)

`PATCH /api/v1/user`

Updates the modifiable fields of a user. Refer to the [User model](#general/user/the-user-model) for which fields are modifiable. The `id` of the user must also be given, and must match the ID of the authenticated user access token.

### Works with[](#general/user/update-user/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `user:write` |

> Request Example

```
{
  "externalUserId": "2d3bd65493b549e1927d97a2d0683ab8",
  "username": "tinker@example.com"
}
```

### Request Body: [User](#tag-user)[](#general/user/update-user/request-body-user)

The updated user object.

The user model represents a unique Tink end-user and includes properties that defines the user, user profile information and user-modifiable settings. The user information can primarily be used whenever a Tink user signs up for a 3rd party service using her Tink account, or when user-modifiable settings, such as locale or currency, are needed in order to display or calculate the correct data in the 3rd party service.

See [User](#tag-user) for parameter descriptions.

> Response Example

```
{
  "appId": "56a33be25eb9443fbb696f7c61eabd94",
  "created": "string",
  "externalUserId": "2d3bd65493b549e1927d97a2d0683ab8",
  "flags": [
    "TRANSFERS",
    "TEST_PINK_ONBOARDING"
  ],
  "id": "6e68cc6287704273984567b3300c5822",
  "nationalId": "198410045701",
  "profile": {
    "currency": "SEK",
    "locale": "sv_SE",
    "market": "SE",
    "notificationSettings": {
      "balance": false,
      "budget": false,
      "doubleCharge": false,
      "einvoices": false,
      "fraud": false,
      "income": false,
      "largeExpense": false,
      "leftToSpend": false,
      "loanUpdate": false,
      "summaryMonthly": false,
      "summaryWeekly": false,
      "transaction": false,
      "unusualAccount": false,
      "unusualCategory": false
    },
    "periodAdjustedDay": 25,
    "periodMode": "MONTHLY_ADJUSTED",
    "timeZone": "Europe/Stockholm"
  },
  "username": "tinker@example.com"
}
```

### Response: [User](#tag-user)[](#general/user/update-user/response-user)

The user model represents a unique Tink end-user and includes properties that defines the user, user profile information and user-modifiable settings. The user information can primarily be used whenever a Tink user signs up for a 3rd party service using her Tink account, or when user-modifiable settings, such as locale or currency, are needed in order to display or calculate the correct data in the 3rd party service.

See [User](#tag-user) for parameter descriptions.

## Update user profile[](#general/user/update-user-profile)

`PUT /api/v1/user/profile`

Updates the modifiable fields of a user's profile. Refer to the [UserProfile model](#general/user/the-user-model/userprofile) for which fields are modifiable.

### Works with[](#general/user/update-user-profile/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `user:write` |

> Request Example

```
{
  "locale": "sv_SE",
  "notificationSettings": {
    "balance": false,
    "budget": false,
    "doubleCharge": false,
    "einvoices": false,
    "fraud": false,
    "income": false,
    "largeExpense": false,
    "leftToSpend": false,
    "loanUpdate": false,
    "summaryMonthly": false,
    "summaryWeekly": false,
    "transaction": false,
    "unusualAccount": false,
    "unusualCategory": false
  },
  "periodAdjustedDay": 25,
  "periodMode": "MONTHLY_ADJUSTED",
  "timeZone": "Europe/Stockholm"
}
```

### Request Body: [UserProfile](#tag-user-userprofile)[](#general/user/update-user-profile/request-body-userprofile)

The updated user profile object.

See [UserProfile](#tag-user-userprofile) for parameter descriptions.

> Response Example

```
{
  "currency": "SEK",
  "locale": "sv_SE",
  "market": "SE",
  "notificationSettings": {
    "balance": false,
    "budget": false,
    "doubleCharge": false,
    "einvoices": false,
    "fraud": false,
    "income": false,
    "largeExpense": false,
    "leftToSpend": false,
    "loanUpdate": false,
    "summaryMonthly": false,
    "summaryWeekly": false,
    "transaction": false,
    "unusualAccount": false,
    "unusualCategory": false
  },
  "periodAdjustedDay": 25,
  "periodMode": "MONTHLY_ADJUSTED",
  "timeZone": "Europe/Stockholm"
}
```

### Response: [UserProfile](#tag-user-userprofile)[](#general/user/update-user-profile/response-userprofile)

See [UserProfile](#tag-user-userprofile) for parameter descriptions.

| Status Code | Description |
| --- | --- |
| 200 | The user profile was successfully updated and returned. |
| 400 | The provided user profile contains invalid data. Make sure the data formats are valid. |
