import { FC, ElementType, ReactNode } from "react";
import { SwitchButtonType } from "../DropdownMenu";
import { OnClick } from "../types";
declare type MenuCategory = {
    category: string;
    items: {
        label: string;
        onClick: OnClick;
    }[];
};
/** a menu bar with labeled items like in a desktop application */
declare const MenuBar: FC<{
    categories: MenuCategory[];
    Bar: ElementType;
    MenuButton: SwitchButtonType;
    Menu: ElementType<{
        children: ReactNode;
    }>;
    MenuItemButton: SwitchButtonType;
}>;
export default MenuBar;
