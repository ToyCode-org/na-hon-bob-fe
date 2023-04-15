import Swal from "sweetalert2";

export const swalTimer = (title: string) => {
  return Swal.fire({
    icon: "success",
    title: title,
    timer: 1500,
    timerProgressBar: true,
    confirmButtonColor: "gold",
  });
};

export const swalSuccess = (title: string) => {
  return Swal.fire({
    icon: "success",
    title: title,
    confirmButtonColor: "gold",
  });
};

export const swalQuestion = (title: string, sub: string) => {
  return Swal.fire({
    icon: "question",
    title: title,
    text: sub,
    confirmButtonColor: "gold",
    showCancelButton: true,
    cancelButtonColor: "lightgold",
  });
};

export const swalError = (title: string) => {
  return Swal.fire({
    icon: "error",
    title: `${title}`,
    confirmButtonColor: "gold",
  });
};
