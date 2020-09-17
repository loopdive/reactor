import React, { FC } from "react";

import styled, { css } from "styled-components";
import { animated } from "react-spring";

import { Search } from "@styled-icons/heroicons-solid/Search";
import { Close } from "@styled-icons/evaicons-solid/Close";
import { Theme } from "../themes/default/colors";

type Props = {
  size?: number;
  onChange: (value: string) => void;
  onFocus?: () => void;
  value: string;
  placeholder?: string;
  ariaLabel?: string;
};

const SearchBar: FC<Props> = ({
  size = 28,
  placeholder = "Search",
  value,
  ariaLabel,
  onChange,
  onFocus,
}) => {
  return (
    <Container style={{ fontSize: size }}>
      <SearchIcon />
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            //  @ts-ignore
            e.target.blur();
          }
        }}
        onFocus={() => {
          if (onFocus) onFocus();
        }}
      />

      <DeleteIcon
        style={{
          visibility: value ? "visible" : "hidden",
        }}
        onClick={() => onChange("")}
      />
    </Container>
  );
};

const Container = styled(animated.div)`
  height: 2em;
  display: flex;
  align-items: center;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.searchbar.background};

  border-radius: 1em;
  box-shadow: inset 2px 1px 5px rgba(0, 0, 0, 0.075);
  flex: 1;
`;

const Input = styled(animated.input)`
  background-color: transparent;
  border: 0 solid;
  flex: 1;
  outline: none;
  color: ${(props: { theme: Theme }) => props.theme.searchbar.textColor};
  font-size: 0.8em;
`;

const icons = css`
  color: ${(props: { theme: Theme }) => props.theme.searchbar.iconsColor};

  margin: 0 0.5em;
`;

const SearchIcon = styled(Search)`
  ${icons}
  height: 0.8em;
`;

const DeleteIcon = styled(Close)`
  ${icons}
  height: 1em;
  cursor: pointer;
`;

export default SearchBar;
