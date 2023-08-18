import { serve } from 'inngest/next';

import {
  createBlogPostGenerator,
  createWritingAnalysis,
  inngest,
} from '@/inngest/functions';

export const runtime = 'edge';

export const { GET, POST, PUT } = serve(
  inngest,
  [createWritingAnalysis, createBlogPostGenerator],
  {
    signingKey: process.env.INNGEST_SIGNING_KEY,
    streaming: 'allow',
  },
);
