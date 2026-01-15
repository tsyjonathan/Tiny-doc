---
title: "List of available insights - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/list-of-available-insights/"
exportedAt: "2026-01-13T12:50:47.492Z"
---
Actionable insights differ in types. Each type has specific data relevant to that insight, as well as a set of actions which lets users interact with your app. Here you can find a list of the available insights on the Tink platform, along with their default actions.

| Insight | Type | Actions |
| --- | --- | --- |
| Account Balance Low | `ACCOUNT_BALANCE_LOW` | `CREATE_TRANSFER`, `DISMISS` |
| Budget Close Negative | `BUDGET_CLOSE_NEGATIVE` | `VIEW_BUDGET`, `DISMISS` |
| Budget Close Positive | `BUDGET_CLOSE_POSITIVE` | `VIEW_BUDGET`, `DISMISS` |
| Budget Overspent | `BUDGET_OVERSPENT` | `VIEW_BUDGET`, `DISMISS` |
| Budget Success | `BUDGET_SUCCESS` | `VIEW_BUDGET`, `DISMISS` |
| Budget Summary Achieved | `BUDGET_SUMMARY_ACHIEVED` | `CREATE_TRANSFER`, `DISMISS` |
| Budget Summary Overspent | `BUDGET_SUMMARY_OVERSPENT` | `ACKNOWLEDGE` |
| Budget Suggest Create Top Category | `BUDGET_SUGGEST_CREATE_TOP_CATEGORY` | `CREATE_BUDGET`, `DISMISS` |
| Budget Suggest Create Top Primary Category | `BUDGET_SUGGEST_CREATE_TOP_PRIMARY_CATEGORY` | `CREATE_BUDGET`, `DISMISS` |
| Budget Suggest Create First | `BUDGET_SUGGEST_CREATE_FIRST` | `CREATE_BUDGET`, `DISMISS` |
| Weekly Uncategorized Transactions | `WEEKLY_UNCATEGORIZED_TRANSACTIONS` | `CATEGORIZE_TRANSACTIONS`, `DISMISS` |
| Weekly Uncategorized Transactions By Account | `WEEKLY_UNCATEGORIZED_TRANSACTIONS_BY_ACCOUNT` | `CATEGORIZE_TRANSACTIONS`, `DISMISS` |
| Weekly Summary Expenses By Category | `WEEKLY_SUMMARY_EXPENSES_BY_CATEGORY` | `VIEW_TRANSACTIONS_BY_CATEGORY`, `DISMISS` |
| Single Uncategorized Transaction | `SINGLE_UNCATEGORIZED_TRANSACTION` | `CATEGORIZE_EXPENSE`, `DISMISS` |
| Double Charge | `DOUBLE_CHARGE` | `VIEW_TRANSACTIONS`, `DISMISS` |
| Monthly Summary Expenses By Category | `MONTHLY_SUMMARY_EXPENSES_BY_CATEGORY` | `VIEW_TRANSACTIONS_BY_CATEGORY`, `DISMISS` |
| Weekly Summary Expenses By Day | `WEEKLY_SUMMARY_EXPENSES_BY_DAY` | `ACKNOWLEDGE` |
| Large Expense | `LARGE_EXPENSE` | `VIEW_TRANSACTION`, `DISMISS` |
| Credit Card Limit Close | `CREDIT_CARD_LIMIT_CLOSE` | `VIEW_ACCOUNT`, `DISMISS` |
| Credit Card Limit Reached | `CREDIT_CARD_LIMIT_REACHED` | `VIEW_ACCOUNT`, `DISMISS` |
| Weekly Summary Expense Transactions | `WEEKLY_SUMMARY_EXPENSE_TRANSACTIONS` | `VIEW_TRANSACTIONS`, `DISMISS` |
| Monthly Summary Expense Transactions | `MONTHLY_SUMMARY_EXPENSE_TRANSACTIONS` | `VIEW_TRANSACTIONS`, `DISMISS` |
| New Income Transaction | `NEW_INCOME_TRANSACTION` | `VIEW_TRANSACTION`, `DISMISS` |
| Suggest Set Up Savings Account | `SUGGEST_SET_UP_SAVINGS_ACCOUNT` | `CREATE_TRANSFER`, `DISMISS` |
| Left To Spend Positive Mid Month | `LEFT_TO_SPEND_POSITIVE_MID_MONTH` | `VIEW_LEFT_TO_SPEND`, `DISMISS` |
| Left To Spend Negative Mid Month | `LEFT_TO_SPEND_NEGATIVE_MID_MONTH` | `VIEW_LEFT_TO_SPEND`, `DISMISS` |
| Left To Spend Positive Beginning Month | `LEFT_TO_SPEND_POSITIVE_BEGINNING_MONTH` | `VIEW_LEFT_TO_SPEND`, `DISMISS` |
| Left To Spend Negative Beginning Month | `LEFT_TO_SPEND_NEGATIVE_BEGINNING_MONTH` | `VIEW_LEFT_TO_SPEND`, `DISMISS` |
| Left To Spend Positive Summary Savings Account | `LEFT_TO_SPEND_POSITIVE_SUMMARY_SAVINGS_ACCOUNT` | `CREATE_TRANSFER`, `DISMISS` |
| Left To Spend Positive Summary Savings Account by account | `LEFT_TO_SPEND_POSITIVE_SUMMARY_SAVINGS_ACCOUNT_BY_ACCOUNT` | `CREATE_TRANSFER`, `DISMISS` |
| Left To Spend Positive Final Week | `LEFT_TO_SPEND_POSITIVE_FINAL_WEEK` | `VIEW_LEFT_TO_SPEND`, `DISMISS` |
| Spending By Category Increased | `SPENDING_BY_CATEGORY_INCREASED` | `VIEW_TRANSACTIONS`, `DISMISS` |
| Spending By Primary Category Increased | `SPENDING_BY_PRIMARY_CATEGORY_INCREASED` | `VIEW_TRANSACTIONS_BY_CATEGORY`, `DISMISS` |
| Aggregation Refresh PSD2 Credential | `AGGREGATION_REFRESH_PSD2_CREDENTIAL` | `REFRESH_CREDENTIAL`, `DISMISS` |
| Safe To Spend Beginning of Month | `SAFE_TO_SPEND_BEGINNING_OF_MONTH` | `ACKNOWLEDGE` |
| Recurring Costs Too High | `RECURRING_COSTS_TOO_HIGH` | `ACKNOWLEDGE` |
| Renew Consent | `RENEW_CONSENT` | `REFRESH_CREDENTIAL`, `DISMISS` |

