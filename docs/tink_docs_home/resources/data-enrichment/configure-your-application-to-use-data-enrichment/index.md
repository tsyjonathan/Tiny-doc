---
title: "Configure your application to use Data Enrichment"
source: "https://docs.tink.com/resources/data-enrichment/configure-your-application-to-use-data-enrichment"
exportedAt: "2026-01-13T12:47:25.958Z"
---
### Set up permanent users[](#set-up-permanent-users)

To use Data Enrichment, you must be approved to use permanent users. Permanent users are a feature that allows you to ingest data and have it persist in Tink’s data layer for longer than 24 hours. The feature is not enabled by default and must be enabled to use Data Enrichment.

To enable permanent users, you must configure continuous access for your app. Continuous access will allow you to create permanent users on the Tink platform and to automatically aggregate data for those users.

To enable continuous access, go to `Console -> [your_app] -> Transactions -> Data access and select Send request`. You'll receive a request response via email. Once your request is approved, you can start using permanent users.

### Setting up OAuth scopes[](#setting-up-oauth-scopes)

Access to Tink’s API is divided into scopes that grant access to different API endpoints. Every API customer and application has access to a default set of scopes and can request access to more scopes. When it comes to Data Enrichment, there are a couple of scopes for which you must request access.

Go to `Console -> [your_app] -> App settings -> API Client -> All available client scopes` and contact Tink Support if any of the following scopes are missing:

| Scopes |
| --- |
| accounts:read |
| authorization:read |
| authorization:grant |
| balances:read |
| credentials:read |
| credentials:refresh |
| credentials:write |
| enrichment.transactions |
| enrichment.transactions:readonly |
| provider-consents:read |
| provider-consents:write |
| transactions:read |
| transactions:categorize |
| user:create |
| user:delete |
