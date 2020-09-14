import React, { FC, ReactNode, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";

import useOnClickOutside from "use-onclickoutside";
import { useDisableBodyScroll } from "./useDisableBodyScroll";

type Props = {
  orientation?: "left" | "right";
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  closeOnOutsideClick?: boolean;
  disableBodyScroll?: boolean;
};

export const Sidebar: FC<Props> = ({
  orientation = "left",
  open,
  onClose,
  children,
  closeOnOutsideClick = true,
  disableBodyScroll = true
}) => {
  const left = orientation === "left";

  const ref = useRef();

  const props = useSpring({
    transform: `translateX(${left ? "-" : ""}${open ? 0 : 100}%)`,
    boxShadow: `${left ? "" : "-"}10px 4px 12px -5px rgba(0, 0, 0, 0${
      open ? ".1" : ""
    })`
  });

  const [disableBodyScrollHandler] = useDisableBodyScroll();

  useEffect(() => {
    if (disableBodyScroll) {
      disableBodyScrollHandler(open);
    }
  }, [open]);

  useOnClickOutside(ref, () =>
    setTimeout(() => closeOnOutsideClick && open && onClose(), 150)
  );

  return (
    <animated.div
      ref={ref}
      style={{
        ...props,
        position: "fixed",
        top: 0,
        [orientation]: 0
      }}
    >
      {children}
    </animated.div>
  );
};

export default Sidebar;
