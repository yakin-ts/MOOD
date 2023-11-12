import getUserByClerkId from "@/utils/auth"
import { prisma } from "@/utils/db"
import HistoryCharts  from "@/components/HistoryChart"

const getData = async () => {
    const user = await getUserByClerkId()
    const analysis = await prisma.analysis.findMany({
        where: {
            userId: user.id
        },
       
    })

    const sum = analysis.reduce((acc, curr) => acc + curr.sentimentScore, 0)
    const avg = Math.round(sum / analysis.length)

    return { analysis, avg }
}

const HistoryPage = async () => {
    const { analysis, avg } = await getData()
    return (
        < div className="h-full px-6 pt-4 shadow-lg f" >
            <div>
                <div className='text-2xl text-black/60 mb-4 text-center'>{`Average Sentiment Score: ${avg}`}</div>
            </div>
            <div className='h-full w-full flex items-center justify-center'>
                <HistoryCharts data={analysis} />
            </div>
        </div >
    )
}


export default HistoryPage