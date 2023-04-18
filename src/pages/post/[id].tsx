import styled from "styled-components";
import Image from "next/image";
import { BoringAvatar } from "@/components/post/boringAvatar";
import { TimeToToday } from "@/util/timeToToday";
import { MediaQuery } from "@/hooks/useMediaQuery";
import { GetServerSideProps, GetStaticPaths } from "next";
import { postAPI } from "@/api/api";
import { ParsedUrlQuery } from "querystring";

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
  const mockOb = {
    thumbnail: "/images/egg.png",
    title: "맛있는 라면모음",
    ingredient: ["라면", "스프", "참깨"],
    description: "어떻게 만들고 어떻게 만든다 웅웅",
    avatar: "",
    nickname: "yamyam",
    createdAt: "2023-04-10",
  };

  return (
    <Container>
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
                width={36}
                height={46}
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
          <IngredientGrid>
            {mockOb.ingredient.map((value, index) => {
              return <IngredientItem key={index}>{value}</IngredientItem>;
            })}
          </IngredientGrid>
        </PreContent>
        <Content>
          <h2>레시피!</h2>
          <pre>{description}</pre>
        </Content>
      </ContentWrap>
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
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ContentWrap = styled.main`
  width: 400px;
  height: 800px;
  & img {
  }
`;

const UserInfo = styled.div`
  padding: 10px;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  border-top: 1px solid ${props => props.theme.componentBorderColor};
  border-bottom: 1px solid ${props => props.theme.componentBorderColor};
`;
const InfoHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & span {
    margin: 0 5px;
  }
`;

const InfoEnd = styled.div``;

const PreContent = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.componentBorderColor};
  & h1 {
    margin-bottom: 10px;
  }
`;

const IngredientGrid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
const IngredientItem = styled.li`
  margin: 2px 4px;
  padding: 2px 7px;
  border-radius: 10px;
  background-color: ${props => props.theme.componentBackground};
  font-weight: bold;
  cursor: pointer;

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
`;
