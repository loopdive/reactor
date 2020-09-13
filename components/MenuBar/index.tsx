import React, { FC } from "react";
import styled from "styled-components";
import Dropdown from "../dropdown";
import { ToggleButton, RowButton, Menu } from "../themes/thomas";

export default {
  title: "Button",
};

type OnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

/** an labeled menu bar item with a text and a dropdown */
const MenuBarItem: FC<{ label: string }> = ({ label }) => (
  <Dropdown
    Button={({ onClick }: { onClick: OnClick }) => (
      <ToggleButton onClick={onClick}>{label}</ToggleButton>
    )}
    List={Menu}
    options={[RowButton, RowButton]}
  />
);

/** a menu bar with labeled items like in a desktop application */
export const MenuBar: FC<{ items: string[] }> = ({ items }) => (
  <RowLayout>
    {items.map((item, index) => (
      <MenuBarItem key={`${item}${index}`} label={item} />
    ))}
  </RowLayout>
);

const RowLayout = styled.div`
  display: flex;
`;
