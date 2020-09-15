import React, { CSSProperties } from "react";
import { SpringConfig } from "react-spring";

export type OnClick = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

export type AnimatedProps = { config?: SpringConfig } & CSSProperties;
