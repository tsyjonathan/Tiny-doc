---
title: "Customize Accounts on Android - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/customize-accounts-on-android/"
exportedAt: "2026-01-13T12:58:36.076Z"
---
*Image removed: Customization Budgets Android*

## Overview[](#overview)

You can choose to have a custom theme for the Accounts feature of your app.

It is recommended that you inherit from your global theme. This means that any colors not overridden in your custom theme will have the same colors as your global theme.

```
<style name="YourCustomAccountStyle" parent="YourCustomTinkFinanceOverviewStyle">
    <item name="tink_backgroundColor">@color/budget_background</item>
    <item name="tink_textColorPrimary">@color/account_text_primary</item>
    <item name="tink_textColorSecondary">@color/account_text_secondary</item>
    <item name="tink_colorOnExpenses">@color/account_color_on_expenses</item>
</style>
```

```
FinanceOverviewFragment.newInstance(
...
featureSpecificThemes = mapOf(
    MoneyManagerFeatureType.ACCOUNTS to R.style.Account_Style,
)
```

[All available colors](/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/pfm-sdk-android-customization/#colors) can be customized specifically for Accounts.
