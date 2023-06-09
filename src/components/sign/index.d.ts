import { FormEvent } from "react";

export type FormEvents = FormEvent<HTMLFormElement>;
export type InputEvent = FormEvent<HTMLInputElement>;
export type LabelEvent = FormEvent<HTMLLabelElement>;
export type TextAreaEvent = FormEvent<HTMLTextAreaElement>;
export type ButtonEvent = FormEventHandler<HTMLButtonElement>;
export type InputTarget = HTMLInputElement;

export type FormDataCheck = {
  email: string | boolean;
  password: string | boolean;
  passwordCheck: string | boolean;
  nickname: string | boolean;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type FormData = {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
};

export type Verify = {
  sendCode: boolean;
  email: boolean;
  nickname: boolean;
};
export type VerifyDispatch = Dispatch<SetStateAction<Verify>>;
