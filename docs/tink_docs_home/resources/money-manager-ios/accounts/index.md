---
title: "Accounts for iOS - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/money-manager-ios/accounts/"
exportedAt: "2026-01-13T13:00:14.117Z"
---
*Image removed: Accounts*

## Overview[](#overview)

Accounts lets your app's users see details and transactions from their personal accounts. These accounts can be anything from checking and savings accounts to loans and credit cards.

## Displaying account details[](#displaying-account-details)

Use the `AccountDetailsViewController` when you want to display information and transactions about a user's account.

When creating the view controller, you must specify the ID of the account you want to display.

```
let accountDetailsViewController = AccountDetailsViewController(accountID: <#T##Account.ID#>)
show(accountDetailsViewController, sender: self)
```

Implement the `AccountDetailsViewControllerDelegate` delegate to track when the user selects a transaction.

```
extension ViewController: AccountDetailsViewControllerDelegate { 
    func accountDetailsViewController(_ accountDetailsViewController: AccountDetailsViewController, didSelectTransaction transaction: Transaction) { 
        // Handle selection. 
    }
}
```

## Displaying accounts in the finance overview[](#displaying-accounts-in-the-finance-overview)

You can display accounts in the Finance Overview. To show them, add `.accounts` to the list of `features` in your `FinancialOverviewViewController`. Read more about how to do that [here](/Tiny-doc/tink_docs_home/resources/money-manager-ios/finance-overview/).

### Choosing which accounts to show[](#choosing-which-accounts-to-show)

By default only favorite accounts are shown on the overview.

To change which accounts to show on the overview, specify an `AccountsPredicate` when adding the accounts feature.

```
FinanceOverviewViewController(
    features: [
        .statistics([.expenses, .income]),
        .accounts(.kind(.savings), .none),
        .budgets
    ]
)
```

If using predicate other than `AccountsPredicate.all` a button to show all accounts will be displayed at the end of the list.

### Handling no accounts[](#handling-no-accounts)

If the user hasn't allowed access to any accounts, an empty state will be displayed.

You can add a button asking the user to add an account by configuring the `noAccountsAction`.

For example, if you're also using [Tink Link](/Tiny-doc/tink_docs_home/resources/tink-link-ios/), you can do this:

```
financeOverviewViewController.configuration.noAccountsAction = .addAccount(onTap: {
    let tinkLinkViewController = TinkLinkViewController { result in
        // Handle result
    }
    present(tinkLinkViewController, animated: true)
})
```

## Displaying an account list[](#displaying-an-account-list)

Use the `AccountsViewController` to display all accounts in a list.

```
let accountsViewController = AccountsViewController()
show(accountsViewController, sender: self)
```

### Grouping accounts[](#grouping-accounts)

The accounts can be grouped by providing a `Grouping` when instantiating the view controller.

Use `kind` to group the accounts by kind.  
The accounts will be divided into 4 groups: "Everyday", "Savings", "Loans", and "Other".

```
AccountsViewController(grouping: .kind)
```

You can also specify a custom grouping by providing a function to the `custom` grouping.

The function gives you all accounts and expects an array of `CustomAccountGroup`s in return.

To group favorite accounts, you can do this for example:

```
let grouping: AccountsViewController.Grouping = .custom { accounts in
    var reorderedAccounts = accounts
    let index = reorderedAccounts.partition(by: \.isFavorite)
    let favorites = reorderedAccounts[..<index]
    let others = reorderedAccounts[index...]
    return [
        CustomAccountGroup(accounts: Array(favorites), title: "Favorites"),
        CustomAccountGroup(accounts: Array(others), title: "Accounts")
    ]
}
```

### Filtering accounts[](#filtering-accounts)

You can choose which accounts to show in the list by specifying a predicate.

```
AccountsViewController(predicate: .kind(.creditCard))
```

## Editing an account[](#editing-an-account)

You let the user edit some details of an account by presenting an `EditAccountViewController`.

```
let editAccountViewController = EditAccountViewController(accountID: <#T##Account.ID#>)
let navigationController = UINavigationController(rootViewController: editAccountViewController)
present(navigationController, animated: true)
```

### Configuring fields[](#configuring-fields)

You can configure what changes a user can make to their accounts by specifying which fields should be editable.

For example, to only allow changing the name and if the account is a favorite or not:

```
editAccountViewController.configuration.editAccountFields = [.name, .isFavorite]
```

If you're using the `FinanceOverviewViewController` or another view controller that can present the account details view you can also configure which fields should be editable on their respective configuration.

```
financeOverviewViewController.configuration.editAccountFields = [.isIncluded, .isShared]
```

By default, all fields are shown.

### Hiding the edit button[](#hiding-the-edit-button)

If you don't specify any fields, the edit button on the account details won't be shown.

```
accountDetailsViewController.configuration.editAccountFields = []
```

### Responding to events[](#responding-to-events)

Implement the delegate methods to get notified when the account has been changed or if something went wrong.

```
editAccountViewController.delegate = self
```

```
extension YourViewController: EditAccountViewControllerDelegate {
    func editAccountViewController(_ viewController: EditAccountViewController, didUpdate account: Account) {
        <#code#>
    }
    
    func editAccountViewController(_ viewController: EditAccountViewController, didFailToUpdate error: Error) {
        <#code#>
    }
    
    func editAccountViewControllerDidCancel(_ viewController: EditAccountViewController) {
        dismiss(animated: true)
    }
}
```
