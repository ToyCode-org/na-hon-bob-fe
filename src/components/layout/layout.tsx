import React from "react";
import styled from "styled-components";
import { LayoutHead } from "./layouthead";
import { Header } from "./header/header";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <LayoutWrap>
      <ContentWrap>{children}</ContentWrap>
      <LayoutHead />
      <Header />
    </LayoutWrap>
  );
};

const LayoutWrap = styled.div`
  margin: 0 auto;
  max-width: 100vw;
`;

const ContentWrap = styled.div`
  margin: 0 auto;
  margin-top: 81px;
  max-width: 1136px;
`;
