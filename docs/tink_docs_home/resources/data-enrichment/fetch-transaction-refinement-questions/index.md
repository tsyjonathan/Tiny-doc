---
title: "Fetch transaction refinement questions - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-transaction-refinement-questions/"
exportedAt: "2026-01-13T12:48:12.936Z"
---
The responses to the questions will influence the calculation of CO2 emissions for the specified transaction. For example, for a gas station transaction, the CO2 value calculated might include emissions from buying gas. By using this endpoint, it is possible to update transactions to reflect what was purchased. In this case, the purchase might be adjusted to specify that it was for charging an EV instead of buying gas, thereby reducing emissions.

There are two types of questions:

-   SELECTABLE: You can select an answer from the list
-   INPUT: You are asked to give a free text answer of the specified type and according to validation

If the questions have been previously answered by the end user, the “answerId” field will be populated for SELECTABLE and INPUT questions, and the “answerText” field will be populated for INPUT questions.

Questions related to the refinement of a transaction can be retrieved by calling the `/enrichment/v1/sustainability/transactions/{transactionId}/refinement` endpoint.

**Example request:**

```
curl -X 'GET' \
'https://api.tink.com/enrichment/v1/sustainability/transactions/{transactionId}/refinement \
  -H 'Authorization: Bearer '
  -H 'Accept: application/json'
```

**Example response:**

```
{
    "transactionId": "49d881a7907f4ee4bf751201f29e2229",
    "language": "en",
    "questions": [
        {
            "id": "10c1c668-ab0d-4dfc-8817-4fd732e3f5d5",
            "type": "SELECTABLE",
            "text": "What did you purchase at the gas station?",
            "answerId": "4705b09b-7b3f-4cef-b57b-9b249eb687f6", 
            "selectable": [
                {
                    "id": "be798862-4d3a-4d12-8e0d-e9429479ef68",
                    "text": "Mostly goods from the store"
                },
                {
                    "id": "90c59eb0-05a3-4a66-a356-dee667c4c1eb",
                    "text": "Gasoline"
                },
                {
                    "id": "ea2d4352-8266-4e57-aa0d-4d39f4a8b0b7",
                    "text": "Diesel"
                },
                {
                    "id": "0e45674a-da45-41fc-843a-3c17d76edc30",
                    "text": "I charged an electric vehicle"
                },
                {
                    "id": "cf0452df-c76f-4bdd-9a06-5a7db92fd035",
                    "text": "LPG"
                }
            ]
        },
        {
            "id": "0c4e4018-a365-451b-b8a4-e4c50737fbd4",
            "type": "INPUT",
            "text": "How many liters of gasoline was purchased?",
            "answerId": "8c92d902-b51a-4739-8465-f9a1f55de527", 
            "answerText": "42",  
            "input": {
                "id": "858daeab-79a2-4ae7-949f-61250bc771de",
                "datatype": "INTEGER",
                "validation": [
                    {
                        "name": "GREATER",
                        "condition": "0"
                    }
                ]
            }
        }
    ]
}
```

**Optional Parameters:**

The default language of the response is English, but it can be changed by sending an optional parameter.

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
