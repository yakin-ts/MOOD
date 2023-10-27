import getUserByClerkId from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

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

    return NextResponse.json({data: journalUpdated})
}