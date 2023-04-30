import styled from "styled-components";
import Image from "next/image";
import { useRef } from "react";
import { goPost } from "../../router/router";
import { BoringAvatar } from "../post/boringAvatar";
import { MediaQuery } from "@/hooks/useMediaQuery";
import { TimeToToday } from "@/util/timeToToday";
import { EclipsLoadingSpinner } from "@/util/eclipsLoadingSpinner";
import { Post } from "../post";

interface Props {
  post: Post[];
  isLoading: boolean;
  observer: (node: any) => void;
}

export const HomeGrid = ({ post, isLoading, observer }: Props) => {
  const mediaData = MediaQuery();

  return (
    <GridContainer>
      {isLoading ? <EclipsLoadingSpinner /> : null}
      <GridWrap style={{ gridTemplateColumns: `repeat(${mediaData}, 1fr)` }}>
        {post?.map((recipy, index) => {
          const {
            post_id,
            thumbnail,
            title,
            createdAt,
            user: { nickname, avatar },
          } = recipy;
          return (
            <ListItem key={index} onClick={() => goPost(post_id)}>
              <ImageCover>
                <Image
                  className="thumbnail"
                  src={`${thumbnail}`}
                  width={248}
                  height={200}
                  alt="thumnail"
                  priority
                />
              </ImageCover>
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
      <IoTarget
        id="observeTarget"
        ref={observer}
        style={isLoading ? { display: "none" } : { display: "block" }}
      ></IoTarget>
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
  transition: 0.3s;
  @media only all and (min-width: 768px) {
    &:hover {
      & .thumbnail {
        height: 220px;
      }
    }
  }
  @media only all and (max-width: 767px) {
    width: 100%;
    height: 90%;
    margin-bottom: 50px;
  }
  @media only all and (min-width: 768px) and (max-width: 1023px) {
    height: 40vw;
  }
`;

const ImageCover = styled.div`
  width: 100%;
  min-height: 200px;
  overflow: hidden;
  & .thumbnail {
    border-bottom: 1px solid ${props => props.theme.componentBorderColor};
    transition: 0.3s;

    @media only all and (max-width: 767px) {
      width: 100%;
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

const IoTarget = styled.div``;
