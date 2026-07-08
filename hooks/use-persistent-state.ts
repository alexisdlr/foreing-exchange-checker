import { useEffect, useState } from "react";

export const usePersistentState = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState(initialValue);
  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value) {
      // eslint-disable-next-line
      setState(JSON.parse(value));
    } else {
      localStorage.setItem(key, JSON.stringify(initialValue));
      setState(initialValue);
    }
  }, [key, initialValue]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState] as const;
};
