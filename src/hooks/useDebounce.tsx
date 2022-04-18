/*
 * @Author: 东林
 * @Date: 2022-03-14 16:26:18
 * @description: 防抖Hook
 */
import { useEffect, useState } from 'react';

function useDebounce(value: any, delay = 500) {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
