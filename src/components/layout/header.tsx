import styled from "styled-components";
import { MainButton, CancelButton } from "../tagsComponents/buttons";
import { useRouter } from "next/router";
import Link from "next/link";
import { MediaQuery } from "@/hooks/useMediaQuery";
import { TiThMenu } from "react-icons/ti";
import { useState } from "react";

export const Header = () => {
  const router = useRouter();
  const mediaData = MediaQuery();

  const makeCategory = (name: string, link: string) => {
    return {
      name,
      link,
    };
  };
  const categories = [
    makeCategory("레시피", "/"),
    makeCategory("커뮤니티", "/community"),
  ];

  const goAddPost = () => {
    router.push("/post/add");
  };
  const [isOpen, setIsOpen] = useState(false);
  const sideMenuHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      {mediaData === 4 ? (
        <HeadersWrap>
          <FirstHeader>
            <Identity>나혼밥 레시피</Identity>
            <Category>
              {categories.map((cate, index) => {
                const { name, link } = cate;
                return (
                  <Link
                    key={index}
                    href={link}
                    style={router.pathname === link ? { color: "gold" } : {}}
                  >
                    {name}
                  </Link>
                );
              })}
            </Category>
          </FirstHeader>
          <SecondHeader>
            <div>검색</div>
            <Sign>
              <span>로그인</span> | <span>회원가입</span>
            </Sign>
            <MainButton
              width={7}
              height={30}
              content="글쓰기"
              onClick={goAddPost}
            />
          </SecondHeader>
        </HeadersWrap>
      ) : (
        <>
          <Identity style={{ textAlign: "center", fontSize: "1.6rem" }}>
            나혼밥 레시피
          </Identity>
          <Menu>
            <TiThMenu onClick={sideMenuHandler} />
          </Menu>
          <Background
            style={isOpen ? {} : { display: "none" }}
            onClick={sideMenuHandler}
          />
          <SideMenu
            style={isOpen ? { transform: "translate(-37%, -16%)" } : {}}
          >
            <Identity style={{ textAlign: "center", fontSize: "1.6rem" }}>
              나혼밥 레시피
            </Identity>
            <Sign>
              <MainButton width={8} height={35} content="로그인" />{" "}
              <CancelButton width={8} height={35} content="회원가입" />
            </Sign>
            <hr />
          </SideMenu>
        </>
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
const Category = styled.nav`
  margin: 0 20px;

  & a {
    margin: 0 10px;
    font-weight: bold;
  }
`;

const Identity = styled.h1`
  font-size: 1.3rem;
  font-weight: bold;
`;

const SecondHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Sign = styled.div`
  margin: 0 40px 0 40px;
  text-align: center;
  & span {
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.FontHoverColor};
    }
  }
`;

// Mobile/tablet
const Menu = styled.span`
  & svg {
    cursor: pointer;
    transform: translate(-200%, -170%);
    font-size: 40px;
    color: ${props => props.theme.mainFontColor};
    &:hover {
      color: ${props => props.theme.FontHoverColor};
    }
  }
`;
const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #8080806c;
  animation: backgroundFadein 0.4s;
  @keyframes backgroundFadein {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const SideMenu = styled.div`
  padding: 10px;
  width: 270px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid black;
  transition: 0.3s;
  transform: translate(-150%, -16%);
`;
