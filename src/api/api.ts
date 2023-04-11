import { auth, base } from "./instance";

export const userAPI = {
  signUp: () => base.post("/user/sign"),
  login: () => base.post("/user/login"),
  sendVerificationCode: (email: string) => base.post("/user/register", email),
  emailCheck: () => base.post("/user/verifi"),
  getMyInfo: () => auth.get("/user/me"),
};
