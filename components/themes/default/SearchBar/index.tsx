import styled, { css } from "styled-components";
import { animated } from "react-spring";
import { Search } from "@styled-icons/heroicons-solid/Search";
import { Close } from "@styled-icons/evaicons-solid/Close";
import { Theme } from "../colors";

export const Container = styled(animated.div)`
  height: 2em;
  display: flex;
  align-items: center;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.searchbar.background};

  border-radius: 1em;
  box-shadow: inset 2px 1px 5px rgba(0, 0, 0, 0.075);
  flex: 1;
`;

export const Input = styled(animated.input)`
  background-color: transparent;
  border: 0 solid;
  flex: 1;
  outline: none;
  color: ${(props: { theme: Theme }) => props.theme.searchbar.textColor};
  font-size: 0.8em;
`;

export const icons = css`
  color: ${(props: { theme: Theme }) => props.theme.searchbar.iconsColor};

  margin: 0 0.5em;
`;

export const SearchIcon = styled(Search)`
  ${icons}
  height: 0.8em;
`;

export const DeleteIcon = styled(Close)`
  ${icons}
  height: 1em;
  cursor: pointer;
`;
