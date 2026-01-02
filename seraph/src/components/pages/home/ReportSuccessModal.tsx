// src/components/SuccessModal.tsx
import { CheckCircle } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
        <CheckCircle className="mx-auto text-emerald-500 mb-4" size={48} />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Success!</h2>
        <p className="text-gray-600 mb-6">{message || "Your report has been submitted."}</p>
        <button
          onClick={onClose}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
