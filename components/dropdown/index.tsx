import React, { FC } from "react";

type Props = {
  Toggle: FC;
  Menu: FC;
  items: {
    key: string;
    Item: FC;
  }[];
};

export const Dropdown: FC<Props> = ({ Toggle, items, Menu }) => {
  return (
    <>
      <Toggle />
      <Menu>
        {items.map(({ key, Item }) => (
          <Item key={key} />
        ))}
      </Menu>
    </>
  );
};

export default Dropdown;
