import React, { FC, ReactNode, CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  onChange: () => void;
  style?: CSSProperties;
};

export const Component: FC<Props> = ({ children, onChange, style }) => {
  return (
    <Button onChange={onChange} style={style}>
      {children}
    </Button>
  );
};

const Button = styled.span`
  display: inline-block;
  padding: 15px 25px;
  border-radius: 25px;
  background-color: #429cd6;
  color: white;
  cursor: pointer;

  box-shadow: 0px 10px 20px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s, transform 0.5s;
  will-change: transform;

  &:hover {
    box-shadow: 0px 15px 30px -10px rgba(0, 0, 0, 0.3);
    transform: translateY(-3px);
  }
`;

export default Component;
