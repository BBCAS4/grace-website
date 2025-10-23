export default function DebugPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Debug Page</h1>
      <p>This page should work on all devices including Google WebView.</p>
      <p>If you can see this, the basic Next.js app is working.</p>
      <p>Time: {new Date().toISOString()}</p>
    </div>
  );
}
