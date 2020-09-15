import React, { FC } from "react";

import { animated, useSpring } from "react-spring";
import styled from "styled-components";

type Props = { size?: number; activated: boolean; setActivated: () => void };

const Switch: FC<Props> = ({ size = 16, activated, setActivated }) => {
  return (
    <Container style={{ fontSize: size }} onClick={setActivated}>
      <Toggle
        style={{
          ...useSpring({
            left: `${activated ? "4%" : "59%"}`,
          }),
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 3.2em;
  width: 6.8em;
  border: 0.19em solid white;
  border-radius: 2.5em;
  position: relative;
`;

const Toggle = styled(animated.div)`
  position: absolute;
  height: 2.5em;
  width: 2.5em;
  border-radius: 50%;
  background-color: white;
  top: 50%;
  transform: translateY(-50%);
`;

export default Switch;
