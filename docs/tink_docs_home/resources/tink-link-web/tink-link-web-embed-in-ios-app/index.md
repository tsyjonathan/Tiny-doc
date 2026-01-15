---
title: "Embed in iOS app - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-embed-in-ios-app/"
exportedAt: "2026-01-13T13:00:43.195Z"
---
## Using SFSafariViewController (recommended)[](#using-sfsafariviewcontroller-recommended-)

See our example iOS project which uses `SFSafariViewController`, specifies the `app_uri` and also shows how to capture the resulting authorization code.

## Using WKWebView[](#using-wkwebview)

To support the different authentication methods provided by Tink Link, when embedding Tink Link inside your app using a `WKWebView`, you will need to route deep links to any third party authentication apps that Tink Link might need to launch. This involves adding a `WKNavigationDelegate` for `WKWebView` and forwarding any non-HTTP requests to `UIApplication.open`.

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
        if let url = navigationAction.request.url, url.scheme != "http" && url.scheme != "https" {
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
            decisionHandler(.cancel)
        } else {
            decisionHandler(.allow)
        }
    }
}

extension WKWebViewViewController: WKUIDelegate {
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration, for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = navigationAction.request.url, url.scheme != "http" && url.scheme != "https" && url.scheme != "about" {
            UIApplication.shared.open(url, options: [:], completionHandler: nil)
            return nil
        } else {
            let newWebView = WKWebView(frame: webView.frame, configuration: configuration)
            newWebView.uiDelegate = self
            view.addSubview(newWebView)
            return newWebView
        }
    }

    func webViewDidClose(_ webView: WKWebView) {
        webView.removeFromSuperview()
    }
}
```

## Using UIWebView[](#using-uiwebview)

UIWebView is deprecated since iOS 12.0, please use WKWebView instead.

## Support for redirecting back to your app[](#support-for-redirecting-back-to-your-app)

To support automatic redirection back to your app after authenticating in a third-party app, such as Mobile Bank ID, you must append the `app_uri` query parameter to your [authentication link](/Tiny-doc/tink_docs_home/resources/getting-started/connect-tink-link/).

> **NOTE**: This needs to be a valid URI such as `example://open` and can't be just a bare scheme (ie. `example://`). This URI is also different from the `redirect_uri` and is only used to return to your app when performing app to app redirects.

### Example[](#example)

If you have defined a custom URL scheme such as `example://...` for your app, the resulting authentication link would look like:

```
[external url removed]
```

To retrieve the authorization code after Tink Link completes, use the registered URL scheme handled by your app (eg. `example://authorize`) and specify it as the `redirect_uri` when creating your [authentication link](/Tiny-doc/tink_docs_home/resources/getting-started/connect-tink-link/).

```
import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        if url.host == "authorize" {
            if let components = URLComponents(url: url, resolvingAgainstBaseURL: true)?.queryItems,
                let code = components.first(where: { $0.name == "code" })?.value,
                let state = components.first(where: { $0.name == "state" })?.value {
                print("authorization code = \(code)") // Use authorization code here
            } else {
                // Handle error
            }
        }
    }
}
```
