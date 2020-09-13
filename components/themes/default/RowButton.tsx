import styled from "styled-components";
import { Theme } from "./colors";

export default styled.button<{ selected: boolean }>`
  border: none;
  outline: none;
  min-height: 20px;
  min-width: 50px;
  color: ${(props: { theme: Theme }) => props.theme.color.foreground};
  padding: 10px 20px;
  background-color: ${(props: { selected: boolean; theme: Theme }) =>
    props.selected
      ? props.theme.color.highlight
      : props.theme.color.background};
  white-space: nowrap;

  &:hover {
    background-color: ${(props: { theme: Theme }) =>
      props.theme.color.highlight};
  }
`;
