'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Disclaimer() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />

      <main className="container mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--text)' }}>
            Disclaimer
          </h1>

          <div className="prose max-w-none" style={{ color: 'var(--text-muted)' }}>
            <p className="text-lg mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  Important Notice
                </h2>
                <div className="card p-6 mb-6" style={{ backgroundColor: 'var(--error)', color: 'var(--background)' }}>
                  <p className="text-lg font-semibold mb-2">
                    ⚠️ IMPORTANT: Read Before Using This Service
                  </p>
                  <p>
                    YTubeDown is a tool for downloading publicly available YouTube content. Users are solely responsible for ensuring their use complies with applicable copyright laws and YouTube&apos;s Terms of Service.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  1. General Disclaimer
                </h2>
                <p className="mb-4">
                  The information and services provided by YTubeDown are offered on an &quot;as is&quot; basis. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  2. Copyright and Legal Responsibility
                </h2>
                <p className="mb-4">
                  <strong>YOU ARE SOLELY RESPONSIBLE FOR:</strong>
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Ensuring you have the legal right to download any content</li>
                  <li>Complying with copyright laws in your jurisdiction</li>
                  <li>Respecting content creators&apos; intellectual property rights</li>
                  <li>Following YouTube&apos;s Terms of Service</li>
                  <li>Understanding fair use and copyright exceptions in your country</li>
                </ul>

                <div className="card p-6 mt-4" style={{ backgroundColor: 'var(--warning)', color: 'var(--background)' }}>
                  <p><strong>Warning:</strong> Downloading copyrighted content without permission may be illegal in your jurisdiction and could result in legal consequences including fines or prosecution.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  3. Third-Party Content and Services
                </h2>
                <p className="mb-4">
                  Our service facilitates access to third-party content (YouTube videos). We:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Do not own, control, or endorse any content accessed through our service</li>
                  <li>Are not responsible for the accuracy, legality, or appropriateness of third-party content</li>
                  <li>Do not guarantee the availability or quality of any content</li>
                  <li>Cannot control changes to YouTube&apos;s API or service that may affect functionality</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  4. No Warranty
                </h2>
                <p className="mb-4">
                  YTubeDown is provided without warranty of any kind. We specifically disclaim:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Any warranty that the service will be uninterrupted or error-free</li>
                  <li>Any warranty regarding the accuracy or reliability of downloaded content</li>
                  <li>Any warranty that the service will meet your specific requirements</li>
                  <li>Any warranty against malware or security threats (though we implement security measures)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  5. Limitation of Liability
                </h2>
                <p className="mb-4">
                  To the fullest extent permitted by law:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>We shall not be liable for any direct, indirect, incidental, or consequential damages</li>
                  <li>We are not responsible for any legal consequences arising from your use of downloaded content</li>
                  <li>Our maximum liability is limited to $0 (as this is a free service)</li>
                  <li>You agree to defend and indemnify us against any claims related to your use of the service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  6. Educational and Fair Use
                </h2>
                <p className="mb-4">
                  While this service may be used for educational purposes, users must understand:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Fair use laws vary by jurisdiction and are complex</li>
                  <li>Educational use does not automatically exempt you from copyright restrictions</li>
                  <li>You should seek legal advice for commercial or institutional use</li>
                  <li>Always credit content creators when using their work</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  7. Regional Legal Variations
                </h2>
                <p className="mb-4">
                  Copyright and downloading laws differ significantly between countries:
                </p>

                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text)' }}>
                  United Kingdom:
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>UK Copyright, Designs and Patents Act 1988 applies</li>
                  <li>Personal copying exceptions exist but are limited</li>
                  <li>Commercial use typically requires licensing</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text)' }}>
                  Canada:
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Canadian Copyright Act governs usage</li>
                  <li>Fair dealing provisions may apply to some uses</li>
                  <li>Personal use copying has specific limitations</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text)' }}>
                  Australia:
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Copyright Act 1968 (Cth) applies</li>
                  <li>Fair dealing and fair use exceptions are limited</li>
                  <li>Time-shifting and format-shifting have specific rules</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  8. Service Interruptions
                </h2>
                <p className="mb-4">
                  We do not guarantee continuous service availability and are not liable for:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Temporary service outages or maintenance</li>
                  <li>Changes to YouTube&apos;s API that affect functionality</li>
                  <li>Internet connectivity issues</li>
                  <li>Regional blocking or access restrictions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  9. User Conduct
                </h2>
                <p className="mb-4">
                  By using this service, you agree that you will NOT:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Use automated tools or bots for bulk downloading</li>
                  <li>Attempt to circumvent any security measures</li>
                  <li>Use the service for any illegal activities</li>
                  <li>Redistribute content in violation of copyright laws</li>
                  <li>Attempt to reverse engineer or modify the service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  10. Indemnification
                </h2>
                <p className="mb-4">
                  You agree to indemnify, defend, and hold harmless YTubeDown, its operators, and affiliates from any claims, damages, losses, or expenses (including legal fees) arising from:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Your use of the service</li>
                  <li>Your violation of these terms or applicable laws</li>
                  <li>Your infringement of any third-party rights</li>
                  <li>Any content you download using our service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  11. Contact and Legal Notice
                </h2>
                <p className="mb-4">
                  If you believe content downloaded using our service infringes your copyright, please contact us immediately with:
                </p>
                <div className="card p-6 mt-4">
                  <p><strong>DMCA/Copyright Contact:</strong> copyright@ytubedown.com</p>
                  <p><strong>Legal Department:</strong> legal@ytubedown.com</p>
                  <p><strong>Response Time:</strong> We aim to respond within 24-48 hours</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  12. Final Warning
                </h2>
                <div className="card p-6 mt-4" style={{ backgroundColor: 'var(--error)', color: 'var(--background)' }}>
                  <p className="text-lg font-semibold mb-2">
                    🚨 FINAL NOTICE
                  </p>
                  <p>
                    By using YTubeDown, you acknowledge that you understand the legal implications of downloading copyrighted content and accept full responsibility for your actions. When in doubt, don&apos;t download. Always respect content creators&apos; rights and obtain proper permissions when required.
                  </p>
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