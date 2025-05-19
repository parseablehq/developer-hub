import { GoogleAnalytics } from '@next/third-parties/google'

interface GoogleAnalyticsProps {
  gaId: string;
}

export default function Analytics({ gaId }: GoogleAnalyticsProps) {
  return <GoogleAnalytics gaId={gaId} />;
}
