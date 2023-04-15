import styled from "styled-components";
import { BoringAvatar } from "@/components/post/boringAvatar";
import { getMyInfo, deleteCheck } from "@/components/mypage/mypageFNs";

export default function Mypage() {
  const getMyInfoData = async () => {
    const res = await getMyInfo();
    console.log(res);
  };

  return (
    <Container>
      <Avatar onClick={getMyInfoData}>
        <BoringAvatar />
      </Avatar>
      <UserInfo>
        <div>닉네임 : yamyam</div>
        <div onClick={deleteCheck}>회원탈퇴</div>
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
