import React, { FC, ReactType, ReactNode } from "react";
import styled from "styled-components";
import { useSwitch } from "../Switch/useSwitch";
import { OnClick } from "../types";

type Props = {
  Button: Clickable;
  List: ReactType<{ children: ReactNode }>;
  options: Clickable[];
};

/** a dropdown menu component with a button opening the menu that contains a list of menu items */
export const Dropdown: FC<Props> = ({ Button, List, options }) => {
  // hooks up click on toggle button to trigger dropdown open state
  const [MenuButton, open] = useSwitch(Button);

  return (
    <RelativePosition>
      <MenuButton />
      {open && (
        <List>
          {options.map((Option, index) => (
            <Option key={index} onClick={() => alert("click")} />
          ))}
        </List>
      )}
    </RelativePosition>
  );
};

export default Dropdown;

/** a component with an onClick event */
type Clickable = ReactType<{
  onClick: OnClick;
}>;

const RelativePosition = styled.div`
  position: relative;
`;
