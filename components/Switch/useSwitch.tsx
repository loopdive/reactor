import React, { ElementType, ReactNode, useMemo, useState } from "react";
import { OnClick } from "../types";

/** adds an on off switch state to a button */
export function useSwitch<Props>(
  Button: SwitchButtonType,
  props?: Props & { children?: ReactNode }
): [JSX.Element, boolean, (toggle: boolean) => void] {
  const [activated, setActivated] = useState<boolean>(false);

  const Component = useMemo(
    () => (
      <Button
        activated={activated}
        onClick={() => setActivated(() => !activated)}
        {...props}
      >
        {props.children}
      </Button>
    ),
    [activated, setActivated, props]
  );

  return [Component, activated, setActivated];
}

export type SwitchButtonType = ElementType<{
  activated?: boolean;
  children?: ReactNode;
  onClick: OnClick;
}>;
