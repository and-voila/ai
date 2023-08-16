import Image from 'next/image';
import { useTheme } from 'next-themes';

export const Loader = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-4">
      <div className="relative h-10 w-10 animate-spin">
        <Image
          alt="Loading Icon"
          src={isDarkMode ? '/av-icon.png' : '/av-loader.png'}
          layout="fill"
        />
      </div>
    </div>
  );
};
