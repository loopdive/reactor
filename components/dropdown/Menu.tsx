import React, { FC } from "react";

const Menu: FC = ({ children }) => (
  <div
    style={{
      border: "3px solid gold",
      display: "flex",
      flexDirection: "column",
      height: 50,
      justifyContent: "space-between",
    }}
  >
    {children}
  </div>
);

export default Menu;
