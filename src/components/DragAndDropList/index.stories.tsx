import React, { FC } from "react";

import DragAndDropList from "./index";

export default {
  title: "DragAndDropList",
};

export const withDragAndDropList: FC = () => {
  return (
    <div
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
          ]}
          margin={10}
        />
      </div>
    </div>
  );
};
