import LegalLayout from "./LegalLayout";

const Disclaimer = () => (
  <LegalLayout
    title="Risk Disclaimer"
    description="Important risk disclosures for Seraph users"
  >
    <h3>No Guarantees</h3>
    <p>
      Scan results are probabilistic and based on available data. No project is
      guaranteed safe or fraudulent.
    </p>

    <h3>High-Risk Environment</h3>
    <p>
      Blockchain assets involve extreme risk including total loss. Users must
      conduct independent research.
    </p>

    <h3>Investor Notice</h3>
    <p>
      Seraph is not a rating agency, auditor, or regulatory authority. Outputs
      should not be treated as investment recommendations.
    </p>

    <h3>Community Reports</h3>
    <p>Community submissions are unverified and may be inaccurate.</p>
  </LegalLayout>
);

export default Disclaimer;
