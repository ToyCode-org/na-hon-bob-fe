import { userAPI } from "@/api/api";
import { swalSuccess, swalQuestion, swalError } from "@/swal/swal";
import { goHome } from "@/router/router";

export const getMyInfo = async () => {
  const res = await userAPI.getMyInfo();
  return res.data.data;
};

export const deleteUser = async () => {
  try {
    await userAPI.deleteUser();
    swalSuccess("회원탈퇴가 완료되었습니다.").then(() => {
      goHome();
    });
  } catch (error) {
    swalError("알 수 없는 오류입니다.");
  }
};

export const deleteCheck = () => {
  swalQuestion("정말 탈퇴하실래요?", "삭제된 정보는 복구되지 않습니다.").then(
    res => {
      if (res.value) {
        deleteUser();
      }
    },
  );
};
