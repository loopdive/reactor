import React, { FC, useState } from "react";

import { ThemeProvider } from "styled-components";
import Button from "../themes/default/Button";
import { dark, light } from "../themes/default/colors";
import { useSwitch } from "./useSwitch";

import Switch from "./index";
import { useThemeSelector } from "../themes/useThemeSelector";

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
  const [ThemeSelector, theme] = useThemeSelector(light, { dark, light });
  const [S] = useSwitch(Switch);
  const [activated, setActivated] = useState(false);

  return (
    <>
      <ThemeSelector />
      <ThemeProvider theme={theme}>
        <S size={30} style={{ marginBottom: 10 }} />
        <Switch
          size={30}
          activated={activated}
          onClick={() => setActivated(!activated)}
        />
      </ThemeProvider>
    </>
  );
};
