import React, { FC } from "react";

import styled from "styled-components";

import { animated, useSpring } from "react-spring";

type Props = {
  size?: number;
  activated?: boolean;
  onClick?: () => void;
};

const Hamburger: FC<Props> = ({ size = 20, activated, onClick }) => {
  return (
    <Container style={{ fontSize: size }} onClick={onClick}>
      <Line
        style={{
          ...useSpring({
            top: activated ? "50%" : "25%",
            transform: !activated
              ? "translate(-50%, -50%) rotate(0deg)"
              : " translate(-50%, -50%) rotate(135deg)",
          }),
        }}
      />
      <Line
        style={{
          ...useSpring({
            config: { duration: 100 },
            opacity: !activated ? 1 : 0,
          }),
        }}
      />
      <Line
        style={{
          ...useSpring({
            top: activated ? "50%" : "75%",
            transform: !activated
              ? "translate(-50%, -50%) rotate(0deg)"
              : " translate(-50%, -50%) rotate(-135deg)",
          }),
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 2em;
  width: 2em;
  position: relative;
`;

const Line = styled(animated.span)`
  position: absolute;
  width: 75%;
  height: 0.15em;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
`;

export default Hamburger;
