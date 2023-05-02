import styled from "styled-components";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  MainInput,
  MainTextArea,
  MaxLengthChecker,
} from "@/components/tagsComponents/inputs";
import { MainButton, SubButton } from "@/components/tagsComponents/buttons";
import { FormEvents } from "@/components/sign";
import { goBack, forceGoBack } from "@/router/router";
import { swalError, swalQuestion, swalSuccess } from "@/swal/swal";
import { communityAPI } from "@/api/api";

export default function EidtCommunity() {
  const { query } = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const getOneCommunity = async (community_id: number) => {
    const {
      data: {
        data: { title, content },
      },
    } = await communityAPI.getOne(community_id);
    setFormData(prev => ({ ...prev, title, content }));
  };
  useEffect(() => {
    if (Number(query.id) >= 0) {
      getOneCommunity(Number(query.id));
    }
  }, [query.id]);

  const onChangeHandler = (e: FormEvents) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const name = target.name;
    const value = target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (e: FormEvents) => {
    e.preventDefault();
    swalQuestion("저장할까요?", "").then(async res => {
      if (res.value) {
        try {
          await communityAPI.updateCommunity(Number(query.id), formData);
          swalSuccess("저장완료!").then(() => {
            forceGoBack();
          });
        } catch (error) {
          swalError("알 수 없는 오류입니다.");
        }
      }
    });
  };
  return (
    <Container>
      <CommunityForm onChange={onChangeHandler} onSubmit={onSubmitHandler}>
        <MainInput
          name="title"
          width="100%"
          height="60px"
          placeholder="제목"
          maxLength={20}
          defaultValue={formData.title}
        />
        <MaxLengthChecker length={formData.title.length} maxLength={20} />
        <MainTextArea
          name="content"
          width="100%"
          height="150px"
          placeholder="내용"
          maxLength={500}
          defaultValue={formData.content}
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
            onClick={goBack}
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
