import React, { FC } from "react";
import styled from "styled-components";
import DropdownMenu from "../DropdownMenu";
import { ToggleButton, RowButton, Menu } from "../themes/default";
import { OnClick } from "../types";

/** a menu bar with labeled items like in a desktop application */
export const MenuBar: FC<{ items: string[] }> = ({ items }) => (
  <RowLayout>
    {items.map((item, index) => (
      <DropdownMenu
        key={`${item}${index}`}
        Button={({ onClick }: { onClick: OnClick }) => (
          <ToggleButton onClick={onClick}>{item}</ToggleButton>
        )}
        List={Menu}
        options={[RowButton, RowButton]}
      />
    ))}
  </RowLayout>
);

const RowLayout = styled.div`
  display: flex;
`;
