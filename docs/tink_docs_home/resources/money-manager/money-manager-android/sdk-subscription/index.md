---
title: "Subscription for Android - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-android/sdk-subscription/"
exportedAt: "2026-01-13T12:58:34.287Z"
---
*Image removed: Subscription*

## Overview[](#overview)

The subscription feature is a great tool in your app which predicts user subscriptions based on their payments. It analyzes payment patterns to identify and display active subscriptions, helping users manage their finances more effectively. This feature provides insights into subscription trends and potential upcoming charges, ensuring users stay informed about their financial commitments.

## Displaying subscriptions[](#displaying-subscriptions)

To display a user's subscription in a list without launching the finance overview screen, use the Subscription entrypoint. The user can select a subscription to view all transactions under that subscription. To display the Subscription entrypoint, create an instance of `EntryPoint.Subscription` and add it to `Entrypoint.Overview` along with other features to display in finance overview screen.

```
val subscriptionEntryPoint = EntryPoint.Subscription

    TinkMoneyManager.init(
        accessToken = "myAccessToken", // A valid access token.
        styleResId = R.style.MyCustomTinkMoneyManagerStyle, // Resource ID of your style that extends TinkMoneyManagerStyle.
        tracker = myTracker, // Your event tracking implementation (optional).
        backPressedListener = myBackPressedListener, // Your back press listener (optional).
        editPendingTransaction = false, // Determines if pending transactions can be recategorized. Defaults to true.
        enableTransactionDetail = false, // Determines the behaviour of the SDK when the user clicks on a transaction. Defaults to true.
        enableSubscriptions = false, // Determines the behaviour of the SDK wether to show subscription button in expense details screen
        entryPoint = subscriptionEntryPoint, // The Money Manager feature to launch.
        containerId = R.id.fragmentContainer, // The resource ID of the container which will contain the Tink Fragment.
        fragmentManager = supportFragmentManager // The FragmentManager which performs the Tink fragment transaction.
    )
```
