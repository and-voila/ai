import { serve } from 'inngest/next';

import { createWritingAnalysis, inngest } from '@/inngest/functions';

export const runtime = 'edge';

export const { GET, POST, PUT } = serve(inngest, [createWritingAnalysis], {
  signingKey: process.env.INNGEST_SIGNING_KEY,
  streaming: 'allow',
});
