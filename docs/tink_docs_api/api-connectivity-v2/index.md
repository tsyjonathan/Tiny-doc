---
title: "Tink Docs"
source: "/Tiny-doc/tink_docs_api/api-connectivity-v2/"
exportedAt: "2026-01-13T13:02:34.241Z"
---
## Connectivity v2[](/Tiny-doc/tink_docs_api/api-connectivity-v2/)

The Authorization and Consent models contain information on what is required to authenticate end users and obtain consent to access their financial services.

The Authorization model represents an attempt to authorize a consent.

### The Authorization model[](#connectivity-v2/authorization/the-authorization-model)

appUri `string`

The end user will be redirected to this URI after the authorization code has been delivered. This field is used for flows where we have third party redirects to financial institutions. There is a default value which is tink://open. It can be any type of URI (mobile deeplink, http address etc.)

callbackUri `string`

This URI will be used by the ASPSP to pass the authorization code. It corresponds to the redirect/callback URI in OAuth2/OpenId. This parameter is only applicable if you are a TPP.

canceledAt `Date`

Timestamp at which the authorization was canceled.

consentId `string` required

The consent unique id that the authorization is connected to.

createdAt `Date` required

Timestamp at which the authorization was created.

detailedError `ConnectivityError`

failedAt `Date`

Timestamp at which the authorization failed.

id `string` required

Unique id of the authorization.

originatingUserIp `string` required

The originating user's remote IP address of the corresponding HTTP request.

revokedAt `Date`

Timestamp at which the authorization was revoked.

state `string` required

The current state of the authorization.  
Values: `ONGOING`, `AWAITING_INPUT`, `SUCCEEDED`, `FAILED`, `CANCELED`, `REVOKING`, `REVOKED`

succeededAt `Date`

Timestamp at which the authorization succeeded.

supplementalInformation `AuthorizationSupplementalInformation`

#### ConnectivityError[](#connectivity-v2/authorization/the-authorization-model/connectivityerror)

When a problem occurs while attempting to connect to a bank, Tink's API returns a connectivity error. There are different error types, each of them accompanied by a detailed reason for the error. The tables below lists all related error reasons for each of the error types, along with their descriptions, to help diagnose and resolve any issues.

##### TINK\_SIDE\_ERROR[](#connectivity-v2/authorization/the-authorization-model/connectivityerror/tink_side_error)

| Reason | Description |
| --- | --- |
| UNKNOWN\_ERROR | Unknown unexpected error on Tink side |
| TINK\_INTERNAL\_SERVER\_ERROR | Explicit unexpected error on Tink side |
| AUTHENTICATION\_METHOD\_NOT\_SUPPORTED | The authentication method that the user picked was not supported by Tink. Tink always tries to prevent this from happening in the first place. |

##### PROVIDER\_ERROR[](#connectivity-v2/authorization/the-authorization-model/connectivityerror/provider_error)

| Reason | Description |
| --- | --- |
| PROVIDER\_UNAVAILABLE | Financial Service (provider/bank/ASPSP) is technically unavailable or doesn't respond when Tink is sending requests |
| LICENSED\_PARTY\_REJECTED | Financial Service rejects the licenced party (TPP/OB registrate) or eIDAS certificate. This happens if Tink's license is rejected |
| UNKNOWN\_PROVIDER\_ERROR | Financial Service returns an unknown or unexpected response |

##### USER\_LOGIN\_ERROR[](#connectivity-v2/authorization/the-authorization-model/connectivityerror/user_login_error)

| Reason | Description |
| --- | --- |
| THIRD\_PARTY\_AUTHENTICATION\_UNAVAILABLE | Mobile BankID or any other required third-party is technically unavailable |
| STATIC\_CREDENTIALS\_INCORRECT | Values of provided fields are rejected by the provider. Clarification: Refers to user credentials stored with Tink, that is, the static fields on credentials. To recover from this, customer needs to update the values in the user's Tink Credential field |
| DYNAMIC\_CREDENTIALS\_INCORRECT | OTPs/card-reader codes/third-party app codes are rejected by Provider. Examples: OTP entered after being redirected to bank’s page is incorrect, or OTP entered in Tink URL is incorrect |
| DYNAMIC\_CREDENTIALS\_FLOW\_CANCELLED | Deliberate cancellation of dynamic authentication flow (multi-factor authentication). For example, when cancelling a Mobile Bank ID or OAuth2 journey on the Financial Service side |
| DYNAMIC\_CREDENTIALS\_FLOW\_TIMEOUT | Financial Service has indicated that the dynamic flow (multi-factor authentication, for example, BankID and OTPs.)) has timed out, or the Tink deadline of 2, 3, or 9 min (Supplemental info, Mobile BankID respectively OB flows) times out before getting answer from bank |
| USER\_NOT\_A\_CUSTOMER | Financial Service responds that the identity used to authenticate is not a customer at the current provider, or has no engagement with the provider |
| USER\_BLOCKED | Financial Service responds that the identity used to authenticate is blocked and the user can not authenticate successfully |
| USER\_CONCURRENT\_LOGINS | When Financial Service or third party app doesn’t allow to have parallel sessions |

