import React, { useEffect } from 'react';
import { useSession } from "next-auth/react"
import AuthenticatedHeader from 'components/navbar_authenticated'
import UnauthenticatedHeader from 'components/navbar_unauthenticated'

export default function Navbar() {
    const { data: session, status } = useSession()

    if (status == "authenticated") {
        return (
            <AuthenticatedHeader user={session.user} links={[{ label: "Home", link: "/" }, { label: "Dashboard", link: "/dashboard" },]} />
        )
    } else {
        return (
            <UnauthenticatedHeader links={[{ label: "Home", link: "/" }, { label: "Sign In", link: "/auth/signin" }]} />
        )
    }
}