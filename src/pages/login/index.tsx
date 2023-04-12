import styled from "styled-components";
import { MainInput } from "@/components/tagsComponents/inputs";
import { MainButton } from "@/components/tagsComponents/buttons";
import Image from "next/image";
import Link from "next/link";
import { inputDataMaker } from "@/components/sign/signFNs";
import { useState } from "react";
import { FormEvents, InputTarget } from "@/components/sign";
import { goHome } from "@/components/router/router";

export default function Login() {
  const inputArray = [
    inputDataMaker("email", "email", "이메일"),
    inputDataMaker("password", "password", "비밀번호"),
  ];

  const formDataInit = {
    email: "",
    password: "",
  };
  const [formData, setformData] = useState(formDataInit);
  const formChnageHandler = (e: FormEvents) => {
    const target = e.target as InputTarget;
    const name = target.name;
    const value = target.value;
    setformData(prev => ({ ...prev, [name]: value }));
  };
  const onSubmitHandler = (e: FormEvents) => {
    e.preventDefault();
    alert("로그인 성공");
  };
  return (
    <Container>
      <LoginWrap onChange={formChnageHandler} onSubmit={onSubmitHandler}>
        <FormHead onClick={goHome}>
          <Image width={50} height={50} src={"/images/egg.png"} alt="logo" />
          <Identity>나혼밥 레시피</Identity>
        </FormHead>
        {inputArray.map((value, index) => {
          const { type, name, placeholder } = value;
          if (index < 2)
            return (
              <div key={index}>
                <MainInput
                  id={name}
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  autoComplete="off"
                  width="300px"
                  height="40px"
                />
              </div>
            );
        })}
        <ButtonWrap>
          <MainButton
            type="submit"
            width="300px"
            height="40px"
            content="로그인"
          />
        </ButtonWrap>
        <Sign>
          <Link href={"/"}>홈으로</Link> |{" "}
          <Link href={"/login/signup"}>회원가입</Link>
        </Sign>
      </LoginWrap>
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

const LoginWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormHead = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 300px;
  cursor: pointer;
`;

const Identity = styled.h1`
  margin: 0 25px;
  font-size: 1.3rem;
  font-weight: bold;
`;

const ButtonWrap = styled.div`
  margin: 20px 0;
  width: 300px;
  display: flex;
  flex-direction: column;

  & button {
    margin-bottom: 20px;
  }
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
