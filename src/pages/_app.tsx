import type { AppPropsWithLayout } from 'src/custom-types/page';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme';
import NextNProgress from "nextjs-progressbar";
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from "src/apollo/apolloClient";

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <NextNProgress />
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default App
