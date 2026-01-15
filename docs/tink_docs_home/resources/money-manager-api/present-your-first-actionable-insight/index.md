---
title: "Present your first Actionable Insight"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-api/present-your-first-actionable-insight/"
exportedAt: "2026-01-13T12:56:15.512Z"
---
## 1\. Turn on your first actionable insight[](#turn-on-your-first-actionable-insight)

[Tink Console](https://console.tink.com/) is where you will enable and configure your actionable insights. Make sure you have seen the Money Manager prerequisites page if you experience issues with Tink Console.

To enable Actionable Insights, within the Tink Console, click on the Money Manager section on the left side and go to the Actionable Insights tab. In this tab, you can see an overview of all available insights. By default, all available insights are disabled, so you will need to turn them on. For this guide, we want you to use `BUDGET_SUGGEST_CREATE_FIRST` insight. Use the toogle to enable it.

**Note:** Every enabled insight can be generated for every user connected to Tink. However, a template with a locale matching the user's is required to render an insight. The locale of a user and presence of a matching template will determine if the insight can be rendered or not. In this guide we will use `en_US` as a users locale since all insights support English by default. Please follow this [guide](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/configure-actionable-insights/) on how to translate and configure insights to your users locale.

Activating an insight in the console will allow this insight to be generated for all users by the Tink platform. All insights have different triggers that you can read more about [here](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/list-of-available-insights/#insight-data).

For the `BUDGET_SUGGEST_CREATE_FIRST` insight, it will automatically be triggered for all users that have no active or archived budgets. This means it will be triggered automatically, therefore it's ideal as we try to fetch your first insight.

## 2\. Trigger a credential refresh for a user.[](#trigger-a-credential-refresh-for-a-user-)

To generate an insight, Tink needs to know that some user data got updated. One of the ways to do it, is to [ingest a transaction via connector](/Tiny-doc/tink_docs_api/api/#data/transaction/ingest-transactions) for this user to Tink. We will use the request below to achieve that.

Example request

```
curl -X POST 'https://api.tink.com/connector/users//transactions' \
-H 'Authorization: Bearer {YOUR_USER_ACCESS_TOKEN}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type": "REAL_TIME",
    "transactionAccounts": [
        {
            "balance": 9970,
            "externalId": "external-account-id",
            "transactions": [
                {
                    "amount": -30,
                    "description": "Coffee",
                    "date":  1663934785000, 
                    "externalId": "external-transaction-id",
                    "type": "DEFAULT"
                }
            ]
        }
    ]
}'
```

## 3\. Fetch insights for a given user[](#fetch-insights-for-a-given-user)

Insight generation can take a few seconds since we need to process an update for this user internally. To fetch a user's insights, you need to use the [List insights](/Tiny-doc/tink_docs_api/api/#finance-management/actionable-insight/list-insights) endpoint and include a user access token with the insights:read\` scope.

Example request

```
curl -X GET 'https://api.tink.com/api/v1/insights' \
-H 'Authorization: Bearer '
```

Example response:

```
{
    "id": "e0177c43bc0c4f50b2eb1c6c141ea5a2",
    "userId": "af2a89dc1f104d0d8f1db8653d7c1147",
    "type": "BUDGET_SUGGEST_CREATE_FIRST",
    "title": "Set up your first budget to help you keep track of expenses.",
    "description": "Creating budgets can help you stay on top of your spending – give it a go.",
    "data": {
        "type": "BUDGET_SUGGEST_CREATE_FIRST"
    },
    "createdTime": 1664277959338,
    "insightActions": [
        {
            "label": "Create Budget",
            "data": {
                "budgetSuggestion": {
                    "filter": null,
                    "periodicityType": "BUDGET_PERIODICITY_TYPE_RECURRING",
                    "oneOffPeriodicityData": null,
                    "recurringPeriodicityData": {
                        "periodUnit": "MONTH"
                    },
                    "amount": null
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
```

This request will fetch a list of all the insights that are currently active for this user. The insight response consists of the different data depending on the insight type. But all insight are structured in the following way:

| Field | Description |
| --- | --- |
| `createdTime` | when the Insight was created |
| `title` | a short description of what the insight is referring to. E.g. The balance on a specific account is low |
| `description` | a more detailed description where it includes a suggested action on how to act on the insight |
| `insightAction` | all insights have suggested actions where the low balance insight suggests to top up the account. More info on action types can be found [here](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/list-of-available-insights/#insight-action) |
| `data` | the metadata will different between all insights. Read about what data that is forwarded in each insight [here](/Tiny-doc/tink_docs_home/resources/money-manager/money-manager-api/list-of-available-insights/#insight-data) |
| `id` | the unique identifier of the insight |

In the response, you should now see an `BUDGET_SUGGEST_CREATE_FIRST` insight.

You will then have managed to present your first Actionable Insight. Follow the next guide to see how you can take action with an Insight.
