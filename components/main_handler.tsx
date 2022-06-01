import React, { useEffect } from 'react';
import { useSession } from "next-auth/react"
import Navbar from 'components/navbar_handler';
import { LoadingOverlay, Center } from '@mantine/core';

export default function MainHandler({ Component, pageProps }) {
    const { data: session, status } = useSession()

    return (
        <>
            <Navbar />
            <LoadingOverlay visible={status == "loading"} loaderProps={{ size: 'lg', variant: 'bars' }} />
            <Component {...pageProps} />
        </>
    )
}