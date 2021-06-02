import Image from 'next/image';
import { Center, Text, Link, Flex } from '@chakra-ui/react';

const Footer = () => (
  <Center bg="gray.500" textColor="white" py="4" flexDir="column">
    <Text mb="2">
      Made by{' '}
      <Link
        textDecoration="underline"
        color="white"
        href="https://alec-lee.com"
      >
        Alec Lee
      </Link>
    </Text>
    <Flex align="center">
      <Text me="1">All track data from</Text>
      <Image src="/spotify_white.png" height="25" width="83.5" />
    </Flex>
  </Center>
);

export { Footer };
