import { Button } from '@chakra-ui/react';
import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import CodeMirror from '@uiw/react-codemirror';
import React, { FC, useEffect, useState } from 'react';
import OneCompilerEmbed from './OneCompilerEmbed';

interface Props {
  code: string;
  height: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

const CodeBlock: FC<Props> = ({
  height,
  code,
  editable = false,
  onChange = () => {},
}) => {
  const [copyText, setCopyText] = useState<string>('Copy');
  const [executing, setExecuting] = useState<boolean>(false)
  const runExecution = (code: string) => {
    setExecuting(true)
    sendCodeToEditorAndRun(code)
  }

  const sendCodeToEditorAndRun = (code: string) => {
    const iframe = document.getElementById('onecompiler-embed');
    if (iframe) {
      // Send the code to the editor
      iframe.contentWindow.postMessage(
        {
          eventType: 'populateCode',
          language: 'python',
          files: [
            {
              name: 'main.py',
              content: code,
            },
          ],
        },
        '*'
      );
  
      // Trigger code execution
      setTimeout(() => {
        iframe.contentWindow.postMessage(
          {
            eventType: 'triggerRun',
          },
          '*'
        );
      }, 500); // Delay to ensure code is populated before execution
    }
  };
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copyText]);

  return (
    <div className={`relative h-${height}px overflow-scroll bg-[#1A1B26] p-4 rounded-md`} style={{ marginTop: '10px', marginBottom: '20px' }}>
    
      <CodeMirror
        editable={editable}
        value={code}
        minHeight={`${height}px`}
        className="rounded-md overflow-scroll"
        extensions={[StreamLanguage.define(go)]}
        theme={tokyoNight}
        onChange={(value) => onChange(value)}
        style={{
          opacity: 1,
          transition: 'opacity 10s ease-in-out',
        }}
      />
      <div className="flex justify-end gap-2 mb-5 mt-5" style={{ marginTop: '10px', marginBottom: '20px' }}>
        <Button
          size="sm"
          className="rounded bg-[#1A1B26] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A]"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopyText('Copied!');
        }}
      >
       {copyText}
      </Button> 
      <Button
        size="sm"
        className="rounded bg-[#1A1B26] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A]"
        onClick={() => {
          runExecution(code)
        }}
      >
        Execute ▶️
      </Button> 
      </div>
      {executing && (
        <div className="mt-20" >
          <OneCompilerEmbed />
        </div>
      )}
     
    </div>
  );
};

export const CodeBlockComponent = React.memo(CodeBlock);
