import { ReactText } from "react";
import { toast } from "react-toastify";

export function updateToastForLoading(): ReactText {
  return toast.loading("요청을 처리중입니다...");
}

export function updateToastForClose(id: ReactText) {
  toast.update(id, {
    isLoading: false,
    autoClose: 1,
  });
}

export function updateToastForError(id: ReactText, msg: string) {
  toast.update(id, {
    render: msg,
    type: "error",
    isLoading: false,
    autoClose: 2000,
  });
}

export function updateToastForSuccess(id: ReactText, msg: string) {
  toast.update(id, {
    render: msg,
    type: "success",
    isLoading: false,
    autoClose: 2000,
  });
}
