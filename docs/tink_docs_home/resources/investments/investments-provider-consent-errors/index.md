---
title: "Provider Consent errors - Tink Docs"
source: "https://docs.tink.com/resources/investments/investments-provider-consent-errors"
exportedAt: "2026-01-13T12:45:09.854Z"
---
| Type | Reason | Error description |
| --- | --- | --- |
| TINK\_SIDE\_ERROR | UNKNOWN\_ERROR | Unknown unexpected error on Tink side. |
| TINK\_SIDE\_ERROR | TINK\_INTERNAL\_SERVER\_ERROR | Explicit unexpected error on Tink side. |
| TINK\_SIDE\_ERROR | AUTHENTICATION\_METHOD\_NOT\_SUPPORTED | The authentication method that the user picked was not supported by Tink. Tink always tries to prevent this from happening in the first place. |
| PROVIDER\_ERROR | PROVIDER\_UNAVAILABLE | Financial Service (provider/bank/ASPSP) is technically unavailable or doesn't respond when Tink is sending requests). |
| PROVIDER\_ERROR | LICENSED\_PARTY\_REJECTED | Financial Service rejects the licenced party (TPP/OB registrate) or eIDAS certificate. This happens if Tink’s license is rejected. |
| USER\_LOGIN\_ERROR | THIRD\_PARTY\_AUTHENTICATION\_UNAVAILABLE | Mobile BankID or any other, required, third-party is technically unavailable. |
| USER\_LOGIN\_ERROR | STATIC\_CREDENTIALS\_INCORRECT | Values of provided fields are rejected by the provider. Clarification: Refers to user credentials stored with Tink, that is, the static fields on credentials. To recover from this, customer needs to update the values in the user’s Tink Credentials fields. |
| USER\_LOGIN\_ERROR | DYNAMIC\_CREDENTIALS\_INCORRECT | OTPs/card-reader codes/third-party app codes are rejected by Provider. Examples: OTP entered after being redirected to bank’s page is incorrect, or OTP entered in Tink Link is incorrect. |
| USER\_LOGIN\_ERROR | DYNAMIC\_CREDENTIALS\_FLOW\_CANCELLED | Deliberate cancellation of dynamic authentication flow (multi-factor authentication). For example, when cancelling a Mobile Bank ID or OAuth2 journey on the Financial Service side. |
| USER\_LOGIN\_ERROR | DYNAMIC\_CREDENTIALS\_FLOW\_TIMEOUT | Financial Service has indicated that the dynamic flow (multi-factor authentication, for example, BankID and OTPs.)) has timed out, or the Tink deadline of 2, 3, or 9 min (Supplemental info, Mobile BankID respectively OB flows) times out before getting answer from bank. |
| USER\_LOGIN\_ERROR | USER\_NOT\_A\_CUSTOMER | Financial Service responds that the identity used to authenticate is not a customer at the current provider, or has no engagement with the provider. |
| USER\_LOGIN\_ERROR | USER\_BLOCKED | Financial Service responds that the identity used to authenticate is blocked and the user can not authenticate successfully. |
| USER\_LOGIN\_ERROR | USER\_CONCURRENT\_LOGINS | When Financial Service or third party app doesn’t allow to have parallel sessions. |
| AUTHORIZATION\_ERROR | ACTION\_NOT\_PERMITTED | Financial Service responds that the identity used to authenticate does not have permission to perform the operation. |
| AUTHORIZATION\_ERROR | SESSION\_EXPIRED | Access/Refresh-token combo is expired, requires re-authentication. Should only happen if the user is not present. When user is in fact present, Tink automatically goes into re-authentication flow. |
| AUTHORIZATION\_ERROR | USER\_ACTION\_REQUIRED | User has successfully authenticated and is in a bank flow, but there is some step where they are required to take some manual action that Tink can not handle automatically (e.g. sign an agreement or change some setting) |
| ACCOUNT\_INFORMATION\_ERROR | NO\_ACCOUNTS | User authentication was successful, but the end result was that no data was available to be stored on the Tink user |
