---
title: "Integrate One-Time Payments in Android apps"
source: "/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/integrate-one-time-payments-in-android-apps/"
exportedAt: "2026-01-13T12:42:04.493Z"
---
Give your users a best-in-class user experience directly in your Android app with this straightforward, lightweight integration. This is the quickest and easiest way to launch the Tink SDK from your Android app.

You can integrate the Tink SDK in your Android app with just a few steps:

-   [Set up Android App Links](#set-up-android-app-links)
-   [Build a URL to launch the SDK](#build-a-url)
-   [Open the URL in a preconfigured WebView](#open-the-url-in-a-preconfigured-webview)
-   [Handle the response](#handle-the-response-from-the-sdk)

## Set up Android App Links[](#set-up-android-app-links)

Start by registering Android [App Links or deep links](https://developer.android.com/training/app-links) in your `AndroidManifest.xml`. We'll be using deep links in our examples.

To launch the SDK, you need to include two different Android App Links or deep links in your SDK URL:

-   `app_uri`, which returns the user to your app to resume the SDK flow (Ex: `example://open`).
-   `redirect_uri`, which delivers the success or error response from the SDK after the flow is complete (Ex: `example://callback`)

### Example deep links[](#example-deep-links)

```
<!-- redirect_uri  -->
<intent-filter> 
    <action android:name="android.intent.action.VIEW" /> 
    <category android:name="android.intent.category.DEFAULT" /> 
    <category android:name="android.intent.category.BROWSABLE" /> 
    <!-- Accepts URIs that begin with "example://open --> 
    <data 
        android:host="open" 
        android:scheme="example" /> 
</intent-filter> 

<!-- app_uri  -->
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <!-- Accepts URIs that begin with "example://callback -->
    <data
        android:host="callback"
        android:scheme="example" />
</intent-filter>

<!-- CustomTabs required query (Android API level 30+) -->
<queries>
    <intent>
        <action android:name="android.support.customtabs.action.CustomTabsService" />
    </intent>
</queries>
```

## Build a URL[](#build-a-url)

Build a URL to launch the SDK by either using the Tink Link Builder in [Tink Console](https://console.tink.com/) or constructing a URL and providing the [required parameters](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/one-time-payments-sdk-reference/) as well as the `app_uri` and `redirect_uri` you defined previously.

To opt in to automatic redirect behavior, set the `auto_redirect_mobile` parameter to `true`. This lets your users skip an extra interaction to trigger the bank redirect, and will directly open the bank app if installed, or otherwise fall back to a web-based authentication flow in the system's default browser.

### Example URL[](#example-url)

```
https://link.tink.com/1.0/pay/direct?client_id={YOUR_CLIENT_ID}&market=SE&locale=en_US&payment_request_id={YOUR_PAYMENT_REQUEST_ID}&redirect_uri=example%3A%2F%2Fcallback&app_uri=example%3A%2F%2Fopen&auto_redirect_mobile=true
```

> **NOTE**: The `app_uri` and `redirect_uri` must be valid URIs, such as App Links or a custom URL scheme including a host fragment. For example, `example://open` works, but `example://` would not.

## Open the URL in a preconfigured WebView[](#open-the-url-in-a-preconfigured-webview)

Open your URL in a `WebView` and add the following `WebViewClient` implementation. This keeps the SDK navigation within the web view, opens app redirects using the intent handler and opens web redirects in a browser activity. Web redirects can't be opened directly in the `WebView` because they're blocked by certain banks. The `WebViewClient` implementation is also required for the automatic redirect behavior enabled by the `auto_redirect_mobile` parameter.

### Example WebViewClient implementation[](#example-webviewclient-implementation)

```
val webView = findViewById<WebView>(R.id.web_view)
webView.settings.javaScriptEnabled = true
webView.settings.domStorageEnabled = true
webView.webViewClient = object : WebViewClient() {
    override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
        val context = view!!.context
        val uri = Uri.parse(url)
        if (uri.host == "link.tink.com") { // Handle link.tink.com navigation in the web view
            return false
        } else { // Open external navigation using the system handler
            if (CustomTabsClient.getPackageName(context, null) != null) { // Open in custom tab if available
                val customTabsIntent = CustomTabsIntent.Builder().build()
                customTabsIntent.intent.addFlags(Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS)
                customTabsIntent.intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY)
                customTabsIntent.intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                customTabsIntent.launchUrl(context, uri)
                return true
            } else { // Open in system browser
                val intent = Intent(Intent.ACTION_VIEW, uri)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                context.startActivity(intent)
                return true
            }
        }
    }
}

val url: String = ... // Your SDK URL
webView.loadUrl(url)
```

## Handle the response from the SDK[](#handle-the-response-from-the-sdk)

The SDK sends messages through query parameters appended to the `redirect_uri`. Capture these messages from the SDK in `onCreate` or `onNewIntent`.

### Example response handling[](#example-response-handling)

```
override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)

    intent?.data?.let { uri ->
        if (uri.host == "callback") {
            val paymentRequestId = uri.getQueryParameter("payment_request_id")
            ... // Use `paymentRequestId` to retrieve information about your payment or transfer
        }
    }
}
```

See the [One-time payments SDK reference](/Tiny-doc/tink_docs_home/resources/payments/one-time-payments/one-time-payments-sdk-reference/) for success and error response formats and parameters.

## Design considerations[](#design-considerations)

The SDK user interface has its own navigation bar. To avoid double navigation bars, present the SDK flow as a modal, or place it in such a way that any top navigation bars in your app aren't visible.

By default, the SDK displays error screens to your users prior to delivering the error response to your app. This means you don’t need to present error details to the user yourself.

## Other integration options[](#other-integration-options)

While there are other ways to launch the SDK, we recommend following the implementation described in this guide. Each alternative comes with its own drawbacks.

### System Browser[](#system-browser)

Launching the SDK in the system browser worsens the user experience by taking the user out of your app environment and preventing the use of automatic redirects.
