import { auth, base } from "./instance";

export const userAPI = {
  signUp: () => base.post("/user/sign"),
  login: () => base.post("/user/login"),
  sendVerificationCode: (email: string) =>
    base.post("/user/register", { email }),
  emailCheck: (code: string) => base.post("/user/verify", { code }),
  getMyInfo: () => auth.get("/user/me"),
};
