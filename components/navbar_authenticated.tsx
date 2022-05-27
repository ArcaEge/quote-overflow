import React, { useState } from 'react';
import {
    createStyles,
    Container,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Divider,
    Tabs,
    Burger,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
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

const useStyles = createStyles((theme) => ({
    header: {
        paddingTop: theme.spacing.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
            }`,
        marginBottom: 120,
    },

    mainSection: {
        paddingBottom: theme.spacing.sm,
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

    burger: {
        // [theme.fn.largerThan('xs')]: {
        //     display: 'none',
        // },
    },

    userActive: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    tabs: {
        // [theme.fn.smallerThan('sm')]: {
        //     display: 'none',
        // },
    },

    tabsList: {
        borderBottom: '0 !important',
    },

    tabControl: {
        fontWeight: 500,
        height: 38,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
    },

    tabControlActive: {
        borderColor: `${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
            } !important`,
    },
}));

export default function AuthenticatedHeader({ user, tabs, activeTab }) {
    const { classes, theme, cx } = useStyles();
    const [opened, toggleOpened] = useBooleanToggle(false);
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const items = tabs.map((tab) => <Tabs.Tab label={tab} key={tab} />);

    return (
        <div className={classes.header}>
            <Container className={classes.mainSection}>
                <Group position="apart">
                    <div></div>

                    {/* <Burger
                        opened={opened}
                        onClick={() => toggleOpened()}
                        className={classes.burger}
                        size="sm"
                    /> */}

                    <Menu
                        size={260}
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
                        <Menu.Label>{user.email}</Menu.Label>
                        <Menu.Item icon={<Logout size={14} />} onClick={() => signOut()}>Logout</Menu.Item>
                    </Menu>
                </Group>
            </Container>
            <Container>
                <Tabs
                    variant="outline"
                    classNames={{
                        root: classes.tabs,
                        tabsListWrapper: classes.tabsList,
                        tabControl: classes.tabControl,
                        tabActive: classes.tabControlActive,
                    }}
                    active={activeTab} // eslint-disable-line
                >
                    {items}
                </Tabs>
            </Container>
        </div>
    );
}