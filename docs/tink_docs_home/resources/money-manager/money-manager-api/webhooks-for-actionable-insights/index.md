---
title: "Webhooks for Actionable Insights - Tink Docs"
source: "https://docs.tink.com/resources/money-manager/money-manager-api/webhooks-for-actionable-insights"
exportedAt: "2026-01-13T12:50:52.216Z"
---
The Webhook integration for Actionable Insights adds support to subscribe to events when Insights are generated. These events can be used to create push notifications for end-users. You can read more about webhooks in our [guide](https://docs.tink.com/resources/getting-started/webhooks).

-   Webhooks are only sent for insights that created, not when updated. This reduces the risk of repeatedly notifying end-users with the same information. An insight can be updated due to its data has been changed, e.g. a `BUDGET_OVERSPENT` insight could get updated due to a new expense for that budget. However, the state of the budget being overspent is still the same and should not be pushed to the user again.
-   The webhook request sent by Tink will include the **external** `userId` (if specified) as well as the **Tink** `userId`.
-   The webhook integration adheres to the dynamic configuration capabilities in Tink Console. When you add language support to the Insight Templates, it will be applied to both the Actionable Insights API and the Webhooks integration. If there are no supported locale for a given user, i.e. no translation can be applied, the webhook won't be sent for that insight. This is to prevent end-users from getting notifications in other languages than their profile settings.

## How to connect[](#how-to-connect)

Create a webhook with type `actionable-insights:created` when using `Events V2`.

You can read more about it in our [API documentation](https://docs.tink.com/api-events-v2#events-v2/webhook).

## Webhook request and model[](#webhook-request-and-model)

The root structure of the Webhook request has the same structure across all webhook events, the structure inside the `content` field differs between webhook events. For Actionable Insight events, you can expect the structure presented as `WebhookInsight` below.

```
webhook: {
  context: Object,
  content: WebhookInsight,
  event: string
}
```

| Field | Description |
| --- | --- |
| context | Specifies optional metadata about the context the event refers to, for example user IDs. |
| content | Contains detailed information about the particular event. The structure of the content varies depending on the insight type. |
| event | Specifies the event type for the information contained in the `content` field. |

The `WebhookInsight` contains a list of insights that were generated, as well as Tink user id (`userId`) and external user id registered for the user (`externalUserId`).

The insights in the request were recently created and will contain at least one insight. The Insight model looks identical to the models that are exposed through the public API. See [API documentation](https://docs.tink.com/api-finance-management#finance-management/actionable-insight) and [Insight Data Models](https://docs.tink.com/resources/money-manager/money-manager-api/list-of-available-insights) as a reference.

```
WebhookInsight: {
  userId: string,
  externalUserId: string,
  insights: List<Insight>
}
```

The request sent could look like the following for a `BUDGET_SUGGEST_CREATE_TOP_PRIMARY_CATEGORY` insight that has been created. Webhook model is described in the [API documentation](https://docs.tink.com/api-events-v2#events-v2/webhook/).

```
{
  "context": {
    "userId": "e63af98d7b434ea89bd79389424a44ec",
    "externalUserId": "67914791-87db-4d28-b486-f50b863d563f"
  },
  "content": {
    "userId": "e63af98d7b434ea89bd79389424a44ec",
    "externalUserId": "67914791-87db-4d28-b486-f50b863d563f",
    "insights": [
      {
        "id": "b43f181023704ee59242e13fff593c25",
        "userId": "e63af98d7b434ea89bd79389424a44ec",
        "type": "BUDGET_SUGGEST_CREATE_TOP_PRIMARY_CATEGORY",
        "title": "Set a budget for your top expense: Shopping",
        "description": "You spent £11,000 on Shopping last month. How about setting up a budget of £9,900 to help save more money?",
        "createdTime": 1746446491998,
        "data": {
          "categorySpending": {
            "categoryCode": "expenses:shopping",
            "spentAmount": {
              "currencyCode": "GBP",
              "amount": 11000.0
            }
          },
          "suggestedBudgetAmount": {
            "currencyCode": "GBP",
            "amount": 9900.0
          },
          "type": "BUDGET_SUGGEST_CREATE_TOP_PRIMARY_CATEGORY"
        },
        "actions": [
          {
            "label": "Create Budget",
            "data": {
              "budgetSuggestion": {
                "filter": {
                  "accounts": null,
                  "categories": [
                    "expenses:shopping"
                  ]
                },
                "periodicityType": "BUDGET_PERIODICITY_TYPE_RECURRING",
                "oneOffPeriodicityData": null,
                "recurringPeriodicityData": {
                  "periodUnit": "MONTH"
                },
                "amount": {
                  "currencyCode": "GBP",
                  "amount": 9900.0
                }
              },
              "type": "CREATE_BUDGET"
            }
          },
          {
            "label": "Archive",
            "data": {
              "type": "DISMISS"
            }
          }
        ]
      }
    ]
  },
  "event": "actionable-insights:created"
}
```
