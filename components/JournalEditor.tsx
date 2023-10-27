'use client'
import { updateJournal } from "@/utils/api"
import { useState } from "react"
import { useAutosave} from 'react-autosave'

const JournalEditor = ({ entry }) => {
    const [content, setContent] = useState(entry.content)
    const [isSaving, setIsSaving] = useState(false)

    useAutosave({
        data: content,
        onSave: async (_content) => {
            setIsSaving(true)
            const newEntry = await updateJournal(entry.id, _content)
            setIsSaving(false)
            
        },

    })
    return (
        <div className='w-full h-full'>
            { isSaving && <div className='absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-50 flex justify-center items-center'><div className='text-2xl'>Saving...</div></div>}
            <textarea className='w-full h-full p-10 text-2xl outline-none' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
    )
}

export default JournalEditor