##### AUTHORIZATION\_ERROR[](#connectivity-v2/authorization/the-authorization-model/connectivityerror/authorization_error)

| Reason | Description |
| --- | --- |
| ACTION\_NOT\_PERMITTED | Financial Service responds that the identity used to authenticate does not have permission to perform the operation |
| SESSION\_EXPIRED | Access/Refresh-token combo is expired, requires re-authentication. Should only happen if the user is not present. When user is in fact present, Tink automatically goes into re-authentication flow |
| USER\_ACTION\_REQUIRED | User has successfully authenticated and is in a bank flow, but there is a step where they are required to take some manual action + that Tink cannot handle automatically (e.g. sign an agreement or change a setting) |

##### ACCOUNT\_INFORMATION\_ERROR[](#connectivity-v2/authorization/the-authorization-model/connectivityerror/account_information_error)

| Reason | Description |
| --- | --- |
| NO\_ACCOUNTS | User authentication was successful, but the end result was that no data was available to be stored on the Tink user |

details `ConnectivityErrorDetails`

displayMessage `string`

A message for the end-user.

type `string`

Type of the error.  
Values: `UNKNOWN_ERROR`, `TINK_SIDE_ERROR`, `PROVIDER_ERROR`, `USER_LOGIN_ERROR`, `AUTHORIZATION_ERROR`, `ACCOUNT_INFORMATION_ERROR`, `PAYMENT_INITIATION_ERROR`

#### ConnectivityErrorDetails[](#connectivity-v2/authorization/the-authorization-model/connectivityerrordetails)

reason `string`

A detailed error reason for the type specified.

A key-value structure to handle if the status of authorization is `AWAITING_INPUT`.

id `string` required

Unique id of the supplemental information.

redirectUri `string`

A URL to redirect the user to in order to continue the authorization flow.

## List authorizationsBeta[](#connectivity-v2/authorization/list-authorizations)

`GET /connectivity/v2/consents/{consentId}/authorizations`

### Works with[](#connectivity-v2/authorization/list-authorizations/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `consents` |
| User token | `consents:readonly` |
| Client token | `consents` |
| Client token | `consents:readonly` |

### Parameters[](#connectivity-v2/authorization/list-authorizations/parameters)

| Parameter | Description |
| --- | --- |
| consentIdrequired | The consent id. |

### Query Parameters[](#connectivity-v2/authorization/list-authorizations/query-parameters)

| Parameter | Description |
| --- | --- |
| page\_token | Base64 encoded string pointing to the page that should be listed. All filtering parameters should be equal to the request for which this page\_token was obtained as a response. |
| page\_size | Indicates maximum size for the array of returned authorizations. Accepted values 1-100. Default 10. |

> Response Example

```
{
  "authorizations": [
    {
      "appUri": "string",
      "callbackUri": "string",
      "canceledAt": "2022-11-28T08:42:33.408Z",
      "consentId": "c63dc11e-b210-4a96-9461-2061389789e7",
      "createdAt": "2022-11-28T08:42:33.408Z",
      "detailedError": {
        "details": {
          "reason": "STATIC_CREDENTIALS_INCORRECT"
        },
        "displayMessage": "The bank rejected the login credentials that you entered.",
        "type": "USER_LOGIN_ERROR"
      },
      "failedAt": "2022-11-28T08:42:33.408Z",
      "id": "c63dc11e-b210-4a96-9461-2061389789e7",
      "originatingUserIp": "198.51.100.10",
      "revokedAt": "2022-11-28T08:42:33.408Z",
      "state": "ONGOING",
      "succeededAt": "2022-11-28T08:45:33.408Z",
      "supplementalInformation": {
        "id": "c63dc11e-b210-4a96-9461-2061389789e7",
        "redirectUri": "[external url removed]"
      }
    }
  ],
  "nextPageToken": "ZDU0N2M0YTVkZTk3NGIxODkxMjNmZWVmYzEwNjQxZDg="
}
```

### Response: GetAuthorizationsResponse[](#connectivity-v2/authorization/list-authorizations/response-getauthorizationsresponse)

authorizations `array[[Authorization](#tag-authorization)]`

nextPageToken `string`

Base64 encoded string pointing to the next page that should be listed. All filtering parameters should be equal to this request when using this token to fetch the next page of authorizations.

| Status Code | Description |
| --- | --- |
| 200 | Authorizations successfully fetched. |
| 400 | Invalid input. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |
| 500 | Internal server error. |

## Read authorizationBeta[](#connectivity-v2/authorization/read-authorization)

`GET /connectivity/v2/consents/{consentId}/authorizations/{authorizationId}`

### Works with[](#connectivity-v2/authorization/read-authorization/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `consents` |
| User token | `consents:readonly` |
| Client token | `consents` |
| Client token | `consents:readonly` |

