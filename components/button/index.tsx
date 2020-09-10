import React, { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
  onChange: () => void;
};

export const Component: FC<Props> = ({ children, onChange }) => {
  return <Button onChange={onChange}>{children}</Button>;
};

const Button = styled.span`
  padding: 15px 25px;
  border-radius: 25px;
  background-color: #429cd6;
`;

export default Component;
