import React, { FC } from "react";

import Button from "../themes/default/Button";
import { useSwitch } from "./useSwitch";

export default {
  title: "Switch",
};

export const withText: FC = () => {
  const [Switch, activated] = useSwitch(Button);
  console.log(activated);
  return <Switch>Click On Me!</Switch>;
};
