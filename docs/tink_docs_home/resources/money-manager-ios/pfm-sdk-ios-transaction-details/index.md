---
title: "Transaction details for iOS - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-ios/pfm-sdk-ios-transaction-details/"
exportedAt: "2026-01-13T13:00:19.859Z"
---
*Image removed: Transaction details*

## Overview[](#overview)

Use the `TransactionDetailsViewController` when you want to display information about a particular transaction. From this view controller, the user can also categorize or edit the transaction.

## Displaying a transaction[](#displaying-a-transaction)

To display the details about a transaction, create a `TransactionDetailsViewController`.

When creating the view controller, you specify the ID for which transaction to display.

```
let transactionDetailsViewController = TransactionDetailsViewController(transactionID: <#T##Transaction.ID#>)
show(transactionDetailsViewController, sender: <#Any#>)
```

## Editing a transaction[](#editing-a-transaction)

Use the `EditTransactionViewController` when you want to let the user edit a transaction.

```
let editViewController = EditTransactionViewController(transaction: <#Transaction#>)
let navigationController = UINavigationController(rootViewController: editViewController)
show(navigationController, sender: <#Any#>)
```

> **Note:** This view controller is designed to be used in a `UINavigationController`.

Set the delegate property to respond to events. For example to dismiss the view controller when the user is done editing.

```
editViewController.delegate = self
```

```
extension ViewController: EditTransactionViewControllerDelegate {
    func editTransactionViewControllerDidCancel(_ viewController: EditTransactionViewController) {
        dismiss(animated: true)
    }

    func editTransactionViewControllerDidEditSuccessfully(_ viewController: EditTransactionViewController, transaction: Transaction) {
        dismiss(animated: true)
    }
}
```
