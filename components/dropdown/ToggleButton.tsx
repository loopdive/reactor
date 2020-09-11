import React, { FC, ReactNode } from "react";

type Props = { children?: ReactNode; onClick: () => void };

export const ToggleButton: FC<Props> = ({ children, onClick }) => {
  return (
    <button
      style={{ backgroundColor: "blue", border: "none" }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ToggleButton;
