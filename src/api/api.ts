import { auth, base } from "./instance";
import { FormData } from "@/components/sign";

export const userAPI = {
  sendVerificationCode: (email: string) =>
    base.post("/user/register", { email }),
  emailCheck: (code: string) => base.post("/user/verify", { code }),
  nicknameCheck: (nickname: string) =>
    base.post("/user/nickname", { nickname }),
  signUp: (formData: FormData) => base.post("/user/sign", formData),
  login: (formData: FormData) => base.post("/user/login", formData),
  getMyInfo: () => auth.get("/user/me"),
};
