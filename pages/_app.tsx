import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { SpotifyProvider } from "../features/spotify-context";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    components: {
      Link: {
        baseStyle: {
          color: "teal.500",
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <SpotifyProvider>
        <Component {...pageProps} />
      </SpotifyProvider>
    </ChakraProvider>
  );
}

export default MyApp;
