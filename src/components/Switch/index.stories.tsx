import * as React from "react";
import { FC, useState } from "react";

import { ThemeProvider } from "styled-components";
import { dark, light } from "../themes/default/colors";

import Switch from "./index";
import { useThemeSelector } from "../themes/useThemeSelector";
export default {
  title: "Switch",
};

export const withSwitch: FC = () => {
  const [ThemeSelector, theme] = useThemeSelector(light, { dark, light });

  const [selected, setSelected] = useState(false);

  return (
    <>
      <ThemeSelector />
      <ThemeProvider theme={theme}>
        <Switch activated={selected} onClick={() => setSelected((s) => !s)} />
      </ThemeProvider>
    </>
  );
};
