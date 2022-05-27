import '../styles/globals.css'
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { SessionProvider } from "next-auth/react"
import React, { useEffect } from 'react';
import NextNProgress from "nextjs-progressbar";
import NProgress from 'nprogress'
import Navbar from 'components/navbar_handler';

function App({ Component, pageProps: { session, ...pageProps } }) {
  NProgress.configure({ showSpinner: false })

  return (
    <SessionProvider session={session}>
      <NextNProgress color='#1c7ed6' />
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{
        fontFamily: "Source Sans Pro, sans-serif",
        colorScheme: 'dark',
        headings: {
          fontFamily: '"Greycliff CF", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
          fontWeight: 700,
        }
      }}>
        <NotificationsProvider>
          <Navbar />
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  )
}

export default App