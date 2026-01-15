---
title: "Using the web SDK in mobile apps"
source: "/Tiny-doc/tink_docs_home/resources/transactions/using-the-transactions-web-sdk-in-mobile-apps/"
exportedAt: "2026-01-13T12:58:03.131Z"
---
## Integrate in an iOS app[](#integrate-in-an-ios-app)

Follow the prerequisites and choose an integration option to use the SDK in an iOS app:

1.  Associate a Universal Link (or custom URL scheme) with your app
2.  Build a URL by following the steps in the [Build a URL](#build-a-url) section
3.  Open the URL inside your app using one of the integration methods below
4.  [Capture the response from the SDK in your app](#ios-capturing-the-response)

Use the associated universal link as the `redirect_uri` in your URL. This is the universal link that will be used to deliver the response from the SDK.

To also [support immediately redirecting back to your app](#support-for-redirecting-back-to-your-app) after authentication, instead of intermittently resuming part of the flow in the system browser, add a universal link to open your app and set it as the `app_uri` in your URL. This universal link is only used resume the SDK flow in your app and does not contain any response.

> **NOTE**: The `redirect_uri` and `app_uri` need to be a valid URI, such as an universal link, or a custom URL scheme with a host fragment (eg. `example://open`, instead of a bare scheme `example://`).

### iOS: Using SFSafariViewController (recommended)[](#ios-using-sfsafariviewcontroller-recommended-)

Use SFSafariViewController to open the SDK from your app by using an in-app browser. This keeps the user inside your app and creates a better user experience than opening the SDK in the system browser.

See the Tink Link example app for iOS, which makes use of `SFSafariViewController` to open the URL, specifies the `app_uri`, and shows how to capture the response.

### iOS: Using WKWebView[](#ios-using-wkwebview)

Using WKWebView requires more effort to implement than SFSafariViewController, but provides more control over the UI.

To use WKWebView, you must make sure to route deep links to third-party URL schemes that the SDK may need to open. This is required to support different authentication methods that are provided by SDK (not doing this would result in a blank screen showing in the web view and the redirect not being triggered). Add a `WKNavigationDelegate` for `WKWebView` and defer all non-HTTP(S) requests to `UIApplication.open`.

```
import UIKit
import WebKit

final class WKWebViewViewController: UIViewController {
    private let url: URL
    private let webView = WKWebView()

    init(url: URL) {
        self.url = url
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func viewDidLoad() {
        super.viewDidLoad()

        webView.navigationDelegate = self
        webView.uiDelegate = self
        webView.frame = view.bounds
        view.addSubview(webView)

        webView.load(URLRequest(url: url))
    }
}

extension WKWebViewViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if let url = navigationAction.request.url {
            if url.host == "link.tink.com" { // Handle link.tink.com navigation in the web view
                decisionHandler(.allow)
            } else { // Open third-party navigation and redirects using system APIs
                UIApplication.shared.open(url, options: [:], completionHandler: nil)
                decisionHandler(.cancel)
            }
        } else {
            decisionHandler(.allow)
        }
    }
}

extension WKWebViewViewController: WKUIDelegate {
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = navigationAction.request.url, url.scheme != "http" && url.scheme != "https" && url.scheme != "about" {
            // Forward custom URL scheme deep linking to system open URL APIs
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
            return nil
        } else {
            // Handle opening pop-ups and new windows
            let newWebView = WKWebView(frame: webView.frame, configuration: configuration)
            newWebView.uiDelegate = self
            view.addSubview(newWebView)
            return newWebView
        }
    }
    
    func webViewDidClose(_ webView: WKWebView) {
        // Handle closing pop-ups and new windows
        webView.removeFromSuperview()
    }
}
```

### iOS: Using UIWebView[](#ios-using-uiwebview)

UIWebView is deprecated since iOS 12.0. Use WKWebView instead.

### iOS: Capturing the response[](#ios-capturing-the-response)

The response is delivered as query parameters appended to the `redirect_uri`. Retrieve the response from the SDK in your `UIApplicationDelegate` using one of the delegate methods for handling universal links or deep links.

```
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        if url.host == "callback" {
            if let components = URLComponents(url: url, resolvingAgainstBaseURL: true)?.queryItems,
                let code = components.first(where: { $0.name == "code" })?.value {
                ... // Use `code` to retrieve a user access token that can be used to access the transactions
            } else {
                // Handle error
            }
        }
    }
}
```

See the for success and error response formats and parameters.

### iOS: Automatic redirects[](#ios-automatic-redirects)

Using a web view, it is possible to integrate Tink Link so that it automatically opens redirects to third party banks or authentication apps, without the user having to click a button.

To enable automatic redirects, you need to append `&auto_redirect_mobile=true` as a query parameter to your Tink Link URL. Ensure you have added the `WKNavigationDelegate` implementation above to intercept the redirect URL, otherwise the authentication will be launched in the web view instead.

## Integrate in an Android app[](#integrate-in-an-android-app)

Follow the prerequisites and choose an integration option to use the SDK in an Android app:

**Overview**

1.  Set up [Android App Links](#android-set-up-app-links)
2.  Build a URL by following the steps in the [Build a URL](#build-a-url) section
3.  Open the URL inside your app using one of the integration methods below
4.  [Capture the response from the SDK in your app](#android-capturing-the-response)

### Android: Set up App Links[](#android-set-up-app-links)

Register an Android App Link or deep link in your `AndroidManifest.xml`. Use this link as the `redirect_uri` parameter in the SDK URL and later to capture the response from the SDK in your app.

```
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <!-- Accepts URIs that begin with "example://callback -->
    <data
        android:host="callback"
        android:scheme="example" />
</intent-filter>
```

### Android: Using browser intent[](#android-using-browser-intent)

```
val uri: Uri = ... // Your SDK URL
val intent = Intent(Intent.ACTION_VIEW, uri)
    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
startActivity(intent)
```

### Android: Using WebView[](#android-using-webview)

```
val webView = findViewById<WebView>(R.id.web_view)
webView.settings.javaScriptEnabled = true
webView.settings.domStorageEnabled = true
webView.webViewClient = object : WebViewClient() {
    override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
        val uri = Uri.parse(url)
        if (uri.host == "link.tink.com") { // Keep SDK navigation within the WebView
            return false
        } else { // Open third-party navigation and redirects using Intent APIs
            val intent = Intent(Intent.ACTION_VIEW, uri)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            view!!.context.startActivity(intent)
            return true
        }
    }
}

val url: String = ... // Your SDK URL
webView.loadUrl(url)
```

### Android: Capturing the response[](#android-capturing-the-response)

The response is delivered as query parameters appended to the `redirect_uri`. Retrieve the response from the SDK in `onCreate` or `onNewIntent`.

```
override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)

    intent?.data?.let { uri ->
        if (uri.host == "callback") {
            val code = uri.getQueryParameter("code")
            ... // Use `code` to retrieve a user access token that can be used to access the transactions
        }
    }
}
```

See the for success and error response formats and parameters.

### Android: Automatic redirects[](#android-automatic-redirects)

Using a web view, it is possible to integrate Tink Link so that it automatically opens redirects to third party banks or authentication apps, without the user having to click a button.

To enable automatic redirects, you need to append `&auto_redirect_mobile=true` as a query parameter to your Tink Link URL. Ensure you have added the `WebViewClient` implementation above to intercept the redirect URL, otherwise the authentication will be launched in the web view instead.
