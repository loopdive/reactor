import { FC, ReactNode } from "react";
declare type Props = {
    children?: ReactNode;
    open?: boolean;
    close: () => void;
};
/** a popup menu component with a button opening the menu that contains a list of menu items */
export declare const Popup: FC<Props>;
export default Popup;
