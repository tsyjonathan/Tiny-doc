---
title: "Set up and integrate Business Transactions"
source: "https://docs.tink.com/resources/business-transactions/setup-and-integrate-business-transactions"
exportedAt: "2026-01-13T12:47:24.159Z"
---
## Introduction[](#introduction)

On a high level, this is how the Tink Link SDK works:

1.  You integrate the SDK and launch the product specific flow.
2.  The user selects a bank, consents, authenticates and completes their flow.
3.  The user is redirected back to your app or website with the result of the operation.

For the best authentication experience, use the SDK appropriate for your platform:

-   If your app is **web-based**, see [integrate with your web app](#tink-link-web).
-   If you are building an **iOS** app, see [integrate with your iOS app](#tink-link-for-ios).
-   If you are building an **Android** app, see [integrate with your Android app](#tink-link-for-android).

## Tink Link for Web[](#tink-link-for-web)

### Launching the SDK[](#launching-the-sdk)

You will first need to construct a URL to launch the SDK flow. In [Console](https://console.tink.com/), you can use the [Tink Link visual editor](https://console.tink.com/business-transactions/tink-link) to easily create and configure the end-user flow. For a list of all possible request and response parameters, see the [Business Transactions SDK reference](https://docs.tink.com/resources/business-transactions/business-transactions-sdk-reference). The resulting URL is used to launch the SDK flow, allowing the user to authenticate with their bank and select an account from which Business Transactions data will be fetched.

**Example URL**

```
https://link.tink.com/1.0/business-transactions/connect-accounts?client_id={YOUR_CLIENT_ID}&redirect_uri=https://console.tink.com/callback&market=GB
```

> **NOTE**: Make sure to replace `{YOUR_CLIENT_ID}` in the URL with your `client_id` value from [Console](https://console.tink.com/).

To launch the SDK in your web app, simply navigate the user to the URL above. This starts the SDK flow, where the user selects a bank, consents, authenticates and completes the flow. After completion, the user is redirected back to the specified `redirect_uri` with the response. The response is encoded as query parameters appended to the `redirect_uri`.

**Example response**

```
{YOUR_REDIRECT_URI}?code=18fd1334216748869b98sde50631e74
```

See the [Business Transactions SDK reference](https://docs.tink.com/resources/business-transactions/business-transactions-sdk-reference) for success and error response formats and their parameters.

To successfully integrate the web SDK in a mobile app, see [using the web SDK in mobile apps](https://docs.tink.com/resources/business-transactions/using-the-business-business-transactions-web-sdk-in-mobile-apps).

### API Reference[](#api-reference)

For the full reference documentation, see the [Business Transactions SDK reference](https://docs.tink.com/resources/business-transactions/business-transactions-sdk-reference).

## Tink Link for iOS[](#tink-link-for-ios)

### Installation[](#installation)

_Prerequisites: iOS 13.0+, Xcode 14.1+, Swift 5.7_

#### Using Swift Package Manager[](#using-swift-package-manager)

Add a [package dependency](https://help.apple.com/xcode/mac/current/#/devb83d64851) in Xcode to your app target.

1.  In Xcode, select _File > Add Packages..._
2.  Enter `https://github.com/tink-ab/tink-link-ios` as the repository URL.
3.  Add the `TinkLink` product to the [target of your app](https://developer.apple.com/documentation/xcode/adding-package-dependencies-to-your-app).

#### Using CocoaPods[](#using-cocoapods)

Add `TinkLink` to your `Podfile`.

```
pod "TinkLink"
```

#### Using manual installation[](#using-manual-installation)

1.  Download and extract the `TinkLink.xcframework` from the [releases page on GitHub](https://github.com/tink-ab/tink-link-ios/releases).
2.  Drag `TinkLink.xcframework` to the _Frameworks, Libraries, and Embedded Content_ section of the _General_ settings tab for your application target in your Xcode project. Make sure to select Copy items if needed.

For details on the latest SDK release and past versions, see [Tink Link for iOS releases page](https://github.com/tink-ab/tink-link-ios/releases) on GitHub.

### Initialization[](#initialization)

The end user may be taken out of your app to complete the authentication (for example, into their banking app or Safari). To allow them to automatically return to your app after authenticating, configure a [universal link](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content) or a [custom URL scheme](https://developer.apple.com/documentation/xcode/defining-a-custom-url-scheme-for-your-app). Using universal links is preferable, as they offer a more streamlined redirect experience, without prompting the user to confirm the redirection back to your app.

Use your client ID (obtained from [Console](https://console.tink.com/app-settings/client)) and the redirect URI configured above (and registered in [Console](https://console.tink.com/app-settings/client)) to create the `Configuration` type. The `baseDomain` determines the API base domain for Tink Link. In case you are not using a custom environment, set it to `.eu`.

```
import TinkLink

let configuration = Configuration(clientID: <#String#>, redirectURI: <#String#>, baseDomain: <#BaseDomain#>)
```

### Launching the SDK[](#launching-the-sdk)

1.  Initiate and present an instance of the view controller using your configuration and desired market.
    
    ```
    let viewController = Tink.BusinessTransactions.connectAccountsForOneTimeAccess(configuration: configuration, market: Market(<#String#>)) { result in
        // Handle result
    }
    present(viewController, animated: true)
    ```
    
2.  After the user has completed or canceled the flow, the completion handler will be called with a result. A successful authentication returns a result that's dependent on the flow. If something goes wrong, the result contains an error.
    
    ```
    switch result {
        case .success(let response):
            // Handle success case
        case .failure(let error):
            // Handle error case
    }
    ```
    
3.  You are responsible for dismissing the `viewController` by calling `dismiss(animated:completion:)` inside the completion handler.
    
    ```
        let viewController = Tink.BusinessTransactions.connectAccountsForOneTimeAccess(configuration: configuration, market: Market(<#String#>)) { [weak self] result in
            // Handle result
            self?.dismiss(animated: true)
        }
    ```
    

### Example app[](#example-app)

-   [TinkLinkSimpleSample](https://github.com/tink-ab/tink-link-ios/tree/master/Samples/TinkLinkSimpleSample) shows how to integrate the Tink Link SDK in the easiest and fastest manner

### API Reference[](#api-reference)

For the full reference documentation, see the [iOS SDK Reference](https://tink-ab.github.io/tink-link-ios/documentation/tinklink/tink/businesstransactions).

## Tink Link for Android[](#tink-link-for-android)

### Installation[](#installation)

_Prerequisites: Minimum API level 23 (Android 6.0)_

1.  Make sure that `mavenCentral()` is added to your repositories.
    
    ```
    allprojects {
       repositories {
          mavenCentral()
       }
    }
    ```
    
2.  Add `link` to the dependencies block of your `app/build.gradle` file.
    
    ```
    dependencies {
       implementation "com.tink:link:2.+"
    }
    ```
    
3.  Add `Proguard Rules`
    
    ```
    -keep class com.tink.link.core.** { *; }
    -keepclassmembers class com.tink.link.core.** { *; }
    ```
    

For details on the latest SDK release and past versions, see [Tink Link for Android releases page](https://github.com/tink-ab/tink-link-android/releases) on GitHub.

### Initialization[](#initialization)

The end user may be taken out of your app to complete the authentication (for example, into their banking app or system browser). To allow them to automatically return to your app after authenticating, configure an [App Link](https://developer.android.com/training/app-links) or a [deep link](https://developer.android.com/training/app-links/deep-linking).

To create a link to your app content, start by configuring an activity that will launch Tink Link and adding an intent filter in your `AndroidManifest.xml`:

```
<activity
    ...
    android:exported="true"
    android:launchMode="singleInstance">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
                android:host="{REDIRECT_URI_HOST}"
                android:scheme="{REDIRECT_URI_SCHEME}" />
    </intent-filter>
</activity>
```

### Launching the SDK[](#launching-the-sdk)

The SDK can be integrated with all apps, regardless of UI architecture, using either XML layout or Jetpack Compose.

1.  Create the configuration object use your client ID (obtained from [Console](https://console.tink.com/app-settings/client)) and the redirect URI configured above (and registered in [Console](https://console.tink.com/app-settings/client)). The baseDomain determines the API base domain for Tink Link. In case you are not using a custom environment, set it to `BaseDomain.EU`.
    
    ```
    val configuration = Configuration(
        clientId = "{YOUR_CLIENT_ID}",
        redirectUri = "{YOUR_REDIRECT_URI}",
        baseDomain =  "{TINK_LINK_BASE_DOMAIN}",
        market = "{YOUR_MARKET_CODE}" 
    )
    ```
    
2.  Create the request object for the specific product flow:
    
    ```
    val request = BusinessConnectAccountsForOneTimeAccess()
    ```
    
3.  Launch the product flow by passing the configuration and request object. You can display the SDK in two different modes by specifying the launchMode parameter (either FullScreen or Modal):
    
    ```
    Tink.BusinessTransactions.connectAccountsForOneTimeAccess(
        activity,
        configuration,
        request,
        FullScreen(...),
        { success ->
            // Callback for handling success case
        },
        { error ->
            // Callback for handling error case
        }
    )
    ```
    

After the flow has been completed, the SDK will asynchronously return the successful or erroneous outcome in one of the callbacks above.

Using the `FullScreen` launch mode displays the product flow in full screen mode. Only the status bar is visible and the action bar is hidden. Using the `Modal` launch mode displays the product flow inside a modal bottom sheet, which leaves the top part of your app still visible.

![Tink Link Android Navigation](https://images.ctfassets.net/tmqu5vj33f7w/2qHQB9X0BqIzOKPZRX1Y7X/b71bb33fe73b42a29ee529a7ad6659cf/android-full-screen-vs-modal.jpg)

### Example apps[](#example-apps)

-   [Simple example app](https://github.com/tink-ab/tink-link-android/tree/master/sample-dev) shows code samples how to integrate the Tink Link SDK in the easiest and fastest manner
-   [Products example app](https://github.com/tink-ab/tink-link-android/tree/master/sample-app) shows how to integrate the SDK for different products

## API Reference[](#api-reference)

For the full reference documentation, see the [Android SDK Reference](https://tink-ab.github.io/tink-link-android/-tink%20-link%20-android%20-s-d-k/com.tink.link.core.features.businessTransactions/-tink-business-transactions/index.html).
