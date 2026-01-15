---
title: "Fetch a list of emission comparisons for a transaction"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-a-list-of-emission-comparisons-for-a-transaction/"
exportedAt: "2026-01-13T12:48:16.821Z"
---
A comparable is a concrete example used to contextualize a CO2 footprint by comparing it to a familiar activity, such as the distance driven by a car. This illustrates the impact of the emission footprint from a transaction in a relatable manner.

List comparables to a transaction by calling the `/enrichment/v1/sustainability/transactions/{transactionId}/comparables` endpoint.

**Example request:**

```
curl -X 'GET' \
'https://api.tink.com/enrichment/v1/sustainability/transactions/{transactionId}/comparables \
  -H 'Authorization: Bearer '
  -H 'Accept: application/json'
```

**Example response:**

```
{
    "co2InGrams": "42458.0",
    "language": "en",
    "comparables": [
        "Equal to approximately 372 km of driving in a car.",
        "Equal to heating an oven for approximately 73 hour(s).",
        "Equal to using a tumble dryer for approximately 98 hours."
    ]
}
´
```

**Optional Parameters:**

The default language of the response will be English, but it can be changed by sending an optional parameter.

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
