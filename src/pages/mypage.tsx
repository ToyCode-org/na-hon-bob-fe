import styled from "styled-components";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import {
  getMyInfo,
  updateAvatar,
  updateNickname,
} from "@/redux/slice/userSlice";
import { swalError } from "@/swal/swal";
import { imageUpload } from "@/util/imageUploadTest";
import { InputTarget } from "@/components/sign";
import { InputEvent } from "@/components/sign";
import { MainInput } from "@/components/tagsComponents/inputs";
import { MainButton } from "@/components/tagsComponents/buttons";
import { BoringAvatar } from "@/components/post/boringAvatar";
import { BiEdit } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import { postAPI } from "@/api/api";

export default function Mypage() {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector(state => state.userSlice);

  useEffect(() => {
    dispatch(getMyInfo());
  }, []);

  const avatarChangeHanlder = async (e: InputEvent) => {
    let target = e.target as InputTarget;
    let fileList = target.files as FileList;
    let file = fileList[0] as Blob;
    if (file) {
      let maxSize = 5 * 1024 * 1024;
      let fileSize = file.size;
      if (fileSize > maxSize) {
        swalError("첨부파일 사이즈는 5MB 이내로 등록 가능합니다.");
        return false;
      }
      const imageURL = await imageUpload(file);
      dispatch(updateAvatar(imageURL));
    }
  };

  const [editNickname, setEditNickname] = useState({
    editMode: false,
    nickname: "",
  });
  const editmodeHandler = () => {
    setEditNickname(prev => ({ ...prev, editMode: !prev.editMode }));
  };

  const editChangeHandler = (e: InputEvent) => {
    const target = e.target as InputTarget;
    const value = target.value;
    setEditNickname(prev => ({ ...prev, nickname: value }));
  };

  const onSubmitHandler = async () => {
    dispatch(updateNickname(editNickname.nickname));
    editmodeHandler();
  };

  return (
    <Container>
      <Avatar>
        {user?.avatar === "" ? (
          <BoringAvatar />
        ) : (
          <Image
            src={user?.avatar}
            width={300}
            height={300}
            alt="프로필"
            priority
          />
        )}
      </Avatar>
      <EditBtn htmlFor="avatar">
        <BiEdit />
      </EditBtn>
      <input
        id="avatar"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={avatarChangeHanlder}
      />
      <UserInfo>
        {editNickname.editMode ? (
          <EditForm onSubmit={onSubmitHandler}>
            <MainInput
              width="200px"
              height="30px"
              placeholder="2~15자"
              onChange={editChangeHandler}
            />
            <MainButton
              type="submit"
              width="50px"
              height="30px"
              content="수정"
            />
            <RiCloseCircleLine onClick={editmodeHandler} />
          </EditForm>
        ) : (
          <>
            <strong>닉네임 : {user.nickname} </strong>
            <BiEdit onClick={editmodeHandler} />
          </>
        )}
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
  display: flex;
  & svg {
    width: 300px;
    height: 300px;
    &:hover {
      color: ${props => props.theme.FontHoverColor};
    }
  }
  & img {
    object-fit: cover;
    border-radius: 50%;
  }
`;

const EditBtn = styled.label`
  display: flex;
  position: absolute;
  transform: translate(300%, 800%);
  width: 30px;
  height: 30px;
  font-size: 30px;
  background-color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const UserInfo = styled.div`
  margin-top: 50px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  & svg {
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.FontHoverColor};
    }
  }
`;

const EditForm = styled.form`
  display: flex;
  align-items: center;
`;
