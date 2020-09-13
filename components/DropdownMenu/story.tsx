import React, { FC } from "react";
import DropdownMenu from ".";
import { OnClick } from "../types";
import ToggleButton from "../themes/default/ToggleButton";
import Menu from "../themes/default/Menu";
import RowButton from "../themes/default/RowButton";

export default {
  title: "DropdownMenu",
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

export const withText: FC = () => (
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
);
