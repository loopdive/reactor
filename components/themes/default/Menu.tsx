import styled from "styled-components";
import { Theme } from "./colors";

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  position: absolute;
  background-color: ${(props: { theme: Theme }) =>
    props.theme.color.background};
  min-width: 50px;
`;
