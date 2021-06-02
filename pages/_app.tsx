import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { SpotifyProvider } from '../features/spotify-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SpotifyProvider>
        <Component {...pageProps} />
      </SpotifyProvider>
    </ChakraProvider>
  );
}

export default MyApp;
