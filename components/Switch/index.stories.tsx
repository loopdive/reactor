import React, { FC, useState } from "react";

import { ThemeProvider } from "styled-components";
import Button from "../themes/default/Button";
import { dark } from "../themes/default/colors";
import { useSwitch } from "./useSwitch";

import Switch from "./index";

export default {
  title: "Switch",
};

export const withText: FC = () => {
  const [Switch, activated] = useSwitch(Button);
  console.log(activated);

  return (
    <ThemeProvider theme={dark}>
      <Switch>Click On Me!</Switch>
    </ThemeProvider>
  );
};

export const withSwitch: FC = () => {
  const [activated, setActivated] = useState(false);

  return (
    <Switch
      activated={activated}
      setActivated={() => setActivated((a) => !a)}
    />
  );
};
