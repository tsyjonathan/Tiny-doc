---
title: "Finance overview for Android - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-android/pfm-sdk-android-finance-overview/"
exportedAt: "2026-01-13T12:59:00.669Z"
---
*Image removed: Tink Money Manager Financial Overview*

## Overview[](#overview)

The Finance Overview is a collection of your app's Money Manager features. Here you can choose to display statistics for income, expenses and left to spend, accounts, latest transactions, actionable insights and budgets. It's completely up to you which of these to include or exclude in your app.

## Displaying the Finance Overview[](#displaying-the-finance-overview)

Create an `Entrypoint.Overview` instance and provide which sections should be displayed.

```
     val overviewEntrypoint = EntryPoint.Overview(
        overviewFeatures = OverviewFeatures(
            listOf(
                OverviewFeature.ActionableInsights,
                OverviewFeature.Statistics(listOf(StatisticType.EXPENSES, StatisticType.LEFT_TO_SPEND, StatisticType.SAFE_TO_SPEND, StatisticType.INCOME)),
                OverviewFeature.Accounts(),
                OverviewFeature.Subscription,
                OverviewFeature.LatestTransactions,
                OverviewFeature.RecurringExpenses,
                OverviewFeature.Budgets,
            )
        ),
        toolbarVisible = false, // A boolean value for showing the toolbar on the overview screen. Defaults to false.
        featureSpecificThemes = emptyMap(), // An optional Map where you can set specific themes for Money Manager's individual features.
        insightActionHandler = null, // An optional InsightActionHandler implementation for custom handling of insight actions.
        fragmentViewCreatedListener = this // An optional listener used for ingesting custom views.
    )
```

> **Note:** The order of the items in the `overviewFeatures` parameter also determines the order that the features are laid out on the Finance Overview screen.

Pass this `EntryPoint.Overview` instance as parameter while setting up the `TinkMoneyManager` class.

```
    TinkMoneyManager.init(
        accessToken = "myAccessToken", // A valid access token.
        styleResId = R.style.MyCustomTinkMoneyManagerStyle, // Resource ID of your style that extends TinkMoneyManagerStyle.
        tracker = myTracker, // Your event tracking implementation (optional).
        backPressedListener = myBackPressedListener, // Your back press listener (optional).
        editPendingTransaction = false, // Determines if pending transactions can be recategorized. Defaults to true.
        enableTransactionDetail = false, // Determines the behaviour of the SDK when the user clicks on a transaction. Defaults to true.
        enableRecommendedBudget = true, // Determines if SDK can show Recommended Budgets. Defaults to true.
        enableBudgetCreationSuccessScreen = true, // Determines if SDK can show Budget Confirmation Screen. Defaults to true.
        enableSafeToSpend = true, // Determines if SDK can show Recurring expense in Transaction list. Defaults to true. 
        enableSubscriptions = false, // Determines the behaviour of the SDK wether to show subscription button in expense details screen
        entryPoint = overviewEntrypoint, // The Money Manager feature to launch.
        containerId = R.id.fragmentContainer, // The resource ID of the container which will contain the Tink Fragment.
        fragmentManager = supportFragmentManager // The FragmentManager which performs the Tink fragment transaction.
    )
```

## Features[](#features)

### Statistics[](#statistics)

Add statistics to display an overview of expenses, incomes and left to spend through pie charts. When selecting a pie chart, your app's user will see a detailed view of their spending, income, safe to spend or left to spend statistics. To add statistics to the finance overview screen, add `OverviewFeature.Statistics` to the `OverviewFeatures` instance.

```
OverviewFeatures(
    listOf(
        OverviewFeature.Statistics(
            listOf(
                StatisticType.EXPENSES,
                StatisticType.LEFT_TO_SPEND,
                StatisticType.SAFE_TO_SPEND,
                StatisticType.INCOME
            )
        )
    )
)
```

