import React from "react";
import styled from "styled-components";

type Props = React.HTMLAttributes<HTMLInputElement> & InputProps;

interface InputProps {
  type?: string | undefined;
  width: number;
  height: number;
}

export const MainInpnut = ({ type, width, height, ...props }: Props) => {
  return (
    <Main
      {...props}
      type={type || "text"}
      style={{ width: `${width}vw`, height: `${height}px` }}
    />
  );
};

const Main = styled.input`
  padding: 5px;
  border: none;
  border: 1px solid ${props => props.theme.inputBorderColor};
  border-radius: 5px;
  font-size: 1.2rem;
  &:hover {
    background: ${props => props.theme.inputBorderColor};
  }
  &:focus {
    outline: none;
    border-color: ${props => props.theme.hoverBorderColor};
    box-shadow: 0 0 1px ${props => props.theme.hoverBorderColor};
  }
`;
