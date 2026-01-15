---
title: "Getting started with Money Manager on Android"
source: "/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/pfm-sdk-android-tutorial/"
exportedAt: "2026-01-13T12:58:57.737Z"
---
## Installation[](#installation)

1.  Download the [latest SDK release](https://github.com/tink-ab/tink-money-manager-android/releases/latest) zip file.
2.  Unzip and take the `com` folder (containing the SDK's local maven dependencies) and put it in `~/.m2/repository/`.
3.  Add `mavenLocal()` as repository in your root level build.gradle file.

```
allprojects {
    repositories {
        mavenLocal()
        // Rest of the repositories
    }
}
```

> **Note:** The `mavenLocal()` repository needs to be on top of the other repositories, as shown above.

4.  Add dependency on the SDK:

```
dependencies {
    implementation("com.tink.moneymanager:moneymanager-ui:<version>")
}
```

5.  Enable databinding. In your app-level `build.gradle`, inside the `android` block:

```
dataBinding {
   enabled = true
}
```

6.  Set the java compiler to Java 8 or higher. In your app-level `build.gradle`, inside the `android` block:

```
compileOptions {
   sourceCompatibility = JavaVersion.VERSION_1_8
   targetCompatibility = JavaVersion.VERSION_1_8
}
```

## Initialization[](#initialization)

1.  Set up a configuration object with your specifics:
    
    ```
    val config =
        TinkConfiguration(
            environment = Environment.Production, // Or define your own environment
            oAuthClientId = "yourKey", // Your clientId. Retrieve it from console.tink.com,
            redirectUri = "https://localhost:3000/callback" // [1]
        )
    ```
    
    `[1]` _This is only required if you also use Tink Link in your application. Please follow the [third party authentication guide](/Tiny-doc/tink_docs_home/resources/tutorials/tink-link-sdk-android-tutorial/#third-party-authentication) to set this up. Otherwise, this can be just set to `https://localhost:3000/callback` as shown in the sample above. We will be working on improving this setup and making this field optional in the future._
    
2.  Initialize Tink in your application:
    
    ```
    Tink.init(config, applicationContext)
    ```
    
    _Tink.init can only be initiliazed once, trying to initialize it a second time will throw an IllegalStateException. We recommend initializing it in your Application class to be sure it's only done once._
    
3.  Override the `TinkFinanceOverviewStyle` for color customizations. Follow the [customization guide](/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/pfm-sdk-android-customization/) to set this up.
    
4.  Set up a `EventTracker` implementation. This is optional and you can add the implementation if you want to track screens and events in the finance overview UI. Follow the [tracking guide](/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/pfm-sdk-android-event-tracking/) to set this up.
    
5.  Create an instance of `OverviewFeatures`. This is optional and can be done if you want to customize the Overview screen. Follow the [customization guide](/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/pfm-sdk-android-finance-overview/#displaying-the-finance-overview) to set this up.
    
6.  \[Optional\] Extend the `InsightActionHandler` class, if you want to handle the actions for the insights in the Events UI. Follow the [insight actions guide](/Tiny-doc/tink_docs_home/resources/pfm-sdk-android/pfm-sdk-android-handling-insight-actions/) to set this up.
    
7.  \[Optional\] Extend the `OnBackPressedListener` interface and pass the implementation to the `backPressedListener` parameter, if you want to execute code when the user navigates back in the SDK (either by clicking the navigation icon in the toolbar or the Android OS back button).
    
8.  \[Optional\] You can show a toolbar for the Finance Overview by passing `true` to the `isOverviewToolbarVisible` parameter. This parameter otherwise defaults to `false`.
    
9.  Create an instance of `FinanceOverviewFragment`
    
    ```
    val financeOverviewFragment = 
        FinanceOverviewFragment.newInstance(
            accessToken = "yourAccessToken", // [1]
            styleResId = R.style.YourCustomTinkFinanceOverviewStyle, // Resource ID of your style that extends TinkFinanceOverviewStyle
            tracker = yourTracker, // Your EventTracker implementation (optional)
            overviewFeatures = yourOverviewFeatures, // Your OverviewFeatures instance (optional)
            insightActionHandler = yourInsightActionHandler, // Your InsightActionHandler subclass (optional),
            backPressedListener = yourBackPressListener, // Your implementation of OnBackPressedListener where you can execute code when back press events are triggered in the SDK (optional)
            isOverviewToolbarVisible = shouldShowOverViewToolbar // Set this to true if you want to display a toolbar in the Finance Overview (optional, defaults to false)
        )
    ```
    

`[1]` Money Manager SDK needs a valid access token for a specific user to function correctly. Since the SDK does not handle any type of authentication, this needs to be done by your backend. See [this link](/Tiny-doc/tink_docs_api/api/#general/oauth) for more info on how this is done.

> **Note:** All data and connections are scoped to the lifecycle of the `FinanceOverviewFragment`, i.e. after it is destroyed, all cached content will be garbage collected. That means it is important to not leak a reference to the fragment so no sensitive user data is retained in memory after usage.

## Refreshing access tokens[](#refreshing-access-tokens)

User access tokens expire after a set amount of time. You can keep your user logged in by exchanging a refresh token for a new access token [(see Tink docs)](/Tiny-doc/tink_docs_api/api/#general/oauth/get-access-token) and passing it to the fragment. This will overwrite the token that the fragment was initialzed with. If needed you can also refresh the statistics and latest transactions:

```
financeOverviewFragment.setAccessToken(yourNewToken)
financeOverviewFragment.refreshData() // Optional
```

## Additional requirements[](#additional-requirements)

There are some things you need to address for the Tink Finance Overview to work as expected.

### Handling back press[](#handling-back-press)

In order for navigation to work properly within the `FinanceOverviewFragment`, you need to forward back press events to it. This can be done by overriding the `onBackPressed()` method in your activity and call `handleBackPress()` on the fragment. This method will also return a boolean value indication whether the `FinanceOverviewFragment` has consumed the event or not.

```
// In your activity:

override fun onBackPressed() {
   val backpressHandled = financeOverviewFragment?.handleBackPress()
   if (backpressHandled == false) {
       super.onBackPressed() // Or do whatever suits your application
   }
}
```

### Locking screen orientation[](#locking-screen-orientation)

The Tink Finance Overview only works correctly when the screen orientation is locked to portrait mode. Fixed landscape mode or changing the configuration dynamically will lead to unexpected results and suboptimal user experience. You can achieve this by opening your Android manifest and setting `android:screenOrientation=“portrait”` on the Activity containing the `FinanceOverviewFragment`.
