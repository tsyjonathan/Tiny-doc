---
title: "Early redirect - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/transactions/early-redirect/"
exportedAt: "2026-01-13T12:46:33.924Z"
---
Redirect users from Tink back to your application right after they've authenticated. If you don't need to use the data immediately, this allows you to skip the updating step while the data is retrieved and processed or simply move the updating step into your application instead.

When a user authenticates with a financial institution, we retrieve and process their data before they're redirected to your application. You can opt-in to redirect the user to your application immediately after they've authenticated (before the data has finished being fetched and processed) but you need to take extra steps before accessing the data.

## Handling early redirect in your app[](#handling-early-redirect-in-your-app)

Since the user is redirected to your application before all the financial data has been retrieved and processed, you will need to make sure that the credentials have finished updating before accessing the data (failure to do so could result in no data or only a subset of the data being returned).

The indication that the data has been retrieved and processed is that the [credentials](/Tiny-doc/tink_docs_api/api/#connectivity/credentials) object transitions into an `UPDATED` state.

When the user is redirected to your specified `redirect_uri` you need to:

1.  Exchange the authorization code (`code`) for a user access token as described in [Authenticate your client](/Tiny-doc/tink_docs_home/resources/transactions/connect-to-a-bank-account/#authenticate-your-client).
2.  Start polling for the [credentials](/Tiny-doc/tink_docs_api/api/#connectivity/credentials) object (`credentialsId` is available as part of the `redirect_uri`) and wait until the credential's `state` transitions into an `UPDATED` state.
    
    **Example Get credentials request**
    

```
curl '[external url removed]' \
-H 'Authorization: Bearer ' \
-H 'Content-Type: application/json'
```

4.  Once the credentials are in an `UPDATED` state, you can proceed with [One-time access to a bank account](/Tiny-doc/tink_docs_home/resources/transactions/connect-to-a-bank-account/) or [Continuous access to a bank account](/Tiny-doc/tink_docs_home/resources/transactions/continuous-connect-to-a-bank-account/).
