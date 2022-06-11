import { PrismaClient } from '@prisma/client'

export const allowed = ['id', 'name', 'description', 'starred', 'contents', 'createdAt', 'updatedAt']

export async function getDesigns(session, prisma: PrismaClient) {
  const designs = await prisma.design.findMany({
      where: {
        userId: session.user['id']
      },
  })
  let finalDesigns = []
  for (const design of designs) {
    finalDesigns.push(Object.fromEntries(allowed.map(k => k == "createdAt" || k == "updatedAt" ? [k, design[k].getTime()] : [k, design[k]])))
  }
  return finalDesigns
}