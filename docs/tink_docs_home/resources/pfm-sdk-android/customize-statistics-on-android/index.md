---
title: "Customize Statistics on Android - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/customize-statistics-on-android/"
exportedAt: "2026-01-13T12:58:41.126Z"
---
*Image removed: StatisticsDetails*

## Overview[](#overview)

You can choose to have a custom theme for the Statistics feature of your app.

It is recommended that you inherit from your global theme. This means that any colors not overridden in your custom theme will have the same colors as your global theme.

```
<style name="YourCustomStatisticsStyle" parent="YourCustomTinkFinanceOverviewStyle">
    <item name="tink_expensesColor">@color/statistics_expenses</item>
    <item name="tink_expensesLightColor">@color/statistics_expenses_light</item>
    <item name="tink_expensesDarkColor">@color/statistics_expenses_dark</item>
    <item name="tink_colorOnExpenses">@color/statistics_color_on_expenses</item>
</style>
```

```
FinanceOverviewFragment.newInstance(
...
featureSpecificThemes = mapOf(
    MoneyManagerFeatureType.STATISTICS to R.style.Statistics_Style,
)
```

[All available colors](/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/pfm-sdk-android-customization/#colors) can be customized specifically for statistics.

*Image removed: StatisticsOverTime*
