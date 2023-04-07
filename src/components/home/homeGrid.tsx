import styled from "styled-components";
import Image from "next/image";
import { BoringAvatar } from "../post/boringAvatar";
import { MediaQuery } from "@/hooks/useMediaQuery";

export const HomeGrid = () => {
  const mediaData = MediaQuery();

  const mockOb = {
    thumnail: "/images/egg.png",
    title: "mock",
    discription: "맛있는 라면모음",
    avatar: "",
    nickname: "yamyam",
  };

  const mock = new Array(50).fill(mockOb);

  return (
    <GridContainer>
      <GridWrap style={{ gridTemplateColumns: `repeat(${mediaData}, 1fr)` }}>
        {mock.map((recipy, index) => {
          const { thumnail, title, discription, avatar, nickname } = recipy;
          return (
            <ListItem key={index}>
              <Image
                src={thumnail}
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
