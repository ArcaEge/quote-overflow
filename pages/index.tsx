// Next.js hello world example
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

export default function Index() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
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