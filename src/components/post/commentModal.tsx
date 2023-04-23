import styled from "styled-components";
import { useRouter } from "next/router";
import { useRef } from "react";
import { BoringAvatar } from "./boringAvatar";
import { MainTextArea } from "../tagsComponents/inputs";
import { FormEvents, TextAreaEvent } from "../sign";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import { addComment } from "@/redux/slice/commentSlice";
import { MdSend } from "react-icons/md";
import Image from "next/image";

interface Props {
  closeModal: () => void;
  showModal: boolean;
  page: number;
}

export const CommentModal = ({ closeModal, showModal, page }: Props) => {
  const {
    query: { id },
  } = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.userSlice);
  const comment = useRef("");
  const onChangeHandler = (e: TextAreaEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const value = target.value;
    comment.current = value;
  };
  const onSubmitHandler = async (e: FormEvents) => {
    e.preventDefault();
    const userData = {
      post_id: Number(id),
      nickname: user.nickname,
      avatar: user.avatar,
      page,
      content: comment.current,
    };
    dispatch(addComment(userData));
    comment.current = "";
    closeModal();
  };

  return (
    <ModalBackground
      onClick={closeModal}
      style={showModal ? { display: "block" } : { display: "none" }}
    >
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Modal onSubmit={onSubmitHandler}>
          {user.avatar === "" ? (
            <BoringAvatar />
          ) : (
            <Image src={user.avatar} width={40} height={40} alt="profile" />
          )}
          <MainTextArea
            width="80vw"
            height="40px"
            placeholder="댓글추가 ..."
            onChange={onChangeHandler}
          />
          <SendCommentBtn>
            <MdSend />
          </SendCommentBtn>
        </Modal>
      </ModalContainer>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  cursor: auto;
  display: flex;
  animation: commentModal 0.3s;
  @keyframes commentModal {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: -40px;
  transform: translate(-50%, -50%);
`;

const Modal = styled.form`
  width: 100vw;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  & img {
    width: 60px;
    height: 60px;
    padding: 5px;
    margin-right: 5px;
    border-radius: 50px;
  }
`;

const SendCommentBtn = styled.button`
  background: none;
  border: none;
  border-radius: 10px;
  & svg {
    width: 40px;
    height: 40px;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.mainColor};
    }
  }
  &:active {
    background-color: #dfdfdf;
  }
`;
