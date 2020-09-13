import React, { FC, useRef, ReactType, ReactNode } from "react";
import styled from "styled-components";
import { useSwitch, SwitchButtonType } from "../Switch/useSwitch";
import { OnClick } from "../types";
import useOnClickOutside from "use-onclickoutside";

type Props = {
  Button: SwitchButtonType;
  List: ReactType<{ children: ReactNode }>;
  options: Clickable[];
};

/** a dropdown menu component with a button opening the menu that contains a list of menu items */
export const Dropdown: FC<Props> = ({ Button, List, options }) => {
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
      <DropdownBox open={open} ref={ref}>
        <List>
          {options.map((Option, index) => (
            <Option key={index} onClick={() => alert("click")} />
          ))}
        </List>
      </DropdownBox>
    </BoundingBox>
  );
};

export default Dropdown;

/** a component with an onClick event */
export type Clickable = ReactType<{
  onClick: OnClick;
}>;

const BoundingBox = styled.div`
  position: relative;
`;

const DropdownBox = styled.div`
  visibility: ${(props: { open: boolean }) =>
    props.open ? "visible" : "hidden"};
`;
