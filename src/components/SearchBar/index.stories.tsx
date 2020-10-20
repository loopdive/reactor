import * as React from "react";
import { FC, ReactNode, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import SearchBar from "./index";
import { light, dark, Theme } from "../../themes/default/colors";
import { useThemeSelector } from "../../../utils/hooks/useThemeSelector";
import { SearchIcon, DeleteIcon, Input } from "../../themes/default/SearchBar";

export default {
  title: "SearchBar",
};

const SearchContainer: FC<{
  children: ReactNode;
  onDelete: () => void;
  showDeleteIcon?: boolean;
}> = ({ children, onDelete, showDeleteIcon }) => (
  <Container style={{ fontSize: 12 }}>
    <SearchIcon />
    {children}
    <DeleteIcon
      style={{
        visibility: showDeleteIcon ? "visible" : "hidden",
      }}
      onClick={onDelete}
    />
  </Container>
);

export const Test: FC = () => {
  const [value, setValue] = useState<string>("");

  const [ThemeSelector, theme] = useThemeSelector(light, { dark, light });

  return (
    <>
      <ThemeSelector />
      <ThemeProvider theme={theme}>
        <Container>
          <div style={{ width: 500 }}>
            <SearchBar
              Input={Input}
              Container={SearchContainer}
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
