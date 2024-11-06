import ReactMarkdown from 'react-markdown';
import React, { FC, useEffect, useState } from 'react';
import { CodeBlockComponent } from './CodeBlock';

interface Props {
  code: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

const MarkdownBlock: FC<Props> = ({
  code,
  editable = false,
  onChange = () => {},
}) => {
  const [copyText, setCopyText] = useState<string>('Copy');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copyText]);

  return (
    <div className="relative">
      {/* <button
        className="absolute right-0 top-0 z-10 rounded bg-[#1A1B26] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A]"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopyText('Copied!');
        }}
      >
        {copyText}
      </button> */}

      <div className="p-4 h-500px bg-[#1A1B26] text-white overflow-scroll rounded-md"
      style={{
        opacity: 1, // Prevent opacity flicker
        transition: 'opacity 10s ease-in-out',
      }}>
        <ReactMarkdown className="font-normal"
        components={{
          code({inline, className, children}){
            return !inline ? (
              <CodeBlockComponent code={String(children).trim()} height='200'/>
            ) : (
              <code className={className}>{children}</code>
            )
          }
        }}>
          {code}
          </ReactMarkdown>
      </div>
    </div>
  );
};

export const MarkdownBlockComponent = React.memo(MarkdownBlock);
