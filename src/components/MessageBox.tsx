import React from 'react'
import ReactMarkdown from 'react-markdown'
import { transition, useColorModeValue } from '@chakra-ui/react'
import Card from '@/components/card/Card'
import { CodeBlockComponent } from './CodeBlock'
import { MarkdownBlockComponent } from './MarkdownBlock'

export default function MessageBox(props: { output: string }) {
  const { output } = props
  const textColor = useColorModeValue('navy.700', 'white')

  //Detect if the output contains a code block with triple backticks
  const isCodeBlock = output.startsWith("```") && output.endsWith("```");
  const codeContent = isCodeBlock ? output.slice(3, -3) : output

  return (
    <Card
      display={output ? 'flex' : 'none'}
      px="22px !important"
      pl="22px !important"
      color={textColor}
      minH="450px"
      fontSize={{ base: 'sm', md: 'md' }}
      lineHeight={{ base: '24px', md: '26px' }}
      fontWeight="500"
      style={{
        opacity: 1,
        transition: 'opacity 10s ease-in-out',
      }}
    >

      {isCodeBlock ? (
        
          <CodeBlockComponent code={codeContent} height='450' />
       

      ) : (
        <MarkdownBlockComponent code={output} />
      )}

      
    </Card>
  )
}
