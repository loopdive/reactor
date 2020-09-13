import React, { ReactType, useState, FC, useMemo } from "react";
import styled from "styled-components";

export const useThemeSelector = (
  themes: string[]
): [ReactType, string, (theme: string) => void] => {
  const [theme, setTheme] = useState(themes[0]);
  const Component: FC = useMemo(
    () => () => (
      <ThemeSelector>
        <label htmlFor="themes">Theme</label>
        <select
          id="themes"
          onChange={(event) => setTheme(event.target.value)}
          onBlur={(event) => setTheme(event.target.value)}
          value={theme}
        >
          {themes.map((theme, index) => (
            <option
              key={theme}
              value={theme}
              selected={index === 0 ? true : false}
            >
              {theme}
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
