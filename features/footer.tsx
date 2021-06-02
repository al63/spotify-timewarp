import { Center, Text, Link } from '@chakra-ui/react';

const Footer = () => (
  <Center bg="gray.500" textColor="white" py="4">
    <Text>
      Made by{' '}
      <Link color="white" href="http://alec-lee.com">
        Alec Lee
      </Link>
    </Text>
  </Center>
);

export { Footer };
