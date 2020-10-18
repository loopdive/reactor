import * as React from "react";
import { CSSProperties, FC } from "react";

import { animated, useSpring } from "react-spring";
import styled, {
  FlattenSimpleInterpolation,
  withTheme,
} from "styled-components";
import { Theme } from "../colors";
import { AnimatedProps } from "../../../generic/types";

type Props = {
  size?: number;
  activated?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  style?: CSSProperties;
  styles?: FlattenSimpleInterpolation;
  animatedProps?: AnimatedProps;
  theme?: Theme;
};

const Switch: FC<Props> = ({
  size = 16,
  activated,
  onClick,
  style,
  styles,
  animatedProps,
  theme,
}) => (
  <Container
    onClick={onClick}
    styles={styles}
    style={{
      fontSize: theme?.switch?.size || size,
      ...style,
      ...useSpring({
        backgroundColor: activated
          ? theme?.switch?.selected || "green"
          : theme?.switch?.unselected || "red",
        ...animatedProps,
      }),
    }}
  >
    <Toggle
      style={{
        ...useSpring({
          left: `${activated ? "4%" : "59%"}`,
        }),
      }}
    />
  </Container>
);

const Container = styled(animated.div)<{ styles?: FlattenSimpleInterpolation }>`
  height: 3.2em;
  width: 6.8em;
  border: 0.19em solid ${(props: { theme: Theme }) => props.theme.switch.border};
  border-radius: 2.5em;
  position: relative;
  cursor: pointer;
  ${(props) => props.styles}
`;

const Toggle = styled(animated.div)`
  position: absolute;
  height: 2.5em;
  width: 2.5em;
  border-radius: 50%;
  background-color: ${(props: { theme: Theme }) => props.theme.switch.selector};
  top: 50%;
  transform: translateY(-50%);
`;

export default withTheme(Switch);
