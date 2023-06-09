import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { MainButton } from "../../tagsComponents/buttons";
import { useRouter } from "next/router";
import { MediaQuery } from "@/hooks/useMediaQuery";
import { MainCategory } from "./category";
import { SimpleHeader } from "./simpleHeader";
import { goHome, goAddPost, goAddCommunity } from "@/router/router";
import { Search } from "./Search";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import { getMyInfo } from "@/redux/slice/userSlice";
import { userAPI } from "@/api/api";
import { swalError } from "@/swal/swal";

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector(state => state.userSlice);
  const { pathname } = useRouter();

  const mediaData = MediaQuery();

  const noHeader =
    pathname === "/login" || pathname === "/login/signup"
      ? { display: "none" }
      : {};

  const logoutHandler = async () => {
    try {
      const res = await userAPI.logout();
      if (res.data.status === "ok") {
        dispatch(getMyInfo());
        return true;
      }
    } catch (error) {
      return swalError("알 수 없는 오류입니다.");
    }
  };

  useEffect(() => {
    dispatch(getMyInfo());
  }, [pathname]);

  const [selectPosting, setSelectPosting] = useState(false);
  const selectPostingHandler = () => {
    setSelectPosting(prev => !prev);
  };

  return (
    <Container style={noHeader}>
      <Logo>
        <Image
          src={"/images/egg.png"}
          alt="logo"
          width={50}
          height={50}
          priority
        />
      </Logo>
      {mediaData === 4 ? (
        <HeadersWrap>
          <FirstHeader>
            <Identity onClick={goHome}>나혼밥 레시피</Identity>
            <MainCategory />
          </FirstHeader>
          <SecondHeader>
            <Search />
            {!isLogin ? (
              <Sign>
                <Link href={"/login"}>로그인 | </Link>
                <Link href={"/login/signup"}>회원가입</Link>
              </Sign>
            ) : (
              <Sign>
                <Link href={"/mypage"}>마이페이지 | </Link>
                <span onClick={logoutHandler}>로그아웃</span>
              </Sign>
            )}
            <MainButton
              width="80px"
              height="30px"
              content="글쓰기"
              onClick={selectPostingHandler}
            />
            <PostingSelector style={selectPosting ? {} : { display: "none" }}>
              <li
                onClick={() => {
                  goAddPost();
                  selectPostingHandler();
                }}
              >
                레시피
              </li>
              <li
                onClick={() => {
                  goAddCommunity();
                  selectPostingHandler();
                }}
              >
                커뮤니티
              </li>
            </PostingSelector>
          </SecondHeader>
        </HeadersWrap>
      ) : (
        <SimpleHeader isLogin={isLogin} logoutHandler={logoutHandler} />
      )}
    </Container>
  );
};

const Logo = styled.div`
  position: absolute;
  top: 15px;
  left: 20px;
  @media only all and (max-width: 1024px) {
    display: none;
  }
`;

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
  & a,
  span {
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.FontHoverColor};
    }
  }
`;

const PostingSelector = styled.ul`
  position: absolute;
  transform: translate(285%, 75%);
  list-style: none;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  z-index: 1;

  animation: selectPostOn 0.3s;
  @keyframes selectPostOn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  & li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 50px;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
      background-color: ${props => props.theme.hoverBackground};
    }
    &:first-child {
      border-radius: 10px 10px 0 0;
    }
    &:last-child {
      border-radius: 0 0 10px 10px;
    }
  }
`;
