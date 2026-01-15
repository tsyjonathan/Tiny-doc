---
title: "Test different Income Check scenarios"
source: "/Tiny-doc/tink_docs_home/resources/income-check/test-different-income-check-scenarios/"
exportedAt: "2026-01-13T12:48:25.865Z"
---
## Demo Bank[](#demo-bank)

**Demo Bank** is a simulated bank that allows you to test Tink products without using real bank credentials. Even though Demo Bank doesn't use real bank credentials, it lets you try real-world scenarios and see how your end-user flow works before it goes into production.

Your demo credentials are found inside Console, so let's start there.

1.  Log in to Console.
2.  Select **Demo Bank**.
3.  Select your **Product** (in this case, Income Check) and your **Market**.

*Image removed: Demo Bank, Income Check test cases* _Demo Bank user credentials for Income Check in the Swedish market._

Each user represents a different test case. In Demo Bank, the **Description** field explains a user's purpose. For example, User 1 is used to test a successful scenario that leads to you fetching an Income Check report for a single account holder with ID data, one income, and one bank account.

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

*Image removed: Income Check, Tink Link flow*

Don't close this page! You'll need to save part of the URL, which looks like this: `[external url removed]]`.

Store the value for `income_check_id`. You will need it to fetch the Income Check report.

### Get your access token[](#get-your-access-token)

Enter the `client_id` and `client_secret` values for your Income Check app (that are found in Console) and run this code to get your API `access_token`.

Get your access token

```
curl -v -X POST [external url removed] \
-d 'client_id=' \
-d 'client_secret=' \
-d 'grant_type=client_credentials' \
-d 'scope=income-checks:readonly'
```

You should get a successful response with your `access_token` at the bottom.

```
{
  "token_type" : "bearer",
  "expires_in" : 1800,
  "access_token" : "{YOUR_ACCESS_TOKEN}",
  "scope" : "income-checks:readonly"
}
```

Store your `access_token`.

### Fetch your report[](#fetch-your-report)

Now is the time to fetch the Income Check report in the JSON format through the [Income Check API](/Tiny-doc/tink_docs_api/api/#risk/income-check/get-an-income-check).

Fetch your Income Check report

```
curl -X GET [external url removed] \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json' 
```

Before you run this code, do you remember the `income_check_id` that you were asked to store? Just exchange `{income_check_id}` with that value and exchange `{YOUR_ACCESS_TOKEN}` with your `access_token` value.

Now, run the code! You will end up with a response like this one:

```
{
  "accounts": [
    {
      "accountNumber": "1234-123456789",
      "financialInstitutionName": "Demo Bank",
      "holderNames": [
        "John Doe",
        "Jane Doe"
      ],
      "id": "a6bb87e57a8c4dd4874b241471a2b9e8",
      "name": "Jane's and John's account"
    }
  ],
  "appId": "56a33be25eb9443fbb696f7c61eabd94",
  "createdTime": "2021-04-22T09:59:56.966Z",
  "engineVersion": "1.0.0",
  "externalReference": "ext-abc-123",
  "id": "a8efc70a24a5e4aed0f8d3e5380b01fd74fc9cd1",
  "identity": {
    "name": "John Doe",
    "ssn": "197601011234"
  },
  "income": {
    "primaryIncomeStreamId": "f1d2d2f924e986ac86fdf7b36c94bcdf32beec15",
    "streams": [
    ...
```

**Note**: the report will contain data from only one provider, which is the bank that has been selected by the end user.
