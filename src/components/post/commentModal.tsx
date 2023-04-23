import styled from "styled-components";
import { MdSend } from "react-icons/md";
import { BoringAvatar } from "./boringAvatar";
import { MainTextArea } from "../tagsComponents/inputs";

interface Props {
  closeModal: () => void;
  showModal: boolean;
}

export const CommentModal = ({ closeModal, showModal }: Props) => {
  return (
    <ModalBackground
      onClick={closeModal}
      style={showModal ? { display: "block" } : { display: "none" }}
    >
      <ModalContainer onClick={e => e.stopPropagation()}>
        <Modal>
          <BoringAvatar />
          <MainTextArea width="80vw" height="40px" placeholder="댓글추가 ..." />
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
  z-index: 0;
  cursor: auto;
  display: flex;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: -40px;
  transform: translate(-50%, -50%);
`;

const Modal = styled.div`
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
  }
  & textarea {
    /* width: 80vw;
    height: 40px; */
    /* resize: none;
    border: none;
    font-size: 20px;
    font-weight: bold; */
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
