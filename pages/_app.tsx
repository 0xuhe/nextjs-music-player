import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Layout from "../components/Layout";
import { StoreProvider } from "easy-peasy";
import { store } from "../lib/store";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "gray.400",
      },
    },
  },
});

function MyApp({
  Component,
  pageProps,
}: AppProps & { Component: { authPage?: boolean } }) {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
