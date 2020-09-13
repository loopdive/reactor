import styled from "styled-components";
import { Theme } from "./colors";

export default styled.button`
  color: ${(props: { theme: Theme }) => props.theme.color.foreground};
  border: none;
  border-bottom: 2px solid transparent;
  padding: 15px 20px;
  outline: none;

  &:hover {
    border-bottom: 2px solid
      ${(props: { theme: Theme }) => props.theme.color.foreground};
  }
`;
