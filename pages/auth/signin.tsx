import React from 'react';
import { useForm, useToggle, upperFirst } from '@mantine/hooks';
import { signIn, useSession } from "next-auth/react"
import {
  Text,
  Divider,
  Group,
  Title,
  Center,
  Paper,
  Stack,
  Anchor,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { GoogleButton, GithubButton } from 'components/auth/buttons';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function SignIn({ props }) {
  const router = useRouter()
  const { query } = useRouter()
  const { data: session, status } = useSession()
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  // let redirect = query.redirect != undefined ? {callbackUrl: query.redirect} : {}
  
  
  if (status === "authenticated") {
    router.push("/")
    setTimeout(() => {
      showNotification({
        autoClose: 10_000,
        color: 'orange',
        title: 'Already signed in',
        message: 'Sign out first to switch accounts',
      })
    }, 500)
  }

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let error = urlParams.has('error') ? urlParams.get('error') : null;
    if (error) {
      if (error === 'OAuthAccountNotLinked') {
        setTimeout(() => {
          showNotification({
            color: 'red',
            autoClose: 10_000,
            title: 'Email linked to another provider',
            message: 'Your email address is linked to another OAuth provider. Please sign in using that provider.',
          })
        }, 500)
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return (
    <>
      <Center style={{ height: windowSize.height - 100 }}>
        <Paper shadow="sm" p="xl" pb="lg" withBorder>
          <Stack>
            <Title order={2}>Welcome to Quote Overflow</Title>
            <Divider label="Sign in or Register with" labelPosition="center" />
            <Group grow>
              <GoogleButton onClick={() => signIn("google")} />
              <GithubButton onClick={() => signIn("github")} />
            </Group>
            <Link href="/">
              <Anchor>
                Back to home
              </Anchor>
            </Link>
          </Stack>
        </Paper>
      </Center>
    </>
  );
}