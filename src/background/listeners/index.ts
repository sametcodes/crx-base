
function handleListener<T>(request: T, sender: chrome.runtime.MessageSender, sendResponse: (message: T) => void) {
    (async () => {
        // handle requests with async/await here
    })();

    // this is required to make the listener async
    return true;
}

chrome.runtime.onMessageExternal.addListener(handleListener);
chrome.runtime.onMessage.addListener(handleListener);