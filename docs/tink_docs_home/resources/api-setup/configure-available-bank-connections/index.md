---
title: "Configure available bank connections - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/api-setup/configure-available-bank-connections/"
exportedAt: "2026-01-13T12:59:54.045Z"
---
## Concept[](#concept)

The set of available Tink bank connections can be fetched via our [Provider API](/Tiny-doc/tink_docs_api/api/#connectivity/provider) _(read more about fetching providers in the [Aggregation resources section](/Tiny-doc/tink_docs_home/resources/aggregation/))_.

Each market has its own set of providers and there may be multiple providers for one bank (financial institution). Depending on your use case, you might want to filter out a subset of providers that you want to show to your end users. For this, you can use the Console configuration tool described in this article.

You can find the configuration feature in the Console under App settings / Policy configuration.

The banks that will ultimately be shown to your users are derived from rules that you configure in our tool. The power of rules is that you can set up a fairly simple ruleset that will affect a large set of banks, illustrated in the image.

*Image removed: inclusion-exclusion-rules*

The rules are set up in three steps which are described below. Whenever you want to see what effect your configuration will have, you can preview the list of banks that will be shown to your users via a preview button in the bottom of the page.

* * *

### 1\. Base policy[](#base-policy)

You can think of the base policy as a starting list of banks that your rules will build upon. There are a few of these base policies that we have created that serve the most common use cases (_for a detailed description, see the feature inside the Console_).

You can for instance choose our recommendation of banks which are the most stable ones suited for production, choose only demo banks that can be handy when developing, or a blank list so you can configure specific banks in the next stage.

### 2\. Exclusion rules (optional)[](#exclusion-rules-optional-)

These are rules that will remove certain banks from the finished list. You can for instance exclude a whole market, or a specific provider.

### 3\. Inclusion rules (optional)[](#inclusion-rules-optional-)

These are rules that will include banks in the finished list. This rule takes precedence over the exclusion rules. That means that if you have removed a market in the exclusion step, and added it back in this step, it will be shown in the final result.

A common use case with inclusion rules is to start with a blank base policy, and only include a specific market, or only open banking connections for instance, if that’s your only interest.

You can add as many exclusion or inclusion rules as you like.

*Image removed: Policy Configuration*

### Finishing a configuration[](#finishing-a-configuration)

When you are happy with the result of your configuration, which you can see via the preview button in the bottom, just hit the Save button to make your changes go live.

A saved policy will immediately make changes to the banks you see in for instance Tink Link.

* * *

## Examples[](#examples)

When you are configuring exclusion and inclusion rules, you have the possibility to choose markets, specific banks, or access types. Here are a few examples that are common use cases for the configuration tool.

### Test providers only[](#test-providers-only)

Test providers are great if you are developing and testing out our technology.

1.  Choose `Test providers only` as the base policy. This will make sure that no other providers can be fetched.

### Exclude specific banks[](#exclude-specific-banks)

You may want to exclude specific banks for various reasons.

1.  Choose any base policy
2.  Choose `Exclusion rules`, select `A specific bank`, and choose the bank you want to exlude in the dropdown lists.

### Only open banking connections[](#only-open-banking-connections)

1.  Choose `Custom list` from the base policy. This will start from a blank slate.
2.  Choose `Inclusion rules`, select `Access type`, and choose `Open banking`. This will make sure you only see open banking connections.
