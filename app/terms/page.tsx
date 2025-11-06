import { Metadata } from 'next';
import { Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export const metadata: Metadata = {
  title: 'Terms of Service | GRACE Integrated Health',
  description: 'Terms of Service for GRACE Integrated Health - Geriatric Residential Aged Care Evaluations',
  metadataBase: new URL('https://www.graceintegratedhealth.com.au'),
  alternates: {
    canonical: 'https://www.graceintegratedhealth.com.au/terms/',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="GRACE emblem">
              <circle cx="32" cy="32" r="30" stroke="#0A3C5F" strokeWidth="4" />
              <path d="M18 33c0-8 6.5-15 14.5-15S47 25 47 33" stroke="#22A39A" strokeWidth="4" strokeLinecap="round"/>
              <path d="M18 33c0 8 6.5 15 14.5 15S47 41 47 33" stroke="#0A3C5F" strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <div className="leading-tight">
              <div className="text-xl font-semibold tracking-wide text-[#0A3C5F]">GRACE</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Integrated Health</div>
            </div>
          </div>
          <a href="/" className="text-sm text-[#0A3C5F] hover:underline">← Back to Home</a>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-600 mb-8">Last updated: December 13, 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-700 mb-4">
              By accessing and using the GRACE Integrated Health website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Description of Service</h2>
            <p className="text-slate-700 mb-4">
              GRACE (Geriatric Residential Aged Care Evaluations) provides Nurse practitioner-led assessments and integrated care planning for residents in residential aged care facilities. Our services include:
            </p>
            <ul className="list-disc pl-6 text-slate-700 mb-4">
              <li>Comprehensive health assessments</li>
              <li>Medication reviews and management</li>
              <li>Chronic disease management</li>
              <li>Behaviour support planning</li>
              <li>Collaboration with GPs and RACFs</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. Professional Standards</h2>
            <p className="text-slate-700 mb-4">
              All services provided by GRACE Integrated Health are delivered by AHPRA-registered Nurse practitioners who adhere to professional standards and guidelines. Our practitioners maintain current registration and continuing professional development requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Privacy and Confidentiality</h2>
            <p className="text-slate-700 mb-4">
              We are committed to protecting your privacy and maintaining the confidentiality of all personal and health information. Our privacy practices comply with applicable Australian privacy laws and healthcare confidentiality requirements. Please refer to our Privacy Policy for detailed information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Limitation of Liability</h2>
            <p className="text-slate-700 mb-4">
              GRACE Integrated Health provides healthcare services in accordance with professional standards. While we strive to provide high-quality care, we cannot guarantee specific outcomes. Our liability is limited to the extent permitted by law and professional indemnity insurance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Communication and Contact</h2>
            <p className="text-slate-700 mb-4">
              By providing your contact information through our website forms, you consent to receive communications from us regarding your inquiry or referral. We will respond to all inquiries within one business day.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Intellectual Property</h2>
            <p className="text-slate-700 mb-4">
              All content on this website, including text, graphics, logos, and images, is the property of GRACE Integrated Health and is protected by copyright laws. You may not reproduce, distribute, or use any content without written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Modifications</h2>
            <p className="text-slate-700 mb-4">
              GRACE Integrated Health reserves the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Governing Law</h2>
            <p className="text-slate-700 mb-4">
              These terms are governed by the laws of New South Wales, Australia. Any disputes will be resolved in the courts of New South Wales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Contact Information</h2>
            <p className="text-slate-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-[#0A3C5F]">GRACE Integrated Health</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-700 space-y-2">
                <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> 0433 778 876</div>
                <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> NP@GRACEIntegratedHealth.com.au</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Port Macquarie, NSW</div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="GRACE emblem">
              <circle cx="32" cy="32" r="30" stroke="#0A3C5F" strokeWidth="4" />
              <path d="M18 33c0-8 6.5-15 14.5-15S47 25 47 33" stroke="#22A39A" strokeWidth="4" strokeLinecap="round"/>
              <path d="M18 33c0 8 6.5 15 14.5 15S47 41 47 33" stroke="#0A3C5F" strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <div className="leading-tight">
              <div className="text-lg font-semibold tracking-wide text-[#0A3C5F]">GRACE</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Integrated Health</div>
            </div>
          </div>
          <div className="text-xs text-slate-500 text-center md:text-right">
            © {new Date().getFullYear()} GRACE Integrated Health. All rights reserved. | <a href="/privacy" className="hover:underline">Privacy</a> | <a href="/terms" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