## Insight Data[](#insight-data)

Insight data differs between different insight types. It is determined by the domain and data points, which are used during insight generation. Insight data is built to present only relevant data to the users.

### Account Balance low[](#account-balance-low)

Informs the user about a low balance. A transfer action will be proposed only if the account has an identifier.

-   **Trigger**: Account balance is less than 80% of the user’s trendline over the last 6 months.
-   **Expires**: 7 days from the insight generation time.

```
{
  "type": "ACCOUNT_BALANCE_LOW",
  "data": {
    "type": "ACCOUNT_BALANCE_LOW",
    "accountId": "c6f26025fbb949a08348e2f73f0ae12c",
    "balance": {
      "currencyCode": "EUR",
      "amount": 2.42
    }
  }
}
```

### Budget Close Negative[](#budget-close-negative)

Informs the user that a budget period is close to an end and has a high probability of being overspent.

-   **Trigger**: The user’s budget spent amount has passed half of the total amount, and the user is in the second half of the period.
-   **Expires**: The day the budget period ends.

```
{
  "type": "BUDGET_CLOSE_NEGATIVE",
  "data": {
    "type": "BUDGET_CLOSE_NEGATIVE",
    "budgetId": "cbbac116e43c4b21b7013091ec03d590",
    "budgetPeriod": {
      "start": 1567296000000,
      "end": 1569887999999,
      "spentAmount": {
        "currencyCode": "EUR",
        "amount": 114.31
      },
      "budgetAmount": {
        "currencyCode": "EUR",
        "amount": 120.00
      }
    },
    "currentTime": 1569593745000,
    "periodUnit": "MONTH"
  }
}
```

### Budget Close Positive[](#budget-close-positive)

Informs the user about a budget period that is close to an end and has a high probability of success.

-   **Trigger**: The user’s budget spent amount is less than half of its total amount, and the user is in the second half of the period.
-   **Expires**: The day the budget period ends.

```
{
  "type": "BUDGET_CLOSE_POSITIVE",
  "data": {
    "type": "BUDGET_CLOSE_POSITIVE",
    "budgetId": "cbbac116e43c4b21b7013091ec03d590",
    "budgetPeriod": {
      "start": 1567296000000,
      "end": 1569887999999,
      "spentAmount": {
        "currencyCode": "EUR",
        "amount": 50.45
      },
      "budgetAmount": {
        "currencyCode": "EUR",
        "amount": 120.00
      }
    },
    "currentTime": 1569593745000,
    "periodUnit": "MONTH"
  }
}
```

### Budget Overspent[](#budget-overspent)

_Note: Only Recurring Budgets are supported._

Informs the user about the current budget period being overspent.

-   **Trigger**: The budget spent amount exceeds its total amount for the current budget period.
-   **Expires**: At the end of the current budget period.

```
{
  "type": "BUDGET_OVERSPENT",
  "data": {
    "type": "BUDGET_OVERSPENT",
    "budgetId": "cbbac116e43c4b21b7013091ec03d590",
    "budgetPeriod": {
      "start": 1567296000000,
      "end": 1569887999999,
      "spentAmount": {
        "currencyCode": "EUR",
        "amount": 130.20
      },
      "budgetAmount": {
        "currencyCode": "EUR",
        "amount": 120.00
      },
      "periodUnit": "MONTH"
    }
  }
}
```

### Budget Success[](#budget-success)

_Note: Only Recurring Budgets are supported._

Informs the user about a successful budget period.

-   **Trigger**: The budget spent amount is less than or equal to the total amount for the latest budget period.
-   **Expires**: At the end of the following monthly period for `MONTHLY` and `YEARLY` budgets, the end of the following week for `WEEKLY`.

```
{
  "type": "BUDGET_SUCCESS",
  "data": {
    "type": "BUDGET_SUCCESS",
    "budgetId": "cbbac116e43c4b21b7013091ec03d590",
    "budgetPeriod": {
      "start": 1567296000000,
      "end": 1569887999999,
      "spentAmount": {
        "currencyCode": "EUR",
        "amount": 70.35
      },
      "budgetAmount": {
        "currencyCode": "EUR",
        "amount": 120.00
      },
      "periodUnit": "MONTH"
    }
  }
}
```

### Budget Summary Achieved[](#budget-summary-achieved)

_Note: Only Recurring Budgets are supported._

Informs the user that all budget outcomes were successful for a budget period.

-   **Trigger**: The total spent amount across all budgets is less than or equal to the sum of all budget amounts for the latest budget period.
-   **Expires**: At the end of the following monthly period for `MONTHLY` and `YEARLY` budgets, the end of the following week for `WEEKLY`.

```
{
  "type": "BUDGET_SUMMARY_ACHIEVED",
  "data": {
    "type": "BUDGET_SUMMARY_ACHIEVED",
    "achievedBudgets": [
      {
        "budgetId": "c8f8aba8826b4c5d9b1aa9bb4aff7644",
        "budgetName": "Coffee budget",
        "budgetFilter": {
          "accounts": [
            {
              "id": "99fc0b907abb4f519a08c616086373dd"
            }
          ],
          "categories": [
            {
              "code": "expenses:food.coffee"
            }
          ],
          "freeTextQuery": "Monmouth Coffee",
          "tags": [
            {
              "key": "coffee"
            }
          ]
        },
        "budgetPeriod": {
          "start": 1567296000000,
          "end": 1569887999999,
          "spentAmount": {
            "currencyCode": "EUR",
            "amount": 70.00
          },
          "budgetAmount": {
            "currencyCode": "EUR",
            "amount": 100.00
          }
        }
      }
    ],
    "overspentBudgets": [
      {
        "budgetId": "1c86d85a466f469ebdb54dd8bae784d1",
        "budgetName": "Restaurant Budget",
        "budgetFilter": {
          "accounts": [
            {
              "id": "fe34e15244334995bd227e380fcb82fa"
            }
          ],
          "categories": [
            {
              "code": "01f944531ab04cd3ba32a14cebe8a927"
            }
          ],
          "freeTextQuery": "Monmouth Coffee",
          "tags": [
            {
              "key": "coffee"
            }
          ]
        },
        "budgetPeriod": {
          "start": 1567296000000,
          "end": 1569887999999,
          "spentAmount": {
            "currencyCode": "EUR",
            "amount": 140.00
          },
          "budgetAmount": {
            "currencyCode": "EUR",
            "amount": 130.00
          }
        }
      }
    ],
    "savedAmount": {
      "currencyCode": "EUR",
      "amount": 20.00
    },
    "periodUnit": "MONTH"
  }
}
```

