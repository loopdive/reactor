import styled from "styled-components";

const RowButton = styled.button<{ selected: boolean }>`
  background-color: ${(props: { selected: boolean }) =>
    props.selected ? "red" : "green"};
  border: none;
  outline: none;
  height: 20px;
`;

export default RowButton;
