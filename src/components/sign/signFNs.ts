import { FormDataCheck, FormEvents, InputTarget } from ".";
import { userAPI } from "@/api/api";
import Swal from "sweetalert2";

export const inputDataMaker = (
  type: string,
  name: string,
  placeholder: string,
  regex?: string,
  error?: string,
) => {
  return {
    type,
    name,
    placeholder,
    regex,
    error,
  };
};

export const inputBorderStyle = (checkState: FormDataCheck, name: string) => {
  const bool = { ...checkState }[name];
  if (bool === true) {
    return "lightgreen";
  } else if (bool === false) {
    return "red";
  } else {
    return "";
  }
};

export const errMsgStyle = (checkState: FormDataCheck, name: string) => {
  return { ...checkState }[name] === false ? {} : { display: "none" };
};

export const emailVerifi = async (email: string) => {
  alert("이메일 인증");
  const res = await userAPI.sendVerificationCode("yhl0078@naver.com");
  console.log(res);
};
export const emailCheck = async (code: string) => {
  alert("이메일 체크");
  const res = await userAPI.emailCheck(code);
  console.log(res);
};
export const nicknameChecker = () => {
  alert("닉네임 체크");
};
