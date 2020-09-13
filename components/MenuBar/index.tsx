import React, { FC } from "react";
import DropdownMenu from "../DropdownMenu";
import ToggleButton from "../themes/default/ToggleButton";
import Menu from "../themes/default/Menu";
import RowButton from "../themes/default/RowButton";
import { OnClick } from "../types";

type MenuCategory = {
  category: string;
  items: { label: string; onClick: OnClick }[];
};

/** a menu bar with labeled items like in a desktop application */
export const MenuBar: FC<{ categories: MenuCategory[] }> = ({ categories }) => (
  <div style={{ display: "flex" }}>
    {categories.map(({ category, items }, index) => (
      <DropdownMenu
        key={`${category}${index}`}
        Button={({ onClick }: { onClick: OnClick }) => (
          <ToggleButton onClick={onClick}>{category}</ToggleButton>
        )}
        List={Menu}
        options={items.map(({ label, onClick }) => () => (
          <RowButton selected={false} onClick={onClick}>
            {label}
          </RowButton>
        ))}
      />
    ))}
  </div>
);
