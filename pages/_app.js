import Head from "next/head"
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css"

export default function MyApp({ Component, pageProps: {session, ...pageProps} }) {
    return (
      <>
        <Head>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
          />

          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

        </Head>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </>
    )
  }