---
title: "Integrate Income Check in iOS apps"
source: "/Tiny-doc/tink_docs_home/resources/income-check/integrate-income-check-in-ios-apps/"
exportedAt: "2026-01-13T12:48:33.783Z"
---
Give your users a best-in-class user experience directly in your iOS app with this straightforward, lightweight integration. This is the quickest and easiest way to launch the Tink SDK from your iOS app.

You can integrate the Tink SDK in your iOS app with just a few steps:

-   [Associate a universal link or custom URL scheme with your app](#associate-a-universal-link-with-your-app)
-   [Build a URL to launch the SDK](#build-a-url)
-   [Open the URL in a preconfigured WKWebView](#open-the-url-in-a-preconfigured-wkwebview)
-   [Handle the response](#handle-the-response-from-the-sdk)

## Associate a universal link with your app[](#associate-a-universal-link-with-your-app)

Start by associating a universal link or custom URL scheme with your app. We recommend using universal links to avoid the “Open this page in YourAppName“ prompt in Mobile Safari during redirects, and this is what we'll use in our examples.

To launch the SDK, you need to include two different universal links or deep links in your URL:

-   `app_uri`, which returns the user to your app and resumes the SDK flow (Ex: `[external url removed]).
-   `redirect_uri`, which delivers the success or error response from the SDK after the flow is complete (Ex: `[external url removed])

> **NOTE**: The `app_uri` and `redirect_uri` must be valid URIs, such as universal links or a custom URL scheme including a host fragment. For example, `example://open` works, but `example://` would not.

## Build a URL[](#build-a-url)

Build a URL to launch the SDK by either using the Tink Link Builder in Tink Console or constructing a URL and providing the [required parameters](/Tiny-doc/tink_docs_home/resources/income-check/income-check-sdk-reference/) as well as the `app_uri` and `redirect_uri` you defined previously.

To opt in to automatic redirect behavior, set the `auto_redirect_mobile` parameter to `true`. This lets your users skip an extra interaction to trigger the bank redirect, and will directly open the bank app if installed, or otherwise fall back to a web-based authentication flow in the system's default browser.

### Example URL[](#example-url)

```
[external url removed]
```

## Open the URL in a preconfigured WKWebView[](#open-the-url-in-a-preconfigured-wkwebview)

Open your URL in a `WKWebView` and add the following implementation. This keeps the SDK navigation within the web view, opens app redirects using the system handler and opens web redirects in an in-app browser. Web redirects can't be opened directly in the `WKWebView` because they're blocked by certain banks. The `WKNavigationDelegate` implementation is required for the automatic redirect behavior enabled by the `auto_redirect_mobile` parameter.

```
import UIKit
import WebKit
import SafariServices

extension Notification.Name {
    static let linkCallback = Notification.Name("Link.Callback")
    static let linkOpen = Notification.Name("Link.Open")
}

final class LinkViewController: UIViewController { 
    let url: URL 

    private let webView = WKWebView() 
    private var safariViewController: SFSafariViewController? 

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
        webView.translatesAutoresizingMaskIntoConstraints = false 
        view.addSubview(webView) 

        NSLayoutConstraint.activate([ 
            webView.topAnchor.constraint(equalTo: view.topAnchor), 
            webView.leadingAnchor.constraint(equalTo: view.leadingAnchor), 
            webView.trailingAnchor.constraint(equalTo: view.trailingAnchor), 
            webView.bottomAnchor.constraint(equalTo: view.bottomAnchor), 
        ]) 
        webView.load(URLRequest(url: url)) 

        NotificationCenter.default.addObserver(forName: .linkOpen, object: nil, queue: .main) { [weak self] notification in 
            self?.safariViewController?.dismiss(animated: true) 
            self?.safariViewController = nil 
        } 

        NotificationCenter.default.addObserver(forName: .linkCallback, object: nil, queue: .main) { [weak self] notification in 
            guard let url = notification.userInfo?["url"] as? URL else { return } 
            let components = URLComponents(url: url, resolvingAgainstBaseURL: true) 
            if let incomeCheckId = components?.queryItems?.first(where: { $0.name == "income_check_id" })?.value { 
                // Successful response: Use `incomeCheckId` to retrieve the report using your backend
            } else if let error = components?.queryItems?.first(where: { $0.name == "error" })?.value, error != "USER_CANCELLED" { 
                // Error response: Handle `error` code 
            }           
            self?.dismiss(animated: true) 
        } 
    } 
} 

extension LinkViewController: WKNavigationDelegate { 
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) { 
        if let url = navigationAction.request.url { 
            if url.host == "link.tink.com", navigationAction.targetFrame != nil { 
                // Handle same page link.tink.com navigation in the web view 
                decisionHandler(.allow) 
            } else if ["http", "https"].contains(url.scheme) { 
                // Attempt to open HTTP(s) navigation using universal links, otherwise present in embedded in-app browser 
                UIApplication.shared.open(url, options: [.universalLinksOnly: true], completionHandler: { [weak self] success in 
                    guard !success else { 
                        return 
                    } 
                    let safariViewController = SFSafariViewController(url: url) 
                    safariViewController.modalPresentationStyle = .formSheet 
                    self?.present(safariViewController, animated: true) 
                    self?.safariViewController = safariViewController 
                }) 
                decisionHandler(.cancel) 
            } else { 
                // Open custom scheme deep links (eg. bankid://) using the system handler 
                UIApplication.shared.open(url, options: [:], completionHandler: nil) 
                decisionHandler(.cancel) 
            } 
        } else { 
            decisionHandler(.allow) 
        } 
    } 
} 

extension AppDelegate {
    // Called when the app is opened via a custom URL scheme (e.g.: myapp://)
    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        if url.host() == "open" {
            NotificationCenter.default.post(name: .linkOpen, object: nil, userInfo: ["url": url])
            return true
        }
        
        if url.host() == "callback" {
            NotificationCenter.default.post(name: .linkCallback, object: nil, userInfo: ["url": url])
            return true
        }
        
        return false
    }

    // Called when the app is opened via a Universal Link (e.g.: [external url removed])
    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([any UIUserActivityRestoring]?) -> Void) -> Bool {
        guard let url = userActivity.webpageURL else { return false }
        
        if url.path.dropFirst() == "open" {
            NotificationCenter.default.post(name: .linkOpen, object: nil, userInfo: ["url": url])
            return true
        }
        
        if url.path.dropFirst() == "callback" {
            NotificationCenter.default.post(name: .linkCallback, object: nil, userInfo: ["url": url])
            return true
        }
        
        return false
    }
}

extension SceneDelegate {
    // Called when the app is opened via a custom URL scheme (e.g.: myapp://)
    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        guard let url = URLContexts.first?.url else { return }
        
        if url.host() == "open" {
            NotificationCenter.default.post(name: .linkOpen, object: nil, userInfo: ["url": url])
        }
        
        if url.host() == "callback" {
            NotificationCenter.default.post(name: .linkCallback, object: nil, userInfo: ["url": url])
        }
    }

    // Called when the app is opened via a Universal Link (e.g.: [external url removed])
    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        guard let url = userActivity.webpageURL else { return }
        
        if url.path.dropFirst() == "open" {
            NotificationCenter.default.post(name: .linkOpen, object: nil, userInfo: ["url": url])
        }
        
        if url.path.dropFirst() == "callback" {
            NotificationCenter.default.post(name: .linkCallback, object: nil, userInfo: ["url": url])
        }
    }
}
```

## Handle the response from the SDK[](#handle-the-response-from-the-sdk)

The SDK will return the result of the operation as query parameters appended to the `redirect_uri`. You can access the `income_check_id` in the `Notification.Name.linkCallback` notification observer as demonstrated in the [preconfigured WKWebView example](#open-the-url-in-a-preconfigured-wkwebview).

See the [Income Check SDK reference](/Tiny-doc/tink_docs_home/resources/income-check/income-check-sdk-reference/) for success and error response formats and parameters.

## Design considerations[](#design-considerations)

The SDK user interface has its own navigation bar. To avoid double navigation bars, present the SDK flow as a modal. If this isn't possible, avoid placing it in any `UINavigationController` or `NavigationStack` that has a visible navigation bar.

By default, the SDK displays error screens to your users prior to delivering the error response to your app. This means you don’t need to present error details to the user yourself.

## Other integration options[](#other-integration-options)

While there are other ways to launch the SDK, we recommend following the implementation described in this guide. Each alternative comes with its own drawbacks.

### UIWebView[](#uiwebview)

`UIWebView` is deprecated as of iOS 12.0. Use `WKWebView` instead to get the same behavior.

### SFSafariViewController[](#sfsafariviewcontroller)

`SFSafariViewController` is incompatible with the SDK URL's `app_uri` and `auto_redirect_mobile` parameters.

### System Browser[](#system-browser)

Launching the SDK in the system browser worsens the user experience by taking the user out of your app environment and preventing the use of automatic redirects.
