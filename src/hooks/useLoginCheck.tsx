import { userAPI } from "@/api/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const useLoginCheck = () => {
  const { pathname } = useRouter();
  const [isLogin, setisLogin] = useState(false);

  const loginCheck = async () => {
    const res = await userAPI.isLoginCheck();
    setisLogin(res.data.isLogin);
  };
  useEffect(() => {
    loginCheck();
  }, [pathname]);

  return { isLogin, setisLogin };
};
