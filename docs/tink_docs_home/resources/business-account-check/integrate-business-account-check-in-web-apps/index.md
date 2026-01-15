---
title: "Integrate Business Account Check in web apps"
source: "/Tiny-doc/tink_docs_home/resources/business-account-check/integrate-business-account-check-in-web-apps/"
exportedAt: "2026-01-13T12:44:36.200Z"
---
## Launching the SDK[](#launching-the-sdk)

You will first need to construct a URL to launch the SDK flow. In Console, you can use the Tink Link visual editor to easily create and configure the end-user flow. For a list of all possible request and response parameters, see the [Business Account Check SDK reference](/Tiny-doc/tink_docs_home/resources/business-account-check/business-account-check-sdk-reference/). The resulting URL is used to launch the SDK flow, allowing the user to initiate their one-time payment.

### Example URL[](#example-url)

```
[external url removed]
```

> **NOTE:** Make sure to replace {YOUR\_CLIENT\_ID} in the URL with your `client_id` value from Console.

To launch the SDK in your web app, navigate the user to the URL. This starts the SDK flow, where the user selects a bank, consents, authenticates and completes the flow.

When your user completes the flow, they're redirected to the `redirect_uri` you provided in your URL. The response is encoded as query parameters appended to the `redirect_uri`.

### Example response[](#example-response)

```
{YOUR_REDIRECT_URI}?business_account_verification_report_id=ff8ae53bc46e45fe9a37c4fd1353e60d
```

See the [Business Account Check SDK reference](/Tiny-doc/tink_docs_home/resources/business-account-check/business-account-check-sdk-reference/) for success and error response formats and their parameters.
