---
title: "Fetch Account profiling questions - Tink Docs"
source: "https://docs.tink.com/resources/data-enrichment/fetch-account-profiling-questions"
exportedAt: "2026-01-13T12:48:08.773Z"
---
The responses to the questions will influence the calculation of CO2 emissions for transactions tied to a specific account, as well as influence account insights. For example, for a grocery transaction, the model calculating CO2 emissions will assume that people typically include meat in their diets. By using this endpoint, it is possible to refine the knowledge of the end user, making the model results more precise. In this case, the end user can specify that their diet is vegetarian, and thus reducing the emissions of grocery transactions by default.

There are two types of questions:

-   SELECTABLE: You can select an answer from the list
-   INPUT: You are asked to give a free text answer of the specified type and according to validation

If the questions have been previously answered by the end user, the “answerId” field will be populated for SELECTABLE and INPUT questions, and the “answerText” field will be populated for INPUT questions.

Questions related to an account can be retrieved by calling the `/enrichment/v1/sustainability/accounts/{accountId}/profiling` endpoint.

**Example request:**

```
curl -X 'GET' \
'https://api.tink.com/enrichment/v1/sustainability/accounts/{accountId}/profiling \
  -H 'Authorization: Bearer '
  -H 'Accept: application/json'
```

**Example response:**

```
,
{
    "accountId": "{accountId}",
    "language": "en",
    "questions": [
        {
            "id": "1cef393c-2b8e-4454-a61b-a65575f05114",
            "type": "SELECTABLE",
            "text": "What type of energy do you draw from the grid?",
            "answerId": "9d1d0a2b-597b-4608-8371-9af6e178c969", 
            "selectable": [
                {
                    "id": "2b959ea9-33da-4ce4-8ae2-1ffb22c3d119",
                    "text": "Wind"
                },
                {
                    "id": "83878916-55a9-4ca2-abbd-8a91770872eb",
                    "text": "Hydropower"
                },
                {
                    "id": "5691a40a-56d0-49a7-bf98-ff537072a7ff",
                    "text": "Solar"
                },
                {
                    "id": "6250648d-d317-4594-89ae-7ffe05981410",
                    "text": "Renewable energy mix"
                },
                {
                    "id": "610a7c72-8a98-47b7-ac43-5d34d1dae201",
                    "text": "Regular energy"
                },
                {
                    "id": "147ef17f-1a28-46a0-842e-47e0a26c6aeb",
                    "text": "I do not know"
                }
            ]
        },
        {
            "id": "0c4e4018-a365-451b-b8a4-e4c50737fbd4",
            "type": "INPUT",
            "text": "How often do You consume meat?",
            "input": {
                "id": "858daeab-79a2-4ae7-949f-61250bc771de",
                "datatype": "STRING",
                "validation": [
                    {
                        "name": "MIN_LENGTH",
                        "condition": "10"
                    }
                ]
            }
        }
    ]
}
```

**Optional Parameters:**

The default language of the response will be English, however if another language is preferred it can be changed by sending an optional parameter.

Talk to support if your local language is not supported out of the box.

| PARAMETER | DESCRIPTION |
| --- | --- |
| language | ISO639-1 two-letter language code for the selected language used to retrieve insights. Default is English (en). |

**Example request for German:**

```
curl 'https://api.tink.com/enrichment/v1/sustainability/insights?language=de' \
--header 'Authorization: Bearer ' \
--header 'Accept: application/json'
```
