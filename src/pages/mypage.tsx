import styled from "styled-components";
import { BoringAvatar } from "@/components/post/boringAvatar";
import { getMyInfo, deleteCheck } from "@/components/mypage/mypageFNs";
import { commentAPI, postAPI } from "@/api/api";

export default function Mypage() {
  const getMyInfoData = async () => {
    const res = await getMyInfo();
    console.log(res);
  };

  const getPostData = async () => {
    const res = await postAPI.getAllPost();
    console.log(res);
  };

  const getMyPostData = async () => {
    const res = await postAPI.getMyPost();
    console.log(res);
  };

  const getOnePost = async () => {
    const res = await postAPI.getPostOne(11);
    console.log(res);
  };

  const mock = {
    thumnail: "test",
    title: "test",
    ingredient: "test",
    description: "test",
  };
  const createJunk = async () => {
    const res = await postAPI.createPost(mock);
    console.log(res);
  };

  const editMock = {
    thumnail: "est",
    title: "",
    ingredient: "",
    description: "",
  };
  const editPost = async () => {
    const res = await postAPI.updatePost(13, editMock);
    console.log(res);
  };
  const deletePost = async () => {
    const res = await postAPI.deletePost(12);
    console.log(res);
  };

  const getComments = async () => {
    const res = await commentAPI.getAllComment();
    console.log(res);
  };
  const getCommentsByPostId = async () => {
    const res = await commentAPI.getCommentByPostId(11);
    console.log(res);
  };
  const createComments = async () => {
    const res = await commentAPI.createComment(11, "test");
    console.log(res);
  };
  const editComments = async () => {
    const res = await commentAPI.editComment(6, "ttteesssttt");
    console.log(res);
  };
  const deleteComments = async () => {
    const res = await commentAPI.deleteComment(7);
    console.log(res);
  };

  return (
    <Container>
      <Avatar onClick={getMyInfoData}>
        <BoringAvatar />
      </Avatar>
      <UserInfo>
        <div>닉네임 : yamyam</div>
        <div onClick={deleteCheck}>회원탈퇴</div>
        <div onClick={getPostData}>전체 포스트</div>
        <div onClick={getMyPostData}>나의 포스트</div>
        <div onClick={getOnePost}>한 개의 포스트</div>
        <div onClick={createJunk}>포스팅 테스트</div>
        <div onClick={editPost}>포스트 수정 테스트</div>
        <div onClick={deletePost}>포스트 삭제</div>
        <div onClick={getComments}>댓글불러오기</div>
        <div onClick={getCommentsByPostId}>
          어떤 포스트에 해당된 댓글 불러오기
        </div>
        <div onClick={createComments}>댓글 생성</div>
        <div onClick={editComments}>댓글 수정</div>
        <div onClick={deleteComments}>댓글 삭제</div>
      </UserInfo>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
`;

const Avatar = styled.div`
  & svg {
    width: 200px;
    height: 200px;
  }
`;

const UserInfo = styled.div`
  margin-top: 50px;
`;
