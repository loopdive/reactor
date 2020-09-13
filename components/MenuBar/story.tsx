import React, { FC } from "react";
import { ThemeProvider } from "styled-components";
import { MenuBar } from ".";
import ToggleButton from "../themes/default/ToggleButton";
import Menu from "../themes/default/Menu";
import RowButton from "../themes/default/RowButton";
import { dark, light } from "../themes/default/colors";

export default {
  title: "MenuBar",
};

export const darkTheme: FC = () => (
  <ThemeProvider theme={dark}>
    <MenuBar
      categories={categories}
      MenuButton={ToggleButton}
      Menu={Menu}
      MenuItemButton={RowButton}
    />
  </ThemeProvider>
);

export const lightTheme: FC = () => (
  <ThemeProvider theme={light}>
    <MenuBar
      categories={categories}
      MenuButton={ToggleButton}
      Menu={Menu}
      MenuItemButton={RowButton}
    />
  </ThemeProvider>
);

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
