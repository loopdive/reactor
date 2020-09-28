import { useCallback, useEffect, useState } from "react";

export const useMedia = (
  queries: string[],
  values: number[],
  defaultValue: number
): number => {
  const match = useCallback(
    (): number =>
      values[queries.findIndex((q) => matchMedia(q).matches)] || defaultValue,
    [values, queries, defaultValue]
  );

  const [value, setValue] = useState(match);

  useEffect(() => {
    const handler = () => setValue(match);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [match]);

  return value;
};
