import getUserByClerkId  from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async (reques: Request) => {
    const user = await getUserByClerkId()
    const journal = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: 'Write about your day !!'
        }
    })

    revalidatePath('/journal')

    return NextResponse.json({data: journal})
}
