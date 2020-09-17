import React, { FC, useState } from "react";

import Hamburger from "./index";
export default { title: "Hamburger" };

export const test: FC = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <Hamburger activated={toggle} onClick={() => setToggle(!toggle)} />
    </>
  );
};
