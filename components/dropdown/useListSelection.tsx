import React, { ReactType, useState, FC, useCallback } from "react";
import { OnClick } from "../types";

export function useListSelection(
  ListItem: ReactType<{ onClick: OnClick }>
): [
  FC<{
    id: string;
  }>
] {
  const [selected, setSelected] = useState<{ [buttonId: string]: boolean }>({});

  // hooks up state with menu item click
  const Button: FC<{
    id: string;
  }> = useCallback(
    ({ id }) => (
      <ListItem
        onClick={() =>
          setSelected((s) => {
            console.log(s);
            const temp = { ...s };
            temp[id] = !temp[id];

            return temp;
          })
        }
        selected={selected[id]}
      />
    ),
    [selected, setSelected]
  );

  return [Button];
}
