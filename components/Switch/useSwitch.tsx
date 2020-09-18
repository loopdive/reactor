import React, {
  ComponentProps,
  ElementType,
  ReactNode,
  useMemo,
  useState,
} from "react";
import { OnClick } from "../types";

/** adds an on off switch state to a button */
export function useSwitch(
  Button: SwitchButtonType,
  props?: ComponentProps<typeof Button> & { children?: ReactNode }
): [JSX.Element, boolean, (toggle: boolean) => void] {
  const [activated, setActivated] = useState<boolean>(false);

  const Component = useMemo(
    () => (
      <Button
        activated={activated}
        // @ts-ignore
        onClick={() => setActivated(() => !activated)}
        {...props}
      >
        {props?.children}
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
