import React, { createContext, useState } from 'react'

export const AppContext = createContext()


export function AppContextProvider({ children }) {

    const [watchList, setWatchList] = useState(["AMZN", "AAPL", "MDB"])



    const props = {watchList, setWatchList}

    return (
        <AppContext.Provider value={props}>
            { children }
        </AppContext.Provider>
    )
}

// export { AppContext, AppProvider }