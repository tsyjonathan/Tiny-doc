---
title: "Transactions for Android - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-android/sdk-transactions/"
exportedAt: "2026-01-13T12:51:48.964Z"
---
*Image removed: Transactions*

## Overview[](#overview)

The transactions screen presents a list of transactions, allowing users to select and edit them. By default, it collects transactions from all of the user's accounts into a single list, enabling actions such as modifying the transaction category.

## Displaying transactions[](#displaying-transactions)

To display a transaction list without launching the finance overview screen, create an `Entrypoint.Transactions` instance and provide a title for the page.

```
val transactionsEntryPoint = EntryPoint.Transactions(
    title = "Transactions",
)

TinkMoneyManager.init(
    accessToken = "myAccessToken", // A valid access token.
    styleResId = R.style.MyCustomTinkMoneyManagerStyle, // Resource ID of your style that extends TinkMoneyManagerStyle.
    tracker = myTracker, // Your event tracking implementation (optional).
    backPressedListener = myBackPressedListener, // Your back press listener (optional).
    editPendingTransaction = false, // Determines if pending transactions can be recategorized. Defaults to true.
    enableTransactionDetail = false, // Determines the behaviour of the SDK when the user clicks on a transaction. Defaults to true.
    entryPoint = transactionsEntryPoint, // The Money Manager feature to launch.
    containerId = R.id.fragmentContainer, // The resource ID of the container which will contain the Tink Fragment.
    fragmentManager = supportFragmentManager // The FragmentManager which performs the Tink fragment transaction.
)
```

By default this will display all the user's transactions. You can specify multiple query parameters if you want to filter what transactions to display in the transaction list. For example, say you want transactions from a specific account that has a certain category:

```
val transactionsEntryPoint = EntryPoint.Transactions(
    title = "All transactions",
    accounts = listOf(accountID),
    categories = listOf(categoryID)
)
```

Refer to the API documentation for the `EntryPoint.Transactions` class for more details on what kind of querying you can do.
