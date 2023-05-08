import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { MainInput } from "../tagsComponents/inputs";
import { MainButton } from "../tagsComponents/buttons";
import { FormEvents } from "../sign";
import { useAppSelector } from "@/redux/useRedux";
import { BoringAvatar } from "../post/boringAvatar";
import { CommunityCommentList } from "./commentList";
import { community_commentAPI } from "@/api/api";
import { Paging } from "@/util/paging";
import { CommunityList } from ".";
import { swalError, swalQuestion } from "@/swal/swal";

export const CommunityComment = () => {
  const { query } = useRouter();
  const { user } = useAppSelector(state => state.userSlice);

  const commentData = useRef("");
  const onChangeHandler = (e: FormEvents) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    commentData.current = value;
  };

  type StateType = {
    page: number;
    totalPages: number;
    commentList: CommunityList[];
  };
  const [{ page, commentList, totalPages }, setCommentLists] =
    useState<StateType>({
      page: 1,
      totalPages: 1,
      commentList: [],
    });

  const pagingHandler = (pageNum: number) => {
    setCommentLists(prev => ({ ...prev, page: pageNum }));
  };

  const getCommentList = async (community_id: number, page: number) => {
    const { data } = await community_commentAPI.getAllComment(
      community_id,
      page,
    );
    setCommentLists(prev => ({
      ...prev,
      commentList: data.data,
      totalPages: data.totalPages,
    }));
  };
  useEffect(() => {
    if (Number(query.id) >= 0) getCommentList(Number(query.id), page);
  }, [page, query.id]);

  const onSubmitHandler = async (e: FormEvents) => {
    e.preventDefault();
    const formData = { content: commentData.current };
    const { data } = await community_commentAPI.createComment(
      Number(query.id),
      formData,
    );
    let list = commentList;
    list.unshift({ ...data.data, user });
    if (list.length === 10) {
      list.pop();
    }
    setCommentLists(prev => ({ ...prev, commentList: list }));
    const contentInput = document.getElementById("content") as HTMLInputElement;
    contentInput.value = "";
  };

  const deleteCommentHandler = async (community_comment_id: number) => {
    swalQuestion("정말 삭제할까요?", "삭제된 댓글을 복구되지 않습니다.").then(
      async res => {
        if (res.value) {
          try {
            await community_commentAPI.deleteComment(community_comment_id);
            const newCommentList = commentList.filter(
              item => item.community_comment_id !== community_comment_id,
            );
            setCommentLists(prev => ({ ...prev, commentList: newCommentList }));
          } catch (error) {
            swalError("알 수 없는 오류입니다.");
          }
        }
      },
    );
  };

  return (
    <Container>
      <CommentForm onSubmit={onSubmitHandler} onChange={onChangeHandler}>
        {user.avatar === "" || user === undefined ? (
          <BoringAvatar />
        ) : (
          <Image src={user.avatar} alt="profile" width={50} height={50} />
        )}
        <MainInput
          id="content"
          width="80%"
          height="50px"
          placeholder="ㄹㅇㅋㅋ 만 치세요"
          maxLength={100}
        />
        <MainButton type="submit" width="60px" height="50px" content="입력" />
      </CommentForm>
      <CommentWrap>
        {commentList.map(item => {
          return (
            <CommunityCommentList
              key={item.community_comment_id}
              commentItem={item}
              deleteCommentHandler={deleteCommentHandler}
            />
          );
        })}
      </CommentWrap>
      {commentList.length === 0 ? null : (
        <Paging
          activePage={page}
          totalPage={totalPages}
          prevPageText={"<"}
          nextPageText={">"}
          handlePageChange={pagingHandler}
          maxItems={5}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 50px;
  width: 700px;
  @media only all and (max-width: 767px) {
    width: 100%;
  }
`;

const CommentForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & img {
    margin: 0 5px;
    border-radius: 50px;
  }
`;

const CommentWrap = styled.ul`
  margin-top: 50px;
  list-style: none;
`;
