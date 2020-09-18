import React, { ElementType, useState, FC, useMemo } from "react";
import styled from "styled-components";
import { Theme } from "./default/colors";

export const useThemeSelector = (
  initialTheme: Theme,
  themes: {
    [name: string]: Theme;
  }
): [ElementType, Theme, (theme: Theme) => void] => {
  const [theme, setTheme] = useState(initialTheme);
  const Component: FC = useMemo(
    () => () => (
      <ThemeSelector>
        <label htmlFor="themes">Theme</label>
        <select
          id="themes"
          onChange={(event) => setTheme(themes[event?.target?.value])}
          onBlur={(event) => setTheme(themes[event?.target?.value])}
          value={theme.name}
        >
          {Object.keys(themes).map((key) => (
            <option key={themes[key].name} value={themes[key].name}>
              {themes[key].name}
            </option>
          ))}
        </select>
      </ThemeSelector>
    ),
    [theme, setTheme]
  );

  return [Component, theme, setTheme];
};

const ThemeSelector = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin-bottom: 25px;
  color: lightgray;

  label {
    margin: 10px;
  }

  select {
    font-size: 14px;
    color: white;
    background-color: transparent;
    border: none;
    outline: none;
  }
`;