### Budget Summary Overspent[](#budget-summary-overspent)

_Note: Only Recurring Budgets are supported._

Informs the user that all budget outcomes combined were overspent for a period.

-   **Trigger**: The total spent amount across all budgets exceeded the sum of all budget amounts for the latest budget period.
-   **Expires**: At the end of the following monthly period for `MONTHLY` and `YEARLY` budgets, the end of the following week for `WEEKLY`.

```
{
  "type": "BUDGET_SUMMARY_OVERSPENT",
  "data": {
    "type": "BUDGET_SUMMARY_OVERSPENT",
    "achievedBudgets": [
      {
        "budgetId": "c8f8aba8826b4c5d9b1aa9bb4aff7644",
        "budgetName": "Coffee budget",
        "budgetFilter": {
            "accounts": [
                {
                    "id": "fe34e15244334995bd227e380fcb82fa"
                }
            ],
            "categories": [
                {
                    "code": "01f944531ab04cd3ba32a14cebe8a927"
                }
            ],
            "freeTextQuery": "Monmouth Coffee",
            "tags": [
                {
                    "key": "coffee"
                }
            ]
        },  
        "budgetPeriod": {
          "start": 1567296000000,
          "end": 1569887999999,
          "spentAmount": {
            "currencyCode": "EUR",
            "amount": 90.00
          },
          "budgetAmount": {
            "currencyCode": "EUR",
            "amount": 100.00
          }
        }
      }
    ],
    "overspentBudgets": [
      {
        "budgetId": "1c86d85a466f469ebdb54dd8bae784d1",
        "budgetName": "Restaurant Budget",
        "budgetFilter": {
          "accounts": [
            {
              "id": "fe34e15244334995bd227e380fcb82fa"
            }
          ],
          "categories": [
            {
              "code": "01f944531ab04cd3ba32a14cebe8a927"
            }
          ],
          "freeTextQuery": "Monmouth Coffee",
          "tags": [
            {
              "key": "coffee"
            }
          ]
        },
        "budgetPeriod": {
          "start": 1567296000000,
          "end": 1569887999999,
          "spentAmount": {
            "currencyCode": "EUR",
            "amount": 160.00
          },
          "budgetAmount": {
            "currencyCode": "EUR",
            "amount": 120.00
          }
        }
      }
    ],
    "overspentAmount": {
      "currencyCode": "EUR",
      "amount": 30.00
    },
    "periodUnit": "MONTH"
  }
}
```

### Budget Suggest Create Top Category[](#budget-suggest-create-top-category)

The user is encouraged to create a budget for their highest expense child category during the last calendar month. This insight is triggered for a sub set of child categories. Categories that might not make sense to create a budget for, like mortgage or rent, are excluded.

-   **Trigger**: The user does not have a prior budget for their highest expense child category during the last calendar month.
-   **Expires**: At the end of the current calendar month.

```
{
  "type": "BUDGET_SUGGEST_CREATE_TOP_CATEGORY",
  "data": {
    "type": "BUDGET_SUGGEST_CREATE_TOP_CATEGORY",
    "categorySpending": {
      "categoryCode": "expenses:food.bars",
      "spentAmount": {
        "amount": 400,
        "currencyCode": "EUR"
      }
    },
    "suggestedBudgetAmount": {
      "amount": 350,
      "currencyCode": "EUR"
    }
  }
}
```

### Budget Suggest Create Top Primary Category[](#budget-suggest-create-top-primary-category)

The user is encouraged to create a budget for their highest expense primary (also called parent) category during the last calendar month. This insight is intended to be used by clients, who use mainly primary categories.

-   **Trigger**: The user is encouraged to create a budget for their highest primary expense category during the last calendar month. Some categories that might not make sense to create a budget for are excluded.
-   **Expires**: At the end of the current calendar month.

```
{
  "type": "BUDGET_SUGGEST_CREATE_TOP_PRIMARY_CATEGORY",
  "data": {
    "type": "BUDGET_SUGGEST_CREATE_TOP_PRIMARY_CATEGORY",
    "categorySpending": {
      "categoryCode": "expenses:food",
      "spentAmount": {
        "amount": 400,
        "currencyCode": "EUR"
      }
    },
    "suggestedBudgetAmount": {
      "amount": 360,
      "currencyCode": "EUR"
    }
  }
}
```

### Budget Suggest Create First[](#budget-suggest-create-first)

The user is encouraged to create their first budget.

-   **Trigger**: The user has no active or archived budgets.
-   **Expires**: At the end of the current calendar month.

```
{
  "type": "BUDGET_SUGGEST_CREATE_FIRST",
  "data": {
    "type": "BUDGET_SUGGEST_CREATE_FIRST",
  }
}
```

### Weekly Uncategorized Transactions[](#weekly-uncategorized-transactions)

Shows user's uncategorized transactions for the previous week.

-   **Trigger**: A new week has started, the insight will consider transactions that have happened during the recently finished week.
-   **Expires**: At the end of the current week.

