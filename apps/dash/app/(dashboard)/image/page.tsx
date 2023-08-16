'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { DownloadIcon, ExclamationTriangleIcon, ImageIcon } from 'ui';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

import { Empty } from 'components/empty';
import { Heading } from 'components/heading';
import { Loader } from 'components/loader';
import { Button } from 'ui';
import { Card, CardFooter } from 'ui';
import { Form, FormControl, FormField, FormItem } from 'ui';
import { Input } from 'ui';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui';
import { useProModal } from 'hooks/use-pro-modal';

import { amountOptions, formSchema, resolutionOptions } from './constants';

const ImagePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });

  const isLoading = form.formState.isSubmitting;

  // eslint-disable-next-line space-before-function-paren
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post('/api/image', values);

      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);
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
        title="Images"
        description="Your next viral meme is just a few clicks away. Ready for the engagement?"
        icon={ImageIcon}
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl className="margin-0 p-0">
                    <Input
                      className="border-0 text-base outline-none focus-visible:ring-0 focus-visible:ring-offset-transparent"
                      disabled={isLoading}
                      placeholder="Design a captivating meme on the concept of 'working from home'..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            AI may unintentionally mirror human biases. We&apos;re trying to fix
            that.
          </div>
        </Form>
      </div>
      <div className="mt-4 space-y-4 p-8">
        {isLoading && (
          <div className="rounded-lg p-20">
            <Loader />
          </div>
        )}
        {images.length === 0 && !isLoading && (
          <Empty label="Nothing generated yet." />
        )}
        <div className=",t-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((src) => (
            <Card key={src} className="overflow-hidden rounded-lg">
              <div className="relative aspect-square">
                <Image alt="Image" fill src={src} />
              </div>
              <CardFooter className="p-2">
                <Button
                  onClick={() => window.open(src)}
                  variant="ghost"
                  className="w-full"
                >
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
