import LegalLayout from "./LegalLayout";

const Terms = () => (
    <LegalLayout
        title="Terms of Service"
        description="Seraph Terms of Service and platform usage conditions"
    >
        <p><strong>Effective Date:</strong> January 1, 2025</p>

        <h3>1. Acceptance</h3>
        <p>
            By using Seraph, you agree to these Terms. If you do not agree, discontinue use immediately.
        </p>

        <h3>2. Service Description</h3>
        <p>
            Seraph provides AI-powered scam detection and risk analysis for websites,
            tokens, blockchain projects, and smart contracts.
        </p>

        <h3>3. No Financial Advice</h3>
        <p>
            Seraph does not provide financial, investment, or legal advice.
            All information is provided for informational purposes only.
        </p>

        <h3>4. User Conduct</h3>
        <ul>
            <li>No false reports</li>
            <li>No abuse or scraping</li>
            <li>No unlawful usage</li>
        </ul>

        <h3>5. Limitation of Liability</h3>
        <p>
            Seraph shall not be liable for financial losses, incorrect classifications,
            or reliance on scan results.
        </p>

        <h3>6. Jurisdiction</h3>
        <p>
            These Terms are governed by the laws of the United States.
            EU users are protected under applicable consumer laws.
        </p>
    </LegalLayout>
);

export default Terms;
