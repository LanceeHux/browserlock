chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.storage.local.get(['isLocked'], (result) => {
    const locked = result.isLocked !== false; 

    if (locked && tab.url) {
      const lockPageUrl = chrome.runtime.getURL('lock.html');
      
      // Redirect the entire tab to the lock screen, avoiding infinite loops and internal chrome pages
      if (!tab.url.startsWith(lockPageUrl) && !tab.url.startsWith('chrome://') && !tab.url.startsWith('chrome-extension://')) {
        chrome.tabs.update(tabId, { url: lockPageUrl });
      }
    }
  });
});
