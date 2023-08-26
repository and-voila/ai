/* eslint-disable no-console */
import { Inngest } from 'inngest';
import { OpenAI } from 'langchain/llms/openai';
import { PromptTemplate } from 'langchain/prompts';

import redisClient from '@/lib/upstash-redis';

// this server function will be deployed to edge
export const runtime = 'edge';

export const PROMPT_SYSTEM_WRITING_ANALYSIS = `You will act as an expert writing analyst to accurately characterize a provided text sample's unique writing style. This will help generate content matching the original author's voice.

I will supply a text sample of at least 500 words, specifying the genre/purpose if known, to allow sufficient analysis. You may request clarification on the text as needed. Identify any distinct sections in the sample (introduction, conclusion, etc).

Analyze the following style descriptors:

[Writing Tone]
[Sentence Structure]

[Vocabulary Choice]
[Grammar & Syntax]
[Descriptive Language]
[Pacing]
[Perspective]

[Structure/Organization]
[Humor]

For each category, provide 3 distinctive keywords that exemplify attributes of the author's style, ranked from most to least relevant. No duplicates across categories.

Additionally, include 1 representative excerpt from the text per keyword category to support your choices. Focus on concise and precise keywords over vague descriptions.

Provide [Unique Vocabulary] examples of 3 unusual adverbs used. Also compare the overall style to established archetypes/authors.

Present under the heading "Your Writing Style Keywords", formatted as:

[Category - Keyword1 (excerpt), Keyword2 (excerpt), Keyword3 (excerpt)]
`;

// init langchain model
const llm = new OpenAI({
  modelName: 'gpt-3.5-turbo',
  temperature: 0.8,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// init inggest function
export const inngest = new Inngest({
  name: 'Writing assistant',
  eventKey: process.env.INNGEST_EVENT_KEY!,
});

const prompt = new PromptTemplate({
  template: `${PROMPT_SYSTEM_WRITING_ANALYSIS}:
    Here is the content sample to analyze:{sample}`,
  inputVariables: ['sample'],
});

const promptCombineAnalyses = new PromptTemplate({
  template: `Combine the following analyses into a single comprehensive analysis:\n\n{analysis1}\n\n{analysis2}\n\n{analysis3}\n\n{analysis4} format should be the same as this ${PROMPT_SYSTEM_WRITING_ANALYSIS}`,
  inputVariables: ['analysis1', 'analysis2', 'analysis3', 'analysis4'],
});

// first step analysis four blog posts
export const createWritingAnalysis = inngest.createFunction(
  {
    name: 'Writing analysis',
  },
  {
    event: 'app/writing-analysis',
  },
  async ({ event, step }) => {
    // get data from event four blog posts and username
    const { userId, samples } = event.data as {
      userId: string;
      samples: string[];
    };

    await step.run('start analysis', async () => {
      await redisClient.set(userId, {
        status: 'pending',
      });
    });

    // map over samples and run analysis chain
    const analysedSamples = await Promise.all(
      samples.map(async (sample, i) => {
        const sampleAnalysis = await step.run(
          `sample analysis sample: ${i}`,
          async () => {
            const input = await prompt.format({
              sample: sample,
            });
            const response = await llm.call(input);
            return response;
          },
        );
        return sampleAnalysis;
      }),
    );

    // save analysized samples to KV
    await step.run('save post', async () => {
      const combinedAnalysisInput = await promptCombineAnalyses.format({
        analysis1: analysedSamples[0],
        analysis2: analysedSamples[1],
        analysis3: analysedSamples[2],
        analysis4: analysedSamples[3],
      });

      await redisClient.set(userId, {
        status: 'completed',
        writingAnalysis: `${combinedAnalysisInput} combine analysis in to this format 
                          \n
                          [Writing Tone]
                          [Sentence Structure]
                                
                          [Vocabulary Choice]
                          [Grammar & Syntax]
                          [Descriptive Language]
                          [Pacing]
                          [Perspective]
                                
                          [Structure/Organization]
                          [Humor]
                                
                          no reptuation
                          only 1 excerpt per keyword category
                          `,
        combinedAnalysisInput: combinedAnalysisInput,
      });

      return combinedAnalysisInput;
    });
  },
);
