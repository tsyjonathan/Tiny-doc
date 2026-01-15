---
title: "Customization for Money Manager on Android"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-android/pfm-sdk-android-customization/"
exportedAt: "2026-01-13T12:59:13.362Z"
---
![Customization of Money Manager SDK for Android](https://images.ctfassets.net/tmqu5vj33f7w/17P2wvmXsxV7aSlErdbJ0T/261931095a52922e43fa40bb2660c3c3/customization.png)

## Overview[](#overview)

The Money Manager SDK for Android offers multiple ways of customization. You can choose to either customize all features by themselves or have a single theme throughout all the views. Apart from colors, you can also customize fonts and icons to make it look like your own design.

1.  [Fonts](#fonts)
2.  [Colors](#colors)
3.  [Icons](#icons)
4.  [Buttons](#buttons)
5.  [Date formats](#date-formats)
6.  [Period picker](#period-picker)
7.  [Checkbox corner radius](#checkbox-corner-radius)
8.  [Transaction date group text appearance](#transaction-date-group-text-appearance)
9.  [Text fields](#text-fields)
10.  [Date pickers](#date-pickers)
11.  [Alert dialogs](#alert-dialogs)

## Fonts[](#fonts)

You can add custom font resources in your application's `styles.xml` for three font typefaces which are represented by the custom attributes - `tink_font_bold`, `tink_font_semi_bold` and `tink_font_regular`. Set these custom attributes to the resource IDs of the font files you want to use.

![Fonts](https://images.ctfassets.net/tmqu5vj33f7w/2a0b4UVbonjl6gPSIOVGsh/36476e25cbc91ebe986a77cfdd2a234e/Fonts.png)

```
<resources>
    <item name="tink_font_bold" type="font">@font/your_custom_bold_font</item>
    <item name="tink_font_semi_bold" type="font">@font/your_custom_semi_bold_font</item>
    <item name="tink_font_regular" type="font">@font/your_custom_regular_font</item>
</resources>
```

## Colors[](#colors)

You can customize colors by extending the existing `TinkMoneyManagerStyle` from the SDK and overriding the custom attributes that are available.

![Colors](https://images.ctfassets.net/tmqu5vj33f7w/4cZiAvLIDA8WIC5bShs4aA/5c59d04259720e4d8737c19be3e720c0/Color.png)

Add your extended style in your application's `styles.xml`.

```
<style name="YourCustomTinkMoneyManagerStyle" parent="TinkMoneyManagerStyle">
    <item name="tink_backgroundColor">@color/custom_backgroundColor</item>
    <item name="tink_cardBackgroundColor">@color/custom_cardBackgroundColor</item>
    <item name="tink_chartContainerBackgroundColor">@color/custom_chart_container_background</item>
    <item name="tink_chartMeanValueColor">@color/custom_chart_mean_value</item>
    <item name="tink_colorAccent">@color/colorAccent</item>
    <item name="tink_colorAccentDark">@color/colorAccentDark</item>
    <item name="tink_colorAccentLight">@color/colorAccentLight</item>
    <item name="tink_colorOnAccent">@color/colorOnAccent</item>
    <item name="tink_colorOnExpenses">@color/custom_color_on_expenses</item>
    <item name="tink_colorOnIncome">@color/custom_color_on_income</item>
    <item name="tink_colorOnLeftToSpend">@color/tink_white</item>
    <item name="tink_colorOnPrimary">@color/colorOnPrimary</item>
    <item name="tink_colorOnSnackBar">@color/custom_color_on_snackbar</item>
    <item name="tink_colorOnTransfer">@color/custom_color_on_transfer</item>
    <item name="tink_colorPrimary">@color/colorPrimary</item>
    <item name="tink_colorPrimaryDark">@color/colorPrimaryDark</item>
    <item name="tink_colorPrimaryLight">@color/colorPrimaryLight</item>
    <item name="tink_createBudgetButtonColor">@color/tink_color_error</item>
    <item name="tink_createBudgetIconBackgroundColor">@color/tink_expensive_blue_light</item>
    <item name="tink_createBudgetIconColor">@color/tink_color_error</item>
    <item name="tink_criticalColor">@color/custom_criticalColor</item>
    <item name="tink_dividerColor">@color/custom_dividerColor</item>
    <item name="tink_expensesColor">@color/custom_expenses</item>
    <item name="tink_expensesDarkColor">@color/custom_expenses_dark</item>
    <item name="tink_expensesLightColor">@color/custom_expenses_light</item>
    <item name="tink_incomeColor">@color/custom_income</item>
    <item name="tink_incomeDarkColor">@color/custom_income_dark</item>
    <item name="tink_incomeLightColor">@color/custom_income_light</item>
    <item name="tink_leftToSpendColor">@color/tink_lax</item>
    <item name="tink_leftToSpendDarkColor">@color/tink_lax_dark</item>
    <item name="tink_leftToSpendLightColor">@color/tink_lax_light</item>
    <item name="tink_snackbarColor">@color/custom_snackbar</item>
    <item name="tink_tabNormalColor">@color/custom_tab_normal</item>
    <item name="tink_tabSelectedColor">@color/custom_tab_selected</item>
    <item name="tink_textColorAction">@color/textColorAction</item>
    <item name="tink_textColorPrimary">@color/textColorPrimary</item>
    <item name="tink_textColorPrimaryDisabled">@color/textColorPrimaryDisabled</item>
    <item name="tink_textColorPrimaryInverse">@color/tink_white</item>
    <item name="tink_textColorSecondary">@color/textColorSecondary</item>
    <item name="tink_textColorSecondaryDisabled">@color/textColorSecondaryDisabled</item>
    <item name="tink_textColorTertiary">@color/textColorTertiary</item>
    <item name="tink_transferColor">@color/custom_transfer</item>
    <item name="tink_transferLightColor">@color/custom_transfer_light</item>
    <item name="tink_uncategorizedColor">@color/custom_uncategorized</item>
    <item name="tink_uncategorizedLightColor">@color/custom_uncategorized_light</item>
    <item name="tink_warningColor">@color/custom_warningColor</item>
    <item name="tink_warningLightColor">@color/custom_warningLightColor</item>
    <item name="tink_expensesIconBackgroundColor">?tink_uncategorizedLightColor</item>
    <item name="tink_expensesIconColor">?tink_expensesColor</item>
    <item name="tink_incomeIconBackgroundColor">?tink_uncategorizedLightColor</item>
    <item name="tink_incomeIconColor">?tink_incomeColor</item>
    <item name="tink_transferIconBackgroundColor">?tink_uncategorizedLightColor</item>
    <item name="tink_transferIconColor">?tink_transferColor</item>
    <item name="tink_uncategorizedIconBackgroundColor">?tink_uncategorizedLightColor</item>
    <item name="tink_uncategorizedIconColor">?tink_uncategorizedColor</item>
    <item name="tink_accountIconColor">?tink_uncategorizedLightColor</item>
    <item name="tink_accountIconBackgroundColor">?tink_colorAccent</item>
    <item name="tink_accountTextColor">?tink_colorAccent</item>
    <item name="tink_rippleColor">@color/tink_ripple_on_light_background</item>
</style>
```

### Dark theme[](#dark-theme)

The SDK default style `TinkMoneyManagerStyle`, supports dark and light themes.

For the dark theme, enter the colors you want to use in a color resource file in the **values-night** folder, for example, **_values-night/colors.xml_**. For the light theme, enter the colors you want to use in a color resource file in the **values** folder, for example, **_values/colors.xml_**.

Refer to those colors in your custom theme that extends the `TinkMoneyManagerStyle` (as shown in the earlier example).

### Customizable features[](#customizable-features)

You can also customize only a specific feature if you wish. Customizing a specific feature will override any customization you have done on the main theming of the SDK. For example you can set the default expense color to red and the budget expense color to green, this will result in green being the expense color for views related to budgets, and red for everything else. Your feature theme should inherit from your base theme, this way any color not set in your feature theme will default to your base theme color.

[Accounts](/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/customize-accounts-on-android/)  
[Budgets](/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/customize-budgets-on-android/)  
[Insights](/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/customize-actionable-insights-on-android/)  
[Statistics](/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/customize-statistics-on-android/)

## Icons[](#icons)

You can customize icons by extending the existing `TinkMoneyManagerStyle` from the SDK and overriding the icon resource attributes that are available.

![Icons](https://images.ctfassets.net/tmqu5vj33f7w/PQDPdn1IIkqUFPWMpfXZ1/dd368dd41f4bd657c44729b5dbb567f0/Icons.png)

Add your extended style in your application's `styles.xml`.

```
<style name="YourCustomTinkMoneyManagerStyle" parent="TinkMoneyManagerStyle">
    <item name="tink_icon_add_button">@drawable/custom_add_icon</item>
    <item name="tink_icon_category_all_expenses">@drawable/custom_all_expenses</item>
    <item name="tink_icon_category_all_income">@drawable/custom_all_income</item>
    <item name="tink_icon_category_expenses_foodanddrinks">@drawable/custom_foodanddrinks</item>
    <item name="tink_icon_category_expenses_healthandbeauty">@drawable/custom_healthandbeauty</item>
    <item name="tink_icon_category_expenses_home">@drawable/custom_home</item>
    <item name="tink_icon_category_expenses_houseandgarden">@drawable/custom_houseandgarden</item>
    <item name="tink_icon_category_expenses_leisure">@drawable/custom_leisure</item>
    <item name="tink_icon_category_expenses_other">@drawable/custom_other</item>
    <item name="tink_icon_category_expenses_shopping">@drawable/custom_shopping</item>
    <item name="tink_icon_category_expenses_transport">@drawable/custom_transport</item>
    <item name="tink_icon_category_income_benefits">@drawable/custom_benefits</item>
    <item name="tink_icon_category_income_financial">@drawable/custom_financial</item>
    <item name="tink_icon_category_income_other">@drawable/custom_other</item>
    <item name="tink_icon_category_income_pension">@drawable/custom_pension</item>
    <item name="tink_icon_category_income_reimbursements">@drawable/custom_reimbursement</item>
    <item name="tink_icon_category_income_salary">@drawable/custom_salary</item>
    <item name="tink_icon_category_search">@drawable/tink_search</item>
    <item name="tink_icon_category_transfers_exclude">@drawable/custom_excluded</item>
    <item name="tink_icon_category_transfers_other">@drawable/custom_other</item>
    <item name="tink_icon_category_transfers_savings">@drawable/custom_savings</item>
    <item name="tink_icon_category_uncategorized">@drawable/custom_uncategorized</item>
    <item name="tink_icon_home">@drawable/tink_category_home</item>
    <item name="tink_icon_transaction_tag">@drawable/custom_transaction_tag_icon</item>
    <item name="tink_icon_transfers">@drawable/tink_category_transfer</item>
    <item name="tink_icon_default_account">@drawable/custom_icon_default_account</item>
    <item name="tink_icon_ingested_account">@drawable/custom_icon_ingested_account</item>
    <item name="tink_icon_account">@drawable/custom_icon_account</item>
</style>
```

By default, the SDK uses [material icons](https://material.io/resources/icons/?style=baseline). It is recommended to take a look at the [material icon design principles](https://material.io/design/iconography/system-icons.html#design-principles) before adding your custom icons. Here's a list of all the icon resource attributes in the SDK that can be overridden:

| Icon Resource ID | Description |
| --- | --- |
| `tink_icon_add_button` | Icon shown for add button |
| `tink_icon_category_all_expenses` | Icon shown for default expenses type |
| `tink_icon_category_all_income` | Icon shown for default income type |
| `tink_icon_category_expenses_foodanddrinks` | Icon shown for food expenses |
| `tink_icon_category_expenses_healthandbeauty` | Icon shown for health and wellness expenses |
| `tink_icon_category_expenses_home` | Icon shown for home expenses |
| `tink_icon_category_expenses_houseandgarden` | Icon shown for house expenses |
| `tink_icon_category_expenses_leisure` | Icon shown for entertainment expenses |
| `tink_icon_category_expenses_other` | Icon shown for miscellaneous expenses |
| `tink_icon_category_expenses_shopping` | Icon shown for shopping expenses |
| `tink_icon_category_expenses_transport` | Icon shown for transport expenses |
| `tink_icon_category_income_benefits` | Icon shown for income from benefits |
| `tink_icon_category_income_financial` | Icon shown for financial income |
| `tink_icon_category_income_other` | Icon shown for any other type of income |
| `tink_icon_category_income_pension` | Icon shown for income from pension |
| `tink_icon_category_income_reimbursements` | Icon shown for income from refunds |
| `tink_icon_category_income_salary` | Icon shown for income from salary |
| `tink_icon_category_search` | Icon shown when creating budgets with keyword |
| `tink_icon_category_transfers_exclude` | Icon shown for excluded transfers |
| `tink_icon_category_transfers_other` | Icon shown for any other type of transfers |
| `tink_icon_category_transfers_savings` | Icon shown for savings transfers |
| `tink_icon_category_uncategorized` | Icon shown for uncategorized transactions |
| `tink_icon_home` | Icon shown as home in insights |
| `tink_icon_transaction_tag` | Icon shown for transaction tags |
| `tink_icon_transfers` | Icon shown for transfers |
| `tink_icon_default_account` | Placeholder Icon while Bank Icon is loading |
| `tink_icon_ingested_account` | Icon for ingested accounts |
| `tink_icon_account` | Default account Icon |

### Customize icon background shapes[](#customize-icon-background-shapes)

Money Manager SDK uses [ShapeableImageView](https://developer.android.com/reference/com/google/android/material/imageview/ShapeableImageView) for displaying icons with shape styling for backgrounds.

You can customize the icon background shapes by extending the existing `TinkMoneyManagerStyle` from the SDK and overriding the shape style resource attributes that are available.

1.  Add dependency on the Material Components library. You can follow the [material components getting started guide](https://material.io/develop/android/docs/getting-started) for more information to set it up.

```
dependencies {
    // ...
    implementation 'com.google.android.material:material:<version>'
    // ...
  }
```

2.  Add your extended style in your application's `styles.xml`.

```
<resources>
    <style name="YourCustomTinkMoneyManagerStyle" parent="TinkMoneyManagerStyle">
        <item name="tink_categoryIconShapeStyle">@style/SquareWithRoundedCornersStyle</item>
    </style>

    <style name="SquareWithRoundedCornersStyle" parent="ShapeAppearance.MaterialComponents.MediumComponent">
        <item name="cornerFamily">rounded</item>
        <item name="cornerSize">30%</item>
    </style>
</resources>
```

It is recommended to take a look at how material shaping works [as shown here](https://material.io/develop/android/theming/shape) before adding your custom styles.

By default, the SDK uses the shape style that inherits from `ShapeAppearance.MaterialComponents.MediumComponent`.

You can also override from the default shape style:

```
<resources>
    <style name="YourCustomTinkMoneyManagerStyle" parent="TinkMoneyManagerStyle">
        <item name="tink_textButtonStyle">@style/SquareWithRoundedCornersStyle</item>
    </style>

    <style name="SquareWithRoundedCornersStyle" parent="TinkCategoryIconShapeStyle">
        <item name="cornerSize">30%</item>
    </style>
</resources>
```

Shape style resource attributes in the SDK that can be overridden:

| Custom Style Resource ID | Description | Default value |
| --- | --- | --- |
| `tink_categoryIconShapeStyle` | Style for all category icon background shapes used in the SDK | `TinkCategoryIconShapeStyle` |

## Buttons[](#buttons)

You can customize the buttons shown in the finance overview UI by extending the existing `TinkMoneyManagerStyle` from the SDK and overriding the button style resource attributes that are available.

![Buttons](https://images.ctfassets.net/tmqu5vj33f7w/5r1L5o2Lad7MTf38z7HYYa/afc9603fafb0b7e9037fca3d3b3e269f/Buttons.png)

Add your extended style in your application's `styles.xml`.

```
<resources>
    <style name="YourCustomTinkMoneyManagerStyle" parent="TinkMoneyManagerStyle">
        <item name="tink_textButtonStyle">@style/CustomTextButtonStyle</item>
    </style>
    
    <style name="CustomTextButtonStyle" parent="Widget.MaterialComponents.Button.TextButton">
        <item name="android:textColor">#ff461e7d</item>
        <item name="android:textAllCaps">true</item>
    </style>
</resources>
```

By default, the SDK uses [material buttons](https://material.io/components/buttons). It is recommended to take a look at the material button styles [as shown here](https://material.io/develop/android/components/buttons) before adding your custom styles.

You can also override from the default Tink button styles:

```
<resources>
    <style name="YourCustomTinkMoneyManagerStyle" parent="TinkMoneyManagerStyle">
        <item name="tink_textButtonStyle">@style/CustomTextButtonStyle</item>
    </style>
    
    <style name="CustomTextButtonStyle" parent="TinkTextButtonStyle">
        <item name="android:textAllCaps">true</item>
    </style>
</resources>
```

Button style resource attributes in the SDK that can be overridden:

| Custom Style Resource ID | Description | Default value |
| --- | --- | --- |
| `tink_containedButtonStyle` | Style for all contained buttons used in the SDK | `TinkContainedButtonStyle` |
| `tink_textButtonStyle` | Style for all text buttons used in the SDK | `TinkTextButtonStyle` |
| `tink_insightPrimaryActionButtonStyle` | Style for the primary action buttons in insight cards | `TinkInsightPrimaryActionButtonStyle` |
| `tink_insightSecondaryActionButtonStyle` | Style for the secondary action buttons in insight cards | `TinkInsightSecondaryActionButtonStyle` |

## Date formats[](#date-formats)

You can customize the format of dates shown in the finance overview UI by overriding the date formatter string resources that are publicly available in the SDK.

![Date format](https://images.ctfassets.net/tmqu5vj33f7w/6uAmb2car3NqdzB1uGRt1Z/f872421cee971d243bab133a7f560f6f/Date_format.png)

Override the date formatter string resource values in your application's `res/values/strings.xml`

```
<resources>
  <string name="tink_date_formatter_month_and_day_of_week">EEEE, d MMM</string>
</resources>
```

Date formatter string resources in the SDK that can be overridden:

| Date Formatter String Resource ID | Current format value |
| --- | --- |
| `tink_date_format_human_today` | Today |
| `tink_date_format_human_yesterday` | Yesterday |
| `tink_date_format_human_tomorrow` | Tomorrow |
| `tink_date_formatter_monthly_compact` | `MMM` |
| `tink_date_formatter_month_name` | `MMMMM` |
| `tink_date_formatter_daily_monthly` | `dd MMM` |
| `tink_date_formatter_daily_monthly_yearly` | `dd MMM yyyy` |
| `tink_date_formatter_day_of_week_compact` | `EEE` |
| `tink_date_formatter_month_and_day_of_week` | `EEEE MMM d` |
| `tink_date_formatter_month_and_day` | `MMMM d` |
| `tink_date_formatter_month_and_day_and_year` | `MMMM d yyyy` |
| `tink_date_formatter_month_and_year` | `MMMM yyyy` |
| `tink_date_formatter_month_and_year_compact` | `MMM yyyy` |
| `tink_date_formatter_yearly` | `yyyy` |
| `tink_date_formatter_daily` | `dd` |
| `tink_date_formatter_day_of_week_full` | `EEEE` |
| `tink_date_formatter_date_with_year` | `MMM d, yyyy` |
| `tink_date_formatter_month_and_day_of_month` | `d MMM` |

## Period picker[](#period-picker)

You can customize the color and alpha value (for disabled state) of the period picker arrow icons shown in the finance overview UI by overriding the style resource attributes that are available.

![Period picker](https://images.ctfassets.net/tmqu5vj33f7w/2zo1HFvPVpGEx2QX1kFxch/d7dc26249943dba738e743c9d5c9fa83/Period_picker.png)

Add your extended `TinkPeriodPickerButtonStyle` style in your application's `styles.xml`.

```
<resources>
    <style name="YourCustomTinkMoneyManagerStyle" parent="TinkMoneyManagerStyle">
        <item name="tink_periodPickerButtonStyle">@style/CustomPeriodPickerButtonStyle</item>
    </style>

    <style name="CustomPeriodPickerButtonStyle" parent="TinkPeriodPickerButtonStyle">
        <item name="tink_period_picker_active_color">@color/custom_activeColor</item>
        <item name="tink_period_picker_disabled_alpha">0.2</item>
    </style>
</resources>
```

## Checkbox corner radius[](#checkbox-corner-radius)

You can modify the appearance of checkboxes shown in the finance overview UI by setting a custom corner radius value. This can be done by extending the existing `TinkMoneyManagerStyle` from the SDK and overriding the checkbox corner radius dimension resource attribute that is available.

![Checkbox corner radius](https://images.ctfassets.net/tmqu5vj33f7w/10X9i4sB98YbnkGefkyHcr/1cf0d411d9d2e6dd34dc798db321decf/Checkbox_corner_radius.png)

Add your extended style in your application's `styles.xml`.

```
<resources>
    <style name="YourCustomTinkMoneyManagerStyle" parent="TinkMoneyManagerStyle">
        <item name="tink_checkbox_corner_radius_in_dp">4dp</item>
    </style>
</resources>
```

Recommended values are in the range from `0dp` to `12dp` where `0dp` will draw a square and `12dp` will draw a circle.

## Pending transaction icon corner radius[](#pending-transaction-icon-corner-radius)

You can modify the appearance of the pending transactions icon by setting a custom corner radius value. This can be done by extending the existing `TinkMoneyManagerStyle` from the SDK and overriding the pending transaction icon radius dimension resource attribute that is available.

Add your extended style in your application's `styles.xml`.

```
<resources>
    <style name="YourCustomTinkMoneyManagerStyle" parent="TinkMoneyManagerStyle">
        <item name="tink_pendingTransactionCornerRadius">4dp</item>
    </style>
</resources>
```

## Transaction date group text appearance[](#transaction-date-group-text-appearance)

You can customize the appearance of transaction date group text in the finance overview UI by overriding the text appearance attribute that is publicly available in the SDK.

![Transaction date group text appearance](https://images.ctfassets.net/tmqu5vj33f7w/35RUOk3mQlcwxbRS9467R9/2d830da2135b6471730ed9a7b73e3fd1/Transaction_date_group_text_appearance.png)

Add your extended `TinkDateGroupTextAppearance` style in your application's `styles.xml`.

```
<resources>
    <style name="YourCustomTinkMoneyManagerStyle" parent="TinkMoneyManagerStyle">
        <item name="tink_dateGroupTextAppearance">@style/CustomDateGroupTextAppearance</item>
    </style>
    
    <style name="CustomDateGroupTextAppearance" parent="TinkDateGroupTextAppearance">
        <item name="android:textColor">@color/custom_textColor</item>
        <item name="android:fontFamily">@font/custom_font</item>
        <item name="android:textSize">@dimen/custom_textSize</item>
    </style>
</resources>
```

## Text fields[](#text-fields)

You can customize the appearance of text fields used in the finance overview UI by extending the `TinkTextInputLayoutStyle` and `TinkEditTextStyle` and overriding the style attributes that are available.

![Text fields](https://images.ctfassets.net/tmqu5vj33f7w/Z5htUdUYzXyj0bZP0BL6c/3a29135cf9421a09d3bfc78812d6d997/Text_fields.png)

Add your extended styles in your application's `styles.xml`.

```
<resources>
    <style name="YourCustomTinkMoneyManagerStyle" parent="TinkMoneyManagerStyle">
        <item name="tink_textInputLayoutStyle">@style/CustomTinkTextInputLayoutStyle</item>
        <item name="tink_editTextStyle">@style/CustomTinkEditTextStyle</item>
    </style>
    
    <style name="CustomTinkTextInputLayoutStyle" parent="TinkTextInputLayoutStyle">
        <!-- Add your custom settings here -->
  </style>
  <style name="CustomTinkEditTextStyle" parent="TinkEditTextStyle">
        <!-- Add your custom settings here -->
  </style>
</resources>
```

## Date pickers[](#date-pickers)

You can customize the appearance of the date picker shown in the finance overview UI by extending the `TinkDatePickerStyle` and overriding the style attribute that is available.

![Date pickers](https://images.ctfassets.net/tmqu5vj33f7w/3ozoAuhnzlLvF0WKa6fg05/107a8f4a324618157030d979f23c8480/Date_pickers.png)

Add your extended styles in your application's `styles.xml`.

```
<resources>
    <style name="YourCustomTinkMoneyManagerStyle" parent="TinkMoneyManagerStyle">
        <item name="tink_datePickerStyle">@style/CustomTinkDatePickerStyle</item>
    </style>
    
    <style name="CustomTinkDatePickerStyle" parent="TinkDatePickerStyle">
        <!-- Add your custom settings here -->
  </style>
</resources>
```

## Alert dialogs[](#alert-dialogs)

You can customize the appearance of the alert dialogs shown in the finance overview UI by extending the `TinkMaterialAlertDialogStyle` and overriding the style attribute that is available. The `TinkMaterialAlertDialogStyle` extends from `ThemeOverlay.MaterialComponents.Dialog.Alert`.

![Alert dialogs](https://images.ctfassets.net/tmqu5vj33f7w/3IvVNykCl1Hx2sEx3imEHF/fcb61e6cdf2b9748434e4e111bb812b1/Alert_dialogs.png)

Add your extended styles in your application's `styles.xml`.

```
<resources>
    <style name="YourCustomTinkMoneyManagerStyle" parent="TinkMoneyManagerStyle">
        <item name="tink_alertDialogStyle">@style/CustomTinkMaterialAlertDialogStyle</item>
    </style>
    
    <style name="CustomTinkMaterialAlertDialogStyle" parent="TinkMaterialAlertDialogStyle">
        <!-- Add your custom settings here -->
  </style>
</resources>
```
