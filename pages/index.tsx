// Next.js hello world example
import { useSession, signIn, signOut } from "next-auth/react"
import { showNotification } from '@mantine/notifications';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import HeaderTabs from 'components/navbar'

export default function Index() {
    const { data: session } = useSession()
    const router = useRouter()
    useEffect(() => {
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let options = urlParams.has('options') ? urlParams.get('options') : null;
        if (options) {
            if (options === 'SignedIn') {
                router.push("/")
                setTimeout(() => {
                    showNotification({
                        autoClose: 5000,
                        color: 'teal',
                        title: 'Signed In',
                        message: 'Signed in successfully',
                    })
                }, 1000)
            }
        }
    }, []);
    if (session) {
        return (
            <>
                <HeaderTabs user={session.user} tabs={["Home"]} activeTab="Home" /> {/* // eslint-disable-line */}
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <Link href="/auth/signin" passHref>
                <button>Sign in</button>
            </Link>
        </>
    )
}