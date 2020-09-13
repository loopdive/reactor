import React, { FC } from "react";
import { MenuBar } from ".";

export default {
  title: "MenuBar",
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

export const withText: FC = () => <MenuBar categories={categories} />;
