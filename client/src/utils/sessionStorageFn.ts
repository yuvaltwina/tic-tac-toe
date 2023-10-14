export function setSessionStorageItem(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error while setting session storage item:', error);
  }
}

// Function to get an item from session storage
export function getSessionStorageItem(key: string) {
  try {
    const storedItem = sessionStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : null;
  } catch (error) {
    console.error('Error while getting session storage item:', error);
    return null;
  }
}
export function deleteSessionStorageItem(key: string) {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Error while deleting session storage item:', error);
  }
}
