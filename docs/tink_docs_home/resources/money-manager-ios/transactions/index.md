---
title: "Transactions for iOS - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-ios/transactions/"
exportedAt: "2026-01-13T13:00:21.920Z"
---
![Transactions](https://images.ctfassets.net/tmqu5vj33f7w/32Sh66DIv9t8T4objaSTbN/0a455688ea74b601c5929670b73ec59e/Transactions.png)

## Overview[](#overview)

Use the `TransactionsViewController` when you want to display a list of transactions and let the user select one of them. The transactions view controller collects transactions from all of the user's accounts in a single list. From there the user can e.g. change the category of the transaction.

## Displaying transactions[](#displaying-transactions)

To display a transaction list, simply instantiate a `TransactionsViewController`.

```
let transactionsViewController = TransactionsViewController()
show(transactionsViewController, sender: self)
```

By default this will display all the user's transactions. You can specify a `TransactionsQuery` if you want to filter what transactions to display in the transaction list. For example, say you want transactions from a specific account that has a certain category:

```
let query = TransactionsQuery()
query.accountIDs = [accountID]
query.categoryIDs = [categoryID]

let transactionsViewController = TransactionsViewController(query: query)
```

Refer to documentation on `TransactionsQuery` for more details on what kind of querying you can do.

## Responding to User Selection[](#responding-to-user-selection)

To respond to the selection of a transaction you must provide a delegate that conforms to the `TransactionsViewControllerDelegate`.

```
extension ViewController: TransactionsViewControllerDelegate {
     func transactionsViewController(_ viewController: TransactionsViewController, didSelectTransaction transaction: Transaction) {
          // Handle selection
     }
}
```

`TransactionsViewController` clears its selection every time the list is displayed, so if you pushed a new view controller in response to a transaction being selected the transaction will be deselected when the user goes back to the transaction list.

If you present a modal in response to a transaction selection you might need to deselect the transaction when the modal is dismissed depending on the presentation style. To do that you can call the `clearSelection(animated:)` method.

```
transactionsViewController.clearSelection(animated: true)
```

## Predicted Recurring Expenses in All Transactions screen[](#predicted-recurring-expenses-in-all-transactions-screen)

The `showRecurringExpenses` property on the `FinanceOverviewViewController`'s `configuration` lets you configure if recurring expenses should be show in All Transactions screen. By default, this propery set to `false`

To enable it, set the configuration option `showRecurringExpenses` to `true`:

```
financeOverviewViewController.configuration.showRecurringExpenses = true
```
