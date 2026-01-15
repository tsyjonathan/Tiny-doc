---
title: "What is a Tink User?"
source: "/Tiny-doc/tink_docs_home/resources/aggregation/what-is-a-tink-user/"
exportedAt: "2026-01-13T12:55:34.954Z"
---
## Example[](#example)

Accessing Tink Link and signing into your bank would create a Tink user: *Image removed: Authentication*

When you sign up to a bank in this way, we take a snapshot and aggregate all your data for that bank including all data from before the timestamp of the snapshot. By default, this data is available for 24 hours and then needs to be re-authorized to create a new Tink user to continue using the service.

## FAQ[](#faq)

**If I want to get newer data from my bank for a transaction I made after the snapshot, does that mean I need to make a new Tink user?**

-   Yes. Any time you re-authorize with a bank it will create a new Tink user. Note that previously created Tink users will remain active for 24 hours. However, any time you need to ask for up-to-date data from the bank it is counted as a new Tink user.

**My user has expired and it hasn't been 24 hours yet, what happened?**

-   Each authorization has a 7200 second (2 hour) window where the initial access token is valid. You need to acquire a new authorization code to generate a new access token for the **same Tink user** to continue using this aggregation of data at no extra cost. After 24 hours you will no longer be able to acquire a new token for that user.

**Can I keep the same user for more than 24 hours?**

-   Yes. There are some use cases when you want to update data on an existing user, and keep it for a longer time. In that case you should use our [continuous access](/Tiny-doc/tink_docs_home/resources/transactions/continuous-connect-to-a-bank-account/) solution.
