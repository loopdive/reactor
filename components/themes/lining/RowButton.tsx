import styled from "styled-components";

export default styled.button<{ selected: boolean }>`
  border: none;
  outline: none;
  min-height: 20px;
  min-width: 50px;
  color: white;
  padding: 10px 20px;
  background-color: ${(props: { selected: boolean }) =>
    props.selected ? "blue" : "rgb(30, 30, 30)"};
  white-space: nowrap;

  &:hover {
    background-color: blue;
  }
`;
