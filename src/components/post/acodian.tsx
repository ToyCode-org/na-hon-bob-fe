import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { BoringAvatar } from "./boringAvatar";
import { Comment } from "./comment";
import { RiCloseLine } from "react-icons/ri";
import { CommentModal } from "./commentModal";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import { getCommentAll } from "@/redux/slice/commentSlice";

export const Acodian = () => {
  const {
    query: { id },
  } = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.userSlice);
  const { comment, isLoading, page, hasNextPage } = useAppSelector(
    state => state.commentSlice,
  );

  const closeDetailse = () => {
    const details = document.querySelector("details");
    details?.removeAttribute("open");
  };

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const getComment = async () => {
    if (hasNextPage && !isLoading) {
      dispatch(getCommentAll({ post_id: Number(id), page }));
    }
  };

  const commentObserverRef: any = useRef();
  const commentObserver = async (node: any) => {
    if (isLoading) return;
    if (commentObserverRef.current) commentObserverRef.current.disconnect();
    commentObserverRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        getComment();
      }
    });
    node && commentObserverRef.current.observe(node);
  };

  return (
    <AcodianWrap>
      <CommentsLine>
        <summary>댓글보기</summary>
        <CommentsLineTop>
          <span>댓글 ({comment.length})</span>
          <CloseBtn onClick={closeDetailse}>
            <RiCloseLine />
          </CloseBtn>
        </CommentsLineTop>
        <p>댓글을 사용할 때는 타인을 존중해주세요</p>
        <AddComment>
          {user.avatar === "" ? (
            <BoringAvatar />
          ) : (
            <Image src={user.avatar} width={40} height={40} alt="profile" />
          )}
          <span onClick={openModal}>댓글 추가 ...</span>
        </AddComment>
        {comment.map(comment => {
          return <Comment key={comment.comment_id} commentData={comment} />;
        })}
        <IoTarget
          id="observeTarget_comment"
          ref={commentObserver}
          style={isLoading ? { display: "none" } : { display: "block" }}
        ></IoTarget>
      </CommentsLine>
      <CommentModal closeModal={closeModal} showModal={showModal} page={page} />
    </AcodianWrap>
  );
};

const AcodianWrap = styled.div`
  margin-top: 50px;
  padding: 20px 5px;
  display: flex;
  flex-direction: column;
  width: 400px;
  border-top: 1px solid ${props => props.theme.componentBorderColor};
  border-bottom: 1px solid ${props => props.theme.componentBorderColor};
  @media only all and (max-width: 767px) {
    width: 100%;
  }
`;

const CommentsLine = styled.details`
  padding: 5px;
  width: 100%;
  & p {
    padding: 5px;
  }
  & summary {
    cursor: pointer;
  }
  & summary::marker {
    content: "";
  }
  &[open] summary {
    display: none;
  }
  & summary:before {
  }
  & summary ~ * {
    animation: closeComments 0.6s;
    @keyframes closeComments {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }
  &[open] summary ~ * {
    animation: opneComments 0.6s;
    @keyframes opneComments {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;

const CommentsLineTop = styled.div`
  padding: 5px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  & span {
    font-size: 22px;
  }
`;
const CloseBtn = styled.div`
  cursor: pointer;
  & svg {
    font-size: 30px;
  }
`;

const AddComment = styled.div`
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  & img {
    margin-right: 10px;
    border-radius: 50px;
  }
  & span {
    margin: 0 5px;
    color: gray;
    font-size: 14px;
  }
`;

const IoTarget = styled.div``;
