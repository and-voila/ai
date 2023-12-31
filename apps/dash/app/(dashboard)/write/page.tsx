/* eslint-disable no-unused-vars */
'use client';

import { valibotResolver } from '@hookform/resolvers/valibot';
import axios from 'axios';
import { BotAvatar } from 'components/bot-avatar';
import CodeBlock from 'components/code-block';
import { Empty } from 'components/empty';
import { Heading } from 'components/heading';
import { Loader } from 'components/loader';
import { UserAvatar } from 'components/user-avatar';
import { useProModal } from 'hooks/use-pro-modal';
import { useRouter } from 'next/navigation';
import OpenAI from 'openai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { ExclamationTriangleIcon, Pencil1Icon } from 'ui';
import { Button } from 'ui';
import { Form, FormControl, FormField, FormItem } from 'ui';
import { Input } from 'ui';
import { cn } from 'ui';

import { WriteFormDataType, writeFormSchema } from './constants';

const WritePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<
    OpenAI.Chat.CreateChatCompletionRequestMessage[]
  >([]);

  const form = useForm<WriteFormDataType>({
    resolver: valibotResolver(writeFormSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  // eslint-disable-next-line space-before-function-paren
  const onSubmit = async (values: WriteFormDataType) => {
    try {
      const userMessage: OpenAI.Chat.CreateChatCompletionRequestMessage = {
        role: 'user',
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/write', {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error('Something went wrong.');
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="md:mt-8">
      <Heading
        title="Write"
        description="Your next blog could trend on Medium. Ready to draft it?"
        icon={Pencil1Icon}
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full grid-cols-12 gap-2 rounded-lg border bg-primary-foreground p-4 px-3 focus-within:shadow-sm md:px-6"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="margin-0 p-0">
                    <Input
                      className="border-0 text-base outline-none focus-visible:ring-0 focus-visible:ring-offset-transparent"
                      disabled={isLoading}
                      placeholder="Create a blog post on the latest technology trends for digital nomads..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 w-full lg:col-span-2 "
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
          <div className="flex items-center px-6 py-3 text-xs text-muted-foreground">
            <ExclamationTriangleIcon className="mr-2 h-3 w-3 text-muted-foreground" />
            AI may produce inaccurate information about people, places, or
            facts.
            <span className="text-red-500">
              {form.formState.errors.prompt &&
                form.formState.errors.prompt.message}
            </span>
          </div>
        </Form>
      </div>
      <div className="mt-4 space-y-4 p-8">
        {isLoading && (
          <div className="rounded-lg p-20">
            <Loader />
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <Empty label="Cat got your tongue?" />
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message) => (
            <div
              key={message.content}
              className={cn(
                'flex w-full items-start gap-x-8 rounded-lg p-8 text-foreground',
                message.role === 'user' ? 'border' : 'border bg-secondary',
              )}
            >
              {message.role === 'user' ? <UserAvatar /> : <BotAvatar />}
              <ReactMarkdown
                components={{
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  code: ({ node, ...props }) => {
                    const { children } = props;
                    return (
                      <CodeBlock language="tsx" value={children as string} />
                    );
                  },
                }}
                className="not-prose dark:not-prose-invert whitespace-pre-wrap text-base md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
              >
                {message.content || ''}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WritePage;
