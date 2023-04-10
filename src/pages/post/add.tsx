import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import { BsCameraFill } from "react-icons/bs";
import { InputEvent, InputTarget } from "@/components/sign";

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
        let imageSubs = reader.result;
        setViewImage(imageSubs);
      };
    }
  };

  const formDataInit = {
    title: "",
    ingredient: "",
    description: "",
  };
  const [formState, setFormState] = useState(formDataInit);

  return (
    <Container>
      <AddRecipyForm>
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
  height: 800px;
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
