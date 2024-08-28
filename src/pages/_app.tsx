import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import Layout from "@/components/molecules/layout";

export const gloriaHallelujah = localFont({
  src: [
    {
      path: "../../public/fonts/gloria-hallelujah-regular.woff2",
      weight: "500",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
