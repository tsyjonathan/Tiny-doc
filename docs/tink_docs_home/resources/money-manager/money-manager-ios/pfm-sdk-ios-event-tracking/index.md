---
title: "Event tracking for Money Manager on iOS"
source: "https://docs.tink.com/resources/money-manager/money-manager-ios/pfm-sdk-ios-event-tracking"
exportedAt: "2026-01-13T12:52:33.275Z"
---
Money Manager SDK allows you to track certain user events.

A `ScreenEvent` event occurs when a user navigates to a new screen.

## Getting started[](#getting-started)

In order to listen to the different events sent by the SDK you need to implement the `EventTracking` protocol. A very simple implementation that simply prints the events could be:

```
final class DebugEventTracker: EventTracking {
    func track(_ event: ScreenEvent) {
        print("Screen: \(event.name)")
    }
}
```

The `EventTracking` implementation then needs to be assigned to the `EventTracker`.

```
let debugEventTracker = DebugEventTracker()
EventTracker.tracker = debugEventTracker
```

This is all you need to do to track events.

## Events[](#events)

The different screen events that can occur are declared as public constants inside the `ScreenEvent` class. All screens have a `name` property which is consistent across platforms.

| `ScreenEvent` | `name` | Description |
| --- | --- | --- |
| `overview` | Overview | The overview screen. |
| `expenses` | Expenses | The expenses screen. |
| `income` | Income | The income screen. |
| `leftToSpend` | Left To Spend | The left to spend screen. |
| `transactions` | Transactions | The transaction list screen. |
| `categorySelection` | Category Selection | Screen where user selects a category. |
| `similarTransactions` | Transactions.Similar | Screen where user can select similar transactions. |
| `accountDetails` | Account Details | Screen where user can see balance and transactions of a specific account. |
| `events` | Events | Screen where user can see actionable insights. |
| `eventsArchive` | Events Archive | Screen where user can see archived insights. |
| `transactionDetails` | Transaction Details | Screen to display details of a particular transaction. |
| `createBudget` | Create Budget | Screen where user can create a new budget. |
| `editBudget` | Edit Budget | Screen where user can edit the budget. |
| `budgetDetails` | Budget Details | Screen where user can see a budget's details. |
| `budgetTransactions` | Budget Transactions | The budget transaction list screen. |
| `recurringExpenses` | Recurring Expenses | The Recurring Expenses screen. |
| `safeToSpend` | Safe To Spend | The safe to spend screen. |
