export function onElementLoaded<T extends HTMLElement>(elementToObserve: string, callback: (el: T) => void) {
    const element = document.querySelector<T>(elementToObserve)
    if (element) {
        callback(element);
        return;
    }

    const observer = new MutationObserver((_, obsrvr) => {
        const divToCheck = document.querySelector<T>(elementToObserve);

        if (divToCheck) {
            obsrvr.disconnect();
            callback(divToCheck);
        }
    });

    observer.observe(document, { childList: true, subtree: true });
}

export function onElementLoadedAsync<T extends HTMLElement>(elementToObserve: string): Promise<T> {
    return new Promise((resolve) => {
        const element = document.querySelector<T>(elementToObserve);
        if (element) {
            resolve(element);
            return;
        }

        const observer = new MutationObserver((_, obsrvr) => {
            const divToCheck = document.querySelector<T>(elementToObserve);

            if (divToCheck) {
                obsrvr.disconnect();
                resolve(divToCheck);
            }
        });

        observer.observe(document, { childList: true, subtree: true });
    });
}