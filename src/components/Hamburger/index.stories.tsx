import React, { FC, useState } from "react";

import Hamburger from "./index";
export default { title: "Hamburger" };

export const Test: FC = () => {
  const [activated, setActivated] = useState(false);

  return (
    <Hamburger activated={activated} onClick={() => setActivated((a) => !a)} />
  );
};