### Parameters[](#connectivity-v2/authorization/read-authorization/parameters)

| Parameter | Description |
| --- | --- |
| consentIdrequired | The consent id. |
| authorizationIdrequired | The authorization id. |

> Response Example

```
{
  "authorization": {
    "appUri": "string",
    "callbackUri": "string",
    "canceledAt": "2022-11-28T08:42:33.408Z",
    "consentId": "c63dc11e-b210-4a96-9461-2061389789e7",
    "createdAt": "2022-11-28T08:42:33.408Z",
    "detailedError": {
      "details": {
        "reason": "STATIC_CREDENTIALS_INCORRECT"
      },
      "displayMessage": "The bank rejected the login credentials that you entered.",
      "type": "USER_LOGIN_ERROR"
    },
    "failedAt": "2022-11-28T08:42:33.408Z",
    "id": "c63dc11e-b210-4a96-9461-2061389789e7",
    "originatingUserIp": "198.51.100.10",
    "revokedAt": "2022-11-28T08:42:33.408Z",
    "state": "ONGOING",
    "succeededAt": "2022-11-28T08:45:33.408Z",
    "supplementalInformation": {
      "id": "c63dc11e-b210-4a96-9461-2061389789e7",
      "redirectUri": "[external url removed]"
    }
  }
}
```

### Response: GetAuthorizationResponse[](#connectivity-v2/authorization/read-authorization/response-getauthorizationresponse)

authorization `[Authorization](#tag-authorization)`

| Status Code | Description |
| --- | --- |
| 200 | Authorization successfully fetched. |
| 400 | Invalid input. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |
| 404 | Authorization not found. |
| 500 | Internal server error. |

## Relayed callback for redirect flowsBeta[](#connectivity-v2/authorization/relayed-callback-for-redirect-flows)

`POST /connectivity/v2/authorizations:relay-callback`

Send url-decoded callback information from an ASPSP.

### Works with[](#connectivity-v2/authorization/relayed-callback-for-redirect-flows/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `consents` |

> Request Example

```
{
  "parameters": {
    "parameter1": "value1",
    "parameter2": "value2",
    "parameterN": "valueN"
  },
  "state": "aG93IHNuZWFreSBvZiB5b3UgdG8gZGVjb2RlIGV4YW1wbGUgc3RhdGU="
}
```

### Request Body: RelayedCallbackRequest[](#connectivity-v2/authorization/relayed-callback-for-redirect-flows/request-body-relayedcallbackrequest)

The callback response from the ASPSP in a JSON format.

parameters `object`

The post parameters from the received callback from the ASPSP. Contains the parameters necessary for the integration to continue the communication with the ASPSP.

state `string` required

The state from the received callback from the ASPSP. Used by Tink to connect the incoming callback to the correct session.

| Status Code | Description |
| --- | --- |
| 204 | Callback information submitted. |
| 400 | Invalid input. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |
| 500 | Internal server error. |

## Start authorization for a consentBeta[](#connectivity-v2/authorization/start-authorization-for-a-consent)

`POST /connectivity/v2/consents/{consentId}/authorizations`

### Works with[](#connectivity-v2/authorization/start-authorization-for-a-consent/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `consents` |

### Parameters[](#connectivity-v2/authorization/start-authorization-for-a-consent/parameters)

| Parameter | Description |
| --- | --- |
| consentIdrequired | The id of the consent that the authorization is connected to. |

| Parameter | Description |
| --- | --- |
| Idempotency-Keyrequired | An idempotency key is any unique key generated by the client which the resource server uses to recognize subsequent retries of the same request. The Idempotency-Key HTTP request header field carries this key. |

> Request Example

```
{
  "appUri": "[external url removed]",
  "callbackUri": "[external url removed]"
}
```

### Request Body: CreateAuthorizationRequest[](#connectivity-v2/authorization/start-authorization-for-a-consent/request-body-createauthorizationrequest)

Provide parameters used during this authorization attempt.

appUri `string`

The end user will be redirected to this URI after the authorization code has been delivered. This field is used for flows where we have third party redirects to financial institutions. There is a default value which is tink://open. It can be any type of URI (mobile deeplink, http address etc.)

callbackUri `string`

This URI will be used by the ASPSP to pass the authorization code. It corresponds to the redirect/callback URI in OAuth2/OpenId. This parameter is only applicable if you are a TPP.

> Response Example

