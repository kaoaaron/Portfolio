import { ReactNode } from "react";
import TopPart from "@/components/organisms/topPart";
import styled from "styled-components";
import Head from "next/head";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

export default function Layout({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  return (
    <>
      <Head>
        <title>Aaron Kao</title>
        <meta name="description" content="Aaron's Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Main>
        <TopPart />
        {children}
      </Main>
    </>
  );
}
