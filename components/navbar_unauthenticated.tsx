import React, { useState, useEffect } from 'react';
import { createStyles, Header, Container, Group, Burger, Anchor, Text } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
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

    burger: {
        // [theme.fn.largerThan('xs')]: {
        //     display: 'none',
        // },
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

interface HeaderSimpleProps {
    links: { link: string; label: string }[];
}

export default function UnauthenticatedHeader({ links }: HeaderSimpleProps) {
    // const [opened, toggleOpened] = useBooleanToggle(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, theme, cx } = useStyles();
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
                <div>
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
                </div>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>

                {/* <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        /> */}
            </Container>
        </Header>
    );
}