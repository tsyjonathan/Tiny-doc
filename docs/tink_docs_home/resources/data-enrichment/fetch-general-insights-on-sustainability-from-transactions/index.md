---
title: "Fetch general insights on Sustainability"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-general-insights-on-sustainability-from-transactions/"
exportedAt: "2026-01-13T12:48:04.719Z"
---
Insights are sustainability and eco-friendly advice which are designed to broaden a user’s understanding of the environmental impact of various activities. These insights are not tied to specific transactions but rather provide general advice on how to minimize carbon footprints.

To fetch these insights, call the `/enrichment/v1/sustainability/insights` endpoint.

**Example request:**

```
curl '[external url removed]' \
--header 'Authorization: Bearer ' \
--header 'Accept: application/json'
```

**Example response:**

```
{
  "language": "en",
  "insights": [
    {
      "title": "Have you ever heard of Sustainable Aviation Fuel?",
      "text": "Sustainable Aviation Fuel is plane fuel made from waste and is less harmful than ordinary kerosine. However, it can be up to six times more expensive than kerosine and barely used for this reason. But researchers are on it!"
    },
    {
      "title": "If a taxi is the only option...",
      "text": "If you can't avoid taking a taxi, reduce the emissions of your journey by choosing taxi providers with low emission cars, opt for ridesharing or, even better, do both!"
    },
    {
      "title": "The fishing industry's plastic problem",
      "text": "Plastics can be harmful to oceans in many ways, from their toxins and microplastic pollution to their potential to trap and kill marine animals. A large portion (20%) of ocean plastic comes from fishing, shipping, and recreation."
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
curl '[external url removed]' \
--header 'Authorization: Bearer ' \
--header 'Accept: application/json'
```
