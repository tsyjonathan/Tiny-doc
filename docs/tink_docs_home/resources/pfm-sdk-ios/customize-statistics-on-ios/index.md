---
title: "Customize Statistics on iOS - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/pfm-sdk-ios/customize-statistics-on-ios/"
exportedAt: "2026-01-13T12:58:53.268Z"
---
*Image removed: LeftToSpendMonthly*

## Overview[](#overview)

You can choose to have a custom theme for the Statistics feature of your app.

> **Note:** Make sure to set your custom appearance before creating any views.

## Appearance[](#appearance)

To customize the statistics colors you need to specify the colors in the instance of `ColorProvider`, doing so will override the default colors on `AppearanceProvider`:

```
let statisticsColors = ColorProvider()
statisticsColors.expenses = <#UIColor#>
statisticsColors.income = <#UIColor#>
statisticsColors.leftToSpend = <#UIColor#>
statisticsColors.accent = <#UIColor#>
statisticsColors.background = <#UIColor#>

Appearance.provider.statisticsColors = statisticsColors
```

If you only want to have a few colors for the Statistics feature different from the default theme of the SDK, it also possible to set the specific colors like in the example below:

```
// Change the accent color to magenta only for the statistics feature
Appearance.provider.statisticsColors.accent = .magenta
```

[All available colors](/Tiny-doc/tink_docs_home/resources/pfm-sdk-ios/customization/#colors) can be customized especially for statistics (Expenses, Income, Left to spend). You can for example set a separate color for icons in statistics by specifying the `expensesIconColor`, if you do, the `expensesIconBackgroundColor` will have a new color based on the icon color unless you specify it to be otherwise. See the images below for more examples of which colors you can customize.

*Image removed: StatisticsOverTime*
