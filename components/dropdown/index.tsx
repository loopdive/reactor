import React, { FC } from "react";

type Props = {
  Toggle: FC;
  Dropdown: FC;
  items: {
    key: string;
    Item: FC;
  }[];
};

export const Dropdown: FC<Props> = ({ Toggle, items, Dropdown }) => {
  return (
    <>
      <Toggle />
      <Dropdown>
        {items.map(({ key, Item }) => (
          <Item key={key} />
        ))}
      </Dropdown>
    </>
  );
};

export default Dropdown;
