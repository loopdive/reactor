import React, { FC, ReactNode, useState } from "react";
import SearchBar from "./index";
import { BsSearch as SearchIcon } from "react-icons/bs";
import { CgClose as DeleteIcon } from "react-icons/cg";

import "./style.module.css";
import { useJsx } from "../../utils/react";

export default {
  title: "SearchBar",
};

const SearchContainer: FC<{
  children: ReactNode;
  onDelete: () => void;
  showDeleteIcon?: boolean;
}> = ({ children, onDelete, showDeleteIcon }) => (
  <div className="search-container" style={{ fontSize: 16 }}>
    <SearchIcon
      color="rgba(0, 0, 0, 0.4"
      style={{ marginRight: 10 }}
      size={18}
    />
    {children}
    <DeleteIcon
      color="rgba(0, 0, 0, 0.4"
      style={{
        marginLeft: 10,
        visibility: showDeleteIcon ? "visible" : "hidden",
      }}
      onClick={onDelete}
      size={14}
    />
  </div>
);

export const Test: FC = () => {
  const [value, setValue] = useState<string>("");

  return (
    <>
      <div className="container">
        <div style={{ width: 500 }}>
          <SearchBar
            Input={useJsx(<input className="input" />)}
            Container={SearchContainer}
            value={value}
            onChange={(value: string) => setValue(value)}
          />
        </div>
      </div>
    </>
  );
};
