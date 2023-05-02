import styled from "styled-components";
import Link from "next/link";
import { MediaQuery } from "../../hooks/useMediaQuery";
import { AiOutlineLike } from "react-icons/ai";

export default function Community() {
  const display = MediaQuery();
  const mock = new Array(50).fill(0);

  return (
    <Container>
      <CommunityWrap>
        {mock.map((v, i) => {
          return (
            <CommunityItems key={i}>
              <Link href={`/community/${i}`}>
                <LikeBox>
                  <div>
                    <AiOutlineLike />
                  </div>
                  <span>0</span>
                </LikeBox>
                <Content>
                  <Title>제목 [0]</Title>
                  <SubInfo>
                    <span>닉네임</span>
                    {" | "}
                    <span>몇분전</span>
                  </SubInfo>
                </Content>
              </Link>
            </CommunityItems>
          );
        })}
      </CommunityWrap>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 150px;
`;

const CommunityWrap = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
`;

const CommunityItems = styled.li`
  width: 60%;
  height: 60px;
  border: 1px solid ${props => props.theme.componentBorderColor};
  & a {
    display: flex;
    align-items: center;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      background-color: ${props => props.theme.hoverBackground};
    }
  }
`;

const LikeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-right: 1px solid ${props => props.theme.componentBorderColor};
`;

const Content = styled.div`
  padding: 5px;
`;
const Title = styled.div`
  padding: 3px;
`;
const SubInfo = styled.div`
  color: ${props => props.theme.subFontColor};
  padding: 3px;
  font-size: 0.8rem;
`;
