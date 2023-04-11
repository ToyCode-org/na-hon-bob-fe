import { useState, useEffect } from "react";

export const useLoginCheck = () => {
  const [isLogin, setisLogin] = useState(false);
  useEffect(() => {
    // some logic
  }, []);
  return isLogin;
};
