import React, { FC, ReactNode } from "react";
import MenuBar from ".";
import { useJsx } from "../../utils/react";

import "./style.module.css";

export default {
  title: "MenuBar",
};

const MenuItemButton: FC<{
  children: ReactNode;
  onClick: () => void;
  activated: boolean;
}> = ({ children, onClick, activated }) => {
  return (
    <button
      className={`row-button ${activated ? "row-button-active" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const Example: FC = () => {
  return (
    <>
      <MenuBar
        categories={categories}
        Bar={useJsx(<div style={{ display: "flex" }} />)}
        MenuButton={useJsx(<button className="toggle-button" />)}
        Menu={useJsx(<div className="menu" />)}
        MenuItemButton={MenuItemButton}
      />
    </>
  );
};

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
