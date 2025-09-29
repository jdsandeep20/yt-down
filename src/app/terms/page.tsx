'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <Header />

      <main className="container mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--text)' }}>
            Terms of Service
          </h1>

          <div className="prose max-w-none" style={{ color: 'var(--text-muted)' }}>
            <p className="text-lg mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  1. Acceptance of Terms
                </h2>
                <p className="mb-4">
                  By accessing and using YTubeDown (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  2. Description of Service
                </h2>
                <p className="mb-4">
                  YTubeDown is a free online tool that allows users to download publicly available YouTube videos for personal use. The service operates entirely client-side and does not store user data or downloaded content.
                </p>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text)' }}>
                  Service Features:
                </h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Download YouTube videos in various quality formats</li>
                  <li>Extract audio from YouTube videos</li>
                  <li>Free access with no registration required</li>
                  <li>Client-side processing for privacy protection</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  3. Permitted Uses
                </h2>
                <p className="mb-4">
                  You may use this service for:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Personal, non-commercial use of downloaded content</li>
                  <li>Educational purposes in accordance with fair use guidelines</li>
                  <li>Backing up content you own or have permission to download</li>
                  <li>Accessing content offline where you have legitimate need</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  4. Prohibited Uses
                </h2>
                <p className="mb-4">
                  You agree NOT to use this service for:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Commercial distribution or sale of downloaded content</li>
                  <li>Copyright infringement or violation of intellectual property rights</li>
                  <li>Downloading private or restricted content without authorization</li>
                  <li>Automated or bulk downloading that may harm YouTube&apos;s services</li>
                  <li>Any illegal activity or violation of applicable laws</li>
                  <li>Redistributing downloaded content without proper authorization</li>
                  <li>Circumventing YouTube&apos;s terms of service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  5. Copyright and Intellectual Property
                </h2>
                <p className="mb-4">
                  You acknowledge and agree that:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>All content on YouTube is subject to copyright protection</li>
                  <li>You are responsible for ensuring you have the right to download content</li>
                  <li>You will respect the intellectual property rights of content creators</li>
                  <li>You will comply with copyright laws in your jurisdiction</li>
                  <li>We do not grant any rights to copyrighted material</li>
                </ul>

                <div className="card p-6 mt-4" style={{ backgroundColor: 'var(--warning)', color: 'var(--background)' }}>
                  <p><strong>Important:</strong> Downloading copyrighted content without permission may violate copyright laws. Always ensure you have the right to download and use any content.</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  6. User Responsibilities
                </h2>
                <p className="mb-4">
                  As a user of this service, you are responsible for:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Complying with all applicable laws and regulations</li>
                  <li>Respecting copyright and intellectual property rights</li>
                  <li>Using the service in accordance with these terms</li>
                  <li>Not abusing or attempting to harm the service</li>
                  <li>Keeping your use of downloaded content within legal boundaries</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  7. Service Availability
                </h2>
                <p className="mb-4">
                  We strive to maintain service availability, but:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Service may be temporarily unavailable due to maintenance</li>
                  <li>We do not guarantee 100% uptime or availability</li>
                  <li>Service functionality may change due to third-party API changes</li>
                  <li>We may modify or discontinue features with or without notice</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  8. Disclaimers
                </h2>
                <p className="mb-4">
                  The service is provided &quot;as is&quot; without warranties of any kind:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>We make no warranties about service reliability or accuracy</li>
                  <li>We do not guarantee the quality of downloaded content</li>
                  <li>We are not responsible for content availability on YouTube</li>
                  <li>Use of the service is at your own risk</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  9. Limitation of Liability
                </h2>
                <p className="mb-4">
                  To the maximum extent permitted by law:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>We shall not be liable for any indirect, incidental, or consequential damages</li>
                  <li>Our total liability shall not exceed the amount paid for the service (which is $0)</li>
                  <li>We are not responsible for any legal consequences of your use of downloaded content</li>
                  <li>You agree to indemnify us against any claims arising from your use of the service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  10. Termination
                </h2>
                <p className="mb-4">
                  We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  11. Governing Law
                </h2>
                <p className="mb-4">
                  These Terms shall be governed by and construed in accordance with the laws applicable in your jurisdiction. Any disputes shall be resolved through appropriate legal channels in your local jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  12. Changes to Terms
                </h2>
                <p className="mb-4">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  13. Contact Information
                </h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="card p-6 mt-4">
                  <p><strong>Email:</strong> legal@ytubedown.com</p>
                  <p><strong>Response Time:</strong> We aim to respond within 30 days</p>
                  <p><strong>Legal Department:</strong> Available for legal inquiries</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                  14. Acknowledgment
                </h2>
                <p className="mb-4">
                  By using YTubeDown, you acknowledge that you have read these Terms of Service, understand them, and agree to be bound by them.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}