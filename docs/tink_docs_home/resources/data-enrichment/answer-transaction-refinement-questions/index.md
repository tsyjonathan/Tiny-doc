---
title: "Answer transaction refinement questions - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/answer-transaction-refinement-questions/"
exportedAt: "2026-01-13T12:48:14.934Z"
---
There are two types of answers:

-   SELECTABLE: Answers from a drop down list.
-   INPUT: Free text answers limited to the specified type and conditions specified in the question.

Answer the refinement questions by calling the `/enrichment/v1/sustainability/transactions/refinement` endpoint.

**Example request:**

```
curl -X 'POST' \
'[external url removed] \
  -H 'Authorization: Bearer '
  -H 'Accept: application/json'
  -d '{
    "answers": [
        {
            "transactionId": "{transactionId}",
            "answerId": "90c59eb0-05a3-4a66-a356-dee667c4c1eb"
        },
        {
            "transactionId": "{transactionId}",
            "answerId": "858daeab-79a2-4ae7-949f-61250bc771de",
            "input": "0"
        }
    ]
}'
```

**Example response:**

```
{
    "requestId": "669f7e8c9340bff7a1762fc448203ad1",
    "results": [
        {
            "transactionId": "{transactionId}",
            "co2InGrams": "1519.0"
        }
    ],
    "errors": [
        {
            "transactionId": "{transactionId}",
            "answerId": "858daeab-79a2-4ae7-949f-61250bc771de",
            "code": "BAD_REQUEST",
            "description": "Input should be an INTEGER GREATER than 0."
        }
   ]
}
```
