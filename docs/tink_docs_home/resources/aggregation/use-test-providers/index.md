---
title: "How to test the Tink Aggregation flow"
source: "https://docs.tink.com/resources/aggregation/use-test-providers"
exportedAt: "2026-01-13T13:00:38.706Z"
---
## Tink test providers[](#tink-test-providers)

The Tink Test providers are static implementations of banks that allow developers to test Tink, without having to enter real bank credentials. You can learn more about the different test providers available [here](https://docs.tink.com/resources/aggregation/available-test-providers).

### Authenticating with test providers[](#authenticating-with-test-providers)

For each test provider, a set of test credentials can be used, as documented [here](https://docs.tink.com/resources/aggregation/test-aggregation). Different credentials will retrieve a certain type and amount of data in order to let developers emulate multiple possible scenarios.

_Example credentials_

```
Test provider: Test Password
Username: tink
Password: tink-1234
```
