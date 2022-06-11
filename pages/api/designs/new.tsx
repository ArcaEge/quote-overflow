import { getSession } from "next-auth/react"
import { PrismaClient, Prisma } from '@prisma/client'
import { allowed } from "functions/designs"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const session = await getSession({ req })

    if (req.method != 'POST') {
        res.status(405).json({ code: 405, response: 'error', message: "Method not allowed" })
        return
    } else if (req.cookies["next-auth.csrf-token"] != decodeURIComponent(req.headers["x-csrf-token"])) {
        res.status(403).json({ code: 403, response: 'error', message: "CSRF token mismatch" })
        return
    } else if (!session) {
        res.status(401).json({ code: 401, response: 'error', message: "Not signed in" })
        return
    } else if (req.body.designName === undefined || req.body.description === undefined) {
        res.status(400).json({ code: 400, response: 'error', message: "Missing required fields" })
        return
    } else if (req.body.designName.length < 3 || req.body.designName.length > 60 || req.body.description.length > 1500) {
        res.status(400).json({ code: 400, response: 'error', message: "Invalid values" })
        return
    }
    const design = await prisma.design.create({
        data: {
            name: req.body.designName,
            description: req.body.description,
            starred: false,
            contents: {},
            userId: session.user["id"],
        }
    })

    res.status(200).json({ code: 200, response: 'success', message: "Design created", 
    design: Object.fromEntries(allowed.map(k => k == "createdAt" || k == "updatedAt" ? [k, design[k].getTime()] : [k, design[k]])) })
}