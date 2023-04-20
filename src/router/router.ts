import router from "next/router";

export const goHome = () => {
  router.push("/");
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
