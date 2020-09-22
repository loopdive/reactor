import { FC, ElementType, ReactNode } from "react";
import { SwitchButtonType } from "../Switch/useSwitch";
import { OnClick } from "../types";
export type { SwitchButtonType };
declare type Props = {
  Button: SwitchButtonType;
  List: ElementType<{
    children: ReactNode;
  }>;
  options: FC[];
};
/** a dropdown menu component with a button opening the menu that contains a list of menu items */
export declare const DropdownMenu: FC<Props>;
export default DropdownMenu;
/** a component with an onClick event */
export declare type Clickable = ElementType<{
  onClick: OnClick;
}>;
