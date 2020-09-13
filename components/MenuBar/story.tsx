import React, { FC, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { MenuBar } from ".";
import ToggleButton from "../themes/default/ToggleButton";
import Menu from "../themes/default/Menu";
import RowButton from "../themes/default/RowButton";
import { dark, light } from "../themes/default/colors";

export default {
  title: "MenuBar",
};

const themes = {
  dark: dark,
  light: light,
};

export const example: FC = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeProvider theme={themes[theme]}>
      <ThemeSelector>
        <label htmlFor="themes">Theme</label>
        <select
          id="themes"
          onChange={(event) => setTheme(event.target.value)}
          onBlur={(event) => setTheme(event.target.value)}
          value={theme}
        >
          <option value="dark" selected>
            Dark
          </option>
          <option value="light">Light</option>
        </select>
      </ThemeSelector>
      <MenuBar
        categories={categories}
        MenuButton={ToggleButton}
        Menu={Menu}
        MenuItemButton={RowButton}
      />
    </ThemeProvider>
  );
};

const ThemeSelector = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  margin: 25px;
  color: white;

  label {
    margin: 10px;
  }
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
