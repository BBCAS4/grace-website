import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Page',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>GRACE Integrated Health</h1>
      <p>This is a test page to check if the basic site works in Google WebView.</p>
      <p>Contact: NP@GRACEIntegratedHealth.com.au</p>
      <p>Phone: 0433 778 876</p>
      <p>Location: Port Macquarie, NSW</p>
    </div>
  );
}
