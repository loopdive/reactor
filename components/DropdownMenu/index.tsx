import React, { FC, useRef, ReactType, ReactNode } from "react";
import styled from "styled-components";
import { useSwitch } from "../Switch/useSwitch";
import { OnClick } from "../types";
import useOnClickOutside from "use-onclickoutside";

type Props = {
  Button: Clickable;
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
    <PositionRelative
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
    </PositionRelative>
  );
};

export default Dropdown;

/** a component with an onClick event */
type Clickable = ReactType<{
  onClick: OnClick;
}>;

const PositionRelative = styled.div`
  position: relative;
`;

const DropdownBox = styled.div`
  visibility: ${(props: { open: boolean }) =>
    props.open ? "visible" : "hidden"};
`;
