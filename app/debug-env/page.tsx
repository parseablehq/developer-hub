export default function DebugEnvPage() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const koalaApiKey = process.env.NEXT_PUBLIC_KOALA_PUBLIC_API_KEY;
  
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Environment Variables Debug</h1>
      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px' }}>
        <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV}</p>
        <p><strong>VERCEL_ENV:</strong> {process.env.VERCEL_ENV || 'undefined'}</p>
        <p><strong>GA_MEASUREMENT_ID:</strong> {gaId || 'undefined'}</p>
        <p><strong>KOALA_API_KEY:</strong> {koalaApiKey ? 'set (hidden)' : 'undefined'}</p>
      </div>
      
      <h2>Analytics Components Status</h2>
      <div style={{ background: '#f0f8ff', padding: '15px', borderRadius: '5px' }}>
        <p><strong>Google Analytics:</strong> {gaId ? '✅ Will render' : '❌ Will NOT render'}</p>
        <p><strong>Koala Analytics:</strong> {koalaApiKey ? '✅ Will render' : '❌ Will NOT render'}</p>
      </div>
      
      <h2>Instructions</h2>
      <div style={{ background: '#fff3cd', padding: '15px', borderRadius: '5px' }}>
        <p>If variables show as 'undefined' on Vercel:</p>
        <ol>
          <li>Go to Vercel Dashboard → Your Project → Settings → Environment Variables</li>
          <li>Add/check these variables:
            <ul>
              <li><code>NEXT_PUBLIC_GA_MEASUREMENT_ID</code></li>
              <li><code>NEXT_PUBLIC_KOALA_PUBLIC_API_KEY</code></li>
            </ul>
          </li>
          <li>Make sure they're enabled for <strong>Preview</strong> and <strong>Production</strong> environments</li>
          <li>Redeploy after adding/updating environment variables</li>
        </ol>
      </div>
    </div>
  );
}
