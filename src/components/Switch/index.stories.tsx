import * as React from "react";
import { FC } from "react";

import { ThemeProvider } from "styled-components";
import Button from "../themes/default/Button";
import { dark, light } from "../themes/default/colors";
import { useSwitch } from "./useSwitch";

import Switch from "./index";
import { useThemeSelector } from "../themes/useThemeSelector";
export default {
  title: "Switch",
};

export const withButton: FC = () => {
  const [B] = useSwitch(Button, { children: <>Click On Me!</> });

  return <>{B}</>;
};

export const withSwitch: FC = () => {
  const [ThemeSelector, theme] = useThemeSelector(light, { dark, light });

  const [S] = useSwitch(Switch, {
    style: { marginBottom: 10 },
    size: 30,
  });

  return (
    <>
      <ThemeSelector />
      <ThemeProvider theme={theme}>{S}</ThemeProvider>
    </>
  );
};
