import React from 'react';
import { useForm, useToggle, upperFirst } from '@mantine/hooks';
import { signIn } from "next-auth/react"
import {
  Text,
  Divider,
  Group,
  Title,
  Center,
  Space,
  Stack,
} from '@mantine/core';
import { GoogleButton, GithubButton } from 'components/auth/buttons';

export default function SignIn({ props }) {
  return (
    <Center style={{ height: "95vh" }}>
      <Stack>
        <Title order={2} px="md">Welcome to Quote Overflow</Title>
        <Divider mx="md" label="Sign in or Register with" labelPosition="center" />
          <Group grow mx="md">
            <GoogleButton />
            <GithubButton onClick={() => signIn("github")} />
          </Group>
      </Stack>
    </Center >
  );
}