---
title: "Event tracking for Money Manager on Android"
source: "https://docs.tink.com/resources/money-manager-android/pfm-sdk-android-event-tracking"
exportedAt: "2026-01-13T12:59:08.208Z"
---
Money Manager SDK allows you to track certain user events.

A `ScreenEvent` event occurs when a user navigates to a new screen.

## Getting started[](#getting-started)

In order to track the different events sent by the SDK you have to implement the `EventTracker` interface. A very simple implementation that simply prints the events could be:

```
class LogTracker : EventTracker {
    override fun track(screenEvent: ScreenEvent) {
        Timber.tag(TAG).d("Track screen - Screen name: %s", screenEvent.name)
    }
}
```

The `EventTracker` implementation then needs to be configured when calling the `TinkMoneyManager.init()` method.

```
val TinkMoneyManager.init(
    accessToken = "myAccessToken",  // A valid access token.
    styleResId = R.style.TinkStyle_DayNight,  // Resource ID of your style that extends TinkMoneyManagerStyle.
    tracker = LogTracker(),  // Your event tracking implementation (optional).
)
```

This is all you need to do to track events on different screens.

## Events[](#events)

The different screen events that can occur are declared as public constants inside the `ScreenEvent` class. All screens have a `name` property which is consistent across platforms.

| `ScreenEvent` | `name` | Description |
| --- | --- | --- |
| `OVERVIEW` | Overview | The overview screen. |
| `CATEGORY_SELECTION` | Category Selection | Screen where user can choose from a list of categories. |
| `EXPENSES` | Expenses | The expenses screen. |
| `INCOME` | Income | The income screen. |
| `LEFT_TO_SPEND` | Left To Spend | The left to spend screen. |
| `TRANSACTIONS` | Transactions | The transaction list. |
| `SIMILAR_TRANSACTIONS` | Transactions.Similar | Screen where user can select similar transactions. |
| `ACCOUNT_DETAILS` | Account Details | Screen where user can see balance and transactions of a specific account. |
| `EVENTS` | Events | Screen where user can see actionable insights. |
| `EVENTS_ARCHIVE` | Events Archive | Screen where user can see archived insights. |
| `TRANSACTION_DETAILS` | Transaction Details | Screen to display details of a particular transaction. |
| `CREATE_BUDGET` | Create Budget | Screen where the user creates a new budget. |
| `EDIT_BUDGET` | Edit Budget | Screen where the user edits a budget. |
| `BUDGET_DETAILS` | Budget Details | Screen where user can see details of a budget. |
| `BUDGET_TRANSACTIONS` | Budget Transactions | Screen where user can see the list of transactions that relates to a specific budget. |
