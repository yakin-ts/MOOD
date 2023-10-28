import { prisma } from "@/utils/db";
import getUserByClerkId from "@/utils/auth";
import CreateEntry from "@/components/NewEntryCard";
import EntryCard from "@/components/EntryCard";
import Link from 'next/link'
import { analyze } from "@/utils/ai";

const getEntries = async () => {
    const user = await getUserByClerkId()

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    // await analyze('recommend a 7 day diet for me. I am planning working out in the gym to build muscles, 4 days a week')

    return entries
}

const JournalPage = async () => {
    const entries = await getEntries()

    return (
        <div className="p-10">
            <h2 className='text-3xl'>Journal</h2>
            <div className='grid grid-cols-3 gap-4'>
                <CreateEntry />
                <div className='col-span-2'>
                    <div className='grid grid-cols-2 gap-4'>
                        {entries.map((entry) => {
                            return (
                                <Link href={`/journal/${entry.id}`}key={entry.id}>
                                    <EntryCard entry={entry}/>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default JournalPage;