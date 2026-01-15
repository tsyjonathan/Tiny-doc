---
title: "Consent and authentication - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/consent-and-authentication-one-time-payments/"
exportedAt: "2026-01-13T12:42:47.784Z"
---
To use Tink’s services, the user needs to take explicit action to consent to Tink’s Terms & Conditions and Privacy Policy. This information is presented as clearly and transparently as possible on Tink’s consent screen. The user gives consent and starts the authentication process with their bank by pressing “Continue.”

*Image removed: Example of consent screen in a Payments flow* _Example flow using PIS consent_

## User consent[](#user-consent)

If you’re using Tink’s license, then consent will always be gathered at the initiation of any Tink flow. The consent screen depends on which of Tink’s services you’re using in your flow. If you’re implementing an [AIS + PIS flow](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/payments-flow-optimization-overview/), then Tink will show the PIS consent screen.

*Image removed: Tink consent screens per use case* _Tink consent screens per use case_

If you’re using your own license, you add your own terms and conditions, privacy notice and consent approval before the Tink journey starts.

## Initiating authentication[](#initiating-authentication)

To authenticate, the user typically needs to provide certain information to identify themselves with their bank. This triggers the bank’s own authentication flow, which may differ per bank and could involve third-party authentication apps or web redirects. To save your user’s the hassle of adding this information themselves, you can prefill a user’s authentication information (such as their social security number) by passing it to Tink through a [Tink Link session](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-sessions/#example-use-cases), removing the need for users to enter it themselves on this screen.

**Example Sessions request**

```
curl -X POST [external url removed] \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' \
-d '{"personalIdentifier": "199404101234"}'
```

**Example response**

```
HTTP/ 1.1 200 OK
Content-Type: application/json
{
  "sessionId": "{SESSION_ID}"
}
```

Then, initiate your Tink URL and append the `{SESSION_ID}`.

[See the Sessions API Reference](/Tiny-doc/tink_docs_api/api/#general/tink-link-session).
