import { useState } from "react";
import ReportScamModal from "../components/pages/home/ReportScamModal";
import SuccessModal from "../components/pages/home/ReportSuccessModal";

import { reportScam } from "../api/api";

const ReportFlow = () => {
  const [isReportOpen, setIsReportOpen] = useState(true);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReportSubmit = async (formData: any) => {
    setLoading(true);
    setError(null);
    try {
      await reportScam(formData); // POST to backend
      setIsReportOpen(false);
      setTimeout(() => setIsSuccessOpen(true), 150);
    } catch (err: any) {
      setError(err.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ReportScamModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onSubmit={handleReportSubmit}
        loading={loading}
        error={error}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        message="Your report has been submitted successfully!"
      />
    </>
  );
};

export default ReportFlow;