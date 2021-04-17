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
  mailto(encodeURIComponent(tab.title), tab.url);
});

/*
 * Handle clicks in the context menu.
 * If the target is a page, then the URL becomes the email body and the title becomes the email subject.
 * If the target is a link, then the URL becomes the email body and the email subject.
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.linkUrl) {
    mailto(info.linkUrl, info.linkUrl);
  } else {
    mailto(encodeURIComponent(tab.title), tab.url);
  }
});

function mailto(subject, body) {
  chrome.storage.sync.get("email", ({ email }) => {
    chrome.tabs.create({
      active: true,
      url: `mailto:${email || ""}?subject=${subject}&body=${body}`,
    });
  });
}
