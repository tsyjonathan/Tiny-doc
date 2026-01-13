---
title: "Accounts for Android - Tink Docs"
source: "https://docs.tink.com/resources/money-manager/money-manager-android/accounts-for-android"
exportedAt: "2026-01-13T12:51:43.112Z"
---
![Accounts](https://images.ctfassets.net/tmqu5vj33f7w/5AfWrjPOyHXETxWfHswMHR/6e94e5ddb410c0ac254d30cfa2cb80aa/accountsAndroid.png)

## Overview[](#overview)

Accounts lets your app's users see details and transactions from their personal accounts. These accounts can be anything from checkings and savings accounts to loans and credit cards.

## Displaying an account list[](#displaying-an-account-list)

To display the accounts without launching the finance overview screen, create an instance of `EntryPoint.Accounts` and pass it to the `TinkMoneyManager.init(...)` method.

```
val accountsEntrypoint = EntryPoint.Accounts(
    groupingMode = GroupingByKind, // group accounts by different GroupingMode.
    filteringMode = FilterAll,  // Filter out which accounts to show in the list by different specifications.
    accountEditConfiguration = AccountEditConfiguration(   // List of configuration options for editing an account.
                listOf(
            EditAccountField.NAME,
            EditAccountField.KIND   
        )
    )
)

    TinkMoneyManager.init(
        accessToken = "myAccessToken", // A valid access token.
        styleResId = R.style.MyCustomTinkMoneyManagerStyle, // Resource ID of your style that extends TinkMoneyManagerStyle.
        tracker = myTracker, // Your event tracking implementation (optional).
        backPressedListener = myBackPressedListener, // Your back press listener (optional).
        editPendingTransaction = false, // Determines if pending transactions can be recategorized. Defaults to true.
        enableTransactionDetail = false, // Determines the behaviour of the SDK when the user clicks on a transaction. Defaults to true.
        entryPoint = accountsEntrypoint, // The Money Manager feature to launch.
        containerId = R.id.fragmentContainer, // The resource ID of the container which will contain the Tink Fragment.
        fragmentManager = supportFragmentManager // The FragmentManager which performs the Tink fragment transaction.
    )
```

## Customizing accounts[](#customizing-accounts)

### Filtering accounts[](#filtering-accounts)

You can optionally decide which accounts should be visible by specifying a filter for the accounts feature. By default only accounts marked as "favorite" are shown on the finance overview screen, but there are also many other types of predefined filters:

**`FilterAll`** displays all accounts.

**`FilterByFavorites`** displays only favorite accounts.

**`FilterByFinancialInstitution`** displays only accounts which match a specific financial institution.

**`FilterByCredentials`** displays only accounts which match a specific credential id.

**`FilterByType`** displays only accounts of a specific type (checking, savings, ...)

**`CustomFilter`** enables writing your own filter.

Below is an example of how to configure the SDK to show only savings accounts.

```
val accountsEntrypoint = EntryPoint.Accounts(
    filteringMode = FilterByType(Account.Type.SAVINGS)
)
```

### Grouping accounts[](#grouping-accounts)

You can optionally decide how to group the accounts in the account list. There are 3 different ways to group accounts:

**`NoGrouping`** lists all accounts alphabetically without grouping.

**`GroupingByKind`** groups accounts into "everyday", "savings", "loan" and "other accounts".

**`CustomGrouping`** enables writing your own grouping function.

The default grouping function is `NoGrouping`, meaning accounts will not be grouped unless you change this.

Below is an example of how to use the `GroupingByKind` grouping.

```
val accountsEntrypoint = EntryPoint.Accounts(
    groupingMode = GroupingByKind
)
```

To use a `CustomGrouping` to group favorite accounts, you can for instance use the following grouping object.

```
val grouping = CustomGrouping { accountsList ->
    val favorites = GroupedAccountsItem(
        accountGroup = AccountGroup(R.string.tink_overview_favorite_accounts_see_all, 1),
        accountsList.filter { it.account.favored }
    )

    val others = GroupedAccountsItem(
        accountGroup = AccountGroup(R.string.tink_other_account, 2),
        accountsList.filter { !it.account.favored }
    )

    listOf(favorites, others)
}
```

### Editing an account[](#editing-an-account)

By default, your users can edit some account settings:

-   Account name
-   Account kind
-   Exclude account
-   Mark an account as favorite
-   Mark an account as shared

Excluded accounts will be excluded from statistics and budgets. Transactions from this account will not be visible in the SDK.

You can override what changes a user can make by specifying which fields should be editable by providing a value for `accountEditConfiguration` in the `Accounts` feature.

For example, to only allow changing the name and if the account is a favorite or not, the following object should be provided:

```
val accountEditConfiguration = AccountEditConfiguration(
    listOf(EditAccountField.NAME, EditAccountField.IS_FAVORITE)
) 
```

### Hiding the edit button[](#hiding-the-edit-button)

If you provide an empty list, the edit button on the account details view will be hidden.

```
val accountEditConfiguration = AccountEditConfiguration(emptyList())
```
