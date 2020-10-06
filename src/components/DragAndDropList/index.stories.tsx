import React, { FC } from "react";

import styled from "styled-components";

import DragAndDropList from "./index";

export default {
  title: "DragAndDropList",
};

export const withDragAndDropList: FC = () => {
  return (
    <Container
      style={{
        background: "white",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "80%" }}>
        <DragAndDropList
          items={[
            { height: 100, text: "Hello" },
            { height: 160, text: "Mr" },
            { height: 80, text: "Smoop" },
            { height: 120, text: "Noop" },
          ]}
          margin={10}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,500;1,500&display=swap");
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
`;
