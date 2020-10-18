import * as React from "react";
import { FC, useState } from "react";
import { ThemeProvider } from "styled-components";
import { dark, light } from "../colors";
import Switch from "./index";
import { useThemeSelector } from "../../useThemeSelector";

export default {
  title: "Switch",
};

export const WithSwitch: FC = () => {
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
