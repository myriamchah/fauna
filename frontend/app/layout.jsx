"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "./globals.css";
import { Anton, Lexend } from "next/font/google";

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
        <ChakraProvider theme={theme}>{children} </ChakraProvider>
      </body>
    </html>
  );
}
