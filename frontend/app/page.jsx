"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Flex } from "@chakra-ui/react";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Loader from "./components/utils/Loader";
import NotConnected from "./components/utils/NotConnected";

export default function Home() {
  const { isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Header />
      <Flex grow="1" justifyContent="center">
        {isConnected ? (
          isLoading ? (
            <Loader size="xl" mt="40vh" />
          ) : (
            <Main />
          )
        ) : (
          <NotConnected />
        )}
      </Flex>
      <Footer />
    </>
  );
}
