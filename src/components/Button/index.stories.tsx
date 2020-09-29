import React, { FC, useState } from "react";

import Button from "./index";

export default {
  title: "Button",
};

export const withText: FC = () => {
  const [activated, setActivated] = useState(false);

  return (
    <Button onClick={() => setActivated((a) => !a)} activated={activated}>
      Click On Me!
    </Button>
  );
};
