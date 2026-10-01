// Check lock status whenever a tab is updated or created
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url) {
    chrome.storage.local.get(['isLocked'], (result) => {
      // Default to locked if not set, or check if explicitly locked
      const locked = result.isLocked !== false; 

      if (locked) {
        // Prevent infinite loops by not redirecting if already on our lock page
        const lockPageUrl = chrome.runtime.getURL('lock.html');
        if (!tab.url.startsWith(lockPageUrl) && !tab.url.startsWith('chrome://')) {
          chrome.tabs.update(tabId, { url: lockPageUrl });
        }
      }
    });
  }
});
