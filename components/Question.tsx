'use client'

import { useState } from "react"

const Question = () => {
    const [value, setValue] = useState('')

    cons handleSubmit = (e) => {
        e.preventDefault()

    }
    
    return (
    <div>
        <form onSubmit={handleSubmit}>
            <input value={value} type='text' onChange={()=> setValue(e.target.value)} placeholder="Ask a Question" className='border-black/120 text-lg'/>
            <button type='submit' className='px-4 py-2 rounded-lg text-white text-lg bg-zinc-600/20'>Ask</button>
        </form>
    </div>
    )
}

export default Question