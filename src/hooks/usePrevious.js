import { useEffect, useRef } from "react";

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
};
