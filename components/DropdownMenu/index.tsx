import React, { FC, useRef, ReactType, ReactNode } from "react";
import styled from "styled-components";
import { useSwitch, SwitchButtonType } from "../Switch/useSwitch";
import { OnClick } from "../types";
import useOnClickOutside from "use-onclickoutside";

type Props = {
  Button: SwitchButtonType;
  List: ReactType<{ children: ReactNode }>;
  options: FC[];
};

/** a dropdown menu component with a button opening the menu that contains a list of menu items */
export const DropdownMenu: FC<Props> = ({ Button, List, options }) => {
  // hooks up click on toggle button to trigger dropdown open state
  const [MenuButton, open, setOpen] = useSwitch(Button);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <BoundingBox
      onMouseEnter={() => {
        setOpen(true);
      }}
      onMouseLeave={() => setOpen(false)}
    >
      <MenuButton />
      <Menu open={open} ref={ref}>
        <List>
          {options.map((Option, index) => (
            <Option key={index} />
          ))}
        </List>
      </Menu>
    </BoundingBox>
  );
};

export default DropdownMenu;

/** a component with an onClick event */
export type Clickable = ReactType<{
  onClick: OnClick;
}>;

const BoundingBox = styled.div`
  position: relative;
`;

const Menu = styled.div`
  visibility: ${(props: { open: boolean }) =>
    props.open ? "visible" : "hidden"};
`;
