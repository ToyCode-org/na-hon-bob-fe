import { auth, base } from "./instance";
import { FormData, LoginFormData } from "@/components/sign";

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
  deleteUser: () => auth.delete("/user"),
};
