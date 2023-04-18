import styled from "styled-components";
import { useState, useEffect } from "react";
import Image from "next/image";
import { BoringAvatar } from "../post/boringAvatar";
import { MediaQuery } from "@/hooks/useMediaQuery";
import { goPost } from "../../router/router";
import { postAPI } from "@/api/api";

export const HomeGrid = () => {
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
  // useEffect(() => {
  //   getData();
  // }, []);
  // console.log(mockdata);
  return (
    <GridContainer>
      <GridWrap style={{ gridTemplateColumns: `repeat(${mediaData}, 1fr)` }}>
        {mock?.map((recipy, index) => {
          const {
            // post_id,
            thumbnail,
            title,
            discription,
            nickname,
            avatar,
            // user: { nickname, avatar },
          } = recipy;
          return (
            <ListItem key={index} onClick={() => goPost(index + 1)}>
              <Image
                src={`${thumbnail}`}
                width={100}
                height={100}
                alt="thumnail"
                priority
              />
              <ContenWrap>
                <UserInfo>
                  {avatar === "" ? (
                    <BoringAvatar />
                  ) : (
                    <Image src={avatar} width={40} height={40} alt="avatar" />
                  )}
                  <span>{nickname}</span>
                </UserInfo>
                <Title>{title}</Title>
                <Discription>{discription}</Discription>
              </ContenWrap>
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
  width: 90%;
  height: 380px;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  @media only all and (max-width: 767px) {
    width: 100%;
    height: 85%;
    margin-bottom: 150px;
  }
  @media only all and (min-width: 768px) and (max-width: 1023px) {
    height: 45vw;
  }
  & img {
    width: 100%;
    height: 100%;
  }
`;

const ContenWrap = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  font-size: 1rem;
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
`;
const Title = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
`;
const Discription = styled.p``;
