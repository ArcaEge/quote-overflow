// import React, { useEffect, useState } from 'react';
// import { createStyles, Title, Text, Button, Container, Group, Blockquote, Image, Center } from '@mantine/core';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'functions/fetcher';

// const useStyles = createStyles((theme) => ({
//     root: {
//         paddingTop: 80,
//         paddingBottom: 80,
//     },

//     label: {
//         textAlign: 'center',
//         fontWeight: 900,
//         fontSize: 220,
//         lineHeight: 1,
//         marginBottom: theme.spacing.xl * 1.5,
//         color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

//         [theme.fn.smallerThan('sm')]: {
//             fontSize: 120,
//         },
//     },

//     title: {
//         fontFamily: `Greycliff CF, ${theme.fontFamily}`,
//         textAlign: 'center',
//         fontWeight: 900,
//         fontSize: 38,

//         [theme.fn.smallerThan('sm')]: {
//             fontSize: 32,
//         },
//     },

//     description: {
//         maxWidth: 500,
//         margin: 'auto',
//         marginTop: theme.spacing.xl,
//         marginBottom: theme.spacing.xl * 1.5,
//     },
// }));

// export default function Four0Four() {
//     const { classes } = useStyles();
//     const { data, error } = useSWR('https://api.quotable.io/random', fetcher)

//     return (
//         <Center>
//             <Container className={classes.root}>
//                 <div className={classes.label}>404</div>
//                 <Title className={classes.title}>Page not found</Title>
//                 <Group align="center" mt="xl">
//                     <Image src='/images/cat.gif' radius="md" width={340} style={{ opacity: "0.7" }} />
//                 </Group>
//                 {/* {data ?
//                 <>
//                     <Text color="dimmed" size="lg" align="center" className={classes.description}>
//                         Umm... the dog ate it.<br/>
//                         But while you're here, here's a random quote:
//                         <Blockquote cite={data.author} style={{ maxWidth: "800px" }}>
//                             {data.content}
//                         </Blockquote>
//                         <Link href="/">
//                             <Button variant="subtle" size="md">
//                                 Back to home
//                             </Button>
//                         </Link>
//                     </Text>
//                 </>
//                 : null
//             } */}
//             </Container>
//         </Center>
//     );
// }
import React from 'react';
import { createStyles, Image, Container, Title, Text, Button, SimpleGrid, Group, Blockquote } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    root: {
        [theme.fn.largerThan('sm')]: {
            paddingTop: 80,
            paddingBottom: 80,
        },
        [theme.fn.smallerThan('sm')]: {
            paddingTop: 20,
            paddingBottom: 10,
        },
    },

    title: {
        fontWeight: 900,
        fontSize: 34,
        marginBottom: theme.spacing.md,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    control: {
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
        },
    },

    mobileImage: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    desktopImage: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
    label: {
        fontWeight: 900,
        fontSize: 110,
        lineHeight: 0.5,
        marginBottom: -12,
        marginTop: 0,
        userSelect: "none",
        color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
        [theme.fn.smallerThan('sm')]: {
            fontSize: 70,
        },
    },
}));

export default function NotFoundImage() {
    const { classes } = useStyles();
    const { data, error } = useSWR('https://api.quotable.io/random', fetcher)

    return (
        <Container className={classes.root}>
            <SimpleGrid spacing={40} cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
                <Image className={classes.mobileImage} src='/images/dog.gif' radius="md" style={{ opacity: "0.6" }} alt="Dog GIF (also, it's pronounced gif and not jif)" />
                <div>
                    <div className={classes.label}>404</div>
                    <Title className={classes.title}>Page not found</Title>
                    <Text color="dimmed" size="lg">
                        Umm... the dog ate it.
                    </Text>
                    {data ?
                        <>
                            <Text color="dimmed" size="lg" mt="xs">
                                But while you&apos;re here, here&apos;s a random quote:
                                <Blockquote cite={data.author} style={{ maxWidth: "800px" }}>
                                    {data.content}
                                </Blockquote>
                            </Text>
                        </>
                        : null
                    }
                    <Link href="/">
                        <Button variant="gradient" size="md">
                            Back to home
                        </Button>
                    </Link>
                </div>
                <Image src='/images/dog.gif' radius="md" style={{ opacity: "0.8" }} className={classes.desktopImage} alt="Dog GIF (also, it's pronounced gif and not jif)" />
            </SimpleGrid>
        </Container>
    );
}