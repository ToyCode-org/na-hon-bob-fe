import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MainInput } from "@/components/tagsComponents/inputs";
import { inputDataMaker } from "@/components/sign/signFNs";
import { FormDataCheck, FormEvents, InputTarget } from "@/components/sign";
import { inputBorderStyle, errMsgStyle } from "@/components/sign/signFNs";
import { MainButton, SubButton } from "@/components/tagsComponents/buttons";
import { userAPI } from "@/api/api";

export default function SignUp() {
  const router = useRouter();
  const inputArray = [
    inputDataMaker(
      "email",
      "email",
      "이메일",
      "",
      "이메일 형식이 올바르지 않습니다.",
    ),
    inputDataMaker(
      "password",
      "password",
      "비밀번호",
      "영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.",
      "비밀번호를 확인해주세요.",
    ),
    inputDataMaker(
      "password",
      "passwordCheck",
      "비밀번호 확인",
      "",
      "비밀번호가 일치하지 않습니다.",
    ),
    inputDataMaker(
      "text",
      "nickname",
      "닉네임",
      "다른 유저와 겹치지 않도록 입력해주세요. (2~15자)",
    ),
  ];
  const goHome = () => {
    router.push("/");
  };

  const formDataInit = {
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
  };
  const [formData, setFormData] = useState(formDataInit);
  const formChangeHandler = (e: FormEvents) => {
    const target = e.target as InputTarget;
    const name = target.name;
    const value = target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const [formDataCheck, setformDataCheck] =
    useState<FormDataCheck>(formDataInit);

  useEffect(() => {
    const emailRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-={}|[\]\\;':",./<>?]*.{8,}$/;
    const passwordCheckRegex =
      formData.passwordCheck !== ""
        ? formData.password === formData.passwordCheck
          ? true
          : false
        : "";
    setformDataCheck(prev => ({
      ...prev,
      email: formData.email !== "" ? emailRegex.test(formData.email) : "",
    }));
    setformDataCheck(prev => ({
      ...prev,
      password:
        formData.password !== "" ? passwordRegex.test(formData.password) : "",
    }));
    setformDataCheck(prev => ({ ...prev, passwordCheck: passwordCheckRegex }));
  }, [formData.email, formData.password, formData.passwordCheck]);

  const emailVerifi = () => {
    alert("이메일 인증");
    userAPI.sendVerificationCode("yhl0078@naver.com");
  };
  const emailCheck = () => {
    alert("이메일 체크");
  };
  const nicknameChecker = () => {
    alert("닉네임 체크");
  };
  const onSubmitHandler = (e: FormEvents) => {
    e.preventDefault();
    alert("회원가입 완료");
  };

  return (
    <Container>
      <FormHead onClick={goHome}>
        <Image width={50} height={50} src={"/images/egg.png"} alt="logo" />
        <Identity>나혼밥 레시피</Identity>
      </FormHead>
      <SignUpWrap
        onChange={e => formChangeHandler(e)}
        onSubmit={onSubmitHandler}
      >
        <h2>회원가입</h2>
        {inputArray?.map((value, index) => {
          const { type, name, placeholder, regex, error } = value;
          return (
            <InputWrap key={index}>
              <p>{placeholder}</p>
              <RegexText>{regex}</RegexText>
              <MainInput
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                autoComplete="off"
                width="360px"
                height="40px"
                border={inputBorderStyle(formDataCheck, name)}
              />
              <ErrMsg style={errMsgStyle(formDataCheck, name)}>{error}</ErrMsg>
              {index === 0 ? (
                <EmailCheckBtn>
                  <SubButton
                    type="button"
                    width="100%"
                    height="40px"
                    content="이메일 인증"
                    onClick={emailVerifi}
                  />
                </EmailCheckBtn>
              ) : null}
            </InputWrap>
          );
        })}
        <ButtonWrap>
          <SubButton
            type="button"
            width="100%"
            height="40px"
            content="닉네임 중복 확인"
            onClick={nicknameChecker}
          />
        </ButtonWrap>
        <ButtonWrap>
          <MainButton
            type="submit"
            width="100%"
            height="40px"
            content="회원가입"
          />
        </ButtonWrap>
        <Sign>
          <Link href={"/"}>홈으로</Link> | <Link href={"/login"}>로그인</Link>
        </Sign>
      </SignUpWrap>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const FormHead = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 300px;
  cursor: pointer;
`;
const Identity = styled.span`
  margin: 0 25px;
  font-size: 1.3rem;
  font-weight: bold;
`;

const SignUpWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  & h2 {
    width: 100%;
  }
  & p {
    margin: 20px 0 0 0;
    padding: 5px;
  }
`;

const InputWrap = styled.div`
  margin-bottom: 15px;
`;
const ButtonWrap = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const RegexText = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
  padding: 5px;
`;

const ErrMsg = styled.div`
  position: absolute;
  padding: 5px;
  font-size: 12px;
  color: red;
`;

const EmailCheckBtn = styled.div`
  margin-top: 30px;
`;

const Sign = styled.div`
  text-align: center;
  & a {
    margin: 0 20px;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.FontHoverColor};
    }
  }
`;
