---
title: "Budgets for iOS - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-ios/budgets-for-ios-pfm-sdk/"
exportedAt: "2026-01-13T12:52:15.982Z"
---
*Image removed: Budgets*

## Overview[](#overview)

Budgets are a great tool for your app's users to get a nice overview of their spendings of a specific category, a collection of categories or even a keyword pointing to a transaction, like "Apple Inc.". Budgets can be weekly, monthly or yearly. The user can also create one off budgets for a specific time period.

## Creating a budget[](#creating-a-budget)

Use the `CreateBudgetViewController` when you want to create a budget.

To handle what should happen after the budget has been created or if it failed, check the result from the `completion` closure. This view controller is designed to be presented modally.

```
let createBudgetViewController = CreateBudgetViewController()  { [weak self] result in
    DispatchQueue.main.async {
        do {
            let budget = try result.get()
            // Handle create. 
        } catch {
            // Handle error.
        }
    }
}
present(createBudgetViewController, animated: true)
```

## Displaying budget details[](#displaying-budget-details)

Use the `BudgetDetailsViewController` when you want to display details and related transactions about a budget. The user can edit the budget within this view controller.

When creating the view controller, specify the ID for which budget to display. This view controller is designed to be presented within a UINavigationController, so that the edit budget navigation item can be displayed.

```
let budgetDetailsViewController = BudgetDetailsViewController(budgetID: <#T##Budget.ID#>)
show(budgetDetailsViewController, sender: nil)
```

Implement the `BudgetDetailsViewControllerDelegate` delegate to track when the user edit the budget.

```
extension ViewController: BudgetDetailsViewControllerDelegate { 
    func budgetDetailsViewController(_ viewController: BudgetDetailsViewController, didUpdateBudget budget: Budget) {
        // Handle update. 
    }
    
    func budgetDetailsViewController(_ viewController: BudgetDetailsViewController, didDeleteBudget budget: Budget) {
        // Handle delete. 
    }
    
    func budgetDetailsViewController(_ viewController: BudgetDetailsViewController, didFailWithError error: Error) {
        // Handle error. 
    }
}
```

## Displaying budgets[](#displaying-budgets)

Use the `BudgetsViewController` to display a user's budgets in a list. The user can select a budget to view budget details and to edit or delete it. The budgets view controller also lets the user create a new budget. If the user has not created any budgets, an empty state will be displayed.

```
let budgetsViewController = BudgetsViewController()
show(budgetsViewController, sender: self)
```
