---
title: "Test Open banking redirect - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/aggregation/test-open-banking-redirect/"
exportedAt: "2026-01-13T13:00:36.981Z"
---
## When to use[](#when-to-use)

This provider simulates a redirect-based authentication flow for open banking providers.

In this flow, the user (PSU) is redirected to the bank's (ASPSP) interface to complete the authentication. Typically this is the bank's web interace or a dedicated mobile app.

If you are an [Enterprise](https://tink.com/pricing) customer with [permanent users](/Tiny-doc/tink_docs_home/glossary/#permanent-users) enabled, it is possible to [refresh credentials](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/refresh-credentials) created using this test provider multiple times. In this test flow, the authentication session is set to expire after 30 days. During this time period, it is possible to simulate refreshing of user data from the bank without a need for the user to authetnicate. Once this session has expired, a new [credential refresh](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/refresh-credentials) request will require the user to authenticate towards the bank again.

Credential refreshes for test providers are not rate limited to allow faster testing. You can read more about credentials and credential refresh rate limiting [here](/Tiny-doc/tink_docs_home/resources/aggregation/credentials/).

It is possible to test the Tink aggregation flow with [Tink Link](/Tiny-doc/tink_docs_home/resources/aggregation/use-test-providers/) or [directly via our API](/Tiny-doc/tink_docs_home/resources/aggregation/test-aggregation/).

**Example credentials object**:

```
{
    "id": "CREDENTIAL_ID",
    "providerName": "se-test-open-banking-redirect",
    "type": "PASSWORD",
    "status": "UPDATED",
    "statusUpdated": 1584444226324,
    "statusPayload": "Updated.",
    "updated": 1584444226324,
    "sessionExpiryDate": 1584444757310,
    "userId": "af8247d6bfad4eafabdafc094a1a1bdb"
  }
```

## User flow[](#user-flow)

After being redirected, the user will be presented with a screen asking them to identify themselves towards the bank. This simulates the process of the user logging in to thier bank via the bank's web interface or mobile app.

![userFlow-ExampleBank](https://images.ctfassets.net/tmqu5vj33f7w/7oDwWK8r9LE8VmZyj3CBOk/5dfb9f910de9b711b8e64a3519ea9317/userFlow-ExampleBank.jpg)

## Test data set[](#test-data-set)

**Capabilities**

This test provider has the following capabilities: `CHECKING_ACCOUNTS, SAVINGS_ACCOUNTS, CREDIT_CARDS, LOANS, INVESTMENTS`

**Account numbers**

For markets UK and IT, savings and checking account numbers are generated according to formats specific to their countries.

_Example UK format:_ `23147071417779`  
_Example IT format:_ `IT18X8930893000000202985435`

For all other markets, savings and checking account numbers are generated randomly, but remain constant for a particlar combination of provider and user.

_Example format:_ `1120-700004704000`

For all markets, the data for `CREDIT_CARDS`, `LOANS`, `INVESTMENTS` is static and remains constant for all users.

| Account Type | Static Account number |
| --- | --- |
| `CREDIT_CARDS` | `1234 **** **** 1121` |
| `LOANS` | `7777-333333333333` |
| `INVESTMENTS` | `7777-444444444444` |
