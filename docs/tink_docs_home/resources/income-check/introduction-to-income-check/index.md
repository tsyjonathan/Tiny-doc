---
title: "Introduction to Income Check - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/income-check/introduction-to-income-check/"
exportedAt: "2026-01-13T12:41:31.287Z"
---
Businesses require an accurate picture of an individual's income, for example, to assess loan applications. Most companies currently rely on a combination of two ways to verify income: credit reference agencies and user-provided material, such as payslips.

![income-check-comparison-of-methods](https://images.ctfassets.net/tmqu5vj33f7w/NnwpIYtJigBNl6VvvNIL8/70b34a63dffdc3935698168240808626/income-check-comparison-of-methods.jpg)

There are significant problems with both. Credit-reference agencies usually depend on tax returns to be able to assess income, and these can be up to a year old. Reviewing payslips or bank statements on the other hand, is a slow, fraud-prone, and tedious process.

For Income Check, Tink solves this by combining robust and reliable open-banking power with sophisticated data science and easily integrated software.

## Easy integration[](#easy-integration)

We deliver Income Check through our [SDK](/Tiny-doc/tink_docs_home/resources/income-check/income-check-sdk-reference/) that uses a single line of code for you to integrate your apps with our platform.

When an end user has consented to share their data and authenticated to their bank, an automated JSON report is made available to you in less than a minute.

![Income-check-flow-SE](https://images.ctfassets.net/tmqu5vj33f7w/oOOm7agiaEVQ1VOwXOwVq/d719e36278bbe6fa9cfd1fe795d45e98/Income-check-flow-SE.gif)

Tink handles the complexities involved with connecting with thousands of banks across Europe, including all connection and authentication methods that risk being updated at any time.

## How does Income Check work?[](#how-does-income-check-work-)

> **Note:** The rest of this article explains the logic behind how Income Check works.

Income Check is used to identify actual income transactions and classify data. We apply data science via our Income Check model which, ultimately, provides you with pure, classified, and reliable income data.

The model discards non-income transactions, including transactions with irregular dates and amounts. Income differs, for example, in payment frequency and amount, which is handled by the model. In other words, Income Check handles a lot of different factors and complexities that would otherwise require manual work, which can lead to human error and even fraud.

**Note**: Income Check is dependent on data quality. Because income is usually stable and recurring, we need adequate transaction data to be able to provide you with accurate and qualitative reports.

### How do we identify and process income?[](#how-do-we-identify-and-process-income-)

After Income Check fetches financial data, the model goes through a couple of processes to produce Income Check data.

First, the model **analyzes data by using a set of features**. The features are the following data attributes:

-   Date
-   Frequency
-   Size
-   Stability
-   Description

Income Check analyzes all transactions and their features to determine what type of income (or no income) each transaction is, based on transaction patterns, feature criteria, and words that are used in transaction descriptions. A different set of criteria are used per class, as each class comes with different identification challenges.

Next, the model **classifies transaction data**:

-   Salary
-   Pension
-   Benefits
-   Cash deposits
-   Other income
-   No income

![How does Income Check work 1](https://images.ctfassets.net/tmqu5vj33f7w/2BXuLeabtqnfvyC6uSfNXh/8fc7b0d4533a96db3f7f4e7ac5d0061c/How_does_Income_Check_Work1.png)

### Classification[](#classification)

Here are some examples of how Income Check identifies transactions as belonging to classes.

**Salary**

-   Transaction example: “salary from Company x”
-   Keywords associated with salary are recognized.
-   Numerical features are analyzed.

**Pension**

-   Transaction example: “pension payout”
-   Income Check analyzes a transaction description and identifies keywords related to pension.

**Benefits**

-   Transaction example: “child support”
-   Benefits, for example, child support and unemployment benefits.

**Cash deposits**

-   Transaction example: “ATM deposit”
-   Income paid out in cash is often detected from a transaction description.

**Other income**

-   Transaction example: “funds from Company x”
-   A transaction description can be generic. In this case, features like transaction frequency and stability are used to identify other income.

**No income**

-   Transaction example: “transfer from Person x”
-   Transfers between people or accounts must not be classified as income.
-   Income Check classifies these transactions as “no income”.

Our granular way of identifying and classifying income provides you with clarity. It allows you to apply your own assessment, as different types of lenders may assess different types of income in different ways.

### Can you tell me more about the Income Check model?[](#can-you-tell-me-more-about-the-income-check-model-)

Our model is continuously updated by using new transactional data. We do this to keep performance on top and to account for underlying data changes, which could range from new pension actors entering a market to shifts in benefit payouts. Part of the model training is model performance evaluation, where we verify that changes that have been introduced to the model have led to performance improvement.

#### Model performance evaluation[](#model-performance-evaluation)

The metrics that we use to evaluate model performance are **accuracy**, **precision**, and **recall**. These metrics are derived from the **confusion matrix**. This is a matrix that tells us how we are right or wrong when classifying the income type (or no income) for a set of transactions. The confusion matrix summarizes the number of correct and incorrect transaction classifications.

![How does Income Check work 3](https://images.ctfassets.net/tmqu5vj33f7w/1ZQZ58BosYuE1qDOqp2FzH/dc1b52cd468ec5633bc3e16d0a5ab8d0/How_does_Income_Check_Work3.png)

-   True positives (TP): transactions correctly predicted as income
-   True negatives (TN): transactions correctly predicted as not being income
-   False positives (FP): transactions incorrectly predicted as income
-   False negatives (FN): transactions incorrectly predicted as not being income

#### How do you define accuracy, precision, and recall?[](#how-do-you-define-accuracy-precision-and-recall-)

**Accuracy** is the share of correctly predicted transactions. Accuracy provides us with an understanding of certainty in the Income Check model and how well we can trust our classifications.

![How does Income Check work 4](https://images.ctfassets.net/tmqu5vj33f7w/1b21KlH5syGpHMpBQl1anD/3d118da8bd486922b05b28cd8368e8ea/How_does_Income_Check_Work4.png)

**Precision** lets us know how certain we can be that transactions that have been predicted as income are actually income. High precision means we can trust the Income Check classifications of a person’s income.

![How does Income Check work 5](https://images.ctfassets.net/tmqu5vj33f7w/2xkn97skngEVpnvMWlPD3J/04be02f8f6cc6ece006df360ea3d38ea/How_does_Income_Check_Work5.png)

**Recall** tells us how good our model is at identifying transactions as income. High recall means that no income transactions are missed.

![How does Income Check work 6](https://images.ctfassets.net/tmqu5vj33f7w/6ZyUNO1rTXPixjWjbyYyar/d3b01eb567d696c67f7b9aacd91b070c/How_does_Income_Check_Work6.webp)
