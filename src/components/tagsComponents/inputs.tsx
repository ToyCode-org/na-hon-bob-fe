import React from "react";
import styled from "styled-components";

type Props = React.HTMLAttributes<HTMLInputElement> & InputProps;

interface InputProps {
  type?: string | undefined;
  name?: string | undefined;
  autoComplete?: string | undefined;
  width: string;
  height: string;
  border?: string | undefined;
}

export const MainInput = ({
  type,
  name,
  autoComplete,
  width,
  height,
  border,
  ...props
}: Props) => {
  return (
    <Main
      {...props}
      name={name}
      autoComplete={autoComplete || "on"}
      type={type || "text"}
      style={{
        width: `${width}`,
        height: `${height}`,
        border: `${border && border !== "" ? `1px solid ${border}` : ""}`,
      }}
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

type TaProps = React.HTMLAttributes<HTMLTextAreaElement> & TextAreaProps;
interface TextAreaProps {
  name?: string | undefined;
  width: string;
  height: string;
  border?: string | undefined;
}

export const MainTextArea = ({
  name,
  width,
  height,
  border,
  ...props
}: TaProps) => {
  return (
    <TextArea
      {...props}
      name={name}
      autoComplete="off"
      style={{
        width: `${width}`,
        height: `${height}`,
        border: `${border && border !== "" ? `1px solid ${border}` : ""}`,
      }}
    />
  );
};

const TextArea = styled.textarea`
  padding: 5px;
  border: none;
  border: 1px solid ${props => props.theme.inputBorderColor};
  border-radius: 5px;
  font-size: 1.2rem;
  resize: none;
  white-space: pre;
  &:hover {
    background: ${props => props.theme.inputBorderColor};
  }
  &:focus {
    outline: none;
    border-color: ${props => props.theme.hoverBorderColor};
    box-shadow: 0 0 1px ${props => props.theme.hoverBorderColor};
  }
`;
