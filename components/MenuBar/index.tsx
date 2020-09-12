import React, { FC } from "react";
import styled from "styled-components";
import Dropdown from "../dropdown";
import BlueButton from "./ToggleButton";
import RedButton from "./RowButton";
import List from "./Menu";

export default {
  title: "Button",
};

const MenuItemButton = ({ label }: { label: string }) => (
  <Dropdown
    Button={({
      onClick,
    }: {
      onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    }) => <BlueButton onClick={onClick}>{label}</BlueButton>}
    List={List}
    options={[RedButton, RedButton]}
  />
);

export const MenuBar: FC<{ items: string[] }> = ({ items }) => (
  <Row>
    {items.map((item, index) => (
      <MenuItemButton key={`${item}${index}`} label={item} />
    ))}
  </Row>
);

const Row = styled.div`
  display: flex;
`;
