---
title: "Additional requirements for Android - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-android/sdk-additional-requirements/"
exportedAt: "2026-01-13T12:51:58.845Z"
---
## Handling the back navigation[](#handling-the-back-navigation)

To ensure proper navigation functionality when the **Money Manager SDK** is visible on the screen, you must forward all back press events to it.

To check if the SDK is visible on the screen make a call to the `isSdkActive()` method of the `TinkMoneyManager` class.

To forward a back press event to the SDK, override the `onBackPressed()` method in your activity and call `onBackPressed()` on the `TinkMoneyManager`class. When the last step of the back stack is reached, calling `TinkMoneyManager.onBackPressed()` will remove the SDK from the screen.

```
// In your activity:

override fun onBackPressed() {
    if (TinkMoneyManager.isSdkActive()) {

        // Tink Money Manager is active and visible on the screen.
        // Delegate the back press to Tink SDK.
        TinkMoneyManager.onBackPressed()

        if (!TinkMoneyManager.isSdkActive()) {
            // Tink Money Manager is removed from the stack.
            ...
        }
    } else {
        // Tink Money Manager is not active or visible on screen.
        super.onBackPressed()
    }
}
```

## Screen orientation[](#screen-orientation)

The **Money Manager SDK** only works correctly when the screen orientation is locked to portrait mode. Fixing it to landscape mode or changing the configuration dynamically will lead to unexpected results and suboptimal user experience.

You can achieve this by opening your Android manifest file and setting `android:screenOrientation=“portrait”` on the Activity that is starting the SDK.

## Restoring state[](#restoring-state)

To ensure proper handling of configuration changes when the **Tink Money Manager SDK** remains visible on the screen, you should invoke the `onRestore(fragmentManager: FragmentManager)` method of the `TinkMoneyManager`class after any configuration changes and provide an appropriate instance of the `FragmentManager`.

You can achieve this by checking the value of the `savedInstanceState` parameter within the `onCreate()` method of the Activity that launched the SDK.

```
    override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    if (savedInstanceState != null) {
        TinkMoneyManager.onRestore(supportFragmentManager)
    }

    // ...
}
```

## Configuring transaction item action[](#configuring-transaction-item-action)

The `enableTransactionDetail` property of the `TinkMoneyManager.init()` method, lets you configure what should happen when a transaction is selected.

It can be set to either to show transaction details:

```
TinkMoneyManager.init(
    // ...
    enableTransactionDetail = true
)
```

The details view displays more information about the transaction and lets the user edit or recategorize the transaction.

Or to show the categorization flow:

```
TinkMoneyManager.init(
    // ...
    enableTransactionDetail = false
)
```

The categorization view lets the user choose a new category for the selected transaction directly from one of the transaction lists.

## Configuring pending transactions[](#configuring-pending-transactions)

Transactions that are not yet confirmed by the user's bank or can change in the future are called pending transactions. We use a different design to show that transactions are in the pending state.

*Image removed: Android Pending trx list*

By default, they can be edited like any other transaction, however you can configure this setting if you want to limit your users from editing the category of a transaction before it is in its final state.

Set the value of `editPendingTransaction` to false to disable it:

```
TinkMoneyManager.init(
    // ...
    editPendingTransaction = false
)
```
