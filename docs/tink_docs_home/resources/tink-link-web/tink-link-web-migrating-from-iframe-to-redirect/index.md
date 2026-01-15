---
title: "Migrating from iframe to redirect"
source: "/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-migrating-from-iframe-to-redirect/"
exportedAt: "2026-01-13T12:59:19.280Z"
---
Using Tink Link with a redirect integration provides a more linear user journey, improves reliability of redirect handling during authentication and as a result provides better success rates overall. Follow the steps below to migrate from an existing iframe integration to a redirect integration instead.

## 1\. Update your Tink Link URL[](#update-your-tink-link-url)

Start by removing the `iframe=true` parameter from your existing Tink Link URL.

```
- [external url removed]
+ [external url removed]
```

## 2\. Change how you launch Tink Link[](#change-how-you-launch-tink-link)

Instead of opening Tink Link in an iframe element on your page, directly navigate or open the Tink Link URL instead.

Replace your iframe element:

```
<iframe src="{YOUR_TINK_LINK_URL}" />
```

With a navigation link (or similar):

```
<a href="{YOUR_TINK_LINK_URL}">Connect your bank</a>
```

If you are using Tink Link in a web view inside a mobile app, you can have the web view load your Tink Link URL directly. See our articles on embedding Tink Link [in an iOS app](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-embed-in-ios-app/) or [an Android app](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-embed-in-android-app/).

## 3\. Change how you receive responses from Tink Link[](#change-how-you-receive-responses-from-tink-link)

With the changes above, you will no longer receive the Tink Link success or error response through a `postMessage` sent to the parent window. Instead, the response will be delivered by navigating to the specified `redirect_uri` in the Tink Link URL.

This `redirect_uri` can be:

-   a redirect back to your web app where you process the response and asynchronously communicate with your backend service
-   a universal link, app link or deep link to your mobile app where you process the response and asynchronously communicate with your backend service
-   alternatively an API endpoint to your backend service where you process the response and redirect back to your application

For the exact response format and parameters see the [Tink Link Reference](/Tiny-doc/tink_docs_home/resources/tink-link-web/) for your respective product and journey.

**Example**

```
const params = new URLSearchParams(window.location.search);

const error = params.get("error");
if (error) {
  const message = params.get("message");

  // Error, a localized user-displayable error message is available in `message`
  ...
} else {
  const code = params.get("code");

  // Success, continue by sending `code` or any other success response parameters to your backend service
  // Refer to the Tink Link API Reference for the respective product you are using.
  ...
}
```

## User experience tips & tricks[](#user-experience-tips-amp-tricks)

When migrating from iframe to redirect, your application chrome will no longer be present. To still provide a consistent user experience and reassure users that they are still within your application, make sure to leverage Tink Link's customization options:

-   [Add a logo](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-customization/#logo)
-   [Change colors and fonts](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-customization/#theming)

Learn more about [how to change your Tink Link appearance](/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-customization/#changing-your-configuration).

Tink Link in redirect mode is fully responsive and will use all available screen space to provide a mobile or desktop like experience.
