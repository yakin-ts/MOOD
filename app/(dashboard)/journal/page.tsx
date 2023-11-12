import { prisma } from "@/utils/db";
import getUserByClerkId from "@/utils/auth";
import CreateEntry from "@/components/NewEntryCard";
import Question from "@/components/Question";
import EntryCard from "@/components/EntryCard";
import Link from 'next/link'
import {currentUser} from '@clerk/nextjs'

const getEntries = async () => {
    const user = await getUserByClerkId()
    
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        },
        include : {
            entryAnalysis:true,
        }
        
    })

    return entries
}

const JournalPage = async () => {

    const entries = await getEntries();
    const detailUser = await currentUser()



    return (
        <div className="p-10 h-full ">
            <h2 className='text-3xl font-semibold mb-8 text-black/70'>Welcome, {detailUser?.firstName}</h2>
            <div className='mb-5'>
                <Question/>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-3 gap-4'>
                <CreateEntry />
                    {entries.map((entry) => {
                        return (
                            <Link href={`/journal/${entry.id}`} key={entry.id}>
                                <div className='bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out'>
                                    <EntryCard entry={entry?.entryAnalysis} />
                                </div>
                            </Link>
                        )
                    })}
            </div>
        </div>

    );
}

export default JournalPage;