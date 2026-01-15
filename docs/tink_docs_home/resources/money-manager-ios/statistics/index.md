---
title: "Statistics for iOS - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-ios/statistics/"
exportedAt: "2026-01-13T13:00:18.006Z"
---
*Image removed: Statistics*

## Overview[](#overview)

Statistics contain derived data from different types of information which is available for a user.

## Displaying category statistics[](#displaying-category-statistics)

A `CategoryStatisticsViewController` displays an interface for browsing combined sum of categories by month.

Creating a statistics view requires you to provide which type of categories to display statistics for. The statistics can be viewed either in a pie chart or a horizontal bar chart.

```
let categoryStatisticsViewController = CategoryStatisticsViewController(categoryType: .expenses, style: .pieChart)
present(categoryStatisticsViewController, animated: true)
```

> **Note:** The `CategoryStatisticsViewController` manages it's own `UINavigationController` for navigating between subcategories and transactions lists. It's designed to be presented modally or in a tab but cannot be pushed into a `UINavigationController`.\*

## Displaying left to spend statistics[](#displaying-left-to-spend-statistics)

Create a `LeftToSpendViewController` and present it to display an interface for browsing left to spend statistics by month.

```
let leftToSpendViewController = LeftToSpendViewController()
show(leftToSpendViewController, sender: nil)
```

The `LeftToSpendViewController` has a right navigation item configured so if the `LeftToSpendViewController` is pushed into a `UINavigationController` it will display a button to show transactions for the time period that the user is looking at.

## Displaying safe to spend statistics[](#displaying-safe-to-spend-statistics)

Create a `SafeToSpendViewController` and present it to display an interface for browsing safe to spend statistics by month.

```
let safeToSpendViewController = SafeToSpendViewController()
show(safeToSpendViewController, sender: nil)
```

The `SafeToSpendViewController` has a right navigation item configured so if the `SafeToSpendViewController` is pushed into a `UINavigationController` it will display a button to show transactions for the time period that the user is looking at.
