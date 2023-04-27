import styled from "styled-components";
import { PostHead } from "@/components/meta/posthead";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { goEditPost, goHome } from "@/router/router";
import { BoringAvatar } from "@/components/post/boringAvatar";
import { Acodian } from "@/components/post/acodian";
import { MediaQuery } from "@/hooks/useMediaQuery";
import { useMyPostCheck } from "@/hooks/useMyPostCheck";
import { TimeToToday } from "@/util/timeToToday";
import { postAPI } from "@/api/api";
import { swalSuccess, swalQuestion } from "@/swal/swal";
import { useAppDispatch } from "@/redux/useRedux";
import { deletePost } from "@/redux/slice/postSlice";
import { BiEdit } from "react-icons/bi";
import { CgCloseR } from "react-icons/cg";

type PostType = {
  post_id: number;
  user_id: number;
  thumbnail: string;
  title: string;
  ingredient: string;
  description: string;
  createdAt: string;
  avatar: string;
  nickname: string;
};

export default function Post({
  post_id,
  user_id,
  thumbnail,
  title,
  ingredient,
  description,
  createdAt,
  avatar,
  nickname,
}: PostType) {
  const display = MediaQuery();
  const dispatch = useAppDispatch();
  const isMyData = useMyPostCheck(user_id);

  const deletePostById = async () => {
    swalQuestion("게시글을 삭제할까요?", "삭제한 글은 복구되지 않습니다.").then(
      async res => {
        if (res.value) {
          try {
            dispatch(deletePost(post_id));
            swalSuccess("삭제 완료!").then(() => {
              goHome();
            });
          } catch (e) {}
        }
      },
    );
  };

  return (
    <Container>
      <PostHead
        title={title}
        ingredient={ingredient}
        description={description}
      />
      <IconBtn style={isMyData ? {} : { display: "none" }}>
        <BiEdit onClick={() => goEditPost(post_id)} />
        <CgCloseR className="delete" onClick={deletePostById} />
      </IconBtn>
      <ContentWrap>
        <Image
          src={thumbnail}
          alt="food Image"
          width={400}
          height={400}
          priority
        />
        <UserInfo>
          <InfoHead>
            {avatar === "" ? (
              <BoringAvatar />
            ) : (
              <Image
                src={avatar}
                width={50}
                height={50}
                alt="프로필"
                priority
              />
            )}
            <span>{nickname}</span>
          </InfoHead>
          <InfoEnd>{TimeToToday(+new Date(createdAt))}</InfoEnd>
        </UserInfo>
        <PreContent>
          <h1>{title}</h1>
          <h3>재료</h3>
          <IngredientGrid>
            {ingredient.split(",").map((value, index) => {
              return (
                <IngredientItem key={index}>
                  <span>{value}</span>
                </IngredientItem>
              );
            })}
          </IngredientGrid>
        </PreContent>
        <Content>
          <h2>레시피!</h2>
          <pre>{description}</pre>
        </Content>
      </ContentWrap>
      <Acodian />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const param = params as ParsedUrlQuery;
  const res = await postAPI.getPostOne(Number(param.id));

  const {
    post_id,
    user_id,
    thumbnail,
    title,
    ingredient,
    description,
    createdAt,
    user: { nickname, avatar },
  } = res.data.data[0];
  const data = {
    post_id,
    user_id,
    thumbnail,
    title,
    ingredient,
    description,
    createdAt,
    nickname,
    avatar,
  };

  return {
    props: data,
  };
};

const Container = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconBtn = styled.div`
  position: absolute;
  transform: translate(185%, 50%);
  & svg {
    margin: 0 5px;
    font-size: 30px;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
    &.delete {
      color: red;
    }
  }
  @media only all and (max-width: 767px) {
    position: absolute;
    top: 120px;
    right: 180px;
  }
`;

const ContentWrap = styled.main`
  width: 400px;
  & img {
    object-fit: cover;
  }
  @media only all and (max-width: 767px) {
    width: 100%;
    & img {
      width: 100%;
      height: 90vw;
    }
  }
`;

const UserInfo = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-top: 1px solid ${props => props.theme.componentBorderColor};
  border-bottom: 1px solid ${props => props.theme.componentBorderColor};
  @media only all and (max-width: 767px) {
    padding: 30px 30px;
  }
`;
const InfoHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & span {
    margin: 0 5px;
  }
  & img {
    border-radius: 50px;
    @media only all and (max-width: 767px) {
      width: 50px;
      height: 50px;
    }
  }
`;

const InfoEnd = styled.div``;

const PreContent = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.componentBorderColor};
  & h1 {
    margin-bottom: 10px;
  }
  @media only all and (max-width: 767px) {
    padding: 30px 30px;
  }
`;

const IngredientGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 5px;
  height: max-content;
`;
const IngredientItem = styled.li`
  margin: 0 4px;
  padding: 1px 7px;
  width: max-content;
  border-radius: 10px;
  background-color: ${props => props.theme.componentBackground};

  cursor: pointer;
  & span {
    font-weight: bold;
    text-align: center;
  }
  &:hover {
    background-color: ${props => props.theme.hoverBackground};
  }
`;
const Content = styled.div`
  padding: 10px;

  & h2 {
    margin-bottom: 10px;
  }
  & pre {
    font-size: 1rem;
  }
  @media only all and (max-width: 767px) {
    padding: 30px 30px;
  }
`;
