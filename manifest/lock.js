const passInput = document.getElementById('passInput');
const actionBtn = document.getElementById('actionBtn');
const instruction = document.getElementById('instruction');
const message = document.getElementById('message');

// Check if a password has been set yet
chrome.storage.local.get(['masterPassword'], (result) => {
  if (!result.masterPassword) {
    instruction.textContent = "Set your new lock PIN/Password:";
    actionBtn.textContent = "Set Password";
  }
});

actionBtn.addEventListener('click', handleAction);
passInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleAction();
});

function handleAction() {
  const val = passInput.value.trim();
  if (!val) {
    message.textContent = "Please enter a valid password.";
    return;
  }

  chrome.storage.local.get(['masterPassword'], (result) => {
    if (!result.masterPassword) {
      // Save new password and lock state
      chrome.storage.local.set({ masterPassword: val, isLocked: false }, () => {
        alert("Password set successfully! Browser unlocked.");
        window.location.href = "https://www.google.com";
      });
    } else {
      // Verify password
      if (val === result.masterPassword) {
        chrome.storage.local.set({ isLocked: false }, () => {
          window.location.href = "https://www.google.com";
        });
      } else {
        message.textContent = "Incorrect password. Try again.";
        passInput.value = "";
      }
    }
  });
}
