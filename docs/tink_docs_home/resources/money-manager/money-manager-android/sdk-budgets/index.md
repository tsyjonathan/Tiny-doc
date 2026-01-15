---
title: "Budgets for Android - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-android/sdk-budgets/"
exportedAt: "2026-01-13T12:51:45.071Z"
---
![Budgets](https://images.ctfassets.net/tmqu5vj33f7w/6FvowWrgaObG3fTvFv6xHU/1cbf30788d562b7dd6d6464ccdbd132c/Budgets_Android.png)

## Overview[](#overview)

Budgets are a great tool for your app's users to get a nice overview of their spendings of a specific category, a collection of categories or even a keyword pointing to a transaction, like "Apple Inc.". Budgets can be weekly, monthly or yearly. The user can also create one off budgets for a specific time period.

## Displaying budgets[](#displaying-budgets)

To display a user's budgets in a list without launching the finance overview screen, use the Budgets entrypoint. The user can select a budget to view budget details and to edit or delete it. The budgets entrypoint also lets the user create a new budget. If the user has not created any budgets, an empty state will be displayed. To display the Budgets entrypoint, create an instance of `EntryPoint.Budgets` and pass it to the `TinkMoneyManager.init(...)` method.

```
val budgetsEntryPoint = EntryPoint.Budgets

    TinkMoneyManager.init(
        accessToken = "myAccessToken", // A valid access token.
        styleResId = R.style.MyCustomTinkMoneyManagerStyle, // Resource ID of your style that extends TinkMoneyManagerStyle.
        tracker = myTracker, // Your event tracking implementation (optional).
        backPressedListener = myBackPressedListener, // Your back press listener (optional).
        editPendingTransaction = false, // Determines if pending transactions can be recategorized. Defaults to true.
        enableTransactionDetail = false, // Determines the behaviour of the SDK when the user clicks on a transaction. Defaults to true.
        entryPoint = budgetsEntryPoint, // The Money Manager feature to launch.
        containerId = R.id.fragmentContainer, // The resource ID of the container which will contain the Tink Fragment.
        fragmentManager = supportFragmentManager // The FragmentManager which performs the Tink fragment transaction.
    )
```
