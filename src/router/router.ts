import { swalQuestion } from "@/swal/swal";
import router from "next/router";

export const goHome = () => {
  router.push("/");
};

export const goBack = () => {
  swalQuestion(
    "이전 페이지로 돌아갈까요?",
    "작성된 내용은 저장되지 않습니다.",
  ).then(res => {
    if (res.value) {
      router.back();
    }
  });
};

export const goLogin = () => {
  router.push("/login");
};
export const goSignUp = () => {
  router.push("/login/signup");
};

export const goAddPost = () => {
  router.push("/post/add");
};

export const goPost = (id: number) => {
  router.push(`/post/${id}`);
};

export const goEditPost = (id: number) => {
  router.push({ pathname: "/post/edit", query: { id: `${id}` } });
};

export const goSearchPost = (keyword: string) => {
  router.push({ pathname: "/post/search", query: { keyword: `${keyword}` } });
};
