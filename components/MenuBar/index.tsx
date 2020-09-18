import React, { FC, ElementType, ReactNode } from "react";
import DropdownMenu, { SwitchButtonType } from "../DropdownMenu";

import { OnClick } from "../types";

type MenuCategory = {
  category: string;
  items: { label: string; onClick: OnClick }[];
};

/** a menu bar with labeled items like in a desktop application */
export const MenuBar: FC<{
  categories: MenuCategory[];
  Bar: ElementType;
  MenuButton: SwitchButtonType;
  Menu: ElementType<{ children: ReactNode }>;
  MenuItemButton: SwitchButtonType;
}> = ({ categories, Bar, MenuButton, Menu, MenuItemButton }) => (
  <Bar>
    {categories.map(({ category, items }, index) => (
      <DropdownMenu
        key={`${category}${index}`}
        Button={({ onClick }: { onClick: OnClick }) => (
          <MenuButton onClick={onClick}>{category}</MenuButton>
        )}
        List={Menu}
        options={items.map(({ label, onClick }) => () => (
          <MenuItemButton activated={false} onClick={onClick}>
            {label}
          </MenuItemButton>
        ))}
      />
    ))}
  </Bar>
);
