import type { AppPropsWithLayout } from 'src/custom-types/page';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme';
import NextNProgress from "nextjs-progressbar";
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from "src/apollo/apolloClient";
import { WagmiConfig } from 'wagmi'
import { wagmiClient } from 'src/wagmi/wagmiClient'

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ApolloProvider client={apolloClient}>
      <WagmiConfig client={wagmiClient}>
        <ChakraProvider resetCSS theme={theme}>
          <NextNProgress />
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </WagmiConfig>
    </ApolloProvider>
  )
}

export default App
