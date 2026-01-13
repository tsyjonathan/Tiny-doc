---
title: "Customize Budgets on iOS - Tink Docs"
source: "https://docs.tink.com/resources/pfm-sdk-ios/customize-budgets-on-ios"
exportedAt: "2026-01-13T12:58:49.477Z"
---
![BudgetDetailsCustomization](https://images.ctfassets.net/tmqu5vj33f7w/7fX61arfHAGmxSTebQvOOV/0d6626361712677ff4e875c68715be5a/ColorCustomisation-Budgets1.jpg)

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

[All available colors](https://docs.tink.com/resources/pfm-sdk-ios/customization/#colors) can be customized specifically for budgets. For example, you can set a separate color for icons in budgets by specifying the `expensesIconColor`, if you do the `expensesIconBackgroundColor` will have a new color based on the icon color unless you specify it to be otherwise. See the images below for more examples of which colors you can customize.

![BudgetTransactionsCustomization](https://images.ctfassets.net/tmqu5vj33f7w/4Qw9MEaNh1qYDwFQXC5b58/e7e113f6d0b1dadd0bdde073f831d1b4/ColorCustomisation-Budgets2.jpg)

![BudgetsOverTimeCustomization](https://images.ctfassets.net/tmqu5vj33f7w/4tYtfoZTuQEHs4fAKewRLS/c5c5d36b80004b6a6537afe065b6561a/ColorCustomisation-Budgets.jpg)
