import { Box, ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box
        bgGradient="linear-gradient(135deg, rgba(44,122,123,1) 0%, rgba(49,151,149,1) 50%, rgba(140,225,224,1) 100%)"
        h="100vh"
        p="10"
      >
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
