import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  coldarkCold,
  coldarkDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CheckIcon, CopyIcon } from 'ui';

type CodeBlockProps = {
  language: string;
  value: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const prismTheme = theme === 'dark' ? coldarkDark : coldarkCold;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (copied) {
      timer = setTimeout(() => setCopied(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className="group relative">
      <div className="rounded-t-lg bg-muted-foreground p-4 text-base font-semibold text-white dark:bg-background">
        {language}
      </div>
      <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
        <div className="code-block -mt-4 max-w-[80ch] cursor-pointer overflow-auto whitespace-pre-wrap rounded-b-lg text-primary-foreground dark:text-foreground">
          <SyntaxHighlighter
            language={language}
            style={prismTheme}
            showLineNumbers
            wrapLongLines
          >
            {value}
          </SyntaxHighlighter>
          <div className="absolute right-4 top-4 cursor-pointer opacity-80 group-hover:opacity-100">
            {copied ? <CheckIcon /> : <CopyIcon />}
          </div>
        </div>
      </CopyToClipboard>
    </div>
  );
};

export default CodeBlock;