If you want to show the statistics in your app instead without showing the finance overview screen, refer to the [Statistics entrypoint guide](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-android/sdk-statistics/#displaying-category-statistics).

### Accounts[](#accounts)

Adding accounts to your apps finance overview allows your users to have a clear overview of their account balances. To add accounts to the finance overview screen, add `OverviewFeature.Accounts` to the `OverviewFeatures` instance.

```
OverviewFeatures(
    listOf(
        OverviewFeature.Accounts(
            FilterByFavorites,
            GroupingByKind,
            AccountEditConfiguration(
                listOf(
                    EditAccountField.NAME,
                    EditAccountField.KIND,
                    EditAccountField.IS_FAVORITE,
                    EditAccountField.IS_INCLUDED,
                    EditAccountField.IS_SHARED
                )
            )
        )
    )
)
```

[Read more about the OverviewFeature.Accounts parameters here](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-android/accounts-for-android/#customizing-accounts).

If you want to show the accounts in your app instead without showing the finance overview screen, refer to the [Accounts entrypoint guide](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-android/accounts-for-android/#displaying-an-account-list).

### Latest transactions[](#latest-transactions)

The latest transactions section of your apps finance overview shows a list of the three last transactions made. From there, your user can navigate to a transaction list and view all of their transactions, nicely ordered by date.

```
OverviewFeatures(
    listOf(
        OverviewFeature.LatestTransactions
    )
)
```

If you want to show the transactions in your app instead without showing the finance overview screen, refer to the [Transactions entrypoint guide](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-android/sdk-transactions/).

### Actionable Insights[](#actionable-insights)

The actionable insights in your finance overview will notify your app's users when there are new insights to take action on.

```
OverviewFeatures(
    listOf(
        OverviewFeature.ActionableInsights
    )
)
```

[Read more about custom and default handling of insight actions here.](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-android/pfm-sdk-android-handling-insight-actions/#responding-to-user-actions)

If you want to show the actionable insights in your app instead without showing the finance overview screen, refer to the [Actionable insights entrypoint guide](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-android/pfm-sdk-android-handling-insight-actions/#displaying-an-actionable-insight-list).

### Budgets[](#budgets)

Let your users create budgets and track them on the overview.

```
OverviewFeatures(
    listOf(
        OverviewFeature.Budgets
    )
)
```

If you want to show the budgets in your app instead without showing the finance overview screen, refer to the [Budgets entrypoint guide](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-android/sdk-budgets/#displaying-budgets).

### Subscription[](#subscription)

Let your users create budgets and track them on the overview.

```
OverviewFeatures(
    listOf(
        OverviewFeature.Subscription
    )
)
```

If you want to show the subscription in your app instead without showing the finance overview screen, refer to the [Subscription entrypoint guide](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-android/sdk-subscription/#displaying-subscriptions).

### Custom views[](#custom-views)

Display your own views in the Finance Overview screen. Add one or more `OverviewFeature.CustomContainerView` to the `OverviewFeatures` parameter.

For each custom view, you will first need to create a corresponding `id` in a resource file:

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <!--id for custom view containers-->
    <item name="my_custom_view_container_one" type="id" />
    <item name="my_custom_view_container_two" type="id" />
    <item name="my_custom_view_container_three" type="id" />
</resources>
```

Each custom view will be wrapped in a `FrameLayout` by the SDK with the id specified in the resource file and placed in the Overview screen according to the order specified in the list of overview features.

```
val sampleOverviewFeatures =
        OverviewFeatures(
            listOf(
                OverviewFeature.CustomContainerView(
                    containerViewId = R.id.my_custom_view_container_one, // ID defined in the resource file.
                    width = FrameLayout.LayoutParams.MATCH_PARENT,
                    height = FrameLayout.LayoutParams.WRAP_CONTENT
                ), // first position from top in the Overview screen.
                OverviewFeature.ActionableInsights,
                OverviewFeature.Statistics(listOf(StatisticType.EXPENSES, StatisticType.INCOME, StatisticType.SAFE_TO_SPEND, StatisticType.LEFT_TO_SPEND)),
                OverviewFeature.CustomContainerView(
                    containerViewId = R.id.my_custom_view_container_two, // ID defined in the resource file.
                    width = FrameLayout.LayoutParams.MATCH_PARENT,
                    height = FrameLayout.LayoutParams.WRAP_CONTENT
                ),
                OverviewFeature.Accounts(),
                OverviewFeature.Subscription,
                OverviewFeature.LatestTransactions,
                OverviewFeature.CustomContainerView(
                    containerViewId = R.id.my_custom_view_container_three, // ID defined in the resource file.
                    width = FrameLayout.LayoutParams.MATCH_PARENT,
                    height = FrameLayout.LayoutParams.WRAP_CONTENT
                ) // last position from top in the Overview screen.
            )
        )
```

For configuring the content and the behaviour of the custom views (e.g. click listeners for buttons, animation, etc) your hosting activity should implement the `OnFragmentViewCreatedListener` interface. The `onFragmentViewCreated()` callback method will be invoked when the custom view containers are laid out and attached to the Finance Overview screen.

```
override fun onFragmentViewCreated() {
    setupCustomView(R.id.my_custom_view_container_one)
    setupCustomView(R.id.my_custom_view_container_two)
    setupCustomView(R.id.my_custom_view_container_three)
}
```

Setting up your custom view requires first to retrieve the FrameLayout container wrapping your custom view. This is achieved by calling the `getContainerById(customViewId, OnCustomContainerCreatedListener)` method with the custom view id. Then, inside the `onCustomContainerCreated(container: FrameLayout)`, you can inflate your layout and configure your custom view.

```
private fun setupCustomViews(customViewId: Int) {
    TinkMoneyManager.getContainerById(
        customViewId, // ID defined in the resource file.
        object : OnCustomContainerCreatedListener {
            override fun onCustomContainerCreated(container: FrameLayout) {
                // Inflate layout and set up the content and behaviour.
                val customComponent = View.inflate(
                    this@MainActivity,
                    R.layout.layout_custom_view,
                    container
                )
    
                customComponent.findViewById<Button>(R.id.custom_view_button)
                    .setOnClickListener {
                        Toast.makeText(
                            it.context,
                            "My custom button clicked",
                            Toast.LENGTH_SHORT
                        )
                            .show()
                    }
            }
        }
    )
}
```
