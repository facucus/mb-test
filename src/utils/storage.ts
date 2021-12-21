
export const set = (key: string, value: Object) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting localStorage key “${key}”:`, error);
  }
}

export const get = (key: string) => {
  try {
    const item: string | null = window.localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } 
  } catch (error) {
    console.warn(`Error getting localStorage key “${key}”:`, error);
  }
}

export const remove = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key “${key}”:`, error);
  }
}