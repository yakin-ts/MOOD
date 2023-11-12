import {Analysis} from '@prisma/client'
const EntryCard = ({ entry }: {entry: Analysis}) => {
    const date = new Date(entry?.createdAt).toDateString()
    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:px-6">{date}</div>
            <div className="px-4 py-5 sm:p-6 capitalize">{entry?.subject}</div>
            <div className="px-4 py-4 sm:px-6 capitalize">{entry?.sentiment}</div>
        </div>
    )
}

export default EntryCard;