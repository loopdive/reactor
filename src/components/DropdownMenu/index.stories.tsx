import * as React from "react";
import { FC } from "react";
import { ThemeProvider } from "styled-components";
import DropdownMenu from ".";
import { OnClick } from "../types";
import { useThemeSelector } from "../../utils/hooks/useThemeSelector";

export default {
  title: "DropdownMenu",
};

export const WithText: FC = () => {
  const [ThemeSelector, theme] = useThemeSelector(dark, { dark, light });

  return (
    <>
      <ThemeSelector />
      <ThemeProvider theme={theme}>
        <DropdownMenu
          Button={({ onClick }: { onClick: OnClick }) => (
            <ToggleButton onClick={onClick}>{category}</ToggleButton>
          )}
          List={Menu}
          options={items.map(({ label, onClick }) => () => (
            <RowButton selected={false} onClick={onClick}>
              {label}
            </RowButton>
          ))}
        />
      </ThemeProvider>
    </>
  );
};

const category = "File";
const items = [
  {
    label: "New",
    onClick: () => {
      alert("New");
    },
  },
  {
    label: "Open",
    onClick: () => {
      alert("Open");
    },
  },
  {
    label: "Save",
    onClick: () => {
      alert("Save");
    },
  },
  {
    label: "Close",
    onClick: () => {
      alert("Close");
    },
  },
];
