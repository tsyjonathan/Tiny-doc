---
title: "Introduction to Account Check - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/account-check/introduction-to-account-check/"
exportedAt: "2026-01-13T12:41:18.019Z"
---
One of the core tenets of the EU’s PSD2 directive is that financial data belongs to users, not banks. By opening up access to financial data, we can bring account verification methods to the digital age, enabling faster, simpler and more secure user experiences.

*Image removed: AC-table-comparison*

Banks already have the data developers need to be able to verify account ownership, it just hasn’t been made accessible through APIs before. With Account Check, your users can seamlessly share their account information within your application, removing the need to ask for bank statements, or make micro deposits that can take several days to complete.

## How it works[](#how-it-works)

We deliver Account Check through a front-end SDK that makes your integration to Tink essentially one line of code. By implementing Account Check into your flows, your user will be asked to share their data and authenticate to their bank. If consent is given, you will receive an automated JSON or PDF report with the required data, and this whole process takes under a minute.

*Image removed: Account-Check GIF-v2*

This may seem simple, but there is a lot of complexity involved in the background. There are thousands of banks across Europe, with their own connections and authentication methods, that can be updated at any time. This is a continuously evolving landscape that requires massive investments in engineering and monitoring. Tink manages all of this complexity for you, and will direct the end-user to the appropriate authentication mechanism, while delivering an automated report with the account information.

## What you can do with Account Check[](#what-you-can-do-with-account-check)

*Image removed: Direct debit *

### Simpler direct debit setup[](#simpler-direct-debit-setup)

PayPal has the perfect use case for Account Check. As part of the sign-up process, their customers’ can add a bank account to their PayPal wallet and verify it instantly. Before Tink’s Account Check, this verification process was done by sending a transaction to the customers’ bank account and including a unique code in the transaction description. Customers then filled in this code to verify the bank account.

Account Check makes this whole process easier by enabling PayPal to access bank account information, vastly improving the user experience and conversion rates. *Image removed: Seamless payout*

### Seamless payout setup[](#seamless-payout-setup)

Tradera is using Account Check to create a smooth payout setup experience. As part of the payout setup, their customers can connect their bank account to have their details automatically fetched and then verified in real-time. Before using Account Check, customers had to manually fill in their details which is not always easy to access or memorise, and since it involves a lot of numbers, it’s easy for people to make mistakes and submit incorrect information.

Tradera is using Account Check to remove manual entry, improve the user experience, and simplify the payment setup on their online marketplace.

## Need help?[](#need-help-)

Contact Sales and let us help you get started.
