import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import { InputEvent, InputTarget, FormEvents } from "@/components/sign";
import { MainInput, MainTextArea } from "@/components/tagsComponents/inputs";
import { MainButton, CancelButton } from "@/components/tagsComponents/buttons";
import { goHome } from "@/router/router";
import { postAPI } from "@/api/api";
import { imageUpload } from "@/util/imageUploadTest";
import { swalError, swalQuestion, swalSuccess } from "@/swal/swal";

export default function AddPost() {
  const [viewImage, setViewImage] = useState<string | ArrayBuffer | null>("");
  const [uploadImage, setUploadImage] = useState<string | Blob>("");

  const imageUploader = (e: InputEvent) => {
    let target = e.target as InputTarget;
    let fileList = target.files as FileList;
    let file = fileList[0];
    if (file) {
      let maxSize = 5 * 1024 * 1024;
      let fileSize = file.size;
      if (fileSize > maxSize) {
        alert("첨부파일 사이즈는 5MB 이내로 등록 가능합니다.");
        return false;
      }
      setUploadImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result;
        setViewImage(base64data);
      };
    }
  };

  const formDataInit = {
    title: "",
    ingredient: "",
    description: "",
  };
  const keyArray = Object.keys(formDataInit);
  const placeholderArray = ["오늘의 요리는?", "재료", "레시피"];

  const [formState, setFormState] = useState(formDataInit);
  const onChangehansler = (e: FormEvents) => {
    const target = e.target as InputTarget;
    const name = target.name;
    const value = target.value;
    if (name !== "") {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  const onSubmitHandler = async (e: FormEvents) => {
    e.preventDefault();
    const { title, ingredient, description } = formState;
    if (
      title === "" ||
      ingredient === "" ||
      description === "" ||
      uploadImage === ""
    ) {
      swalError("내용을 입력해주세요");
    } else {
      swalQuestion("레시피를 저장할까요?", "").then(async res => {
        if (res.value) {
          try {
            const uploadUrl = await imageUpload(uploadImage as Blob);
            const formData = {
              thumbnail: uploadUrl,
              title,
              ingredient,
              description,
            };
            const res = await postAPI.createPost(formData);
            const dispatchData = res.data.data;
            swalSuccess("저장 완료!");
          } catch (error) {
            swalError("알 수 없는 오류입니다.");
          }
        }
      });
    }
  };

  return (
    <Container>
      <AddRecipyForm onChange={onChangehansler} onSubmit={onSubmitHandler}>
        <label htmlFor="addImage">
          <AddImage style={viewImage === "" ? {} : { display: "none" }}>
            <BsCameraFill />
            <p>완성된 요리 사진을 올려보세요!</p>
            <span>(최대 1장)</span>
          </AddImage>
          <ViewImage style={viewImage === "" ? { display: "none" } : {}}>
            <Image
              src={viewImage as string}
              width={350}
              height={300}
              alt="업로드 이미지"
            />
          </ViewImage>
        </label>
        <input
          id="addImage"
          accept="image/*"
          type="file"
          style={{ display: "none" }}
          onChange={imageUploader}
        />
        <InputsWrap>
          {keyArray.map((name, index) => {
            if (index < keyArray.length - 1) {
              return (
                <MainInput
                  key={index}
                  name={name}
                  placeholder={placeholderArray[index]}
                  autoComplete="off"
                  width="350px"
                  height="50px"
                />
              );
            } else {
              return (
                <MainTextArea
                  key={index}
                  name={name}
                  placeholder={placeholderArray[index]}
                  width="350px"
                  height="280px"
                />
              );
            }
          })}
        </InputsWrap>
        <ButtonsWrap>
          <MainButton
            type="submit"
            width="80px"
            height="40px"
            content="포스팅"
          />
          <CancelButton
            type="button"
            width="80px"
            height="40px"
            content="홈으로"
            onClick={goHome}
          />
        </ButtonsWrap>
      </AddRecipyForm>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 100px;
`;
const AddRecipyForm = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const AddImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 300px;
  border: 1px solid ${props => props.theme.mainBorderColor};
  border-radius: 10px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #e6e6e680;
  }
  & svg {
    width: 100px;
    height: 100px;
    color: ${props => props.theme.mainColor};
  }
`;

const ViewImage = styled.div`
  width: 350px;
  height: 300px;
  cursor: pointer;

  & img {
    border: 1px solid ${props => props.theme.mainBorderColor};
    border-radius: 10px;
  }
`;

const InputsWrap = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;

  & input {
    margin-bottom: 30px;
  }
`;

const ButtonsWrap = styled.div`
  margin-top: 30px;
  & button {
    margin: 0 10px;
  }
`;
