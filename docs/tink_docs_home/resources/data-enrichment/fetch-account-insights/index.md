---
title: "Fetch Account Insights - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-account-insights/"
exportedAt: "2026-01-13T12:48:06.617Z"
---
Account insights are personalized sustainability and eco-friendly advice based on user account and profiling responses. The insights provided are designed to broaden a user’s understanding of the environmental impact of various activities. These insights are not tied to specific transactions but rather provide general advice on how to minimize carbon footprints.

To fetch account insights, call the `/enrichment/v1/sustainability/accounts/{ACCOUNT_ID}/insights` endpoint. Each call will return one randomised insight.

**Example request:**

```
curl 'https://api.tink.com/enrichment/v1/sustainability/accounts//insights' \
--header 'Authorization: Bearer ' \
--header 'Accept: application/json'
```

**Example response:**

```
{
  "language": "en",
  "accountId": "{ACCOUNT_ID}", 
  "insights": [ 
        { 
            "title": "High above the sky", 
            "text": "Aviation creates a number of complex atmospheric reactions at high altitudes - such as vapor contrails - which create an enhanced warming effect. This applies especially to long-distance flights, which need to fly at higher altitudes." 

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
