---
title: "Recurring Expenses for iOS - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-ios/recurring-expenses-ios/"
exportedAt: "2026-01-13T12:52:25.831Z"
---
## Overview[](#overview)

Recurring Expenses is a great visual tool for your app's users to see their predicted recurring expenses going to occur in upcoming days (default is 30 days) based on their spending. The feature is being represented as a vertical list of transactions, where each of those displays information about amount and date.

## Displaying recurring expenses[](#displaying-recurring-expenses)

To display a recurring expenses list, simply instantiate a `RecurringExpensesViewController`.

```
let recurringExpensesViewController = RecurringExpensesViewController()
show(recurringExpensesViewController, sender: self)
```

By default this will display all the user's recurring expenses for the upcoming 30 days.
