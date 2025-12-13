import LegalLayout from "./LegalLayout";

const Privacy = () => (
    <LegalLayout
        title="Privacy Policy"
        description="How Seraph collects, uses, and protects user data"
    >
        <p><strong>Effective Date:</strong> January 1, 2025</p>

        <h3>Information We Collect</h3>
        <ul>
            <li>Search queries</li>
            <li>Usage analytics</li>
            <li>IP address (security)</li>
        </ul>

        <h3>What We Do NOT Collect</h3>
        <ul>
            <li>Private keys</li>
            <li>Wallet permissions</li>
            <li>Passwords</li>
        </ul>

        <h3>Third-Party Services</h3>
        <p>
            Seraph may use third-party APIs for screenshots, blockchain data,
            and analytics.
        </p>

        <h3>EU GDPR Rights</h3>
        <p>
            EU users may request data access or deletion by contacting
            <strong> privacy@seraph.ai</strong>.
        </p>
    </LegalLayout>
);

export default Privacy;
