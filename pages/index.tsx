// Next.js hello world example
import { useSession, getSession, signIn, signOut } from "next-auth/react"
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
                        autoClose: 5_000,
                        color: 'teal',
                        title: 'Signed In',
                        message: 'Signed in successfully',
                    })
                }, 500)
            } else if (options === 'auth' && status != "authenticated" && status != "loading") {
                router.replace("/")
                setTimeout(() => {
                    showNotification({
                        autoClose: 5_000,
                        color: 'orange',
                        title: 'Signed Out',
                        message: 'Signed out successfully',
                    })
                }, 500)
            }
        }
    }, [status, options])
    return (<></>)
}