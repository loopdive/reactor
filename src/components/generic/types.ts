import { CSSProperties, EventHandler, MouseEvent } from "react";
import { SpringConfig } from "react-spring";

export type OnClick = EventHandler<MouseEvent<HTMLElement>>;

export type AnimatedProps = { config?: SpringConfig } & CSSProperties;
