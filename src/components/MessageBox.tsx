import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { transition, useColorModeValue, Spinner, Flex, Box } from '@chakra-ui/react'
import Card from '@/components/card/Card'
import { CodeBlockComponent } from './CodeBlock'
import { MarkdownBlockComponent } from './MarkdownBlock'

export default function MessageBox(props: { output: string, loading: boolean }) {
  const { output, loading } = props
  const textColor = useColorModeValue('navy.700', 'white')
  const [isCodeBlock, setIsCodeBlock] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check if the output is a code block
    const isCode = output.trim().startsWith("```") && output.trim().endsWith("```")
    setIsCodeBlock(isCode)

    // Show loading only for code blocks, show content immediately for text responses
    if (!isCode) {
      setShowContent(true)
    } else if (!loading && output) {
      setShowContent(true)
    } else {
      setShowContent(false)
    }
  }, [loading, output])


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
      position="relative"
    >
        {loading ? (
        <Flex 
          w="100%"
          h="100%"
          direction="column"
          justify="center" 
          align="center"
          gap={4}
        >
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
          <Box as="p" color={textColor} fontSize="sm">
            Generating response...
          </Box>
        </Flex>
      ) : showContent && (
        <Flex 
          w="100%" 
          opacity={1}
          transition="opacity 0.3s ease-in"
        >
          {isCodeBlock ? (
            <CodeBlockComponent code={codeContent} height='450' />
          ) : (
            <MarkdownBlockComponent code={output} />
          )}
        </Flex>
      )}
    </Card>
  )
}