```
{
  "type": "WEEKLY_UNCATEGORIZED_TRANSACTIONS",
  "data": {
    "type": "WEEKLY_UNCATEGORIZED_TRANSACTIONS",
    "week": {
      "year": 2019,
      "week": 43
    },
    "transactionIds": [
      "0e068c995f154de196136a381aa4a6a8",
      "e069e73732054062899a9470c22d178e",
      "dee31caf9c464291bafe193804fd2ca3"
    ]
  }
}
```

### Weekly Uncategorized Transactions By Account[](#weekly-uncategorized-transactions-by-account)

Shows account's uncategorized transactions for the previous week.

-   **Trigger**: A new week has started, the insight will consider transactions that have happened during the recently finished week.
-   **Expires**: At the end of the current week.

```
{
  "type": "WEEKLY_UNCATEGORIZED_TRANSACTIONS_BY_ACCOUNT",
  "data": {
    "type": "WEEKLY_UNCATEGORIZED_TRANSACTIONS_BY_ACCOUNT",
    "week": {
      "year": 2019,
      "week": 43
    },
    "accountId": "325ee4ccf579450ca59d89ee54fa7e40",
    "transactionIds": [
      "e069e73732054062899a9470c22d178e",
      "dee31caf9c464291bafe193804fd2ca3"
    ]
  }
}
```

### Weekly Summary Expenses By Category[](#weekly-summary-expenses-by-category)

Shows a user’s summarised expenses by category for the previous week. “View Transactions By Category” action contains transactions by category in the data field.

-   **Trigger**: A new week has started, the insight will consider transactions that have happened during the recently finished week.
-   **Expires**: At the end of the current week.

```
{
  "type": "WEEKLY_SUMMARY_EXPENSES_BY_CATEGORY",
  "data": {
    "type": "WEEKLY_SUMMARY_EXPENSES_BY_CATEGORY",
    "week": {
      "year": 2019,
      "week": 43
    },
    "expensesByCategory": [
      {
        "categoryCode": "expenses:food.coffee",
        "spentAmount": {
          "currencyCode": "EUR",
          "amount": 7.0
        }
      },
      {
        "categoryCode": "expenses:food.groceries",
        "spentAmount": {
          "currencyCode": "EUR",
          "amount": 77.76
        }
      }
    ]
  }
}
```

### Single Uncategorized Transaction[](#single-uncategorized-transaction)

Informs the user that a transaction with a missing category has been found.

-   **Trigger**: When a transaction, happened within the last 3 days, has no category bound to it.
-   **Expires**: 3 days from the insight generation time.

```
{
  "type": "SINGLE_UNCATEGORIZED_TRANSACTION",
  "data": {
    "type": "SINGLE_UNCATEGORIZED_TRANSACTION",
    "transactionId": "3c6cff733e0045e292819f1b83b32d5b"
  }
}
```

### Double Charge[](#double-charge)

Notifies the user that suspected double charges have been found. This may happen if multiple transactions occur with the same description and amount on the same day.

-   **Trigger**: Multiple transactions have been registered with the same amount, description and date.
-   **Expires**: 5 days from the insight generation time.

```
{
  "type": "DOUBLE_CHARGE",
  "data": {
    "type": "DOUBLE_CHARGE",
    "transactionIds": [
      "bb2bac54ea1c468aadc1c5ee29e35dc2",
      "2c1df3a0c590485b94eaf93771968497"
    ]
  }
}
```

### Monthly Summary Expenses By Category[](#monthly-summary-expenses-by-category)

Shows a user’s summarised expenses by category for the last month.

-   **Trigger**: A new month has started, the insight will consider transactions that have happened during the recently finished month.
-   **Expires**: At the end of the month or `MONTHLY_ADJUSTED` period.

```
{
  "type": "MONTHLY_SUMMARY_EXPENSES_BY_CATEGORY",
  "data": {
    "type": "MONTHLY_SUMMARY_EXPENSES_BY_CATEGORY",
    "month": {
      "month": 1,
      "year": 2020
    },
    "expensesByCategory": [
      {
        "categoryCode": "expenses:food.coffee",
        "spentAmount": {
          "currencyCode": "EUR",
          "amount": 28.0
        }
      },
      {
        "categoryCode": "expenses:food.groceries",
        "spentAmount": {
          "currencyCode": "EUR",
          "amount": 115.75
        }
      }
    ]
  }
}
```

### Weekly Summary Expenses By Day[](#weekly-summary-expenses-by-day)

Shows the user a summary for each day of the previous week. The summary includes an 8-week historical average for each day.

-   **Trigger**: A new week has started, the insight will consider transactions that happened during the recently finished week.
-   **Expires**: At the end of the current week.

```
{
  "type": "WEEKLY_SUMMARY_EXPENSES_BY_DAY",
  "data": {
    "type": "WEEKLY_SUMMARY_EXPENSES_BY_DAY",
    "week": {
      "year": 2019,
      "week": 43
    },
    "expenseStatisticsByDay": [
      {
        "date": [2019,10,27],
        "expenseStatistics": {
          "totalAmount": {
            "currencyCode": "EUR",
            "amount": 57
          },
          "averageAmount": {
            "currencyCode": "EUR",
            "amount": 60
          }
        }
      },
      {
        "date": [2019,10,26],
        "expenseStatistics": {
          "totalAmount": {
            "currencyCode": "EUR",
            "amount": 63.5
          },
          "averageAmount": {
            "currencyCode": "EUR",
            "amount": 71
          }
        }
      },
      {
        "date": [2019,10,25],
        "expenseStatistics": {
          "totalAmount": {
            "currencyCode": "EUR",
            "amount": 56.3
          },
          "averageAmount": {
            "currencyCode": "EUR",
            "amount": 55
          }
        }
      },
      {
        "date": [2019,10,24],
        "expenseStatistics": {
          "totalAmount": {
            "currencyCode": "EUR",
            "amount": 158
          },
          "averageAmount": {
            "currencyCode": "EUR",
            "amount": 60
          }
        }
      },
      {
        "date": [2019,10,23],
        "expenseStatistics": {
          "totalAmount": {
            "currencyCode": "EUR",
            "amount": 123
          },
          "averageAmount": {
            "currencyCode": "EUR",
            "amount": 96.22
          }
        }
      },
      {
        "date": [2019,10,22],
        "expenseStatistics": {
          "totalAmount": {
            "currencyCode": "EUR",
            "amount": 0
          },
          "averageAmount": {
            "currencyCode": "EUR",
            "amount": 43.5
          }
        }
      },
      {
        "date": [2019,10,21],
        "expenseStatistics": {
          "totalAmount": {
            "currencyCode": "EUR",
            "amount": 103
          },
          "averageAmount": {
            "currencyCode": "EUR",
            "amount": 105.3
          }
        }
      }
    ]
  }
}
```

