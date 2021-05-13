import { useState, Dispatch, SetStateAction } from "react";

export type NotificationType = "error" | "warning" | "info" | "success";

export interface Notification {
  message: string;
  type: NotificationType;
}

export interface NotificationState extends Notification {
  handleClose(_?: React.SyntheticEvent, reason?: string): void;
  showNotification: Dispatch<SetStateAction<Notification>>;
}

export function useNotification() {
  const [{ message, type }, setNotification] = useState<Notification>({ message: "", type: "info" });

  function handleClose(_?: React.SyntheticEvent, reason?: string) {
    if (reason === "clickaway") {
      return;
    }

    setNotification({ type, message: "" });
  }

  return { message, type, showNotification: setNotification, handleClose };
}
