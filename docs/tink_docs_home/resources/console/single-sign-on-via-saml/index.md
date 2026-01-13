---
title: "Single sign-on - Tink Docs"
source: "https://docs.tink.com/resources/console/single-sign-on-via-saml"
exportedAt: "2026-01-13T12:53:51.282Z"
---
## Introduction[](#introduction)

We allow organizations with their own IdP to use SSO (single sign-on) via SAML to log in users to Console. When SSO is enabled, users can log in to Console via your own IdP. A user that logs in with SSO doesn't need a Console user account. SSO can be enforced so that users must log in via SSO. More than one IdP can be used for SSO.

## Set up single sign-on[](#set-up-single-sign-on)

1.  Go to [Console](https://console.tink.com/) and log in.
    
2.  Select **Organisation** > **Settings** > **Single sign-on**. ![SAML settings](https://images.ctfassets.net/tmqu5vj33f7w/4QTguGvsigbLXYNLptzD5G/8bd7f9c8cd49e984bbc6a43ce41d666b/settings.png)
    
3.  Select **Add SAML identity provider**.
    
    **Note**: You can add more than one IdP. Users with the same email address from different IdPs will be treated as the same user.
    
4.  Enter a **Name** for your SAML identity provider.
    
    **Note**: Some IdPs require that you provide a service provider’s (SP) metadata before you are allowed to extract IdP metadata. If this is the case, upload an incomplete IdP metadata file and update it later by selecting **Update**. ![Upload IdP metadata](https://images.ctfassets.net/tmqu5vj33f7w/2uTWIdfjuJdFOYkUOXx9Bh/c8a1b4b34b7b7cf788969113cdefc9d0/saml-upload.png)
    
5.  Select **Upload IdP metadata**. The file must be in the XML format.
    
6.  Select your IdP metadata file.
    
7.  Select **Next**.
    
    The file is now uploaded.
    
    The Tink service provider (SP) settings dialog appears. ![SP settings](https://images.ctfassets.net/tmqu5vj33f7w/69mMNt7GavUEto6fqP8HAF/52d4775fc2b5b44fade720bb0182f462/saml-uploaded.png)
    
8.  Select **Download metadata** to download a SAML-formatted metadata file for use with your IdP.
    
9.  Configure the SAML attribute mappings in your IdP. Some attributes are required and authentication will fail if they are not mapped according to the table.
    
    | Name | Value | Required | Format |
    | --- | --- | --- | --- |
    | `email` | The user's email address | ✅ | Email address. Example: `name@domain.com` |
    | `firstName` | The user's first name | ✅ | Letters, numbers, the space character and these characters: `.-/&` |
    | `lastName` | The user's last name | ✅ | Letters, numbers, the space character and these characters: `.-/&` |
    | `role` | The user's role | ❌ | For a full list of allowed values, see [Role map](#role-map). |
    
    > The attributes `firstName`, `lastName` and `role` are updated every time a user logs in if the IdP configuration has changed since the last login. If the role attribute isn't configured, the user is assigned the `viewer` role.
    
10.  Use the `Login URL` from the **Tink service provider (SP) settings** dialog in step 7 to log in via your newly configured SAML connection.
     

When the setup is completed you can always go back to **Organisation > Settings** to find the SP settings.

### Important[](#important)

-   Console doesn't support IdP-initiated logins. Users must use `Login URL` to authenticate with Console.
-   **Default role for new users**: If you enable SSO and assign a value to the SAML mapping `role`, Console users will be assigned to that role when they log in for the first time. If you enable SSO and do not use the SAML mapping `role`, Console users will be assigned to the **Viewer** role when they log in for the first time.
-   **IdP settings always overrule Console settings**: If you enable SSO, assign a value to the SAML mapping `role` and change an existing Console user’s role in your IdP, Console will detect that change the next time the user logs in to Console and change their Console role to what is stated in the IdP.
-   To see the settings for an SP, go to **Organisation** > **[Settings](https://console.tink.com/account/organization/settings)** and select the name of your SAML identity provider.

![Organisation settings updated](https://images.ctfassets.net/tmqu5vj33f7w/010QBWZSBHzPGbABy5kRlo/010d52e4c7122cd4a599152294445b42/saml-done.png)

## Enforce single sign-on[](#enforce-single-sign-on)

Enforce SSO by changing your **Authentication** method to log in with SSO via SAML. Only the organization owner has permission to enforce SSO. Before doing so, make sure there are no pending user invitations and that all non-SSO users - except the owner — have been manually removed. Enforcement cannot proceed until these conditions are met.

The owner of the organisation will not be affected when enforcing SSO. The reason for this is to avoid locking out an entire organisation from Console if the SAML configuration breaks.

To enforce SSO:

1.  Go to [Console](https://console.tink.com/) and log in.
2.  Go to **Organisation** > **Settings** > **Single sign-on**. ![SAML settings](https://images.ctfassets.net/tmqu5vj33f7w/4QTguGvsigbLXYNLptzD5G/8bd7f9c8cd49e984bbc6a43ce41d666b/settings.png)
3.  Select **Edit authentication**. ![SSO authentication](https://images.ctfassets.net/tmqu5vj33f7w/4LDie8080kclqAUYtsCh5J/9a556d7aa5e40f8bbcebf97da718ee70/SSO_authentication.png)
4.  Select **Members must log in with SSO via SAML**.
5.  Select **Save**.

## Role map[](#role-map)

These values can be passed in the role attribute of the SAML assertion:

| Supported values | Role |
| --- | --- |
| `admin` | Administrator |
| `editor` | Editor |
| `viewer` | Viewer |
| `support` | Support |

## FAQ[](#faq)

**Can I be a part of multiple organizations?**

No, you can’t. We see SAML users as unique users per organization.

**Can I automatically be logged out?**

You will automatically be logged out. A session is valid for 3 hours.

**When I use more than one IdP, how are users handled?**

SAML users with the same email address that exist in the same Console organization are seen as a unique user.

**How do you handle users that use different authentication methods?**

A Console organization supports multiple user authentication methods by default. See [Enforce SSO](#enforce-single-sign-on) if you only want to use SSO for authentication purposes. If more than one user have the same email address but use different authentication methods, Console will consider the users to be separate.

This is why an organization owner can't use SSO: if the SAML configuration would somehow break, it could lead to an entire organization being locked out, including the owner.

**Do you sign AuthnRequest messages?**

Yes, we do. As an SP, we have set `AuthnRequestsSigned=true`, which means that we sign the `AuthRequest` messages that we send.

**Do you support IdP-initiated login?**

No, we don’t. This is for security reasons.

**Why do I get a 403 response?**

-   Login via IdP initiation isn't allowed.
-   Your SAML attribute mappings are incorrect. Double-check that your fields are not misspelled and that your values aren't incorrectly formatted.

**Can you please help me with this?**

Don’t hesitate to contact [Tink Support](https://docs.tink.com/resources/support/how-to-find-technical-support) if you have any questions or problems that you want to resolve. We’re here to help.