### Large Expense[](#large-expense)

Notifies the user that a large expense has been discovered.

-   **Trigger**: Expense transactions are evaluated compared to the user’s spending behaviour. This includes factors such as the average expense amount and the standard deviation of the user’s expenses for the past 6 months. The evaluation process determines if a transaction should generate the insight or not.
-   **Expires**: 5 days from the insight generation time.

```
{
  "type": "LARGE_EXPENSE",
    "data": {
      "type": "LARGE_EXPENSE",
      "transactionId": "3c6cff733e0045e292819f1b83b32d5b",
      "amount": {
        "currencyCode": "EUR",
        "amount": 1001.0
      }
    }
}
```

### Credit Card Limit Close[](#credit-card-limit-close)

Informs that the user is close to reaching their credit card limit for one of their accounts. The insight does not overlap with Credit Card Limit Reached insight.

-   **Trigger**: The available credit for a credit card is below 10% and above 1% of its initial value.
-   **Expires**: At the end of the current calendar month.

```
{
  "type": "CREDIT_CARD_LIMIT_CLOSE",
  "data": {
      "type": "CREDIT_CARD_LIMIT_CLOSE",
      "account": {
          "type": "CREDIT_CARD_LIMIT_CLOSE",
          "accountId": "42f6f233ce394138897e9afff1464f5d",
          "accountName": "Personal credit account"
      },
      "availableCredit": {
          "amount": 100,
          "currencyCode": "EUR"
      }
  }
}
```

### Credit Card Limit Reached[](#credit-card-limit-reached)

Informs that the user is close to, or has exceeded the credit card limit for one of their accounts. The insight does not overlap with Credit Card Limit Close insight.

-   **Trigger**: The available credit for a credit card is below 1% of it’s initial value.
-   **Expires**: 7 days after the insight generation time.

```
{
  "type": "CREDIT_CARD_LIMIT_REACHED",
  "data": {
      "type": "CREDIT_CARD_LIMIT_REACHED",
      "account": {
          "type": "CREDIT_CARD_LIMIT_REACHED",
          "accountId": "42f6f233ce394138897e9afff1464f5d",
          "accountName": "Personal credit account"
      }
  }
}
```

### Weekly Summary Expense Transactions[](#weekly-summary-expense-transactions)

Shows a user’s summarised expense transactions for the previous week. The most common transactions overview part is calculated based on the most frequent transaction descriptions.

-   **Trigger**: A new week has started, the insight will consider transactions that happened during the recently finished week.
-   **Expires**: At the end of the current week.

```
{
  "type": "WEEKLY_SUMMARY_EXPENSE_TRANSACTIONS",
  "data": {
    "week": {
      "year": 2019,
      "week": 26
    },
    "transactionSummary": {
      "totalExpenses": {
        "currencyCode": "EUR",
        "amount": 71
      },
      "commonTransactionsOverview": {
        "totalNumberOfTransactions": 12,
        "mostCommonTransactionDescription": "Pressbyrån",
        "mostCommonTransactionCount": 3
      },
      "largestExpense": {
        "id": "42f6f233ce394138897e9afff1464f5d",
        "date": 1569593745000,
        "amount": {
          "currencyCode": "EUR",
          "amount": 60
        },
        "description": "Super Spa"
      }
    }
  }
}
```

### Monthly Summary Expense Transactions[](#monthly-summary-expense-transactions)

Shows a user’s summarised expense transactions for the last month. The most common transactions overview is based on transaction descriptions.

-   **Trigger**: A new month has started, the insight will consider transactions that happened during the recently finished month.
-   **Expires**: At the end of the month or `MONTHLY_ADJUSTED` period.

```
{
  "type": "MONTHLY_SUMMARY_EXPENSE_TRANSACTIONS",
  "data": {
    "type": "MONTHLY_SUMMARY_EXPENSE_TRANSACTIONS",
    "month": {
        "year": 2020,
        "month": 1
    },
    "transactionSummary": {
      "totalExpenses": {
        "currencyCode": "EUR",
        "amount": 200
      },
      "commonTransactionsOverview": {
        "totalNumberOfTransactions": 45,
        "mostCommonTransactionDescription": "Pressbyrån",
        "mostCommonTransactionCount": 6
      },
      "largestExpense": {
        "id": "f2f6f273ce394138897e9afff1464f5d",
        "date": 1569593745000,
        "amount": {
          "currencyCode": "EUR",
          "amount": 120.3
        },
        "description": "IKEA"
      }
    }
  }
}
```

### New Income Transaction[](#new-income-transaction)

Notifies the user about a new income transaction.

-   **Trigger**: A new income transaction has been found and no more than 50 insights of this type has been generated this week.
-   **Expires**: 7 days after the insight generation time.

```
{
  "type": "NEW_INCOME_TRANSACTION",
  "data": {
    "type": "NEW_INCOME_TRANSACTION",
    "transactionId": "42f6f233ce394138897e9afff1464f5d",
    "accountId": "c6f26025fbb949a08348e2f73f0ae12c"
  }
}
```

### Suggest Set Up Savings Account[](#suggest-set-up-savings-account)

Informs the user that an account has a high balance and suggests to transfer to a savings account.

-   **Trigger**: Account balance higher than a certain threshold and user has a savings account.
-   **Expires**: 30 days after the insight generation time.

```
{
  "type": "SUGGEST_SET_UP_SAVINGS_ACCOUNT",
  "data": {
    "type": "SUGGEST_SET_UP_SAVINGS_ACCOUNT",
    "balance": {
      "amount": 6000,
      "currencyCode": "EUR"
    },
    "savingsAccount": {
      "accountId": "96328433ce393962897e9afff1439682",
      "accountName": "Savings account"
    },
    "currentAccount": {
      "accountId": "42f6f233ce394138897e9afff1464f5d",
      "accountName": "Checking account"
    }
  }
}
```

