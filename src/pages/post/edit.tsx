import styled from "styled-components";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { BsCameraFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  InputEvent,
  InputTarget,
  FormEvents,
  ButtonEvent,
} from "@/components/sign";
import { MainInput, MainTextArea } from "@/components/tagsComponents/inputs";
import { MainButton, CancelButton } from "@/components/tagsComponents/buttons";
import { imageUpload } from "@/util/imageUploadTest";
import { swalError, swalQuestion, swalSuccess } from "@/swal/swal";
import { useRouter } from "next/router";
import { postAPI } from "@/api/api";
import { goHome, goPost } from "@/router/router";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import { forceLoading, updatePost } from "@/redux/slice/postSlice";
import { EclipsLoadingSpinner } from "@/util/eclipsLoadingSpinner";
import { cancelPosting } from "@/components/post/postFNs";

export default function Edit() {
  const {
    query: { id },
  } = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.postSlice);
  const [viewImage, setViewImage] = useState<string | ArrayBuffer | null>("");
  const [uploadImage, setUploadImage] = useState<string | Blob>("");

  const imageUploader = (e: InputEvent) => {
    let target = e.target as InputTarget;
    let fileList = target.files as FileList;
    let file = fileList[0];
    if (file) {
      let maxSize = 3 * 1024 * 1024;
      let fileSize = file.size;
      if (fileSize > maxSize) {
        alert("첨부파일 사이즈는 3MB 이내로 등록 가능합니다.");
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

  const [ingredientArr, setIngredientArr] = useState<string[]>([]);
  const [formState, setFormState] = useState(formDataInit);

  const getEditData = async () => {
    const res = await postAPI.getPostOne(Number(id));
    const { thumbnail, title, ingredient, description } = res.data.data[0];
    const ingredientArr = ingredient.split(",");
    const data = {
      title,
      ingredient: "",
      description,
    };
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const descriptionInput = document.getElementById(
      "description",
    ) as HTMLTextAreaElement;
    titleInput.value = title;
    descriptionInput.value = description;
    setViewImage(thumbnail);
    setIngredientArr(ingredientArr);
    setFormState(data);
  };
  useEffect(() => {
    getEditData();
  }, []);

  const addIngredient = (e: ButtonEvent) => {
    e.stopPropagation();
    if (
      formState.ingredient !== "" &&
      (e.key === "Enter" || e.target.nodeName === "BUTTON")
    ) {
      e.preventDefault();
      setIngredientArr(prev => prev.concat(formState.ingredient));
      const ingredientInput = document.getElementById(
        "ingredient",
      ) as HTMLInputElement;
      ingredientInput.value = "";
      setFormState(prev => ({ ...prev, ["ingredient"]: "" }));
    }
  };
  const removeIngredient = (index: number) => {
    setIngredientArr(prev => prev.filter((v, i) => i !== index));
  };

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
    if (title === "") return swalError("제목을 입력해주세요");
    if (description === "") return swalError("내용을 입력해주세요.");

    swalQuestion("레시피를 저장할까요?", "").then(async res => {
      if (res.value) {
        try {
          dispatch(forceLoading());
          const uploadUrl =
            uploadImage === "" ? "" : await imageUpload(uploadImage as Blob);
          const ingredient = ingredientArr.join(",");
          const formData = {
            thumbnail: uploadUrl,
            title,
            ingredient,
            description,
          };
          dispatch(
            updatePost({
              post_id: Number(id),
              formData,
            }),
          );
          swalSuccess("저장 완료!").then(() => {
            goPost(Number(id));
          });
        } catch (error) {
          swalError("알 수 없는 오류입니다.");
        }
      }
    });
  };

  return (
    <Container>
      {isLoading ? <EclipsLoadingSpinner /> : null}
      <AddRecipyForm onChange={onChangehansler} onSubmit={onSubmitHandler}>
        <label htmlFor="addImage">
          <AddImage style={viewImage === "" ? {} : { display: "none" }}>
            <BsCameraFill />
            <p>완성된 요리 사진을 올려보세요!</p>
            <span>(최대 1장 3MB 이하)</span>
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
                <React.Fragment key={index}>
                  {index === 1 ? (
                    <AddIngredientDiv>
                      <MainInput
                        id={name}
                        name={name}
                        onKeyDown={addIngredient}
                        maxLength={10}
                        placeholder={placeholderArray[index]}
                        autoComplete="off"
                        width="350px"
                        height="50px"
                      />
                      <MainButton
                        onClick={addIngredient}
                        type="button"
                        width="100%"
                        height="40px"
                        content="재료 추가"
                      />
                    </AddIngredientDiv>
                  ) : (
                    <MainInput
                      id={name}
                      name={name}
                      placeholder={placeholderArray[index]}
                      autoComplete="off"
                      width="350px"
                      height="50px"
                    />
                  )}
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={index}>
                  <PreContent>
                    <IngredientGrid>
                      {ingredientArr.map((value, index) => {
                        return (
                          <React.Fragment key={index}>
                            <IngredientItem
                              onClick={() => removeIngredient(index)}
                            >
                              <DeleteIcon>
                                <AiOutlineCloseCircle />
                              </DeleteIcon>
                              {value}
                            </IngredientItem>
                          </React.Fragment>
                        );
                      })}
                    </IngredientGrid>
                  </PreContent>
                  <MainTextArea
                    id={name}
                    name={name}
                    placeholder={placeholderArray[index]}
                    width="350px"
                    height="280px"
                  />
                </React.Fragment>
              );
            }
          })}
        </InputsWrap>
        <ButtonsWrap>
          <MainButton
            type="submit"
            width="80px"
            height="40px"
            content="수정하기"
          />
          <CancelButton
            type="button"
            width="80px"
            height="40px"
            content="홈으로"
            onClick={cancelPosting}
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
    margin-bottom: 15px;
  }
  & textarea {
    margin-top: 30px;
  }
`;

const PreContent = styled.div`
  padding: 10px;
  width: 350px;
  & h1 {
    margin-bottom: 10px;
  }
`;

const IngredientGrid = styled.ul`
  list-style: none;
`;
const IngredientItem = styled.li`
  margin: 2px 4px;
  margin-top: 10px;
  padding: 5px 7px;
  width: max-content;
  border-radius: 10px;
  background-color: ${props => props.theme.componentBackground};
  font-weight: bold;
  text-align: center;
  user-select: none;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.hoverBackground};
  }
`;

const DeleteIcon = styled.span`
  position: absolute;
  transform: translate(-135%, 5%);
  & svg {
    cursor: pointer;
  }
`;

const AddIngredientDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsWrap = styled.div`
  margin-top: 30px;
  & button {
    margin: 0 10px;
  }
`;
