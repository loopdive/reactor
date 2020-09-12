import React, { ReactType, useState, FC, useCallback } from "react";

export function useListSelection(
  ListItem: ReactType<{
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }>
) {
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
