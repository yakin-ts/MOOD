'use client'

import React, { useState } from "react"
import { askQuestion } from "@/utils/api"

const Question = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [answer, setAnswer] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const answer = await askQuestion(value)
        setAnswer(answer)
        setValue('')
        setLoading(false)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input disabled={loading} value={value} type='text'
                    onChange={(e) => setValue(e.target.value)} placeholder="Ask a Question"
                    className='border-black/120 text-lg'
                />
                <button disabled={loading} type='submit'
                    className='px-4 py-2 rounded-lg text-white text-lg bg-zinc-600/20'>Ask</button>
            </form>
            {loading && <p className='text-lg text-gray-500'>Thinking...</p>}
            {answer && <p className='text-lg text-gray-500'>{answer}</p>}

        </div>
    )
}

export default Question