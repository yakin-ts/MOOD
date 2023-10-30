const createURL = ( path )=> {
    return window.location.origin + path
}

export const updateJournal = async (id, content) => {
    const res = await fetch(
        new Request(createURL(`/api/journal/${id}`),{
            method: 'PATCH',
            body: JSON.stringify({content})
        })
    )

    if (res.ok) {
        const data = await res.json()
        return data.data
    }
}

export const createNewJournal = async() => {
    const res = await fetch(
        new Request(createURL('/api/journal'),{
            method: 'POST'
        })
    )

    if (res.ok) {
        const data = await res.json()
        return data.data
    }
}

export const askQuestion = async (question) => {
    const res = await fetch(
        new Request(createURL('/api/search'),{
            method: 'POST',
            body: JSON.stringify({question})
        })
    )

    if (res.ok) {
        const data = await res.json()
        return data.data
    }
    
}

