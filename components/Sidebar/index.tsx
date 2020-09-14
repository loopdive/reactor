import React, { FC, ReactNode, useRef } from "react";
import { animated, useSpring } from "react-spring";

import useOnClickOutside from "use-onclickoutside";

type Props = {
  orientation?: "left" | "right";
  open?: boolean;
  onClose?: () => void;
  children: ReactNode;
  closeOnOutsideClick?: boolean;
};

export const Sidebar: FC<Props> = ({
  orientation = "left",
  open,
  onClose,
  children,
  closeOnOutsideClick = true
}) => {
  const left = orientation === "left";

  const ref = useRef();

  useOnClickOutside(ref, () =>
    setTimeout(() => closeOnOutsideClick && open && onClose(), 150)
  );

  const props = useSpring({
    transform: `translateX(${left ? "-" : ""}${open ? 0 : 100}%)`,
    boxShadow: `${left ? "" : "-"}10px 4px 12px -5px rgba(0, 0, 0, 0${
      open ? ".3" : ""
    })`
  });

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
