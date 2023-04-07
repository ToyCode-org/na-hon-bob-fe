import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { MainInpnut } from "@/components/tagsComponents/inputs";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const inputArray = [
    { name: "email", placeholder: "이메일" },
    { name: "password", placeholder: "비밀번호" },
    { name: "password", placeholder: "비밀번호 확인" },
    { name: "text", placeholder: "닉네임" },
  ];
  const goHome = () => {
    router.push("/");
  };

  return (
    <Container>
      <FormHead onClick={goHome}>
        <Image width={50} height={50} src={"/images/egg.png"} alt="logo" />
        <Identity>나혼밥 레시피</Identity>
      </FormHead>
      <SignUpWrap>
        <h2>회원가입</h2>
        {inputArray?.map((value, index) => {
          const { name, placeholder } = value;
          return (
            <div key={index}>
              <MainInpnut
                id={name}
                placeholder={placeholder}
                autoComplete="off"
                width={20}
                height={40}
              />
            </div>
          );
        })}
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
  width: 20vw;
  cursor: pointer;
`;
const Identity = styled.span`
  margin: 0 10px;
  font-size: 1.3rem;
  font-weight: bold;
`;

const SignUpWrap = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  & h2 {
    margin-bottom: 20px;
  }
`;

const Sign = styled.div`
  margin: 20px 0;
  text-align: center;
  & a {
    margin: 0 20px;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.FontHoverColor};
    }
  }
`;
