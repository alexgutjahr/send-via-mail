![L2M Logo](images/plane.svg?raw=true&sanitize=true)

Link 2 Mail (L2M) is a dead-simple extension for Google Chrome, for sending links to your mailbox.

## How does it work?

It's sole scope is capturing the title and URL of an active tab in a URL using [the 'mailto' URI scheme](https://tools.ietf.org/html/rfc6068).
It then opens a new tab with that URL, hence delegating handling to the respective device. Most likely these links are handled by Gmail.

## What permissions does it require?

- Storage: Used to store a default email address, so it doesn't have to be entered every time.
- Active Tab: Used to query the current title and URL of the page that should be shared.

## Is it secure?

Yes. L2M delegates all email handling and the default email address is only stored locally.
