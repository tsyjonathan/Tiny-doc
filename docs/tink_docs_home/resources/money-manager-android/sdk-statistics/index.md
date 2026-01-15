---
title: "Statistics for Android - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-android/sdk-statistics/"
exportedAt: "2026-01-13T13:01:00.188Z"
---
*Image removed: Statistics*

## Overview[](#overview)

Statistics contain derived data from different types of information which is available for a user.

## Displaying category statistics[](#displaying-category-statistics)

To display the statistics without launching the finance overview screen, use the statistics entrypoint. The statistics entrypoint displays an interface for browsing combined sum of categories by month. It requires you to provide which type of categories to display statistics for: income, expenses, safe to spend or left to spend. The statistics are visualized in a pie chart.

```
val expensesEntryPoint = EntryPoint.Statistics(
    ChartType.EXPENSES
)

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
