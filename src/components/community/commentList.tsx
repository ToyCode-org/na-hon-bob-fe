import styled from "styled-components";
import Image from "next/image";
import { useState, useRef } from "react";
import { CommunityList } from ".";
import { BoringAvatar } from "../post/boringAvatar";
import { BiEdit } from "react-icons/bi";
import { CgCloseR } from "react-icons/cg";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { TimeToToday } from "@/util/timeToToday";
import { MainTextArea } from "../tagsComponents/inputs";
import { MainButton } from "../tagsComponents/buttons";
import { TextAreaEvent } from "../sign";
import { community_commentAPI } from "@/api/api";
import { swalError } from "@/swal/swal";

interface Props {
  commentItem: CommunityList;
  deleteCommentHandler: (community_comment_id: number) => void;
}

export const CommunityCommentList = ({
  commentItem: {
    community_comment_id,
    user: { nickname, avatar },
    content,
    createdAt,
    isEditable,
    isLiked,
    likes_count,
  },
  deleteCommentHandler,
}: Props) => {
  const [cardState, setCardState] = useState({
    editMode: false,
    content,
    isLiked,
    likes_count,
  });

  const editModeHandler = () => {
    setCardState(prev => ({ ...prev, editMode: !prev.editMode }));
  };

  const editValue = useRef(content);
  const onChangeHandler = (e: TextAreaEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    editValue.current = value;
  };

  const editSubmitHandler = async () => {
    const editContent = {
      content: editValue.current,
    };
    await community_commentAPI.editComment(community_comment_id, editContent);
    editModeHandler();
  };

  const updateLikeHandler = async () => {
    try {
      await community_commentAPI.updateLike(community_comment_id);
      if (cardState.isLiked) {
        setCardState(prev => ({
          ...prev,
          isLiked: false,
          likes_count: prev.likes_count - 1,
        }));
      } else {
        setCardState(prev => ({
          ...prev,
          isLiked: true,
          likes_count: prev.likes_count + 1,
        }));
      }
    } catch (error) {
      swalError("알 수 없는 오류입니다.");
    }
  };

  return (
    <CommentList>
      <CardHeader>
        <UserInfo>
          {avatar === "" ? (
            <BoringAvatar />
          ) : (
            <Image src={avatar} width={50} height={50} alt="profile" />
          )}
          <span>{nickname}</span>
        </UserInfo>
        <IconBtn style={isEditable ? {} : { display: "none" }}>
          <BiEdit onClick={editModeHandler} />
          <CgCloseR
            className="delete"
            onClick={() => deleteCommentHandler(community_comment_id)}
          />
        </IconBtn>
      </CardHeader>
      <Content>
        {cardState.editMode ? (
          <>
            <MainTextArea
              width="80%"
              height="40px"
              defaultValue={content}
              placeholder="댓글을 입력해주세요"
              onChange={onChangeHandler}
            />
            <MainButton
              width="50px"
              height="40px"
              content="입력"
              onClick={editSubmitHandler}
            />
          </>
        ) : (
          editValue.current
        )}
      </Content>
      <CardFooter>
        <span onClick={updateLikeHandler}>
          {cardState.isLiked ? <AiTwotoneLike /> : <AiOutlineLike />}
          {cardState.likes_count}
        </span>
        <span>|</span>
        <span>{TimeToToday(+new Date(createdAt))}</span>
      </CardFooter>
    </CommentList>
  );
};

const CommentList = styled.li`
  padding: 10px;
  border: 1px solid lightgray;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & img {
    margin-right: 10px;
    border-radius: 50px;
  }
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const IconBtn = styled.div`
  & svg {
    margin: 0 5px;
    font-size: 20px;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
    &.delete {
      color: red;
    }
  }
  /* @media only all and (max-width: 767px) {
    transform: translate(635%, -40%);
  } */
`;

const Content = styled.div`
  padding: 10px 20px;
  display: flex;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 0.9rem;
  color: gray;
  user-select: none;
  & svg {
    margin-right: 5px;
    font-size: 1.4rem;
    border-radius: 50px;
    cursor: pointer;
    &:hover {
      background-color: #a1a1a170;
    }
  }
  & span {
    margin: 0 5px;
    display: flex;
    align-items: center;
  }
  & span:first-child {
    color: black;
  }
`;
