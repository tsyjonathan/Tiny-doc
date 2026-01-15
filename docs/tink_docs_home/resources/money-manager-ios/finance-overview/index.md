---
title: "Finance overview for iOS - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-ios/finance-overview/"
exportedAt: "2026-01-13T12:58:43.746Z"
---
![Financial overview](https://images.ctfassets.net/tmqu5vj33f7w/fpq14Ktpixy1pvgIbDxmU/b7bd26b064a327ae45104010cbe37792/Financial_overview.png)

## Overview[](#overview)

The Finance Overview is a collection of your app's Money Manager features. Here you can choose to display statistics for income and expenses, accounts, latest transactions, and actionable insights. It's completely up to you which of these to include or exclude in your app.

## Displaying the Finance Overview[](#displaying-the-finance-overview)

Create a `FinanceOverviewViewController` and provide which sections should be displayed. The `FinanceOverviewViewController` is designed to be used inside of a `UINavigationController` so when your app's user selects e.g. an account from the overview, it will try to show a detail view to the user. If you wish, you can then add it to e.g. a `UITabBarController`.

```
let financeOverviewViewController = FinanceOverviewViewController(features: [.actionableInsights(delegate: self), .statistics([.expenses, .income]), .accounts, .latestTransactions])
let navigationController = UINavigationController(rootViewController: financeOverviewViewController)
tabBarController.viewControllers?.append(navigationController)
```

> **Note:** The order of the items in the `features` parameter also determines the order that the features are laid out in `FinanceOverviewViewController`.

## Features[](#features)

### Statistics[](#statistics)

Add statistics to display an overview of expenses, incomes, safe to spend and left to spend through pie charts. When selecting a pie chart, your app's user will see a detailed view of their spending, income, safe to spend or left to spend statistics. [Read more about statistics here](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-ios/statistics/).

### Accounts[](#accounts)

Adding accounts to your apps finance overview allows your users to have a clear overview of their account balances. [Read more about accounts here](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-ios/accounts/).

### Latest transactions[](#latest-transactions)

The latest transactions section of your app's finance overview shows a list of the three last transactions made. From there, your user can navigate to a transaction list and view all of their transactions, nicely ordered by date.

### Recurring Expenses[](#recurring-expenses)

The recurring expenses section of your app's finance overview shows a list of the three predicted recurring expenses. From there, your user can navigate to a recurring expenses list and view all of their predicted recurring expenses for the next 30 days, nicely ordered by date.

### Subscriptions[](#subscriptions)

The Subscriptions tool is designed to help you, and your end-users, get a clear understanding of your active subscriptions and their associated costs on a monthly, quarterly, and annual basis.

### Actionable Insights[](#actionable-insights)

The actionable insights in your finance overview will notify your app's users when there are new insights to take action on.

### Budgets[](#budgets)

Let your users create budgets and track them on the overview.

### Custom views[](#custom-views)

Display your own views in the `FinanceOverviewViewController`. Use the `custom` feature and an associated `UIView` value with `intrinsicContentSize` or size constraints set up.

## Configuration[](#configuration)

### Configuring transaction item action[](#configuring-transaction-item-action)

The `transactionItemAction` property on the `FinanceOverviewViewController`'s `configuration` lets you configure what should happen when a transaction is selected.

It can be set to either show transaction details:

```
financeOverviewViewController.configuration.transactionItemAction = .showDetails
```

The details view displays more information about the transaction and lets the user edit or recategorize the transaction. Read more about the [transaction details here](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-ios/pfm-sdk-ios-transaction-details/):

Or the categorization flow:

```
financeOverviewViewController.configuration.transactionItemAction = .categorize
```

The `categorize` action lets the user choose a new category for the selected transaction directly from one of the transaction lists. Read more about [categorization here](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-ios/categorization/).

### Pending transactions[](#pending-transactions)

Transactions that are not yet confirmed by the user's bank or can change in the future are called pending transactions. We use a different design to show that transactions are in this state. By default, they can be edited like any other transaction, however you can configure this setting if you want to limit your users before a transactions is in it's final state.

![iOS Pending trx list](https://images.ctfassets.net/tmqu5vj33f7w/5n2HiH5KQYlrRNPmBLpfY1/a56c826b46ea434caff26babab769993/iOSPending.png)

To prevent the end user to edit a pending transaction, change the status of `editingPendingTransactions` to `.disabled`:

```
financeOverviewViewController.configuration.editingPendingTransactions = .disabled
```

### Predicted Recurring Expenses in All Transactions screen[](#predicted-recurring-expenses-in-all-transactions-screen)

The `showRecurringExpenses` property on the `FinanceOverviewViewController`'s `configuration` lets you configure if recurring expenses should be show in All Transactions screen. By default, this propery set to `false`

To enable it, set the configuration option `showRecurringExpenses` to `true`:

```
financeOverviewViewController.configuration.showRecurringExpenses = true
```

### Subscriptions Overview in Statistics[](#subscriptions-overview-in-statistics)

The `showSubscriptionsInStatistics` property on the `FinanceOverviewViewController`'s `configuration` lets you configure if subscriptions overview should be show in Expenses section of Statistics. By default, this propery set to `false`

To enable it, set the configuration option `showSubscriptionsInStatistics` to `true`:

```
financeOverviewViewController.configuration.showSubscriptionsInStatistics = true
```
