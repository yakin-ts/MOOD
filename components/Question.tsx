'use client'
import React, { useState } from "react"
import { askQuestion } from "@/utils/api"
import { GiThink } from 'react-icons/gi'

const Question = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [answer, setAnswer] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const ans = await askQuestion(value)
        console.log(ans)
        setAnswer(ans)
        setValue('')
        setLoading(false)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input disabled={loading} value={value} type='text'
                    onChange={(e) => setValue(e.target.value)} placeholder="Ask across your journals"
                    className=' border-zinc-700/50 text-lg text-zinc-700 bg-gray-300/80 rounded-full px-4 py-2 mb-4 mr-3 w-[30%] focus:outline-none focus:ring-2 focus:ring-zinc-600/70'
                    
                />
                <button disabled={loading} type='submit'
                    className='px-4 py-2 rounded-lg text-white text-lg bg-zinc-600/70'>Ask</button>
            </form>
            {loading && <p className='text-xl font-semibold flex text-black/70'>Thinking...   <GiThink className='text-2xl'/> </p>}
            {answer && <div className='flex flex-col m-4 p-3 border-black/70'>
                <p className='text-lg text-gray-500 w-full text-black/90 border-zinc-700/70 rounded-xl bg-gray-300/50'>{answer}</p>
                <div className ='flex'>
                <div className='ml-5 text-lg bg-red-600 text-whit w-25 p-2 cursor-pointer' onClick={() => setAnswer('')}>Clear Answer</div>
                </div>
            </div>}

        </div>
    )
}

export default Question