import { communityAPI, community_commentAPI } from "@/api/api";
import styled from "styled-components";

export default function Community() {
  const cFormData = {
    title: "test",
    content: "test",
  };
  const cUpdate = {
    title: "editttt",
    content: "editttt",
  };
  const test1 = async () => {
    const data = await communityAPI.getAllCommunity(1);
    console.log(data);
  };
  const test2 = async () => {
    const data = await communityAPI.createCommunity(cFormData);
    console.log(data);
  };
  const test3 = async () => {
    const data = await communityAPI.updateCommunity(2, cUpdate);
    console.log(data);
  };
  const test4 = async () => {
    const data = await communityAPI.deleteCommunity(3);
    console.log(data);
  };
  const ccFormData = {
    content: "test",
  };
  const ccUpdate = {
    content: "editttttt",
  };
  const test5 = async () => {
    const data = await community_commentAPI.getAllComment(3, 1);
    console.log(data);
  };
  const test6 = async () => {
    const data = await community_commentAPI.createComment(4, ccFormData);
    console.log(data);
  };
  const test7 = async () => {
    const data = await community_commentAPI.editComment(1, ccUpdate);
    console.log(data);
  };
  const test8 = async () => {
    const data = await community_commentAPI.deleteComment(2);
    console.log(data);
  };
  return (
    <div>
      <div onClick={test1}>게시글 조회 테스트</div>
      <div onClick={test2}>게시글 생성 테스트</div>
      <div onClick={test3}>게시글 수정 테스트</div>
      <div onClick={test4}>게시글 삭제 테스트</div>
      <div onClick={test5}>댓글 조회 테스트</div>
      <div onClick={test6}>댓글 생성 테스트</div>
      <div onClick={test7}>댓글 수정 테스트</div>
      <div onClick={test8}>댓글 삭제 테스트</div>
    </div>
  );
}
