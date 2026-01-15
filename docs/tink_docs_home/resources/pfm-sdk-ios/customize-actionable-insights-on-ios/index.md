---
title: "Customize Actionable Insights on iOS"
source: "/Tiny-doc/tink_docs_home/resources/pfm-sdk-ios/customize-actionable-insights-on-ios/"
exportedAt: "2026-01-13T12:58:51.312Z"
---
*Image removed: Customization Actionable Insights iOS*

## Overview[](#overview)

You can choose to have a custom theme for the Actionable Insights feature of your app.

> **Note:** Make sure to set your custom appearance before creating any views.

## Appearance[](#appearance)

To customize the colors for actionable insights you need to specify the colors in an instance of `ColorProvider`. Doing so will override the default colors on `AppearanceProvider`:

```
let insightColors = ColorProvider()
insightColors.accent = <#UIColor#>
insightColors.background = <#UIColor#>
insightColors.label = <#UIColor#>

Appearance.provider.actionableInsightColors = insightColors
```

[All available colors](/Tiny-doc/tink_docs_home/resources/pfm-sdk-ios/customization/#colors) can be customized specifically for insights. For example, you can set a separate accent color in actionable insights by specifying `accent`, like in the example below:

```
// Change the accent color to magenta only for the insights feature
Appearance.provider.actionableInsightColors.accent = .magenta
```
