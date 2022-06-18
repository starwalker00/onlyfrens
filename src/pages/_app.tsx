import type { AppPropsWithLayout } from 'src/custom-types/page';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme';
import NextNProgress from "nextjs-progressbar";
import { AppContextProvider } from 'src/context/appContext';

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AppContextProvider>
      <ChakraProvider resetCSS theme={theme}>
        <NextNProgress />
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </AppContextProvider>
  )
}

export default App
