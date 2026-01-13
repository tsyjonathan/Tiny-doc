---
title: "Changelog - Tink Docs"
source: "https://docs.tink.com/changelog"
exportedAt: "2026-01-13T12:40:59.426Z"
---
Stay updated on all changes to the Tink platform and products.

-   September 26, 2025
    
    ## Decommissioned Events v1 service[](#decommissioned-events-v1-service)
    
    Decommissioned
    
    API
    
    The Events v1 service has reached end-of-life and will be decommissioned in 30 days. This includes the removal of the following endpoints:
    
    -   POST /api/v1/authorization/hooks
    -   DELETE /api/v1/authorization/hooks/{id}
    -   GET /api/v1/authorization/hooks
    
    If you are still using these endpoints, we recommend migrating to [Events v2](https://docs.tink.com/api-events-v2#events-v2/webhook) to avoid service disruptions. For guidance on using webhooks with your specific products, please visit the relevant Tink product documentation pages.
    
-   September 16, 2025
    
    ## Released new Open Banking Python script[](#released-new-open-banking-python-script)
    
    New
    
    Documentation
    
    We’ve released version 6.0.0 of our Open Banking Python script, enhancing security by changing AES encryption mode from CBC to GCM for certificates upload.
    
    This change requires the Python cryptography module, as OpenSSL doesn’t support GCM. Please ensure it’s installed in your environment.
    
    Version 5.7.0 will remain available until 31st December 2025.
    
-   September 04, 2025
    
    ## Deprecated two fields from the Providers API[](#deprecated-two-fields-from-the-providers-api)
    
    Deprecated
    
    API
    
    From 30th April 2026, we’ll stop returning the `transactional` and `loginHeaderColour` fields in the `/api/v1/providers` API response. These fields no longer hold business logic and are no longer updated.
    
    If you're currently relying on these fields, please update your integration before the removal date.
    
-   August 26, 2025
    
    ## Scheduled Tink API root CA change[](#scheduled-tink-api-root-ca-change)
    
    Improvement
    
    API
    
    Documentation
    
    To future‑proof Tink API connectivity for integrations, we are implementing changes to our server certificates. On 17th September 2026, the server certificate presented by api.tink.com and its subdomains will be re‑issued under a new root Certificate Authority. The current DigiCert Global Root G2 (RSA SHA-256) will be replaced with Amazon Root CA 3 (EC\_prime256v1).
    
    To ensure your integration continues to work after the change, please make sure your application trusts both the current DigiCert Global Root G2 and the upcoming Amazon Root CA 3 certificates.
    
    If you use a custom trust store, we advise updating it according to our [HTTPS and TLS guidelines](https://docs.tink.com/api-introduction#introduction/https-and-tls) before 17th September 2026. If your application relies on the operating system’s trust store, keeping your OS up to date will be sufficient.
    
    The Tink API server certificate will remain signed by DigiCert Global Root G2 until its renewal on 17th September 2026.
    
-   August 14, 2025
    
    ## Added dark mode theme to Tink Link[](#added-dark-mode-theme-to-tink-link)
    
    New
    
    Tink Link
    
    The default Tink Link theme now includes a dark mode variant. The theme automatically adapts to the user's device settings, switching between light and dark modes as appropriate.
    
    If using the Tink Link default theme, you can disable dark mode by customising your theme settings in [Tink Console](https://console.tink.com/). Additionally, you can override the device preference by specifying the ‘theme’ parameter in the Tink Link URL. For more details, refer to the SDK documentation for your specific product.
    
    ![](https://images.ctfassets.net/tmqu5vj33f7w/5svUkfag1i3oMkbehyRDIY/50896179132d88000d0214ca97ff4466/Changelog-Dark.png)
    
-   August 01, 2025
    
    ## Decommissioned Selfbank Direct Access connection in Spain[](#decommissioned-selfbank-direct-access-connection-in-spain)
    
    Decommissioned
    
    Connections
    
    From 5th August 2025, the SelfBank Direct Access connection will be decommissioned in Spain.
    
    Please note the Open Banking connection remains available for all customers.
    
    For more details, see our [market capabilities](https://docs.tink.com/market-capabilities/aggregation?market=ES) in Spain.
    
-   July 30, 2025
    
    ## Decommissioned EvoBanco connections in Spain[](#decommissioned-evobanco-connections-in-spain)
    
    Decommissioned
    
    Connections
    
    All connections to EvoBanco are now decommissioned due to the merger with Bankinter. EvoBanco customers are required to create new credentials to access their Bankinter accounts.
    
    Read the [Bankinter merger FAQs](https://www.bankinter.com/banca/en/faqs/evo-products-migrated-bankinter) to learn more.
    
-   July 30, 2025
    
    ## Decommissioned 6 Direct Access connections in Spain[](#decommissioned-6-direct-access-connections-in-spain)
    
    Decommissioned
    
    Connections
    
    From 1st August 2025, the following Direct Access connections will be decommissioned in Spain:
    
    -   BankinterCard
    -   Bnext
    -   CarrefourPass
    -   Cetelem
    -   DeutscheBank
    -   Wizink
    
    Please note the Open Banking connections remain available for all customers.
    
    For more details, see our [market capabilities](https://docs.tink.com/market-capabilities/aggregation?market=ES) in Spain.
    
-   June 27, 2025
    
    ## Enabled Risk Decisioning for all Risk customers in Console[](#enabled-risk-decisioning-for-all-risk-customers-in-console)
    
    New
    
    Income Check
    
    Expense Check
    
    Risk Insights
    
    Console
    
    Risk Decisioning, a solution that centralises all data for Tink’s Risk products in one place, is now available for all customers using one or more of the following products:
    
    -   Income Check
    -   Expense Check
    -   Risk Insights
    
    In addition to risk reports, new features include CSV/PDF downloads, name search and a Tink Link builder now supporting all Risk products.
    
    For further questions regarding Tink's Risk Decisioning solution, reach out to your Tink representative or [contact us online](https://b2bmarketing.tink.com/contact-sales).
    
    ![](https://images.ctfassets.net/tmqu5vj33f7w/3KaqG9B71R9HfiG6vzU1rI/2808ecea6306bcaf5e9cb199c7d3473f/Changelog-RDV__1_.png)
    
-   April 04, 2025
    
    ## Scheduled update to the ‘List providers for a market’ endpoint[](#scheduled-update-to-the-list-providers-for-a-market-endpoint)
    
    New
    
    API
    
    From 30th September 2025, the ‘List providers for a market’ `/api/v1/providers/{market}` endpoint will only accept a valid market parameter. Any unsupported market will result in an error instead of an empty list.
    
    The full list of supported markets can be fetched from the `/api/v1/providers/markets` endpoint.
    
    Read more in our documentation [here](https://docs.tink.com/api-connectivity-v1#connectivity-v1/provider/list-providers-for-a-market).
    
-   March 13, 2025
    
    ## Released Money Manager Android SDK 2.1.2[](#released-money-manager-android-sdk-2-1-2)
    
    New
    
    Money Manager
    
    SDK Android
    
    The new Money Manager Android SDK 2.1.2 is released with the below updates:
    
    -   Resolved translation issue for Income & Expense titles
    -   Fixed inaccurate expense and recurring expense values in Safe-to-Spend
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/2.1.2).
    
-   March 13, 2025
    
    ## Released Money Manager Android SDK 1.2.1[](#released-money-manager-android-sdk-1-2-1)
    
    New
    
    Money Manager
    
    SDK Android
    
    The new Money Manager Android SDK 1.2.1 is released with the below updates:
    
    -   Resolved translation issue for Income & Expense titles
    -   Fixed inaccurate expense and recurring expense values in Safe-to-Spend
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/1.2.1).
    
-   February 27, 2025
    
    ## Released Money Manager iOS SDK 3.0.0[](#released-money-manager-ios-sdk-3-0-0)
    
    New
    
    SDK iOS
    
    Money Manager
    
    The new Money Manager iOS SDK 3.0.0 is released with the below updates:
    
    -   Upgraded minimum supported iOS version to 15.8.3
    -   Updated minimum required Xcode version to 16.2
    -   Implemented Jailbreak detection for enhanced security
    -   Overall improvements in SDK stability and performance
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/3.0.0).
    
-   February 27, 2025
    
    ## Released Money Manager Android SDK 3.0.0[](#released-money-manager-android-sdk-3-0-0)
    
    New
    
    Money Manager
    
    SDK Android
    
    The new Money Manager Android SDK 3.0.0 is released with the below updates:
    
    -   Upgraded minimum supported version to Android 11
    -   Added device jailbreak detection for enhanced security
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/3.0.0).
    
-   January 31, 2025
    
    ## Released Money Manager Android SDK 1.1.9[](#released-money-manager-android-sdk-1-1-9)
    
    New
    
    Money Manager
    
    SDK Android
    
    New SDK for Android 1.1.9 for Money Manager is released with the below updates:
    
    -   Fixed Safe to Spend amounts inconsistency between the Overview and Details screens
    
-   January 15, 2025
    
    ## Deprecated suggested providers endpoint[](#deprecated-suggested-providers-endpoint)
    
    Deprecated
    
    API
    
    Connections
    
    The endpoint `/providers/suggest` has been deprecated and will reach end of life on February 27, 2025.
    
-   January 15, 2025
    
    ## Deprecated fields in Get Account Verification Report endpoint[](#deprecated-fields-in-get-account-verification-report-endpoint)
    
    Deprecated
    
    API
    
    Account Check
    
    The fields `holderName` and `iban` in the [Get Account Verification Report](https://docs.tink.com/api-data-v1#data-v1/account-verification/get-account-verification-report) endpoint used with Account Check have been deprecated for more than six months and will reach end of life on August 31, 2025.
    
-   January 02, 2025
    
    ## Decommissioned Link Transactions services[](#decommissioned-link-transactions-services)
    
    Decommissioned
    
    Aggregation
    
    Money Manager
    
-   December 17, 2024
    
    ## Added new fields in Transaction Report[](#added-new-fields-in-transaction-report)
    
    New
    
    Transactions
    
-   December 11, 2024
    
    ## Added new merchant screening process for PSPs[](#added-new-merchant-screening-process-for-psps)
    
    New
    
    Payments
    
    Account Check
    
    Balance Check
    
    Transactions
    
    It is now faster for PSPs to onboard merchants to Tink products with our new screening process. Merchant pre-screening based on ‘country’ and ‘industry’ will lead to instant responses and statuses. This means fewer false positive declines and fewer merchants with ‘pending’ status waiting for review. For more information see [partner integration](https://docs.tink.com/resources/payments/one-time-payments/partner-integration-one-time-payments)
    
-   December 11, 2024
    
    ## Added smart routing to Pay by Bank[](#added-smart-routing-to-pay-by-bank)
    
    Improvement
    
    Payments
    
    Scheme selection logic (smart routing) has been added to Pay by Bank. Scheme selection optimises for performance, settlement risk and speed based on bank provider. For more information see [Payment Schemes](https://docs.tink.com/resources/payments/one-time-payments/payment-schemes#smart-routing-scheme-picker-)
    
-   December 11, 2024
    
    ## Added Account Type to Risk Signals[](#added-account-type-to-risk-signals)
    
    Improvement
    
    Payments
    
    A new configurable check option, ‘Account Type’ has been added to Risk Signals to block payments from risky types of account. There are now 10 configurable checks available in Risk Signals. For more information, see [Risk Signals documentation](https://docs.tink.com/resources/payments/one-time-payments/risk-signals)
    
-   December 11, 2024
    
    ## Added Risk Signals to new countries[](#added-risk-signals-to-new-countries)
    
    New
    
    Payments
    
    Risk Signals is available as an optional add-on to Pay by Bank in three new countries. You can now use Risk Signals in Italy, Austria and Sweden. For more information, [see Risk Signals documentation](https://docs.tink.com/resources/payments/one-time-payments/risk-signals)
    
-   December 10, 2024
    
    ## Deprecated PSD2 flag endpoint[](#deprecated-psd2-flag-endpoint)
    
    Deprecated
    
    API
    
    Aggregation
    
    The endpoint `/api/v1/user/psd2flag` is now deprecated. This endpoint supported the migration of credentials to Open Banking APIs. Since all migrations were completed over 12 months ago, this endpoint is now deprecated.
    
-   November 28, 2024
    
    ## Released Investments and Loans in Console[](#released-investments-and-loans-in-console)
    
    New
    
    Console
    
    Investments
    
    Loans
    
    Investments and Loans are now accessible as product pages within Console, including:
    
    -   Product analytics
    -   Tink Link URL builder
    -   Demo bank users
    
    [Log in to your account](https://console.tink.com/login) to access the new product pages.
    
-   November 22, 2024
    
    ## Updated Console data to UTC[](#updated-console-data-to-utc)
    
    Changed
    
    Console
    
    Your Console account now displays data in Coordinated Universal Time (UTC). All analytics dashboards, logs, Risk reports, Settlement transactions and CSV exports are updated from your local time zone to UTC.
    
-   November 11, 2024
    
    ## Decommissioned user market list endpoint[](#decommissioned-user-market-list-endpoint)
    
    Decommissioned
    
    API
    
    The endpoint `/api/v1/user/markets/list` has reached end of life.
    
-   November 08, 2024
    
    ## Decommissioned Monitoring service[](#decommissioned-monitoring-service)
    
    Decommissioned
    
    API
    
    The endpoints `/api/v1/monitoring/healthy`, `/api/v1/monitoring/ping` and consequently the Monitoring service have reached end of life.
    
-   October 29, 2024
    
    ## Released Money Manager iOS SDK 2.1.0[](#released-money-manager-ios-sdk-2-1-0)
    
    New
    
    Money Manager
    
    SDK iOS
    
    New SDK for iOS 2.1.0 for Money Manager is released with below updates:
    
    -   Added Subscriptions feature(\*)
    -   Various visual improvements of Statistics on Finance Overview
    
    (\*) Subscriptions feature is not enabled by default. Speak to your account manager for more information.
    
-   October 23, 2024
    
    ## Decommissioned field in Event: Account Booked Transactions Modified[](#decommissioned-field-in-event-account-booked-transactions-modified-final)
    
    Decommissioned
    
    API
    
    Transactions
    
    Business Transactions
    
    Aggregation
    
    Deprecated field `account[transactionsModifiedEarliestBookedDate]` is now removed from `account-booked-transactions:modified` webhook event. Please use `transactions[earliestModifiedBookedDate]` instead.
    
-   October 23, 2024
    
    ## Released Money Manager SDK Android 2.1.0[](#released-money-manager-sdk-android-2-1-0)
    
    New
    
    SDK Android
    
    Money Manager
    
    New SDK for Android 2.1.0 for Money Manager is released with below updates:
    
    -   Added Subscriptions feature
    -   Set minimum supported version to Android 10
    
-   October 07, 2024
    
    ## Decommissioned Version service[](#decommissioned-version-service)
    
    Decommissioned
    
    API
    
    The endpoint `/api/v1/version` and consequently the Version service have reached end of life.
    
-   October 07, 2024
    
    ## Decommissioned cashbackEnabled field[](#decommissioned-cashbackenabled-field)
    
    Decommissioned
    
    API
    
    The field `cashbackEnabled` under `userProfile` is now decommissioned.
    
-   September 26, 2024
    
    ## Released Money Manager SDK Android 1.1.8[](#released-money-manager-sdk-android-1-1-8)
    
    New
    
    Money Manager
    
    SDK Android
    
    New Money Manager SDK for Android 1.1.8 is released with the below updates:
    
    -   Fixed SDK crash related to insights
    -   Addressed graphical glitches in the budget chart
    -   Resolved budget period inconsistencies across platforms
    -   Corrected visibility issues in the top spending category section
    
-   September 19, 2024
    
    ## Released Money Manager iOS SDK 2.0.4[](#released-money-manager-ios-sdk-2-0-4)
    
    New
    
    Money Manager
    
    SDK iOS
    
    New SDK for iOS 2.0.4 for Money Manager is released with below updates:
    
    -   Fixed an issue with displaying transaction details for some Actionable Insights in Archive.
    -   Fixed an issue with showing unexpected sign for amount in iOS 18.
    
-   September 13, 2024
    
    ## Released Money Manager iOS SDK 2.0.3[](#released-money-manager-ios-sdk-2-0-3)
    
    New
    
    Money Manager
    
    SDK iOS
    
    New SDK for iOS 2.0.3 for Money Manager is released with below updates:
    
    -   Improved event tracking for the Safe To Spend feature.
    -   Improved loading of the statistics for old periods for Left To Spend and Safe To Spend features.
    -   Improved keyboard behaviour on the New Budget Creation screen.
    -   Improved formatting of the amount on the New Budget Creation screen.
    -   Added limitations on creating a new budget with zero amount and non-realistic years.
    -   Fixed an issue with showing transactions for the right period of time from some Actionable Insights.
    -   Fixed an issue with navigating between periods in transactions list for recurring budgets.
    
-   September 06, 2024
    
    ## Released Money Manager SDK Android 1.1.7[](#released-money-manager-sdk-android-1-1-7)
    
    New
    
    Money Manager
    
    SDK Android
    
    New SDK for Android 1.1.7 for Money Manager is released with below updates:
    
    -   Fixed calendar range to 10 years from current date in budget creation and transaction editing
    -   Fixed archive button visibility when there are not insights (Set to always visible when navigated through FinanceOverview)
    -   Replaced Kotlin Coil image loading with custom solution
    -   Removed platform discrepancy in Left to Spend average amount
    
-   August 26, 2024
    
    ## Decommissioned field in Event: Account Booked Transactions Modified[](#decommissioned-field-in-event-account-booked-transactions-modified)
    
    Decommissioned
    
    API
    
    Aggregation
    
    Transactions
    
    Business Transactions
    
    Deprecated field `account[transactionsModifiedEarliestBookedDate]` will be removed from `account-booked-transactions:modified` webhook event after September 26th 2024. Please use `transactions[earliestModifiedBookedDate]` instead.
    
-   August 22, 2024
    
    ## Deprecated Events v1 Webhook[](#deprecated-events-v1-webhook)
    
    Deprecated
    
    API
    
    The [Events v1 Webhook](https://docs.tink.com/api-events-v1#events-v1/webhook) is now deprecated. Please visit the relevant Tink product page in our documentation to learn how to integrate and subscribe to webhook events with [Events v2 Webhook](https://docs.tink.com/api-events-v2#events-v2/webhook) instead.
    
-   August 06, 2024
    
    ## Introduced Risk Signals analytics in Console[](#introduced-risk-signals-analytics-in-console)
    
    New
    
    Console
    
    Payments
    
    Risk Signals users now have access to performance metrics under the one-time payments product in Console, including:
    
    -   Block rate
    -   Blocked payments
    -   Screened payments
    -   Volume of blocked payments
    
    [Log in to your account](https://console.tink.com/login) to view the new Risk Signals analytics tab.
    
    ![](https://images.ctfassets.net/tmqu5vj33f7w/5KyS6ZvPVGQ5qs3cgmJUKU/0a901e6d33b294711deb84852cfe3050/Changelog-risk_signals-2.png)
    
-   August 05, 2024
    
    ## Added 2 new connections in Spain[](#added-2-new-connections-in-spain)
    
    New
    
    Payments
    
    Connections
    
    You can now connect to and initiate payments with the following banks in Spain:
    
    -   Selfbank
    -   Laboral Kutxa
    
    These connections support both AIS and PIS functionalities.
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/payments?market=ES) for payments in Spain.
    
-   August 05, 2024
    
    ## Enabled connections to Wise bank with payment capabilities in 2 markets[](#enabled-connections-to-wise-bank-with-payment-capabilities-in-2-markets)
    
    New
    
    Payments
    
    Connections
    
    You can now connect to Wise bank in the following markets:
    
    -   Poland
    -   Austria
    
    To leverage this connection, please contact your Tink representative.
    
-   August 05, 2024
    
    ## Added 1 new AIS connection in the United Kingdom[](#added-1-new-ais-connection-in-the-united-kingdom)
    
    New
    
    Connections
    
    You can now connect to Starling Bank in the UK.
    
    To leverage this new AIS provider, please contact your Tink representative.
    
-   August 05, 2024
    
    ## Added 11 new AIS connections in Austria[](#added-11-new-ais-connections-in-austria)
    
    New
    
    Connections
    
    You can now connect to the following banks in Austria:
    
    -   Oberbank
    -   BTV
    -   BKS
    -   Volksbank Vorarlberg
    -   Volksbank Oberösterreich
    -   Volksbank Kärnten
    -   Volksbank Steiermark
    -   Volksbank Tirol
    -   Volksbank Salzburg-ob
    -   Volksbank Wien
    -   Volksbank Niederösterreich
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/aggregation?market=AT) in Austria.
    
-   July 25, 2024
    
    ## Added a new webhook event for Balance Check[](#added-a-new-webhook-event-for-balance-check)
    
    New
    
    API
    
    Balance Check
    
-   July 18, 2024
    
    ## Released Money Manager SDK Android 2.0.0[](#released-money-manager-sdk-android-2-0-0)
    
    New
    
    SDK Android
    
    Money Manager
    
    New SDK for Android 2.0.0 for Money Manager is released with below updates:
    
    -   Set the minimum supported version to Android 10
    -   Removed desugaring dependency
    -   Fixed empty transaction list in statistics details page
    
-   July 11, 2024
    
    ## Decommissioned OAuth Refresh Tokens[](#decommissioned-oauth-refresh-tokens)
    
    Decommissioned
    
    API
    
    The refresh\_token OAuth grant type is now decommissioned and refresh tokens are no longer emitted.
    
-   July 10, 2024
    
    ## New user friendly callback page for no-code solutions[](#new-user-friendly-callback-page-for-no-code-solutions)
    
    New
    
    Risk Insights
    
    Income Check
    
    Expense Check
    
    Console
    
-   July 10, 2024
    
    ## Modified payer account visibility in Console payment logs[](#modified-payer-account-visibility-in-console-payment-logs)
    
    Improvement
    
    Console
    
    Payments
    
    As of July 10th 2024, payer account details within the Console payment logs for the one-time payments product are hidden. This is to restrict access to personally identifiable information (PII) available in Console.
    
    For troubleshooting purposes, you can still access the last 4 digits of the payer account.
    
    ![](https://images.ctfassets.net/tmqu5vj33f7w/3cg4JeUbdK8rc2uiT2vidt/a3b57d31ec59e0ed83e67808bde6b568/Changelog-paylog-Iban-masking-2__1_.png)
    
-   July 01, 2024
    
    ## Released Money Manager iOS SDK 2.0.0[](#released-money-manager-ios-sdk-2-0-0)
    
    New
    
    Money Manager
    
    SDK iOS
    
    New SDK for iOS 2.0.0 for Money Manager is released with below updates:
    
    -   Set the minimum supported version to iOS 14 & Xcode 15.2.
    -   Overall improvement in stability and performance.
    -   No more dependency on the Tink Core SDK.
    -   Removed the Improve Categorization feature.
    -   Removed keys for unused localized strings.
    -   Removed the APIs deprecated in prior versions.
    -   Updated the code reference documentation.
    
    For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-money-manager-ios/blob/master/MIGRATION_GUIDE.md).
    
-   June 20, 2024
    
    ## Released Money Manager iOS SDK 1.4.0[](#released-money-manager-ios-sdk-1-4-0)
    
    New
    
    SDK iOS
    
    Money Manager
    
    New SDK for iOS 1.4.0 for Money Manager is released with below updates:
    
    -   Added Safe to Spend feature \*
    -   Added Recurring Expenses feature
    -   Added ability to show predicted recurring expenses in All transactions screen
    
    -   Safe To Spend is not enabled by default. Speak to your account manager for more information.
    
-   June 20, 2024
    
    ## Released Money Manager SDK Android 1.1.6[](#released-money-manager-sdk-android-1-1-6)
    
    New
    
    Money Manager
    
    SDK Android
    
    The new SDK for Android 1.1.6 for Money Manager is released with below update:
    
    -   Added Safe to Spend feature (Safe to Spend is not enabled by default. Speak to your account manager for more information)
    -   Added Recurring expenses
    -   Created entry point EntryPoint.SafeToSpend to launch Safe to Spend as a stand alone feature
    -   Created entry point EntryPoint.RecurringExpenses to launch Recurring expense as a stand alone feature
    -   Extended TinkMoneyManager.init() with enableSafeToSpend feature flag to enable/disable Recurring expenses section on top of Transaction list.
    
    To upgrade to the latest version, [see the release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/1.1.6).
    
-   June 07, 2024
    
    ## Upcoming Tink API root CA change[](#upcoming-tink-api-root-ca-change)
    
    Improvement
    
    API
    
    Documentation
    
    To future-proof the Tink API connectivity for integrations, we will on **2025-06-11** change the server certificate presented by **api.tink.com** and its subdomains, to be issued by a new root Certificate Authority. The current **DigiCert Global Root CA** will change to **DigiCert Global Root G2**.
    
    For your integration to continue without issue after the change, please ensure that your application trusts both the current and upcoming DigiCert root CA certificates. We advice to customers relying on custom trust stores to update them according to our [HTTPS and TLS guidelines](https://docs.tink.com/api#introduction/https-and-tls) before then. If you know that your application uses the operating system's trust store, then keeping the OS up-to-date will be sufficient.
    
    The Tink API server certificate will remain signed by **DigiCert Global Root CA** until it is renewed on **2025-06-11**.
    
    For further details, see [DigiCert's announcement](https://knowledge.digicert.com/general-information/digicert-root-and-intermediate-ca-certificate-updates-2023).
    
-   June 03, 2024
    
    ## Released Money Manager SDK Android 1.1.5[](#released-money-manager-sdk-android-1-1-5)
    
    New
    
    Money Manager
    
    SDK Android
    
    The new SDK for Android 1.1.5 for Money Manager is released with below update:
    
    -   Fixed wrong padding of title in Transaction Details Screen
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/1.1.5).
    
-   May 21, 2024
    
    ## Decommissioned User-data-control service[](#decommissioned-user-data-control-service)
    
    Deprecated
    
    API
    
    The endpoints `user-data-control/data-exports`, `/data-exports/{id}/download` and `user-data-control/data-exports/{id}` are now removed. Consequently, the service User-data-control has reached end of life.
    
-   April 30, 2024
    
    ## Released Tink Link iOS 3.0.0[](#released-tink-link-ios-3-0-0)
    
    New
    
    SDK iOS
    
    A new version of the Tink Link iOS SDK has been released, including:
    
    -   Aligned with Apple’s new privacy manifest
    -   Upgraded Xcode to version 15
    -   Upgraded to Swift 5.9
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/3.0.0).
    
-   April 23, 2024
    
    ## Introduced subcategories to Income Check in UK[](#introduced-subcategories-to-income-check-in-uk)
    
    New
    
    Income Check
    
    Income Check customers in the UK can now access a more granular taxonomy with the introduction of 21 income [subcategories](https://docs.tink.com/api-risk#risk/income-check/create-an-income-check/response-incomecheck/incomesubtype) and subtype summary [KPIs](https://docs.tink.com/api-risk#risk/income-check/create-an-income-check/response-incomecheck/summarybysubtypes). This new update will enable customers to have more control on what type of income to include or exclude in their affordability assessments. This new update is only accessible in the JSON payload and the Income Check PDF in the first release, and the Risk decisioning view in Console to follow.
    
    -   Note that the new taxonomy is enabled for all Income Check customers in the United Kingdom and can be enabled per customer in Spain. More full market releases to follow.
    -   For all other markets a default (UNDETERMINED) subType will be returned.
    
-   April 19, 2024
    
    ## Released Tink Link iOS 2.7.0[](#released-tink-link-ios-2-7-0)
    
    New
    
    SDK iOS
    
    A new version of the Tink Link iOS SDK has been released, including:
    
    -   `UINavigationBar` replaced with `Tink Link` navigation bar.
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/2.7.0).
    
-   April 17, 2024
    
    ## Expanded the new Exit screen to all Tink products[](#expanded-the-new-exit-screen-to-all-tink-products)
    
    New
    
    Tink Link
    
    SDK iOS
    
    SDK Android
    
    As of April 17th, all Tink products across the UK + EU markets feature a new Exit screen designed to elicit feedback directly from your users concerning their reason for cancellation.
    
    This presents an opportunity to prevent mistakenly cancelled flows and gather first-hand data regarding the root causes of user drop-offs.
    
    ![Changelog exit screen](https://images.ctfassets.net/tmqu5vj33f7w/60lMlrSRLKwFQQ0UfltYrh/c92b810e8ea554e9e5fc6fd56537b20f/Changelog-exit_screen-8.png)
    
-   April 16, 2024
    
    ## Released Money Manager SDK Android 1.1.4[](#released-money-manager-sdk-android-1-1-4)
    
    New
    
    Money Manager
    
    SDK Android
    
    The new SDK for Android 1.1.4 for Money Manager is released. With this update, “Recommended Budgets” will be refreshed for shared accounts. To upgrade to the latest version, see [the release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/1.1.4).
    
-   April 16, 2024
    
    ## Deprecated market list endpoint[](#deprecated-market-list-endpoint)
    
    Deprecated
    
    API
    
    The endpoint `/user/markets/list` is now deprecated and will reach end of life in November 2024.
    
-   April 16, 2024
    
    ## Deprecated User-data-control service[](#deprecated-user-data-control-service)
    
    Deprecated
    
    API
    
    The endpoints `user-data-control/data-exports`, `/data-exports/{id}/download` and `user-data-control/data-exports/{id}` are now deprecated. Consequently, the service [User-data-control](https://docs.tink.com/api-general#general/user-data-control) is now also deprecated and will reach end of life in June 2024.
    
-   April 16, 2024
    
    ## Deprecated Version service[](#deprecated-version-service)
    
    Deprecated
    
    API
    
    The endpoint `/api/v1/version` and consequently the [Version](https://docs.tink.com/api-general#general/version) service are now deprecated and will reach end of life in September 2024.
    
-   April 16, 2024
    
    ## Deprecated Monitoring service[](#deprecated-monitoring-service)
    
    Deprecated
    
    API
    
    The endpoints `/monitoring/ping` and `/monitoring/healthy` are now deprecated. Consequently, the [Monitoring](https://docs.tink.com/api-general#general/monitoring) service is now also deprecated and will reach end of life in October 2024.
    
-   April 15, 2024
    
    ## Added date field in Transactions API[](#added-date-field-in-transactions-api)
    
    New
    
    Business Transactions
    
    Transactions
    
    The Transactions product now includes an additional field within the dates object - _transaction_. The new field indicates the date a transaction was initiated. Availability of data varies depending on the financial institution.
    
-   April 09, 2024
    
    ## Released Tink Link iOS SDK 2.6.0[](#2024-04-09-released-tink-link-ios-sdk-260)
    
    New
    
    SDK iOS
    
    -   Added support for Variable Recurring Payments (VRPs) with using new API-call `Tink.Payments.authorizeVariableRecurringPaymentsMandate`.
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/2.6.0).
    
-   April 04, 2024
    
    ## Released Tink Link Android SDK 2.5.0[](#2024-04-04-released-tink-link-android-sdk-250)
    
    New
    
    SDK Android
    
    -   `Tink.AccountAggregation.refreshCredentials()` flow extended with `locale` parameter.
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-link-android/releases/tag/2.5.0).
    
-   April 04, 2024
    
    ## Released Balance Refresh API[](#released-balance-refresh-api)
    
    New
    
    API
    
    Balance Check
    
    Balance Check customers can now access the new Balance Refresh API, enabling efficient refreshes of selected account balances.
    
    For more information, visit our [documentation](https://docs.tink.com/api-connectivity-v1#connectivity-v1/balance-refresh).
    
-   March 27, 2024
    
    ## Added new data point to Connector API[](#added-new-data-point-to-connector-api)
    
    New
    
    API
    
-   March 26, 2024
    
    ## Released Money Manager SDK Android 1.1.3[](#released-money-manager-sdk-android-1-1-3)
    
    New
    
    Money Manager
    
    SDK Android
    
    New SDK for Android 1.1.3 for Money Manager is released with below updates:
    
    -   Fixed old keyword retention issue when creating budget
    -   Fixed incorrect average amount on Budget Creation screen
    -   Resolved finance overview screen updation problem after deleting/editing budget To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/1.1.3).
    
-   March 21, 2024
    
    ## Released Money Manager iOS SDK 1.2.1[](#released-money-manager-ios-sdk-1-2-1)
    
    New
    
    Money Manager
    
    SDK iOS
    
    New SDK for iOS 1.2.1 for Money Manager is released with below updates:
    
    -   Fixed an issue in Statistics when sometimes Left to Spend shows "No statistics available" if there are no Expenses for the current period of time.
    -   Improved handling of the keyboard on the Create Budget screen.
    
-   March 19, 2024
    
    ## Introduced a new Exit screen to Tink’s Payments products[](#introduced-a-new-exit-screen-to-tinks-payments-products)
    
    New
    
    Tink Link
    
    SDK iOS
    
    SDK Android
    
    Payments
    
    As of March 19th, Tink’s Payments products feature a new Exit screen designed to elicit feedback directly from your users concerning their reason for cancellation.
    
    This presents an opportunity to prevent mistakenly cancelled flows and gather first-hand data regarding the root causes of user drop-offs.
    
    ![Changelog exit screen](https://images.ctfassets.net/tmqu5vj33f7w/60lMlrSRLKwFQQ0UfltYrh/c92b810e8ea554e9e5fc6fd56537b20f/Changelog-exit_screen-8.png)
    
-   March 04, 2024
    
    ## Introduced a new consent screen to Tink's EU Products[](#introduced-a-new-consent-screen-to-tinks-eu-products)
    
    New
    
    Tink Link
    
    SDK iOS
    
    SDK Android
    
    Effective March 4th 2024, a new screen dedicated to obtaining user consent has been added to all products operating on Tink’s license in the EU.
    
    This change is not only a proactive step to meet evolving compliance and regulatory requirements, it also offers the potential to enhance user experiences.
    
    No action is required, as all technical changes are handled by Tink. View the new consent screen on our [demo site](https://demo.tink.com/) or in your product flow.
    
    _Note this change only impacts products operating on Tink’s license. The new consent screen will not be implemented if you operate on your own license._
    
-   February 26, 2024
    
    ## Released Money Manager SDK Android 1.1.2[](#2024-02-26-released-money-manager-sdk-android-112)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Fixed visibility issue of 2 create budget views on Overview
    -   Hiding dynamic budgets component when list is empty on Overview
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/1.1.2).
    
-   February 23, 2024
    
    ## Released Money Manager SDK iOS 1.2.0[](#released-money-manager-sdk-ios-1-2-0)
    
    New
    
    Money Manager
    
    SDK iOS
    
    New SDK for iOS 1.2.0 for Money Manager is released with below updates:
    
    -   Deprecated the Improve the categorization level feature.
    -   Improved handling of the keyboard on the Create Budget screen.
    
    ### API changes
    
    -   `FinanceOverviewViewController.Feature.improveCategorizationLevel` enum case is marked as deprecated.
    -   `ScreenEvent.improveCategorizationLevel` enum case is marked as deprecated.
    -   public protocol `ImproveCategorizationLevelViewControllerDelegate` is marked as deprecated.
    -   public class `ImproveCategorizationLevelViewController` is marked as deprecated.
    -   static constant `MaterialIconsProvider.improveCategorization` is marked as deprecated.
    
    Deprecated APIs will be removed in the next major release of the Money Manager SDK.
    
-   February 21, 2024
    
    ## Changed feature computation within Risk Insights[](#changed-feature-computation-within-risk-insights)
    
    Changed
    
    Risk Insights
    
    Currently, when transaction history data isn’t available for a field in transactionStats, certain computations cannot be calculated and are therefore omitted from the response. In the interest of Risk Insight report consistency, we have implemented a change that will always return all required fields in the transactionStats category. In the response for transactionStats, the fields provide insights into transaction statistics, which include but aren’t limited to:
    
    -   total number of transactions
    -   the sum of transaction amounts in specific periods
    -   the average transaction amount over specific periods.
    
    **Interpreting Default Values:** For certain statistical measures, such as average transaction amounts, a default value of 0 may be present. This default value is used in cases where the relevant data to perform the calculation is not available. This scenario could arise due to various reasons, such as:
    
    -   No Transactions: There were no transactions during the specified period.
    -   Insufficient Data: The data needed to accurately calculate the statistic is not available or incomplete.
    
    **Using the Data Availability Field:** To accurately interpret these default values (i.e. if a 0 is an actual 0 or n.a.), you should refer to the dataAvailability field provided in our API response. This field offers a list of periods for which data is available and can be used to contextualise the transaction statistics. Here’s how to use it:
    
    -   **Check Data Availability**: Before analysing the transaction statistics, review the dataAvailability field to understand which periods have complete data. This field offers a list of periods for which transaction history data is available in an aggregated user’s profile. This step helps in determining whether the statistics you are reviewing are based on complete or partial data.
    -   **Interpret Default Values**: If you encounter a default value of 0 in transaction statistics:
        -   **With Data Availability**: If the period in question is listed in the dataAvailability field, a default value of 0 indicates there were no transactions during this period.
        -   **Without Data Availability**: If the period is not listed, the default value of 0 should be interpreted as a lack of sufficient data to calculate the statistic rather than an indication of zero transactions.
    
-   February 13, 2024
    
    ## Fixed Update Webhook endpoint[](#fixed-update-webhook-endpoint)
    
    Fixed
    
    API
    
    The [Update Webhook endpoint](https://docs.tink.com/api-events-v2#events-v2/webhook/update-webhook-endpoint) from the Events v2 service is now fixed and can be used with a JSON request body constructed according to the specification.
    
-   February 12, 2024
    
    ## Updated Tink’s network infrastructure[](#updated-tinks-network-infrastructure)
    
    Improvement
    
    Infrastructure
    
    Tink is modifying its network infrastructure, affecting the source addresses for customers receiving network traffic that originates from Tink, specifically WebHooks/Call Backs. Regular customer-originating API traffic won’t be impacted.
    
    If your network architecture (firewalls in particular) or services do not allowlist/validate origin IP Addresses, this change will not affect you. If it does, contact your Tink representative before February 19th 2024 to obtain the new source IP Addresses for your configuration.
    
    The change will take effect from February 21st 2024.
    
-   February 08, 2024
    
    ## Deprecated Link Transactions from Data v1[](#deprecated-link-transactions-from-data-v1)
    
    Deprecated
    
    Aggregation
    
    Money Manager
    
-   February 01, 2024
    
    ## Added connection to Wise bank with payment capabilities in 9 markets[](#added-connection-to-wise-bank-with-payment-capabilities-in-9-markets)
    
    New
    
    Payments
    
    Connections
    
    You can now connect to Wise bank in the following markets:
    
    -   Netherlands
    -   Denmark
    -   France
    -   Belgium
    -   Portugal
    -   Finland
    -   Ireland
    -   Sweden
    -   Estonia
    
    To leverage this connection, please contact your Tink representative.
    
-   February 01, 2024
    
    ## Added payments capabilities to 1 bank in Norway[](#added-payments-capabilities-to-1-bank-in-norway)
    
    New
    
    Payments
    
    Connections
    
    You can now initiate payments with the following bank:
    
    -   Sparebanken Vest
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/payments?market=NO) for payments in Norway.
    
-   February 01, 2024
    
    ## Added 1 new AIS connection in the UK[](#added-1-new-ais-connection-in-the-uk)
    
    New
    
    Connections
    
    You can now connect to the following bank in the UK:
    
    -   Triodos
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/aggregation?market=GB) in the UK.
    
-   January 24, 2024
    
    ## Released Money Manager iOS SDK 1.1.1[](#2024-01-24-released-money-manager-ios-sdk-111)
    
    New
    
    SDK iOS
    
    Money Manager
    
    -   Improved support of budgets created directly from the API.
    -   Various visual improvements of Recommended Budgets.
    
-   January 18, 2024
    
    ## Released Money Manager SDK Android 1.1.1[](#2024-01-18-released-money-manager-sdk-android-111)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Fixed infinite spinner issue on Latest transactions
    -   Fixed text overlapping in Budget summary bar chart
    -   Fixed text overlapping issue on change button in Transaction Details screen
    -   Updated toolbar and status bar to match theme color instead of category color in Transaction Details screen
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/1.1.1).
    
-   December 22, 2023
    
    ## Update to identity data for Swedbank[](#update-to-identity-data-for-swedbank)
    
    Changed
    
    Account Check
    
    Income Check
    
    Expense Check
    
    Risk Insights
    
    On 18 October 2023, Tink received notice from Swedbank that the Swedish Financial Supervisory Authority (SFSA) had granted Swedbank an exemption from the obligation to provide a contingency mechanism (“fallback”). Consequently, Tink will be moving all traffic for fetching payments accounts data for Swedbank and Sparbankerna users from Swedbank’s fallback API to Swedbank’s PSD2 API on January 18 2024.
    
    The change will impact Tink's ability to retrieve and return identity data of the authenticating user in its products. Tink products will no longer return SSN (Social Security Number / personnummer in Sweden) in the products’ responses and reports from Swedbank, as Swedbank (and by extension Sparbankerna) does not expose SSN via its PSD2 API.
    
    If a financial institution does not expose any identity data (e.g. SSN), the corresponding `identity{}` field in Tink's response might be omitted. Ensure that your integration supports this logic, so that there are no dependencies on Tink's optional fields.
    
    If identity data is available at the financial institution, it's returned as below:
    
    `"identity": { "name": "Jane Doe", "ssn": "198609011234" }`
    
    If identity data if not available, the identity{} field will be completely omitted or returned empty:
    
    `"identity": { "name": "", "ssn": "" }`
    
    > Note: The account holder name will still continue to be available and returned as part of the account information. See the API reference for details on [Account Check](https://docs.tink.com/api#data-v1/account-verification/the-account-verification-model/party), [Income Check](https://docs.tink.com/api#risk/income-check/create-an-income-check/response-incomecheck/account), [Expense Check](https://docs.tink.com/api#risk/expense-check/create-an-expense-check-report/response-expensecheck/account) and [Risk Insights](https://docs.tink.com/api#risk/risk-insights/get-a-risk-insights/response-riskinsights/account).
    
-   December 15, 2023
    
    ## Released Tink Link iOS SDK 2.4.0[](#2023-12-15-released-tink-link-ios-sdk-240)
    
    New
    
    SDK iOS
    
    -   Added support for Bulk Payments with using new API-call `Tink.Payments.initiateBulkPayment`.
    -   Added `external_reference` and `refreshable_items` parameters for Account Check.
    -   Improved UX of the success screen.
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/2.4.0).
    
-   December 08, 2023
    
    ## Released Money Manager iOS SDK 1.1.0[](#2023-12-08-released-money-manager-ios-sdk-110)
    
    New
    
    SDK iOS
    
    Money Manager
    
    -   Added support for [Recommended Budgets](https://docs.tink.com/resources/money-manager/money-manager-ios/recommended-budgets-for-ios-pfm-sdk) feature.
    -   Extended `FinanceOverviewViewController.Feature` type with new case: `recommendedBudgets`. Enabling this feature will present list of recommended budgets within `FinanceOverviewViewController` layout.
    -   Extended `CreateBudgetViewController` initializer with new optional attribute: `showBudgetCreateSuccessScreen`. Passed value will toggle appearance of success screen after budget creation.
    -   Updated the code reference documentation.
    
-   December 08, 2023
    
    ## Released Money Manager SDK Android 1.1.0[](#2023-12-08-released-money-manager-sdk-android-110)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Added [Recommended Budgets](https://docs.tink.com/resources/money-manager/money-manager-api/recommend-budgets) feature.
    -   Created entry point `EntryPoint.RecommendedBudgets` to launch Recommended Budgets as a stand alone feature.
    -   Extended `TinkMoneyManager.init()` with `enableRecommendedBudget` feature flag to enable/disable `Recommended Budgets` feature.
    -   Added Budget creation success screen, which appears as a confirmation of successful budget creation.
    -   Extended `TinkMoneyManager.init()` with `enableBudgetCreationSuccessScreen` feature flag to control the visibility of confirmation screen for successful Budget creation.
    
-   November 27, 2023
    
    ## Added 2 new connections with payments capabilities in Germany[](#added-2-new-connections-with-payments-capabilities-in-germany)
    
    New
    
    Payments
    
    Connections
    
    You can now connect to and initiate payments with the following banks:
    
    -   Landesbank Saar
    -   UmweltBank
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/payments?market=DE) for payments in Germany.
    
-   November 09, 2023
    
    ## Released new product - Loans[](#released-new-product-loans)
    
    New
    
    Loans
    
    Tink customers can now access Tink Loans, a new product that helps identify loans accounts so you can onboard users and offer consolidation or counter offers more efficiently.
    
    Loans provides instant access to loans account data via a single API. Loans includes different loan account types such as mortgage, personal, student and vehicle. Tink is able to fetch this data from bank APIs and return it in a standardised format.
    
    Loans is live in Spain and Sweden and will soon be available across further markets. Contact your Tink representative to enable it.
    
-   November 09, 2023
    
    ## Released new product - Investments[](#released-new-product-investments)
    
    New
    
    Investments
    
    Tink customers can now access Tink Investments, a new product that helps identify investments and pensions accounts so you can transfer and onboard users more efficiently.
    
    Investments provides instant access to investment and pensions account data via a single API. Investments includes different holding types such as equity, funds, stocks, bonds and pensions accounts. Tink is able to fetch this data from bank APIs and return it in a standardised format.
    
    Investments is live in Spain and Sweden and will soon be available across further markets. Contact your Tink representative to enable it.
    
-   November 01, 2023
    
    ## Introduced a new consent screen to Tink's AIS Products[](#introduced-a-new-consent-screen-to-tinks-ais-products)
    
    New
    
    Tink Link
    
    SDK iOS
    
    SDK Android
    
    Effective November 1st 2023, a new screen dedicated to obtaining user consent has been added to Tink’s AIS products (Account Check, Business Account Check, Transactions, Business Transactions, Income Check, Expense Check and Risk Insights). This applies to customers using the Tink license only.
    
    This change is not only a proactive step to meet evolving compliance and regulatory requirements, but it also offers the potential to enhance user experiences.
    
    No action is required, as all technical changes are handled by Tink. View the new consent screen on our [demo site](https://demo.tink.com/) or in your product flow.
    
    ![](https://images.ctfassets.net/tmqu5vj33f7w/17Xo5HiD3EUTXnGpFT4peM/fa27ecdd703b2741508374f1d2078975/AIS_consent_screen.png)
    
-   November 01, 2023
    
    ## Introduced Income SubTypes to Income Check BETA[](#introduced-income-subtypes-to-income-check-beta)
    
    New
    
    Income Check
    
    Income Check (BETA) app users can now access a much more granular Income Check taxonomy with the introduction of 21 income [subtypes](https://docs.tink.com/api#risk/income-check/create-an-income-check/response-incomecheck/incomesubtype) and subtype summary [KPIs](https://docs.tink.com/api#risk/income-check/create-an-income-check/response-incomecheck/summarybysubtypes). This new update will enable you to have more control on what type of income you want to include in your affordability assessments.
    
    -   This new update is only accessible in the JSON payload for the first release, with PDF and console to follow.
    -   Note that the new taxonomy will first be available in Spain and the United Kingdom with more markets to follow.
    -   To enable this on your app please reach out to your sales contact.
    -   For all other apps a default (UNDETERMINED) subType will be returned.
    
-   October 23, 2023
    
    ## Providers sorted by rank[](#providers-sorted-by-rank)
    
    New
    
    API
    
    API calls to [List providers for a market](https://docs.tink.com/api#connectivity-v1/provider/list-providers-for-a-market) will return providers sorted by `rank` value. This is an arbitrary value set by Tink based on market share and relevance for each bank. Higher is better.
    
    When the rank value is not set or multiple items have the same rank value, providers will be sorted based on `providerName`.
    
-   October 18, 2023
    
    ## Deprecated support for legacy browsers in Tink Link[](#deprecated-support-for-legacy-browsers-in-tink-link)
    
    Deprecated
    
    Tink Link
    
    The support in Tink Link for the following browsers will be discontinued due to the introduction of stricter TLS cipher requirements on 14th November 2023.
    
    -   Internet Explorer 11 on Windows 7, Windows 8.1, Windows Phone 8.1, Windows Phone 8.1 Update
    -   Safari 6-8 on iOS 6.1, iOS 7.1, iOS 8.4, OS X 10.9, OS X 10.10
    
-   September 22, 2023
    
    ## Released Money Manager iOS SDK 1.0.0[](#2023-09-22-released-money-manager-ios-sdk-100)
    
    New
    
    SDK iOS
    
    Money Manager
    
    -   Set minimum supported version to iOS 13.
    -   Improved Left to Spend layout behavior.
    -   Changed some keys for localized strings. Refer to the [guide](https://github.com/tink-ab/tink-money-manager-ios/blob/master/MIGRATION_GUIDE.md#updates-and-removals-of-keys-for-localized-strings) for migration.
    -   Removed keys for unused localized strings.
    -   Removed the customizing of empty state for Actionable Insights.
    -   Removed the APIs deprecated in prior versions.
    -   Updated the code reference documentation.
    
    For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-money-manager-ios/blob/master/MIGRATION_GUIDE.md).
    
-   September 22, 2023
    
    ## Enabled connections to Wise bank in 3 new markets[](#enabled-connections-to-wise-bank-in-3-new-markets)
    
    New
    
    Connections
    
    You can now connect to and initiate payments with Wise bank in Germany, Italy and Spain.
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/aggregation?market=DE).
    
-   September 22, 2023
    
    ## Added 3 new AIS connections in Czech Republic[](#added-3-new-ais-connections-in-czech-republic)
    
    New
    
    Connections
    
    You can now connect to the following banks in the Czech Republic:
    
    -   Moneta
    -   Ceska sporitelna
    -   UniCredit
    
-   September 22, 2023
    
    ## Added 1 new business connection in Poland[](#added-1-new-business-connection-in-poland)
    
    New
    
    Connections
    
    You can now connect your business accounts to Revolut in Poland.
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/aggregation?market=PL) for account aggregation in Poland.
    
-   September 22, 2023
    
    ## Added 1 new AIS connection in Norway[](#added-1-new-ais-connection-in-norway)
    
    New
    
    Connections
    
    You can now connect to Sparebanken Vest in Norway.
    
    To leverage this new AIS provider do not hesitate to contact your Tink representative.
    
-   September 22, 2023
    
    ## Added 1 new AIS connection in Estonia[](#added-1-new-ais-connection-in-estonia)
    
    New
    
    Connections
    
    You can now connect to Coop Pank in Estonia.
    
    To leverage this new AIS provider, please contact your Tink representative.
    
-   September 22, 2023
    
    ## Added support for 180-day consent in 2 additional markets[](#added-support-for-180-day-consent-in-2-additional-markets)
    
    Improvement
    
    Connections
    
    In December 2022 the European Banking Authority (EBA) published an amendment to its Regulatory Technical Standards (RTS). This amendment extends the access under the SCA-exemption from 90 to 180 days.
    
    The immediate benefit is that a payment service user (PSU) will need to re-authenticate with its account servicing payment service providers (ASPSP) only every 180 days instead of 90 days in order to continue to access account information.
    
    The EBA amendment required ASPSPs to implement the new regulations in their access interfaces on July 25, 2023.
    
    Most banks in the EU have now enabled support for 180-day consent in their APIs. Tink now fully supports 180-day consent in its PSD2 connections in the following additional markets.
    
    -   Belgium
    -   Netherlands
    
-   September 21, 2023
    
    ## Released Money Manager SDK Android 1.0.0[](#2023-09-21-released-money-manager-sdk-android-100)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Tink Money Manager Android is now available on Maven Central.
        
    -   Added possibility to launch features directly. Meaning the features now have entry points that can be used to access that feature directly, instead of going through the Finance overview. This release includes entry points for the following features:
        
        -   Transactions
        -   Insights
        -   Statistics
            -   Income
            -   Expense
            -   Left-to-spend
        -   Accounts
        -   Budgets
        -   Overview
    -   Deprecated _**FinanceOverviewFragment**_: we have introduced a new way to launch the Finance Overview screen to align with the "Entrypoints" feature as shown above. This involves using the new _**TinkMoneyManager**_ instead of the deprecated _**FinanceOverviewFragment**_. For migration details, refer to the [migration guide](https://github.com/tink-ab/tink-money-manager-android/blob/master/MIGRATION_GUIDE_TO_VERSION_1.0.md).
        
    -   Deprecated _**FinanceOverviewStyle**_: we are deprecating the use of the old _**TinkFinanceOverviewStyle**_ in favor of the new _**TinkMoneyManagerStyle**_.
        
    -   Removed negative amounts from Left-to-Spend over time view. The lowest possible amount is now 0.
        
    -   Added Api Reference at [https://tink-ab.github.io/tink-money-manager-android/](https://tink-ab.github.io/tink-money-manager-android/).
        
    -   Added two new types of Actionable Insights:
        
        -   [Spending By Category Increased](https://docs.tink.com/resources/money-manager/money-manager-api/list-of-available-insights#spending-by-category-increased)
        -   [Spending By Primary Category Increased](https://docs.tink.com/resources/money-manager/money-manager-api/list-of-available-insights#spending-by-category-increased)
    
    **Breaking change:**
    
    -   Removed the _**javaInsightActionHandler**_ as parameter of the _**FinanceOverviewFragment.newInstance(...)**_ method. For details, refer to the [migration guide](https://github.com/tink-ab/tink-money-manager-android/blob/master/MIGRATION_GUIDE_TO_VERSION_1.0.md).
    
    To download the source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/1.0.0).
    
-   September 08, 2023
    
    ## Introduced “All Markets” filter in Console[](#introduced-all-markets-filter-in-console)
    
    Improvement
    
    Console
    
    A new default filter has been added to Console analytics which combines data across all countries of operation into one view.
    
    [Log in to your account](https://console.tink.com/login) to view the aggregated market metrics.
    
-   August 31, 2023
    
    ## Released Tink Link iOS SDK 2.3.0[](#2023-08-31-released-tink-link-ios-sdk-230)
    
    New
    
    SDK iOS
    
    -   Added `BaseDomain` type. This type is used to specify the Tink Link API base domain for both the production and custom environments. There are two distinct available options:
    
      1. European Base Domain (`BaseDomain.eu`): This corresponds to the European production environment.
    
      2. Custom Base Domain (`BaseDomain.custom("your_custom_base_domain")`). This allows configuration for a custom base domain, which can be useful for sandbox environments or other specific requirements.
    
    -   Added new initializer for `Configuration` type which requires `BaseDomain` case as required parameter.
        
    -   Deprecated existing `Configuration` type initializer which does not require `BaseDomain` case. This initializer falls back to the `.eu` case.
        
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/2.3.0).
    
-   August 30, 2023
    
    ## New product released - Risk Signals[](#new-product-released-risk-signals)
    
    New
    
    Payments
    
    Tink customers can now access [Risk Signals](https://docs.tink.com/resources/payments/one-time-payments/risk-signals), a new product that helps identify payment and settlement risk so you can optimise and protect revenues.
    
    Risk Signals uses payment, account information (AIS) and provider data to identify payment risk and block any payments with a higher risk of settlement failure, enabling merchants to offer instant payment experiences with the highest protection.
    
    Risk Signals is in Beta in Germany and will soon be available across further EU markets. Contact your Tink representative to enable it.
    
-   August 29, 2023
    
    ## Released Tink Link Android SDK 2.3.0[](#2023-08-29-released-tink-link-android-sdk-230)
    
    New
    
    SDK Android
    
    -   Deprecated Market Enum: The Market enum has been deprecated and replaced with a more flexible String value.
        
    -   Introduction of BaseDomain Class: The Configuration class now includes the mandatory BaseDomain parameter. This parameter is used to specify the Tink Link API base domain for both the production and custom environments. There are two distinct available options:
        
        -   European Base Domain (BaseDomain.EU): This corresponds to the European production environment.
        -   Custom Base Domain (BaseDomain.Custom("your\_custom\_base\_domain")): This allows configuration for a custom base domain, which can be useful for sandbox environments or other specific requirements.
    
    Migration Guide:
    
    -   Market Migration:
        
        -   For each occurrence of Market("market\_code"), replace it with "market\_code" as a String. Android Studio will prompt a warning and offer a fix to address the deprecation and adopt the new correct String value.
    -   BaseDomain Migration:
        
        -   For each occurrence of Configuration constructor, add the new BaseDomain parameter to the constructor. To configure Tink Link for the European production environment, append BaseDomain.EU to the constructor, like so: Configuration("client\_id", "redirect\_uri", BaseDomain.EU). Alternatively, for sandbox environments, use BaseDomain.Custom("your\_custom\_base\_domain").
        -   Android Studio will highlight deprecated code and suggest an action to replace it with the correct Configuration constructor, automatically adding BaseDomain.EU as the default environment.
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-link-android/releases/tag/2.3.0).
    
-   August 28, 2023
    
    ## Added support for 180-day consent in 8 markets[](#added-support-for-180-day-consent-in-8-markets)
    
    Improvement
    
    Connections
    
    In December 2022 the European Banking Authority (EBA) published an amendment to its Regulatory Technical Standards (RTS). This amendment extends access under the SCA-exemption from 90 to 180 days.
    
    The immediate benefit is that a payment service user (PSU) will need to re-authenticate with its account servicing payment service provider (ASPSP) only every 180 days instead of 90 days in order to continue to access account information.
    
    The EBA amendment required ASPSPs to implement the new regulations in their access interfaces on July 25, 2023.
    
    Most banks in the EU have now enabled support for 180-day consent in their APIs. Therefore, Tink now fully supports 180-day consent in its PSD2 connections in the following markets:
    
    -   Denmark
    -   Estonia
    -   Finland
    -   Italy
    -   Latvia
    -   Lithuania
    -   Poland
    -   Sweden
    
    Tink will enable support for 180-day consent in more markets in the coming weeks and months.
    
-   August 28, 2023
    
    ## Added payments capabilities to 50 connections in Denmark[](#added-payments-capabilities-to-50-connections-in-denmark)
    
    New
    
    Payments
    
    Connections
    
    You can now initiate payments with the following banks in Denmark:
    
    -   Nordea
    -   Danske Bank
    -   BEC - 20 banks including Nykredit, Spar Nord, Arbejdernes Landsbank and Vestjysk bank
    -   Bankdata - 8 banks including Jyske Bank, Sydbank and Ringkjøbing Landbobank
    -   SDC - 20 banks including Sparekassen
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/payments?market=DK) for payments in Denmark.
    
-   August 28, 2023
    
    ## Added 1 new AIS connection in Denmark[](#added-1-new-ais-connection-in-denmark)
    
    New
    
    Connections
    
    You can now connect to Lunar bank in Denmark.
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/aggregation?market=DK) for account aggregation in Denmark.
    
-   August 28, 2023
    
    ## Added support for business aggregation for 54 connections in Spain[](#added-support-for-business-aggregation-for-54-connections-in-spain)
    
    New
    
    Connections
    
    We now support business aggregation for 54 new connections in Spain.
    
    To leverage these new business connections please contact your Tink representative.
    
-   August 28, 2023
    
    ## Added payments capabilities to 3 connections in Italy[](#added-payments-capabilities-to-3-connections-in-italy)
    
    New
    
    Payments
    
    Connections
    
    You can now initiate payments with the following banks in Italy:
    
    -   Cartalis
    -   CheBanca
    -   Deutsche Bank
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/payments?market=IT) for payments in Italy.
    
-   August 28, 2023
    
    ## Added 5 new AIS connections in the Czech Republic[](#added-5-new-ais-connections-in-the-czech-republic)
    
    New
    
    Connections
    
    You can now connect to the following banks in the Czech Republic:
    
    -   AirBank
    -   FioBanka
    -   Komerční banka
    -   mBank
    -   Raiffeisenbank
    
    These connections support both AIS and PIS functionalities, and are readily available in your Console account.
    
-   August 18, 2023
    
    ## Deprecated legacy test providers in Sandbox apps[](#deprecated-legacy-test-providers-in-sandbox-apps)
    
    Improvement
    
    Connections
    
    API
    
    Console
    
    Legacy test providers that have a Tink Demo Bank alternative will not be available from October 31st 2023.
    
    From today, Console users creating new Sandbox apps will have access to a revised list of test providers under Tink Demo Bank. For existing apps using legacy providers, make sure to switch to a [supported test providers](https://docs.tink.com/resources/console/demo-bank#supported-demo-bank-providers) by October 31st.
    
-   August 15, 2023
    
    ## Introduced Risk Decisioning in Console[](#introduced-risk-decisioning-in-console)
    
    New
    
    Income Check
    
    Expense Check
    
    Risk Insights
    
    Console
    
    Risk Decisioning is a new solution that centralises all data for Tink's Risk products in one place. In one condensed tab, you will find:
    
    -   Income Check reports
    -   Expense Check reports
    -   Risk Insight reports
    
    You can now request access to the new Risk Decisioning solution by reaching out to your Tink representative or [contacting us online](https://tink.com/contact-us/).
    
    ![](https://images.ctfassets.net/tmqu5vj33f7w/3gcV1j8cFAXKRHuPyzl795/41b47e7e45226d742d86c1f387f4a8c2/Changelog-RDV.png)
    
-   July 05, 2023
    
    ## Added new merchant onboarding features and data filters in Console[](#added-new-merchant-onboarding-features-and-data-filters-in-console)
    
    Improvement
    
    Console
    
    Payments
    
    Account Check
    
    Console users managing merchants can now:
    
    -   Onboard merchants with the Account Check product
    -   Filter by merchant under Account Check analytics
    -   Filter by merchant under Payment logs analytics
    
    [Log in to your account](https://console.tink.com/login) to view the new merchant capabilities.
    
-   June 27, 2023
    
    ## Deprecated field in Event: Account booked transactions modified[](#deprecated-field-in-event-account-booked-transactions-modified)
    
    Deprecated
    
    Aggregation
    
    Transactions
    
    Business Transactions
    
    Field account\[transactionsModifiedEarliestBookedDate\] is now deprecated with the effective date to remove this field 2024-06-27. Please use transactions\[earliestModifiedBookedDate\] instead.
    
-   June 27, 2023
    
    ## Improved events for Transactions and Business Transactions product webhooks[](#improved-events-for-transactions-and-business-transactions-product-webhooks)
    
    Improvement
    
    Transactions
    
    Business Transactions
    
    Transactions and Business Transactions customers can now obtain more insights on modified transactions when subscribing [Event: Account transactions modified.](https://docs.tink.com/resources/transactions/webhooks-for-transactions#event-account-transactions-modified)
    
-   June 27, 2023
    
    ## Added new event for Transactions and Business Transactions product webhooks[](#added-new-event-for-transactions-and-business-transactions-product-webhooks)
    
    New
    
    Transactions
    
    Business Transactions
    
    Transactions and Business Transactions customers can now obtain a list of transaction identifiers to synchronise deleted transactions after subscribing to [Event: account transactions deleted](https://docs.tink.com/resources/business-transactions/webhooks-for-business-transactions#event-account-transactions-deleted).
    
-   June 19, 2023
    
    ## Added 1 new business connection to PKO BP in Poland[](#added-1-new-business-connection-to-pko-bp-in-poland)
    
    New
    
    Connections
    
    You can now connect to PKO BP Corporate in Poland.
    
-   June 19, 2023
    
    ## Added 1 new connection to Bank für Sozialwirtschaft in Germany[](#added-1-new-connection-to-bank-fuer-sozialwirtschaft-in-germany)
    
    New
    
    Connections
    
    You can now connect to Bank für Sozialwirtschaft in Germany.
    
-   June 19, 2023
    
    ## Added 3 new business connections in France[](#added-3-new-business-connections-in-france)
    
    New
    
    Connections
    
    You can now connect to:
    
    -   Caisse d’Epargne Corporate (15 banks)
    -   Banque Populaire Corporate (14 banks)
    -   Natixis Trade & Treasury Solutions Corporate
    
-   June 19, 2023
    
    ## Added 1 new business connection to Deutsche Bank in Spain[](#added-1-new-business-connection-to-deutsche-bank-in-spain)
    
    New
    
    Connections
    
    You can now connect to Deutsche Bank Corporate in Spain.
    
-   June 07, 2023
    
    ## Added analytics for VRP in Console[](#added-analytics-for-vrp-in-console)
    
    Improvement
    
    Console
    
    Payments
    
    Variable Recurring Payments (VRP) users can now access VRP-specific metrics under the analytics section in Console.
    
    [Log in to your account](https://console.tink.com/login) to view the new analytics tab.
    
    ![](https://images.ctfassets.net/tmqu5vj33f7w/78f8YuQwouxE3c2zsximB7/e70743e9ea47edd6a199b6b51646b764/Changelog-VRP1.png)
    
-   June 05, 2023
    
    ## Changed Tink API root CA[](#changed-tink-api-root-ca)
    
    Improvement
    
    API
    
    Documentation
    
    This changelog announcement has been superseded by a later announcement: [https://docs.tink.com/changelog#upcoming-tink-api-root-ca-change](https://docs.tink.com/changelog#upcoming-tink-api-root-ca-change)
    
    The original announcement below is kept for transparency, but should be disregarded.
    
    ~To ensure the robustness and to future-proof the integrations towards the Tink API we recommend to trust **all** DigiCert's root CA certificates instead of **DigiCert Global Root CA** which will be no longer be trusted by Mozilla:~
    
    > ~In 2025, Mozilla will begin distrusting older DigiCert root certificates. On the dates specified in the Mozilla certificate distrust and dates table below, Mozilla will also stop trusting your active end-entity certificates: first, TLS/SSL certificates and then S/MIME certificates.~
    
    ~For further details, see [DigiCert's announcement](https://knowledge.digicert.com/generalinformation/digicert-root-and-intermediate-ca-certificate-updates-2023.html)~
    
    ~The Tink API server certificate will remain to be signed by **DigiCert Global Root CA** until it is renewed before it's expiration. Renewal shall occur no later than Mon, 10 Jun 2024 23:59:59 GMT, we advice to customers relying on custom trust stores to update them according to our new [guidelines](https://docs.tink.com/api#introduction/https-and-tls) before then.~
    
-   June 05, 2023
    
    ## Released Money Manager SDK iOS 0.28.1[](#2023-06-05-released-money-manager-sdk-ios-0281)
    
    New
    
    SDK iOS
    
    Money Manager
    
    -   Fixed a bug which prevents archiving `SINGLE_UNCATEGORIZED_TRANSACTION` Actionable Insight after successful categorization.
    
    To download the source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/0.28.1).
    
-   June 02, 2023
    
    ## Released Tink Link iOS SDK 2.2.0[](#2023-06-02-released-tink-link-ios-sdk-220)
    
    New
    
    SDK iOS
    
    -   Added support for Account Aggregation product.
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/2.2.0).
    
-   June 02, 2023
    
    ## Released Tink Link Android SDK 2.2.0[](#2023-06-02-released-tink-link-android-sdk-220)
    
    New
    
    SDK Android
    
    -   Added support for account aggregation product.
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-link-android/releases/tag/2.2.0).
    
-   May 26, 2023
    
    ## Released Tink Link Android SDK 2.1.1[](#2023-05-26-released-tink-link-android-sdk-211)
    
    New
    
    SDK Android
    
    -   Fixed an issue with obfuscation that made the TinkError data model and its internal parameters not visible.
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-link-android/releases/tag/2.1.1).
    
-   May 17, 2023
    
    ## Added payments capabilities to 4 connections in Italy[](#added-payments-capabilities-to-4-connections-in-italy)
    
    New
    
    Connections
    
    Payments
    
    You can now initiate payments with the following banks:
    
    -   Hype
    -   Banca Widiba
    -   Fideuram
    -   Findomestic
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/payments?market=IT) for payments Italy.
    
-   May 16, 2023
    
    ## Enabled ABN-Amro connections in 2 new markets[](#enabled-abn-amro-connections-in-2-new-markets)
    
    New
    
    Connections
    
    You can now connect to the ABN-Amro bank in both Germany and the United Kingdom.
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/aggregation?market=GB).
    
-   May 16, 2023
    
    ## Added 2 new connections in Germany[](#added-2-new-connections-in-germany)
    
    New
    
    Connections
    
    Payments
    
    You can now connect to the following banks in Germany.
    
    -   C24
    -   Volkswagen Bank
    
    These connections support both AIS and PIS functionalities.
    
    For more details see our [market capabilities for Germany](https://docs.tink.com/market-capabilities/aggregation?market=DE).
    
-   May 16, 2023
    
    ## Added 41 new business connections in France[](#added-41-new-business-connections-in-france)
    
    New
    
    Connections
    
    You can now connect to 41 new business connections in France.
    
    -   La Banque Postale
    -   Crédit Agricole (and its 40 regional branches)
    
    To leverage these new business connections please contact your Tink representative.
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/aggregation?market=FR).
    
-   May 15, 2023
    
    ## Added analytics download functionality for all products in Console[](#added-analytics-download-functionality-for-all-products-in-console)
    
    Improvement
    
    Console
    
    Console users can now download a CSV file of monthly products metrics.
    
    [Log in to your account](https://console.tink.com/login) to download analytics data.
    
    ![](https://images.ctfassets.net/tmqu5vj33f7w/6EteFXTCQP8UKLmqHcl9xs/6577bdb87296e10d3f650f5f63a4106e/Changelog-downloadcsv.png)
    
-   May 10, 2023
    
    ## Released Tink Link iOS SDK 2.1.0[](#2023-05-10-released-tink-link-ios-sdk-210)
    
    New
    
    SDK iOS
    
-   May 09, 2023
    
    ## Released Money Manager SDK iOS 0.28.0[](#2023-05-09-released-money-manager-sdk-ios-0280)
    
    New
    
    SDK iOS
    
    Money Manager
    
    -   Updated minimum supported version of Xcode to 14.1.
    -   Fixed an issue in actionable insights where `WeeklySummaryExpensesByDay` would sometimes not present the data correctly.
    -   Fixed wrong financial institution logos on the Accounts screen.
    -   Added ability to specify the default icon used as placeholder for the financial institution logos on the Accounts screen by:
    
    ```
    Appearance.provider.icons.defaultAccount = UIImage(named: "bank-icon-placeholder")
    ```
    
    To download the source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/0.28.0).
    
-   May 08, 2023
    
    ## Released Tink Link Android SDK 2.1.0[](#2023-05-08-released-tink-link-android-sdk-210)
    
    New
    
    SDK Android
    
    -   Added an error callback (user\_cancelled) when the user terminates Tink Link with the close button.
    -   Added javadoc and source code for all the public classes and methods.
    -   Added a log message for Tink Link version when the library is initialised.
    
    To download the source code, see the [release notes](https://github.com/tink-ab/tink-link-android/releases/tag/2.1.0).
    
-   May 08, 2023
    
    ## Released Money Manager SDK Android 0.28.0[](#2023-05-08-released-money-manager-sdk-android-0280)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Improved the bar chart UI on the WeeklyExpensesByDay insight.
    
    **Breaking change:**
    
    -   Converted the plural string resource with key `tink_budget_details_chart_status_message_last_year` into a string resource with key `tink_budget_details_chart_status_message`
    
    To download the source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.28.0).
    
-   April 28, 2023
    
    ## Added new data points to Connector API[](#added-new-data-points-to-connector-api)
    
    New
    
    API
    
-   April 26, 2023
    
    ## Revamped Tink Link URL builder in Console[](#revamped-tink-link-url-builder-in-console)
    
    Improvement
    
    Console
    
    Console users will now be guided through an improved process when creating Tink Link URLs for all products.
    
    Create your URL with the upgraded experience in your [account](https://console.tink.com/login).
    
    ![](https://images.ctfassets.net/tmqu5vj33f7w/21uSLnSnrslWWRaufq0WQ8/fb88780fb626fc8173c773fe2c80e965/Changelog_Create_a_url__1_.png)
    
-   April 19, 2023
    
    ## Added Settlements metrics in Console[](#added-settlements-metrics-in-console)
    
    Improvement
    
    Payments
    
    Console
    
    Payments customers with settlement accounts can now access ‘Settled’ and ‘Refunds’ metrics under the analytics section in Console.
    
    [Log in to your account](https://console.tink.com/login) to view the updated analytics.
    
    ![](https://images.ctfassets.net/tmqu5vj33f7w/39YHTklbY1HVXv8cgmI61e/7ba13e742406f277f843a5949396f9a3/Changelog-settlement.png)
    
-   April 18, 2023
    
    ## Enabled all products for testing in Console[](#enabled-all-products-for-testing-in-console)
    
    Improvement
    
    Console
    
    All of Tink’s products are now freely available to test for all Console users. These can be found in your Sandbox environment.
    
    Simply [log in to your account](https://console.tink.com/login) to test the product of your choice.
    
    ![](https://images.ctfassets.net/tmqu5vj33f7w/5cP2mvsr2F8v6ygiaoCeUJ/69bf31c87d1c927165558c98ed25d5cc/Changelog_Sandbox_products.png)
    
-   April 14, 2023
    
    ## Released Tink Link iOS SDK 2.0.1[](#2023-04-14-released-tink-link-ios-sdk-201)
    
    New
    
    SDK iOS
    
    -   Updated minimum supported version of Swift.
    -   Fixed an issue where double completion handler invocation would occur.
    
    To upgrade to the latest version, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/2.0.1).
    
-   April 13, 2023
    
    ## Added payments capability for 9 banks in Poland[](#added-payments-capability-for-9-banks-in-poland)
    
    New
    
    Payments
    
    Connections
    
    You can now initiate payments for the following banks in Poland:
    
    -   Alior Bank
    -   Bank Millenium
    -   Bank Pekao
    -   BNP Paribas
    -   Credit Agricole
    -   ING Bank Śląski
    -   mBank
    -   PKO BP
    -   Santander
    
    For more details see our [market capabilities for payments in Poland](https://docs.tink.com/market-capabilities/payments?market=PL).
    
-   April 13, 2023
    
    ## Added payments capability for Banco Pichincha in Spain[](#added-payments-capability-for-banco-pichincha-in-spain)
    
    New
    
    Payments
    
    Connections
    
-   April 13, 2023
    
    ## Added payments capability for Sparbanken Syd in Sweden[](#added-payments-capability-for-sparbanken-syd-in-sweden)
    
    New
    
    Connections
    
    Payments
    
    You can now initiate payments for the bank Sparbanken Syd in Sweden.
    
    To leverage this new PIS provider, contact your Tink representative.
    
-   April 13, 2023
    
    ## Added 98 new AIS connections in Italy[](#added-98-new-ais-connections-in-italy)
    
    New
    
    Connections
    
    You can now connect to the following banks in Italy:
    
    -   Allianz Bank
    -   Alto Adige Banca – Sudtirol Bank
    -   Banca Capasso Antonio
    -   Banca di Macerata
    -   Banca di Risparmio di Savigliano
    -   Banca Galileo
    -   Banca Popolare del Cassinate
    -   Banca Popolare delle Provincie Molisane
    -   Banca Popolare di Cortona
    -   Banca Popolare di Lajatico
    -   Banca Popolare Vesuviana
    -   Banca Promos
    -   Banca Santa Giulia
    -   Cassa Rurale Alta Vallagarina di Besenello, Calliano, Nomi, Volano BCC
    -   Credito Etneo BCC
    -   Credito Lombardo Veneto
    -   Guber Banca
    -   Hypo Tirol Bank
    -   Mediocredito Trentino Alto Adige
    -   Prader Bank
    -   Solution Bank
    -   Cassa Centrale Banca (incl. subsidiaries)
    
    For more details see our [market capabilities for Italy](https://docs.tink.com/market-capabilities/aggregation?market=IT).
    
-   April 13, 2023
    
    ## Added 4 new AIS connections in Spain[](#added-4-new-ais-connections-in-spain)
    
    New
    
    Connections
    
    You can now connect to the following banks in Spain.
    
    -   Caja Rural
    -   Cetelem
    -   BankinterCard
    -   KutxaBank
    
    For more details see our [market capabilities for Spain](https://docs.tink.com/market-capabilities/aggregation?market=ES).
    
-   April 13, 2023
    
    ## Added new AIS connection to N26 in Finland[](#added-new-ais-connection-to-n26-in-finland)
    
    New
    
    Connections
    
-   April 13, 2023
    
    ## Added 8 new business PIS connections in the United Kingdom[](#added-8-new-business-pis-connections-in-the-united-kingdom)
    
    New
    
    Connections
    
    Payments
    
    You can now connect to 8 new business PIS connections based on single-authorisation in the United Kingdom.
    
    -   Barclays Business
    -   Barclays Corporate
    -   Lloyds Bank Business
    -   NatWest Bankline
    -   Bank of Scotland Commercial
    -   Lloyds Bank Commercial
    -   HSBCnet
    -   Tesco Bank
    
    For more details see our [market capabilities for payments in the UK](https://docs.tink.com/market-capabilities/payments?market=GB).
    
-   April 13, 2023
    
    ## Added 95 new AIS connections in Germany[](#added-95-new-ais-connections-in-germany)
    
    New
    
    Connections
    
-   April 06, 2023
    
    ## Released Money Manager SDK Android 0.27.1[](#2023-04-06-released-money-manager-sdk-android-0271)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Changed the default icon for accounts. The default icon is used as placeholder while fetching the banks icon.
    -   Changed the default icon for ingested accounts.
    -   Added new themes attributes for overriding the default icons for accounts`tink_icon_default_account` and ingested accounts `tink_icon_ingested_account`.
    
    To download the source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.27.1).
    
-   April 03, 2023
    
    ## Added triggerRefresh functionality to Modify Credentials endpoint[](#added-triggerrefresh-functionality-to-modify-credentials-endpoint)
    
    Improvement
    
    API
    
    It is now possible to define if the Credential should be refreshed after being modified. Previously the request triggered a refresh towards the provider by default.
    
    For more details, visit our [documentation](https://docs.tink.com/api#connectivity-v1/credentials/modify-credentials).
    
-   March 30, 2023
    
    ## Added Account Party Roles to Income Check in Console[](#added-account-party-roles-to-income-check-in-console)
    
    Improvement
    
    Income Check
    
    Income Check customers can now view account party roles when creating Income Check reports in the console. This will help you access and validate ownership of the account of the end user.
    
    Note that availability of the role may vary per provider and market.
    
-   March 29, 2023
    
    ## Released Tink Link Android SDK 2.0.0[](#released-tink-link-android-sdk-2-0-0)
    
    New
    
    SDK Android
    
    The Tink Link SDK is now available for Android apps, simplifying authentication processes and enhancing user experiences. This release includes:
    
    -   Removed support for Account Aggregation product
        -   Users of this product are encouraged to migrate to the Transactions product instead, or contact their account manager for more information about products suitable for their needs.
    -   Added full product coverage of Tink’s products:
        -   Account Check
        -   Expense Check
        -   Income Check
        -   Payments
        -   Reports
        -   Risk Insights
        -   Transactions
    -   Improved error handling and error responses
    -   Updated theming and customisation options, now available through Tink Console
    -   Minimum required target API level 23 (Android 6)
    
    For more details, visit the [Tink Link Android GitHub repository](https://github.com/tink-ab/tink-link-android).
    
-   March 29, 2023
    
    ## Released Tink Link iOS SDK 2.0.0[](#2023-03-29-released-tink-link-ios-sdk-200)
    
    New
    
    SDK iOS
    
    The Tink Link SDK is now available for iOS apps, simplifying authentication processes and enhancing user experiences. This release includes:
    
    -   Removed support for the Account Aggregation product
        -   Users of this product are encouraged to migrate to the Transactions product instead, or contact their account manager for more information about products suitable for their needs.
    -   Added full product coverage of Tink’s products:
        -   Account Check
        -   Expense Check
        -   Income Check
        -   Payments
        -   Reports
        -   Risk Insights
        -   Transactions
    -   Improved error handling and error details in responses
    -   Updated theming and customisation options, now available through Tink Console
    -   Minimum required version is iOS 13
    
    For more details, visit the [Tink Link iOS GitHub repository](https://github.com/tink-ab/tink-link-ios).
    
-   March 23, 2023
    
    ## Added new metadata field to payment records[](#added-new-metadata-field-to-payment-records)
    
    New
    
    Payments
    
    API
    
    You can now categorise payments using the new custom metadata field. You can add up to five custom entries to payment requests to help with your reconciliation and reporting. For more information, see [payment request documentation](https://docs.tink.com/api#payment/payment-request/create-payment-request)
    
-   March 17, 2023
    
    ## Added download functionality for payments analytics in Console[](#added-download-functionality-for-payments-analytics-in-console)
    
    Improvement
    
    Console
    
    Payments
    
    You can now download a CSV file of monthly payments transactions for internal reporting.
    
    [Log in to your account](https://console.tink.com/login) to download data from analytics.
    
-   March 09, 2023
    
    ## Released Money Manager SDK Android 0.27.0[](#2023-03-09-released-money-manager-sdk-android-0270)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Improved UI state management
    -   Fixed a crash in WeeklyExpensesByDay inside Insights Bar
    -   Fixed transition glitch when navigating to new screen
    -   Changed the implementation of CustomView, this is a breaking change which requires action if your app is using the CustomViews.
    
    For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.27.0). To download the source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.27.0).
    
-   March 09, 2023
    
    ## Added 5 new business PIS connections in the United Kingdom[](#added-5-new-business-pis-connections-in-the-united-kingdom)
    
    New
    
    Connections
    
    Payments
    
    You can now connect to 5 new business PIS connections based on single-authorisation in the United Kingdom.
    
    -   Bank of Scotland Business
    -   Barclaycard Commercial
    -   HSBC Kinetic
    -   HSBC Net
    -   Ulster Bankline
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/payments?market=GB).
    
-   March 09, 2023
    
    ## Added new AIS connection to N26 in Portugal[](#added-new-ais-connection-to-n26-in-portugal)
    
    New
    
    Connections
    
-   March 08, 2023
    
    ## Added new data points to Transactions product[](#added-new-data-points-to-transactions-product)
    
    New
    
    Transactions
    
    Business Transactions
    
    Transactions and Business Transactions customers can now obtain more detailed insights using the new [Counterparties](https://docs.tink.com/api#data-v2/transaction/list-transactions/response-listtransactionsresponse/counterpartyinformation) and [Detailed](https://docs.tink.com/api#data-v2/transaction/list-transactions/response-listtransactionsresponse/descriptions) data points.
    
    Note that availability of the Counterparties and Detailed descriptions may vary per provider and market (Currently populated primarily in Germany).
    
-   March 06, 2023
    
    ## Added device completion rates to Console analytics[](#added-device-completion-rates-to-console-analytics)
    
    Improvement
    
    Console
    
    You can now view a breakdown of completion rates per device for all products in Console analytics.
    
    [Log in to your account](https://console.tink.com/login) to access the upgraded analytics.
    
    ![](https://images.ctfassets.net/tmqu5vj33f7w/2iSAQV7jduMkCtC76ykC1I/0290f2325052303d57d92bc4d9b6e307/Changelog_Completion_per_device.png)
    
-   March 03, 2023
    
    ## Added account party roles to Income Check product[](#added-account-party-roles-to-income-check-product)
    
    Improvement
    
    Income Check
    
    Income Check customers can now access applicant and corresponding account parties’ [bank account roles](https://docs.tink.com/api#risk/income-check/get-an-income-check/response-incomecheck/user). Accessible in both the payload and Income Check PDFs, this will simplify the handling of joint/shared account flows and determining ownership of the account.
    
    Note that availability of the role may vary per provider and market.
    
-   March 01, 2023
    
    ## Released payment logs in Console[](#released-payment-logs-in-console)
    
    New
    
    Payments
    
    Console
    
    You can now use a new troubleshooting solution to instantly and independently understand the status of all your end user payments directly in Tink Console. Access information such as payment request ID, status description and payer account details via the new payment logs feature.
    
    ![You can now use a new troubleshooting solution to instantly and independently understand the status of all your end user payments directly in Tink Console. Access payments information such as payment request ID, status description and payer account details.](https://images.ctfassets.net/tmqu5vj33f7w/6XRkQW8Zuq77AxGiH2o30D/37c250431aaa4984181d6a8b7dedfb33/Changelog-Paylogs.png)
    
-   February 28, 2023
    
    ## Released Early Redirect for risk decisioning products[](#released-early-redirect-for-risk-decisioning-products)
    
    New
    
    Income Check
    
    Expense Check
    
    Risk Insights
    
    You can now enable Early Redirect for risk decisioning products. Decouple your frontend and backend flows by redirecting users from Tink back to your application right after they’ve authenticated (before the data has finished being fetched and processed), leading to a faster end-user journey.
    
    For more information, read our documentation on [Early Redirect](https://docs.tink.com/resources/income-check/ic-fetch-data-from-several-risk-products-in-one-flow).
    
-   February 28, 2023
    
    ## Deprecated OAuth Refresh Tokens[](#deprecated-oauth-refresh-tokens)
    
    Deprecated
    
    API
    
    The refresh\_token OAuth grant type is deprecated and refresh tokens will no longer be emitted on March 1st, 2023. OAuth clients actively making use of refresh tokens will be unaffected until the End of Life notice is posted, but we encourage to stop using this feature as soon as possible.
    
    For information on the supported grants, see [documentation on OAuth access tokens.](https://docs.tink.com/api#general/oauth/get-access-token)
    
-   February 24, 2023
    
    ## Introduced a new Overview page in Console[](#introduced-a-new-overview-page-in-console)
    
    New
    
    Console
    
    Console users will now land on a new Overview page which highlights the most recent Changelog updates as well as the latest traffic data and key metrics, providing an instant analysis of product performance.
    
    [Log in to your Console account](https://console.tink.com/login) to view the latest update.
    
    ![Console users will now land on a new Overview page.](https://images.ctfassets.net/tmqu5vj33f7w/J0ik6I0Bf7hXAbbtj3Isa/6f4310a78c35eb6208af9f2a13799fcf/Console_overview.png)
    
-   ## Added beta endpoints for Consent and Authorization[](#added-beta-endpoints-for-consent-and-authorization)
    
    New
    
    API
    
    Payments
    
    We have released new endpoints for Consent and Authorization in beta. Currently the APIs are only available for the Variable Recurring Payments product.
    
    For more information, see [documentation on VRPs](https://docs.tink.com/resources/payments#variable-recurring-payments).
    
-   February 24, 2023
    
    ## Added new endpoints for Variable Recurring Payments[](#added-new-endpoints-for-variable-recurring-payments)
    
    New
    
    API
    
    Payments
    
    We have released new endpoints in beta for our upcoming Variable Recurring Payments (VRPs) product. The new endpoints are [v1/mandate-payments](https://docs.tink.com/api#payment/mandate-payment/create-mandate-payment) and [v1/mandate-payments/{id}](https://docs.tink.com/api#payment/mandate-payment/get-mandate-payment) and allow you to create and fetch data relating to a mandate payment respectively.
    
    For more information, visit our documentation on [VRPs](https://docs.tink.com/resources/payments#variable-recurring-payments).
    
-   February 20, 2023
    
    ## Added future-dated payments capabilities for 98 providers in Norway[](#added-future-dated-payments-capabilities-for-98-providers-in-norway)
    
    New
    
    Payments
    
    Connections
    
-   February 20, 2023
    
    ## Added payments capabilities for 2 providers in Spain[](#added-payments-capabilities-for-2-providers-in-spain)
    
    New
    
    Payments
    
    Connections
    
-   February 10, 2023
    
    ## Added payments capability for two providers in Germany[](#added-payments-capability-for-two-providers-in-germany)
    
    New
    
    Payments
    
    Connections
    
-   February 10, 2023
    
    ## Added new connection to Weberbank in Germany[](#added-new-connection-to-weberbank-in-germany)
    
    New
    
    Connections
    
    We have enabled a new AIS connection for Weberbank in Germany.
    
    For more details see our [market capabilities](https://docs.tink.com/market-capabilities/aggregation?market=DE).
    
-   November 30, 2022
    
    ## New error type for provider-consents endpoint[](#new-error-type-for-provider-consents-endpoint)
    
    Business Transactions
    
    Transactions
    
    Connections
    
    Added a new error type - PROVIDER\_ERROR.UNKNOWN\_PROVIDER\_ERROR for when a financial service returns an unknown or unexpected response.
    
    For more information, see [Provider Consent Errors](https://docs.tink.com/resources/transactions/provider-consent-errors).
    
-   November 28, 2022
    
    ## Removed TLSv1.3 support[](#removed-tlsv1-3-support)
    
    API
    
    Due to changes in how the Tink API is exposed, support for TLSv1.3 has been removed.
    
    From now on, the TLS versions and cipher suites currently active by the Tink API on `api.tink.com` are the following:
    
    **TLSv1.2 cipher suites:**
    
    -   TLS\_ECDHE\_RSA\_WITH\_CHACHA20\_POLY1305\_SHA256
    -   TLS\_ECDHE\_RSA\_WITH\_AES\_128\_GCM\_SHA256
    -   TLS\_ECDHE\_RSA\_WITH\_AES\_256\_GCM\_SHA384
    
    Only RSA cipher suites are currently active on the Tink API at `api.tink.com`.
    
-   November 24, 2022
    
    ## Released Tink Link iOS SDK 1.7.1[](#released-tink-link-ios-sdk-1-7-1)
    
    SDK iOS
    
    -   Fixed a crash when redirecting to and returning back from the BankID app.
    -   Fixed wrong error message when no providers were found.
    
-   October 17, 2022
    
    ## Released Money Manager SDK Android 0.26.0[](#2022-10-17-released-money-manager-sdk-android-0260)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Updated period format to show only day and month in all the statistics pie charts.
    
    To download the source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.26.0).
    
-   October 12, 2022
    
    ## Released Tink Link SDK Android 0.16.0[](#2022-10-12-released-tink-link-sdk-android-0160)
    
    New
    
    SDK Android
    
    -   Upgraded jsoup to 1.15.3
    
    To download the source code, see the [release notes](https://github.com/tink-ab/tink-link-android/releases/tag/0.16.0).
    
-   October 04, 2022
    
    ## Released Money Manager SDK iOS 0.27.2[](#released-money-manager-sdk-ios-0-27-2)
    
    Money Manager
    
    SDK iOS
    
    -   Improved and simplified logic of displaying information in Budgets.
    -   Fixed empty state for Accounts Carousel with custom appearance.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/0.27.1).
    
-   September 27, 2022
    
    ## Released Money Manager SDK Android 0.25.0[](#2022-09-27-released-money-manager-sdk-android-0250)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Fixed copy in the budget detail screen
    -   Fixed issue with empty overtime chart
    -   Fixed Overview screen for state retention
    -   Added left-to-spend feature
    -   Added two new types of insights: New Income Transaction and Left to Spend
    
    ```
    val sampleOverviewFeatures =
            OverviewFeatures(
                listOf(
                    OverviewFeature.ActionableInsights,
                    OverviewFeature.Statistics(listOf(StatisticType.EXPENSES, StatisticType.LEFT_TO_SPEND, StatisticType.INCOME)),
                    OverviewFeature.Accounts(),
                    OverviewFeature.LatestTransactions,
                    OverviewFeature.Budgets
                )
            )
    ```
    
    To download the source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.25.0).
    
-   September 27, 2022
    
    ## Changed response when extending provider consents[](#changed-response-when-extending-provider-consents)
    
    Business Transactions
    
    Money Manager
    
    Transactions
    
    The beta endpoint for [extending a provider consent](https://docs.tink.com/api#connectivity/provider-consent/extend-a-consent) now returns a `200` status code and a response body containing the updated provider consents resource, including the new `sessionExpiryDate`. Previously, a `204` status code was returned with no response body.
    
-   September 15, 2022
    
    ## Added remittance information field in the Payments webhooks[](#added-remittance-information-field-in-the-payments-webhooks)
    
    Payments
    
    The Payments webhooks can now return the remittance information field. The field includes the remittance information value that was specified during the creation of a payment request.
    
    For more information, see [Webhooks for Payments](https://docs.tink.com/resources/payments/one-time-payments-notifications-and-webhooks).
    
-   September 06, 2022
    
    ## Released Money Manager SDK iOS 0.27.1[](#released-money-manager-sdk-ios-0-27-1)
    
    Money Manager
    
    SDK iOS
    
    -   Improved user experience and accessibility for the Left To Spend feature.
    -   Added new localized strings `Budget.Detail.Progress.StartsAtDate` and `Budget.Detail.Progress.StartsTomorrow` for describing the date intervals before the budget starts.
    -   Added a new localized string `Overview.Accounts.Title` used as a title for accounts cards sections if the option is chosen to show all accounts: `.accounts(.all, .kind)`.
    -   Improved handling of pending transactions in Budgets.
    -   Fixed a bug where the budget target views size wouldn't update after editing the amount.
    -   Removed the possibility to create budget target amounts with decimals.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/0.27.1).
    
-   September 05, 2022
    
    ## Released Tink Link SDK Android 0.15.4[](#2022-09-05-released-tink-link-sdk-android-0154)
    
    New
    
    SDK Android
    
    -   Improved the UI of the account selection screen: added the access type indication (Open Banking or Other) and the provider icon for each connection in the list.
    
    Updated to [Tink Core version 0.8.6](https://github.com/tink-ab/tink-core-android/releases/tag/0.8.6)
    
    To download the source code, see the [release notes](https://github.com/tink-ab/tink-link-android/releases/tag/0.15.4).
    
-   September 05, 2022
    
    ## Released Money Manager SDK Android 0.24.0[](#2022-09-05-released-money-manager-sdk-android-0240)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Added the transaction-details feature: this feature lets the user display a selected transaction on a separate screen. From this screen, the user can edit and recategorize the transaction.
    -   Added support for all the insights with the "VIEW\_TRANSACTION" action.
    -   Added the "pending" state information to the transactions in the budget screen.
    -   Improved the UI for devices with small screens.
    
    More info regarding the transaction-details feature on [Tink Docs](https://docs.tink.com/resources/pfm-sdk-android/transaction-details-for-android)
    
    Updated to [Tink Core version 0.8.6](https://github.com/tink-ab/tink-core-android/releases/tag/0.8.6)
    
    To download the source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.24.0).
    
-   August 10, 2022
    
    ## Changes to usage of test connections[](#changes-to-usage-of-test-connections)
    
    Connections
    
    Starting Aug 31st, existing Tink apps will not be able to use test providers (e.g Demo Bank), unless a testing-only policy is selected in Console (under "App Settings" > "Policy configuration").
    
    Moreover, apps configured to use a testing policy will not be able to connect to live banks. To do so, please select a different policy for live connections.
    
    Tink recommends that customers create different Tink apps for testing and for production purposes.
    
    Please get in touch with Support or with your Account Manager if you need to extend the deadline of this change for your apps.
    
    Note: this change is already in place for new Tink apps.
    
-   August 09, 2022
    
    ## Released Money Manager SDK Android 0.23.3[](#2022-08-09-released-money-manager-sdk-android-0233)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Fixed a bug regarding wrong remaining days for customised budget period.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.23.3).
    
-   July 18, 2022
    
    ## Removed OPEN\_BANKING limitation on credentials authenticate endpoint[](#removed-open_banking-limitation-on-credentials-authenticate-endpoint)
    
    Transactions
    
    Business Transactions
    
    Connections
    
    [Manual authenticate of credentials](https://docs.tink.com/api#connectivity/credentials/manual-authenticate-of-credentials) is no longer limited to `OPEN_BANKING` access type of providers. From now on this endpoint can be used to trigger full authentication flow for all providers regardless of their access type.  
    Note: The [Modify credentials endpoint](https://docs.tink.com/api#connectivity/credentials/modify-credentials) still has to be called in order to change static fields required by the provider, if any.
    
-   July 07, 2022
    
    ## Released Money Manager SDK Android 0.23.2[](#2022-07-07-released-money-manager-sdk-android-0232)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Fixed a bug where transactions were grouped incorrectly in some cases.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.23.2).
    
-   June 30, 2022
    
    ## Released Money Manager SDK Android 0.23.1[](#2022-06-30-released-money-manager-sdk-android-0231)
    
    New
    
    SDK Android
    
    -   Removed the style for cardView.
        
    -   Fixed a bug that causes a crash while clicking on the "See details" button for a budget insight.
        
    -   Fixed a bug that causes a random crash while accessing the budget detail page.
        
    -   Fixed a bug that caused pending transaction icon to be wrongly displayed.
        
    -   Added the ability to customize the color of the pending transaction clock icon (uses the style attribute: tink\_colorAccent).
        
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/v0.23.1).
    
-   June 20, 2022
    
    ## Released Money Manager SDK iOS 0.27.0[](#released-money-manager-sdk-ios-0-27-0)
    
    Money Manager
    
    SDK iOS
    
    -   Added support for pending transactions.
    -   Implemented additional configuration to disable pending transaction categorization which is enabled by default:
    
    ```
    let viewController = FinanceOverviewViewController(features: features)
    viewController.configuration.editingPendingTransactions = .disabled
    ```
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/0.27.0).
    
-   June 20, 2022
    
    ## Released Money Manager SDK Android 0.23.0[](#2022-06-20-released-money-manager-sdk-android-0230)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Added support for pending transactions;
        
    -   Implemented additional configuration - isEditableOnPendingTransaction to disable pending transaction categorisation which is enabled by default:
        
    
    ```
    FinanceOverviewFragment.newInstance(
                    accessToken = accessToken,
                    styleResId = R.style.TinkStyle_ChewingGum,
                    tracker = LogTracker(),
                    overviewFeatures = getOverviewFeatures(),
                    isEditableOnPendingTransaction = false
                    )
    ```
    
    for customizing corner radius for pending icon, override `tink_pendingTransactionCornerRadius` in your theme file:
    
    ```
    <item name="tink_pendingTransactionCornerRadius">@dimen/tink_pending_transaction_corner_radius</item>
    ```
    
    -   Used correct bank icon in the consent expired insight;
        
    -   Fixed the calculation for the time remaining of a budgets (days instead of months)
        
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.23.0).
    
-   June 16, 2022
    
    ## Released Tink Link SDK Android 0.15.3[](#2022-06-16-released-tink-link-sdk-android-0153)
    
    New
    
    SDK Android
    
    -   Fixed an issue with keyboard suggesting words while entering passwords
    -   Added a message when the search for banks doesn't return any value
    -   Added an error message if TinkLink is launched with an incorrect initial configuration
    -   Logged the version of the SDK (TinkLink and TinkCore) at startup
    
    Updated to [Tink Core version 0.8.4](https://github.com/tink-ab/tink-core-android/releases/tag/0.8.4).
    
-   June 15, 2022
    
    ## Introduced Raw Transactions view in Console[](#introduced-raw-transactions-view-in-console)
    
    New
    
    Income Check
    
    Console
    
    It is now possible to view all incoming transactions found from a bank when creating income check reports in the console. This will help you access & validate income transactions, specially for “No Income” reports.
    
-   June 03, 2022
    
    ## Released Money Manager SDK Android 0.22.0[](#2022-06-03-released-money-manager-sdk-android-0220)
    
    New
    
    SDK Android
    
    Money Manager
    
    -   Made account number selectable in account detail page
    -   Added log for build version of MoneyManager and Core libraries at startup (only debug builds)
    -   Updated the low budget amount copy in the budget detail screen
    -   Updated the empty state copy for the insight page
    -   Updated the budget completed copy in budget detail page
    -   Fixed a bug that cause the app to crash when selecting a custom date in the budget creation flow
    -   Improved UI: all components in the overview page has the correct elevation value
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.22.0).
    
-   May 24, 2022
    
    ## Improved error response in Tink Link[](#2022-05-24-improved-error-response-in-tink-link)
    
    Improvement
    
    Tink Link
    
    The error response from Tink Link now contains more information for you to act on and to help you build better error screens. Besides the existing error response parameters we have now added and/or improved:
    
    -   `message` (improved): A localized end-user facing message that can be directly display to the user
    -   `error_reason` (new): A machine readable error code that describes the exact error that occurred
    -   `error_type` (new): For authentication errors, a machine readable error code that describes the source of the error (eg. user side, bank side, Tink side)
    -   `tracking_id` (new): A unique identifier for the Tink Link session to aid with resolving issues when communicating with Tink's support
    
    This change is backward compatible with existing integrations and can be adopted at any time. For more information, see our [Tink Link errors article](https://docs.tink.com/resources/tink-link-web/tink-link-web-errors), which documents the error response format and the possible error codes you may encounter when using Tink Link.
    
-   May 03, 2022
    
    ## Released Money Manager SDK iOS 0.25.1[](#released-money-manager-sdk-ios-0-25-1)
    
    Money Manager
    
    SDK iOS
    
    -   Updated dependency version.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/0.25.1).
    
-   April 28, 2022
    
    ## Released Tink Link iOS 1.7.0[](#released-tink-link-ios-1-7-0)
    
    SDK iOS
    
    -   Fixed a bug where providers in the provider list were not ordered alphabetically in some markets.
    -   Fixed a bug where the QR-code did not refresh after expiration while scanning with BankID on another device.
    -   Fixed an issues with non-working Cancel button during the authentication process and updated copy for cancellation action sheet.
    -   Improved initialization of Tink Link with an Authorization code.
    -   Updated [API reference](https://tink-ab.github.io/tink-link-ios/tinklinkui/) documentation.
    -   TinkLink Swift Package has been added to the [Swift Package Index](https://swiftpackageindex.com/tink-ab/tink-link-ios).
    -   TinkLinkExample project has been updated to iOS 12.0 minimum deployment target.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/1.7.0). For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-link-ios/blob/master/MIGRATION_GUIDE.md).
    
-   April 27, 2022
    
    ## Released Money Manager SDK Android 0.21.0[](#released-money-manager-sdk-android-0-21-0)
    
    Money Manager
    
    -   Added accounts feature.
    -   Fixed bug with transactions grouped incorrectly.
    
    For more information or to download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.21.0).
    
-   April 25, 2022
    
    ## Returning Account holder name during the PIS flow[](#returning-account-holder-name-during-the-pis-flow)
    
    Payments
    
    Account Check
    
    Added functionality for returning the account holder name during the Payment Initiation flow.
    
    After a successful payment, use the `account_verification_report_id`, that is returned on the `redirect_uri`, to fetch the account holder name.
    
    More information can be found [on our docs](https://docs.tink.com/resources/payments/start-payment#get-the-account-holder-name).
    
-   April 14, 2022
    
    ## Released Tink Link Android 0.15.2[](#released-tink-link-android-0-15-2)
    
    SDK Android
    
    -   Improved reusing of credentials for the authentication flow.
        -   Fixing the issue after failing to authenticate, it wasn't possible to try again.
    -   Fixing how some analytics events are sent:
        -   `AUTHENTICATION_SUCCESS`
        -   `PROVIDER_AUTHENTICATION_INITIALIZED`
        -   `CREDENTIALS_SUBMITTED`
    -   Fixed incorrect translations in credentials screen.
    
    Updated to [Tink Core version 0.8.2](https://github.com/tink-ab/tink-core-android/releases/tag/0.8.2)
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-android/releases/tag/0.15.2).
    
-   March 23, 2022
    
    ## Improved error handling behavior when modifying credentials[](#improved-error-handling-behavior-when-modifying-credentials)
    
    Transactions
    
    Business Transactions
    
    Money Manager
    
    Connections
    
    [Modify credentials](https://docs.tink.com/api#connectivity/credentials/modify-credentials) will now return a `409` status code if the credentials cannot be modified due to another ongoing process.
    
    Previously a `200` status code was returned and the operation failed silently.
    
-   March 21, 2022
    
    ## Changes to filtering of transactions by status[](#changes-to-filtering-of-transactions-by-status)
    
    Transactions
    
    When calling `/data/v2/transactions` with a `statusIn` filter applied, the amount of transactions returned may be fewer than the `pageSize`. This fixes a potential issue where some transactions may not be included across page breaks.
    
    When implementing pagination, please use the `nextPageToken` value in the response body to determine whether another page of transactions exists. If the value is empty, there are no further pages left to fetch.
    
-   March 14, 2022
    
    ## Released Money Manager SDK iOS 0.25.0[](#released-money-manager-sdk-ios-0-25-0)
    
    Money Manager
    
    SDK iOS
    
    -   Added a global constant `TinkMoneyManagerUI.version`, which represents the actual version of the library.
    -   Added a default action to `WEEKLY_UNCATEGORIZED_TRANSACTIONS` that show a list of uncategorized transactions.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/0.25.0).
    
-   March 08, 2022
    
    ## Added support for responsive desktop layout in Tink Link[](#added-support-for-responsive-desktop-layout-in-tink-link)
    
    Tink Link
    
    This improves the Tink Link experience on both desktop and tablet devices, provides a smoother transition when the user moves between your application and the Tink Link journey, and overall improves on accessibility and success rates. The responsive desktop layout is now available for all Tink Link customers.
    
-   March 08, 2022
    
    ## Released Money Manager SDK Android 0.20.1[](#released-money-manager-sdk-android-0-20-1)
    
    Money Manager
    
    SDK Android
    
    -   Fixed a bug in the bar chart of the WEEKLY\_SUMMARY\_EXPENSES\_BY\_DAY insight.
    -   Added support for CREDIT\_CARD\_LIMIT\_CLOSE and CREDIT\_CARD\_LIMIT\_REACHED insights.
    -   Alphabetically sorting to accounts list.
    
    For more information or to download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.20.1).
    
-   February 16, 2022
    
    ## Stricter TLS cipher suite requirements[](#stricter-tls-cipher-suite-requirements)
    
    API
    
    The Tink API has been updated to comply with a stricter TLS security policy that drops support for the following CBC or non-elliptic curve cipher suites in TLSv1.2:
    
    -   TLS\_ECDHE\_ECDSA\_WITH\_AES\_128\_CBC\_SHA
    -   TLS\_ECDHE\_RSA\_WITH\_AES\_128\_CBC\_SHA
    -   TLS\_ECDHE\_ECDSA\_WITH\_AES\_256\_CBC\_SHA
    -   TLS\_ECDHE\_RSA\_WITH\_AES\_256\_CBC\_SHA
    -   TLS\_RSA\_WITH\_AES\_128\_GCM\_SHA256
    -   TLS\_RSA\_WITH\_AES\_256\_GCM\_SHA384
    -   TLS\_RSA\_WITH\_AES\_128\_CBC\_SHA
    -   TLS\_RSA\_WITH\_AES\_256\_CBC\_SHA
    
    From now on, the TLS versions and cipher suites currently active by the Tink API on `api.tink.com` are the following:
    
    **TLSv1.3 cipher suites:**
    
    -   TLS\_AES\_128\_GCM\_SHA256
    -   TLS\_AES\_256\_GCM\_SHA384
    -   TLS\_CHACHA20\_POLY1305\_SHA256
    
    **TLSv1.2 cipher suites:**
    
    -   TLS\_ECDHE\_RSA\_WITH\_CHACHA20\_POLY1305\_SHA256
    -   TLS\_ECDHE\_RSA\_WITH\_AES\_128\_GCM\_SHA256
    -   TLS\_ECDHE\_RSA\_WITH\_AES\_256\_GCM\_SHA384
    
    Note that the Tink API on `api.tink.com` currently presents an RSA server certificate, but Tink reserves the option to at a later point instead present an ECDSA server certificate. When presenting an ECDSA certificate, it means that alternate TLSv1.2 ECDSA cipher suites would be active instead, so we advice you to support at least one of these cipher suites as well:
    
    -   TLS\_ECDHE\_ECDSA\_WITH\_CHACHA20\_POLY1305\_SHA256
    -   TLS\_ECDHE\_ECDSA\_WITH\_AES\_128\_GCM\_SHA256
    -   TLS\_ECDHE\_ECDSA\_WITH\_AES\_256\_GCM\_SHA384
    
    This change should be transparent to you if you're using up-to-date software.
    
    **Update**
    
    This changelog entry was updated to clarify that only RSA cipher suites are currently active on the Tink API at `api.tink.com`.
    
-   February 14, 2022
    
    ## Released Money Manager SDK Android 0.20.0[](#released-money-manager-sdk-android-0-20-0)
    
    Money Manager
    
    SDK Android
    
    -   `TinkFinanceOverviewStyle` now inherits from `Theme.MaterialComponents.DayNight` and thus enables dark mode as normal by having resource folders with the `-night` suffix.
    -   Fixed a bug that could happen in edge cases when a user had no transactions for the current month.
    
    To download source code, see the [release notes.](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.20.0)
    
-   February 10, 2022
    
    ## Released Tink Link iOS 1.6.0[](#released-tink-link-ios-1-6-0)
    
    SDK iOS
    
    -   Added a global constant `TinkLink.version`, which represents the actual version of the library.
    -   Improved handling of awaiting third party authentication with no supplemental information.
    -   Fixed conflicting constraints across the library.
    -   Removed PIS and Headless Examples.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/1.6.0). For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-link-ios/blob/master/MIGRATION_GUIDE.md).
    
-   January 21, 2022
    
    ## Released Tink Link Android 0.15.0[](#released-tink-link-android-0-15-0)
    
    SDK Android
    
    **Breaking change:**
    
    -   Tink.init now throws an exception if called more than once, we recommend initialising it in your application class.
    
    **Other changes:**
    
    -   Started broadcasting credentials after creation.
    -   Changed search in providers list to align with the behaviour in iOS SDK.
    -   Added clarification text in the credentials view when user will be redirected.
    -   Updated to [Tink Core version 0.7.0](https://github.com/tink-ab/tink-core-android/releases/tag/0.7.0)
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-android/releases/tag/0.15.0).
    
-   January 20, 2022
    
    ## Released Money Manager SDK Android 0.19.0[](#released-money-manager-sdk-android-0-19-0)
    
    Money Manager
    
    SDK Android
    
    **Breaking change:**
    
    -   Tink.init now throws an exception if called more than once, we recommend initialising it in your application class.
    
    **Other changes:**
    
    -   Added support for AGGREGATION\_REFRESH\_PSD2\_CREDENTIAL insight.
    -   Added Error states to overview page.
    -   Fixed bug with transaction list header overlapping with list.
    -   Minor bug fixes.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.19.0).
    
-   January 19, 2022
    
    ## Released Money Manager SDK iOS 0.24.0[](#released-money-manager-sdk-ios-0-24-0)
    
    Money Manager
    
    SDK iOS
    
    -   Fixed an issue where the average line in Budgets Overtime was off.
    -   Fixed a bug where the budget amount did not update when a associated transaction was recategorised.
    -   Fixed wrong period formatting in pie charts.
    -   Fixed the wrong insights and archived events background colors.
    -   Fixed an issue where budget cards in the Finance Overview did not relayout after orientation change.
    -   Fixed a bug where the empty background in insights did not scroll properly.
    -   Added handling for return keyboard buttons.
    -   Updated so the current statistics period shows "Today".
    -   Updated budget copy when there is 0 left.
    -   Removed the 3 character limitation from weekly budgets period label.
    -   Deprecated custom illustrations for actionable insights. It is no longer possible to add a custom empty view to the actionable insights view controller.
    -   Deprecated shouldShowCurrencySymbolInStatisticsTotal. Currency symbols will now always show in statistics pie charts.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/0.24.0).
    
-   January 18, 2022
    
    ## Released Tink Link iOS 1.5.0[](#released-tink-link-ios-1-5-0)
    
    SDK iOS
    
    -   Improved the empty state in providers list.
    -   Improved descriptions of data points that will be collected.
    -   Disabled providers are hidden in the provider list.
    -   Added an event that exposes the Credentials.ID when the credentials is created. This event can be observed now with the NotificationCenter, see [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/1.5.0) for usage example with code.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/1.5.0). For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-link-ios/blob/master/MIGRATION_GUIDE.md).
    
-   January 18, 2022
    
    ## PIS analytics in Console[](#pis-analytics-in-console)
    
    Payments
    
    Console
    
    We’re launching Payment analytics tools inside the Tink Console to give our customers a granular, near real-time view on performance. Track and benchmark your completion rate over time, break it out per bank, understand where in the flow users are dropping off and see the payment errors behind why a payment might fail or became incomplete.
    
-   January 10, 2022
    
    ## New Transaction Date Time field introduced[](#new-transaction-date-time-field-introduced)
    
    Transactions
    
    Business Transactions
    
    The Transactions API now exposes a new `transactionDateTime` field, representing when the transaction event was first initiated: for example when a payment card was authorized at the point of sale (before it was booked), or when a money transfer was first initiated (before it was executed).
    
    This field is subject to per-market and per-bank availability.
    
-   December 16, 2021
    
    ## New feature: Income Check analytics in Tink Console[](#new-feature-income-check-analytics-in-tink-console)
    
    Income Check
    
    Console
    
    We’ve launched powerful analytics tools for Income Check in Tink Console to provide customers with a granular and almost real-time performance view. Track and benchmark your completion rate over time, break it out per bank and understand where in a flow that users drop off.
    
-   December 14, 2021
    
    ## Rate-limiting removed[](#rate-limiting-removed)
    
    Transactions
    
    Aggregation
    
    Rate limiting for credential refresh and authentication operations has been removed. We recommend that customers implement cool-downs for these operations on their end, to prevent the consent from being needlessly invalidated by the financial institution due to excessive refresh requests.
    
-   December 08, 2021
    
    ## Released Money Manager SDK iOS 0.23.0[](#released-money-manager-sdk-ios-0-23-0)
    
    Money Manager
    
    SDK iOS
    
    -   Added color customization for the Accounts, Actionable Insights and Statistics features. You can now use different colors in different features of the Money Manager SDK.
    -   Updated copy for Budgets.
    -   Updated the appearance of decimals across the SDK.
    -   Fixed an issue where there was an extra month in the future in Statistics.
    -   Fixed an issue where the insights banner would show the wrong number of insights in some edge cases in the Financial Overview screen.
    
-   November 11, 2021
    
    ## Released Money Manager SDK Android 0.16.0[](#released-money-manager-sdk-android-0-16-0)
    
    Money Manager
    
    SDK iOS
    
    -   You can now have a separate theme for the budgets feature. This theme will be used in all screens opened from the budget flow. To set this use the `featureSpecificThemes` parameter when creating your `FinanceOverviewFragment`.
    -   Colors for charts in budgets has been updated to be consistent with iOS. This alignment means that the colors used in graphs are now `tink_expensesColor`, `tink_expensesLightColor` and `tink_warningColor`. Please review your charts in budgets and if necessary change your colors by setting a color specific theme for budgets.
    
    For more information or to download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.16.0).
    
-   November 11, 2021
    
    ## New feature - Analytics inside the Tink Console[](#new-analytics-inside-the-tink-console)
    
    Account Check
    
    Console
    
    We’re launching powerful analytics tools inside the Tink Console to give our customers a granular, near real-time view on performance. Track and benchmark your completion rate over time, break it out per bank or understand where in the flow users are dropping off. Currently available for Account Check and rolling out to all products soon.
    
-   November 10, 2021
    
    ## Released Money Manager SDK iOS 0.22.0[](#released-money-manager-sdk-ios-0-22-0)
    
    Money Manager
    
    SDK iOS
    
    -   Added color customization for the Budgets feature. You can now use different colors in budgets and the rest of the SDK.
    -   Added `BudgetsViewController` that can be used to display a list of budgets.
    -   Added default handling to actionable insights using `VIEW_TRANSACTIONS` and `VIEW_TRANSACTIONS_BY_CATEGORY` actions.
    -   Fixed a bug in statistics where months with no transactions didn't show up.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/0.22.0).
    
-   November 04, 2021
    
    ## Released Tink Link iOS 1.4.1[](#released-tink-link-ios-1-4-1)
    
    SDK iOS
    
-   October 29, 2021
    
    ## Introduced configuration options in order to prevent your users from reusing Tink Link[](#introduced-configuration-options-in-order-to-prevent-your-users-from-reusing-tink-link)
    
    Payments
    
    Now you can configure Tink Link to prevent your users from reusing Tink Link. For more details please read [this](https://docs.tink.com/resources/payments/preventing-your-users-from-reusing-tink-link) guide.
    
-   October 21, 2021
    
    ## Introduction of Faster Payments payment scheme[](#introduction-of-faster-payments-payment-scheme)
    
    Payments
    
    Added support for **FASTER\_PAYMENTS** `paymentScheme` in the UK.
    
    A payment with **FASTER\_PAYMENTS** scheme can be [initiated](https://docs.tink.com/api#payment/payment-request/create-payment-request) by specifying **FASTER\_PAYMENTS** in the `paymentScheme` field.
    
-   September 29, 2021
    
    ## Released Money Manager SDK iOS 0.21.1[](#released-money-manager-sdk-ios-0-21-1)
    
    Money Manager
    
    SDK iOS
    
    -   Fixed a bug when using Swift Package Manager.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/0.21.1).
    
-   September 29, 2021
    
    ## Released Money Manager SDK iOS 0.21.0[](#released-money-manager-sdk-ios-0-21-0)
    
    Money Manager
    
    SDK iOS
    
    -   Updated the budget over time chart labels to only show the first 3 characters for a month to prevent overlap in some locales.
    -   Changed ordering of accounts in overview to match when they were first seen.
    -   Removed the daily summary in Transactions list.
    -   Fixed a bug where budgets with large amounts were shown incorrectly.
    -   Fixed a bug where an account could be saved with an empty name.
    -   Fixed a bug where the budget transactions list header was not updating correctly.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/0.21.0).
    
-   September 29, 2021
    
    ## Released Money Manager SDK Android 0.15.4[](#released-money-manager-sdk-android-0-15-4)
    
    Money Manager
    
    SDK Android
    
    -   Added possibility to show a toolbar for the overview, see [documentation](https://docs.tink.com/resources/pfm-sdk-android/pfm-sdk-android-finance-overview#displaying-the-finance-overview).
    -   Added a callback to listen to back press events, see [documentation](https://docs.tink.com/resources/pfm-sdk-android/pfm-sdk-android-finance-overview#displaying-the-finance-overview).
    -   Aligned date formatting to be consistent with Money Manager SDK iOS.
    -   Only show first 3 characters of month's name in bar graphs to prevent overlap for some locales.
    -   When starting up Money Manager, the expenses statistics are displayed by default. Previously, the last user selected statistics were displayed. This aligns the behaviour with Money Manager SDK iOS.
    -   When picking the dates for a custom budget, you can no longer pick a start date after the end date or vice versa.
    -   Empty state for insights is no longer displayed behind the list of insights and is only shown when there are no insights.
    -   Don't crop text of buttons for locales which require longer text labels.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-android/releases/tag/0.15.4).
    
-   September 29, 2021
    
    ## Released Tink Link iOS 1.4.0[](#released-tink-link-ios-1-4-0)
    
    SDK iOS
    
    -   Fixed a problem when using the refresh or authenticate operation that caused the user to not always be properly redirected back to Tink Link after authenticating.
    -   Empty providers list will now display a message if no providers were found instead of throwing an error.
    -   Removed Beta tag from beta providers.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/1.4.0). For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-link-ios/blob/master/MIGRATION_GUIDE.md).
    
-   September 10, 2021
    
    ## Added transaction timestamps with coverage for UK[](#added-transaction-timestamps-with-coverage-for-uk)
    
    Transactions
    
    Transaction timestamp support has been added to the [/data/v2/transaction](https://docs.tink.com/api#data-v2/transaction) resource in the form of two new optional fields: `bookedDateTime` and `valueDateTime`.
    
    _This feature is currently in beta and only available for UK providers that provide detailed timestamp information._
    
-   August 16, 2021
    
    ## Released Tink Link iOS 1.3.1[](#released-tink-link-ios-1-3-1)
    
    Transactions
    
    SDK iOS
    
    -   Fixed the bug where tapping back when updating credentials leads to a loading screen that cannot be dismissed.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/1.3.1). For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-link-ios/blob/master/README.md).
    
-   August 09, 2021
    
    ## Released Tink Money Manager iOS SDK 0.20.0[](#released-tink-money-manager-ios-sdk-0-20-0)
    
    Money Manager
    
    SDK iOS
    
    -   Added the option to configure the ingested account icon.
    -   Added the accounts grouping option on the finance overview.
    -   Updated the budget details overview description text.
    -   Improved the support for iPad and relayout the view if needed when orientation changes.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/0.20.0).
    
-   August 05, 2021
    
    ## Released Tink Link iOS 1.3.0[](#released-tink-link-ios-1-3-0)
    
    Transactions
    
    SDK iOS
    
    -   Added support for fetching providers by market in TinkLink `ProviderContext`.
        
        ```
        providerContext.fetchProviders(for: market, filter: filter) {  result in
            // Handle result
        }
        ```
        
    -   Added support for adding credentials from different markets for permanent user in TinkLinkUI `TinkLinkViewController`. If no market is specified, the permanent user's market will be used.
        
        ```
        let tinkLinkViewController = TinkLinkViewController(market: Market("GB"), operation: .create(providerPredicate: .kinds(.all))) { result in
            // Handle result
        }
        present(tinkLinkViewController, animated: true)
        ```
        
    -   Added the contribution template.
    -   Updated the unit test for adding credentials.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/1.3.0). For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-link-ios/blob/master/README.md).
    
-   July 13, 2021
    
    ## Released Tink Money Manager iOS SDK 0.19.0[](#released-tink-money-manager-ios-sdk-0-19-0)
    
    Money Manager
    
    SDK iOS
    
    -   Improved support for landscape mode and orientation changes
    -   Added support for iPad
    -   Bug fixes
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-money-manager-ios/releases/tag/0.19.0).
    
-   July 02, 2021
    
    ## Updated API reference structure to reflect resource types[](#updated-api-reference-structure-to-reflect-resource-types)
    
    Documentation
    
    The Tink API reference has been restructured to make it easier to navigate and find relevant endpoints. Rather than list every single endpoint in the left navigation, we have grouped them into broader resource types:
    
    -   **Connectivity**: Resources related to user consent and connecting to financial institutions, such as Credentials and Provider Consent.
    -   **Data**: Resources related to organizing, storing and retrieving data related to an end user, such as Account and Identity
    -   **Events**: Resources related to webhooks
    -   **Finance Management**: Resources related to helping end users manage their finances, such as Budget and Savings Goals
    -   **Payment**: Resources related to making payments from an end user's account
    -   **Risk**: Resources related to providing insights about credit and fraud risk
    -   **General**: Resources related to general concepts such as Oauth and Users
    
    Please note that some resources, such as Data and Events, have multiple versions while we transition to a new version.
    
-   June 18, 2021
    
    ## Introduction of weekly recurring payments[](#introducton-of-weekly-recurring-payments)
    
    Payments
    
    Added support for **weekly** recurring payments.
    
    A weekly recurring payment can be [created](https://docs.tink.com/api#recurring-payment/create-recurring-payment) by specifying **WEEKLY** for `frequency` and providing a `dayOfWeek`.
    
-   June 17, 2021
    
    ## Released Tink Link iOS 1.2.0[](#released-tink-link-ios-1-2-0)
    
    Transactions
    
    SDK iOS
    
    -   Improved the accessibility support.
        -   Added VoiceOver support to make TinkLink more accessible to users.
        -   Support dynamic type to scaling fonts automatically.
        -   Updated the layout to better support iPhone landscape usage.
        -   Updated the layout to better support iPad usage.
    -   Updated the QR code color to use `Color.label`.
    -   Updated the sorting order of the providers with different login type.
    -   Updated the business Provider icon.
    -   Updated to always show Tink logos when aggregate account with Tink license.
    -   Improved the error handling in case when trying to use permanent user feature without user session is set #40.
    -   Fixed the cancel button not responsive issue mentioned in #40.
    -   Removed the Kingfisher dependency.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/1.2.0). For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-link-ios/blob/master/README.md).
    
-   June 08, 2021
    
    ## Money Manager SDK for iOS 0.18.0[](#money-manager-sdk-for-ios-0-18-0)
    
    Money Manager
    
    SDK iOS
    
    -   Updated the budget model to include `created` date to indicate when the budget was created.
    -   Update the budget overtime screen to only mark the budget progress after the period that the budget was created.
    -   Improved the accessibility, the SDK now better supports dynamic font types.
    -   Renamed the examples app to [samples app](https://github.com/tink-ab/tink-money-manager-ios/tree/master/Samples).
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-pfm-ios/releases/tag/0.18.0).
    
-   May 07, 2021
    
    ## Added new webhook v2 endpoint to support subscription of events on client scope[](#added-a-new-webhook-v2-endpoint-to-support-subscription-of-events)
    
    Aggregation
    
-   April 15, 2021
    
    ## Released Tink Money Manager iOS SDK 0.17.0[](#released-tink-money-manager-ios-sdk-0-17-0)
    
    Money Manager
    
    SDK iOS
    
    -   Added a new improving categorization level feature. Read more about it [here](https://docs.tink.com/resources/pfm-sdk-ios/categorization#improve-the-categorization-level).
        -   Added the `improveCategorizationLevel` feature on the finance overview.
            -   Support using `predicate` on `improveCategorizationLevel` feature to control visibility on finance overview.
        -   Support using `improveCategorizationLevelViewController` directly with transactionIDs or transactions to improve categorization.
            -   Added a `fetchTransactionsToImproveCategorization` function in `Tink` instance for fetching transactions to improve categories.
    -   Added source and destination account number to initiate transfer actionable insight delegate.
    -   Added support for new actionable insight type `SPENDING_BY_PRIMARY_CATEGORY_INCREASED`.
    -   Fixed insights counting issue on finance overview.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-pfm-ios/releases/tag/0.17.0).
    
-   April 12, 2021
    
    ## Released Tink PFM Android SDK 0.13.0[](#released-tink-pfm-android-sdk-0-13-0)
    
    Money Manager
    
    SDK Android
    
    Fixes and improvements included in this release are as follows:
    
    -   Default budget icon is now displayed correctly for budgets created from a keyword (currently only possible to create from iOS)
    -   Amounts for budgets are no longer rounded off to the nearest integer
    -   The following 2 strings in budgets have been converted to support plurals: `tink_budget_details_chart_status_message_last_year` & `tink_budget_details_chart_status_message_since`. The ids are still the same but now they differentiate between one and several, see the updated string customization guide - [https://github.com/tink-ab/tink-money-manager-android/blob/master/string-customization-guide.md](https://github.com/tink-ab/tink-money-manager-android/blob/master/string-customization-guide.md)
    -   Dependencies have been updated, unused dependencies have been removed resulting in a smaller, more up to date SDK
    
    For download the SDK, see the [release](https://github.com/tink-ab/tink-pfm-android/releases/tag/0.13.0).
    
-   April 09, 2021
    
    ## Support for single sign-on via SAML[](#support-for-single-sign-on-via-saml)
    
    Console
    
    [Tink Console](https://console.tink.com/) now supports SSO (single sign-on) via SAML. This allows users in your organisation to sign in to Console with your own identity provider (IdP) of choice. The new feature can be found under **Organisation => Settings**. For detailed instructions, go ahead and read our [SAML guide](https://docs.tink.com/resources/console/single-sign-on-via-saml).
    
-   April 06, 2021
    
    ## Added payments coverage to the connection capabilities page in our documentation[](#added-payments-coverage-to-the-connection-capabilities-page)
    
    Payments
    
    Documentation
    
    We’ve added support for payments on the connection capabilities page. You can now see up-to-date information about which countries we’re live in, the financial institutions Tink connects to, which payment schemes we support (SEPA Credit Transfer, SEPA Instant, UK Faster Payments, local schemes, etc., and support for additional functionality such as future-dated and recurring payments). Check it out [here](https://docs.tink.com/market-capabilities/payments).
    
-   March 31, 2021
    
    ## Released view-once secrets in Console[](#released-view-once-secrets-in-console)
    
    Console
    
    A new view-once secrets feature has been released to Console. This means that you won’t be able to reveal old secrets for your apps anymore. The new feature allows you to create multiple secrets and view them once, right after creation. You’re allowed to have a maximum of five secrets at once and can revoke a secret at any time. Check out the new feature in Console under **App settings**.
    
-   March 30, 2021
    
    ## Added new guides on customising the payments flow[](#added-new-guides-on-customising-the-payments-flow)
    
    Payments
    
    Documentation
    
    Published a series of [guides](https://docs.tink.com/resources/payments/payment-initiation-flow-optimisation-overview) on how to customise the payments flow to improve the user experience. This includes how to change colours and fonts, plus configure settings like source account preselection and desktop to mobile handoff.
    
-   March 23, 2021
    
    ## Released Tink PFM Android SDK 0.12.0[](#released-tink-pfm-android-0-12-0)
    
    Money Manager
    
    SDK Android
    
    With this release, we have renamed the SDK to Tink Money Manager. The SDK dependency is now renamed to `com.tink.moneymanager:moneymanager-ui`. Please check the [updated README](https://github.com/tink-ab/tink-money-manager-android/blob/master/README.md) for more information on adding the dependency to your project. This may break some of the existing imports of classes from the SDK in your project as the `pfmui` module is now renamed to `moneymanagerui`. Please also check [the updated sample](https://github.com/tink-ab/tink-money-manager-android/blob/master/app/src/main/java/se/tink/android/tink_pfm_sdk_android/MainActivity.kt) for an example of how these updated imports look like.
    
    Other fixes and improvements included in this release are as follows:
    
    -   Updated to use [Tink Core 0.6.3](https://github.com/tink-ab/tink-core-android/releases/tag/0.6.3).
    -   Fixed the issue where the latest transactions were not loading in the overview screen.
    -   Added timeout to the statistics loading state in the overview.
    -   Improvements to the transactions fetching logic.
    -   Moved skip button to bottom in the similar transactions screen.
    -   Separated string resources for latest transactions overview card title and the toolbar title so that they are independently customizable.
    -   Added a separate string resource for the action button in the budget category selection screen.
    -   Used separate string keys for budget edit text so that they are independently customizable.
    -   Use separate string keys for the amount left text for different periods in budget details.
    -   Removed unused string resource keys.
    
    For the string related updates and changes, it is also recommended to take a look at the [updated string customization guide](https://github.com/tink-ab/tink-money-manager-android/blob/master/string-customization-guide.md).
    
    For download the SDK, see the [release](https://github.com/tink-ab/tink-pfm-android/releases/tag/0.12.0).
    
-   March 16, 2021
    
    ## Added list of provider consents for Transactions[](#provider-consents-endpoint)
    
    Aggregation
    
    It is now possible to get a list of the consents that a user has for each provider, the associated `credentialsId`, the consent `sessionExpiryTime`, the consent `status` and the `accountIds` for all accounts that data is available for. For more information, see the [provider consents API documentation](https://docs.tink.com/api#connectivity/provider-consent)  
    _This feature is currently only supported for the Transactions product._
    
    Note: [Link](https://docs.tink.com/api#connectivity/provider-consent) to the API docs.
    
-   March 12, 2021
    
    ## Released Tink Money Manager iOS SDK 0.16.0[](#released-tink-money-manager-ios-sdk-0-16-0)
    
    Money Manager
    
    SDK iOS
    
    -   Added more features to accounts.
        -   Updated the Finance Overview to filter what to display in the account lists. By default, only favorite accounts are shown. Added a “see all” cell at end of the list to show all accounts.
        -   Added the `AccountsViewController` entry point that can be used to show the accounts list directly.
        -   Added the `EditAccountViewController` entry point to let users edit their account's name, type, favorite status, shared status or exclude the account from the statistics.
    -   Added a configuration option to the `BudgetDetailsViewController` to change the transaction action.
    -   Added a new localized string `Budget.Generic.SelectCategory` for create budgets category selecting button. 
    -   Added the support for new actionable insight type `BUDGET_SUGGEST_CREATE_TOP_PRIMARY_CATEGORY`.
    -   Renamed `TransactionEditViewController` to `EditTransactionViewController`.
    -   Fixed an issue where archived actionable insights didn't display an icon for some budget insights.
    -   Fixed the statistics overtime period filter to show corresponding period data.
    -   Fixed the floating button animation not triggered after edit budget category.
    -   Fixed the currency and placeholder text overlapping on edit budget view.
    -   Resolved an issue where the error alert is being presented by the view controller that not on the window.
    
    For a migration guide and to download source code, see the [release notes](https://github.com/tink-ab/tink-pfm-ios/releases/tag/0.16.0).
    
-   March 11, 2021
    
    ## Deprecation of AuthenticationUserType field on the Provider Model[](#deprecation-of-authenticationusertype-field-on-the-provider-model)
    
    Aggregation
    
    [Provider’s](https://docs.tink.com/api#connectivity/provider/the-provider-model) `AuthenticationUserType` field has been deprecated.  
    Information about which segments (PERSONAL, BUSINESS) a provider covers can be derived from [`financialServices`](https://docs.tink.com/api#connectivity/provider/the-provider-model/financialservice)
    
-   March 04, 2021
    
    ## Released Tink Money Manager iOS SDK 0.15.0[](#released-tink-pfm-ios-sdk-0-15-0)
    
    Money Manager
    
    SDK iOS
    
    -   The SDK has been renamed to Money Manager.
    -   The localized string for overspent budgets now include the budget target amount. Update the `Budget.Progress.Over` string to include a second parameter to display the target amount. For example: `"%@ over budget of %@"` for an English translation.
    -   Fixed date formatting on weekly budget's overtime view.
    -   Updated default icon used for `BUDGET_SUGGEST_CREATE_FIRST` insight.
    -   Changed to use `button` instead of `accent` as the background color for the actionable insights card on the finance overview.
    
    For a migration guide and to download source code, see the [release notes](https://github.com/tink-ab/tink-pfm-ios/releases/tag/0.15.0).
    
-   February 26, 2021
    
    ## Released Tink Link Android 0.14.6[](#released-tink-link-android-0-14-6)
    
    Money Manager
    
    -   Updated to use [Tink Core 0.6.1](https://github.com/tink-ab/tink-core-android/releases/tag/0.6.1).
    -   Added [TinkLinkError](https://github.com/tink-ab/tink-link-android/blob/master/docs/com.tink.link.ui/-tink-link-error/index.md) class. For a `RESULT_FAILURE` result, a TinkLinkError is returned as data bundled with the key `ERROR_DATA`. If Tink Link UI failed to add one or more credentials, then a [FailedToAddCredentials](https://github.com/tink-ab/tink-link-android/blob/master/docs/com.tink.link.ui/-tink-link-error/-failed-to-add-credentials/index.md#failedtoaddcredentials) type of TinkLinkError is returned.
    -   In general, if there are credentials that could not be added as part of the Tink Link UI flow, a bundle of those failed credentials ids to errors will be always returned as data bundled with the key `FAILED_CREDENTIALS_DATA`. [Please see the sample](https://github.com/tink-ab/tink-link-android/blob/master/sample-link-ui/src/main/java/com/tink/sample/MainLinkUiActivity.kt) for an example of how you can use [the error](https://github.com/tink-ab/tink-link-android/blob/e5972298827652ac552eac01b5e558a1ba6aabd1/sample-link-ui/src/main/java/com/tink/sample/MainLinkUiActivity.kt#L104) or [the bundle property](https://github.com/tink-ab/tink-link-android/blob/e5972298827652ac552eac01b5e558a1ba6aabd1/sample-link-ui/src/main/java/com/tink/sample/MainLinkUiActivity.kt#L119) to delete any credentials that failed to be added by the `TinkLinkUiActivity`.
    
    For more information, see the [release notes](https://github.com/tink-ab/tink-link-android/releases/tag/0.14.6).
    
-   February 19, 2021
    
    ## Released Tink PFM Android SDK 0.11.0[](#released-tink-pfm-android-sdk-0-11-0)
    
    Money Manager
    
    SDK Android
    
    #### Features
    
    -   Added new Budgets feature. Please look at the updated [finance overview display options guide](https://docs.tink.com/resources/pfm-sdk-android/pfm-sdk-android-finance-overview#displaying-the-finance-overview) to add Budgets to the finance overview UI. It is also recommended to look at the updated list of strings in the [strings customization guide](https://github.com/tink-ab/tink-pfm-android/blob/master/string-customization-guide.md) for customization and adding translations for the newly added strings.
    -   Updates to Actionable Insights feature to support new insights and insight actions related to budgets.
    
    #### Dependencies
    
    -   Updated to use [Tink Core 0.6.1](https://github.com/tink-ab/tink-core-android/releases/tag/0.6.1) for budgets related models and services.
    -   Updated Kotlin version to 1.4.21.
    -   Replaced guava dependency with guava for android dependency (`30.1-android`). Also added guava as an api dependency to resolve build conflicts.
    
    #### Fixes and improvements
    
    -   Changed Select/Unselect All menu option to an overflow menu item in the Similar Transactions screen.
    -   Added empty state to overview pie chart to handle periods with zero statistics.
    -   UI fixes to charts shown in the Statistics screens. Also updated text size and styling for pie charts.
    -   Fixed an issue in the category selection flow where clicking on the checkbox would consume the click and mark the checkbox but not actually trigger the appropriate selection as intended.
    
    For download the SDK, see the [release](https://github.com/tink-ab/tink-pfm-android/releases/tag/0.11.0).
    
-   February 19, 2021
    
    ## Added v2 beta endpoints for listing accounts and transactions[](#added-v2-beta-endpoints-for-listing-accounts-and-transactions)
    
    Aggregation
    
    You can now preview upcoming improvements in the data models and resource endpoints for `accounts` and `transactions`. These endpoints are part of our upcoming Transactions product and are now available for you to try out as beta endpoints.
    
    Two new endpoints are available: [/v2/transactions](https://docs.tink.com/api#transaction-v2-list-transactions) and [/v2/accounts](https://docs.tink.com/api#account-v2-list-accounts). These endpoints are compatible with the current generation of Account Aggregation features and you can test them out by using them instead of the following endpoints:
    
    -   [/api/v1/accounts/list](https://docs.tink.com/api#account-list-accounts)
    -   [/api/v1/accounts/{id}/balances](https://docs.tink.com/api#account-get-balances-for-account)
    -   [/api/v1/search](https://docs.tink.com/api#search-query-transactions)
    
-   February 10, 2021
    
    ## Released Tink Link iOS 0.18.1[](#released-tink-link-ios-0-18-1)
    
    SDK iOS
    
    -   Added the manual integration instructions.
    -   Improved translations.
    -   Added more detailed instructions on the redirect screen for providers that need to redirect to a third-party app.
    -   Updated the credentials field validation error text color.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/0.18.1). For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-link-ios/blob/master/README.md).
    
-   February 10, 2021
    
    ## Introducing \`financialServices\` in Providers[](#introducing-financialservices-in-providers)
    
    Aggregation
    
    Added a new field called `financialServices` in the [provider model](https://docs.tink.com/api/#provider).
    
    This field provides information about which Financial Services are being covered by the provider.
    
-   January 28, 2021
    
    ## Released Tink PFM iOS SDK 0.14.0[](#released-tink-pfm-ios-sdk-0-14-0)
    
    Money Manager
    
    SDK iOS
    
    -   Added new Statistics feature, Left to Spend
        -   With Left to Spend users can see a combined statistics of their income and expenses to get an idea about how much they have left to spend for the current period and also compared to previous months. Read more about Left to Spend: [https://docs.tink.com/resources/pfm-sdk-ios/statistics#displaying-statistics](https://docs.tink.com/resources/pfm-sdk-ios/statistics#displaying-statistics)
    -   Adjusted capitalization of dates
    -   Added requirements section to README
    -   Provided `.strings` files of localizable strings that can be used with translation services
    -   Fixed: Can't use create budget view controller without using another view controller that triggered load of categories first
    -   Fixed: Can't use category statistics view controller with bar chart style without using another view controller that triggered load of categories first
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-pfm-ios/releases/tag/0.14.0).
    
-   January 15, 2021
    
    ## Released Tink PFM iOS SDK 0.13.1[](#released-tink-pfm-ios-sdk-0-13-1)
    
    Money Manager
    
    SDK iOS
    
    -   Fixed insights not updating after calling `refresh()`.
    -   Fixed insights card on finance overview not updating after archiving an insight.
    -   Fixed view insights archive card on overview not using accent color from theme.
    
-   January 13, 2021
    
    ## Released Tink PFM Android SDK 0.10.0[](#released-tink-pfm-android-sdk-0-10-0)
    
    Money Manager
    
    SDK Android
    
    -   PFM UI has migrated from using the gRPC framework towards REST APIs. Now, it uses models and services from the [Tink Core](https://github.com/tink-ab/tink-core-android/releases/tag/0.6.0).
        
        > _Please note that this is a breaking change, especially in how the PFM UI is initialized in the application. Please check [the initialization section in README](https://github.com/tink-ab/tink-pfm-android#initialization) for the updated steps to setup PFM UI in your application._
        
    -   Updated logic to use currency code from `UserProfile` when displaying amounts for statistics views.
    -   Fixed locale setting logic used to display dates and periods everywhere.
    
-   January 13, 2021
    
    ## Added payment initiation capabilities for SEB Open Banking connection in Sweden[](#added-payment-initiation-capabilities-for-seb-open-banking-connection)
    
    Payments
    
    You can now initiate payments through SEB’s Open Banking API in Sweden. To learn how, feel free to browse through our getting started [guide](https://docs.tink.com/resources/payments/start-payment).
    
-   January 13, 2021
    
    ## Released Tink PFM iOS SDK 0.13.0[](#released-tink-pfm-ios-sdk-0-13-0)
    
    Money Manager
    
    SDK iOS
    
    -   Fixed category statistics only showing statistics back to the year when the current user was created.
    -   Added screen tracking events for budgets. You can read more about how to use these in this article on [event tracking](https://docs.tink.com/resources/pfm-sdk-ios/pfm-sdk-ios-event-tracking).
    -   Adjustments to the font sizing and weights used across the SDK.
    -   Fixed insights not being archived after selecting one of the actions.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-pfm-ios/releases/tag/0.13.0).
    
-   January 13, 2021
    
    ## Released Tink Link iOS 0.18.0[](#released-tink-link-ios-0-18-0)
    
    SDK iOS
    
    -   Added `releaseStatus` property to the `Provider` model which indicates providers that are in `BETA`.
    -   Added a tag to provider lists to show which ones are in `BETA`.
    -   Added `failedToAddCredentials` error case to `TinkLinkError`. This error is returned in the `TinkLinkViewController`'s completion handler when the user has failed to add credentials and then taps the cancel button. The error has an associated value of errors by credentials ID.
    -   Added `errorsByCredentialsID` property to `TinkLinkViewController`. This dictionary is updated when there's an error adding a credentials.
    
    You can use the error or the property to delete any credentials that failed to be added by the `TinkLinkViewController`.
    
    ```
    do {
        let addedCredentials = try result.get()
        for (id, error) in tinkLinkViewController.errorsByCredentialsID {
            // Code to delete credentials with id
        }
    } catch TinkLinkError.failedToAddCredentials(let errorsByCredentialsID) {
        for (id, error) in errorsByCredentialsID {
            // Code to delete credentials with id
        }
    } catch {
        // Handle error
    }
    ```
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/0.18.0). For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-link-ios/blob/master/README.md).
    
-   December 18, 2020
    
    ## Payment Scheme for Payments[](#payment-scheme-for-payments)
    
    Payments
    
    Added a new field called **paymentScheme** in the [Payment Request model](https://docs.tink.com/api/#payment-request-the-payment-request-model)
    
    It will enable payments to be done using the **SEPA Instant Credit Transfer**. Currently the **SEPA Instant Credit Transfer** is only enabled for the **IT** market.
    
-   December 18, 2020
    
    ## Released Tink PFM iOS SDK 0.12.1[](#released-tink-pfm-ios-sdk-0-12-1)
    
    Money Manager
    
    SDK iOS
    
    -   Updated date formatting transaction lists.
    -   Changed month formatting to be capitalized in overtime category statistics chart.
    -   Hide time period filter in overtime category statistics chart if there isn't more than 6 months.
    -   Use filter category from overtime category statistics chart when showing transactions list.
    -   Improved handling of calls to refresh method.
    -   Minor UI fixes.
    -   Updated design for setting dates for budgets with a custom period.
    -   Added option to change category on existing budget.
    -   Automatically clears the cache when the user changes.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-pfm-ios/releases/tag/0.12.1).
    
-   December 16, 2020
    
    ## Released Tink Link Android 0.14.5[](#released-tink-link-android-0-14-5)
    
    SDK Android
    
    -   Updated to use [Tink Core 0.5.7](https://github.com/tink-ab/tink-core-android/releases/tag/0.5.7).
    -   The [`Environment`](https://tink-ab.github.io/tink-link-android/com.tink.service.network/-environment/) in `TinkConfiguration` is updated with the [`sslCertificate`](https://tink-ab.github.io/tink-link-android/com.tink.service.network/-environment/ssl-certificate.html) now being an optional parameter that can be set, if required, by the application.
    -   The [Production](https://tink-ab.github.io/tink-link-android/com.tink.service.network/-environment/-production.html) environment no longer uses a `sslCertificate`. If you wish to perform certificate pinning for the production endpoint, you can still set your generated SSL certificate by using the [helper extension function](https://tink-ab.github.io/tink-link-android/com.tink.service.network/with-ssl-key.html) for the Production environment.
    -   Renamed parameters for `Environment` for clarity. Note that this is only a breaking change if your application uses a [`Custom`](https://tink-ab.github.io/tink-link-android/com.tink.service.network/-environment/-custom/) environment.
    
    For more information, see the [release notes](https://github.com/tink-ab/tink-link-android/releases/tag/0.14.5).
    
-   December 14, 2020
    
    ## Simplified the payments flow by pre-selecting the source account[](#simplified-the-payments-flow-by-pre-selecting-the-source-account)
    
    Payments
    
    The source account selection screen can now be skipped, if the source account is provided to our SDK [Session](https://docs.tink.com/resources/tink-link-web/tink-link-web-sessions). By pre-selecting a source account, you remove the need for the user to select an account each time a payment is being made.
    
    For more details please read our detailed [guide](https://docs.tink.com/resources/payments/simplify-payment-flows-by-pre-selecting-source-accounts) on this topic.
    
-   December 14, 2020
    
    ## Released Tink Link iOS 0.17.2[](#released-tink-link-ios-0-17-2)
    
    SDK iOS
    
    -   Fixed a bug where the status bar style was wrong when refreshing credentials using a dark navigation bar background color.
    -   Added more translations for error handling if the third-party authentication app needs to be downloaded or upgraded.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/0.17.2). For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-link-ios/blob/master/README.md).
    
-   December 08, 2020
    
    ## Introduced listing of Tink Demo Bank users in Tink Console[](#introduced-listing-of-tink-demo-bank-users-in-tink-console)
    
    Aggregation
    
    Payments
    
    Console
    
    In the Tink Console you can see all available test users, their login credentials and details about the accounts they hold. Head over to [Tink Console](https://console.tink.com/demobank) to check them out and don’t miss [this article](https://docs.tink.com/resources/aggregation/test-providers#accessing-demo-bank-providers-in-tink-link) about Tink Demo Bank.
    
-   December 04, 2020
    
    ## Released Tink PFM iOS SDK 0.12.0[](#released-tink-pfm-ios-sdk-0-12-0)
    
    Money Manager
    
    SDK iOS
    
    -   Improved the support of dark mode. The default color theme supports dark mode now.
        
    -   Added new colors button and buttonLabel to configure the buttons.
        
    -   Updated the new design for the `BUDGET_SUGGEST_CREATE_TOP_CATEGORY` insight.
        
    -   Added default action handling for the `MONTHLY_SUMMARY_EXPENSE_TRANSACTIONS` insight.
        
    -   Added transaction details.
        
        -   Added `TransactionDetailsViewController` for showing details about a specific transaction.
        
        ```
        let transactionDetailsViewController = TransactionDetailsViewController(transactionID: <#T##Transaction.ID#>)
        show(transactionDetailsViewController, sender: <#Any#>)
        ```
        
        -   Added `transactionItemAction` property to the `FinanceOverviewViewController` where you can configure what should happen when a transaction is selected. Either show transaction details or the categorization flow.
        
        ```
        financeOverviewViewController.configuration.transactionItemAction = .categorize  // to show the categorization flow
        financeOverviewViewController.configuration.transactionItemAction = .showDetails // to show the new transaction details view
        ```
        
    -   Added a new configuration type `TinkPFMConfiguration`. Use this instead of `Tink.Configuration` if you only use the Tink PFM SDK.
        
        ```
        let configuration = TinkPFMConfiguration(clientID: <#String#>)
        ```
        
    
    For more information, see the [release notes](https://github.com/tink-ab/tink-pfm-ios/releases/tag/0.12.0).
    
-   December 04, 2020
    
    ## Introduced customization of Tink Link for web in Tink Console[](#introduced-customization-of-tink-link-for-web-in-tink-console)
    
    Console
    
    Tink Link
    
    You are now able to customize the theme of the Tink Link web SDK. You can find the option UI Customization under app settings in Tink Console. For more details please read [this](https://docs.tink.com/resources/tink-link-web/tink-link-web-customization#changing-your-configuration) guide.
    
-   December 04, 2020
    
    ## Released Tink Link iOS 0.17.1[](#released-tink-link-ios-0-17-1)
    
    SDK iOS
    
    -   Fixed status bar not being visible when using a dark `navigationBarBackground` color the success screen.
    -   Improved the support of dark mode. The default color theme supports dark mode now.
    -   Improved the error handling when failed to get scope description.
    -   Improved the error handling if the third-party authentication app needs to be downloaded or upgraded.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/0.17.1). For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-link-ios/blob/master/README.md).
    
-   December 01, 2020
    
    ## Introduced support for TPP Credentials management in 6 more markets[](#introduced-support-for-tpp-credentials-management-in-6-more-markets)
    
    Aggregation
    
    Payments
    
    Console
    
    TPP Credentials management in the Tink Console now also supports the following markets:
    
    -   Austria
    -   Belgium
    -   Finland
    -   France
    -   United Kingdom
    -   Portugal
    
    For more information on how you onboard to aggregate or initiate payments as a TPP, please check out [this](https://docs.tink.com/resources/aggregation/enroll-with-psd2) guide.
    
-   December 01, 2020
    
    ## Released Tink Link iOS 0.17.0[](#released-tink-link-ios-0-17-0)
    
    SDK iOS
    
    -   Changed TinkLinkViewController to be a UIViewController subclass instead of UINavigationController.
    -   Fixed which status bar style is used when using a dynamic navigationBarBackground color.
    -   Added a new configuration type `TinkLinkConfiguration`. Use this instead of `Tink.Configuration` if you only use the Tink Link SDK.
    
    ```
    let configuration = TinkLinkConfiguration(clientID: <#String#>, appURI: <#URL#>)
    ```
    
    -   Changed ColorProvider and FontProvider to structs.
    -   Tink logo now scrolls with the credentials form.
    
    To download source code, see the [release notes](https://github.com/tink-ab/tink-link-ios/releases/tag/0.17.0). For upgrade instructions, refer to the [migration guide](https://github.com/tink-ab/tink-link-ios/blob/master/README.md).
    
-   November 26, 2020
    
    ## Released Tink PFM iOS 0.11.2[](#released-tink-pfm-ios-0-11-2)
    
    SDK iOS
    
    Money Manager
    
    -   Fixed close button not showing in Category Statistics for some environments.
    -   Fixed colors of period and date pickers when using a dark theme.
    -   Added localization strings for Budgets in `LOCALIZABLE_STRINGS.md`.
    
    To download source code, see the [release on GitHub](https://github.com/tink-ab/tink-pfm-ios/releases/tag/0.11.2).
    
-   November 23, 2020
    
    ## Introducing \`releaseStatus\` in Providers[](#releasestatus-in-providers)
    
    Aggregation
    
    Added a new field called `releaseStatus` in the [provider model](https://docs.tink.com/api/#provider).
    
    `BETA` release status means that the provider is in it's `BETA` version and might show unexpected behavior from time to time.
    
    As for now, only providers with `releaseStatus` `BETA` will have this newly introduced property as part of their provider model.
    
-   November 16, 2020
    
    ## Introducing Account check[](#introducing-account-check)
    
    Aggregation
    
    In Tink Platform now you are able to use our new Account check product that lets you confirm the owner of a bank account by fetching real-time data from banks – from account number, IBAN or routing number to account holder name, and (in some markets) identity data.
    
    For more information, see [Account check product page](https://tink.com/products/account-check/) or go ahead and try to [verify your first account](https://docs.tink.com/resources/account-check/verify-your-first-account)!
    
-   November 13, 2020
    
    ## Released Tink PFM iOS SDK 0.11.1[](#released-tink-pfm-ios-sdk-0-11-1)
    
    Money Manager
    
    -   Added a new `custom` feature option to support adding a custom `UIView` to `FinanceOverviewViewController`.
    -   Added more localization strings for `Actionable Insights` in `LOCALIZABLE_STRINGS.md`.
    -   Added support for the Swift Package Manager.
    -   Updated the `EditBudgetViewController` to public class.
    
    For more information, see the [release notes](https://github.com/tink-ab/tink-pfm-ios/releases/tag/0.11.1).
    
-   November 06, 2020
    
    ## Introduced more granular error response in payments.[](#introduced-more-granular-error-response-in-payments)
    
    Payments
    
-   November 05, 2020
    
    ## Introduced management of eIDAS certificates[](#introduced-management-of-eidas-certificates)
    
    Aggregation
    
    Payments
    
    Console
    
    In the Tink Console you are now able to view as well as renew your eiDAS certificate (QWAC and QSealC). Under app settings you will find these new tools, which will help you keep track which apps have configured certificates and their expiry dates.
    
-   October 27, 2020
    
    ## Introducing the Payment Conditions endpoint[](#introducing-the-payment-conditions-endpoint)
    
    Payments
    
    It is now possible to get the list of payment conditions like each bank’s cutoff times, the allowed length of the source message etc, by querying the newly added [payment-conditions endpoint](https://docs.tink.com/api#connectivity/provider/get-payment-conditions-for-a-provider). For more information, see the [Payment Conditions guide](https://docs.tink.com/resources/payments/payment-conditions) or contact us at [support@tink.com](mailto:support@tink.com)
    
-   October 23, 2020
    
    ## Improvements to Actionable Insights[](#improvements-to-actionable-insights)
    
    Money Manager
    
    Improvements to Actionable Insights in the Tink PFM SDK for iOS. Read more [here](https://github.com/tink-ab/tink-pfm-ios/releases/tag/0.11.0).
    
    -   Adds support for more insight types.
    -   Hides actionable insights with unsupported actions.
    -   Monthly summary insights links to expense statistics pie chart instead of showing a list of transactions by default.
    -   Removed default handling to show or categorize multiple transactions.
    -   Added new card for monthly and weekly transaction summary.
    -   Adjusted fonts and icons used on actionable insights.
    -   Also including other improvements:
        -   Now shows currency symbols in category statistics bar charts.
        -   When configuring Tink, the redirect URI is now optional.
    
-   October 19, 2020
    
    ## Introduced usage reports for Payments in Tink Console[](#introduced-usage-reports-for-payments-in-tink-console)
    
    Payments
    
    Console
    
    You can now get usage reports for **Payments initiated** and **Volume initiated (EUR)** in the Tink Console, measuring (a) the number of successfully initiated payments per day or month and (b) the total value of those payments.
    
-   October 12, 2020
    
    ## Manual authenticate of credentials forces authentication[](#manual-authenticate-of-credentials-forces-authentication)
    
    Aggregation
    
-   October 02, 2020
    
    ## Introduced support for TPP Credentials management in NL, DE and NO markets[](#introduced-support-for-tpp-credentials-management-in-nl-de-and-no-markets)
    
    Aggregation
    
    Payments
    
    Console
    
    TPP Credentials management in the Tink Console now also supports the Netherlands, Germany and Norway. For more information on how you onboard to aggregate or initiate payments as a TPP, please check out [this](https://docs.tink.com/resources/aggregation/enroll-with-psd2) guide.
    
-   October 02, 2020
    
    ## Introduced budget on the PFM SDK[](#introduced-budget-on-the-pfm-sdk)
    
    Money Manager
    
    -   Tink PFM SDK for iOS now supports Budget. Read more in [here](https://github.com/tink-ab/tink-pfm-ios/releases/tag/0.10.0).
    -   Also including other improvements:
        -   Fixed issues with monthly view of category statistics when there is no data at the start of a monthly period.
        -   Shows loading indicator until category statistics data is available in some environments.
        -   Now hides unsupported Actionable Insights from lists.
        -   Loading indicators use the same color everywhere.
        -   Icon shapes in actionable insights are customized by the same appearance property as other icons.
        -   Improved support for devices with smaller screens. Moved the networking layer and related models to the TinkCore framework.
        -   Fixed swipe to go back gesture.
    
-   September 18, 2020
    
    ## Credentials no longer put to PERMANENT\_ERROR after 2 months of AUTHENTICATION\_ERROR[](#credentials-no-longer-put-to-permanent_error-after-2-months-of)
    
    Aggregation
    
    Credentials that had been in `AUTHENTICATION_ERROR` for two months, will no longer transition into the `PERMANENT_ERROR` status.
    
    The `PERMANENT_ERROR` status indicates that the credentials cannot recover to a state where data fetching would be possible again. Tink does not believe it makes sense, conceptually, to put credentials into an un-recoverable status just because they were in `AUTHENTICATION_ERROR` for two months.
    
    However, `PERMANENT_ERROR` can still occur if a Provider has been disabled by Tink.
    
-   September 10, 2020
    
    ## Introduced support for TPP Credentials management in IT, ES and DK markets[](#introduced-support-for-tpp-credentials-management-in-it-es-and-dk-markets)
    
    Aggregation
    
    Payments
    
    Console
    
    TPP Credentials management in the Tink Console now also supports Italy, Spain and Denmark. For more information on how you onboard to aggregate or initiate payments as a TPP, please check out [this](https://docs.tink.com/resources/aggregation/enroll-with-psd2) guide.
    
-   September 09, 2020
    
    ## Introducing the source account in transfer endpoint[](#introducing-the-source-account-in-transfer-endpoint)
    
    Payments
    
-   September 09, 2020
    
    ## Added example for refresh credentials request[](#added-example-for-refresh-credentials-request)
    
    Aggregation
    
    An example has been added for refresh credentials request with `callbackUri` and `appUri` parameters. For more information see [Tink API](https://docs.tink.com/api#connectivity/credentials/refresh-credentials).
    
-   September 03, 2020
    
    ## Introduced management of TPP Credentials[](#introduced-management-of-tpp-credentials)
    
    Aggregation
    
    Payments
    
    Console
    
    In the Tink Console you are now able to upload, view and delete credentials for PSD2 APIs in the Swedish market. Extended market support is coming soon. For more information on how you onboard to aggregate or initiate payments as a TPP, please check out [this](https://docs.tink.com/resources/aggregation/enroll-with-psd2) updated guide.
    
-   September 03, 2020
    
    ## Added example for manual authentication request[](#added-example-for-manual-authentication-request)
    
    Aggregation
    
    An example has been added for manual authentication request with `callbackUri` and `appUri` parameters. For more information see [Tink API](https://docs.tink.com/api#connectivity/credentials/manual-authenticate-of-credentials).
    
-   August 28, 2020
    
    ## Updated metrics for Account Aggregation available in Tink Console[](#updated-metrics-for-account-aggregation-available-in-tink-console)
    
    Aggregation
    
    Console
    
    The Aggregation Usage reports in Tink Console now show the updated metric **Aggregations Completed** and the brand new metric: **Monthly Active Users**. Starting today, these metrics replace the previously reported metrics.
    
-   August 26, 2020
    
    ## Updated QTSP recommendation[](#updated-qtsp-recommendation)
    
    Aggregation
    
    The QTSP recommendation has been updated. Microsec\* has been removed from the recommendation list. For more information see [eidas-certificates](https://docs.tink.com/resources/aggregation/eidas-certificates).
    
-   August 03, 2020
    
    ## Introducing the account holder endpoint[](#introducing-the-account-holder-endpoint)
    
    Aggregation
    
    It is now possible to get the account holders by querying the newly added [account holders endpoint](https://docs.tink.com/api/#account-get-holders-for-account).
    
-   July 28, 2020
    
    ## Structured and Unstructured RemittanceInformation[](#structured-and-unstructured-remittanceinformation)
    
    Payments
    
    We have added a new attribute **RemittanceInformation** to the [payments](https://docs.tink.com/api/#payment-request-the-payment-request-model-remittanceinformation) endpoint.
    
    As we now support **RemittanceInformation**, the **reference** attribute in [PaymentDestinationRequest](https://docs.tink.com/api/#payment-request-the-payment-request-model-paymentdestinationrequest) has been deprecated.
    
-   June 26, 2020
    
    ## Added payment initiation capabilities for Portugal[](#added-payment-initiation-capabilities-for-portugal)
    
    Payments
    
    You can now initiate payments with Novo Banco in Portugal.
    
-   June 17, 2020
    
    ## Introduced overview of uploaded TPP credentials[](#introduced-overview-of-uploaded-tpp-credentials)
    
    Aggregation
    
    Payments
    
    Console
    
    In the Tink Console you can now get an overview of the financial institutions that you have uploaded TPP credentials for. For more information on how you onboard to aggregate or initiate payments as a TPP, please check out [this](https://docs.tink.com/resources/aggregation/enroll-with-psd2) guide.
    
-   June 15, 2020
    
    ## Opt-in feature for updating credentials[](#opt-in-feature-for-updating-credentials)
    
    Aggregation
    
    Trigger an opt-in of accounts when updating non-account credentials in a cluster/app with opt-in feature enabled.
    
-   June 09, 2020
    
    ## Removed the test flag from the market specific guides[](#removed-the-test-flag-from-the-market-specific-guides)
    
    Payments
    
    Due to [changes](https://docs.tink.com/resources/payments/can-i-add-payments) in the way we test payments, we have updated the docs and removed the `test=true` flag which will no longer be needed.
    
-   June 04, 2020
    
    ## Completed rolling out changes for testing payments with Tink Link[](#completed-rolling-out-changes-for-testing-payments-with-tink-link)
    
    Payments
    
    We have completed rolling out changes for testing payments and we have updated our [related article](https://docs.tink.com/resources/payments/can-i-add-payments) accordingly.
    
    You can now test payments with Tink Link out-of-the-box.
    
-   June 01, 2020
    
    ## Added payment initiation capabilities for SBAB Open Banking connection in Sweden[](#added-payment-initiation-capabilities-for-sbab-open-banking-connection)
    
    Payments
    
    You can now initiate payments through SBAB’s Open Banking API in Sweden.
    
    To learn how, feel free to browse through our guide on [Getting Started](https://docs.tink.com/resources/payments/start-payment)
    
-   June 01, 2020
    
    ## Added business bank connections to base policy All bank connections[](#added-business-bank-connections-to-base-policy-all-bank-connections)
    
    Aggregation
    
    Business bank connections has now been added to the base policy `All bank connections`. Using this policy will allow users to also see bank connections which allow them to log in to their business accounts.
    
    _Business bank connections are currently only available in Sweden._
    
-   June 01, 2020
    
    ## Added base policy for business bank connections in Console[](#added-business-bank-base-policy)
    
    Aggregation
    
    Console
    
    A base policy for `Business bank connections` has been added to Console. Enabling this policy will allow users to see only bank connections which allow them to log in to their business accounts
    
    _Business bank connections are currently only available in Sweden._
    
-   May 28, 2020
    
    ## New AuthenticationUserType field added in Provider model[](#new-authenticationusertype-field-added-in-provider-model)
    
    Aggregation
    
    New field `AuthenticationUserType` has been added to the provider model. Indicates if a user authenticates toward the bank as a person or a business. Values: `PERSONAL`, `BUSINESS`. Check it out [here](https://docs.tink.com/api/#provider).
    
-   May 27, 2020
    
    ## New Savings Goals available[](#new-savings-goals-available)
    
    Money Manager
    
-   May 26, 2020
    
    ## Added option to configure available bank connections per app[](#added-option-to-configure-available-bank-connections-per-app)
    
    Aggregation
    
    Payments
    
    Console
    
    The Tink Console now supports configuration of bank connections available to end users. You can set a base policy and combine it with both exclusion and inclusion rules to get a list of financial institutions curated for your specific use case.
    
-   May 22, 2020
    
    ## Added an article about upcoming changes for testing payments[](#added-an-article-about-upcoming-changes-for-testing-payments)
    
    Payments
    
    Soon you will be able to test payments with Tink Link out-of-the-box. We published [a new article](https://docs.tink.com/resources/payments/can-i-add-payments) for upcoming changes about testing payments.
    
-   May 20, 2020
    
    ## Added info about how to set up and use permanent users[](#added-info-about-how-to-set-up-and-use-permanent-users)
    
    Payments
    
    Published [this article](https://docs.tink.com/resources/payments/permanent-user) as a guide for how to set up and use permanent users with Tink Link to initiate a payment.
    
-   May 05, 2020
    
    ## Introduced Organisations for effective collaboration and user management[](#introduced-organisations-for-effective-collaboration-and-user-management)
    
    Console
    
    The Tink Console now supports [inviting additional users](https://console.tink.com/account/organization/users) to collaborate in managing your integration. Users can be invited with the Viewer or Administrator role, and can be added to multiple organisations.
    
-   April 27, 2020
    
    ## Unified Transfer and Payment execution date logic for Sweden (SE)[](#unified-transfer-and-payment-execution-date-logic-for-sweden-se)
    
    Payments
    
    The [way execution date is handled](https://docs.tink.com/resources/payments/execute-payment-now-or-in-the-future) (paying now or at a future date) is now unified for Swedish financial institutions. This change will gradually be implemented and verified for all markets going forward.
    
-   April 20, 2020
    
    ## Added financial institution Demo Providers in Italy (IT)[](#added-financial-institution-demo-providers-in-italy-it)
    
    Payments
    
    You can now initiate a test payment in IT using test providers. See our [Getting Started](https://docs.tink.com/resources/payments/start-payment-it) guide to learn how.
    
-   April 20, 2020
    
    ## Added Payments Status Transition page to our product resources[](#added-payments-status-transition-page-to-our-product-resources)
    
    Payments
    
    Now you can see a more clear picture of how a payment transitions between different states (failed, sent, canceled and awaiting credentials), along with additional information explaining each state. Check it out [here](https://docs.tink.com/resources/payments/payment-status-transitions).
    
-   April 20, 2020
    
    ## Added payment initiation capabilities for several banks in the United Kingdom[](#added-payment-initiation-capabilities-for-several-banks-in-the-united)
    
    Payments
    
    You can now initiate payments in the United Kingdom with the following banks:
    
    -   Lloyds
    -   Halifax
    -   Bank of Scotland
    -   Barclays Bank
    -   Nationwide Building Society
    -   Danske Bank
    -   Royal Bank of Scotland
    -   NatWest
    -   Ulster Bank
    -   Santander
    -   HSBC
    -   First Direct
    -   Monzo
    -   Revolut
    -   TSB Bank
    -   Tesco
    -   AIB Group UK
    -   First Trust
    
    Browse through our [Getting Started](https://docs.tink.com/resources/payments/start-payment-uk) guide to learn how.
    
-   April 20, 2020
    
    ## Added payment initiation capabilities for several banks in Portugal[](#added-payment-initiation-capabilities-for-several-banks-in-portugal)
    
    Payments
    
    You can now initiate payments in Portugal with the following banks:
    
    -   Activo Bank
    -   Banco Montepio
    -   Caixa General de Depósitos
    -   Millennium BCP
    -   Santander
    
-   March 20, 2020
    
    ## Removed 10 minute waiting time for credential refresh for test providers[](#removed-10-minute-waiting-time-for-credential-refresh-test-providers)
    
    Aggregation
    
    It is now possible to perform a [credential refresh](https://docs.tink.com/api#connectivity/credentials/refresh-credentials) for test providers before the 10 minute mandatory wait period has passed after the pervious successful refresh.
    
-   March 20, 2020
    
    ## Return additional checking account for UK test provider with static values[](#return-additional-checking-account-for-uk-test-provider-with-static-values)
    
    Aggregation
    
    Return 1 additional checking account with static data for UK open banking redirect test provider: uk-test-open-banking-redirect. This is a low balance account, having balance less that 100 GBP.
    
-   March 17, 2020
    
    ## New Swedish test provider[](#new-swedish-test-provider)
    
    Aggregation
    
    Introduce a new Swedish test provider `se-test-bankid-qr-successful` so that a user is able to retrieve a fake Mobile BankID QR image during the authentication process. See the [test providers guide](https://docs.tink.com/resources/aggregation/available-test-providers) for more information.
    
-   March 17, 2020
    
    ## New open banking test provider with configurable session expiry time[](#new-open-banking-test-provider-with-configurable-session-expiry-time)
    
    Aggregation
    
    We have introduced a new test provider `<market>-test-open-banking-redirect-configurable-session-expiry` which allows you to simulate an open banking session expiring after a short period of time. When creating or refreshing a credential for this provider you can set the session's expiration time in seconds.
    
    See the [test providers guide](https://docs.tink.com/resources/aggregation/available-test-providers) for more information.
    
-   March 04, 2020
    
    ## Enable field for provider model[](#enable-field-for-provider-model)
    
    Aggregation
    
    The field `authenticationFlow` is enabled for the provider model. See [provider model](https://docs.tink.com/api/#provider) for more information.
    
-   March 03, 2020
    
    ## Return more checking accounts for UK test provider[](#return-more-checking-accounts-for-uk-test-provider)
    
    Aggregation
    
    Return 3 checking accounts including one with zero balance for UK open banking redirect test provider: uk-test-open-banking-redirect.
    
-   February 25, 2020
    
    ## Enable field for credentials model[](#enable-field-for-credentials-model)
    
    Aggregation
    
    The field `sessionExpiryDate` is enabled for the credentials model. See [credentials model](https://docs.tink.com/api/#credentials) for more information.
    
-   November 21, 2019
    
    ## Status code of deleting credentials[](#status-code-of-deleting-credentials)
    
    Aggregation
    
    Deleting credentials will now return `404` status code if the credentials could not be found. See [Delete credentials](https://docs.tink.com/enterprise/api/#credentials-delete-credentials) to get more information.
    
-   October 09, 2019
    
    ## Support for providers in the Netherlands[](#support-for-providers-in-the-netherlands)
    
    Aggregation
    
    Dutch providers (Bunq, ING and Rabobank to start with) are now available through Tink Link. Due to the varying quality of PSD2 APIs, you may experience issues with accessing data from some banks. Like all compliant parties, we are required to aggregate financial data through PSD2 APIs whenever available. We regret any potential inconvenience and expect the quality of PSD2 connections to improve with time.
    
-   August 26, 2019
    
    ## Two-factor authentication support[](#two-factor-authentication-support)
    
    Console
    
    The Tink Console now supports two-factor authentication for your account login. Although it’s an opt-in feature, we highly recommend setting it up to keep your precious work safer than ever.
    
-   August 21, 2019
    
    ## SCA callbackUri (TPP)[](#sca-callbackuri-tpp)
    
    Aggregation
    
    It is now possible to control where the authorization code will be redirected to during a Strong Customer Authentication (SCA) flow. The `callbackUri` request parameter has been added to credentials endpoints that can trigger an SCA flow. This parameter is only applicable to TPPs.
    
-   August 21, 2019
    
    ## SCA appUri[](#sca-appuri)
    
    Aggregation
    
    It is now possible to control where the end user will be redirected to during a Strong Customer Authentication (SCA) flow. The `appUri` request parameter has been added to credentials endpoints that can trigger an SCA flow.
    
-   August 16, 2019
    
    ## User specific providers[](#user-specific-providers)
    
    Aggregation
    
    When requesting providers from the following endpoints: `/api/v1/providers` & `/api/v1/providers/{market}`, the response will only contain providers which are available for the current user if an authenticated user was used in the request.
    
-   August 02, 2019
    
    ## Ingestion of transaction batches[](#ingestion-of-transaction-batches)
    
    API
    
    Transaction ingestion via the [Connector API](https://docs.tink.com/api/connector/#ingest-transactions) now allows partial ingestion if some transactions in the batch exists. Status code `409` is returned only if all of the transactions in a batch are already ingested to Tink.
    
-   July 29, 2019
    
    ## Currency code in additional information[](#currency-code-in-additional-information)
    
    Aggregation
    
    Added `currencyCode` to `additionalInfo` when returning credentials with supplemental information. See [Opt-in feature under credentials section](https://docs.tink.com/enterprise/api/#credentials) to get more information.
    
-   July 26, 2019
    
    ## New functionalities for ingesting transactions[](#new-functionalities-for-ingesting-transactions)
    
    API
    
    It is now possible to set an expiry date to pending transactions and to update pending transactions to booked via the `CreateTransactionEntity` payload. See [Ingest transactions](https://docs.tink.com/api/connector/#ingest-transactions) to get more information.
    
-   July 25, 2019
    
    ## New statistics types[](#new-statistics-types)
    
    Money Manager
    
    New statistics types (`expenses-by-primary-category` and `expenses-by-primary-category/by-count`) are available to easily fetch overall statistics for primary categories. See [Statistics](https://docs.tink.com/api/#statistics) to get more information.
    
-   July 17, 2019
    
    ## Provider capabilities[](#provider-capabilities)
    
    Aggregation
    
    Providers are now populated with information about their `capabilities`. See [Providers](https://docs.tink.com/enterprise/api/#provider) to get more information.
    
-   July 10, 2019
    
    ## New fields on providers[](#new-fields-on-providers)
    
    Aggregation
    
    The fields `accessType`, `financialInstitutionName` and `financialInstitutionId` are now fully supported on providers. See [Providers](https://docs.tink.com/enterprise/api/#provider) to get more information.
    
-   June 17, 2019
    
    ## Introducing identity data[](#introducing-identity-data)
    
    Data Enrichment
    
    Get available identity information about your users. See [Identity page](https://docs.tink.com/api/#identity) to get started.
    
-   June 10, 2019
    
    ## Market and agent capabilities[](#market-and-agent-capabilities-page)
    
    Documentation
    
    Get a full overview of Tink’s connectivity toward financial institutions in Europe with our new [Market Capabilities page](https://docs.tink.com/market-capabilities).
    
-   May 29, 2019
    
    ## Portfolio types for investment accounts[](#portfolio-types-for-investment-accounts)
    
    Aggregation
    
    Added `portfolioTypes` to `additionalInfo` when returning credentials with supplemental information.
    
-   May 27, 2019
    
    ## Filter metrics by provider in Usage Reports[](#filter-metrics-by-provider-in-usage-reports)
    
    Console
    
    Usage Reports now supports filtering metrics by provider. This means that you can see which providers your users complete the aggregation flows for.
    
-   May 24, 2019
    
    ## Provider API changes[](#provider-api-changes)
    
    Aggregation
    
    Provider properties `financialInstituteId` and `financialInstituteName` are replaced by `financialInstitutionId` and `financialInstitutionName`. Moreover, documentation which previously mentions "financial institute"s now uses "financial institution"s.
    
-   May 23, 2019
    
    ## Support for Sparebank 1 (NO) provider removed[](#support-for-sparebank-1-no-provider-removed)
    
    Aggregation
    
    Support for the Norwegian provider SpareBank 1 was removed.
    
-   May 02, 2019
    
    ## Support for MoreGolf Mastercard and re:member Mastercard (SE) added[](#support-for-moregolf-mastercard-and-re-member-mastercard-se-added)
    
    Aggregation
    
    MoreGolf Mastercard and re:member Mastercard are now supported providers in Sweden.
    
-   May 02, 2019
    
    ## Introducing Usage Reports[](#introducing-usage-reports)
    
    Aggregation
    
    It is now possible to monitor usage of your application via Tink's console. Once logged in, you can explore analytics related to Account Aggregation and better measure how many users are completing aggregation flows.
    
-   May 02, 2019
    
    ## Market and agent capabilities[](#market-and-agent-capabilities)
    
    Console
    
-   April 24, 2019
    
    ## Support for OKQ8 (SE) provider removed[](#support-for-okq8-se-provider-removed)
    
    Aggregation
    
    Support for a Swedish credit provider OKQ8 was removed.
    
-   April 23, 2019
    
    ## Clarifying Credentials API documentation[](#clarifying-credentials-api-documentation)
    
    Aggregation
    
    Clarifying the credentials API documentation according to our best practises.
    
-   April 23, 2019
    
    ## Clarifying Providers API documentation[](#clarifying-providers-api-documentation)
    
    Aggregation
    
    Clarifying the providers API documentation according to our best practises.
    
-   April 17, 2019
    
    ## Authentication methods for Danske bank (DK)[](#authentication-methods-for-danske-bank-dk)
    
    Aggregation
    
    Authentication using NemID App is now supported with Danske bank (DK).
    
-   April 04, 2019
    
    ## Connector API changes[](#connector-api-changes)
    
    Aggregation
    
    The Connector API now supports updating accounts and setting labels to users. This feature is currently limited to Enterprise customers only - contact your account manager to know more about it.
    
-   March 28, 2019
    
    ## Introducing test providers[](#introducing-test-providers)
    
    Aggregation
    
    Test providers allow you to test authentication flows without having to enter real bank credentials. Learn more about it [here](https://docs.tink.com/resources/aggregation/available-test-providers).
    
-   March 26, 2019
    
    ## Error codes for Connector API[](#error-codes-for-connector-api)
    
    API
    
    Our Connector API documentation is now completed with error codes specifications. Read more about it [here](https://docs.tink.com/api-connector#connector).
    
-   March 22, 2019
    
    ## Spain - Categorisation Beta[](#spain-categorisation-beta)
    
    Aggregation
    
    You can now retrieve categorised transactions for Spanish banks. This is a beta release with further improvements planned in the coming weeks.
    
-   March 22, 2019
    
    ## New banks added in Belgium and Spain[](#new-banks-added-in-belgium-and-spain)
    
    Data Enrichment
    
    Axa (BE) and EVO Banco (ES) are now available for account aggregation.
    
-   March 15, 2019
    
    ## New Oauth 2.0 flow for user management[](#new-oauth-2-0-flow-for-user-management)
    
    Aggregation
    
    Users can be created, managed and deleted using a new Oauth scope. This feature is currently limited to Enterprise customers only - contact your account manager to learn more about it.
    
-   March 08, 2019
    
    ## Create multiple apps[](#create-multiple-apps)
    
    Console
    
    You can now add and manage multiple apps in the same view, so that you don’t have to create different accounts for your different projects.
    
-   March 01, 2019
    
    ## Tink Link configuration[](#tink-link-configuration)
    
    Console
    
    It is now easier to configure and retrieve the Tink Link URL associated to your app. Login in the Console to access this feature.
    
-   February 07, 2019
    
    ## Launching in UK, Germany, Spain, Belgium and Austria[](#launching-in-uk-germany-spain-belgium-and-austria)
    
    Aggregation
    
    Our Account Aggregation products are now available in 5 new markets. Using Tink Link, you can now authenticate and aggregate data from more than 2000 banks.
    
-   December 01, 2018
    
    ## Introducing Provider Capabilities[](#introducing-provider-capabilities)
    
    Aggregation
    
    All providers now have information of what capabilities they have. Provider capabilities give information of what type of accounts they can fetch and if they can do payments. The capabilities are `CHECKING_ACCOUNTS`, `SAVINGS_ACCOUNTS`, `CREDIT_CARDS`, `LOANS`, `INVESTMENTS`, `PAYMENTS`.
