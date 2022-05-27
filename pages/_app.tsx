import '../styles/globals.css'
import { MantineProvider } from '@mantine/core';
import { SessionProvider } from "next-auth/react"

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{
        fontFamily: "Source Sans Pro, sans-serif",
        colorScheme: 'dark',
        headings: {
          fontFamily: '"Greycliff CF", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
          fontWeight: 700,
        }
      }}><Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  )
}

export default App