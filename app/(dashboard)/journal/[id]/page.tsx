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
        },
        include: {
            analysis: true
        }

    })

    return entry
}

const JournalEditorPage = async ({ params }) => {
    const {summary,subject,sentiment,negative,color} = await getEntry(params.id)
    const analysisData = [
        {'name':'Summary', 'value':summary},
        {'name':'Subject', 'value':subject},
        {'name':'Sentiment', 'value':sentiment},
        {'name':'Negative', 'value':negative},
        {'name':'Color', 'value':color},
    ]
    return (
        <div className='grid grid-cols-3'>
            <div className='col-span-2'>
                <JournalEditor entry={entry} />
            </div>
            <div className='col-span-1'>
                <div className='border-l border-black/10 '>
                    <div className='px-6 py-8' style={{backgroundColor : color}}>
                        <h2 className='text-2xl font-bold'>Analysis</h2>
                    </div>
                    <ul className=''>
                        {
                            analysisData.map((item, index) => {
                                return (
                                    <li key={index} className='flex items-center justify-between px-8 py-10 border-b border-t border-black/10'>
                                        <span className='text-xl font-semibold'>{item.name}</span>
                                        <span className='text-lg'>{item.value}</span>
                                    </li>
                                )
                            }

                            )
                        }
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default JournalEditorPage;