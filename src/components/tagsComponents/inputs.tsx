import React from "react";
import styled from "styled-components";

type Props = React.HTMLAttributes<HTMLInputElement> & InputProps;

interface InputProps {
  type?: string | undefined;
  name?: string | undefined;
  maxLength?: number | undefined;
  autoComplete?: string | undefined;
  width: string;
  height: string;
  border?: string | undefined;
}

export const MainInput = ({
  type,
  name,
  maxLength,
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
      maxLength={maxLength || 500}
      style={
        border !== ""
          ? {
              width: `${width}`,
              height: `${height}`,
              border: `${`1px solid ${border}`}`,
            }
          : { width: `${width}`, height: `${height}` }
      }
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
  maxLength?: number | undefined;
}

export const MainTextArea = ({
  name,
  width,
  height,
  border,
  maxLength,
  ...props
}: TaProps) => {
  return (
    <TextArea
      {...props}
      name={name}
      autoComplete="off"
      maxLength={maxLength || 1000}
      spellCheck="false"
      style={
        border !== ""
          ? {
              width: `${width}`,
              height: `${height}`,
              border: `${`1px solid ${border}`}`,
            }
          : { width: `${width}`, height: `${height}` }
      }
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
  white-space: pre-wrap;
  overflow: hidden;
  &:hover {
    background: ${props => props.theme.inputBorderColor};
  }
  &:focus {
    outline: none;
    border-color: ${props => props.theme.hoverBorderColor};
    box-shadow: 0 0 1px ${props => props.theme.hoverBorderColor};
  }
`;

interface MaxLengthProps {
  length: number;
  maxLength: number;
}
export const MaxLengthChecker = ({ length, maxLength }: MaxLengthProps) => {
  return (
    <MaxLength>
      {length} / {maxLength}
    </MaxLength>
  );
};

const MaxLength = styled.p`
  margin-bottom: 10px;
  text-align: right;
  font-size: 0.9rem;
  color: ${props => props.theme.subFontColor};
`;
