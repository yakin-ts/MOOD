import getUserByClerkId from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";
import { analyze} from '@/utils/ai'

export const PATCH = async (req: Request, {params}) => {

    const user = await getUserByClerkId()
    const { content } = await req.json()

    const journalUpdated = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            }
        },
        data: {
            content
        }
})

const analysis = await analyze(journalUpdated)
// diff between upsert and update
await prisma.analysis.update({
    where: {
        entryId: journalUpdated.id
    },
    data: {
        ...analysis
    }
})

    return NextResponse.json({data: journalUpdated})
}