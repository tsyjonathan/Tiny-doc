---
title: "Customization for Money Manager on iOS"
source: "https://docs.tink.com/resources/money-manager-ios/customization"
exportedAt: "2026-01-13T13:00:26.928Z"
---
![Customization](https://images.ctfassets.net/tmqu5vj33f7w/6EmGf5N1vfyAUWiG7BVdC5/a7b4d2e5edeeb8a1a3bd93fbd2705a8e/Customization.png)

## Overview[](#overview)

You can easily customize the appearance of the SDK to fit your app by changing the colors, icons or fonts of the SDK.

> **Note:** Make sure to set your custom appearance before creating any views.

## Appearance[](#appearance)

You can configure colors, icons and fonts by providing the SDK with a `ColorProviding`, `IconProviding` and `FontProviding` type respectively. You can also provide different instances of the `ColorProviding` type to customize a specific feature's color in the Money Manager SDK.

To customize the default colors of the SDK, use the `ColorProvider`, like shown in the example below:

```
let defaultColors = ColorProvider()
defaultColors.accent = <#UIColor#>
defaultColors.background = <#UIColor#>
defaultColors.label = <#UIColor#>
```

To add specific colors for a feature, for example Budgets, you can just create another instance of `ColorProvider`:

```
let budgetColors = ColorProvider()
budgetColors.accent = <#UIColor#>
budgetColors.background = <#UIColor#>
budgetColors.label = <#UIColor#>
```

And provide these color providers to the `AppearanceProvider` initializer:

```
Appearance.provider = AppearanceProvider(colors: defaultColors, budgetColors: budgetColors)
```

### Customizable features[](#customizable-features)

The following features can be customized separately.

[Accounts](https://docs.tink.com/resources/pfm-sdk-ios/customize-accounts-on-ios)  
[Budgets](https://docs.tink.com/resources/pfm-sdk-ios/customize-budgets-on-ios)  
[Insights](https://docs.tink.com/resources/pfm-sdk-ios/customize-actionable-insights-on-ios)  
[Statistics](https://docs.tink.com/resources/pfm-sdk-ios/customize-statistics-on-ios)

If you choose to not define colors for these features, they will have the same theme as the default color theme.

Click on the feature for a separate article about how you can customize that specific feature more in depth.

### Colors[](#colors)

These are the colors you can customize to better fit the SDK to your app. You can choose to customize them all or just a few. The ones you don't customize will always have a default color.

![Colors](https://images.ctfassets.net/tmqu5vj33f7w/jF4zS3Ljx1uKUZXBUoSfz/c0a246c7b0d0a58c9a8b6c2b050202e3/Color.png)

| Color | Description | Default |
| --- | --- | --- |
| `background` | Color for the main background of the interface. |  |
| `secondaryBackground` | Color for content layered on top of the main background. |  |
| `groupedBackground` | Color for the main background of grouped interface components. |  |
| `secondaryGroupedBackground` | Color for content layered on top of the main background of grouped interface components. |  |
| `label` | Primary text color. |  |
| `secondaryLabel` | Secondary text color. |  |
| `separator` | Color for separators. |  |
| `accent` | Colors for buttons, indicators and other similar elements. |  |
| `accentBackground` | Colors for background of buttons, indicators and other similar elements. |  |
| `button` | Colors for primary buttons. | `accent` |
| `buttonLabel` | Color for the primary buttons label. | `label` |
| `secondaryButton` | Color for secondary buttons. | `button` |
| `tertiaryButton` | Color for tertiary buttons. | `button` |
| `tertiaryButtonBackground` | Color for tertiary buttons background | `tertiaryButton` mixed with `background`. |
| `chevronButton` | Color for chevron buttons | `accent` |
| `chevronButtonDisabled` | Color for disabled chevron buttons | `chevronButton` with 20% alpha. |
| `expenses` | Color to represent expenses. |  |
| `income` | Color to represent income. |  |
| `leftToSpend` | Color to represent left to spend. |  |
| `safeToSpend` | Color to represent safe to spend. |  |
| `recurringExpenses` | Color to represent recurring expenses. |  |
| `transfers` | Color to represent transfers. |  |
| `uncategorized` | Color representing uncategorized transactions. |  |
| `warning` | Color representing a warning. |  |
| `critical` | Color representing a critical error. |  |
| `expensesIconColor` | Color to represent expenses icon | `expenses` |
| `incomeIconColor` | Color to represent incomes | `income` |
| `transfersIconColor` | Color to represent transfers | `transfers` |
| `uncategorizedIconColor` | Color representing uncategorized transactions | `uncategorized` |
| `expensesIconBackgroundColor` | Color to represent expenses | `expensesIconColor` mixed with `background`. |
| `incomeIconBackgroundColor` | Color to represent incomes | `incomeIconColor` mixed with `background`. |
| `transfersIconBackgroundColor` | Color to represent transfers | `transfersIconColor` mixed with `background`. |
| `uncategorizedIconBackgroundColor` | Color representing uncategorized transactions | `uncategorizedIconColor` mixed with `background`. |

### Icons[](#icons)

Icons are a good way to put your personal touch to the SDK. The SDK comes with a default icon package so you can choose which ones to keep and which ones to customize.

![Icons](https://images.ctfassets.net/tmqu5vj33f7w/4GJ8K23Z2maBiLxFCzXZ3X/e59e472157adf2525282624129bbbb08/Icons.png)

| Icon | Description |
| --- | --- |
| `account` | icon representing accounts. |
| `add` | icon representing add action. |
| `alert` | icon representing alerts. |
| `budget` | icon representing a budget. |
| `benefits` | icon representing benefits. |
| `doubleTransaction` | icon representing double transaction. |
| `exclude` | icon representing excluded transactions. |
| `expensesIcon` | icon representing expenses. |
| `financial` | icon representing financial. |
| `food` | icon representing food and drinks transactions. |
| `wellness` | icon representing health and beauty transactions. |
| `home` | icon representing household transactions. |
| `house` | icon representing house and gardening transactions. |
| `incomeIcon` | icon representing incomes. |
| `entertainment` | icon representing free time and leisure transactions. |
| `pension` | icon representing pension. |
| `other` | icon representing other transactions. |
| `refund` | icon representing reimbursed transactions. |
| `salary` | icon representing salary. |
| `savings` | icon representing savings. |
| `search` | icon representing searches. |
| `shopping` | icon representing shopping transactions. |
| `transfer` | icon representing transfers. |
| `transport` | icon representing transportation transactions. |
| `uncategorizedIcon` | icon representing uncategorized transactions. |
| `categoryIconBackgroundCornerRadiusFactor` | Factor representing the corner radius of all icon backgrounds. Defaults to a circular shape. |
| `checkBoxIconBackgroundCornerRadiusFactor` | Factor representing the corner radius of all check box backgrounds. Defaults to a circular shape. |

It is also possible to customize the icon’s corner radius by changing `categoryIconBackgroundCornerRadiusFactor`, ranging from `0.0` (square) to `1.0` (circular).

```
let iconProvider = IconProvider()
iconProvider.account = <#UIImage#>
iconProvider.expensesIcon = <#UIImage#>
iconProvider.incomeIcon = <#UIImage#>
iconProvider.transfer = <#UIImage#>
iconProvider.uncategorizedIcon = <#UIImage#>
iconProvider.categoryIconBackgroundCornerRadiusFactor = <#CGFloat#>


Appearance.provider = AppearanceProvider(icons: iconProvider)
```

### Fonts[](#fonts)

With `FontProvider` you can change the text fonts in the SDK to match your own app's.

![Fonts](https://images.ctfassets.net/tmqu5vj33f7w/7tDpEOmd4mNEZntB0mOXMP/5cbda344c270979bfdd832ff66871fc6/Fonts.png)

| Font | Description |
| --- | --- |
| `lightFont` | The light font weight. |
| `regularFont` | The regular font weight. |
| `semiBoldFont` | The semibold font weight. |
| `boldFont` | The bold font weight. |

```
let fontProvider = FontProvider()
fontProvider.lightFont = Font.custom(named: "yourLightFont")
fontProvider.regularFont = Font.custom(named: "yourRegularFont")
fontProvider.semiBoldFont = Font.custom(named: "yourSemiBoldFont")
fontProvider.boldFont = Font.custom(named: "yourBoldFont")

Appearance.provider = AppearanceProvider(fonts: fontProvider)
```
