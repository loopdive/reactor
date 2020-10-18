import * as React from "react";
import { useState, FC } from "react";

import Accordion from "./index";

export default {
  title: "Accordion",
};

export const WithAccordion: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        width: 300,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button onClick={() => setOpen(!open)} style={{ marginBottom: 10 }}>
        Open
      </button>
      <Accordion open={open}>
        <div style={{ borderRadius: 5, background: "white" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          quibusdam expedita accusantium libero ipsam repudiandae incidunt rem
          recusandae consequatur veniam eaque corrupti in illum placeat beatae,
          illo velit veritatis. In!
        </div>
      </Accordion>
    </div>
  );
};
