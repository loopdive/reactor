import React, { ReactType, ReactNode, useState, useMemo } from "react";
import { OnClick } from "../types";

/** adds an on off switch state to a button */
export function useSwitch(
  Button: SwitchButtonType
): [ReactType, boolean, (toggle: boolean) => void] {
  const [activated, setActivated] = useState<boolean>(false);
  return [
    useMemo(
      () => (props: { children: ReactNode }) => (
        <Button
          activated={activated}
          onClick={() => setActivated(() => !activated)}
          {...props}
        >
          {props.children}
        </Button>
      ),
      [activated, setActivated]
    ),
    activated,
    setActivated,
  ];
}

export type SwitchButtonType = ReactType<{
  activated?: boolean;
  children?: ReactNode;
  onClick: OnClick;
}>;
