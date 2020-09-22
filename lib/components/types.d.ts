import { CSSProperties, EventHandler, MouseEvent } from "react";
import { SpringConfig } from "react-spring";
export declare type OnClick = EventHandler<MouseEvent<HTMLElement>>;
export declare type AnimatedProps = {
    config?: SpringConfig;
} & CSSProperties;
