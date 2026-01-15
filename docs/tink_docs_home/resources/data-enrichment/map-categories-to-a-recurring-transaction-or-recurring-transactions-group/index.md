---
title: "Map categories to a recurring transaction or recurring transactions group"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/map-categories-to-a-recurring-transaction-or-recurring-transactions-group/"
exportedAt: "2026-01-13T12:47:50.022Z"
---
This article shows how to get the category names that are associated with category IDs that are returned in the responses to recurring-transactions and recurring-transactions-groups requests. This is useful when you want to add a user-friendly category name to a recurring transaction or a recurring transactions group.

To fetch the categories, call the `/enrichment/v1/categories` endpoint.

```
curl -X 'GET' \
'https://api.tink.com/api/v1/categories’ \
  -H 'accept: application/json'
```

For more details on this endpoint, you can read the guide [here](/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-a-list-of-all-categories-for-your-locale/). The response is a list of categories:

```
[..., {
  "code" : "expenses:home.communications",
  "defaultChild" : false,
  "id" : "075fab3ec31f43aa9d39675475c1fb1a",
  "parent" : "f5220586cb184ec38d4b65384a40f91e",
  "primaryName" : "Household & Services",
  "searchTerms" : null,
  "secondaryName" : "Media & IT",
  "sortOrder" : 5,
  "type" : "EXPENSES",
  "typeName" : "Expenses"
}]
```

Map the categoryId in the responses to recurring-transactions and recurring-transactions-groups to an id in this response. This must be done to find the correct category name and translation.

Optional Parameters

You can supply a locale as an optional query parameter to get translations of the categories in other languages.

| Parameter | Description |
| --- | --- |
| locale | The locale to which the categories should be translated. |

Currently supported locales are

| Locale | Description |
| --- | --- |
| en\_US | United states |
| sv\_SE | Sweden |
| fr\_FR | France |
| en\_GB | Great Britain |
| nl\_NL | The Netherlands |
| it\_IT | Italy |
| pt\_PT | Portugal |
| de\_DE | Germany |
| fi\_FI | Finland |
| pl\_PL | Poland |
| en\_IE | Ireland |

Example request with query parameters

```
curl -X 'GET' \
'https://api.tink.com/api/v1/categories?locale=en_US’’ \
  -H 'accept: application/json'
```

You have now everything in place in order to add a category to a recurring transaction or a recurring transactions group.
