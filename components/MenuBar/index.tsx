import React, { FC } from "react";
import styled from "styled-components";
import DropdownMenu from "../DropdownMenu";
import ToggleButton from "../themes/default/ToggleButton";
import Menu from "../themes/default/Menu";
import RowButton from "../themes/default/RowButton";
import { OnClick } from "../types";

type MenuCategory = {
  category: string;
  items: string[];
};

/** a menu bar with labeled items like in a desktop application */
export const MenuBar: FC<{ categories: MenuCategory[] }> = ({ categories }) => (
  <RowLayout>
    {categories.map(({ category, items }, index) => (
      <DropdownMenu
        key={`${category}${index}`}
        Button={({ onClick }: { onClick: OnClick }) => (
          <ToggleButton onClick={onClick}>{category}</ToggleButton>
        )}
        List={Menu}
        options={items.map((item) => ({ onClick }: { onClick: OnClick }) => (
          <RowButton selected={false} onClick={onClick}>
            {item}
          </RowButton>
        ))}
      />
    ))}
  </RowLayout>
);

const RowLayout = styled.div`
  display: flex;
`;
