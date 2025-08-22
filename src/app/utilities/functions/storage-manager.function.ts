/**
 * This generic function saves desired value with the supplied key in the browser's local storage.
 *
 * @param key - String to identify value in localstorage
 * @param value - Desired value to be saved
 */
export function saveValueToLocalStorage<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * This generic function tries to return desired value from the browser's local storage with the supplied key.
 *
 * @param key - String to get desired value
 * @returns T - Returns value, if found
 * @returns null - Returns null, if value not found
 */
export function getValueFromLocalStorage<T>(key: string): T | null {
    const resultValue = localStorage.getItem(key);

    if (resultValue) {
        return JSON.parse(resultValue);
    }
    else {
        return null;
    }
}