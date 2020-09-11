import React, { FC, ReactNode } from "react";

type Props = { children?: ReactNode; onClick: () => void; selected: boolean };

export const ToggleButton: FC<Props> = ({ children, onClick, selected }) => {
  return (
    <button
      style={{
        backgroundColor: !selected ? "red" : "green",
        border: "none",
        outline: "none",
        height: 20,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ToggleButton;
