/* eslint-disable no-console */
import { Inngest } from 'inngest';
import { OpenAI } from 'langchain/llms/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
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

const parserString = (key: string) =>
  `${key} an array of keywords that exemplify attributes of the author's style, ranked from most to least relevant. No duplicates across categories include 1 representative excerpt from the text per keyword category to support your choices. Focus on concise and precise keywords over vague descriptions`;

export type WritingStyleType = {
  [key: string]: string[];
  writingTones: string[];
  sentenceStructure: string[];
  vocabularySturcture: string[];
  grammarSynatx: string[];
  descriptiveLanguage: string[];
  pacing: string[];
  perspective: string[];
  stuctureOrganization: string[];
  humor: string[];
  uniqueVocabulary: string[];
};

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  writingTones: parserString('Writing tones'),
  sentenceStructure: parserString('Sentence structure'),
  vocabularySturcture: parserString('Vocabulary structure'),
  grammarSynatx: parserString('Grammar & synatx'),
  descriptiveLanguage: parserString('Descriptive language'),
  pacing: parserString('Pacing'),
  perspective: parserString('Perspective'),
  stuctureOrganization: parserString('Stucture & organization'),
  humor: parserString('Humor'),
  uniqueVocabulary: parserString('Unique vocabulary'),
});

const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template: `${PROMPT_SYSTEM_WRITING_ANALYSIS}: \n{format_instructions}
    Here is the content sample to analyze:{sample}`,
  inputVariables: ['sample'],
  partialVariables: { format_instructions: formatInstructions },
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
      const writingAnalysis: WritingStyleType = {
        writingTones: [],
        sentenceStructure: [],
        vocabularySturcture: [],
        grammarSynatx: [],
        descriptiveLanguage: [],
        pacing: [],
        perspective: [],
        stuctureOrganization: [],
        humor: [],
        uniqueVocabulary: [],
      };

      analysedSamples.forEach((sample) => {
        try {
          const parsedSample = JSON.parse(sample.trim());
          for (const key in parsedSample) {
            if (writingAnalysis.hasOwnProperty(key)) {
              const writingKey = key as keyof WritingStyleType;
              parsedSample[key].forEach((value: string) => {
                if (!writingAnalysis[writingKey].includes(value)) {
                  writingAnalysis[writingKey].push(value);
                }
              });
            }
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      });

      const writingAnalysisString = await Promise.all(
        Object.entries(writingAnalysis).map(async ([key, values]) => {
          const formattedValues = values.map((value) =>
            value.replace(/ \(excerpt\)/g, ''),
          );
          return `${key
            .replace(/([A-Z])/g, ' $1')
            .trim()}: ${formattedValues.join(', ')}`;
        }),
      );

      const combinedAnalysisInput = await promptCombineAnalyses.format({
        analysis1: writingAnalysisString[0],
        analysis2: writingAnalysisString[1],
        analysis3: writingAnalysisString[2],
        analysis4: writingAnalysisString[3],
      });

      await redisClient.set(userId, {
        status: 'completed',
        writingAnalysis: writingAnalysis,
        combinedAnalysisInput: combinedAnalysisInput,
      });

      return combinedAnalysisInput;
    });
  },
);
