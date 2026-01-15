---
title: "Getting started with the Money Manager SDK for iOS"
source: "/Tiny-doc/tink_docs_home/resources/pfm-sdk-ios/tutorial/"
exportedAt: "2026-01-13T13:00:07.671Z"
---
## Installation[](#installation)

### Swift Package Manager[](#swift-package-manager)

1.  Follow these instructions to [link a target to a package product](https://help.apple.com/xcode/mac/current/#/devb83d64851).
    
2.  Enter this URL `https://github.com/tink-ab/tink-money-manager-ios` when asked for a package repository.
    
3.  When Xcode is done resolving `tink-pfm-ios` and asks you to choose package products, select `TinkMoneyManagerUI`.
    

### Using CocoaPods[](#using-cocoapods)

Refer to their [guide](https://guides.cocoapods.org/using/using-cocoapods.html) for usage and installation instructions.

1.  Add `TinkMoneyManagerUI` to your Podfile.
    
    ```
    pod "TinkMoneyManagerUI"
    ```
    
2.  Run `pod install` in your project directory.
    
3.  Open your `.xcworkspace` file to see the project in Xcode.
    

### Manual Installation[](#manual-installation)

Drag the `TinkMoneyManagerUI.xcframework` and `TinkCore.xcframework` into the _Frameworks, Libraries, and Embedded Content_ section on your application targets’ _General_ tab.

You should now be able to `import TinkMoneyManagerUI` within your project.

![Target settings in Xcode](https://images.ctfassets.net/tmqu5vj33f7w/77dT7Z5BtbAOydGUUj1E3a/bc2e4e1fe3895243aafee3617d00316d/xcode-add-framework.png)

## Initialization[](#initialization)

Money Manager SDK needs a valid access token for a specific user to function correctly. Since the SDK does not handle any type of authentication, this needs to be done by your backend. See [this link](/Tiny-doc/tink_docs_api/api/#general/oauth) for more info on how this is done. Once you have an access token you pass it on to your `Tink` instance.

```
Tink.shared.userSession = .accessToken(<#T##String#>)
```

Once you have a valid access token you can create a `FinanceOverviewViewController`.

```
let financeOverviewViewController = FinanceOverviewViewController(features: [.statistics([.expenses, .income]), .accounts, .latestTransactions])
let navigationController = UINavigationController(rootViewController: financeOverviewViewController)
```

4.  Present the view controller, for example in a `UITabbarController`:

```
tabBarController.viewControllers?.append(navigationController)
```

## Refreshing access tokens[](#refreshing-access-tokens)

User access tokens expire after a set amount of time. You can keep your user logged in by [exchanging your refresh token](/Tiny-doc/tink_docs_api/api/#general/oauth) for a new access token and assigning it to the `Tink` instance. This will replace the previous token that was used. If needed you can also refresh the statistics, accounts and latest transactions.

```
Tink.shared.userSession = .accessToken(<#String#>)
Tink.shared.refresh()
```

## Creating a custom Tink instance[](#creating-a-custom-tink-instance)

You can create your own Tink instance if you prefer. This might be used if you would like full control over the lifetime of the Tink object or if you need to access more advanced features like certificate pinning.

1.  Create a configuration:

```
let configuration = try Tink.Configuration(clientID: <#T##String#>, environment: .custom(restURL: <#T##URL#>), certificateURL: <#T##URL#>)
```

_The SSL certificate is used for certificate pinning. This is optional and you can choose to set it depending on your requirements._

2.  Create a `Tink` instance using your configuration:

```
let tink = Tink(configuration: configuration)
```

3.  The `Tink` instance can be added to view controllers during initialization:

```
let financeOverviewViewController = FinanceOverviewViewController(tink: tink, features: [.statistics([.expenses, .income]), .accounts, .latestTransactions])
```
