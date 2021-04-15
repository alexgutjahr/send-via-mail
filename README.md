![Send via Mail logo](images/plane.svg?raw=true&sanitize=true)

Send via Mail is a dead-simple extension for Google Chrome, for sending links to your mailbox.
It can be directly installed from the [Chrome Web Store](https://chrome.google.com/webstore/detail/link-2-mail/odjigmolandcfedhfbcgbdblookpdmgn).

## How does it work?

Send via Mail can be accessed either by its icon in the browser bar, or from the context menu.
When applied to a page, the extension creates a URL using [the 'mailto' URI scheme](https://tools.ietf.org/html/rfc6068) pre-filling the subject with the page's title and the body with the page's URL.
When applied to a link, the extension also creates a URL, pre-filling subject and body with the link URL.

The `mailto` URL is then opened in a new tab, delegtating handling to your device.
You might have to configure handling of `mailto` URLs as is described [here](https://support.google.com/a/users/answer/9308783?hl=en).

## What permissions does it require?

- `activeTab`: Access the active tab's title and URL.
- `contextMenus`: Allow using the extension from a context menu action.
- `storage`: Store the default email address.

## Is it secure?

Yes. Send via Mail delegates the actual handling to the local email client.
All the settings are only synced with Chrome (given that sync has been enabled),
and never shared with anyone else.
