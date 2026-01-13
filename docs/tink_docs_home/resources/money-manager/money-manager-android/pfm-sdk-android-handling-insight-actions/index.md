---
title: "Actionable Insights for Android - Tink Docs"
source: "https://docs.tink.com/resources/money-manager/money-manager-android/pfm-sdk-android-handling-insight-actions"
exportedAt: "2026-01-13T12:51:40.525Z"
---
![Actionable insights](https://images.ctfassets.net/tmqu5vj33f7w/6hWc7Y7AgAMdvzBrKWwXWK/2f88a9ccf106b3a1fefd5832ec7e6415/Android_MM_insights.png)

## Overview[](#overview)

Actionable Insights is a tool for your users to increase their engagement through relevant feedback and advice, regarding their financial status and behavior. The feedback is actionable, where proposed actions are aiming to guide users to a better financial situation.

An example of an insight could be that a user has a low balance on one of their bank accounts where the action could be to transfer money to that account. Another example could be to encourage a user to save more money by creating a budget for a specific category.

## Displaying an actionable insight list[](#displaying-an-actionable-insight-list)

To display the actionable insights without launching the finance overview screen, create an instance of `EntryPoint.ActionableInsights` and pass it to the `TinkMoneyManager.init(...)` method.

```
val insightsEntrypoint = EntryPoint.ActionableInsights(
    insightActionHandler = myInsightActionHandler, //The optional InsightActionHandler implementation for custom handling of insight actions.
    showArchiveButton = true // A boolean value for showing the 'archived insights' button in the toolbar. Defaults to true.
)

TinkMoneyManager.init(
    accessToken = "myAccessToken", // A valid access token.
    styleResId = R.style.MyCustomTinkMoneyManagerStyle, // Resource ID of your style that extends TinkMoneyManagerStyle.
    tracker = myTracker, // Your event tracking implementation (optional).
    backPressedListener = myBackPressedListener, // Your back press listener (optional).
    editPendingTransaction = false, // Determines if pending transactions can be recategorized. Defaults to true.
    enableTransactionDetail = false, // Determines the behaviour of the SDK when the user clicks on a transaction. Defaults to true.
    entryPoint = insightsEntrypoint, // The Money Manager feature to launch.
    containerId = R.id.fragmentContainer, // The resource ID of the container which will contain the Tink Fragment.
    fragmentManager = supportFragmentManager // The FragmentManager which performs the Tink fragment transaction.
)
```

## Responding to User Actions[](#responding-to-user-actions)

Money Manager SDK allows you to add your own action handlers to perform the necessary logic when the user selects an action for an insight that requires more user interaction.

```
class MyInsightActionHandler : InsightActionHandler{
    // add your own action handlers here
}
```

If you are displaying the actionable insights in the finance overview then add your `InsightActionHandler`to the `EntryPoint.Overview` instance.

```
// Finance Overview

val overviewEntrypoint = EntryPoint.Overview(
    overviewFeatures = OverviewFeatures(
        listOf(
            OverviewFeature.ActionableInsights
        )
    ),
    insightActionHandler = MyInsightActionHandler()
)
```

If you are displaying the actionable insights as an entrypoint then add your `InsightActionHandler`to the `EntryPoint.ActionableInsights` instance.

```
// Entrypoint

val insightsEntrypoint = EntryPoint.ActionableInsights(
    insightActionHandler = MyInsightActionHandler(), //The optional InsightActionHandler implementation for custom handling of insight actions.
    showArchiveButton = true // A boolean value for showing the 'archived insights' button in the toolbar. Defaults to true.
)
```

Adding your own action handler is optional and if not set, the SDK will use the default internal action handler to handle the insight actions.

### Default Action Handling[](#default-action-handling)

The SDK provides default implementations for many of the actions a user can take. For example the SDK can show a list of transactions or present UI for categorizing a transaction. See the [Insight actions and associated callback methods](#insight_actions_callback_methods) section for more information.

### Override Action Handling[](#override-action-handling)

For actions that have no default handling there are methods that can be overridden when implementing the `InsightActionHandler` interface:

```
override fun initiateTransfer(sourceUri: String?, sourceAccountNumber: String?, destinationUri: String?, destinationAccountNumber: String?, amount: Amount?,
                                  onComplete: (isActionDone: Boolean) -> Unit
): Boolean {
    // your custom logic for initiating a transfer here
    return true
}

override fun refreshCredentials(credentialId: String, onComplete: (isActionDone: Boolean) -> Unit
): Boolean {
    // your custom logic for refreshing credentials here
    return true
}
```

> **Note:** All the methods have a Boolean return type to indicate if the action is handled by this handler or not. If you are overriding a method to perform custom logic for the action, the method should return `true`.

> **Note:** For methods with a `onComplete` lambda block parameter, you have to invoke the lambda block when the task related to the requested action has completed or been cancelled.
> 
> -   If the action has completed successfully, the block can be invoked with the boolean value set to `true`. Eg: onComplete.invoke(true)
> -   If the action has failed or is cancelled, the block can be invoked with the boolean value set to `false`. Eg: onComplete.invoke(false)
> -   If you don’t invoke the `onComplete` block, the insight will remain in the list and will not be archived.

### Insight actions and associated callback methods[](#insight-actions-and-associated-callback-methods)

#### Explanation of the different action types below this chart.[](#explanation-of-the-different-action-types-below-this-chart-)

| Insight Type | Action Type | Callback Method | Default Action Handling |
| --- | --- | --- | --- |
| `ACCOUNT_BALANCE_LOW` | `CREATE_TRANSFER` | `fun initiateTransfer(...):Boolean` | NO |
| `AGGREGATION_REFRESH_PSD2_CREDENTIAL` | `REFRESH_CREDENTIAL` | `fun refreshCredentials(...):Boolean` | NO |
| `BUDGET_CLOSE_NEGATIVE` | `VIEW_BUDGET` | `fun viewBudget(...):Boolean` | YES |
| `BUDGET_CLOSE_POSITIVE` | `VIEW_BUDGET` | `fun viewBudget(...):Boolean` | YES |
| `BUDGET_OVERSPENT` | `VIEW_BUDGET` | `fun viewBudget(...):Boolean` | YES |
| `BUDGET_SUCCESS` | `VIEW_BUDGET` | `fun viewBudget(...):Boolean` | YES |
| `BUDGET_SUGGEST_CREATE_FIRST` | `CREATE_BUDGET` | `fun createBudget(...):Boolean` | YES |
| `BUDGET_SUGGEST_CREATE_TOP_CATEGORY` | `CREATE_BUDGET` | `fun createBudget(...):Boolean` | YES |
| `BUDGET_SUGGEST_CREATE_TOP_PRIMARY_CATEGORY` | `CREATE_BUDGET` | `fun createBudget(...):Boolean` | YES |
| `BUDGET_SUMMARY_ACHIEVED` | `CREATE_TRANSFER` | `fun initiateTransfer(...):Boolean` | NO |
| `BUDGET_SUMMARY_OVERSPENT` | `ACKNOWLEDGE` | \- | YES |
| `CREDIT_CARD_LIMIT_CLOSE` | `VIEW_ACCOUNT` | `fun viewAccount(...):Boolean` | YES |
| `CREDIT_CARD_LIMIT_REACHED` | `VIEW_ACCOUNT` | `fun viewAccount(...):Boolean` | YES |
| `DOUBLE_CHARGE` | `VIEW_TRANSACTIONS` | `fun viewTransactions(...):Boolean` | YES |
| `LARGE_EXPENSE` | `VIEW_TRANSACTION` | `fun viewTransactions(...):Boolean` | YES |
| `LEFT_TO_SPEND_NEGATIVE` | `VIEW_LEFT_TO_SPEND` | `fun viewLeftToSpend(...):Boolean` | YES |
| `LEFT_TO_SPEND_NEGATIVE_BEGINNING_MONTH` | `VIEW_LEFT_TO_SPEND` | `fun viewLeftToSpend(...):Boolean` | YES |
| `LEFT_TO_SPEND_NEGATIVE_MID_MONTH` | `VIEW_LEFT_TO_SPEND` | `fun viewLeftToSpend(...):Boolean` | YES |
| `LEFT_TO_SPEND_NEGATIVE_SUMMARY` | `VIEW_LEFT_TO_SPEND` | `fun viewLeftToSpend(...):Boolean` | YES |
| `LEFT_TO_SPEND_POSITIVE_BEGINNING_MONTH` | `VIEW_LEFT_TO_SPEND` | `fun viewLeftToSpend(...):Boolean` | YES |
| `LEFT_TO_SPEND_POSITIVE_FINAL_WEEK` | `VIEW_LEFT_TO_SPEND` | `fun viewLeftToSpend(...):Boolean` | YES |
| `LEFT_TO_SPEND_POSITIVE_MID_MONTH` | `VIEW_LEFT_TO_SPEND` | `fun viewLeftToSpend(...):Boolean` | YES |
| `LEFT_TO_SPEND_POSITIVE_SUMMARY_SAVINGS_ACCOUNT` | `CREATE_TRANSFER` | `fun initiateTransfer(...):Boolean` | NO |
| `MONTHLY_SUMMARY_EXPENSES_BY_CATEGORY` | `VIEW_TRANSACTIONS_BY_CATEGORY` | `fun viewTransactionsByCategory(...):Boolean` | YES |
| `MONTHLY_SUMMARY_EXPENSE_TRANSACTIONS` | `VIEW_TRANSACTIONS` | `fun viewTransactions(...):Boolean` | YES |
| `NEW_INCOME_TRANSACTION` | `VIEW_TRANSACTIONS` | `fun viewTransactions(...):Boolean` | YES |
| `SINGLE_UNCATEGORIZED_TRANSACTION` | `CATEGORIZE_EXPENSE` | `fun categorizeExpense(...):Boolean` | YES |
| `SPENDING_BY_CATEGORY_INCREASED` | `VIEW_TRANSACTIONS` | `fun viewTransactions(...):Boolean` | YES |
| `SPENDING_BY_PRIMARY_CATEGORY_INCREASED` | `VIEW_TRANSACTIONS_BY_CATEGORY` | `fun viewTransactionsByCategory(...):Boolean` | YES |
| `SUGGEST_SET_UP_SAVINGS_ACCOUNT` | `CREATE_TRANSFER` | `fun initiateTransfer(...):Boolean` | NO |
| `WEEKLY_SUMMARY_EXPENSES_BY_DAY` | `ACKNOWLEDGE` | \- | YES |
| `WEEKLY_SUMMARY_EXPENSE_TRANSACTIONS` | `VIEW_TRANSACTIONS` | `fun viewTransactions(...):Boolean` | YES |
| `WEEKLY_SUMMARY_EXPENSES_BY_CATEGORY` | `VIEW_TRANSACTIONS_BY_CATEGORY` | `fun viewTransactionsByCategory(...):Boolean` | YES |
| `WEEKLY_UNCATEGORIZED_TRANSACTIONS` | `CATEGORIZE_TRANSACTIONS` | `fun categorizeTransactions(...):Boolean` | NO \[1\] |

`[1]` The default action handling for CATEGORIZE\_TRANSACTIONS shows a list of the transactions to recategorize.

#### Actionable Insight actions:[](#actionable-insight-actions-)

| Type | Action |
| --- | --- |
| `ACKNOWLEDGE` | Affirmative response type, archives the insight. |
| `CATEGORIZE_EXPENSE` | Lets the user categorize a transaction that is uncategorized. |
| `CATEGORIZE_TRANSACTIONS` | Asks the user to categorize a set of transactions that are uncategorized. **Not supported by Money Manager SDK for Android.** \[1\] |
| `CREATE_BUDGET` | Lets the user create a new budget. |
| `CREATE_TRANSFER` | Initiate a transfer from a provided source account - **Not supported by Money Manager SDK for Android.** |
| `DISMISS` | Dismisses and archives an insight. |
| `REFRESH_CREDENTIAL` | Refresh expired credentials - **Not supported by Money Manager SDK for Android.** |
| `VIEW_ACCOUNT` | Displays an overview of an account. |
| `VIEW_BUDGET` | Navigates and displays the progress of a specific budget. |
| `VIEW_LEFT_TO_SPEND` | Displays a left to spend view based on the income and expenses. |
| `VIEW_TRANSACTION` | Displays the details of a specific transaction. |
| `VIEW_TRANSACTIONS` | Displays a list of transactions. |
| `VIEW_TRANSACTIONS_BY_CATEGORY` | Displays a list of transactions from a specific category. |

`[1]` The default action handling for CATEGORIZE\_TRANSACTIONS shows a list of the transactions to recategorize.

## Customization[](#customization)

### Overriding Default Action Handling[](#overriding-default-action-handling)

To provide your own UI for an action that has default handling, override the relative callback method in your own implementation of the `InsightActionHandler` interface.

```
class MyActionHandler(val navController: NavController) : InsightActionHandler() {
    override fun viewTransactions(transactionIds: List<String>): Boolean {
        navController.navigate(MyTransactionListFragment.newInstance(transactionIds))
        return true
    }
}
```

### Handling Disabled Insights[](#handling-disabled-insights)

If your app doesn't support some actions and you've disabled the insights for these actions in the [Console](https://console.tink.com/), you do not need to implement the corresponding callback method.
