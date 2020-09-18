import React, { FC } from "react";
import { useSwitch } from "../Switch/useSwitch";

import Hamburger from "./index";
export default { title: "Hamburger" };

export const test: FC = () => {
  const [H] = useSwitch(Hamburger, {
    size: 25,
  });
  return <>{H}</>;
};
