import { FormEvent } from "react";

export type FormEvents = FormEvent<HTMLFormElement>;
export type InputTarget = HTMLInputElement;

export type FormDataCheck = {
  email: string | boolean;
  password: string | boolean;
  passwordCheck: string | boolean;
  nickname: string | boolean;
};
