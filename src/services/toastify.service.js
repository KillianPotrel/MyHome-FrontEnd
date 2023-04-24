import { toast } from "react-toastify";

export function successToast(message) {
  console.log("test toast");
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
  });
}

export function errorToast(message) {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
  });
}

export function infoToast(message) {
  toast.info(message, {
    position: toast.POSITION.TOP_CENTER,
  });
}
