import styled from "styled-components";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BoringAvatar } from "../post/boringAvatar";
import { MediaQuery } from "@/hooks/useMediaQuery";
import { goPost } from "../../router/router";
import { postAPI } from "@/api/api";
import { TimeToToday } from "@/util/timeToToday";
import { useAppDispatch, useAppSelector } from "@/redux/useRedux";
import { getPostAll } from "@/redux/slice/postSlice";

export const HomeGrid = () => {
  const dispatch = useAppDispatch();
  const { post, isLoading, error, totalPages } = useAppSelector(
    state => state.postSlice,
  );
  console.log(post);
  const mediaData = MediaQuery();

  const mockOb = {
    thumbnail: "/images/egg.png",
    title: "mock",
    discription: "맛있는 라면모음",
    avatar: "",
    nickname: "yamyam",
  };

  const mock = new Array(50).fill(mockOb);

  const [mockdata, setmockdata] = useState([]);
  const getData = async () => {
    const res = await postAPI.getAllPost(1);
    setmockdata(res.data.data);
  };
  const getPosts = async () => {
    dispatch(getPostAll(1));
  };

  useEffect(() => {
    getData();
    getPosts();
  }, []);
  console.log(mockdata);
  return (
    <GridContainer>
      <GridWrap style={{ gridTemplateColumns: `repeat(${mediaData}, 1fr)` }}>
        {mockdata?.map((recipy, index) => {
          const {
            post_id,
            thumbnail,
            title,
            discription,
            createdAt,
            user: { nickname, avatar },
          } = recipy;
          return (
            <ListItem key={index} onClick={() => goPost(post_id)}>
              <Image
                className="profile"
                src={`${thumbnail}`}
                width={100}
                height={100}
                alt="thumnail"
                priority
              />
              <ContentWrap>
                <UserInfo>
                  {avatar === "" ? (
                    <BoringAvatar />
                  ) : (
                    <Image src={avatar} width={40} height={40} alt="avatar" />
                  )}
                  <span>{nickname}</span>
                </UserInfo>
                <Title>{title}</Title>
                <CreatedAt>{TimeToToday(+new Date(createdAt))}</CreatedAt>
              </ContentWrap>
            </ListItem>
          );
        })}
      </GridWrap>
    </GridContainer>
  );
};

const GridContainer = styled.main`
  margin-top: 150px;
  width: 100%;
`;
const GridWrap = styled.ul`
  display: grid;
  justify-content: center;
  justify-items: center;
  grid-gap: 5px;
  list-style: none;
`;
const ListItem = styled.li`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 330px;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  @media only all and (max-width: 767px) {
    width: 100%;
    height: 83%;
    margin-bottom: 50px;
  }
  @media only all and (min-width: 768px) and (max-width: 1023px) {
    height: 40vw;
  }
  & .profile {
    width: 248px;
    min-height: 190px;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.componentBorderColor};

    @media only all and (max-width: 767px) {
      height: 400px;
    }
  }
`;

const ContentWrap = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  @media only all and (max-width: 767px) {
    height: 150px;
  }
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & span {
    margin-left: 5px;
    font-weight: bold;
    font-size: 1rem;
  }
  & img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
`;
const Title = styled.p`
  padding: 5px;
  font-weight: bold;
  font-size: 1.1rem;
`;
const CreatedAt = styled.p`
  text-align: right;
`;
