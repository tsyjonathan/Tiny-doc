---
title: "Answer account profiling questions - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/answer-account-profiling-questions/"
exportedAt: "2026-01-13T12:48:10.761Z"
---
There are two types of answers:

-   SELECTABLE: Answers from a drop down list.
-   INPUT: Free text answers limited to the specified type and conditions specified in the question.

You can answer account profiling questions by calling the `/enrichment/v1/sustainability/accounts/profiling` endpoint.

**Example request:**

```
curl -X 'POST' \
'[external url removed] \
  -H 'Authorization: Bearer '
  -H 'Accept: application/json'
  -d '{
    "answers": [
        {
            "accountId": "{accountId}",
            "answerId": "2b959ea9-33da-4ce4-8ae2-1ffb22c3d119"
        },
        {
            "accountId": "{accountId}",
            "answerId": "be798862-4d3a-4d12-8e0d-e9429479ef68",
            "input": "I eat."
        }
    ]
}'
```

**Example response:**

```
{
    "requestId": "669f77c630d511126729cada652dbd5a",
    "results": [
        {
            "answerId": "2b959ea9-33da-4ce4-8ae2-1ffb22c3d119",
            "questionId": "1cef393c-2b8e-4454-a61b-a65575f05114",
            "accountId": "{accountId}"
        }
    ],
    "errors": [
        {
            "accountId": "{accountId}",
            "answerId": "be798862-4d3a-4d12-8e0d-e9429479ef68",
            "code": "BAD_REQUEST",
            "description": "Input should be a STRING with MIN_LENGTH 10."
        }
   ]
}
```
