import { userAPI } from "@/api/api";
import { useState, useEffect } from "react";

export const useMyPostCheck = (userIdInPost: number) => {
  const [isMyPost, setIsMyPost] = useState(false);
  const getMyinfo = async () => {
    const { data } = await userAPI.getMyInfo();
    if (data?.data?.id === userIdInPost) {
      setIsMyPost(true);
    }
  };
  useEffect(() => {
    getMyinfo();
  }, []);
  return isMyPost;
};
