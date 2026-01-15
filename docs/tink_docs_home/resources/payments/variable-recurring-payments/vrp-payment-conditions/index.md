---
title: "Payment conditions - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/payments/variable-recurring-payments/vrp-payment-conditions/"
exportedAt: "2026-01-13T12:43:18.132Z"
---
Use this feature to ensure that all of your submitted payments fulfill your payment providers' requirements to avoid failed payments.

Payment conditions apply when you create a payment request to initiate a payment with Tink Link and when creating a money transfer.

A payment condition is a combination of a rule, an operator, and a value. These parameters form an evaluation condition that must be fulfilled by data that is sent to a bank, or the request will fail. The value contains the data types (string, integer, regex, list) that should be used to evaluate the condition.

## The problem that payment conditions solves[](#the-problem-that-payment-conditions-solves)

Different payment providers require different conditions to be met to accept a payment. Some examples:

-   The minimum transfer amount is €1 for a specific bank.
-   Payment is only allowed when the payment reference number for a transaction contains a maximum of 50 characters.
-   Payment is only allowed when the recipient name contains a maximum of 70 characters.

By using payment conditions, your payments are never left to chance. Use our endpoint to evaluate that payment-provider conditions are met, in order to avoid failed payments.

## How to use payment conditions[](#how-to-use-payment-conditions)

We offer two ways to use payment conditions. We recommend that you use our endpoint when applicable.

-   **Endpoint**: Use our endpoint to programmatically validate payment conditions, where applicable.
-   **CSV files**: Download and use our lists to create general rules to enforce in your UI.

## UI and UX app considerations[](#ui-and-ux-app-considerations)

