import React, { FC, useState } from "react";

import Sidebar from "./index";

export default { title: "SideBar" };

export const test: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sidebar open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            height: "100vh",
            width: 100
          }}
        >
          Hello Motto
        </div>
      </Sidebar>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ position: "fixed", top: "50%", left: "50%" }}
      >
        toggle
      </button>
    </>
  );
};
