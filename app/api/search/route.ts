import { qa } from '@/utils/ai'
import  getUserByClerkId from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import  { QuestionEntry} from '@/types/question'


export const POST = async (request: Request) => {
    const {question} = await request.json()
    const user = await getUserByClerkId()

    const entries: QuestionEntry[] = await prisma.journalEntry.findMany({
        where: {
            userId: user.id
        },
        select :{
            id:true,
            content:true,
            createdAt:true
        }
    })

    const answer = await qa(question,entries)

    return NextResponse.json({ data: answer })
}