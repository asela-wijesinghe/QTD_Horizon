'use client';
// Chakra imports
import { Flex, Img, useColorModeValue } from '@chakra-ui/react';

import { HorizonLogo } from '@/components/icons/Icons';
import { HSeparator } from '@/components/separator/Separator';

export function SidebarBrand() {
  //   Chakra color mode
  const logoImage = useColorModeValue(
    '/img/layout/logoWhite.png',      // Light mode logo
    '/img/layout/logo.png'  // Dark mode logo
  )
  return (
    <Flex alignItems="center" flexDirection="column">
      <Img src={logoImage} alt="Logo" style={{  padding: '30px 40px' }} />
      <HSeparator mb="20px" w="284px" />
    </Flex>
  );
}

export default SidebarBrand;
