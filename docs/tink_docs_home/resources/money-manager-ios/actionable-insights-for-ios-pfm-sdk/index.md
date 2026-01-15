---
title: "Actionable Insights for iOS - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-ios/actionable-insights-for-ios-pfm-sdk/"
exportedAt: "2026-01-13T13:00:11.593Z"
---
![Actionable insights](https://images.ctfassets.net/tmqu5vj33f7w/2n3LTfV6OQay5R5psf4IBt/d79756c7c5ccbc76eace4b0851e09667/Actionable_insights.png)

## Overview[](#overview)

Actionable Insights is a tool for your users to increase their engagement through relevant feedback and advice, regarding their financial status and behavior. The feedback is actionable, where proposed actions are aiming to guide users to a better financial situation.

An example of an insight could be that a user has a low balance on one of their bank accounts where the action could be to transfer money to that account. Another example could be to encourage a user to save more money by creating a budget for a specific category.

## Displaying Actionable Insights[](#displaying-actionable-insights)

To display the Actionable Insights, create an instance of `ActionableInsightsViewController` and present it. You also need to specify its delegate upon initialization.

```
let actionableInsightsViewController = ActionableInsightsViewController(delegate: actionableInsightsDelegate)
let navigationController = UINavigationController(rootViewController: actionableInsightsViewController)
```

If the `ActionableInsightsViewController` is presented in a `UINavigationController` it will be configured with a title and show a button to let the user view their archived insights.

## Responding to User Actions[](#responding-to-user-actions)

Before you can create a view controller that displays actionable insights you need an object that conforms to the `ActionableInsightsViewControllerDelegate` protocol.

```
class ActionableInsightsCoordinator: ActionableInsightsViewControllerDelegate {
    // Implement delegate functions. 
}
```

This object is used to respond to user actions related to insights that requires more user interaction.

### Default Action Handling[](#default-action-handling)

The `ActionableInsightsViewControllerDelegate` protocol provides default implementations for many of the actions a user can take. For example the SDK can show a list of transactions or present UI for categorizing a transaction.

### Required Action Handling[](#required-action-handling)

For actions that have no default handling there are methods that are required to be implemented when conforming to the `ActionableInsightsViewControllerDelegate` protocol:

```
func actionableInsightsViewController(_ viewController: ActionableInsightsViewController, initiateTransferFromAccount sourceIdentity: TransferIdentity?, to destinationIdentity: TransferIdentity?, amount: Double?, currencyCode: String?, completionHandler: @escaping (Result<Void, Error>) -> Void) {
    // Present initiate transfer screen
}

func actionableInsightsViewController(_ viewController: ActionableInsightsViewController, showLeftToSpendForMonth month: Month) {
    // Present left to spend screen
}

func actionableInsightsViewController(_ viewController: ActionableInsightsViewController, refreshCredentialsWithID credentialsID: Credentials.ID, completionHandler: @escaping (Result<Void, Error>) -> Void) {
    // Present refresh credentials screen
}
```

For methods with a `completionHandler` parameter you have to call the completion handler when the task related to the requested action has completed or been cancelled. If you don’t call the handler the insight will remain in the list and will not be archived.

### Insight actions and associated delegate methods[](#insight-actions-and-associated-delegate-methods)

#### Explanation of the different action types below this chart.[](#explanation-of-the-different-action-types-below-this-chart-)

| Insight Type | Action Type | Delegate Method | Default Action Handling |
| --- | --- | --- | --- |
| `ACCOUNT_BALANCE_LOW` | `CREATE_TRANSFER` | `actionableInsightsViewController(_:initiateTransferFromAccount:to:amount:currencyCode:completionHandler:)` | NO |
| `AGGREGATION_REFRESH_PSD2_CREDENTIAL` | `REFRESH_CREDENTIAL` | `actionableInsightsViewController(_:refreshCredentialsWithID credentialsID:completionHandler:)` | NO |
| `BUDGET_CLOSE_NEGATIVE` | `VIEW_BUDGET` | `actionableInsightsViewController(_:showBudget id:)` | YES |
| `BUDGET_CLOSE_POSITIVE` | `VIEW_BUDGET` | `actionableInsightsViewController(_:showBudget id:)` | YES |
| `BUDGET_OVERSPENT` | `VIEW_BUDGET` | `actionableInsightsViewController(_:showBudget id:)` | YES |
| `BUDGET_SUCCESS` | `VIEW_BUDGET` | `actionableInsightsViewController(_:showBudget id:)` | YES |
| `BUDGET_SUGGEST_CREATE_FIRST` | `CREATE_BUDGET` | `actionableInsightsViewController(_:createBudgetWithSuggestion suggestion:completionHandler:)` | YES |
| `BUDGET_SUGGEST_CREATE_TOP_CATEGORY` | `CREATE_BUDGET` | `actionableInsightsViewController(_:createBudgetWithSuggestion suggestion:completionHandler:)` | YES |
| `BUDGET_SUGGEST_CREATE_TOP_PRIMARY_CATEGORY` | `CREATE_BUDGET` | `actionableInsightsViewController(_:createBudgetWithSuggestion suggestion:completionHandler:)` | YES |
| `BUDGET_SUMMARY_ACHIEVED` | `CREATE_TRANSFER` | `actionableInsightsViewController(_:initiateTransferFromAccount:to:amount:currencyCode:completionHandler:)` | NO |
| `BUDGET_SUMMARY_OVERSPENT` | `ACKNOWLEDGE` | \- | YES |
| `CREDIT_CARD_LIMIT_CLOSE` | `VIEW_ACCOUNT` | `actionableInsightsViewController(_:showAccountWithID id:)` | YES |
| `CREDIT_CARD_LIMIT_REACHED` | `VIEW_ACCOUNT` | `actionableInsightsViewController(_:showAccountWithID id:)` | YES |
| `DOUBLE_CHARGE` | `VIEW_TRANSACTIONS` | `actionableInsightsViewController(_:showTransactionsWithIDs ids:)` | YES |
| `LARGE_EXPENSE` | `VIEW_TRANSACTION` | `actionableInsightsViewController(_:showTransactionsWithIDs ids:)` | YES |
| `LEFT_TO_SPEND_NEGATIVE_BEGINNING_MONTH` | `VIEW_LEFT_TO_SPEND` | `actionableInsightsViewController(_:showLeftToSpendForMonth month:)` | NO |
| `LEFT_TO_SPEND_NEGATIVE_MID_MONTH` | `VIEW_LEFT_TO_SPEND` | `actionableInsightsViewController(_:showLeftToSpendForMonth month:)` | NO |
| `LEFT_TO_SPEND_POSITIVE_BEGINNING_MONTH` | `VIEW_LEFT_TO_SPEND` | `actionableInsightsViewController(_:showLeftToSpendForMonth month:)` | NO |
| `LEFT_TO_SPEND_POSITIVE_FINAL_WEEK` | `VIEW_LEFT_TO_SPEND` | `actionableInsightsViewController(_:showLeftToSpendForMonth month:)` | NO |
| `LEFT_TO_SPEND_POSITIVE_MID_MONTH` | `VIEW_LEFT_TO_SPEND` | `actionableInsightsViewController(_:showLeftToSpendForMonth month:)` | NO |
| `LEFT_TO_SPEND_POSITIVE_SUMMARY_SAVINGS_ACCOUNT` | `CREATE_TRANSFER` | `actionableInsightsViewController(_:initiateTransferFromAccount:to:amount:currencyCode:completionHandler:)` | NO |
| `MONTHLY_SUMMARY_EXPENSES_BY_CATEGORY` | `VIEW_TRANSACTIONS_BY_CATEGORY` | `actionableInsightsViewController(_:showTransactionsByCategoryCode:transactionIDsByCategoryCode:)` | YES |
| `MONTHLY_SUMMARY_EXPENSE_TRANSACTIONS` | `VIEW_TRANSACTIONS` | `actionableInsightsViewController(_:showTransactionsWithIDs ids:)` | YES |
| `NEW_INCOME_TRANSACTION` | `VIEW_TRANSACTIONS` | `actionableInsightsViewController(_:showTransactionsWithIDs ids:)` | YES |
| `SINGLE_UNCATEGORIZED_TRANSACTION` | `CATEGORIZE_EXPENSE` | `(_:categorizeTransactionWithID id:completionHandler:)` | YES |
| `SPENDING_BY_CATEGORY_INCREASED` | `VIEW_TRANSACTIONS` | `actionableInsightsViewController(_:showTransactionsWithIDs ids:)` | YES |
| `SPENDING_BY_PRIMARY_CATEGORY_INCREASED` | `VIEW_TRANSACTIONS_BY_CATEGORY` | `actionableInsightsViewController(_:showTransactionsByCategoryCode:transactionIDsByCategoryCode:)` | YES |
| `SUGGEST_SET_UP_SAVINGS_ACCOUNT` | `CREATE_TRANSFER` | `actionableInsightsViewController(_:initiateTransferFromAccount:to:amount:currencyCode:completionHandler:)` | NO |
| `WEEKLY_SUMMARY_EXPENSES_BY_DAY` | `ACKNOWLEDGE` | \- | YES |
| `WEEKLY_SUMMARY_EXPENSE_TRANSACTIONS` | `VIEW_TRANSACTIONS` | `actionableInsightsViewController(_:showTransactionsWithIDs ids:)` | YES |
| `WEEKLY_SUMMARY_EXPENSES_BY_CATEGORY` | `VIEW_TRANSACTIONS_BY_CATEGORY` | `actionableInsightsViewController(_:showTransactionsByCategoryCode:transactionIDsByCategoryCode:)` | YES |
| `WEEKLY_UNCATEGORIZED_TRANSACTIONS` | `VIEW_TRANSACTIONS` | `actionableInsightsViewController(_:categorizeTransactionsWithID id:completionHandler:)` | YES |

#### Actionable Insight actions:[](#actionable-insight-actions-)

| Type | Action |
| --- | --- |
| `ACKNOWLEDGE` | Affirmative response type, archives the insight. |
| `CATEGORIZE_EXPENSE` | Lets the user categorize a transaction that is uncategorized. |
| `CATEGORIZE_TRANSACTIONS` | Asks the user to categorize a set of transactions that are uncategorized. **Not supported by Money Manager SDK for iOS.** |
| `CREATE_BUDGET` | Lets the user create a new budget. |
| `CREATE_TRANSFER` | Initiate a transfer from a provided source account - **Not supported by Money Manager SDK for iOS.** |
| `DISMISS` | Dismisses and archives an insight. |
| `REFRESH_CREDENTIAL` | Refresh expired credentials - **Not supported by Money Manager SDK for iOS.** |
| `VIEW_ACCOUNT` | Displays an overview of an account. |
| `VIEW_BUDGET` | Navigates and displays the progress of a specific budget. |
| `VIEW_LEFT_TO_SPEND` | Displays a left to spend view based on the income and expenses. - **Not supported by Money Manager SDK for iOS.** |
| `VIEW_TRANSACTION` | Displays the details of a specific transaction. |
| `VIEW_TRANSACTIONS` | Displays a list of transactions. |
| `VIEW_TRANSACTIONS_BY_CATEGORY` | Displays a list of transactions from a specific category. |

## Customization[](#customization)

### Overriding Default Action Handling[](#overriding-default-action-handling)

To provide your own UI for an action that has default handling, add the method to the object that conforms to the delegate and present your own view controller.

```
func actionableInsightsViewController(_ viewController: ActionableInsightsViewController, categorizeTransactionWithID id: Transaction.ID, completionHandler: @escaping (Result<Void, Error>) -> Void) {
    // Present custom categorization flow. 
}
```

### Handling Disabled Insights[](#handling-disabled-insights)

If your app doesn't support some actions and you've disabled the insights for these actions in the [Console](https://console.tink.com/), you do not neccessarily need to implement the corresponding delegate method.

For example, if your app doesn't have a budgets feature your implementation for the budget action might look like this:

```
func actionableInsightsViewController(_ viewController: ActionableInsightsViewController, showBudget id: Budget.ID, budgetPeriodStart: Date) {
    // NOOP
}
```

### Data Representation[](#data-representation)

The top half of the insight cards can be customized by implementing a method of the `ActionableInsightsViewControllerDelegate` protocol.

To change the representation of the insight for weekly uncategorized transactions, return a `UIImage` when the delegate method is called with a `weeklyUncategorizedTransactions` data type.

```
func actionableInsightsViewController(_ viewController: UIViewController, imageForInsightWithDataType dataType: ActionableInsight.Insight.DataType) -> UIImage? {
    switch dataType {
    case .weeklyUncategorizedTransactions:
        return UIImage(named: "WeeklyUncategorizedTransactionsIllustration")
    default:
        return nil
    }
}
```
