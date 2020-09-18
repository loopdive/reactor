import React, { FC } from "react";
import { useSwitch } from "../Switch/useSwitch";

import Hamburger, { HamburgerProps } from "./index";
export default { title: "Hamburger" };

export const test: FC = () => {
  const [H] = useSwitch<HamburgerProps>(Hamburger, { size: 25 });
  return <>{H}</>;
};
