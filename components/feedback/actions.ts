'use server';

import type { ActionResponse, PageFeedback } from './schema';

export async function onPageFeedbackAction(feedback: PageFeedback): Promise<ActionResponse> {
  const posthogApiKey = process.env.POSTHOG_API_KEY;
  const posthogHost = process.env.POSTHOG_HOST || 'https://us.i.posthog.com';

  if (posthogApiKey) {
    try {
      await fetch(`${posthogHost}/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: posthogApiKey,
          batch: [
            {
              event: 'on_rate_docs',
              distinct_id: feedback.url,
              properties: {
                url: feedback.url,
                opinion: feedback.opinion,
                message: feedback.message,
              },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    } catch (error) {
      console.error('Failed to send feedback to PostHog:', error);
    }
  }

  return {};
}
