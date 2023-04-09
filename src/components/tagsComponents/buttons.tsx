import React from "react";
import styled from "styled-components";

type Props = React.HTMLAttributes<HTMLButtonElement> & ButtonProps;

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  content: string;
  width: string;
  height: string;
}

export const MainButton = ({
  type,
  content,
  width,
  height,
  ...props
}: Props) => {
  return (
    <Main
      {...props}
      type={type || "button"}
      style={{ width: `${width}`, height: `${height}` }}
    >
      {content}
    </Main>
  );
};

const Main = styled.button`
  border: none;
  border-radius: 5px;
  background: none;
  background-color: ${props => props.theme.mainButton};
  color: ${props => props.theme.mainFontColor};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.mainButtonHover};
  }
`;

export const SubButton = ({
  type,
  content,
  width,
  height,
  ...props
}: Props) => {
  return (
    <Sub
      {...props}
      type={type || "button"}
      style={{ width: `${width}`, height: `${height}` }}
    >
      {content}
    </Sub>
  );
};

const Sub = styled.button`
  border: none;
  border-radius: 5px;
  background: none;
  background-color: ${props => props.theme.subButton};
  color: ${props => props.theme.mainFontColor};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.subButtonHover};
  }
`;

export const CancelButton = ({
  type,
  content,
  width,
  height,
  ...props
}: Props) => {
  return (
    <Cancel
      {...props}
      type={type || "button"}
      style={{ width: `${width}`, height: `${height}` }}
    >
      {content}
    </Cancel>
  );
};

const Cancel = styled.button`
  border: none;
  border-radius: 5px;
  background: none;
  background-color: ${props => props.theme.cancelButton};
  color: ${props => props.theme.mainFontColor};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.cancelButtonHover};
  }
`;
