import { FormDataCheck, FormData, VerifyDispatch, Verify } from ".";
import { userAPI } from "@/api/api";
import Router from "next/router";
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

export const swalError = (title: string) => {
  return Swal.fire({
    icon: "error",
    title: `${title}`,
    confirmButtonColor: "gold",
  });
};

export const emailVerifi = async (
  email: string,
  setVerifiCheck: VerifyDispatch,
) => {
  try {
    await userAPI.sendVerificationCode(email);
    setVerifiCheck((prev: Verify) => ({ ...prev, sendCode: true }));
    Swal.fire({
      icon: "success",
      title: "인증번호가 발송되었습니다.",
      timer: 1500,
      timerProgressBar: true,
      confirmButtonColor: "gold",
    });
  } catch (error) {
    swalError("이미 가입된 이메일입니다.");
  }
};

export const emailCheck = async (
  code: string,
  setVerifiCheck: VerifyDispatch,
) => {
  try {
    const res = await userAPI.emailCheck(code);
    if (res.data.status === "ok") {
      Swal.fire({
        icon: "success",
        title: "인증 완료",
        confirmButtonColor: "gold",
      }).then(() => {
        setVerifiCheck((prev: Verify) => ({ ...prev, email: true }));
        document.getElementById("email")?.setAttribute("disabled", "");
      });
    } else {
      swalError("인증코드가 일치하지 않습니다.");
    }
  } catch (error) {
    swalError("인증코드가 만료되었습니다.");
  }
};

export const nicknameChecker = async (
  nickname: string,
  setVerifiCheck: VerifyDispatch,
) => {
  try {
    const nicknameRegex = /[a-zA-Z가-힣]{2,15}/;
    const nicknameTest = nicknameRegex.test(nickname);
    if (!nicknameTest) {
      swalError("올바른 닉네임이 아닙니다.");
    }
    const res = await userAPI.nicknameCheck(nickname);
    if (res.data.isUnique) {
      Swal.fire({
        icon: "success",
        title: "사용할 수 있는 닉네임입니다.",
        confirmButtonColor: "gold",
      }).then(() => {
        setVerifiCheck((prev: Verify) => ({ ...prev, nickname: true }));
      });
    }
  } catch (error) {
    swalError("이미 사용중인 닉네임입니다.");
  }
};

export const createUser = async (
  verifiCheck: Verify,
  formDataCheck: FormDataCheck,
  formData: FormData,
) => {
  if (!verifiCheck.email) return swalError("이메일 인증이 필요합니다.");
  if (!verifiCheck.nickname) return swalError("닉네임 중복 확인이 필요합니다.");
  if (formDataCheck.passwordCheck === "" || false)
    return swalError("비밀번호를 확인해주세요");
  try {
    const res = await userAPI.signUp(formData);
    if (res.data.status === "ok") {
      Swal.fire({
        icon: "success",
        title: "회원가입 완료!",
        confirmButtonColor: "gold",
      }).then(() => {
        Router.push("/login");
      });
    }
  } catch (error) {}
};

export const userLogin = async (formData: FormData) => {
  try {
    const res = await userAPI.login(formData);
    if (res.data.status === "ok") {
      Router.push("/");
    }
  } catch (e: any) {
    return swalError("회원정보가 일치하지 않습니다.");
  }
};
