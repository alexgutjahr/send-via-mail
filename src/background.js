chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.runtime.openOptionsPage();
  }
});

// Initialize the context menu.
chrome.contextMenus.create({
  id: "menu",
  title: "Send via Mail",
  contexts: ["link", "page"],
});

// Handle clicks on the extension icon in the browser bar.
chrome.action.onClicked.addListener((tab) => {
  sendPage(tab.title, tab.url);
});

/*
 * Handle clicks in the context menu.
 * If the target is a page, then the URL becomes the email body and the title becomes the email subject.
 * If the target is a link, then the URL becomes the email body and the email subject.
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.linkUrl) {
    sendLink(info.linkUrl);
  } else {
    sendPage(tab.title, tab.url);
  }
});

function sendPage(title, url) {
  mailto(title, url);
}

function sendLink(url) {
  mailto(url, url);
}

function makeSubject(prefix, title) {
  if (prefix) {
    return encodeURIComponent(prefix + " " + title);
  }

  return encodeURIComponent(title);
}

function mailto(title, content) {
  chrome.storage.sync.get(["email", "prefix"], (items) => {
    let to = encodeURIComponent(items.email || "");
    let subject = makeSubject(items.prefix, title);
    let body =
      title === content
        ? encodeURIComponent(content)
        : `${encodeURIComponent(title)}%0D%0A${encodeURIComponent(content)}`;

    let url = `mailto:${to}?subject=${subject}&body=${body}`;

    chrome.tabs.create({
      active: true,
      url: url,
    });
  });
}
