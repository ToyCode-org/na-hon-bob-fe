import { swalQuestion } from "@/swal/swal";
import { goHome } from "@/router/router";

export const cancelPosting = () => {
  swalQuestion(
    "홈으로 돌아갈까요?",
    "작성중인 내용은 저장되지 않고 사라집니다.",
  ).then(res => {
    if (res.value) {
      goHome();
    }
  });
};
