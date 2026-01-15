---
title: "Fetch sustainability information for a transaction"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-sustainability-information-for-a-transaction/"
exportedAt: "2026-01-13T12:48:02.754Z"
---
Sustainability information for a transaction including the CO2 footprint, a comparison and insights on how to lower the CO2 emission can be retrieved by calling the `/enrichment/v1/sustainability/transactions/{transactionId}` endpoint.

**Example request:**

```
curl -X 'GET' \
'https://api.tink.com/enrichment/v1/sustainability/transactions/{transactionId} \
  -H 'Authorization: Bearer '
  -H 'Accept: application/json'
```

**Example response:**

```
{
    "id": "{transactionId}",
    "language": "en",
    "co2InGrams": "42458.0",
    "comparable": "Equal to approximately 372 km of driving in a car.",
    "insight": {
        "title": "Our forests are critical for us",
        "text": "Forests play an important role in regulating the climate by absorbing carbon from the atmosphere. Ten million hectares of forests were lost per year between 2015 and 2020 due to deforestation, logging etc. That’s about the size of Iceland!"
    }
}
´
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
