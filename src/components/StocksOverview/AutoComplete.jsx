import { useState } from "react"


export default function AutoComplete() {
    const [searchInput, setSearchInput] = useState('')
    return (
        <div className='my-5 text-center'>
            <form>
                <input type="text" placeholder='search' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </form>
        </div>
    )
}