"use client";
import "./globals.css";
import { Poppins, Vidaloka } from "next/font/google";
import { Ubuntu } from "next/font/google";
import { Exo } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import React, { useEffect } from "react";
import Loader from "./components/Loader";
import socketIO from "socket.io-client";
import { Suspense } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-Poppins",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-Ubuntu",
});

const exo = Exo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-Exo",
});

const vidaloka = Vidaloka({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-Vidaloka",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${poppins.variable} ${ubuntu.variable} ${exo.variable} ${vidaloka.variable} bg-white bg-no-repeat`}
      >
        <Providers>
          <SessionProvider>
            <Custom>{children}</Custom>
          </SessionProvider>
          <Toaster position="top-center" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);

  return (
    <>
      <Suspense
        fallback={
          <div className="flex h-screen scale-125 items-center justify-center">
            <Loader />
          </div>
        }
      >
        <>{children}</>
      </Suspense>
    </>
  );
};
