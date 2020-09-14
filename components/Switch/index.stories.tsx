import React, { FC } from "react";
import { ThemeProvider } from "styled-components";
import Button from "../themes/default/Button";
import { dark } from "../themes/default/colors";
import { useSwitch } from "./useSwitch";

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
