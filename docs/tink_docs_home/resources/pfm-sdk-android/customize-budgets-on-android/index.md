---
title: "Customize Budgets on Android - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/customize-budgets-on-android/"
exportedAt: "2026-01-13T12:58:37.764Z"
---
*Image removed: Customization Budgets Android*

## Overview[](#overview)

You can customize budget colors by providing a separate theme for the budgets feature.

It is recommended that you inherit from your global theme. This means that any colors not overridden in your custom theme will have the same colors as your global theme.

```
<style name="YourCustomBudgetStyle" parent="YourCustomTinkMoneyManagerStyle">
    <item name="tink_expensesColor">@color/budget_expenses</item>
    <item name="tink_expensesLightColor">@color/budget_expenses_light</item>
    <item name="tink_expensesDarkColor">@color/budget_expenses_dark</item>
    <item name="tink_colorOnExpenses">@color/budget_color_on_expenses</item>
</style>
```

```
TinkMoneyManager.init(
    // ...
    entrypoint = Entrypoint.Overview(
        // ...
        featureSpecificThemes = mapOf(
            MoneyManagerFeatureType.BUDGETS to R.style.YourCustomBudgetStyle,
        )
    )
)
```

[All available colors](/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/pfm-sdk-android-customization/#colors) can be customized specifically for budgets.
