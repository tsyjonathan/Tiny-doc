---
title: "Customize Actionable Insights on Android"
source: "/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/customize-actionable-insights-on-android/"
exportedAt: "2026-01-13T12:58:39.420Z"
---
![Customization Actionable Insights Android](https://images.ctfassets.net/tmqu5vj33f7w/42Uqn0OeYHvG7NjIvzGbMu/b9f6de5b0e613433788bc8d69f0c1de5/ActionableInsights-Customization-Android.png)

## Overview[](#overview)

You can choose to have a custom theme for the Actionable Insights feature of your app.

It is recommended that you inherit from your global theme. This means that any colors not overridden in your custom theme will have the same colors as your global theme.

```
<style name="YourCustomActionableInsightsStyle" parent="YourCustomTinkFinanceOverviewStyle">
    <item name="tink_expensesColor">@color/actionableInsights_expenses</item>
    <item name="tink_expensesLightColor">@color/actionableInsights_expenses_light</item>
    <item name="tink_expensesDarkColor">@color/actionableInsights_expenses_dark</item>
    <item name="tink_colorOnExpenses">@color/actionableInsights_color_on_expenses</item>
</style>
```

```
FinanceOverviewFragment.newInstance(
...
featureSpecificThemes = mapOf(
    MoneyManagerFeatureType.ACTIONABLE_INSIGHTS to R.style.Actionable_Insights_Style,
)
```

[All available colors](/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/pfm-sdk-android-customization/#colors) can be customized specifically for insights.
