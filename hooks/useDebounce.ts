// hooks/useDebounce.ts
import { useState, useEffect } from "react";

/**
 * Returns a debounced value that updates only after the specified delay.
 * @param value The value to debounce
 * @param delay Delay in milliseconds
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer); // cleanup previous timer
  }, [value, delay]);

  return debouncedValue;
}
