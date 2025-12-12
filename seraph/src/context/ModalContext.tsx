// src/context/ModalContext.tsx
import { createContext, useState, type ReactNode } from "react";
import ReportScamModal from "../components/ReportScamModal";

type ModalContextType = {
  openReportModal: () => void;
  closeReportModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openReportModal = () => setIsOpen(true);
  const closeReportModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider value={{ openReportModal, closeReportModal }}>
      {children}
      <ReportScamModal isOpen={isOpen} onClose={closeReportModal} />
    </ModalContext.Provider>
  );
};

// Optional: export context if needed elsewhere
export { ModalContext };