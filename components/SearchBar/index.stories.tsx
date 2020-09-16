import React, { FC, useState } from "react";
import SearchBar from "./index";

export default { title: "SearchBar" };

export const test: FC = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div style={{ width: 500 }}>
      <SearchBar value={value} onChange={(value: string) => setValue(value)} />
    </div>
  );
};
