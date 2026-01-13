---
title: "Recommended budgets for iOS - Tink Docs"
source: "https://docs.tink.com/resources/money-manager/money-manager-ios/recommended-budgets-for-ios-pfm-sdk"
exportedAt: "2026-01-13T12:52:35.363Z"
---
![Recommended Budgets](https://images.ctfassets.net/tmqu5vj33f7w/2yjEKnqFJvcDkorG1Ro3CG/de0d4bad116da67e750f38e7572a1023/iOS-Recommended-Budgets.png)

## Overview[](#overview)

Recommended Budgets is a great visual tool for your app's users to quickly create budgets based on their spending. The feature is being represented as a vertical list of categories, where each of those displays information about average expenses and an action button to trigger rapid budget creation. This instrument makes budget creation more intuitive and painless for the user.

## Displaying recommended budgets within Finance Overview[](#displaying-recommended-budgets-within-finance-overview)

The [Finance Overview](https://docs.tink.com/resources/money-manager/money-manager-ios/finance-overview) component now has a new optional feature section that displays users recommended budgets as a list. The list is divided into categories, showing average expenses for each. The user can interact with categories by pressing the `Create budget` button. Action will trigger budget creation flow with values of the recommended budget used as presets for the new budget.

### Initializing `FinanceOverviewViewController` with the recommended budgets section included:[](#initializing-code-financeoverviewviewcontroller-code-with-the-recommended-budgets-section-included-)

```
let financeOverviewViewController = FinanceOverviewViewController(features: [.recommendedBudgets])
```

## Displaying all budgets[](#displaying-all-budgets)

The new `AllBudgetsViewController` type contains a mix of existing user budgets (top section) and recommended user budgets (bottom section).

### Presenting `AllBudgetsViewController`:[](#presenting-code-allbudgetsviewcontroller-code-)

```
let allBudgetsViewController = AllBudgetsViewController(tink: <Tink>)
navigationController.pushViewController(allBudgetsViewController, animated: <Bool>)
```

### User actions:[](#user-actions-)

-   By clicking on an existing budget, the user enters the [budget details](https://docs.tink.com/resources/money-manager/money-manager-ios/budgets-for-ios-pfm-sdk#displaying-budget-details) screen, where they can view progress, edit details, and delete budgets.
    
-   By clicking on the `Create budget` button, the user enters a new [budget creation flow](https://docs.tink.com/resources/money-manager/money-manager-ios/budgets-for-ios-pfm-sdk#creating-a-budget) with values preset from the suggested budget.
    
-   By clicking on the `Create new` navigation button, the user enters a plain [budget creation flow](https://docs.tink.com/resources/money-manager/money-manager-ios/budgets-for-ios-pfm-sdk#creating-a-budget) with no values selected as default.
