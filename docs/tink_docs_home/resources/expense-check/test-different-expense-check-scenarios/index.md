---
title: "Test different Expense Check scenarios"
source: "/Tiny-doc/tink_docs_home/resources/expense-check/test-different-expense-check-scenarios/"
exportedAt: "2026-01-13T12:48:58.211Z"
---
## Demo Bank[](#demo-bank)

**Demo Bank** is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios and see how your end-user flow works before it goes into production.

Your demo credentials are found inside Console, so let's start there.

1.  Log in to Console.
2.  Select **Demo Bank**.
3.  Select your **Product** (in this case, Expense Check) and your **Market**.

*Image removed: expense-check-demo-bank* _Demo Bank user credentials for Expense Check in the Swedish market._

Each user represents a different test case. In Demo Bank, the **Description** field explains a user's purpose. For example, User 1 is used to test a successful scenario that leads to you fetching an Expense Check report for a single account holder with ID data, one expense, and one bank account.

## The URL[](#the-url)

When you have selected a Demo Bank user for your test, store the username and password for the next step. It's now time to build your own Tink Link.

### The flow[](#the-flow)

You have now entered the flow, so let's walk through the example steps.

*Image removed: Account Check Tink Link flow, step 1*

Because we're going to use Demo Bank credentials to authenticate, select **Tink Demo Bank**.

*Image removed: Account Check Tink Link flow, step 2*

Select **Open Banking**.

*Image removed: Account Check Tink Link flow, step 3*

Select **Password And OTP**.

*Image removed: Account Check Tink Link flow, step 4*

For **Username** and **Password**, enter the Demo Bank credentials that you previously stored.

For **OTP Method**, select **Text input**.

Select **Continue**.

*Image removed: Account Check Tink Link flow, step 5*

In the **OTP Code** field, enter the four-digit number that is written underneath the text box and select **Submit**.

*Image removed: expense-check-flow-successful*

Don't close the webpage that you have now reached. You'll need to save part of its URL, the part that looks like this: `[external url removed]]`.

Store the value for `expense_check_id`. You will need it to fetch the Expense Check report.

### Get your access token[](#get-your-access-token)

Enter the `client_id` and `client_secret` values for your Expense Check app (that are found in Console) and run this code to get your API `access_token`.

Get your access token

```
curl -v -X POST [external url removed] \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=expense-checks:readonly'
```

You should get a successful response with your `access_token` at the bottom.

```
{
  "token_type" : "bearer",
  "expires_in" : 1800,
  "access_token" : "{YOUR_ACCESS_TOKEN}",
  "scope" : "expense-checks:readonly"
}
```

Store your `access_token`.

### Fetch your report[](#fetch-your-report)

Now is the time to fetch the Expense Check report in the JSON format through the [Expense Check API](/Tiny-doc/tink_docs_api/api/#risk/expense-check/get-an-expense-check).

Fetch your Expense Check report

```
curl -X GET [external url removed] \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' 
```

Before you run this code, do you remember the `expense_check_id` that you were asked to store? Just exchange `{expense_check_id}` with that value and exchange `{YOUR_ACCESS_TOKEN}` with your `access_token` value.

Now, run the code! You will end up with a response like this one:

```
{
  "id": "8113f235-278c-4e28-9d3c-2bad06c2126r”,
  "externalReference": "test-123",
  "engineVersion": "1.0.0",
  "identity": {
   "name": ”John Doe”,
   "ssn": "19860901XXX”
  },
  "accounts": [
   {
     "id": "5dce0949d8b4440bba74e74473b81f2b",
     "accountNumber": "12450377355",
     "name": "Danske Konto",
     "holderNames": [
      "John Doe"
     ]
   }
  ],
  "appId": "fbd6987f0a5643bd8ab4c8209e12f69a",
  "userId": "ae37c03cfd364113ab6f6256dfeced3c",
  "expenses": {
   "housing": {
...
```

**Note**: the report will contain data from only one provider, which is the bank that has been selected by the end user.
