---
title: "Customization - Tink Docs"
source: "/Tiny-doc/tink_docs_home/resources/tink-link-web/tink-link-web-customization/"
exportedAt: "2026-01-13T12:54:08.310Z"
---
## Theming[](#theming)

Customize the look and feel to match your brand with the help of themes. We support both LIGHT and DARK themes.

Only LIGHT themes are currently editable in [Console](https://console.tink.com/). Request to enable a DARK theme through Tink's [support portal](/Tiny-doc/tink_docs_home/resources/getting-started/support/). Include the hex-color values for the colors listed below in the request.

### Colors[](#colors)

-   _Primary color_ - Alters the color of icons, spinners, and other elements
-   _Primary text color_ – Alters the color of headers and primary text
-   _Secondary text color_ – Alters the color of other body text
-   _Button background color_ – Alters the background color of buttons
-   _Button text color_ – Alters the color of the button label text
-   _Background_ – Alters the color of the background in Tink Link itself
-   _Tinted background_ – Alters the color of the alternate background
-   _Page background_ – Alters the color of the background outside the Tink Link frame
-   _Error color_ – Alters the color of error text and error border highlights

![Tink Link Web Customization](https://images.ctfassets.net/tmqu5vj33f7w/rPYQrAnmJU9ZJbYFA5XNn/cea029a75df26a6245d6fde193be513b/Tink_Link_Web_Customization.png)

### Logo[](#logo)

Your logo must be a PNG image, 64 pixels in height and a maximum of 400 pixels in width. Please make sure the logo works well with your theme’s _Content background_ color.

To upload a new logo or change an existing one, open Console, go to **\[your\_app\]** > **App settings** > **Customise** and select **Customise your theme**.

![Use a horizontal variation of your logo](https://images.ctfassets.net/tmqu5vj33f7w/Mi1FuoC7GDC3jk5FGASGZ/bdb29bc4d8247358b64ac9ea2b17c400/Logo_instruction_-_horizontal.png)

![Don't add unnecessary whitespace around your logo](https://images.ctfassets.net/tmqu5vj33f7w/4gEHwWso4LWpa45WBx64dp/ec109f6fe9b2b94294381d4f8b5bc352/Logo_instruction_-_whitespace.png)

### Typography[](#typography)

If you wish to change the fonts, send a request through our [support portal](/Tiny-doc/tink_docs_home/resources/getting-started/support/).

We support Adobe Fonts (Typekit) and Google Fonts as font providers, as well as Tink-hosted web fonts. Custom fonts should support the following font weights: 400 and 600.

**Examples**

```
Font family: Helvetica, Arial (fallback)
Font source: System fonts
```

```
Font family: Roboto, Helvetica (fallback)
Font source: Google Fonts
```

```
Font family: Acumin, Arial (fallback)
Font source: Adobe Fonts (Typekit)
Font identifier: xxxxxxx
```

```
Font family: MyFont, Arial (fallback)
Font source: Tink-hosted
Font URL: https://cdn.tink.se/MyFont.css
```

## Other options[](#other-options)

These are options that are not available through the user interface, unless explicitly stated:

-   Hide the Close button and the Back button in the header bar which redirects user back to your app or closes Tink Link - if you decide to hide these buttons, you need to provide an alternative way for user to get back to your application (note that this option does not hide the only one button but both of them)
-   Hide the success screen at the end of Tink Link flow and redirect the user back to your application as soon as possible (not applicable for Payment Initiation when using Tink's license).
-   Hide the user identity screen in permanent users scenario if Tink Link is embedded in an iframe
-   Uppercase text for buttons (available through the user interface)
-   Hide button shadows (available through the user interface)

**Additional options available to licensed customers on the Enterprise tier:**

-   Hide the requested scopes and their descriptions when users connect to a provider
-   Hide the links to Tink's Terms and Conditions and Privacy Policy
-   Hide the Tink logo

## Changing your configuration[](#changing-your-configuration)

If you wish to configure your Tink Link experience you can do so in [Console](https://console.tink.com/app-settings/tinklink-config). You will be able to configure the LIGHT theme colors and preview them live before saving.

![Tink Link Web Customization in Console](https://images.ctfassets.net/tmqu5vj33f7w/4pIQIkg9NmuZPQygoOlPhN/b7f7aa9d86789ef39086a2a208c78713/tink-link-web-customization-console.png)

Once you're satisfied, select _Publish_ to save your new theme and make it available to your customers. You can always revert to the default theme by selecting _Reset_.

![Publish to production](https://images.ctfassets.net/tmqu5vj33f7w/76ff3rU3hjcIxOgOORySS6/0fdea9980fa5685114a2263e5b4d6342/tink-link-web-customization-console-submit.png)
