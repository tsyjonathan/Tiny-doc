---
title: "Fetch a list of all categories for your locale"
source: "/Tiny-doc/tink_docs_home/resources/data-enrichment/fetch-a-list-of-all-categories-for-your-locale/"
exportedAt: "2026-01-13T12:47:36.193Z"
---
### Step 1: Create the request[](#step-1-create-the-request)

Use the following URL, setting the locale to the locale of your choice. The locale is made up of two parts, connected by an underscore:

The first part is the language. Tink uses ISO 639-1 codes to represent languages, so for English we use ‘en’, Spanish we use ‘es’, and so on. The second part is the country code. Tink uses ISO 3166-1 alpha 2 codes to represent countries, so for the United States we would use ‘US’, for Sweden we use ‘SE’, and so on.

If you don’t know what locale to use, the English default is en\_US.

Using your user access token, call the list categories endpoint:

```
curl "[external url removed]" \ 
-H 'Authorization: Bearer {YOUR_USER_ACCESS_TOKEN}'
```

You should see a list of categories for the locale:

```
{        
    "code": "expenses:food.restaurants",
    "defaultChild": false,
    "id": "7e88d58188ee49749adca59e152324b6",
    "parent": "067fa4c769774ae980435c76be328c0b",
    "parentName": "Food & Drinks",
    "childName": "Restaurants",
    "sortOrder": 45,
    "typeName": "Expenses"
  }
```

### Step 2: Get user-friendly category names[](#step-2-get-user-friendly-category-names)

To present user-friendly category names for your users from the response you got from step 1, you'll need the following parameters:

| Parameter | Description |
| --- | --- |
| id | the internal identifier of the category, referenced by e.g. a transaction |
| parentName | the primary name of this category |
| childName | the secondary name of this category |

Parent name is the top level category name (for example, “Food & Drinks”), while the child name is the subcategory level name (for example, “Restaurants”).
