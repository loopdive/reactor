import React, { FC, useRef, ReactNode } from "react";
import useOnClickOutside from "use-onclickoutside";

type Props = {
  children?: ReactNode;
  open?: boolean;
  close: () => void;
};

/** a popup menu component with a button opening the menu that contains a list of menu items */
export const Popup: FC<Props> = ({ open, close, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => !open && close());

  return (
    <div ref={ref} style={{ visibility: open ? "visible" : "hidden" }}>
      {children}
    </div>
  );
};

export default Popup;
