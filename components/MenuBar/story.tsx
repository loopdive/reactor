import React, { FC } from "react";
import { MenuBar } from ".";

export default {
  title: "MenuBar",
};

const categories = [
  { category: "File", items: ["New", "Open", "Save", "Close"] },
  { category: "Edit", items: ["Cut", "Copy", "Paste"] },
  { category: "View", items: ["Linewrap"] },
  { category: "Window", items: ["Window 1", "Window 2"] },
  { category: "Help", items: ["Documentation", "About"] },
];

export const withText: FC = () => <MenuBar categories={categories} />;
