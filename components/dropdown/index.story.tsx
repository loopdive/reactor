/* eslint-disable react/display-name */
import React, { FC, useState, useCallback } from "react";
import Dropdown from "./index";
import ToggleButton from "./ToggleButton";
import RowButton from "./RowButton";
import Menu from "./Menu";

export default {
  title: "Button",
};

export const withText: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean[]>([false, false]);

  // hooks up state with row button component
  const ConnectedRowButton: FC<{
    index: number;
  }> = useCallback(
    ({ index }) => (
      <RowButton
        onClick={() =>
          setSelected((s) => {
            console.log(s);
            const temp = [...s];
            temp[index] = !temp[index];

            return temp;
          })
        }
        selected={selected[index]}
      />
    ),
    [selected, setSelected]
  );

  // hooks up toggle button to trigger menu open state
  const ConnectedToggleButton: FC = useCallback(
    () => <ToggleButton onClick={() => setOpen((value) => !value)} />,
    [open, setOpen]
  );

  // hooks up menu to open state
  const ConnectedMenuBox: FC = useCallback(
    ({ children }) => open && <Menu>{children}</Menu>,
    [open]
  );

  return (
    <Dropdown
      Toggle={ConnectedToggleButton}
      items={[
        {
          key: "1",
          Item: () => <ConnectedRowButton index={0} />,
        },
        {
          key: "2",
          Item: () => <ConnectedRowButton index={1} />,
        },
      ]}
      Menu={ConnectedMenuBox}
    />
  );
};
