import styled from "styled-components";
import { ManuCategory } from "./category";
import { useSideMenu } from "@/hooks/useSideMenu";
import { MainButton, CancelButton } from "../../tagsComponents/buttons";
import { TiThMenu } from "react-icons/ti";
import { goHome, goLogin, goSignUp } from "@/components/router/router";

export const SimpleHeader = () => {
  const { isOpen, sideMenuOpen, sideMenuClose } = useSideMenu();

  return (
    <>
      <Identity
        onClick={goHome}
        style={{ textAlign: "center", fontSize: "1.6rem" }}
      >
        나혼밥 레시피
      </Identity>
      <Menu>
        <TiThMenu onClick={sideMenuOpen} />
      </Menu>
      <Background
        style={isOpen ? {} : { display: "none" }}
        onClick={sideMenuClose}
      />
      <SideMenu
        style={
          isOpen ? { transform: "translate(-37%, -16%)", opacity: "1" } : {}
        }
      >
        <Identity
          onClick={sideMenuOpen}
          style={{ textAlign: "center", fontSize: "1.6rem" }}
        >
          나혼밥 레시피
        </Identity>
        <Sign>
          <MainButton
            width="80px"
            height="35px"
            content="로그인"
            onClick={goLogin}
          />{" "}
          <CancelButton
            width="80px"
            height="35px"
            content="회원가입"
            onClick={goSignUp}
          />
        </Sign>
        <hr />
        <ManuCategory />
      </SideMenu>
    </>
  );
};

const Identity = styled.h1`
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
`;

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
  background-color: ${props => props.theme.wholeBackground};
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
  background-color: ${props => props.theme.menuBackground};
  border-right: 1px solid ${props => props.theme.menuBorder};
  transition: 0.4s;
  opacity: 0.7;
  transform: translate(-150%, -16%);
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
