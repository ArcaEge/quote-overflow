// Next.js hello world example
import { useSession, signIn, signOut } from "next-auth/react"
import { showNotification } from '@mantine/notifications';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Index() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { query } = useRouter()
    let options = query.options
    useEffect(() => {
        if (options) {
            if (options === 'auth' && status === "authenticated") {
                router.replace("/")
                setTimeout(() => {
                    showNotification({
                        autoClose: 5000,
                        color: 'teal',
                        title: 'Signed In',
                        message: 'Signed in successfully',
                    })
                }, 500)
            } else if (options === 'auth' && status != "authenticated" && status != "loading") {
                router.replace("/")
                setTimeout(() => {
                    showNotification({
                        autoClose: 5000,
                        color: 'orange',
                        title: 'Signed Out',
                        message: 'Signed out successfully',
                    })
                }, 500)
            }
        }
    }, [status, options])
    if (session) {
        return (
            <>
                {/* <AuthenticatedHeader user={session.user} tabs={["Home"]} activeTab="Home" /> */}
            </>
        )
    }
    return (
        <>
            {/* <UnauthenticatedHeader links={[{label: "Home", link: "/"}, {label: "Sign In", link: "/auth/signin"}]} /> */}
        </>
    )
}