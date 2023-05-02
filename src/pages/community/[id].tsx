import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CommunityComment } from "@/components/community/comment";
import { BiEdit } from "react-icons/bi";
import { CgCloseR } from "react-icons/cg";
import { communityAPI } from "@/api/api";
import { forceGoBack, goEditCommunity } from "@/router/router";
import { swalQuestion, swalSuccess } from "@/swal/swal";

export default function Community() {
  const { query } = useRouter();
  const [communityState, setCommunityState] = useState({
    community_id: 0,
    content: "",
    createdAt: "",
    isEditable: false,
    isLiked: false,
    likeUsers: [],
    likes_count: 0,
    title: "",
    user: { nickname: "", avatar: "" },
    user_id: 0,
  });

  const getOneCommunity = async (community_id: number) => {
    const { data } = await communityAPI.getOne(community_id);
    setCommunityState(data.data);
  };
  useEffect(() => {
    if (Number(query.id) >= 0) {
      getOneCommunity(Number(query.id));
    }
  }, [query.id]);

  const deleteCommunity = async (community_id: number) => {
    swalQuestion("정말 삭제할까요?", "삭제한 데이터는 복구되지 않습니다.").then(
      async res => {
        if (res.value) {
          await communityAPI.deleteCommunity(community_id);
          swalSuccess("삭제완료").then(() => {
            forceGoBack();
          });
        }
      },
    );
  };

  return (
    <Container>
      <ContentWrap>
        <IconBtn style={communityState.isEditable ? {} : { display: "none" }}>
          <BiEdit onClick={() => goEditCommunity(Number(query.id))} />
          <CgCloseR
            className="delete"
            onClick={() => deleteCommunity(Number(query.id))}
          />
        </IconBtn>
        <Title>{communityState.title}</Title>
        <Content>{communityState.content}</Content>
      </ContentWrap>
      <CommunityComment />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 150px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrap = styled.div`
  width: 700px;
  min-height: 300px;
  border: 1px solid lightgray;
`;

const IconBtn = styled.div`
  position: absolute;
  transform: translate(600px, 70%);
  & svg {
    margin: 0 5px;
    font-size: 30px;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
    &.delete {
      color: red;
    }
  }
`;

const Title = styled.h2`
  padding: 20px;
  display: flex;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid lightgray;
`;

const Content = styled.pre`
  padding: 20px;
`;
