import { ElementType, ReactNode } from "react";
import { OnClick } from "../types";
type Props = {
  Component?: ElementType;
  children: ReactNode;
  onClick?: OnClick;
  activated?: boolean;
};

export type ButtonType = ElementType<Props>;

/* const Button: ForwardRefRenderFunction<HTMLElement, Props> = (
  { Component, children, onClick, activated },
  ref
) => {
  return (
    <Component ref={ref} onClick={onClick} activated={activated}>
      {children}
    </Component>
  );
};

export default forwardRef<HTMLElement, Props>(Button); */
