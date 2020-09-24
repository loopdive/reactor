import * as React from "react";
import { FC, ReactNode, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";

import useOnClickOutside from "use-onclickoutside";
import { AnimatedProps } from "../types";
import { useDisableBodyScroll } from "./useDisableBodyScroll";

type Props = {
  orientation?: "left" | "right";
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  closeOnOutsideClick?: boolean;
  disableBodyScroll?: boolean;
  animate?: boolean;
  animatedProps?: AnimatedProps;
};

const SideBar: FC<Props> = ({
  orientation = "left",
  open,
  onClose,
  children,
  closeOnOutsideClick = true,
  disableBodyScroll = true,
  animate = true,
  animatedProps = {},
}) => {
  const left = orientation === "left";

  const ref = useRef<HTMLDivElement>(null);

  const [disableBodyScrollHandler] = useDisableBodyScroll();

  useEffect(() => {
    if (disableBodyScroll) {
      disableBodyScrollHandler(open);
    }
  }, [open]);

  useOnClickOutside(ref, () =>
    setTimeout(() => closeOnOutsideClick && open && onClose && onClose(), 150)
  );

  return (
    <animated.div
      ref={ref}
      style={{
        ...useSpring({
          immediate: !animate,
          transform: `translate3d(${left ? "-" : ""}${open ? 0 : 100}%, 0, 0)`,
          boxShadow: `${left ? "" : "-"}10px 4px 12px -5px rgba(0, 0, 0, 0${
            open ? ".1" : ""
          })`,
          ...animatedProps,
        }),
        position: "fixed",
        top: 0,
        [orientation]: 0,
      }}
    >
      {children}
    </animated.div>
  );
};

export default SideBar;
