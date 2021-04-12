chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get("email", ({ email }) => {
    chrome.tabs.create({
      active: true,
      url: `mailto:${email || ""}?subject=${encodeURIComponent(tab.title)}&body=${tab.url}`,
    });
  });
});
