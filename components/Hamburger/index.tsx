import React, { FC } from "react";

import styled from "styled-components";

import { animated, useSpring } from "react-spring";

type Props = {
  activated?: boolean;
  onClick?: () => void;
};

const Hamburger: FC<Props> = ({ activated, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Line
        style={{
          ...useSpring({
            top: activated ? "50%" : "20%",
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
            top: activated ? "50%" : "80%",
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
  height: 50px;
  width: 50px;
  position: relative;
`;

const Line = styled(animated.span)`
  position: absolute;
  width: 80%;
  height: 4px;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg);
  border-radius: 3px;
`;

export default Hamburger;
