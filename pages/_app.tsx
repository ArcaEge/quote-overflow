import '../styles/globals.css'
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { SessionProvider, getSession } from "next-auth/react"
import React, { useEffect } from 'react';
import NextNProgress from "nextjs-progressbar";
import NProgress from 'nprogress'
import MainHandler from 'components/main_handler';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

function App({ Component, pageProps: { session, ...pageProps }, }) {
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
        <ModalsProvider>
          <NotificationsProvider>
            <MainHandler Component={Component} pageProps={pageProps} />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </SessionProvider>
  )
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       session: await getSession(context),
//     },
//   }
// }

export default App