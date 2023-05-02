import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MediaQuery } from "../../hooks/useMediaQuery";
import { AiOutlineLike } from "react-icons/ai";
import { communityAPI } from "@/api/api";
import { TimeToToday } from "@/util/timeToToday";
import { Paging } from "@/util/paging";

export default function Community() {
  const display = MediaQuery();

  const [{ communitys, page, totalPages }, setCommunitys] = useState({
    communitys: [],
    page: 1,
    totalPages: 1,
  });
  const getCommunitys = async (pageNum: number) => {
    const { data } = await communityAPI.getAllCommunity(pageNum);
    setCommunitys(prev => ({ ...prev, totalPages: data.totalPages }));
    setCommunitys(prev => ({ ...prev, communitys: data.data }));
  };

  const pageHandler = (page: number) => {
    setCommunitys(prev => ({ ...prev, page: page }));
  };

  useEffect(() => {
    getCommunitys(page);
  }, [page]);

  return (
    <Container>
      <CommunityWrap>
        {communitys?.map((community, index) => {
          const {
            community_id,
            title,
            createdAt,
            user: { nickname },
            likes_count,
          } = community;
          return (
            <CommunityItems key={index}>
              <Link href={`/community/${community_id}`}>
                <LikeBox>
                  <div>
                    <AiOutlineLike />
                  </div>
                  <span>{likes_count}</span>
                </LikeBox>
                <Content>
                  <Title>{title}</Title>
                  <SubInfo>
                    <span>{nickname}</span>
                    {" | "}
                    <span>{TimeToToday(+new Date(createdAt))}</span>
                  </SubInfo>
                </Content>
              </Link>
            </CommunityItems>
          );
        })}
      </CommunityWrap>
      <Paging
        activePage={page}
        totalPage={totalPages}
        prevPageText={"<"}
        nextPageText={">"}
        handlePageChange={pageHandler}
        maxItems={5}
      />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 150px;
  padding-bottom: 100px;
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
  @media only all and (max-width: 767px) {
    width: 100%;
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
