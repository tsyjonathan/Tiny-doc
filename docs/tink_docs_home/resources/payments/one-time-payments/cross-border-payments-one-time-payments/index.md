---
title: "border payments - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/cross-border-payments-one-time-payments/"
exportedAt: "2026-01-13T12:42:42.916Z"
---
Learn about cross-border payments, the payment types supported by Tink, and key considerations when facilitating cross-border payments.

International (cross-border) payments are ones where the source account and the destination account are based in different countries.

Payments currently doesn't support most international payments. The exception is payments in Euro (EUR) that originate from a eurozone (meaning any country that uses the Euro as official currency) source account, to other EUR-based destination accounts within the European Area (EU). These transactions are processed using the SEPA payment schemes, SEPA Credit Transfer, or SEPA Instant. For a complete list of supported domestic payments, see our [market and capabilities list](/Tiny-doc/tink_docs_home/market-capabilities/payments/).

### Key considerations[](#key-considerations)

In order to initiate payments internationally, including those that are processed by use of SEPA payment schemes, banks often require additional criteria or information that can affect success rates. Here are some things to bear in mind:

1.  Further information about the receiver (payee) may be required by the sending bank to execute the payment. Such as Address and BIC code, this can be inputted in the [payment request](/Tiny-doc/tink_docs_api/api-payment/#payment/payment-request/create-payment-request) and the `RecipientDTO` fields.
2.  The ability to send payments internationally may need to be enabled via a configuration on the source account. If not, the payment might automatically be blocked by the bank.
3.  The source–account holder may be required to add the destination account as a trusted beneficiary. If not, the payment might blocked by the bank.
4.  A different daily payment limit may apply to international payments.
5.  A different risk policy may apply to international payments.

Cross-currency payments are not currently supported by Payments. Note that banks often charge additional fees when converting between different currencies.

### Support overview[](#support-overview)

| Destination and source account location | Supported capabilities |
| --- | --- |
| EUR country to EUR country (e.g. France, Germany, Italy) | Supported by the SEPA payment schemes |
| EUR country to countries outside the EEA | Not currently supported |
| EUR country to UK | Payments made in EUR to EUR accounts based in the UK are supported by SEPA payment schemes — converting payments from EUR to GBP is not supported |
| UK to EUR | Not currently supported |
