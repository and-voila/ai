'use client';

import { useRouter } from 'next/navigation';
import {
  ArrowRightIcon,
  CodeIcon,
  ImageIcon,
  Pencil1Icon,
  SpeakerLoudIcon,
  VideoIcon,
} from 'ui';
import { Button } from 'ui';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'ui';
import { cn } from 'ui';

const tools = [
  {
    label: 'Write',
    icon: Pencil1Icon,
    href: '/write',
    cta: 'Compose',
    description:
      'Compose with the flair of Veronica Roth, weaving words into gripping tales.',
  },
  {
    label: 'Image',
    icon: ImageIcon,
    href: '/image',
    cta: 'Create',
    description:
      'Craft visuals with the bold edge of Banksy. A visual feast for your fans.',
  },
  {
    label: 'Video',
    icon: VideoIcon,
    href: '/video',
    cta: 'Produce',
    description:
      "Produce videos with Villeneuve's vision. More views are a play away.",
  },
  {
    label: 'Music',
    icon: SpeakerLoudIcon,
    href: '/music',
    cta: 'Jam',
    description:
      'Jam to beats with the groove of Childish Gambino. Sound sensations await.',
  },
  {
    label: 'Code',
    icon: CodeIcon,
    href: '/code',
    cta: 'Hack',
    description:
      "Code like DHH. Bots, plugins, or that function? It's just a hack away.",
  },
];

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div className="md:mt-8">
      <div className="mb-8 space-y-4">
        <h2 className="text-center font-display text-2xl font-medium md:text-4xl">
          Your creativity has no limits
        </h2>
        <p className="text-center text-sm text-muted-foreground md:text-lg">
          Imagine it, create it, and share it with the world. What will you
          make?
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-4 px-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:max-w-7xl">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="mt-4 flex cursor-pointer flex-col p-6 transition hover:shadow-md dark:hover:shadow-muted"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={cn('rounded-md', tool)}>
                  <tool.icon
                    className={cn('h-8 w-8 text-muted-foreground', tool)}
                  />
                </div>
                <div className="font-medium">
                  <h2 className="text-2xl text-foreground">{tool.label}</h2>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-muted-foreground">
              <p>{tool.description}</p>
            </CardContent>
            <CardFooter className="mt-auto justify-end">
              <Button
                variant="secondary"
                className="mt-4 w-full justify-between font-bold"
              >
                {tool.cta}
                {''}
                <ArrowRightIcon className="h-5 w-5 justify-end" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
