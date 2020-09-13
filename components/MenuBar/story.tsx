import React, { FC } from "react";
import { MenuBar } from ".";

export default {
  title: "MenuBar",
};

const items = ["File", "Edit", "View", "Windows"];

export const withText: FC = () => <MenuBar items={items} />;
