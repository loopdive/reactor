import * as React from "react";
import { FC } from "react";
import DropdownMenu from ".";
import { OnClick } from "../types";

import "./style.module.css";
import { jsx } from "../../utils";

export default {
  title: "DropdownMenu",
};

export const WithText: FC = () => {
  return (
    <>
      <DropdownMenu
        Button={({ onClick }: { onClick: OnClick }) => (
          <button className="toggle-button" onClick={onClick}>
            {category}
          </button>
        )}
        List={jsx(<div className="menu" />)}
        options={items.map(({ label, onClick }) => () => (
          <button className="row-button" onClick={onClick}>
            {label}
          </button>
        ))}
      />
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
