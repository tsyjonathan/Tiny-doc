---
title: "Categorization for iOS - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-ios/categorization/"
exportedAt: "2026-01-13T13:00:16.120Z"
---
![Categorization](https://images.ctfassets.net/tmqu5vj33f7w/7tEodCDNEJlTwXc8W2AoAf/b5400c4f6447b9cbc75921d09f8a4777/Categorization.png)

## Overview[](#overview)

With Money Manager SDK, recategorizing transactions is done with a few quick steps. The `CategorizeTransactionViewController` will display an interface for recategorizing a transaction. After the user selects a category you may also display similar transactions that the user can choose to recategorize as well.

When using other features of the SDK it will present the `CategorizeTransactionViewController` automatically when the user selects a transaction. For example, if the user selects one of the latest transactions in the Finance Overview or a transaction from one of the categories in the Statistics, it will let the user recategorize that transaction.

## Displaying the categorization interface[](#displaying-the-categorization-interface)

> **Note:** This view controller is designed to be presented modally.

Provide the `id` of the transaction you want to categorize and which category types you want the user to choose categories from. For example, if the transaction has a negative amount you might only want to allow the transaction to be recategorized as an expense or a transfer category.

```
let categorizeTransactionViewController = CategorizeTransactionViewController(
    transactionID: transactionID,
    categoryTypes: [.expenses, .transfers]
)
present(categorizeTransactionViewController, animated: true)
```

## Dismissing the categorization interface[](#dismissing-the-categorization-interface)

If you want to handle what should happen after the transaction has been categorized or if the user taps the cancel button, you need to implement the `CategorizeTransactionViewControllerDelegate`. By default the view controller will dismiss itself when the user taps the cancel button but you might also want to customize what should happen when the transaction was categorized or if an error occurred.

```
categorizeTransactionViewController.categorizeTransactionDelegate = self
```

```
extension ViewController: CategorizeTransactionViewControllerDelegate {
   func categorizeTransactionViewController(_ controller: CategorizeTransactionViewController, willCategorizeAs category: Category) {
   
   }

   func categorizeTransactionViewController(_ controller: CategorizeTransactionViewController, didCategorize transactionIDs: [Transaction.ID], category: Category) {
       dismiss(animated: true)
   }

   func categorizeTransactionViewController(_ controller: CategorizeTransactionViewController, didFailWithError error: Error) {
       // Handle the error.
   }

   func categorizeTransactionViewControllerDidCancel(_ controller: CategorizeTransactionViewController) {
       dismiss(animated: true)
   }
}
```
