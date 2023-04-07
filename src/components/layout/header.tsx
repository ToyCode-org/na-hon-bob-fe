import styled from "styled-components";

export const Header = () => {
  return (
    <HeadersWrap>
      <span>나혼밥 레시피</span>
      <div>
        <span>레시피</span>
      </div>
      <div>검색</div>
      <div>
        <span>로그인</span>
        <span>회원가입</span>
      </div>
      <div>글쓰기 버튼</div>
    </HeadersWrap>
  );
};

const HeadersWrap = styled.header`
  padding: 0 100px;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 81px;
  border-bottom: 1px solid #eaedef;
  background-color: white;
`;
