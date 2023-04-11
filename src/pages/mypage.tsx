import styled from "styled-components";
import { BoringAvatar } from "@/components/post/boringAvatar";

export default function Mypage() {
  return (
    <Container>
      <Avatar>
        <BoringAvatar />
      </Avatar>
      <UserInfo>
        <div>닉네임 : yamyam</div>
      </UserInfo>
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
`;

const Avatar = styled.div`
  & svg {
    width: 200px;
    height: 200px;
  }
`;

const UserInfo = styled.div`
  margin-top: 50px;
`;
