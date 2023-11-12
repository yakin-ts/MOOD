'use client'
import { useRouter } from 'next/navigation'
import { createNewJournal } from '@/utils/api'
import {TfiWrite} from 'react-icons/tfi'

const CreateEntry = () => {
    const router = useRouter()
    const handleClick = async () => {
        const data = await createNewJournal()
        console.log(data)
        router.push(`/journal/${data.id}`)
    }

    return (
        <div className='cursor-pointer overflow-hidden shadow-lg rounded-lg bg-white flex items-center justify-center hover:shadow-xl transition duration-300 ease-in-out'
            onClick={handleClick}>
            <div className='px-4 py-5 sm:p-6'>
                <button className='text-6xl text-center font-semibold text-black/70'><TfiWrite/></button>
            </div>

        </div>
    )
}

export default CreateEntry;
