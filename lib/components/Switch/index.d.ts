import React, { CSSProperties } from "react";
import { FlattenSimpleInterpolation } from "styled-components";
import { Theme } from "../themes/default/colors";
import { AnimatedProps } from "../types";
declare type Props = {
    size?: number;
    activated?: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    style?: CSSProperties;
    styles?: FlattenSimpleInterpolation;
    animatedProps?: AnimatedProps;
    theme?: Theme;
};
declare const _default: React.ForwardRefExoticComponent<Pick<React.PropsWithChildren<Props>, "style" | "children" | "onClick" | "size" | "activated" | "animatedProps" | "styles"> & {
    theme?: any;
}>;
export default _default;
