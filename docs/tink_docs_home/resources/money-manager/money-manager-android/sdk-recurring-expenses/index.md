---
title: "Recurring Expenses for Android - Tink Docs"
source: "https://docs.tink.com/resources/money-manager/money-manager-android/sdk-recurring-expenses"
exportedAt: "2026-01-13T12:52:00.897Z"
---
![Recurring Expenses](https://images.ctfassets.net/tmqu5vj33f7w/2otQWAVVng7KYbCVbmdmHG/072c878e5603a56c5417a8e18dc81bf7/android_recurring_expenses.png)

## Overview[](#overview)

Recurring Expenses is a great visual tool for your app's users to see their predicted recurring expenses going to occur in upcoming days (default is 30 days) based on their spending. The feature is being represented as a vertical list of categories, where each of those displays information about amount and date.

To display the `RecurringExpenses` as an entry point, create an instance of `EntryPoint.RecurringExpenses` and pass it to the `TinkMoneyManager.init(...)` method.

```
val recurringExpensesEntryPoint = EntryPoint.RecurringExpenses

   TinkMoneyManager.init(
        accessToken = "myAccessToken", // A valid access token.
        styleResId = R.style.MyCustomTinkMoneyManagerStyle, // Resource ID of your style that extends TinkMoneyManagerStyle.
        tracker = myTracker, // Your event tracking implementation (optional).
        backPressedListener = myBackPressedListener, // Your back press listener (optional).
        editPendingTransaction = false, // Determines if pending transactions can be recategorized. Defaults to true.
        enableTransactionDetail = false, // Determines the behaviour of the SDK when the user clicks on a transaction. Defaults to true.
        enableRecommendedBudget = true, // Determines if SDK can show Recommended Budgets. Defaults to true.
        enableBudgetCreationSuccessScreen = true, // Determines if SDK can show Budget Confirmation Screen. Defaults to true.
        enableSafeToSpend = true, // Determines if SDK can show Recurring expense in Transaction list. Defaults to true. 
        entryPoint = overviewEntrypoint, // The Money Manager feature to launch.
        containerId = R.id.fragmentContainer, // The resource ID of the container which will contain the Tink Fragment.
        fragmentManager = supportFragmentManager // The FragmentManager which performs the Tink fragment transaction.
    )
```
