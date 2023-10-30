'use client'
import { updateJournal } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from 'react-autosave'

const JournalEditor = ({ entry }) => {
  const [content, setContent] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  useAutosave({
    data: content,
    onSave: async (_content) => {
      setIsSaving(true)
      const newEntry = await updateJournal(entry.id, _content)
      setAnalysis(newEntry.analysis)
      setIsSaving(false)
    },

  })

  const { summary, subject, sentiment, negative, color } = entry.analysis

  const analysisData = [
    { 'name': 'Summary', 'value': summary },
    { 'name': 'Subject', 'value': subject },
    { 'name': 'Sentiment', 'value': sentiment },
    { 'name': 'Negative', 'value': negative },
    { 'name': 'Color', 'value': color },
  ]

  return (
    <div className='w-full h-full grid grid-cols-3'>
      {isSaving && <div className='absolute top-0 left-0 w-full h-full bg-gray-100 bg-opacity-50 flex justify-center items-center'><div className='text-2xl'>Saving...</div></div>}
      <div className="w-full h-full cols-span-2">
        <textarea className='w-full h-full p-10 text-2xl outline-none' value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
                key={item.name}
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default JournalEditor

