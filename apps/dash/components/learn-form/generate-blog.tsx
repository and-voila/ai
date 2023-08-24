/* eslint-disable no-unused-vars */
'use client';
import { useAuth } from '@clerk/nextjs';
import { ChatRequestOptions, CreateMessage, Message, nanoid } from 'ai';
import React from 'react';
import { Button } from 'ui';

import { getUserWritingRedis } from '@/lib/handleInngest';

const TOPIC_ONE = `
Create a well-structured blog post of 750 words or less on the topic: "Empowering Creators with AI: A New Dawn of Possibilities". The blog post should discuss the following:
1. Introduction: Brief overview of AI and its relevance in today's world.
2. Body: Explain how AI is empowering creators, providing examples of AI tools and platforms that creators are using to enhance their creativity and efficiency. Discuss the impact of AI on different domains of creativity like art, music, writing, and more.
3. Conclusion: Forecast on the future implications of AI for creators and how it will revolutionize creativity.
`;

const generateOptions = [
  {
    event: 'app/generate-blogpost',
    label: 'Generate Blog',
  },
  {
    event: 'app/generate-email-template',
    label: 'Email Template',
  },
  {
    event: 'app/generate-twitter-thread',
    label: 'Twitter Thread',
  },
];

export const GENERATE_BLOG_POST =
  "You are a blog post generator. Base on the outline user shared and there writting style, generate a blog post. Only return the blog post. Don't say anything beside the blog post. RETURN MARKDOWN! Use H tags for headings. Use tables for lists. Use links for links. Use images for images. Use bold for bold. Use italics for italics. Use blockquotes for blockquotes. Use code for code. Use code block for code block. Use horizontal rule for horizontal rule. Use line break for line break. Use strikethrough for strikethrough. Use superscript for superscript. Use subscript for subscript. Use math for math. Use latex for latex. Use latex block for latex block. Use latex inline for latex inline. Use latex display for latex display. Use latex environment for latex environment. Use latex command for latex command. Use latex argument for latex argument. Use latex argument";

function GenerateBlog({
  append,
  isLoading,
}: {
  isLoading: boolean;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string>;
}) {
  const { userId } = useAuth();

  async function handlegenerate() {
    const res = await getUserWritingRedis(userId);

    if (res) {
      append({
        content: `${GENERATE_BLOG_POST} \n\n${TOPIC_ONE}`,
        role: 'user',
        id: nanoid(),
      });
    }
  }

  return (
    <div className="mb-10 block grid w-full grid-cols-3 gap-4">
      {generateOptions.map((option) => (
        <Button
          key={option.event}
          className="p-8 text-2xl"
          onClick={async () => {
            await handlegenerate();
          }}
          disabled={isLoading}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export default GenerateBlog;
