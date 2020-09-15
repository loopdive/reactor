import React, { FC, ReactNode, useState } from "react";

import { animated, useSpring } from "react-spring";

import { useScrollPosition } from "@n8tb1t/use-scroll-position";

type Props = { children: ReactNode; hideOnDownScroll?: boolean };

const TopBar: FC<Props> = ({ children, hideOnDownScroll = false }) => {
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

  return (
    <animated.div
      style={{
        ...useSpring({
          transform: `translate3d(0, ${scrollUp ? "0" : "-100"}%, 0)`,
          boxShadow: `0 12px 10px -10px rgba(0, 0, 0, 0${isTop ? "" : ".05"})`,
        }),
        position: "sticky",
        top: "0",
        left: "0",
        width: "100%",
      }}
    >
      {children}
    </animated.div>
  );
};

export default TopBar;
