import JournalEditor from "@/components/JournalEditor";
import getUserByClerkId from "@/utils/auth";
import { prisma } from "@/utils/db";
import { FunctionComponent } from "react";

const getEntry = async (journalId: string) => {
    const user = await getUserByClerkId()

    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id: journalId
            }
        },
        include: {
            entryAnalysis: true
        }

    })

    return entry
}

interface Props {
    params: { id: string }
}

const JournalEditorPage: FunctionComponent<Props> = async ({ params }) => {
    const entry = await getEntry(params.id)

    return (
        <div className='grid grid-cols-3'>
            <JournalEditor entry={entry} />
        </div>
    )

}

export default JournalEditorPage;