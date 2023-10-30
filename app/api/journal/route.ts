import getUserByClerkId  from '@/utils/auth'
import { prisma } from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { analyze} from '@/utils/ai'

export const POST = async (reques: Request) => {
    const user = await getUserByClerkId()
    const journal = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: 'Write about your day !!'
        }
    })

    const analysis = await analyze(journal)

    await prisma.analysis.create({
        data: {
            userId: journal.id,
            entryId: journal.id,
            ...analysis
        }
    })


    revalidatePath('/journal')

    return NextResponse.json({data: {...journal, analysis: {...analysis}}})
}