### Left To Spend Positive Mid Month[](#left-to-spend-positive-mid-month)

Notifies the user that the left to spend is higher than usual in the middle of the monthly period.

-   **Trigger**: The user’s left to spend is higher than 10% of its average value in the middle of the monthly period.
-   **Expires**: 19 days after the start of the month or `MONTHLY_ADJUSTED` period.

```
{
  "type": "LEFT_TO_SPEND_POSITIVE_MID_MONTH",
  "data": {
    "type": "LEFT_TO_SPEND_POSITIVE_MID_MONTH",
    "month": {
      "year": 2020,
      "month": 6
    },
    "amountDifference": {
      "amount": 400,
      "currencyCode": "EUR"
    },
    "leftToSpendStatistics": {
      "createdAt": 1593511617030,
      "currentLeftToSpend": {
        "amount": 19524.52,
        "currencyCode": "EUR"
      },
      "averageLeftToSpend": {
        "amount": 15335.73,
        "currencyCode": "EUR"
      }
    }
  }
}
```

### Left To Spend Negative Mid Month[](#left-to-spend-negative-mid-month)

Notifies the user that the left to spend is lower in the middle of the monthly period.

-   **Trigger**: The user’s left to spend is 20% lower than its average value in the middle of the monthly period.
-   **Expires**: 19 days after start of the month or `MONTHLY_ADJUSTED` period.

```
{
  "type": "LEFT_TO_SPEND_NEGATIVE_MID_MONTH",
  "data": {
    "type": "LEFT_TO_SPEND_NEGATIVE_MID_MONTH",
    "month": {
      "year": 2020,
      "month": 6
    },
    "amountDifference": {
      "amount": 400,
      "currencyCode": "EUR"
    },
    "leftToSpendStatistics": {
      "createdAt": 1593511617030,
      "currentLeftToSpend": {
        "amount": 11524.52,
        "currencyCode": "EUR"
      },
      "averageLeftToSpend": {
        "amount": 15335.73,
        "currencyCode": "EUR"
      }
    }
  }
}
```

### Left To Spend Positive Beginning Month[](#left-to-spend-positive-beginning-month)

This notifies the user that the left to spend is higher than usual at the beginning of the user monthly period.

-   **Trigger**: The user’s left to spend is 10% higher than its average value at the beginning of the user monthly period.
-   **Expires**: 12 days after the start of the month or `MONTHLY_ADJUSTED` period.

```
{
  "type": "LEFT_TO_SPEND_POSITIVE_BEGINNING_MONTH",
  "data": {
    "type": "LEFT_TO_SPEND_POSITIVE_BEGINNING_MONTH",
    "month": {
      "year": 2020,
      "month": 6
    },
    "amountDifference": {
      "amount": 40,
      "currencyCode": "EUR"
    },
    "totalExpense": {
      "amount": 400,
      "currencyCode": "EUR"
    },
    "leftToSpendStatistics": {
      "createdAt": 1593511617030,
      "currentLeftToSpend": {
        "amount": 19524.52,
        "currencyCode": "EUR"
      },
      "averageLeftToSpend": {
        "amount": 15335.73,
        "currencyCode": "EUR"
      }
    }
  }
}
```

### Left To Spend Negative Beginning Month[](#left-to-spend-negative-beginning-month)

This notifies the user that the left to spend is lower than usual at the beginning of the user monthly period.

-   **Trigger**: The user’s left to spend is 20% lower than its average value at the beginning of the user monthly period.
-   **Expires**: 12 days after the start of the month or `MONTHLY_ADJUSTED` period.

```
{
  "type": "LEFT_TO_SPEND_NEGATIVE_BEGINNING_MONTH",
  "data": {
    "type": "LEFT_TO_SPEND_NEGATIVE_BEGINNING_MONTH",
    "month": {
      "year": 2020,
      "month": 6
    },
    "amountDifference": {
      "amount": 40,
      "currencyCode": "EUR"
    },
    "totalExpense": {
      "amount": 400,
      "currencyCode": "EUR"
    },
    "leftToSpendStatistics": {
      "createdAt": 1593511617030,
      "currentLeftToSpend": {
        "amount": 15524.52,
        "currencyCode": "EUR"
      },
      "averageLeftToSpend": {
        "amount": 11335.73,
        "currencyCode": "EUR"
      }
    }
  }
}
```

### Left To Spend Positive Summary Savings Account[](#left-to-spend-positive-summary-savings-account)

This notifies the user that the left to spend was positive in the last month, and that the user has a savings account.

-   **Trigger**: The insight is triggered during the first week of a new period. The user’s left to spend was positive and above average at the end of the last month. The user has a savings account and a checking account with balance higher than left to spend.
-   **Expires**: 7 days from the insight generation time.

```
{
  "type": "LEFT_TO_SPEND_POSITIVE_SUMMARY_SAVINGS_ACCOUNT",
  "data": {
    "type": "LEFT_TO_SPEND_POSITIVE_SUMMARY_SAVINGS_ACCOUNT",
    "month": {
      "year": 2020,
      "month": 6
    },
    "leftAmount": {
        "amount": 100,
        "currencyCode": "EUR"
    }
  }
}
```

### Left To Spend Positive Summary Savings Account By Account[](#left-to-spend-positive-summary-savings-account-by-account)

This notifies the user that the left to spend in a specific account was positive in the last month, and that the user has a savings account. Each insight is generated per eligible account.

-   **Trigger**: The insight is triggered during the first week of a new period. The user’s left to spend was positive in a specific account and above average at the end of the last month. The user has a savings account and a checking account with balance higher than left to spend.
-   **Expires**: 7 days from the insight generation time.

