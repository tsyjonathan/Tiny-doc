---
title: "Demo Bank - Tink Docs"
source: "https://docs.tink.com/resources/console/demo-bank"
exportedAt: "2026-01-13T12:53:12.295Z"
---
Demo Bank is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios and see how your end-user flow works before it goes into production.

**Demo Bank** is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios and see how your end-user flow works before it goes into production.

Your demo credentials are found inside Console, so let's start there.

1.  [Log in to Console](https://console.tink.com/login).
2.  Select **Demo Bank**.
3.  Select a **Product** and a **Market**.

![Demo Bank, Account Check test cases](https://images.ctfassets.net/tmqu5vj33f7w/1VxkCsytHgSuT25RK4rtj1/fe5a68143331f208958a6e06559396f9/account_check_demo_bank.png) _Demo Bank user credentials for Account Check in the Swedish market._

Each user represents a different test case. In Demo Bank, the **Description** field explains a user's purpose. For example, User 1 is used to test a successful scenario that leads to you fetching an Account Check report with full information.

![Demo Bank, User details](https://images.ctfassets.net/tmqu5vj33f7w/7zWyL0jOzr90bt01gQyjRJ/9768e36d0f47f03c321d9d07dd09154e/Screenshot_2023-08-02_at_09.45.18.png) Clicking on **‘User 1’** allows you to see more details about the user. This includes credentials you might need to use when authenticating (e.g. SSN in Sweden), as well as information about the accounts of that user.

When you have selected a Demo Bank user for your test, it's time to [build your Tink Link](https://docs.tink.com/resources/account-check/verify-your-first-account#build-the-url). Select **Copy URL**, paste it into a browser, and hit enter.

### Supported Demo Bank providers[](#supported-demo-bank-providers)

After October 31st, 2023, only the following providers will be available for testing in the Tink platform:

| Market | Provider |
| --- | --- |
| Austria | at-demobank-password |
| Austria | at-demobank-open-banking-redirect |
| Austria | at-demobank-open-banking-embedded |
| Belgium | be-demobank-open-banking-redirect |
| Czech Republic | cz-demobank-open-banking-redirect |
| Denmark | dk-demobank-password |
| Denmark | dk-demobank-open-banking-redirect |
| Denmark | dk-demobank-open-banking-embedded |
| Estonia | ee-demobank-open-banking-redirect |
| Estonia | ee-demobank-open-banking-embedded |
| Finland | fi-demobank-open-banking-redirect |
| Finland | fi-demobank-open-banking-embedded |
| France | fr-demobank-password |
| France | fr-demobank-open-banking-redirect |
| France | fr-demobank-open-banking-redirect-aispis |
| France | fr-demobank-open-banking-embedded |
| Germany | de-demobank-password |
| Germany | de-demobank-open-banking-redirect |
| Germany | de-demobank-open-banking-embedded-templates |
| Germany | de-demobank-open-banking-redirect-pisonly |
| Ireland | ie-demobank-open-banking-embedded |
| Ireland | ie-demobank-open-banking-redirect |
| Italy | it-demobank-open-banking-redirect |
| Italy | it-demobank-open-banking-embedded |
| Italy | it-demobank-open-banking-redirect-pisonly |
| Latvia | lv-demobank-open-banking-redirect |
| Netherlands | nl-demobank-open-banking-redirect |
| Norway | no-demobank-password |
| Norway | no-demobank-open-banking-redirect |
| Norway | no-demobank-open-banking-embedded |
| Portugal | pt-demobank-open-banking-redirect |
| Portugal | pt-demobank-password |
| Poland | pl-demobank-open-banking-redirect |
| Spain | es-demobank-open-banking-embedded |
| Spain | es-demobank-open-banking-redirect |
| Spain | es-demobank-password |
| Sweden | se-demobank-open-banking-bankid |
| Sweden | se-demobank-open-banking-embedded |
| Sweden | se-demobank-open-banking-redirect |
| Sweden | se-demobank-password |
| United Kingdom | uk-demobank-open-banking-handoff |
| United Kingdom | uk-demobank-open-banking-redirect |
| United Kingdom | uk-demobank-open-banking-redirect-aispis |
| United Kingdom | uk-demobank-open-banking-redirect-extendable |

**Please note:**

-   Any providers not present in this list will not be supported for testing purposes after October 31st, 2023.
-   The providers in the list above are available today, and we encourage you to use them for your testing needs.
