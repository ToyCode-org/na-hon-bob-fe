import styled from "styled-components";
import { MainButton } from "../../tagsComponents/buttons";
import { useRouter } from "next/router";
import { MediaQuery } from "@/hooks/useMediaQuery";
import { MainCategory } from "./category";
import { SimpleHeader } from "./simpleHeader";
import { goHome, goAddPost } from "@/components/router/router";
import Link from "next/link";

export const Header = () => {
  const { pathname } = useRouter();
  const mediaData = MediaQuery();

  const noHeader =
    pathname === "/login" || pathname === "/login/signup"
      ? { display: "none" }
      : {};
  return (
    <Container style={noHeader}>
      {mediaData === 4 ? (
        <HeadersWrap>
          <FirstHeader>
            <Identity onClick={goHome}>나혼밥 레시피</Identity>
            <MainCategory />
          </FirstHeader>
          <SecondHeader>
            <div>검색</div>
            <Sign>
              <Link href={"/login"}>로그인</Link> |{" "}
              <Link href={"/login/signup"}>회원가입</Link>
            </Sign>
            <MainButton
              width="80px"
              height="30px"
              content="글쓰기"
              onClick={goAddPost}
            />
          </SecondHeader>
        </HeadersWrap>
      ) : (
        <SimpleHeader />
      )}
    </Container>
  );
};

const Container = styled.header`
  padding: 0 100px;
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  line-height: 81px;
  border-bottom: 1px solid #eaedef;
  background-color: white;
`;
const HeadersWrap = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1136px;
  min-width: 700px;
`;

const FirstHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Identity = styled.h1`
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
`;

const SecondHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Sign = styled.div`
  margin: 0 40px 0 40px;
  text-align: center;
  & a {
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.FontHoverColor};
    }
  }
`;
