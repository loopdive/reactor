import React, { FC, useState } from "react";

import "./style.module.css";

export default {
  title: "Button",
};

export const WithText: FC = () => {
  const [activated, setActivated] = useState(false);

  return (
    <>
      <button
        className={`button ${activated ? "button-active" : ""}`}
        onClick={() => setActivated((a) => !a)}
      >
        Click On Me!
      </button>
    </>
  );
};
