import * as React from "react";
import { FC } from "react";
import styled, { ThemeProvider } from "styled-components";
import MenuBar from ".";
import ToggleButton from "../../themes/default/ToggleButton";
import Menu from "../../themes/default/Menu";
import RowButton from "../../themes/default/RowButton";
import { useThemeSelector } from "../../../utils/hooks/useThemeSelector";
import { dark, light } from "../../themes/default/colors";

export default {
  title: "MenuBar",
};

export const Example: FC = () => {
  const [ThemeSelector, theme] = useThemeSelector(dark, { dark, light });
  return (
    <>
      <ThemeSelector />
      <ThemeProvider theme={theme}>
        <MenuBar
          categories={categories}
          Bar={Bar}
          MenuButton={ToggleButton}
          Menu={Menu}
          MenuItemButton={RowButton}
        />
      </ThemeProvider>
    </>
  );
};

const Bar = styled.div`
  display: flex;
`;

const categories = [
  {
    category: "File",
    items: [
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
    ],
  },
  {
    category: "Edit",
    items: [
      {
        label: "Cut",
        onClick: () => {
          alert("Cut");
        },
      },
      {
        label: "Copy",
        onClick: () => {
          alert("Copy");
        },
      },
      {
        label: "Paste",
        onClick: () => {
          alert("Paste");
        },
      },
    ],
  },
  {
    category: "View",
    items: [
      {
        label: "Wrap",
        onClick: () => {
          alert("Wrap");
        },
      },
    ],
  },
  {
    category: "Window",
    items: [
      {
        label: "Window 1",
        onClick: () => {
          alert("Window 1");
        },
      },
      {
        label: "Window 2",
        onClick: () => {
          alert("Window 2");
        },
      },
      {
        label: "Window 3",
        onClick: () => {
          alert("Window 3");
        },
      },
    ],
  },
  {
    category: "Help",
    items: [
      {
        label: "Documentation",
        onClick: () => {
          alert("Documentation");
        },
      },
      {
        label: "About",
        onClick: () => {
          alert("About");
        },
      },
    ],
  },
];