![Payment conditions](https://images.ctfassets.net/tmqu5vj33f7w/1kdi2RDop2uCnSaVey8PqT/d9fd414e9729b063a183e79a27f0840d/Payment_conditions.png)

## Endpoint[](#endpoint)

The first image shows a scenario where an end user has selected a payment method but has not manually entered any payment data in your app or in a website.

For this scenario to work, you must programmatically populate all payment-request fields. This can be validated through our payment conditions endpoint. The only thing that remains for the end user to do, is sign the payment.

This scenario is only applicable when you know which provider the end user will select before the payment request is created. This information is determined from the PIS flow that first includes an AIS aggregation (applicable for SE, DE, IT) or by otherwise having access to this information.

### Payment conditions CSV files[](#payment-conditions-csv-files)

We offer [CSV files](#download-payment-conditions-csv-files) as an overview markets in which payment conditions work.

Use the files to find a common denominator and set general rules to enforce in your UI (as seen in the right-hand part of the image above). For example, you can set the max remittance length or minimum payment amount to make sure that a payment is likely to succeed.

The files are intended for use when an end user enters data (for example, amount, recipient name, and remittance) in your app or on your website instead of with Tink, and when the end user's bank is unknown before a payment request is initiated.

## Rule[](#rule)

The rule part of the response provides some contextual information on what data the condition should be evaluated.

| Rule | Description |
| --- | --- |
| REMITTANCE\_INFORMATION\_TYPE | Evaluation of the remittance information type. This is most often associated with the ONE\_OF operator, which specifies a list of supported remittance information types. |
| REMITTANCE\_INFORMATION\_VALUE | Evaluation of the remittance information for account-to-account transfer. Could be to evaluate the length of the message or allowed characters. |
| REFERENCE\_REMITTANCE\_INFORMATION\_VALUE | Evaluation of the REFERENCE remittance information for account-to-account transfer. Could be to evaluate the length of the message or allowed characters. |
| UNSTRUCTURED\_REMITTANCE\_INFORMATION\_VALUE | Evaluation of the UNSTRUCTURED remittance information for account-to-account transfer. Could be to evaluate the length of the message or allowed characters. |
| GIRO\_UNSTRUCTURED\_REMITTANCE\_INFORMATION\_VALUE | Evaluation of the remittance information for bank and post giro specifically. Could be to evaluate the length of the message or allowed characters. **Only applicable for the Swedish market.** |
| INTRA\_BANK\_TRANSFER\_CUTOFF\_TIME | Evaluation of the execution date of the payment/transfer request for transfers between accounts within the same bank. For the Payment Request model, this is the executionDate. For the Transfer model, it is the dueDate. |
| INTER\_BANK\_TRANSFER\_CUTOFF\_TIME | Evaluation of the execution date of the payment/transfer request for transfers between accounts outside of the source bank. For the Payment Request model, this is the executionDate. For the Transfer model, this is the dueDate. |
| GIRO\_CUTOFF\_TIME | Evaluation of the execution date of the payment/transfer request for payments with bank or post giro. **Only applicable for the Swedish market.** |
| SOURCE\_MESSAGE | Evaluation of the source message (the message shown on the user's transaction). Could be to evaluate the length of the message or allowed characters. |
| RECIPIENT\_NAME\_VALUE | Evaluation of the recipient name. This is to evaluate the length of the name. |
| SOURCE\_ACCOUNT\_REQUIRED\_BEFORE\_REDIRECT | Evaluation of the bank's ability to provide account selection within a redirect as controlled by the specific bank, or if source accounts have to be aggregated separately. |
| SOURCE\_ACCOUNT\_PROVIDED\_SKIPS\_AIS | Evaluation of the ability of the bank to skip the AIS SCA if the source account is provided on every journey. |
| RECURRING\_PAYMENT\_ALLOWED\_FREQUENCY | Evaluation of the recurring payment frequency. Will most often be associated with the ONE\_OF operator, which specifies a list of supported frequencies |
| RECURRING\_PAYMENT\_ALLOWED\_PAYMENT\_SCHEME | Evaluating the payment scheme of the recurring payment. Will most often be associated with the ONE\_OF operator, which specifies a list of supported payment schemes. |
| END\_DATE\_REQUIRED\_FOR\_RECURRING\_PAYMENT | Evaluating the requirement of providing end date for the recurring payment. If it is not required, not supplying it will result in infinite recurring payment. |
| RECURRING\_PAYMENT\_ALLOWED\_EXECUTION\_RULE | Evaluating the execution rule of the recurring payment. Will most often be associated with the ONE\_OF operator, which specifies a list of supported execution rules. UNSPECIFIED value means it is optional for recurring payment. |
| RECURRING\_PAYMENT\_FIRST\_PAYMENT\_DATE\_  
MIN\_DAYS\_FROM\_TODAY | Evaluating the first payment date of recurring payment. First payment date must be at least the minimal number of days from today. |
| RECURRING\_PAYMENT\_FIRST\_PAYMENT\_DATE\_  
MAX\_DAYS\_FROM\_TODAY | Evaluating the first payment date of recurring payment. First payment date cannot be more than the maximum number of days from today. |
| SEPA\_PAYMENT\_AMOUNT | Evaluating amount in case of "paymentScheme": "SEPA\_CREDIT\_TRANSFER" |
| SEPA\_INSTANT\_PAYMENT\_AMOUNT | Evaluating amount in case of "paymentScheme": "SEPA\_INSTANT\_CREDIT\_TRANSFER" |
| MULTIBANCO\_PAYMENT\_REFERENCE | Evaluating length of payment reference in case of service-payments, special-service-payments and public-sector-payments. **Only applicable for Multibanco in Portugal.** |
| MULTIBANCO\_PAYMENT\_ENTITY | Evaluating length of payment entity. **Only applicable for Multibanco in Portugal.** |
| FUTURE\_PAYMENT\_DATE | Evaluating the requirement for future date payment if the specific provider has a maximum execution date, if payment is scheduled outside of this period it will fail. Is to be associated with the MAX\_DAYS\_AFTER operator. |
| BULK\_PAYMENT\_MAX\_TOTAL\_AMOUNT | Evaluating total amount for all payments within a bulk. |
| BULK\_PAYMENT\_MAX\_PAYMENTS | Evaluating number of payments within a bulk. |

## Operator[](#operator)

The operator specifies how the evaluation should be performed.

| Operator | Description |
| --- | --- |
| EQUALS | A simple equals comparison between the values. |
| MATCHES | A regular expression evaluation of the data. |
| ONE\_OF | A list of possible valid values to evaluate against. |
| LENGTH\_MIN | The minimum length of a value. |
| LENGTH\_MAX | The maximum length of a value. |
| REQUIRED | Given value is required. |
| MIN\_DAYS\_AFTER | Minimal number of days after date. |
| MAX\_DAYS\_AFTER | Maximum number of days after date. |
| MINIMUM | Minimum value for the field. |
| MAXIMUM | Maximum value for the field. |

## Value[](#value)

The value of a condition is the data that should be used as the counterpart of the input to perform the evaluation.

The value can be of different data types depending on the combination of rule and operator. For example a `ONE_OF` condition would have an array of values to choose from.

## Examples[](#examples)

Calling the payment conditions endpoint with `GET /api/v1/payments/providers/{name}/payment-conditions` will give you the response as follows.

### Response[](#response)

```
{
 "conditions": [
   {
     "rule": "REMITTANCE_INFORMATION_TYPE",
     "operator": "ONE_OF",
     "value": [
       "OCR",
       "UNSTRUCTURED"
     ]
   },
   {
     "rule": "REMITTANCE_INFORMATION_BANK_TRANSFER_VALUE",
     "operator": "LENGTH_MAX",
     "value": 12
   },
   {
     "rule": "GIRO_UNSTRUCTURED_REMITTANCE_INFORMATION_VALUE",
     "operator": "LENGTH_MAX",
     "value": 18
   },
   {
     "rule": "INTER_BANK_TRANSFER_CUTOFF_TIME",
     "operator": "EQUALS",
     "value": "12:45"
   },
   {
     "rule": "INTRA_BANK_TRANSFER_CUTOFF_TIME",
     "operator": "EQUALS",
     "value": "immediate"
   },
   {
     "rule": "GIRO_CUTOFF_TIME",
     "operator": "EQUALS",
     "value": "9:45"
   },
   {
     "rule": "SOURCE_ACCOUNT_REQUIRED_BEFORE_REDIRECT",
     "operator": "EQUALS",
     "value": true
   }
 ],
 "providerId": "nordea-bankid"
}
```

### Parsing a rule example[](#parsing-a-rule-example)

Let's take a look at this condition:

```
{
  "rule": "REMITTANCE_INFORMATION_TYPE",
  "operator": "ONE_OF",
  "value": [
    "OCR",
    "UNSTRUCTURED"
  ]
}
```

In the payment request for this provider, the [`remittanceInformation.type`](/Tiny-doc/tink_docs_api/api/#payment/payment-request/the-payment-request-model/remittanceinformation) should be evaluated for correctness in accordance to the list specified in `value`.

In Java, that would look something like this:

```
List<String> providerSupportedRemittanceInfoTypes = condition.getValue();
if (!providerSupportedRemittanceInfoTypes.contains(
        paymentRequest.getRemittanceInformation().getType())) {
    // Propagate relevant error upwards
}
```

This feature can also be used preemptively by using the conditions to do input validation. For example a `LENGTH_MAX` `REMITTANCE_INFORMATION_VALUE` condition could be used to set the maximum allowed characters for the `remittanceInformation` input field.

### Download payment conditions CSV files[](#download-payment-conditions-csv-files)

**Note**: Make sure to use the latest versions of these files as they are continuously updated by Tink to reflect possible bank-side changes. This is to ensure that you always have access to the most up-to-date and accurate data.

**Note:** these files are updated every day.

| COUNTRIES | CSV FILES |
| --- | --- |
| United Kingdom (GB) | [Download](https://d1k8v7aonx8p37.cloudfront.net/payment_conditions_uk.csv) |
