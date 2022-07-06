import { Header, Container, Group, createStyles, Text, Button } from "@mantine/core"
import { ChevronLeft } from 'tabler-icons-react'
import Link from "next/link"
import FileMenu from "./file_menu";

const useStyles = createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    outer: {
        backgroundImage: "linear-gradient(to right, " + theme.colors.indigo[8] + ", " + theme.colors.cyan[8] + ")",
    },
}))

export default function DesignNav({ design }) {
    const { classes, theme, cx } = useStyles();

    return (
        <Header height={50} className={classes.outer}>
            <Container className={classes.header} fluid>
                <Group spacing={1}>
                    <Link href="/dashboard">
                        <Button variant="subtle" color="gray" leftIcon={<ChevronLeft />} pl={4} pr={12}>
                            Home
                        </Button>
                    </Link>
                    <FileMenu design={design} />
                    <Text color={theme.colors.gray[2]} weight={600} size="md" ml="sm">{design.name}</Text>
                </Group>
                <Group>
                    <Text>{design.description}</Text>
                </Group>
            </Container>
        </Header>
    )
}