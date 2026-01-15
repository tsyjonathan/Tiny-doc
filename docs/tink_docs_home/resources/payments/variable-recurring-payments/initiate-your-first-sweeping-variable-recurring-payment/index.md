---
title: "Initiate your first Sweeping Variable Recurring Payment"
source: "/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/initiate-your-first-sweeping-variable-recurring-payment/"
exportedAt: "2026-01-13T12:43:03.112Z"
---
## Payments sequence diagrams[](#payments-sequence-diagrams)

First of all, let's take a look at our VRP flow by the help of diagrams.

*Image removed: Payments flow*

> **Note:** These links lead to Figma designs that open in a new browser window. Zoom in to see the diagrams in full detail.

-   Set up mandate for Variable Recurring Payments
-   Variable Recurring Payment initiation

## Initiate your first sweeping Variable Recurring Payment[](#initiate-your-first-sweeping-variable-recurring-payment)

The steps to initiate your first sweeping VRP must be followed in order:

1.  [Authenticate your client for mandate creation](#authenticate-your-client-for-mandate-creation)
2.  [Create a permanent user](#create-a-permanent-user)
3.  [Create a sweeping VRP mandate](#create-a-sweeping-variable-recurring-payment-mandate)
4.  [Create a user authorization code](#create-a-user-authorization-code)
5.  [Authorize a sweeping VRP mandate](#authorize-a-sweeping-variable-recurring-payment-mandate)
6.  [Check the details and status of a sweeping VRP mandate](#check-the-details-and-status-of-a-sweeping-variable-recurring-payment-mandate)
7.  [Authenticate your client for VRP initiation](#authenticate-your-client-for-variable-recurring-payments-initiation)
8.  [Initiate a sweeping VRP](#initiate-a-sweeping-variable-recurring-payment)
9.  [Check the details and status of a sweeping VRP](#check-the-details-and-status-of-a-sweeping-variable-recurring-payment)
10.  [Revoke a sweeping VRP mandate](#revoke-a-sweeping-variable-recurring-payment-mandate)

### 1\. Authenticate your client for mandate creation[](#authenticate-your-client-for-mandate-creation)

To create a sweeping VRP mandate, you first must generate a valid client access token with the scopes `consents`, `consents:readonly` , `user:create`, `user:read`, `authorization:grant`, and `providers:read`.

For more information on how to get an access token, see [Get access token](/Tiny-doc/tink_docs_api/api/#general/oauth/get-access-token) in the API reference.

**Note**: access tokens expire and must be renewed, typically in 30 minutes.

**Example request**

```
curl --request POST '[external url removed]' 
--header 'Content-Type: application/x-www-form-urlencoded' 
--header 'Accept: application/json' 
--data-urlencode 'client_id= 
--data-urlencode 'client_secret= 
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'scope=authorization:grant,user:create,user:read,consents,consents:readonly,providers:read,mandate-payments,mandate-payments:readonly'
```

**Example response**

```
{
    "token_type": "bearer",
    "expires_in": 1799,
    "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
    "scope": "authorization:grant,user:create,consents,consents:readonly,providers:read,mandate-payments,mandate-payments:readonly",
    "id_hint": null
}
```

### 2\. Create a permanent user[](#create-a-permanent-user)

Every sweeping VRP mandate is tied to a permanent user. You must create a [permanent user](/Tiny-doc/tink_docs_home/glossary/#permanent-users) before you create a mandate. For more information on how to create a permanent user, see [Create user](/Tiny-doc/tink_docs_api/api-general/#general/user/create-user) in the API reference. Make sure to set the retention class to `permanent`.

**Example request**

```
curl -X POST [external url removed] \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer {YOUR_CLIENT_ACCESS_TOKEN}" \
     -d '{"market": "GB", "locale": "en_GB", "retention_class": "permanent"}'
```

**Example response**

```
{
  "user_id": "6e68cc6287704273984567b3300c5823"
}
```

### 3\. Create a sweeping Variable Recurring Payment mandate[](#create-a-sweeping-variable-recurring-payment-mandate)

To create a sweeping VRP mandate, use the `[external url removed] endpoint. Use the `userId` of the permanent user that was created in [Create a permanent user](#create-a-permanent-user). When calling this endpoint, Tink issues a response that includes the provided information with a `consentId`.

Keep a few things in mind:

-   If a `validFrom` date isn't specified, the mandate is valid from the mandate authorization date.
-   If a `validFrom` date is specified, the user needs to go through an authentication journey before, or on that date.
-   The period alignment of periodic limits is always `MANDATE`, which means that a period starts on the `validFrom` date or the date when the mandate was created.
-   If the `payerAccount` is not specified, the end user will be asked to select an account at their bank as described in [Authorize a sweeping VRP mandate](#authorize-a-sweeping-variable-recurring-payment-mandate). To use payer account preselection, you must first have requested and been approved for access. If you've yet not requested access, contact Sales.
-   When a mandate has successfully been created, control parameters cannot be updated. To change the control parameters, revoke the existing mandate, create a new mandate, and send the end user through an authentication journey.

For more information on how to create a mandate, see Create a new consent in the API reference. For more information on how to structure an idempotency key, see [Idempotency and caching](/Tiny-doc/tink_docs_api/api/#introduction/idempotency-and-caching).

#### JSON object user parameters[](#json-object-user-parameters)

This table shows all required and optional parameters to create a sweeping VRP mandate for `VRP_SWEEPING`.

| Attribute Name | Description | Mandatory /Optional |
| --- | --- | --- |
| merchantId | The id, in uuid v4 format, of the merchant who is requesting the mandate to be created. | Optional |
| controlParameters | Parameters that restrict the way in which the sweeping VRP mandate can be used to make payments. | Mandatory |
| controlParameters.  
maximumIndividualAmount | The maximum amount that can be specified in a payment initiation request under this mandate. Lowest supported value is GBP 1.00. | Mandatory |
| controlParameters.  
maximumIndividualAmount.value.scale | The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if `scale` is 1 and `unscaledValue` is 1230, the end result would be 123.0. | Mandatory |
| controlParameters.  
maximumIndividualAmount.value.unscaledValue | The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if `scale` is 1 and `unscaledValue` is 1230, the end result would be 123.0. | Mandatory |
| controlParameters.  
maximumIndividualAmount.currency | The currency of the maximum individual payment amount. | Mandatory |
| controlParameters.  
periodicLimits | The maximum cumulative payment amount that can be specified in all payment instructions in a given period under this mandate. | Mandatory |
| controlParameters.  
periodicLimits.amount | The maximum cumulative payment amount for the specified period type. | Mandatory |
| controlParameters.  
periodicLimits.amount.value.scale | The scale of the numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if `scale` is 1 and `unscaledValue` is 1230, the end result would be 123.0. | Mandatory |
| controlParameters.  
periodicLimits.amount.value.unscaledValue | The unscaled numeric value. `unscaledValue` is used with `scale` to accurately represent floating point values. The formula is `unscaledValue * (10^-scale)`. For example, if `scale` is 1 and `unscaledValue` is 1230, the end result would be 123.0. | Mandatory |
| controlParameters.  
periodicLimits.currency | The currency of the payment amount in the specified periodic limit. | Mandatory |
| controlParameters.  
periodicLimits.periodAlignment | The mandate period alignment that specifies that a period starts on the date of mandate creation or `ValidFrom` date. Allowed value: `MANDATE` | Mandatory |
| controlParameters.  
periodicLimits.periodType | The period type of the periodic limit. Available values: `DAY`, `WEEK`, `FORTNIGHT`, `MONTH`, `HALF_YEAR`, `YEAR`. Allowed values varies between banks. | Mandatory |
| controlParameters.  
validFrom | The start date time from which the mandate is valid. The value cannot be less than the current GMT date and time. The date follows the ISO 8601 with format YYYY-MM-DDTHH:MM:SS.sssZ. | Optional |
| controlParameters.  
validTo | The end date time up till which the mandate remains valid. The value cannot be less than the current GMT date and time. The date follows the ISO 8601 with format YYYY-MM-DDTHH:MM:SS.sssZ. | Optional |
| payeeAccount | The payee account of a mandate payment. | Mandatory |
| payeeAccount.Name | Name of the account, as assigned by the account servicing institution. Maximum length varies between banks. | Mandatory |
| payeeAccount.Number | The number assigned by an institution to identify an account. This identifier is known by the account owner. | Mandatory |
| payeeAccount.Type | The identification scheme for the account, in a coded form. Allowed values: `SORT_CODE` | Mandatory |
| payerAccount | The payer account of a mandate payment. | Optional |
| payerAccount.holderName | The name of the account owner. Maximum length varies between banks. | Optional |
| payerAccount.Number | The number assigned by an institution to identify an account. The identifier is known to the account owner. | Optional |
| payerAccount.Type | The identification scheme for the account, in coded form. Allowed values: `SORT_CODE` | Optional |
| remittanceInformation | Information supplied to enable the matching of an entry. | Mandatory |
| remittanceInformation.reference | The structured remittance information. Maximum length of string can be 18 characters | Mandatory |
| remittanceInformation.unstructured | The unstructured remittance information. Maximum length of string can be 140 characters | Optional |

**Example request**

```
curl --location --request POST '[external url removed]' \
--header 'Authorization: Bearer {YOUR_CLIENT_ACCESS_TOKEN}' \
--header 'Idempotency-Key: {THE_IDEMPOTENCY_KEY}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "providerId": "uk-natwest-oauth2",
    "userId": "7c41103806a011edb9390242ac120002",
    "financialService": {
        "type": "MANDATE_PAYMENTS",
        "subtype": "VRP_SWEEPING"
    },
    "financialServiceParameters": {
        "version": "1.0.0",
        "userParameters": {
            "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
            "controlParameters": {
                "maximumIndividualAmount": {
                    "value": {
                        "unscaledValue": 199,
                        "scale": 2
                    },
                    "currency": "GBP"
                },
                "periodicLimits": [
                    {
                        "amount": {
                            "value": {
                                "unscaledValue": 299,
                                "scale": 2
                            },
                            "currency": "GBP"
                        },
                        "periodAlignment": "MANDATE",
                        "periodType": "DAY"
                    },
                    {
                        "amount": {
                            "value": {
                                "unscaledValue": 999,
                                "scale": 2
                            },
                            "currency": "GBP"
                        },
                        "periodAlignment": "MANDATE",
                        "periodType": "MONTH"
                    }
                ],
                "validFrom": "2022-07-25T10:10:38.850Z",
                "validTo": "2022-12-25T10:10:38.850Z"
            },
            "payeeAccount": {
                "number": "10000031510604",
                "name": "Tom John Savings Account",
                "type": "SORT_CODE"
            },
            "payerAccount": {
                "number": "60092067037135",
                "holderName": "Tom John",
                "type": "SORT_CODE"
            },
            "remittanceInformation": {
                "reference": "referenceString",
                "unstructured": "Unstructured Remittance String"
            }
        }
    }
}'
```

**Example response**

```
{
    "consent": {
        "id": "c63dc11e-b210-4a96-9461-2061389789e7",
        "userId": "7c41103806a011edb9390242ac120002",
        "providerId": "uk-natwest-oauth2",
        "appId": "afae2e2a57b64009aa94f593d012b869",
        "state": "INITIALIZED",
        "createdAt": "2022-07-22T10:13:39.293Z",
        "expiresAt": "2022-12-25T10:10:38.850Z",
        "financialService": {
            "type": "MANDATE_PAYMENTS",
            "subType": "VRP_SWEEPING"
        },
        "financialServiceParameters": {
            "version": "1.0.0",
            "userParameters": {
                "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
                "controlParameters": {
                    "maximumIndividualAmount": {
                        "value": {
                            "unscaledValue": 199,
                            "scale": 2
                        },
                        "currency": "GBP"
                    },
                    "periodicLimits": [
                        {
                            "amount": {
                                "value": {
                                    "unscaledValue": 299,
                                    "scale": 2
                                },
                                "currency": "GBP"
                            },
                            "periodAlignment": "MANDATE",
                            "periodType": "DAY"
                        },
                        {
                            "amount": {
                                "value": {
                                    "unscaledValue": 999,
                                    "scale": 2
                                },
                                "currency": "GBP"
                            },
                            "periodAlignment": "MANDATE",
                            "periodType": "MONTH"
                        }
                    ],
                    "validFrom": "2022-07-25T10:10:38.850Z",
                    "validTo": "2022-12-25T10:10:38.850Z"
                },
                "payeeAccount": {
                    "number": "10000031510604",
                    "name": "Tom John Savings Account",
                    "type": "SORT_CODE"
                },
                "payerAccount": {
                    "number": "60092067037135",
                    "holderName": "Tom John",
                    "type": "SORT_CODE"
                },
                "remittanceInformation": {
                    "reference": "referenceString",
                    "unstructured": "Unstructured Remittance String"
                }
            }
        }
    }
}
```

**Note**: Different providers may support different values and/or require different conditions to be met to accept a mandate request. Use the `[external url removed] endpoint to request a JSON schema template that’s used to create a mandate with a specific provider. Use the `providerId` parameter of the provider for which you would like to create a mandate. Use the `type` query parameter with the `MANDATE_PAYMENTS` value and the `subType` query parameter with the `VRP_SWEEPING` value.

For more information on how to request a JSON schema template, see [Get consent template](/Tiny-doc/tink_docs_api/api/#connectivity-v2/consent-templates/get-consent-template) in the API reference.

To learn which providers allow `VRP_SWEEPING`, filter the list of providers by querying the [providers endpoint](/Tiny-doc/tink_docs_api/api/#connectivity/provider/list-providers-for-a-market). Use the `pisCapability` query parameter with the `VRP_SWEEPING` value to filter available providers: `[external url removed]

**Example request**

```
curl --location --request GET '[external url removed]
' \
--header 'Authorization: Bearer '
```

**Example response**

```
{
    "templates": [
        {
            "type": "MANDATE_PAYMENTS",
            "subtype": "VRP_SWEEPING",
            "deprecated": false,
            "version": "1.0.0",
            "schema": {
                "$schema": "[external url removed]",
                "$defs": {
                    "AccountType": {
                        "type": "string",
                        "const": "SORT_CODE"
                    },
                    "CurrencyDenominatedAmount": {
                        "type": "object",
                        "properties": {
                            "currency": {
                                "type": "string",
                                "description": "The currency code which follows ISO-4217 standard."
                            },
                            "value": {
                                "type": "object",
                                "properties": {
                                    "scale": {
                                        "type": "integer",
                                        "minimum": 0
                                    },
                                    "unscaledValue": {
                                        "type": "integer",
                                        "minimum": 1
                                    }
                                },
                                "required": [
                                    "scale",
                                    "unscaledValue"
                                ],
                                "description": "Maximum allowed amount."
                            }
                        },
                        "required": [
                            "currency",
                            "value"
                        ]
                    }
                },
                "type": "object",
                "properties": {
                    "controlParameters": {
                        "type": "object",
                        "properties": {
                            "maximumIndividualAmount": {
                                "$ref": "#/$defs/CurrencyDenominatedAmount",
                                "description": "Maximum allowed amount for individual payment. Lowest supported value is GBP 1.00."
                            },
                            "periodicLimits": {
                                "description": "List of periodic limits.",
                                "minItems": 1,
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "amount": {
                                            "$ref": "#/$defs/CurrencyDenominatedAmount",
                                            "description": "Maximum allowed amount for periodic limit. Lowest supported value is GBP 1.00."
                                        },
                                        "periodAlignment": {
                                            "type": "string",
                                            "const": "MANDATE",
                                            "description": "Period alignment."
                                        },
                                        "periodType": {
                                            "type": "string",
                                            "enum": [
                                                "DAY",
                                                "WEEK",
                                                "FORTNIGHT",
                                                "MONTH",
                                                "HALF_YEAR",
                                                "YEAR"
                                            ],
                                            "description": "List of allowed period types for periodic limits."
                                        }
                                    },
                                    "required": [
                                        "amount",
                                        "periodAlignment",
                                        "periodType"
                                    ]
                                }
                            },
                            "validFrom": {
                                "type": "string",
                                "description": "Time from which mandate is valid.",
                                "format": "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                            },
                            "validTo": {
                                "type": "string",
                                "description": "Time to which mandate is valid.",
                                "format": "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
                            }
                        },
                        "required": [
                            "maximumIndividualAmount",
                            "periodicLimits"
                        ],
                        "description": "Control parameters."
                    },
                    "merchantId": {
                        "type": "string",
                        "description": "The merchant id for a mandate."
                    },
                    "payeeAccount": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "Name of the account, as assigned by the account servicing institution.",
                                "minLength": 1,
                                "maxLength": 35
                            },
                            "number": {
                                "type": "string",
                                "description": "Number assigned by an institution to identify an account. This identifier is known by the account owner."
                            },
                            "type": {
                                "$ref": "#/$defs/AccountType",
                                "description": "The identification scheme for the account, in a coded form.",
                                "default": "SORT_CODE",
                                "const": "SORT_CODE"
                            }
                        },
                        "required": [
                            "name",
                            "number",
                            "type"
                        ],
                        "description": "Payee account."
                    },
                    "payerAccount": {
                        "type": "object",
                        "properties": {
                            "holderName": {
                                "type": "string",
                                "description": "The name of the account owner.",
                                "minLength": 1,
                                "maxLength": 35
                            },
                            "number": {
                                "type": "string",
                                "description": "Number assigned by an institution to identify an account. This identifier is known by the account owner."
                            },
                            "type": {
                                "$ref": "#/$defs/AccountType",
                                "description": "The identification scheme for the account, in a coded form.",
                                "default": "SORT_CODE",
                                "const": "SORT_CODE"
                            }
                        },
                        "required": [
                            "holderName",
                            "number",
                            "type"
                        ],
                        "description": "Payer account."
                    },
                    "remittanceInformation": {
                        "type": "object",
                        "properties": {
                            "reference": {
                                "type": "string",
                                "description": "The structured remittance information.",
                                "minLength": 1,
                                "maxLength": 18
                            },
                            "unstructured": {
                                "type": "string",
                                "description": "The unstructured remittance information.",
                                "minLength": 1,
                                "maxLength": 140
                            }
                        },
                        "required": [
                            "reference"
                        ],
                        "description": "Information supplied to enable the matching of an entry."
                    }
                },
                "required": [
                    "controlParameters",
                    "payeeAccount",
                    "remittanceInformation"
                ]
            }
        }
    ]
}
```

Before you can send the end user through Tink Link to authorize the sweeping VRP mandate, Tink Link must be granted access to perform actions on the permanent user. This is done by retrieving an `authorization_code` and propagating it to Tink Link. To generate an `authorization_code`, use the `POST /api/v1/oauth/authorization-grant/delegate` endpoint. Use the `userId` of the permanent user that was created in [Create a permanent user](#create-a-permanent-user). Use the scopes `consents`, `consents:readonly`, `providers:read`,`user:read`, `authorization:read`, and `credentials:read` in the request.

> **Note:** When creating a user authorization code, you must enter `actor_client_id=df05e4b379934cd09963197cc855bfe9`. This value never changes and is used by Tink to identify apps. Once you declare the value, you allow Tink to act on your behalf. This value isn't the same as your `client_id`, so make sure not to mix them up.

For more information on how to create a user authorization code, see [Create delegated authorization](/Tiny-doc/tink_docs_api/api/#general/oauth/create-delegated-authorization) in the API reference.

**Example request**

Create a user authorization code

```
curl --request POST [external url removed]
--header 'Authorization: Bearer '
--data-urlencode 'user_id='
--data-urlencode 'scope=consents,consents:readonly,providers:read,user:read,authorization:read,credentials:read'
--data-urlencode 'client_id=}' 
--data-urlencode 'actor_client_id=df05e4b379934cd09963197cc855bfe9' 
--data-urlencode 'id_hint=Tom John'
```

**Example response**

```
{
    "code": "35d32a7e651042f285e62beeea2dd7e9"
}
```

### 5\. Authorize a sweeping Variable Recurring Payment mandate[](#authorize-a-sweeping-variable-recurring-payment-mandate)

Create a Tink URL to allow the end user to authenticate with their chosen bank and select an account from which they want sweeping VRPs to be made. This can only be done when you've not used `payerAccount` to create the mandate, in which case the account is preselected (and no account-selection screen is displayed). The URL contains different parameters to limit and guide end users according to your requirements.

Use this format for your URL:

```
[external url removed]
```

For the `consent_id` parameter, enter the `id` that you received in response to the request described in [Create a sweeping Variable Recurring Payment mandate](#create-a-sweeping-variable-recurring-payment-mandate).

Since permanent users are used you must append the `authorization_code={USER_AUTHORIZATION_CODE}` query parameter in your URL. The `authorization_code` is used to authenticate the existing user in Tink Link. Use the `authorization_code` created in [Create a user authorization code](#create-a-user-authorization-code).

For a description of all required and optional request parameters in the URL, see [Variable Recurring Payments SDK reference](/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments-sdk-reference/). For more information on how the URL works, see [Setup and integrate Variable Recurring Payments](/Tiny-doc/tink_docs_home/resources/payments/setup-and-integrate-variable-recurring-payments/).

When a user reaches the end of a flow, they're redirected to the callback URI that you've provided in the URL. The `consent_id` field is added to the URL. When redirected, the URL in your browser looks like this:

`[URL_TO_YOUR_REDIRECT_URI]?consent_id=c63dc11e-b210-4a96-9461-2061389789e7`

If something goes wrong and you don't receive a callback with the `id` value, the flow has failed to complete.

A couple of possible failure reasons:

-   The end user canceled their flow
-   The end user didn't successfully authenticate with their bank

For more information about errors, see [Handle Variable Recurring Payments error codes](/Tiny-doc/tink_docs_home/resources/payments/handle-variable-recurring-payments-error-codes/). The article contains information on both [SDK error codes](/Tiny-doc/tink_docs_home/resources/payments/handle-variable-recurring-payments-error-codes/#sdk-error-codes) and [API error codes](/Tiny-doc/tink_docs_home/resources/payments/handle-variable-recurring-payments-error-codes/#api-error-codes).

### 6\. Check the details and status of a sweeping Variable Recurring Payment mandate[](#check-the-details-and-status-of-a-sweeping-variable-recurring-payment-mandate)

Use the `[external url removed] endpoint to retrieve the status of a sweeping VRP mandate by using its `Id` parameter. For more information on how to check the status of a mandate, see [Read a consent](/Tiny-doc/tink_docs_api/api/#connectivity-v2/consent/read-a-consent) in the API reference.

**Example request**

```
curl --location --request GET '[external url removed]' \
--header 'Authorization: Bearer '
```

**Example response**

```
{
    "consent": {
        "id": "c63dc11e-b210-4a96-9461-2061389789e7",
        "userId": "7c41103806a011edb9390242ac120002",
        "providerId": "uk-natwest-oauth2",
        "appId": "afae2e2a57b64009aa94f593d012b869",
        "state": "ACTIVE",
        "createdAt": "2022-07-22T10:13:39.293Z",
        "authorizedAt": "2022-07-22T15:13:39.293Z",
        "expiresAt": "2022-12-25T10:10:38.850Z",
        "financialService": {
            "type": "MANDATE_PAYMENTS",
            "subtype": "VRP_SWEEPING"
        },
        "financialServiceParameters": {
            "version": "1.0.0",
            "userParameters": {
                "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
                "controlParameters": {
                    "maximumIndividualAmount": {
                        "value": {
                            "unscaledValue": 199,
                            "scale": 2
                        },
                        "currency": "GBP"
                    },
                    "periodicLimits": [
                        {
                            "amount": {
                                "value": {
                                    "unscaledValue": 299,
                                    "scale": 2
                                },
                                "currency": "GBP"
                            },
                            "periodAlignment": "MANDATE",
                            "periodType": "DAY"
                        },
                        {
                            "amount": {
                                "value": {
                                    "unscaledValue": 999,
                                    "scale": 2
                                },
                                "currency": "GBP"
                            },
                            "periodAlignment": "MANDATE",
                            "periodType": "MONTH"
                        }
                    ],
                    "validFrom": "2022-07-25T10:10:38.850Z",
                    "validTo": "2022-12-25T10:10:38.850Z"
                },
                "payeeAccount": {
                    "number": "10000031510604",
                    "name": "Tom John Savings Account",
                    "type": "SORT_CODE"
                },
                "payerAccount": {
                    "number": "60092067037135",
                    "holderName": "Tom John",
                    "type": "SORT_CODE"
                },
                "remittanceInformation": {
                    "reference": "referenceString",
                    "unstructured": "Unstructured Remittance String"
                }
            }
        }
    }
}
```

**Status transitions**

When a mandate is successfully created, its status is immediately set to `INITIALIZED`. When the authorization of the mandate is successful, the mandate status transitions to `ACTIVE`. If the authorization fails, the mandate remains in an `INITIALIZED` state. In case a `validTo` date was specified when creating the mandate, the mandate will transition to `EXPIRED` on the date.

When you have initiated authorization of a sweeping VRP mandate, poll the mandate status every 30 seconds until status `ACTIVE` is returned. If you haven't received status `ACTIVE` after 11 minutes, stop polling as this means that mandate authorization was unsuccessful.

**Note**: a mandate can have many unsuccessful but only one successful authorization. Once a mandate is in an `ACTIVE` state it can’t go back to the `INITIALIZED` state.

The following illustration shows the state model for a mandate.

*Image removed: Payment mandate status*

-   `INITIALIZED`: The mandate has successfully been created with initial values. A created mandate must go through authorization in order to be used to perform any other operation.
-   `ACTIVE`: The mandate has successfully been authorized and can be used to initiate sweeping VRPs.
-   `EXPIRED`: The mandate has reached its expiration date and can no longer be used to initiate sweeping VRPs.
-   `REVOKED`: The mandate has successfully been revoked and can no longer be used to initiate sweeping VRPs.

### 7\. Authenticate your client for Variable Recurring Payments initiation[](#authenticate-your-client-for-variable-recurring-payments-initiation)

Before you initiate a sweeping VRP, you first must generate a new valid client access token with the scopes `mandate-payments` and `mandate-payments:readonly`.

For more information on how to get an access token, see [Get access token](/Tiny-doc/tink_docs_api/api/#general/oauth/get-access-token) in the API reference.

**Note**: access tokens expire and must be renewed, typically in 30 minutes.

**Example request**

```
curl --request POST '[external url removed]' 
--header 'Content-Type: application/x-www-form-urlencoded' 
--header 'Accept: application/json' 
--data-urlencode 'client_id= 
--data-urlencode 'client_secret= 
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'scope=mandate-payments,mandate-payments:readonly'
```

**Example response**

```
{
    "token_type": "bearer",
    "expires_in": 1799,
    "access_token": "{YOUR_CLIENT_ACCESS_TOKEN}",
    "scope": "mandate-payments,mandate-payments:readonly",
    "id_hint": null
}
```

### 8\. Initiate a sweeping Variable Recurring Payment[](#initiate-a-sweeping-variable-recurring-payment)

To initiate a sweeping VRP, use the `[external url removed] endpoint. Use the `consentId` that was issued when creating the sweeping VRP mandate, as described in [Create a sweeping Variable Recurring Payment mandate](#create-a-sweeping-variable-recurring-payment-mandate). When calling this endpoint, Tink issues a response including the provided information together with an `Id`.

Keep a few things in mind:

-   The payment amount must adhere to the limitations set by the corresponding payment mandate’s control parameters. That is:
    -   The payment amount must not exceed the `maximumIndividualAmount` defined on the mandate.
    -   The cumulative amount of payments initiated under the mandate must not exceed the `periodicLimits` defined on the mandate.
-   The `currencyCode` of the payment must match the currency code on the mandate.
-   The `remittanceInformation` set on the payment will be populated to the end-to-end identification at the bank. The remittance information defined on the mandate will be populated to the remittance information of the payment at the bank.
-   The mandate must be in an `ACTIVE` state.
-   In case a `validFrom` date was specified when creating the mandate, a payment cannot be initiated until this date.
-   In case a `merchantId` was specified when creating the mandate, the payment must have a matching `merchantId`.

Initiating a sweeping VRP using a mandate does not require any further authorization by the end user.

For more information on how to initiate a sweeping VRP, see [Create a mandate payment](/Tiny-doc/tink_docs_api/api/#payment/mandate-payment/create-mandate-payment) in the API reference. For more information on how to structure an idempotency key, see [Idempotency and caching](/Tiny-doc/tink_docs_api/api/#introduction/idempotency-and-caching).

**Example request**

```
curl --request POST '[external url removed]'
--header 'Authorization: '
--header 'Idempotency-Key: ' '
--data-raw '{
    "amount": {
        "currencyCode": "GBP",
        "value": {
            "scale": "2",
            "unscaledValue": "100"
        }
    },
    "consentId": "c63dc11e-b210-4a96-9461-2061389789e7",
    "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
    "remittanceInformation": {
        "type": "REFERENCE",
        "value": "ReferenceString"
    }
}'
```

**Example response**

```
{
    "id": "b6704301-8a12-46a5-a315-c3cebd9b899c",
    "consentId": "c63dc11e-b210-4a96-9461-2061389789e7",
    "amount": {
        "value": {
            "unscaledValue": "100",
            "scale": "2"
        },
        "currencyCode": "GBP"
    },
    "remittanceInformation": {
        "type": "REFERENCE",
        "value": "ReferenceString"
    },
    "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
    "status": "CREATED",
    "payeeAccount": {
        "number": "10000031510604",
        "name": "Tom John Savings Account",
        "type": "SORT_CODE"
    },
    "payerAccount": {
        "number": "60092067037135",
        "holderName": "Tom John",
        "type": "SORT_CODE"
    },
    "type": "VRP_SWEEPING",
    "statusMessage": "",
    "createdTime": "2022-10-12T09:35:39.810Z",
    "updatedTime": "2022-10-12T09:35:39.913Z"
}
```

### 9\. Check the details and status of a sweeping Variable Recurring Payment[](#check-the-details-and-status-of-a-sweeping-variable-recurring-payment)

After a sweeping VRP has been initiated, retrieve its details and status by using its `Id` parameter in the `[external url removed] endpoint. For more information on how to check the details and status of a sweeping VRP, see [Get mandate payment](/Tiny-doc/tink_docs_api/api/#payment/mandate-payment/get-mandate-payment). For more information about payment statuses, see [Variable Recurring Payment status transitions](/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/vrp-payment-status-transitions/).

**Example request**

```
curl --request GET [external url removed] \
--header 'Authorization: Bearer ' 
```

**Example response**

```
{
    "id": "b6704301-8a12-46a5-a315-c3cebd9b899c",
    "consentId": "c63dc11e-b210-4a96-9461-2061389789e7",
    "amount": {
        "value": {
            "unscaledValue": "100",
            "scale": "2"
        },
        "currencyCode": "GBP"
    },
    "remittanceInformation": {
        "type": "REFERENCE",
        "value": "ReferenceString"
    },
    "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
    "status": "SENT",
    "payeeAccount": {
        "number": "10000031510604",
        "name": "Tom John Savings Account",
        "type": "SORT_CODE"
    },
    "payerAccount": {
        "number": "60092067037135",
        "holderName": "Tom John",
        "type": "SORT_CODE"
    },
    "type": "VRP_SWEEPING",
    "statusMessage": "",
    "createdTime": "2022-10-12T09:35:39.810Z",
    "updatedTime": "2022-10-12T09:35:55.920Z"
}
```

### 10\. Revoke a sweeping Variable Recurring Payment mandate[](#revoke-a-sweeping-variable-recurring-payment-mandate)

If an end user wants to revoke their VRP mandate to prevent any future payments from being initiated, call the `[external url removed] endpoint to revoke the authorization of a mandate. For more information on how to revoke a VRP mandate, see [Revoke a consent](/Tiny-doc/tink_docs_api/api/#connectivity-v2/consent/revoke-a-consent) in the API reference.

When the revocation of a mandate is successful, the mandate status transition to `REVOKED`. If the revocation fails, the mandate remains in an `ACTIVE` state. To learn more about the state model and how to check the status of a mandate, see [Check the details and status of a Variable Recurring Payment mandate](#check-the-details-and-status-of-a-sweeping-variable-recurring-payment-mandate).

**Note:** When the mandate has been revoked it cannot be reauthorized. A new mandate must be created and the end user needs to go through a new authentication journey.

**Example request**

```
curl --location --request POST '[external url removed]'
--header 'Authorization: Bearer ' \
--header 'Idempotency-Key: '
```

**Example response**

```
{
    "authorization": {
        "consentId": "c63dc11e-b210-4a96-9461-2061389789e7",
        "createdAt": "2022-07-22T10:13:40.293Z",
        "id": "a0655566-bec8-4982-bf79-80f6a6dd2b47",
        "state": "REVOKING",
        "succeededAt": "2022-07-22T10:13:43.293Z"
    },
    "consent": {
        "id": "c63dc11e-b210-4a96-9461-2061389789e7",
        "userId": "7c41103806a011edb9390242ac120002",
        "providerId": "uk-natwest-oauth2",
        "appId": "afae2e2a57b64009aa94f593d012b869",
        "state": "REVOKED",
        "createdAt": "2022-07-22T10:13:39.293Z",
        "expiresAt": "2022-12-25T10:10:38.850Z",
        "authorizedAt": "2022-07-22T10:13:43.293Z",
        "revokedAt": "2022-12-24T09:41:20.367Z",
        "financialService": {
            "type": "MANDATE_PAYMENTS",
            "subtype": "VRP_SWEEPING"
        },
        "financialServiceParameters": {
            "version": "1.0.0",
            "userParameters": {
                "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
                "controlParameters": {
                    "maximumIndividualAmount": {
                        "value": {
                            "unscaledValue": 199,
                            "scale": 2
                        },
                        "currency": "GBP"
                    },
                    "periodicLimits": [
                        {
                            "amount": {
                                "value": {
                                    "unscaledValue": 299,
                                    "scale": 2
                                },
                                "currency": "GBP"
                            },
                            "periodAlignment": "MANDATE",
                            "periodType": "DAY"
                        },
                        {
                            "amount": {
                                "value": {
                                    "unscaledValue": 999,
                                    "scale": 2
                                },
                                "currency": "GBP"
                            },
                            "periodAlignment": "MANDATE",
                            "periodType": "MONTH"
                        }
                    ],
                    "validFrom": "2022-07-25T10:10:38.850Z",
                    "validTo": "2022-12-25T10:10:38.850Z"
                },
                "payeeAccount": {
                    "number": "10000031510604",
                    "name": "Tom John Savings Account",
                    "type": "SORT_CODE"
                },
                "payerAccount": {
                    "number": "60092067037135",
                    "holderName": "Tom John",
                    "type": "SORT_CODE"
                },
                "remittanceInformation": {
                    "reference": "referenceString",
                    "unstructured": "Unstructured Remittance String"
                }
            }
        }
    }
}
```
