import React, { ReactType, useState, useMemo } from "react";
import { OnClick } from "../types";

/** adds an on off switch state to a button */
export function useSwitch(
  Button: ReactType<{
    onClick: OnClick;
  }>
): [ReactType, boolean, (toggle: boolean) => void] {
  const [toggle, setToggle] = useState<boolean>(false);
  return [
    // eslint-disable-next-line react/display-name
    useMemo(() => () => <Button onClick={() => setToggle(() => !toggle)} />, [
      toggle,
      setToggle,
    ]),
    toggle,
    setToggle,
  ];
}
