import styled from "styled-components";

export default styled.button`
  background-color: ${(props: { selected: boolean }) =>
    props.selected ? "red" : "green"};
  border: none;
  outline: none;
  height: 20px;
`;
