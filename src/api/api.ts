import { auth, base } from "./instance";
import { FormData, LoginFormData } from "@/components/sign";
import { postFormData } from "@/components/post";

export const userAPI = {
  sendVerificationCode: (email: string) =>
    base.post("/user/register", { email }),
  emailCheck: (code: string) => base.post("/user/verify", { code }),
  nicknameCheck: (nickname: string) =>
    base.post("/user/nickname", { nickname }),
  signUp: (formData: FormData) => base.post("/user/sign", formData),
  login: (formData: LoginFormData) => base.post("/user/login", formData),
  logout: () => auth.post("/user/signout"),
  getMyInfo: () => auth.get("/user/me"),
  isLoginCheck: () => auth.get("/user"),
  editAvatar: (avatar: string) => auth.put("/user/avatar", { avatar }),
  editNickname: (nickname: string) => auth.put("/user/nickname", { nickname }),
  deleteUser: () => auth.delete("/user"),
};

export const postAPI = {
  getAllPost: (page: number) => auth.get(`/post?page=${page}&limit=20`),
  getPostOne: (post_id: number) =>
    auth.get(`/post/${post_id}`, {
      withCredentials: false,
    }),
  getMyPost: (page: number) => auth.get(`/post/me?page=${page}&limit=10`),
  uploadImageToIBB: (base64Image: any) => auth.post("/post/imgbb", base64Image),
  createPost: (postData: postFormData) => auth.post("/post", postData),
  updatePost: (post_id: number, postData: postFormData) =>
    auth.put(`/post/${post_id}`, postData),
  deletePost: (post_id: number) => auth.delete(`/post/${post_id}`),
};

export const commentAPI = {
  getAllComment: () => auth.get("/comment"),
  getCommentByPostId: (post_id: number) => auth.get(`/comment/post/${post_id}`),
  getCommentByPostIdPaging: (post_id: number, page: number) =>
    auth.get(`/comment/post/${post_id}?page=${page}&limit=20`),
  createComment: (post_id: number, content: string) =>
    auth.post(`/comment/post/${post_id}`, { content }),
  editComment: (comment_id: number, content: string) =>
    auth.put(`/comment/${comment_id}`, { content }),
  deleteComment: (comment_id: number) => auth.delete(`/comment/${comment_id}`),
};
