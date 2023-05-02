import styled from "styled-components";
import { useState } from "react";
import {
  MainInput,
  MainTextArea,
  MaxLengthChecker,
} from "@/components/tagsComponents/inputs";
import { MainButton, SubButton } from "@/components/tagsComponents/buttons";
import { FormEvents } from "@/components/sign";

export default function EidtCommunity() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const onChangeHandler = (e: FormEvents) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const name = target.name;
    const value = target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (e: FormEvents) => {
    e.preventDefault();
    console.log("submit");
  };
  console.log(formData);
  return (
    <Container>
      <CommunityForm onChange={onChangeHandler} onSubmit={onSubmitHandler}>
        <MainInput
          name="title"
          width="100%"
          height="60px"
          placeholder="제목"
          maxLength={20}
        />
        <MaxLengthChecker length={formData.title.length} maxLength={20} />
        <MainTextArea
          name="content"
          width="100%"
          height="150px"
          placeholder="내용"
          maxLength={500}
        />
        <MaxLengthChecker length={formData.content.length} maxLength={500} />
        <ButtonsWrap>
          <MainButton
            type="submit"
            width="100px"
            height="40px"
            content="저장하기"
          />
          <SubButton
            type="button"
            width="100px"
            height="40px"
            content="돌아가기"
          />
        </ButtonsWrap>
      </CommunityForm>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 150px;
  display: flex;
  justify-content: center;
`;

const CommunityForm = styled.form`
  width: 50%;
  & input {
    margin-bottom: 10px;
  }
  @media only all and (max-width: 767px) {
    width: 90%;
  }
`;

const ButtonsWrap = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  & button {
    margin: 0 20px;
  }
`;