```
{
  "authorization": {
    "appUri": "string",
    "callbackUri": "string",
    "canceledAt": "2022-11-28T08:42:33.408Z",
    "consentId": "c63dc11e-b210-4a96-9461-2061389789e7",
    "createdAt": "2022-11-28T08:42:33.408Z",
    "detailedError": {
      "details": {
        "reason": "STATIC_CREDENTIALS_INCORRECT"
      },
      "displayMessage": "The bank rejected the login credentials that you entered.",
      "type": "USER_LOGIN_ERROR"
    },
    "failedAt": "2022-11-28T08:42:33.408Z",
    "id": "c63dc11e-b210-4a96-9461-2061389789e7",
    "originatingUserIp": "198.51.100.10",
    "revokedAt": "2022-11-28T08:42:33.408Z",
    "state": "ONGOING",
    "succeededAt": "2022-11-28T08:45:33.408Z",
    "supplementalInformation": {
      "id": "c63dc11e-b210-4a96-9461-2061389789e7",
      "redirectUri": "[external url removed]"
    }
  }
}
```

### Response: CreateAuthorizationResponse[](#connectivity-v2/authorization/start-authorization-for-a-consent/response-createauthorizationresponse)

authorization `[Authorization](#tag-authorization)`

| Status Code | Description |
| --- | --- |
| 202 | Authorization successfully started. |
| 400 | Invalid input. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |
| 404 | Consent not found. |
| 409 | Request retried while the original request is still being processed. |
| 422 | Attempt to reuse an idempotency key with a different request payload. |
| 500 | Internal server error. |

## Consent[](#connectivity-v2/consent)

The Consent model represents all the data needed by Tink to be able to access end user data from a specific financial institution.

### The Consent model[](#connectivity-v2/consent/the-consent-model)

appId `string` required

The unique id of the app that the consent is connected to.

authorizedAt `Date`

Timestamp at which the consent was authorized

createdAt `Date` required

Timestamp at which the consent was created

expiresAt `Date`

Timestamp at which the consent expires

financialService `FinancialService` required

financialServiceParameters `FinancialServiceParameters` required

id `string` required

Unique id of the consent.

providerId `string` required

The provider (financial institution) name that the consent is connected to.

revokedAt `Date`

Timestamp at which the consent was revoked

state `string` required

The current state of the consent.  
Values: `INITIALIZED`, `ACTIVE`, `EXPIRED`, `REVOKED`

userId `string` required

The user unique id that the consent is connected to.

#### FinancialService[](#connectivity-v2/consent/the-consent-model/financialservice)

subtype `string` required

Subtype of the financial service this consent is created for.  
Values: `VRP_SWEEPING`, `VRP_COMMERCIAL`

type `string` required

Type of financial service this consent is created for.  
Values: `MANDATE_PAYMENTS`

#### FinancialServiceParameters[](#connectivity-v2/consent/the-consent-model/financialserviceparameters)

userParameters `object` required

