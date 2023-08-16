'use client';

import axios from 'axios';
import { useProModal } from 'hooks/use-pro-modal';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  CheckIcon,
  CodeIcon,
  ImageIcon,
  MagicWandIcon,
  Pencil1Icon,
  SpeakerLoudIcon,
  VideoIcon,
} from 'ui';
import { Badge } from 'ui';
import { Button } from 'ui';
import { Card } from 'ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'ui';

const tools = [
  {
    label: 'Write',
    icon: Pencil1Icon,
    cta: 'Compose',
    description: 'Draft amazing content in your personal style.',
  },
  {
    label: 'Image',
    icon: ImageIcon,
    cta: 'Create',
    description: 'Create images like a boss assisted by AI.',
  },
  {
    label: 'Video',
    icon: VideoIcon,
    cta: 'Produce',
    description: 'Produce videos and go viral in a few clicks.',
  },
  {
    label: 'Music',
    icon: SpeakerLoudIcon,
    cta: 'Jam',
    description: 'Crank out jingles and jams just like Tyler.',
  },
  {
    label: 'Code',
    icon: CodeIcon,
    cta: 'Hack',
    description: 'A coder on demand to build anything.',
  },
];

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 py-1 font-bold">
              Subscribe to Premium
              <Badge variant="premium" className="py-1 text-sm uppercase">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="space-y-2 pt-2 text-center font-medium text-stone-900">
            {tools.map((tool) => (
              <Card
                key={tool.label}
                className="flex items-center justify-between border p-3"
              >
                <div className="flex items-center gap-x-4">
                  <div className="w-fit rounded-md p-2 text-muted-foreground">
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <div className="text-base font-bold">{tool.label}</div>
                  <div className="text-sm text-muted-foreground">
                    {tool.description}
                  </div>
                </div>
                <CheckIcon className="h-5 w-5 text-primary" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="premium"
            className="mt-2 w-full"
          >
            Upgrade
            <MagicWandIcon className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
        <p className="text-center text-sm text-muted-foreground">
          100% delight money-back guarantee. Cancel anytime.
        </p>
      </DialogContent>
    </Dialog>
  );
};
