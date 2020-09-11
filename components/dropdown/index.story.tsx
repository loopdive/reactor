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
  const Row: FC<{
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

  // hooks up state with toggle button component
  const Toggle: FC = useCallback(
    () => <ToggleButton onClick={() => setOpen((value) => !value)} />,
    [open, setOpen]
  );

  const MenuWithLogic: FC = useCallback(
    ({ children }) => open && <Menu>{children}</Menu>,
    [open]
  );

  return (
    <Dropdown
      Toggle={Toggle}
      items={[
        {
          key: "1",
          Item: () => <Row index={0} />,
        },
        {
          key: "2",
          Item: () => <Row index={1} />,
        },
      ]}
      Menu={MenuWithLogic}
    />
  );
};
