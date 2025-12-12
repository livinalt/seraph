// src/hooks/useReportModal.ts
import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export const useReportModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useReportModal must be used within a ModalProvider");
  }
  return context;
};
