'use client'
import { useRouter } from 'next/navigation'
import { createNewJournal } from '@/utils/api'

const CreateEntry = () => {
    const router = useRouter()
    const handleClick = async () => {
        const data = await createNewJournal()
        router.push(`/journal/${data.id}`)
    }

    return (
        <div className='cursor-pointer overflow-hidden shadow rounded-lg bg-white'
            onClick={handleClick}>
            <div className='px-4 py-5 sm:p-6'>
                <button className='text-3xl'>New Journal</button>
            </div>

        </div>
    )
}

export default CreateEntry;
