import JournalEditor from "@/components/JournalEditor";
import getUserByClerkId from "@/utils/auth";
import { prisma } from "@/utils/db";

const getEntry = async (journalId) => {
    const user = await getUserByClerkId()

    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id: journalId
            }
        }

    })

    return entry
}

const JournalEditorPage = async ({ params }) => {
    const entry = await getEntry(params.id)

    return (
        <div className=''>
            <JournalEditor entry={entry} />
        </div>
    )
}

export default JournalEditorPage;