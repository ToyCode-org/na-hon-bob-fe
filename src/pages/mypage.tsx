import styled from "styled-components";
import Image from "next/image";
import { useState, useEffect } from "react";
import { BoringAvatar } from "@/components/post/boringAvatar";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import { getMyInfo, updateAvatar } from "@/redux/slice/userSlice";
import { BiEdit } from "react-icons/bi";
import { InputTarget } from "@/components/sign";
import { swalError } from "@/swal/swal";
import { InputEvent } from "@/components/sign";
import { imageUpload } from "@/util/imageUploadTest";

export default function Mypage() {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector(state => state.userSlice);

  useEffect(() => {
    dispatch(getMyInfo());
  }, []);
  console.log(user);

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

  const editAvatarHandler = () => {};
  const editNicknameHandler = () => {};
  return (
    <Container>
      <Avatar>
        {user.avatar === "" ? (
          <BoringAvatar />
        ) : (
          <Image src={user.avatar} width={200} height={200} alt="프로필" />
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
        <strong>닉네임</strong> : {user.nickname} <BiEdit />
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
    width: 200px;
    height: 200px;
  }
  & img {
    object-fit: cover;
    border-radius: 50%;
  }
`;

const EditBtn = styled.label`
  display: flex;
  position: absolute;
  transform: translate(220%, 500%);
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
`;
