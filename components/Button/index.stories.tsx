import React, { FC } from "react";

export default { title: "Button" };

export const withText: FC = () => (
  <button style={{ color: "red" }}>Click Me!</button>
);
