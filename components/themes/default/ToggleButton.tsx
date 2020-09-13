import styled from "styled-components";
import { Theme } from "./colors";

export default styled.button`
  color: white;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.color.background};
  padding: 10px 20px;
  border: none;
  outline: none;

  &:hover {
    color: yellow;
    background-color: ${(props: { theme: Theme }) =>
      props.theme.color.highlight};
  }
`;
