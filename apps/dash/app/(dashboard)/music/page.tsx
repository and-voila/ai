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
import { ExclamationTriangleIcon, SpeakerLoudIcon } from 'ui';
import { Button } from 'ui';
import { Form, FormControl, FormField, FormItem } from 'ui';
import { Input } from 'ui';

import { MusicFormDataType, musicFormSchema } from './constants';

const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>();

  const form = useForm<MusicFormDataType>({
    resolver: valibotResolver(musicFormSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  // eslint-disable-next-line space-before-function-paren
  const onSubmit = async (values: MusicFormDataType) => {
    try {
      setMusic(undefined);

      const response = await axios.post('/api/music', values);

      setMusic(response.data.audio);
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
        title="Music"
        description="Your next tune could be a hit on Spotify. Ready to compose?"
        icon={SpeakerLoudIcon}
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
                      placeholder="Compose a catchy 30-second jingle for a podcast about travel..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 w-full lg:col-span-2 "
              disabled={isLoading}
              type="submit"
            >
              Generate
            </Button>
          </form>
          <div className="flex items-center px-6 py-3 text-xs text-muted-foreground">
            <ExclamationTriangleIcon className="mr-2 h-3 w-3 text-muted-foreground" />
            AI can compose catchy jingles but can&apos;t guarantee a
            chart-topper.{' '}
            <span className="text-red-500">
              {form.formState.errors.prompt?.message}
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
        {!music && !isLoading && <Empty label="Can't hear the tunes yet..." />}
        {music && (
          <audio controls className="mt-8 w-full">
            <source src={music} />
          </audio>
        )}
      </div>
    </div>
  );
};

export default MusicPage;
