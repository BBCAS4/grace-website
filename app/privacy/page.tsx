export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-semibold text-slate-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you:</p>
          <ul>
            <li>Submit a referral form</li>
            <li>Contact us through our website</li>
            <li>Communicate with us</li>
          </ul>
          
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and referrals</li>
            <li>Provide healthcare services</li>
            <li>Communicate with you about our services</li>
          </ul>
          
          <h2>Information Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
          
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at NP@GRACEIntegratedHealth.com.au</p>
          
          <p className="text-sm text-slate-500 mt-8">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
