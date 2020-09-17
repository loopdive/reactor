import React, { FC, useState } from "react";
import SearchBar from "./index";

import styled, { ThemeProvider } from "styled-components";
import { light, dark, Theme } from "../themes/default/colors";
import { useThemeSelector } from "../themes/useThemeSelector";

export default {
  title: "SearchBar",
};

export const test: FC = () => {
  const [value, setValue] = useState<string>("");

  const [ThemeSelector, theme] = useThemeSelector(light, { dark, light });

  return (
    <>
      <ThemeSelector />
      <ThemeProvider theme={theme}>
        <Container>
          <div style={{ width: 500 }}>
            <SearchBar
              value={value}
              onChange={(value: string) => setValue(value)}
            />
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.color.background};

  padding: 2em 2em;
`;
