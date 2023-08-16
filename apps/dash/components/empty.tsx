import Image from 'next/image';

interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-20">
      <div className="relative h-48 w-48">
        <Image alt="Empty" fill src="/empty-chats-mumma.png" />
      </div>
      <p className="mt-2 text-center text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
