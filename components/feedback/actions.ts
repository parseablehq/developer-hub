'use server';

import type { ActionResponse, PageFeedback } from './schema';

export async function onPageFeedbackAction(feedback: PageFeedback): Promise<ActionResponse> {
  // PostHog capture is handled client-side
  // This action can be used for additional server-side processing if needed
  return {};
}
