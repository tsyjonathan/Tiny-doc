---
title: "Customize Budgets on iOS - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/pfm-sdk-ios/customize-budgets-on-ios/"
exportedAt: "2026-01-13T12:58:49.477Z"
---
*Image removed: BudgetDetailsCustomization*

## Overview[](#overview)

You can choose to have a custom theme for the Budgets feature of your app.

> **Note:** Make sure to set your custom appearance before creating any views.

## Appearance[](#appearance)

To customize the budget colors you need to specify the colors in the instance of `ColorProvider`, doing so will override the default colors on `AppearanceProvider`:

```
let budgetColors = ColorProvider()
budgetColors.accent = <#UIColor#>
budgetColors.background = <#UIColor#>
budgetColors.label = <#UIColor#>

Appearance.provider.budgetColors = budgetColors
```

If you only want to have a few colors for the Budgets feature different from the default theme of the SDK, it also possible to set the specific colors like in the example below:

```
// Change the accent color to magenta only for the budgets feature
Appearance.provider.budgetColors.accent = .magenta
```

[All available colors](/Tiny-doc/tink_docs_home/resources/pfm-sdk-ios/customization/#colors) can be customized specifically for budgets. For example, you can set a separate color for icons in budgets by specifying the `expensesIconColor`, if you do the `expensesIconBackgroundColor` will have a new color based on the icon color unless you specify it to be otherwise. See the images below for more examples of which colors you can customize.

*Image removed: BudgetTransactionsCustomization*

*Image removed: BudgetsOverTimeCustomization*
