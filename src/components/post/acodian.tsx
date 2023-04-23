import styled from "styled-components";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { BoringAvatar } from "./boringAvatar";
import { Comment } from "./comment";
import { CommentsData } from ".";
import { RiCloseLine } from "react-icons/ri";
import { CommentModal } from "./commentModal";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import { getCommentAll } from "@/redux/slice/commentSlice";
import { useRouter } from "next/router";

export const Acodian = () => {
  const {
    query: { id },
  } = useRouter();
  const dispatch = useAppDispatch();
  const { comment, isLoading, error, totalPages } = useAppSelector(
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

  const page = useRef(1);

  useEffect(() => {
    dispatch(getCommentAll({ post_id: Number(id), page: page.current }));
  }, []);
  console.log(comment);
  return (
    <AcodianWrap>
      <CommentsLine>
        <summary>댓글보기 ({comment.length})</summary>
        <CommentsLineTop>
          <span>댓글 ({comment.length})</span>
          <CloseBtn onClick={closeDetailse}>
            <RiCloseLine />
          </CloseBtn>
        </CommentsLineTop>
        <p>댓글을 사용할 때는 타인을 존중해주세요</p>
        <AddComment>
          <BoringAvatar />
          <span onClick={openModal}>댓글 추가 ...</span>
        </AddComment>
        {comment.map(comment => {
          return <Comment key={comment.comment_id} commentData={comment} />;
        })}
      </CommentsLine>
      <CommentModal
        closeModal={closeModal}
        showModal={showModal}
        page={page.current}
      />
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
  }
  & span {
    margin: 0 5px;
    color: gray;
    font-size: 14px;
  }
`;
