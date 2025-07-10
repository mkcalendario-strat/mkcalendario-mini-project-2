import { toast } from "react-toastify";

export function showSuccessToast(message: string) {
  toast.success(message);
}

export function showErrorToast(message: string) {
  toast.error(message);
}

export function showWarningToast(message: string) {
  toast.warn(message);
}
