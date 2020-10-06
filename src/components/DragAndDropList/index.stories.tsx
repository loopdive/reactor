import React, { FC } from "react";

import DragAndDropList from "./index";

export default {
  title: "DragAndDropList",
};

export const withDragAndDropList: FC = () => {
  return (
    <DragAndDropList
      items={[
        { height: 100, text: "Hello" },
        { height: 160, text: "Mr" },
        { height: 80, text: "Smoop" },
      ]}
    />
  );
};
