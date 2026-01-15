---
title: "Payment schemes - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/payment-schemes/"
exportedAt: "2026-01-13T12:42:45.545Z"
---
## What are payment schemes?[](#what-are-payment-schemes-)

Payment schemes are the underlying bank rails that are used to execute a bank transfer initiated through Tink’s payment initiation.

The speed of the payment and settlement time is dependent on which scheme you use as well as other conditions that might apply such as fee on the end-user, availability and coverage. The end-user fee is deducted from the users account and from their bank, in most cases this is displayed to the user in the bank's online interface or app when making the transfer.

Good to note that payment fees, availablity and coverage can vary per bank and time period but below information are the standard scheme rules and market conditions. Instant payment speed usually means settlement on average within millisecond but can take up to 10 seconds (SEPA instant) or 1 minute (Fasterpayments) in some cases.

| Payment scheme | Payment speed | Fees | Max amount | Availability | Coverage | Use case |
| --- | --- | --- | --- | --- | --- | --- |
| SEPA Instant (EU) | Instant | €0–€1.50 EUR. See table below on further breakdowns | €100,000 per payment | 24/7, 365 days a year | ~80% of all EU providers | High-value, time-critical EUR payments. |
| SEPA Credit (EU) | 1 Business day | None | €999,999,999 per payment. | Monday to Friday. Not available on weekends or public holidays. | All European providers | EUR Transactions where the recipient does not need to receive the funds immediately. |
| Faster Payments (UK) | Instant | None | £1 million per payment. | 24/7, 365 days a year | All UK providers | Payments in the UK. |
| BACS direct credit (UK) | Up to 3 business days | £0.05-0.5 | £20 million per payment | Monday to Friday between 07.00 and 22.30 | UK providers | High ATV payments in the UK. |
| CHAPS (UK) | Same-day if submitted before 17.40 | £20+ | No upper limit | Monday to Friday between 06.00 and 18.00 | UK providers | High ATV payments requiring same day in the UK. |
| PG, BG, (SE) | Same day | 0-1.8kr per payment | Varies per bank and time period but up to 1,000,000 kr | Monday to Friday between 06.00 and 18.00 | All SE providers | Swedish payments that settle within 1 business day. Such as invoice payments. |
| A2A (SE) | Same day | 0-1.85kr per payment | Varies per bank and time period but up to 1,000,000 kr | Monday to Friday between 06.00 and 18.00 | SE providers | Swedish payments that settle within 1 business day. Such as account funding. |
| Norwegian credit transfer (NO) | 1 Business day | 0-3.00 kr | 25 million kr. per payment | Monday to Friday | All NO providers | Transactions where the recipient does not need to receive the funds immediately. |
| Norwegian instant credit transfer (NO) | Instant | 3.00-8.00 kr. | 40,000 kr. per payment | 24/7, 365 days a year | 95% of all NO providers | High-value, time-critical payments where the recipient needs to receive the money as soon as possible. |
| Straks (DK) | 1 Business day | kr. 1.00-1.50 | No upper limit per payment | Monday to Friday | All DK providers | Transactions where the recipient does not need to receive the funds immediately. |
| Straks instant (DK) | Instant | kr. 8.00 (approx.) | 500,000 kr per payment | 24/7, 365 days a year | All DK providers | High-value, time-critical payments where the recipient needs to receive the money as soon as possible. |
| Elixir (PL) | 1 business day, 3 daily clearing sessions | 0-4 PLN per payment. Most banks free of charge | No upper limit | Monday to Friday | All PL providers | Zloty Transactions where the recipient does not need to receive the funds immediately. |
| Elixir inst (PL) | Instant | 0-4.99 PLN per payment | 100,000 PLN per payment | 24/7, 365 days a year | All PL providers | High-value, time-critical Zloty payments where the recipient needs to receive the money as soon as possible. |

## SEPA instant fees[](#sepa-instant-fees)

SEPA instant fees can vary per bank and the account that the user holds with it. Below are the typical ranges for each market.

Fees table:

| Country | Fee amount |
| --- | --- |
| Austria | €0.65 |
| Belgium | €0–€1.25 |
| Finland | €0 |
| France | €0–€1 (can vary based on amount) |
| Germany | €0–€1.50 |
| Ireland | €0–€0.99 |
| Italy | €0.60–€5.90 |
| Lithuania | €0.41 |
| Netherlands | €0.08 |
| Portugal | €1.35–€5.20 |
| Spain | €0.95–€12.00 |

### When to credit a user[](#when-to-credit-a-user)

Depending on your use case and requirements the moment when you decide to credit the user and what scheme to use may differ. Read through our [Payment status transition](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/one-time-payments-status-transitions/) article to get an overview of our different statuses. Here are some guiding examples that could be of help:

-   **Low risk & no fee**: In case you have a low risk use case such as billing and invoice payments ,where there is a high intent to pay and low risk of fraud, then you can usually use a slower payment scheme that is free of charge (ex SEPA credit) and credit the user once the payment has been Sent (initiated) and Executed.
    
-   **Medium & High risk no fee**: For these use cases, such as in an account funding or eCommerce setting, we recommend that you use a non-instant scheme that is free of charge (ex SEPA credit) in conjunction with our [Risk Signals](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/risk-signals/) to de-risk the payment and ensure high settlement rates. You can here also rely on the Sent status.
    
-   **Medium & High risk with fee**: In case you believe that users are not as sensitive to a fee, such as in high ATV cases, you can use SEPA instant as the executing scheme to receive funds as fast as possible and credit the user once those have settled, we recommend using the Payer\_settled & Payee\_settled statuses or waiting for funds to arrive on your destination account before crediting the user. Tip is to use Tink’s [settlement accounts](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/set-up-settlement-accounts-one-time-payments/) for automatic reconciliation and the settled status.
    

In general we recommend customers that have a low risk use case or that are using Risk Signals to credit their users once the payment has been sent and initiated. For High risk use cases without Risk Signals we recommend using an instant scheme or waiting for the funds to settle and use our Settlement accounts feature.

### SEPA credit fallback[](#sepa-credit-fallback)

Tink uses a fallback to SEPA credit when customers have selected SEPA instant as their scheme but the provider chosen by the user does not support sending with the scheme. This to ensure payment execution across EU.

## How to use a payment scheme[](#how-to-use-a-payment-scheme)

All providers and their supported schemes can be found on our [public connection capability](/Tiny-doc/tink_docs_home/market-capabilities/payments/) page for our payment product.

The payment scheme is set when you create your [payment request](/Tiny-doc/tink_docs_api/api/#payment/payment-request/create-payment-request) as one of the main fields, this is done in the PaymentScheme field. Read the guide on [Market-specific information](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/one-time-payments-market-specific-information/) to understand which scheme that is available per market and how to construct the payment request.

### Smart routing (Scheme picker)[](#smart-routing-scheme-picker-)

Tink offers an additional feature for optimal scheme selection called Smart routing. With this we are able to configure the specific scheme to be used to execute the payment on bank/provider level. This is determined based on:

-   **Performance**: Certain banks can only allow payments to be done through a specific scheme in some scenarios, ex for transfers over a certain amount.
-   **Settlement risk**: Some banks are more risky than others when it comes to risk of non-settlement where it can be beneficial to use instant schemes.
-   **Fees**: Instant fees vary between banks, with smart routing we can pick and choose the optimal ones according to your use case and end-users appetite.

Smart routing rules can also be set according to transfer amounts, for example to execute with SEPA Instant for all amounts over 500 EUR and manage the rest with SEPA credit. This feature is configured by Tink, contact your Tink representative if interested.
