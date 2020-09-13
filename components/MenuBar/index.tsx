import React, { FC } from "react";
import styled from "styled-components";
import Dropdown from "../dropdown";
import BlueButton from "./ToggleButton";
import RedButton from "./RowButton";
import List from "./Menu";

export default {
  title: "Button",
};

type OnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

/** an labeled menu bar item with a text and a dropdown */
const MenuBarItem: FC<{ label: string }> = ({ label }) => (
  <Dropdown
    Button={({ onClick }: { onClick: OnClick }) => (
      <BlueButton onClick={onClick}>{label}</BlueButton>
    )}
    List={List}
    options={[RedButton, RedButton]}
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
