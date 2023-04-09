import { FormDataCheck } from ".";

export const inputDataMaker = (
  type: string,
  name: string,
  placeholder: string,
  regex?: string,
  error?: string,
) => {
  return {
    type,
    name,
    placeholder,
    regex,
    error,
  };
};

export const inputBorderStyle = (checkState: FormDataCheck, name: string) => {
  const bool = { ...checkState }[name];
  if (bool === true) {
    return "lightgreen";
  } else if (bool === false) {
    return "red";
  } else {
    return "";
  }
};

export const errMsgStyle = (checkState: FormDataCheck, name: string) => {
  return { ...checkState }[name] === false ? {} : { display: "none" };
};
