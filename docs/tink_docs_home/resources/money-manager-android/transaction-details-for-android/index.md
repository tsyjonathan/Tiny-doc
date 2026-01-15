---
title: "Transaction details for Android - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-android/transaction-details-for-android/"
exportedAt: "2026-01-13T12:59:15.462Z"
---
*Image removed: Transaction details*

## Overview[](#overview)

The transaction-details feature lets the user display a selected transaction on a separate screen. From this screen, the user can edit and recategorize the transaction.

## Configuration[](#configuration)

You can choose the behavior of the Money Manager SDK when a user selects a transaction. The default behavior is to open the transaction details screen, and it's also possible to choose to always show the edit category screen.

To always show the edit category screen, make sure that the **isTransactionDetailsEnabled** value for `FinanceOverviewFragment` is set to false. For example:

```
FinanceOverviewFragment.newInstance(
                accessToken = accessToken,
                styleResId = R.style.TinkStyle_ChewingGum,
                tracker = LogTracker(),
                overviewFeatures = getOverviewFeatures(),
                isEditableOnPendingTransaction = true,
                isTransactionDetailsEnabled = false
                )
```
