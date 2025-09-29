'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />

      <main className="container mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--text)' }}>
            Privacy Policy
          </h1>

          <div className="prose max-w-none" style={{ color: 'var(--text-muted)' }}>
            <p className="text-lg mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  1. Information We Collect
                </h2>
                <p className="mb-4">
                  YTubeDown operates as a client-side YouTube video downloader. We are committed to protecting your privacy and being transparent about our data practices.
                </p>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text)' }}>
                  Information We Do NOT Collect:
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Personal identification information (name, email, address)</li>
                  <li>YouTube URLs you process through our service</li>
                  <li>Downloaded video content or metadata</li>
                  <li>User accounts or login credentials</li>
                  <li>Payment or financial information</li>
                </ul>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text)' }}>
                  Automatic Information Collection:
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Basic analytics data (page views, general usage patterns)</li>
                  <li>Technical information (browser type, device type, IP address)</li>
                  <li>Error logs for service improvement purposes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  2. How We Use Information
                </h2>
                <p className="mb-4">
                  The limited information we collect is used solely for:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Providing and maintaining our download service</li>
                  <li>Analyzing usage patterns to improve user experience</li>
                  <li>Detecting and preventing technical issues</li>
                  <li>Ensuring service security and preventing abuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  3. Data Storage and Security
                </h2>
                <p className="mb-4">
                  We implement appropriate security measures to protect any information processed through our service:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>All processing occurs client-side in your browser</li>
                  <li>No video content is stored on our servers</li>
                  <li>SSL encryption for all data transmission</li>
                  <li>Regular security audits and updates</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  4. Third-Party Services
                </h2>
                <p className="mb-4">
                  Our service may interact with third-party services:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>YouTube:</strong> We access publicly available video information through YouTube&apos;s public APIs</li>
                  <li><strong>Analytics:</strong> We may use privacy-focused analytics services to understand usage patterns</li>
                  <li><strong>CDN Services:</strong> Content delivery networks may be used to improve service performance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  5. Regional Compliance
                </h2>

                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text)' }}>
                  United Kingdom (UK GDPR):
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Right to access your personal data</li>
                  <li>Right to rectification of inaccurate data</li>
                  <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text)' }}>
                  Canada (PIPEDA):
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Consent is obtained for any personal information collection</li>
                  <li>Personal information is protected by appropriate safeguards</li>
                  <li>Personal information is used only for purposes for which it was collected</li>
                  <li>Access to personal information is provided upon request</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text)' }}>
                  Australia (Privacy Act 1988):
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Compliance with Australian Privacy Principles (APPs)</li>
                  <li>Notification of eligible data breaches</li>
                  <li>Rights to access and correct personal information</li>
                  <li>Complaints process through the Office of the Australian Information Commissioner</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  6. Cookies and Tracking
                </h2>
                <p className="mb-4">
                  We use minimal cookies and tracking technologies:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for basic service functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand usage patterns (anonymized)</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p className="mb-4">
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  7. Children&apos;s Privacy
                </h2>
                <p className="mb-4">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  8. Changes to This Policy
                </h2>
                <p className="mb-4">
                  We may update this Privacy Policy from time to time. We will notify users of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  9. Contact Information
                </h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="card p-6 mt-4">
                  <p><strong>Email:</strong> privacy@ytubedown.com</p>
                  <p><strong>Response Time:</strong> We aim to respond within 30 days</p>
                  <p><strong>Data Protection Officer:</strong> Available for EU/UK inquiries</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}