Parameters required when creating a consent of given type. Those parameters must be valid against the consent template schema. See [Get Consent Template](#connectivity-v2/consent-templates/get-consent-template).

version `string` required

Semantic version of the template for the given type and subtype.

## Create a new consentBeta[](#connectivity-v2/consent/create-a-new-consent)

`POST /connectivity/v2/consents`

### Works with[](#connectivity-v2/consent/create-a-new-consent/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `consents` |

| Parameter | Description |
| --- | --- |
| Idempotency-Keyrequired | An idempotency key is any value generated by the client which the resource server uses to recognize subsequent retries of the same request. The Idempotency-Key HTTP request header field carries this key. |

> Request Example

```
{
  "financialService": {
    "subtype": "VRP_SWEEPING",
    "type": "MANDATE_PAYMENTS"
  },
  "financialServiceParameters": {
    "userParameters": {
      "controlParameters": {
        "maximumIndividualAmount": {
          "currency": "GBP",
          "value": {
            "scale": 2,
            "unscaledValue": 199
          }
        },
        "periodicLimits": [
          {
            "amount": {
              "currency": "GBP",
              "value": {
                "scale": 2,
                "unscaledValue": 299
              }
            },
            "periodAlignment": "MANDATE",
            "periodType": "DAY"
          },
          {
            "amount": {
              "currency": "GBP",
              "value": {
                "scale": 2,
                "unscaledValue": 999
              }
            },
            "periodAlignment": "MANDATE",
            "periodType": "MONTH"
          }
        ],
        "validFrom": "2022-07-25T10:10:38.850Z",
        "validTo": "2022-12-25T10:10:38.850Z"
      },
      "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
      "payeeAccount": {
        "name": "Tom John Savings Account",
        "number": "10000031510604",
        "type": "SORT_CODE"
      },
      "payerAccount": {
        "holderName": "Tom John",
        "number": "60092067037135",
        "type": "SORT_CODE"
      }
    },
    "version": "1.0.0"
  },
  "providerId": "se-nordea-ob",
  "userId": "7c41103806a011edb9390242ac120002"
}
```

### Request Body: CreateConsentRequest[](#connectivity-v2/consent/create-a-new-consent/request-body-createconsentrequest)

Provide the consent parameters.

financialService `[FinancialService](#tag-consent-financialservice)` required

financialServiceParameters `[FinancialServiceParameters](#tag-consent-financialserviceparameters)` required

providerId `string` required

The provider (financial institution) name that the consent is connected to.

userId `string` required

The user unique id that the consent is connected to.

> Response Example

```
{
  "consent": {
    "appId": "afae2e2a57b64009aa94f593d012b869",
    "authorizedAt": "2022-11-28T08:45:33.408Z",
    "createdAt": "2022-11-28T08:35:33.408Z",
    "expiresAt": "2022-12-28T08:35:33.408Z",
    "financialService": {
      "subtype": "VRP_SWEEPING",
      "type": "MANDATE_PAYMENTS"
    },
    "financialServiceParameters": {
      "userParameters": {
        "controlParameters": {
          "maximumIndividualAmount": {
            "currency": "GBP",
            "value": {
              "scale": 2,
              "unscaledValue": 199
            }
          },
          "periodicLimits": [
            {
              "amount": {
                "currency": "GBP",
                "value": {
                  "scale": 2,
                  "unscaledValue": 299
                }
              },
              "periodAlignment": "MANDATE",
              "periodType": "DAY"
            },
            {
              "amount": {
                "currency": "GBP",
                "value": {
                  "scale": 2,
                  "unscaledValue": 999
                }
              },
              "periodAlignment": "MANDATE",
              "periodType": "MONTH"
            }
          ],
          "validFrom": "2022-07-25T10:10:38.850Z",
          "validTo": "2022-12-25T10:10:38.850Z"
        },
        "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
        "payeeAccount": {
          "name": "Tom John Savings Account",
          "number": "10000031510604",
          "type": "SORT_CODE"
        },
        "payerAccount": {
          "holderName": "Tom John",
          "number": "60092067037135",
          "type": "SORT_CODE"
        }
      },
      "version": "1.0.0"
    },
    "id": "c63dc11e-b210-4a96-9461-2061389789e7",
    "providerId": "se-nordea-ob",
    "revokedAt": "2022-12-24T08:35:33.408Z",
    "state": "INITIALIZED",
    "userId": "7c41103806a011edb9390242ac120002"
  }
}
```

### Response: CreateConsentResponse[](#connectivity-v2/consent/create-a-new-consent/response-createconsentresponse)

consent `[Consent](#tag-consent)`

| Status Code | Description |
| --- | --- |
| 201 | Consent successfully created. |
| 400 | Invalid input. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |
| 409 | Request retried while the original request is still being processed. |
| 422 | Attempt to reuse an idempotency key with a different request payload. |
| 500 | Internal server error. |

## List consentsBeta[](#connectivity-v2/consent/list-consents)

`GET /connectivity/v2/consents`

### Works with[](#connectivity-v2/consent/list-consents/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `consents` |
| User token | `consents:readonly` |
| Client token | `consents` |
| Client token | `consents:readonly` |

### Query Parameters[](#connectivity-v2/consent/list-consents/query-parameters)

| Parameter | Description |
| --- | --- |
| page\_token | Base64 encoded string pointing to the page that should be listed. All filtering parameters should be equal to the request for which this page\_token was obtained as a response. |
| page\_size | Indicates maximum size for the array of returned consents Accepted values 1-100. Default 10. |

> Response Example

```
{
  "consents": [
    {
      "appId": "afae2e2a57b64009aa94f593d012b869",
      "authorizedAt": "2022-11-28T08:45:33.408Z",
      "createdAt": "2022-11-28T08:35:33.408Z",
      "expiresAt": "2022-12-28T08:35:33.408Z",
      "financialService": {
        "subtype": "VRP_SWEEPING",
        "type": "MANDATE_PAYMENTS"
      },
      "financialServiceParameters": {
        "userParameters": {
          "controlParameters": {
            "maximumIndividualAmount": {
              "currency": "GBP",
              "value": {
                "scale": 2,
                "unscaledValue": 199
              }
            },
            "periodicLimits": [
              {
                "amount": {
                  "currency": "GBP",
                  "value": {
                    "scale": 2,
                    "unscaledValue": 299
                  }
                },
                "periodAlignment": "MANDATE",
                "periodType": "DAY"
              },
              {
                "amount": {
                  "currency": "GBP",
                  "value": {
                    "scale": 2,
                    "unscaledValue": 999
                  }
                },
                "periodAlignment": "MANDATE",
                "periodType": "MONTH"
              }
            ],
            "validFrom": "2022-07-25T10:10:38.850Z",
            "validTo": "2022-12-25T10:10:38.850Z"
          },
          "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
          "payeeAccount": {
            "name": "Tom John Savings Account",
            "number": "10000031510604",
            "type": "SORT_CODE"
          },
          "payerAccount": {
            "holderName": "Tom John",
            "number": "60092067037135",
            "type": "SORT_CODE"
          }
        },
        "version": "1.0.0"
      },
      "id": "c63dc11e-b210-4a96-9461-2061389789e7",
      "providerId": "se-nordea-ob",
      "revokedAt": "2022-12-24T08:35:33.408Z",
      "state": "INITIALIZED",
      "userId": "7c41103806a011edb9390242ac120002"
    }
  ],
  "nextPageToken": "ZDU0N2M0YTVkZTk3NGIxODkxMjNmZWVmYzEwNjQxZDg="
}
```

### Response: GetConsentsResponse[](#connectivity-v2/consent/list-consents/response-getconsentsresponse)

consents `array[[Consent](#tag-consent)]`

nextPageToken `string`

Base64 encoded string pointing to the next page that should be listed. All filtering parameters should be equal to this request when using this token to fetch the next page of consents.

| Status Code | Description |
| --- | --- |
| 200 | Consents successfully fetched. |
| 400 | Invalid input. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |
| 500 | Internal server error. |

## Read a consentBeta[](#connectivity-v2/consent/read-a-consent)

`GET /connectivity/v2/consents/{consentId}`

### Works with[](#connectivity-v2/consent/read-a-consent/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| User token | `consents` |
| User token | `consents:readonly` |
| Client token | `consents` |
| Client token | `consents:readonly` |

### Parameters[](#connectivity-v2/consent/read-a-consent/parameters)

| Parameter | Description |
| --- | --- |
| consentIdrequired | The consent id. |

> Response Example

```
{
  "consent": {
    "appId": "afae2e2a57b64009aa94f593d012b869",
    "authorizedAt": "2022-11-28T08:45:33.408Z",
    "createdAt": "2022-11-28T08:35:33.408Z",
    "expiresAt": "2022-12-28T08:35:33.408Z",
    "financialService": {
      "subtype": "VRP_SWEEPING",
      "type": "MANDATE_PAYMENTS"
    },
    "financialServiceParameters": {
      "userParameters": {
        "controlParameters": {
          "maximumIndividualAmount": {
            "currency": "GBP",
            "value": {
              "scale": 2,
              "unscaledValue": 199
            }
          },
          "periodicLimits": [
            {
              "amount": {
                "currency": "GBP",
                "value": {
                  "scale": 2,
                  "unscaledValue": 299
                }
              },
              "periodAlignment": "MANDATE",
              "periodType": "DAY"
            },
            {
              "amount": {
                "currency": "GBP",
                "value": {
                  "scale": 2,
                  "unscaledValue": 999
                }
              },
              "periodAlignment": "MANDATE",
              "periodType": "MONTH"
            }
          ],
          "validFrom": "2022-07-25T10:10:38.850Z",
          "validTo": "2022-12-25T10:10:38.850Z"
        },
        "merchantId": "9a1e5197-33ad-4f17-8338-0861a69ed1d0",
        "payeeAccount": {
          "name": "Tom John Savings Account",
          "number": "10000031510604",
          "type": "SORT_CODE"
        },
        "payerAccount": {
          "holderName": "Tom John",
          "number": "60092067037135",
          "type": "SORT_CODE"
        }
      },
      "version": "1.0.0"
    },
    "id": "c63dc11e-b210-4a96-9461-2061389789e7",
    "providerId": "se-nordea-ob",
    "revokedAt": "2022-12-24T08:35:33.408Z",
    "state": "INITIALIZED",
    "userId": "7c41103806a011edb9390242ac120002"
  }
}
```

### Response: GetConsentResponse[](#connectivity-v2/consent/read-a-consent/response-getconsentresponse)

consent `[Consent](#tag-consent)`

| Status Code | Description |
| --- | --- |
| 200 | Consent successfully fetched. |
| 400 | Invalid input. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |
| 404 | Consent not found. |
| 500 | Internal server error. |

## Revoke a consentBeta[](#connectivity-v2/consent/revoke-a-consent)

`POST /connectivity/v2/consents/{consentId}:revoke`

### Works with[](#connectivity-v2/consent/revoke-a-consent/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `consents` |

### Parameters[](#connectivity-v2/consent/revoke-a-consent/parameters)

| Parameter | Description |
| --- | --- |
| consentIdrequired | The consent id. |

| Parameter | Description |
| --- | --- |
| Idempotency-Keyrequired | An idempotency key is any unique key generated by the client which the resource server uses to recognize subsequent retries of the same request. The Idempotency-Key HTTP request header field carries this key. |

> Response Example

```
{
  "authorization": {
    "consentId": "c63dc11e-b210-4a96-9461-2061389789e7",
    "createdAt": "2022-12-26T21:33:12.000Z",
    "id": "a0655566-bec8-4982-bf79-80f6a6dd2b47",
    "state": "REVOKING",
    "succeededAt": "2022-12-26T21:35:11.000Z"
  },
  "consent": {
    "appId": "afae2e2a57b64009aa94f593d012b869",
    "authorizedAt": "2022-12-26T21:35:11.000Z",
    "createdAt": "2022-12-26T21:32:12.000Z",
    "financialService": {
      "subtype": "VRP_SWEEPING",
      "type": "MANDATE_PAYMENTS"
    },
    "financialServiceParameters": {
      "userParameters": {
        "parameter": "value"
      },
      "version": "1.0.0"
    },
    "id": "c63dc11e-b210-4a96-9461-2061389789e7",
    "providerId": "uk-natwest-oauth2",
    "revokedAt": "2022-12-26T21:32:12.000Z",
    "state": "REVOKED",
    "userId": "7c41103806a011edb9390242ac120002"
  }
}
```

### Response: RevokeConsentResponse[](#connectivity-v2/consent/revoke-a-consent/response-revokeconsentresponse)

authorization `Authorization`

consent `[Consent](#tag-consent)`

#### Authorization[](#connectivity-v2/consent/revoke-a-consent/response-revokeconsentresponse/authorization)

appUri `string`

The end user will be redirected to this URI after the authorization code has been delivered. This field is used for flows where we have third party redirects to financial institutions. There is a default value which is tink://open. It can be any type of URI (mobile deeplink, http address etc.)

callbackUri `string`

This URI will be used by the ASPSP to pass the authorization code. It corresponds to the redirect/callback URI in OAuth2/OpenId. This parameter is only applicable if you are a TPP.

canceledAt `Date`

Timestamp at which the authorization was canceled.

consentId `string` required

The consent unique id that the authorization is connected to.

createdAt `Date` required

Timestamp at which the authorization was created.

detailedError `ConnectivityError`

failedAt `Date`

Timestamp at which the authorization failed.

id `string` required

Unique id of the authorization.

originatingUserIp `string` required

The originating user's remote IP address of the corresponding HTTP request.

revokedAt `Date`

Timestamp at which the authorization was revoked.

state `string` required

The current state of the authorization.  
Values: `ONGOING`, `AWAITING_INPUT`, `SUCCEEDED`, `FAILED`, `CANCELED`, `REVOKING`, `REVOKED`

succeededAt `Date`

Timestamp at which the authorization succeeded.

supplementalInformation `AuthorizationSupplementalInformation`

#### ConnectivityError[](#connectivity-v2/consent/revoke-a-consent/response-revokeconsentresponse/connectivityerror)

details `ConnectivityErrorDetails`

displayMessage `string`

A message for the end-user.

type `string`

Type of the error.  
Values: `UNKNOWN_ERROR`, `TINK_SIDE_ERROR`, `PROVIDER_ERROR`, `USER_LOGIN_ERROR`, `AUTHORIZATION_ERROR`, `ACCOUNT_INFORMATION_ERROR`, `PAYMENT_INITIATION_ERROR`

#### ConnectivityErrorDetails[](#connectivity-v2/consent/revoke-a-consent/response-revokeconsentresponse/connectivityerrordetails)

reason `string`

A detailed error reason for the type specified.

id `string` required

Unique id of the supplemental information.

redirectUri `string`

A URL to redirect the user to in order to continue the authorization flow.

| Status Code | Description |
| --- | --- |
| 202 | Revocation successfully started. |
| 400 | Invalid input. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |
| 404 | Consent not found. |
| 409 | Request retried while the original request is still being processed. |
| 422 | Attempt to reuse an idempotency key with a different request payload. |
| 500 | Internal server error. |

## Consent Templates[](#connectivity-v2/consent-templates)

## Get consent templateBeta[](#connectivity-v2/consent-templates/get-consent-template)

`GET /connectivity/v2/consent-templates/{providerId}`

Request a JSON schema template that's used to create a mandate.

### Works with[](#connectivity-v2/consent-templates/get-consent-template/works-with)

| ACCEPTED TOKEN TYPES | REQUIRED SCOPES |
| --- | --- |
| Client token | `consents` |
| Client token | `consents:readonly` |

### Parameters[](#connectivity-v2/consent-templates/get-consent-template/parameters)

| Parameter | Description |
| --- | --- |
| providerIdrequired | The provider (financial institution) name. |

### Query Parameters[](#connectivity-v2/consent-templates/get-consent-template/query-parameters)

| Parameter | Description |
| --- | --- |
| type | Type of the financial service.  
Values: `MANDATE_PAYMENTS` |
| subType | Subtype of the financial service.  
Values: `VRP_SWEEPING`, `VRP_COMMERCIAL` |

> Response Example

```
{
  "templates": [
    {
      "deprecated": false,
      "schema": {
        "$defs": {
          "AccountType": {
            "const": "SORT_CODE",
            "type": "string"
          },
          "CurrencyDenominatedAmount": {
            "properties": {
              "currency": {
                "description": "The currency code which follows ISO-4217 standard.",
                "type": "string"
              },
              "value": {
                "description": "Maximum allowed amount.",
                "properties": {
                  "scale": {
                    "minimum": 0,
                    "type": "integer"
                  },
                  "unscaledValue": {
                    "minimum": 1,
                    "type": "integer"
                  }
                },
                "required": [
                  "scale",
                  "unscaledValue"
                ],
                "type": "object"
              }
            },
            "required": [
              "currency",
              "value"
            ],
            "type": "object"
          }
        },
        "$schema": "[external url removed]",
        "properties": {
          "controlParameters": {
            "description": "Control parameters.",
            "properties": {
              "maximumIndividualAmount": {
                "$ref": "#/$defs/CurrencyDenominatedAmount",
                "description": "Maximum allowed amount for individual payment. Lowest supported value is GBP 1.00."
              },
              "periodicLimits": {
                "description": "List of periodic limits.",
                "items": {
                  "properties": {
                    "amount": {
                      "$ref": "#/$defs/CurrencyDenominatedAmount",
                      "description": "Maximum allowed amount for periodic limit. Lowest supported value is GBP 1.00."
                    },
                    "periodAlignment": {
                      "const": "MANDATE",
                      "description": "Period alignment.",
                      "type": "string"
                    },
                    "periodType": {
                      "description": "List of allowed period types for periodic limits.",
                      "enum": [
                        "DAY",
                        "WEEK",
                        "FORTNIGHT",
                        "MONTH",
                        "HALF_YEAR",
                        "YEAR"
                      ],
                      "type": "string"
                    }
                  },
                  "required": [
                    "amount",
                    "periodAlignment",
                    "periodType"
                  ],
                  "type": "object"
                },
                "minItems": 1,
                "type": "array"
              },
              "validFrom": {
                "description": "Time from which mandate is valid.",
                "format": "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                "type": "string"
              },
              "validTo": {
                "description": "Time to which mandate is valid.",
                "format": "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
                "type": "string"
              }
            },
            "required": [
              "maximumIndividualAmount",
              "periodicLimits"
            ],
            "type": "object"
          },
          "merchantId": {
            "description": "The merchant id for a mandate.",
            "type": "string"
          },
          "payeeAccount": {
            "description": "Payee account.",
            "properties": {
              "name": {
                "description": "Name of the account, as assigned by the account servicing institution.",
                "maxLength": 35,
                "minLength": 1,
                "type": "string"
              },
              "number": {
                "description": "Number assigned by an institution to identify an account. This identifier is known by the account owner.",
                "type": "string"
              },
              "type": {
                "$ref": "#/$defs/AccountType",
                "const": "SORT_CODE",
                "default": "SORT_CODE",
                "description": "The identification scheme for the account, in a coded form."
              }
            },
            "required": [
              "name",
              "number",
              "type"
            ],
            "type": "object"
          },
          "payerAccount": {
            "description": "Payer account.",
            "properties": {
              "holderName": {
                "description": "The name of the account owner.",
                "maxLength": 35,
                "minLength": 1,
                "type": "string"
              },
              "number": {
                "description": "Number assigned by an institution to identify an account. This identifier is known by the account owner.",
                "type": "string"
              },
              "type": {
                "$ref": "#/$defs/AccountType",
                "const": "SORT_CODE",
                "default": "SORT_CODE",
                "description": "The identification scheme for the account, in a coded form."
              }
            },
            "required": [
              "holderName",
              "number",
              "type"
            ],
            "type": "object"
          },
          "remittanceInformation": {
            "description": "Information supplied to enable the matching of an entry.",
            "properties": {
              "reference": {
                "description": "The structured remittance information.",
                "maxLength": 18,
                "minLength": 1,
                "type": "string"
              },
              "unstructured": {
                "description": "The unstructured remittance information.",
                "maxLength": 140,
                "minLength": 1,
                "type": "string"
              }
            },
            "required": [
              "reference"
            ],
            "type": "object"
          }
        },
        "required": [
          "controlParameters",
          "payeeAccount",
          "remittanceInformation"
        ],
        "type": "object"
      },
      "subtype": "VRP_SWEEPING",
      "supportedUntil": "2022-12-31T23:59:59.999Z",
      "type": "MANDATE_PAYMENTS",
      "version": "1.0.0"
    }
  ]
}
```

### Response: GetConsentFinancialServiceParametersTemplatesResponse[](#connectivity-v2/consent-templates/get-consent-template/response-getconsentfinancialserviceparameterstemplatesresponse)

templates `array[FinancialServiceTemplate]`

#### FinancialServiceTemplate[](#connectivity-v2/consent-templates/get-consent-template/response-getconsentfinancialserviceparameterstemplatesresponse/financialservicetemplate)

deprecated `boolean` required

If true it means there is a newer template version for the given type/subtype and that it should be used instead of this one.

schema `object` required

Consent template JSON schema. Represents required parameters during creation of a chosen consent type.

subtype `string` required

Subtype of the financial service.  
Values: `VRP_SWEEPING`, `VRP_COMMERCIAL`

supportedUntil `Date`

Expected date at which this version of the template will not be supported anymore.

type `string` required

Type of the financial service.  
Values: `MANDATE_PAYMENTS`

version `string`

Version of the template.

| Status Code | Description |
| --- | --- |
| 200 | Consent template successfully fetched |
| 400 | Invalid input. |
| 401 | Unauthorized request. |
| 403 | Permission denied. |
| 404 | Provider not found. |
| 500 | Internal server error. |
