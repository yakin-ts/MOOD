'use client'
import { updateJournal } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from 'react-autosave'
import {JournalEntry} from '@prisma/client'

const JournalEditor = ({ entry }: {entry : JournalEntry}) => {
  const placeholderAnalysis = { summary: '', subject: '', sentiment: '', negative: false, color: '#fef3f4' }
  console.log(entry)
  const [content, setContent] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)
  const [analysis, setAnalysis] = useState(entry?.entryAnalysis || placeholderAnalysis)

  useAutosave({
    data: content,
    onSave: async (_content) => {
      setIsSaving(true)
      const newEntry = await updateJournal(entry?.id, _content)
      setAnalysis(newEntry?.entryAnalysis || placeholderAnalysis)
      setIsSaving(false)
    },

  })

  console.log(analysis)

  const { summary, subject, sentiment, negative, color } = analysis

  const analysisData = [
    { 'name': 'Summary', 'value': summary },
    { 'name': 'Subject', 'value': subject },
    { 'name': 'Mood', 'value': sentiment },
    { 'name': 'Negative', 'value': String(negative) },
    { 'name': 'Color', 'value': color },
  ]

  return (
    <>
      {isSaving && <div className='absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-50 flex justify-center items-center'><div className='text-4xl text-black/60 flex font-semibold'>Saving...</div></div>}
      <div className="basis-2/3 mx-2 rounded-md shadow-md">
        <textarea className=' resize-none w-full min-h-full p-10 text-2xl rounded-xl outline-none text-zinc-800 focus:bg-zinc-300/20' value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div className="h-full w-full basis-1/3 shadow-lg rounded-md">
        <div className="px-6 py-10 " style={{ backgroundColor: color }}>
          <h2 className="text-2xl text-center text-black/70  ">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                className="w-full px-2 py-4 flex items-center justify-between border-b border-black/20"
                key={item.name}
              >
                <span className="text-lg font-semibold text-black/50 pr-4">{item.name} : </span>
                <span className='text-black/60 pl-4 capitalize'>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default JournalEditor
