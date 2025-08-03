import { useEffect, useState } from 'react';

type LocalStorageHook = [string, (query: string) => void];

export function useLocalStorage(
  key: string,
  initialValue: string
): LocalStorageHook {
  const [value, setValue] = useState<string>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving search query to Local Storage:', error);
    }
  }, [key, value]);

  return [value, setValue];
}
