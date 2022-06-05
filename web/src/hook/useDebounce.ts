import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delayTime: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delayTime);

    return () => clearInterval(handler);
  }, [value]);
  return debounceValue;
}
