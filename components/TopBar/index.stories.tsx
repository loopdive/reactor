import React, { FC } from "react";

import Topbar from "./index";

export default { title: "TopBar" };

export const TopBarTest: FC = () => (
  <Topbar hideOnDownScroll>
    <div
      style={{
        borderBottom: "1px solid rgba(30, 30, 30, 0.1)",
        height: 75,
        backgroundColor: "white",
      }}
    >
      HelloMotto!
    </div>
  </Topbar>
);
