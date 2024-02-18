"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "./globals.css";
import { Anton, Lexend } from "next/font/google";

import { UserContextProvider } from "./contexts/userContext";
import { ContractContextProvider } from "./contexts/contractContext";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia, hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

const { chains, publicClient } = configureChains(
  [sepolia, hardhat],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "FAUNA DAO",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
});

const lexend = Lexend({ subsets: ["latin"], display: "swap" });
export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#24280a",
        color: "white",
        fontFamily: lexend,
      },
      a: {
        textDecoration: "none",
      },
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>FAUNA - DAO for wildlife protection</title>
      </head>
      <body className={lexend.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
            theme={lightTheme({
              accentColor: "#22543D",
              accentColorForeground: "#ffffff",
            })}
          >
            <ChakraProvider theme={theme}>
              <UserContextProvider>
                <ContractContextProvider> {children}</ContractContextProvider>
              </UserContextProvider>
            </ChakraProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