```
{
  "type": "LEFT_TO_SPEND_POSITIVE_SUMMARY_SAVINGS_ACCOUNT_BY_ACCOUNT",
  "data": {
    "accountId": "d2b49640cbba4d8899a4886b6e8892f8",
    "type": "LEFT_TO_SPEND_POSITIVE_SUMMARY_SAVINGS_ACCOUNT_BY_ACCOUNT",
    "month": {
      "year": 2020,
      "month": 6
    },
    "leftAmount": {
        "amount": 100,
        "currencyCode": "EUR"
    }
  }
}
```

### Left To Spend Positive Final Week[](#left-to-spend-positive-final-week)

This notifies the user that the left to spend is higher than usual 7 days before the end of the month.

-   **Trigger**: The user’s left to spend is positive and 10% higher than its average value 7 days before end of the month.
-   **Expires**: At the end of the current month or `MONTHLY_ADJUSTED` period.

```
{
    "type": "LEFT_TO_SPEND_POSITIVE_FINAL_WEEK",
    "data": {
    "type": "LEFT_TO_SPEND_POSITIVE_FINAL_WEEK",
        "month": {
            "year": 2020,
            "month": 6
        },
        "amountDifference": {
            "amount": 4188.79,
            "currencyCode": "EUR"
        },
        "leftToSpendStatistics": {
            "createdAt": 1593511617030,
            "currentLeftToSpend": {
                "amount": 19524.52,
                "currencyCode": "EUR"
            },
            "averageLeftToSpend": {
                "amount": 15335.73,
                "currencyCode": "EUR"
            }
        },
        "leftToSpendPerDay": {
            "amount": 598.40,
            "currencyCode": "EUR"
        }
    }
}
```

### Spending By Category Increased[](#spending-by-category-increased)

This notifies the user about an increase in spendings for a category. Some categories that might not make sense to trigger this insight for are excluded.

-   **Trigger** The user has spent on a category for the last two monthly periods. In the last monthly period spendings increased in comparison to the previous month.
-   **Expires**: At the end of the month or `MONTHLY_ADJUSTED` period.

```
{
  "type": "SPENDING_BY_CATEGORY_INCREASED",
  "data": {
    "type": "SPENDING_BY_CATEGORY_INCREASED",
    "category": {
      "id": "12",
      "code": "expenses:food.restaurants",
      "displayName": "Restaurants"
    },
    "lastMonth": {
      "year": 2020,
      "month": 7
    },
    "lastMonthSpending": {
      "amount": 98,
      "currencyCode": "EUR"
    },
    "twoMonthsAgoSpending": {
      "amount": 740,
      "currencyCode": "EUR"
    },
    "percentage": 755.10
  }
}
```

### Spending By Primary Category Increased[](#spending-by-primary-category-increased)

This shows information about increase in spendings for a primary category in the last month. This insight is intended to be used by clients who mainly use primary categories.

-   **Trigger**: The user has spent on a primary category for at least three monthly periods. In the last monthly period the spendings increased in comparison to the previous months (twoMonthsAgoSpending in example below).
-   **Expires**: At the end of the current month or `MONTHLY_ADJUSTED` period.

```
{
  "type": "SPENDING_BY_PRIMARY_CATEGORY_INCREASED",
  "data": {
    "type": "SPENDING_BY_PRIMARY_CATEGORY_INCREASED",
    "category": {
      "id": "4aef2b8f6acbxxxxa47f5b98a81d6f19",
      "code": "expenses:food",
      "displayName": "Restaurants"
    },
    "lastMonth": {
      "year": 2020,
      "month": 7
    },
    "lastMonthSpending": {
      "amount": 5001,
      "currencyCode": "EUR"
    },
    "twoMonthsAgoSpending": {
      "amount": 2343,
      "currencyCode": "EUR"
    },
    "percentage": 110
  }
}
```

### Aggregation Refresh PSD2 Credential[](#aggregation-refresh-psd2-credential)

This reminds the user about an expiring PSD2 credential.

-   **Trigger**: An aggregated PSD2 credential has less than 7 days left of its validity period.
-   **Expires**: At the date and time when the credential is expiring.

```
{
  "type": "AGGREGATION_REFRESH_PSD2_CREDENTIAL",
  "data": {
    "type": "AGGREGATION_REFRESH_PSD2_CREDENTIAL",
    "credential": {
      "id": "credential-id",
      "provider": {
        "name": "handelsbanken-ob",
        "displayName": "Handelsbanken"
      },
      "sessionExpiryDate": 1566464477927
    }
  }
}
```

### Safe To Spend Beginning of Month[](#safe-to-spend-beginning-of-month)

_Note: This feature is not enabled by default. Speak to your account manager for more information._

Informs a user of their safe to spend for the month. Safe to spend is defined as income minus upcoming recurring expenses + non-recurring expenses that has already occurred.

-   **Trigger**: At the beginning of the user's monthly period.
-   **Expires**: 12 days after the start of the month or `MONTHLY_ADJUSTED` period.

```
{
  "type": "SAFE_TO_SPEND_BEGINNING_OF_MONTH",
  "title": "Your available spending",
  "description": "Your available spending amount from your income is: £1,480.00",
  "data": {
    "type": "SAFE_TO_SPEND_BEGINNING_OF_MONTH"
  }
}
```

### Recurring Costs too High[](#recurring-costs-too-high)

_Note: This feature is not enabled by default. Speak to your account manager for more information._

Informs a user that their recurring costs are too high compared to their income.

-   **Trigger**: Recurring costs account for more than 50% of the income for a monthly period
-   **Expires**: At the end of the month or `MONTHLY_ADJUSTED` period.

```
 {
  "type": "RECURRING_COSTS_TOO_HIGH",
  "title": "High recurring costs",
  "description": "More than 50% of your income goes to recurring costs",
  "data": {
    "type": "RECURRING_COSTS_TOO_HIGH"
  }
}
```

### Renew Consent[](#renew-consent)

_Note: This feature is not enabled by default. Speak to your account manager for more information._

Informs a user that their consent is expired.

-   **Trigger**: Session for the user expired in last 7 days.
-   **Expires**: At the end of the month or `MONTHLY_ADJUSTED` period.

```
 {
  "type": "RENEW_CONSENT",
  "title": "Your credentials to handelsbanken-ob recently expired.",
  "description": "Don't miss any important notifications. Refresh your credentials now.",
  "data": {
    "type": "RENEW_CONSENT"
  }
}
```

