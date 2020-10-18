import React, {
  ElementType,
  forwardRef,
  ForwardRefRenderFunction,
  ReactNode,
} from "react";
import { OnClick } from "../types";
import { DefaultButton } from "../themes/default/Button";

type Props = {
  Component?: ElementType;
  children: ReactNode;
  onClick?: OnClick;
  activated?: boolean;
};

const Button: ForwardRefRenderFunction<HTMLElement, Props> = (
  { Component = DefaultButton, children, onClick, activated },
  ref
) => {
  return (
    <Component ref={ref} onClick={onClick} activated={activated}>
      {children}
    </Component>
  );
};

export default forwardRef<HTMLElement, Props>(Button);
