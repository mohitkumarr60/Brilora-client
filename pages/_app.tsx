import type { AppProps } from "next/app";
import Script from "next/script";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <Component {...pageProps} />;
    </>
  );
}
