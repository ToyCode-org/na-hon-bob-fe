import styled from "styled-components";
import Image from "next/image";
import { BoringAvatar } from "./boringAvatar";
import { CommentsData } from ".";
import { useState } from "react";
import { TimeToToday } from "@/util/timeToToday";
import { MainInput } from "../tagsComponents/inputs";
import { MainButton } from "../tagsComponents/buttons";
import { FormEvents } from "../sign";
import { swalQuestion } from "@/swal/swal";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import { deleteComment, updateComment } from "@/redux/slice/commentSlice";
import { CiMenuKebab } from "react-icons/ci";
import { RiCloseLine } from "react-icons/ri";

interface Props {
  commentData: CommentsData;
}

export const Comment = ({ commentData }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.userSlice);

  const [menuOpen, setmenuOpen] = useState({
    menuOpen: false,
    editMode: false,
  });
  const commentMenuHandler = () => {
    setmenuOpen(prev => ({ ...prev, menuOpen: !menuOpen.menuOpen }));
  };
  const editHandler = () => {
    commentMenuHandler();
    setmenuOpen(prev => ({ ...prev, editMode: true }));
  };
  const editSubmitHandler = async (e: FormEvents) => {
    e.preventDefault();
    const target = document.getElementById("editComment") as HTMLInputElement;
    const value = target.value;
    const payload = {
      comment_id: commentData.comment_id,
      content: value,
    };
    dispatch(updateComment(payload));
    setmenuOpen(prev => ({ ...prev, editMode: false }));
  };
  const onDelete = () => {
    swalQuestion("정말 삭제할까요?", "삭제된 댓글은 복구되지 않습니다.").then(
      async res => {
        if (res.value) {
          try {
            dispatch(deleteComment(commentData.comment_id));
          } catch (e) {
            console.log(e);
          }
        }
      },
    );
  };

  return (
    <Container>
      <CommentsWrap>
        <UserInfo>
          {commentData.user.avatar === "" ? (
            <BoringAvatar />
          ) : (
            <Image
              src={commentData.user.avatar}
              width={40}
              height={40}
              alt="profile"
            />
          )}
          <span>{commentData.user.nickname}</span>
        </UserInfo>
        <MenuIcon
          onClick={commentMenuHandler}
          style={commentData.isEditable ? {} : { display: "none" }}
        >
          <CiMenuKebab />
        </MenuIcon>
      </CommentsWrap>
      {!menuOpen.editMode ? (
        <Content>{commentData.content}</Content>
      ) : (
        <EditForm onSubmit={editSubmitHandler}>
          <MainInput
            id="editComment"
            width="80%"
            height="40px"
            defaultValue={commentData.content}
          />
          <MainButton type="submit" width="20%" height="40px" content="수정" />
        </EditForm>
      )}

      <CreatedAt>{TimeToToday(+new Date(commentData.createdAt))}</CreatedAt>
      <CommentMenu style={menuOpen.menuOpen ? {} : { display: "none" }}>
        <Buttons type="button" onClick={onDelete}>
          삭제하기
        </Buttons>
        <Buttons type="button" onClick={editHandler}>
          수정하기
        </Buttons>
        <CloseIcon onClick={commentMenuHandler}>
          <RiCloseLine />
        </CloseIcon>
      </CommentMenu>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid ${props => props.theme.componentBorderColor};
`;
const CommentsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  & span {
    margin: 0 5px;
  }
  & img {
    border-radius: 50px;
  }
`;
const MenuIcon = styled.div`
  cursor: pointer;
  & svg {
    font-size: 25px;
    &:hover {
      color: ${props => props.theme.wholeBackground};
    }
  }
`;
const Content = styled.pre`
  padding: 10px;
`;
const CreatedAt = styled.div`
  padding: 0 10px;
  font-size: 12px;
  text-align: right;
  color: ${props => props.theme.createdAt};
`;
const EditForm = styled.form`
  margin-top: 10px;
`;

const CommentMenu = styled.div`
  position: absolute;
  transform: translate(280%, -110%);
  width: 100px;
  height: 80px;
  background-color: #ffffff;
  border: 2px solid ${props => props.theme.borderColor};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border: none;
  @media only all and (max-width: 767px) {
    right: 300px;
  }
`;
const Buttons = styled.button`
  padding: 5px;
  display: flex;
  border-radius: 8px;
  width: 100%;
  height: 50%;
  text-align: center;
  font-size: 15px;
  border: none;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #a5a5a5;
  }
`;
const CloseIcon = styled.div`
  position: absolute;
  font-size: 20px;
  transform: translate(365%, -275%);
  cursor: pointer;
`;
