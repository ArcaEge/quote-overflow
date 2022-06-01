import { useSession } from "next-auth/react"
import { showNotification } from "@mantine/notifications"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Container, Title, createStyles, Center, Group, Button, TextInput, Tooltip, Text, Card, Grid, ActionIcon, Tabs } from '@mantine/core'
import { getRandomInt } from "functions/random"
import { useModals } from '@mantine/modals';
import { InfoCircle, ArrowUpRight, Star } from "tabler-icons-react"
import { StarIcon, StarFillIcon } from "@primer/octicons-react"
import NewDesignModal from "components/designs/new_design_modal"

const useStyles = createStyles((theme) => ({
    headerWrap: {
        position: "relative",
        overflow: "hidden",
        borderBottom: `1px solid ${theme.colorScheme === "light" ? theme.colors.gray[2] : theme.colors.dark[5]}`,
        transitionTimingFunction: "ease-in-out",
        transitionDuration: "0.5s",
        transitionProperty: "all",
    },
    headerBg: {
        opacity: 0.6,
        position: "absolute",
        left: 0,
        top: "50%",
        width: "100%",
        height: "auto",
        transform: "translate(0, -50%)",
    },
    header: {
        position: "relative",
    },
    footer: {
        padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
            }`,
    },
}))

export default function Page({ designs }) {
    const { data: session, status } = useSession()
    const { classes, theme, cx } = useStyles();
    const [headerImage, setHeaderImage] = useState("");
    const router = useRouter()
    const modals = useModals()

    useEffect(() => {
        if (status === "unauthenticated") {
            setTimeout(() => {
                showNotification({
                    autoClose: 10_000,
                    color: 'red',
                    title: 'Unauthorised',
                    message: 'Sign in first to access this page',
                })
            }, 500)
            router.push("/auth/signin")
        }
    }, [status])

    useEffect(() => {
        setHeaderImage(`/images/${theme.colorScheme}/${getRandomInt(1, 4)}.jpg`);
    }, [theme.colorScheme])

    const openNewDesignModal = () => {
        const id = modals.openModal({
            title: 'Name your new design',
            children: <NewDesignModal onClose={() => modals.closeModal(id)} />,
        });
    };

    if (status === "authenticated") {
        return (
            <>
                <div className={classes.headerWrap}>
                    <img className={classes.headerBg} src={headerImage} />
                    <Center style={{ height: "100%" }}>
                        <Container py="xl" mt={0} className={classes.header}>
                            <Title order={1} style={theme.colorScheme === "dark" ? { color: theme.colors.gray[2] } : null}>Welcome to Quote Overflow</Title>
                        </Container>
                    </Center>
                </div>
                <Container py="xl" mt={0} style={{ display: "flex", flexDirection: "column" }}>
                    <Group position="apart">
                        <Title order={2}>Your Designs</Title>
                        <Button variant="light" onClick={openNewDesignModal}>New Design</Button>
                    </Group>
                    {
                        designs.length > 0 ?
                            <Tabs>
                                <Tabs.Tab label="All">
                                    <Grid>
                                        {designs.map(design => (
                                            <Grid.Col span={4}>
                                                <Card p="xl">
                                                    <Text weight={500} size="lg">
                                                        {design.name}
                                                    </Text>
                                                    <Text size="sm">
                                                        {design.description}
                                                    </Text>
                                                    <Card.Section className={classes.footer}>
                                                        <Group position="apart">
                                                            <Text size="xs" color="dimmed">
                                                                Last updated: {design.lastUpdated}
                                                            </Text>
                                                            <Group spacing={0}>
                                                                <ActionIcon>
                                                                    {design.starred ?
                                                                        <StarFillIcon size={16} fill={theme.colors.yellow[6]} />
                                                                        :
                                                                        <StarIcon size={16} fill={theme.colors.yellow[6]} />
                                                                    }
                                                                </ActionIcon>
                                                            </Group>
                                                        </Group>
                                                    </Card.Section>
                                                </Card>
                                            </Grid.Col>
                                        ))}
                                    </Grid>
                                </Tabs.Tab>
                                <Tabs.Tab label="Starred">
                                    <Grid>
                                        {designs.filter((design) => design.starred).map(design => (
                                            <Grid.Col span={4}>
                                                <Card p="xl">
                                                    <Text weight={500} size="lg">
                                                        {design.name}
                                                    </Text>
                                                    <Text size="sm">
                                                        {design.description}
                                                    </Text>
                                                    <Card.Section className={classes.footer}>
                                                        <Group position="apart">
                                                            <Text size="xs" color="dimmed">
                                                                Last updated: {design.lastUpdated}
                                                            </Text>
                                                            <Group spacing={0}>
                                                                <ActionIcon>
                                                                    {design.starred ?
                                                                        <StarFillIcon size={16} fill={theme.colors.yellow[6]} />
                                                                        :
                                                                        <StarIcon size={16} fill={theme.colors.yellow[6]} />
                                                                    }
                                                                </ActionIcon>
                                                            </Group>
                                                        </Group>
                                                    </Card.Section>
                                                </Card>
                                            </Grid.Col>
                                        ))}
                                    </Grid>
                                </Tabs.Tab>
                            </Tabs>
                            :
                            <Center style={{ minHeight: "40vh" }}>
                                <Text>No designs yet 👀
                                    <br />
                                    Click "New Design" to create one <ArrowUpRight />
                                </Text>
                            </Center>
                    }
                </Container>
            </>
        )
    }
}

export function getServerSideProps(context) {
    return {
        props: {
            designs: [
                {
                    name: "Design 1",
                    id: "1",
                    description: "This is a description of design 1",
                    starred: true,
                    lastUpdated: "2020-01-01",
                },
                {
                    name: "Design 2",
                    id: "2",
                    description: "This is a description of design 2",
                    starred: false,
                    lastUpdated: "2020-01-02",
                },
                {
                    name: "Design 3",
                    id: "3",
                    description: "This is a description of design 3",
                    starred: true,
                    lastUpdated: "2020-01-03",
                }
            ],
        },
    }
}