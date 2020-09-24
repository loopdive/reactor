import * as React from "react";
import { FC, ReactNode } from "react";

import { animated, useSpring } from "react-spring";

import { useScrollFlags } from "./useScrollFlags";

type Props = { children: ReactNode; hideOnDownScroll?: boolean };

const Topbar: FC<Props> = ({ children, hideOnDownScroll }) => {
  const { scrollUp, isTop } = useScrollFlags(hideOnDownScroll);
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

export default Topbar;
