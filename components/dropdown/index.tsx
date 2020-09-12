import React, { FC, ReactType, ReactNode } from "react";
import styled from "styled-components";
import { useSwitch } from "./useSwitch";

type Props = {
  Button: ReactType<{
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }>;
  List: ReactType<{ children: ReactNode }>;
  options: ReactType<{
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }>[];
};
export const Dropdown: FC<Props> = ({ Button, List, options }) => {
  // hooks up click on toggle button to trigger dropdown open state
  const [MenuButton, open] = useSwitch(Button);
  return (
    <Layout>
      <MenuButton />
      {open && (
        <List>
          {options.map((Option, index) => (
            <Option key={index} onClick={() => alert("click")} />
          ))}
        </List>
      )}
    </Layout>
  );
};

export default Dropdown;

const Layout = styled.div`
  position: relative;
`;
