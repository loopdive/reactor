import { ComponentProps, ElementType, ReactNode } from "react";
import { OnClick } from "../types";
/** adds an on off switch state to a button */
export declare function useSwitch(Button: SwitchButtonType, props?: ComponentProps<typeof Button> & {
    children?: ReactNode;
}): [JSX.Element, boolean, (toggle: boolean) => void];
export declare type SwitchButtonType = ElementType<{
    activated?: boolean;
    children?: ReactNode;
    onClick: OnClick;
}>;
