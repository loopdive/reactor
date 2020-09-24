import { FC, ReactNode } from "react";
import { AnimatedProps } from "../types";
declare type Props = {
    orientation?: "left" | "right";
    open: boolean;
    onClose?: () => void;
    children: ReactNode;
    closeOnOutsideClick?: boolean;
    disableBodyScroll?: boolean;
    animate?: boolean;
    animatedProps?: AnimatedProps;
};
declare const SideBar: FC<Props>;
export default SideBar;
