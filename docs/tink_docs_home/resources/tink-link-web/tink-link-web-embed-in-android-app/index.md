---
title: "Embed in Android app - Tink Docs"
source: "https://docs.tink.com/resources/tink-link-web/tink-link-web-embed-in-android-app"
exportedAt: "2026-01-13T13:01:15.459Z"
---
## Set up deep links or Android App Links[](#set-up-deep-links-or-android-app-links)

In your `AndroidManifest.xml` register a [deep link or Android App Link](https://developer.android.com/training/app-links) that will be used as the value for the `redirect_uri` parameter in your Tink Link URL and later used to retrieve the response of the Tink Link operation in your app.

```
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <!-- Accepts URIs that begin with "demo://callback -->
    <data
        android:host="callback"
        android:scheme="demo" />
</intent-filter>
```

## Launch Tink Link[](#launch-tink-link)

There are several alternatives in how you can launch Tink Link.

### Using a browser intent[](#using-a-browser-intent)

```
val uri: Uri = ... // Your Tink Link URL
val intent = Intent(Intent.ACTION_VIEW, uri)
    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
startActivity(intent)
```

### Using a WebView[](#using-a-webview)

To use WebView with Android, you must allow access to localstorage by adding `setDomStorageEnabled(true)`.

```
val webView = findViewById<WebView>(R.id.web_view)
webView.settings.javaScriptEnabled = true
webView.settings.domStorageEnabled = true
webView.webViewClient = object : WebViewClient() {
    override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
        val uri = Uri.parse(url)
        if (uri.host == "tink.com") { // Keep Tink Link navigation within the WebView
            view!!.loadUrl(url!!)
        } else { // Open third-party navigation and redirects using Intent APIs
            val intent = Intent(Intent.ACTION_VIEW, uri).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            view!!.context.startActivity(intent)
        }
        return true
    }
}

val url: String = ... // Your Tink Link URL
webView.loadUrl(url)
```

## Capture the response[](#capture-the-response)

Retrieve the response of the Tink Link operation, such as `code` or any appropriate response parameter, in `onCreate` or `onNewIntent`. See the respective [reference documentation](https://docs.tink.com/resources/tink-link-web) for more information on the Tink Link response format.

```
override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)

    intent?.data?.let { uri ->
        if (uri.host == "callback") {
            val code = uri.getQueryParameter("code")
            ... // Use `code` to retrieve an user access token
        }
    }
}
```
