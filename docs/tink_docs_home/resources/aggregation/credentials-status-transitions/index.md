---
title: "Credentials status transitions - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/aggregation/credentials-status-transitions/"
exportedAt: "2026-01-13T12:55:30.476Z"
---
## Journey of a credential:[](#journey-of-a-credential-)

Once a credential has been created and initiated it's aggregation journey, it can finish the journey in any one of the end states like `UPDATED`, `AUTHENTICATION_ERROR`, `TEMPORARY_ERROR`.

In the best case, the credential will end up with `UPDATED` status, which means that the aggregation was successful and is is possible to start fetching the bank data for this credential. However, it is possible to encounter an issue during the journey, and the credential ends up in one of the error states, like `AUTHENTICATION_ERROR` or `TEMPORARY_ERROR`.

The aggregation journey can last from a few seconds to a few minutes, depending on the user, the bank and the amount of data fetched.

The credentials objects are not re-created for subsequent refreshes of data; the state machine can transition back to the beginning, but this is considered as another Aggregation Journey.

![FinalDiagram withoutBack v2](https://images.ctfassets.net/tmqu5vj33f7w/4GHiAT2N1s2inkFNkNPwZg/f5f410a9967f599b73e27efa028aaf18/FinalDiagram_withoutBack_v2.png)

## Happy flow with no exceptions:[](#happy-flow-with-no-exceptions-)

In a typical happy path for the credential [refresh](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/refresh-credentials) journey, the credential status will go from the `AUTHENTICATING` state, possibly to any one, or multiple, of the `AWAITING_X` states, then on to the `UPDATING` state without going to any of the error states.

Credentials will be considered as refreshed successfully once it's status has changed to `UPDATED`.

See below for the happy path of a credential refresh.

![Happy Flow_v1_3](https://images.ctfassets.net/tmqu5vj33f7w/5vCslCcJ7ch4Ti1z61lmqu/5d9a82f7046821b8971e81bb2411ba63/Happy_Flow_v1_3.png)

## Notes:[](#notes-)

-   If the bank’s authentication process requires the user to enter supplemental information, like an OTP or BankID, the credential can go from `AUTHENTICATING` to `AWAITING_MOBILE_BANKID_AUTHENTICATION`, `AWAITING_THIRD_PARTY_APP_AUTHENTICATION` or `AWAITING_SUPPLEMENTAL_INFORMATION` depending on the type of supplemental information needed. These statuses mean that the credential is waiting for user input.
-   In some cases, it is possible that a credential does not require additional input from the user and goes directly from `AUTHENTICATING` to `UPDATING` if the authentication is successful.
-   If the authentication process requires multiple user interventions, it is possible that a credential goes from one of the `AWAITING_X` statuses to another `AWAITING_X` status again. For example, this can be in the case of an opt-in flow where the credential may go from `AWAITING_THIRD_PARTY_APP_AUTHENTICATION` to `AWAITING_SUPPLEMENTAL_INFORMATION`.
-   In case the credential is in any of the `AWAITING_X` states, it is important that the user input is provided before the timeout of this state. The timeout is 2 minutes for `AWAITING_SUPPLEMENTAL_INFORMATION` and 9 minutes for `AWAITING_MOBILE_BANKID_AUTHENTICATION` and `AWAITING_THIRD_PARTY_APP_AUTHENTICATION`. This timeout will halt the aggregation as the authentication process is incomplete.
-   In case Tink has disabled a provider, it is not possible to perform a refresh or manual authentication on the credentials associated with that provider. Such credentials will change to `PERMANENT_ERROR` status if a refresh or manual authentication is initiated on them.
-   If a credential is in state `PERMANENT_ERROR`, it cannot be used anymore.
-   If a credential has the status `UPDATED`, then that credential’s last refresh was successful.
-   Credential will be refreshed if there is a valid consent from a user. Credentials in statuses `CREATED`, `AUTHENTICATION_ERROR`, `PERMANENT_ERROR` and `SESSION_EXPIRED` will not perform background refreshes.
-   For the credentials which have consent for limited period of time, the credential will go to status `SESSION_EXPIRED` once the consent has expired and a refresh request via [refresh endpoint](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/refresh-credentials) has been triggered on that credentials after the consent expiration with `userAvailableForInteraction` set to false inside the `userAvailability` object.

## Restarting the aggregation journey of a credential[](#restarting-the-aggregation-journey-of-a-credential)

It is possible to refresh/update a credential after it has reached any of the end states, except `PERMANENT_ERROR`.

-   In case a credential with type `MOBILE_BANKID` has status `CREATED`, `UPDATED`, `AUTHENTICATION_ERROR` or `TEMPORARY_ERROR`, initiating a new refresh for that credential will restart the flow and status changes to `AUTHENTICATING`.
-   In case a credential with type `PASSWORD` has status `CREATED`, `UPDATED`, or `TEMPORARY_ERROR`, initiating a new refresh for that credential will restart the flow and status changes to `AUTHENTICATING`.
-   In case a credential has status `UPDATED`, `SESSION_EXPIRED`, `AUTHENTICATION_ERROR` or `TEMPORARY_ERROR`, updating that credential using the [modify credentials endpoint](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/modify-credentials) will restart the flow and status will change to `CREATED`.
-   In case a credential has status `AUTHENTICATION_ERROR`, you can use the [authenticate endpoint](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/manual-authenticate-of-credentials) to authenticate towards the bank again.
-   In case a credential has status `SESSION_EXPIRED`, it is not possible to initiate a manual refresh for it directly. You can do the following things in this scenario:
    -   Authenticate again using the [authenticate endpoint](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/manual-authenticate-of-credentials).
    -   Initiate a refresh for that credential using the [refresh endpoint](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/refresh-credentials) with query parameter `authenticate=true` and making sure the to set the `userPresent` and `userAvailableForInteraction` flags to true inside the `userAvailability` object.
    -   Modify the credential using [modify credentials endpoint](/Tiny-doc/tink_docs_api/api/#connectivity/credentials/modify-credentials).

![Credential Status State diagram V2 (2)](https://images.ctfassets.net/tmqu5vj33f7w/2WyzbIxjYUFDwEZhU1hs6t/69ba7bfdc4082bf96848ac56330495be/Credential_Status_State_diagram_V2__2_.png)

## All possible credential status transitions[](#all-possible-credential-status-transitions)

| Sr. No. | Start State | End State | Scenario |
| --- | --- | --- | --- |
| 1 | \- | CREATED | Credential has been created using {{host}}/api/v1/credentials |
| 2 | CREATED | AUTHENTICATING | Authentication has been initiated |
| 3 | CREATED | AUTHENTICATION\_ERROR | Authentication has failed |
| 4 | CREATED | TEMPORARY\_ERROR | Problem with credential / provider |
| 5 | AUTHENTICATING | AWAITING\_X | Credential needs supplemental information, waiting for input |
| 6 | AUTHENTICATING | TEMPORARY\_ERROR | Problem with credential / provider while authenticating |
| 7 | AUTHENTICATING | UPDATING | Authentication successful, proceeding |
| 8 | AUTHENTICATING | AUTHENTICATION\_ERROR | Authentication has failed |
| 9 | AWAITING\_X | AWAITING\_X | Credential needs more supplemental information. This happens in multi-supplemental providers |
| 10 | AWAITING\_X | UPDATING | Authentication successful, proceeding |
| 11 | AWAITING\_X | AUTHENTICATION\_ERROR | Authentication has failed, you should try to re-initiate authentication |
| 12 | AWAITING\_X | TEMPORARY\_ERROR | Problem with credential / provider while authenticating |
| 13 | UPDATING | UPDATED | Credential has refreshed successfully, you can fetch data now |
| 14 | UPDATING | TEMPORARY\_ERROR | Problem with credential / provider while fetching data |
| 15 | UPDATED | CREATED | Credential has been updated and set to CREATED |
| 16 | UPDATED | AUTHENTICATING | Authentication has been initiated again |
| 17 | UPDATED | SESSION\_EXPIRED | Consent has expired, you will need to re-authenticate the credential |
| 18 | UPDATED | DELETED | Credential has been deleted |
| 19 | SESSION\_EXPIRED | CREATED | Credential has been updated and set to CREATED |
| 20 | AUTHENTICATION\_ERROR | CREATED | Credential has been updated and set to CREATED |
| 21 | AUTHENTICATION\_ERROR | AUTHENTICATING | Authentication has been initiated |
| 22 | AUTHENTICATION\_ERROR | DELETED | Credential has been deleted |
| 23 | TEMPORARY\_ERROR | AUTHENTICATING | Authentication has been initiated |
| 24 | TEMPORARY\_ERROR | CREATED | Credential has been updated and set to CREATED |
| 25 | TEMPORARY\_ERROR | DELETED | Credential has been deleted |
| 26 | CREATED | PERMANENT\_ERROR | Provider has been disabled by Tink |
| 27 | UPDATED | PERMANENT\_ERROR | Provider has been disabled by Tink |
| 28 | TEMPORARY\_ERROR | PERMANENT\_ERROR | Provider has been disabled by Tink |
| 29 | AUTHENTICATION\_ERROR | PERMANENT\_ERROR | Provider has been disabled by Tink |
| 30 | SESSION\_EXPIRED | AUTHENTICATING | Authentication has been initiated again |
| 31 | SESSION\_EXPIRED | PERMANENT\_ERROR | Provider has been disabled by Tink |
