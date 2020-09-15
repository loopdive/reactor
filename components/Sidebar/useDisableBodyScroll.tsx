import { useCallback } from "react";

// Hook
export const useDisableBodyScroll = (): [(value: boolean) => void] => {
  const handler = useCallback((value: boolean) => {
    if (value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, []);

  return [handler];
};
