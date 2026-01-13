---
title: "Embed in iframe - Tink Docs"
source: "https://docs.tink.com/resources/tink-link-web/tink-link-web-embed-in-iframe"
exportedAt: "2026-01-13T12:59:22.320Z"
---
> If you are using an iframe-based integration today, see our guide on [migrating to a redirect-based integration](https://docs.tink.com/resources/tink-link-web/tink-link-web-migrating-from-iframe-to-redirect) instead. Redirect integration provides a more linear user journey, improves the reliability of redirect handling during authentication and as a result provides better success rates overall.

## Integrating iframe[](#integrating-iframe)

### 1\. Configure for iframe in the URL[](#configure-for-iframe-in-the-url)

Append the URL parameter `iframe=true` to your `authentication link`. This will make sure that the response message is sent via `postMessage` to the parent window.

### 2\. Add the URL to an iframe element[](#add-the-url-to-an-iframe-element)

Add the `authentication link` as the `src` parameter of an `<iframe>` HTML element.

```
<iframe src="{YOUR_AUTHENTICATION_LINK}" />
```

An iframe will by default be [300px wide](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-width) and [150px tall](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-height). To allow the iframe to seamlessly adapt its size to the containing element, make sure to apply appropriate sizing either by css or inline-styles. Using the `width` attribute will give the iframe a static width, which is not recommended when targeting mobile devices.

```
<!–– ❌ not recommended for mobile devices ––>
<iframe src="{YOUR_AUTHENTICATION_LINK}" width="400" />

<!–– ✅ adapt to the size of the parent element ––>
<iframe src="{YOUR_AUTHENTICATION_LINK}" style="width:100%;" />
```

> **Note:** If you are using sandboxing, you need to at minimum add the following flags `allow-scripts`, `allow-same-origin`, `allow-popups`, `allow-forms`, `allow-popups-to-escape-sandbox`, and `allow-top-navigation` for Tink Link to operate.

### 3\. Add a listener to your app[](#add-a-listener-to-your-app)

All communication between an iframed Tink Link and the parent host is done via `postMessage`. Register a listener to start receiving messages. How you do this is up to you, but the code below shows the basics.

Note that the `type` of the success message differs between products. View the "Response parameters (success)" section in the [API reference](https://docs.tink.com/resources/tink-link-web) for the relevant product.

```
window.addEventListener('message', receiveMessage, false);

function receiveMessage(event) {
  if (event.origin !== 'https://link.tink.com') {
    return;
  }

  // Read more about the message format in the Reference below
  const { type, data, error } = JSON.parse(event.data);

  if (type === 'code') { // type differ between products
    // This is the authorization code that should be exchanged for an access token
    const code = data;
    console.log(`Tink Link returned with authorization code: ${code}`);
  } else if (type === 'error') {
    // Handle error response from Tink Link
    console.log(`Tink Link returned with error status: ${error.status} and error message: ${error.message}.`);
  } else if (type === 'credentials') {
    // Handle credentials error response from Tink Link
    const credentialsId = data;
    console.log(`Authentication failed with credentials identifier: ${credentialsId} with error status: ${error.status} and error message: ${error.message}.`);
  } else if (type === 'status') {
    // Observe Tink Link loading state (optional)
    const { loading } = data;
    console.log(`Tink Link has ${loading ? 'shown' : 'hidden'} the loading overlay.`);
  } else {
    // More message types may be sent or added in the future (these can safely be ignored)
  }
}
```

Also, as with all web development, make sure to take the necessary security precautions. You can read more about `postMessage` [here](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

### 4\. Authenticate and see if it works[](#authenticate-and-see-if-it-works)

Go through the authentication inside the integrated iframe flow. If all is successful, you should receive the `code` in the `event.data` object.

```
{
  "type": "code", // type differ between products
  "data": "fa6b61b1ae10452d192eabe6b0a7bef1"
}
```

## Reference[](#reference)

If you integrate Tink Link in your application via an `iframe`, the result will be delivered as stringified JSON object via `postMessage` to the parent window.

### Success messages[](#success-messages)

> The result is delivered to your parent window using `postMessage` with success response parameters.

```
{
    "type": "code", // type differ between products
    "data": "6915ab99857fec1e6f2f6c078",
    "additionalInformation": {
      "credentialsId": "60f06fc25652453687f712448b7c27fc"
    }
}
```

| Parameter | Description |
| --- | --- |
| type | The type value differ between products. It can be one of the following: `code`, `payment_request_id`, `account_verification_report_id`, `income_check_id`, `risk_insights_id`, `reports` ,`none` |
| data | If `type:code` this field will be the authorization code to be exchanged for an access token. If `type:payment_request_id` this field will be the payment request ID. If `type:none` this field will be undefined. |
| additionalInformation | Other supplemental information that can be leveraged to identify a Tink Link instantiation. |

### Error messages[](#error-messages)

> The result is delivered to your parent window using `postMessage` with error response parameters.

```
{
    "type": "error",
    "error": {
        "status": "BAD_REQUEST",
        "message": "We’re sorry, but an error has occurred",
        "reason": "INVALID_PARAMETER_CLIENT_ID",
        "trackingId": "83526f84-226a-43cc-ae2d-2747f394d71b",
        "credentialsId": "9d547e5b7b1442658878843539a32148" // If credentials were created
    }
}
```

In case of `AUTHENTICATION_ERROR`, the error might include additional information in the result that is delivered to the parent window via a `postMessage`.

```
{
    "type": "credentials",
    "data": "9d547e5b7b1442658878843539a32148", // Credentials identifier
    "error": {
        "status": "AUTHENTICATION_ERROR",
        "message": "Authentication got AUTHENTICATION_ERROR with message: Something went wrong with the BankId authentication",
        "reason": "PROVIDER_UNAVAILABLE",
        "trackingId": "83526f84-226a-43cc-ae2d-2747f394d71b",
        "displayMessage": "Authentication got AUTHENTICATION_ERROR with message: Something went wrong with the BankId authentication",
        "type": "PROVIDER_ERROR",
    }
}
```

| Parameter | Description |
| --- | --- |
| type | `error` or `credentials`. |
| error | An object with `status`, `message`, `userMessage` and `credentialsId` keys. Note that `credentialsId` key is present only if credentials were available before the error occured. |
| data | Credentials identifier in case of `AUTHENTICATION_ERROR`. |

### Status messages[](#status-messages)

During a user's journey through Tink Link, `status` messages will be sent about the state of Tink Link. These can for example be used to display a custom loader. These updates are optional and can be safely ignored.

> Iframe status update

```
{
    "type": "status",
    "data": {
      "loading": true
    }
}
```

| Parameter | Description |
| --- | --- |
| type | `status` |
| data | An object describing the current status of Tink Link.  
`loading` - An indicator when Tink Link shows a loading screen to the user. |

### Application event messages[](#application-event-messages)

To observe a user's journey through Tink Link, you can listen for `application-event` messages. These messages are sent based on application events and user actions. These updates are optional and can be safely ignored.

> Iframe application event update

```
{
    "type": "application-event",
    "data": {
      "event": "INITIALIZED"
    }
}
```

| Parameter | Description |
| --- | --- |
| type | `application-event` |
| data | An object with an `event` key. This key is assigned one of the following values:  
`INITIALIZED` - Tink Link was initialized and is ready for user interaction.  
`CREDENTIALS_SUBMITTED` - The user submitted the credentials form that Tink Link shows for providers with embedded authentication methods.  
`PROVIDER_AUTHENTICATION_INITIALIZED` - The user was redirected to a providers website to complete the authentication.  
`CREDENTIALS_VALIDATION_FAILED` - The user submitted the credentials form with invalid credentials.  
`AUTHENTICATION_SUCCESSFUL` - The user was successfully authenticated with a provider. |

### Error event messages (deprecated)[](#error-event-messages-deprecated-)

This message type is deprecated. Use `error` and `credentials` message types to handle errors instead.

> Iframe error event update

```
{
    "type": "error-event",
    "data": { ... }
}
```

### Redirect messages[](#redirect-messages)

Optionally, you may want to automate redirecting the user to the third party app for authentication using native code in your mobile application. You can use the `url` field to launch the respective third party app.

You can safely ignore this message and let Tink Link handle the redirect. By implementing this message, you are able to shorten the user's journey and the user will not need to perform an explicit action in Tink Link to trigger the redirect.

_Note: This event is only emitted for users using iOS devices._

> Iframe redirect message

```
{
    "type": "redirect",
    "data": {
      "url": "https://ob.bank.com/authenticate?token=foobar"
    }
}
```

| Parameter | Description |
| --- | --- |
| type | `redirect` |
| data | An object with an `url` key which contains a third-party universal link which redirects user to a third party app to authenticate. |

## Frequently asked questions[](#frequently-asked-questions)

### Why do I need to specify a redirect\_uri when embedding in iframe?[](#why-do-i-need-to-specify-a-redirect_uri-when-embedding-in-iframe-)

For security reasons. The `redirect_uri` is used as the `targetOrigin` argument when Tink Link sends messages to the hosting site using [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). This ensures only the hosting site can receive the message. The `redirect_uri` should match the hosting site. If `...?redirect_uri=https://acme.com/tink/redirect`, then the hosting site's origin must be [https://acme.com](https://acme.com/).

### How do I deal with the state parameter?[](#how-do-i-deal-with-the-state-parameter-)

Specifying the `state` parameter helps you identify a given session or user when being redirected back from a Tink Link redirect flow. When using a Tink Link iframe flow, there are no redirects and the hosting site can keep the state locally, thus an iframe embedded Tink Link will not relay the `state` parameter in the response message.

### Why does Tink Link keep spinning?[](#why-does-tink-link-keep-spinning-)

When embedding Tink Link in an iframe it's important to [register a handler](#add-a-listener-to-your-app) to act on the messages that Tink Link sends. It's the responsibility of the hosting site to transition the user or dismiss Tink Link when a [Success message](#success-messages) or [Error message](#error-messages) is sent.
