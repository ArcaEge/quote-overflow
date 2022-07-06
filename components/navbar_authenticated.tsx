import React, { useState, useEffect } from 'react';
import {
    createStyles,
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Divider,
    Header,
    Anchor,
} from '@mantine/core';
import { NextLink } from '@mantine/next';
import {
    Logout,
    Heart,
    Star,
    Message,
    Settings,
    PlayerPause,
    Trash,
    SwitchHorizontal,
    ChevronDown,
} from 'tabler-icons-react';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        // [theme.fn.smallerThan('xs')]: {
        //     display: 'none',
        // },
    },

    userMenu: {
        // [theme.fn.smallerThan('xs')]: {
        //     display: 'none',
        // },
    },

    user: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        transition: 'background-color 100ms ease',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
        },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][0],
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
        },
    },
}));

export default function AuthenticatedHeader({ user, links }) {
    const { classes, theme, cx } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const [active, setActive] = useState(links[0].link);
    const router = useRouter();

    useEffect(() => {
        for (const link of links) {
            if (router.pathname === link.link) {
                setActive(link.link);
            }
        }
    }, [router.pathname]);

    const items = links.map((link) => (
        <Link href={link.link} key={link.link}>
            <a className={cx(classes.link, { [classes.linkActive]: active === link.link })}>
                {link.label}
            </a>
        </Link>
    ));

    return (
        <Header height={60}>
            <Container className={classes.header}>
                <Group>
                    <Anchor component={Link} href="/">
                        <div style={{ cursor: "pointer", userSelect: "none" }}>
                            <Text
                                component="span"
                                align="center"
                                variant="gradient"
                                size="xl"
                                weight={900}
                                style={{ fontFamily: 'Greycliff CF, sans-serif' }}
                            >
                                Quote </Text>
                            <Text
                                component="span"
                                align="center"
                                size="xl"
                                weight={700}
                                style={{ fontFamily: 'Greycliff CF, sans-serif' }}
                                color={theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.dark[4]}
                            >
                                Overflow</Text>
                        </div>
                    </Anchor>
                </Group>
                <Group>
                    {/* <Group spacing={5} className={classes.links}>
                        {items}
                    </Group> */}

                    <Menu
                        size="md"
                        placement="end"
                        transition="pop-top-right"
                        className={classes.userMenu}
                        onClose={() => setUserMenuOpened(false)}
                        onOpen={() => setUserMenuOpened(true)}
                        control={
                            <UnstyledButton
                                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                            >
                                <Group spacing={7}>
                                    <Avatar src={user.image} alt={user.name} radius="xl" size={20} />
                                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                                        {user.name}
                                    </Text>
                                    <ChevronDown size={12} />
                                </Group>
                            </UnstyledButton>
                        }>
                        {links.map((item, index: Number) => (
                            <Menu.Item component={NextLink} href={item.link} key={index.toString()}>
                                {item.label}
                            </Menu.Item>
                        ))}
                        <Divider />
                        {/* <Menu.Label>{user.email}</Menu.Label> */}
                        <Menu.Item icon={<Logout size={14} />} onClick={() => signOut()}>Logout</Menu.Item>
                    </Menu>
                </Group>
            </Container>
        </Header>
    );
}