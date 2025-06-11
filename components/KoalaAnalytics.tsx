import Script from 'next/script';

interface KoalaAnalyticsProps {
  apiKey: string;
}

export default function KoalaAnalytics({ apiKey }: KoalaAnalyticsProps) {
  const koalaScript = `
    !function(t){var k="ko",i=(window.globalKoalaKey=window.globalKoalaKey||k);if(window[i])return;var ko=(window[i]=[]);
    ["identify","track","removeListeners","on","off","qualify","ready"].forEach(function(t){ko[t]=function(){var n=[].slice.call(arguments);return n.unshift(t),ko.push(n),ko}});
    var n=document.createElement("script");n.async=!0,n.setAttribute("src","https://cdn.getkoala.com/v1/" + "${apiKey}" + "/sdk.js"),(document.body || document.head).appendChild(n)}();
  `;
  
  return (
    <Script
      id="koala-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: koalaScript.replace('${apiKey}', apiKey)
      }}
    />
  );
}
