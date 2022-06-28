import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'
import { allowed } from 'functions/designs'

export default function Dashboard({ design }) {
    console.log(design)
}

export async function getServerSideProps(context) {
    const prisma = new PrismaClient()
    const session = await getSession(context)

    const design = await prisma.design.findFirst({
        where: {
            id: context.query.id,
            userId: session.user['id']
        },
    })

    console.log(context.query.id, session.user['id'])

    if (!design) {
        return {
            notFound: true,
        }
    }

    const finalDesign = Object.fromEntries(allowed.map(k => k == "createdAt" || k == "updatedAt" ? [k, design[k].getTime()] : [k, design[k]]))

    return {
        props: {
            design: finalDesign,
        }
    }
}