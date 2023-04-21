import styled from "styled-components";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BoringAvatar } from "./boringAvatar";
import { commentAPI } from "@/api/api";
import { Comment } from "./comment";
import { CommentsData } from ".";
import { RiCloseLine } from "react-icons/ri";
import { CommentModal } from "./commentModal";

export const Acodian = () => {
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

  const [commentData, setCommentData] = useState<CommentsData[]>([]);
  const getCommentData = async () => {
    const res = await commentAPI.getCommentByPostIdPaging(18, 1);
    setCommentData(res.data.data);
  };
  useEffect(() => {
    getCommentData();
  }, []);
  console.log(commentData);
  return (
    <AcodianWrap>
      <CommentsLine>
        <summary>댓글보기</summary>
        <CommentsLineTop>
          <span>댓글 ({commentData.length})</span>
          <CloseBtn onClick={closeDetailse}>
            <RiCloseLine />
          </CloseBtn>
        </CommentsLineTop>
        <p>댓글을 사용할 때는 타인을 존중해주세요</p>
        <AddComment>
          <BoringAvatar />
          <span onClick={openModal}>댓글 추가 ...</span>
        </AddComment>
        {commentData.map((comment, index) => {
          return <Comment key={comment.comment_id} commentData={comment} />;
        })}
      </CommentsLine>
      <CommentModal closeModal={closeModal} showModal={showModal} />
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
`;

const CommentsLine = styled.details`
  padding: 5px;
  width: 100%;
  & p {
    padding: 5px;
  }
  & summary {
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
    color: gray;
    font-size: 14px;
  }
`;
