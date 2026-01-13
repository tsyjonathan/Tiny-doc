---
title: "Introduction to Budgets - Tink Docs"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/introduction-to-budgets"
exportedAt: "2026-01-13T12:51:07.193Z"
---
A budget represents a financial target for a specific period of time. The budget is identified by certain filters/criteria (such as accounts, categories, tags, or free-text) to target expenses. Defining multiple filter properties will yield an `AND` operation and specifying multiple values of a filter property will yield an `OR` operation.

Depending on the use case, a budget can be either recurring (`WEEK`, `MONTH`, or `YEAR`) or one-off budget (with a fixed `start` and `end` time period). The budget amount will relate to the recurring period that’s defined by the periodicity unit for recurring budgets, or the fixed time window for a one-off budget. A budget could, for example, be to spend a maximum of 400 euros weekly on Household & Services category:

![money manager budgets overview sample](https://images.ctfassets.net/tmqu5vj33f7w/2hbdsOqtHGdM40yfsimbXU/d370e187c478a500d0f7a4805336fa8f/money_manager_budgets_overview_sample.png)

Monitor all spending that’s related to a budget that you’ve created. For example, let's say a user creates a budget to spend a maximum of 400 euros during one week. If less than 400 euros is spent during that time, the budget goal is met. Users are able to review their budget history and see how successful they've been in the past. The following image is an example of how this can be visualised on the client side.

![money manager budget history sample](https://images.ctfassets.net/tmqu5vj33f7w/3vbJ7fAI4WCGixhvTIidSP/a90db429de4a8e2a087192fedc1c2f20/money_manager_budget_history_sample.png)
