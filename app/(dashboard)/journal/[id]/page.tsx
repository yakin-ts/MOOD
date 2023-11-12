import JournalEditor from "@/components/JournalEditor";
import getUserByClerkId from "@/utils/auth";
import { prisma } from "@/utils/db";
import { FunctionComponent } from "react";

const getEntry = async (journalId: string) => {
    const user = await getUserByClerkId()

    const entry = await prisma.journalEntry.findUniqueOrThrow({
        where: {
            userId_id: {
                userId: user.id,
                id: journalId
            }
        },
        select: {
            id: true,
            content: true,
            entryAnalysis: true
        },
    })
    return entry
}

interface Props {
    params: { id: string }
}

const JournalEditorPage: FunctionComponent<Props> = async ({ params }) => {
    const entry = await getEntry(params.id)

    return (
        <div className='flex flex-row h-full w-full mt-2'>
            <JournalEditor entry={entry} />
        </div>
    )

}

export default JournalEditorPage;