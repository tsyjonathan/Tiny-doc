---
title: "Customize Accounts on iOS - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/pfm-sdk-ios/customize-accounts-on-ios/"
exportedAt: "2026-01-13T12:58:47.492Z"
---
*Image removed: AccountsCustomization*

## Overview[](#overview)

You can choose to have a custom theme for the Accounts feature of your app.

> **Note:** Make sure to set your custom appearance before creating any views.

## Appearance[](#appearance)

To customize the account colors you need to specify the colors in the instance of `ColorProvider`, doing so will override the default colors on `AppearanceProvider`:

```
let accountColors = ColorProvider()
accountColors.accent = <#UIColor#>
accountColors.background = <#UIColor#>
accountColors.label = <#UIColor#>

Appearance.provider.accountColors = accountColors
```

If you only want to have a few colors for the Account feature different from the default theme of the SDK, it also possible to set the specific colors like in the example below:

```
// Change the accent color to magenta only for the account feature
Appearance.provider.accountColors.accent = .magenta
```

[All available colors](/Tiny-doc/tink_docs_home/resources/pfm-sdk-ios/customization/#colors) can be customized especially for accounts. You can for example set a separate color for icons in accounts by specifying the `expensesIconColor`, if you do the `expensesIconBackgroundColor` will have a new color based on the icon color unless you specify it to be otherwise.