## Insight Action[](#insight-action)

Each insight action has a type that conveys the meaning of the action. And each insight action also has a data field which presents the data that the action would act on. The structure of the data field is determined by the type field of the Insight Action.

| Action | Type |
| --- | --- |
| Acknowledge | `ACKNOWLEDGE` |
| Create Transfer | `CREATE_TRANSFER` |
| Dismiss | `DISMISS` |
| View Budget | `VIEW_BUDGET` |
| Categorize Transactions | `CATEGORIZE_TRANSACTIONS` |
| View Transactions By Category | `VIEW_TRANSACTIONS_BY_CATEGORY` |
| View Transaction | `VIEW_TRANSACTION` |
| Categorize Expense | `CATEGORIZE_EXPENSE` |
| View Transactions | `VIEW_TRANSACTIONS` |
| View Account | `VIEW_ACCOUNT` |
| View Left To Spend | `VIEW_LEFT_TO_SPEND` |
| Create Budget | `CREATE_BUDGET` |
| Refresh Credential | `REFRESH_CREDENTIAL` |

### Acknowledge Action[](#acknowledge-action)

Acknowledge the insight information.

```
{
  "label": "Ok",
  "data": {
    "type": "ACKNOWLEDGE"
  }
}
```

### Create Transfer Action[](#create-transfer-action)

Create a transfer.

```
{
  "label": "Transfer",
  "data": {
    "type": "CREATE_TRANSFER",
    "sourceAccount": "iban://SE9832691627751644451227",
    "destinationAccount": "iban://NL41INGB1822913977",
    "amount": {
      "currencyCode": "EUR",
      "amount": 30.00
    },
    "sourceAccountNumber": "1234567890",
    "destinationAccountNumber": "1234098765"
  }
}
```

### Dismiss Action[](#dismiss-action)

Dismiss the insight without taking an action.

```
{
  "label": "Dismiss",
  "data": {
    "type": "DISMISS",
  }
}
```

### View Budget Action[](#view-budget-action)

View a budget for a given period.

```
{
  "label": "See details",
  "data": {
    "type": "VIEW_BUDGET",
    "budgetId": "cbbac116e43c4b21b7013091ec03d590",
    "budgetPeriodStartTime": 1567296000000
  }
}
```

### Categorize Transactions[](#categorize-transactions)

Select category for uncategorized transactions.

```
{
  "label": "Categorize",
  "data": {
    "type": "CATEGORIZE_TRANSACTIONS",
    "transactionIds": [
      "d2b49640cbba4d8899a4886b6e8892f8",
      "e8d668ddbe8d49ff81f40c8fb3b47c5d"
    ]
  }
}
```

### View Transactions By Category[](#view-transactions-by-category)

View transactions by category for “Summary Expenses By Category” insights.

```
{
  "label": "See details",
  "data": {
    "type": "VIEW_TRANSACTIONS_BY_CATEGORY",
    "transactionIdsByCategory": {
      "expenses:food.coffee": {
        "transactionIds": [
          "f5dd06dafc504c1fa152be62408bcdff"
        ]
      },
      "expenses:food.groceries": {
        "transactionIds": [
          "0b18859117d645feaffbe5af5896e52a",
          "7a3d7bc881b64994a80fb9c1cdd6ded3",
          "c4d0f21822e84b7db54d54f7f33f0b47"
        ]
      }
    }
  }
}
```

### View Transaction[](#view-transaction)

View single transaction by its ID.

```
{
  "label": "See details",
  "data": {
    "type": "VIEW_TRANSACTION",
    "transactionId": "a96597b1e76c4d7f878e5acaf0d2c02e",
  }
}
```

### Categorize Expense[](#categorize-expense)

Categorize transaction by its ID.

```
{
  "label": "Categorize",
  "data": {
    "type": "CATEGORIZE_EXPENSE",
    "transactionId": "eb610a3fd68d428081365c8c266c607c",
  }
}
```

### View Transactions[](#view-transactions)

View multiple transactions by their ID.

```
{
  "label": "See details",
  "data": {
    "type": "VIEW_TRANSACTIONS",
    "transactionIds": [
      {"id": "0b18859117d645feaffbe5af5896e52a", "type": "TRANSACTION"},
      {"id": "7a3d7bc881b64994a80fb9c1cdd6ded3", "type": "TRANSACTION"},
      {"id": "c4d0f21822e84b7db54d54f7f33f0b47", "type": "TRANSACTION"}
    ]
  }
}
```

### View Account[](#view-account)

View an account by its ID.

```
{
  "label": "See details",
  "data": {
    "type": "VIEW_ACCOUNT",
    "accountId": "d2b49640cbba4d8899a4886b6e8892f8"
  }
}
```

### View Left To Spend[](#view-left-to-spend)

View a left to spend period.

```
{
  "label": "See details",
  "data": {
    "type": "VIEW_LEFT_TO_SPEND",
    "month": {
      "year": 2020,
      "month": 6
    }
  }
}
```

### Create Budget[](#create-budget)

Create a new budget. The data fields included in the “budgetSuggestion” that is part of the insight action data, may or may not be set and should be used as suggestions for the user. Such as pre-filling a created budget view with the existing values from the “budgetSuggestion”.

```
{
  "label": "Create budget",
  "data": {
    "type": "CREATE_BUDGET",
    "budgetSuggestion": {
      "filter": {
        "categories": ["expenses:food.bars"],
        "accounts": ["d2b49640cbba4d8899a4886b6e8892f8"]
      },
      "amount": {
        "currencyCode": "EUR",
        "amount": 300.0
      },
      "periodicityType": "BUDGET_PERIODICITY_TYPE_RECURRING",
      "recurringPeriodicityData": {
        "periodUnit": "MONTH"
      }
    }
  }
}
```

### Refresh Credential[](#refresh-credential)

Refresh an aggregated credential.

```
{
  "label": "Refresh",
  "data": {
    "type": "REFRESH_CREDENTIAL",
    "credentialId": "123"
  }
}
```
