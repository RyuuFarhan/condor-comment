import type { NextPage } from "next";
import Head from 'next/head'
import * as React from "react";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";
import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
import { Toaster, toast } from "react-hot-toast";
import theme from "../theme";
import { Provider as WagmiProvider } from "wagmi";
import { providers } from "ethers";
import Comments from "../components/Comments";

// Provider that will be used when no wallet is connected (aka no signer)
// const provider = providers.getDefaultProvider("http://localhost:8545");
// const provider = providers.getDefaultProvider("https://testnet-rpc.condor.systems/rpc");
const provider = providers.getDefaultProvider("https://testnet.condor.systems/rpc");

// Create a react-query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      toast.error(
        // "Network Error: Ensure MetaMask is connected to the same network that your contract is deployed to."
        "Please connect to MetaMask first."
      );
    },
  }),
});

const App: NextPage = () => {
  return (
    <>
      <Head>
        <title>Comment Panel</title>
      </Head>
      <WagmiProvider autoConnect provider={provider}>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Box p={8} maxW="600px" minW="320px" m="0 auto">
              <h1>Let&apos;s speak up and leave your comments here.</h1>
              <br />
              <h2>...Copyright RyuuFarhann...</h2>
              <br />
              <Comments topic="my-blog-post" />
              <Toaster position="bottom-right" />
            </Box>
          </QueryClientProvider>
        </ChakraProvider>
      </WagmiProvider>
    </>
  );
};

export default App;
