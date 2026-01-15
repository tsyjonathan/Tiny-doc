---
title: "Integrate Expense Check in web apps"
source: "/Tiny-doc/tink_docs_home/resources/expense-check/integrate-expense-check-in-web-apps/"
exportedAt: "2026-01-13T12:49:08.038Z"
---
## Launching the SDK[](#launching-the-sdk)

You will first need to construct a URL to launch the SDK flow. In Console, you can use the Tink Link visual editor to easily create and configure the end-user flow. For a list of all possible request and response parameters, see the [Expense Check SDK reference](/Tiny-doc/tink_docs_home/resources/expense-check/expense-check-sdk-reference/). The resulting URL is used to launch the SDK flow, allowing the user to initiate their one-time payment.

### Example URL[](#example-url)

```
https://link.tink.com/1.0/expense-check/create-report?client_id={YOUR_CLIENT_ID}&market=SE&locale=en_US&redirect_uri=https%3A%2F%myapp.com%2Fcallback
```

> **NOTE:** Make sure to replace {YOUR\_CLIENT\_ID} in the URL with your `client_id` value from Console.

To launch the SDK in your web app, navigate the user to the URL. This starts the SDK flow, where the user selects a bank, consents, authenticates and completes the flow.

When your user completes the flow, they're redirected to the `redirect_uri` you provided in your URL. The response is encoded as query parameters appended to the `redirect_uri`.

### Example response[](#example-response)

```
{YOUR_REDIRECT_URI}?expense_check_id=ff8ae53bc46e45fe9a37c4fd1353e60d
```

See the [Expense Check SDK reference](/Tiny-doc/tink_docs_home/resources/expense-check/expense-check-sdk-reference/) for success and error response formats and their parameters.
