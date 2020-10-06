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
        { height: 100, text: "Mr" },
        { height: 100, text: "Smoop" },
      ]}
    />
  );
};
