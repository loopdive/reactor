import styled from "styled-components";

export const DefaultButton = styled.button`
  display: inline-block;
  padding: 15px 25px;
  border-radius: 25px;
  background-color: ${({ activated }: { activated?: boolean }) =>
    activated ? "rgb(255, 63, 63)" : "#429cd6"};
  color: white;
  cursor: pointer;

  box-shadow: 0px 10px 20px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.2s, transform 0.2s;
  will-change: transform;

  &:hover {
    box-shadow: 0px 15px 30px -10px rgba(0, 0, 0, 0.3);
    transform: scale(1.02) translateY(-1px);
  }

  border: none;
  outline: none;
`;
