import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { useState } from "react";

export const useScrollFlags = (
  hideOnDownScroll: boolean
): { scrollUp: boolean; isTop: boolean } => {
  const [scrollUp, setScrollUp] = useState<boolean>(true);
  const [isTop, setIsTop] = useState<boolean>(true);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (hideOnDownScroll) {
        if (currPos.y > prevPos.y) {
          setScrollUp(true);
        } else if (currPos.y < prevPos.y) {
          setScrollUp(false);
        }
      }

      if (currPos.y === 0) {
        setIsTop(true);
      } else setIsTop(false);
    },
    [hideOnDownScroll]
  );

  return { scrollUp, isTop };
};
