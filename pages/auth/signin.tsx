import React from 'react';
import { useForm, useToggle, upperFirst } from '@mantine/hooks';
import { signIn } from "next-auth/react"
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
  useEffect(() => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let error = urlParams.has('error') ? urlParams.get('error') : null;
    if (error) {
      if (error === 'OAuthAccountNotLinked') {
        setTimeout(() => {
          showNotification({
            color: 'red',
            autoClose: 10000,
            title: 'Email linked to another provider',
            message: 'Your email address is linked to another OAuth provider. Please sign in using that provider.',
          })
        }, 1000)
      }
    }
  }, []);
  return (
    <>
      <Center style={{ height: "95vh" }}>
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