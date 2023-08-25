'use client';

import { valibotResolver } from '@hookform/resolvers/valibot';
import axios from 'axios';
import { Empty } from 'components/empty';
import { Heading } from 'components/heading';
import { Loader } from 'components/loader';
import { useProModal } from 'hooks/use-pro-modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ExclamationTriangleIcon, VideoIcon } from 'ui';
import { Button } from 'ui';
import { Form, FormControl, FormField, FormItem } from 'ui';
import { Input } from 'ui';

import { VideoFormDataType, videoFormSchema } from './constants';

const VideoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();

  const form = useForm<VideoFormDataType>({
    resolver: valibotResolver(videoFormSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  // eslint-disable-next-line space-before-function-paren
  const onSubmit = async (values: VideoFormDataType) => {
    try {
      setVideo(undefined);

      const response = await axios.post('/api/video', values);

      setVideo(response.data[0]);
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
        title="Video"
        description="Imagine your video trending on YouTube. Ready to create it?"
        icon={VideoIcon}
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
                      placeholder="Create a 10-second animated clip illustrating 'a day in the life of a digital nomad'..."
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
            AI isn&apos;t perfect and might echo human biases in videos.
            <span className="text-red-400">
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
        {!video && !isLoading && (
          <Empty label="I want to see little fishies or something..." />
        )}
        {video && (
          <video
            className="mt-8 aspect-video w-full rounded-lg border bg-black"
            controls
          >
            <source src={video} />
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
