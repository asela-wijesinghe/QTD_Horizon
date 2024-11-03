'use client';
/*eslint-disable*/

import {
  Flex,
  List,
  ListItem,
  Text,
  useColorModeValue,
  Link as ChakraLink,
} from '@chakra-ui/react';

export default function Footer() {
  const textColor = useColorModeValue('gray.500', 'white');
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: 'column',
        xl: 'row',
      }}
      alignItems="center"
      justifyContent="space-between"
      px={{ base: '30px', md: '50px' }}
      pb="30px"
    >
      <Text
        color={textColor}
        fontSize={{ base: 'xs', md: 'sm' }}
        textAlign={{
          base: 'center',
          xl: 'start',
        }}
        fontWeight="500"
        mb={{ base: '10px', xl: '0px' }}
      >
        {' '}
        &copy; {new Date().getFullYear()}
        <Text as="span" fontWeight="500" ms="4px">
          Feynman Global. All Rights Reserved.
        </Text>
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: '10px',
            md: '44px',
          }}
        >
          <ChakraLink
            fontWeight="500"
            fontSize={{ base: 'xs', md: 'sm' }}
            color={textColor}
            href="https://feynman.global?src=copilot"
            isExternal
          >
            Homepage
          </ChakraLink>
        </ListItem>
        <ListItem
          me={{
            base: '10px',
            md: '44px',
          }}
        >
          <ChakraLink
            fontWeight="500"
            fontSize={{ base: 'xs', md: 'sm' }}
            color={textColor}
            href="https://feynman.global/early-access?src=copilot"
            isExternal
          >
            Get Early Access
          </ChakraLink>
        </ListItem>
        <ListItem
          me={{
            base: '10px',
            md: '44px',
          }}
        >
          <ChakraLink
            fontWeight="500"
            fontSize={{ base: 'xs', md: 'sm' }}
            color={textColor}
            href="https://feynman.global/terms-of-use?src=copilot"
            isExternal
          >
            Terms of Use
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ChakraLink
            fontWeight="500"
            fontSize={{ base: 'xs', md: 'sm' }}
            color={textColor}
            href="https://feynman.global/privacy-policy?src=copilot"
            isExternal
          >
            Privacy Policy
          </ChakraLink>
        </ListItem>
      </List>
    </Flex>
  );
}
